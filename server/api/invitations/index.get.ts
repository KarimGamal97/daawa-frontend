import { connectToDatabase } from '~~/server/utils/db'
import { InvitationModel } from '~~/server/models/invitation.model'

export default defineEventHandler(async () => {
  await connectToDatabase()
  const list = await InvitationModel.find().sort({ createdAt: -1 }).lean()
  return list
})

