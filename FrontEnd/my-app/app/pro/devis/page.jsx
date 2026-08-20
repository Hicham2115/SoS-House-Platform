import { ComingSoon } from "@/components/dashboard/shared/coming-soon";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function ProDevisPage() {
  return (
    <>
      <DashboardHeader
        title="Devis et factures"
        settingsHref="/pro/parametres"
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
      />
      <ComingSoon title="Devis et factures" />
    </>
  );
}
