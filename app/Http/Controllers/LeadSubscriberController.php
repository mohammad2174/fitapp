<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Package;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadSubscriberController extends Controller
{
    public function view(Lead $lead)
    {
        $packages = Package::query()
            ->where('status','active')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Subscribers/SubscriberAdd', [
            'lead' => $lead,
            'packages' => $packages
        ]);
    }

    public function store(Request $request)
    {
        $postData = $this->validate($request, [
            'interested_package' => 'required',
            'package_id' => 'required|exists:packages,id',
            'lead_id' => 'required|exists:leads,id',
            'user_id' => 'required',
            'renewal_date' => 'required|date|date_format:"Y-m-d"',
            'amount' => 'required',
        ]);
        $package = Package::find($postData['package_id']);
        $lead = Lead::find($postData['lead_id']);

        Subscriber::create([
            'lead_id' => $postData['lead_id'],
            'user_id' => $postData['user_id'],
            'package_id' => $postData['package_id'],
            'renewal_date' => now()->addDays($package->number_of_days),
            'amount' => $package->amount,
            'name' => $lead['name'],
            'email' => $lead['email'],
            'dob' => $lead['dob'],
            'phone' => $lead['phone'],
            'branch_id' => $lead['branch_id'],
            'age' => $lead['age'],
            'added_by' => $lead['added_by'],
            'interested_package' => $postData['interested_package']
        ]);
        $lead->active = 0;
        $lead->save();
        return redirect()->route('lead.subscribe',['lead' => $lead])->with('success' , 'Subscriber added');
    }
}
