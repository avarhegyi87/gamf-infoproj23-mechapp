<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CustomerController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
         /*if ( Auth::id() != 2 && Auth::user()->role != 3 && && Auth::user()->role != 4) {
            return abort(403);
        }*/

        // validate form data
        $formFields = $request->validate([
            'name' => ['required', 'min:3', 'max:40'],
            'country' => ['required', 'min:3', 'max:16'],
            'postcode' => ['required'],
            'street' => ['required', 'min:3', 'max:25'],
            'houseNumber' => ['required', 'min:1', 'max:5'],
            'email' => ['required', 'email'],
            'phoneNumber' => ['required'],
            'taxNumber' => ['required', 'size:11'],
        ]);

        Customer::create($formFields);

        return response()->json("Succesfully created");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/
        
        $formFields = $request->validate([
            'name' => ['required', 'min:3', 'max:40'],
            'country' => ['required', 'min:3', 'max:16'],
            'postcode' => ['required'],
            'street' => ['required', 'min:3', 'max:25'],
            'houseNumber' => ['required', 'min:1', 'max:5'],
            'email' => ['required', 'email'],
            'phoneNumber' => ['required'],
            'taxNumber' => ['required', 'size:11'],
        ]);

        $customer->update($formFields);

        return response()->json('Successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        $customer = Customer::findOrFail($id);
        /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/
        $customer->delete();

        return response()->json('Successfully deleted');
    }

    public function get(Customer $customer)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 && && Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json($customer);
    }

    public function getAll()
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 && && Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json(Customer::get());
    }
}
