import React, { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ boothMasters, filters }) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("booth-masters.index"),
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Booth Master</h2>}
        >
            <Head title="Booth Master" />

            <div className="max-w-4xl mx-auto mt-10">
                <div className="p-8 bg-white rounded-lg shadow-md">
                    {/* SEARCH BOX */}
                    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Search booth no or name..."
                            className="w-full px-3 py-2 border rounded"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Search
                        </button>
                    </form>

                    {/* ADD BUTTON */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Booth Master List</h3>
                        <Link
                            href={route("booth-masters.create")}
                            className="px-4 py-2 text-white bg-blue-600 rounded"
                        >
                            Add Booth
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="px-3 py-2">#</th>
                                    <th className="px-3 py-2">Booth No</th>
                                    <th className="px-3 py-2">Booth Name</th>
                                    <th className="px-3 py-2">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {boothMasters.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="p-4 text-center"
                                        >
                                            No data found
                                        </td>
                                    </tr>
                                )}

                                {boothMasters.data.map((booth, index) => (
                                    <tr key={booth.id} className="border-t">
                                        <td className="px-3 py-2">
                                            {index + 1}
                                        </td>
                                        <td className="px-3 py-2">
                                            {booth.booth_no}
                                        </td>
                                        <td className="px-3 py-2">
                                            {booth.name}
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="flex gap-2">
                                                {/* EDIT BUTTON */}
                                                <Link
                                                    href={route(
                                                        "booth-masters.edit",
                                                        booth.id
                                                    )}
                                                    className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white transition bg-yellow-400 rounded hover:bg-yellow-500"
                                                    title="Edit"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L5 12.828a2 2 0 010-2.828L9 13z"
                                                        />
                                                    </svg>
                                                    Edit
                                                </Link>

                                                {/* DELETE BUTTON */}
                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    href={route(
                                                        "booth-masters.destroy",
                                                        booth.id
                                                    )}
                                                    className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white transition bg-red-500 rounded hover:bg-red-600"
                                                    title="Delete"
                                                    onClick={(e) => {
                                                        if (
                                                            !confirm(
                                                                "Delete this booth?"
                                                            )
                                                        )
                                                            e.preventDefault();
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                    Delete
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {boothMasters.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                className={
                                    `px-3 py-1 rounded border text-xs ` +
                                    (link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-blue-600 border-blue-200 hover:bg-blue-100")
                                }
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
