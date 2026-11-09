<template>
  <div class="min-h-screen bg-[#10070A] text-[#430E1B] flex flex-col items-center py-0 sm:py-6 px-0 sm:px-4 select-none">
    <!-- Floating Audio Control Pill -->
    <div class="fixed top-4 end-4 z-50 flex items-center gap-2">
      <button
        type="button"
        @click="toggleAudio"
        :aria-label="isPlaying ? 'Pause Music' : 'Play Music'"
        class="relative w-11 h-11 rounded-full bg-[#221117]/90 backdrop-blur-md border border-[#C5A059]/50 text-[#C5A059] shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition"
      >
        <span
          v-if="isPlaying"
          class="absolute inset-0 rounded-full border border-[#C5A059]/60 animate-ping"
        ></span>
        <svg v-if="isPlaying" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
        <svg v-else class="w-5 h-5 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" x2="17" y1="9" y2="15"/>
          <line x1="17" x2="23" y1="9" y2="15"/>
        </svg>
      </button>
    </div>

    <!-- Native Audio Player for Fast, Reliable Mobile Audio -->
    <audio
      ref="audioRef"
      :src="audioSource"
      loop
      preload="auto"
      @play="isPlaying = true"
      @pause="isPlaying = false"
    ></audio>

    <!-- Main Vertical Scrollable Container (Mobile Width max-w-[430px]) -->
    <div class="w-full max-w-[430px] shadow-2xl sm:rounded-3xl overflow-hidden bg-[#FAF6EE] flex flex-col">
      
      <!-- ======================================================== -->
      <!-- SECTION 1: HERO & OPERA CURTAIN (temp_1.jpg)            -->
      <!-- ======================================================== -->
      <section class="relative w-full overflow-hidden" style="aspect-ratio: 572 / 1024;">
        <img
          src="/templates/umm-kulthum/temp_1.jpg"
          alt="Royal Opera Curtain & Umm Kulthum"
          class="w-full h-full object-cover select-none pointer-events-none"
        />

        <!-- 1. Interlocked Monogram (initials stacked over each other) -->
        <div
          dir="ltr"
          class="absolute inset-x-0 z-10 flex items-center justify-center"
          style="top: 24.5%;"
        >
          <div class="relative w-[19%] aspect-square text-[#531524] select-none">
            <span class="absolute inset-0 flex items-center justify-center font-marcellus font-light leading-none text-[clamp(36px,12cqi,52px)] -translate-x-[6%]">
              {{ monogramFirst }}
            </span>
            <span class="absolute inset-0 flex items-center justify-center font-marcellus font-light leading-none text-[clamp(36px,12cqi,52px)] translate-x-[6%] mix-blend-multiply">
              {{ monogramSecond }}
            </span>
          </div>
        </div>

        <!-- 2. "TOGETHER WITH THEIR FAMILIES" -->
        <div
          dir="ltr"
          class="absolute inset-x-0 z-10 text-center"
          style="top: 34.2%;"
        >
          <p class="font-marcellus text-[clamp(6.5px,2cqi,8.5px)] tracking-[0.14em] uppercase text-[#3B1420]">
            {{ $t('templates.ummKulthum.families') }}
          </p>
        </div>

        <!-- 3. Groom & Bride Names on one unified horizontal level -->
        <div
          class="absolute inset-x-0 z-10 flex items-center justify-center gap-3 text-center px-4"
          style="top: 37.2%;"
        >
          <span
            :class="[
              'text-[#3B1420] leading-none whitespace-nowrap',
              isArabicNames
                ? 'font-aref font-bold text-[clamp(13px,3.8cqi,17px)] tracking-normal'
                : 'font-marcellus uppercase tracking-[0.08em] text-[clamp(9.5px,3cqi,13px)]'
            ]"
          >
            {{ groomDisplayName }}
          </span>

          <span
            :class="[
              'text-[#3B1420] leading-none shrink-0 self-center',
              isArabicNames
                ? 'font-aref font-bold text-[clamp(15px,4.4cqi,20px)]'
                : 'font-marcellus text-[clamp(13px,3.8cqi,18px)]'
            ]"
          >
            &amp;
          </span>

          <span
            :class="[
              'text-[#3B1420] leading-none whitespace-nowrap',
              isArabicNames
                ? 'font-aref font-bold text-[clamp(13px,3.8cqi,17px)] tracking-normal'
                : 'font-marcellus uppercase tracking-[0.08em] text-[clamp(9.5px,3cqi,13px)]'
            ]"
          >
            {{ brideDisplayName }}
          </span>
        </div>

        <!-- 4. "INVITE YOU TO JOIN THEIR FOREVER" -->
        <div
          dir="ltr"
          class="absolute inset-x-0 z-10 text-center"
          style="top: 41.8%;"
        >
          <p class="font-marcellus text-[clamp(6.5px,1.9cqi,8px)] tracking-[0.12em] uppercase text-[#3B1420]">
            {{ $t('templates.ummKulthum.inviteYou') }}
          </p>
        </div>

        <!-- 5. Live Countdown Timer -->
        <div
          dir="ltr"
          class="absolute inset-x-0 z-10 flex flex-col items-center"
          style="top: 45%;"
        >
          <div class="flex items-center justify-center gap-1.5 font-marcellus text-[clamp(15px,4.5cqi,20px)] tracking-[0.06em] text-[#3B1420] tabular-nums font-semibold">
            <span>{{ countdown.days }}</span>
            <span>:</span>
            <span>{{ countdown.hours }}</span>
            <span>:</span>
            <span>{{ countdown.minutes }}</span>
            <span>:</span>
            <span>{{ countdown.seconds }}</span>
          </div>
          <div class="grid grid-cols-4 gap-3 font-marcellus text-[clamp(5px,1.4cqi,6.5px)] tracking-[0.16em] text-[#6B2435] uppercase mt-0.5 text-center">
            <span>DAYS</span>
            <span>HOURS</span>
            <span>MINUTES</span>
            <span>SECONDS</span>
          </div>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- SECTION 2: STARRY ARCH & POEM & MUSICIANS (temp_2.jpg)   -->
      <!-- ======================================================== -->
      <section class="relative w-full overflow-hidden" style="aspect-ratio: 572 / 1024;">
        <img
          src="/templates/umm-kulthum/temp_2.jpg"
          alt="Starry Arch, Romantic Poem & Musicians"
          class="w-full h-full object-cover select-none pointer-events-none"
        />

        <!-- Arabic Calligraphy Verse (two lines, right under the sun) -->
        <div class="absolute z-10 inset-x-0 text-center" style="top: 27.2%;">
          <p
            dir="rtl"
            class="font-aref text-[#E6C48F] leading-[1.75] drop-shadow-md text-[min(6.4vw,27px)]"
          >
            <span class="block">{{ arabicLines.first }}</span>
            <span class="block">{{ arabicLines.rest }}</span>
          </p>
        </div>

        <!-- Tagline / Secondary Verse (wide, generously sized, fills the arch gracefully) -->
        <div class="absolute z-10 text-center" style="top: 41.5%; left: 7%; right: 7%;">
          <p
            :dir="isArabic(englishPoemLine) ? 'rtl' : 'ltr'"
            :class="[
              'text-[#E8C9AE]',
              isArabic(englishPoemLine)
                ? 'font-aref text-[clamp(16px,5.2cqi,22px)] font-bold leading-[2.5] tracking-normal'
                : 'font-marcellus uppercase tracking-[0.08em] text-[clamp(13px,4.2cqi,18.5px)] leading-[2.3]'
            ]"
          >
            {{ englishPoemLine }}
          </p>
        </div>

        <!-- Button: "KINDLY RSVP HERE" (lower part of the arch) -->
        <div class="absolute z-10 inset-x-0 flex justify-center" style="top: 73%;">
          <button
            type="button"
            class="px-6 py-2 rounded-full bg-[#D9BC95] hover:bg-[#E5C378] text-[#430E1B] font-marcellus uppercase tracking-[0.1em] shadow-lg hover:scale-105 active:scale-95 transition text-[min(2.8vw,11.5px)]"
          >
            {{ $t('templates.ummKulthum.kindlyRsvp') }}
          </button>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- SECTION: OUR LOVE STORY TIMELINE (كارت قصة حبنا)         -->
      <!-- ======================================================== -->
      <section
        v-if="showLoveStory"
        class="relative w-full overflow-hidden select-none"
        style="aspect-ratio: 572 / 1024;"
      >
        <!-- Background: Authentic Parchment with Columns & Corner Lilies from temp_3.jpg -->
        <img
          src="/templates/umm-kulthum/card-story-bg.jpg"
          alt="Our Love Story Background"
          class="w-full h-full object-cover select-none pointer-events-none"
        />

        <!-- Section Content Overlay (Between the Left and Right Columns) -->
        <div class="absolute inset-y-0 inset-x-12 sm:inset-x-14 z-10 flex flex-col justify-between py-8 sm:py-10">
          <!-- 1. Header: "Our Love Story" in Royal Burgundy & Gold -->
          <div class="text-center pt-1">
            <div class="flex items-center justify-center gap-3 mb-1.5">
              <span class="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-[#8E6E37]"></span>
              <span class="text-[#8E6E37] text-xs">✦</span>
              <span class="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent via-[#C5A059] to-[#8E6E37]"></span>
            </div>

            <h3
              :class="[
                'font-extrabold text-[#531524] tracking-[0.18em] uppercase drop-shadow-sm',
                isArabicLoveStory
                  ? 'font-aref text-[clamp(20px,5.5cqi,26px)]'
                  : 'font-cinzel text-[clamp(16px,4.8cqi,22px)]'
              ]"
            >
              {{ loveStoryTitle }}
            </h3>

            <div class="flex items-center justify-center gap-2 mt-1.5">
              <span class="w-8 sm:w-12 h-[1px] bg-[#C5A059]/60"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-[#531524]"></span>
              <span class="w-8 sm:w-12 h-[1px] bg-[#C5A059]/60"></span>
            </div>
          </div>

          <!-- 2. Vertical Timeline (Strict Direction Awareness for RTL/LTR) -->
          <div
            :dir="isArabicLoveStory ? 'rtl' : 'ltr'"
            class="relative my-auto py-2"
          >
            <!-- Golden Connecting Line -->
            <div
              class="absolute top-3 bottom-5 start-3.5 sm:start-4 w-[2px] bg-gradient-to-b from-[#C5A059]/40 via-[#C5A059] to-[#C5A059]/40 pointer-events-none"
            ></div>

            <div class="space-y-4 sm:space-y-5 relative">
              <div
                v-for="item in loveStoryMilestones"
                :key="item.id"
                class="flex items-start gap-3 sm:gap-4 group"
              >
                <!-- Circular Milestone Badge (Royal Burgundy + Gold Border) -->
                <div
                  class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#531524] border-2 border-[#C5A059] shadow-[0_2px_8px_rgba(83,21,36,0.35)] flex items-center justify-center shrink-0 z-10 text-[11px] sm:text-xs text-[#F5EFE6] select-none"
                >
                  <span v-if="item.icon === 'meeting'">💫</span>
                  <span v-else-if="item.icon === 'fatiha'">🤲</span>
                  <span v-else-if="item.icon === 'engagement'">💍</span>
                  <span v-else-if="item.icon === 'katbKetab'">📜</span>
                  <span v-else-if="item.icon === 'wedding'">👑</span>
                  <span v-else class="text-[#C5A059] font-bold text-[10px]">✦</span>
                </div>

                <!-- Milestone Details in Rich Burgundy / Mahogany -->
                <div
                  class="flex-1 pt-0.5"
                  :class="isArabicLoveStory ? 'text-right' : 'text-left'"
                >
                  <p
                    :class="[
                      'font-bold text-[#8A3347] uppercase tracking-[0.14em]',
                      isArabic(item.date)
                        ? 'font-aref text-[clamp(10px,2.5cqi,12px)]'
                        : 'font-cinzel text-[clamp(8.5px,2.2cqi,10.5px)]'
                    ]"
                  >
                    {{ item.date }}
                  </p>
                  <h4
                    :class="[
                      'font-extrabold text-[#531524] tracking-wide mt-0.5 leading-snug',
                      isArabic(item.title)
                        ? 'font-aref text-[clamp(13px,3.5cqi,16px)]'
                        : 'font-cinzel text-[clamp(11.5px,3cqi,14.5px)]'
                    ]"
                  >
                    {{ item.title }}
                  </h4>
                  <p
                    v-if="item.description"
                    :class="[
                      'text-[#5C2534] mt-0.5 leading-relaxed font-normal',
                      isArabic(item.description)
                        ? 'font-amiri text-[clamp(10.5px,2.6cqi,12.5px)]'
                        : 'font-marcellus text-[clamp(8.5px,2.1cqi,10.5px)] tracking-normal'
                    ]"
                  >
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom subtle spacing to balance layout with corner flowers -->
          <div class="h-2 sm:h-3"></div>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- SECTION 3: VENUE, DATE & PALACE (temp_3.jpg)             -->
      <!-- ======================================================== -->
      <section class="relative w-full overflow-hidden" style="aspect-ratio: 572 / 1024;">
        <img
          src="/templates/umm-kulthum/temp_3.jpg"
          alt="Muhammad Ali Shubra Palace Details"
          class="w-full h-full object-cover select-none pointer-events-none"
        />

        <!-- 1. Venue Title (PERLA HALL / قاعة بيرلا) -->
        <div
          class="absolute inset-x-8 z-10 text-center flex flex-col items-center"
          style="top: 25.8%;"
        >
          <h3
            :class="[
              'text-[#531524] leading-tight font-bold',
              isArabicVenue
                ? 'font-aref text-[clamp(14px,4.3cqi,18px)] tracking-normal'
                : 'font-cinzel text-[clamp(10px,3.2cqi,13.5px)] tracking-[0.16em] uppercase'
            ]"
          >
            {{ venueTitle }}
          </h3>
          <div
            v-if="venueSubtitle"
            :class="[
              'text-[#6B2435] mt-1 font-semibold leading-tight max-w-[76%] mx-auto',
              isArabic(venueSubtitle)
                ? 'font-aref text-[clamp(10px,2.8cqi,12.5px)] tracking-normal'
                : 'font-cinzel text-[clamp(6.8px,1.9cqi,8.5px)] tracking-[0.12em] uppercase'
            ]"
          >
            <span class="block">{{ venueSubtitleParts.line1 }}</span>
            <span v-if="venueSubtitleParts.line2" class="block mt-0.5">{{ venueSubtitleParts.line2 }}</span>
          </div>
        </div>

        <!-- 2. Location Button ("LOCATION") exactly inside the Red Pill, No Hover Effect -->
        <div
          class="absolute inset-x-0 z-20 flex justify-center"
          style="top: 34.5%; height: 2.8%;"
        >
          <a
            :href="mapUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-[46%] h-full flex items-center justify-center font-cinzel font-bold text-[min(2.5vw,10.5px)] tracking-[0.22em] uppercase text-[#F9F6F0] rounded-full cursor-pointer px-2"
          >
            <span class="inline-flex items-center justify-center leading-none">{{ $t('templates.ummKulthum.clickForLocation') }}</span>
          </a>
        </div>

        <!-- 3. Wedding Date ("16TH SEPTEMBER 2026 / WEDNESDAY") below Calendar Icon -->
        <div
          class="absolute inset-x-12 z-10 text-center"
          style="top: 47%;"
        >
          <p class="font-cinzel font-bold text-[clamp(8.5px,2.5cqi,11px)] tracking-[0.08em] uppercase text-[#531524]">
            {{ weddingDateFormatted }}
          </p>
          <p class="font-cinzel text-[clamp(7px,2cqi,9px)] font-semibold tracking-[0.12em] uppercase text-[#6B2435] mt-0.5">
            {{ weddingDayName }}
          </p>
        </div>

        <!-- 4. Wedding Time ("STARTS AT" / Dynamic Time) below Pocket Watch Icon -->
        <div
          class="absolute inset-x-8 z-10 text-center"
          style="top: 65.5%;"
        >
          <p class="font-cinzel font-semibold text-[min(2.9vw,11.5px)] tracking-[0.14em] uppercase text-[#531524] leading-snug">
            <span class="block">STARTS AT</span>
            <span class="block">{{ weddingStartTime }}</span>
          </p>
        </div>
      </section>

      <!-- Floating Audio Toggle Button (like in the reference screenshot) -->
      <button
        type="button"
        @click="toggleAudio"
        aria-label="Toggle Wedding Music"
        class="fixed bottom-5 end-5 z-40 w-11 h-11 rounded-full bg-[#3D0C1A]/90 hover:bg-[#521323] backdrop-blur-md border border-[#D4B475]/60 text-[#F4E3C7] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition cursor-pointer"
      >
        <svg v-if="isPlaying" class="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
        <svg v-else class="w-4 h-4 fill-current ms-0.5" viewBox="0 0 24 24">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { InvitationItem, CreateRsvpPayload, LoveStoryMilestone } from '~/features/invitation/types/invitation.types'
