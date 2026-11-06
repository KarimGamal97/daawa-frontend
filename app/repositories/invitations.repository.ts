import type {
  InvitationItem,
  CreateInvitationPayload,
  CreateRsvpPayload,
  InvitationOrderStatus,
} from '~/features/invitation/types/invitation.types'

const API_BASE_URL = '/api/invitations'
const LOCAL_ORDERS_KEY = 'daawa-orders-backup-v1'

const readLocalOrders = (): InvitationItem[] => {
  if (!import.meta.client) return []
  try {
    const raw = localStorage.getItem(LOCAL_ORDERS_KEY)
    return raw ? (JSON.parse(raw) as InvitationItem[]) : []
  } catch {
    return []
  }
}

const writeLocalOrders = (items: InvitationItem[]) => {
  if (!import.meta.client) return
  try {
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(items))
  } catch {
    // Ignore storage quota errors
  }
}

const upsertLocalOrder = (order: InvitationItem) => {
  const list = readLocalOrders()
  const idx = list.findIndex((i) => i.slug === order.slug)
  if (idx >= 0) {
    list[idx] = order
  } else {
    list.unshift(order)
  }
  writeLocalOrders(list)
}

export const invitationsRepository = {
  getAllUrl(): string {
    return API_BASE_URL
  },

  getBySlugUrl(slug: string): string {
    return `${API_BASE_URL}/${slug}`
  },

  async fetchAll(): Promise<InvitationItem[]> {
    try {
      const remote = await $fetch<InvitationItem[]>(API_BASE_URL)
      const local = readLocalOrders()
      const mergedMap = new Map<string, InvitationItem>()
      for (const item of [...remote, ...local]) {
        if (!mergedMap.has(item.slug)) {
          mergedMap.set(item.slug, item)
        }
      }
      const merged = Array.from(mergedMap.values())
      writeLocalOrders(merged)
      return merged
    } catch {
      return readLocalOrders()
    }
  },

  async fetchBySlug(slug: string): Promise<InvitationItem | null> {
    try {
      const remote = await $fetch<InvitationItem>(`${API_BASE_URL}/${slug}`)
      upsertLocalOrder(remote)
      return remote
    } catch {
      // Pre-filled Demo Template for Umm Kulthum
      if (slug === 'umm-kulthum' || slug === 'demo') {
        const demoItem: InvitationItem = {
          _id: 'demo-umm-kulthum',
          slug,
          templateId: 'umm-kulthum',
          eventType: 'wedding',
          sealStyle: 'burgundy',
          groomName: 'مصطفى ابوليله',
          brideName: 'دنيا محرم',
          weddingDate: '2027-01-12T19:00:00',
          scratchReveal: false,
          venue: 'قاعة بيرلا',
          venueAddress: "Tanta - El Mahalla Road, Grand Babilon's First Gate",
          mapUrl: 'https://www.google.com/maps/search/?api=1&query=Perla+-%D8%A8%D9%8A%D8%B1%D9%84%D8%A7,+W479%2BWJ9,+Saft+Torab,+El+Mahalla+El+Kubra',
          quoteType: 'custom',
          customQuote: 'يا رب تفضل حلاوة سلام أول لقا بإيدينا',
          tagline: 'AS MUSIC FILLS THE AIR AND OUR HEARTS BECOME ONE, WE INVITE YOU TO CELEBRATE THE BEGINNING OF OUR GREATEST ADVENTURE',
          welcomeMessage: 'نتشرف بدعوتكم لحضور حفل زفافنا في ليلة طربية أصيلة لا تُنسى',
          schedule: [],
          enableRsvp: true,
          musicTrack: 'templateDefault',
          customMusicName: '/templates/umm-kulthum/audio/song.mp3',
          photoUrl: '',
          galleryPhotos: [],
          totalPrice: 999,
          status: 'active',
          rsvps: [
            {
              guestName: 'أحمد و سلمى',
              attending: true,
              companionsCount: 2,
              wishMessage: 'ألف مليون مبروك لأجمل عروسين! ربنا يسعدكم ويجعل أيامكم كلها بهجة وفرح.',
              createdAt: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
        }
        upsertLocalOrder(demoItem)
        return demoItem
      }

      const local = readLocalOrders().find((i) => i.slug === slug)
      if (local) return local
      return null
    }
  },

  async create(payload: CreateInvitationPayload): Promise<InvitationItem> {
    try {
      const created = await $fetch<InvitationItem>(API_BASE_URL, {
        method: 'POST',
        body: payload,
      })
      upsertLocalOrder(created)
      return created
    } catch {
      const list = readLocalOrders()
      const baseSlug = payload.slug || `invite-${Date.now().toString().slice(-5)}`
      const finalSlug = list.some((i) => i.slug === baseSlug)
        ? `${baseSlug}-${Math.floor(100 + Math.random() * 900)}`
        : baseSlug

      const fallbackItem: InvitationItem = {
        _id: `local-${Date.now()}`,
        slug: finalSlug,
        templateId: payload.templateId || 'royal-night',
        eventType: payload.eventType || 'wedding',
        sealStyle: payload.sealStyle || 'gold',
        groomName: payload.groomName,
        brideName: payload.brideName,
        weddingDate: payload.weddingDate,
        scratchReveal: payload.scratchReveal ?? true,
        venue: payload.venue,
        venueAddress: payload.venueAddress || '',
        mapUrl: payload.mapUrl || '',
        quoteType: payload.quoteType || 'quran',
        customQuote: payload.customQuote || '',
        welcomeMessage: payload.welcomeMessage || '',
        tagline: payload.tagline || '',
        schedule: payload.schedule || [],
        enableRsvp: payload.enableRsvp ?? true,
        musicTrack: payload.musicTrack || 'templateDefault',
        customMusicName: payload.customMusicName || '',
        photoUrl: payload.photoUrl || '',
        galleryPhotos: payload.galleryPhotos || [],
        customerName: payload.customerName || '',
        customerPhone: payload.customerPhone || '',
        customerEmail: payload.customerEmail || '',
        paymentMethod: payload.paymentMethod || 'instapay',
        paymentReference: payload.paymentReference || '',
        receiptFileName: payload.receiptFileName || '',
        receiptImageUrl: payload.receiptImageUrl || '',
        totalPrice: payload.totalPrice || 999,
        status: payload.status || 'pending',
        rsvps: [],
        createdAt: new Date().toISOString(),
      }
      upsertLocalOrder(fallbackItem)
      return fallbackItem
    }
  },

  async updateStatus(slug: string, status: InvitationOrderStatus): Promise<InvitationItem | null> {
    try {
      const updated = await $fetch<InvitationItem>(`${API_BASE_URL}/${slug}/status`, {
        method: 'PATCH',
        body: { status },
      })
      upsertLocalOrder(updated)
      return updated
    } catch {
      const list = readLocalOrders()
      const target = list.find((i) => i.slug === slug)
      if (!target) return null
      target.status = status
      writeLocalOrders(list)
      return target
    }
  },

  async addRsvp(slug: string, payload: CreateRsvpPayload): Promise<InvitationItem | null> {
    try {
      const updated = await $fetch<InvitationItem>(`${API_BASE_URL}/${slug}/rsvp`, {
        method: 'POST',
        body: payload,
      })
      upsertLocalOrder(updated)
      return updated
    } catch {
      const list = readLocalOrders()
      const target = list.find((i) => i.slug === slug)
      if (!target) return null
      if (!target.rsvps) target.rsvps = []
      target.rsvps.push({
        ...payload,
        createdAt: new Date().toISOString(),
      })
      writeLocalOrders(list)
      return target
    }
  },
}
