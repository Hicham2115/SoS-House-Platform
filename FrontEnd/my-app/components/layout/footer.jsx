import Link from "next/link";
import {
  Camera,
  ChevronRight,
  FileText,
  Globe,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  ThumbsUp,
  Video,
} from "lucide-react";
import { ZelligeCorner } from "@/components/Main/zellige-corner";
const trustItems = [
  { icon: ShieldCheck, label: "Artisans vérifiés en personne" },
  { icon: MessageCircle, label: "Avis liés aux vrais travaux" },
  { icon: FileText, label: "Facture garantie (avec ou sans TVA)" },
  { icon: Lock, label: "Vos données sont sécurisées" },
];
const clientLinks = [
  { label: "Publier une demande", href: "/publier-une-demande" },
  { label: "Comment ça marche", href: "/comment-ca-marche" },
  { label: "Nos services", href: "/services" },
  { label: "Artisans vérifiés", href: "/artisans-verifies" },
  { label: "Avis clients", href: "/avis" },
  { label: "Centre d'aide", href: "/aide" },
  { label: "Contact", href: "/contact" },
];
const artisanLinks = [
  { label: "Devenir prestataire", href: "/devenir-prestataire" },
  { label: "Avantages", href: "/prestataires/avantages" },
  { label: "Comment ça marche", href: "/prestataires/comment-ca-marche" },
  { label: "Ressources", href: "/prestataires/ressources" },
  { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
  { label: "Espace prestataire", href: "/prestataires/espace" },
];
const socialLinks = [
  { icon: ThumbsUp, label: "Facebook", href: "#" },
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "#" },
  { icon: Video, label: "YouTube", href: "#" },
];
const legalLinks = [
  { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Mentions légales", href: "/mentions-legales" },
];
function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-bold tracking-[0.06em] text-teal-800">
        {title}
      </h3>
      <span className="mt-3 block h-0.5 w-6 rounded-full bg-teal-600" />
      <div className="mt-5">{children}</div>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="bg-white">
      <div className="relative overflow-hidden bg-[#f4f3fb]">
        <ZelligeCorner
          id="footer-zellige-tr"
          corner="top-right"
          className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-70 sm:h-96 sm:w-96"
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="À PROPOS DE SOS HOUSE">
            <p className="text-sm leading-relaxed text-slate-600">
              SOS House est la plateforme marocaine qui connecte les
              particuliers et les entreprises avec des artisans vérifiés.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Notre mission : rendre les services à domicile plus fiables,
              transparents et professionnels.
            </p>
            <ul className="mt-5 space-y-3">
              {/* {trustItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 text-sm text-slate-700"
                >
                  <item.icon className="size-4.5 shrink-0 text-teal-800" />
                  {item.label}
                </li>
              ))} */}
            </ul>
          </FooterColumn>

          <FooterColumn title="POUR LES CLIENTS">
            <ul className="space-y-3">
              {clientLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-700 transition-colors hover:text-teal-800"
                  >
                    <ChevronRight className="size-3.5 shrink-0 text-teal-600 transition-transform duration-200 group-hover:translate-x-0.5" />
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="POUR LES ARTISANS">
            <ul className="space-y-3">
              {artisanLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-700 transition-colors hover:text-teal-800"
                  >
                    <ChevronRight className="size-3.5 shrink-0 text-teal-600 transition-transform duration-200 group-hover:translate-x-0.5" />
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="PARTOUT AU MAROC">
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-sm text-slate-700">
                <MapPin className="mt-0.5 size-4.5 shrink-0 text-teal-800" />
                <span>
                  Présent dans tout le Maroc
                  <br />
                  <span className="text-slate-500">
                    Au service de toutes les villes
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-700">
                <Phone className="mt-0.5 size-4.5 shrink-0 text-teal-800" />
                <span>
                  <span className="font-bold text-slate-950">
                    06 22 123 456
                  </span>
                  <br />
                  <span className="text-slate-500">Lun – Sam : 8h – 20h</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-700">
                <Mail className="size-4.5 shrink-0 text-teal-800" />
                contact@sos-house.ma
              </li>
              <a
                href="https://www.sos-house.com/fr"
                target="__blank"
                className="flex items-center gap-2.5 text-sm text-slate-700"
              >
                <Globe className="size-4.5 shrink-0 text-teal-800" />
                www.sos-house.ma
              </a>
            </ul>
          </FooterColumn>
        </div>
      </div>

      <div className="relative overflow-hidden bg-teal-950">
        <ZelligeCorner
          id="footer-zellige-bl"
          corner="bottom-left"
          className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 opacity-[0.08] sm:h-96 sm:w-96"
        />
        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:divide-x lg:divide-white/10 lg:px-12">
          <div className="flex items-center gap-3 lg:pr-8">
            <MapPin className="size-5 shrink-0 text-teal-400" />
            <p className="text-sm font-semibold text-white">
              Fiers d&apos;être marocains.
              <br />
              Fiers de servir tout le pays.
            </p>
          </div>

          <div className="lg:px-8">
            <p className="text-xs font-bold tracking-[0.08em] text-teal-400">
              SUIVEZ-NOUS
            </p>
            <div className="mt-3 flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition duration-200 hover:-translate-y-0.5 hover:bg-teal-800"
                >
                  <social.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="text-xs font-bold tracking-[0.08em] text-teal-400">
              RECHARGE DE CRÉDITS
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-md bg-white px-2.5 py-1 text-sm font-bold italic text-slate-900">
                VISA
              </span>
              <span className="flex items-center rounded-md bg-white px-2 py-1">
                <span className="size-3.5 rounded-full bg-red-500" />
                <span className="-ml-1.5 size-3.5 rounded-full bg-amber-400" />
              </span>
              <span className="rounded-md border border-white/30 px-2.5 py-1 text-xs font-bold text-white">
                CMI
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Aussi en espèces chez Cash Plus, Wafacash et Barid Cash
            </p>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-6 py-6 text-center text-sm text-slate-400 sm:flex-row sm:justify-between sm:px-8 sm:text-left lg:px-12">
            <p>© {new Date().getFullYear()} SOS House. Tous droits réservés.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-teal-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
