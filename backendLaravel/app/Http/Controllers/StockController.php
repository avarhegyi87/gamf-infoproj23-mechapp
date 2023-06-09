<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

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
        $validator =  Validator::make($request->all(), [
            'id' => ['required', 'size:8'],
            'description' => ['nullable', 'min:6', 'max:50'],
            'currentStock' => ['nullable'],
            'netPrice' => ['nullable'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 400);
        } else {
            Stock::create($request->all());
            return response()->json('Successfully added');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, String $id)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        $req = $request->only(['id', 'description', 'currentStock', 'netPrice']);

        $validator =  Validator::make($request->all(), [
            'id' => ['required', 'size:8'],
            'description' => ['nullable', 'min:6', 'max:50'],
            'currentStock' => ['nullable'],
            'netPrice' => ['nullable'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 400);
        } else {

            DB::table('stocks')
                ->where('id', $id)  // find your user by their email
                ->limit(1)  // optional - to ensure only one record is updated.
                ->update($req);
            return response()->json('Successfully modified');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $id)
    {

        /*if ( Auth::id() != 2 && Auth::user()->role != 3) {
            return abort(403);
        }*/
        DB::table('stocks')->where('materialNumber', $id)->delete();

        return response()->json('Successfully deleted');
    }

    public function get(String $matNum)
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/

        $stock = DB::table('stocks')->where('materialNumber', $matNum)->first();

        return response()->json($stock);
    }

    public function getAll()
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        return response()->json(Stock::get());
    }
    public function getLastMaterial()
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        $mats = Stock::get()->sortBy('id');
        $last = 0;
        if (!empty($mats)) {
            foreach ($mats as $mat) {
                if ($mat->id < 60000000 && $mat->id > $last) { {
                        $last = $mat->id;
                    }
                }
            }
        }
        $stock = DB::table('stocks')->where('id', $last)->first();
        return response()->json($stock);
    }
    public function getLastService()
    {
        /*if ( Auth::id() != 2 && Auth::user()->role != 3 &&  Auth::user()->role != 4) {
            return abort(403);
        }*/
        $servs = Stock::get()->sortBy('id');
        $last = 0;
        if (!empty($servs)) {
            foreach ($servs as $serv) {
                if ($serv->id >= 60000000 && $serv->id > $last) { {
                        $last = $serv->id;
                    }
                }
            }
        }
        $stock = DB::table('stocks')->where('id', $last)->first();
        return response()->json($stock);
    }
}
