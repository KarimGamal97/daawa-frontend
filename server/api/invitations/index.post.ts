import { connectToDatabase } from '~~/server/utils/db'
import { InvitationModel } from '~~/server/models/invitation.model'

export default defineEventHandler(async (event) => {
  await connectToDatabase()
  const body = await readBody(event)

  const baseSlug = String(body.slug || `invite-${Date.now().toString().slice(-5)}`)
  const existing = await InvitationModel.findOne({ slug: baseSlug }).lean()
  if (existing) {
    body.slug = `${baseSlug}-${Math.floor(100 + Math.random() * 900)}`
  }

  const created = await InvitationModel.create(body)
  return created
})

