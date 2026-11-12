# UCC Smart Tracker

## Siemens WFC — Centralized Multi-Site Inventory & Monitoring

UCC Smart Tracker provides centralized visibility of inventory and user-login information across configured Siemens Industrial Edge Workflow Control (WFC) sites. It collects site information and WFC inventory metadata, records collection outcomes, and maintains the latest successful login information in PostgreSQL.

The solution is designed to help UCC teams answer operational questions such as:

- Which WFC sites are configured and enabled?
- Which SmartApps, projects, and packages are present at each site?
- When was an inventory item last observed?
- Which inventory items have been marked as removed?
- When did the latest collection run start and finish, and did it succeed?
- Which sites failed or were skipped during a collection?
- Which user last successfully logged in to a device, and when?

> **Scope:** This repository documents inventory and login monitoring. It does not enable WFC control commands or process write-back operations.

## Repository contents

```text
UCC-Smart-Tracker/
├── README.md
├── DATABASE.md
├── workflow/
│   ├── SmartTracker.md
│   └── CleanUp.md
└── sql/
    └── schema.sql
```

| File | Purpose |
|---|---|
| `README.md` | Project overview, architecture, embedded ER diagram, and links to the detailed documents. |
| `DATABASE.md` | Detailed explanation of every database table, column, key, relationship, constraint, index, and data lifecycle. |
| `workflow/SmartTracker.md` | Multi-site inventory and audit/login collection workflow. |
| `workflow/CleanUp.md` | Cleanup workflow, deletion behavior, transaction considerations, and operational safeguards. |
| `sql/schema.sql` | PostgreSQL schema creation script supplied for the current design. |

## 1. Solution architecture

Each configured WFC site is represented in the central `smart_tracker.site` table. The collection workflow uses site configuration and credentials to connect to WFC APIs, retrieves inventory metadata, and writes the results to PostgreSQL. It also processes audit information to update the latest successful login records.

The cleanup workflow performs database maintenance on selected inventory and collection-history records.

```mermaid
flowchart TB
    subgraph WFC["Siemens Industrial Edge / WFC"]
        S1["Configured WFC Site 1"]
        S2["Configured WFC Site 2"]
        S3["Configured WFC Site 3"]
        SN["Additional configured sites"]
    end

    subgraph WF["UCC Smart Tracker workflows"]
        AUTH["Site authentication"]
        INV["Inventory collection"]
        AUDIT["Audit log retrieval"]
        LOGIN["Successful-login filtering"]
        CLEAN["Cleanup & Free Storage"]
    end

    DB[("PostgreSQL<br/>smart_tracker schema")]

    S1 --> AUTH
    S2 --> AUTH
    S3 --> AUTH
    SN --> AUTH
    AUTH --> INV
    AUTH --> AUDIT
    INV --> DB
    AUDIT --> LOGIN
    LOGIN --> DB
    CLEAN --> DB
```

## 2. Database schema

PostgreSQL is the central repository. The `smart_tracker` schema contains eight tables:

| Area | Tables | What they store |
|---|---|---|
| Site configuration | `site`, `site_credentials` | Configured site endpoints and the credentials used by the workflow. |
| Inventory | `smartapp`, `project`, `package` | WFC inventory metadata, including first/last-seen and removal timestamps. |
| Collection history | `collection_run`, `site_run` | Overall run status and the result for each site in a run. |
| Login monitoring | `info` | Latest successful login timestamp for each site/device/username combination. |

### 2.1 Entity relationship diagram

The following Mermaid ER diagram is embedded in the README so GitHub can render the schema visually. It reflects the foreign keys present in `sql/schema.sql`.

