"use client";

import { Suspense } from "react";
import { MessageriePanel } from "@/components/dashboard/shared/messagerie-panel";
import { DashboardHeader } from "@/components/layout/dashboard-header";

function ProMessageriePageContent() {
  return (
    <>
      <DashboardHeader
        title="Messagerie"
        subtitle="Vos échanges avec les clients qui vous ont choisi."
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
        settingsHref="/pro/parametres"
      />
      <MessageriePanel />
    </>
  );
}

export default function ProMessageriePage() {
  return (
    <Suspense fallback={null}>
      <ProMessageriePageContent />
    </Suspense>
  );
}
