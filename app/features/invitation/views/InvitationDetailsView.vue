<template>
  <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" class="min-h-screen bg-[#140A0E] text-[#F9F6F0] flex flex-col justify-between">
    <!-- Loading State -->
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
      <div class="text-center space-y-3">
        <div class="w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="text-sm text-[#C5A059]">{{ $t('invite.loading') }}</p>
      </div>
    </div>

    <!-- Error / Not Found State -->
    <div v-else-if="error || !invitation" class="min-h-screen flex items-center justify-center px-4">
      <div class="max-w-md w-full p-8 rounded-3xl bg-[#221117] border border-[#C5A059]/30 text-center space-y-4">
        <h1 class="text-2xl font-bold text-[#C5A059]">{{ $t('invite.notFoundTitle') }}</h1>
        <p class="text-xs text-[#D5C7B8]">{{ $t('invite.notFoundDesc') }}</p>
        <NuxtLink to="/create" class="inline-block px-6 py-3 rounded-full bg-[#C5A059] text-[#140A0E] font-bold text-xs">
          {{ $t('invite.createNewBtn') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Pending Payment Verification State -->
    <div v-else-if="invitation.status && invitation.status !== 'active'" class="min-h-screen flex items-center justify-center px-4">
      <div class="max-w-md w-full p-8 rounded-3xl bg-[#221117] border border-[#C5A059]/30 text-center space-y-4">
        <div class="w-12 h-12 mx-auto rounded-2xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <h1 class="text-xl font-bold text-[#C5A059]">{{ $t('invite.pendingTitle') }}</h1>
        <p class="text-xs text-[#D5C7B8] leading-relaxed">{{ $t('invite.pendingDesc') }}</p>
      </div>
    </div>

    <!-- Step A: Royal Wax-Seal Envelope Opening Screen -->
    <div
      v-else-if="!isEnvelopeOpened"
      @click="openEnvelope"
      :class="['min-h-screen px-4 py-12 flex flex-col items-center justify-between text-center cursor-pointer select-none bg-gradient-to-b', currentGradient]"
    >
      <div class="pt-4 space-y-1">
        <p class="text-xs tracking-widest text-[#C5A059] uppercase font-bold">{{ $t('brand.en') }} — {{ $t('brand.ar') }}</p>
        <p class="text-xs text-white/75">{{ currentTemplate.name }}</p>
      </div>

      <div class="my-auto flex flex-col items-center gap-5">
        <div class="w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-[#C5A059]/30 flex items-center justify-center bg-black/15 backdrop-blur-sm">
          <div
            :class="[
              'w-32 h-32 sm:w-36 sm:h-36 rounded-full shadow-2xl border-4 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105',
              invitation.sealStyle === 'burgundy'
                ? 'bg-gradient-to-br from-[#6B1F36] to-[#3A0E1B] border-[#C5A059] text-[#C5A059]'
                : invitation.sealStyle === 'pearl'
                  ? 'bg-gradient-to-br from-[#F9F6F0] to-[#D5C7B8] border-[#C5A059] text-[#4A1525]'
                  : 'bg-gradient-to-br from-[#D4B475] via-[#C5A059] to-[#8E6E37] border-[#F5EFE6]/60 text-[#140A0E]'
            ]"
          >
            <span class="text-lg sm:text-xl font-extrabold tracking-wider">
              {{ (invitation.groomName || 'أ')[0] }} & {{ (invitation.brideName || 'س')[0] }}
            </span>
            <span class="text-[10px] font-bold opacity-80 mt-1">DAAWA</span>
          </div>
        </div>

        <span class="px-5 py-2 rounded-full bg-black/35 border border-[#C5A059]/45 text-xs text-[#C5A059] font-bold animate-pulse">
          {{ $t('builder.phonePreview.tapSealHint') }}
        </span>
      </div>

      <div class="pb-4 space-y-1.5">
        <h1 class="text-2xl sm:text-3xl font-bold text-[#C5A059]">
          {{ invitation.groomName }} & {{ invitation.brideName }}
        </h1>
        <p class="text-xs text-white/75">{{ formattedDate }}</p>
      </div>
    </div>

    <!-- Step B: Full Scrollable Invitation Experience with Dynamic Template -->
    <div v-else class="relative">
      <!-- Hidden Background Audio Element -->
      <audio
        v-if="activeAudioUrl"
        ref="audioRef"
        :src="activeAudioUrl"
        loop
        preload="auto"
      ></audio>

      <!-- Floating Music Mute / Unmute Button -->
      <button
        v-if="activeAudioUrl"
        type="button"
        @click="toggleAudio"
        class="fixed top-5 end-5 z-40 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-[#C5A059]/50 text-[#C5A059] flex items-center justify-center shadow-lg hover:scale-105 transition"
      >
        <svg v-if="isAudioPlaying" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
        <svg v-else class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" x2="17" y1="9" y2="15"/>
          <line x1="17" x2="23" y1="9" y2="15"/>
        </svg>
      </button>

      <!-- Reusable Dynamic Invitation Card -->
      <DynamicInvitationCard
        :invitation="invitation"
        :template="currentTemplate"
        @submit-rsvp="submitRsvp"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { invitationsRepository } from '~/repositories/invitations.repository'
import { useTemplatesCatalog } from '~/features/home/composables/useTemplatesCatalog'
import DynamicInvitationCard from '../components/DynamicInvitationCard.vue'
import type { InvitationItem, CreateRsvpPayload } from '../types/invitation.types'

const route = useRoute()
const { t, locale } = useI18n()
const slug = route.params.slug as string

const { getTemplateById, resolveAudioUrl } = useTemplatesCatalog()

const invitation = ref<InvitationItem | null>(null)
const pending = ref(true)
const error = ref(false)

const refresh = async () => {
  const result = await invitationsRepository.fetchBySlug(slug)
  invitation.value = result
  error.value = !result
  pending.value = false
}

await useAsyncData(`invite-${slug}`, async () => {
  await refresh()
  return invitation.value
})

useSeoMeta({
  title: () =>
    invitation.value
      ? `${t('invite.weddingInviteTitle')} — ${invitation.value.groomName} & ${invitation.value.brideName}`
      : 'DAAWA | دعوة',
  ogTitle: () =>
    invitation.value
      ? `${t('invite.weddingInviteTitle')} — ${invitation.value.groomName} & ${invitation.value.brideName}`
      : 'DAAWA | دعوة',
  description: () =>
    invitation.value
      ? `${invitation.value.welcomeMessage || t('invite.shareMessage')} — ${invitation.value.venue}`
      : t('home.heroSubtitle'),
  ogDescription: () =>
    invitation.value
      ? `${invitation.value.welcomeMessage || t('invite.shareMessage')} — ${invitation.value.venue}`
      : t('home.heroSubtitle'),
  ogImage: () =>
    invitation.value?.photoUrl?.startsWith('http')
      ? invitation.value.photoUrl
      : undefined,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () =>
    invitation.value
      ? `${t('invite.weddingInviteTitle')} — ${invitation.value.groomName} & ${invitation.value.brideName}`
      : 'DAAWA | دعوة',
  twitterDescription: () =>
    invitation.value
      ? `${invitation.value.welcomeMessage || t('invite.shareMessage')} — ${invitation.value.venue}`
      : t('home.heroSubtitle'),
})

const isEnvelopeOpened = ref(false)
const isHeartScratched = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)
const isAudioPlaying = ref(false)

const currentTemplate = computed(() => getTemplateById(invitation.value?.templateId))

const currentGradient = computed<string>(() => currentTemplate.value.gradient)

const activeAudioUrl = computed<string | null>(() =>
  resolveAudioUrl(invitation.value?.templateId, invitation.value?.musicTrack)
)

const openingQuoteText = computed<string>(() => {
  if (!invitation.value) return ''
  if (invitation.value.quoteType === 'none') return ''
  if (invitation.value.quoteType === 'custom') {
    return invitation.value.customQuote || ''
  }
  return t('builder.step2.defaultQuranVerse')
})

const openEnvelope = async () => {
  isEnvelopeOpened.value = true
  await nextTick()
  if (audioRef.value && activeAudioUrl.value) {
    try {
      await audioRef.value.play()
      isAudioPlaying.value = true
    } catch {
      isAudioPlaying.value = false
    }
  }
}

const toggleAudio = async () => {
  if (!audioRef.value) return
  if (isAudioPlaying.value) {
    audioRef.value.pause()
    isAudioPlaying.value = false
  } else {
    try {
      await audioRef.value.play()
      isAudioPlaying.value = true
    } catch {
      isAudioPlaying.value = false
    }
  }
}

const formattedDate = computed<string>(() => {
  if (!invitation.value?.weddingDate) return ''
  try {
    const dateLocale = locale.value === 'ar' ? 'ar-EG' : 'en-US'
    return new Date(invitation.value.weddingDate).toLocaleDateString(dateLocale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return invitation.value.weddingDate
  }
})

onMounted(async () => {
  if (!invitation.value) {
    await refresh()
  }
})

onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.pause()
  }
})

const submitRsvp = async (payload: CreateRsvpPayload) => {
  try {
    await invitationsRepository.addRsvp(slug, payload)
    await refresh()
  } catch {
    // Error handled silently
  }
}
</script>
