"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ShieldCheck } from "lucide-react";
import { VerificationDetailSheet } from "@/components/admin/verification-detail-sheet";
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
import { usePendingVerifications } from "@/hooks/use-admin-verifications";

const niveauLabel = { n0: "N0", n1: "N1", n2: "N2" };

export default function AdminVerificationPage() {
  const { data: artisans, isPending } = usePendingVerifications();
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <div className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
        <h1 className="text-xl font-bold text-slate-950">Vérification</h1>
        <p className="mt-0.5 text-[13px] text-slate-600">
          Artisans en attente de validation de leurs documents.
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
                  Téléphone
                </TableHead>
                <TableHead className="text-[12px] font-semibold text-slate-500">
                  Niveau
                </TableHead>
                <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
                  Soumis le
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index} className="border-slate-200">
                    <TableCell colSpan={4} className="px-4 py-3">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : !artisans?.length ? (
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableCell colSpan={4} className="py-14">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <ShieldCheck
                        className="size-8 text-slate-300"
                        strokeWidth={1.5}
                      />
                      <p className="text-[13px] text-slate-500">
                        Aucun dossier en attente.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                artisans.map((artisan) => (
                  <TableRow
                    key={artisan.id}
                    className="cursor-pointer border-slate-200"
                    onClick={() => setSelectedId(artisan.id)}
                  >
                    <TableCell className="px-4 py-3 font-medium text-slate-900">
                      {artisan.name}
                    </TableCell>
                    <TableCell>{artisan.phone ?? "—"}</TableCell>
                    <TableCell>
                      <Badge className="bg-violet-50 text-violet-600">
                        {niveauLabel[artisan.niveau] ?? artisan.niveau}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4">
                      {format(new Date(artisan.created_at), "d MMM yyyy", {
                        locale: fr,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <VerificationDetailSheet
        artisanId={selectedId}
        open={Boolean(selectedId)}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      />
    </>
  );
}
