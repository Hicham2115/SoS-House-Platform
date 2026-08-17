import Link from "next/link";
import { ArrowRight, House, ShieldCheck } from "lucide-react";
import avatar3 from "@/app/assets/avatars/avatar-3.png";

const steps = [
  {
    number: 1,
    title: "Publiez votre demande",
    description:
      "Décrivez votre besoin en quelques secondes : le type de service, votre adresse à Casablanca et vos préférences.",
    Illustration: PhoneIllustration,
  },
  {
    number: 2,
    title: "Comparez les réponses vérifiées",
    description:
      "Recevez des propositions d'artisans vérifiés, avec avis liés à des travaux réalisés et possibilité de facture.",
    Illustration: ReviewsIllustration,
  },
  {
    number: 3,
    title: "Choisissez en toute confiance",
    description:
      "Sélectionnez l'artisan qui vous convient. Contact direct, date d'intervention et travail en toute sérénité.",
    Illustration: DoorIllustration,
  },
];

function PhoneIllustration() {
  return (
    <svg viewBox="0 0 160 160" className="size-full">
      <circle cx="82" cy="86" r="60" fill="#eef1f6" />
      <path
        d="M24 128c4-22 16-30 24-30 6 0 8 6 16 6s8-8 16-8 10 10 18 10 12-8 18-4"
        fill="none"
        stroke="#cfd6e2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 132c0-18 8-28 12-28s6 10 12 10 6-6 10-6 10 8 10 22"
        fill="#a9d6c6"
      />
      <rect x="20" y="118" width="16" height="18" rx="2" fill="#c9b79a" />
      <g>
        <rect
          x="46"
          y="16"
          width="68"
          height="128"
          rx="16"
          fill="white"
          stroke="#0f7a75"
          strokeWidth="2.5"
        />
        <rect x="66" y="24" width="28" height="4" rx="2" fill="#dbe3ea" />
        <rect x="58" y="42" width="44" height="10" rx="5" fill="#eef1f6" />
        <rect x="58" y="58" width="44" height="10" rx="5" fill="#eef1f6" />
        <g>
          <rect x="58" y="74" width="44" height="10" rx="5" fill="#eef1f6" />
          <path
            d="M64 77.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 1.7-2.5 4-2.5 4s-2.5-2.3-2.5-4Z"
            fill="#0f7a75"
          />
        </g>
        <rect x="58" y="122" width="44" height="12" rx="6" fill="#ffc400" />
      </g>
    </svg>
  );
}