```mermaid
erDiagram
    SITE ||--o{ SMARTAPP : contains
    SITE ||--o{ PROJECT : contains
    SITE ||--o{ PACKAGE : contains
    SITE ||--o{ SITE_RUN : has_results
    COLLECTION_RUN ||--o{ SITE_RUN : includes

    SITE {
        integer site_id PK
        text site_name UK
        text api_base_url
        text credential_ref
        text wfc_system_version
        boolean is_enabled
        timestamptz last_success_at
        timestamptz created_at
        timestamptz updated_at
    }

    SMARTAPP {
        integer site_id PK, FK
        text gallery_item_id PK
        text source_id
        text name
        text version
        text system_version
        text namespace
        text organization
        text item_type
        text author_username
        text_array tags
        text description
        timestamptz item_created_at
        timestamptz first_seen_at
        timestamptz last_seen_at
        timestamptz removed_at
        jsonb raw
    }

    PROJECT {
        integer site_id PK, FK
        text project_id PK
        text name
        text version
        text system_version
        text gallery_item_id
        timestamptz item_updated_at
        timestamptz first_seen_at
        timestamptz last_seen_at
        timestamptz removed_at
        jsonb raw
    }

    PACKAGE {
        integer site_id PK, FK
        text package_id PK
        text name
        text version
        text system_version
        timestamptz item_updated_at
        timestamptz first_seen_at
        timestamptz last_seen_at
        timestamptz removed_at
        jsonb raw
    }

    COLLECTION_RUN {
        bigint run_id PK
        timestamptz started_at
        timestamptz finished_at
        text trigger_type
        text status
    }

    SITE_RUN {
        bigint site_run_id PK
        bigint run_id FK
        integer site_id FK
        text status
        text error_message
        integer smartapp_count
        integer project_count
        integer package_count
        timestamptz started_at
        timestamptz finished_at
    }

    SITE_CREDENTIALS {
        varchar site_name PK
        varchar username
        text password
        varchar ip_address
        timestamptz created_at
        timestamptz updated_at
    }

    INFO {
        text site_name PK
        text device_id PK
        text device_name
        text username PK
        timestamptz last_loggedin
    }
```

**Important relationship detail:** `site` is the parent of `smartapp`, `project`, `package`, and `site_run` through `site_id`. `collection_run` is the parent of `site_run` through `run_id`. In the supplied DDL, `site_credentials.site_name` and `info.site_name` are not declared as foreign keys to `site.site_name`; they are therefore shown as standalone tables in the ER diagram. Their matching site names are maintained by application/workflow logic, not enforced by a database FK.

For the full column-by-column explanation, constraints, indexes, relationships, and example queries, see **[DATABASE.md](DATABASE.md)**.

## 3. Workflow overview

### Multi-site inventory and login monitoring

The Smart Tracker collection workflow authenticates with configured sites, collects SmartApps/projects/packages, updates the inventory tables, retrieves audit information, filters successful login events, and updates `info`. It also records overall and per-site execution results in `collection_run` and `site_run`.

See **[workflow/SmartTracker.md](workflow/SmartTracker.md)** for the detailed sequence and table mapping.

### Cleanup and free storage

The cleanup workflow is a maintenance process for removing selected obsolete inventory rows and collection execution history. Inventory rows are marked with `removed_at` during synchronization; cleanup is a separate physical-deletion step governed by the configured policy.

See **[workflow/CleanUp.md](workflow/CleanUp.md)** for the cleanup scope and safeguards.

## 4. Key data interpretation

| Data field | Interpretation |
|---|---|
| `first_seen_at` | First time the inventory item was observed by Smart Tracker. |
| `last_seen_at` | Most recent collection in which the item was observed. |
| `removed_at` | Timestamp indicating that the item was no longer found in the latest inventory synchronization. A null value means it is not marked as removed. |
| `collection_run.status` | Overall run state: `running`, `success`, `partial`, or `failed`. |
| `site_run.status` | Per-site result: `success`, `failed`, or `skipped`. |
| `info.last_loggedin` | Latest successful login timestamp stored for the site/device/username key. |

## 5. Security and operational notes

- Treat `site_credentials.password` as sensitive. Restrict database permissions and never include credential values in screenshots, logs, exports, or documentation.
- Do not commit live credentials, tokens, or site-specific secrets to this repository.
- Confirm backup and retention requirements before running cleanup in a production environment.
- Validate the deployed database constraints against `sql/schema.sql` before applying schema changes.
- The ER diagram documents database relationships; it is not a substitute for reviewing the actual deployed DDL.

## 6. Intended audience

UCC operations teams, utility/site engineers, Siemens WFC administrators, application support teams, database administrators, and developers maintaining UCC Smart Tracker.

---

**UCC Smart Tracker — Centralized inventory visibility and login monitoring across Siemens WFC environments.**
