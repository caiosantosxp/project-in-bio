'use client'

import { ProjectData } from "@/app/server/get-profile"
import Link from "next/link";

export default function ProjectCard({ 
  project, 
  isOwner,
  banner,
  img 
}: {
  project?: ProjectData;
  isOwner?: boolean,
  banner?: boolean
  img?: string | undefined
}){

  const projectUrl = project?.projectUrl
  const formattedUrl = projectUrl?.startsWith('http') ? projectUrl : `https://${projectUrl}`

  function handleClick(){
    console.log('clicked')
  }

  return (
    <Link href={formattedUrl} target="_blank" onClick={handleClick}>
      <div className="w-[430px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="rounded-md overflow-hidden">
          <img src={banner ? '/project1.png' : img } alt="Projeto" className="w-full h-full object-cover"/>
        </div>
        <div className="flex flex-col gap-4">
          
            {isOwner && (
              <span className="uppercase text-xs font-bold text-accent-green">
                {project?.totalVisits || 0}
              </span>
            ) }

            {banner && (
              <span className="uppercase text-xs font-bold text-accent-green">
                15 Cliques
              </span>
            )}
          <div className="flex flex-col">
            <span className="text-white font-bold">{banner ?  'Projeto 1' : project?.projectName}</span>
            <span className="text-content-body text-sm">{banner ?  'Descrição super detalhada do que o projeto faz' : project?.projectDescription }</span>
          </div>
        </div>
      </div>
    </Link>
  )
}