<?php

namespace App\Http\Controllers;

use App\Models\BoothMaster;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoothMasterController extends Controller
{
    public function index()
    {
        $boothMasters = BoothMaster::latest()->paginate(20);
        return Inertia::render('BoothMaster/Index', ['boothMasters' => $boothMasters]);
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
