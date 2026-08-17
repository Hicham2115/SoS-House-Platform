import Image from "next/image";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  FileText,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import avatar2 from "@/app/assets/avatars/avatar-2.png";

function SealIcon({
  Icon,
  className,
}: {
  Icon: typeof ShieldCheck;
  className?: string;
}) {
  return (
    <span
      className={`relative flex size-16 shrink-0 items-center justify-center ${className ?? ""}`}
    >
      <span className="absolute inset-0 rounded-2xl bg-teal-700" />
      <span className="absolute inset-0 rotate-45 rounded-2xl bg-teal-700" />
      <Icon className="relative z-10 size-7 text-white" strokeWidth={1.8} />
    </span>
  );
}

const pillars = [
  {
    Icon: Users,
    title: "Identité vérifiée",
    description:
      "Chaque prestataire est identifié en personne. Carte d'identité vérifiée, adresse et téléphone confirmés.",
  },
  {
    Icon: Briefcase,
    title: "Statut professionnel vérifié",
    description:
      "Auto-entrepreneur ou société, nous vérifions le statut légal pour plus de sérieux, moins de risques.",
  },
  {
    Icon: FileText,
    title: "Facture garantie",
    description:
      "Besoin d'une facture avec ou sans TVA ? Vous pouvez l'exiger avant même de recevoir une réponse.",
  },
];

export function Verification() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f6f5fc] py-20 sm:py-24 lg:py-[86px]">
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-teal-700 whitespace-nowrap sm:text-sm">
              <ShieldCheck className="size-7 shrink-0 sm:size-9" strokeWidth={1.7} />
              POURQUOI ÇA COMPTE
            </span>
            <span className="h-px w-5 shrink-0 bg-teal-300 sm:w-7" />
          </div>
          <h2 className="mt-6 text-[31px] font-bold leading-[1.2] tracking-[-0.04em] text-slate-950 sm:text-[40px] lg:text-[48px]">
            La vérification, c&apos;est votre tranquillité
            <span className="text-teal-600">.</span>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.7] text-slate-800 font-medium">
            SOS House vérifie chaque prestataire en personne.
            <br />
            Vous savez qui entre chez vous, et vous pouvez{" "}
            <span className="font-bold text-teal-700">
              exiger une facture
            </span>{" "}
            avant même de recevoir une réponse.
          </p>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:mt-10 lg:grid-cols-3 lg:gap-10">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`relative rounded-[20px] bg-[#ecebf9] p-6 sm:p-7 ${
                index === pillars.length - 1
                  ? "sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-0.75rem)] lg:col-span-1 lg:max-w-none lg:mx-0"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <SealIcon Icon={pillar.Icon} />
                <div>
                  <h3 className="text-[19px] font-bold text-slate-950">
                    {pillar.title}
                  </h3>
                  <span className="mt-2 block h-0.5 w-6 rounded-full bg-teal-600" />
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-[1.7] text-slate-600">
                {pillar.description}
              </p>

              {index === 0 && (
                <div className="relative mt-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_12px_34px_rgba(69,64,112,0.08)]">
                  <Image
                    src={avatar2}
                    alt=""
                    className="size-14 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-bold text-slate-950">
                      Youssef E. Amrani
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] text-slate-600">
                      <CheckCircle2
                        className="size-3.5 shrink-0 text-teal-600"
                        strokeWidth={2.2}
                      />
                      Carte d&apos;identité vérifiée
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-slate-600">
                      <MapPin
                        className="size-3.5 shrink-0 text-teal-600"
                        strokeWidth={2.2}
                      />
                      Casablanca
                    </p>
                  </div>
                  <span className="absolute -bottom-3 -right-3 flex size-9 items-center justify-center rounded-full bg-teal-700 shadow-[0_5px_14px_rgba(15,122,117,0.25)]">
                    <CheckCircle2
                      className="size-5 text-white"
                      strokeWidth={2.2}
                    />
                  </span>
                </div>
              )}

              {index === 1 && (
                <div className="mt-6 flex flex-col gap-2.5">
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_34px_rgba(69,64,112,0.08)]">
                    <FileText
                      className="size-5 shrink-0 text-teal-700"
                      strokeWidth={1.8}
                    />
                    <p className="flex-1 text-[14px] font-medium text-slate-800">
                      Auto-entrepreneur vérifié
                    </p>
                    <CheckCircle2
                      className="size-5 shrink-0 text-teal-600"
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_34px_rgba(69,64,112,0.08)]">
                    <Building2
                      className="size-5 shrink-0 text-teal-700"
                      strokeWidth={1.8}
                    />
                    <p className="flex-1 text-[14px] font-medium text-slate-800">
                      Société vérifiée avec TVA
                    </p>
                    <CheckCircle2
                      className="size-5 shrink-0 text-teal-600"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              )}

              {index === 2 && (
                <div className="relative mt-6 rounded-2xl bg-white p-4 shadow-[0_12px_34px_rgba(69,64,112,0.08)]">
                  <p className="text-[13px] font-bold tracking-[0.06em] text-slate-950">
                    FACTURE
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-6">
                    <div className="flex-1 space-y-1.5">
                      <span className="block h-1.5 w-full rounded-full bg-slate-100" />
                      <span className="block h-1.5 w-3/4 rounded-full bg-slate-100" />
                      <span className="block h-1.5 w-full rounded-full bg-slate-100" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <span className="block h-1.5 w-full rounded-full bg-slate-100" />
                      <span className="block h-1.5 w-2/3 rounded-full bg-slate-100" />
                    </div>
                  </div>
                  <p className="mt-4 text-[13px] font-bold text-slate-500">
                    TVA
                  </p>
                  <span className="absolute -bottom-3 -right-3 flex size-9 items-center justify-center rounded-full bg-teal-700 shadow-[0_5px_14px_rgba(15,122,117,0.25)]">
                    <ShieldCheck
                      className="size-5 text-white"
                      strokeWidth={2}
                    />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-6 rounded-[20px] bg-teal-800 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-start gap-4 sm:items-center">
            <span className="flex size-12 shrink-0 items-center justify-center border-r border-white/20 pr-4 text-white sm:pr-6">
              <ShieldCheck className="size-9" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-[17px] font-bold text-white">
                Un service fiable commence par des prestataires fiables.
              </p>
              <p className="mt-1 text-[14px] text-teal-100">
                Moins de mauvaises surprises, plus de sérénité, et des
                travaux bien faits.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:border-l sm:border-white/20 sm:pl-8">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-yellow-400">
              <CheckCircle2 className="size-5 text-teal-900" strokeWidth={2.4} />
            </span>
            <p className="text-[15px] text-teal-100">
              C&apos;est ça, la différence
              <br />
              <span className="text-[16px] font-bold text-yellow-400">
                SOS House.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
