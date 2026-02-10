<template>
  <div class="page-container max-w-7xl mx-auto pb-24 px-4 sm:px-6 relative">
    <!-- Background Decor -->
    <div
      class="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-100/30 blur-[120px] rounded-full opacity-50"
    ></div>
    <div
      class="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-50/40 blur-[100px] rounded-full opacity-40"
    ></div>

    <!-- Header -->
    <div
      class="flex items-center justify-between mb-8 px-1 lg:px-2 pt-4 lg:pt-0 relative z-10"
    >
      <div class="flex items-center gap-4 lg:gap-5">
        <button
          @click="handleBack"
          class="w-11 h-11 lg:w-12 lg:h-12 bg-white/70 backdrop-blur-md border border-slate-100/50 rounded-2xl flex items-center justify-center hover:bg-white transition-all text-slate-400 hover:text-[#7029FF] shadow-sm active:scale-95 group"
        >
          <ArrowLeft
            :size="20"
            class="group-hover:-translate-x-0.5 transition-transform"
          />
        </button>
        <div>
          <nav
            class="flex items-center gap-2 text-[8px] lg:text-[9px] font-black uppercase tracking-[0.25em] text-slate-300 mb-1.5 ml-0.5"
          >
            <span class="hover:text-slate-400 cursor-default transition-colors"
              >Client Ecosystem</span
            >
            <ChevronRight :size="10" class="opacity-30" />
            <span class="text-[#7029FF] brightness-90">{{
              isLeadRoute ? "Lead Pipeline" : "Active Orders"
            }}</span>
          </nav>
          <h1
            class="text-xl lg:text-4xl font-black text-[#1B2559] leading-tight tracking-tight drop-shadow-sm"
          >
            {{ isEdit ? "Update Record" : "Create New Entry" }}
          </h1>
        </div>
      </div>

      <!-- Desktop Stepper & Actions -->
      <div
        class="hidden lg:flex items-center gap-4 bg-white p-2 border border-slate-100/50 rounded-[24px] shadow-xl shadow-slate-200/5"
      >
        <div
          class="flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all"
          :class="
            currentStep === 1 ? 'bg-indigo-50 text-[#702DFF]' : 'text-slate-300'
          "
        >
          <span
            class="w-6 h-6 rounded-lg bg-current flex items-center justify-center text-[10px] font-black invert shadow-sm"
            >1</span
          >
          <span class="text-[10px] font-black uppercase tracking-[0.15em]"
            >Rate Card</span
          >
        </div>
        <div class="w-6 h-px bg-slate-100"></div>
        <div
          class="flex items-center gap-2.5 px-4 py-2 rounded-2xl transition-all"
          :class="
            currentStep === 2 ? 'bg-indigo-50 text-[#702DFF]' : 'text-slate-300'
          "
        >
          <span
            class="w-6 h-6 rounded-lg bg-current flex items-center justify-center text-[10px] font-black invert shadow-sm"
            >2</span
          >
          <span class="text-[10px] font-black uppercase tracking-[0.15em]"
            >Details</span
          >
        </div>
      </div>

      <div class="hidden lg:flex items-center gap-3">
        <BaseButton
          v-if="currentStep === 2"
          variant="secondary"
          @click="currentStep = 1"
        >
          <ChevronLeft :size="18" />
          Config
        </BaseButton>
        <BaseButton
          v-if="currentStep === 1"
          variant="primary"
          @click="goToStep2"
        >
          Proceed
          <ChevronRight :size="18" />
        </BaseButton>
        <BaseButton
          v-else
          variant="primary"
          :loading="saving"
          @click="handleSave"
          :disabled="loading"
        >
          <Save :size="18" />
          Confirm & Save
        </BaseButton>
      </div>
    </div>

    <!-- Feedback -->
    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />

    <div
      v-if="loading"
      class="card p-24 text-center !rounded-[32px] border-none shadow-xl"
    >
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-50 border-t-[#702DFF]"
      ></div>
      <p
        class="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]"
      >
        Processing production data...
      </p>
    </div>

    <template v-else>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- MAIN FORM AREA -->
        <div class="lg:col-span-8 space-y-8">
          <!-- STEP 1: CONFIGURATION -->
          <div v-if="currentStep === 1" class="space-y-8 animate-fade-in-up">
            <!-- Trigger Card: Product Selection -->
            <div class="space-y-3">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-6"
                >1. Product Selection</label
              >
              <div
                @click="openCatalogue('type')"
                class="group relative p-8 rounded-[40px] border-2 border-dashed transition-all duration-500 cursor-pointer overflow-hidden active:scale-[0.98]"
                :class="
                  formData.project_type
                    ? 'bg-white border-[#7029FF]/30 shadow-2xl shadow-indigo-500/10'
                    : 'bg-slate-50/50 border-slate-200 hover:border-[#7029FF]/50 hover:bg-white'
                "
              >
                <!-- Selected State -->
                <div
                  v-if="formData.project_type"
                  class="flex items-center gap-6 relative z-10"
                >
                  <div
                    class="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#7029FF] to-[#1B2559] text-white flex items-center justify-center shadow-2xl shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-500"
                  >
                    <component
                      :is="currentProjectType?.icon || Layout"
                      :size="32"
                      stroke-width="2.5"
                    />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-1">
                      <h3
                        class="text-2xl font-black text-[#1B2559] tracking-tight"
                      >
                        {{ formData.project_type }}
                      </h3>
                      <span
                        class="px-3 py-1 bg-indigo-50 text-[#7029FF] rounded-lg text-[8px] font-black uppercase tracking-widest"
                        >{{ selectedCategoryId.toUpperCase() }}</span
                      >
                    </div>
                    <p
                      class="text-xs text-slate-400 font-bold line-clamp-1 max-w-md opacity-60"
                    >
                      {{ currentProjectType?.desc }}
                    </p>
                    <div class="flex items-center gap-4 mt-4">
                      <span
                        class="text-sm font-black text-[#1B2559] bg-slate-100/50 px-4 py-1.5 rounded-xl border border-slate-100"
                        >Rp {{ basePrice.toLocaleString("id-ID") }}</span
                      >
                      <button
                        class="text-[10px] font-black text-[#7029FF] uppercase tracking-widest hover:underline transition-all"
                      >
                        Change Foundation
                      </button>
                    </div>
                  </div>
                  <ChevronRight
                    :size="24"
                    class="text-slate-200 group-hover:translate-x-1 transition-transform"
                  />
                </div>

                <!-- Empty State -->
                <div
                  v-else
                  class="flex flex-col items-center py-6 text-center relative z-10"
                >
                  <div
                    class="w-16 h-16 rounded-3xl bg-slate-100 text-slate-300 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#7029FF]/10 group-hover:text-[#7029FF] transition-all duration-500"
                  >
                    <Plus :size="32" />
                  </div>
                  <h3
                    class="text-lg font-black text-slate-400 group-hover:text-[#1B2559] transition-colors"
                  >
                    Pilih Pondasi Proyek
                  </h3>
                  <p
                    class="text-xs text-slate-300 font-bold uppercase tracking-widest mt-1"
                  >
                    Langkah 1: Landasan Sistem
                  </p>
                </div>

                <!-- Decor -->
                <div
                  class="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                ></div>
              </div>
            </div>

            <!-- Trigger Card: Add-ons -->
            <div v-if="formData.project_type" class="space-y-3 animate-fade-in">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-6"
                >2. Intelligence & Add-ons</label
              >
              <div
                @click="openCatalogue('feature')"
                class="group relative p-8 rounded-[40px] border-2 transition-all duration-500 cursor-pointer overflow-hidden active:scale-[0.98]"
                :class="
                  selectedFeatureIds.length > 0
                    ? 'bg-white border-[#7029FF]/20 shadow-2xl shadow-indigo-500/5'
                    : 'bg-slate-50/50 border-slate-100 hover:border-[#7029FF]/30 hover:bg-white'
                "
              >
                <div class="flex items-center gap-6 relative z-10">
                  <div
                    class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm"
                    :class="
                      selectedFeatureIds.length > 0
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-slate-100 text-slate-300'
                    "
                  >
                    <Zap :size="28" stroke-width="2.5" />
                  </div>
                  <div class="flex-1">
                    <h3
                      class="text-xl font-black text-[#1B2559] tracking-tight"
                    >
                      {{
                        selectedFeatureIds.length > 0
                          ? `${selectedFeatureIds.length} Modul Terpasang`
                          : `Lengkapi
                      dengan Fitur Cerdas`
                      }}
                    </h3>
                    <div
                      v-if="selectedFeatureIds.length > 0"
                      class="flex flex-wrap gap-2 mt-3"
                    >
                      <span
                        v-for="fid in selectedFeatureIds.slice(0, 3)"
                        :key="fid"
                        class="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-[#1B2559] uppercase tracking-wider"
                      >
                        {{ availableFeatures.find((f) => f.id === fid)?.name }}
                      </span>
                      <span
                        v-if="selectedFeatureIds.length > 3"
                        class="px-3 py-1 bg-[#7029FF]/5 text-[#7029FF] rounded-lg text-[9px] font-black uppercase"
                      >
                        +{{ selectedFeatureIds.length - 3 }} Lainnya
                      </span>
                    </div>
                    <p
                      v-else
                      class="text-xs text-slate-300 font-bold uppercase tracking-widest mt-1"
                    >
                      Tambah Keunggulan Sistem
                    </p>
                  </div>
                  <button
                    class="px-6 py-3 rounded-2xl bg-slate-50 group-hover:bg-[#7029FF] group-hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Kelola Modul
                  </button>
                </div>
              </div>
            </div>

            <!-- Trigger Card: Production Priority -->
            <div v-if="formData.project_type" class="space-y-3 animate-fade-in">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-6"
                >3. Production Priority</label
              >
              <div
                @click="openCatalogue('timeline')"
                class="group relative p-8 rounded-[40px] border-2 transition-all duration-500 cursor-pointer overflow-hidden active:scale-[0.98]"
                :class="
                  selectedTimelineId
                    ? 'bg-white border-[#7029FF]/20 shadow-2xl shadow-indigo-500/5'
                    : 'bg-slate-50/50 border-slate-100 hover:border-[#7029FF]/30 hover:bg-white'
                "
              >
                <div class="flex items-center gap-6 relative z-10">
                  <div
                    class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm"
                    :class="
                      selectedTimelineId
                        ? 'bg-indigo-50 text-[#7029FF]'
                        : 'bg-slate-100 text-slate-300'
                    "
                  >
                    <Clock :size="28" stroke-width="2.5" />
                  </div>
                  <div class="flex-1">
                    <h3
                      class="text-xl font-black text-[#1B2559] tracking-tight"
                    >
                      {{
                        timelineOptions.find((t) => t.id === selectedTimelineId)
                          ?.label || "Standar Timeline"
                      }}
                    </h3>
                    <div class="flex items-center gap-2 mt-1">
                      <span
                        class="text-xs text-slate-400 font-bold uppercase tracking-widest"
                        >Speed Multiplier:</span
                      >
                      <span
                        class="px-2 py-0.5 rounded-lg bg-indigo-50 text-[#7029FF] text-[10px] font-black"
                        >{{
                          timelineOptions.find(
                            (t) => t.id === selectedTimelineId,
                          )?.multiplier || 1
                        }}x</span
                      >
                    </div>
                  </div>
                  <button
                    class="px-6 py-3 rounded-2xl bg-slate-50 group-hover:bg-[#7029FF] group-hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            <!-- Trigger Card: Style Mood -->
            <div v-if="formData.project_type" class="space-y-3 animate-fade-in">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-6"
                >4. Style Mood & Aesthetic</label
              >
              <div
                @click="openCatalogue('style')"
                class="group relative p-8 rounded-[40px] border-2 transition-all duration-500 cursor-pointer overflow-hidden active:scale-[0.98]"
                :class="
                  formData.visual_style
                    ? 'bg-white border-[#7029FF]/20 shadow-2xl shadow-indigo-500/5'
                    : 'bg-slate-50/50 border-slate-100 hover:border-[#7029FF]/30 hover:bg-white'
                "
              >
                <div class="flex items-center gap-6 relative z-10">
                  <div
                    class="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm overflow-hidden"
                    :class="
                      formData.visual_style ? 'bg-indigo-50' : 'bg-slate-100'
                    "
                  >
                    <img
                      v-if="formData.visual_style"
                      :src="
                        styleOptions.find((s) => s.id === formData.visual_style)
                          ?.image
                      "
                      class="w-full h-full object-cover"
                    />
                    <Palette
                      v-else
                      :size="28"
                      stroke-width="2.5"
                      class="text-slate-300"
                    />
                  </div>
                  <div class="flex-1">
                    <h3
                      class="text-xl font-black text-[#1B2559] tracking-tight"
                    >
                      {{
                        styleOptions.find((s) => s.id === formData.visual_style)
                          ?.name || "Default Aesthetic"
                      }}
                    </h3>
                    <p
                      class="text-xs text-slate-400 font-bold line-clamp-1 max-w-md opacity-60"
                    >
                      {{
                        styleOptions.find((s) => s.id === formData.visual_style)
                          ?.desc || "Select visual direction"
                      }}
                    </p>
                  </div>
                  <button
                    class="px-6 py-3 rounded-2xl bg-slate-50 group-hover:bg-[#7029FF] group-hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 2: DETAILS -->
          <div v-else class="space-y-8 animate-fade-in-up">
            <AdminCard
              title="A. Client Connection"
              subtitle="Identify the stakeholder for this project"
              :stretch="false"
              class="!rounded-[40px] border-none shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-xl"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BaseInput
                  v-model="formData.name"
                  label="Contact Identity"
                  placeholder="Full Name"
                  :icon="User"
                  class="!rounded-2xl"
                />
                <BaseInput
                  v-model="formData.email"
                  label="Digital Mail"
                  type="email"
                  placeholder="client@brand.com"
                  :icon="Mail"
                  class="!rounded-2xl"
                />
                <BaseInput
                  v-model="formData.phone"
                  label="WhatsApp Line"
                  placeholder="+62..."
                  :icon="Phone"
                  class="!rounded-2xl"
                />
                <BaseInput
                  v-model="formData.company"
                  label="Entity Name"
                  placeholder="Business / Organization"
                  :icon="Briefcase"
                  class="!rounded-2xl"
                />
              </div>
            </AdminCard>

            <AdminCard
              title="B. Requirement Specs"
              subtitle="Technical discovery and project blueprints"
              :stretch="false"
              class="!rounded-[40px] border-none shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-xl"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BaseInput
                  v-model="formData.project_name"
                  label="Internal Project Title"
                  placeholder="Acme Redesign 2024"
                  :icon="Layout"
                  class="!rounded-2xl"
                />
                <BaseInput
                  v-model="formData.dream_domain"
                  label="Target Digital URL"
                  placeholder="example.com"
                  :icon="Globe"
                  class="!rounded-2xl"
                />
                <AdminTextarea
                  v-model="formData.brief"
                  label="Technical Brief / Discovery Notes"
                  class="md:col-span-2"
                  placeholder="Summarize the core needs, colors, and functionalities..."
                />
              </div>
            </AdminCard>

            <AdminCard
              title="C. Financial & Stage Ledger"
              subtitle="Accounting logic and production timeline"
              :stretch="false"
              class="!rounded-[40px] border-none shadow-2xl shadow-indigo-500/5 bg-white/80 backdrop-blur-xl mb-12 lg:mb-0"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="space-y-6">
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2"
                    >Production Stage</label
                  >
                  <div class="flex flex-wrap gap-2.5">
                    <button
                      v-for="s in productionOptions"
                      :key="s"
                      @click="formData.project_status = s"
                      class="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 border"
                      :class="
                        formData.project_status === s
                          ? 'bg-[#7029FF] text-white border-[#7029FF] shadow-xl shadow-indigo-500/20'
                          : 'bg-white border-slate-100 text-slate-400 hover:text-[#7029FF] hover:border-indigo-100'
                      "
                    >
                      {{ s }}
                    </button>
                  </div>
                </div>

                <div class="space-y-6">
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-2"
                    >Accounting Logic</label
                  >
                  <div class="grid grid-cols-1 gap-5">
                    <BaseInput
                      v-model="formData.total_amount"
                      type="number"
                      label="Deal Weight"
                      prefix="Rp"
                      placeholder="0"
                    />
                    <BaseInput
                      v-model="formData.paid_amount"
                      type="number"
                      label="Paid Weight"
                      prefix="Rp"
                      placeholder="0"
                      class="!text-emerald-700"
                    />
                  </div>

                  <AdminTextarea
                    v-model="formData.payment_notes"
                    label="Accounting Notes"
                    :rows="3"
                    placeholder="e.g. DP 50%, friend discount, installment plans..."
                    class="mt-4"
                  />

                  <div
                    class="p-8 bg-[#1B2559] text-white rounded-[38px] shadow-2xl relative overflow-hidden group"
                  >
                    <div
                      class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-all duration-700 group-hover:scale-150"
                    ></div>
                    <div class="relative z-10 flex justify-between items-end">
                      <div>
                        <p
                          class="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-2"
                        >
                          Outstanding Debt
                        </p>
                        <h4
                          class="text-2xl font-black tracking-tighter"
                          :class="
                            getRemainingDebt() > 0
                              ? 'text-rose-400'
                              : 'text-emerald-400'
                          "
                        >
                          {{ formatPrice(getRemainingDebt()) }}
                        </h4>
                      </div>
                      <div class="min-w-[140px] text-right">
                        <p
                          class="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-2"
                        >
                          Agreement State
                        </p>
                        <span
                          class="inline-flex px-4 py-2 bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md whitespace-nowrap"
                        >
                          {{
                            formData.payment_status?.replace("_", " ") ||
                            "unpaid"
                          }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>

        <!-- SIDEBAR SUMMARY (DESKTOP) -->
        <div class="hidden lg:block lg:col-span-4">
          <div class="sticky top-24 space-y-6">
            <div
              class="bg-[#1B2559] text-white rounded-[40px] p-8 shadow-2xl shadow-indigo-500/10 overflow-hidden relative group transition-all duration-500 hover:scale-[1.01] active:scale-[0.99]"
            >
              <div
                class="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 transition-transform duration-1000 group-hover:scale-150"
              ></div>
              <div
                class="absolute bottom-0 left-0 w-32 h-32 bg-[#7029FF]/10 rounded-full -ml-16 -mb-16 blur-2xl"
              ></div>

              <nav class="relative z-10 flex justify-between items-center mb-6">
                <p
                  class="text-[9px] font-black uppercase tracking-[0.4em] opacity-40"
                >
                  Dynamic Config
                </p>
                <div
                  class="px-2 py-1 bg-white/10 rounded-lg border border-white/10 text-[8px] font-black tracking-widest text-[#7029FF]"
                >
                  LIVE QUOTE
                </div>
              </nav>

              <div class="relative z-10 space-y-1">
                <p
                  class="text-[10px] font-black uppercase tracking-[0.3em] opacity-40"
                >
                  Estimated Investment
                </p>
                <h2 class="text-4xl font-black tracking-tighter">
                  {{ formatPrice(calculatedTotal) }}
                </h2>
              </div>

              <div class="mt-10 space-y-4 relative z-10">
                <div
                  class="flex justify-between items-center group/item hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
                >
                  <span
                    class="text-[10px] font-black uppercase tracking-widest opacity-40"
                    >Product Selection</span
                  >
                  <span class="text-[13px] font-black tracking-tight">{{
                    formData.project_type || "Belum Dipilih"
                  }}</span>
                </div>
                <div
                  class="flex justify-between items-center group/item hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
                >
                  <span
                    class="text-[10px] font-black uppercase tracking-widest opacity-40"
                    >Intelligence & Add-ons</span
                  >
                  <span class="text-[13px] font-black tracking-tight"
                    >{{ selectedFeatureIds.length }} MODULES</span
                  >
                </div>
                <div
                  class="flex justify-between items-center group/item hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
                >
                  <span
                    class="text-[10px] font-black uppercase tracking-widest opacity-40"
                    >Production Priority</span
                  >
                  <span
                    class="text-[13px] font-black tracking-tight uppercase"
                    >{{ selectedTimelineId || "Standar" }}</span
                  >
                </div>
                <div
                  class="flex justify-between items-center group/item hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
                >
                  <span
                    class="text-[10px] font-black uppercase tracking-widest opacity-40"
                    >Style Vibes</span
                  >
                  <span
                    class="text-[13px] font-black tracking-tight uppercase truncate max-w-[120px]"
                    >{{ formData.visual_style || "Default" }}</span
                  >
                </div>
                <div
                  class="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"
                ></div>

                <div
                  v-if="formData.voucher"
                  class="flex justify-between items-center py-4 px-6 bg-[#7029FF]/20 border border-[#7029FF]/30 rounded-2xl mb-4"
                >
                  <div>
                    <p
                      class="text-[9px] font-black uppercase tracking-widest text-indigo-200"
                    >
                      System Discount
                    </p>
                    <p class="text-[13px] font-black tracking-tighter">
                      Code: {{ formData.voucher }}
                    </p>
                  </div>
                  <p class="text-rose-400 font-black text-sm">
                    - {{ formatPrice(voucherAmount) }}
                  </p>
                </div>
              </div>

              <div class="mt-8">
                <BaseButton
                  variant="primary"
                  class="w-full !py-6 !rounded-3xl !bg-[#7029FF] hover:!bg-[#5D1FDB] !text-[12px] shadow-2xl shadow-indigo-500/20"
                  @click="handleSave"
                  :loading="saving"
                  :disabled="loading"
                >
                  <Save :size="20" class="mr-2" />
                  Commit Configuration
                </BaseButton>
              </div>
            </div>

            <AdminCard
              title="Sales Intelligence"
              :stretch="false"
              class="!rounded-[32px] border-none shadow-xl shadow-slate-200/5"
            >
              <div class="space-y-6 pb-2">
                <div class="space-y-2">
                  <label
                    class="block text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-2"
                    >Sales Stage</label
                  >
                  <div
                    @click="openCatalogue('status')"
                    class="flex items-center justify-between px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl cursor-pointer hover:bg-white hover:border-indigo-100 transition-all group"
                  >
                    <span
                      class="text-[11px] font-black text-[#1B2559] uppercase tracking-wide group-hover:text-[#7029FF]"
                      >{{ formData.status || "Select Stage" }}</span
                    >
                    <ChevronRight
                      :size="14"
                      class="text-slate-300 group-hover:text-[#7029FF] transition-colors"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label
                    class="block text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-2"
                    >Channel Source</label
                  >
                  <div
                    @click="openCatalogue('source')"
                    class="flex items-center justify-between px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl cursor-pointer hover:bg-white hover:border-indigo-100 transition-all group"
                  >
                    <span
                      class="text-[11px] font-black text-[#1B2559] uppercase tracking-wide group-hover:text-[#7029FF]"
                      >{{
                        formData.source?.replace("_", " ") || "Select Source"
                      }}</span
                    >
                    <ChevronRight
                      :size="14"
                      class="text-slate-300 group-hover:text-[#7029FF] transition-colors"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label
                    class="block text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-2"
                    >Promotional Code</label
                  >
                  <div
                    @click="openCatalogue('voucher')"
                    class="flex items-center justify-between px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl cursor-pointer hover:bg-white hover:border-indigo-100 transition-all group"
                  >
                    <span
                      class="text-[11px] font-black text-[#1B2559] uppercase tracking-wide group-hover:text-[#7029FF]"
                      >{{ formData.voucher || "No Promo Applied" }}</span
                    >
                    <ChevronRight
                      :size="14"
                      class="text-slate-300 group-hover:text-[#7029FF] transition-colors"
                    />
                  </div>
                </div>

                <div class="pt-6 border-t border-slate-50">
                  <label
                    class="block text-[10px] font-black text-[#702DFF] uppercase tracking-[0.2em] mb-3 ml-2"
                    >Final Agreed Price</label
                  >
                  <div class="relative group">
                    <span
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black text-[10px] pointer-events-none group-focus-within:text-[#702DFF]"
                      >IDR</span
                    >
                    <input
                      type="text"
                      :value="formattedBudget"
                      @input="handleBudgetInput"
                      class="w-full pl-12 pr-5 py-4 bg-indigo-50/30 border-2 border-indigo-100/50 rounded-2xl focus:border-[#7029FF]/30 focus:bg-white outline-none font-black text-xl text-[#1B2559] transition-all"
                      placeholder="0"
                    />
                  </div>
                  <p
                    class="text-[9px] font-bold text-slate-300 mt-3 px-2 leading-relaxed italic"
                  >
                    This value overrides the smart quote above in all tracking.
                  </p>
                </div>

                <!-- External Link Section -->

                <!-- Budget Comparison (if lead has budget range) -->
                <div
                  v-if="clientBudgetRange"
                  class="mt-6 pt-6 border-t border-slate-50"
                >
                  <label
                    class="block text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-3 ml-2"
                    >💡 Client Budget Insight</label
                  >
                  <div
                    class="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200/50 rounded-2xl p-5 space-y-3"
                  >
                    <div
                      class="flex items-center justify-between pb-3 border-b border-amber-200/50"
                    >
                      <span
                        class="text-[10px] font-black uppercase tracking-widest text-amber-700"
                        >Client's Expectation</span
                      >
                      <span class="text-sm font-black text-amber-900">{{
                        clientBudgetRange
                      }}</span>
                    </div>
                    <div
                      class="flex items-center justify-between pb-3 border-b border-amber-200/50"
                    >
                      <span
                        class="text-[10px] font-black uppercase tracking-widest text-amber-700"
                        >Est. Investment</span
                      >
                      <span class="text-sm font-black text-[#702DFF]">{{
                        formatPrice(calculatedTotal)
                      }}</span>
                    </div>
                    <div class="flex items-start gap-2 pt-2">
                      <div
                        class="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5"
                      >
                        <Info :size="14" />
                      </div>
                      <p
                        class="text-[10px] font-bold text-amber-800 leading-relaxed"
                      >
                        Gunakan data ini untuk negosiasi. Jika harga melebihi
                        budget, pertimbangkan adjust features atau tawarkan
                        timeline lebih panjang untuk menurunkan multiplier.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
      </div>

      <!-- MOBILE STICKY FOOTER -->
      <div
        class="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-8 pt-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
      >
        <div class="flex items-center gap-3">
          <button
            @click="showMobileSummary = true"
            class="flex-1 flex flex-col items-start px-5 py-3 h-14 bg-[#1B2559] text-white rounded-2xl relative overflow-hidden group active:scale-95 transition-all"
          >
            <p
              class="text-[8px] font-black uppercase tracking-widest opacity-40"
            >
              Project Quote
            </p>
            <p class="text-[15px] font-black tracking-tighter">
              {{ formatPrice(calculatedTotal) }}
            </p>
            <div class="absolute right-4 top-1/2 -translate-y-1/2">
              <ChevronUp :size="16" class="text-[#702DFF] animate-bounce" />
            </div>
          </button>

          <button
            v-if="currentStep === 1"
            @click="goToStep2"
            class="w-14 h-14 bg-[#702DFF] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 active:scale-90 transition-all"
          >
            <ChevronRight :size="24" />
          </button>
          <button
            v-else
            @click="handleSave"
            :disabled="saving"
            class="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 active:scale-90 transition-all disabled:opacity-50"
          >
            <Save v-if="!saving" :size="24" />
            <RotateCw v-else :size="24" class="animate-spin" />
          </button>
        </div>
      </div>

      <!-- MOBILE QUOTE BOTTOM SHEET -->
      <BottomSheet
        :is-open="showMobileSummary"
        @close="showMobileSummary = false"
      >
        <div class="p-8">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-2xl font-black text-[#1B2559]">Order Summary</h3>
              <p
                class="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1"
              >
                Smart Quote Analysis
              </p>
            </div>
            <button
              @click="showMobileSummary = false"
              class="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center"
            >
              <X :size="20" />
            </button>
          </div>

          <div class="space-y-6">
            <div
              class="bg-[#1B2559] p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden"
            >
              <div
                class="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full"
              ></div>
              <p
                class="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2"
              >
                Total Valuation
              </p>
              <h4 class="text-4xl font-black mb-10">
                {{ formatPrice(calculatedTotal) }}
              </h4>

              <div class="space-y-4">
                <div
                  class="flex justify-between items-center text-[11px] font-black uppercase tracking-widest opacity-60"
                >
                  <span>Core System</span>
                  <span>{{ formatPrice(basePrice) }}</span>
                </div>
                <div
                  class="flex justify-between items-center text-[11px] font-black uppercase tracking-widest opacity-60"
                >
                  <span>Add-ons Total</span>
                  <span>+ {{ formatPrice(featuresTotal) }}</span>
                </div>
                <div
                  v-if="selectedTimelineMultiplier > 1"
                  class="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-indigo-400"
                >
                  <span>Priority Boost</span>
                  <span>x {{ selectedTimelineMultiplier }}</span>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
                  >Sales Pipeline State</label
                >
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="s in ['New', 'Follow Up', 'Deal', 'Cancel']"
                    :key="s"
                    @click="formData.status = s"
                    class="py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all"
                    :class="
                      formData.status === s
                        ? 'bg-[#702DFF] text-white border-[#702DFF] shadow-lg shadow-indigo-500/20'
                        : 'bg-slate-50 text-slate-400 border-transparent'
                    "
                  >
                    {{ s }}
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
                  >Final Agreed Budget</label
                >
                <div class="relative">
                  <span
                    class="absolute left-6 top-1/2 -translate-y-1/2 text-[#702DFF] font-black text-sm"
                    >Rp</span
                  >
                  <input
                    type="text"
                    :value="formattedBudget"
                    @input="handleBudgetInput"
                    class="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#702DFF]/20 transition-all font-black text-xl text-[#1B2559] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 pb-4">
            <button
              @click="showMobileSummary = false"
              class="w-full py-5 bg-[#1B2559] text-white text-[10px] font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-slate-900/10 active:scale-95 transition-all"
            >
              Confirm Configuration
            </button>
          </div>
        </div>
      </BottomSheet>

      <!-- Catalogue Drawer -->
      <BottomSheet :is-open="isCatalogueOpen" @close="isCatalogueOpen = false">
        <div class="p-8 pb-12">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-3xl font-black text-[#1B2559] tracking-tight">
                {{
                  catalogueMode === "type"
                    ? "Product Library"
                    : catalogueMode === "feature"
                      ? "Add-on Modules"
                      : catalogueMode === "timeline"
                        ? "Production Timeline"
                        : catalogueMode === "style"
                          ? "Visual Aesthetics"
                          : catalogueMode === "status"
                            ? "Sales Stage"
                            : catalogueMode === "source"
                              ? "Channel Source"
                              : "Promotional Code"
                }}
              </h3>
              <p
                class="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1"
              >
                {{
                  catalogueMode === "type"
                    ? "Select the core architecture for this project"
                    : catalogueMode === "feature"
                      ? "Equip the system with advanced capabilities"
                      : catalogueMode === "timeline"
                        ? "Determine the pace and priority of delivery"
                        : catalogueMode === "style"
                          ? "Choose the visual direction and atmosphere"
                          : "Manage intelligence data for production pipeline"
                }}
              </p>
            </div>
            <button
              @click="isCatalogueOpen = false"
              class="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm"
            >
              <X :size="20" />
            </button>
          </div>

          <!-- Search Bar -->
          <div class="relative mb-8 group">
            <Search
              :size="18"
              class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7029FF] transition-colors"
            />
            <input
              v-model="catalogueSearch"
              type="text"
              :placeholder="
                catalogueMode === 'type'
                  ? 'Search project foundations (e.g. Web, System, SaaS)...'
                  : 'Find intelligent modules (e.g. SEO, AI, WhatsApp)...'
              "
              class="w-full pl-14 pr-14 py-5 bg-slate-50 border-2 border-transparent rounded-[28px] text-[13px] font-black text-[#1B2559] outline-none focus:bg-white focus:border-[#7029FF]/20 focus:ring-8 focus:ring-indigo-500/5 transition-all shadow-sm"
            />
            <button
              v-if="catalogueSearch"
              @click="catalogueSearch = ''"
              class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-rose-500 transition-colors"
            >
              <X :size="16" />
            </button>
          </div>

          <div v-if="catalogueMode === 'type'" class="space-y-8">
            <!-- Categories -->
            <div class="flex gap-2 overflow-x-auto no-scrollbar py-1">
              <button
                v-for="cat in serviceCategories"
                :key="cat.id"
                @click="selectedCategoryId = cat.id"
                class="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2"
                :class="
                  selectedCategoryId === cat.id
                    ? 'bg-[#7029FF] text-white border-[#7029FF] shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-50 text-slate-400 border-transparent hover:border-slate-200'
                "
              >
                {{ cat.label }}
              </button>
            </div>

            <!-- Product Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                v-for="type in filteredProjectTypes"
                :key="type.id"
                @click="
                  selectProjectType(type);
                  isCatalogueOpen = false;
                "
                class="p-6 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group shadow-sm"
                :class="
                  formData.project_type === type.name
                    ? 'border-[#702DFF] bg-indigo-50/30'
                    : 'border-slate-50 bg-white hover:border-indigo-100 hover:bg-slate-50/50'
                "
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                    :class="
                      formData.project_type === type.name
                        ? 'bg-[#7029FF] text-white shadow-lg'
                        : 'bg-slate-100 text-[#7029FF]'
                    "
                  >
                    <component :is="type.icon" :size="24" stroke-width="2.5" />
                  </div>
                  <div>
                    <h4
                      class="font-black text-[#1B2559] text-base tracking-tight mb-0.5"
                    >
                      {{ type.name }}
                    </h4>
                    <p
                      class="text-[10px] font-black text-[#7029FF] uppercase tracking-widest"
                    >
                      START FROM Rp {{ type.basePrice.toLocaleString("id-ID") }}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div v-else-if="catalogueMode === 'feature'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="feat in filteredFeatures"
                :key="feat.id"
                @click="toggleFeature(feat.id)"
                class="flex items-center gap-5 p-5 rounded-[28px] border-2 cursor-pointer transition-all duration-300"
                :class="
                  selectedFeatureIds.includes(feat.id)
                    ? 'border-[#7029FF] bg-indigo-50/30 shadow-md'
                    : 'border-slate-50 bg-white hover:border-slate-100'
                "
              >
                <div
                  class="w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-500"
                  :class="
                    selectedFeatureIds.includes(feat.id)
                      ? 'bg-[#7029FF] border-[#702DFF] text-white shadow-lg scale-110'
                      : 'border-slate-100 bg-slate-50'
                  "
                >
                  <Check
                    v-if="selectedFeatureIds.includes(feat.id)"
                    :size="18"
                    stroke-width="4"
                  />
                  <Plus
                    v-else
                    :size="18"
                    stroke-width="2"
                    class="text-slate-300"
                  />
                </div>
                <div class="flex-1">
                  <p
                    class="font-black text-[#1B2559] text-xs leading-tight mb-1"
                  >
                    {{ feat.name }}
                  </p>
                  <p
                    class="text-[9px] font-black text-[#7029FF] uppercase tracking-widest"
                  >
                    + Rp {{ feat.price.toLocaleString("id-ID") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <BaseButton
                variant="primary"
                class="w-full !py-5 !rounded-3xl"
                @click="isCatalogueOpen = false"
                >CONFIRM SELECTION</BaseButton
              >
            </div>
          </div>

          <div
            v-else-if="catalogueMode === 'status'"
            class="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <button
              v-for="s in [
                'New',
                'Pending',
                'Follow Up',
                'Qualified',
                'Deal',
                'Cancel',
              ]"
              :key="s"
              @click="
                formData.status = s;
                isCatalogueOpen = false;
              "
              class="flex items-center justify-between p-6 bg-white border-2 rounded-[28px] hover:border-[#7029FF] transition-all group"
              :class="
                formData.status === s
                  ? 'border-[#7029FF] bg-indigo-50/30'
                  : 'border-slate-50'
              "
            >
              <div class="flex flex-col items-start gap-1">
                <span
                  class="text-[12px] font-black text-[#1B2559] uppercase tracking-widest group-hover:text-[#7029FF]"
                  >{{ s }}</span
                >
                <span class="text-[10px] text-slate-400 font-bold opacity-60">{{
                  s === "Deal"
                    ? `Convert to Active
                  Project`
                    : `Stage in pipeline`
                }}</span>
              </div>
              <div
                v-if="formData.status === s"
                class="w-6 h-6 bg-[#7029FF] rounded-full flex items-center justify-center text-white"
              >
                <Check :size="12" stroke-width="4" />
              </div>
            </button>
          </div>

          <div
            v-else-if="catalogueMode === 'source'"
            class="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <button
              v-for="src in [
                'manual',
                'web_order',
                'web_contact',
                'whatsapp',
                'instagram',
                'tiktok',
                'referral',
              ]"
              :key="src"
              @click="
                formData.source = src;
                isCatalogueOpen = false;
              "
              class="flex items-center justify-between p-6 bg-white border-2 rounded-[28px] hover:border-[#7029FF] transition-all group"
              :class="
                formData.source === src
                  ? 'border-[#7029FF] bg-indigo-50/30'
                  : 'border-slate-50'
              "
            >
              <div class="flex flex-col items-start gap-1 text-left">
                <span
                  class="text-[12px] font-black text-[#1B2559] uppercase tracking-widest group-hover:text-[#7029FF]"
                  >{{ src.replace("_", " ") }}</span
                >
                <span
                  class="text-[10px] text-slate-400 font-bold opacity-60 uppercase"
                  >{{
                    src === "manual"
                      ? `Internal
                  Entry`
                      : `Organic Traffic`
                  }}</span
                >
              </div>
              <div
                v-if="formData.source === src"
                class="w-6 h-6 bg-[#7029FF] rounded-full flex items-center justify-center text-white"
              >
                <Check :size="12" stroke-width="4" />
              </div>
            </button>
          </div>

          <div v-else-if="catalogueMode === 'voucher'" class="space-y-4">
            <button
              @click="
                formData.voucher = '';
                isCatalogueOpen = false;
              "
              class="w-full flex items-center justify-between p-6 bg-white border-2 rounded-[28px] hover:border-red-200 transition-all text-left"
              :class="
                !formData.voucher
                  ? 'border-indigo-100 bg-indigo-50/30'
                  : 'border-slate-50'
              "
            >
              <span
                class="text-[12px] font-black text-slate-400 uppercase tracking-widest"
                >NO PROMO APPLIED</span
              >
              <X v-if="formData.voucher" :size="16" class="text-slate-200" />
            </button>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                v-for="v in activeVouchers"
                :key="v.id"
                @click="
                  formData.voucher = v.code;
                  isCatalogueOpen = false;
                "
                class="flex items-center justify-between p-6 bg-white border-2 rounded-[32px] hover:border-[#7029FF] transition-all group"
                :class="
                  formData.voucher === v.code
                    ? 'border-[#7029FF] bg-indigo-50/30'
                    : 'border-slate-50'
                "
              >
                <div class="flex flex-col items-start gap-1">
                  <span
                    class="text-[12px] font-black text-[#1B2559] uppercase tracking-[0.15em] group-hover:text-[#7029FF]"
                    >{{ v.code }}</span
                  >
                  <span class="text-[10px] text-rose-500 font-black"
                    >-
                    {{
                      v.type === "percent"
                        ? v.value + "%"
                        : formatPrice(v.value)
                    }}</span
                  >
                </div>
                <div
                  v-if="formData.voucher === v.code"
                  class="w-6 h-6 bg-[#7029FF] rounded-full flex items-center justify-center text-white"
                >
                  <Check :size="12" stroke-width="4" />
                </div>
              </button>
            </div>
          </div>

          <div
            v-else-if="catalogueMode === 'timeline'"
            class="grid grid-cols-1 gap-4"
          >
            <button
              v-for="opt in timelineOptions"
              :key="opt.id"
              @click="
                formData.selected_timeline = opt.id;
                selectedTimelineId = opt.id;
                isCatalogueOpen = false;
              "
              class="flex items-center gap-6 p-6 rounded-[32px] border-2 text-left transition-all active:scale-[0.98] group"
              :class="
                formData.selected_timeline === opt.id ||
                selectedTimelineId === opt.id
                  ? 'border-[#7029FF] bg-indigo-50/30'
                  : 'border-slate-50 bg-white hover:border-indigo-100'
              "
            >
              <div
                class="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-50 flex items-center justify-center shrink-0"
              >
                <Clock
                  :size="28"
                  class="text-[#7029FF]"
                  :class="selectedTimelineId === opt.id ? 'scale-110' : ''"
                />
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                  <p
                    class="font-black text-[#1B2559] text-lg uppercase tracking-tight"
                  >
                    {{ opt.label }}
                  </p>
                  <span
                    v-if="opt.multiplier > 1"
                    class="px-2 py-0.5 rounded-lg bg-[#7029FF] text-white text-[9px] font-black uppercase"
                  >
                    {{ opt.multiplier }}x FAST
                  </span>
                </div>
                <p class="text-[11px] text-slate-400 font-bold leading-relaxed">
                  Prioritas pengerjaan dengan alokasi resource khusus.
                </p>
              </div>
              <div
                class="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                :class="
                  selectedTimelineId === opt.id
                    ? 'border-[#7029FF] bg-[#7029FF] text-white'
                    : 'border-slate-200 text-transparent'
                "
              >
                <Check :size="16" stroke-width="4" />
              </div>
            </button>
          </div>

          <div
            v-else-if="catalogueMode === 'style'"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <button
              v-for="style in styleOptions"
              :key="style.id"
              @click="
                formData.visual_style = style.id;
                isCatalogueOpen = false;
              "
              class="group rounded-[32px] border-2 transition-all overflow-hidden text-left relative"
              :class="
                formData.visual_style === style.id
                  ? 'border-[#7029FF] bg-indigo-50/40 shadow-xl'
                  : 'border-slate-50 bg-white hover:border-slate-200'
              "
            >
              <div class="aspect-[16/9] overflow-hidden relative">
                <img
                  :src="style.image"
                  :alt="style.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-[#1B2559]/90 via-transparent to-transparent"
                ></div>
                <div
                  v-if="formData.visual_style === style.id"
                  class="absolute top-4 right-4 w-8 h-8 bg-[#7029FF] rounded-full flex items-center justify-center text-white shadow-lg z-20"
                >
                  <Check :size="16" stroke-width="3" />
                </div>
                <div class="absolute bottom-4 left-4 right-4">
                  <h4 class="font-black text-white text-lg tracking-tight mb-1">
                    {{ style.name }}
                  </h4>
                  <p class="text-[10px] text-white/70 font-bold line-clamp-2">
                    {{ style.desc }}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </BottomSheet>
    </template>

    <!-- Confirmation Modal -->
    <ConfirmModal
      :is-open="showBackModal"
      title="Discard Changes?"
      message="You have unsaved modifications in this record. Exit anyway?"
      confirm-text="Discard & Exit"
      variant="danger"
      @close="showBackModal = false"
      @confirm="confirmBack"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft,
  Save,
  User,
  Clock,
  Check,
  Globe,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  Briefcase,
  Layout,
  X,
  ChevronUp,
  RotateCw,
  Plus,
  Search,
  Zap,
  Palette,
  Info,
} from "lucide-vue-next";
import { BaseButton, BottomSheet } from "@kangjessy/ui";
import BaseInput from "../components/ui/BaseInput.vue";
import Toast from "../components/ui/Toast.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import AdminTextarea from "../components/ui/AdminTextarea.vue";

import { clientsService } from "../services/clientsService";
import { couponsService, type Coupon } from "../services/couponsService";
import type { Client } from "../types";

import { serviceCategories } from "../data/order/services";
import { projectTypes } from "../data/order/projects";
import { availableFeatures } from "../data/order/features";
import { timelineOptions, styleOptions } from "../data/order/options";

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => !!route.params.id);
const isLeadRoute = computed(() => route.path.includes("/leads"));
const id = computed(() => route.params.id as string);

const loading = ref(false);
const saving = ref(false);
const currentStep = ref(1);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});
const showBackModal = ref(false);
const showMobileSummary = ref(false);
const originalData = ref("");

