<?php

namespace App\Http\Controllers;

use App\Exports\BoothsExport;
use App\Models\Booth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;


class BoothController extends Controller
{
  public function index(Request $request)
{
    $user = $request->user();
    $search = $request->input('search');

    $query = Booth::with(['creator', 'boothMaster']);

    // If not admin → restrict user-specific booths
    if (!$user->hasRole('admin')) {
        $query->where('created_by', $user->id);
    }

    // Apply Search
    if (!empty($search)) {
        $query->where(function ($q) use ($search) {
            $q->where('name', 'LIKE', "%{$search}%")
              ->orWhere('mobile', 'LIKE', "%{$search}%")              
              ->orWhereHas('boothMaster', function ($bm) use ($search) {
                  $bm->where('booth_no', 'LIKE', "%{$search}%")
                     ->orWhere('name', 'LIKE', "%{$search}%");
              });
        });
    }

    $booths = $query->latest()->paginate(20)->withQueryString();

    return Inertia::render('Booth/Index', [
        'booths' => $booths,
        'search' => $search,
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
    try {
        $data = $request->validate([
            'booth_master_id' => 'required|exists:booth_masters,id',
            'name' => 'required|string|max:255',         
            'mobile' => 'nullable|string|max:30|unique:booths,mobile',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('booth_photos', 'public');
        }

        $data['created_by'] = $request->user()->id;

        Booth::create($data);

        // Success toast message
        return redirect()->back()->with("success", "Booth Level Agent created successfully!");

     } catch (\Throwable $e) {
    return redirect()->back()->withErrors([
        'error' => $e->getMessage()
    ]);
}
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
    public function export()
{
      return Excel::download(new BoothsExport, 'booths.xlsx');
}
}