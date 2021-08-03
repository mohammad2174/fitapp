<?php

namespace Database\Seeders;

use App\Models\Lead;
use App\Models\Reminder;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class InitialDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createLeadsData();
    }

    private function createLeadsData(){
        Lead::create([
            'name' => 'ali',
            'email' => 'ali@gmail.com',
            'phone' => '9302154789',
            'interested_package' => 'any package',
            'dob' => Carbon::parse('08/09/2001'),
            'age' => Carbon::parse('08/09/2001')->age,
            'branch_id' => 1,
            'added_by' => 1,
            'user_id' => 1
        ]);

        Lead::create([
            'name' => 'amin',
            'email' => 'amin@gmail.com',
            'phone' => '9365655989',
            'interested_package' => 'more',
            'dob' => Carbon::parse('11/10/2010'),
            'age' => Carbon::parse('11/10/2010')->age,
            'branch_id' => 1,
            'added_by' => 1,
            'user_id' => 1
        ]);

        Lead::create([
            'name' => 'armin',
            'email' => 'armin@gmail.com',
            'phone' => '910659456',
            'interested_package' => 'any add',
            'dob' => Carbon::parse('09/11/2012'),
            'age' => Carbon::parse('09/11/2012')->age,
            'branch_id' => 1,
            'added_by' => 1,
            'user_id' => 1
        ]);

        Lead::create([
            'name' => 'vahid',
            'email' => 'vahid@gmail.com',
            'phone' => '911656687',
            'interested_package' => 'any',
            'dob' => Carbon::parse('03/09/2001'),
            'age' => Carbon::parse('03/09/2001')->age,
            'branch_id' => 1,
            'added_by' => 1,
            'user_id' => 1
        ]);

        Lead::create([
            'name' => 'reza',
            'email' => 'reza@gmail.com',
            'phone' => '901656687',
            'interested_package' => 'any package1',
            'dob' => Carbon::parse('08/12/2015'),
            'age' => Carbon::parse('08/12/2015')->age,
            'branch_id' => 1,
            'added_by' => 1,
            'user_id' => 1
        ]);

        Reminder::create([
            'lead_id' => 2,
            'user_id' => 1,
            'reminder' => 'a reminder',
            'reminder_date' => Carbon::now()->addDays(2),
            'note' => 'not interested',
            'status' => 'completed',
        ]);

        Reminder::create([
            'lead_id' => 4,
            'user_id' => 1,
            'reminder' => 'a reminder',
            'reminder_date' => Carbon::now()->addDays(2),
            'note' => 'not interested',
            'status' => 'pending',
        ]);

        Reminder::create([
            'lead_id' => 5,
            'user_id' => 1,
            'reminder' => 'call to check',
            'reminder_date' => Carbon::now()->addDays(3),
            'note' => 'not interested',
            'status' => 'completed',
        ]);
    }
}