const selectedCategoryId = ref("web-app");
const selectedFeatureIds = ref<string[]>([]);
const selectedTimelineId = ref("standard");
const catalogueMode = ref<
  "type" | "feature" | "status" | "source" | "voucher" | "timeline" | "style"
>("type");
const isCatalogueOpen = ref(false);
const catalogueSearch = ref("");
const productionOptions = [
  "New",
  "Planning",
  "Design",
  "Developing",
  "Review",
  "Completed",
  "Maintenance",
];

const formData = ref<Partial<Client>>({
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "New",
  source: "manual",
  project_type: "",
  project_name: "",
  payment_status: "unpaid",
  payment_notes: "",
  notes: "",
  budget: 0,
  total_amount: 0,
  paid_amount: 0,
  project_status: "New",
  brief: "",
  features: "",
  visual_style: "",
  selected_timeline: "",
  voucher: "",

  is_converted: false,
  type: "project_order",
});

const activeVouchers = ref<Coupon[]>([]);

// Watch for ID changes to support navigation between different records
watch(id, (newId) => {
  if (newId && isEdit.value && !saving.value) {
    fetchRecord();
  }
});

onMounted(async () => {
  fetchActiveVouchers();

  // Set default status for non-lead routes
  if (!isLeadRoute.value && !isEdit.value) {
    formData.value.status = "Deal";
  }

  if (isEdit.value) {
    await fetchRecord();
    // If we're converting from lead to order, force status to Deal and set converted flag
    if (route.query.convert === "true") {
      formData.value.status = "Deal";
      formData.value.is_converted = true;
      // We don't change the type to project_order if it was general_inquiry,
      // so it STAYS in Lead Inbox history as requested.
    }
  } else if (route.query.fromLead) {
    await prefillFromLead(route.query.fromLead as string);
    formData.value.status = "Deal";
    formData.value.is_converted = true;
  } else {
    // New Record logic
    formData.value.type = isLeadRoute.value
      ? "general_inquiry"
      : "project_order";

    if (!isLeadRoute.value) {
      formData.value.status = "Deal";
    }
  }

  // Take snapshot AFTER all initial setup and pre-fills are done
  setTimeout(() => takeSnapshot(), 500);
});

