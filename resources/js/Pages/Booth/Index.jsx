import { Link, Head, router } from "@inertiajs/react";
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
            <div className="w-full mx-auto mt-10 max-w-7xl">
                <div className="p-8 bg-white rounded-lg shadow-md">
                    <div className="flex items-center gap-2">
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search..."
                            defaultValue={booths.search || ""}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    router.get("/booths", {
                                        search: e.target.value,
                                    });
                                }
                            }}
                            className="w-64 px-3 py-2 border rounded-md"
                            id="searchBox"
                        />

                        {/* Clear Search */}
                        <button
                            onClick={() => {
                                document.getElementById("searchBox").value = "";
                                router.get("/booths");
                            }}
                            className="px-3 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
                        >
                            Clear
                        </button>

                        {/* Export to Excel */}
                        <a
                            href="/booths/export"
                            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                        >
                            Export Excel
                        </a>

                        {/* Create Button */}
                        <Link
                            href="/booths/create"
                            className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Create Booth
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">#</th>
                                    <th className="px-4 py-2 border">
                                        BoothNo
                                    </th>
                                    <th className="px-4 py-2 border">Place</th>
                                    <th className="px-4 py-2 border">Image</th>
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">PartNo</th>
                                    <th className="px-4 py-2 border">
                                        MobileNumber
                                    </th>
                                    <th className="px-4 py-2 border">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {booths.data && booths.data.length > 0 ? (
                                    booths.data.map((b, idx) => (
                                        <tr key={b.id}>
                                            <td className="px-4 py-2 border">
                                                {idx +
                                                    1 +
                                                    (booths.current_page - 1) *
                                                        booths.per_page}
                                            </td>
                                            <td className="px-4 py-2 font-semibold text-blue-900 border">
                                                {b.booth_master
                                                    ? `${b.booth_master.booth_no}`
                                                    : ""}
                                            </td>
                                            <td className="px-4 py-2 font-semibold text-blue-900 border">
                                                {b.booth_master
                                                    ? `${b.booth_master.name}`
                                                    : ""}
                                            </td>
                                            <img
                                                src={`/storage/${b.photo}`}
                                                alt="Booth Photo"
                                                className="object-cover w-12 h-12 border rounded-full"
                                            />

                                            <td className="px-4 py-2 font-semibold text-blue-900 border">
                                                {b.name ? `${b.name}` : ""}
                                            </td>
                                            <td className="px-4 py-2 font-semibold text-blue-900 border">
                                                {b.part_no
                                                    ? `${b.part_no}`
                                                    : ""}
                                            </td>
                                            <td className="px-4 py-2 font-semibold text-blue-900 border">
                                                {b.mobile ? `${b.mobile}` : ""}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={
                                                            "/booths/" +
                                                            b.id +
                                                            "/edit"
                                                        }
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
                                                    <Link
                                                        as="button"
                                                        method="delete"
                                                        href={"/booths/" + b.id}
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
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="py-4 text-center"
                                        >
                                            No booths found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="flex flex-wrap gap-2 mt-4">
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
