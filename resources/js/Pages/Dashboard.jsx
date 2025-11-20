import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Booths Card */}
                        <a
                            href={route("booths.index")}
                            className="block rounded-lg shadow-lg bg-gradient-to-br from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 p-8 transition-all border border-blue-200"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-500 text-white rounded-full p-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 7h18M3 12h18M3 17h18"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-blue-900">
                                        Booth Management
                                    </div>
                                    <div className="text-sm text-blue-700">
                                        View, create, and manage booths
                                    </div>
                                </div>
                            </div>
                        </a>
                        {/* Staff Card: only for admin */}
                        {user && user.roles && user.roles.includes("admin") && (
                            <a
                                href={route("admin.staff.index")}
                                className="block rounded-lg shadow-lg bg-gradient-to-br from-green-100 to-green-50 hover:from-green-200 hover:to-green-100 p-8 transition-all border border-green-200"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-green-500 text-white rounded-full p-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-lg font-semibold text-green-900">
                                            Staff Management
                                        </div>
                                        <div className="text-sm text-green-700">
                                            View, create, and manage staff
                                        </div>
                                    </div>
                                </div>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
