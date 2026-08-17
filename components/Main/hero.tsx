import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  FileText,
  IdCard,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import bghero from "@/app/assets/bghero.png";
import avatar1 from "@/app/assets/avatars/avatar-1.png";
import avatar2 from "@/app/assets/avatars/avatar-2.png";
import avatar3 from "@/app/assets/avatars/avatar-3.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const clientAvatars = [avatar1, avatar2, avatar3];

const trustItems = [
  {
    icon: IdCard,
    title: "Identité vérifiée",
    description: "Vérification en personne",
  },
  {
    icon: BriefcaseBusiness,
    title: "Auto-entrepreneur vérifié",
    description: "Statut vérifié",
  },
  {
    icon: FileText,
    title: "Facture disponible",
    description: "Avec ou sans TVA",
  },
];

function ProviderCard() {
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar size="lg" className="size-[76px]">
          <AvatarImage src={avatar3.src} alt="" />
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1.5">
            <p className="truncate text-[17px] font-bold text-slate-950">
              Youssef El Amrani
            </p>
            <ShieldCheck className="size-7 shrink-0 fill-teal-600 text-white" />
          </div>
          <p className="mt-1 text-sm text-slate-600">Plombier</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="size-3.5" />
            Casablanca
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-4 border-t border-slate-200 pt-5">
        {trustItems.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <item.icon className="size-[17px]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-900">{item.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {item.description}
              </p>
            </div>
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
              <Check className="size-3" strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 border-t border-slate-200 pt-5 text-sm">
        <Star className="size-5 fill-[#ffc400] text-[#ffc400]" />
        <span className="font-bold text-slate-950">4,9 / 5</span>
        <span className="mx-1 text-teal-700">•</span>
        <span className="text-slate-600">27 travaux réalisés</span>
      </div>
      <p className="mt-1 pl-7 text-xs text-slate-500">
        Avis liés aux travaux réalisés
      </p>
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#edf7f6] p-4">
        <LockKeyhole className="size-6 shrink-0 text-teal-700" />
        <div>
          <p className="text-sm font-bold text-teal-950">
            Facture garantie avant réponse
          </p>
          <p className="mt-0.5 text-xs text-teal-700">
            Vous le savez avant de choisir.
          </p>
        </div>
      </div>
    </>
  );
}

function AvatarsRow() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-3">
        {clientAvatars.map((src, index) => (
          <Avatar
            key={index}
            size="lg"
            className="border-2 border-white shadow-[0_4px_10px_rgba(15,23,42,0.15)]"
          >
            <AvatarImage src={src.src} alt="" />
          </Avatar>
        ))}
      </div>
      <p className="text-[15px] leading-relaxed text-slate-700">
        <span className="font-semibold text-slate-900">
          +2 500 travaux réalisés
        </span>{" "}
        à Casablanca
        <br />
        par des{" "}
        <span className="font-medium text-teal-700 underline decoration-teal-400 decoration-2 underline-offset-4">
          artisans vérifiés
        </span>
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fcfdfc] lg:min-h-[900px]">
      <div className="absolute inset-y-0 right-0 w-[60%] sm:w-[55%]">
        <Image
          src={bghero}
          alt=""
          fill
          sizes="(min-width: 1024px) 55vw, 60vw"
          className="object-cover object-[62%_center]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfc] from-0% to-transparent to-70% lg:to-20%" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcfdfc] from-0% to-transparent to-45% lg:hidden" />
      </div>
      <div className="hero-pattern absolute inset-0 opacity-70" />
      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 px-5 py-16 sm:px-8 lg:min-h-[900px] lg:grid-cols-[51%_49%] lg:px-12 lg:py-20">
        <div className="relative z-10 flex flex-col justify-center lg:pb-28">
          <div className="inline-flex w-fit items-center gap-2 text-sm font-bold tracking-[0.07em] text-teal-700 lg:-mt-20">
            <span className="flex size-8 items-center justify-center rounded-full bg-teal-50">
              <MapPin className="size-[18px]" />
            </span>
            CASABLANCA
          </div>
          <h1 className="mt-8 max-w-[680px] text-[32px] font-bold text-slate-950 sm:text-[44px] lg:text-[50px]">
            Un artisan chez vous<span className="text-teal-600">.</span>
            <br />
            Vérifié avant votre choix<span className="text-teal-600">.</span>
          </h1>
          <p className="mt-8 max-w-[555px] font-normal text-[18px] leading-[1.75] text-slate-800">
            Identité vérifiée, avis liés aux travaux réalisés et possibilité de
            demander une facture avant même de recevoir une réponse.
          </p>
          <div className="mt-6 flex items-center gap-2.5 text-[16px] font-semibold text-teal-700">
            <ShieldCheck className="size-5" />
            Vous choisissez après avoir comparé.
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              render={<Link href="/publier-une-demande" />}
              nativeButton={false}
              className="h-[66px] justify-between rounded-xl bg-[#ffc400] px-7 text-[16px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,196,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffcb19] sm:min-w-[260px]"
            >
              Publier une demande <ArrowRight className="size-5" />
            </Button>
            <Button
              render={<Link href="/devenir-prestataire" />}
              nativeButton={false}
              variant="outline"
              className="h-[66px] rounded-xl border-teal-700 bg-white/70 px-8 text-[16px] font-bold text-teal-700 transition hover:bg-teal-50"
            >
              Devenir prestataire
            </Button>
          </div>
        </div>

        <div className="relative z-10 mt-8 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:flex lg:items-center lg:justify-center">
          <div className="mx-auto w-full max-w-[400px] rounded-[27px] border border-white/80 bg-white/95 p-6 shadow-[0_24px_60px_rgba(12,55,55,0.2)] backdrop-blur-md lg:absolute lg:left-[30%] lg:top-[54%] lg:w-[400px] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2">
            <ProviderCard />
          </div>
        </div>

        <div className="mt-8 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:flex lg:items-end lg:pb-10">
          <AvatarsRow />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[-116px] left-[-5%] z-20 h-[190px] w-[110%] rounded-[50%_50%_0_0/50%_50%_0_0] bg-[#edf8f7]" />
      <svg
        viewBox="0 0 64 64"
        className="pointer-events-none absolute bottom-4 left-1/2 z-30 size-16 -translate-x-1/2 drop-shadow-[0_6px_10px_rgba(6,60,58,0.35)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="starBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14958f" />
            <stop offset="100%" stopColor="#0b5f5c" />
          </linearGradient>
          <radialGradient id="starCenter" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffe08a" />
            <stop offset="55%" stopColor="#ffc400" />
            <stop offset="100%" stopColor="#e6a600" />
          </radialGradient>
        </defs>
        <rect
          x="9"
          y="9"
          width="46"
          height="46"
          rx="4"
          fill="url(#starBody)"
          stroke="#08403e"
          strokeWidth="0.75"
        />
        <rect
          x="9"
          y="9"
          width="46"
          height="46"
          rx="4"
          fill="url(#starBody)"
          stroke="#08403e"
          strokeWidth="0.75"
          transform="rotate(45 32 32)"
        />
        <path
          d="M32 20.5 L36.5 27.5 L44.5 27 L40 34 L44.5 41 L36.5 40.5 L32 47.5 L27.5 40.5 L19.5 41 L24 34 L19.5 27 L27.5 27.5 Z"
          fill="none"
          stroke="#a9e6df"
          strokeOpacity="0.55"
          strokeWidth="0.75"
        />
        <circle cx="32" cy="32" r="7" fill="url(#starCenter)" stroke="#a9770a" strokeWidth="0.5" />
        <circle cx="30" cy="30" r="2" fill="#fff6db" fillOpacity="0.8" />
      </svg>
    </section>
  );
}
