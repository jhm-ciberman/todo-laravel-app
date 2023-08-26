<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::each(function (User $user) {
            $user->tasks()->createMany(
                Task::factory(10)->make()->toArray()
            );
        });
    }
}
