<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Demande;
use App\Models\Message;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // A demande only opens a chat once it has an accepted offer (a "mission").
    // Returns the other participant for $user, or null if $user isn't one of
    // the two people on this mission.
    private function otherParticipant(Demande $demande, User $user): ?User
    {
        $accepted = $demande->acceptedOffer()->with('user')->first();

        if (! $accepted) {
            return null;
        }

        if ($demande->user_id === $user->id) {
            return $accepted->user;
        }

        if ($accepted->user_id === $user->id) {
            return $demande->user;
        }

        return null;
    }

    // Every mission (demande with an accepted offer) the current user is part
    // of, newest activity first, with a preview of the last message.
    public function conversations(Request $request): JsonResponse
    {
        $user = $request->user();

        $demandes = Demande::whereHas('acceptedOffer')
            ->where(fn ($q) => $q->where('user_id', $user->id)
                ->orWhereHas('acceptedOffer', fn ($q2) => $q2->where('user_id', $user->id)))
            ->with(['user:id,name,avatar', 'acceptedOffer.user:id,name,avatar'])
            ->get();

        $conversations = $demandes->map(function (Demande $demande) use ($user) {
            $other = $demande->user_id === $user->id
                ? $demande->acceptedOffer->user
                : $demande->user;

            $lastMessage = $demande->messages()->latest()->first();
            $unreadCount = $demande->messages()
                ->where('sender_id', '!=', $user->id)
                ->whereNull('read_at')
                ->count();

            return [
                'demande_id' => $demande->id,
                'category' => $demande->category,
                'subcategory' => $demande->subcategory,
                'other' => $other,
                'last_message' => $lastMessage?->body,
                'last_message_at' => $lastMessage?->created_at,
                'unread_count' => $unreadCount,
            ];
        })->sortByDesc(fn ($c) => $c['last_message_at'] ?? '')->values();

        return response()->json($conversations);
    }

    public function index(Request $request, Demande $demande): JsonResponse
    {
        $other = $this->otherParticipant($demande, $request->user());
        abort_unless($other, 403);

        Message::where('demande_id', $demande->id)
            ->where('sender_id', '!=', $request->user()->id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        $messages = $demande->messages()->with('sender:id,name,avatar')->oldest()->get();

        return response()->json($messages);
    }

    public function store(Request $request, Demande $demande): JsonResponse
    {
        $user = $request->user();
        $other = $this->otherParticipant($demande, $user);
        abort_unless($other, 403);

        $validated = $request->validate([
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $message = $demande->messages()->create([
            'sender_id' => $user->id,
            'body' => $validated['body'],
        ]);

        Notification::create([
            'user_id' => $other->id,
            'type' => 'message_received',
            'title' => 'Nouveau message',
            'body' => "{$user->name} : {$validated['body']}",
            'data' => ['demande_id' => $demande->id],
        ]);

        return response()->json($message->load('sender:id,name,avatar'), 201);
    }
}
