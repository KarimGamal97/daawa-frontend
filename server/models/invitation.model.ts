import mongoose, { Schema, type Document, type Model } from 'mongoose'

export interface IInvitationSchedule {
  id: string
  time: string
  title: string
}

export interface IInvitationRsvp {
  guestName: string
  attending?: boolean
  companionsCount?: number
  wishMessage?: string
  createdAt?: Date
}

export interface IInvitation extends Document {
  slug: string
  templateId: string
  eventType: string
  sealStyle: string
  groomName: string
  brideName: string
  weddingDate: Date
  scratchReveal: boolean
  venue: string
  venueAddress: string
  mapUrl: string
  quoteType: string
  customQuote: string
  welcomeMessage: string
  tagline: string
  schedule: IInvitationSchedule[]
  enableRsvp: boolean
  musicTrack: string
  customMusicName: string
  photoUrl: string
  galleryPhotos: string[]
  customerName: string
  customerPhone: string
  customerEmail: string
  paymentMethod: string
  paymentReference: string
  receiptFileName: string
  receiptImageUrl: string
  totalPrice: number
  status: string
  rsvps: IInvitationRsvp[]
  createdAt: Date
  updatedAt: Date
}

const InvitationSchema = new Schema<IInvitation>(
  {
    slug: { type: String, required: true, unique: true },
    templateId: { type: String, default: 'royal-night' },
    eventType: { type: String, default: 'wedding' },
    sealStyle: { type: String, default: 'gold' },
    groomName: { type: String, required: true },
    brideName: { type: String, required: true },
    weddingDate: { type: Date, required: true },
    scratchReveal: { type: Boolean, default: true },
    venue: { type: String, required: true },
    venueAddress: { type: String, default: '' },
    mapUrl: { type: String, default: '' },
    quoteType: { type: String, default: 'quran' },
    customQuote: { type: String, default: '' },
    welcomeMessage: { type: String, default: '' },
    tagline: { type: String, default: '' },
    schedule: [
      {
        id: { type: String, required: true },
        time: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    enableRsvp: { type: Boolean, default: true },
    musicTrack: { type: String, default: 'templateDefault' },
    customMusicName: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    galleryPhotos: { type: [String], default: [] },
    customerName: { type: String, default: '' },
    customerPhone: { type: String, default: '' },
    customerEmail: { type: String, default: '' },
    paymentMethod: { type: String, default: 'instapay' },
    paymentReference: { type: String, default: '' },
    receiptFileName: { type: String, default: '' },
    receiptImageUrl: { type: String, default: '' },
    totalPrice: { type: Number, default: 999 },
    status: { type: String, default: 'pending' },
    rsvps: [
      {
        guestName: { type: String, required: true },
        attending: { type: Boolean, default: true },
        companionsCount: { type: Number, default: 1 },
        wishMessage: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
)

export const InvitationModel: Model<IInvitation> =
  mongoose.models.Invitation || mongoose.model<IInvitation>('Invitation', InvitationSchema)

