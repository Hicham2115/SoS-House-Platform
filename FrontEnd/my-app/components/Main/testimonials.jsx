"use client";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, ClipboardCheck, Droplets, FileText, Key, Quote, ShieldCheck, Star, Users, Wrench, } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ZelligeCorner } from "@/components/Main/zellige-corner";
import avatar1 from "@/app/assets/avatars/avatar-1.png";
import avatar3 from "@/app/assets/avatars/avatar-3.png";
const testimonials = [
    {
        name: "Nadia E.",
        location: "Maarif, Casablanca",
        rating: "5.0",
        quote: "Le plombier est arrivé à l'heure, il a trouvé le problème rapidement et tout fonctionne parfaitement. J'ai demandé une facture et je l'ai reçue sans problème.",
        avatar: avatar1,
        DetailIcon: FileText,
        work: "Réparation fuite d'eau",
        artisan: "Youssef, Plombier",
        date: "12 mai 2024",
        invoiceLabel: "Facture fournie",
    },
    {
        name: "Karim B.",
        location: "Agdal, Rabat",
        rating: "5.0",
        quote: "Changement de disjoncteur et mise aux normes de mon tableau électrique. Travail propre, explications claires et facture avec TVA fournie.",
        avatar: avatar3,
        DetailIcon: BadgeCheck,
        work: "Mise aux normes électriques",
        artisan: "Amine, Électricien",
        date: "28 avril 2024",
        invoiceLabel: "Facture avec TVA",
    },
    {
        name: "Salma H.",
        location: "Guéliz, Marrakech",
        rating: "5.0",
        quote: "Serrurier très pro et honnête. Il a changé la serrure de ma porte d'entrée en moins d'une heure. Je recommande les yeux fermés.",
        avatar: null,
        initials: "SH",
        DetailIcon: Key,
        work: "Changement serrure",
        artisan: "Yassine, Serrurier",
        date: "5 mai 2024",
        invoiceLabel: "Facture fournie",
    },
    {
        name: "Omar A.",
        location: "Ville Nouvelle, Fès",
        rating: "5.0",
        quote: "Très bonne expérience. L'artisan était ponctuel, professionnel et a laissé les lieux parfaitement propres après son intervention.",
        avatar: avatar3,
        DetailIcon: Wrench,
        work: "Réparation plomberie",
        artisan: "Mehdi, Plombier",
        date: "18 mai 2024",
        invoiceLabel: "Facture fournie",
    },
    {
        name: "Imane R.",
        location: "Malabata, Tanger",
        rating: "5.0",
        quote: "Intervention rapide et efficace pour réparer mon installation électrique. Le travail a été fait avec beaucoup de sérieux.",
        avatar: null,
        initials: "IR",
        DetailIcon: BadgeCheck,
        work: "Réparation électrique",
        artisan: "Rachid, Électricien",
        date: "22 mai 2024",
        invoiceLabel: "Facture avec TVA",
    },
    {
        name: "Mehdi K.",
        location: "Founty, Agadir",
        rating: "4.9",
        quote: "J'avais une fuite importante dans la salle de bain. Le problème a été identifié et réparé rapidement. Très satisfait du résultat.",
        avatar: avatar3,
        DetailIcon: Droplets,
        work: "Réparation fuite d'eau",
        artisan: "Hassan, Plombier",
        date: "2 juin 2024",
        invoiceLabel: "Facture fournie",
    },
    {
        name: "Sara M.",
        location: "Hamria, Meknès",
        rating: "5.0",
        quote: "Excellent service du début à la fin. Le serrurier est arrivé rapidement et a remplacé ma serrure sans aucun dégât.",
        avatar: null,
        initials: "SM",
        DetailIcon: Key,
        work: "Remplacement serrure",
        artisan: "Anas, Serrurier",
        date: "9 juin 2024",
        invoiceLabel: "Facture fournie",
    },
    {
        name: "Yassine T.",
        location: "Al Qods, Oujda",
        rating: "5.0",
        quote: "Artisan sérieux et très professionnel. Il m'a bien expliqué les travaux à réaliser et le prix avant de commencer.",
        avatar: avatar3,
        DetailIcon: FileText,
        work: "Installation sanitaire",
        artisan: "Soufiane, Plombier",
        date: "15 juin 2024",
        invoiceLabel: "Facture fournie",
    },
    {
        name: "Aya L.",
        location: "Saiss, Kénitra",
        rating: "5.0",
        quote: "Le travail est impeccable et l'intervention a été beaucoup plus rapide que prévu. Je referai appel à eux sans hésiter.",
        avatar: null,
        initials: "AL",
        DetailIcon: Wrench,
        work: "Installation électrique",
        artisan: "Hamza, Électricien",
        date: "21 juin 2024",
        invoiceLabel: "Facture avec TVA",
    },
    {
        name: "Reda F.",
        location: "Sidi Maarouf, Casablanca",
        rating: "5.0",
        quote: "Très satisfait de la prestation. Ponctuel, transparent sur les tarifs et surtout un travail de qualité. Je recommande vivement.",
        avatar: avatar3,
        DetailIcon: BadgeCheck,
        work: "Réparation et entretien",
        artisan: "Ayoub, Artisan",
        date: "27 juin 2024",
        invoiceLabel: "Facture fournie",
    },
];
const stats = [
    { Icon: ClipboardCheck, value: "4,8 / 5", label: "note moyenne" },
    { Icon: Users, value: "2 800+", label: "avis clients" },
    { Icon: FileText, value: "1 950+", label: "factures émises" },
    { Icon: ShieldCheck, value: "100%", label: "avis vérifiés" },
];
function StarRow() {
    return (<div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (<Star key={i} className="size-4 fill-[#ffa514] text-[#ffa514]"/>))}
    </div>);
}
export function Testimonials() {
    const scrollerRef = useRef(null);
    const scrollByCard = (direction) => {
        scrollerRef.current?.scrollBy({
            left: direction * scrollerRef.current.clientWidth,
            behavior: "smooth",
        });
    };
    return (<section className="relative isolate overflow-hidden bg-[#f6f5fc] py-20 sm:py-24 lg:py-[86px]">
      <ZelligeCorner id="zellige-testimonials-tr" corner="top-right" className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-70 sm:h-[440px] sm:w-[440px]"/>
      <ZelligeCorner id="zellige-testimonials-bl" corner="bottom-left" className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 opacity-70 sm:h-[440px] sm:w-[440px]"/>

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="h-px w-8 shrink-0 bg-teal-300 sm:w-16"/>
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-teal-700 whitespace-nowrap sm:text-sm">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-teal-600">
                <Quote className="size-3.5" strokeWidth={2.2}/>
              </span>
              TÉMOIGNAGES
            </span>
            <span className="h-px w-8 shrink-0 bg-teal-300 sm:w-16"/>
          </div>
          <h2 className="mt-6 text-[31px] font-bold leading-[1.2] tracking-[-0.04em] text-slate-950 sm:text-[40px] lg:text-[46px]">
            Des avis liés à de vrais travaux.
            <br />
            De vrais clients partout au Maroc
            <span className="text-teal-600">.</span>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.7] text-slate-800 font-medium">
            Chaque avis est laissé après un travail réalisé et{" "}
            <span className="font-bold text-teal-700">vérifié</span> par SOS
            House.
          </p>
        </div>

        <div className="relative mt-10 px-9 sm:px-0">
          <button type="button" onClick={() => scrollByCard(-1)} aria-label="Avis précédents" className="absolute left-0 top-1/2 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-teal-700 shadow-[0_12px_28px_rgba(69,64,112,0.16)] transition hover:bg-teal-50 sm:size-11 sm:-translate-x-1/2">
            <ArrowLeft className="size-5"/>
          </button>
          <button type="button" onClick={() => scrollByCard(1)} aria-label="Avis suivants" className="absolute right-0 top-1/2 z-10 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-teal-700 shadow-[0_12px_28px_rgba(69,64,112,0.16)] transition hover:bg-teal-50 sm:size-11 sm:translate-x-1/2">
            <ArrowRight className="size-5"/>
          </button>

          <div ref={scrollerRef} className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t) => (<div key={t.name} className="w-full shrink-0 snap-start rounded-2xl bg-white p-6 shadow-[0_12px_34px_rgba(69,64,112,0.08)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <div className="flex items-start gap-3">
                  <Avatar size="lg" className="size-14 shrink-0">
                    {t.avatar ? (<AvatarImage src={t.avatar.src} alt=""/>) : (<AvatarFallback className="bg-teal-100 font-bold text-teal-800">
                        {t.initials}
                      </AvatarFallback>)}
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[16px] font-bold text-slate-950">
                        {t.name}
                      </p>
                      <StarRow />
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="truncate text-[13px] text-slate-500">
                        {t.location}
                      </p>
                      <p className="text-[13px] font-bold text-slate-700">
                        {t.rating}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Quote className="size-6 fill-teal-100 text-teal-100" strokeWidth={0}/>
                  <p className="mt-1 text-[14px] leading-[1.65] text-slate-700">
                    {t.quote}
                  </p>
                </div>

                <div className="mt-5 rounded-xl bg-teal-50/70 p-4">
                  <div className="flex gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-teal-700">
                      <t.DetailIcon className="size-[18px]" strokeWidth={1.8}/>
                    </span>
                    <div className="space-y-0.5 text-[13px] leading-[1.5] text-slate-700">
                      <p>
                        <span className="font-bold text-slate-900">
                          Travaux :
                        </span>{" "}
                        {t.work}
                      </p>
                      <p>
                        <span className="font-bold text-slate-900">
                          Artisan :
                        </span>{" "}
                        {t.artisan}
                      </p>
                      <p>
                        <span className="font-bold text-slate-900">Date :</span>{" "}
                        {t.date}
                      </p>
                    </div>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-white px-3 py-1 text-[12px] font-bold text-teal-700">
                    {t.invoiceLabel}
                    <CheckCircle2 className="size-3.5" strokeWidth={2.2}/>
                  </span>
                </div>
              </div>))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 rounded-[20px] bg-[#ecebfa] px-6 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-10">
          <div className="flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white">
              <ShieldCheck className="size-7" strokeWidth={1.7}/>
            </span>
            <div>
              <p className="text-[17px] font-bold text-slate-950">
                Plus de{" "}
                <span className="text-teal-700">2 800 clients satisfaits</span>{" "}
                partout au Maroc
              </p>
              <p className="mt-1 text-[14px] text-slate-600">
                Des travaux réalisés, des factures émises, des clients rassurés.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:ml-auto sm:flex sm:items-center sm:gap-8 sm:border-l sm:border-[#c8c5e0] sm:pl-8">
            {stats.map((stat) => (<div key={stat.label} className="flex items-center gap-2.5">
                <stat.Icon className="size-5 shrink-0 text-teal-700" strokeWidth={1.8}/>
                <div>
                  <p className="text-[15px] font-bold text-slate-950">
                    {stat.value}
                  </p>
                  <p className="text-[12px] leading-[1.3] text-slate-600">
                    {stat.label}
                  </p>
                </div>
              </div>))}
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-[13px] text-slate-500">
          <ShieldCheck className="size-4 shrink-0 text-teal-600" strokeWidth={1.8}/>
          Avis publiés uniquement après confirmation du prestataire et du client, liés à des travaux réellement réalisés.
        </p>
      </div>
    </section>);
}
