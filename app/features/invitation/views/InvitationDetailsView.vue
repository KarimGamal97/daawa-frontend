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

    <!-- Step B: Full Scrollable Invitation Experience -->
    <div v-else :class="['min-h-screen py-10 sm:py-14 px-4 bg-gradient-to-b relative', currentGradient]">
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

      <div class="max-w-xl mx-auto space-y-7">
        <!-- 1. Main Royal Invitation Card -->
        <div class="rounded-[2.5rem] p-7 sm:p-10 bg-black/35 backdrop-blur-md border border-[#C5A059]/35 shadow-2xl text-center space-y-6">
          <div class="w-20 h-1 bg-[#C5A059]/50 mx-auto rounded-full"></div>

          <!-- Opening Verse or Custom Quote -->
          <p v-if="openingQuoteText" class="text-xs sm:text-sm text-[#C5A059] font-semibold leading-relaxed max-w-md mx-auto">
            {{ openingQuoteText }}
          </p>

          <!-- Optional Cover Photo -->
          <div v-if="invitation.photoUrl" class="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden border-2 border-[#C5A059] shadow-xl">
            <img :src="invitation.photoUrl" alt="Couple" class="w-full h-full object-cover" />
          </div>

          <!-- Groom & Bride Box -->
          <div class="py-7 px-4 rounded-3xl bg-white/5 border border-[#C5A059]/30 space-y-2">
            <p class="text-xs text-[#C5A059] font-semibold">{{ $t('invite.blessedWedding') }}</p>
            <h1 class="text-3xl sm:text-5xl font-bold text-white tracking-wide">
              {{ invitation.groomName }}
              <span class="text-[#C5A059] mx-1.5">&</span>
              {{ invitation.brideName }}
            </h1>
            <p v-if="invitation.tagline" class="text-xs sm:text-sm text-[#C5A059] pt-1 font-medium">
              {{ invitation.tagline }}
            </p>
          </div>

          <!-- Welcome Message -->
          <p class="text-sm text-[#E5DEC9] leading-relaxed max-w-md mx-auto">
            {{ invitation.welcomeMessage || $t('builder.step2.defaultWelcome') }}
          </p>

          <!-- Interactive Scratch-a-Heart Date Reveal -->
          <div class="pt-1">
            <div v-if="invitation.scratchReveal !== false">
              <button
                v-if="!isHeartScratched"
                type="button"
                @click="isHeartScratched = true"
                class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C5A059] via-[#E2C280] to-[#B38E46] text-[#140A0E] font-bold text-xs sm:text-sm shadow-lg inline-flex items-center gap-2 hover:brightness-105 transition"
              >
                <svg class="w-4 h-4 text-[#4A1525]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                <span>{{ $t('builder.phonePreview.scratchToReveal') }}</span>
              </button>
              <div v-else class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#F9F6F0] text-sm font-bold">
                <svg class="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                <span>{{ formattedDate }}</span>
              </div>
            </div>
            <p v-else class="font-bold text-base text-[#C5A059]">{{ formattedDate }}</p>
          </div>

          <!-- Countdown Timer -->
          <div class="grid grid-cols-4 gap-2.5 max-w-sm mx-auto pt-2">
            <div class="p-3 rounded-2xl bg-white/10 border border-[#C5A059]/25">
              <span class="block text-xl font-bold text-[#C5A059]">{{ countdown.days }}</span>
              <span class="text-[11px] opacity-80">{{ $t('invite.days') }}</span>
            </div>
            <div class="p-3 rounded-2xl bg-white/10 border border-[#C5A059]/25">
              <span class="block text-xl font-bold text-[#C5A059]">{{ countdown.hours }}</span>
              <span class="text-[11px] opacity-80">{{ $t('invite.hours') }}</span>
            </div>
            <div class="p-3 rounded-2xl bg-white/10 border border-[#C5A059]/25">
              <span class="block text-xl font-bold text-[#C5A059]">{{ countdown.minutes }}</span>
              <span class="text-[11px] opacity-80">{{ $t('invite.minutes') }}</span>
            </div>
            <div class="p-3 rounded-2xl bg-white/10 border border-[#C5A059]/25">
              <span class="block text-xl font-bold text-[#C5A059]">{{ countdown.seconds }}</span>
              <span class="text-[11px] opacity-80">{{ $t('invite.seconds') }}</span>
            </div>
          </div>

          <!-- Venue & Google Maps -->
          <div class="pt-3 border-t border-white/10 space-y-2">
            <p class="text-xs font-bold text-[#C5A059]">{{ $t('builder.phonePreview.venueSectionTitle') }}</p>
            <p class="text-base font-bold text-white">{{ invitation.venue }}</p>
            <p v-if="invitation.venueAddress" class="text-xs text-white/75">{{ invitation.venueAddress }}</p>

            <div v-if="invitation.mapUrl" class="pt-2">
              <a
                :href="invitation.mapUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A059] text-[#140A0E] text-xs font-bold shadow hover:brightness-105 transition"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{{ $t('invite.openMapBtn') }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 2. Celebration Schedule Timeline -->
        <div
          v-if="invitation.schedule && invitation.schedule.length > 0"
          class="rounded-3xl p-6 sm:p-8 bg-black/35 backdrop-blur-md border border-[#C5A059]/30 space-y-4"
        >
          <h2 class="text-lg font-bold text-center text-[#C5A059]">
            {{ $t('builder.phonePreview.scheduleSectionTitle') }}
          </h2>
          <div class="space-y-2.5">
            <div
              v-for="item in invitation.schedule"
              :key="item.id"
              class="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs sm:text-sm"
            >
              <span class="font-semibold text-white">{{ item.title }}</span>
              <span class="px-3 py-1 rounded-xl bg-[#C5A059]/20 text-[#C5A059] font-bold text-xs shrink-0">
                {{ item.time }}
              </span>
            </div>
          </div>
        </div>

        <!-- 3. Memory Album Gallery -->
        <div
          v-if="invitation.galleryPhotos && invitation.galleryPhotos.length > 0"
          class="rounded-3xl p-6 sm:p-8 bg-black/35 backdrop-blur-md border border-[#C5A059]/30 space-y-4"
        >
          <h2 class="text-lg font-bold text-center text-[#C5A059]">
            {{ $t('builder.phonePreview.gallerySectionTitle') }}
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              v-for="(imgUrl, idx) in invitation.galleryPhotos"
              :key="idx"
              class="aspect-square rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-md"
            >
              <img :src="imgUrl" alt="Memory" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <!-- 4. RSVP Form Card -->
        <div
          v-if="invitation.enableRsvp !== false"
          class="rounded-3xl p-6 sm:p-8 bg-black/35 backdrop-blur-md border border-[#C5A059]/30 space-y-5"
        >
          <h2 class="text-xl font-bold text-center text-[#C5A059]">{{ $t('invite.rsvpTitle') }}</h2>

          <div v-if="rsvpSubmitted" class="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
            <p class="font-bold text-emerald-400 text-sm">{{ $t('invite.rsvpSuccessTitle') }}</p>
            <p class="text-xs text-white/80">{{ $t('invite.rsvpSuccessDesc') }}</p>
          </div>

          <form v-else @submit.prevent="submitRsvp" class="space-y-4">
            <div>
              <label class="block text-xs font-bold mb-1.5 text-[#E5DEC9]">{{ $t('invite.guestNameLabel') }}</label>
              <input
                v-model="rsvpForm.guestName"
                required
                type="text"
                :placeholder="$t('invite.guestNamePlaceholder')"
                class="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#C5A059]/30 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="rsvpForm.attending = true"
                :class="[
                  'py-3 rounded-xl text-xs font-bold border transition',
                  rsvpForm.attending
                    ? 'bg-[#C5A059] text-[#140A0E] border-[#C5A059]'
                    : 'bg-white/5 text-white border-white/15'
                ]"
              >
                {{ $t('invite.attendingYes') }}
              </button>
              <button
                type="button"
                @click="rsvpForm.attending = false"
                :class="[
                  'py-3 rounded-xl text-xs font-bold border transition',
                  !rsvpForm.attending
                    ? 'bg-[#C5A059] text-[#140A0E] border-[#C5A059]'
                    : 'bg-white/5 text-white border-white/15'
                ]"
              >
                {{ $t('invite.attendingNo') }}
              </button>
            </div>

            <div v-if="rsvpForm.attending">
              <label class="block text-xs font-bold mb-1.5 text-[#E5DEC9]">{{ $t('invite.companionsLabel') }}</label>
              <select
                v-model.number="rsvpForm.companionsCount"
                class="w-full px-4 py-3 rounded-xl bg-[#1C0E14] border border-[#C5A059]/30 text-sm text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option :value="1">{{ $t('invite.comp1') }}</option>
                <option :value="2">{{ $t('invite.comp2') }}</option>
                <option :value="3">{{ $t('invite.comp3') }}</option>
                <option :value="4">{{ $t('invite.comp4') }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold mb-1.5 text-[#E5DEC9]">{{ $t('invite.wishLabel') }}</label>
              <textarea
                v-model="rsvpForm.wishMessage"
                rows="2"
                :placeholder="$t('invite.wishPlaceholder')"
                class="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#C5A059]/30 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#C5A059]"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="rsvpLoading"
              class="w-full py-3.5 rounded-xl bg-[#C5A059] hover:opacity-95 text-[#140A0E] font-bold text-sm shadow-lg transition"
            >
              {{ rsvpLoading ? $t('invite.submittingRsvpBtn') : $t('invite.submitRsvpBtn') }}
            </button>
          </form>
        </div>

        <!-- 5. Guest Wishes Wall -->
        <div v-if="invitation.rsvps && invitation.rsvps.length > 0" class="rounded-3xl p-6 bg-black/25 border border-[#C5A059]/20 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-[#C5A059]">{{ $t('invite.guestbookTitle') }}</h3>
            <span class="text-xs px-3 py-1 rounded-full bg-[#C5A059]/20 text-[#C5A059] font-bold">
              {{ attendingCount }} {{ $t('invite.confirmedCount') }}
            </span>
          </div>

          <div class="space-y-2.5 max-h-60 overflow-y-auto">
            <div
              v-for="(item, index) in invitation.rsvps"
              :key="index"
              class="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs"
            >
              <div class="flex items-center justify-between font-bold mb-1">
                <span>{{ item.guestName }}</span>
                <span :class="item.attending ? 'text-emerald-400' : 'text-white/50'">
                  {{ item.attending ? `${$t('invite.attendingBadge')} (${item.companionsCount || 1})` : $t('invite.declinedBadge') }}
                </span>
              </div>
              <p v-if="item.wishMessage" class="text-white/75 leading-relaxed">{{ item.wishMessage }}</p>
            </div>
          </div>
        </div>

        <!-- Footer Brand Link -->
        <div class="text-center pt-4 opacity-70 text-xs">
          <NuxtLink to="/" class="hover:text-[#C5A059] transition">
            {{ $t('invite.poweredBy') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { invitationsRepository } from '~/repositories/invitations.repository'
import { useTemplatesCatalog } from '~/features/home/composables/useTemplatesCatalog'
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

const attendingCount = computed<number>(() => {
  if (!invitation.value?.rsvps) return 0
  return invitation.value.rsvps.filter((r) => r.attending).length
})

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  if (!invitation.value) {
    await refresh()
  }
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (audioRef.value) {
    audioRef.value.pause()
  }
})

const countdown = computed(() => {
  const target = invitation.value?.weddingDate ? new Date(invitation.value.weddingDate).getTime() : 0
  const diff = Math.max(0, target - now.value)
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
})

const rsvpForm = reactive<CreateRsvpPayload>({
  guestName: '',
  attending: true,
  companionsCount: 1,
  wishMessage: '',
})

const rsvpLoading = ref(false)
const rsvpSubmitted = ref(false)

const submitRsvp = async () => {
  rsvpLoading.value = true
  try {
    await invitationsRepository.addRsvp(slug, rsvpForm)
    rsvpSubmitted.value = true
    await refresh()
  } catch {
    // Error handled silently
  } finally {
    rsvpLoading.value = false
  }
}
</script>
