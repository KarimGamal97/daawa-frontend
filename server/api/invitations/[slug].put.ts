import { connectToDatabase } from '~~/server/utils/db'
import { InvitationModel } from '~~/server/models/invitation.model'

export default defineEventHandler(async (event) => {
  await connectToDatabase()
  const slug = getRouterParam(event, 'slug')
  const body = await readBody(event)

  // Prevent modifying the unique identifier or creation date
  delete body._id
  delete body.createdAt

  const updated = await InvitationModel.findOneAndUpdate(
    { slug },
    { $set: body },
    { new: true }
  ).lean()

  if (!updated) {
    throw createError({
      statusCode: 404,
      statusMessage: `Invitation '${slug}' not found`,
    })
  }

  return updated
})
