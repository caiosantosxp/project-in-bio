import ProjectCard from "../commons/project-card"
import TotalVisits from "../commons/total-visits"
import UserCard from "../commons/user-card/user-card"
import Button from "../ui/button"
import CreateNow from "../ui/create-now"
import TextInput from "../ui/text-input"

export default function Hero() {
  return (
    <div className="flex h-screen">
      <div className="w-full flex flex-col gap-2 mt-[35vh]">
        <h1 className="text-5xl font-bolt text-white leading-[64px]">
          Seus projetos e redes sociais em um único link
        </h1>
        <h2 className="text-xl leading-6">
          Crie sua própria página de projetos e compartilhe eles com o mundo.
          <br/>
          Acompanhe o engajamento com o Analytics de cliques
        </h2>
        <CreateNow />
      </div>
      <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_50%)]">
        <div className="relative">
          <UserCard name="André Dev" description="Desenvolvedor Web Full Stack" img="/me.png" hero />
          <div className="absolute bottom-[11%] -right-[28%]">
            <TotalVisits hero/>
          </div>
          <div className="absolute top-[20%] -left-[45%] -z-10">
            <ProjectCard name="André Dev" description="Desenvolvedor Web Full Stack" clicks="1587" img="/project2.png"/>
          </div>
          <div className="absolute -top-[5%] -left-[31%] -z-10">
            <ProjectCard name="André Dev" description="Desenvolvedor Web Full Stack" clicks="17" img="/project1.png"/>
          </div>
        </div>
      </div>
    </div>
  )
}