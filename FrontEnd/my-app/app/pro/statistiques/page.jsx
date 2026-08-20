import { ComingSoon } from "@/components/dashboard/shared/coming-soon";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function ProStatistiquesPage() {
  return (
    <>
      <DashboardHeader
        title="Statistiques"
        settingsHref="/pro/parametres"
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
      />
      <ComingSoon title="Statistiques" />
    </>
  );
}
