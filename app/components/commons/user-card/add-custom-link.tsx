'use client'

import { Plus } from "lucide-react";
import Modal from "../../ui/modal";
import { startTransition, useState } from "react";
import TextInput from "../../ui/text-input";
import Button from "../../ui/button";
import { useParams, useRouter } from "next/navigation";
import addCustomLinks from "@/app/actions/create-custom-links";
import { ProfileData } from "@/app/server/get-profile-data";

export default function AddCustomLink({ profileData }: {profileData?: ProfileData | undefined}) {
  const router = useRouter()
  const { profileId } = useParams()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ isSavingCustomLinks, setIsSavingCustomLinks ] = useState(false)

  const [link1, setLink1] = useState({
    title: profileData?.link1?.title || '',
    url: profileData?.link1?.url || '',
  })

  const [link2, setLink2] = useState({
    title: profileData?.link2?.title || '',
    url: profileData?.link2?.url || '',
  })

  const [link3, setLink3] = useState({
    title: profileData?.link3?.title || '',
    url: profileData?.link3?.url || '',
  })

  async function handleSaveCustomLinks() {
    setIsSavingCustomLinks(true)
    
    if(!profileId) return

    await addCustomLinks({
      profileId: profileId as string,
      link1,
      link2,
      link3,
    })

    startTransition(() => {
      setIsModalOpen(false)
      setIsSavingCustomLinks(false)
      router.refresh()
    })
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'>
        <Plus />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} >
          <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
            <p className="text-white font-bold text-xl">Adicionar links personalizados</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col w-full">
                  <p>Título do link</p>
                  <TextInput 
                    placeholder="Digite o título do link" 
                    value={link1.title} 
                    onChange={(e) => setLink1({ ...link1, title: e.target.value })} 
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="font-bold">Link</p>
                  <TextInput 
                    placeholder="Inserir URL" 
                    value={link1.url} 
                    onChange={(e) => setLink1({ ...link1, url: e.target.value })} 
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-col w-full">
                  <p>Título do link</p>
                  <TextInput 
                    placeholder="Digite o título do link" 
                    value={link2.title} 
                    onChange={(e) => setLink2({ ...link2, title: e.target.value })} 
                  />
                </div>
                
                <div className="flex flex-col w-full">
                  <p className="font-bold">Link</p>
                  <TextInput 
                    placeholder="Inserir URL" 
                    value={link2.url} 
                    onChange={(e) => setLink2({ ...link2, url: e.target.value })} 
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-col w-full">
                  <p>Título do link</p>
                  <TextInput 
                    placeholder="Digite o título do link" 
                    value={link3.title} 
                    onChange={(e) => setLink3({ ...link3, title: e.target.value })} 
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="font-bold">Link</p>
                  <TextInput 
                    placeholder="Inserir URL" 
                    value={link3.url} 
                    onChange={(e) => setLink3({ ...link3, url: e.target.value })} 
                  />
                </div>
              </div>

            </div>
            <div className="flex gap-4 justify-end">
              <button onClick={() => setIsModalOpen(false)} className="font-bold text-white">Voltar</button>
              <Button onClick={handleSaveCustomLinks} disabled={isSavingCustomLinks}>Salvar</Button>
            </div>
          </div>
      </Modal>
    </>
  )
}