function ReviewsIllustration() {
  return (
    <svg viewBox="0 0 180 160" className="size-full">
      <circle cx="90" cy="82" r="60" fill="#eef1f6" />
      <rect
        x="46"
        y="20"
        width="96"
        height="88"
        rx="14"
        fill="white"
        stroke="#cfd6e2"
        strokeWidth="2"
        transform="rotate(6 94 64)"
      />
      <rect
        x="30"
        y="30"
        width="112"
        height="92"
        rx="16"
        fill="white"
        stroke="#0f7a75"
        strokeWidth="2.5"
      />
      <clipPath id="hiw-avatar-clip">
        <circle cx="58" cy="60" r="17" />
      </clipPath>
      <circle cx="58" cy="60" r="18" fill="#cfe9e6" />
      <image
        href={avatar3.src}
        x="41"
        y="43"
        width="34"
        height="34"
        clipPath="url(#hiw-avatar-clip)"
        preserveAspectRatio="xMidYMid slice"
      />
      <rect x="84" y="50" width="46" height="7" rx="3.5" fill="#e2e8f0" />
      <rect x="84" y="64" width="32" height="7" rx="3.5" fill="#e2e8f0" />
      {Array.from({ length: 5 }, (_, i) => (
        <path
          key={i}
          d="M0 -6 1.5 -2 6 -2 2.5 0.8 4 5 0 2.3 -4 5 -2.5 0.8 -6 -2 -1.5 -2Z"
          fill="#ffc400"
          transform={`translate(${44 + i * 14} 90)`}
        />
      ))}
      <circle cx="122" cy="100" r="13" fill="#0f7a75" />
      <path
        d="M116.5 100l4 4 7-8"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const zelligeStarPoints =
  "20,8 22.30,14.54 28.49,11.51 25.54,17.70 32,20 25.54,22.30 28.49,28.49 22.30,25.54 20,32 17.70,25.54 11.51,28.49 14.46,22.30 8,20 14.46,17.70 11.51,11.51 17.70,14.46";
const zelligeCrossPoints =
  "0,-5 1.41,-1.41 5,0 1.41,1.41 0,5 -1.41,1.41 -5,0 -1.41,-1.41";

function ZelligeCorner({
  id,
  corner,
  className,
}: {
  id: string;
  corner: "top-right" | "bottom-left";
  className: string;
}) {
  return (
    <div
      className={className}
      style={{
        maskImage: `radial-gradient(circle at ${corner === "top-right" ? "top right" : "bottom left"}, black, transparent 70%)`,
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#f6f5fc" />
            <polygon
              points={zelligeStarPoints}
              fill="#e4e1f6"
              stroke="#c2bce8"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <polygon
              points={zelligeCrossPoints}
              fill="#c2bce8"
              transform="translate(0 0)"
            />
            <polygon
              points={zelligeCrossPoints}
              fill="#c2bce8"
              transform="translate(40 0)"
            />
            <polygon
              points={zelligeCrossPoints}
              fill="#c2bce8"
              transform="translate(0 40)"
            />
            <polygon
              points={zelligeCrossPoints}
              fill="#c2bce8"
              transform="translate(40 40)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

function DoorIllustration() {
  return (
    <svg viewBox="0 0 160 170" className="size-full">
      <circle cx="80" cy="86" r="60" fill="#eef1f6" />
      <rect x="26" y="128" width="108" height="8" fill="#e3e8ee" />
      <path
        d="M46 132V70c0-18 14-32 34-32s34 14 34 32v62"
        fill="#f4f0e6"
        stroke="#0f7a75"
        strokeWidth="2.5"
      />
      <path
        d="M80 132V50c14 2 24 12 24 22v60"
        fill="none"
        stroke="#0f7a75"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <circle cx="72" cy="98" r="2.4" fill="#0f7a75" />
      <path
        d="M110 60c8-2 12 2 12 8s-6 8-6 8"
        fill="none"
        stroke="#c9b79a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="112" y="70" width="10" height="12" rx="2" fill="#ffc400" />
      <path
        d="M117 70v-6"
        stroke="#c9b79a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 132c2-16 10-24 16-24s6 8 12 8 6-6 10-6"
        fill="none"
        stroke="#a9d6c6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M22 132c0-14 6-22 10-22s5 8 9 8" fill="#a9d6c6" />
      <rect x="18" y="120" width="14" height="16" rx="2" fill="#c9b79a" />
      <path
        d="M122 101l20 8v16c0 13-9 22-20 27-11-5-20-14-20-27v-16l20-8Z"
        fill="#0f7a75"
        stroke="white"
        strokeWidth="3"
      />
      <path
        d="M112 124l7 7 13-14"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f6f5fc] py-20 sm:py-24 lg:py-[86px]">
      <ZelligeCorner
        id="zellige-tr"
        corner="top-right"
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-70 sm:h-[440px] sm:w-[440px]"
      />
      <ZelligeCorner
        id="zellige-bl"
        corner="bottom-left"
        className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 opacity-70 sm:h-[440px] sm:w-[440px]"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="h-px w-5 shrink-0 bg-teal-300 sm:w-7" />
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-teal-700 whitespace-nowrap sm:text-sm">
              <House className="size-7 shrink-0 sm:size-10" strokeWidth={1.7} />
              COMMENT ÇA MARCHE
            </span>
            <span className="h-px w-5 shrink-0 bg-teal-300 sm:w-7" />
          </div>
          <h2 className="mt-6 text-[31px] font-bold leading-[1.2] tracking-[-0.04em] text-slate-950 sm:text-[40px] lg:text-[48px]">
            3 étapes simples pour trouver
            <br />
            le bon artisan, en toute confiance
            <span className="text-teal-600">.</span>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.7] text-slate-800 font-medium">
            SOS House vous connecte avec des artisans vérifiés à Casablanca.
            <br />
            Vous comparez, vous choisissez, ils s&apos;occupent du reste.
          </p>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-3 lg:gap-10">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative min-h-[440px] rounded-[15px] bg-white px-5 pb-7 pt-5 text-center shadow-[0_12px_34px_rgba(69,64,112,0.055)] sm:px-6 lg:px-7 ${
                index === steps.length - 1
                  ? "sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-0.75rem)] lg:col-span-1 lg:max-w-none lg:mx-0"
                  : ""
              }`}
            >
              <span className="absolute left-5 top-5 z-20 flex size-11 items-center justify-center rounded-full bg-teal-700 text-lg font-bold text-white shadow-[0_5px_14px_rgba(15,122,117,0.2)]">
                {step.number}
              </span>
              <div className="mx-auto size-45 sm:size-47.5 lg:size-54.5">
                <step.Illustration />
              </div>
              <h3 className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-slate-950">
                {step.title}
              </h3>
              <p className="mx-auto mt-4 max-w-[330px] text-[16px] leading-[1.65] text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-5 rounded-[20px] bg-[#ecebfa] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center border-r border-[#c8c5e0] pr-4 text-teal-700 sm:size-auto sm:pr-7">
              <ShieldCheck className="size-11" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-[18px] font-bold text-slate-950">
                Tous nos artisans sont vérifiés en personne.
              </p>
              <p className="mt-1 text-[15px] text-slate-600">
                Identité, statut et capacité à émettre une facture : vous savez
                à qui vous faites confiance.
              </p>
            </div>
          </div>
          <Link
            href="/verification"
            className="flex shrink-0 items-center gap-3 pl-15 text-[16px] font-bold text-teal-700 transition-colors hover:text-teal-800 sm:pl-0"
          >
            En savoir plus sur la vérification
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