import type { TemplateCatalogItem } from '~/features/home/composables/useTemplatesCatalog'

interface Props {
  invitation: InvitationItem
  template?: TemplateCatalogItem
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'submit-rsvp', payload: CreateRsvpPayload): void
}>()

const { t } = useI18n()

// Audio Player State
const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const audioSource = computed(() => {
  return '/templates/umm-kulthum/audio/song.mp3'
})

const toggleAudio = async () => {
  if (!audioRef.value) return
  try {
    if (isPlaying.value) {
      audioRef.value.pause()
      isPlaying.value = false
    } else {
      await audioRef.value.play()
      isPlaying.value = true
    }
  } catch (err) {
    console.warn('Audio playback error (ensure song.mp3 exists in /public/templates/umm-kulthum/audio/):', err)
  }
}

// Language and Script helpers
const isArabic = (str: string) => /[\u0600-\u06FF]/.test(str)

const isArabicNames = computed(() => {
  return isArabic(props.invitation.groomName || '') || isArabic(props.invitation.brideName || '')
})

// Monogram Initials (bride + groom, interlocked - supports Arabic and Latin)
const ARABIC_INITIALS_MAP: Record<string, string> = {
  'د': 'D', 'م': 'M', 'أ': 'A', 'ا': 'A', 'إ': 'E', 'ب': 'B', 'ت': 'T', 'ث': 'T',
  'ج': 'G', 'ح': 'H', 'خ': 'K', 'ذ': 'Z', 'ر': 'R', 'ز': 'Z', 'س': 'S', 'ش': 'S',
  'ص': 'S', 'ض': 'D', 'ط': 'T', 'ظ': 'Z', 'ع': 'A', 'غ': 'G', 'ف': 'F', 'ق': 'K',
  'ك': 'K', 'ل': 'L', 'ن': 'N', 'ه': 'H', 'و': 'W', 'ي': 'Y', 'ى': 'Y',
}

