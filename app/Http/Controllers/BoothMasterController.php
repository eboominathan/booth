<?php

namespace App\Http\Controllers;

use App\Models\BoothMaster;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoothMasterController extends Controller
{
   public function index(Request $request)
{
    $search = $request->input('search');

    $query = BoothMaster::query();

    if (!empty($search)) {
        $query->where(function ($q) use ($search) {
            $q->whereRaw("name COLLATE utf8mb4_unicode_ci LIKE ?", ["%{$search}%"])
              ->orWhereRaw("booth_no COLLATE utf8mb4_unicode_ci LIKE ?", ["%{$search}%"]);
        });
    }

    $boothMasters = $query->latest()->paginate(20)->withQueryString();

    return Inertia::render('BoothMaster/Index', [
        'boothMasters' => $boothMasters,
        'filters'      => ['search' => $search],
    ]);
}


    public function create()
    {
        return Inertia::render('BoothMaster/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'booth_no' => 'required|string|max:50|unique:booth_masters,booth_no',
            'name' => 'required|string|max:255',
        ]);
        BoothMaster::create($data);
        return redirect()->route('booth-masters.index');
    }

    public function edit(BoothMaster $boothMaster)
    {
        return Inertia::render('BoothMaster/Edit', ['boothMaster' => $boothMaster]);
    }

    public function update(Request $request, BoothMaster $boothMaster)
    {
        $data = $request->validate([
            'booth_no' => 'required|string|max:50|unique:booth_masters,booth_no,' . $boothMaster->id,
            'name' => 'required|string|max:255',
        ]);
        $boothMaster->update($data);
        return redirect()->route('booth-masters.index');
    }

    public function destroy(BoothMaster $boothMaster)
    {
        $boothMaster->delete();
        return redirect()->route('booth-masters.index');
    }
}