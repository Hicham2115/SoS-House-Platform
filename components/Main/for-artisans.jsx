"use client";
import Image from "next/image";
import { ArrowRight, Briefcase, CheckCircle2, FileText, Headset, Hexagon, Quote, ShieldCheck, Star, TrendingUp, Users, } from "lucide-react";
import { Button } from "@/components/ui/button";
import avatar2 from "@/app/assets/avatars/avatar-2.png";
import { useAuthDialogStore } from "@/lib/store/auth-dialog";
const benefits = [
    {
        Icon: Users,
        title: "Des demandes qualifiées chaque jour",
        description: "Recevez des demandes ciblées près de chez vous.",
    },
    {
        Icon: ShieldCheck,
        title: "Votre profil vérifié inspire confiance",
        description: "Badge vérifié, avis liés à vos travaux et possibilité de facture : vous vous démarquez.",
    },
    {
        Icon: Briefcase,
        title: "Paiement à temps",
        description: "Des clients sérieux et une communication claire pour éviter les impayés.",
    },
    {
        Icon: TrendingUp,
        title: "Développez votre réputation",
        description: "Plus de bons avis = plus de visibilité = plus de clients.",
    },
    {
        Icon: Headset,
        title: "Un support local, humain et réactif",
        description: "Une équipe à Casablanca, disponible quand vous avez besoin d'aide.",
    },
];
const stats = [
    { Icon: Users, value: "+2 500", label: "artisans vérifiés à Casablanca" },
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
    return (<section id="prestataires" className="scroll-mt-20 bg-white py-20 sm:py-24 lg:scroll-mt-24 lg:py-[86px]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-teal-700 whitespace-nowrap sm:text-sm">
                <span className="relative flex size-8 shrink-0 items-center justify-center">
                  <Hexagon className="absolute size-8" strokeWidth={1.7}/>
                  <Users className="relative size-3.5" strokeWidth={2}/>
                </span>
                POUR LES ARTISANS
              </span>
              <span className="h-px w-8 shrink-0 bg-teal-300 sm:w-16"/>
            </div>

            <h2 className="mt-6 text-[31px] font-bold leading-[1.2] tracking-[-0.04em] text-slate-950 sm:text-[38px] lg:text-[42px]">
              Développez votre activité.
              <br />
              On s&apos;occupe du reste
              <span className="text-teal-600">.</span>
            </h2>

            <p className="mt-6 text-[17px] leading-[1.7] text-slate-800 font-medium">
              SOS House vous met en relation avec des clients sérieux à
              Casablanca. Travaillez plus, soyez payé{" "}
              <span className="font-bold text-teal-700">à temps</span> et
              construisez votre{" "}
              <span className="font-bold text-teal-700">réputation</span>.
            </p>

            <div className="mt-8 divide-y divide-slate-100">
              {benefits.map((benefit) => (<div key={benefit.title} className="flex gap-4 py-4 first:pt-0">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white">
                    <benefit.Icon className="size-5" strokeWidth={1.8}/>
                  </span>
                  <div>
                    <p className="text-[16px] font-bold text-slate-950">
                      {benefit.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-[1.6] text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] pb-10 sm:pb-14 lg:mx-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-teal-800 to-teal-950">
              <Image src={avatar2} alt="Artisan vérifié SOS House" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover object-top opacity-90"/>
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 via-transparent to-transparent"/>
            </div>

            <div className="absolute -bottom-2 left-0 w-[78%] rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_20px_45px_rgba(69,64,112,0.16)] sm:-bottom-6">
              <Quote className="size-7 fill-teal-100 text-teal-100" strokeWidth={0}/>
              <p className="mt-2 text-[14px] leading-[1.6] text-slate-700">
                Grâce à SOS House, j&apos;ai trouvé des clients réguliers et
                sérieux. Je facture mes prestations et je suis payé à temps.
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                <Image src={avatar2} alt="" className="size-10 shrink-0 rounded-full object-cover"/>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold text-slate-950">
                    Youssef,
                  </p>
                  <p className="text-[12px] text-slate-500">Plombier</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 right-0 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_20px_45px_rgba(69,64,112,0.16)] sm:right-2">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white">
                <ShieldCheck className="size-5" strokeWidth={1.8}/>
              </span>
              <div>
                <p className="text-[14px] font-bold text-slate-950">
                  Artisan vérifié
                </p>
                <p className="max-w-[170px] text-[12px] leading-[1.5] text-slate-500">
                  Identité, statut et documents vérifiés par SOS House.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 rounded-[20px] bg-[#f2f4f8] px-6 py-7 sm:px-10 lg:grid-cols-4 lg:divide-x lg:divide-slate-200">
          {stats.map((stat) => (<div key={stat.label} className="flex items-center gap-3 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white">
                <stat.Icon className="size-5" strokeWidth={1.8}/>
              </span>
              <div>
                <p className="text-[17px] font-bold text-slate-950">
                  {stat.value}
                </p>
                <p className="text-[13px] leading-[1.4] text-slate-600">
                  {stat.label}
                </p>
              </div>
            </div>))}
        </div>

        <div className="relative mt-6 flex flex-col gap-6 overflow-hidden rounded-[20px] bg-teal-800 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-white/5"/>

          <div className="relative sm:border-r sm:border-white/20 sm:pr-8">
            <p className="text-[18px] font-bold text-white">
              Rejoignez une communauté d&apos;artisans sérieux et reconnus.
            </p>
            <p className="mt-1 text-[14px] text-teal-100">
              Plus de visibilité, plus de clients, plus de croissance.
            </p>
          </div>
          <div className="relative flex shrink-0 flex-col items-start gap-2 sm:items-end">
            <Button onClick={openSignUp} className="h-[52px] justify-between rounded-xl bg-[#ffc400] px-6 text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,196,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffcb19]">
              Créer mon compte artisan <ArrowRight className="size-4"/>
            </Button>
            <p className="flex items-center gap-1.5 text-[12px] text-teal-100">
              <ShieldCheck className="size-3.5" strokeWidth={2}/>
              Inscription gratuite · Vérification rapide
            </p>
          </div>
        </div>
      </div>
    </section>);
}
