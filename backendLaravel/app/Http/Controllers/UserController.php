<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use illuminate\Support\Facades\Hash;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exception\JWTException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {

        $validator =  Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'firstName' => ['required'],
            'lastName' => ['required'],
            'role' => ['required'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 401);
        } else {
            $user = User::where('email', $request['email'])->first();
            if ($user) {
                $response['status'] = 0;
                $response['message'] = 'Email already exists.';
                $response['code'] = 409;
            } else {
                $user = User::create([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'role' => $request->role,
                    'email' => $request->email,
                    'password' => bcrypt($request->password)
                ]);
                $response['status'] = 1;
                $response['message'] = 'User registered succesfully';
                $response['code'] = 200;
            }
            return response()->json($response);
        }
    }

    public function logout()
    {

        Auth::logout();
        $response['status'] = 1;
        $response['message'] = 'Logged out succesfully.';
        $response['code'] = 200;
        return response()->json($response);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if (!JWTAuth::attempt($credentials)) {
                $response['data'] = 0;
                $response['code'] = 401;
                $response['message'] = 'Incorrect credentials!';
                return response()->json($response);
            }
        } catch (JWTException $e) {
            $response['data'] = null;
            $response['code'] = 500;
            $response['message'] = 'Could not create token.';
            return response()->json($response);
        }


        $user = auth()->user();
        $role = '';
        if ($user->role == 3) {
            $role = 'admin';
        }


        $data['token'] = auth()->claims([
            '$id' => $user->id,
            'email' => $user->email,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'role' => $user->role,

        ])->attempt($credentials);

        $response['id'] = $user->id;
        $response['email'] = $user->email;
        $response['firstName'] = $user->first_name;
        $response['lastName'] = $user->last_name;
        $response['role'] =  $user->role;
        $response['token'] = $data;
        $response['status'] = 1;
        $response['code'] = 200;
        $response['message'] = 'Successful login!';

        return response()->json($response);
    }
}
