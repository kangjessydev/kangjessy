<template>
  <div
    class="bg-bg-primary min-h-screen pt-28 pb-32 flex justify-center items-start px-6 relative overflow-hidden font-sans"
  >
    <!-- Background Decorative Elements -->
    <div
      class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/10 blur-[120px] rounded-full"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-secondary/10 blur-[120px] rounded-full"
    ></div>

    <div class="w-full max-w-2xl relative z-10 animate-fade-in-up">
      <!-- Login State -->
      <transition name="portal-fade" mode="out-in">
        <div
          v-if="!orderData"
          class="bg-bg-secondary/40 backdrop-blur-3xl border border-white/5 rounded-[48px] p-8 sm:p-10 md:p-16 text-center space-y-10 shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
          key="login"
        >
          <div class="space-y-6">
            <div
              class="inline-flex p-4 bg-accent-primary/10 rounded-[24px] mb-2 transform -rotate-3 hover:rotate-0 transition-transform duration-500"
            >
              <Search :size="42" class="text-accent-primary" />
            </div>
            <h1
              class="text-[clamp(2.5rem,8vw,3.5rem)] font-black text-white tracking-tight leading-[1.2] py-2"
            >
              Client
              <span
                class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent italic pr-2"
                >Portal</span
              >
            </h1>
            <p
              class="text-text-secondary leading-relaxed max-w-sm mx-auto text-[1rem] font-medium opacity-80"
            >
              Pantau progres proyek digital Anda secara real-time dari satu
              dashboard terpusat.
            </p>
          </div>

          <div class="space-y-4 max-w-sm mx-auto">
            <div class="relative group">
              <div
                class="absolute inset-x-0 -bottom-1 h-px bg-linear-to-r from-transparent via-accent-primary/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700"
              ></div>
              <Hash
                class="absolute left-6 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-accent-primary transition-colors shrink-0"
                :size="20"
              />
              <input
                v-model="orderIdInput"
                @keyup.enter="handleLogin"
                type="text"
                placeholder="Tracking ID: KJ-XXXX"
                class="w-full bg-bg-primary/40 border border-white/5 rounded-[24px] py-6 pl-16 pr-6 text-white font-bold text-lg outline-none focus:bg-bg-primary/60 transition-all text-center tracking-widest placeholder:tracking-normal placeholder:font-medium placeholder:opacity-30"
                :disabled="isLoading"
              />
            </div>
            <BaseButton
              @click="handleLogin"
              variant="primary"
              size="lg"
              class="w-full h-[68px] rounded-[24px] text-lg font-black shadow-2xl shadow-accent-primary/20 hover:shadow-accent-primary/40 group overflow-hidden"
              :disabled="isLoading || !orderIdInput"
            >
              <div class="relative z-10 flex items-center justify-center">
                <Loader2
                  v-if="isLoading"
                  class="animate-spin mr-3 shrink-0"
                  :size="24"
                />
                <span v-else>Masuk ke Dashboard</span>
                <ArrowRightIcon
                  v-if="!isLoading"
                  :size="20"
                  class="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </BaseButton>
          </div>

          <div
            v-if="errorMessage"
            class="p-5 bg-red-500/10 text-red-400 rounded-2xl text-[0.8rem] font-bold border border-red-500/20 max-w-sm mx-auto animate-shake"
          >
            <div class="flex items-center justify-center gap-2">
              <AlertCircle :size="16" class="shrink-0" /> {{ errorMessage }}
            </div>
          </div>

          <div class="pt-6 border-t border-white/5">
            <p class="text-[0.75rem] text-text-tertiary font-medium">
              Butuh bantuan?
              <a
                @click="popup.openModal(Popups.CHAT_WA)"
                class="text-accent-primary font-bold hover:underline cursor-pointer"
                >Hubungi Support</a
              >
            </p>
          </div>
        </div>

        <!-- Dashboard State -->
        <div v-else class="space-y-6" key="dashboard">
          <!-- Project Overview Card -->
          <div
            class="bg-bg-secondary/40 backdrop-blur-3xl border border-white/5 rounded-[40px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.4)] animate-fade-in-up"
          >
            <header class="p-6 md:p-12 relative overflow-hidden">
              <!-- Background Accent -->
              <div
                class="absolute -top-10 -right-10 w-64 h-64 bg-accent-primary/10 blur-[80px] rounded-full"
              ></div>

              <div class="relative z-10 space-y-8">
                <div class="flex items-center gap-2">
                  <button
                    @click="showFinanceModal = true"
                    class="flex items-center gap-2 bg-accent-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-accent-secondary transition-all shadow-lg shadow-accent-primary/20"
                  >
                    <CreditCard :size="14" /> Billing Info
                  </button>
                  <span
                    class="text-[11px] font-mono text-text-tertiary bg-bg-primary/50 px-3 py-1 rounded-lg border border-white/5"
                  >
                    ID: {{ orderData.orderId }}
                  </span>
                </div>

                <div class="space-y-4">
                  <h1
                    class="text-[clamp(1.75rem,5vw,2.75rem)] font-black text-white leading-[1.1] tracking-tight"
                  >
                    {{ orderData.projectName }}
                  </h1>

                  <div class="flex flex-wrap gap-4 md:gap-8 pt-2">
                    <div class="flex items-center gap-2.5">
                      <div
                        class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-accent-primary"
                      >
                        <UserIcon :size="16" />
                      </div>
                      <div class="flex flex-col">
                        <span
                          class="text-[9px] font-black text-text-tertiary uppercase tracking-widest"
                          >Client</span
                        >
                        <span class="text-xs font-bold text-white">{{
                          orderData.clientName
                        }}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2.5">
                      <div
                        class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-accent-primary"
                      >
                        <ClockIcon :size="16" />
                      </div>
                      <div class="flex flex-col">
                        <span
                          class="text-[9px] font-black text-text-tertiary uppercase tracking-widest"
                          >Status</span
                        >
                        <span class="text-xs font-bold text-white uppercase">{{
                          getStatusLabel(orderData.status)
                        }}</span>
                      </div>
                    </div>
                    <!-- Project Dates -->
                    <div class="flex items-center gap-2.5">
                      <div
                        class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-emerald-500"
                      >
                        <CalendarIcon :size="16" />
                      </div>
                      <div class="flex flex-col">
                        <span
                          class="text-[9px] font-black text-text-tertiary uppercase tracking-widest"
                          >Start Project</span
                        >
                        <span class="text-xs font-bold text-white">{{
                          orderData.startDate
                        }}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2.5">
                      <div
                        class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-rose-500"
                      >
                        <CalendarIcon :size="16" />
                      </div>
                      <div class="flex flex-col">
                        <span
                          class="text-[9px] font-black text-text-tertiary uppercase tracking-widest"
                          >Deadline</span
                        >
                        <span class="text-xs font-bold text-white">{{
                          orderData.deadline
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <!-- Progress Section -->
            <div class="px-6 md:px-12 pb-12 space-y-10">
              <div
                class="bg-bg-primary/30 rounded-[32px] p-8 border border-white/5 space-y-6"
              >
                <div class="flex justify-between items-center">
                  <h3
                    class="text-xs font-black text-text-tertiary uppercase tracking-[0.2em]"
                  >
                    Pengerjaan Selesai
                  </h3>
                  <div class="flex items-baseline gap-1">
                    <span
                      class="text-3xl font-black text-white italic leading-none"
                      >{{ orderData.progress }}</span
                    >
                    <span class="text-lg font-bold text-accent-primary italic"
                      >%</span
                    >
                  </div>
                </div>

                <div
                  class="relative h-4 bg-bg-primary/50 rounded-full overflow-hidden p-1 border border-white/5"
                >
                  <div
                    class="h-full bg-linear-to-r from-accent-primary via-blue-400 to-accent-secondary rounded-full transition-all duration-1000"
                    :style="{ width: orderData.progress + '%' }"
                  >
                    <div class="absolute inset-0 bg-white/20 blur-sm"></div>
                  </div>
                </div>
              </div>

              <!-- Project Assets Card (NEW ENHANCEMENT) -->
              <div
                v-if="
                  orderData.links.figma ||
                  orderData.links.github ||
                  orderData.links.drive
                "
                class="space-y-6"
              >
                <div class="flex items-center gap-3">
                  <h3
                    class="text-[10px] font-black text-text-tertiary uppercase tracking-[0.3em] whitespace-nowrap"
                  >
                    Project Assets
                  </h3>
                  <span
                    class="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[8px] font-black text-amber-500 uppercase tracking-widest animate-pulse"
                    >PERLU REVIEW</span
                  >
                  <div class="h-px bg-white/10 flex-1"></div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    v-if="orderData.links.figma"
                    :href="orderData.links.figma"
                    target="_blank"
                    class="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent-primary/50 transition-all group"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform"
                    >
                      <Palette :size="20" />
                    </div>
                    <div class="flex flex-col">
                      <span
                        class="text-[10px] font-black text-text-tertiary uppercase tracking-wider"
                        >Design File</span
                      >
                      <span class="text-sm font-bold text-white"
                        >Figma Design System</span
                      >
                    </div>
                    <ArrowUpRight
                      :size="16"
                      class="ml-auto text-text-tertiary group-hover:text-accent-primary transition-colors"
                    />
                  </a>

                  <a
                    v-if="orderData.links.drive"
                    :href="orderData.links.drive"
                    target="_blank"
                    class="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent-primary/50 transition-all group"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform"
                    >
                      <Folder :size="20" />
                    </div>
                    <div class="flex flex-col">
                      <span
                        class="text-[10px] font-black text-text-tertiary uppercase tracking-wider"
                        >Storage</span
                      >
                      <span class="text-sm font-bold text-white"
                        >Google Drive Assets</span
                      >
                    </div>
                    <ArrowUpRight
                      :size="16"
                      class="ml-auto text-text-tertiary group-hover:text-accent-primary transition-colors"
                    />
                  </a>

                  <a
                    v-if="orderData.links.github"
                    :href="orderData.links.github"
                    target="_blank"
                    class="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent-primary/50 transition-all group col-span-1 sm:col-span-2"
                  >
                    <div
                      class="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform"
                    >
                      <Code :size="20" />
                    </div>
                    <div class="flex flex-col">
                      <span
                        class="text-[10px] font-black text-text-tertiary uppercase tracking-wider"
                        >Repository</span
                      >
                      <span class="text-sm font-bold text-white"
                        >Source Code Production</span
                      >
                    </div>
                    <ArrowUpRight
                      :size="16"
                      class="ml-auto text-text-tertiary group-hover:text-accent-primary transition-colors"
                    />
                  </a>
                </div>
              </div>

              <!-- Timeline Design -->
              <div class="space-y-12 relative">
                <div class="flex items-center gap-3">
                  <div class="h-px bg-white/10 flex-1"></div>
                  <h3
                    class="text-[10px] font-black text-text-tertiary uppercase tracking-[0.3em] whitespace-nowrap"
                  >
                    Project Roadmap
                  </h3>
                  <div class="h-px bg-white/10 flex-1"></div>
                </div>

                <div class="relative">
                  <!-- Vertical Line Track (Pin-point Precision) -->
                  <div
                    class="absolute left-[23px] top-6 bottom-6 w-[2px] bg-white/5 rounded-full overflow-hidden"
                  >
                    <div
                      class="w-full bg-accent-primary transition-all duration-1000 origin-top shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      :style="{ height: orderData.progress + '%' }"
                    ></div>
                  </div>

                  <div class="space-y-0">
                    <div
                      v-for="(item, idx) in orderData.timeline"
                      :key="idx"
                      class="flex gap-6 relative group"
                      :class="[item.isParent ? 'pt-12 first:pt-0' : 'py-2']"
                    >
                      <!-- Timeline Node (Perfectly Centered) -->
                      <div
                        class="relative z-10 w-[48px] flex items-start justify-center shrink-0"
                      >
                        <!-- Category Icon -->
                        <div
                          v-if="item.isParent"
                          class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 shadow-2xl bg-bg-secondary border z-20"
                          :class="{
                            'text-green-500 border-green-500/40 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.1)]':
                              item.status === 'done',
                            'text-amber-400 border-amber-400/40 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.1)]':
                              item.status === 'in_progress',
                            'text-text-tertiary border-white/5 bg-bg-primary':
                              item.status === 'pending',
                          }"
                        >
                          <CheckCircle2
                            v-if="item.status === 'done'"
                            :size="20"
                          />
                          <component
                            v-else
                            :is="getIconComponent(item.icon)"
                            :size="20"
                            :class="
                              item.status === 'in_progress'
                                ? 'animate-pulse'
                                : ''
                            "
                          />
                        </div>
                        <!-- Sub-task Bullet -->
                        <div
                          v-else
                          class="w-4 h-4 mt-3 rounded-full border-2 transition-all duration-500 z-20"
                          :class="{
                            'bg-green-500 border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]':
                              item.status === 'done',
                            'bg-bg-primary border-white/20':
                              item.status === 'pending',
                          }"
                        ></div>
                      </div>

                      <!-- Content Card -->
                      <div
                        class="flex-1"
                        :class="item.isParent ? 'pt-2.5' : 'pt-2'"
                      >
                        <div class="flex flex-col gap-1.5">
                          <div class="flex items-center gap-2">
                            <h4
                              class="font-black group-hover:text-accent-primary transition-colors tracking-tight leading-tight"
                              :class="[
                                item.isParent
                                  ? 'text-lg md:text-xl'
                                  : 'text-sm md:text-base font-bold',
                                item.status === 'pending'
                                  ? 'text-text-tertiary'
                                  : 'text-white',
                              ]"
                            >
                              {{ item.title }}
                            </h4>
                          </div>

                          <div class="flex items-center gap-2.5">
                            <template v-if="item.isParent">
                              <span
                                class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border"
                                :class="{
                                  'text-green-500 border-green-500/20 bg-green-500/5':
                                    item.status === 'done',
                                  'text-amber-400 border-amber-400/20 bg-amber-400/5':
                                    item.status === 'in_progress',
                                  'text-text-tertiary border-white/5 opacity-50':
                                    item.status === 'pending',
                                }"
                              >
                                {{
                                  item.status === "done"
                                    ? "Stage Completed"
                                    : item.status === "in_progress"
                                      ? "Active Phase"
                                      : "Waiting"
                                }}
                              </span>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dashboard Footer Actions -->
            <footer
              class="p-8 md:p-10 bg-white/5 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <BaseButton
                v-if="orderData.links.preview"
                :href="orderData.links.preview"
                target="_blank"
                variant="primary"
                class="h-16 rounded-2xl text-[1rem] font-bold shadow-xl shadow-accent-primary/20 cursor-pointer"
              >
                <ExternalLink :size="18" class="mr-2 shrink-0" /> Live Preview
              </BaseButton>
              <BaseButton
                @click="contactSupport"
                variant="secondary"
                class="h-16 rounded-2xl text-[1rem] font-bold border-white/10! hover:bg-white/5 cursor-pointer"
              >
                <MessageSquareIcon :size="18" class="mr-2 shrink-0" /> Hubungi
                Admin
              </BaseButton>
            </footer>
          </div>

          <button
            @click="orderData = null"
            class="w-full py-6 text-[10px] font-black uppercase tracking-[0.5em] text-text-tertiary hover:text-white transition-all opacity-40 hover:opacity-100 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <div
              class="h-px w-8 bg-white/10 group-hover:w-12 transition-all"
            ></div>
            <span>Keluar Portal</span>
            <div
              class="h-px w-8 bg-white/10 group-hover:w-12 transition-all"
            ></div>
          </button>
        </div>
      </transition>

      <!-- Finance Modal Popup -->
      <Transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showFinanceModal && orderData"
          class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          <div
            @click="showFinanceModal = false"
            class="absolute inset-0 bg-black/60 backdrop-blur-md"
          ></div>
          <div
            class="bg-bg-primary border border-white/10 w-full max-w-md rounded-[32px] overflow-hidden relative shadow-2xl"
          >
            <div class="p-8 space-y-8">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-black text-white">Billing Summary</h3>
                  <p
                    class="text-xs font-bold text-text-tertiary uppercase tracking-widest mt-1"
                  >
                    Order #{{ orderData.orderId }}
                  </p>
                </div>
                <button
                  @click="showFinanceModal = false"
                  class="p-2 -mr-2 text-text-tertiary hover:text-white transition-colors"
                >
                  <X :size="20" />
                </button>
              </div>

              <div class="space-y-4">
                <div
                  class="p-5 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center font-bold"
                >
                  <span
                    class="text-[10px] uppercase tracking-widest text-text-tertiary"
                    >Total Project Value</span
                  >
                  <span class="text-white">{{
                    formatCurrency(orderData.price)
                  }}</span>
                </div>
                <div
                  class="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex justify-between items-center font-bold"
                >
                  <span
                    class="text-[10px] uppercase tracking-widest text-text-tertiary"
                    >Total Amount Paid</span
                  >
                  <span class="text-emerald-500">{{
                    formatCurrency(orderData.paidAmount)
                  }}</span>
                </div>
                <div
                  class="p-5 bg-rose-500/5 rounded-2xl border border-rose-500/10 flex justify-between items-center font-bold italic"
                >
                  <span
                    class="text-[10px] uppercase tracking-widest text-text-tertiary"
                    >Remaining Balance</span
                  >
                  <span class="text-rose-500">{{
                    formatCurrency(orderData.price - orderData.paidAmount)
                  }}</span>
                </div>
              </div>

              <div
                class="p-5 bg-bg-secondary/50 rounded-2xl border border-white/5 flex items-center gap-4"
              >
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center"
                  :class="{
                    'bg-emerald-500/10 text-emerald-500':
                      orderData.paymentStatus === 'paid',
                    'bg-amber-500/10 text-amber-500':
                      orderData.paymentStatus === 'partial',
                    'bg-rose-500/10 text-rose-500':
                      orderData.paymentStatus === 'pending',
                  }"
                >
                  <CreditCard :size="20" />
                </div>
                <div class="flex-1">
                  <div
                    class="text-[10px] font-black text-text-tertiary uppercase tracking-widest leading-none mb-1"
                  >
                    Payment Status
                  </div>
                  <div
                    class="text-xs font-black uppercase text-white tracking-widest"
                  >
                    {{
                      orderData.paymentStatus === "paid"
                        ? "Paid in Full"
                        : orderData.paymentStatus === "partial"
                          ? "Partial Payment"
                          : "Pending Payment"
                    }}
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="printInvoice"
                  class="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all active:scale-95"
                >
                  <Printer :size="18" /> Cetak
                </button>
                <button
                  @click="confirmPayment"
                  class="flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-secondary text-white font-bold py-4 rounded-2xl shadow-xl shadow-accent-primary/20 transition-all active:scale-95"
                >
                  Confirm Paying
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- INVOICE PRINT TEMPLATE (HIDDEN IN SCREEN) -->
      <div
        v-if="orderData"
        class="hidden print:block print-container bg-white text-black p-10 font-sans"
      >
        <div
          class="flex justify-between items-start border-b-2 border-slate-200 pb-8 mb-8"
        >
          <div>
            <h1 class="text-3xl font-black text-slate-900 mb-1">INVOICE</h1>
            <p class="text-slate-500 font-mono text-sm leading-none">
              ORDER ID: #{{ orderData.orderId }}
            </p>
          </div>
          <div class="text-right">
            <h2 class="text-xl font-bold text-slate-900">KangJessy Agency</h2>
            <p class="text-sm text-slate-500">Premium Digital Solutions</p>
            <p class="text-xs text-slate-400">www.kangjessy.com</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-10 mb-12">
          <div>
            <h3
              class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2"
            >
              Billed To
            </h3>
            <p class="font-bold text-slate-800 text-lg leading-tight">
              {{ orderData.clientName }}
            </p>
            <p class="text-slate-500 text-sm mt-1">
              Project: {{ orderData.projectName }}
            </p>
          </div>
          <div class="text-right">
            <h3
              class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2"
            >
              Billing Details
            </h3>
            <p class="text-sm text-slate-600">
              <span class="font-bold">Start:</span> {{ orderData.startDate }}
            </p>
            <p class="text-sm text-slate-600">
              <span class="font-bold">Deadline:</span> {{ orderData.deadline }}
            </p>
          </div>
        </div>

        <table class="w-full mb-12">
          <thead>
            <tr class="border-b-2 border-slate-100 text-left">
              <th
                class="py-4 text-[10px] font-black uppercase tracking-widest text-slate-400"
              >
                Description
              </th>
              <th
                class="py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-50">
              <td class="py-5">
                <p class="font-bold text-slate-800">
                  {{ orderData.projectName }}
                </p>
                <p class="text-xs text-slate-500 mt-1">
                  Development & Implementation Services
                </p>
              </td>
              <td class="py-5 text-right font-bold text-slate-800">
                {{ formatCurrency(orderData.price) }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-end">
          <div class="w-64 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Total Project Value</span>
              <span class="text-slate-800 font-bold">{{
                formatCurrency(orderData.price)
              }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">Total Paid</span>
              <span class="text-emerald-600 font-bold"
                >- {{ formatCurrency(orderData.paidAmount) }}</span
              >
            </div>
            <div class="flex justify-between border-t border-slate-200 pt-3">
              <span class="font-black text-slate-900">REMAINING BALANCE</span>
              <span class="font-black text-rose-600">{{
                formatCurrency(orderData.price - orderData.paidAmount)
              }}</span>
            </div>
          </div>
        </div>

        <div class="mt-20 pt-10 border-t border-slate-100 text-center">
          <p
            class="text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest font-bold"
          >
            Thank you for choosing KangJessy Agency.<br />
            All payments are non-refundable after project starts.
          </p>
        </div>
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
  X,
} from "lucide-vue-next";
import { supabase } from "@kangjessy/database";
import { projectService } from "../../services/projectService";
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
    date: string;
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
}

