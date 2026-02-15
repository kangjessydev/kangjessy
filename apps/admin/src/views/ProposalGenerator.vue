<template>
  <div class="min-h-screen bg-[#F8FAFC]">
    <!-- Action Bar -->
    <div
      class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-3 sm:px-8 sm:py-4 shadow-sm transition-all"
    >
      <div
        class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-0"
      >
        <div class="flex items-center gap-3 sm:gap-4">
          <button
            @click="$router.push('/proposals')"
            class="p-2 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2 shrink-0 bg-white border border-slate-100 shadow-sm"
          >
            <ArrowLeft :size="20" class="text-slate-500" />
            <span
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:block"
              >Back</span
            >
          </button>
          <div class="flex flex-col">
            <h1
              class="text-base sm:text-lg font-black text-[#1B2559] tracking-tight leading-tight"
            >
              Proposal Intel Generator
            </h1>
            <p
              class="text-[9px] sm:text-[10px] font-black text-[#702DFF] uppercase tracking-widest truncate"
            >
              Scientific Project Structuring
            </p>
          </div>
        </div>

        <div class="grid grid-cols-3 sm:flex gap-2 sm:gap-3 w-full sm:w-auto">
          <BaseButton
            variant="secondary"
            @click="fillDummyData"
            class="w-full sm:w-auto justify-center !px-2 sm:!px-4"
          >
            <FlaskConical :size="18" class="text-indigo-500" />
            <span class="hidden sm:inline ml-2">Test</span>
          </BaseButton>
          <BaseButton
            variant="secondary"
            @click="showResetConfirm = true"
            class="w-full sm:w-auto justify-center !px-2 sm:!px-4"
          >
            <RefreshCcw :size="18" />
            <span class="hidden sm:inline ml-2">Reset</span>
          </BaseButton>
          <BaseButton
            variant="primary"
            :loading="saving"
            @click="handleSave"
            class="w-full sm:w-auto justify-center !px-2 sm:!px-4"
          >
            <Save :size="18" />
            <span class="ml-2">{{ editingId ? "Save" : "Save" }}</span>
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="p-4 lg:p-8 grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1800px] mx-auto items-start"
    >
      <!-- Input Sidebar -->
      <div
        class="space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] pr-2 custom-scrollbar lg:pb-20"
      >
        <div
          class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-8"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-sm"
            >
              <User :size="20" />
            </div>
            <h3
              class="text-sm font-black text-[#1B2559] uppercase tracking-widest"
            >
              Ekosistem Klien
            </h3>
            <div v-if="formData.origin_type === 'from_lead'" class="ml-auto">
              <span
                class="px-2 py-1 bg-indigo-50 text-indigo-500 text-[8px] font-black rounded-lg uppercase tracking-widest border border-indigo-100/50"
                >Lead Linked</span
              >
            </div>
            <div
              v-else-if="formData.origin_type === 'independent'"
              class="ml-auto"
            >
              <span
                class="px-2 py-1 bg-amber-50 text-amber-500 text-[8px] font-black rounded-lg uppercase tracking-widest border border-amber-100/50"
                >Independent</span
              >
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              class="space-y-1.5 md:col-span-2 p-6 bg-slate-50/50 rounded-3xl border border-slate-100/50"
            >
              <label
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1"
                >Sumber Klien / Relasi</label
              >
              <div class="relative mt-2">
                <select
                  v-model="formData.lead_id"
                  :disabled="!!route.query.leadId"
                  class="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all disabled:opacity-60 disabled:bg-slate-50 appearance-none cursor-pointer"
                  @change="handleLeadSelect"
                >
                  <option :value="null">
                    Independent (Manual Input Below)
                  </option>
                  <option
                    v-for="lead in availableLeads"
                    :key="lead.id"
                    :value="lead.id"
                  >
                    {{ lead.name }} ({{ lead.company || "Personal" }}) — Link
                    Data
                  </option>
                </select>
                <div
                  v-if="!!route.query.leadId"
                  class="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Lock :size="14" class="text-slate-300" />
                </div>
              </div>
              <p
                class="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-2 ml-1"
              >
                {{
                  !!route.query.leadId
                    ? "Relasi dikunci karena dibuat dari inbox lead."
                    : "Hubungkan dengan lead yang sudah ada atau isi data baru di bawah."
                }}
              </p>
            </div>

            <div class="space-y-1.5 md:col-span-2">
              <label
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1"
                >Nama Proyek / Kampanye</label
              >
              <input
                v-model="formData.project_name"
                type="text"
                placeholder="misal: Redesign Aplikasi Perusahaan"
                class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
              />
            </div>
            <div class="space-y-1.5">
              <label
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1"
                >Nama Klien</label
              >
              <input
                v-model="formData.client_name"
                type="text"
                placeholder="misal: Budi Santoso"
                class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>
            <div class="space-y-1.5">
              <label
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1"
                >Organisasi / Brand</label
              >
              <input
                v-model="formData.company"
                type="text"
                placeholder="misal: PT Maju Bersama"
                class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <!-- Section: Narrative Pipeline -->
        <div
          class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-8"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-sm"
            >
              <FileEdit :size="20" />
            </div>
            <h3
              class="text-sm font-black text-[#1B2559] uppercase tracking-widest"
            >
              Narasi Strategis
            </h3>
          </div>

          <div class="space-y-6">
            <div class="space-y-2">
              <label
                class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"
              >
                01. Latar Belakang (Background)
                <Info :size="10" title="Alasan proyek ini perlu dijalankan" />
              </label>
              <textarea
                v-model="narrative.bg"
                rows="3"
                placeholder="Jelaskan kondisi saat ini atau sejarah brand klien..."
                class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div class="space-y-2">
              <label
                class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"
              >
                02. Identifikasi Masalah (Problem)
              </label>
              <textarea
                v-model="narrative.prob"
                rows="3"
                placeholder="Apa hambatan utama yang dihadapi klien saat ini?"
                class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-rose-500/10 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div class="space-y-2">
              <label
                class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"
              >
                03. Solusi Yang Ditawarkan (Solution)
              </label>
              <textarea
                v-model="narrative.sol"
                rows="3"
                placeholder="Bagaimana KJ-PRO akan menyelesaikan masalah tersebut?"
                class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Section: Technical Stack -->
        <div
          class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-8"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-sm"
            >
              <Zap :size="20" />
            </div>
            <h3
              class="text-sm font-black text-[#1B2559] uppercase tracking-widest"
            >
              Infrastruktur Inti
            </h3>
          </div>

          <div class="space-y-8">
            <!-- Project Type Selection -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1"
                  >Tipe Proyek</label
                >
                <div class="relative w-48 group">
                  <Search
                    :size="12"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                  />
                  <input
                    v-model="searchProjectType"
                    placeholder="Cari tipe..."
                    class="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all"
                  />
                </div>
              </div>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-1"
              >
                <button
                  v-for="type in filteredProjectTypes"
                  :key="type.name"
                  @click="formData.project_type = type.name"
                  class="group p-4 rounded-2xl border text-left transition-all relative overflow-hidden"
                  :class="
                    formData.project_type === type.name
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20 ring-2 ring-offset-2 ring-indigo-500/20'
                      : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm'
                  "
                >
                  <div class="flex items-start justify-between mb-2">
                    <component
                      :is="type.icon"
                      :size="18"
                      :class="
                        formData.project_type === type.name
                          ? 'text-white'
                          : 'text-indigo-500'
                      "
                    />
                    <div
                      v-if="formData.project_type === type.name"
                      class="p-1 bg-white/20 rounded-full backdrop-blur-sm"
                    >
                      <Check :size="12" class="text-white" />
                    </div>
                  </div>
                  <h4
                    class="text-xs font-black uppercase tracking-wider mb-1 line-clamp-1"
                  >
                    {{ type.name }}
                  </h4>
                  <p class="text-[10px] opacity-80 font-medium">
                    Rp {{ type.basePrice.toLocaleString("id-ID") }}
                  </p>
                </button>
              </div>
            </div>

            <!-- Features -->
            <div class="space-y-3 pt-6 border-t border-slate-50">
              <div class="flex items-center justify-between">
                <label
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1"
                  >Fitur Tambahan</label
                >
                <div class="relative w-48 group">
                  <Search
                    :size="12"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                  />
                  <input
                    v-model="searchFeature"
                    placeholder="Cari fitur..."
                    class="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              <div
                v-if="!formData.project_type"
                class="py-8 text-center border-2 border-dashed border-slate-50 rounded-3xl bg-slate-50/50"
              >
                <p
                  class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
                >
                  Pilih Tipe Proyek Dahulu
                </p>
              </div>

              <div
                v-else-if="filteredFeatures.length === 0"
                class="py-8 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50"
              >
                <p
                  class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
                >
                  Tidak ada fitur tambahan relevan
                </p>
              </div>

              <div
                v-else
                class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-1"
              >
                <button
                  v-for="feature in filteredFeatures"
                  :key="feature.id"
                  @click="toggleFeature(feature.id)"
                  class="group p-4 rounded-2xl border text-left transition-all relative"
                  :class="
                    selectedFeatureIds.includes(feature.id)
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20 ring-2 ring-offset-2 ring-emerald-500/20'
                      : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-sm'
                  "
                >
                  <div class="flex items-start justify-between mb-2">
                    <component
                      :is="feature.icon"
                      :size="18"
                      :class="
                        selectedFeatureIds.includes(feature.id)
                          ? 'text-white'
                          : 'text-slate-400 group-hover:text-emerald-500 transition-colors'
                      "
                    />
                    <div
                      v-if="selectedFeatureIds.includes(feature.id)"
                      class="p-1 bg-white/20 rounded-full backdrop-blur-sm"
                    >
                      <Check :size="12" class="text-white" />
                    </div>
                  </div>
                  <div class="flex justify-between items-start gap-2">
                    <div>
                      <h4 class="text-[11px] font-bold mb-1 leading-tight">
                        {{ feature.name }}
                      </h4>
                      <p class="text-[10px] opacity-80 font-medium">
                        Rp {{ feature.price.toLocaleString("id-ID") }}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <!-- Timeline & Urgency -->
            <div class="space-y-4 pt-8 border-t border-slate-50">
              <div class="flex items-center justify-between">
                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Timeline & Urgency</label>
                <span class="text-[8px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-lg">Sync with Agency</span>
              </div>
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  v-for="opt in [
                    { id: 'Normal', label: 'Normal', multiplier: '1.0x', desc: 'Standard', color: 'slate' },
                    { id: 'Standard', label: 'Priority', multiplier: '1.1x', desc: 'Faster', color: 'indigo' },
                    { id: 'Express', label: 'Express', multiplier: '1.35x', desc: 'High Priority', color: 'amber' },
                    { id: 'Urgent', label: 'Urgent', multiplier: '1.5x', desc: 'ASAP', color: 'rose' }
                  ]"
                  :key="opt.id"
                  @click="formData.selected_timeline = opt.id"
                  class="p-4 rounded-3xl border text-left transition-all relative overflow-hidden group"
                  :class="
                    formData.selected_timeline === opt.id
                      ? `border-${opt.color}-500 bg-${opt.color}-500 text-white shadow-lg`
                      : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                  "
                >
                  <p class="text-[10px] font-black uppercase tracking-tight mb-1">{{ opt.label }}</p>
                  <p class="text-[14px] font-black tracking-tight" :class="formData.selected_timeline === opt.id ? 'text-white' : 'text-[#1B2559]'">{{ opt.multiplier }}</p>
                  <p class="text-[8px] font-bold opacity-60 uppercase tracking-widest">{{ opt.desc }}</p>
                  
                  <div 
                    v-if="formData.selected_timeline === opt.id"
                    class="absolute top-2 right-2"
                  >
                    <Check :size="10" stroke-width="4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Scope & Deliverables -->
        <div
          class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-8"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-sm"
            >
              <Check :size="20" />
            </div>
            <h3
              class="text-sm font-black text-[#1B2559] uppercase tracking-widest"
            >
              Scope & Deliverables
            </h3>
          </div>

          <div class="space-y-6">
            <div class="space-y-3">
              <label
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex justify-between"
              >
                <span>Apa yang Klien Dapatkan?</span>
                <span
                  class="text-indigo-500 cursor-pointer hover:underline"
                  @click="formData.deliverables.push('')"
                  >+ Item Baru</span
                >
              </label>

              <div
                v-if="formData.deliverables.length === 0"
                class="p-6 text-center border-2 border-dashed border-slate-50 rounded-2xl"
              >
                <p class="text-[10px] text-slate-400 font-bold">
                  Pilih "Tipe Pondasi" di atas untuk isi otomatis, atau tambah
                  manual.
                </p>
              </div>

              <div
                v-for="(_, idx) in formData.deliverables"
                :key="idx"
                class="flex gap-2"
              >
                <div
                  class="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg shrink-0"
                >
                  <Check :size="14" class="text-emerald-500" />
                </div>
                <input
                  v-model="formData.deliverables[idx]"
                  type="text"
                  class="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500/10 outline-none min-w-0"
                  placeholder="Contoh: 1x Domain Setahun"
                />
                <button
                  type="button"
                  @click.stop.prevent="removeDeliverable(idx)"
                  class="relative z-10 w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg shrink-0 transition-all active:scale-95 border border-transparent hover:border-rose-100 cursor-pointer"
                  title="Hapus Item"
                >
                  <Trash2 :size="14" class="pointer-events-none" />
                </button>
              </div>
            </div>

            <div class="space-y-6 pt-4 border-t border-slate-100">
              <div class="space-y-2">
                <label
                  class="text-xs font-black text-indigo-900 uppercase tracking-wider ml-1"
                >
                  01. Pembayaran & Garansi
                </label>
                <textarea
                  v-model="formData.terms_payment"
                  rows="3"
                  class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium text-slate-600 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none leading-relaxed"
                  placeholder="Contoh: DP 50% di awal..."
                ></textarea>
              </div>

              <div class="space-y-2">
                <label
                  class="text-xs font-black text-indigo-900 uppercase tracking-wider ml-1"
                >
                  02. Hak Cipta & Lisensi
                </label>
                <textarea
                  v-model="formData.terms_copyright"
                  rows="3"
                  class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium text-slate-600 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none leading-relaxed"
                  placeholder="Contoh: Source code milik klien..."
                ></textarea>
              </div>

              <div class="space-y-2">
                <label
                  class="text-xs font-black text-indigo-900 uppercase tracking-wider ml-1"
                >
                  03. Batasan Revisi
                </label>
                <textarea
                  v-model="formData.terms_revision"
                  rows="3"
                  class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium text-slate-600 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none leading-relaxed"
                  placeholder="Contoh: Maksimal 3x revisi minor..."
                ></textarea>
              </div>

              <div class="space-y-4 pt-6 border-t border-slate-100">
                <div class="flex items-center justify-between">
                  <label
                    class="text-xs font-black text-indigo-900 uppercase tracking-wider ml-1"
                  >
                    04. Rekening Pembayaran
                  </label>
                  <p
                    class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    Pilih yang akan muncul di proposal
                  </p>
                </div>

                <div
                  v-if="activeBanks.length === 0"
                  class="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3"
                >
                  <AlertTriangle :size="16" class="text-amber-500" />
                  <p class="text-[10px] font-bold text-amber-700">
                    Belum ada rekening aktif di Pengaturan.
                  </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    v-for="bank in activeBanks"
                    :key="bank.account_number"
                    class="flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer group"
                    :class="
                      isBankSelected(bank)
                        ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    "
                  >
                    <input
                      type="checkbox"
                      :checked="isBankSelected(bank)"
                      @change="toggleBank(bank)"
                      class="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div class="flex items-center gap-2 overflow-hidden">
                      <div
                        class="w-6 h-6 rounded bg-white border border-slate-100 flex items-center justify-center p-0.5 shrink-0"
                      >
                        <img
                          v-if="getBankLogo(bank.bank_name)"
                          :src="getBankLogo(bank.bank_name)"
                          class="w-full h-full object-contain"
                        />
                      </div>
                      <div class="min-w-0">
                        <p
                          class="text-[10px] font-black text-[#1B2559] truncate"
                        >
                          {{ bank.bank_name }}
                        </p>
                        <p class="text-[9px] font-bold text-slate-400 truncate">
                          {{ bank.account_number }}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div class="flex gap-2 justify-end">
                <button
                  @click="fillDefaultTerms"
                  class="text-xs font-black text-indigo-500 hover:text-indigo-600 hover:underline"
                >
                  Isi Template Standar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Preview Render (Desktop) -->
      <div class="hidden xl:flex flex-col items-center">
        <div class="sticky top-28 w-full space-y-6">
          <div
            class="flex justify-between items-center px-4 bg-white/50 backdrop-blur-md py-3 rounded-2xl border border-white/50"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"
              ></div>
              <p
                class="text-[10px] font-black text-[#1B2559] uppercase tracking-[0.3em]"
              >
                Live Preview
              </p>
            </div>
            <div
              class="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]"
            >
              <span class="text-slate-400">Nilai Proyek:</span>
              <span class="text-indigo-600 font-mono">{{
                formatPrice(finalTotal)
              }}</span>
            </div>
          </div>

          <ProposalDetailPreview
            :form-data="formData"
            :narrative="narrative"
            :selected-features="selectedFeatures"
            :foundation-price="foundationPrice"
            :final-total="finalTotal"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Floating Preview Button -->
    <div class="fixed bottom-6 right-6 z-40 lg:hidden">
      <button
        @click="isMobilePreviewOpen = true"
        class="w-14 h-14 rounded-full bg-[#702DFF] text-white shadow-xl shadow-indigo-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        title="Live Preview"
      >
        <Eye :size="24" />
      </button>
    </div>

    <!-- Mobile Live Preview Modal -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-full opacity-0"
    >
      <div
        v-if="isMobilePreviewOpen"
        class="fixed inset-0 z-[60] bg-[#F8FAFC] flex flex-col"
      >
        <!-- Modal Header -->
        <div
          class="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10"
        >
          <div>
            <h3 class="text-sm font-black text-[#1B2559]">Live Preview</h3>
            <p
              class="text-[10px] text-slate-400 font-bold uppercase tracking-widest"
            >
              {{ formatPrice(finalTotal) }}
            </p>
          </div>
          <button
            @click="isMobilePreviewOpen = false"
            class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Modal Content -->
        <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <ProposalDetailPreview
            :form-data="formData"
            :narrative="narrative"
            :selected-features="selectedFeatures"
            :foundation-price="foundationPrice"
            :final-total="finalTotal"
            is-mobile
          />
        </div>
      </div>
    </transition>

    <!-- Modals & Toasts -->
    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />

    <ConfirmModal
      :is-open="showResetConfirm"
      title="Reset Generator?"
      message="Seluruh konten narasi dan konfigurasi akan dihapus permanen. Lanjutkan?"
      confirm-text="Reset Now"
      variant="danger"
      @close="showResetConfirm = false"
      @confirm="resetForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  ArrowLeft,
  RefreshCcw,
  Save,
  User,
  FileEdit,
  Zap,
  AlertTriangle,
  Eye,
  Trash2,
  Lock,
  FlaskConical,
  Search,
  X,
} from "lucide-vue-next";
import {
  proposalService,
  type Proposal,
  type ProposalInput,
} from "../services/proposalService";
import { clientsService } from "../services/clientsService";
import { couponsService, type Coupon } from "../services/couponsService";
import type { Client } from "../types";
import { projectTypes } from "../data/order/projects";
import { availableFeatures } from "../data/order/features";
import { BaseButton } from "@kangjessy/ui";
import Toast from "../components/ui/Toast.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";
import ProposalDetailPreview from "../components/proposals/ProposalDetailPreview.vue";
import { usePaymentSettings } from "../composables/usePaymentSettings";

