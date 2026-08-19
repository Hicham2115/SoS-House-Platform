import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { conversations } from "@/lib/dashboard-data";

export default function MessageriePage() {
  return (
    <>
      <DashboardHeader
        title="Messagerie"
        subtitle="Vos échanges avec les artisans et le support."
      />

      <div className="flex flex-1 flex-col gap-2 bg-slate-50 p-5 sm:p-8">
        {conversations.map((conversation) => (
          <div
            key={conversation.name}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <Avatar size="lg">
              {conversation.avatar && (
                <AvatarImage
                  src={conversation.avatar.src}
                  alt={conversation.name}
                />
              )}
              <AvatarFallback>{conversation.initials}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[14px] font-bold text-slate-950">
                  {conversation.name}
                </p>
                <span className="shrink-0 text-[12px] text-slate-500">
                  {conversation.time}
                </span>
              </div>
              <p className="truncate text-[12px] text-slate-500">
                {conversation.subject}
              </p>
              <p className="mt-1 truncate text-[13px] text-slate-700">
                {conversation.preview}
              </p>
            </div>

            {conversation.unread && (
              <span className="size-2.5 shrink-0 rounded-full bg-[#ffa514]" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
