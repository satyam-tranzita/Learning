import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

function App() {
    const [names, setNames] = useState([]);
    const [cursor, setCursor] = useState(0);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasMore, setHasMore] = useState(true);

    // Scroll container reference
    const parentRef = useRef(null);

    // Prevent multiple API calls
    const loadingRef = useRef(false);

    const fetchNames = async () => {
        // Prevent duplicate requests
        if (loadingRef.current || !hasMore) {
            return;
        }

        try {
            loadingRef.current = true;
            setLoading(true);
            setError("");

            const start = performance.now();

            const response = await fetch(
                `http://localhost:5000/api/names?limit=50&cursor=${cursor}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch names");
            }

            const result = await response.json();

            const end = performance.now();

            console.log(
                `API + JSON parsing: ${(end - start).toFixed(2)} ms`
            );

            // Add new names to existing names
            setNames((previousNames) => [
                ...previousNames,
                ...result.data,
            ]);

            // Update cursor
            setCursor(result.pagination.nextCursor);

            // Check whether more data exists
            setHasMore(result.pagination.hasMore);

        } catch (error) {
            console.error(error);
            setError("Failed to load names. Please try again.");
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };

    /*
     * Virtualization
     *
     * Suppose we have:
     *
     * names.length = 10,000
     *
     * The browser does NOT create 10,000 DOM nodes.
     *
     * Only the rows currently visible inside
     * the scroll container are rendered.
     */
    const rowVirtualizer = useVirtualizer({
        count: names.length,

        getScrollElement: () => parentRef.current,

        // Approximate height of each row
        estimateSize: () => 40,

        // Render a few extra rows above/below viewport
        overscan: 5,
    });

    /*
     * Infinite loading
     *
     * When user scrolls close to the bottom,
     * fetch the next 50 names.
     */
    useEffect(() => {
        const virtualItems = rowVirtualizer.getVirtualItems();


       if (virtualItems.length === 0) {
            return;
        }

        const lastItem =
            virtualItems[virtualItems.length - 1];

        if (
            lastItem.index >= names.length - 10 &&
            hasMore &&
            !loading
        ) {
            fetchNames();
        }
    }, [
        rowVirtualizer.getVirtualItems(),
        names.length,
        hasMore,
        loading,
        cursor,
    ]);

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "40px auto",
                fontFamily: "Arial",
            }}
        >
            <h1>Names Virtualization Demo</h1>

            <p>
                Total names loaded: <strong>{names.length}</strong>
            </p>

            <button
                onClick={fetchNames}
                disabled={loading || !hasMore}
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    cursor:
                        loading || !hasMore
                            ? "not-allowed"
                            : "pointer",
                }}
            >
                {loading
                    ? "Loading..."
                    : hasMore
                    ? "Load Names"
                    : "All Names Loaded"}
            </button>

            {error && (
                <p>
                    {error}
                </p>
            )}

            {/* Virtualized scroll container */}
            <div
                ref={parentRef}
                style={{
                    height: "500px",
                    overflow: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                }}
            >
                {/* 
                    This div represents the total height
                    of the entire virtual list.
                */}
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: "100%",
                        position: "relative",
                    }}
                >
                    {rowVirtualizer
                        .getVirtualItems()
                        .map((virtualItem) => {
                            const user =
                                names[virtualItem.index];

                            return (
                                <div
                                    key={virtualItem.key}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",

                                        height: `${virtualItem.size}px`,

                                        transform: `translateY(${virtualItem.start}px)`,

                                        display: "flex",
                                        alignItems: "center",

                                        padding: "0 15px",

                                        boxSizing:
                                            "border-box",

                                        borderBottom:
                                            "1px solid #eee",
                                    }}
                                >
                                    <strong>
                                        {user.name}
                                    </strong>

                                    <span
                                        style={{
                                            marginLeft:
                                                "auto",
                                            color: "#777",
                                        }}
                                    >
                                        ID: {user.id}
                                    </span>
                                </div>
                            );
                        })}
                </div>
            </div>

            {loading && (
                <p style={{ textAlign: "center" }}>
                    Loading more names...
                </p>
            )}

            {!hasMore && names.length > 0 && (
                <p style={{ textAlign: "center" }}>
                    All names loaded.
                </p>
            )}
        </div>
    );
}

export default App;
