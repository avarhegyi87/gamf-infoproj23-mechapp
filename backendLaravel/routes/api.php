<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//User routes
Route::post('/auth/register', [UserController::class, 'register'])->name('register');
Route::post('/auth/login', [UserController::class, 'login'])->name('login');


//Customer routes
Route::get('/customer/get/{customer}', [CustomerController::class, 'get'])->name('get');
Route::get('/customer/getAll', [CustomerController::class, 'getAll'])->name('getAll');
Route::post('/customer/create', [CustomerController::class, 'create'])->name('create');
Route::post('/customer/{customer}', [CustomerController::class, 'update'])->name('update');
Route::delete('/customer/{customer}', [CustomerController::class, 'delete'])->name('delete');

//Stock routes
Route::get('/stock/get/{stock}', [StockController::class, 'get'])->name('get');
Route::get('/stock/getAll', [StockController::class, 'getAll'])->name('getAll');
Route::post('/stock/create', [StockController::class, 'create'])->name('create');
Route::post('/stock/{stock}', [StockController::class, 'update'])->name('update');
Route::delete('/stock/{stock}', [StockController::class, 'delete'])->name('delete');

//Vehicle routes
Route::get('/vehicle/get/{vehicle}', [VehicleController::class, 'get'])->name('get');
Route::get('/vehicle/getAll', [VehicleController::class, 'getAll'])->name('getAll');
Route::post('/vehicle/create', [VehicleController::class, 'create'])->name('create');
Route::post('/vehicle/{vehicle}', [VehicleController::class, 'update'])->name('update');
Route::delete('/vehicle/{vehicle}', [VehicleController::class, 'delete'])->name('delete');

//Quotation routes
Route::get('/quotation/get/{quotation}', [QuotationController::class, 'get'])->name('get');
Route::get('/quotation/getAll', [QuotationController::class, 'getAll'])->name('getAll');
Route::post('/quotation/create', [QuotationController::class, 'create'])->name('create');
Route::post('/quotation/{quotation}', [QuotationController::class, 'update'])->name('update');
Route::delete('/quotation/{quotation}', [QuotationController::class, 'delete'])->name('delete');

//Worksheet routes
Route::get('/worksheet/get/{worksheet}', [WorksheetController::class, 'get'])->name('get');
Route::get('/worksheet/getAll', [WorksheetController::class, 'getAll'])->name('getAll');
Route::post('/worksheet/create', [WorksheetController::class, 'create'])->name('create');
Route::post('/worksheet/{worksheet}', [WorksheetController::class, 'update'])->name('update');
Route::delete('/worksheet/{worksheet}', [WorksheetController::class, 'delete'])->name('delete');
