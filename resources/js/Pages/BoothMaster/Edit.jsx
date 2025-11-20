import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Select from "react-select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ boothMaster }) {
    const { data, setData, put, processing, errors } = useForm({
        booth_no: boothMaster.booth_no || "",
        name: boothMaster.name || "",
    });
    function handleSubmit(e) {
        e.preventDefault();
        put(route("booth-masters.update", boothMaster.id));
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Booth Master
                </h2>
            }
        >
            <Head title="Edit Booth Master" />
            <div className="max-w-xl mx-auto mt-10">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-1 font-medium">
                                Booth No
                            </label>
                            <input
                                name="booth_no"
                                value={data.booth_no}
                                onChange={(e) =>
                                    setData("booth_no", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                autoComplete="off"
                            />
                            {errors.booth_no && (
                                <div className="text-red-500 text-sm">
                                    {errors.booth_no}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Name
                            </label>
                            <input
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            disabled={processing}
                        >
                            Update
                        </button>
                        <Link
                            href={route("booth-masters.index")}
                            className="ml-4 text-blue-600"
                        >
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
