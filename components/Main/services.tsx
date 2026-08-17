import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Broom,
  Car,
  ChevronRight,
  Droplet,
  Hexagon,
  Key,
  PaintRoller,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZelligeCorner } from "@/components/Main/zellige-corner";
import plombier from "@/app/assets/services/plombier.jpg";
import electricity from "@/app/assets/services/electricity.jpg";
import serrurerie from "@/app/assets/services/serrurerie.jpg";
import bricolage from "@/app/assets/services/bricolage.jpg";
import nettoyage from "@/app/assets/services/nottoyage.jpg";
import painting from "@/app/assets/services/painting.jpg";
import lavage from "@/app/assets/services/lavage.jpg";

const services = [
  {
    Icon: Droplet,
    title: "Plomberie",
    description: "Fuites, débouchage, installation sanitaire et chauffe-eau.",
    image: plombier,
  },
  {
    Icon: Zap,
    title: "Électricité",
    description: "Pannes, mises aux normes, tableaux électriques, éclairage.",
    image: electricity,
  },
  {
    Icon: Key,
    title: "Serrurerie",
    description: "Ouverture de porte, changement de serrure, sécurisation.",
    image: serrurerie,
  },
  {
    Icon: Wrench,
    title: "Bricolage",
    description: "Petites réparations, montage de meubles, fixations, etc.",
    image: bricolage,
  },
  {
    Icon: Broom,
    title: "Nettoyage",
    description: "Ménage à domicile, nettoyage en profondeur, après travaux.",
    image: nettoyage,
  },
  {
    Icon: PaintRoller,
    title: "Peinture",
    description: "Peinture intérieure et extérieure, enduit, retouches.",
    image: painting,
  },
  {
    Icon: Car,
    title: "Lavage auto",
    description: "Lavage intérieur et extérieur, nettoyage complet.",
    image: lavage,
  },
];

export function Services() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f6f5fc] py-20 sm:py-24 lg:py-[86px]">
      <ZelligeCorner
        id="zellige-services-tr"
        corner="top-right"
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-70 sm:h-[440px] sm:w-[440px]"
      />
      <ZelligeCorner
        id="zellige-services-bl"
        corner="bottom-left"
        className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 opacity-70 sm:h-[440px] sm:w-[440px]"
      />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="h-px w-8 shrink-0 bg-teal-300 sm:w-16" />
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-teal-700 whitespace-nowrap sm:text-sm">
              <span className="relative flex size-8 shrink-0 items-center justify-center">
                <Hexagon className="absolute size-8" strokeWidth={1.7} />
                <Wrench className="relative size-3.5" strokeWidth={2} />
              </span>
              SERVICES
            </span>
            <span className="h-px w-8 shrink-0 bg-teal-300 sm:w-16" />
          </div>
          <h2 className="mt-6 text-[31px] font-bold leading-[1.2] tracking-[-0.04em] text-slate-950 sm:text-[40px] lg:text-[48px]">
            Des services pour la maison, par des artisans vérifiés
            <span className="text-teal-600">.</span>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.7] text-slate-800 font-medium">
            Trouvez rapidement le bon artisan à Casablanca,
            <br />
            pour tous vos besoins du quotidien.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group w-full overflow-hidden rounded-2xl border border-slate-900/5 bg-white shadow-[0_12px_34px_rgba(69,64,112,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(69,64,112,0.16)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <div className="relative h-[170px] w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-black/25 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white shadow-[0_8px_18px_rgba(15,122,117,0.4)] ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                    <service.Icon className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="text-[17px] font-bold text-slate-950 transition-colors group-hover:text-teal-700">
                    {service.title}
                  </h3>
                </div>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-[14px] leading-[1.5] text-slate-600">
                    {service.description}
                  </p>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-teal-700 group-hover:text-white">
                    <ChevronRight className="size-4" strokeWidth={2.2} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-5 rounded-[20px] bg-[#ecebfa] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-center gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center text-teal-700">
              <ShieldCheck className="size-9" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-[17px] font-bold text-slate-950">
                Vous ne trouvez pas ce que vous cherchez ?
              </p>
              <p className="mt-1 text-[14px] text-slate-600">
                Publiez votre demande, on s&apos;occupe de trouver le bon
                artisan pour vous.
              </p>
            </div>
          </div>
          <Button
            render={<Link href="/publier-une-demande" />}
            nativeButton={false}
            className="h-[52px] shrink-0 justify-between rounded-xl bg-[#ffc400] px-6 text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,196,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffcb19]"
          >
            Publier une demande <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
