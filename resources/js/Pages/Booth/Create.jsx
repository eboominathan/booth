import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Select from "react-select";

export default function Create({ boothMasters = [] }) {
    const [form, setForm] = useState({
        booth_master_id: "",
        place: "",
        mobile: "",
        photo: null,
    });

    function handleChange(e) {
        const { name, value, files } = e.target;
        if (files) return setForm({ ...form, [name]: files[0] });
        setForm({ ...form, [name]: value });
    }

    function submit(e) {
        e.preventDefault();
        const data = new FormData();
        Object.keys(form).forEach((key) => {
            if (form[key] !== null) data.append(key, form[key]);
        });
        Inertia.post("/booths", data);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Booth
                </h2>
            }
        >
            <Head title="Create Booth" />
            <div className="max-w-xl mx-auto mt-10">
                <div className="bg-white shadow-lg rounded-xl p-8 relative overflow-hidden">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-500 text-white rounded-full p-3 mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
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
                            <h2 className="text-2xl font-bold text-blue-800">
                                Create Booth
                            </h2>
                            <div className="text-gray-500 text-sm">
                                Fill in the details to add a new booth
                            </div>
                        </div>
                    </div>
                    <form
                        onSubmit={submit}
                        encType="multipart/form-data"
                        className="space-y-5"
                    >
                        <div>
                            <label className="block mb-1 font-medium">
                                Booth Number & Name
                            </label>
                            <Select
                                name="booth_master_id"
                                options={boothMasters.map((bm) => ({
                                    value: bm.id,
                                    label: `${bm.booth_no} - ${bm.name}`,
                                }))}
                                value={
                                    boothMasters
                                        .map((bm) => ({
                                            value: bm.id,
                                            label: `${bm.booth_no} - ${bm.name}`,
                                        }))
                                        .find(
                                            (opt) =>
                                                opt.value ===
                                                form.booth_master_id
                                        ) || null
                                }
                                onChange={(opt) =>
                                    setForm({
                                        ...form,
                                        booth_master_id: opt ? opt.value : "",
                                    })
                                }
                                isClearable
                                placeholder="Select Booth"
                                classNamePrefix="react-select"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Name
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Place
                            </label>
                            <input
                                name="place"
                                value={form.place}
                                onChange={handleChange}
                                placeholder="Place"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Mobile
                            </label>
                            <input
                                name="mobile"
                                value={form.mobile}
                                onChange={handleChange}
                                placeholder="Mobile"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Photo
                            </label>
                            <input
                                type="file"
                                name="photo"
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition"
                        >
                            <span className="inline-flex items-center">
                                <svg
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Create Booth
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
