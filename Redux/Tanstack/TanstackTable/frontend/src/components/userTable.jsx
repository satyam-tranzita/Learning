import { useState } from "react";

import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender
} from "@tanstack/react-table";

function UserTable({ data }) {

    // Stores current sorting state
    const [sorting, setSorting] = useState([]);

    const columns = [
        {
            accessorKey: "id",
            header: "ID"
        },

        {
            accessorKey: "name",
            header: "Name"
        },

        {
            accessorKey: "email",
            header: "Email"
        },

        {
            accessorKey: "role",
            header: "Role"
        },

        {
            accessorKey: "status",
            header: "Status"
        }
    ];

    const table = useReactTable({
        data,
        columns,

        // Tell TanStack Table about our controlled state
        state: {
            sorting
        },

        // Update sorting state when sorting changes
        onSortingChange: setSorting,

        // Basic row model
        getCoreRowModel: getCoreRowModel(),

        // Enable sorting
        getSortedRowModel: getSortedRowModel()
    });

    return (
        <table>

            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>

                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                onClick={
                                    header.column
                                        .getToggleSortingHandler()
                                }
                            >

                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}

                                {header.column.getIsSorted() === "asc"
                                    ? " ↑"
                                    : header.column.getIsSorted() === "desc"
                                    ? " ↓"
                                    : ""}

                            </th>
                        ))}

                    </tr>
                ))}
            </thead>

            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>

                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>

                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}

                            </td>
                        ))}

                    </tr>
                ))}
            </tbody>

        </table>
    );
}

export default UserTable;