import React from "react";
import { Link as InertiaLink } from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <div>
            <h1>Staff Dashboard</h1>
            <p>Welcome, staff.</p>
            <InertiaLink href="/booths">My Booths</InertiaLink>
        </div>
    );
}
