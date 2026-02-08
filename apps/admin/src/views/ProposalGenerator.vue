<template>
  <div class="min-h-screen bg-[#F8FAFC]">
    <!-- Action Bar -->
    <div
      class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-4 flex justify-between items-center shadow-sm"
    >
      <div class="flex items-center gap-4">
        <button
          @click="$router.push('/proposals')"
          class="p-2 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2"
        >
          <ArrowLeft :size="20" class="text-slate-500" />
          <span
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:block"
            >Back to CMS</span
          >
        </button>
        <div>
          <h1 class="text-lg font-black text-[#1B2559] tracking-tight">
            Proposal Intel Generator
          </h1>
          <p
            class="text-[10px] font-black text-[#702DFF] uppercase tracking-widest"
          >
            Scientific Project Structuring
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <BaseButton variant="secondary" @click="fillDummyData">
          <FlaskConical :size="18" class="text-indigo-500" />
          Test
        </BaseButton>
        <BaseButton variant="secondary" @click="showResetConfirm = true">
          <RefreshCcw :size="18" />
          Kosongkan Form
        </BaseButton>
        <BaseButton variant="primary" :loading="saving" @click="handleSave">
          <Save :size="18" />
          {{ editingId ? "Simpan Perubahan" : "Finalisasi & Sinkron" }}
        </BaseButton>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="p-4 lg:p-8 grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1800px] mx-auto"
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
            <div v-if="formData.type === 'general_inquiry'" class="ml-auto">
              <span
                class="px-2 py-1 bg-indigo-50 text-indigo-500 text-[8px] font-black rounded-lg uppercase tracking-widest border border-indigo-100/50"
                >Lead Linked</span
              >
            </div>
            <div v-else-if="formData.type === 'project_order'" class="ml-auto">
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
                v-model="formData.name"
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

          <div class="grid grid-cols-1 gap-6">
            <div class="space-y-1.5">
              <label
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1"
                >Tipe Pondasi (Base)</label
              >
              <select
                v-model="formData.project_type"
                class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>Pilih basis proyek...</option>
                <option
                  v-for="type in projectTypes"
                  :key="type.name"
                  :value="type.name"
                >
                  {{ type.name }} (Rp
                  {{ type.basePrice.toLocaleString("id-ID") }})
                </option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1"
                >Modul Kecerdasan (Add-ons)</label
              >
              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar"
              >
                <!-- Empty State for Features -->
                <div
                  v-if="!formData.project_type"
                  class="col-span-full py-8 text-center border-2 border-dashed border-slate-50 rounded-3xl"
                >
                  <p
                    class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
                  >
                    Pilih Pondasi Proyek Terlebih Dahulu
                  </p>
                </div>

                <div
                  v-else-if="filteredFeatures.length === 0"
                  class="col-span-full py-8 text-center border-2 border-dashed border-slate-50 rounded-3xl"
                >
                  <p
                    class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
                  >
                    Tidak ada modul tambahan untuk tipe ini
                  </p>
                </div>

                <div
                  v-for="feat in filteredFeatures"
                  :key="feat.id"
                  @click="toggleFeature(feat.id)"
                  class="flex flex-col p-4 rounded-3xl border transition-all cursor-pointer relative overflow-hidden"
                  :class="
                    selectedFeatureIds.includes(feat.id)
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                      : 'bg-slate-50 border-slate-100 hover:border-indigo-100 text-slate-600'
                  "
                >
                  <div
                    class="flex justify-between items-start mb-2 relative z-10"
                  >
                    <span
                      class="text-[10px] font-black uppercase tracking-widest opacity-80"
                      >{{ feat.name }}</span
                    >
                    <Check
                      v-if="selectedFeatureIds.includes(feat.id)"
                      :size="14"
                      stroke-width="3"
                    />
                  </div>
                  <p
                    class="text-[9px] font-bold opacity-60 relative z-10 line-clamp-2"
                  >
                    {{ feat.desc }}
                  </p>
                  <p
                    class="text-[9px] font-black mt-2 relative z-10"
                    :class="
                      selectedFeatureIds.includes(feat.id)
                        ? 'text-indigo-200'
                        : 'text-slate-400'
                    "
                  >
                    Rp {{ feat.price.toLocaleString("id-ID") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section: History -->
        <div
          class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-8"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-sm"
              >
                <History :size="20" />
              </div>
              <h3
                class="text-sm font-black text-[#1B2559] uppercase tracking-widest"
              >
                Riwayat Proposal Intelijen
              </h3>
            </div>
            <span class="text-[9px] font-black text-slate-300 uppercase"
              >{{ activeProposals.length }} Tersimpan</span
            >
          </div>

          <div
            v-if="activeProposals.length === 0"
            class="py-12 text-center border-2 border-dashed border-slate-50 rounded-[32px]"
          >
            <p
              class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
            >
              Belum ada riwayat proposal
            </p>
          </div>

          <div
            v-else
            class="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
          >
            <div
              v-for="prop in activeProposals.slice(0, 15)"
              :key="prop.id"
              class="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white border border-transparent hover:border-indigo-100 rounded-2xl transition-all cursor-pointer"
              @click="loadProposal(prop.id)"
            >
              <div class="flex items-center gap-4 overflow-hidden">
                <div
                  class="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100 shrink-0 group-hover:border-indigo-100 transition-colors"
                >
                  <FileText
                    :size="18"
                    class="text-slate-400 group-hover:text-indigo-500 transition-colors"
                  />
                </div>
                <div class="overflow-hidden">
                  <p
                    class="text-[11px] font-black text-[#1B2559] truncate uppercase tracking-tight"
                  >
                    {{
                      prop.project_name ||
                      prop.project_type ||
                      "Untitled Project"
                    }}
                  </p>
                  <p class="text-[9px] font-bold text-slate-400 truncate">
                    {{ prop.name }} • {{ prop.company || "Personal" }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col gap-1 items-start">
                <span class="status-pill" :class="getStatusClass(prop.status)">
                  {{ prop.status }}
                </span>
                <span
                  v-if="prop.is_converted"
                  class="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black rounded uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                >
                  Converted
                </span>
              </div>
              <div class="flex items-center gap-2 transition-all">
                <button
                  @click.stop="deleteProposal(prop.id)"
                  class="p-2 hover:bg-rose-50 text-slate-300 hover:text-rose-500 rounded-lg transition-colors"
                >
                  <Trash2 :size="14" />
                </button>
                <div
                  class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"
                >
                  <Eye :size="14" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Preview Render -->
      <div class="flex flex-col items-center">
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
                Live Architecture Preview
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

          <!-- Large Professional Document Preview -->
          <div
            class="bg-white rounded-[40px] shadow-2xl shadow-indigo-500/10 border border-slate-100 overflow-hidden flex flex-col h-[calc(100vh-220px)] transition-all"
          >
            <div
              class="w-full h-full overflow-y-auto custom-scrollbar text-left font-sans"
            >
              <!-- Cover Section -->
              <div
                class="bg-[#1B2559] p-12 text-white min-h-[400px] flex flex-col justify-center relative overflow-hidden"
              >
                <div class="mb-8 flex items-center justify-between">
                  <div
                    class="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg"
                  >
                    <img
                      src="/logo-agency.png"
                      alt="Logo"
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <h1 class="text-xl font-black tracking-tighter uppercase">
                    Kang <span class="text-indigo-400">Jessy</span>
                  </h1>
                </div>
                <p
                  class="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-4"
                >
                  Proposal Proyek
                </p>
                <h2
                  class="text-4xl font-black tracking-tighter leading-none mb-12"
                >
                  {{
                    formData.project_name || "Transformasi Digital Strategis"
                  }}
                </h2>
                <div
                  class="grid grid-cols-2 gap-8 border-t border-white/10 pt-8"
                >
                  <div>
                    <p
                      class="text-[8px] font-black text-slate-400 uppercase mb-2"
                    >
                      Dipersiapkan Untuk
                    </p>
                    <p class="text-xs font-black">
                      {{ formData.name || "Nama Klien" }}
                    </p>
                    <p class="text-[9px] font-bold text-indigo-300 opacity-60">
                      {{ formData.company || "Organisasi" }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p
                      class="text-[8px] font-black text-slate-400 uppercase mb-2"
                    >
                      Tanggal Terbit
                    </p>
                    <p class="text-xs font-black">
                      {{ new Date().toLocaleDateString("id-ID") }}
                    </p>
                  </div>
                </div>
                <div
                  class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"
                ></div>
              </div>

              <!-- Preview Narrative Section -->
              <div class="p-10 space-y-12">
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"
                    >
                      <Info :size="16" />
                    </div>
                    <h4
                      class="text-[10px] font-black text-[#1C2559] uppercase tracking-widest"
                    >
                      01. Gambaran Umum
                    </h4>
                  </div>
                  <p class="text-xs font-bold text-slate-500 leading-relaxed">
                    {{
                      narrative.bg ||
                      "Narrative background will dynamically sync here..."
                    }}
                  </p>
                </div>

                <div
                  v-if="narrative.prob"
                  class="p-6 bg-rose-50 border border-rose-100 rounded-3xl flex gap-4"
                >
                  <AlertTriangle :size="20" class="text-rose-500 shrink-0" />
                  <div>
                    <p
                      class="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1"
                    >
                      Identifikasi Tantangan
                    </p>
                    <p class="text-xs font-bold text-slate-600 leading-relaxed">
                      {{ narrative.prob }}
                    </p>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"
                    >
                      <Target :size="16" />
                    </div>
                    <h4
                      class="text-[10px] font-black text-[#1C2559] uppercase tracking-widest"
                    >
                      02. Pendekatan Strategis
                    </h4>
                  </div>
                  <p class="text-xs font-bold text-slate-500 leading-relaxed">
                    {{
                      narrative.sol ||
                      "Metodologi solusi akan muncul di sini..."
                    }}
                  </p>

                  <!-- Modules List in Preview -->
                  <div v-if="selectedFeatures.length" class="mt-6 space-y-3">
                    <p
                      class="text-[8px] font-black text-slate-400 uppercase tracking-widest"
                    >
                      Modul Kecerdasan Terpilih
                    </p>
                    <div class="grid grid-cols-1 gap-2">
                      <div
                        v-for="f in selectedFeatures"
                        :key="f.id"
                        class="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"
                      >
                        <div class="flex items-center gap-2">
                          <Check :size="10" class="text-emerald-500" />
                          <span class="text-[10px] font-black text-[#1B2559]">{{
                            f.name
                          }}</span>
                        </div>
                        <span class="text-[9px] font-black text-indigo-500">{{
                          formatPrice(f.price)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-8 border-t border-slate-100 space-y-8">
                  <!-- Revision Policy Preview -->
                  <div class="space-y-2">
                    <p
                      class="text-[10px] font-black text-amber-500 uppercase tracking-widest"
                    >
                      Kebijakan Pertumbuhan & Revisi
                    </p>
                    <p
                      class="text-[9px] text-slate-400 font-bold leading-relaxed"
                    >
                      • GRATIS: 3x Revisi Minor (Typo, Ikon, Warna)<br />
                      • BERBAYAR: Perubahan total atau logika fitur baru
                    </p>
                  </div>

                  <div class="space-y-4">
                    <p
                      class="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]"
                    >
                      Estimasi Investasi
                    </p>
                    <div class="flex flex-col gap-2">
                      <!-- Base detail -->
                      <div
                        class="flex justify-between text-[10px] font-bold text-slate-400 uppercase"
                      >
                        <span>Sistem Inti Utama</span>
                        <span>{{ formatPrice(foundationPrice) }}</span>
                      </div>
                      <!-- Modules detail -->
                      <div v-if="selectedFeatures.length" class="space-y-1">
                        <div
                          class="flex justify-between text-[10px] font-bold text-slate-400 uppercase"
                        >
                          <span>Modul Tambahan</span>
                          <span>{{
                            formatPrice(
                              selectedFeatures.reduce((s, f) => s + f.price, 0),
                            )
                          }}</span>
                        </div>
                        <div class="pl-4 border-l border-slate-200">
                          <div
                            v-for="f in selectedFeatures"
                            :key="f.id"
                            class="flex justify-between text-[8px] font-bold text-slate-300 uppercase italic"
                          >
                            <span>• {{ f.name }}</span>
                            <span>{{ formatPrice(f.price) }}</span>
                          </div>
                        </div>
                      </div>

                      <div
                        class="pt-4 mt-2 border-t border-slate-100 flex justify-between items-end"
                      >
                        <p class="text-2xl font-black text-[#1B2559]">
                          {{ formatPrice(finalTotal) }}
                        </p>
                        <p
                          class="text-[8px] font-black text-slate-300 uppercase"
                        >
                          Berlaku selama 14 Hari
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Payment Info Preview -->
                  <div
                    class="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center gap-3"
                  >
                    <div
                      class="w-10 h-6 bg-white rounded flex items-center justify-center font-black text-[#0066AE] text-[8px] border border-slate-200"
                    >
                      BCA
                    </div>
                    <p class="text-[9px] font-black text-[#1B2559]">
                      8020-441-291
                      <span class="text-slate-400 ml-1 font-bold"
                        >(Kang Jessy)</span
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
  Target,
  Info,
  Check,
  AlertTriangle,
  Eye,
  History,
  FileText,
  Trash2,
  Lock,
  SlidersHorizontal,
  FlaskConical,
} from "lucide-vue-next";
import { clientsService } from "../services/clientsService";
import { couponsService, type Coupon } from "../services/couponsService";
import { projectTypes } from "../data/order/projects";
import { availableFeatures } from "../data/order/features";
import type { Client } from "../types";
import { BaseButton } from "@kangjessy/ui";
import Toast from "../components/ui/Toast.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";

const router = useRouter();
const route = useRoute();
const saving = ref(false);
const showResetConfirm = ref(false);
const activeProposals = ref<Client[]>([]);
const fetchingLead = ref(false);
const editingId = ref<string | null>(null);

const formData = ref({
  project_name: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  project_type: "",
  features: "",
  voucher: "",
  brief: "",
  selected_timeline: "Standard",
  status: "Lead",
  type: "", // Will be populated from data or default if new
  lead_id: null as string | null,
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

function handleLeadSelect() {
  const selectedLead = availableLeads.value.find(
    (l) => l.id === formData.value.lead_id,
  );
  if (selectedLead) {
    formData.value.name = selectedLead.name;
    formData.value.company = selectedLead.company || "";
    formData.value.email = selectedLead.email || "";
    formData.value.phone = selectedLead.phone || "";
    formData.value.project_type = selectedLead.project_type || "";
    formData.value.type = "general_inquiry";
    if (selectedLead.brief) {
      narrative.value.bg = selectedLead.brief;
    }
  }
}

const loadProposal = async (id: string) => {
  if (!id || id === "undefined" || id === "null") return;
  if (editingId.value === id) return; // Skip if already loaded

  fetchingLead.value = true;
  try {
    const data = await clientsService.getById(id);
    if (!data) {
      console.warn("Client data record found but is empty for ID:", id);
      return;
    }

    // Success: Now clear and load
    editingId.value = data.id;
    selectedFeatureIds.value = [];
    narrative.value = { bg: "", prob: "", sol: "" };

    formData.value = {
      project_name: data.project_name || "",
      name: data.name || "",
      company: data.company || "",
      email: data.email || "",
      phone: data.phone || "",
      project_type: data.project_type || "",
      features: data.features || "",
      voucher: data.voucher || "",
      brief: data.brief || "",
      selected_timeline: data.selected_timeline || "Standard",
      status: data.status || "Lead",
      type: data.type || "project_order",
      lead_id: data.lead_id || null,
    };

    // Parse narrative markers
    const briefText = data.brief || "";
    if (briefText.includes("[BG]")) {
      const bgMatch = briefText.match(/\[BG\]([\s\S]*?)(?=\[PROB\]|\[SOL\]|$)/);
      const probMatch = briefText.match(
        /\[PROB\]([\s\S]*?)(?=\[BG\]|\[SOL\]|$)/,
      );
      const solMatch = briefText.match(
        /\[SOL\]([\s\S]*?)(?=\[BG\]|\[PROB\]|$)/,
      );

      narrative.value = {
        bg: bgMatch?.[1]?.trim() || "",
        prob: probMatch?.[1]?.trim() || "",
        sol: solMatch?.[1]?.trim() || "",
      };
    } else {
      // Legacy or simple brief: everything to BG
      narrative.value = {
        bg: briefText,
        prob: "",
        sol: "",
      };
    }

    if (data.features) {
      selectedFeatureIds.value = data.features.split(",").filter(Boolean);
    } else {
      selectedFeatureIds.value = [];
    }

    // Only show success toast if needed, or suppress to reduce noise
    // showToast("Data Proposal Berhasil Dimuat");
  } catch (err) {
    // Only show error if it's NOT a "Row not found" which might happen during transitions
    console.error("DEBUG - Load Proposal Failed:", err);
    if ((err as any)?.code !== "PGRST116") {
      showToast("Gagal memuat data proposal", "error");
    }
  } finally {
    fetchingLead.value = false;
  }
};

onMounted(async () => {
  try {
    const [coupons, allClients, inboxLeads] = await Promise.all([
      couponsService.getAll(),
      clientsService.getAll(),
      clientsService.getLeads(),
    ]);
    activeVouchers.value = coupons;
    availableLeads.value = inboxLeads;
    // History: Show all records that are either leads or project orders
    activeProposals.value = allClients.filter(
      (p) =>
        (p.type === "project_order" || p.type === "general_inquiry") &&
        (p.project_name || p.name),
    );

    // Load lead via watch below
  } catch (e) {
    console.error("Init failed", e);
  }
});

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
  formData.value.features = selectedFeatureIds.value.join(",");
};

const foundationPrice = computed(() => {
  const type = projectTypes.find((t) => t.name === formData.value.project_type);
  return type?.basePrice || 0;
});

const filteredFeatures = computed(() => {
  const selectedType = projectTypes.find(
    (t) => t.name === formData.value.project_type,
  );
  if (!selectedType) return [];
  return availableFeatures.filter((f) =>
    f.relevantTo.includes(selectedType.serviceId),
  );
});

const finalTotal = computed(() => {
  const base =
    foundationPrice.value +
    selectedFeatures.value.reduce((sum, f) => sum + f.price, 0);
  let multiplier = 1;
  if (formData.value.selected_timeline === "Express") multiplier = 1.25;
  if (formData.value.selected_timeline === "Urgent") multiplier = 1.5;

  let voucherVal = 0;
  const v = activeVouchers.value.find((v) => v.code === formData.value.voucher);
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

const handleSave = async () => {
  if (!formData.value.name)
    return showToast("Nama klien wajib diisi!", "error");
  if (!formData.value.project_type)
    return showToast("Pilih pondasi proyek dulu Kak!", "error");

  saving.value = true;
  try {
    formData.value.brief = `[BG] ${narrative.value.bg} [PROB] ${narrative.value.prob} [SOL] ${narrative.value.sol}`;
    formData.value.features = selectedFeatureIds.value.join(",");

    if (!formData.value.project_name) {
      formData.value.project_name = `${formData.value.project_type || "Solusi Digital"} - ${formData.value.name}`;
    }

    const payload = {
      ...formData.value,
      total_amount: finalTotal.value,
    };

    let res;
    // Scenario 1: Editing an existing proposal (ID already loaded)
    if (editingId.value) {
      // If we are editing, we just update
      res = await clientsService.update(editingId.value, payload);
      showToast("Proposal Berhasil Diperbarui!");
    }
    // Scenario 2: Creating from a Lead (first time converting lead to proposal)
    else if (route.query.leadId) {
      // We UPDATE the existing lead record to add proposal details
      // We do NOT create a new record, we enrich the lead
      const leadId = String(route.query.leadId);
      (payload as any).id = leadId; // Ensure ID is set
      payload.status = "Concept"; // Move status to Concept

      res = await clientsService.update(leadId, {
        ...payload,
        project_status: "Concept",
      });
      showToast("Lead Berhasil Dikonversi ke Proposal!");
    }
    // Scenario 3: Creating a brand new independent proposal
    else {
      if (!payload.type) payload.type = "project_order";

      res = await clientsService.create({
        ...payload,
        paid_amount: 0,
        payment_status: "unpaid",
        project_status: "Concept",
        is_converted: false,
      } as any);
      showToast("Proposal Baru Berhasil Dibuat!");
    }

    // Redirect to proposal view
    if (res && res.id) {
      setTimeout(() => {
        router.push(`/proposals/${res.id}`);
      }, 1000);
    }
  } catch (e) {
    console.error("Save failed", e);
    showToast("Gagal menyambung ke satelit data.", "error");
  } finally {
    saving.value = false;
  }
};

const deleteProposal = async (id: string) => {
  if (!confirm("Hapus proposal ini?")) return;
  try {
    await clientsService.delete(id);
    activeProposals.value = activeProposals.value.filter((p) => p.id !== id);
    showToast("Proposal Berhasil Dihapus");
  } catch (err) {
    showToast("Gagal menghapus proposal", "error");
  }
};

const resetForm = () => {
  editingId.value = null;
  formData.value = {
    project_name: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    project_type: "",
    features: "",
    voucher: "",
    brief: "",
    selected_timeline: "Standard",
    status: "Lead",
    type: "",
    lead_id: null as string | null,
  };
  narrative.value = { bg: "", prob: "", sol: "" };
  selectedFeatureIds.value = [];
  showResetConfirm.value = false;
  showToast("Generator Dikosongkan");
  router.replace("/proposals/generator");
};

const fillDummyData = () => {
  formData.value.project_name = "Revamp E-Commerce TokoBaju";
  formData.value.name = "Budi Santoso";
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

const getStatusClass = (status: string | undefined) => {
  const s = status || "Lead";
  switch (s) {
    case "New":
    case "Lead":
      return "bg-indigo-50 text-indigo-600 border-indigo-100";
    case "Deal":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "Cancel":
      return "bg-rose-50 text-rose-600 border-rose-100";
    case "Pending":
      return "bg-amber-50 text-amber-600 border-amber-100";
    default:
      return "bg-slate-50 text-slate-600 border-slate-100";
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