const router = useRouter();
const route = useRoute();
const saving = ref(false);
const showResetConfirm = ref(false);
const activeProposals = ref<Proposal[]>([]);
const fetchingLead = ref(false);
const editingId = ref<string | null>(null);
const isMobilePreviewOpen = ref(false);

const formData = ref({
  project_name: "",
  client_name: "",
  company: "",
  email: "",
  phone: "",
  project_type: "",
  features: [] as string[],
  voucher_code: "",
  selected_timeline: "Standard",
  status: "draft" as any,
  origin_type: "independent" as any,
  lead_id: null as string | null,
  deliverables: [] as string[],
  terms: "",
  terms_payment: "",
  terms_copyright: "",
  terms_revision: "",
  payment_accounts: [] as any[],
});

const narrative = ref({
  bg: "",
  prob: "",
  sol: "",
});

const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const showToast = (msg: string, variant: "success" | "error" = "success") => {
  toast.value = { show: true, message: msg, variant };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const selectedFeatureIds = ref<string[]>([]);
const activeVouchers = ref<Coupon[]>([]);
const availableLeads = ref<Client[]>([]);

const autoPopulateDeliverables = () => {
  const type = projectTypes.find((t) => t.name === formData.value.project_type);
  if (type) {
    // Only auto-fill if empty to avoid overwriting user edits
    if (formData.value.deliverables.length === 0 && type.deliverables) {
      formData.value.deliverables = [...type.deliverables];
    }
  }
};

function handleLeadSelect() {
  const selectedLead = availableLeads.value.find(
    (l) => l.id === formData.value.lead_id,
  );
  if (selectedLead) {
    formData.value.client_name = selectedLead.name;
    formData.value.company = selectedLead.company || "";
    formData.value.email = selectedLead.email || "";
    formData.value.phone = selectedLead.phone || "";
    formData.value.project_type = selectedLead.project_type || "";
    formData.value.origin_type = "from_lead";
    if (selectedLead.brief) {
      narrative.value.bg = selectedLead.brief;
    }
    // Logic auto-populate will trigger via watch
  }
}

const loadProposal = async (id: string) => {
  if (!id || id === "undefined" || id === "null") return;
  if (editingId.value === id) return;

  fetchingLead.value = true;
  try {
    const data = await proposalService.getById(id);
    if (!data) return;

    editingId.value = data.id;
    selectedFeatureIds.value = data.features || [];
    narrative.value = {
      bg: data.background || "",
      prob: data.problem || "",
      sol: data.solution || "",
    };

    formData.value = {
      project_name: data.project_name || "",
      client_name: data.client_name || "",
      company: data.company || "",
      email: data.email || "",
      phone: data.phone || "",
      project_type: data.project_type || "",
      features: data.features || [],
      voucher_code: data.voucher_code || "",
      selected_timeline: data.selected_timeline || "Standard",
      status: data.status,
      origin_type: data.origin_type,
      lead_id: data.lead_id || null,
      deliverables: data.deliverables || [],
      terms: data.terms || "",
      terms_payment: data.terms_payment || "",
      terms_copyright: data.terms_copyright || "",
      terms_revision: data.terms_revision || "",
      payment_accounts: data.payment_accounts || [],
    };

    // If loading existing with no selection, or just loaded
    // Ensure we don't overwrite if it already has data
  } catch (e) {
    console.error("Load failed", e);
  } finally {
    fetchingLead.value = false;
  }
};

const { activeBanks, getBankLogo, initPaymentSettings } = usePaymentSettings(); // Moved up for onMounted access

onMounted(async () => {
  try {
    await initPaymentSettings(); // Initialize payment settings first
    const [coupons, allProposals, inboxLeads] = await Promise.all([
      couponsService.getAll(),
      proposalService.getAll(),
      clientsService.getLeads(),
    ]);
    activeVouchers.value = coupons;
    availableLeads.value = inboxLeads;
    activeProposals.value = allProposals;

    // Set default payment accounts if new
    if (!editingId.value && formData.value.payment_accounts.length === 0) {
      formData.value.payment_accounts = [...activeBanks.value];
    }
  } catch (e) {
    console.error("Init failed", e);
  }
});

const isBankSelected = (bank: any) => {
  return formData.value.payment_accounts.some(
    (acc: any) =>
      acc.account_number === bank.account_number &&
      acc.bank_name === bank.bank_name,
  );
};

const toggleBank = (bank: any) => {
  const index = formData.value.payment_accounts.findIndex(
    (acc: any) =>
      acc.account_number === bank.account_number &&
      acc.bank_name === bank.bank_name,
  );
  if (index > -1) {
    formData.value.payment_accounts.splice(index, 1);
  } else {
    formData.value.payment_accounts.push({ ...bank });
  }
};

watch(
  () => [route.query.id, route.query.leadId],
  ([newId, newLeadId]) => {
    if (newId) loadProposal(String(newId));
    else if (newLeadId) loadProposal(String(newLeadId));
  },
  { immediate: true },
);

const toggleFeature = (id: string) => {
  const idx = selectedFeatureIds.value.indexOf(id);
  if (idx > -1) selectedFeatureIds.value.splice(idx, 1);
  else selectedFeatureIds.value.push(id);
  formData.value.features = [...selectedFeatureIds.value];
};

const searchProjectType = ref("");
const searchFeature = ref("");

const filteredProjectTypes = computed(() => {
  if (!searchProjectType.value.trim()) return projectTypes;
  return projectTypes.filter(
    (t) =>
      t.name.toLowerCase().includes(searchProjectType.value.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchProjectType.value.toLowerCase()),
  );
});

const foundationPrice = computed(() => {
  const type = projectTypes.find((t) => t.name === formData.value.project_type);
  return type?.basePrice || 0;
});

const filteredFeatures = computed(() => {
  const selectedType = projectTypes.find(
    (t) => t.name === formData.value.project_type,
  );
  if (!selectedType) return [];

  let features = availableFeatures.filter((f) =>
    f.relevantTo.includes(selectedType.serviceId),
  );

  if (searchFeature.value.trim()) {
    features = features.filter(
      (f) =>
        f.name.toLowerCase().includes(searchFeature.value.toLowerCase()) ||
        f.desc.toLowerCase().includes(searchFeature.value.toLowerCase()),
    );
  }
  return features;
});

watch(
  () => formData.value.project_type,
  (newVal, oldVal) => {
    autoPopulateDeliverables();

    // Reset features if category changes
    // (Logic: If the newly selected project type has a different serviceId/category
    // than the old one, we reset features to avoid invalid combinations)
    if (newVal && oldVal) {
      const newType = projectTypes.find((t) => t.name === newVal);
      const oldType = projectTypes.find((t) => t.name === oldVal);

      // If service category changed, reset features
      // Or simply, we can check if current selected features are still relevant
      if (newType && oldType && newType.serviceId !== oldType.serviceId) {
        // Filter out features that are no longer relevant
        const newRelevantFeatures = availableFeatures.filter((f) =>
          f.relevantTo.includes(newType.serviceId),
        );
        const newRelevantIds = newRelevantFeatures.map((f) => f.id);

        const previousCount = selectedFeatureIds.value.length;
        selectedFeatureIds.value = selectedFeatureIds.value.filter((id) =>
          newRelevantIds.includes(id),
        );

        if (selectedFeatureIds.value.length < previousCount) {
          showToast(
            "Beberapa fitur di-reset karena perbedaan kategori layanan",
            "error",
          );
        }
      }
    }
  },
);

const finalTotal = computed(() => {
  const base =
    foundationPrice.value +
    selectedFeatures.value.reduce((sum, f) => sum + f.price, 0);
  let multiplier = 1;
  // Sync with Agency: standard (1.1), express (1.35)
  if (formData.value.selected_timeline === "Standard") multiplier = 1.1;
  if (formData.value.selected_timeline === "Express") multiplier = 1.35;
  if (formData.value.selected_timeline === "Urgent") multiplier = 1.5; // Keeping Urgent as a premium option

  let voucherVal = 0;
  const v = activeVouchers.value.find(
    (v) => v.code === formData.value.voucher_code,
  );
  if (v) {
    voucherVal =
      v.type === "percent"
        ? Math.round(base * multiplier * (v.value / 100))
        : v.value;
  }

  return Math.round(base * multiplier - voucherVal);
});

const selectedFeatures = computed(() => {
  return availableFeatures.filter((f) =>
    selectedFeatureIds.value.includes(f.id),
  );
});

const formatPrice = (v: number) => "Rp " + (v || 0).toLocaleString("id-ID");

const fillDefaultTerms = () => {
  formData.value.terms_payment = `1. DP 50% dibayarkan sebelum pengerjaan dimulai sebagai tanda jadi kontrak.\n2. Pelunasan 50% wajib dilakukan setelah preview final disetujui, sebelum serah terima akses admin.\n3. Garansi 30 hari untuk perbaikan error/bug (tidak termasuk penambahan fitur baru).`;
  formData.value.terms_copyright = `1. Klien mendapatkan hak guna penuh atas website setelah pelunasan.\n2. Source code (jika paket custom) menjadi milik klien.\n3. Konten (teks/gambar) sepenuhnya tanggung jawab klien.`;
  formData.value.terms_revision = `Revisi minor (typo, warna, ganti gambar) diterima maksimal 3 putaran. Perubahan logika atau struktur mayor akan dikenakan biaya tambahan sesuai kesepakatan.`;
};

const handleSave = async () => {
  if (!formData.value.client_name)
    return showToast("Nama klien wajib diisi!", "error");
  if (!formData.value.project_type)
    return showToast("Pilih pondasi proyek dulu Kak!", "error");

  saving.value = true;
  try {
    const payload: ProposalInput = {
      ...formData.value,
      background: narrative.value.bg,
      problem: narrative.value.prob,
      solution: narrative.value.sol,
      base_price: foundationPrice.value,
      feature_total: selectedFeatures.value.reduce(
        (sum, f) => sum + f.price,
        0,
      ),
      final_total: finalTotal.value,
      features: [...selectedFeatureIds.value],
      deliverables: [...formData.value.deliverables].filter((d) => d.trim()),
      terms: formData.value.terms,
      terms_payment: formData.value.terms_payment,
      terms_copyright: formData.value.terms_copyright,
      terms_revision: formData.value.terms_revision,
      payment_accounts: formData.value.payment_accounts,
    };

    if (!payload.project_name) {
      payload.project_name = `${formData.value.project_type || "Solusi Digital"} - ${formData.value.client_name}`;
    }

    let res;
    if (editingId.value) {
      res = await proposalService.update(editingId.value, payload);
      showToast("Proposal Berhasil Diperbarui!");
    } else if (route.query.leadId) {
      res = await proposalService.createFromLead(
        String(route.query.leadId),
        payload,
      );
      showToast("Lead Berhasil Dikonversi ke Proposal!");
    } else {
      res = await proposalService.create(payload);
      showToast("Proposal Baru Berhasil Dibuat!");
    }

    if (res && res.id) {
      setTimeout(() => {
        router.push(`/proposals`);
      }, 1000);
    }
  } catch (e) {
    console.error("Save failed", e);
    showToast("Gagal menyambung ke database proposal.", "error");
  } finally {
    saving.value = false;
  }
};

const resetForm = () => {
  editingId.value = null;
  formData.value = {
    project_name: "",
    client_name: "",
    company: "",
    email: "",
    phone: "",
    project_type: "",
    features: [],
    voucher_code: "",
    selected_timeline: "Standard",
    status: "draft",
    origin_type: "independent",
    lead_id: null as string | null,
    deliverables: [] as string[],
    terms: "",
    terms_payment: "",
    terms_copyright: "",
    terms_revision: "",
    payment_accounts: [] as any[],
  };
  // Re-fill with active ones if reset
  formData.value.payment_accounts = [...activeBanks.value];
  narrative.value = { bg: "", prob: "", sol: "" };
  selectedFeatureIds.value = [];
  showResetConfirm.value = false;
  showToast("Generator Dikosongkan");
  router.replace("/proposals/generator");
};

const fillDummyData = () => {
  formData.value.project_name = "Revamp E-Commerce TokoBaju";
  formData.value.client_name = "Budi Santoso";
  formData.value.company = "PT Toko Baju Maju";
  formData.value.email = "budi@tokobaju.com";
  formData.value.phone = "081234567890";
  formData.value.project_type = "The Foundation (Web)";

  narrative.value.bg =
    "PT Toko Baju Maju adalah pemain retail fashion yang sedang berkembang pesat. Namun, website saat ini masih menggunakan teknologi lama yang lambat dan tidak mobile-friendly.";
  narrative.value.prob =
    "Conversion rate rendah karena loading > 5 detik. Tampilan di HP berantakan. Tidak terintegrasi dengan stok gudang.";
  narrative.value.sol =
    "Membangun ulang website menggunakan Nuxt.js untuk performa tinggi. Desain mobile-first yang modern. Integrasi API stok real-time.";

  showToast("Dummy data injected!");
};

const removeDeliverable = (index: number) => {
  console.log("Removing deliverable at index:", index);
  if (index >= 0 && index < formData.value.deliverables.length) {
    formData.value.deliverables.splice(index, 1);
  } else {
    console.error("Invalid index for deletion:", index);
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
