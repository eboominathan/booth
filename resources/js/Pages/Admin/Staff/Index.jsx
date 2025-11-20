import React from "react";
import { Link, usePage, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ staff }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Staff
                </h2>
            }
        >
            <Head title="Staff" />
            <div className="max-w-4xl mx-auto mt-10">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Staff List</h3>
                        <Link
                            href={route("admin.staff.create")}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Add Staff
                        </Link>
                    </div>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Photo</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.data.map((user) => (
                                <tr key={user.id}>
                                    <td className="border px-4 py-2">
                                        {user.id}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user.email}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user.photo ? (
                                            <img
                                                src={"/storage/" + user.photo}
                                                alt="Staff"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span>No Photo</span>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <Link
                                            href={route(
                                                "admin.staff.edit",
                                                user.id
                                            )}
                                            className="btn btn-sm btn-secondary mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "admin.staff.destroy",
                                                user.id
                                            )}
                                            className="btn btn-sm btn-danger"
                                            onClick={(e) => {
                                                if (!confirm("Delete?"))
                                                    e.preventDefault();
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="mt-4">
                        {staff.links &&
                            staff.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || "#"}
                                    className={link.active ? "font-bold" : ""}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