const getInitial = (name: string, fallback: string) => {
  const clean = name.trim()
  if (!clean) return fallback
  const char = clean[0]
  if (ARABIC_INITIALS_MAP[char]) {
    return ARABIC_INITIALS_MAP[char]
  }
  return char.toUpperCase()
}

const monogramFirst = computed(() => {
  return getInitial(props.invitation.brideName || 'دنيا', 'D')
})

const monogramSecond = computed(() => {
  return getInitial(props.invitation.groomName || 'مصطفى', 'M')
})

// Split name into first name / rest
const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/)
  return {
    first: parts[0] || '',
    rest: parts.slice(1).join(' '),
  }
}

const groomNameParts = computed(() => splitName(props.invitation.groomName || 'مصطفى ابوليله'))
const brideNameParts = computed(() => splitName(props.invitation.brideName || 'دنيا محرم'))

// Groom & Bride Names
const groomDisplayName = computed(() => {
  return props.invitation.groomName || 'مصطفى ابوليله'
})

const brideDisplayName = computed(() => {
  return props.invitation.brideName || 'دنيا محرم'
})

// Poetic Lines
const arabicPoemLine = computed(() => {
  return props.invitation.customQuote || 'يا رب تفضل حلاوة سلام أول لقا بإيدينا'
})

