"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Coins,
  CreditCard,
  Download,
  Gift,
  Info,
  Landmark,
  Lock,
  ShieldCheck,
  SquarePen,
  Star,
  Wallet,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  creditBalance,
  creditPackages,
  creditTransactions,
  paymentMethods,
} from "@/lib/pro-dashboard-data";

const facts = [
  { icon: Info, text: "1 crédit = 1 déverrouillage de demande" },
  { icon: CheckCircle2, text: "Les crédits n'expirent pas" },
  {
    icon: Star,
    text: "Les bonus sont accordés après mission terminée et avis positif",
  },
  {
    icon: ShieldCheck,
    text: "100% remboursé si la demande était hors de votre niveau",
  },
];

const packageBadges = {
  populaire: { label: "Populaire", className: "bg-amber-400 text-slate-950" },
  "meilleure-valeur": {
    label: "Meilleure valeur",
    className: "bg-teal-600 text-white",
  },
};

const methodIcons = {
  carte: CreditCard,
  "mobile-money": Wallet,
  "cash-plus": Landmark,
  wafacash: Landmark,
  "barid-cash": Landmark,
};

export default function ProCreditsPage() {
  const [selectedPackage, setSelectedPackage] = useState("p50");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("carte");

  return (
    <>
      <DashboardHeader
        title="Crédits et recharge"
        subtitle="Gérez votre solde de crédits et rechargez pour débloquer plus de demandes."
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
        settingsHref="/pro/parametres"
        notificationCount={3}
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8">
        <div className="flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
              <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0b1730] to-[#132650] p-6 text-white shadow-[0_20px_40px_rgba(11,23,48,0.25)]">
                <span className="absolute -top-10 -right-10 size-40 rounded-full bg-white/5" />
                <span className="absolute -bottom-14 right-24 size-28 rounded-full bg-white/5" />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="flex size-12 items-center justify-center rounded-full bg-white text-[#ffa514]">
                      <Coins className="size-6" strokeWidth={1.8} />
                    </span>
                    <p className="mt-4 text-[13px] text-slate-300">
                      Solde disponible
                    </p>
                    <p className="mt-1 text-[32px] font-bold text-white">
                      {creditBalance.available} crédits
                    </p>
                    <p className="text-[12px] text-slate-400">
                      = {creditBalance.available} MAD de valeur
                    </p>
                    <button
                      type="button"
                      className="mt-3 text-[13px] font-semibold text-white/90 hover:text-white"
                    >
                      Historique des transactions →
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 sm:w-52">
                    <div className="rounded-xl bg-white/10 p-3.5">
                      <span className="flex items-center gap-1.5 text-[12px] text-slate-300">
                        <Clock className="size-3.5" />
                        Crédits en cours d&apos;utilisation
                      </span>
                      <p className="mt-1 text-[18px] font-bold text-white">
                        {creditBalance.inUse} crédits
                      </p>
                      <p className="text-[11px] text-slate-400">
                        ({creditBalance.inUseDemandes} demandes en cours)
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/10 p-3.5">
                      <span className="flex items-center gap-1.5 text-[12px] text-slate-300">
                        <Gift className="size-3.5" />
                        Crédits bonus
                      </span>
                      <p className="mt-1 text-[18px] font-bold text-white">
                        {creditBalance.bonus} crédits
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Expire le {creditBalance.bonusExpiry}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <span className="inline-block rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-700">
                  À savoir
                </span>
                <ul className="mt-3 flex flex-col gap-3">
                  {facts.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-2.5">
                      <Icon className="mt-0.5 size-4 shrink-0 text-teal-600" />
                      <span className="text-[12.5px] leading-[1.5] text-slate-600">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-[17px] font-bold text-slate-950">
                Recharger des crédits
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                {creditPackages.map((pkg) => {
                  const badge = pkg.badge ? packageBadges[pkg.badge] : null;
                  const selected = selectedPackage === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      className={`relative flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition ${
                        selected
                          ? "border-teal-600 bg-teal-50/60"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      {badge && (
                        <span
                          className={`absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[10px] font-bold whitespace-nowrap ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      )}
                      <span className="flex size-12 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                        <Coins className="size-6" strokeWidth={1.6} />
                      </span>
                      <div>
                        <p className="text-[16px] font-bold text-slate-950">
                          {pkg.credits} crédits
                        </p>
                        <p className="text-[12px] text-slate-500">
                          {pkg.price} MAD
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`h-9 w-full rounded-lg text-[13px] font-semibold ${
                          selected
                            ? "border-teal-600 bg-teal-600 text-white hover:bg-teal-700"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        Choisir
                      </Button>
                    </div>
                  );
                })}

                <div
                  className={`flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition ${
                    selectedPackage === "custom"
                      ? "border-teal-600 bg-teal-50/60"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <SquarePen className="size-5" strokeWidth={1.8} />
                  </span>
                  <p className="text-[13px] font-bold text-slate-950">
                    Personnalisé
                  </p>
                  <input
                    type="number"
                    min="1"
                    placeholder="Ex: 150"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/70 px-2.5 text-center text-[13px] text-slate-800 outline-none focus-visible:border-teal-600"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPackage("custom")}
                    className={`h-9 w-full rounded-lg text-[13px] font-semibold ${
                      selectedPackage === "custom"
                        ? "border-teal-600 bg-teal-600 text-white hover:bg-teal-700"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Choisir
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[17px] font-bold text-slate-950">
                Méthodes de paiement disponibles
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {paymentMethods.map((method) => {
                  const Icon = methodIcons[method.id] ?? Wallet;
                  const selected = selectedMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-teal-600 bg-teal-50/60"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <Icon className="size-5 text-slate-500" strokeWidth={1.8} />
                      <p className="text-[13px] font-bold text-slate-950">
                        {method.label}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {method.note}
                      </p>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-slate-500">
                <Lock className="size-3.5" />
                Paiement 100% sécurisé. Vos informations sont protégées.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white">
              <div className="p-5">
                <h2 className="text-[17px] font-bold text-slate-950">
                  Historique des transactions
                </h2>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 hover:bg-transparent">
                      <TableHead className="px-5 text-[12px] font-semibold text-slate-500">
                        Date
                      </TableHead>
                      <TableHead className="text-[12px] font-semibold text-slate-500">
                        Type
                      </TableHead>
                      <TableHead className="text-[12px] font-semibold text-slate-500">
                        Description
                      </TableHead>
                      <TableHead className="text-[12px] font-semibold text-slate-500">
                        Crédits
                      </TableHead>
                      <TableHead className="text-[12px] font-semibold text-slate-500">
                        Montant
                      </TableHead>
                      <TableHead className="text-[12px] font-semibold text-slate-500">
                        Solde après
                      </TableHead>
                      <TableHead className="text-[12px] font-semibold text-slate-500">
                        Méthode
                      </TableHead>
                      <TableHead className="px-5 text-[12px] font-semibold text-slate-500" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {creditTransactions.map((tx, index) => (
                      <TableRow key={index} className="border-slate-200">
                        <TableCell className="px-5 text-[13px] whitespace-nowrap text-slate-600">
                          {tx.date}
                        </TableCell>
                        <TableCell className="text-[13px] whitespace-nowrap text-slate-600">
                          {tx.type}
                        </TableCell>
                        <TableCell className="text-[13px] text-slate-700">
                          {tx.description}
                        </TableCell>
                        <TableCell
                          className={`text-[13px] font-semibold whitespace-nowrap ${
                            tx.credits > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {tx.credits > 0 ? "+" : ""}
                          {tx.credits}
                        </TableCell>
                        <TableCell className="text-[13px] whitespace-nowrap text-slate-600">
                          {tx.amount}
                        </TableCell>
                        <TableCell className="text-[13px] font-semibold whitespace-nowrap text-slate-950">
                          {tx.balanceAfter}
                        </TableCell>
                        <TableCell className="text-[13px] whitespace-nowrap text-slate-600">
                          {tx.method}
                        </TableCell>
                        <TableCell className="px-5">
                          <button
                            type="button"
                            aria-label="Télécharger le justificatif"
                            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                          >
                            <Download className="size-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="border-t border-slate-100 p-4 text-center">
                <button
                  type="button"
                  className="text-[13px] font-semibold text-teal-700"
                >
                  Voir tout l&apos;historique →
                </button>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
