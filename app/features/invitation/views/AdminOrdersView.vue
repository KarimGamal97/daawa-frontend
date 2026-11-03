<template>
  <div
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    :class="{ dark: isDark }"
  >
    <div class="min-h-screen bg-[#F9F6F0] dark:bg-[#140A0E] text-[#2D2D2D] dark:text-[#F9F6F0] flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <!-- PIN Lock Screen -->
      <main v-if="!isUnlocked" class="flex-1 flex items-center justify-center px-4 py-16">
        <div class="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/30 shadow-xl text-center space-y-5">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E] flex items-center justify-center shadow">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          <div class="space-y-1.5">
            <h1 class="text-xl font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('admin.pinTitle') }}</h1>
            <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8]">{{ $t('admin.pinSubtitle') }}</p>
          </div>

          <form @submit.prevent="unlockAdmin" class="space-y-3">
            <input
              v-model="pinInput"
              type="password"
              :placeholder="$t('admin.pinPlaceholder')"
              class="w-full px-4 py-3 rounded-xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/35 text-center font-bold tracking-widest text-sm focus:outline-none focus:border-[#C5A059]"
            />
            <p v-if="pinError" class="text-xs text-red-600 dark:text-red-400 font-semibold">
              {{ $t('admin.pinError') }}
            </p>
            <button
              type="submit"
              class="w-full py-3 rounded-xl bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E] font-bold text-sm hover:opacity-95 transition"
            >
              {{ $t('admin.pinBtn') }}
            </button>
          </form>
        </div>
      </main>

      <!-- Unlocked Admin Dashboard -->
      <main v-else class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        <!-- Header Bar -->
        <div class="p-5 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/25 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-xl sm:text-2xl font-bold text-[#4A1525] dark:text-[#F9F6F0]">{{ $t('admin.title') }}</h1>
            <p class="text-xs text-[#2D2D2D]/70 dark:text-[#D5C7B8] mt-1">{{ $t('admin.subtitle') }}</p>
          </div>

          <div class="flex items-center gap-2.5">
            <button
              type="button"
              @click="refresh()"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/35 text-[#4A1525] dark:text-[#C5A059] text-xs font-bold hover:bg-[#C5A059]/25 transition"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              <span>{{ $t('admin.refreshBtn') }}</span>
            </button>

            <button
              type="button"
              @click="lockAdmin"
              class="px-4 py-2 rounded-xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/25 text-xs font-bold hover:border-[#C5A059] transition"
            >
              {{ $t('admin.logoutBtn') }}
            </button>
          </div>
        </div>

        <!-- 4 Summary KPI Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-5 rounded-2xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 shadow-sm">
            <span class="text-xs text-[#2D2D2D]/65 dark:text-[#D5C7B8]">{{ $t('admin.stats.totalOrders') }}</span>
            <p class="text-2xl font-extrabold text-[#4A1525] dark:text-[#F9F6F0] mt-1">{{ allOrders.length }}</p>
          </div>

          <div class="p-5 rounded-2xl bg-white dark:bg-[#221117] border border-amber-500/30 shadow-sm">
            <span class="text-xs text-amber-700 dark:text-amber-400 font-semibold">{{ $t('admin.stats.pendingOrders') }}</span>
            <p class="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{{ pendingCount }}</p>
          </div>

          <div class="p-5 rounded-2xl bg-white dark:bg-[#221117] border border-emerald-500/30 shadow-sm">
            <span class="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">{{ $t('admin.stats.activeOrders') }}</span>
            <p class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{{ activeCount }}</p>
          </div>

          <div class="p-5 rounded-2xl bg-white dark:bg-[#221117] border border-[#C5A059]/35 shadow-sm">
            <span class="text-xs text-[#8E6E37] dark:text-[#C5A059] font-semibold">{{ $t('admin.stats.totalRevenue') }}</span>
            <p class="text-2xl font-extrabold text-[#4A1525] dark:text-[#C5A059] mt-1">
              {{ confirmedRevenue }} {{ $t('builder.step4.currencyUnit') }}
            </p>
          </div>
        </div>

        <!-- Filter Pills + Search Input -->
        <div class="p-4 rounded-2xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <button
              v-for="tab in filterTabs"
              :key="tab.id"
              type="button"
              @click="statusFilter = tab.id"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-bold transition',
                statusFilter === tab.id
                  ? 'bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E]'
                  : 'bg-[#F9F6F0] dark:bg-[#140A0E] text-[#2D2D2D]/75 dark:text-[#D5C7B8]'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>

          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('admin.filters.searchPlaceholder')"
            class="w-full md:w-80 px-4 py-2 rounded-xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/30 text-xs focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        <!-- Orders List -->
        <div v-if="filteredOrders.length === 0" class="p-12 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/20 text-center text-sm text-[#2D2D2D]/65 dark:text-[#D5C7B8]">
          {{ $t('admin.emptyState') }}
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="order in filteredOrders"
            :key="order._id"
            class="p-5 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059]/25 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5"
          >
            <!-- Order Details Column -->
            <div class="space-y-2.5 flex-1">
              <div class="flex flex-wrap items-center gap-2.5">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-[11px] font-bold',
                    order.status === 'active'
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                      : order.status === 'rejected'
                        ? 'bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30'
                        : 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                  ]"
                >
                  {{
                    order.status === 'active'
                      ? $t('admin.card.statusActive')
                      : order.status === 'rejected'
                        ? $t('admin.card.statusRejected')
                        : $t('admin.card.statusPending')
                  }}
                </span>

                <h2 class="text-base sm:text-lg font-bold text-[#4A1525] dark:text-[#F9F6F0]">
                  {{ order.groomName }} & {{ order.brideName }}
                </h2>

                <span class="px-2.5 py-0.5 rounded-lg bg-[#C5A059]/15 text-[#8E6E37] dark:text-[#C5A059] text-xs font-bold" dir="ltr">
                  /invite/{{ order.slug }}
                </span>

                <span class="text-xs font-extrabold text-[#4A1525] dark:text-[#C5A059]">
                  {{ order.totalPrice || 999 }} {{ $t('builder.step4.currencyUnit') }}
                </span>
              </div>

              <!-- Customer & Payment Metadata Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-[#2D2D2D]/80 dark:text-[#D5C7B8] pt-1">
                <div>
                  <span class="font-bold text-[#4A1525] dark:text-[#C5A059]">{{ $t('admin.card.customerLabel') }}</span>
                  {{ order.customerName || '—' }}
                </div>
                <div>
                  <span class="font-bold text-[#4A1525] dark:text-[#C5A059]">{{ $t('admin.card.phoneLabel') }}</span>
                  <span dir="ltr" class="ms-1 font-semibold">{{ order.customerPhone || '—' }}</span>
                </div>
                <div>
                  <span class="font-bold text-[#4A1525] dark:text-[#C5A059]">{{ $t('admin.card.methodLabel') }}</span>
                  {{ order.paymentMethod === 'vodafone' ? $t('builder.step4.methods.vodafone') : $t('builder.step4.methods.instapay') }}
                </div>
                <div>
                  <span class="font-bold text-[#4A1525] dark:text-[#C5A059]">{{ $t('admin.card.senderRefLabel') }}</span>
                  <span dir="ltr" class="ms-1 font-semibold">{{ order.paymentReference || '—' }}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons Column -->
            <div class="flex flex-wrap items-center gap-2 shrink-0">
              <!-- View Receipt Image Button -->
              <button
                v-if="order.receiptImageUrl"
                type="button"
                @click="activeReceiptUrl = order.receiptImageUrl"
                class="px-3.5 py-2 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#4A1525] dark:text-[#C5A059] text-xs font-bold hover:bg-[#C5A059]/25 transition"
              >
                {{ $t('admin.card.viewReceiptBtn') }}
              </button>
              <span v-else class="px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-[11px] opacity-60">
                {{ $t('admin.card.noReceipt') }}
              </span>

              <!-- Preview Link -->
              <NuxtLink
                :to="`/invite/${order.slug}`"
                target="_blank"
                class="px-3.5 py-2 rounded-xl bg-[#F9F6F0] dark:bg-[#140A0E] border border-[#C5A059]/30 text-xs font-bold hover:border-[#C5A059] transition"
              >
                {{ $t('admin.card.previewInviteBtn') }}
              </NuxtLink>

              <!-- Approve Button -->
              <button
                v-if="order.status !== 'active'"
                type="button"
                :disabled="updatingSlug === order.slug"
                @click="changeOrderStatus(order.slug, 'active')"
                class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition"
              >
                {{ $t('admin.card.approveBtn') }}
              </button>

              <!-- Reject Button -->
              <button
                v-if="order.status !== 'rejected'"
                type="button"
                :disabled="updatingSlug === order.slug"
                @click="changeOrderStatus(order.slug, 'rejected')"
                class="px-3.5 py-2 rounded-xl bg-red-600/15 hover:bg-red-600/25 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-bold transition"
              >
                {{ $t('admin.card.rejectBtn') }}
              </button>

              <!-- Send Link via WhatsApp -->
              <a
                v-if="order.customerPhone"
                :href="buildWhatsAppLink(order)"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-xl bg-[#4A1525] dark:bg-[#C5A059] text-white dark:text-[#140A0E] text-xs font-bold shadow hover:opacity-95 transition"
              >
                {{ $t('admin.card.whatsappSendBtn') }}
              </a>
            </div>
          </div>
        </div>
      </main>

      <!-- Receipt Screenshot Preview Modal -->
      <div
        v-if="activeReceiptUrl"
        @click.self="activeReceiptUrl = ''"
        class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <div class="max-w-lg w-full p-5 rounded-3xl bg-white dark:bg-[#221117] border border-[#C5A059] space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-[#4A1525] dark:text-[#C5A059]">{{ $t('admin.receiptModalTitle') }}</h3>
            <button
              type="button"
              @click="activeReceiptUrl = ''"
              class="px-3 py-1 rounded-lg bg-[#F9F6F0] dark:bg-[#140A0E] text-xs font-bold"
            >
              {{ $t('admin.closeModalBtn') }}
            </button>
          </div>

          <div class="max-h-[70vh] overflow-y-auto rounded-2xl border border-[#C5A059]/30 bg-black/10">
            <img :src="activeReceiptUrl" alt="Transfer Receipt" class="w-full h-auto object-contain" />
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navbar from '~/features/home/components/Navbar.vue'
import FooterSection from '~/features/home/components/FooterSection.vue'
import { invitationsRepository } from '~/repositories/invitations.repository'
import type { InvitationItem, InvitationOrderStatus } from '../types/invitation.types'

const { t } = useI18n()
const isDark = useState<boolean>('daawa-dark-mode', () => false)

const ADMIN_SESSION_KEY = 'daawa-admin-unlocked'
const DEFAULT_ADMIN_PIN = '2026'

const isUnlocked = ref(false)
const pinInput = ref('')
const pinError = ref(false)
const statusFilter = ref<'all' | InvitationOrderStatus>('all')
const searchQuery = ref('')
const updatingSlug = ref('')
const activeReceiptUrl = ref('')

const ordersData = ref<InvitationItem[]>([])

const refresh = async () => {
  ordersData.value = await invitationsRepository.fetchAll()
}

onMounted(async () => {
  if (import.meta.client) {
    if (sessionStorage.getItem(ADMIN_SESSION_KEY) === '1') {
      isUnlocked.value = true
    }
    await refresh()
  }
})

const unlockAdmin = () => {
  if (pinInput.value.trim() === DEFAULT_ADMIN_PIN) {
    isUnlocked.value = true
    pinError.value = false
    if (import.meta.client) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
    }
  } else {
    pinError.value = true
  }
}

const lockAdmin = () => {
  isUnlocked.value = false
  pinInput.value = ''
  if (import.meta.client) {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
  }
}

const allOrders = computed<InvitationItem[]>(() => ordersData.value || [])

const pendingCount = computed(() =>
  allOrders.value.filter((o) => !o.status || o.status === 'pending').length
)

const activeCount = computed(() =>
  allOrders.value.filter((o) => o.status === 'active').length
)

const confirmedRevenue = computed(() =>
  allOrders.value
    .filter((o) => o.status === 'active')
    .reduce((sum, o) => sum + (o.totalPrice || 999), 0)
)

const filterTabs = computed(() => [
  { id: 'all' as const, label: t('admin.filters.all') },
  { id: 'pending' as const, label: t('admin.filters.pending') },
  { id: 'active' as const, label: t('admin.filters.active') },
  { id: 'rejected' as const, label: t('admin.filters.rejected') },
])

const filteredOrders = computed(() => {
  return allOrders.value.filter((item) => {
    const itemStatus = item.status || 'pending'
    const matchesStatus = statusFilter.value === 'all' || itemStatus === statusFilter.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchesStatus

    const haystack = [
      item.groomName,
      item.brideName,
      item.slug,
      item.customerName,
      item.customerPhone,
      item.paymentReference,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return matchesStatus && haystack.includes(q)
  })
})

const changeOrderStatus = async (slug: string, status: InvitationOrderStatus) => {
  updatingSlug.value = slug
  try {
    await invitationsRepository.updateStatus(slug, status)
    await refresh()
  } finally {
    updatingSlug.value = ''
  }
}

const buildWhatsAppLink = (order: InvitationItem): string => {
  const digits = (order.customerPhone || '').replace(/\D/g, '')
  const intlPhone = digits.startsWith('0') ? `2${digits}` : digits
  const origin = import.meta.client ? window.location.origin : 'http://localhost:3000'
  const link = `${origin}/invite/${order.slug}`
  const msg = encodeURIComponent(
    `أهلاً بك يا ${order.customerName || ''} في منصة دعوة (DAAWA)!\nتم تأكيد الدفع وتفعيل دعوة فرح (${order.groomName} & ${order.brideName}) بنجاح.\n\nرابط الدعوة الجاهز للمشاركة مع ضيوفك:\n${link}`
  )
  return `https://wa.me/${intlPhone}?text=${msg}`
}
</script>

