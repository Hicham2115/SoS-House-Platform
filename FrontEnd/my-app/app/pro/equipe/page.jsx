import { ComingSoon } from "@/components/dashboard/shared/coming-soon";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function ProEquipePage() {
  return (
    <>
      <DashboardHeader
        title="Mon équipe"
        settingsHref="/pro/parametres"
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
      />
      <ComingSoon title="Mon équipe" />
    </>
  );
}