const takeSnapshot = () => {
  originalData.value = JSON.stringify({
    ...formData.value,
    features: selectedFeatureIds.value.join(","),
    selected_timeline: selectedTimelineId.value,
  });
};

async function fetchActiveVouchers() {
  try {
    const data = await couponsService.getAll();
    activeVouchers.value = data.filter((v) => v.is_active);
  } catch (err) {
    console.error(err);
  }
}

async function fetchRecord() {
  loading.value = true;
  try {
    const data = await clientsService.getById(id.value);
    formData.value = { ...data };
    const type = projectTypes.find((p) => p.name === data.project_type);
    if (type) {
      selectedCategoryId.value = type.serviceId;
    }
    if (data.selected_timeline) {
      selectedTimelineId.value = data.selected_timeline;
    }
    if (data.features && typeof data.features === "string") {
      selectedFeatureIds.value = data.features.split(",").filter((f) => !!f);
    } else {
      selectedFeatureIds.value = [];
    }
    // Snapshot is now taken in onMounted after all setup
  } catch (err: any) {
    console.error("Fetch error:", err);
    showToast(`Error: ${err.message || "Record not found"}`, "error");
  } finally {
    loading.value = false;
  }
}

async function prefillFromLead(leadId: string) {
  loading.value = true;
  try {
    const data = await clientsService.getById(leadId);
    formData.value.name = data.name;
    formData.value.email = data.email;
    formData.value.phone = data.phone;
    formData.value.company = data.company;
    formData.value.budget = data.budget || data.total_amount;
    formData.value.total_amount = data.total_amount || data.budget;
    formData.value.source = data.source || "web_contact";
    formData.value.project_type = data.project_type || "";
    formData.value.brief = data.brief || data.notes;

    // Sync features
    if (data.features) {
      selectedFeatureIds.value = data.features.split(",").filter(Boolean);
    }

    // Try to auto-select category based on project_type
    const type = projectTypes.find(
      (p) => p.name === formData.value.project_type,
    );
    if (type) selectedCategoryId.value = type.serviceId;

    showToast("Data Lead berhasil ditarik sempurna!");
  } catch (err) {
    console.error(err);
    showToast("Gagal menarik data lead", "error");
  } finally {
    loading.value = false;
  }
}

