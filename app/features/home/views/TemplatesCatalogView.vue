<template>
  <div
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    :class="{ dark: isDark }"
  >
    <div class="min-h-screen bg-[#F9F6F0] dark:bg-[#140A0E] text-[#2D2D2D] dark:text-[#F9F6F0] transition-colors duration-300">
      <Navbar />

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <!-- Header & Back Link -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] text-xs font-semibold mb-2">
              <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
              <span>{{ $t('home.templatesSection.badge') }} ({{ templates.length }})</span>
            </span>
            <h1 class="text-2xl sm:text-4xl font-bold text-[#4A1525] dark:text-[#F9F6F0]">
              {{ $t('home.templatesSection.allTemplatesPageTitle') }}
            </h1>
            <p class="text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-1.5">
              {{ $t('home.templatesSection.allTemplatesPageSubtitle') }}
            </p>
          </div>

          <NuxtLink
            to="/"
            class="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/30 text-xs font-bold text-[#4A1525] dark:text-[#C5A059] hover:border-[#C5A059] transition shrink-0"
          >
            <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span>{{ $t('home.templatesSection.backToHomeBtn') }}</span>
          </NuxtLink>
        </div>

        <!-- Filter & Search Bar -->
        <div class="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <!-- Category Pills -->
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              v-for="cat in categories"
              :key="cat.id"
              @click="selectedCategory = cat.id"
              :class="[
                'px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all',
                selectedCategory === cat.id
                  ? 'bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E] shadow'
                  : 'bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/20 text-[#2D2D2D] dark:text-[#D5C7B8]'
              ]"
            >
              {{ cat.label }}
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative w-full lg:w-80">
            <svg class="w-4 h-4 text-[#C5A059] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('home.templatesSection.searchPlaceholder')"
              class="w-full ps-10 pe-4 py-2.5 rounded-full bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-xs focus:outline-none focus:border-[#C5A059]"
            />
          </div>
        </div>

        <!-- All 15 Templates Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <div
            v-for="item in filteredCatalog"
            :key="item.id"
            class="group rounded-3xl overflow-hidden bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <!-- Template Visual Preview Header -->
            <div
              @click="selectedTemplateModal = item"
              :class="['h-64 p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer bg-gradient-to-br', item.gradient]"
            >
              <!-- Decorative Arch Overlay -->
              <div class="absolute inset-4 rounded-t-full border border-[#C5A059]/30 pointer-events-none"></div>

              <span class="self-end relative z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium">
                <svg class="w-3 h-3 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>{{ item.badge }}</span>
              </span>

              <div class="text-center my-auto text-white relative z-10">
                <p class="text-xs opacity-80 mb-1">{{ $t('home.templatesSection.cardType') }}</p>
                <p class="text-2xl font-bold">{{ item.name }}</p>
              </div>

              <div class="w-12 h-1 bg-[#C5A059]/60 mx-auto rounded-full relative z-10"></div>
            </div>

            <!-- Card Body -->
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-xl text-[#2D2D2D] dark:text-[#F9F6F0]">{{ item.name }}</h3>
                <p class="text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-2 leading-relaxed">{{ item.desc }}</p>

                <!-- Hashtag Pills -->
                <div class="flex flex-wrap gap-2 mt-4">
                  <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="px-3 py-1 rounded-lg bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-[#8E6E37] dark:text-[#C5A059] text-xs font-medium"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div>
                <div class="border-t border-[#C5A059]/15 my-4"></div>

                <!-- Action Row -->
                <div class="flex items-center gap-2.5">
                  <button
                    type="button"
                    @click="selectedTemplateModal = item"
                    class="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#C5A059] to-[#B38E46] hover:opacity-95 text-[#140A0E] text-xs sm:text-sm font-bold transition-all inline-flex items-center justify-center gap-2 shadow-sm"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <span>{{ $t('home.templatesSection.livePreviewBtn') }}</span>
                  </button>

                  <NuxtLink
                    :to="`/create?template=${encodeURIComponent(item.id)}`"
                    class="w-10 h-10 rounded-full border border-[#C5A059]/35 bg-[#F9F6F0]/60 dark:bg-[#140A0E] text-[#8E6E37] dark:text-[#C5A059] hover:bg-[#4A1525] hover:text-white dark:hover:bg-[#C5A059] dark:hover:text-[#140A0E] transition-all flex items-center justify-center shrink-0"
                  >
                    <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Template Details Modal -->
        <div
          v-if="selectedTemplateModal"
          @click.self="selectedTemplateModal = null"
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div class="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#F9F6F0] dark:bg-[#1B0E13] border border-[#C5A059]/30 p-5 sm:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto">
            <button
              type="button"
              @click="selectedTemplateModal = null"
              class="absolute top-3.5 end-3.5 z-20 w-9 h-9 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/30 flex items-center justify-center text-[#4A1525] dark:text-[#C5A059] hover:scale-105 transition"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            <div class="lg:col-span-5">
              <div :class="['rounded-3xl h-72 sm:h-80 lg:h-96 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden shadow-xl bg-gradient-to-br', selectedTemplateModal.gradient]">
                <span class="self-end inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                  <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  </svg>
                  <span>{{ selectedTemplateModal.badge }}</span>
                </span>

                <div class="my-auto text-center text-white space-y-2">
                  <p class="text-xs text-[#C5A059] tracking-widest">{{ $t('home.mockup.bismillah') }}</p>
                  <p class="text-xs opacity-80">{{ $t('home.mockup.intro') }}</p>
                  <div class="py-4 px-3 rounded-2xl bg-black/25 border border-white/15 my-2">
                    <h4 class="text-2xl font-bold">{{ $t('home.mockup.couple') }}</h4>
                    <span class="text-[11px] text-[#C5A059]">{{ selectedTemplateModal.name }}</span>
                  </div>
                  <p class="text-xs font-bold">{{ $t('home.mockup.date') }}</p>
                </div>

                <div class="w-full py-2 rounded-full bg-[#C5A059] text-[#140A0E] text-center text-xs font-bold">
                  {{ $t('home.mockup.rsvpBtn') }}
                </div>
              </div>
            </div>

            <div class="lg:col-span-7 space-y-5">
              <div>
                <span class="inline-block px-3.5 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#8E6E37] dark:text-[#C5A059] text-xs font-semibold mb-3">
                  {{ $t('home.templatesSection.packageBadge') }}
                </span>
                <h3 class="text-2xl sm:text-3xl font-bold text-[#2D2D2D] dark:text-[#F9F6F0]">{{ selectedTemplateModal.name }}</h3>
                <p class="text-xs sm:text-sm text-[#2D2D2D]/75 dark:text-[#D5C7B8] mt-2 leading-relaxed">
                  {{ selectedTemplateModal.desc }}
                </p>

                <div class="flex flex-wrap gap-2 mt-4">
                  <span
                    v-for="tag in selectedTemplateModal.tags"
                    :key="tag"
                    class="px-3 py-1 rounded-lg bg-white dark:bg-[#221117] border border-[#C5A059]/25 text-[#8E6E37] dark:text-[#C5A059] text-xs font-medium"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
                <NuxtLink
                  :to="`/create?template=${encodeURIComponent(selectedTemplateModal.id)}`"
                  class="px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A059] to-[#A8843E] text-[#140A0E] text-xs sm:text-sm font-bold shadow inline-flex items-center justify-center gap-2 hover:opacity-95 transition"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>{{ $t('home.templatesSection.tryModalBtn') }}</span>
                </NuxtLink>

                <NuxtLink
                  :to="`/create?template=${encodeURIComponent(selectedTemplateModal.id)}`"
                  class="px-6 py-3 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/40 text-[#4A1525] dark:text-[#F9F6F0] text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 hover:border-[#C5A059] transition"
                >
                  <svg class="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  </svg>
                  <span>{{ $t('home.templatesSection.useTemplateBtn') }}</span>
                </NuxtLink>
              </div>

              <div class="border-t border-[#C5A059]/20 pt-4">
                <h4 class="font-bold text-sm text-[#4A1525] dark:text-[#C5A059] mb-3">
                  {{ $t('home.templatesSection.includedFeaturesTitle') }}
                </h4>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#2D2D2D]/80 dark:text-[#D5C7B8]">
                  <li v-for="inc in includedTemplateFeatures" :key="inc" class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{{ inc }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import FooterSection from '../components/FooterSection.vue'
import { useTemplatesCatalog, type TemplateCatalogItem } from '../composables/useTemplatesCatalog'

const isDark = useState<boolean>('daawa-dark-mode', () => false)
const { categories, templates, includedTemplateFeatures } = useTemplatesCatalog()

const selectedCategory = ref('all')
const searchQuery = ref('')
const selectedTemplateModal = ref<TemplateCatalogItem | null>(null)

const filteredCatalog = computed(() => {
  return templates.value.filter((item) => {
    const matchesCategory = selectedCategory.value === 'all' || item.category === selectedCategory.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchesCategory
    const matchesText =
      item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
    return matchesCategory && matchesText
  })
})
</script>

