<template>
  <div 
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    :class="{ dark: isDark }"
  >
    <div class="min-h-screen bg-[#F9F6F0] dark:bg-[#140A0E] text-[#2D2D2D] dark:text-[#F9F6F0] transition-colors duration-300">
      <Navbar />

      <main>
        <!-- 1. Hero Section -->
        <HeroSection />

        <!-- 2. Templates Section -->
        <section id="templates" class="py-20 px-4 max-w-7xl mx-auto">
          <div class="text-center mb-10">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] text-xs font-semibold">
              <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
              <span>{{ $t('home.templatesSection.badge') }}</span>
            </span>
            <h2 class="text-3xl sm:text-4xl font-bold text-[#4A1525] dark:text-[#F9F6F0] mt-3">{{ $t('home.templatesSection.title') }}</h2>
            <p class="text-sm text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-2">{{ $t('home.templatesSection.subtitle') }}</p>

            <!-- Category Filter Pills -->
            <div class="flex flex-wrap justify-center gap-2 mt-6">
              <button
                type="button"
                v-for="cat in categories"
                :key="cat.id"
                @click="selectedCategory = cat.id"
                :class="[
                  'px-5 py-2 rounded-full text-xs font-semibold transition-all',
                  selectedCategory === cat.id
                    ? 'bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E] shadow'
                    : 'bg-white dark:bg-[#221117] border border-[#C5A059]/25 text-[#2D2D2D] dark:text-[#D5C7B8]'
                ]"
              >
                {{ cat.label }}
              </button>
            </div>
          </div>

          <!-- Templates Cards Grid (Matching Reference Card Layout) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <div
              v-for="item in displayedTemplates"
              :key="item.id"
              class="group rounded-3xl overflow-hidden bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <!-- Template Visual Preview Header -->
              <div
                @click="selectedTemplateModal = item"
                :class="['h-64 p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer bg-gradient-to-br', item.gradient]"
              >
                <span class="self-end inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium">
                  <svg class="w-3 h-3 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  </svg>
                  <span>{{ item.badge }}</span>
                </span>
                <div class="text-center my-auto text-white">
                  <p class="text-xs opacity-80 mb-1">{{ $t('home.templatesSection.cardType') }}</p>
                  <p class="text-2xl font-bold">{{ item.name }}</p>
                </div>
                <div class="w-12 h-1 bg-[#C5A059]/60 mx-auto rounded-full"></div>
              </div>

              <!-- Card Body: Title + Desc + Hashtags + Divider + Action Row -->
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="font-bold text-xl text-[#2D2D2D] dark:text-[#F9F6F0]">{{ item.name }}</h3>
                  <p class="text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-2 leading-relaxed">{{ item.desc }}</p>

                  <!-- Hashtag Pills Inside Card Body -->
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

                  <!-- Bottom Action Row: Live Preview Pill + Circular Arrow Link -->
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

          <!-- Navigate to Full Templates Catalog Page (/templates) -->
          <div class="mt-10 text-center">
            <NuxtLink
              to="/templates"
              class="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/40 text-[#4A1525] dark:text-[#C5A059] text-xs sm:text-sm font-bold shadow-sm hover:bg-[#4A1525] hover:text-white dark:hover:bg-[#C5A059] dark:hover:text-[#140A0E] transition-all"
            >
              <span>{{ `${$t('home.templatesSection.showMorePageBtn')} (+${Math.max(templates.length - 6, 3)})` }}</span>
              <svg
                class="w-4 h-4 rtl:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>
        </section>

        <!-- Template Details Modal (Matching Image 3) -->
        <div
          v-if="selectedTemplateModal"
          @click.self="selectedTemplateModal = null"
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div class="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-[#F9F6F0] dark:bg-[#1B0E13] border border-[#C5A059]/30 p-5 sm:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-auto">
            <!-- Close Button -->
            <button
              type="button"
              @click="selectedTemplateModal = null"
              class="absolute top-3.5 end-3.5 z-20 w-9 h-9 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/30 flex items-center justify-center text-[#4A1525] dark:text-[#C5A059] hover:scale-105 transition"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            <!-- Start Column: Visual Preview Card -->
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

            <!-- End Column: Template Info & Included Features -->
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

              <!-- Two Buttons -->
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

        <!-- 3. All-in-One Features Grid -->
        <section class="py-16 px-4 bg-[#F3EDE2]/70 dark:bg-[#1B0E13]">
          <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
              <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] text-xs font-semibold">
                <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>{{ $t('home.featuresSection.badge') }}</span>
              </span>
              <h2 class="text-3xl font-bold text-[#4A1525] dark:text-[#F9F6F0] mt-3">{{ $t('home.featuresSection.title') }}</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div v-for="feat in features" :key="feat.icon" class="p-6 rounded-2xl bg-white dark:bg-[#221117] border border-[#C5A059]/15 shadow-sm text-center hover:border-[#C5A059]/50 transition-all">
                <div class="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] flex items-center justify-center">
                  <svg v-if="feat.icon === 'rsvp'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                    <path d="m9 14 2 2 4-4"/>
                  </svg>
                  <svg v-else-if="feat.icon === 'map'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <svg v-else-if="feat.icon === 'clock'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <svg v-else-if="feat.icon === 'image'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <circle cx="9" cy="9" r="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  </svg>
                  <svg v-else-if="feat.icon === 'user'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <polyline points="16 11 18 13 22 9"/>
                  </svg>
                  <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="5" height="5" x="3" y="3" rx="1"/>
                    <rect width="5" height="5" x="16" y="3" rx="1"/>
                    <rect width="5" height="5" x="3" y="16" rx="1"/>
                    <path d="M21 16h-3a2 2 0 0 0-2 2v3M21 21v.01M12 7v3a2 2 0 0 1-2 2H7M3 12h.01M12 3h.01M12 16v.01M16 12h1M21 12v.01M12 21v-1"/>
                  </svg>
                </div>
                <h3 class="font-bold text-base text-[#4A1525] dark:text-[#F9F6F0] mb-1">{{ feat.title }}</h3>
                <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] leading-relaxed">{{ feat.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. How It Works -->
        <section id="how-it-works" class="py-20 px-4 max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] text-xs font-semibold">
              <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
              <span>{{ $t('home.howItWorksSection.badge') }}</span>
            </span>
            <h2 class="text-3xl sm:text-4xl font-bold text-[#4A1525] dark:text-[#F9F6F0] mt-3">{{ $t('home.howItWorksSection.title') }}</h2>
            <p class="text-sm text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-2">{{ $t('home.howItWorksSection.subtitle') }}</p>
          </div>

          <div class="space-y-4">
            <div
              v-for="(step, idx) in steps"
              :key="step.icon"
              class="p-6 rounded-2xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm flex items-center gap-5 hover:border-[#C5A059] transition-all"
            >
              <div class="w-14 h-14 rounded-2xl bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] flex items-center justify-center shrink-0">
                <svg v-if="step.icon === 'template'" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
                <svg v-else-if="step.icon === 'edit'" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                </svg>
                <svg v-else-if="step.icon === 'pay'" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"/>
                  <line x1="2" x2="22" y1="10" y2="10"/>
                </svg>
                <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" x2="11" y1="2" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </div>
              <div>
                <span class="text-[11px] font-bold text-[#C5A059]">{{ $t('home.howItWorksSection.stepLabel') }} 0{{ idx + 1 }}</span>
                <h3 class="text-lg font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ step.title }}</h3>
                <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-0.5">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. Pricing Section (Single 999 EGP All-in-One Package) -->
        <section id="pricing" class="py-20 px-4 bg-[#F3EDE2]/60 dark:bg-[#1B0E13]">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-12">
              <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] text-xs font-semibold">
                <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>{{ $t('home.pricingSection.badge') }}</span>
              </span>
              <h2 class="text-3xl sm:text-4xl font-bold text-[#4A1525] dark:text-[#F9F6F0] mt-3">{{ $t('home.pricingSection.title') }}</h2>
              <p class="text-sm text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-2">{{ $t('home.pricingSection.subtitle') }}</p>
            </div>

            <!-- Single All-in-One Package Card (999 EGP) -->
            <div class="relative p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#221117] border-2 border-[#C5A059] shadow-xl">
              <span class="absolute -top-3.5 start-8 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#C5A059] text-[#140A0E] text-xs font-bold shadow">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span>{{ $t('home.pricingSection.popularBadge') }}</span>
              </span>

              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C5A059]/20">
                <div>
                  <h3 class="text-2xl font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('home.pricingSection.planTitle') }}</h3>
                  <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-1">{{ $t('home.pricingSection.subtitle') }}</p>
                </div>
                <div class="flex items-baseline gap-1.5 shrink-0">
                  <span class="text-5xl font-extrabold text-[#C5A059]">{{ $t('home.pricingSection.price') }}</span>
                  <span class="text-xs font-semibold opacity-75">{{ $t('home.pricingSection.currencyPerInvite') }}</span>
                </div>
              </div>

              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-[#2D2D2D]/85 dark:text-[#E5DEC9] my-8">
                <li v-for="item in allPlanFeatures" :key="item" class="flex items-start gap-2.5">
                  <svg class="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{{ item }}</span>
                </li>
              </ul>

              <NuxtLink
                to="/create"
                class="w-full py-4 rounded-full bg-gradient-to-r from-[#4A1525] to-[#6B1F36] dark:from-[#C5A059] dark:to-[#A8843E] text-white dark:text-[#140A0E] font-bold text-sm shadow-lg hover:opacity-95 transition-all inline-flex items-center justify-center gap-2"
              >
                <span>{{ $t('home.pricingSection.choosePlan') }}</span>
                <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
            </div>

            <!-- Concierge Box -->
            <div class="mt-8 p-6 rounded-2xl bg-white/90 dark:bg-[#221117] border border-[#C5A059]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                    <path d="M9 18h6M10 22h4"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-base text-[#4A1525] dark:text-[#C5A059]">{{ $t('home.pricingSection.concierge.title') }}</h4>
                  <p class="text-xs text-[#2D2D2D]/75 dark:text-[#D5C7B8] mt-1">{{ $t('home.pricingSection.concierge.desc') }}</p>
                </div>
              </div>
              <div class="flex gap-2 shrink-0">
                <a href="https://wa.me/201094123678" target="_blank" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  <span>{{ $t('home.pricingSection.concierge.whatsapp') }}</span>
                </a>
                <a href="#contact" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C5A059]/40 text-xs font-bold hover:border-[#C5A059] transition">
                  <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>{{ $t('home.pricingSection.concierge.instagram') }}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- 6. FAQ Section -->
        <section class="py-20 px-4 max-w-4xl mx-auto">
          <h2 class="text-2xl sm:text-3xl font-bold text-center text-[#4A1525] dark:text-[#F9F6F0] mb-10">
            {{ $t('home.faqSection.title') }}
          </h2>
          <div class="space-y-4">
            <div v-for="faq in faqs" :key="faq.q" class="p-6 rounded-2xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm">
              <h3 class="font-bold text-sm sm:text-base text-[#4A1525] dark:text-[#C5A059] mb-2 flex items-center gap-2">
                <svg class="w-4 h-4 text-[#C5A059] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
                </svg>
                <span>{{ faq.q }}</span>
              </h3>
              <p class="text-xs sm:text-sm text-[#2D2D2D]/75 dark:text-[#D5C7B8] leading-relaxed ps-6">{{ faq.a }}</p>
            </div>
          </div>
        </section>

        <!-- 7. Contact Us Section -->
        <section id="contact" class="py-20 px-4 bg-[#F3EDE2]/60 dark:bg-[#1B0E13]">
          <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12">
              <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] text-xs font-semibold">
                <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span>{{ $t('home.contactSection.badge') }}</span>
              </span>
              <h2 class="text-3xl sm:text-4xl font-bold text-[#4A1525] dark:text-[#F9F6F0] mt-3">{{ $t('home.contactSection.title') }}</h2>
              <p class="text-sm text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-2">{{ $t('home.contactSection.subtitle') }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Fast Support Card -->
              <div class="p-8 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 flex flex-col justify-between">
                <div>
                  <div class="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-4">
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-[#4A1525] dark:text-[#F9F6F0] mb-2">{{ $t('home.contactSection.supportTitle') }}</h3>
                  <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] leading-relaxed mb-4">
                    {{ $t('home.contactSection.supportDesc') }}
                  </p>
                  <p class="text-[11px] text-[#C5A059] mb-6 inline-flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>{{ $t('home.contactSection.supportHours') }}</span>
                  </p>
                </div>
                <a href="https://wa.me/201094123678" target="_blank" class="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm text-center transition inline-flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  <span>{{ $t('home.contactSection.supportBtn') }}</span>
                </a>
              </div>

              <!-- Concierge Custom Design Card -->
              <div class="p-8 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 flex flex-col justify-between">
                <div>
                  <div class="w-12 h-12 rounded-2xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-4">
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-[#4A1525] dark:text-[#F9F6F0] mb-2">{{ $t('home.contactSection.conciergeTitle') }}</h3>
                  <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] leading-relaxed mb-6">
                    {{ $t('home.contactSection.conciergeDesc') }}
                  </p>
                </div>
                <a href="https://wa.me/201094123678" target="_blank" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#A8843E] text-[#140A0E] font-bold text-sm text-center hover:opacity-95 transition inline-flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" x2="11" y1="2" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  <span>{{ $t('home.contactSection.conciergeBtn') }}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- 8. Footer -->
      <FooterSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import FooterSection from '../components/FooterSection.vue'
import { useTemplatesCatalog, type TemplateCatalogItem } from '../composables/useTemplatesCatalog'

const { t } = useI18n()
const isDark = useState<boolean>('daawa-dark-mode', () => false)
const { categories, templates, includedTemplateFeatures, getStringList } = useTemplatesCatalog()

const selectedCategory = ref('all')
const selectedTemplateModal = ref<TemplateCatalogItem | null>(null)

const filteredTemplates = computed(() => {
  if (selectedCategory.value === 'all') return templates.value
  return templates.value.filter((item) => item.category === selectedCategory.value)
})

const displayedTemplates = computed(() => {
  return filteredTemplates.value.slice(0, 6)
})

const features = computed(() => [
  { icon: 'rsvp', title: t('home.featuresSection.items.rsvp.title'), desc: t('home.featuresSection.items.rsvp.desc') },
  { icon: 'map', title: t('home.featuresSection.items.map.title'), desc: t('home.featuresSection.items.map.desc') },
  { icon: 'clock', title: t('home.featuresSection.items.clock.title'), desc: t('home.featuresSection.items.clock.desc') },
  { icon: 'image', title: t('home.featuresSection.items.image.title'), desc: t('home.featuresSection.items.image.desc') },
  { icon: 'user', title: t('home.featuresSection.items.user.title'), desc: t('home.featuresSection.items.user.desc') },
  { icon: 'qr', title: t('home.featuresSection.items.qr.title'), desc: t('home.featuresSection.items.qr.desc') },
])

const steps = computed(() => [
  { icon: 'template', title: t('home.howItWorksSection.steps.s1.title'), desc: t('home.howItWorksSection.steps.s1.desc') },
  { icon: 'edit', title: t('home.howItWorksSection.steps.s2.title'), desc: t('home.howItWorksSection.steps.s2.desc') },
  { icon: 'pay', title: t('home.howItWorksSection.steps.s3.title'), desc: t('home.howItWorksSection.steps.s3.desc') },
  { icon: 'send', title: t('home.howItWorksSection.steps.s4.title'), desc: t('home.howItWorksSection.steps.s4.desc') },
])

const allPlanFeatures = computed(() => getStringList('home.pricingSection.allFeatures'))

const faqs = computed(() => [
  { q: t('home.faqSection.items.q1.q'), a: t('home.faqSection.items.q1.a') },
  { q: t('home.faqSection.items.q2.q'), a: t('home.faqSection.items.q2.a') },
  { q: t('home.faqSection.items.q3.q'), a: t('home.faqSection.items.q3.a') },
  { q: t('home.faqSection.items.q4.q'), a: t('home.faqSection.items.q4.a') },
])
</script>
