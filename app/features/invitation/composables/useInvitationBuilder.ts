import { ref, reactive, computed, watch, onMounted } from 'vue'
import { invitationsRepository } from '~/repositories/invitations.repository'
import { useTemplatesCatalog } from '~/features/home/composables/useTemplatesCatalog'
import type { CreateInvitationPayload } from '../types/invitation.types'

const DRAFT_STORAGE_KEY = 'daawa-invitation-draft-v2'

export const useInvitationBuilder = () => {
  const { t, locale } = useI18n()
  const route = useRoute()
  const { templates: templateOptions } = useTemplatesCatalog()

  const currentStep = ref<number>(1)
  const previewMode = ref<'envelope' | 'card'>('card')
  const draftCopied = ref(false)
  const paymentNumberCopied = ref(false)
  const discountApplied = ref(false)

  const getDefaultSchedule = () => [
    { id: 's1', time: t('builder.step2.defaultSchedule.t1Time'), title: t('builder.step2.defaultSchedule.t1Title') },
    { id: 's2', time: t('builder.step2.defaultSchedule.t2Time'), title: t('builder.step2.defaultSchedule.t2Title') },
    { id: 's3', time: t('builder.step2.defaultSchedule.t3Time'), title: t('builder.step2.defaultSchedule.t3Title') },
  ]

  const form = reactive<CreateInvitationPayload>({
    slug: '',
    groomName: '',
    brideName: '',
    weddingDate: '2026-12-25T20:00',
    scratchReveal: true,
    venue: '',
    venueAddress: '',
    mapUrl: '',
    quoteType: 'quran',
    customQuote: '',
    welcomeMessage: t('builder.step2.defaultWelcome'),
    tagline: t('builder.step2.defaultTagline'),
    schedule: getDefaultSchedule(),
    enableRsvp: true,
    templateId: typeof route.query.template === 'string' ? route.query.template : 'royal-night',
    eventType: 'wedding',
    sealStyle: 'gold',
    musicTrack: 'templateDefault',
    customMusicName: '',
    photoUrl: '',
    galleryPhotos: [],
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    paymentMethod: 'instapay',
    paymentReference: '',
    receiptFileName: '',
    receiptImageUrl: '',
    discountCode: '',
  })

  onMounted(() => {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<CreateInvitationPayload>
        Object.assign(form, parsed)
        if (form.paymentMethod !== 'instapay' && form.paymentMethod !== 'vodafone') {
          form.paymentMethod = 'instapay'
        }
      } catch {
        // Ignore malformed localStorage draft
      }
    }
    if (typeof route.query.template === 'string') {
      form.templateId = route.query.template
    }
  })

  watch(
    form,
    (val) => {
      if (import.meta.client) {
        try {
          localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(val))
        } catch {
          // Ignore storage quota limits
        }
      }
    },
    { deep: true }
  )

  const activeTemplate = computed(() => {
    const found = templateOptions.value.find((tpl) => tpl.id === form.templateId)
    return found ?? templateOptions.value[0]!
  })

  const activeQuoteText = computed(() => {
    if (form.quoteType === 'none') return ''
    if (form.quoteType === 'custom') return form.customQuote || ''
    return t('builder.step2.quranFullText')
  })

  const formattedPreviewDate = computed(() => {
    if (!form.weddingDate) return t('home.mockup.date')
    try {
      return new Date(form.weddingDate).toLocaleDateString(locale.value === 'ar' ? 'ar-EG' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return form.weddingDate
    }
  })

  const packageBasePrice = 999
  const finalTotalPrice = computed(() => (discountApplied.value ? 899 : packageBasePrice))

  const isLoading = ref(false)
  const errorMsg = ref('')
  const createdSlug = ref('')
  const copied = ref(false)

  const invitationUrl = computed(() => {
    if (import.meta.client && createdSlug.value) {
      return `${window.location.origin}/invite/${createdSlug.value}`
    }
    return `/invite/${createdSlug.value}`
  })

  const copyLink = async () => {
    if (import.meta.client && invitationUrl.value) {
      await navigator.clipboard.writeText(invitationUrl.value)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  }

  const copyDraftUrl = async () => {
    if (import.meta.client) {
      const url = `${window.location.origin}/create?template=${encodeURIComponent(form.templateId || 'royal-night')}`
      await navigator.clipboard.writeText(url)
      draftCopied.value = true
      setTimeout(() => {
        draftCopied.value = false
      }, 2000)
    }
  }

  const copyPaymentNumber = async () => {
    if (import.meta.client) {
      await navigator.clipboard.writeText('01094123678')
      paymentNumberCopied.value = true
      setTimeout(() => {
        paymentNumberCopied.value = false
      }, 2000)
    }
  }

  const handleReceiptUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    form.receiptFileName = file.name
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        form.receiptImageUrl = reader.result
      }
    }
    reader.readAsDataURL(file)
    input.value = ''
  }

  const applyDiscountCode = () => {
    const code = (form.discountCode || '').trim().toUpperCase()
    if (code === 'DAAWA' || code === 'ROYAL' || code === 'WELCOME') {
      discountApplied.value = true
    } else {
      discountApplied.value = false
    }
  }

  const addScheduleRow = () => {
    if (!form.schedule) {
      form.schedule = []
    }
    form.schedule.push({
      id: `item-${Date.now()}`,
      time: '',
      title: '',
    })
  }

  const removeScheduleRow = (id: string) => {
    if (!form.schedule) return
    form.schedule = form.schedule.filter((item) => item.id !== id)
  }

  const handleCoverPhotoUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        form.photoUrl = reader.result
      }
    }
    reader.readAsDataURL(file)
    input.value = ''
  }

  const handleGalleryUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    const files = input.files
    if (!files || files.length === 0) return
    if (!form.galleryPhotos) {
      form.galleryPhotos = []
    }
    const remainingSlots = 6 - form.galleryPhotos.length
    const selectedFiles = Array.from(files).slice(0, remainingSlots)

    selectedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string' && form.galleryPhotos && form.galleryPhotos.length < 6) {
          form.galleryPhotos.push(reader.result)
        }
      }
      reader.readAsDataURL(file)
    })
    input.value = ''
  }

  const removeGalleryPhoto = (index: number) => {
    if (!form.galleryPhotos) return
    form.galleryPhotos.splice(index, 1)
  }

  const handleMp3Upload = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    form.customMusicName = file.name
    input.value = ''
  }

  const resetBuilder = () => {
    form.slug = ''
    form.groomName = ''
    form.brideName = ''
    form.weddingDate = '2026-12-25T20:00'
    form.scratchReveal = true
    form.venue = ''
    form.venueAddress = ''
    form.mapUrl = ''
    form.quoteType = 'quran'
    form.customQuote = ''
    form.welcomeMessage = t('builder.step2.defaultWelcome')
    form.tagline = t('builder.step2.defaultTagline')
    form.schedule = getDefaultSchedule()
    form.enableRsvp = true
    form.templateId = 'royal-night'
    form.eventType = 'wedding'
    form.sealStyle = 'gold'
    form.musicTrack = 'templateDefault'
    form.customMusicName = ''
    form.photoUrl = ''
    form.galleryPhotos = []
    form.customerName = ''
    form.customerPhone = ''
    form.customerEmail = ''
    form.paymentMethod = 'instapay'
    form.paymentReference = ''
    form.receiptFileName = ''
    form.receiptImageUrl = ''
    form.discountCode = ''
    discountApplied.value = false
    currentStep.value = 1
    errorMsg.value = ''
    if (import.meta.client) {
      localStorage.removeItem(DRAFT_STORAGE_KEY)
    }
  }

  const goToStep = (step: number) => {
    errorMsg.value = ''
    if (step > 2 && (!form.groomName.trim() || !form.brideName.trim() || !form.venue.trim())) {
      currentStep.value = 2
      errorMsg.value = t('builder.errorMissingStep2')
      return
    }
    currentStep.value = step
    if (step === 4) {
      previewMode.value = 'envelope'
    }
  }

  const generateCleanSlug = () => {
    const raw = form.slug.trim() || `wedding-${Date.now().toString().slice(-5)}`
    return raw
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || `invite-${Date.now().toString().slice(-5)}`
  }

  const submitInvitation = async () => {
    errorMsg.value = ''
    if (!form.groomName.trim() || !form.brideName.trim() || !form.venue.trim()) {
      currentStep.value = 2
      errorMsg.value = t('builder.errorMissingStep2')
      return
    }
    if (
      !form.customerName?.trim() ||
      !form.customerPhone?.trim() ||
      !form.paymentReference?.trim() ||
      !form.receiptFileName?.trim()
    ) {
      errorMsg.value = t('builder.errorMissingPayment')
      return
    }

    isLoading.value = true
    try {
      const cleanSlug = generateCleanSlug()
      const res = await invitationsRepository.create({
        slug: cleanSlug,
        groomName: form.groomName,
        brideName: form.brideName,
        weddingDate: form.weddingDate,
        scratchReveal: form.scratchReveal,
        venue: form.venue,
        venueAddress: form.venueAddress,
        mapUrl: form.mapUrl,
        quoteType: form.quoteType,
        customQuote: form.customQuote,
        welcomeMessage: form.welcomeMessage,
        tagline: form.tagline,
        schedule: form.schedule,
        enableRsvp: form.enableRsvp,
        templateId: form.templateId,
        eventType: form.eventType,
        sealStyle: form.sealStyle,
        musicTrack: form.musicTrack,
        customMusicName: form.customMusicName,
        photoUrl: form.photoUrl,
        galleryPhotos: form.galleryPhotos,
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerEmail: form.customerEmail,
        paymentMethod: form.paymentMethod,
        paymentReference: form.paymentReference,
        receiptFileName: form.receiptFileName,
        receiptImageUrl: form.receiptImageUrl,
        totalPrice: finalTotalPrice.value,
        status: 'pending',
      })

      createdSlug.value = res.slug || cleanSlug
      if (import.meta.client) {
        localStorage.removeItem(DRAFT_STORAGE_KEY)
      }
    } catch (err: unknown) {
      const fetchError = err as { data?: { message?: string } }
      errorMsg.value = fetchError?.data?.message || t('builder.errorDefault')
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentStep,
    previewMode,
    draftCopied,
    paymentNumberCopied,
    discountApplied,
    packageBasePrice,
    finalTotalPrice,
    templateOptions,
    form,
    activeTemplate,
    activeQuoteText,
    formattedPreviewDate,
    isLoading,
    errorMsg,
    createdSlug,
    copied,
    invitationUrl,
    copyLink,
    copyDraftUrl,
    copyPaymentNumber,
    handleReceiptUpload,
    applyDiscountCode,
    addScheduleRow,
    removeScheduleRow,
    handleCoverPhotoUpload,
    handleGalleryUpload,
    removeGalleryPhoto,
    handleMp3Upload,
    resetBuilder,
    goToStep,
    submitInvitation,
  }
}
