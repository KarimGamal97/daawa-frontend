<template>
  <div
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    :class="{ dark: isDark }"
  >
    <div class="min-h-screen bg-[#F9F6F0] dark:bg-[#140A0E] text-[#2D2D2D] dark:text-[#F9F6F0] transition-colors duration-300 flex flex-col">
      <Navbar />

      <main class="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <!-- Top Header & Back Button -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] text-xs font-semibold mb-2">
              <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>{{ $t('legal.badge') }}</span>
            </span>
            <h1 class="text-2xl sm:text-4xl font-bold text-[#4A1525] dark:text-[#F9F6F0]">
              {{ pageTitle }}
            </h1>
            <p class="text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-1.5 leading-relaxed">
              {{ pageSubtitle }}
            </p>
          </div>

          <NuxtLink
            to="/"
            class="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/30 text-xs font-bold text-[#4A1525] dark:text-[#C5A059] hover:border-[#C5A059] transition shrink-0"
          >
            <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span>{{ $t('legal.backHome') }}</span>
          </NuxtLink>
        </div>

        <!-- Quick Legal Navigation Pills -->
        <div class="flex flex-wrap items-center gap-2 mb-8">
          <NuxtLink
            to="/terms"
            :class="[
              'px-5 py-2 rounded-full text-xs font-bold transition-all',
              props.docType === 'terms'
                ? 'bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E] shadow'
                : 'bg-white dark:bg-[#221117] border border-[#C5A059]/25 text-[#2D2D2D]/80 dark:text-[#D5C7B8]'
            ]"
          >
            {{ $t('home.footer.terms') }}
          </NuxtLink>

          <NuxtLink
            to="/privacy-policy"
            :class="[
              'px-5 py-2 rounded-full text-xs font-bold transition-all',
              props.docType === 'privacy'
                ? 'bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E] shadow'
                : 'bg-white dark:bg-[#221117] border border-[#C5A059]/25 text-[#2D2D2D]/80 dark:text-[#D5C7B8]'
            ]"
          >
            {{ $t('home.footer.privacy') }}
          </NuxtLink>

          <NuxtLink
            to="/refund-policy"
            :class="[
              'px-5 py-2 rounded-full text-xs font-bold transition-all',
              props.docType === 'refund'
                ? 'bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E] shadow'
                : 'bg-white dark:bg-[#221117] border border-[#C5A059]/25 text-[#2D2D2D]/80 dark:text-[#D5C7B8]'
            ]"
          >
            {{ $t('home.footer.refund') }}
          </NuxtLink>
        </div>

        <!-- Document Sections Card -->
        <div class="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/25 shadow-sm divide-y divide-[#C5A059]/15">
          <div
            v-for="sec in sections"
            :key="sec.heading"
            class="py-6 first:pt-0 last:pb-0 space-y-2.5"
          >
            <h2 class="text-base sm:text-lg font-bold text-[#4A1525] dark:text-[#C5A059]">
              {{ sec.heading }}
            </h2>
            <p class="text-xs sm:text-sm text-[#2D2D2D]/80 dark:text-[#D5C7B8] leading-relaxed">
              {{ sec.body }}
            </p>
          </div>
        </div>

        <!-- Direct Support CTA -->
        <div class="mt-8 text-center">
          <a
            href="https://wa.me/201094123678"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow transition"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span>{{ $t('legal.contactWhatsappBtn') }}</span>
          </a>
        </div>
      </main>

      <FooterSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import FooterSection from '../components/FooterSection.vue'

interface Props {
  docType: 'terms' | 'privacy' | 'refund'
}

interface LegalSectionItem {
  heading: string
  body: string
}

const props = defineProps<Props>()
const { t, tm, rt } = useI18n()
const isDark = useState<boolean>('daawa-dark-mode', () => false)

const pageTitle = computed(() => t(`legal.${props.docType}.title`))
const pageSubtitle = computed(() => t(`legal.${props.docType}.subtitle`))

const sections = computed<LegalSectionItem[]>(() => {
  const raw = tm(`legal.${props.docType}.sections`) as Array<{ heading: unknown; body: unknown }>
  if (!Array.isArray(raw)) return []
  return raw.map((item) => ({
    heading: typeof item.heading === 'string' ? item.heading : rt(item.heading as Parameters<typeof rt>[0]),
    body: typeof item.body === 'string' ? item.body : rt(item.body as Parameters<typeof rt>[0]),
  }))
})
</script>

