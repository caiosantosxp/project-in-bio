import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import Button from '../../ui/button'
import EditSocialLinks from './edit-social-links'
import Link from 'next/link'
import { ProfileData } from '@/app/server/get-profile-data'
import AddCustomLink from './add-custom-link'
import { formatUrl } from '@/app/lib/utils'
import EditUserCard from './edit-user-card'
import { getDownloadURLFromPath } from '@/app/lib/firebase'

export default async function UserCard({
  profileData,
  isOwner,
  hero,
  name,
  description,
  img,
}: { 
  profileData?: ProfileData; 
  isOwner?: boolean, 
  name?: string, 
  description?: string, 
  img?: string, 
  hero?: boolean 
}) {

  const icons = [Github, Instagram, Linkedin, Twitter, Plus];

  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48">
        <img 
          src={img || await getDownloadURLFromPath(profileData?.imagePath as string) || '/me.png' }
          alt="André Dev" 
          className="rounded-full object-cover w-full h-full" 
        />
      </div>
      <div className="flex flex-col p-3 gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            {name || profileData?.name || 'André Dev'}
          </h3>
          {isOwner && (
            <EditUserCard profileData={profileData} />
          )}
        </div>
        <p className="opacity-40">
          {description || profileData?.description || 'Desenvolvedor Web Full Stack'}
        </p>
      </div>
      <div className='h-[0.5px] w-[90%] shrink-0 border-b border-border-secondary border-opacity-80'></div>
      <div className="flex flex-col  gap-2 w-full">
        <span className="uppercase text-xs font-medium">Links</span>
        <div className="flex w-full gap-3">
          { profileData?.socialMedias?.github && (
            <Link
              href={profileData?.socialMedias?.github}
              target='_blank'
              className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'
            >
              <Github />
            </Link>
          )}
          {profileData?.socialMedias?.instagram && (
            <Link
              href={profileData?.socialMedias?.instagram}
              target='_blank'
              className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'
            >
              <Instagram />
            </Link>
          )}
          {profileData?.socialMedias?.linkedin && (
            <Link
              href={profileData?.socialMedias?.linkedin}
              target='_blank'
              className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'
            >
              <Linkedin />
            </Link>
          )}
          {profileData?.socialMedias?.twitter && (
            <Link
              href={profileData?.socialMedias?.twitter}
              target='_blank'
              className='p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]'
            >
              <Twitter />
            </Link>
          )}
          {isOwner && (
            <EditSocialLinks socialMedias={profileData?.socialMedias} />
          )}
        </div>
        {hero && (
          <div className="flex gap-3">
            {icons.map((Icon, index) => (
              <button
                key={index}
                className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
              >
                <Icon />
              </button>
            ))}
          </div>
        )}
        
      </div>
      <div className='h-[0.5px] w-[90%] shrink-0 border-b border-border-secondary border-opacity-80'></div>
        <div className='flex flex-col gap-3 w-full min-h-[172px]'>
          <div className='w-full flex flex-col items-center gap-3'>
            {hero && (
              <Button className='w-full'>Template SaaS - Compre Agora</Button>
            )}
            {profileData?.link1 && (
              <Link href={formatUrl(profileData.link1.url)} target='_blank' className='w-full'>
                <Button className='w-full'>{profileData?.link1.title}</Button>
              </Link>
            )}
            {profileData?.link2 && (
              <Link href={formatUrl(profileData.link2.url)} target='_blank' className='w-full'>
                <Button className='w-full'>{profileData?.link2.title}</Button>
              </Link>
            )}
            {profileData?.link3 && (
              <Link href={formatUrl(profileData.link3.url)} target='_blank' className='w-full'>
                <Button className='w-full'>{profileData?.link3.title}</Button>
              </Link>
            )}

            {isOwner && (
              <AddCustomLink profileData={profileData} />
            )}
            
          </div>
        </div>
    </div>
  )
}