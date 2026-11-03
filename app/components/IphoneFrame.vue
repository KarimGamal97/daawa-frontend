<template>
  <div class="relative mx-auto w-full max-w-[19.5rem] sm:max-w-[21rem] select-none">
    <!-- Left Hardware Buttons (Action Button + Volume Up & Down) -->
    <span class="absolute -left-[3px] top-24 w-[3px] h-7 rounded-l-md bg-gradient-to-b from-[#C5A059] to-[#785E2F] shadow-sm"></span>
    <span class="absolute -left-[3px] top-36 w-[3px] h-12 rounded-l-md bg-gradient-to-b from-[#C5A059] to-[#785E2F] shadow-sm"></span>
    <span class="absolute -left-[3px] top-52 w-[3px] h-12 rounded-l-md bg-gradient-to-b from-[#C5A059] to-[#785E2F] shadow-sm"></span>

    <!-- Right Hardware Button (Power / Side Button) -->
    <span class="absolute -right-[3px] top-40 w-[3px] h-16 rounded-r-md bg-gradient-to-b from-[#C5A059] to-[#785E2F] shadow-sm"></span>

    <!-- Outer Titanium Chassis -->
    <div class="rounded-[3.3rem] p-[3.5px] bg-gradient-to-b from-[#E5CFA0] via-[#9E7F47] to-[#4A381B] shadow-[0_25px_60px_-15px_rgba(20,10,14,0.55)]">
      <!-- Inner Black Ceramic Shield Bezel -->
      <div class="rounded-[3.1rem] p-2.5 bg-[#0B0B0E] border border-white/10 relative">
        <!-- Subtle Top Speaker Slit -->
        <div class="w-12 h-1 bg-[#1A1A22] mx-auto rounded-full mb-1"></div>

        <!-- OLED Screen Container (Fixed Height + Scrollable Viewport) -->
        <div class="relative rounded-[2.55rem] overflow-hidden bg-[#140A0E] ring-1 ring-white/10 h-[550px] flex flex-col">
          <!-- Sticky iOS Status Bar + Dynamic Island Overlay -->
          <div class="relative z-30 shrink-0 px-6 pt-2.5 pb-1.5 bg-black/35 backdrop-blur-md border-b border-white/5 flex items-center justify-between text-[10px] font-bold text-white/90" dir="ltr">
            <span class="tracking-tight">9:41</span>

            <!-- iPhone Dynamic Island -->
            <div class="w-24 h-6 rounded-full bg-black border border-white/10 shadow-inner flex items-center justify-end px-2 gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#0F172A] ring-1 ring-indigo-400/30"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#090D16] via-[#1E293B] to-[#38BDF8]/40 ring-1 ring-white/15"></span>
            </div>

            <!-- Signal + WiFi + Battery Icons -->
            <div class="flex items-center gap-1">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="16" width="3" height="6" rx="1"/>
                <rect x="7" y="12" width="3" height="10" rx="1"/>
                <rect x="12" y="8" width="3" height="14" rx="1"/>
                <rect x="17" y="4" width="3" height="18" rx="1"/>
              </svg>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="16" height="10" rx="2" ry="2"/>
                <line x1="22" x2="22" y1="11" y2="13"/>
              </svg>
            </div>
          </div>

          <!-- Scrollable Screen Viewport (Hidden Scrollbar Like Real iOS) -->
          <div class="no-scrollbar relative z-10 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <slot />
          </div>

          <!-- Sticky Bottom iOS Home Indicator Bar -->
          <div class="relative z-30 shrink-0 py-2 bg-black/40 backdrop-blur-md border-t border-white/5 flex justify-center pointer-events-none">
            <div class="w-28 h-1 rounded-full bg-white/45"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