const filteredProjectTypes = computed(() => {
  let filtered = projectTypes.filter(
    (p) => p.serviceId === selectedCategoryId.value,
  );
  if (catalogueSearch.value) {
    const q = catalogueSearch.value.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q),
    );
  }
  return filtered;
});

const filteredFeatures = computed(() => {
  let filtered = availableFeatures.filter((f) =>
    f.relevantTo.includes(selectedCategoryId.value),
  );
  if (catalogueSearch.value) {
    const q = catalogueSearch.value.toLowerCase();
    filtered = filtered.filter((f) => f.name.toLowerCase().includes(q));
  }
  return filtered;
});

const currentProjectType = computed(() =>
  projectTypes.find((p) => p.name === formData.value.project_type),
);
const basePrice = computed(() => currentProjectType.value?.basePrice || 0);
const featuresTotal = computed(() =>
  selectedFeatureIds.value.reduce(
    (sum, fid) =>
      sum + (availableFeatures.find((f) => f.id === fid)?.price || 0),
    0,
  ),
);
const selectedTimelineMultiplier = computed(
  () =>
    timelineOptions.find((o) => o.id === selectedTimelineId.value)
      ?.multiplier || 1,
);
const subtotalBeforeVoucher = computed(() =>
  Math.round(
    (basePrice.value + featuresTotal.value) * selectedTimelineMultiplier.value,
  ),
);
const currentVoucher = computed(() =>
  activeVouchers.value.find((v) => v.code === formData.value.voucher),
);

