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

        <!-- 4. Wedding Time ("STARTS AT" / "7:00PM") below Pocket Watch Icon -->
        <div
          class="absolute inset-x-8 z-10 text-center"
          style="top: 65.5%;"
        >
          <p class="font-cinzel font-semibold text-[min(2.9vw,11.5px)] tracking-[0.14em] uppercase text-[#531524] leading-snug">
            <span class="block">STARTS AT</span>
            <span class="block">7:00PM</span>
          </p>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { InvitationItem, CreateRsvpPayload } from '~/features/invitation/types/invitation.types'
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
  const suffix = day === 1 || day === 21 || day === 31 ? 'ST' : day === 2 || day === 22 ? 'ND' : day === 3 || day === 23 ? 'RD' : 'TH'
  const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
  const month = monthNames[d.getMonth()]
  const year = d.getFullYear()
  return `${day}${suffix} ${month} ${year}`
})

const weddingDayName = computed(() => {
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  return days[targetDate.value.getDay()]
})

const weddingStartTime = computed(() => {
  return 'STARTS AT 7:00PM'
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
