interface ProjectCardProps {
  project?: boolean
}

export default function ProjectCard({ project }: ProjectCardProps){
  return (
    <div className="w-[430px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
      <div className="rounded-md overflow-hidden">
        <img src={`${project ? '/project1.png': '/project2.png'}`} alt="Projeto" className="w-full h-full object-cover"/>
      </div>
      <div className="flex flex-col gap-4">
        <span className="uppercase text-xs font-bold text-accent-green">
          {project ? '15 Cliques': '2 Cliques'}
        </span>
        <div className="flex flex-col">
          <span className="text-white font-bold">Projeto 1</span>
          <span className="text-content-body text-sm">Descrição super detalhada do que o projeto faz</span>
        </div>
      </div>
    </div>
  )
}