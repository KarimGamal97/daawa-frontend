import { connectToDatabase } from '~~/server/utils/db'
import { InvitationModel } from '~~/server/models/invitation.model'

export default defineEventHandler(async (event) => {
  await connectToDatabase()
  const slug = getRouterParam(event, 'slug')

  const invitation = await InvitationModel.findOne({ slug }).lean()
  if (!invitation) {
    throw createError({
      statusCode: 404,
      statusMessage: `Invitation '${slug}' not found`,
    })
  }

  return invitation
})

