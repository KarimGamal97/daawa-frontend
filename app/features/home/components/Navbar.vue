<template>
  <header
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    class="sticky top-0 z-50 bg-[#F9F6F0]/90 dark:bg-[#140A0E]/90 backdrop-blur-md border-b border-[#C5A059]/15 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      <!-- Logo (Image Only) -->
      <NuxtLink
        to="/"
        @click="handleLogoClick"
        class="flex items-center shrink-0 group"
      >
        <img
          src="/images/main-logo.jpg"
          alt="DAAWA | دعوة"
          class="h-10 sm:h-12 w-auto rounded-xl object-contain hover:scale-[1.02] transition-transform"
        />
      </NuxtLink>

      <!-- Desktop Navigation (lg and up so it never crowds) -->
      <nav class="hidden lg:flex items-center gap-6 xl:gap-9 text-sm font-medium shrink-0">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`/#${item.id}`"
          @click="setActive(item.id)"
          :class="[
            'relative py-2 whitespace-nowrap transition-colors duration-200',
            activeSection === item.id
              ? 'text-[#4A1525] dark:text-[#C5A059] font-bold'
              : 'text-[#2D2D2D]/70 dark:text-[#E5DEC9]/70 hover:text-[#4A1525] dark:hover:text-[#F9F6F0]'
          ]"
        >
          {{ $t(item.label) }}
          <span
            :class="[
              'absolute bottom-0 inset-x-0 mx-auto h-0.5 rounded-full bg-[#4A1525] dark:bg-[#C5A059] transition-all duration-300',
              activeSection === item.id ? 'w-full opacity-100' : 'w-0 opacity-0'
            ]"
          ></span>
        </a>
      </nav>

      <!-- Actions: Dark/Light + Language + Desktop CTA + Mobile Hamburger -->
      <div class="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <!-- Dark / Light Mode Toggle -->
        <button
          type="button"
          @click="toggleTheme"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-[#221117] border border-[#C5A059]/20 text-[#4A1525] dark:text-[#C5A059] hover:scale-105 transition-all shrink-0"
          :title="$t('nav.toggleTheme')"
        >
          <svg
            v-if="isDark"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41-1.41" />
          </svg>
          <svg
            v-else
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>

        <!-- Language Switcher -->
        <button
          type="button"
          @click="toggleLanguage"
          class="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-full bg-white/80 dark:bg-[#221117] border border-[#C5A059]/20 text-[#4A1525] dark:text-[#F9F6F0] hover:opacity-80 transition-all shrink-0"
        >
          <svg
            class="w-3.5 h-3.5 text-[#C5A059]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
          </svg>
          <span>{{ $t('nav.switchLang') }}</span>
        </button>

        <!-- Desktop CTA Button -->
        <NuxtLink
          to="/create"
          class="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4A1525] to-[#6B1F36] dark:from-[#C5A059] dark:to-[#A8843E] text-[#F9F6F0] dark:text-[#140A0E] text-xs xl:text-sm font-semibold whitespace-nowrap shadow-md hover:opacity-95 transition-all"
        >
          {{ $t('home.createButton') }}
        </NuxtLink>

        <!-- Mobile / Tablet Menu Button (< lg) -->
        <button
          type="button"
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-[#221117] border border-[#C5A059]/25 text-[#4A1525] dark:text-[#C5A059] transition-all shrink-0"
          aria-label="Toggle Menu"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <svg
            v-else
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile & Tablet Dropdown Navigation (< lg) -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden border-t border-[#C5A059]/15 bg-[#F9F6F0]/95 dark:bg-[#140A0E]/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 shadow-xl"
    >
      <nav class="flex flex-col space-y-1">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`/#${item.id}`"
          @click="setActive(item.id)"
          :class="[
            'px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between',
            activeSection === item.id
              ? 'bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] font-bold'
              : 'text-[#2D2D2D]/80 dark:text-[#E5DEC9]/80 hover:bg-[#C5A059]/10'
          ]"
        >
          <span>{{ $t(item.label) }}</span>
          <span
            v-if="activeSection === item.id"
            class="w-2 h-2 rounded-full bg-[#4A1525] dark:bg-[#C5A059]"
          ></span>
        </a>
      </nav>

      <div class="pt-2">
        <NuxtLink
          to="/create"
          @click="mobileMenuOpen = false"
          class="w-full py-3 rounded-full bg-gradient-to-r from-[#4A1525] to-[#6B1F36] dark:from-[#C5A059] dark:to-[#A8843E] text-[#F9F6F0] dark:text-[#140A0E] text-sm font-bold shadow-md flex items-center justify-center gap-2"
        >
          <span>{{ $t('home.createButton') }}</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { locale, setLocale } = useI18n()
const isDark = useState<boolean>('daawa-dark-mode', () => false)
const activeSection = ref<string>('templates')
const mobileMenuOpen = ref<boolean>(false)

const navItems = [
  { id: 'templates', label: 'nav.templates' },
  { id: 'how-it-works', label: 'nav.howItWorks' },
  { id: 'pricing', label: 'nav.pricing' },
  { id: 'contact', label: 'nav.contact' },
]

const handleLogoClick = () => {
  activeSection.value = ''
  mobileMenuOpen.value = false
}

const setActive = (id: string) => {
  activeSection.value = id
  mobileMenuOpen.value = false
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  const saved = localStorage.getItem('daawa-theme')
  if (saved === 'dark') {
    isDark.value = true
  }
  document.documentElement.classList.toggle('dark', isDark.value)

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    {
      rootMargin: '-30% 0px -55% 0px',
      threshold: 0,
    }
  )

  navItems.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) observer?.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('daawa-theme', isDark.value ? 'dark' : 'light')
}

const toggleLanguage = () => {
  setLocale(locale.value === 'ar' ? 'en' : 'ar')
}
</script>
