"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ParametresPage() {
  const [profile, setProfile] = useState({
    name: "Hicham Kamal",
    email: "hicham@example.com",
    phone: "06 12 34 56 78",
  });

  return (
    <>
      <DashboardHeader
        title="Paramètres du compte"
        subtitle="Gérez vos informations personnelles."
      />

      <div className="flex flex-1 flex-col bg-slate-50 p-5 sm:p-8">
        <form
          className="flex max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Modifications enregistrées.");
          }}
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) =>
                setProfile((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile((p) => ({ ...p, phone: e.target.value }))
              }
            />
          </div>

          <Button
            type="submit"
            className="mt-2 h-10 w-fit rounded-lg bg-teal-600 px-5 text-[13px] font-semibold text-white hover:bg-teal-700"
          >
            Enregistrer
          </Button>
        </form>
      </div>
    </>
  );
}
