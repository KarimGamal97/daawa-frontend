<template>
  <div
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    :class="{ dark: isDark }"
  >
    <div class="min-h-screen bg-[#F9F6F0] dark:bg-[#140A0E] text-[#2D2D2D] dark:text-[#F9F6F0] transition-colors duration-300">
      <Navbar />

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <!-- Studio Top Bar -->
        <div class="p-4 sm:p-5 rounded-3xl bg-white/90 dark:bg-[#221117]/90 border border-[#C5A059]/25 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4A1525] to-[#6B1F36] dark:from-[#C5A059] dark:to-[#9A7836] text-[#F9F6F0] dark:text-[#140A0E] flex items-center justify-center shrink-0 shadow">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-xl sm:text-2xl font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('builder.title') }}</h1>
              <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-0.5">{{ $t('builder.subtitle') }}</p>
            </div>
          </div>

          <!-- Action Pills -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{{ $t('builder.autoSaved') }}</span>
            </span>

            <button
              type="button"
              @click="copyDraftUrl"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#8E6E37] dark:text-[#C5A059] text-xs font-semibold hover:bg-[#C5A059]/25 transition"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>{{ draftCopied ? $t('builder.draftCopied') : $t('builder.copyDraft') }}</span>
            </button>

            <button
              type="button"
              @click="resetBuilder"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-[#2D2D2D]/80 dark:text-[#D5C7B8] text-xs font-semibold hover:border-[#C5A059] transition"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              <span>{{ $t('builder.startOver') }}</span>
            </button>
          </div>
        </div>

        <!-- Unique Connected Royal Progress Stepper -->
        <div v-if="!createdSlug" class="mb-8 p-2 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <button
              type="button"
              v-for="(stepItem, index) in stepTabs"
              :key="stepItem.num"
              @click="goToStep(stepItem.num)"
              :class="[
                'relative px-4 py-3.5 rounded-2xl flex items-center gap-3 transition-all text-start overflow-hidden',
                currentStep === stepItem.num
                  ? 'bg-gradient-to-r from-[#4A1525] to-[#6B1F36] dark:from-[#C5A059] dark:to-[#A8843E] text-white dark:text-[#140A0E] shadow-md'
                  : currentStep > stepItem.num
                    ? 'bg-[#C5A059]/10 text-[#4A1525] dark:text-[#C5A059]'
                    : 'bg-transparent text-[#2D2D2D]/65 dark:text-[#D5C7B8]/70 hover:bg-[#F9F6F0] dark:hover:bg-[#140A0E]'
              ]"
            >
              <span
                :class="[
                  'w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 transition-all',
                  currentStep === stepItem.num
                    ? 'bg-white/20 dark:bg-[#140A0E]/20 text-white dark:text-[#140A0E]'
                    : currentStep > stepItem.num
                      ? 'bg-[#C5A059] text-[#140A0E]'
                      : 'bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25'
                ]"
              >
                <svg v-if="currentStep > stepItem.num" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span v-else>0{{ index + 1 }}</span>
              </span>

              <div class="min-w-0">
                <span class="block text-xs sm:text-sm font-bold truncate">{{ stepItem.label }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Order Submitted & Pending Verification Screen -->
        <div
          v-if="createdSlug"
          class="max-w-xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#221117] border-2 border-[#C5A059] shadow-xl text-center space-y-5 my-8"
        >
          <div class="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <h2 class="text-2xl font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('builder.successTitle') }}</h2>
          <p class="text-xs sm:text-sm text-[#2D2D2D]/75 dark:text-[#D5C7B8] leading-relaxed">
            {{ $t('builder.successDesc') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="https://wa.me/201094123678"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-3.5 rounded-xl bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E] font-bold text-sm text-center shadow hover:opacity-95 transition"
            >
              {{ $t('builder.whatsappFollowupBtn') }}
            </a>
            <button
              type="button"
              @click="createdSlug = ''"
              class="px-5 py-3.5 rounded-xl border border-[#C5A059]/40 text-xs font-bold hover:border-[#C5A059] transition"
            >
              {{ $t('builder.createAnotherBtn') }}
            </button>
          </div>
        </div>

        <!-- Builder Studio Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <!-- Start Column: Step Forms -->
          <div class="lg:col-span-7 space-y-6">
            <!-- ==================== STEP 1: Occasion & 15 Visual Templates ==================== -->
            <div v-if="currentStep === 1" class="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm space-y-8">
              <!-- Occasion Selector -->
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h2 class="text-xl font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('builder.step1.title') }}</h2>
                    <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-1">{{ $t('builder.step1.subtitle') }}</p>
                  </div>
                </div>

                <!-- 9 Occasion Types in a Horizontal Pill-Card Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    v-for="ev in eventTypes"
                    :key="ev.id"
                    @click="form.eventType = ev.id"
                    :class="[
                      'p-3.5 rounded-2xl border transition-all flex items-center gap-3 text-start group',
                      form.eventType === ev.id
                        ? 'border-[#C5A059] bg-gradient-to-br from-[#4A1525]/10 to-[#C5A059]/20 dark:from-[#C5A059]/20 dark:to-[#4A1525]/30 shadow-sm'
                        : 'border-[#C5A059]/15 bg-[#F9F6F0]/60 dark:bg-[#140A0E]/60 hover:border-[#C5A059]/40'
                    ]"
                  >
                    <span
                      :class="[
                        'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                        form.eventType === ev.id
                          ? 'bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E]'
                          : 'bg-white dark:bg-[#221117] text-[#8E6E37] dark:text-[#C5A059]'
                      ]"
                    >
                      <!-- Wedding Rings / Heart -->
                      <svg v-if="ev.id === 'wedding'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                      <!-- Engagement Sparkles -->
                      <svg v-else-if="ev.id === 'engagement'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                      </svg>
                      <!-- Katb Ketab Book/Layers -->
                      <svg v-else-if="ev.id === 'katbKetab'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                      </svg>
                      <!-- Birthday Cake -->
                      <svg v-else-if="ev.id === 'birthday'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
                        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>
                        <path d="M2 21h20M7 8v3M12 8v3M17 8v3M7 4h.01M12 4h.01M17 4h.01"/>
                      </svg>
                      <!-- Baby Welcome -->
                      <svg v-else-if="ev.id === 'newborn'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
                      </svg>
                      <!-- Graduation Cap -->
                      <svg v-else-if="ev.id === 'graduation'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                      <!-- Housewarming -->
                      <svg v-else-if="ev.id === 'housewarming'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      <!-- Grand Opening Store -->
                      <svg v-else-if="ev.id === 'opening'" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                        <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
                        <path d="M2 7h20"/>
                      </svg>
                      <!-- Other Party -->
                      <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </span>

                    <span class="text-xs font-bold text-[#2D2D2D] dark:text-[#F9F6F0] truncate">
                      {{ ev.label }}
                    </span>
                  </button>
                </div>
              </div>

              <!-- 15 Templates Visual Arch Gallery -->
              <div class="pt-4 border-t border-[#C5A059]/15">
                <div class="flex items-center justify-between mb-4">
                  <label class="text-sm font-bold text-[#4A1525] dark:text-[#F9F6F0]">
                    {{ $t('builder.step1.chooseTemplate') }}
                  </label>
                  <span class="px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#8E6E37] dark:text-[#C5A059] text-xs font-bold">
                    {{ activeTemplate.name }}
                  </span>
                </div>

                <!-- 15 Visual Arch Cards Grid -->
                <div class="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  <button
                    type="button"
                    v-for="tpl in templateOptions"
                    :key="tpl.id"
                    @click="form.templateId = tpl.id"
                    :class="[
                      'group p-2 rounded-2xl border transition-all flex flex-col items-center text-center relative',
                      form.templateId === tpl.id
                        ? 'border-2 border-[#C5A059] bg-[#EFE6D8]/70 dark:bg-[#2B151D] shadow-md scale-[1.02]'
                        : 'border-[#C5A059]/20 bg-[#F9F6F0]/50 dark:bg-[#140A0E]/50 hover:border-[#C5A059]/50'
                    ]"
                  >
                    <!-- Selected Check Badge -->
                    <span
                      v-if="form.templateId === tpl.id"
                      class="absolute top-3.5 end-3.5 z-10 w-5 h-5 rounded-full bg-[#C5A059] text-[#140A0E] flex items-center justify-center shadow"
                    >
                      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>

                    <!-- Miniature Royal Arch Preview -->
                    <div :class="['w-full h-24 sm:h-28 rounded-xl p-2 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b', tpl.gradient]">
                      <div class="inset-1.5 absolute rounded-t-full border border-[#C5A059]/40 pointer-events-none"></div>
                      <span class="w-6 h-0.5 bg-[#C5A059]/60 mx-auto rounded-full mt-1"></span>
                      <div class="my-auto text-white text-center relative z-10">
                        <span class="block text-[9px] text-[#C5A059] tracking-widest">DAAWA</span>
                        <span class="block text-[10px] font-bold truncate px-1 mt-0.5">{{ tpl.name }}</span>
                      </div>
                      <span class="w-8 h-1 rounded-full bg-[#C5A059]/80 mx-auto mb-0.5"></span>
                    </div>

                    <span class="text-[11px] font-bold mt-2 text-[#2D2D2D] dark:text-[#F9F6F0] truncate w-full">
                      {{ tpl.name }}
                    </span>
                  </button>
                </div>
              </div>

              <!-- Step 1 Next Button -->
              <div class="pt-4 border-t border-[#C5A059]/15 flex justify-end">
                <button
                  type="button"
                  @click="currentStep = 2"
                  class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4A1525] to-[#6B1F36] dark:from-[#C5A059] dark:to-[#B38E46] text-white dark:text-[#140A0E] font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition inline-flex items-center justify-center gap-2"
                >
                  <span>{{ $t('builder.nextStep') }}</span>
                  <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- ==================== STEP 2: Invitation Details, Quote & Timeline ==================== -->
            <div v-else-if="currentStep === 2" class="space-y-6">
              <!-- Card 2A: Hosts & Date + Scratch-a-Heart Toggle -->
              <div class="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm space-y-5">
                <div class="flex items-center gap-2.5 border-b border-[#C5A059]/15 pb-3">
                  <span class="w-7 h-7 rounded-lg bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] flex items-center justify-center text-xs font-extrabold">1</span>
                  <h2 class="text-base sm:text-lg font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('builder.step2.sectionHosts') }}</h2>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold mb-1.5 flex items-center justify-between">
                      <span>{{ $t('builder.step2.groomLabel') }}</span>
                      <span v-if="form.templateId === 'umm-kulthum'" class="text-[10px] font-semibold text-[#8E6E37] dark:text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded-full">البطاقة 1 (الرئيسية)</span>
                    </label>
                    <input
                      v-model="form.groomName"
                      required
                      type="text"
                      :placeholder="$t('builder.step2.groomPlaceholder')"
                      class="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold mb-1.5 flex items-center justify-between">
                      <span>{{ $t('builder.step2.brideLabel') }}</span>
                      <span v-if="form.templateId === 'umm-kulthum'" class="text-[10px] font-semibold text-[#8E6E37] dark:text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded-full">البطاقة 1 (الرئيسية)</span>
                    </label>
                    <input
                      v-model="form.brideName"
                      required
                      type="text"
                      :placeholder="$t('builder.step2.bridePlaceholder')"
                      class="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold mb-1.5 flex items-center justify-between">
                      <span>{{ $t('builder.step2.dateLabel') }}</span>
                      <span v-if="form.templateId === 'umm-kulthum'" class="text-[10px] font-semibold text-[#8E6E37] dark:text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded-full">البطاقة 3 + العداد</span>
                    </label>
                    <input
                      v-model="form.weddingDate"
                      required
                      type="datetime-local"
                      class="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold mb-1.5">{{ $t('builder.step2.slugLabel') }}</label>
                    <input
                      v-model="form.slug"
                      type="text"
                      dir="ltr"
                      :placeholder="$t('builder.step2.slugPlaceholder')"
                      class="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <!-- Scratch-a-Heart Date Reveal Feature Card -->
                <div
                  @click="form.scratchReveal = !form.scratchReveal"
                  :class="[
                    'p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4',
                    form.scratchReveal
                      ? 'bg-gradient-to-r from-[#4A1525]/10 via-[#C5A059]/15 to-transparent border-[#C5A059]'
                      : 'bg-[#F9F6F0]/60 dark:bg-[#140A0E]/60 border-[#C5A059]/20'
                  ]"
                >
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-xl bg-[#C5A059]/20 text-[#4A1525] dark:text-[#C5A059] flex items-center justify-center shrink-0 mt-0.5">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-xs sm:text-sm font-bold text-[#4A1525] dark:text-[#C5A059] flex items-center gap-1.5">
                        <span>{{ $t('builder.step2.scratchTitle') }}</span>
                      </h3>
                      <p class="text-[11px] sm:text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-1 leading-relaxed">
                        {{ $t('builder.step2.scratchDesc') }}
                      </p>
                    </div>
                  </div>

                  <!-- Custom Toggle Switch -->
                  <div
                    :class="[
                      'w-12 h-6 rounded-full p-1 transition-colors shrink-0 flex items-center',
                      form.scratchReveal ? 'bg-[#4A1525] dark:bg-[#C5A059] justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'
                    ]"
                  >
                    <span class="w-4 h-4 rounded-full bg-white dark:bg-[#140A0E] shadow"></span>
                  </div>
                </div>
              </div>

              <!-- Card 2B: Venue & Detailed Address & Map -->
              <div class="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm space-y-4">
                <div class="flex items-center gap-2.5 border-b border-[#C5A059]/15 pb-3">
                  <span class="w-7 h-7 rounded-lg bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] flex items-center justify-center text-xs font-extrabold">2</span>
                  <h2 class="text-base sm:text-lg font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('builder.step2.sectionLocation') }}</h2>
                </div>

                <div>
                  <label class="block text-xs font-bold mb-1.5 flex items-center justify-between">
                    <span>{{ $t('builder.step2.venueLabel') }}</span>
                    <span v-if="form.templateId === 'umm-kulthum'" class="text-[10px] font-semibold text-[#8E6E37] dark:text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded-full">أعلى البطاقة 3</span>
                  </label>
                  <input
                    v-model="form.venue"
                    required
                    type="text"
                    :placeholder="$t('builder.step2.venuePlaceholder')"
                    class="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold mb-1.5 flex items-center justify-between">
                      <span>{{ $t('builder.step2.addressLabel') }}</span>
                      <span v-if="form.templateId === 'umm-kulthum'" class="text-[10px] font-semibold text-[#8E6E37] dark:text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded-full">البطاقة 3 (بين العيدان)</span>
                    </label>
                    <input
                      v-model="form.venueAddress"
                      type="text"
                      :placeholder="$t('builder.step2.addressPlaceholder')"
                      class="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold mb-1.5 flex items-center justify-between">
                      <span>{{ $t('builder.step2.mapLabel') }}</span>
                      <span v-if="form.templateId === 'umm-kulthum'" class="text-[10px] font-semibold text-[#8E6E37] dark:text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded-full">زر LOCATION في البطاقة 3</span>
                    </label>
                    <input
                      v-model="form.mapUrl"
                      type="url"
                      dir="ltr"
                      :placeholder="$t('builder.step2.mapPlaceholder')"
                      class="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>
              </div>

              <!-- Card 2C: Quote, Welcome Note, Tagline, Schedule Timeline & RSVP -->
              <div class="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm space-y-5">
                <div class="flex items-center gap-2.5 border-b border-[#C5A059]/15 pb-3">
                  <span class="w-7 h-7 rounded-lg bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] flex items-center justify-center text-xs font-extrabold">3</span>
                  <h2 class="text-base sm:text-lg font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('builder.step2.sectionContent') }}</h2>
                </div>

                <!-- Verse / Quote Selector -->
                <div>
                  <label class="block text-xs font-bold mb-2">{{ $t('builder.step2.quoteLabel') }}</label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      v-for="qt in quoteChoices"
                      :key="qt.id"
                      @click="form.quoteType = qt.id"
                      :class="[
                        'p-3 rounded-2xl border text-xs font-bold transition-all text-center leading-relaxed',
                        form.quoteType === qt.id
                          ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059] shadow-sm'
                          : 'border-[#C5A059]/20 bg-[#F9F6F0]/60 dark:bg-[#140A0E]/60 opacity-80 hover:opacity-100'
                      ]"
                    >
                      {{ qt.label }}
                    </button>
                  </div>

                  <div v-if="form.quoteType === 'custom'" class="mt-3">
                    <label v-if="form.templateId === 'umm-kulthum'" class="block text-xs font-bold mb-1.5 flex items-center justify-between">
                      <span>{{ $t('builder.step2.customQuotePlaceholder') }}</span>
                      <span class="text-[10px] font-semibold text-[#8E6E37] dark:text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded-full">أعلى الأسماء (البطاقة الأولى)</span>
                    </label>
                    <input
                      v-model="form.customQuote"
                      type="text"
                      :placeholder="$t('builder.step2.customQuotePlaceholder')"
                      class="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/35 text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <!-- Welcome Message -->
                <div>
                  <label class="block text-xs font-bold mb-1.5">{{ $t('builder.step2.welcomeLabel') }}</label>
                  <textarea
                    v-model="form.welcomeMessage"
                    rows="3"
                    :placeholder="$t('builder.step2.welcomePlaceholder')"
                    class="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                  ></textarea>
                </div>

                <!-- Signature Tagline -->
                <div>
                  <label class="block text-xs font-bold mb-1.5 flex items-center justify-between">
                    <span>{{ $t('builder.step2.taglineLabel') }}</span>
                    <span v-if="form.templateId === 'umm-kulthum'" class="text-[10px] font-semibold text-[#8E6E37] dark:text-[#C5A059] bg-[#C5A059]/15 px-2 py-0.5 rounded-full">أسفل الأسماء (البطاقة الأولى)</span>
                  </label>
                  <input
                    v-model="form.tagline"
                    type="text"
                    :placeholder="$t('builder.step2.taglinePlaceholder')"
                    class="w-full px-4 py-3 rounded-2xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <!-- Celebration Schedule Timeline Builder -->
                <div class="pt-3 border-t border-[#C5A059]/15">
                  <div class="flex items-center justify-between mb-3">
                    <label class="text-xs font-bold text-[#4A1525] dark:text-[#C5A059]">
                      {{ $t('builder.step2.scheduleLabel') }}
                    </label>
                    <button
                      type="button"
                      @click="addScheduleRow"
                      class="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] hover:underline inline-flex items-center gap-1"
                    >
                      <span>{{ $t('builder.step2.addScheduleBtn') }}</span>
                    </button>
                  </div>

                  <div class="space-y-2.5 relative before:absolute before:top-3 before:bottom-3 before:start-4 before:w-0.5 before:bg-[#C5A059]/25">
                    <div
                      v-for="row in form.schedule"
                      :key="row.id"
                      class="relative ps-9 flex items-center gap-2.5"
                    >
                      <span class="absolute start-2.5 w-3.5 h-3.5 rounded-full bg-[#C5A059] border-2 border-white dark:border-[#221117]"></span>
                      <input
                        v-model="row.time"
                        type="text"
                        :placeholder="$t('builder.step2.scheduleTimePlaceholder')"
                        class="w-24 sm:w-28 px-3 py-2.5 rounded-xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-xs font-bold text-center focus:outline-none focus:border-[#C5A059] shrink-0"
                      />
                      <input
                        v-model="row.title"
                        type="text"
                        :placeholder="$t('builder.step2.scheduleTitlePlaceholder')"
                        class="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-xs focus:outline-none focus:border-[#C5A059]"
                      />
                      <button
                        type="button"
                        @click="removeScheduleRow(row.id)"
                        class="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 flex items-center justify-center shrink-0 transition"
                      >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <p v-if="errorMsg" class="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold">
                  {{ errorMsg }}
                </p>

                <!-- Step 2 Navigation Buttons -->
                <div class="pt-4 border-t border-[#C5A059]/15 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    @click="currentStep = 1"
                    class="px-5 py-3 rounded-full border border-[#C5A059]/30 text-xs font-bold text-[#2D2D2D]/80 dark:text-[#D5C7B8] hover:border-[#C5A059] inline-flex items-center gap-1.5 transition"
                  >
                    <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                    <span>{{ $t('builder.prevStep') }}</span>
                  </button>

                  <button
                    type="button"
                    @click="goToStep(3)"
                    class="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4A1525] to-[#6B1F36] dark:from-[#C5A059] dark:to-[#B38E46] text-white dark:text-[#140A0E] font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition inline-flex items-center gap-2"
                  >
                    <span>{{ $t('builder.nextStep') }}</span>
                    <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- ==================== STEP 3: Photos, Memory Album & Music Studio ==================== -->
            <div v-else-if="currentStep === 3" class="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm space-y-7">
              <div>
                <h2 class="text-xl font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('builder.step3.title') }}</h2>
                <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-1">{{ $t('builder.step3.subtitle') }}</p>
              </div>

              <!-- 1. Main Cover Photo Upload Studio -->
              <div>
                <label class="block text-xs font-bold mb-2.5">{{ $t('builder.step3.coverPhotoLabel') }}</label>
                <div class="p-5 rounded-2xl border-2 border-dashed border-[#C5A059]/35 bg-[#F9F6F0]/60 dark:bg-[#140A0E]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div class="flex items-center gap-4">
                    <div class="w-20 h-20 rounded-2xl bg-[#EFE6D8] dark:bg-[#221117] border border-[#C5A059]/25 overflow-hidden flex items-center justify-center shrink-0">
                      <img v-if="form.photoUrl" :src="form.photoUrl" alt="Cover" class="w-full h-full object-cover" />
                      <svg v-else class="w-7 h-7 text-[#8E6E37] dark:text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" x2="12" y1="3" y2="15"/>
                      </svg>
                    </div>
                    <div class="text-center sm:text-start">
                      <p class="text-xs text-[#2D2D2D]/75 dark:text-[#D5C7B8] leading-relaxed">
                        {{ $t('builder.step3.coverPhotoHint') }}
                      </p>
                      <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                        <label class="cursor-pointer inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#C5A059] to-[#B38E46] text-[#140A0E] text-xs font-bold shadow-sm hover:opacity-95 transition">
                          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" x2="12" y1="3" y2="15"/>
                          </svg>
                          <span>{{ $t('builder.step3.choosePhotoBtn') }}</span>
                          <input type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="handleCoverPhotoUpload" />
                        </label>
                        <button
                          v-if="form.photoUrl"
                          type="button"
                          @click="form.photoUrl = ''"
                          class="px-3.5 py-2 rounded-full bg-red-500/10 text-red-600 text-xs font-bold"
                        >
                          {{ $t('builder.step3.removePhotoBtn') }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. Memory Album Photos (Up to 6 Photos) -->
              <div>
                <div class="flex items-center justify-between mb-2.5">
                  <label class="text-xs font-bold">{{ $t('builder.step3.galleryLabel') }}</label>
                  <span class="text-xs font-bold text-[#8E6E37] dark:text-[#C5A059]" dir="ltr">
                    {{ (form.galleryPhotos || []).length }} / 6
                  </span>
                </div>

                <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  <!-- Uploaded Gallery Thumbnails -->
                  <div
                    v-for="(img, idx) in form.galleryPhotos"
                    :key="idx"
                    class="relative h-24 rounded-2xl overflow-hidden border border-[#C5A059]/30 group"
                  >
                    <img :src="img" alt="Album" class="w-full h-full object-cover" />
                    <button
                      type="button"
                      @click="removeGalleryPhoto(idx)"
                      class="absolute top-1.5 end-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>

                  <!-- Add Photo Tile -->
                  <label
                    v-if="(form.galleryPhotos || []).length < 6"
                    class="h-24 rounded-2xl border-2 border-dashed border-[#C5A059]/35 bg-[#F9F6F0]/50 dark:bg-[#140A0E]/50 hover:border-[#C5A059] transition flex flex-col items-center justify-center gap-1 cursor-pointer text-[#8E6E37] dark:text-[#C5A059]"
                  >
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" x2="12" y1="5" y2="19"/>
                      <line x1="5" x2="19" y1="12" y2="12"/>
                    </svg>
                    <span class="text-[11px] font-bold">{{ $t('builder.step3.addGalleryBtn') }}</span>
                    <input type="file" accept="image/jpeg,image/png,image/webp" multiple class="hidden" @change="handleGalleryUpload" />
                  </label>
                </div>
              </div>

              <!-- 3. Background Music Studio -->
              <div class="pt-4 border-t border-[#C5A059]/15">
                <label class="block text-xs font-bold mb-3">{{ $t('builder.step3.musicLabel') }}</label>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    v-for="m in musicList"
                    :key="m.id"
                    @click="form.musicTrack = m.id"
                    :class="[
                      'p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between gap-2.5',
                      form.musicTrack === m.id
                        ? 'border-[#C5A059] bg-gradient-to-r from-[#4A1525]/10 to-[#C5A059]/20 text-[#4A1525] dark:text-[#C5A059] shadow-sm'
                        : 'border-[#C5A059]/20 bg-[#F9F6F0]/60 dark:bg-[#140A0E]/60 hover:border-[#C5A059]/40'
                    ]"
                  >
                    <div class="flex items-center gap-2.5 truncate">
                      <svg class="w-4 h-4 text-[#C5A059] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 18V5l12-2v13"/>
                        <circle cx="6" cy="18" r="3"/>
                        <circle cx="18" cy="16" r="3"/>
                      </svg>
                      <span class="truncate">{{ m.label }}</span>
                    </div>

                    <svg v-if="form.musicTrack === m.id" class="w-4 h-4 text-[#C5A059] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>
                </div>

                <!-- Upload Custom MP3 From Device -->
                <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <label class="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/35 text-xs font-bold text-[#8E6E37] dark:text-[#C5A059] hover:border-[#C5A059] transition">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" x2="12" y1="3" y2="15"/>
                    </svg>
                    <span>{{ $t('builder.step3.uploadMp3Btn') }}</span>
                    <input type="file" accept="audio/mp3,audio/*" class="hidden" @change="handleMp3Upload" />
                  </label>

                  <span v-if="form.customMusicName" class="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {{ $t('builder.step3.uploadedMp3Prefix') }} {{ form.customMusicName }}
                  </span>
                </div>
              </div>

              <!-- 4. Royal Wax Seal Color (Or Intro Video Notice for Umm Kulthum) -->
              <div v-if="form.templateId === 'umm-kulthum'" class="pt-4 border-t border-[#C5A059]/15">
                <div class="p-4 rounded-2xl bg-[#C5A059]/10 border border-[#C5A059]/30 text-xs">
                  <p class="font-bold text-[#4A1525] dark:text-[#C5A059] flex items-center gap-2">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect width="15" height="14" x="1" y="5" rx="2" ry="2"/>
                    </svg>
                    <span>واجهة أم كلثوم: فيديو إنترو سينمائي مخصص</span>
                  </p>
                  <p class="text-[11px] text-[#2D2D2D]/75 dark:text-[#D5C7B8] mt-1 leading-relaxed">
                    بدلاً من الختم الشمعي التقليدي، يتميز قالب أم كلثوم بمقطع فيديو إنترو فاخر مع زر أنيق لفتح الدعوة.
                  </p>
                </div>
              </div>
              <div v-else class="pt-4 border-t border-[#C5A059]/15">
                <label class="block text-xs font-bold mb-2.5">{{ $t('builder.step3.sealLabel') }}</label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    v-for="seal in sealOptions"
                    :key="seal.id"
                    @click="form.sealStyle = seal.id"
                    :class="[
                      'p-3 rounded-2xl border text-xs font-bold transition-all text-center',
                      form.sealStyle === seal.id
                        ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#4A1525] dark:text-[#C5A059]'
                        : 'border-[#C5A059]/20 bg-[#F9F6F0]/60 dark:bg-[#140A0E]/60'
                    ]"
                  >
                    {{ seal.label }}
                  </button>
                </div>
              </div>

              <!-- Step 3 Navigation -->
              <div class="pt-4 border-t border-[#C5A059]/15 flex items-center justify-between gap-3">
                <button
                  type="button"
                  @click="currentStep = 2"
                  class="px-5 py-3 rounded-full border border-[#C5A059]/30 text-xs font-bold text-[#2D2D2D]/80 dark:text-[#D5C7B8] hover:border-[#C5A059] inline-flex items-center gap-1.5 transition"
                >
                  <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  <span>{{ $t('builder.prevStep') }}</span>
                </button>

                <button
                  type="button"
                  @click="goToStep(4)"
                  class="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4A1525] to-[#6B1F36] dark:from-[#C5A059] dark:to-[#B38E46] text-white dark:text-[#140A0E] font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition inline-flex items-center gap-2"
                >
                  <span>{{ $t('builder.nextStep') }}</span>
                  <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- ==================== STEP 4: Package Summary & Payment Gate ==================== -->
            <div v-else class="p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm space-y-6">
              <div>
                <h2 class="text-xl font-bold text-[#2D2D2D] dark:text-[#F9F6F0]">{{ $t('builder.step4.title') }}</h2>
                <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-1">{{ $t('builder.step4.subtitle') }}</p>
              </div>

              <!-- Summary Box -->
              <div class="rounded-2xl bg-[#F9F6F0]/80 dark:bg-[#140A0E]/80 border border-[#C5A059]/25 p-5 divide-y divide-[#C5A059]/15 text-xs sm:text-sm">
                <div class="py-2.5 flex items-center justify-between gap-2">
                  <span class="text-[#2D2D2D]/60 dark:text-[#D5C7B8]">{{ $t('builder.step4.summaryTemplate') }}</span>
                  <span class="font-bold text-[#8E6E37] dark:text-[#C5A059]">{{ activeTemplate.name }}</span>
                </div>
                <div class="py-2.5 flex items-center justify-between gap-2">
                  <span class="text-[#2D2D2D]/60 dark:text-[#D5C7B8]">{{ $t('builder.step4.summaryHost') }}</span>
                  <span class="font-bold">{{ form.groomName }} & {{ form.brideName }}</span>
                </div>
                <div class="py-2.5 flex items-center justify-between gap-2">
                  <span class="text-[#2D2D2D]/60 dark:text-[#D5C7B8]">{{ $t('builder.step4.summaryDate') }}</span>
                  <span class="font-bold">{{ formattedPreviewDate }}</span>
                </div>
                <div class="py-2.5 flex items-center justify-between gap-2">
                  <span class="text-[#2D2D2D]/60 dark:text-[#D5C7B8]">{{ $t('builder.step4.summaryVenue') }}</span>
                  <span class="font-bold">{{ form.venue }}</span>
                </div>
                <div class="pt-3 flex items-center justify-between gap-2">
                  <span class="font-bold text-[#4A1525] dark:text-[#C5A059]">{{ $t('builder.step4.summaryPriceLabel') }}</span>
                  <span class="text-base font-extrabold text-[#C5A059]">{{ $t('builder.step4.summaryPriceValue') }}</span>
                </div>
              </div>

              <!-- Customer Contact Details -->
              <div class="space-y-4 pt-2">
                <h3 class="font-bold text-sm text-[#2D2D2D] dark:text-[#F9F6F0]">{{ $t('builder.step4.contactHeading') }}</h3>

                <div>
                  <label class="block text-xs font-bold mb-1.5">{{ $t('builder.step4.customerNameLabel') }}</label>
                  <input
                    v-model="form.customerName"
                    required
                    type="text"
                    :placeholder="$t('builder.step4.customerNamePlaceholder')"
                    class="w-full px-4 py-3.5 rounded-2xl bg-[#F9F6F0]/60 dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold mb-1.5">{{ $t('builder.step4.customerPhoneLabel') }}</label>
                  <input
                    v-model="form.customerPhone"
                    required
                    type="tel"
                    dir="ltr"
                    :placeholder="$t('builder.step4.customerPhonePlaceholder')"
                    class="w-full px-4 py-3.5 rounded-2xl bg-[#F9F6F0]/60 dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label class="block text-xs font-bold mb-1.5">{{ $t('builder.step4.customerEmailLabel') }}</label>
                  <input
                    v-model="form.customerEmail"
                    type="email"
                    dir="ltr"
                    :placeholder="$t('builder.step4.customerEmailPlaceholder')"
                    class="w-full px-4 py-3.5 rounded-2xl bg-[#F9F6F0]/60 dark:bg-[#140A0E] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <!-- Payment Method Box (Matching Exact Reference Screenshot) -->
              <div class="pt-2 space-y-3">
                <h3 class="font-bold text-base text-[#2D2D2D] dark:text-[#F9F6F0]">
                  {{ $t('builder.step4.paymentMethodLabel') }}
                </h3>

                <div class="p-5 sm:p-6 rounded-3xl bg-[#F9F6F0]/60 dark:bg-[#140A0E] border border-[#2D2D2D]/20 dark:border-[#C5A059]/30 space-y-4">
                  <!-- 2 Tabs ONLY: InstaPay & Vodafone Cash -->
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      v-for="pm in paymentMethods"
                      :key="pm.id"
                      @click="form.paymentMethod = pm.id"
                      :class="[
                        'py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold transition text-center',
                        form.paymentMethod === pm.id
                          ? 'bg-[#EFE6D8] dark:bg-[#2B151D] border-[#8E6E37] dark:border-[#C5A059] text-[#2D2D2D] dark:text-[#F9F6F0]'
                          : 'bg-white/80 dark:bg-[#221117] border-[#C5A059]/20 text-[#2D2D2D]/60 dark:text-[#D5C7B8]/70'
                      ]"
                    >
                      {{ pm.label }}
                    </button>
                  </div>

                  <!-- Bold Transfer Number Heading + Copy Number Pill -->
                  <div class="space-y-2.5 pt-1">
                    <p class="text-base sm:text-lg font-extrabold text-[#140A0E] dark:text-[#F9F6F0]">
                      {{ $t('builder.step4.transferHeading') }}
                    </p>

                    <div>
                      <button
                        type="button"
                        @click="copyPaymentNumber"
                        class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/35 text-[#8E6E37] dark:text-[#C5A059] text-xs font-semibold hover:border-[#C5A059] transition"
                      >
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                        </svg>
                        <span>{{ paymentNumberCopied ? $t('builder.step4.numberCopiedBtn') : $t('builder.step4.copyNumberBtn') }}</span>
                      </button>
                    </div>

                    <p class="text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#D5C7B8] leading-relaxed">
                      {{ form.paymentMethod === 'vodafone' ? $t('builder.step4.vodafoneInstructions') : $t('builder.step4.instapayInstructions') }}
                    </p>
                  </div>

                  <!-- Sender Number or Account Input -->
                  <div>
                    <input
                      v-model="form.paymentReference"
                      required
                      type="text"
                      :placeholder="$t('builder.step4.senderAccountPlaceholder')"
                      class="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-[#221117] border border-[#C5A059]/25 text-sm focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <!-- Upload Transfer Screenshot Field -->
                  <label class="w-full px-4 py-3.5 rounded-2xl bg-white dark:bg-[#221117] border border-[#C5A059]/25 flex items-center justify-between gap-3 cursor-pointer hover:border-[#C5A059] transition">
                    <span class="text-sm text-[#2D2D2D]/60 dark:text-[#D5C7B8]/80 truncate">
                      {{ form.receiptFileName ? `${$t('builder.step4.receiptUploadedPrefix')} ${form.receiptFileName}` : $t('builder.step4.uploadReceiptPlaceholder') }}
                    </span>
                    <svg class="w-4 h-4 text-[#8E6E37] dark:text-[#C5A059] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" x2="12" y1="3" y2="15"/>
                    </svg>
                    <input type="file" accept="image/*" class="hidden" @change="handleReceiptUpload" />
                  </label>
                </div>

                <!-- Subtotal & Total Summary -->
                <div class="border-t border-[#C5A059]/20 pt-4 space-y-2">
                  <div class="flex items-center justify-between text-xs sm:text-sm text-[#2D2D2D]/70 dark:text-[#D5C7B8]">
                    <span>{{ $t('builder.step4.packageSubtotalLabel') }}</span>
                    <span class="font-bold">{{ packageBasePrice }} {{ $t('builder.step4.currencyUnit') }}</span>
                  </div>
                  <div class="flex items-center justify-between text-lg sm:text-xl font-extrabold text-[#140A0E] dark:text-[#F9F6F0]">
                    <span>{{ $t('builder.step4.finalTotalLabel') }}</span>
                    <span>{{ finalTotalPrice }} {{ $t('builder.step4.currencyUnit') }}</span>
                  </div>
                </div>
              </div>

              <p v-if="errorMsg" class="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold">
                {{ errorMsg }}
              </p>

              <!-- Full-Width Purchase Button (Matching Screenshot) -->
              <button
                type="button"
                :disabled="isLoading"
                @click="submitInvitation"
                class="w-full py-4 rounded-full bg-[#111315] hover:bg-[#1F2327] dark:bg-[#C5A059] dark:hover:bg-[#B38E46] text-white dark:text-[#140A0E] font-bold text-sm sm:text-base shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <span>{{ isLoading ? $t('builder.step4.submittingBtn') : $t('builder.step4.buyNowBtn') }}</span>
              </button>

              <div class="pt-4 border-t border-[#C5A059]/15 flex items-center justify-between text-xs font-bold">
                <button
                  type="button"
                  @click="currentStep = 3"
                  class="inline-flex items-center gap-1.5 text-[#2D2D2D]/80 dark:text-[#D5C7B8] hover:text-[#4A1525]"
                >
                  <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  <span>{{ $t('builder.prevStep') }}</span>
                </button>

                <button
                  type="button"
                  @click="copyDraftUrl"
                  class="inline-flex items-center gap-1.5 text-[#8E6E37] dark:text-[#C5A059] hover:underline"
                >
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                  <span>{{ draftCopied ? $t('builder.draftCopied') : $t('builder.copyDraft') }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- End Column: Live Interactive Phone Mockup -->
          <div class="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-24">
            <!-- Toggle Envelope / Inside Card -->
            <div class="flex items-center gap-2 mb-4 p-1 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/25 text-xs shadow-sm">
              <button
                type="button"
                @click="previewMode = 'envelope'"
                :class="[
                  'px-4 py-1.5 rounded-full font-bold transition',
                  previewMode === 'envelope'
                    ? 'bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E]'
                    : 'text-[#2D2D2D]/70 dark:text-[#D5C7B8]'
                ]"
              >
                {{ form.templateId === 'umm-kulthum' ? 'فيديو الإنترو' : $t('builder.step3.envelopePreviewBtn') }}
              </button>
              <button
                type="button"
                @click="previewMode = 'card'"
                :class="[
                  'px-4 py-1.5 rounded-full font-bold transition',
                  previewMode === 'card'
                    ? 'bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E]'
                    : 'text-[#2D2D2D]/70 dark:text-[#D5C7B8]'
                ]"
              >
                {{ form.templateId === 'umm-kulthum' ? 'كروت الدعوة' : $t('builder.step3.cardPreviewBtn') }}
              </button>
            </div>

            <!-- Realistic iPhone 16 Pro Frame -->
            <IphoneFrame>
              <!-- SPECIAL LIVE PREVIEW FOR UMM KULTHUM TEMPLATE -->
              <template v-if="form.templateId === 'umm-kulthum'">
                <!-- Mode A (Umm Kulthum): Video Intro Screen -->
                <div
                  v-if="previewMode === 'envelope'"
                  @click="previewMode = 'card'"
                  class="relative h-[550px] flex flex-col items-center justify-end pb-10 px-4 text-center select-none bg-[#10070A] overflow-hidden cursor-pointer"
                >
                  <video
                    autoplay
                    loop
                    muted
                    playsinline
                    webkit-playsinline
                    class="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="/templates/umm-kulthum/audio/intro.mp4" type="video/mp4" />
                  </video>
                  <div class="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none"></div>
                  <div class="relative z-10 space-y-2">
                    <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-[#C5A059]/40 text-[#F9F6F0] text-xs font-bold shadow-lg">
                      <span>{{ $t('templates.ummKulthum.clickToOpen') || 'اضغط لفتح الدعوة' }}</span>
                    </div>
                    <p class="text-[10px] text-white/70">اضغط لمعاينة كروت الدعوة الثلاثة</p>
                  </div>
                </div>

                <!-- Mode B (Umm Kulthum): 3 Royal Golden Vintage Cards -->
                <div
                  v-else
                  class="w-full [transform:translateZ(0)]"
                >
                  <UmmKulthumTemplate
                    :invitation="liveUmmKulthumInvitation"
                    :template="activeTemplate"
                  />
                </div>
              </template>

              <!-- DEFAULT PREVIEW FOR OTHER CLASSIC TEMPLATES -->
              <template v-else>
                <!-- Mode A: Royal Wax-Seal Envelope -->
                <div
                  v-if="previewMode === 'envelope'"
                @click="previewMode = 'card'"
                :class="['min-h-[476px] p-6 relative overflow-hidden cursor-pointer flex flex-col items-center justify-between text-center bg-gradient-to-b', activeTemplate.gradient]"
              >
                <div class="w-full pt-2">
                  <p class="text-[10px] tracking-widest text-[#C5A059] uppercase font-bold">{{ $t('brand.en') }} — {{ $t('brand.ar') }}</p>
                  <p class="text-xs text-white/75 mt-1">{{ activeTemplate.name }}</p>
                </div>

                <div class="relative my-auto flex flex-col items-center gap-3">
                  <div class="w-44 h-44 rounded-full border border-[#C5A059]/30 flex items-center justify-center">
                    <div
                      :class="[
                        'w-24 h-24 rounded-full shadow-2xl border-4 flex flex-col items-center justify-center transition-transform hover:scale-105',
                        form.sealStyle === 'burgundy'
                          ? 'bg-gradient-to-br from-[#6B1F36] to-[#3A0E1B] border-[#C5A059] text-[#C5A059]'
                          : form.sealStyle === 'pearl'
                            ? 'bg-gradient-to-br from-[#F9F6F0] to-[#D5C7B8] border-[#C5A059] text-[#4A1525]'
                            : 'bg-gradient-to-br from-[#D4B475] via-[#C5A059] to-[#8E6E37] border-[#F5EFE6]/60 text-[#140A0E]'
                      ]"
                    >
                      <span class="text-xs font-extrabold tracking-wider">
                        {{ (form.groomName || 'أ')[0] }} & {{ (form.brideName || 'س')[0] }}
                      </span>
                      <span class="text-[9px] font-bold opacity-80 mt-0.5">DAAWA</span>
                    </div>
                  </div>
                  <span class="px-3 py-1 rounded-full bg-black/30 border border-[#C5A059]/40 text-[10px] text-[#C5A059] font-semibold">
                    {{ $t('builder.phonePreview.tapSealHint') }}
                  </span>
                </div>

                <div class="w-full pb-2 space-y-1 text-white">
                  <h3 class="text-xl font-bold text-[#C5A059]">
                    {{ form.groomName || ($i18n.locale === 'ar' ? 'محمد' : 'Mohamed') }} & {{ form.brideName || ($i18n.locale === 'ar' ? 'سارة' : 'Sara') }}
                  </h3>
                  <p class="text-[11px] text-white/70">{{ formattedPreviewDate }}</p>
                </div>
              </div>

              <!-- Mode B: Full Scrollable Live Invitation Experience -->
              <div
                v-else
                :class="['p-4 pb-8 text-center text-white relative bg-gradient-to-br space-y-5', activeTemplate.gradient]"
              >
                <!-- 1. Hero Opening Section -->
                <div class="pt-2 space-y-3">
                  <p v-if="activeQuoteText" class="text-[11px] text-[#C5A059] leading-relaxed px-2 font-medium">
                    {{ activeQuoteText }}
                  </p>

                  <div v-if="form.photoUrl" class="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#C5A059] shadow-lg">
                    <img :src="form.photoUrl" alt="Couple" class="w-full h-full object-cover" />
                  </div>

                  <!-- Couple Names & Tagline Card -->
                  <div class="py-5 px-3 rounded-2xl bg-black/25 backdrop-blur-sm border border-[#C5A059]/30 shadow-inner">
                    <span class="inline-block text-[10px] tracking-wider text-[#C5A059] font-semibold mb-1">
                      {{ $t('invite.blessedWedding') }}
                    </span>
                    <h3 class="text-2xl font-bold text-white leading-snug">
                      {{ form.groomName || ($i18n.locale === 'ar' ? 'محمد' : 'Mohamed') }} & {{ form.brideName || ($i18n.locale === 'ar' ? 'سارة' : 'Sara') }}
                    </h3>
                    <p v-if="form.tagline" class="text-[11px] text-[#C5A059] mt-1.5 font-medium">{{ form.tagline }}</p>
                  </div>

                  <!-- Welcome Text -->
                  <p class="text-xs text-white/85 leading-relaxed px-1">
                    {{ form.welcomeMessage || $t('home.mockup.intro') }}
                  </p>

                  <!-- Scroll Down Indicator Pill -->
                  <div class="pt-1 flex justify-center">
                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] text-[#C5A059] font-semibold">
                      <span>{{ $t('builder.phonePreview.scrollHint') }}</span>
                      <svg class="w-3 h-3 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- 2. Interactive Scratch-a-Heart Date Reveal & Countdown -->
                <div class="p-3.5 rounded-2xl bg-black/25 border border-[#C5A059]/25 space-y-3">
                  <div v-if="form.scratchReveal">
                    <button
                      v-if="!isHeartScratched"
                      type="button"
                      @click="isHeartScratched = true"
                      class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#E2C280] to-[#B38E46] text-[#140A0E] font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:brightness-105 transition"
                    >
                      <svg class="w-4 h-4 text-[#4A1525]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                      <span>{{ $t('builder.phonePreview.scratchToReveal') }}</span>
                    </button>

                    <div v-else class="space-y-1.5">
                      <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C5A059]/25 border border-[#C5A059] text-[#F9F6F0] text-xs font-bold">
                        <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                        </svg>
                        <span>{{ formattedPreviewDate }}</span>
                      </div>
                      <div>
                        <button
                          type="button"
                          @click="isHeartScratched = false"
                          class="text-[10px] text-[#C5A059] underline opacity-80 hover:opacity-100"
                        >
                          {{ $t('builder.phonePreview.resetScratch') }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-else class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 text-[#C5A059] text-xs font-bold">
                    <span>{{ formattedPreviewDate }}</span>
                  </div>

                  <!-- Live Countdown Boxes -->
                  <div class="space-y-1.5 pt-1">
                    <p class="text-[10px] text-white/70 font-semibold">{{ $t('builder.phonePreview.countdownTitle') }}</p>
                    <div class="grid grid-cols-4 gap-1.5">
                      <div class="p-2 rounded-xl bg-white/10 border border-[#C5A059]/25">
                        <span class="block text-sm font-bold text-[#C5A059]">14</span>
                        <span class="text-[9px] text-white/75">{{ $t('invite.days') }}</span>
                      </div>
                      <div class="p-2 rounded-xl bg-white/10 border border-[#C5A059]/25">
                        <span class="block text-sm font-bold text-[#C5A059]">08</span>
                        <span class="text-[9px] text-white/75">{{ $t('invite.hours') }}</span>
                      </div>
                      <div class="p-2 rounded-xl bg-white/10 border border-[#C5A059]/25">
                        <span class="block text-sm font-bold text-[#C5A059]">45</span>
                        <span class="text-[9px] text-white/75">{{ $t('invite.minutes') }}</span>
                      </div>
                      <div class="p-2 rounded-xl bg-white/10 border border-[#C5A059]/25">
                        <span class="block text-sm font-bold text-[#C5A059]">30</span>
                        <span class="text-[9px] text-white/75">{{ $t('invite.seconds') }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 3. Venue & Google Maps Section -->
                <div class="p-3.5 rounded-2xl bg-black/25 border border-white/15 space-y-2.5">
                  <div class="w-8 h-8 mx-auto rounded-xl bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <p class="text-[10px] font-bold text-[#C5A059] tracking-wide">{{ $t('builder.phonePreview.venueSectionTitle') }}</p>
                  <h4 class="text-xs font-bold text-white">{{ form.venue || $t('home.mockup.venue') }}</h4>
                  <p v-if="form.venueAddress" class="text-[10px] text-white/75 leading-relaxed">{{ form.venueAddress }}</p>

                  <div class="pt-1 flex flex-col gap-1.5">
                    <a
                      :href="form.mapUrl || 'https://maps.google.com'"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-full py-2 px-3 rounded-xl bg-[#C5A059] text-[#140A0E] text-[11px] font-bold flex items-center justify-center gap-1.5 shadow hover:brightness-105 transition"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                      </svg>
                      <span>{{ $t('builder.phonePreview.openGoogleMaps') }}</span>
                    </a>
                  </div>
                </div>

                <!-- 4. Full Event Schedule Timeline -->
                <div v-if="form.schedule && form.schedule.length" class="p-3.5 rounded-2xl bg-black/25 border border-white/15 space-y-2.5 text-start">
                  <p class="text-[11px] font-bold text-[#C5A059] text-center">{{ $t('builder.phonePreview.scheduleSectionTitle') }}</p>
                  <div class="space-y-2">
                    <div
                      v-for="s in form.schedule"
                      :key="s.id"
                      class="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-2 text-[11px]"
                    >
                      <span class="text-white/90 font-medium truncate">{{ s.title }}</span>
                      <span class="px-2 py-0.5 rounded-md bg-[#C5A059]/20 text-[#C5A059] font-bold text-[10px] shrink-0">{{ s.time }}</span>
                    </div>
                  </div>
                </div>

                <!-- 5. Memory Album Gallery -->
                <div v-if="form.galleryPhotos && form.galleryPhotos.length" class="p-3.5 rounded-2xl bg-black/25 border border-white/15 space-y-2.5">
                  <p class="text-[11px] font-bold text-[#C5A059]">{{ $t('builder.phonePreview.gallerySectionTitle') }}</p>
                  <div class="grid grid-cols-2 gap-2">
                    <div
                      v-for="(imgUrl, gIdx) in form.galleryPhotos"
                      :key="gIdx"
                      class="aspect-square rounded-xl overflow-hidden border border-[#C5A059]/30"
                    >
                      <img :src="imgUrl" alt="Memory" class="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <!-- 6. Interactive Guest RSVP & Wishes Form -->
                <div v-if="form.enableRsvp" class="p-3.5 rounded-2xl bg-black/30 border border-[#C5A059]/35 space-y-2.5 text-start">
                  <p class="text-[11px] font-bold text-[#C5A059] text-center">{{ $t('builder.phonePreview.rsvpSectionTitle') }}</p>

                  <div class="space-y-2">
                    <input
                      v-model="previewRsvpName"
                      type="text"
                      :placeholder="$t('invite.guestNamePlaceholder')"
                      class="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 text-[11px] focus:outline-none focus:border-[#C5A059]"
                    />

                    <textarea
                      v-model="previewRsvpWish"
                      rows="2"
                      :placeholder="$t('invite.wishPlaceholder')"
                      class="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 text-[11px] focus:outline-none focus:border-[#C5A059] resize-none"
                    ></textarea>

                    <button
                      type="button"
                      @click="submitPreviewRsvp"
                      class="w-full py-2.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#B38E46] text-[#140A0E] text-xs font-bold shadow hover:brightness-105 transition text-center"
                    >
                      {{ $t('invite.submitRsvpBtn') }}
                    </button>

                    <p v-if="previewRsvpSent" class="text-[10px] text-emerald-300 font-bold text-center pt-0.5">
                      {{ $t('builder.phonePreview.rsvpPreviewSent') }}
                    </p>
                  </div>
                </div>

                <!-- 7. Footer Signature -->
                <div class="pt-2 border-t border-white/10 text-[10px] text-white/50">
                  {{ $t('invite.poweredBy') }}
                </div>
              </div>
            </template>
          </IphoneFrame>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Navbar from '~/features/home/components/Navbar.vue'
import FooterSection from '~/features/home/components/FooterSection.vue'
import UmmKulthumTemplate from '~/features/invitation/components/templates/UmmKulthumTemplate.vue'
import { useInvitationBuilder } from '../composables/useInvitationBuilder'
import type { OccasionEventType, QuoteSelectionType, MusicTrackChoice, InvitationItem } from '../types/invitation.types'

const { t } = useI18n()
const isDark = useState<boolean>('daawa-dark-mode', () => false)

// Interactive states for the scrollable iPhone preview
const isHeartScratched = ref(false)
const previewRsvpName = ref('')
const previewRsvpAttending = ref(true)
const previewRsvpWish = ref('')
const previewRsvpSent = ref(false)

function submitPreviewRsvp() {
  previewRsvpSent.value = true
  setTimeout(() => {
    previewRsvpSent.value = false
  }, 3000)
}

const {
  currentStep,
  previewMode,
  draftCopied,
  paymentNumberCopied,
  discountApplied,
  packageBasePrice,
  finalTotalPrice,
  templateOptions,
  form,
  activeTemplate,
  activeQuoteText,
  formattedPreviewDate,
  isLoading,
  errorMsg,
  createdSlug,
  copied,
  invitationUrl,
  copyLink,
  copyDraftUrl,
  copyPaymentNumber,
  handleReceiptUpload,
  applyDiscountCode,
  addScheduleRow,
  removeScheduleRow,
  handleCoverPhotoUpload,
  handleGalleryUpload,
  removeGalleryPhoto,
  handleMp3Upload,
  resetBuilder,
  goToStep,
  submitInvitation,
} = useInvitationBuilder()

const liveUmmKulthumInvitation = computed<InvitationItem>(() => ({
  _id: 'live-preview-umm-kulthum',
  slug: form.slug || 'preview',
  templateId: 'umm-kulthum',
  eventType: form.eventType || 'wedding',
  sealStyle: form.sealStyle || 'burgundy',
  groomName: form.groomName || 'مصطفى ابوليله',
  brideName: form.brideName || 'دنيا محرم',
  weddingDate: form.weddingDate || '2027-01-12T19:00:00',
  scratchReveal: form.scratchReveal,
  venue: form.venue || 'قاعة بيرلا',
  venueAddress: form.venueAddress || "Tanta - El Mahalla Road, Grand Babilon's First Gate",
  mapUrl: form.mapUrl || 'https://www.google.com/maps/search/?api=1&query=Perla+-%D8%A8%D9%8A%D8%B1%D9%84%D8%A7,+W479%2BWJ9,+Saft+Torab,+El+Mahalla+El+Kubra',
  quoteType: form.quoteType || 'custom',
  customQuote: form.customQuote || 'يا رب تفضل حلاوة سلام أول لقا بإيدينا',
  welcomeMessage: form.welcomeMessage || 'نتشرف بدعوتكم لحضور حفل زفافنا في ليلة طربية أصيلة لا تُنسى',
  tagline: form.tagline || 'AS MUSIC FILLS THE AIR AND OUR HEARTS BECOME ONE, WE INVITE YOU TO CELEBRATE THE BEGINNING OF OUR GREATEST ADVENTURE',
  schedule: form.schedule || [],
  enableRsvp: form.enableRsvp,
  musicTrack: form.musicTrack || 'templateDefault',
  customMusicName: form.customMusicName || '/templates/umm-kulthum/audio/song.mp3',
  photoUrl: form.photoUrl || '',
  galleryPhotos: form.galleryPhotos || [],
  totalPrice: finalTotalPrice.value,
  status: 'active',
  rsvps: [],
}))

const stepTabs = computed(() => [
  { num: 1, label: t('builder.steps.s1') },
  { num: 2, label: t('builder.steps.s2') },
  { num: 3, label: t('builder.steps.s3') },
  { num: 4, label: t('builder.steps.s4') },
])

const eventTypes = computed<Array<{ id: OccasionEventType; label: string }>>(() => [
  { id: 'wedding', label: t('builder.step1.types.wedding') },
  { id: 'engagement', label: t('builder.step1.types.engagement') },
  { id: 'katbKetab', label: t('builder.step1.types.katbKetab') },
  { id: 'birthday', label: t('builder.step1.types.birthday') },
  { id: 'newborn', label: t('builder.step1.types.newborn') },
  { id: 'graduation', label: t('builder.step1.types.graduation') },
  { id: 'housewarming', label: t('builder.step1.types.housewarming') },
  { id: 'opening', label: t('builder.step1.types.opening') },
  { id: 'other', label: t('builder.step1.types.other') },
])

const quoteChoices = computed<Array<{ id: QuoteSelectionType; label: string }>>(() => [
  { id: 'quran', label: t('builder.step2.quoteOptions.quran') },
  { id: 'custom', label: t('builder.step2.quoteOptions.custom') },
  { id: 'none', label: t('builder.step2.quoteOptions.none') },
])

const musicList = computed<Array<{ id: MusicTrackChoice; label: string }>>(() => [
  { id: 'templateDefault', label: t('builder.step3.musicOptions.templateDefault') },
  { id: 'royalCalm', label: t('builder.step3.musicOptions.royalCalm') },
  { id: 'classicSymphony', label: t('builder.step3.musicOptions.classicSymphony') },
  { id: 'andalusian', label: t('builder.step3.musicOptions.andalusian') },
  { id: 'none', label: t('builder.step3.musicOptions.none') },
])

const sealOptions = computed(() => [
  { id: 'gold' as const, label: t('builder.step3.seals.gold') },
  { id: 'burgundy' as const, label: t('builder.step3.seals.burgundy') },
  { id: 'pearl' as const, label: t('builder.step3.seals.pearl') },
])

const paymentMethods = computed(() => [
  { id: 'instapay' as const, label: t('builder.step4.methods.instapay') },
  { id: 'vodafone' as const, label: t('builder.step4.methods.vodafone') },
])
</script>
