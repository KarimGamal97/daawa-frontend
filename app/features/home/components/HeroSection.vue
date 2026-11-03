<template>
  <section 
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    class="relative overflow-hidden py-14 lg:py-24 px-4 bg-gradient-to-b from-[#F9F6F0] via-[#F5EFE6] to-[#F9F6F0] dark:from-[#140A0E] dark:via-[#1C0E14] dark:to-[#140A0E] transition-colors duration-300"
  >
    <!-- Soft Ambient Glow -->
    <div class="absolute top-10 right-1/4 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-10 left-1/4 w-96 h-96 bg-[#4A1525]/10 dark:bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <!-- Start Column: Text & Stats -->
      <div class="lg:col-span-7 text-center lg:text-start">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#4A1525] dark:text-[#C5A059] text-xs font-semibold mb-6">
          <svg class="w-3.5 h-3.5 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          </svg>
          <span>{{ $t('home.badge') }}</span>
        </div>

        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#4A1525] dark:text-[#F9F6F0] leading-tight mb-6">
          {{ $t('home.heroTitle') }}
        </h1>

        <p class="text-base sm:text-lg text-[#2D2D2D]/80 dark:text-[#D5C7B8] max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
          {{ $t('home.heroSubtitle') }}
        </p>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10">
          <NuxtLink 
            to="/create" 
            class="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#4A1525] dark:bg-[#C5A059] text-[#F9F6F0] dark:text-[#140A0E] font-semibold shadow-lg hover:scale-105 transition-all"
          >
            <span>{{ $t('home.createButton') }}</span>
            <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
          <a 
            href="#templates" 
            class="px-7 py-3.5 rounded-full bg-white/80 dark:bg-[#221117] border border-[#C5A059]/40 text-[#4A1525] dark:text-[#F9F6F0] font-medium text-center hover:border-[#C5A059] transition-all"
          >
            {{ $t('home.previewTemplates') }}
          </a>
        </div>

        <!-- 4 Mini Feature Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <!-- Stat 1: Crown -->
          <div class="p-3.5 rounded-2xl bg-white/90 dark:bg-[#221117]/90 border border-[#C5A059]/20 shadow-sm text-center">
            <div class="w-8 h-8 mx-auto mb-1.5 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
              </svg>
            </div>
            <div class="text-xs font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('home.stats.templatesTitle') }}</div>
            <div class="text-[11px] text-[#2D2D2D]/60 dark:text-[#D5C7B8]/70">{{ $t('home.stats.templatesSub') }}</div>
          </div>

          <!-- Stat 2: Mail Check -->
          <div class="p-3.5 rounded-2xl bg-white/90 dark:bg-[#221117]/90 border border-[#C5A059]/20 shadow-sm text-center">
            <div class="w-8 h-8 mx-auto mb-1.5 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                <path d="m16 19 2 2 4-4"/>
              </svg>
            </div>
            <div class="text-xs font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('home.stats.rsvpTitle') }}</div>
            <div class="text-[11px] text-[#2D2D2D]/60 dark:text-[#D5C7B8]/70">{{ $t('home.stats.rsvpSub') }}</div>
          </div>

          <!-- Stat 3: Map Pin -->
          <div class="p-3.5 rounded-2xl bg-white/90 dark:bg-[#221117]/90 border border-[#C5A059]/20 shadow-sm text-center">
            <div class="w-8 h-8 mx-auto mb-1.5 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div class="text-xs font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('home.stats.mapTitle') }}</div>
            <div class="text-[11px] text-[#2D2D2D]/60 dark:text-[#D5C7B8]/70">{{ $t('home.stats.mapSub') }}</div>
          </div>

          <!-- Stat 4: Zap -->
          <div class="p-3.5 rounded-2xl bg-white/90 dark:bg-[#221117]/90 border border-[#C5A059]/20 shadow-sm text-center">
            <div class="w-8 h-8 mx-auto mb-1.5 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div class="text-xs font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('home.stats.fastTitle') }}</div>
            <div class="text-[11px] text-[#2D2D2D]/60 dark:text-[#D5C7B8]/70">{{ $t('home.stats.fastSub') }}</div>
          </div>
        </div>
      </div>

      <!-- End Column: Realistic iPhone 16 Pro Invitation Mockup -->
      <div class="lg:col-span-5 flex justify-center">
        <IphoneFrame>
          <div class="bg-gradient-to-b from-[#4A1525] via-[#2D0C16] to-[#140A0E] px-4 pt-4 pb-8 text-center text-white relative space-y-5">
            <!-- 1. Bismillah & Intro -->
            <div class="pt-1 space-y-1.5">
              <p class="text-[11px] tracking-widest text-[#C5A059] font-semibold">{{ $t('home.mockup.bismillah') }}</p>
              <p class="text-xs text-white/80">{{ $t('home.mockup.intro') }}</p>
            </div>

            <!-- 2. Couple Card -->
            <div class="py-5 px-3 rounded-2xl bg-black/25 backdrop-blur-sm border border-[#C5A059]/30">
              <h3 class="text-3xl font-bold text-[#F9F6F0] mb-1">{{ $t('home.mockup.couple') }}</h3>
              <span class="text-xs text-[#C5A059] font-semibold">{{ $t('home.mockup.subtitle') }}</span>
            </div>

            <!-- Scroll Down Hint -->
            <div class="flex justify-center">
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] text-[#C5A059] font-semibold">
                <span>{{ $t('builder.phonePreview.scrollHint') }}</span>
                <svg class="w-3 h-3 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>

            <!-- 3. Date & Countdown Mini Box -->
            <div class="p-3.5 rounded-2xl bg-black/25 border border-[#C5A059]/25 space-y-3">
              <p class="font-bold text-xs text-[#C5A059]">{{ $t('home.mockup.date') }}</p>

              <div class="grid grid-cols-3 gap-2">
                <div class="p-2 rounded-xl bg-white/10 border border-[#C5A059]/25">
                  <span class="block text-sm font-bold text-[#C5A059]">14</span>
                  <span class="text-[10px] text-white/80">{{ $t('home.mockup.days') }}</span>
                </div>
                <div class="p-2 rounded-xl bg-white/10 border border-[#C5A059]/25">
                  <span class="block text-sm font-bold text-[#C5A059]">08</span>
                  <span class="text-[10px] text-white/80">{{ $t('home.mockup.hours') }}</span>
                </div>
                <div class="p-2 rounded-xl bg-white/10 border border-[#C5A059]/25">
                  <span class="block text-sm font-bold text-[#C5A059]">45</span>
                  <span class="text-[10px] text-white/80">{{ $t('home.mockup.minutes') }}</span>
                </div>
              </div>
            </div>

            <!-- 4. Venue & Map Preview -->
            <div class="p-3.5 rounded-2xl bg-black/25 border border-white/15 space-y-2">
              <p class="text-[10px] font-bold text-[#C5A059]">{{ $t('builder.phonePreview.venueSectionTitle') }}</p>
              <p class="text-xs font-semibold text-white">{{ $t('home.mockup.venue') }}</p>
              <div class="w-full py-2 px-3 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-[10px] font-bold">
                {{ $t('builder.phonePreview.openGoogleMaps') }}
              </div>
            </div>

            <!-- 5. RSVP CTA -->
            <NuxtLink
              to="/create"
              class="w-full py-2.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#B38E46] text-[#140A0E] text-xs font-bold shadow inline-flex items-center justify-center gap-1.5"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{{ $t('home.mockup.rsvpBtn') }}</span>
            </NuxtLink>

            <div class="pt-2 border-t border-white/10 text-[10px] text-white/50">
              {{ $t('invite.poweredBy') }}
            </div>
          </div>
        </IphoneFrame>
      </div>

    </div>
  </section>
</template>
