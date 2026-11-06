import { computed } from 'vue'
import type { MusicTrackChoice } from '~/features/invitation/types/invitation.types'

export interface TemplateCatalogItem {
  id: string
  category: 'weddings' | 'engagement' | 'birthdays'
  name: string
  badge: string
  desc: string
  tags: string[]
  gradient: string
  accentColor: string
  defaultCoverImage: string
  defaultAudioUrl: string
  bgVideo?: string
}

export const AUDIO_TRACK_URLS: Record<Exclude<MusicTrackChoice, 'templateDefault' | 'none'>, string> = {
  royalCalm: '/audio/royal-calm.mp3',
  classicSymphony: '/audio/classic-symphony.mp3',
  andalusian: '/audio/andalusian.mp3',
}

export const useTemplatesCatalog = () => {
  const { t, tm, rt } = useI18n()

  const getStringList = (key: string): string[] => {
    const raw = tm(key) as unknown[]
    if (!Array.isArray(raw)) return []
    return raw.map((item) => (typeof item === 'string' ? item : rt(item as Parameters<typeof rt>[0])))
  }

  const categories = computed(() => [
    { id: 'all', label: t('home.templatesSection.categories.all') },
    { id: 'weddings', label: t('home.templatesSection.categories.weddings') },
    { id: 'engagement', label: t('home.templatesSection.categories.engagement') },
    { id: 'birthdays', label: t('home.templatesSection.categories.birthdays') },
  ])

  const templates = computed<TemplateCatalogItem[]>(() => [
    {
      id: 'umm-kulthum',
      category: 'weddings',
      name: t('home.templatesSection.items.ummKulthum.name'),
      badge: t('home.templatesSection.items.ummKulthum.badge'),
      desc: t('home.templatesSection.items.ummKulthum.desc'),
      tags: getStringList('home.templatesSection.items.ummKulthum.tags'),
      gradient: 'from-[#4A1525] via-[#2A0812] to-[#140A0E]',
      accentColor: '#C5A059',
      defaultCoverImage: '/templates/umm-kulthum/cover.jpg',
      defaultAudioUrl: '/templates/umm-kulthum/audio/song.mp3',
    },
    {
      id: 'royal-night',
      category: 'weddings',
      name: t('home.templatesSection.items.royalNight.name'),
      badge: t('home.templatesSection.items.royalNight.badge'),
      desc: t('home.templatesSection.items.royalNight.desc'),
      tags: getStringList('home.templatesSection.items.royalNight.tags'),
      gradient: 'from-[#4A1525] via-[#2D0C16] to-[#140A0E]',
      accentColor: '#C5A059',
      defaultCoverImage: '/templates/royal-night.jpg',
      defaultAudioUrl: '/audio/royal-calm.mp3',
    },
    {
      id: 'teatro',
      category: 'weddings',
      name: t('home.templatesSection.items.teatro.name'),
      badge: t('home.templatesSection.items.teatro.badge'),
      desc: t('home.templatesSection.items.teatro.desc'),
      tags: getStringList('home.templatesSection.items.teatro.tags'),
      gradient: 'from-[#5A0F1D] via-[#2B070E] to-[#0D0305]',
      accentColor: '#D4AF37',
      defaultCoverImage: '/templates/teatro.jpg',
      defaultAudioUrl: '/audio/classic-symphony.mp3',
    },
    {
      id: 'golden-night',
      category: 'weddings',
      name: t('home.templatesSection.items.goldenNight.name'),
      badge: t('home.templatesSection.items.goldenNight.badge'),
      desc: t('home.templatesSection.items.goldenNight.desc'),
      tags: getStringList('home.templatesSection.items.goldenNight.tags'),
      gradient: 'from-[#1B263B] via-[#0D1B2A] to-[#070F17]',
      accentColor: '#E0B96B',
      defaultCoverImage: '/templates/golden-night.jpg',
      defaultAudioUrl: '/audio/royal-calm.mp3',
    },
    {
      id: 'sakina',
      category: 'engagement',
      name: t('home.templatesSection.items.sakina.name'),
      badge: t('home.templatesSection.items.sakina.badge'),
      desc: t('home.templatesSection.items.sakina.desc'),
      tags: getStringList('home.templatesSection.items.sakina.tags'),
      gradient: 'from-[#8C735B] via-[#5E4B3B] to-[#2E241C]',
      accentColor: '#E6D5C3',
      defaultCoverImage: '/templates/sakina.jpg',
      defaultAudioUrl: '/audio/andalusian.mp3',
    },
    {
      id: 'flora-pink',
      category: 'engagement',
      name: t('home.templatesSection.items.floraPink.name'),
      badge: t('home.templatesSection.items.floraPink.badge'),
      desc: t('home.templatesSection.items.floraPink.desc'),
      tags: getStringList('home.templatesSection.items.floraPink.tags'),
      gradient: 'from-[#7A3E48] via-[#4A1525] to-[#260B13]',
      accentColor: '#F3C6CE',
      defaultCoverImage: '/templates/flora-pink.jpg',
      defaultAudioUrl: '/audio/classic-symphony.mp3',
    },
    {
      id: 'nile-palace',
      category: 'weddings',
      name: t('home.templatesSection.items.nilePalace.name'),
      badge: t('home.templatesSection.items.nilePalace.badge'),
      desc: t('home.templatesSection.items.nilePalace.desc'),
      tags: getStringList('home.templatesSection.items.nilePalace.tags'),
      gradient: 'from-[#8E6E37] via-[#5C431C] to-[#241909]',
      accentColor: '#F2C97D',
      defaultCoverImage: '/templates/nile-palace.jpg',
      defaultAudioUrl: '/audio/royal-calm.mp3',
    },
    {
      id: 'arabian-nights',
      category: 'engagement',
      name: t('home.templatesSection.items.arabianNights.name'),
      badge: t('home.templatesSection.items.arabianNights.badge'),
      desc: t('home.templatesSection.items.arabianNights.desc'),
      tags: getStringList('home.templatesSection.items.arabianNights.tags'),
      gradient: 'from-[#63371E] via-[#3D2010] to-[#1C0E07]',
      accentColor: '#E5B45B',
      defaultCoverImage: '/templates/arabian-nights.jpg',
      defaultAudioUrl: '/audio/andalusian.mp3',
    },
    {
      id: 'sea-breeze',
      category: 'weddings',
      name: t('home.templatesSection.items.seaBreeze.name'),
      badge: t('home.templatesSection.items.seaBreeze.badge'),
      desc: t('home.templatesSection.items.seaBreeze.desc'),
      tags: getStringList('home.templatesSection.items.seaBreeze.tags'),
      gradient: 'from-[#2B5870] via-[#1B3A4B] to-[#0F202A]',
      accentColor: '#A3D5E8',
      defaultCoverImage: '/templates/sea-breeze.jpg',
      defaultAudioUrl: '/audio/classic-symphony.mp3',
    },
    {
      id: 'noor-hidaya',
      category: 'engagement',
      name: t('home.templatesSection.items.noorHidaya.name'),
      badge: t('home.templatesSection.items.noorHidaya.badge'),
      desc: t('home.templatesSection.items.noorHidaya.desc'),
      tags: getStringList('home.templatesSection.items.noorHidaya.tags'),
      gradient: 'from-[#1F4239] via-[#132923] to-[#0A1412]',
      accentColor: '#C5A059',
      defaultCoverImage: '/templates/noor-hidaya.jpg',
      defaultAudioUrl: '/audio/andalusian.mp3',
    },
    {
      id: 'mono-classic',
      category: 'weddings',
      name: t('home.templatesSection.items.monoClassic.name'),
      badge: t('home.templatesSection.items.monoClassic.badge'),
      desc: t('home.templatesSection.items.monoClassic.desc'),
      tags: getStringList('home.templatesSection.items.monoClassic.tags'),
      gradient: 'from-[#3F3F46] via-[#27272A] to-[#09090B]',
      accentColor: '#E4E4E7',
      defaultCoverImage: '/templates/mono-classic.jpg',
      defaultAudioUrl: '/audio/classic-symphony.mp3',
    },
    {
      id: 'blue-lake',
      category: 'birthdays',
      name: t('home.templatesSection.items.blueLake.name'),
      badge: t('home.templatesSection.items.blueLake.badge'),
      desc: t('home.templatesSection.items.blueLake.desc'),
      tags: getStringList('home.templatesSection.items.blueLake.tags'),
      gradient: 'from-[#2A4B6C] via-[#1A3147] to-[#0D1924]',
      accentColor: '#B8D8F8',
      defaultCoverImage: '/templates/blue-lake.jpg',
      defaultAudioUrl: '/audio/royal-calm.mp3',
    },
    {
      id: 'garden-walk',
      category: 'engagement',
      name: t('home.templatesSection.items.gardenWalk.name'),
      badge: t('home.templatesSection.items.gardenWalk.badge'),
      desc: t('home.templatesSection.items.gardenWalk.desc'),
      tags: getStringList('home.templatesSection.items.gardenWalk.tags'),
      gradient: 'from-[#2E4D38] via-[#1C3023] to-[#0D1710]',
      accentColor: '#B8D4B2',
      defaultCoverImage: '/templates/garden-walk.jpg',
      defaultAudioUrl: '/audio/classic-symphony.mp3',
    },
    {
      id: 'olive-table',
      category: 'birthdays',
      name: t('home.templatesSection.items.oliveTable.name'),
      badge: t('home.templatesSection.items.oliveTable.badge'),
      desc: t('home.templatesSection.items.oliveTable.desc'),
      tags: getStringList('home.templatesSection.items.oliveTable.tags'),
      gradient: 'from-[#4B5838] via-[#313A24] to-[#171C11]',
      accentColor: '#D2DCA8',
      defaultCoverImage: '/templates/olive-table.jpg',
      defaultAudioUrl: '/audio/andalusian.mp3',
    },
    {
      id: 'palm-garden',
      category: 'weddings',
      name: t('home.templatesSection.items.palmGarden.name'),
      badge: t('home.templatesSection.items.palmGarden.badge'),
      desc: t('home.templatesSection.items.palmGarden.desc'),
      tags: getStringList('home.templatesSection.items.palmGarden.tags'),
      gradient: 'from-[#294A3E] via-[#192E26] to-[#0C1713]',
      accentColor: '#D4B475',
      defaultCoverImage: '/templates/palm-garden.jpg',
      defaultAudioUrl: '/audio/royal-calm.mp3',
    },
    {
      id: 'sunset-aisle',
      category: 'weddings',
      name: t('home.templatesSection.items.sunsetAisle.name'),
      badge: t('home.templatesSection.items.sunsetAisle.badge'),
      desc: t('home.templatesSection.items.sunsetAisle.desc'),
      tags: getStringList('home.templatesSection.items.sunsetAisle.tags'),
      gradient: 'from-[#7C4728] via-[#4D2915] to-[#241208]',
      accentColor: '#F3C078',
      defaultCoverImage: '/templates/sunset-aisle.jpg',
      defaultAudioUrl: '/audio/classic-symphony.mp3',
    },
  ])

  const getTemplateById = (id?: string): TemplateCatalogItem => {
    return templates.value.find((tpl) => tpl.id === id) ?? templates.value[0]!
  }

  const resolveAudioUrl = (templateId?: string, musicTrack?: MusicTrackChoice): string | null => {
    if (musicTrack === 'none') return null
    if (musicTrack && musicTrack !== 'templateDefault' && AUDIO_TRACK_URLS[musicTrack]) {
      return AUDIO_TRACK_URLS[musicTrack]
    }
    return getTemplateById(templateId).defaultAudioUrl
  }

  const includedTemplateFeatures = computed(() =>
    getStringList('home.templatesSection.includedFeatures')
  )

  return {
    categories,
    templates,
    getTemplateById,
    resolveAudioUrl,
    includedTemplateFeatures,
    getStringList,
  }
}
