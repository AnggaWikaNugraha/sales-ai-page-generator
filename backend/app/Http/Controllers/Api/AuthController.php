<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        // Dummy response — no DB yet
        return response()->json([
            'message' => 'Registration successful',
            'user' => [
                'id' => 1,
                'name' => $request->name,
                'email' => $request->email,
            ],
            'token' => 'dummy-token-' . md5($request->email),
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Dummy auth — accept any valid email/password format
        if ($request->password === 'wrong') {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => 1,
                'name' => 'Demo User',
                'email' => $request->email,
            ],
            'token' => 'dummy-token-' . md5($request->email),
        ]);
    }

    public function logout(Request $request)
    {
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => [
                'id' => 1,
                'name' => 'Demo User',
                'email' => 'demo@example.com',
            ],
        ]);
    }
}
