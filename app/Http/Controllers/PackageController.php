<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    protected $rules;

    public function __construct()
    {
        $this->rules = [
          'name' => 'required',
          'amount' => 'required|numeric|min:1',
          'number_of_days' => 'required|min:1',
        ];
    }

    public function index()
    {
        $packages = Package::query()
        ->where('status', 'active')
        ->where('user_id', '1')
        ->orderBy('number_of_days', 'asc')
        ->get();

        return Inertia::render('Packages/Index', [
            'activePackages' => $packages
        ]);
    }

    public function store(Request $request)
    {
        $postData = $this->validate($request, $this->rules);
        $postData['status'] = 'active';
        $postData['user_id'] = $request->user()->id;
        Package::create($postData);
        return redirect()->route('package.list');
    }

    public function view(Package $package)
    {
        return Inertia::render('Packages/PackageView', [
            'packages' => $package
        ]);
    }

    public function update(Request $request)
    {
        $rules = $this->rules;
        $postData = $this->validate($request, $rules);
        $package = Package::find($request->id);
        $package->name = $postData['name'];
        $package->amount = $postData['amount'];
        $package->number_of_days = $postData['number_of_days'];
        $package->save();
        return redirect()->route('package.list');
    }
}
