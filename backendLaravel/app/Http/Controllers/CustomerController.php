<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $validator =  Validator::make($request->all(), [
            'name' => ['required'],
            'country' => ['required'],
            'city' => ['required'],
            'postcode' => ['required'],
            'street' => ['required'],
            'houseNumber' => ['required'],
            'email' => ['required', 'email'],
            'phoneNumber' => ['required'],
            'taxNumber' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 400);
        } else {
            Customer::create($request->all());
            return response()->json('Successfully added');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Customer $customer)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/

        $validator =  Validator::make($request->all(), [
            'name' => ['required'],
            'country' => ['required'],
            'city' => ['required'],
            'postcode' => ['required'],
            'street' => ['required'],
            'houseNumber' => ['required'],
            'email' => ['required', 'email'],
            'phoneNumber' => ['required'],
            'taxNumber' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 400);
        } else {
            $customer->update($request->all());
            return response()->json('Successfully modified');
        }
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
