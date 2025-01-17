import { manageAuth } from "@/app/actions/manage-auth";
import { auth } from "@/app/lib/auth";
import { ProfileData } from "@/app/server/get-profile-data";
import { TrendingUp } from "lucide-react";
import PortalButton from "./portal-button";

export default async function TotalVisits({ totalVisits =  0, hero }: { totalVisits?: number, hero?: boolean }) {
  const session = await auth()

  return (
    <div className="w-min whitespace-nowrap flex items-center gap-2 bg-background-primary border border-border-primary px-8 py-3 rounded-xl shadow-lg">
      <span className="font-bold text-white ">Total de visitas</span>
      <div className="flex items-center gap-2 text-accent-green">
        <span className="text-3xl font-bold">{totalVisits || hero && '12586' || '0'}</span>
        <TrendingUp />
      </div>
      <div className="flex items-center gap-2">
        {!hero && session?.user?.isSubscribed && (
          <PortalButton />
        )}
        {!hero && (
          <form action={manageAuth}>
            <button>Sair</button>
          </form>
        )}
      </div>
    </div>
  )
}