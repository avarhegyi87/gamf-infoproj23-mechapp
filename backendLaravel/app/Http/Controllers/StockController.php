<?php

namespace App\Http\Controllers;
use App\Models\Stock;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/
        // validate form data
        $formFields = $request->validate([
            'materialNumber' => ['required', 'min:6', 'max:18'],
            'description' => ['required', 'min:6', 'max:50'],
            'currentStock' => ['required'],
            'netPrice' => ['required'],
            'grossPrice' => ['required'],
        ]);

        Stock::create($formFields);

        return response()->json('Successfully added');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stock $stock)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        $formFields = $request->validate([
            'materialNumber' => ['required', 'min:6', 'max:18'],
            'description' => ['required', 'min:6', 'max:50'],
            'currentStock' => ['required'],
            'netPrice' => ['required'],
            'grossPrice' => ['required'],
        ]);


        $stock->update($formFields);

        return response()->json('Successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {
        $stock = Stock::findOrFail($id);
         /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/
        $stock->delete();

        return response()->json('Successfully deleted');
    }

    public function get(Stock $stock)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json($stock);
    }

    public function getAll()
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json(Stock::get());
    }
}
