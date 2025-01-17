'use client'

import TextInput from "@/app/components/ui/text-input";
import Button from "@/app/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { sanitizeLink } from "@/app/lib/utils";
import { verifyLink } from "@/app/actions/verify-link";
import { createLink } from "@/app/actions/create-link";
import { useRouter, useSearchParams } from "next/navigation";


export default function CreateLinkForm(){
  const router = useRouter()
  const searchParams = useSearchParams()


  const [ link, setLink ] = useState(sanitizeLink(searchParams.get('link') as string) || '')
  const [ error, setError ] = useState('')

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>){
    setLink(sanitizeLink(e.target.value))
    setError('')
  }

  async function handleSubmit(e : FormEvent<HTMLFormElement>){
    e.preventDefault();

    // Quando o usuário mandar o link vazio
    if(link.length === 0 ) return setError('Escolha um link primeiro')
    
    // Quando o usuário mandar um link ja existente
    const isLinkTaken = await verifyLink(link);

    if(isLinkTaken) return setError('Desculpe, esse link está em uso')

    // Criar o perfil
    const isLinkCreated = await createLink(link)

    if(!isLinkCreated) return setError('Erro ao criar o perfil. Tente novamente. ');

    router.push(`/${link}`)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
        <span className="text-white">projectinbio.com/</span>
        <TextInput type="text" value={link} onChange={handleLinkChange} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div >
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  )
}