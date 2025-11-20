import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Index({ booths }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Booths
                </h2>
            }
        >
            <Head title="Booths" />
            <div className="max-w-4xl mx-auto mt-10">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Booth List</h3>
                        <Link
                            href="/booths/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Create Booth
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">#</th>
                                    <th className="border px-4 py-2">
                                        Booth Number & Name
                                    </th>
                                    <th className="border px-4 py-2">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {booths.data && booths.data.length > 0 ? (
                                    booths.data.map((b, idx) => (
                                        <tr key={b.id}>
                                            <td className="border px-4 py-2">
                                                {idx +
                                                    1 +
                                                    (booths.current_page - 1) *
                                                        booths.per_page}
                                            </td>
                                            <td className="border px-4 py-2 font-semibold text-blue-900">
                                                {b.booth_master
                                                    ? `${b.booth_master.booth_no} - ${b.booth_master.name}`
                                                    : ""}
                                            </td>
                                            <td className="border px-4 py-2">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={
                                                            "/booths/" +
                                                            b.id +
                                                            "/edit"
                                                        }
                                                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs font-semibold transition flex items-center gap-1"
                                                        title="Edit"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4"
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
                                                    <Link
                                                        as="button"
                                                        method="delete"
                                                        href={"/booths/" + b.id}
                                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-semibold transition flex items-center gap-1"
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
                                                            className="h-4 w-4"
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
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="text-center py-4"
                                        >
                                            No booths found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {booths.links &&
                            booths.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || "#"}
                                    className={
                                        `px-3 py-1 rounded border text-xs ` +
                                        (link.active
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white text-blue-600 border-blue-200 hover:bg-blue-100")
                                    }
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