const route = useRoute();
const orderIdInput = ref("");
const isLoading = ref(false);
const orderData = ref<OrderData | null>(null);
const errorMessage = ref("");
const showFinanceModal = ref(false);
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

const confirmPayment = () => {
  if (!orderData.value) return;
  const remaining = orderData.value.price - orderData.value.paidAmount;
  popup.openModal(Popups.CHAT_WA, {
    category: "Payment Confirmation",
    initialMessage: `Halo Admin! Saya ingin konfirmasi pembayaran untuk project "${orderData.value.projectName}" (ID: ${orderData.value.orderId}).\n\nNominal: ${formatCurrency(remaining)}\nStatus: ${orderData.value.paymentStatus.toUpperCase()}\n\nMohon dicek ya, bukti transfer saya lampirkan setelah ini.`,
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

  try {
    const project = await projectService.getProjectById(targetId);
    if (project) {
      const allTasks = project.tasks || [];
      const sortedTimeline: any[] = [];

      const parents = allTasks
        .filter((t: any) => !t.parent_id)
        .sort(
          (a: any, b: any) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );

      parents.forEach((parent: any) => {
        const subs = allTasks
          .filter((t: any) => t.parent_id === parent.id)
          .sort(
            (a: any, b: any) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          );

        // Calculate intelligent status for Parent
        let parentStatus = "pending";
        if (subs.length > 0) {
          const doneCount = subs.filter((s: any) => s.status === "done").length;
          if (doneCount === subs.length) parentStatus = "done";
          else if (doneCount > 0) parentStatus = "in_progress";
        } else {
          parentStatus = parent.status;
        }

        sortedTimeline.push({
          date: new Date(parent.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
          }),
          title: parent.title,
          status: parentStatus,
          icon: parent.icon,
          isParent: true,
        });

        subs.forEach((sub: any) => {
          sortedTimeline.push({
            date: new Date(sub.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            }),
            title: sub.title,
            status: sub.status === "done" ? "done" : "pending",
            isParent: false,
          });
        });
      });

      // Fetch actual payments from transactions
      const { data: txData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("client_id", project.client_id)
        .eq("type", "income");

      const totalPaid =
        txData?.reduce(
          (acc: number, curr: any) => acc + Number(curr.amount),
          0,
        ) || 0;
      const totalPrice = project.clients?.budget
        ? parseInt(project.clients.budget.replace(/[^0-9]/g, "")) || 0
        : 0;
      const payStatus =
        totalPaid >= totalPrice
          ? "paid"
          : totalPaid > 0
            ? "partial"
            : "pending";

      orderData.value = {
        orderId: project.id.substring(0, 8).toUpperCase(),
        projectName: project.name,
        clientName: project.clients?.name || "Client",
        status: project.status,
        progress: project.progress || 0,
        startDate: project.start_date
          ? new Date(project.start_date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "-",
        deadline: project.deadline
          ? new Date(project.deadline).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "-",
        price: totalPrice,
        paidAmount: totalPaid,
        paymentStatus: payStatus,
        timeline: sortedTimeline,
        links: {
          preview: project.preview_url !== "-" ? project.preview_url : "",
          figma: project.figma_url !== "-" ? project.figma_url : "",
          github: project.github_url !== "-" ? project.github_url : "",
          drive: project.drive_url !== "-" ? project.drive_url : "",
          invoice: "#",
        },
      };
    } else {
      errorMessage.value = "Tracking ID tidak valid atau belum terdaftar.";
    }
  } catch (e: any) {
    console.error(e);
    errorMessage.value = "Terjadi gangguan saat menghubungkan ke database.";
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