// Split the Arabic verse into two lines (first 3 words / the rest)
const arabicLines = computed(() => {
  const words = arabicPoemLine.value.trim().split(/\s+/)
  return {
    first: words.slice(0, 3).join(' '),
    rest: words.slice(3).join(' '),
  }
})

const englishPoemLine = computed(() => {
  return props.invitation.tagline || 'AS MUSIC FILLS THE AIR AND OUR HEARTS BECOME ONE, WE INVITE YOU TO CELEBRATE THE BEGINNING OF OUR GREATEST ADVENTURE'
})

// Venue & Location
const venueTitle = computed(() => {
  return props.invitation.venue || 'قاعة بيرلا'
})

const venueSubtitle = computed(() => {
  return props.invitation.venueAddress || "Tanta - El Mahalla Road, Grand Babilon's First Gate"
})

const venueSubtitleParts = computed(() => {
  const raw = (venueSubtitle.value || '').trim()
  if (!raw) return { line1: '', line2: '' }

  // 1. Explicit line break
  if (raw.includes('\n')) {
    const [l1, ...rest] = raw.split('\n')
    return { line1: l1.trim(), line2: rest.join(' ').trim() }
  }
  // 2. Comma or Arabic comma
  if (raw.includes(',') || raw.includes('،')) {
    const sep = raw.includes(',') ? ',' : '،'
    const [l1, ...rest] = raw.split(sep)
    return { line1: l1.trim(), line2: rest.join(sep).trim() }
  }
  // 3. Em-dash or En-dash
  if (raw.includes('—') || raw.includes('–')) {
    const sep = raw.includes('—') ? '—' : '–'
    const [l1, ...rest] = raw.split(sep)
    return { line1: l1.trim(), line2: rest.join(' ').trim() }
  }
  // 4. Hyphen surrounded by spaces: " - "
  if (/\s+-\s+/.test(raw)) {
    const parts = raw.split(/\s+-\s+/)
    return { line1: parts[0].trim(), line2: parts.slice(1).join(' - ').trim() }
  }
  // 5. Automatic balancing into two equal lines if longer than 26 chars
  if (raw.length > 26 && raw.includes(' ')) {
    const words = raw.split(/\s+/)
    const mid = Math.ceil(words.length / 2)
    return {
      line1: words.slice(0, mid).join(' '),
      line2: words.slice(mid).join(' '),
    }
  }

  return { line1: raw, line2: '' }
})

