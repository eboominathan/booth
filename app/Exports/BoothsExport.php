<?php

namespace App\Exports;

use App\Models\Booth;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class BoothsExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    public function collection()
    {
        return Booth::with('boothMaster')->get()->map(function ($b) {
            return [
                'Booth No' => $b->boothMaster?->booth_no,
                'Place' => $b->boothMaster?->name,
                'Name' => $b->name,
                'Part No' => $b->part_no,
                'Mobile' => $b->mobile,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Booth No',
            'Place',
            'Name',
            'Part No',
            'Mobile',
        ];
    }
}