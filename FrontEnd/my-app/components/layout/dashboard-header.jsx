"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Bell,
  CheckCheck,
  ChevronDown,
  LogOut,
  MessageSquare,
  Send,
  Settings,
  ThumbsUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/use-logout";
import { useNotifications } from "@/hooks/use-notifications";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/axios";

const notificationMeta = {
  offer_received: { Icon: Send, className: "bg-teal-50 text-teal-700" },
  offer_accepted: { Icon: ThumbsUp, className: "bg-amber-50 text-amber-700" },
  message_received: {
    Icon: MessageSquare,
    className: "bg-violet-50 text-violet-600",
  },
};

function notificationHref(notification, prefix) {
  const demandeId = notification.data?.demande_id;
  if (notification.type === "message_received") {
    return `${prefix}/messagerie?demande=${demandeId}`;
  }
  if (notification.type === "offer_accepted") {
    return `${prefix}/missions`;
  }
  return `${prefix}/offres`;
}

export function DashboardHeader({
  title,
  subtitle,
  ctaLabel = "+ Publier une demande",
  ctaHref = "/dashboard/publier",
  settingsHref = "/dashboard/parametres",
}) {
  const { data: user } = useUser();
  const logout = useLogout();
  const queryClient = useQueryClient();
  const { data: notificationData } = useNotifications();

  const markRead = useMutation({
    mutationFn: async (id) => (await api.post(`/notifications/${id}/read`)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const markAllRead = useMutation({
    mutationFn: async () => (await api.post("/notifications/read-all")).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const displayName = user?.name ?? "Mon compte";
  const initials = user?.name?.[0]?.toUpperCase() ?? "U";
  const prefix = user?.role === "artisan" ? "/pro" : "/dashboard";
  const notifications = notificationData?.notifications ?? [];
  const unreadCount = notificationData?.unread_count ?? 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
      <div>
        <h1 className="text-xl font-bold text-slate-950">{title}</h1>
        {subtitle && (
          <p className="mt-0.5 text-[13px] text-slate-600">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Notifications"
            className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 outline-none transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell className="size-5" strokeWidth={1.8} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 rounded-xl border border-slate-200/80 p-1.5 shadow-[0_12px_30px_rgba(12,55,55,0.1)]"
          >
            <div className="flex items-center justify-between px-2 py-1.5">
              <p className="text-[13px] font-bold text-slate-950">
                Notifications
              </p>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => markAllRead.mutate()}
                  className="flex items-center gap-1 text-[12px] font-semibold text-teal-700 hover:text-teal-800"
                >
                  <CheckCheck className="size-3.5" />
                  Tout marquer comme lu
                </button>
              )}
            </div>
            <DropdownMenuSeparator className="my-1" />
            {notifications.length === 0 ? (
              <p className="px-2 py-6 text-center text-[13px] text-slate-400">
                Aucune notification.
              </p>
            ) : (
              <div className="flex max-h-80 flex-col overflow-y-auto">
                {notifications.map((notification) => {
                  const meta =
                    notificationMeta[notification.type] ??
                    notificationMeta.message_received;
                  return (
                    <DropdownMenuItem
                      key={notification.id}
                      render={
                        <Link
                          href={notificationHref(notification, prefix)}
                          onClick={() => markRead.mutate(notification.id)}
                        />
                      }
                      className={`items-start gap-2.5 rounded-lg px-2 py-2.5 whitespace-normal ${
                        !notification.read_at ? "bg-teal-50/50" : ""
                      }`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${meta.className}`}
                      >
                        <meta.Icon className="size-4" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-bold text-slate-950">
                          {notification.title}
                        </p>
                        {notification.body && (
                          <p className="mt-0.5 line-clamp-2 text-[12px] text-slate-500">
                            {notification.body}
                          </p>
                        )}
                        <p className="mt-1 text-[11px] text-slate-400">
                          {format(new Date(notification.created_at), "d MMM HH:mm", {
                            locale: fr,
                          })}
                        </p>
                      </div>
                      {!notification.read_at && (
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#ffa514]" />
                      )}
                    </DropdownMenuItem>
                  );
                })}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-full py-1 pr-2 outline-none hover:bg-slate-50">
            <Avatar>
              <AvatarImage src={user?.avatar} alt={displayName} />
              <AvatarFallback className="bg-teal-100 text-lg font-bold text-teal-700">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-[14px] font-semibold text-slate-800">
              {displayName}
            </span>
            <ChevronDown className="size-4 text-slate-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52 rounded-xl border border-slate-200/80 p-1.5 shadow-[0_12px_30px_rgba(12,55,55,0.1)]"
          >
            <DropdownMenuItem
              render={<Link href={settingsHref} />}
              className="gap-2 rounded-lg px-2 py-2 text-[13px] font-semibold whitespace-nowrap text-slate-700 focus:bg-slate-50 focus:text-slate-950"
            >
              <Settings className="size-4 text-slate-500" strokeWidth={1.8} />
              Paramètres du compte
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              variant="destructive"
              className="gap-2 rounded-lg px-2 py-2 text-[13px] font-semibold"
              onClick={() => logout.mutate()}
            >
              <LogOut className="size-4" strokeWidth={1.8} />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {ctaLabel && (
          <Button
            render={<Link href={ctaHref} />}
            nativeButton={false}
            className="h-11 shrink-0 rounded-xl bg-[#0b1730] px-5 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(11,23,48,0.2)] transition hover:-translate-y-0.5 hover:bg-[#142248]"
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
