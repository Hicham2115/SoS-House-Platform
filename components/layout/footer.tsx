import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo.png";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Plomberie", href: "/services/plomberie" },
      { label: "Électricité", href: "/services/electricite" },
      { label: "Ménage", href: "/services/menage" },
      { label: "Tous les services", href: "/services" },
    ],
  },
  {
    title: "SOS House",
    links: [
      { label: "Comment ça marche", href: "/comment-ca-marche" },
      { label: "Pour les prestataires", href: "/prestataires" },
      { label: "À propos", href: "/a-propos" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Centre d'aide", href: "/aide" },
      { label: "Contact", href: "/contact" },
      { label: "Confidentialité", href: "/confidentialite" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Image src={logo} alt="SOS House" className="h-10 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Trouvez un artisan vérifié près de chez vous à Casablanca.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} SOS House. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
