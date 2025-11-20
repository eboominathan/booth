<?php

namespace App\Http\Controllers;

use App\Models\Booth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BoothController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->hasRole('admin')) {
            $booths = Booth::with(['creator', 'boothMaster'])->latest()->paginate(20);
        } else {
            $booths = Booth::with('boothMaster')->where('created_by', $user->id)->latest()->paginate(20);
        }
        return Inertia::render('Booth/Index', [
            'booths' => $booths,
        ]);
    }

    public function create()
    {
        $boothMasters = \App\Models\BoothMaster::all();
        return Inertia::render('Booth/Create', [
            'boothMasters' => $boothMasters
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'booth_master_id' => 'required|exists:booth_masters,id',
            'name' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'mobile' => 'nullable|string|max:30|unique:booths,mobile',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('booth_photos', 'public');
        }

        $data['created_by'] = $request->user()->id;
        $booth = Booth::create($data);

        return redirect()->route('booths.index');
    }

    public function edit(Booth $booth)
    {
        $this->authorize('update', $booth);
        $boothMasters = \App\Models\BoothMaster::all();
        return Inertia::render('Booth/Edit', [
            'booth' => $booth,
            'boothMasters' => $boothMasters
        ]);
    }

    public function update(Request $request, Booth $booth)
    {
        $this->authorize('update', $booth);

        $data = $request->validate([
            'booth_master_id' => 'required|exists:booth_masters,id',
            'name'  => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'mobile' => 'nullable|string|max:30|unique:booths,mobile,' . $booth->id,
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('booth_photos', 'public');
            // delete old
            if ($booth->photo) {
                Storage::disk('public')->delete($booth->photo);
            }
            $data['photo'] = $path;
        }

        $data['updated_by'] = $request->user()->id;
        $booth->update($data);
        return redirect()->route('booths.index');
    }

    public function destroy(Booth $booth)
    {
        $this->authorize('delete', $booth);
        $booth->delete();
        return redirect()->route('booths.index');
    }
}
