<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        $staff = User::role('staff')->latest()->paginate(20);
        return Inertia::render('Admin/Staff/Index', ['staff' => $staff]);
    }

    public function create()
    {
        return Inertia::render('Admin/Staff/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('staff_photos', 'public');
        }

        $data['password'] = Hash::make($data['password']);
        $data['approved'] = true;
        $user = User::create($data);
        if (method_exists($user, 'assignRole')) {
            $user->assignRole('staff');
        }
        return redirect()->route('admin.staff.index');
    }

    public function edit(User $staff)
    {
        return Inertia::render('Admin/Staff/Edit', ['staff' => $staff]);
    }

    public function update(Request $request, User $staff)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $staff->id,
            'password' => 'nullable|string|min:6|confirmed',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            if ($staff->photo) {
                Storage::disk('public')->delete($staff->photo);
            }
            $data['photo'] = $request->file('photo')->store('staff_photos', 'public');
        }
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $staff->update($data);
        return redirect()->route('admin.staff.index');
    }

    public function destroy(User $staff)
    {
        if ($staff->photo) {
            Storage::disk('public')->delete($staff->photo);
        }
        $staff->delete();
        return redirect()->route('admin.staff.index');
    }
}
