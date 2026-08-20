"use client";

import { useState } from "react";
import {
  Check,
  CheckCheck,
  Lock,
  MoreVertical,
  Paperclip,
  Search,
  Send,
  Smile,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  conversations as initialConversations,
  messagesByConversation,
} from "@/lib/dashboard-data";

export default function MessageriePage() {
  const [conversations, setConversations] = useState(() =>
    initialConversations.map((c) => ({ ...c })),
  );
  const [activeTab, setActiveTab] = useState("toutes");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(
    initialConversations[0]?.id ?? null,
  );
  const [messages, setMessages] = useState(() => ({
    ...messagesByConversation,
  }));
  const [draft, setDraft] = useState("");

  const selected = conversations.find((c) => c.id === selectedId) ?? null;
  const thread = selectedId ? (messages[selectedId] ?? []) : [];

  const tabsConfig = [
    { value: "toutes", label: "Toutes", count: conversations.length },
    {
      value: "non-lues",
      label: "Non lues",
      count: conversations.filter((c) => c.unread).length,
    },
    { value: "artisans", label: "Artisans" },
    { value: "support", label: "Support" },
  ];

  const filtered = conversations.filter((c) => {
    if (activeTab === "non-lues" && !c.unread) return false;
    if (activeTab === "artisans" && c.type !== "artisan") return false;
    if (activeTab === "support" && c.type !== "support") return false;
    if (
      search &&
      !`${c.name} ${c.subject} ${c.preview}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  function selectConversation(id) {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c)),
    );
  }

  function sendMessage(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !selectedId) return;
    const time = new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => ({
      ...prev,
      [selectedId]: [
        ...(prev[selectedId] ?? []),
        { from: "me", text, time, read: false },
      ],
    }));
    setDraft("");
  }

  return (
    <>
      <DashboardHeader
        title="Messagerie"
        subtitle="Vos échanges avec les artisans et le support."
      />

      <div className="flex flex-1 overflow-hidden bg-slate-50">
        <div className="flex w-full max-w-sm shrink-0 flex-col border-r border-slate-200 bg-white">
          <div className="flex items-center gap-1 border-b border-slate-100 px-4 pt-4">
            {tabsConfig.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-1.5 border-b-2 px-2 pb-3 text-[13px] font-semibold transition ${
                  activeTab === tab.value
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
                {tab.count != null && (
                  <span
                    className={`flex size-4.5 items-center justify-center rounded-full text-[10px] font-bold ${
                      activeTab === tab.value
                        ? "bg-teal-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-3">
            <InputGroup className="h-10 rounded-full border-slate-200 bg-slate-50/70 px-1">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Rechercher une conversation"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="scrollbar-blue flex-1 overflow-y-auto px-3 pb-3">
            <div className="flex flex-col gap-1.5">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => selectConversation(c.id)}
                  className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition ${
                    selectedId === c.id
                      ? "border-teal-200 bg-teal-50/60"
                      : "border-transparent hover:bg-slate-50"
                  }`}
                >
                  <Avatar size="lg">
                    {c.avatar && (
                      <AvatarImage src={c.avatar.src} alt={c.name} />
                    )}
                    <AvatarFallback>{c.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[14px] font-bold text-slate-950">
                        {c.name}
                      </p>
                      <span className="shrink-0 text-[11px] text-slate-400">
                        {c.time}
                      </span>
                    </div>
                    <p className="truncate text-[12px] text-slate-500">
                      {c.subject}
                    </p>
                    <p className="mt-0.5 truncate text-[13px] text-slate-600">
                      {c.preview}
                    </p>
                  </div>
                  {c.unread && (
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#ffa514]" />
                  )}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-2 py-8 text-center text-[13px] text-slate-400">
                  Aucune conversation.
                </p>
              )}
            </div>
          </div>
        </div>

        {selected ? (
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <Avatar size="lg">
                    {selected.avatar && (
                      <AvatarImage
                        src={selected.avatar.src}
                        alt={selected.name}
                      />
                    )}
                    <AvatarFallback>{selected.initials}</AvatarFallback>
                  </Avatar>
                  {selected.online && (
                    <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-slate-950">
                    {selected.name}
                  </p>
                  <p className="flex items-center gap-1.5 text-[12px] text-slate-500">
                    {selected.online && (
                      <span className="size-1.5 shrink-0 rounded-full bg-green-500" />
                    )}
                    {selected.subject}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-9 rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Voir la demande
                </Button>
                <button
                  type="button"
                  aria-label="Plus d'options"
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                >
                  <MoreVertical className="size-4.5" />
                </button>
              </div>
            </div>

            <div className="scrollbar-blue flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 flex justify-center">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                  Aujourd&apos;hui
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {thread.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${
                      msg.from === "me" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {msg.from === "them" && (
                      <Avatar size="sm" className="mb-4 shrink-0">
                        {selected.avatar && (
                          <AvatarImage
                            src={selected.avatar.src}
                            alt={selected.name}
                          />
                        )}
                        <AvatarFallback>{selected.initials}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-[13px] leading-[1.6] whitespace-pre-line ${
                        msg.from === "me"
                          ? "bg-teal-50 text-slate-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {msg.text}
                      <div
                        className={`mt-1 flex items-center gap-1 text-[11px] text-slate-400 ${
                          msg.from === "me" ? "justify-end" : ""
                        }`}
                      >
                        {msg.time}
                        {msg.from === "me" &&
                          (msg.read ? (
                            <CheckCheck className="size-3.5 text-teal-600" />
                          ) : (
                            <Check className="size-3.5" />
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={sendMessage}
              className="border-t border-slate-200 bg-white px-5 py-3.5"
            >
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/70 px-2 py-1.5">
                <button
                  type="button"
                  aria-label="Joindre un fichier"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <Paperclip className="size-4.5" />
                </button>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="h-8 flex-1 bg-transparent text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  aria-label="Emoji"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <Smile className="size-4.5" />
                </button>
                <button
                  type="submit"
                  aria-label="Envoyer"
                  className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0b1730] text-white transition hover:bg-[#142248]"
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
    </>
  );
}
