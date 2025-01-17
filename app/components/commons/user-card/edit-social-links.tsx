'use client'

import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react"
import { createSocialLinks } from "@/app/actions/create-social-links"
import { useParams, useRouter } from "next/navigation"
import { startTransition, useState } from "react"
import TextInput from "../../ui/text-input"
import Button from "../../ui/button"
import Modal from "../../ui/modal"

export default function EditSocialLinks({ 
  socialMedias 
}:{ 
  socialMedias?: {
  github: string
  instagram: string
  linkedin: string
  twitter: string
}}){
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false)

  const [github, setGithub] = useState(socialMedias?.github || '')
  const [instagram, setInstagram] = useState(socialMedias?.instagram || '')
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || '')
  const [twitter, setTwitter] = useState(socialMedias?.twitter || '')

  const { profileId } = useParams()

  async function handleSaveSocialLinks(){
    setIsSavingSocialLinks(true)

    if(!profileId) return;

    await createSocialLinks({
      profileId: profileId as string,
      github,
      instagram,
      linkedin,
      twitter,
    })

    startTransition(() => {
      setIsSavingSocialLinks(false)
      setIsModalOpen(false)

      router.refresh()
    })
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'>
      <Plus />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-center gap-10 w-[514px]">
          <p className="text-white font-bold text-xl">
              Adicionar rede sociais
          </p>
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 w-full">
              <Github />
              <TextInput 
                type="text" 
                placeholder="Link Github" 
                value={github} onChange={(e) => 
                setGithub(e.target.value)} 
              />
             </div>
             <div className="flex items-center gap-2 w-full">
              <Linkedin />
              <TextInput 
                type="text" 
                placeholder="Link Linkedin" 
                value={linkedin} 
                onChange={(e) => setLinkedin(e.target.value)} 
              />
             </div>
             <div className="flex items-center gap-2 w-full">
              <Instagram />
              <TextInput 
                type="text" 
                placeholder="Link Instagram" 
                value={instagram} 
                onChange={(e) => setInstagram(e.target.value)} 
              />
             </div>
             <div className="flex items-center gap-2 w-full">
              <Twitter />
              <TextInput 
                type="text" 
                placeholder="Link Twitter" 
                value={twitter} 
                onChange={(e) => setTwitter(e.target.value)} 
              />
             </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button onClick={() => setIsModalOpen(false)} className="font-bold text-white">Voltar</button>
            <Button onClick={handleSaveSocialLinks} disabled={isSavingSocialLinks}>Salvar</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}