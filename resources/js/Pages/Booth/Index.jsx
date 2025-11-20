import { Link, Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ booths }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Booth Level Agents
                </h2>
            }
        >
            <Head title="Booths" />

            <div className="w-full mx-auto mt-10 max-w-7xl">
                <div className="p-8 bg-white rounded-lg shadow-md">
                    {/* Search / Buttons */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
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

                        <button
                            onClick={() => {
                                document.getElementById("searchBox").value = "";
                                router.get("/booths");
                            }}
                            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
                        >
                            Clear
                        </button>

                        <a
                            href="/booths/export"
                            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                        >
                            Export Excel
                        </a>

                        <Link
                            href="/booths/create"
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Create Booth
                        </Link>
                    </div>

                    {/* Total Records */}
                    <div className="mb-2 text-sm text-gray-700">
                        Showing <b>{booths.from}</b> to <b>{booths.to}</b> of{" "}
                        <b>{booths.total}</b> records
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left border">
                                        #
                                    </th>
                                    <th className="px-4 py-2 text-left border">
                                        Booth No & Place
                                    </th>
                                    <th className="px-4 py-2 text-left border">
                                        Name
                                    </th>
                                    <th className="px-4 py-2 text-left border">
                                        Mobile
                                    </th>
                                    <th className="px-4 py-2 text-left border">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {booths.data?.length > 0 ? (
                                    booths.data.map((b, idx) => (
                                        <tr
                                            key={b.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-2 border">
                                                {idx +
                                                    1 +
                                                    (booths.current_page - 1) *
                                                        booths.per_page}
                                            </td>

                                            <td className="px-4 py-2 font-semibold text-blue-900 border">
                                                {b.booth_master?.booth_no} -{" "}
                                                {b.booth_master?.name}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={
                                                            b.photo
                                                                ? `/storage/${b.photo}`
                                                                : "/images/profile.jpg"
                                                        }
                                                        className="object-cover w-12 h-12 border rounded-full"
                                                        alt=""
                                                    />
                                                    <span className="font-semibold text-blue-900">
                                                        {b.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-4 py-2 font-semibold text-blue-900 border">
                                                {b.mobile}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/booths/${b.id}/edit`}
                                                        className="px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <Link
                                                        as="button"
                                                        method="delete"
                                                        href={`/booths/${b.id}`}
                                                        className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                                                        onClick={(e) => {
                                                            if (
                                                                !confirm(
                                                                    "Delete this booth?"
                                                                )
                                                            ) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
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
                        {booths.links?.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || "#"}
                                className={
                                    `px-3 py-1 rounded border text-xs ` +
                                    (link.active
                                        ? "bg-blue-600 text-white border-blue-600"
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
