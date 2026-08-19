import { Poppins } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "SOS House — Services à domicile",
  description:
    "Trouvez un artisan vérifié près de chez vous, partout au Maroc. Identité vérifiée, avis liés aux travaux réalisés, facture disponible avant votre choix.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
