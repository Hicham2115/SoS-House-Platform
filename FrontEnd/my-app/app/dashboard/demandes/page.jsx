"use client";

import { useState } from "react";
import { LayoutGrid, Table2 } from "lucide-react";
import { RequestCard } from "@/components/dashboard/request-card";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { requests, statusStyles } from "@/lib/dashboard-data";

const views = [
  { value: "cards", label: "Cartes", Icon: LayoutGrid },
  { value: "table", label: "Tableau", Icon: Table2 },
];

function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
      {views.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold transition ${
            view === value
              ? "bg-white text-teal-700 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Icon className="size-4" strokeWidth={1.8} />
          {label}
        </button>
      ))}
    </div>
  );
}

export default function DemandesPage() {
  const [view, setView] = useState("cards");

  return (
    <>
      <DashboardHeader
        title="Demandes actives"
        subtitle="Suivez l'avancement de toutes vos demandes en cours."
      />

      <div className="flex flex-1 flex-col gap-4 bg-slate-50 p-5 sm:p-8">
        <div className="flex justify-end">
          <ViewToggle view={view} onChange={setView} />
        </div>

        {view === "cards" ? (
          <div className="flex flex-col gap-3">
            {requests.map((request) => (
              <RequestCard key={request.title} request={request} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
                    Demande
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold text-slate-500">
                    Statut
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold text-slate-500">
                    Prestataire
                  </TableHead>
                  <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow
                    key={request.title}
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                          <request.Icon className="size-4" strokeWidth={1.8} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-slate-950">
                            {request.title}
                          </p>
                          <p className="truncate text-[12px] text-slate-500">
                            {request.subtitle}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${statusStyles[request.status]}`}
                      >
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {request.provider ? (
                        <span className="flex items-center gap-1.5 text-[13px] font-medium text-slate-800">
                          <Avatar size="sm">
                            {request.provider.avatar && (
                              <AvatarImage
                                src={request.provider.avatar.src}
                                alt={request.provider.name}
                              />
                            )}
                            <AvatarFallback>
                              {request.provider.initials}
                            </AvatarFallback>
                          </Avatar>
                          {request.provider.name}
                        </span>
                      ) : (
                        <span className="text-[13px] text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 text-[13px] text-slate-600">
                      {request.meta}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}
