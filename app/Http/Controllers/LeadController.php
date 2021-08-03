<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\Package;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $packages = Package::active()->get();

        $package = null;
        $search = false;
        if($request->has('role') && $request->input('role') != 0 ){
            $package = Package::findOrFail($request->input('role'));
        }
        if($request->has('search') && $request->input('search') != '' ){
            $search = true;
        }
        $leads = Lead::query()->where('user_id', \auth()->id())->where('branch_id',1)->where('active',1)
            ->when($search, function($query) use ($request){
                $query->where('name','like',"%{$request->input('search')}%")
                    ->orWhere('email','like',"%{$request->input('search')}%")
                    ->where('user_id', \auth()->id());
            })
            ->when($package != null, function($query) use ($package){
                $query->where('interested_package', $package->name);
            })
            ->orderByDesc('id')->paginate(10);
        return Inertia::render('Leads/Index', [
            'leads' => $leads,
            'packages' => $packages,
            'filters' => $request->all('search', 'role'),
        ]);
    }

    public function create()
    {
        $packages = Package::active()->get();
        return Inertia::render('Leads/LeadAdd', [
            'packages' => $packages,
        ]);
    }

    public function store(Request $request)
    {
        $postData = $this->validate($request, [
            'fname' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'dob' => 'required|date',
            'interested_package' => 'sometimes',
        ]);

        $package = '';
        if($request->has('package')){
            $package = $request->input('package');
        }

        $dob = Carbon::parse($postData['dob']);
        $age = $dob->age;
        Lead::create([
            'user_id' => $request->id,
            'name' => $postData['fname'],
            'email' => $postData['email'],
            'phone' => $postData['phone'],
            'dob' => $dob,
            'branch_id' => 1,
            'age' => $age,
            'added_by' => Auth::user()->getAuthIdentifier(),
            'interested_package' => $package,
        ]);
        return redirect()->route('lead.list')->with('success' , 'User created');
    }

    public function view(Lead $lead)
    {
        $lead->load(['reminders']);
        $packages = Package::active()->get();
        return Inertia::render('Leads/LeadView', [
            'leadProp' => $lead,
            'packages' => $packages,
        ]);
    }

    public function update(Request $request)
    {
        $postData = $this->validate($request, [
            'id' => 'required|exists:leads',
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'dob' => 'required|date',
            'interested_package' => 'sometimes',
        ]);
        $postData['age'] = Carbon::parse($postData['dob'])->age;
        $lead = Lead::where('id', $postData['id'])->update($postData);
        return redirect()->route('lead.view', ['lead' => $postData['id']])->with('success' , 'User updated');
    }
}