const isArabicVenue = computed(() => isArabic(venueTitle.value))

const mapUrl = computed(() => {
  return props.invitation.mapUrl || 'https://www.google.com/maps/search/?api=1&query=Perla+-%D8%A8%D9%8A%D8%B1%D9%84%D8%A7,+W479%2BWJ9,+Saft+Torab,+El+Mahalla+El+Kubra'
})

// Date & Time formatting
const targetDate = computed(() => {
  return props.invitation.weddingDate ? new Date(props.invitation.weddingDate) : new Date('2027-01-12T19:00:00')
})

const weddingDateFormatted = computed(() => {
  const d = targetDate.value
  const day = d.getDate()
  const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
  const month = monthNames[d.getMonth()]
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
})

const weddingDayName = computed(() => {
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  return days[targetDate.value.getDay()]
})

const weddingStartTime = computed(() => {
  const d = targetDate.value
  let hours = d.getHours()
  const minutes = d.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : String(minutes)
  return `${hours}:${formattedMinutes}${ampm}`
})

// Our Love Story Timeline
const showLoveStory = computed(() => {
  return props.invitation.enableLoveStory !== false
})

const loveStoryTitle = computed(() => {
  return props.invitation.loveStoryTitle || 'Our Love Story'
})

const isArabicLoveStory = computed(() => {
  return isArabic(loveStoryTitle.value)
})

