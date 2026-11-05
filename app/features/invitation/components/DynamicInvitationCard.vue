<template>
  <div
    :class="[
      'min-h-screen py-10 sm:py-14 px-4 bg-gradient-to-b relative overflow-hidden text-center text-white select-none',
      currentTemplate.gradient,
    ]"
  >
    <!-- Optional Background Ambient Video -->
    <video
      v-if="currentTemplate.bgVideo"
      :src="currentTemplate.bgVideo"
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
    ></video>

    <!-- Content Container -->
    <div class="relative z-10 max-w-xl mx-auto space-y-7">
      <!-- 1. Main Royal Invitation Card -->
      <div
        class="rounded-[2.5rem] p-7 sm:p-10 bg-black/35 backdrop-blur-md border shadow-2xl space-y-6"
        :style="{ borderColor: `${currentTemplate.accentColor}50` }"
      >
        <!-- Top Accent Bar -->
        <div
          class="w-20 h-1 mx-auto rounded-full"
          :style="{ backgroundColor: currentTemplate.accentColor }"
        ></div>

        <!-- Opening Quote -->
        <p
          v-if="openingQuote"
          class="text-xs sm:text-sm font-semibold leading-relaxed max-w-md mx-auto"
          :style="{ color: currentTemplate.accentColor }"
        >
          {{ openingQuote }}
        </p>

        <!-- Cover Photo (Uploaded or Default Template Cover) -->
        <div
          v-if="displayPhotoUrl"
          class="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden border-2 shadow-xl"
          :style="{ borderColor: currentTemplate.accentColor }"
        >
          <img :src="displayPhotoUrl" alt="Couple" class="w-full h-full object-cover" />
        </div>

        <!-- Couple Names & Tagline Box -->
        <div
          class="py-7 px-4 rounded-3xl bg-white/5 border space-y-2"
          :style="{ borderColor: `${currentTemplate.accentColor}40` }"
        >
          <p class="text-xs font-semibold" :style="{ color: currentTemplate.accentColor }">
            {{ $t('invite.blessedWedding') }}
          </p>
          <h1 class="text-3xl sm:text-5xl font-bold text-white tracking-wide">
            {{ invitation.groomName }}
            <span class="mx-1.5" :style="{ color: currentTemplate.accentColor }">&</span>
            {{ invitation.brideName }}
          </h1>
          <p
            v-if="invitation.tagline"
            class="text-xs sm:text-sm pt-1 font-medium"
            :style="{ color: currentTemplate.accentColor }"
          >
            {{ invitation.tagline }}
          </p>
        </div>

        <!-- Welcome Message -->
        <p class="text-sm text-[#E5DEC9] leading-relaxed max-w-md mx-auto">
          {{ invitation.welcomeMessage || $t('builder.step2.defaultWelcome') }}
        </p>

        <!-- Scratch-a-Heart / Date Reveal -->
        <div class="pt-1">
          <div v-if="invitation.scratchReveal !== false">
            <button
              v-if="!isHeartScratched"
              type="button"
              @click="isHeartScratched = true"
              class="px-6 py-3.5 rounded-2xl text-[#140A0E] font-bold text-xs sm:text-sm shadow-lg inline-flex items-center gap-2 hover:brightness-105 transition"
              :style="{
                background: `linear-gradient(to right, ${currentTemplate.accentColor}, #F5EFE6, ${currentTemplate.accentColor})`,
              }"
            >
              <svg class="w-4 h-4 text-[#4A1525]" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                />
              </svg>
              <span>{{ $t('builder.phonePreview.scratchToReveal') }}</span>
            </button>
            <div
              v-else
              class="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-bold text-[#F9F6F0]"
              :style="{
                backgroundColor: `${currentTemplate.accentColor}25`,
                borderColor: currentTemplate.accentColor,
              }"
            >
              <svg class="w-4 h-4" :style="{ color: currentTemplate.accentColor }" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                />
              </svg>
              <span>{{ formattedDate }}</span>
            </div>
          </div>
          <p v-else class="font-bold text-base" :style="{ color: currentTemplate.accentColor }">
            {{ formattedDate }}
          </p>
        </div>

        <!-- Live Countdown Timer -->
        <div class="grid grid-cols-4 gap-2.5 max-w-sm mx-auto pt-2">
          <div
            v-for="(unit, idx) in countdownUnits"
            :key="idx"
            class="p-3 rounded-2xl bg-white/10 border"
            :style="{ borderColor: `${currentTemplate.accentColor}35` }"
          >
            <span class="block text-xl font-bold" :style="{ color: currentTemplate.accentColor }">
              {{ unit.value }}
            </span>
            <span class="text-[11px] opacity-80">{{ unit.label }}</span>
          </div>
        </div>

        <!-- Venue & Google Maps -->
        <div class="pt-3 border-t border-white/10 space-y-2">
          <p class="text-xs font-bold" :style="{ color: currentTemplate.accentColor }">
            {{ $t('builder.phonePreview.venueSectionTitle') }}
          </p>
          <p class="text-base font-bold text-white">{{ invitation.venue }}</p>
          <p v-if="invitation.venueAddress" class="text-xs text-white/75">{{ invitation.venueAddress }}</p>

          <div v-if="invitation.mapUrl" class="pt-2">
            <a
              :href="invitation.mapUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#140A0E] text-xs font-bold shadow hover:brightness-105 transition"
              :style="{ backgroundColor: currentTemplate.accentColor }"
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
        class="rounded-3xl p-6 sm:p-8 bg-black/35 backdrop-blur-md border space-y-4"
        :style="{ borderColor: `${currentTemplate.accentColor}35` }"
      >
        <h2 class="text-lg font-bold text-center" :style="{ color: currentTemplate.accentColor }">
          {{ $t('builder.phonePreview.scheduleSectionTitle') }}
        </h2>
        <div class="space-y-2.5">
          <div
            v-for="item in invitation.schedule"
            :key="item.id"
            class="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs sm:text-sm text-start"
          >
            <span class="font-semibold text-white">{{ item.title }}</span>
            <span
              class="px-3 py-1 rounded-xl font-bold text-xs shrink-0"
              :style="{
                backgroundColor: `${currentTemplate.accentColor}25`,
                color: currentTemplate.accentColor,
              }"
            >
              {{ item.time }}
            </span>
          </div>
        </div>
      </div>

      <!-- 3. Memory Album Gallery -->
      <div
        v-if="invitation.galleryPhotos && invitation.galleryPhotos.length > 0"
        class="rounded-3xl p-6 sm:p-8 bg-black/35 backdrop-blur-md border space-y-4"
        :style="{ borderColor: `${currentTemplate.accentColor}35` }"
      >
        <h2 class="text-lg font-bold text-center" :style="{ color: currentTemplate.accentColor }">
          {{ $t('builder.phonePreview.gallerySectionTitle') }}
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div
            v-for="(imgUrl, idx) in invitation.galleryPhotos"
            :key="idx"
            class="aspect-square rounded-2xl overflow-hidden border shadow-md"
            :style="{ borderColor: `${currentTemplate.accentColor}40` }"
          >
            <img :src="imgUrl" alt="Memory" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- 4. Wedding Wishes & Congratulation Card -->
      <div
        v-if="invitation.enableRsvp !== false"
        class="rounded-3xl p-6 sm:p-8 bg-black/35 backdrop-blur-md border space-y-5"
        :style="{ borderColor: `${currentTemplate.accentColor}35` }"
      >
        <div class="text-center space-y-1">
          <h2 class="text-xl font-bold" :style="{ color: currentTemplate.accentColor }">
            {{ $t('invite.rsvpTitle') }}
          </h2>
          <p class="text-xs text-white/70">{{ $t('invite.shareMessage') }}</p>
        </div>

        <div
          v-if="rsvpSubmitted"
          class="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2"
        >
          <p class="font-bold text-emerald-400 text-sm">{{ $t('invite.rsvpSuccessTitle') }}</p>
          <p class="text-xs text-white/80">{{ $t('invite.rsvpSuccessDesc') }}</p>
        </div>

        <form v-else @submit.prevent="handleSubmitRsvp" class="space-y-4 text-start">
          <div>
            <label class="block text-xs font-bold mb-1.5 text-[#E5DEC9]">{{ $t('invite.guestNameLabel') }}</label>
            <input
              v-model="guestName"
              required
              type="text"
              :placeholder="$t('invite.guestNamePlaceholder')"
              class="w-full px-4 py-3 rounded-xl bg-white/10 border text-sm text-white placeholder-white/40 focus:outline-none"
              :style="{ borderColor: `${currentTemplate.accentColor}40` }"
            />
          </div>

          <div>
            <label class="block text-xs font-bold mb-1.5 text-[#E5DEC9]">{{ $t('invite.wishLabel') }}</label>
            <textarea
              v-model="guestWish"
              required
              rows="3"
              :placeholder="$t('invite.wishPlaceholder')"
              class="w-full px-4 py-3 rounded-xl bg-white/10 border text-sm text-white placeholder-white/40 focus:outline-none"
              :style="{ borderColor: `${currentTemplate.accentColor}40` }"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="rsvpLoading"
            class="w-full py-3.5 rounded-xl text-[#140A0E] font-bold text-sm shadow-lg transition hover:brightness-105"
            :style="{ backgroundColor: currentTemplate.accentColor }"
          >
            {{ rsvpLoading ? $t('invite.submittingRsvpBtn') : $t('invite.submitRsvpBtn') }}
          </button>
        </form>
      </div>

      <!-- 5. Guest Wishes Wall -->
      <div
        v-if="invitation.rsvps && invitation.rsvps.length > 0"
        class="rounded-3xl p-6 bg-black/25 border space-y-4"
        :style="{ borderColor: `${currentTemplate.accentColor}25` }"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold" :style="{ color: currentTemplate.accentColor }">
            {{ $t('invite.guestbookTitle') }}
          </h3>
          <span
            class="text-xs px-3 py-1 rounded-full font-bold"
            :style="{
              backgroundColor: `${currentTemplate.accentColor}20`,
              color: currentTemplate.accentColor,
            }"
          >
            {{ invitation.rsvps.length }} {{ $t('invite.confirmedCount') }}
          </span>
        </div>

        <div class="space-y-2.5 max-h-60 overflow-y-auto">
          <div
            v-for="(item, index) in invitation.rsvps"
            :key="index"
            class="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1.5 text-start"
          >
            <div class="flex items-center justify-between font-bold">
              <span :style="{ color: currentTemplate.accentColor }">{{ item.guestName }}</span>
            </div>
            <p v-if="item.wishMessage" class="text-white/85 leading-relaxed">{{ item.wishMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Footer Brand Watermark -->
      <div class="text-center pt-4 opacity-70 text-xs">
        <NuxtLink to="/" class="transition hover:underline" :style="{ color: currentTemplate.accentColor }">
          {{ $t('invite.poweredBy') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTemplatesCatalog, type TemplateCatalogItem } from '~/features/home/composables/useTemplatesCatalog'
import type { InvitationItem, CreateRsvpPayload } from '../types/invitation.types'

interface Props {
  invitation: InvitationItem
  template?: TemplateCatalogItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'submit-rsvp', payload: CreateRsvpPayload): void
}>()

const { t, locale } = useI18n()
const { getTemplateById } = useTemplatesCatalog()

const isHeartScratched = ref(false)
const guestName = ref('')
const guestWish = ref('')
const rsvpLoading = ref(false)
const rsvpSubmitted = ref(false)

const currentTemplate = computed<TemplateCatalogItem>(() => {
  if (props.template) return props.template
  return getTemplateById(props.invitation.templateId)
})

const displayPhotoUrl = computed<string>(() => {
  return props.invitation.photoUrl || currentTemplate.value.defaultCoverImage
})

const openingQuote = computed<string>(() => {
  if (props.invitation.quoteType === 'none') return ''
  if (props.invitation.quoteType === 'custom') {
    return props.invitation.customQuote || ''
  }
  return t('builder.step2.defaultQuranVerse')
})

const formattedDate = computed<string>(() => {
  if (!props.invitation.weddingDate) return ''
  try {
    const dateLocale = locale.value === 'ar' ? 'ar-EG' : 'en-US'
    return new Date(props.invitation.weddingDate).toLocaleDateString(dateLocale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return props.invitation.weddingDate
  }
})

const now = ref(Date.now())
const countdownUnits = computed(() => {
  const target = props.invitation.weddingDate ? new Date(props.invitation.weddingDate).getTime() : 0
  const diff = Math.max(0, target - now.value)
  return [
    { value: Math.floor(diff / (1000 * 60 * 60 * 24)), label: t('invite.days') },
    { value: Math.floor((diff / (1000 * 60 * 60)) % 24), label: t('invite.hours') },
    { value: Math.floor((diff / (1000 * 60)) % 60), label: t('invite.minutes') },
    { value: Math.floor((diff / 1000) % 60), label: t('invite.seconds') },
  ]
})

const handleSubmitRsvp = () => {
  rsvpLoading.value = true
  emit('submit-rsvp', {
    guestName: guestName.value.trim(),
    wishMessage: guestWish.value.trim(),
    attending: true,
    companionsCount: 1,
  })
  rsvpSubmitted.value = true
  rsvpLoading.value = false
}
</script>