const voucherAmount = computed(() => {
  if (!currentVoucher.value) return 0;
  return currentVoucher.value.type === "percent"
    ? Math.round(
        subtotalBeforeVoucher.value * (currentVoucher.value.value / 100),
      )
    : currentVoucher.value.value;
});

const calculatedTotal = computed(() =>
  Math.max(0, subtotalBeforeVoucher.value - voucherAmount.value),
);

const openCatalogue = (
  mode:
    | "type"
    | "feature"
    | "status"
    | "source"
    | "voucher"
    | "timeline"
    | "style",
) => {
  catalogueMode.value = mode;
  catalogueSearch.value = "";
  isCatalogueOpen.value = true;
};

// Always sync Final Agreed Price with Estimated Investment
watch(calculatedTotal, (v) => {
  formData.value.total_amount = v;
  formData.value.budget = v;
});

// Extract client budget range from notes (from contact form)
const clientBudgetRange = computed(() => {
  if (!formData.value.notes) return null;
  const match = formData.value.notes.match(/\[Budget Range: (.+?)\]/);
  return match ? match[1] : null;
});

const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
};

const formatPrice = (v: any) =>
  "Rp " + (Number(v) || 0).toLocaleString("id-ID");
const getRemainingDebt = () =>
  (formData.value.total_amount || 0) - (formData.value.paid_amount || 0);

