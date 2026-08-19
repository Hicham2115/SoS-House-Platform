import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
