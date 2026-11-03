<template>
  <footer
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    class="py-14 px-4 sm:px-6 lg:px-8 bg-[#EBE3D5] dark:bg-[#0F070A] border-t border-[#C5A059]/20 text-xs sm:text-sm transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10">
      <!-- Column 1: Brand + Description + 4 Social Icons (Facebook, Instagram, WhatsApp, TikTok) -->
      <div class="md:col-span-5 space-y-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2.5">
          <span class="text-2xl font-bold tracking-wider text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('brand.en') }}</span>
          <span class="h-5 w-[1px] bg-[#C5A059]/40"></span>
          <span class="text-[#C5A059] text-lg font-bold">{{ $t('brand.ar') }}</span>
        </NuxtLink>

        <p class="text-[#2D2D2D]/75 dark:text-[#D5C7B8] leading-relaxed max-w-md text-xs sm:text-sm">
          {{ $t('home.footer.desc') }}
        </p>

        <!-- Social Media Circular Buttons: Facebook, Instagram, WhatsApp, TikTok -->
        <div class="flex items-center gap-3 pt-2">
          <!-- Facebook -->
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            class="w-10 h-10 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/35 text-[#4A1525] dark:text-[#C5A059] hover:bg-[#4A1525] hover:text-white dark:hover:bg-[#C5A059] dark:hover:text-[#140A0E] transition-all flex items-center justify-center shadow-sm"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>

          <!-- Instagram -->
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="w-10 h-10 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/35 text-[#4A1525] dark:text-[#C5A059] hover:bg-[#4A1525] hover:text-white dark:hover:bg-[#C5A059] dark:hover:text-[#140A0E] transition-all flex items-center justify-center shadow-sm"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>

          <!-- WhatsApp -->
          <a
            href="https://wa.me/201094123678"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            class="w-10 h-10 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/35 text-[#4A1525] dark:text-[#C5A059] hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all flex items-center justify-center shadow-sm"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </a>

          <!-- TikTok -->
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            class="w-10 h-10 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/35 text-[#4A1525] dark:text-[#C5A059] hover:bg-[#4A1525] hover:text-white dark:hover:bg-[#C5A059] dark:hover:text-[#140A0E] transition-all flex items-center justify-center shadow-sm"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Column 2: Product Links (Nav Links) -->
      <div class="md:col-span-4 space-y-3">
        <h4 class="font-bold text-sm text-[#4A1525] dark:text-[#C5A059]">
          {{ $t('home.footer.productTitle') }}
        </h4>
        <ul class="space-y-2.5 text-xs sm:text-sm text-[#2D2D2D]/80 dark:text-[#D5C7B8]">
          <li>
            <NuxtLink to="/create" class="text-[#8E6E37] dark:text-[#C5A059] font-semibold hover:underline">
              {{ $t('home.footer.createInvite') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/templates" class="hover:text-[#C5A059] transition-colors">
              {{ $t('nav.templates') }}
            </NuxtLink>
          </li>
          <li>
            <a href="/#how-it-works" class="hover:text-[#C5A059] transition-colors">
              {{ $t('nav.howItWorks') }}
            </a>
          </li>
          <li>
            <a href="/#pricing" class="hover:text-[#C5A059] transition-colors">
              {{ $t('nav.pricing') }}
            </a>
          </li>
          <li>
            <a href="/#contact" class="hover:text-[#C5A059] transition-colors">
              {{ $t('nav.contact') }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Column 3: Legal Links (Terms, Privacy, Refund) -->
      <div class="md:col-span-3 space-y-3">
        <h4 class="font-bold text-sm text-[#4A1525] dark:text-[#C5A059]">
          {{ $t('home.footer.legalTitle') }}
        </h4>
        <ul class="space-y-2.5 text-xs sm:text-sm text-[#2D2D2D]/80 dark:text-[#D5C7B8]">
          <li>
            <NuxtLink to="/terms" class="hover:text-[#C5A059] transition-colors">
              {{ $t('home.footer.terms') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/privacy-policy" class="hover:text-[#C5A059] transition-colors">
              {{ $t('home.footer.privacy') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/refund-policy" class="hover:text-[#C5A059] transition-colors">
              {{ $t('home.footer.refund') }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Copyright & Kariim Credit Bar -->
    <div class="max-w-7xl mx-auto pt-6 border-t border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#2D2D2D]/75 dark:text-[#D5C7B8]/80">
      <p>© {{ currentYear }} {{ $t('brand.en') }} | {{ $t('brand.ar') }}. {{ $t('home.footer.rights') }}</p>

      <p class="inline-flex items-center gap-1.5">
        <span>{{ $t('home.footer.madeByPrefix') }}</span>
        <a
          href="https://kariim-portfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          class="px-3 py-0.5 rounded-full bg-[#4A1525] dark:bg-[#C5A059] text-[#F9F6F0] dark:text-[#140A0E] font-extrabold tracking-wide hover:opacity-90 hover:scale-105 transition-all"
        >
          {{ $t('home.footer.madeByName') }}
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