watch(
  [() => formData.value.total_amount, () => formData.value.paid_amount],
  () => {
    const paid = formData.value.paid_amount || 0;
    const total = formData.value.total_amount || 0;

    if (total === 0) formData.value.payment_status = "unpaid";
    else if (paid >= total) formData.value.payment_status = "paid";
    else if (paid > 0) formData.value.payment_status = "down_payment";
    else formData.value.payment_status = "unpaid";
  },
);

const handleBudgetInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, "");
  formData.value.total_amount = val ? parseInt(val) : 0;
  formData.value.budget = formData.value.total_amount;
};

const formattedBudget = computed(() =>
  formData.value.budget ? formData.value.budget.toLocaleString("id-ID") : "",
);

const selectProjectType = (type: any) => {
  formData.value.project_type = type.name;
  if (type.includedFeatureIds)
    selectedFeatureIds.value = [
      ...new Set([...selectedFeatureIds.value, ...type.includedFeatureIds]),
    ];
};

const toggleFeature = (id: string) => {
  const idx = selectedFeatureIds.value.indexOf(id);
  if (idx > -1) selectedFeatureIds.value.splice(idx, 1);
  else selectedFeatureIds.value.push(id);
};

const hasChanges = computed(() => {
  if (!originalData.value) return false;
  const currentData = JSON.stringify({
    ...formData.value,
    features: selectedFeatureIds.value.join(","),
    selected_timeline: selectedTimelineId.value,
  });
  return currentData !== originalData.value;
});

