import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Select from "react-select";

export default function Edit({ booth, boothMasters = [] }) {
    const [form, setForm] = useState({
        booth_master_id: booth.booth_master_id || "",
        name: booth.name,
        place: booth.place,
        mobile: booth.mobile,
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
        put(route("booths.update", booth.id));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Booth
                </h2>
            }
        >
            <Head title="Edit Booth" />
            <div className="max-w-xl mx-auto mt-10">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <form
                        onSubmit={submit}
                        encType="multipart/form-data"
                        className="space-y-4"
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
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
