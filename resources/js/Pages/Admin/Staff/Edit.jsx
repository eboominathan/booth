import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";

export default function Edit({ staff }) {
    const { data, setData, put, processing, errors } = useForm({
        name: staff.name || "",
        email: staff.email || "",
        password: "",
        password_confirmation: "",
        photo: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("admin.staff.update", staff.id));
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Staff</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label>Name</label>
                    <input
                        type="text"
                        className="input"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && (
                        <div className="text-red-500">{errors.name}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label>Email</label>
                    <input
                        type="email"
                        className="input"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors.email && (
                        <div className="text-red-500">{errors.email}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label>Password (leave blank to keep current)</label>
                    <input
                        type="password"
                        className="input"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    {errors.password && (
                        <div className="text-red-500">{errors.password}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="input"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                </div>
                <div className="mb-4">
                    <label>Photo</label>
                    <input
                        type="file"
                        className="input"
                        onChange={(e) => setData("photo", e.target.files[0])}
                    />
                    {staff.photo && (
                        <div className="mt-2">
                            <img
                                src={"/storage/" + staff.photo}
                                alt="Staff"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>
                    )}
                    {errors.photo && (
                        <div className="text-red-500">{errors.photo}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={processing}
                >
                    Update
                </button>
                <Link
                    href={route("admin.staff.index")}
                    className="btn btn-secondary ml-2"
                >
                    Cancel
                </Link>
            </form>
        </div>
    );
}