const handleBack = () => {
  if (hasChanges.value) showBackModal.value = true;
  else router.back();
};
const confirmBack = () => router.back();

const goToStep2 = () => {
  if (!formData.value.project_type)
    return showToast("Please select a project type", "error");
  currentStep.value = 2;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleSave = async () => {
  if (!formData.value.name)
    return showToast("Client Name is required", "error");
  saving.value = true;
  try {
    formData.value.features = selectedFeatureIds.value.join(",");

    if (!formData.value.project_name) {
      formData.value.project_name = `${formData.value.project_type || "Project"} - ${formData.value.name}`;
    }

    // Final check for conversion status
    if (route.query.convert === "true") {
      formData.value.status = "Deal";
      formData.value.is_converted = true;
      // If it was still "New" for project_status, move it to Planning
      if (
        !formData.value.project_status ||
        formData.value.project_status === "New"
      ) {
        formData.value.project_status = "Planning";
      }
    }

    console.log("[OrderEditor] Saving entry:", formData.value);

    if (isEdit.value) await clientsService.update(id.value, formData.value);
    else await clientsService.create(formData.value as any);

    showToast("Record saved successfully");
    setTimeout(
      () => router.push(isLeadRoute.value ? "/leads" : "/orders"),
      1000,
    );
  } catch (err: any) {
    showToast("Error: " + err.message, "error");
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
