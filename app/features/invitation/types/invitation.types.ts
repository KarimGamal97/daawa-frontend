export interface GuestRsvpItem {
  guestName: string
  attending: boolean
  companionsCount: number
  wishMessage?: string
  createdAt?: string
}

export type OccasionEventType =
  | 'wedding'
  | 'engagement'
  | 'katbKetab'
  | 'birthday'
  | 'newborn'
  | 'graduation'
  | 'housewarming'
  | 'opening'
  | 'other'

export type QuoteSelectionType = 'quran' | 'custom' | 'none'

export type MusicTrackChoice =
  | 'templateDefault'
  | 'royalCalm'
  | 'classicSymphony'
  | 'andalusian'
  | 'none'

export type InvitationOrderStatus = 'pending' | 'active' | 'rejected'

export interface CelebrationScheduleItem {
  id: string
  time: string
  title: string
}

export interface InvitationItem {
  _id: string
  slug: string
  templateId: string
  eventType?: OccasionEventType
  sealStyle?: 'gold' | 'burgundy' | 'pearl'
  groomName: string
  brideName: string
  weddingDate: string
  scratchReveal?: boolean
  venue: string
  venueAddress?: string
  mapUrl?: string
  quoteType?: QuoteSelectionType
  customQuote?: string
  welcomeMessage?: string
  tagline?: string
  schedule?: CelebrationScheduleItem[]
  enableRsvp?: boolean
  musicTrack?: MusicTrackChoice
  customMusicName?: string
  photoUrl?: string
  galleryPhotos?: string[]
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  paymentMethod?: 'instapay' | 'vodafone'
  paymentReference?: string
  receiptFileName?: string
  receiptImageUrl?: string
  totalPrice?: number
  status?: InvitationOrderStatus
  rsvps?: GuestRsvpItem[]
  createdAt?: string
}

export type InvitationDetails = InvitationItem

export interface CreateInvitationPayload {
  slug: string
  groomName: string
  brideName: string
  weddingDate: string
  scratchReveal?: boolean
  venue: string
  venueAddress?: string
  mapUrl?: string
  quoteType?: QuoteSelectionType
  customQuote?: string
  welcomeMessage?: string
  tagline?: string
  schedule?: CelebrationScheduleItem[]
  enableRsvp?: boolean
  templateId?: string
  eventType?: OccasionEventType
  sealStyle?: 'gold' | 'burgundy' | 'pearl'
  musicTrack?: MusicTrackChoice
  customMusicName?: string
  photoUrl?: string
  galleryPhotos?: string[]
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  paymentMethod?: 'instapay' | 'vodafone'
  paymentReference?: string
  receiptFileName?: string
  receiptImageUrl?: string
  discountCode?: string
  totalPrice?: number
  status?: InvitationOrderStatus
}

export interface CreateRsvpPayload {
  guestName: string
  attending: boolean
  companionsCount: number
  wishMessage?: string
}
