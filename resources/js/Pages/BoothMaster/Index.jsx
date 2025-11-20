import React from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ boothMasters }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Booth Master
                </h2>
            }
        >
            <Head title="Booth Master" />
            <div className="max-w-2xl mx-auto mt-10">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Booth Master List</h3>
                        <Link
                            href={route("booth-masters.create")}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Add Booth
                        </Link>
                    </div>
                    <ul>
                        {boothMasters.data &&
                            boothMasters.data.map((b) => (
                                <li
                                    key={b.id}
                                    className="py-2 border-b last:border-b-0 flex items-center justify-between"
                                >
                                    <div>
                                        <span className="font-semibold text-blue-900">
                                            {b.booth_no}
                                        </span>{" "}
                                        - {b.name}
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route(
                                                "booth-masters.edit",
                                                b.id
                                            )}
                                            className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs font-semibold transition"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "booth-masters.destroy",
                                                b.id
                                            )}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-semibold transition"
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        "Delete this booth?"
                                                    )
                                                )
                                                    e.preventDefault();
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
