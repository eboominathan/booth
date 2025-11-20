import React from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Users({ users }) {
    function approve(id) {
        Inertia.post(`/admin/users/${id}/approve`);
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.data &&
                    users.data.map((u) => (
                        <li key={u.id}>
                            {u.name} ({u.email}) - Approved:{" "}
                            {u.approved ? "Yes" : "No"}
                            {!u.approved && (
                                <button onClick={() => approve(u.id)}>
                                    Approve
                                </button>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
