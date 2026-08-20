import { ComingSoon } from "@/components/dashboard/shared/coming-soon";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function ProParametresPage() {
  return (
    <>
      <DashboardHeader
        title="Paramètres du compte"
        settingsHref="/pro/parametres"
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
      />
      <ComingSoon title="Paramètres du compte" />
    </>
  );
}
