import mongoose from 'mongoose'

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://kariimgamal1997_db_user:AaKfUL5UZVTdDyV8@menujet.6djwkys.mongodb.net/daawa-db?retryWrites=true&w=majority'

let isConnected = false

export async function connectToDatabase() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return
  }

  try {
    await mongoose.connect(MONGODB_URI)
    isConnected = true
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error)
    throw error
  }
}

