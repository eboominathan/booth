<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BoothMasterSeeder extends Seeder
{
    public function run()
    {
        $data = [
            // IMAGE 2
            ['from' => 22, 'to' => 27, 'name' => 'செம்மாண்டம்பாளையம் ஊராட்சி'],
            ['from' => 66, 'to' => 70, 'name' => 'கரவளிமாதப்பூர் ஊராட்சி'],
            ['from' => 71, 'to' => 75, 'name' => 'இராசிபாளையம் ஊராட்சி'],
            ['from' => 145, 'to' => 172, 'name' => 'சூலூர் பேரூராட்சி'],
            ['from' => 173, 'to' => 186, 'name' => 'கண்ணம்பாளையம் பேரூராட்சி'],
            ['from' => 187, 'to' => 196, 'name' => 'பள்ளபாளையம் பேரூராட்சி'],
            ['from' => 197, 'to' => 206, 'name' => 'பட்டணம ஊராட்சி'],

            // IMAGE 1
            ['from' => 207, 'to' => 212, 'name' => 'பீடம்பள்ளி ஊராட்சி'],
            ['from' => 213, 'to' => 218, 'name' => 'கலங்கல் ஊராட்சி'],
            ['from' => 219, 'to' => 224, 'name' => 'காங்கேயம்பாளையம் ஊராட்சி'],
            ['from' => 225, 'to' => 233, 'name' => 'காடாம்பாடி ஊராட்சி'],
            ['from' => 234, 'to' => 249, 'name' => 'சாமளாபுரம் பேரூராட்சி'],
        ];

        foreach ($data as $item) {
            for ($i = $item['from']; $i <= $item['to']; $i++) {

                DB::table('booth_masters')->updateOrInsert(
                    ['booth_no' => $i], // match condition
                    [
                        'name'       => $item['name'],
                        'updated_at' => now(),
                        'created_at' => now(), // only applied if new
                    ]
                );

            }
        }
    }
}