'use client'

import { increaseProjectVisits } from "@/app/actions/increase-project-visits";
import { formatUrl } from "@/app/lib/utils";
import { ProjectData } from "@/app/server/get-profile-data"
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectCard({ 
  project, 
  isOwner,
  img,
  name,
  description,
  clicks
}: {
  project?: ProjectData;
  isOwner?: boolean,
  banner?: boolean
  img?: string | undefined
  name?: string,
  description?: string,
  clicks?: string
}){
  const { profileId } = useParams()
  const formattedUrl = formatUrl(project?.projectUrl || '')

  async function handleClick(){
    if(!profileId || !project?.id || isOwner) return
      await increaseProjectVisits(profileId as string, project!.id)
  }

  return (
    <Link href={formattedUrl} target="_blank" onClick={handleClick}>
      <div className="w-[430px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="rounded-md overflow-hidden">
          <img src={ img } alt="Projeto" className="w-full h-full object-cover"/>
        </div>
        <div className="flex flex-col gap-4">
          
            {isOwner && (
              <span className="uppercase text-xs font-bold text-accent-green">
                {project?.totalVisits || 0} Cliques
              </span>
            ) }

            {clicks && (
              <span className="uppercase text-xs font-bold text-accent-green">
                {clicks} Cliques
              </span>
            )}
          <div className="flex flex-col">
            <span className="text-white font-bold">{name || project?.projectName }</span>
            <span className="text-content-body text-sm">{description || project?.projectDescription }</span>
          </div>
        </div>
      </div>
    </Link>
  )
}