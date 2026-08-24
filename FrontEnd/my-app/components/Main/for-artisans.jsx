"use client";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  Handshake,
  Headset,
  Hexagon,
  MessageCircle,
  Quote,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import avatar2 from "@/app/assets/avatars/avatar-2.png";
import worker from "@/app/assets/worker.png";
import { useAuthDialogStore } from "@/lib/store/auth-dialog";
import { ZelligeCorner } from "@/components/Main/zellige-corner";
const benefits = [
  {
    Icon: Users,
    title: "Débloquez les demandes avec vos crédits",
    description:
      "Prévisualisez chaque demande en aperçu, puis utilisez vos crédits pour accéder aux coordonnées et répondre.",
  },
  {
    Icon: ShieldCheck,
    title: "Votre profil vérifié inspire confiance",
    description:
      "Badge vérifié, avis liés à vos travaux et possibilité de facture : vous vous démarquez.",
  },
  {
    Icon: Briefcase,
    title: "Paiement à temps",
    description:
      "Des clients sérieux et une communication claire pour éviter les impayés.",
  },
  {
    Icon: TrendingUp,
    title: "Des crédits bonus à chaque mission réussie",
    description:
      "Une mission confirmée et bien notée vous rapporte des crédits bonus, pour répondre à encore plus de demandes.",
  },
  {
    Icon: Headset,
    title: "Un support local, humain et réactif",
    description:
      "Une équipe basée à Casablanca, disponible quand vous avez besoin d'aide.",
  },
];
const stats = [
  { Icon: Users, value: "+2 500", label: "artisans vérifiés partout à Casablanca" },
  { Icon: FileText, value: "+18 000", label: "demandes traitées chaque mois" },
  { Icon: Star, value: "4,8 / 5", label: "note moyenne des artisans" },
  {
    Icon: CheckCircle2,
    value: "Paiement à temps",
    label: "une priorité pour des partenariats durables",
  },
];
export function ForArtisans() {
  const openSignUp = useAuthDialogStore((state) => state.openSignUp);
  return (
    <section
      id="prestataires"
      className="relative isolate overflow-hidden scroll-mt-20 bg-[#fcfcfd] py-20 sm:py-24 lg:scroll-mt-24 lg:py-[52px]"
    >
      <div className="absolute inset-y-0 right-0 hidden w-[55%] lg:block">
        <Image
          src={worker}
          alt=""
          fill
          sizes="55vw"
          className="object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfcfd] via-[#fcfcfd]/2 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:min-h-[650px] lg:grid-cols-[48%_52%] lg:gap-0">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-teal-800 whitespace-nowrap sm:text-sm">
                <span className="relative flex size-8 shrink-0 items-center justify-center">
                  <Hexagon className="absolute size-8" strokeWidth={1.7} />
                  <Users className="relative size-3.5" strokeWidth={2} />
                </span>
                POUR LES ARTISANS
              </span>
              <span className="h-px w-8 shrink-0 bg-teal-300 sm:w-16" />
            </div>

            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#ffa514]/10 px-3 py-1 text-[12px] font-bold text-[#a35d00]">
              <ShieldCheck className="size-3.5" strokeWidth={2} />
              14 jours d&apos;essai gratuit, sans engagement
            </span>

            <h2 className="mt-6 text-[38px] font-bold leading-[1.12] tracking-[-0.055em] text-slate-950 sm:text-[48px] lg:text-[54px]">
              Développez votre activité.
              <br />
              On s&apos;occupe du reste
              <span className="text-teal-600">.</span>
            </h2>

            <p className="mt-5 max-w-[650px] text-[17px] font-medium leading-[1.7] text-slate-700">
              SOS House vous met en relation avec des clients sérieux partout à
              Casablanca. Travaillez plus, soyez payé{" "}
              <span className="font-bold text-teal-800">à temps</span> et
              construisez votre{" "}
              <span className="font-bold text-teal-800">réputation</span>.
            </p>

            <div className="mt-7 max-w-[520px] divide-y divide-slate-200/75">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 py-3.5 first:pt-0"
                >
                  <span className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-teal-800 text-white shadow-[0_8px_18px_rgba(15,122,117,0.12)]">
                    <benefit.Icon className="size-[23px]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-[17px] font-bold tracking-[-0.025em] text-slate-950">
                      {benefit.title}
                    </p>
                    <p className="mt-0.5 text-[14px] leading-[1.6] text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto min-h-[490px] w-full max-w-[500px] pb-8 sm:pb-12 lg:mx-0 lg:min-h-[650px] lg:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-slate-100 lg:hidden">
              <Image
                src={worker}
                alt="Artisan vérifié SOS House"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
            </div>

            <div className="absolute left-0 top-1/2 z-10 w-[78%] max-w-[320px] -translate-x-3 -translate-y-1/2 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_20px_45px_rgba(69,64,112,0.16)] sm:-translate-x-12 lg:w-[320px]">
              <Quote
                className="size-7 fill-teal-600 text-teal-100"
                strokeWidth={0}
              />
              <p className="mt-3 text-[16px] leading-[1.7] text-slate-700">
                Grâce à SOS House, j&apos;ai trouvé des clients réguliers et
                sérieux. Je facture mes prestations et je suis payé à temps.
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
                <Image
                  src={avatar2}
                  alt=""
                  className="size-10 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold text-slate-950">
                    Youssef,
                  </p>
                  <p className="text-[12px] text-slate-500">Plombier</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 z-10 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_20px_45px_rgba(69,64,112,0.16)] sm:-right-2 sm:-bottom-6 lg:bottom-10 lg:-right-2">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-teal-800 text-white">
                <ShieldCheck className="size-7" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-[16px] font-bold text-slate-950">
                  Artisan vérifié
                </p>
                <p className="mt-1 max-w-[185px] text-[13px] leading-[1.5] text-slate-500">
                  Identité, statut et documents vérifiés par SOS House.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 rounded-[20px] bg-[#eef4f7] px-6 py-6 shadow-[0_12px_30px_rgba(67,94,110,0.05)] sm:px-10 lg:grid-cols-4 lg:divide-x lg:divide-slate-200">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 lg:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="flex size-[54px] shrink-0 items-center justify-center rounded-full bg-teal-800 text-white">
                <stat.Icon className="size-6" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-[20px] font-bold text-teal-800">
                  {stat.value}
                </p>
                <p className="text-[13px] leading-[1.4] text-slate-600">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-[20px] border border-teal-100 bg-teal-50/60 px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-10">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-teal-800 shadow-[0_8px_18px_rgba(15,122,117,0.12)]">
            <Handshake className="size-6" strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-[16px] font-bold text-slate-950">
              Le module Équipes : facturez pour ceux qui n&apos;ont pas encore
              leur propre statut
            </p>
            <p className="mt-1 text-[14px] leading-[1.6] text-slate-600">
              Vous êtes une société vérifiée ? Rattachez jusqu&apos;à 5 artisans
              indépendants à votre facture et à votre responsabilité, le temps
              qu&apos;ils formalisent leur propre statut.
            </p>
          </div>
        </div>

        <div className="relative mt-5 flex flex-col gap-6 overflow-hidden rounded-[20px] bg-[#16506f] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <ZelligeCorner
            id="artisan-cta-zellige"
            corner="bottom-left"
            className="pointer-events-none absolute -bottom-12 -left-10 size-48 opacity-25"
          />

          <div className="relative sm:border-r sm:border-white/20 sm:pr-8">
            <p className="text-[18px] font-bold text-white">
              Rejoignez une communauté d&apos;artisans sérieux et reconnus.
            </p>
            <p className="mt-1 text-[14px] text-teal-100">
              Plus de visibilité, plus de clients, plus de croissance.
            </p>
          </div>
          <div className="relative flex shrink-0 flex-col items-start gap-2 sm:items-end">
            <Button
              onClick={() => openSignUp("artisan")}
              className="h-[52px] justify-between rounded-xl bg-[#ffa514] px-6 text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,165,20,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d]"
            >
              Créer mon compte artisan <ArrowRight className="size-4" />
            </Button>
            <p className="flex items-center gap-1.5 text-[12px] text-teal-100">
              <ShieldCheck className="size-3.5" strokeWidth={2} />
              Inscription gratuite · 14 jours d&apos;essai offerts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
