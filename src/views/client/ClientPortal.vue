<template>
  <div class="bg-bg-primary min-h-screen pt-28 pb-32 flex justify-center items-start px-6 relative overflow-hidden font-sans">
    <!-- Background Decorative Elements -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/10 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-secondary/10 blur-[120px] rounded-full"></div>

    <!-- Main Content Wrapper -->
    <div class="w-full relative z-10 flex flex-col items-center">
      <transition name="portal-fade" mode="out-in">

        <!-- LOGIN STATE -->
        <div
          v-if="!orderData"
          key="login"
          class="w-full max-w-md"
        >
          <!-- Header -->
          <div class="mb-8 relative">
            <router-link to="/" class="inline-flex items-center gap-1.5 text-text-tertiary hover:text-white transition-colors cursor-pointer text-[11px] font-black uppercase tracking-widest mb-8 group">
              <ArrowLeftIcon :size="14" class="group-hover:-translate-x-1 transition-transform" />
              Kembali ke Home
            </router-link>

            <div class="flex items-center gap-2 mb-5">
              <img src="/logo.png" alt="KangJessy Logo" class="w-8 h-8 rounded-lg object-contain" />
              <span class="text-[10px] font-black uppercase tracking-[0.25em] text-text-tertiary">KangJessy Agency</span>
            </div>
            <h1 class="text-2xl font-black text-white tracking-tight mb-2">Client Portal</h1>
            <p class="text-sm text-text-secondary leading-relaxed">
              Masukkan kode tracking untuk melihat progres proyek Anda.
            </p>
          </div>

          <!-- Form Card -->
          <div class="bg-bg-secondary border border-border-color rounded-2xl p-6 space-y-4">
            <div>
              <label class="text-[10px] font-black uppercase tracking-widest text-text-tertiary block mb-2">Order ID / Tracking Code</label>
              <div class="relative">
                <Hash class="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary shrink-0" :size="15" />
                <input
                  v-model="orderIdInput"
                  @keyup.enter="handleLogin"
                  type="text"
                  placeholder="Contoh: KJ-2025-001"
                  class="w-full bg-bg-primary border border-border-color rounded-xl py-3 pl-10 pr-4 text-white text-sm font-medium outline-none focus:border-accent-primary transition-all placeholder:text-text-tertiary/50 tracking-wider"
                  :disabled="isLoading"
                />
              </div>
            </div>

            <BaseButton
              @click="handleLogin"
              variant="primary"
              class="w-full rounded-xl py-3 font-black text-sm"
              :disabled="isLoading || !orderIdInput"
            >
              <Loader2 v-if="isLoading" class="animate-spin mr-2 shrink-0" :size="16" />
              <span v-else>Cek Status Proyek</span>
              <ArrowRightIcon v-if="!isLoading" :size="15" class="ml-1.5" />
            </BaseButton>

            <div v-if="errorMessage" class="flex items-center gap-2 p-3 bg-red-500/5 text-red-400 rounded-xl text-xs font-bold border border-red-500/10">
              <AlertCircle :size="14" class="shrink-0" /> {{ errorMessage }}
            </div>
          </div>

          <!-- Footer -->
          <div class="mt-5 text-center">
            <p class="text-xs text-text-tertiary">
              Belum punya kode?
              <a @click="popup.openModal(Popups.CHAT_WA, { category: 'Client Portal', initialMessage: 'Halo Admin! Saya ingin menanyakan kode tracking untuk Client Portal.\n\nSaya [*belum punya kode / lupa kode saya*] untuk proyek: [*nama proyek Anda*]\n\nMohon bantuannya ya 🙏' })" class="text-accent-primary font-bold hover:underline cursor-pointer">Hubungi Admin</a>
            </p>
          </div>
        </div>

        <!-- DASHBOARD STATE -->
        <div v-else key="dashboard" class="w-full max-w-7xl space-y-8 animate-fade-in-up">

          <!-- TAB NAVIGATION -->
          <div class="flex justify-center">
            <div class="inline-flex items-center p-1.5 bg-bg-secondary/40 backdrop-blur-3xl border border-white/5 rounded-2xl shadow-xl">
              <button
                @click="activeTab = 'project'"
                class="px-5 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest transition-all gap-2 flex items-center cursor-pointer"
                :class="activeTab === 'project' ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'text-text-tertiary hover:text-white'"
              >
                <Layout :size="16" /> Project Lifecycle
              </button>
              <button
                @click="activeTab = 'invoice'"
                class="px-5 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest transition-all gap-2 flex items-center cursor-pointer"
                :class="activeTab === 'invoice' ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'text-text-tertiary hover:text-white'"
              >
                <FileText :size="16" /> Billing &amp; Invoice
              </button>
            </div>
          </div>

          <!-- TAB: PROJECT MANAGEMENT -->
          <div v-if="activeTab === 'project'" class="space-y-6">
            <div class="bg-bg-secondary/40 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.4)] animate-fade-in-up">
              <header class="p-6 md:p-12 relative overflow-hidden">
                <div class="absolute -top-10 -right-10 w-64 h-64 bg-accent-primary/10 blur-[80px] rounded-full"></div>
                <div class="relative z-10 space-y-8">
                  <div class="flex items-center gap-2">
                    <span class="text-[11px] font-mono text-text-tertiary bg-bg-primary/50 px-3 py-1 rounded-lg border border-white/5">
                      ID: {{ orderData.orderId }}
                    </span>
                  </div>
                  <div class="space-y-4">
                    <h1 class="text-[clamp(1.75rem,5vw,2.75rem)] font-black text-white leading-[1.1] tracking-tight">
                      {{ orderData.projectName }}
                    </h1>
                    <div class="flex flex-wrap gap-4 md:gap-8 pt-2">
                      <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-text-tertiary">
                          <UserIcon :size="16" />
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[9px] font-black text-text-tertiary uppercase tracking-widest">Client</span>
                          <span class="text-xs font-bold text-white">{{ orderData.clientName }}</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-text-tertiary">
                          <ClockIcon :size="16" />
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[9px] font-black text-text-tertiary uppercase tracking-widest">Status</span>
                          <span class="text-xs font-bold text-white">{{ getStatusLabel(orderData.status) }}</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-emerald-500">
                          <CalendarIcon :size="16" />
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[9px] font-black text-text-tertiary uppercase tracking-widest">Start Project</span>
                          <span class="text-xs font-bold text-white">{{ orderData.startDate }}</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2.5">
                        <div class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-rose-500">
                          <CalendarIcon :size="16" />
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[9px] font-black text-text-tertiary uppercase tracking-widest">Deadline</span>
                          <span class="text-xs font-bold text-white">{{ orderData.deadline }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <!-- Two-column grid -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-12 pt-0">
                <!-- LEFT COLUMN -->
                <div class="lg:col-span-5 flex flex-col gap-6">
                  <!-- Progress Bar -->
                  <div class="bg-bg-primary/30 rounded-[32px] p-8 border border-white/5 space-y-6">
                    <div class="flex justify-between items-center">
                      <h3 class="text-xs font-black text-text-tertiary uppercase tracking-[0.2em]">Pengerjaan Selesai</h3>
                      <div class="flex items-baseline gap-1">
                        <span class="text-3xl font-black text-white italic leading-none">{{ orderData.progress }}</span>
                        <span class="text-lg font-bold text-accent-primary italic">%</span>
                      </div>
                    </div>
                    <div class="relative h-4 bg-bg-primary/50 rounded-full overflow-hidden p-1 border border-white/5">
                      <div
                        class="h-full bg-linear-to-r from-accent-primary via-blue-400 to-accent-secondary rounded-full transition-all duration-1000"
                        :style="{ width: orderData.progress + '%' }"
                      >
                        <div class="absolute inset-0 bg-white/20 blur-sm"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Assets -->
                  <div v-if="orderData.links.figma || orderData.links.github || orderData.links.drive" class="space-y-6">
                    <div class="flex items-center gap-3">
                      <h3 class="text-[10px] font-black text-text-tertiary uppercase tracking-[0.3em] whitespace-nowrap">Project Assets</h3>
                      <span class="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[8px] font-black text-amber-500 uppercase tracking-widest animate-pulse">PERLU REVIEW</span>
                      <div class="h-px bg-white/10 flex-1"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a v-if="orderData.links.figma" :href="orderData.links.figma" target="_blank" class="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent-primary/50 transition-all group">
                        <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                          <Palette :size="20" />
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-text-tertiary uppercase tracking-wider">Design File</span>
                          <span class="text-sm font-bold text-white">Figma Design System</span>
                        </div>
                        <ArrowUpRight :size="16" class="ml-auto text-text-tertiary group-hover:text-accent-primary transition-colors" />
                      </a>
                      <a v-if="orderData.links.drive" :href="orderData.links.drive" target="_blank" class="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent-primary/50 transition-all group">
                        <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                          <Folder :size="20" />
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-text-tertiary uppercase tracking-wider">Storage</span>
                          <span class="text-sm font-bold text-white">Google Drive Assets</span>
                        </div>
                        <ArrowUpRight :size="16" class="ml-auto text-text-tertiary group-hover:text-accent-primary transition-colors" />
                      </a>
                      <a v-if="orderData.links.github" :href="orderData.links.github" target="_blank" class="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent-primary/50 transition-all group col-span-1 sm:col-span-2">
                        <div class="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                          <Code :size="20" />
                        </div>
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-text-tertiary uppercase tracking-wider">Repository</span>
                          <span class="text-sm font-bold text-white">Source Code Production</span>
                        </div>
                        <ArrowUpRight :size="16" class="ml-auto text-text-tertiary group-hover:text-accent-primary transition-colors" />
                      </a>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BaseButton v-if="orderData.links.preview" :href="orderData.links.preview" target="_blank" variant="primary" class="h-16 rounded-2xl text-[1rem] font-bold shadow-xl shadow-accent-primary/20 cursor-pointer">
                      <ExternalLink :size="18" class="mr-2 shrink-0" /> Live Preview
                    </BaseButton>
                    <BaseButton @click="contactSupport" variant="secondary" class="h-16 rounded-2xl text-[1rem] font-bold border-white/10! hover:bg-white/5 cursor-pointer">
                      <MessageSquareIcon :size="18" class="mr-2 shrink-0" /> Hubungi Admin
                    </BaseButton>
                  </div>
                </div>

                <!-- RIGHT COLUMN: Timeline -->
                <div class="lg:col-span-7 bg-bg-secondary border border-border-color rounded-2xl p-6 md:p-8">
                  <!-- Header -->
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <div class="text-xs font-black text-white tracking-tight">Project Tracking</div>
                      <div class="text-[10px] text-text-tertiary mt-0.5">Status pengerjaan proyek Anda</div>
                    </div>
                    <div class="px-3 py-1.5 rounded-lg bg-bg-primary border border-border-color text-[10px] font-black uppercase tracking-widest"
                      :class="{
                        'text-green-500': orderData.status === 'done',
                        'text-amber-400': orderData.status === 'in_progress',
                        'text-text-tertiary': orderData.status === 'pending',
                      }"
                    >
                      {{ orderData.status === 'done' ? 'Selesai' : orderData.status === 'in_progress' ? 'Sedang Dikerjakan' : 'Menunggu' }}
                    </div>
                  </div>

                  <!-- Tracking Steps -->
                  <div class="relative">
                    <template v-for="(item, idx) in orderData.timeline" :key="idx">

                      <!-- PARENT STAGE -->
                      <div v-if="item.isParent" class="flex gap-4 relative">
                        <!-- Connector line (before this item) -->
                        <div v-if="idx > 0" class="absolute left-[19px] bottom-full w-0.5 h-4"
                          :class="item.status !== 'pending' ? 'bg-accent-primary' : 'bg-border-color'"
                        ></div>

                        <!-- Step Marker -->
                        <div class="relative shrink-0 flex flex-col items-center">
                          <div
                            class="w-10 h-10 rounded-xl flex items-center justify-center z-10 border-2 transition-all"
                            :class="{
                              'bg-green-500/10 border-green-500 text-green-500': item.status === 'done',
                              'bg-accent-primary border-accent-primary text-white': item.status === 'in_progress',
                              'bg-bg-primary border-border-color text-text-tertiary': item.status === 'pending',
                            }"
                          >
                            <CheckCircle2 v-if="item.status === 'done'" :size="18" />
                            <component v-else :is="getIconComponent(item.icon)" :size="18" />
                          </div>
                          <!-- Pulsing ring for active -->
                          <div v-if="item.status === 'in_progress'" class="absolute inset-0 rounded-xl border-2 border-accent-primary animate-ping opacity-30"></div>
                        </div>

                        <!-- Stage Content -->
                        <div class="flex-1 pb-2 pt-2">
                          <div class="flex items-center gap-2 flex-wrap">
                            <span
                              class="text-sm font-black leading-tight"
                              :class="{
                                'text-white': item.status !== 'pending',
                                'text-text-tertiary': item.status === 'pending',
                              }"
                            >{{ item.title }}</span>
                            <span
                              class="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border"
                              :class="{
                                'text-green-500 border-green-500/20 bg-green-500/5': item.status === 'done',
                                'text-accent-primary border-accent-primary/30 bg-accent-primary/10': item.status === 'in_progress',
                                'text-text-tertiary border-border-color opacity-50': item.status === 'pending',
                              }"
                            >
                              {{ item.status === 'done' ? 'Selesai' : item.status === 'in_progress' ? 'On Progress' : 'Waiting' }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- SUB-STEP -->
                      <div v-else class="flex gap-4 relative">
                        <!-- Connector line through sub-step -->
                        <div class="absolute left-[19px] top-0 bottom-0 w-0.5"
                          :class="item.status === 'done' ? 'bg-accent-primary' : 'bg-border-color'"
                        ></div>

                        <!-- Sub-step dot -->
                        <div class="relative z-10 shrink-0 h-9 flex items-center justify-center w-10">
                          <div
                            class="w-2.5 h-2.5 rounded-full border-2 transition-all"
                            :class="{
                              'bg-green-500 border-green-500': item.status === 'done',
                              'bg-amber-400 border-amber-400': item.status === 'in_progress',
                              'bg-bg-primary border-border-color': item.status === 'pending',
                            }"
                          ></div>
                        </div>

                        <!-- Sub-step label -->
                        <div class="flex-1 flex items-center h-9">
                          <span
                            class="text-xs font-bold"
                            :class="{
                              'text-white': item.status === 'done',
                              'text-amber-400': item.status === 'in_progress',
                              'text-text-tertiary': item.status === 'pending',
                            }"
                          >{{ item.title }}</span>
                          <span v-if="item.status === 'in_progress'" class="ml-2 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        </div>
                      </div>

                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB: INVOICE & BILLING -->
          <div v-else-if="activeTab === 'invoice'" class="max-w-5xl w-full mx-auto space-y-6 animate-fade-in-up">

            <!-- INVOICE DOCUMENT CARD -->
            <div class="bg-bg-secondary/40 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.4)]">

              <!-- Invoice Header -->
              <div class="p-8 md:p-12 border-b border-white/5">
                <div class="flex flex-col sm:flex-row justify-between items-start gap-6">
                  <div>
                    <div class="text-[10px] font-black tracking-[0.4em] text-text-tertiary uppercase mb-2">KangJessy Agency</div>
                    <div class="text-[clamp(2rem,6vw,3.5rem)] font-black text-white leading-none tracking-tight">INVOICE</div>
                    <div class="mt-3 flex items-center gap-2">
                      <span class="font-mono text-xs text-text-tertiary bg-white/5 border border-white/10 px-3 py-1 rounded-lg">#{{ orderData.orderId }}</span>
                      <span
                        class="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border"
                        :class="{
                          'bg-emerald-500/10 text-emerald-500 border-emerald-500/20': orderData.paymentStatus === 'paid',
                          'bg-amber-500/10 text-amber-500 border-amber-500/20': orderData.paymentStatus === 'partial',
                          'bg-rose-500/10 text-rose-500 border-rose-500/20': orderData.paymentStatus === 'pending',
                        }"
                      >
                        {{ orderData.paymentStatus === 'paid' ? 'Lunas' : orderData.paymentStatus === 'partial' ? 'Bayar Sebagian' : 'Belum Bayar' }}
                      </span>
                    </div>
                  </div>
                  <div class="text-left sm:text-right space-y-1.5 shrink-0">
                    <div class="text-[10px] font-black text-text-tertiary uppercase tracking-widest">Tagihan Kepada</div>
                    <div class="text-lg font-black text-white">{{ orderData.clientName }}</div>
                    <div class="text-xs text-text-tertiary">{{ orderData.orderId }}</div>
                    <div class="flex flex-col text-xs text-text-secondary pt-1 gap-0.5">
                      <span><span class="text-text-tertiary font-bold">Mulai:</span> {{ orderData.startDate }}</span>
                      <span><span class="text-text-tertiary font-bold">Deadline:</span> {{ orderData.deadline }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Invoice Line Items -->
              <div class="p-8 md:p-12">
                <div class="mb-2 grid grid-cols-[1fr_auto] gap-4 pb-3 border-b border-white/5">
                  <span class="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Deskripsi Layanan</span>
                  <span class="text-[10px] font-black uppercase tracking-widest text-text-tertiary text-right">Nilai</span>
                </div>
                <div class="py-5 grid grid-cols-[1fr_auto] gap-4 border-b border-white/5">
                  <div>
                    <div class="font-black text-white text-base">{{ orderData.projectName }}</div>
                    <div class="text-xs text-text-tertiary mt-1">{{ orderData.orderDetail?.packageType || 'Custom Development Package' }}</div>
                    <div v-if="orderData.orderDetail?.features?.length" class="flex flex-wrap gap-2 mt-3">
                      <span
                        v-for="f in orderData.orderDetail.features"
                        :key="f"
                        class="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-accent-primary/10 text-accent-primary border border-accent-primary/20 rounded-md"
                      >{{ f }}</span>
                    </div>
                  </div>
                  <div class="text-white font-bold text-right text-sm shrink-0">{{ formatCurrency(orderData.price) }}</div>
                </div>

                <!-- Totals -->
                <div class="pt-6 space-y-3">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-text-tertiary font-bold">Subtotal</span>
                    <span class="text-white font-bold">{{ formatCurrency(orderData.price) }}</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-emerald-500 font-bold">Sudah Dibayar</span>
                    <span class="text-emerald-500 font-bold">- {{ formatCurrency(orderData.paidAmount) }}</span>
                  </div>
                  <div class="flex justify-between items-center pt-4 border-t border-white/10">
                    <span class="text-white font-black text-base uppercase tracking-wider">Sisa Tagihan</span>
                    <span class="text-2xl font-black" :class="orderData.paymentStatus === 'paid' ? 'text-emerald-500' : 'text-rose-400'">
                      {{ formatCurrency(orderData.price - orderData.paidAmount) }}
                    </span>
                  </div>
                </div>

                <!-- Payment Status Bar -->
                <div class="mt-8 bg-bg-primary/30 rounded-2xl p-5 border border-white/5">
                  <div class="flex justify-between text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-3">
                    <span>Progress Pembayaran</span>
                    <span>{{ Math.round((orderData.paidAmount / orderData.price) * 100) }}%</span>
                  </div>
                  <div class="h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-linear-to-r from-emerald-500 to-accent-primary rounded-full transition-all duration-1000"
                      :style="{ width: Math.round((orderData.paidAmount / orderData.price) * 100) + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="mt-8 space-y-3">
                  <!-- Payment Template Selector -->
                  <div v-if="showPaymentMenu" class="bg-bg-primary border border-border-color rounded-2xl overflow-hidden">
                    <div class="px-4 py-3 border-b border-border-color">
                      <span class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Pilih Template Pesan</span>
                    </div>
                    <div class="divide-y divide-border-color/50">
                      <button
                        @click="sendPaymentTemplate('full')"
                        class="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-bg-secondary/50 transition-all text-left group cursor-pointer"
                      >
                        <div class="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 :size="14" class="text-emerald-500" />
                        </div>
                        <div>
                          <div class="text-xs font-black text-white group-hover:text-emerald-400 transition-colors">Bayar Lunas</div>
                          <div class="text-[10px] text-text-tertiary mt-0.5">Konfirmasi pelunasan seluruh sisa tagihan</div>
                        </div>
                      </button>
                      <button
                        @click="sendPaymentTemplate('partial')"
                        class="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-bg-secondary/50 transition-all text-left group cursor-pointer"
                      >
                        <div class="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CreditCard :size="14" class="text-amber-500" />
                        </div>
                        <div>
                          <div class="text-xs font-black text-white group-hover:text-amber-400 transition-colors">Bayar Sebagian</div>
                          <div class="text-[10px] text-text-tertiary mt-0.5">Konfirmasi pembayaran DP atau cicilan</div>
                        </div>
                      </button>
                      <button
                        @click="sendPaymentTemplate('inquiry')"
                        class="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-bg-secondary/50 transition-all text-left group cursor-pointer"
                      >
                        <div class="w-7 h-7 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <MessageSquareIcon :size="14" class="text-accent-primary" />
                        </div>
                        <div>
                          <div class="text-xs font-black text-white group-hover:text-accent-primary transition-colors">Tanya-tanya Dulu</div>
                          <div class="text-[10px] text-text-tertiary mt-0.5">Ada pertanyaan seputar tagihan atau proyek</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <button @click="printInvoice" class="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all active:scale-95 cursor-pointer">
                      <Printer :size="18" /> Cetak Invoice
                    </button>
                    <button
                      @click="showPaymentMenu = !showPaymentMenu"
                      class="flex items-center justify-center gap-2 font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95 cursor-pointer"
                      :class="showPaymentMenu ? 'bg-white/10 text-white border border-white/20' : 'bg-accent-primary hover:bg-accent-secondary text-white shadow-accent-primary/20'"
                    >
                      <CreditCard :size="18" />
                      {{ showPaymentMenu ? 'Tutup' : 'Konfirmasi Bayar' }}
                      <ChevronDown :size="14" class="transition-transform" :class="showPaymentMenu ? 'rotate-180' : ''" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- ORDER DETAIL ACCORDION -->
            <div v-if="orderData.orderDetail" class="bg-bg-secondary/40 backdrop-blur-3xl border border-white/5 rounded-[32px] overflow-hidden">
              <!-- Accordion Trigger -->
              <button
                @click="isOrderDetailOpen = !isOrderDetailOpen"
                class="w-full flex items-center justify-between p-6 md:p-8 cursor-pointer hover:bg-white/5 transition-all group"
              >
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                    <FileText :size="20" />
                  </div>
                  <div class="text-left">
                    <div class="font-black text-white text-sm">Detail Orderan</div>
                    <div class="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mt-0.5">Data dari form pemesanan klien</div>
                  </div>
                </div>
                <div
                  class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300"
                  :class="isOrderDetailOpen ? 'rotate-180 bg-accent-primary/10 border-accent-primary/20' : 'group-hover:bg-white/10'"
                >
                  <ChevronDown :size="16" class="text-text-tertiary" />
                </div>
              </button>

              <!-- Accordion Content -->
              <div v-if="isOrderDetailOpen" class="px-6 md:px-8 pb-8 border-t border-white/5 space-y-5 pt-6">
                <!-- Grid Info Fields -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="p-4 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-1">
                    <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Nama Lengkap</div>
                    <div class="text-sm font-bold text-white">{{ orderData.orderDetail.name }}</div>
                  </div>
                  <div class="p-4 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-1">
                    <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Perusahaan</div>
                    <div class="text-sm font-bold text-white">{{ orderData.orderDetail.company || '-' }}</div>
                  </div>
                  <div class="p-4 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-1">
                    <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Email</div>
                    <div class="text-sm font-bold text-white">{{ orderData.orderDetail.email }}</div>
                  </div>
                  <div class="p-4 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-1">
                    <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">WhatsApp</div>
                    <div class="text-sm font-bold text-white">{{ orderData.orderDetail.phone }}</div>
                  </div>
                  <div class="p-4 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-1">
                    <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Status Website</div>
                    <div class="text-sm font-bold text-white">{{ orderData.orderDetail.websiteStatus === 'yes' ? 'Sudah punya website' : 'Buat website baru' }}</div>
                  </div>
                  <div class="p-4 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-1">
                    <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Domain</div>
                    <div class="text-sm font-bold text-white">{{ orderData.orderDetail.domain || '-' }}</div>
                  </div>
                  <div class="p-4 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-1">
                    <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Paket Dipilih</div>
                    <div class="text-sm font-bold text-white">{{ orderData.orderDetail.packageType || '-' }}</div>
                  </div>
                  <div class="p-4 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-1">
                    <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Visual Style</div>
                    <div class="text-sm font-bold text-white">{{ orderData.orderDetail.visualStyle || '-' }}</div>
                  </div>
                  <div class="p-4 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-1">
                    <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Timeline / Deadline</div>
                    <div class="text-sm font-bold text-white">{{ orderData.orderDetail.timeline || '-' }}</div>
                  </div>
                  <div v-if="orderData.orderDetail.reference" class="p-4 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-1">
                    <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Link Referensi</div>
                    <a :href="orderData.orderDetail.reference" target="_blank" class="text-sm font-bold text-accent-primary hover:underline truncate block">{{ orderData.orderDetail.reference }}</a>
                  </div>
                </div>

                <!-- Brief Proyek (Full Width) -->
                <div class="p-5 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-2">
                  <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Brief Proyek</div>
                  <p class="text-sm text-text-secondary leading-relaxed">{{ orderData.orderDetail.brief }}</p>
                </div>

                <!-- Fitur Tambahan (Full Width) -->
                <div v-if="orderData.orderDetail.features?.length" class="p-5 bg-bg-primary/30 rounded-2xl border border-white/5 space-y-3">
                  <div class="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Fitur Tambahan</div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="f in orderData.orderDetail.features"
                      :key="f"
                      class="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 bg-accent-primary/10 text-accent-primary border border-accent-primary/20 rounded-xl"
                    >{{ f }}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Logout Button -->
          <button
            @click="orderData = null"
            class="w-full py-6 text-[10px] font-black uppercase tracking-[0.5em] text-text-tertiary hover:text-white transition-all opacity-40 hover:opacity-100 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <div class="h-px w-8 bg-white/10 group-hover:w-12 transition-all"></div>
            <span>Keluar Portal</span>
            <div class="h-px w-8 bg-white/10 group-hover:w-12 transition-all"></div>
          </button>
        </div>

      </transition>
    </div>

    <!-- INVOICE PRINT TEMPLATE (HIDDEN ON SCREEN) -->
    <div v-if="orderData" class="hidden print:block print-container bg-white text-black p-10 font-sans">
      <div class="flex justify-between items-start border-b-2 border-slate-200 pb-8 mb-8">
        <div>
          <h1 class="text-3xl font-black text-slate-900 mb-1">INVOICE</h1>
          <p class="text-slate-500 font-mono text-sm leading-none">ORDER ID: #{{ orderData.orderId }}</p>
        </div>
        <div class="text-right">
          <h2 class="text-xl font-bold text-slate-900">KangJessy Agency</h2>
          <p class="text-sm text-slate-500">Premium Digital Solutions</p>
          <p class="text-xs text-slate-400">www.kangjessy.com</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-10 mb-12">
        <div>
          <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Billed To</h3>
          <p class="font-bold text-slate-800 text-lg leading-tight">{{ orderData.clientName }}</p>
          <p class="text-slate-500 text-sm mt-1">Project: {{ orderData.projectName }}</p>
        </div>
        <div class="text-right">
          <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Billing Details</h3>
          <p class="text-sm text-slate-600"><span class="font-bold">Start:</span> {{ orderData.startDate }}</p>
          <p class="text-sm text-slate-600"><span class="font-bold">Deadline:</span> {{ orderData.deadline }}</p>
        </div>
      </div>
      <table class="w-full mb-12">
        <thead>
          <tr class="border-b-2 border-slate-100 text-left">
            <th class="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
            <th class="py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-slate-50">
            <td class="py-5">
              <p class="font-bold text-slate-800">{{ orderData.projectName }}</p>
              <p class="text-xs text-slate-500 mt-1">Development &amp; Implementation Services</p>
            </td>
            <td class="py-5 text-right font-bold text-slate-800">{{ formatCurrency(orderData.price) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end">
        <div class="w-64 space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Total Project Value</span>
            <span class="text-slate-800 font-bold">{{ formatCurrency(orderData.price) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-slate-500">Total Paid</span>
            <span class="text-emerald-600 font-bold">- {{ formatCurrency(orderData.paidAmount) }}</span>
          </div>
          <div class="flex justify-between border-t border-slate-200 pt-3">
            <span class="font-black text-slate-900">REMAINING BALANCE</span>
            <span class="font-black text-rose-600">{{ formatCurrency(orderData.price - orderData.paidAmount) }}</span>
          </div>
        </div>
      </div>
      <div class="mt-20 pt-10 border-t border-slate-100 text-center">
        <p class="text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest font-bold">
          Thank you for choosing KangJessy Agency.<br />
          All payments are non-refundable after project starts.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  Search,
  Hash,
  Loader2,
  AlertCircle,
  ExternalLink,
  User as UserIcon,
  MessageSquare as MessageSquareIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  CheckCircle2,
  Zap,
  Folder,
  Layout,
  Code,
  Rocket,
  CheckCircle,
  Sparkles,
  FileText,
  Palette,
  CreditCard,
  Printer,
  ChevronDown,
  ArrowUpRight,
} from "lucide-vue-next";

import { BaseButton } from "@kangjessy/ui";
import { usePopupManager, Popups } from "../../composables/usePopupManager";
import { useSEO } from "../../composables/useSEO";

useSEO({
  title: "Project Tracking Portal",
  description:
    "Pantau progres proyek digital Anda secara real-time dari satu dashboard terpusat.",
  url: "/portal",
});

const availableIcons = {
  Folder,
  MessageSquare: MessageSquareIcon,
  Layout,
  Code,
  Search,
  Rocket,
  CheckCircle,
  Sparkles,
  FileText,
  Palette,
  Zap,
};

interface OrderData {
  orderId: string;
  projectName: string;
  clientName: string;
  status: string;
  progress: number;
  startDate: string;
  deadline: string;
  timeline: {
    title: string;
    status: "done" | "in_progress" | "pending";
    icon?: string;
    isParent: boolean;
  }[];
  price: number;
  paidAmount: number;
  paymentStatus: string;
  links: {
    preview?: string;
    figma?: string;
    github?: string;
    drive?: string;
    invoice?: string;
  };
  orderDetail?: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    websiteStatus?: string;
    domain?: string;
    reference?: string;
    brief: string;
    packageType?: string;
    features?: string[];
    visualStyle?: string;
    timeline?: string;
  };
}

const route = useRoute();
const orderIdInput = ref("");
const isLoading = ref(false);
const orderData = ref<OrderData | null>(null);
const errorMessage = ref("");
const activeTab = ref<'project' | 'invoice'>('project');
const isOrderDetailOpen = ref(false);
const showPaymentMenu = ref(false);
const popup = usePopupManager();

const getIconComponent = (name?: string) => {
  return availableIcons[name as keyof typeof availableIcons] || Zap;
};

const contactSupport = () => {
  if (!orderData.value) return;
  popup.openModal(Popups.CHAT_WA, {
    category: "Project Support",
    initialMessage: `Halo Kang Jessy! Saya ingin bertanya mengenai perkembangan proyek saya "${orderData.value.projectName}" (ID: ${orderData.value.orderId}).`,
  });
};

const sendPaymentTemplate = (type: 'full' | 'partial' | 'inquiry') => {
  if (!orderData.value) return;
  showPaymentMenu.value = false;
  const remaining = orderData.value.price - orderData.value.paidAmount;
  const id = orderData.value.orderId;
  const name = orderData.value.projectName;

  const messages = {
    full: `Halo Admin! Saya ingin konfirmasi *PELUNASAN PENUH* untuk project berikut:\n\n*Proyek:* ${name}\n*Order ID:* ${id}\n*Nominal Lunas:* ${formatCurrency(remaining)}\n\nBukti transfer saya lampirkan setelah ini. Mohon dikonfirmasi ya 🙏`,
    partial: `Halo Admin! Saya ingin kirim *PEMBAYARAN SEBAGIAN* untuk project berikut:\n\n*Proyek:* ${name}\n*Order ID:* ${id}\n*Sisa Tagihan:* ${formatCurrency(remaining)}\n\nSaya akan transfer sejumlah [*isi nominal*] terlebih dahulu. Bukti transfer saya lampirkan setelah ini.`,
    inquiry: `Halo Admin! Saya ada pertanyaan terkait tagihan/proyek:\n\n*Proyek:* ${name}\n*Order ID:* ${id}\n\n[*Tuliskan pertanyaan Anda di sini*]`,
  };

  popup.openModal(Popups.CHAT_WA, {
    category: "Payment Confirmation",
    initialMessage: messages[type],
  });
};

const printInvoice = () => {
  window.print();
};

const handleLogin = async (manualId?: string | Event) => {
  let targetId = "";
  if (typeof manualId === "string") {
    targetId = manualId;
  } else {
    targetId = orderIdInput.value;
  }

  if (!targetId) return;

  isLoading.value = true;
  errorMessage.value = "";

  // Simulate network delay for UX
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // DUMMY DATA INJECTION (Bypassing Backend temporarily)
    orderData.value = {
      orderId: targetId.toUpperCase(),
      projectName: "Corporate Portal Revamp",
      clientName: "PT Bintang Sejahtera",
      status: "in_progress",
      progress: 65,
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      price: 12500000,
      paidAmount: 6250000,
      paymentStatus: "partial",
      timeline: [
        { title: "Wireframing & UI/UX Design", status: "done", icon: "Palette", isParent: true },
        { title: "A/B Testing Konsep", status: "done", isParent: false },
        { title: "Frontend Framework & Structure", status: "in_progress", icon: "Layout", isParent: true },
        { title: "Responsive Layouting", status: "done", isParent: false },
        { title: "Integrasi Supabase & CMS", status: "in_progress", isParent: false },
        { title: "Beta Testing & QA", status: "pending", icon: "CheckCircle", isParent: true },
        { title: "Production Deployment", status: "pending", icon: "Rocket", isParent: true }
      ],
      links: {
        preview: "https://demo.kangjessy.com/corporate",
        figma: "https://figma.com/design/example",
        github: "https://github.com/example/repo",
        drive: "https://drive.google.com/drive/folders/example"
      },
      orderDetail: {
        name: "Budi Santoso",
        email: "budi@bintangsejahtera.co.id",
        phone: "08123456789",
        company: "PT Bintang Sejahtera",
        websiteStatus: "no",
        domain: "bintangsejahtera.co.id",
        reference: "https://dribbble.com/shots/example",
        brief: "Kami membutuhkan portal internal berbasis web untuk mengelola data karyawan, absensi, dan laporan bulanan. Tampilannya harus modern, responsif, dan mudah digunakan oleh semua level jabatan.",
        packageType: "Web App Premium",
        features: ["Dashboard Analytics", "Multi-role Login", "Export PDF"],
        visualStyle: "Dark Corporate",
        timeline: "Standard (3-4 minggu)"
      }
    };
  } catch (e: any) {
    console.error(e);
    errorMessage.value = "Terjadi gangguan sistem.";
  } finally {
    isLoading.value = false;
  }
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: "Antrian",
    in_progress: "Development",
    review: "Final Review",
    done: "Completed",
  };
  return labels[status] || status;
};

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(v);

onMounted(() => {
  window.scrollTo(0, 0);

  // Auto-login from query param
  const qId = route.query.id as string;
  if (qId) {
    orderIdInput.value = qId;
    handleLogin(qId);
  }
});
</script>

<style scoped>
.portal-fade-enter-active,
.portal-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.portal-fade-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}

.portal-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.98);
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}

@media print {
  @page {
    size: A4;
    margin: 0;
  }

  body * {
    visibility: hidden;
  }

  .print-container,
  .print-container * {
    visibility: visible;
  }

  .print-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 210mm; /* A4 width */
    height: 297mm; /* A4 height */
    z-index: 10000;
    background: white !important;
    padding: 2cm !important;
  }

  /* Reset colors for printing */
  .text-white {
    color: black !important;
  }
  .text-slate-400 {
    color: #94a3b8 !important;
  }
  .text-slate-500 {
    color: #64748b !important;
  }
  .text-slate-600 {
    color: #475569 !important;
  }
  .text-slate-800 {
    color: #1e293b !important;
  }
  .text-slate-900 {
    color: #0f172a !important;
  }
  .bg-white {
    background-color: white !important;
  }
  .border-slate-100 {
    border-color: #f1f5f9 !important;
  }
  .border-slate-200 {
    border-color: #e2e8f0 !important;
  }
  .text-emerald-600 {
    color: #059669 !important;
  }
  .text-rose-600 {
    color: #e11d48 !important;
  }
}
</style>
