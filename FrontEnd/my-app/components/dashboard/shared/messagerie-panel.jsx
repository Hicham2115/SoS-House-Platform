"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Lock, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversations, useMessages } from "@/hooks/use-conversations";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/axios";
import { demandeTitle } from "@/lib/demande-display";

export function MessageriePanel() {
  const searchParams = useSearchParams();
  const { data: user } = useUser();
  const { data: conversations } = useConversations();
  const [selectedId, setSelectedId] = useState(() => {
    const fromUrl = searchParams.get("demande");
    return fromUrl ? Number(fromUrl) : null;
  });
  const [draft, setDraft] = useState("");
  const queryClient = useQueryClient();

  const selected = (conversations ?? []).find(
    (c) => c.demande_id === selectedId,
  );
  const { data: messages } = useMessages(selectedId);

  const sendMessage = useMutation({
    mutationFn: async (body) =>
      (await api.post(`/demandes/${selectedId}/messages`, { body })).data,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["demandes", selectedId, "messages"],
      });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      setDraft("");
    },
    onError: (error) => toast.error(error.message),
  });

  function handleSubmit(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !selectedId) return;
    sendMessage.mutate(text);
  }

  return (
    <div className="flex flex-1 overflow-hidden bg-slate-50">
      <div className="flex w-full max-w-sm shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-4 py-4">
          <p className="text-[14px] font-bold text-slate-950">Missions</p>
          <p className="text-[12px] text-slate-500">
            Une conversation s&apos;ouvre dès qu&apos;une offre est acceptée.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="flex flex-col gap-1.5">
            {(conversations ?? []).map((c) => (
              <button
                key={c.demande_id}
                type="button"
                onClick={() => setSelectedId(c.demande_id)}
                className={`flex items-start gap-3 rounded-md border p-3 text-left transition ${
                  selectedId === c.demande_id
                    ? "border-teal-200 bg-teal-50/60"
                    : "border-transparent hover:bg-slate-50"
                }`}
              >
                <Avatar size="lg">
                  <AvatarImage src={c.other?.avatar} alt={c.other?.name} />
                  <AvatarFallback className="bg-teal-100 font-bold text-teal-700">
                    {c.other?.name?.[0]?.toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[14px] font-bold text-slate-950">
                      {c.other?.name ?? "Utilisateur"}
                    </p>
                    {c.last_message_at && (
                      <span className="shrink-0 text-[11px] text-slate-400">
                        {format(new Date(c.last_message_at), "d MMM HH:mm", {
                          locale: fr,
                        })}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-[12px] text-slate-500">
                    {demandeTitle(c)}
                  </p>
                  <p className="mt-0.5 truncate text-[13px] text-slate-600">
                    {c.last_message ?? "Aucun message pour l'instant."}
                  </p>
                </div>
                {c.unread_count > 0 && (
                  <span className="mt-1.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#ffa514] text-[10px] font-bold text-slate-950">
                    {c.unread_count}
                  </span>
                )}
              </button>
            ))}
            {conversations?.length === 0 && (
              <div className="flex flex-col items-center gap-2 px-2 py-10 text-center">
                <MessageSquare
                  className="size-7 text-slate-300"
                  strokeWidth={1.5}
                />
                <p className="text-[13px] text-slate-400">
                  Aucune conversation pour l&apos;instant.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selected ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-5 py-3.5">
            <Avatar size="lg">
              <AvatarImage
                src={selected.other?.avatar}
                alt={selected.other?.name}
              />
              <AvatarFallback className="bg-teal-100 font-bold text-teal-700">
                {selected.other?.name?.[0]?.toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[14px] font-bold text-slate-950">
                {selected.other?.name ?? "Utilisateur"}
              </p>
              <p className="text-[12px] text-slate-500">
                {demandeTitle(selected)}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="flex flex-col gap-3">
              {(messages ?? []).map((msg) => {
                const mine = msg.sender_id === user?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${mine ? "flex-row-reverse" : ""}`}
                  >
                    {!mine && (
                      <Avatar size="sm" className="mb-4 shrink-0">
                        <AvatarImage
                          src={msg.sender?.avatar}
                          alt={msg.sender?.name}
                        />
                        <AvatarFallback>
                          {msg.sender?.name?.[0]?.toUpperCase() ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-md px-4 py-2.5 text-[13px] leading-[1.6] whitespace-pre-line ${
                        mine
                          ? "bg-teal-50 text-slate-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {msg.body}
                      <div
                        className={`mt-1 text-[11px] text-slate-400 ${mine ? "text-right" : ""}`}
                      >
                        {format(new Date(msg.created_at), "HH:mm")}
                      </div>
                    </div>
                  </div>
                );
              })}
              {messages?.length === 0 && (
                <p className="py-10 text-center text-[13px] text-slate-400">
                  Dites bonjour pour démarrer la conversation.
                </p>
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 bg-white px-5 py-3.5"
          >
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/70 px-2 py-1.5">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Écrivez votre message..."
                className="h-8 flex-1 bg-transparent text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={sendMessage.isPending}
                aria-label="Envoyer"
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0b1730] text-white transition hover:bg-[#142248] disabled:opacity-50"
              >
                <Send className="size-4" />
              </button>
            </div>
            <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Lock className="size-3" />
              Vos échanges sont sécurisés et confidentiels.
            </p>
          </form>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-[13px] text-slate-400">
          Sélectionnez une conversation
        </div>
      )}
    </div>
  );
}
