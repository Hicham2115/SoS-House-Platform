import { ComingSoon } from "@/components/dashboard/shared/coming-soon";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function ProDemandesPage() {
  return (
    <>
      <DashboardHeader
        title="Demandes disponibles"
        settingsHref="/pro/parametres"
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
      />
      <ComingSoon title="Demandes disponibles" />
    </>
  );
}
