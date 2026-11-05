<template>
  <footer
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    class="py-14 px-4 sm:px-6 lg:px-8 bg-[#EBE3D5] dark:bg-[#0F070A] border-t border-[#C5A059]/20 text-xs sm:text-sm transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-10">
      <!-- Column 1: Brand + Description + 4 Social Icons (Facebook, Instagram, WhatsApp, TikTok) -->
      <div class="md:col-span-5 space-y-4">
        <NuxtLink to="/" class="inline-flex items-center">
          <img
            src="/images/main-logo.jpg"
            alt="DAAWA | دعوة"
            class="h-10 sm:h-12 w-auto rounded-xl object-contain shadow-sm"
          />
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
            <AppIcon name="facebook" class="w-4 h-4" />
          </a>

          <!-- Instagram -->
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="w-10 h-10 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/35 text-[#4A1525] dark:text-[#C5A059] hover:bg-[#4A1525] hover:text-white dark:hover:bg-[#C5A059] dark:hover:text-[#140A0E] transition-all flex items-center justify-center shadow-sm"
          >
            <AppIcon name="instagram" class="w-4 h-4" />
          </a>

          <!-- WhatsApp -->
          <a
            href="https://wa.me/201094123678"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            class="w-10 h-10 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/35 text-[#4A1525] dark:text-[#C5A059] hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all flex items-center justify-center shadow-sm"
          >
            <AppIcon name="whatsapp" class="w-4 h-4" />
          </a>

          <!-- TikTok -->
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            class="w-10 h-10 rounded-full bg-white dark:bg-[#221117] border border-[#C5A059]/35 text-[#4A1525] dark:text-[#C5A059] hover:bg-[#4A1525] hover:text-white dark:hover:bg-[#C5A059] dark:hover:text-[#140A0E] transition-all flex items-center justify-center shadow-sm"
          >
            <AppIcon name="tiktok" class="w-4 h-4" />
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

