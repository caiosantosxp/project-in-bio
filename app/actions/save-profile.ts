'use server'

import { randomUUID } from "crypto"
import { db, storage } from "../lib/firebase"
import { Timestamp } from "firebase-admin/firestore"
import { auth } from "../lib/auth"


export async function saveProfile(formData: FormData){
  const session = await auth()

  if(!session) return

  try {
    const  profileId = formData.get('profileId')
    const yourName = formData.get('yourName')
    const youDescription = formData.get('youDescription')
    const file = formData.get('file')  as File

    let imagePath = null
    const hasFile = file && file.size > 0

    if(hasFile){
      const currentProfile = await db.collection('profiles').doc(profileId as string).get()

      const currentImagePath = currentProfile?.data()?.imagePath

      if(currentImagePath){
        const currentStorageRef = storage.file(currentImagePath)
        const [exist] = await currentStorageRef.exists()

        if(exist){
          await currentStorageRef.delete()
        }
      }

      const storageRef = storage.file(`profiles-images/${profileId}/${randomUUID()}`)
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      await storageRef.save(buffer)

      imagePath = storageRef.name
    }

    await db.collection('profiles').doc(profileId as string).update({
      name: yourName,
      description: youDescription,
      ...(hasFile && { imagePath }),
      updatedAt: Timestamp.now().toMillis()
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}