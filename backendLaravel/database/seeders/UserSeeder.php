<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'first_name' => 'Ádám',
            'last_name' => 'Várhegyi-Milos',
            'email' => 'avarhegyi@mechapp.hu',
            'password' => Hash::make('Adamjelszo123'),
            'role' => 3,
        ]);
        DB::table('users')->insert([
            'first_name' => 'Albert',
            'last_name' => 'Csabai',
            'email' => 'csabaialbert@mechapp.hu',
            'password' => Hash::make('Albertjelszo123'),
            'role' => 3,
        ]);
        DB::table('users')->insert([
            'first_name' => 'Krisztián',
            'last_name' => 'Zellei',
            'email' => 'zelleikrisztian@mechapp.hu',
            'password' => Hash::make('Krisztianjelszo123'),
            'role' => 3,
        ]);
        DB::table('users')->insert([
            'first_name' => 'Csaba',
            'last_name' => 'Kanta',
            'email' => 'kantacsaba@mechapp.hu',
            'password' => Hash::make('Csabajelszo123'),
            'role' => 3,
        ]);
        DB::table('users')->insert([
            'first_name' => 'Ákos',
            'last_name' => 'Regéczy',
            'email' => 'regeczyakos@mechapp.hu',
            'password' => Hash::make('Akosjelszo123'),
            'role' => 3,
        ]);

    }
}