const loveStoryMilestones = computed<LoveStoryMilestone[]>(() => {
  if (props.invitation.loveStory && props.invitation.loveStory.length > 0) {
    return props.invitation.loveStory
  }
  if (isArabic(loveStoryTitle.value)) {
    return [
      {
        id: 'ls-1',
        date: '2022',
        title: 'أول لقاء',
        description: 'التقت القلوب بنظرة واحدة غيرت مجرى كل شيء إلى الأبد.',
        icon: 'meeting',
      },
      {
        id: 'ls-2',
        date: '3 أبريل 2025',
        title: 'قراءة الفاتحة',
        description: 'اجتمعت عائلاتنا على الخير وباركت بداية عهدنا وخطواتنا الأولى.',
        icon: 'fatiha',
      },
      {
        id: 'ls-3',
        date: '10 مايو 2025',
        title: 'الخطوبة المباركة',
        description: 'وسط فرحة الأهل والأحباب، لبسنا دبل الخطوبة وتلاقت أمانينا.',
        icon: 'engagement',
      },
      {
        id: 'ls-4',
        date: '3 سبتمبر 2026',
        title: 'عقد القران',
        description: 'اليوم الذي جمعنا الله فيه على سنة رسوله وأصبحنا زوجين رسمياً.',
        icon: 'katbKetab',
      },
      {
        id: 'ls-5',
        date: weddingDateFormatted.value || '21 يناير 2027',
        title: 'ليلة العمر',
        description: 'والآن، ندعوكم لتشاركونا الاحتفال بأجمل وأبهى فصول حكايتنا.',
        icon: 'wedding',
      },
    ]
  }

  return [
    {
      id: 'ls-1',
      date: '2022',
      title: 'First Meeting',
      description: 'Two souls found each other — a glance that changed everything forever.',
      icon: 'meeting',
    },
    {
      id: 'ls-2',
      date: 'April 3, 2025',
      title: 'Reading of the Fatiha',
      description: 'Our families came together and blessed the beginning of our journey.',
      icon: 'fatiha',
    },
    {
      id: 'ls-3',
      date: 'May 10, 2025',
      title: 'The Engagement',
      description: 'Surrounded by love and family, we celebrated our engagement.',
      icon: 'engagement',
    },
    {
      id: 'ls-4',
      date: 'September 3, 2026',
      title: 'Katb El Ketab',
      description: 'The day we officially became husband and wife.',
      icon: 'katbKetab',
    },
    {
      id: 'ls-5',
      date: weddingDateFormatted.value || 'November 21, 2026',
      title: 'The Wedding',
      description: 'And now, we invite you to witness the most beautiful chapter of our story.',
      icon: 'wedding',
    },
  ]
})

// Live Countdown Timer
const now = ref(Date.now())
let timerInterval: ReturnType<typeof setInterval> | null = null

const countdown = computed(() => {
  const diff = Math.max(0, targetDate.value.getTime() - now.value)
  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const m = Math.floor((diff / (1000 * 60)) % 60)
  const s = Math.floor((diff / 1000) % 60)
  return {
    days: String(d).padStart(2, '0'),
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  }
})

onMounted(() => {
  timerInterval = setInterval(() => {
    now.value = Date.now()
  }, 1000)

  // Auto-play wedding audio upon opening the invitation
  if (audioRef.value) {
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      isPlaying.value = false
    })
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>
