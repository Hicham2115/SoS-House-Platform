import { Inter, Poppins } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Dashboard-only typeface — Inter reads as a professional SaaS product
// font, scoped via .dashboard-shell so the public marketing site keeps
// Poppins.
const inter = Inter({
  variable: "--font-dashboard",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "SOS House — Services à domicile",
  description:
    "Trouvez un artisan vérifié près de chez vous, partout à Casablanca. Identité vérifiée, avis liés aux travaux réalisés, facture disponible avant votre choix.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
