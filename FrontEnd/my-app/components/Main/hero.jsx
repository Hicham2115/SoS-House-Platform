"use client";
import Image from "next/image";
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
import { useAuthDialogStore } from "@/lib/store/auth-dialog";

function starPoints(cx, cy, spikes, outerR, innerR) {
  const step = Math.PI / spikes;
  const coords = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    coords.push(
      `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`,
    );
  }
  return coords.join(" ");
}
const outerStar = starPoints(32, 32, 8, 27, 15.5);
const rosetteStar = starPoints(32, 32, 8, 19.5, 10.5);
const sunStar = starPoints(32, 32, 8, 8.5, 4.5);
const dotAngles = Array.from({ length: 8 }, (_, i) => i * 45 - 90);
const tileStar = starPoints(20, 20, 8, 12, 6);
const tileCross = starPoints(0, 0, 4, 5, 2);
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
          <p className="mt-1 text-sm text-slate-600">Artisan</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="size-3.5" />
            Casablanca
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-4 border-t border-slate-200 pt-5">
        {trustItems.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-800">
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
        <Star className="size-5 fill-[#ffa514] text-[#ffa514]" />
        <span className="font-bold text-slate-950">4,9 / 5</span>
        <span className="mx-1 text-teal-800">•</span>
        <span className="text-slate-600">27 travaux réalisés</span>
      </div>
      <p className="mt-1 pl-7 text-xs text-slate-500">
        Avis liés aux travaux réalisés
      </p>
      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#edf3f7] p-4">
        <LockKeyhole className="size-6 shrink-0 text-teal-800" />
        <div>
          <p className="text-sm font-bold text-teal-950">
            Facture garantie avant réponse
          </p>
          <p className="mt-0.5 text-xs text-teal-800">
            Vous le savez avant de choisir.
          </p>
        </div>
      </div>
    </>
  );
}
function AvatarsRow() {
  return (
    <div className="relative flex items-center gap-4">
      <div
        className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 opacity-[0.14]"
        style={{
          maskImage: "radial-gradient(ellipse at left, black, transparent 72%)",
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="hero-zellige"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points={tileStar}
                fill="#0f557a"
                stroke="#0b425f"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
              <polygon
                points={tileCross}
                fill="#ffa514"
                transform="translate(0 0)"
              />
              <polygon
                points={tileCross}
                fill="#ffa514"
                transform="translate(40 0)"
              />
              <polygon
                points={tileCross}
                fill="#ffa514"
                transform="translate(0 40)"
              />
              <polygon
                points={tileCross}
                fill="#ffa514"
                transform="translate(40 40)"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-zellige)" />
        </svg>
      </div>
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
        partout à Casablanca
        <br />
        par des{" "}
        <span className="font-medium text-teal-800 underline decoration-teal-400 decoration-2 underline-offset-4">
          artisans vérifiés
        </span>
      </p>
    </div>
  );
}
export function Hero() {
  const openSignUp = useAuthDialogStore((state) => state.openSignUp);

  return (
    <section className="relative isolate overflow-hidden bg-[#fcfdfc] xl:min-h-[700px]">
      <div className="absolute inset-y-0 right-0 w-[60%] sm:w-[55%]">
        <Image
          src={bghero}
          alt=""
          fill
          sizes="(min-width: 1024px) 55vw, 60vw"
          className="object-cover object-[62%_center]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfc] from-0% to-transparent to-70% xl:to-20%" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcfdfc] from-0% to-transparent to-45% xl:hidden" />
      </div>
      <div className="hero-pattern absolute inset-0 opacity-70" />
      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 px-5 py-10 sm:px-8 lg:pt-16 xl:min-h-[700px] xl:grid-cols-[51%_49%] xl:content-start xl:px-12 xl:py-14">
        <div className="relative z-10 flex flex-col justify-center xl:pb-28">
          <div className="inline-flex w-fit items-center gap-2 text-sm font-bold tracking-[0.07em] text-teal-800 ">
            <span className="flex size-8 items-center justify-center rounded-full bg-teal-50">
              <MapPin className="size-[18px]" />
            </span>
            PARTOUT À CASABLANCA
          </div>
          <h1 className="mt-5 max-w-[680px] text-[32px] font-bold text-slate-950 sm:text-[44px] lg:text-[50px]">
            Un Artisan Chez Vous<span className="text-teal-800">.</span>
            <br />
            Vérifié Avant Votre Choix<span className="text-teal-800">.</span>
          </h1>
          <p className="mt-5 max-w-[555px] font-normal text-[18px] leading-[1.75] text-slate-800">
            Identité vérifiée, avis liés aux travaux réalisés et possibilité de
            demander une facture avant même de recevoir une réponse.
          </p>
          <div className="mt-4 flex items-center gap-2.5 text-[16px] font-semibold text-teal-800">
            <ShieldCheck className="size-5" />
            On vérifie, pour que vous n&apos;ayez pas à vous inquiéter.
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => openSignUp("client")}
              className="h-[60px] justify-between rounded-xl bg-[#ffa514] px-7 text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,165,20,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d] sm:min-w-[200px]"
            >
              Publier une demande <ArrowRight className="size-5" />
            </Button>
            <Button
              onClick={() => openSignUp("artisan")}
              variant="outline"
              className="h-[60px] rounded-xl border-teal-800 bg-white/70 px-8 text-[15px] font-bold text-teal-800 transition hover:bg-teal-50"
            >
              Devenir prestataire
            </Button>
          </div>
          <p className="mt-3 text-[13px] font-semibold text-teal-800">
            Artisans : 14 jours d&apos;essai gratuit, sans engagement.
          </p>
        </div>

        <div className="relative z-10 mt-8 xl:col-start-2 xl:row-span-2 xl:mt-0 xl:flex xl:items-center xl:justify-center">
          <div className="mx-auto w-full max-w-[400px] rounded-[27px] border border-white/80 bg-white/95 p-6 shadow-[0_24px_60px_rgba(12,55,55,0.2)] backdrop-blur-md xl:absolute xl:left-[30%] xl:top-[54%] xl:w-[400px] xl:max-w-none xl:-translate-x-1/2 xl:-translate-y-1/2">
            <ProviderCard />
          </div>
        </div>

        <div className="mt-10 mb-20 xl:col-start-1 xl:row-start-2 xl:mb-0 xl:-mt-48 xl:flex xl:items-end xl:pb-10">
          <AvatarsRow />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[-116px] left-[-5%] z-20 h-[190px] w-[110%] rounded-[50%_50%_0_0/50%_50%_0_0] bg-[#edf4f8]" />
      <svg
        viewBox="0 0 64 64"
        className="pointer-events-none absolute bottom-4 left-1/2 z-30 size-16 -translate-x-1/2 drop-shadow-[0_6px_10px_rgba(6,60,58,0.35)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="starBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a709e" />
            <stop offset="100%" stopColor="#0b425f" />
          </linearGradient>
          <radialGradient id="starPlate" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#2f85b3" />
            <stop offset="100%" stopColor="#0f557a" />
          </radialGradient>
          <radialGradient id="starSun" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffe7c1" />
            <stop offset="55%" stopColor="#ffa514" />
            <stop offset="100%" stopColor="#fa9a00" />
          </radialGradient>
        </defs>
        <polygon
          points={outerStar}
          fill="url(#starBody)"
          stroke="#082c40"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="32" r="21" fill="url(#starPlate)" />
        <polygon
          points={rosetteStar}
          fill="none"
          stroke="#e8f4fb"
          strokeOpacity="0.8"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {dotAngles.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={32 + 19.5 * Math.cos(rad)}
              cy={32 + 19.5 * Math.sin(rad)}
              r="1.1"
              fill="#e8f4fb"
              fillOpacity="0.9"
            />
          );
        })}
        <polygon
          points={sunStar}
          fill="url(#starSun)"
          stroke="#a9770a"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        <circle cx="30" cy="30" r="1.4" fill="#fff6db" fillOpacity="0.85" />
      </svg>
    </section>
  );
}
