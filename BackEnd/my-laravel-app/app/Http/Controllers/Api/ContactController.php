<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'subject' => ['required', 'string', 'in:generale,demande,facturation,signalement,autre'],
            'message' => ['required', 'string', 'min:10', 'max:1000'],
        ]);

        $contact = $request->user()->contacts()->create($validated);

        return response()->json($contact, 201);
    }
}
