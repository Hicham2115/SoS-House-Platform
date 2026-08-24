"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminUsers } from "@/hooks/use-admin-users";

const roleMeta = {
  client: { label: "Client", className: "bg-teal-50 text-teal-700" },
  artisan: { label: "Artisan", className: "bg-violet-50 text-violet-600" },
  admin: { label: "Admin", className: "bg-slate-900 text-white" },
};

const verificationMeta = {
  pending: { label: "En attente", className: "bg-amber-50 text-amber-700" },
  approved: { label: "Vérifié", className: "bg-teal-50 text-teal-700" },
  rejected: { label: "Rejeté", className: "bg-red-50 text-red-600" },
};

export default function AdminComptesPage() {
  const { data: users, isPending } = useAdminUsers();

  return (
    <>
      <div className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
        <h1 className="text-xl font-bold text-slate-950">
          Gestion des comptes
        </h1>
        <p className="mt-0.5 text-[13px] text-slate-600">
          Tous les comptes de la plateforme.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-5 bg-slate-50 p-5 sm:p-8">
        <div className="rounded-md border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 hover:bg-transparent">
                <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
                  Nom
                </TableHead>
                <TableHead className="text-[12px] font-semibold text-slate-500">
                  Email
                </TableHead>
                <TableHead className="text-[12px] font-semibold text-slate-500">
                  Téléphone
                </TableHead>
                <TableHead className="text-[12px] font-semibold text-slate-500">
                  Rôle
                </TableHead>
                <TableHead className="text-[12px] font-semibold text-slate-500">
                  Niveau
                </TableHead>
                <TableHead className="text-[12px] font-semibold text-slate-500">
                  Vérification
                </TableHead>
                <TableHead className="text-[12px] font-semibold text-slate-500">
                  Crédits
                </TableHead>
                <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
                  Inscrit le
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <TableRow key={index} className="border-slate-200">
                    <TableCell colSpan={8} className="px-4 py-3">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : !users?.length ? (
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableCell colSpan={8} className="py-14">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Users className="size-8 text-slate-300" strokeWidth={1.5} />
                      <p className="text-[13px] text-slate-500">
                        Aucun compte pour l&apos;instant.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => {
                  const role = roleMeta[user.role] ?? {
                    label: user.role,
                    className: "bg-slate-100 text-slate-600",
                  };
                  const verification =
                    user.role === "artisan" && user.niveau !== "n0"
                      ? verificationMeta[user.verification_status]
                      : null;

                  return (
                    <TableRow key={user.id} className="border-slate-200">
                      <TableCell className="px-4 py-3 font-medium text-slate-900">
                        {user.name}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {user.email}
                      </TableCell>
                      <TableCell>{user.phone ?? "—"}</TableCell>
                      <TableCell>
                        <Badge className={role.className}>{role.label}</Badge>
                      </TableCell>
                      <TableCell>
                        {user.role === "artisan"
                          ? (user.niveau ?? "n0").toUpperCase()
                          : "—"}
                      </TableCell>
                      <TableCell>
                        {verification ? (
                          <Badge className={verification.className}>
                            {verification.label}
                          </Badge>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        {user.role === "artisan" ? (user.credits ?? 0) : "—"}
                      </TableCell>
                      <TableCell className="px-4">
                        {format(new Date(user.created_at), "d MMM yyyy", {
                          locale: fr,
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
