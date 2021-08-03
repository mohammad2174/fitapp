<?php

namespace App\Console\Commands;

use App\Mail\ReminderEmailDigest;
use App\Models\Reminder;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendReminderEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reminder:emails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email notification to user about reminders.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $reminders = Reminder::with(['lead'])
        ->orderBy('user_id')
        ->where('status', 'pending')
        ->get();

        $data = [];
        foreach ($reminders as $reminder){
            $data[$reminder->user_id][] = $reminder->toArray();
        }

        foreach ($data as $userId => $reminders){
            $this->sendEmailToUser($userId, $reminders);
        }

    }

    private function sendEmailToUser($userId, $reminders){
        $user = User::find($userId);
        Mail::to($user)->send(new ReminderEmailDigest($reminders));
    }
}
