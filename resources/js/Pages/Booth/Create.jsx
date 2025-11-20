import React, { useState } from "react";
import { router, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Select from "react-select";
import toast from "react-hot-toast";

export default function Create({ boothMasters = [] }) {
    const [form, setForm] = useState({
        booth_master_id: "",
        name: "",
        mobile: "",
        photo: null,
    });

    function handleChange(e) {
        const { name, value, files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    }

    function submit(e) {
        e.preventDefault();

        if (!form.booth_master_id) {
            toast.error("Please select a booth");
            return;
        }

        const data = new FormData();
        Object.keys(form).forEach((key) => {
            if (form[key] !== null) data.append(key, form[key]);
        });

        router.post("/booths", data, {
            forceFormData: true, // 🔥 required for file upload
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Booth Created Successfully!");

                // Reset form fields
                setForm({
                    booth_master_id: "",
                    name: "",
                    mobile: "",
                    photo: null,
                });
            },
            onError: (errors) => {
                const first =
                    Object.values(errors)[0] || "Failed to create booth";
                toast.error(first);
            },
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Booth Level Agent
                </h2>
            }
        >
            <Head title="Create Booth" />
            <div className="max-w-xl mx-auto mt-10">
                <div className="relative p-8 overflow-hidden bg-white shadow-lg rounded-xl">
                    <form
                        onSubmit={submit}
                        encType="multipart/form-data"
                        className="space-y-5"
                    >
                        {/* Booth Master */}
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
                                        booth_master_id: opt?.value || "",
                                    })
                                }
                                isClearable
                                placeholder="Select Booth"
                            />
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Name
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Mobile
                            </label>
                            <input
                                name="mobile"
                                value={form.mobile}
                                onChange={handleChange}
                                placeholder="Mobile"
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>

                        {/* Photo */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Photo
                            </label>
                            <input
                                type="file"
                                name="photo"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 font-semibold text-white transition rounded-lg shadow bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                        >
                            Create Booth Level Agent
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
