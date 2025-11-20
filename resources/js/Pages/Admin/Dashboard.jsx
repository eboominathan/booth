import React from "react";
import { Link as InertiaLink } from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, admin.</p>
            <InertiaLink href="/booths">Manage Booths</InertiaLink>
        </div>
    );
}
