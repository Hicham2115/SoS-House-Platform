import Image from "next/image";
import {
  BadgeCheck,
  Bell,
  Calendar,
  ChevronDown,
  CircleCheckBig,
  CircleHelp,
  Droplet,
  FileText,
  HeartHandshake,
  Headphones,
  History,
  LayoutDashboard,
  Lock,
  MessageSquare,
  PaintRoller,
  Settings,
  ShieldCheck,
  Smile,
  Star,
  Zap,
} from "lucide-react";
import avatar1 from "@/app/assets/avatars/avatar-1.png";
import avatar2 from "@/app/assets/avatars/avatar-2.png";
import avatar3 from "@/app/assets/avatars/avatar-3.png";
import logo from "@/app/assets/logo.jpeg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { Icon: LayoutDashboard, label: "Tableau de bord", active: true },
  { Icon: FileText, label: "Demandes actives" },
  { Icon: MessageSquare, label: "Messagerie", badge: 2 },
  { Icon: History, label: "Historique des missions" },
  { Icon: Star, label: "Avis et évaluations" },
  { Icon: Settings, label: "Paramètres du compte" },
  { Icon: CircleHelp, label: "Aide et support" },
];

const statusStyles = {
  "En attente de réponses": "bg-amber-50 text-amber-700",
  "Prestataire retenu": "bg-teal-50 text-teal-700",
  "Intervention planifiée": "bg-blue-50 text-blue-700",
  "En cours": "bg-emerald-50 text-emerald-700",
  Terminée: "bg-slate-100 text-slate-600",
};

const requests = [
  {
    Icon: Droplet,
    title: "Fuite d'eau",
    subtitle: "Salle de bain • Casablanca",
    meta: "Créée le 21 mai 2024",
    status: "En attente de réponses",
    note: "3 réponses reçues",
    action: "Comparer les réponses",
  },
  {
    Icon: Zap,
    title: "Électricité",
    subtitle: "Prise défectueuse • Salon",
    meta: "Retenu depuis le 22 mai 2024",
    status: "Prestataire retenu",
    provider: { name: "Youssef E.", avatar: avatar2 },
    action: "Message",
  },
  {
    Icon: Calendar,
    title: "Serrurerie",
    subtitle: "Porte d'entrée bloquée",
    meta: "Intervention planifiée",
    status: "Intervention planifiée",
    note: "Mer. 22 mai à 14h00",
    provider: { name: "Amine B.", avatar: avatar3 },
    action: "Détails",
    secondaryAction: "Message",
  },
  {
    Icon: PaintRoller,
    title: "Peinture intérieure",
    subtitle: "Appartement • 2 pièces",
    meta: "Commencé le 21 mai 2024",
    status: "En cours",
    provider: { name: "Reda Plomberie", initials: "RP" },
    action: "Message",
  },
  {
    Icon: CircleCheckBig,
    title: "Climatisation",
    subtitle: "Entretien complet",
    meta: "Terminée le 15 mai 2024",
    status: "Terminée",
    note: "Merci pour votre confiance !",
  },
];

const stats = [
  { Icon: FileText, value: "4", label: "Demandes actives", tone: "teal" },
  {
    Icon: CircleCheckBig,
    value: "12",
    label: "Missions terminées",
    tone: "teal",
  },
  { Icon: Star, value: "4,8/5", label: "Note moyenne donnée", tone: "amber" },
  { Icon: Smile, value: "97%", label: "Taux de satisfaction", tone: "amber" },
];

const reasons = [
  { Icon: ShieldCheck, label: "Artisans vérifiés en personne" },
  { Icon: BadgeCheck, label: "Avis authentiques de vrais clients" },
  { Icon: Lock, label: "Coordonnées protégées" },
  { Icon: HeartHandshake, label: "Accompagnement humain" },
];

function DashboardSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-5 lg:flex">
      <Image src={logo} alt="SOS House" className="w-30 m-auto" />

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {navItems.map(({ Icon, label, active, badge }) => (
          <button
            key={label}
            type="button"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold transition ${
              active
                ? "bg-teal-600 text-white shadow-[0_8px_20px_rgba(13,148,136,0.25)]"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon className="size-[18px] shrink-0" strokeWidth={1.8} />
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="flex size-5 items-center justify-center rounded-full bg-[#ffa514] text-[11px] font-bold text-slate-950">
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="rounded-2xl bg-teal-50 p-4">
        <span className="flex size-9 items-center justify-center rounded-full bg-white text-teal-700">
          <ShieldCheck className="size-5" strokeWidth={1.8} />
        </span>
        <p className="mt-3 text-[13px] font-bold text-slate-950">
          Vos données sont sécurisées
        </p>
        <p className="mt-1 text-[12px] leading-[1.5] text-slate-600">
          Nous protégeons vos informations et vos échanges.
        </p>
        <button
          type="button"
          className="mt-2 cursor-pointer text-[12px] font-semibold text-teal-700 hover:text-teal-800"
        >
          En savoir plus →
        </button>
      </div>
    </aside>
  );
}

function DashboardHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
      <div>
        <h1 className="text-xl font-bold text-slate-950">Bonjour, Hicham 👋</h1>
        <p className="mt-0.5 text-[13px] text-slate-600">
          Voici un aperçu de vos demandes et interventions.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell className="size-5" strokeWidth={1.8} />
          <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-[#ffa514] text-[10px] font-bold text-slate-950">
            3
          </span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-full py-1 pr-2 outline-none hover:bg-slate-50">
            <Avatar>
              <AvatarImage src={avatar1.src} alt="Hicham K." />
              <AvatarFallback>HK</AvatarFallback>
            </Avatar>
            <span className="text-[14px] font-semibold text-slate-800">
              Hicham K.
            </span>
            <ChevronDown className="size-4 text-slate-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mon profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres du compte</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="h-11 shrink-0 rounded-xl bg-[#ffa514] px-5 text-[14px] font-semibold text-slate-950 shadow-[0_8px_20px_rgba(255,165,20,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d]">
          + Publier une demande
        </Button>
      </div>
    </div>
  );
}

function RequestCard({ request }) {
  const {
    Icon,
    title,
    subtitle,
    meta,
    status,
    note,
    provider,
    action,
    secondaryAction,
  } = request;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[15px] font-bold text-slate-950">{title}</p>
          <span className="text-[12px] text-slate-500">{meta}</span>
        </div>
        <p className="mt-0.5 text-[13px] text-slate-600">{subtitle}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${statusStyles[status]}`}
          >
            {status}
          </span>
          {note && <span className="text-[13px] text-slate-600">{note}</span>}
          {provider && (
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-slate-800">
              <Avatar size="sm">
                {provider.avatar && (
                  <AvatarImage src={provider.avatar.src} alt={provider.name} />
                )}
                <AvatarFallback>{provider.initials}</AvatarFallback>
              </Avatar>
              {provider.name}
              <BadgeCheck className="size-4 text-teal-600" />
            </span>
          )}
        </div>
      </div>

      {(action || secondaryAction) && (
        <div className="flex shrink-0 flex-wrap gap-2">
          {secondaryAction && (
            <Button
              variant="outline"
              className="h-9 rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              {secondaryAction}
            </Button>
          )}
          {action && (
            <Button
              variant="outline"
              className="h-9 rounded-lg border-teal-600 px-3.5 text-[13px] font-semibold text-teal-700 hover:bg-teal-50"
            >
              {action}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-full flex-1">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col">
        <DashboardHeader />

        <div className="grid flex-1 grid-cols-1 gap-6 bg-slate-50 p-5 sm:p-8 xl:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-bold text-slate-950">
                  Demandes actives
                </h2>
                <span className="text-[13px] font-semibold text-teal-700">
                  Voir toutes (4) →
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {requests.map((request) => (
                  <RequestCard key={request.title} request={request} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-bold text-slate-950">
                  Historique des missions
                </h2>
                <span className="text-[13px] font-semibold text-teal-700">
                  Voir tout →
                </span>
              </div>

              <Accordion className="mt-4 rounded-2xl border border-slate-200 bg-white px-4">
                <AccordionItem value="history" className="border-b-0">
                  <AccordionTrigger className="text-[14px] text-slate-700">
                    Voir vos anciennes missions terminées
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Aucune autre mission archivée pour le moment.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-teal-50 p-5">
              <span className="flex size-11 items-center justify-center rounded-full bg-white text-teal-700">
                <Headphones className="size-5" strokeWidth={1.8} />
              </span>
              <p className="mt-3 text-[15px] font-bold text-slate-950">
                Besoin d&apos;aide ?
              </p>
              <p className="mt-1 text-[13px] leading-[1.5] text-slate-600">
                Notre équipe est disponible 7j/7 pour vous accompagner.
              </p>
              <Button
                variant="outline"
                className="mt-3 h-10 rounded-lg border-teal-600 px-4 text-[13px] font-semibold text-teal-700 hover:bg-white"
              >
                Contacter le support
              </Button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-[15px] font-bold text-slate-950">
                Résumé de votre activité
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {stats.map(({ Icon, value, label, tone }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                        tone === "teal"
                          ? "bg-teal-50 text-teal-700"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      <Icon className="size-[18px]" strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-[15px] font-bold text-slate-950">
                        {value}
                      </p>
                      <p className="text-[12px] text-slate-600">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-[15px] font-bold text-slate-950">
                Pourquoi SOS House ?
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {reasons.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 text-[13px] text-slate-700"
                  >
                    <Icon className="size-4 shrink-0 text-teal-600" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
