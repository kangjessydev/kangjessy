<template>
  <div
    class="min-h-screen bg-[#F1F5F9] py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white text-left"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Top Actions -->
      <div class="flex justify-between items-center mb-8 print:hidden">
        <BaseButton variant="secondary" @click="$router.back()">
          <ArrowLeft :size="18" /> Kembali
        </BaseButton>
        <div class="flex gap-3">
          <BaseButton variant="secondary" @click="handlePrint">
            <Printer :size="18" /> Cetak / PDF
          </BaseButton>
          <BaseButton variant="primary" @click="handleEdit">
            <Edit2 :size="18" /> Ubah Data
          </BaseButton>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-48 bg-white rounded-[40px] shadow-xl border border-slate-100"
      >
        <div class="relative">
          <div class="w-16 h-16 border-4 border-indigo-100 rounded-full"></div>
          <div
            class="absolute top-0 left-0 w-16 h-16 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
        <p
          class="mt-6 text-slate-400 font-black uppercase text-[10px] tracking-[0.4em] animate-pulse"
        >
          Menyusun Dokumen...
        </p>
      </div>

      <!-- Main Document Wrapper -->
      <div v-else-if="order" class="space-y-6 md:space-y-8 print:space-y-0">
        <!-- SECTION 1: COVER PAGE (Always shows) -->
        <div
          class="bg-white rounded-[24px] md:rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col print:shadow-none print:border-none print:rounded-none"
          :class="isProposal ? 'min-h-[400px] md:min-h-[600px]' : 'min-h-0'"
        >
          <div
            class="bg-[#1B2559] text-white relative flex-1 flex flex-col justify-center items-center text-center overflow-hidden"
            :class="isProposal ? 'p-6 md:p-16' : 'p-6 md:p-10'"
          >
            <!-- Decor (Proposal Only) -->
            <div
              v-if="isProposal"
              class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full -mr-64 -mt-64 blur-3xl"
            ></div>
            <div
              v-if="isProposal"
              class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full -ml-48 -mb-48 blur-2xl"
            ></div>

            <div class="relative z-10 space-y-6 md:space-y-8 w-full max-w-2xl">
              <div class="flex flex-col items-center gap-4">
                <div
                  class="bg-white rounded-[24px] md:rounded-[32px] shadow-2xl shadow-indigo-500/40"
                  :class="isProposal ? 'p-3 md:p-4' : 'p-3'"
                >
                  <img
                    :src="branding.logo"
                    alt="Agency Logo"
                    class="object-contain"
                    :class="
                      isProposal ? 'w-10 h-10 md:w-12 md:h-12' : 'w-8 h-8'
                    "
                  />
                </div>
                <!-- Logic for Title -->
                <div v-if="!isProposal" class="text-center space-y-1">
                  <h1
                    class="text-xl md:text-2xl font-black tracking-tighter uppercase"
                  >
                    {{ branding.name.split(" ")[0] }}
                    <span
                      v-if="branding.name.split(' ').length > 1"
                      class="text-indigo-400"
                    >
                      {{ branding.name.split(" ").slice(1).join(" ") }}
                    </span>
                  </h1>
                  <p
                    class="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest"
                  >
                    Digital Solutions Hub
                  </p>
                </div>
                <h1
                  v-else
                  class="text-2xl md:text-3xl font-black tracking-tighter uppercase"
                >
                  {{ branding.name.split(" ")[0] }}
                  <span
                    v-if="branding.name.split(' ').length > 1"
                    class="text-indigo-400"
                  >
                    {{ branding.name.split(" ").slice(1).join(" ") }}
                  </span>
                </h1>
              </div>

              <div class="space-y-3 md:space-y-4">
                <p
                  v-if="isProposal"
                  class="text-[10px] md:text-[10px] font-black text-indigo-300 uppercase tracking-[0.4em] md:tracking-[0.6em]"
                >
                  Proposal Penawaran Proyek
                </p>
                <div
                  v-else
                  class="inline-block px-4 py-1 rounded-full bg-white/10 text-[10px] font-black text-indigo-300 uppercase tracking-[0.4em] mb-4 border border-white/20"
                >
                  Invoice Resmi
                </div>

                <h2
                  class="font-black text-white tracking-tighter leading-none"
                  :class="
                    isProposal
                      ? 'text-3xl md:text-5xl lg:text-7xl'
                      : 'text-2xl md:text-3xl lg:text-4xl text-indigo-100'
                  "
                >
                  {{
                    order.project_name ||
                    (order.project_type === "Custom Request"
                      ? "Strategic Digital Solution"
                      : order.project_type)
                  }}
                </h2>
              </div>

              <div
                class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-center md:text-left"
                :class="
                  isProposal
                    ? 'pt-8 md:pt-12 border-t border-white/10'
                    : 'pt-6 border-t border-white/10 mt-6'
                "
              >
                <div>
                  <p
                    class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
                  >
                    Dipersiapkan Untuk
                  </p>
                  <p
                    class="font-black text-white tracking-tight"
                    :class="
                      isProposal ? 'text-lg md:text-xl' : 'text-base md:text-lg'
                    "
                  >
                    {{ order.name }}
                  </p>
                  <p class="text-xs md:text-sm font-bold text-indigo-300">
                    {{ order.company || "Entitas Pribadi" }}
                  </p>
                </div>
                <div class="md:text-right">
                  <p
                    class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
                  >
                    Tanggal Terbit
                  </p>
                  <p
                    class="font-black text-white tracking-tight"
                    :class="
                      isProposal ? 'text-lg md:text-xl' : 'text-base md:text-lg'
                    "
                  >
                    {{ formatDate(order.created_at) }}
                  </p>
                  <p class="text-xs md:text-sm font-bold text-indigo-300">
                    REF: #{{ order.id.slice(0, 8).toUpperCase() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-indigo-50/50 flex flex-col md:flex-row gap-2 justify-between items-center text-center md:text-left"
            :class="isProposal ? 'p-6 md:p-8 md:px-16' : 'p-4 md:px-8'"
          >
            <p
              class="text-[9px] md:text-[10px] font-black text-indigo-400 uppercase tracking-widest"
            >
              {{
                isProposal
                  ? `ARSITEKTUR SOLUSI ${branding.name}`
                  : "DOKUMEN TAGIHAN RESMI"
              }}
            </p>
            <p
              class="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              {{
                isProposal
                  ? "DOKUMEN RAHASIA"
                  : "INVOICE #INV-" + order.id.slice(0, 8).toUpperCase()
              }}
            </p>
          </div>
        </div>

        <!-- SECTION 2: EXECUTIVE SUMMARY & PROBLEM (Proposal Exclusive) -->
        <div
          v-if="isProposal"
          class="bg-white rounded-[24px] md:rounded-[40px] shadow-xl overflow-hidden border border-slate-100 p-6 md:p-16 space-y-8 md:space-y-16 print:shadow-none print:border-none print:rounded-none print:pt-24 print:page-break-before"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start"
          >
            <div class="md:col-span-4 space-y-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"
                >
                  <Info :size="20" />
                </div>
                <h3
                  class="text-[10px] font-black text-[#1B2559] uppercase tracking-[0.3em]"
                >
                  01. Gambaran Umum
                </h3>
              </div>
              <p class="text-slate-400 text-xs font-bold leading-relaxed">
                Dokumen ini merangkum visi teknis dan operasional untuk
                mentransformasi kebutuhan bisnis Anda ke dalam infrastruktur
                digital performa tinggi.
              </p>
            </div>
            <div class="md:col-span-8 space-y-6 md:space-y-8">
              <div class="space-y-3 md:space-y-4">
                <h4
                  class="text-2xl md:text-3xl font-black text-[#1B2559] tracking-tighter"
                >
                  Ringkasan Eksekutif
                </h4>
                <p
                  class="text-sm md:text-base text-slate-500 leading-relaxed font-medium"
                >
                  {{
                    parsedBrief.background ||
                    "Kami melihat potensi besar dalam mensinergikan proses bisnis Anda dengan teknologi KJ-PRO. Melalui riset awal, kami mengidentifikasi beberapa kunci pertumbuhan yang bisa diakselerasi via sistem otomasi dan desain berbasis konversi."
                  }}
                </p>
              </div>

              <div
                v-if="parsedBrief.problem"
                class="p-6 md:p-8 bg-rose-50/50 rounded-3xl border border-rose-100 flex flex-col md:flex-row gap-4 md:gap-6"
              >
                <div
                  class="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0"
                >
                  <AlertTriangle :size="24" />
                </div>
                <div class="space-y-2">
                  <p
                    class="text-[10px] font-black text-rose-500 uppercase tracking-widest"
                  >
                    Identifikasi Tantangan
                  </p>
                  <p class="text-sm font-bold text-slate-700 leading-relaxed">
                    "{{ parsedBrief.problem }}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 3: THE PROPOSED SOLUTION (Proposal Exclusive) -->
        <div
          v-if="isProposal"
          class="bg-white rounded-[24px] md:rounded-[40px] shadow-xl overflow-hidden border border-slate-100 p-6 md:p-16 space-y-8 md:space-y-16 print:shadow-none print:border-none print:rounded-none print:pt-24 print:page-break-before"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start"
          >
            <div class="md:col-span-4 space-y-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"
                >
                  <Target :size="20" />
                </div>
                <h3
                  class="text-[10px] font-black text-[#1B2559] uppercase tracking-[0.3em]"
                >
                  02. Pendekatan Strategis
                </h3>
              </div>
              <p class="text-slate-400 text-xs font-bold leading-relaxed">
                Solusi KJ-PRO dirancang untuk skalabilitas jangka panjang, bukan
                sekadar peluncuran sekali jalan.
              </p>
            </div>
            <div class="md:col-span-8 space-y-8 md:space-y-12">
              <div class="space-y-3 md:space-y-4">
                <h4
                  class="text-2xl md:text-3xl font-black text-[#1B2559] tracking-tighter"
                >
                  Solusi Inti Terpersonalisasi
                </h4>
                <p
                  class="text-sm md:text-base text-slate-500 leading-relaxed font-medium"
                >
                  {{
                    parsedBrief.solution ||
                    "Strategi kami adalah membangun pondasi yang kokoh menggunakan 'Enterprise-Grade Framework'. Kami fokus pada kecepatan akses (Core Web Vitals), keamanan data, dan antarmuka yang intuitif bagi admin maupun end-user."
                  }}
                </p>
              </div>

              <!-- Packages Cards In-Narrative -->
              <div
                class="p-6 md:p-8 bg-indigo-50 border border-indigo-100 rounded-[24px] md:rounded-[32px] space-y-6 md:space-y-8"
              >
                <div
                  class="flex flex-col md:flex-row items-start gap-4 md:gap-6"
                >
                  <div
                    class="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white text-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/10 shrink-0"
                  >
                    <component :is="foundationIcon" :size="32" />
                  </div>
                  <div>
                    <p
                      class="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1"
                    >
                      Architecture Core
                    </p>
                    <h5 class="text-lg md:text-xl font-black text-[#1B2559]">
                      {{ order.project_type }}
                    </h5>
                    <p class="text-xs text-slate-400 font-bold mt-1 max-w-sm">
                      {{ selectedProjectType?.desc }}
                    </p>
                  </div>
                </div>

                <div v-if="selectedFeatures.length" class="space-y-4">
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-4"
                  >
                    Modul Kecerdasan
                    <span class="flex-1 h-px bg-indigo-100"></span>
                  </p>
                  <div class="grid grid-cols-1 gap-3">
                    <div
                      v-for="f in selectedFeatures"
                      :key="f.id"
                      class="flex flex-col p-4 bg-white/60 rounded-2xl border border-indigo-50/50 group hover:bg-white hover:border-indigo-100 transition-all shadow-sm"
                    >
                      <div class="flex items-center gap-2 mb-2">
                        <CheckCircle :size="16" class="text-emerald-500" />
                        <span class="text-sm font-black text-[#1B2559]">{{
                          f.name
                        }}</span>
                      </div>
                      <p
                        class="text-[11px] text-slate-400 font-bold pl-6 mb-3 leading-relaxed"
                      >
                        {{
                          f.desc ||
                          "Optimasi performa tinggi dan integrasi sistem cerdas."
                        }}
                      </p>
                      <div class="pl-6">
                        <span
                          class="text-xs font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-lg"
                          >{{ formatPrice(f.price) }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 4: INVESTMENT & TERMS (Invoice Look-alike but as Section) -->
        <div
          class="bg-white rounded-[24px] md:rounded-[40px] shadow-xl overflow-hidden border border-slate-100 p-6 md:p-16 space-y-8 md:space-y-16 print:shadow-none print:border-none print:rounded-none print:pt-24 print:page-break-before"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12"
          >
            <div class="max-w-md space-y-6 w-full">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-slate-100 text-[#1B2559] flex items-center justify-center"
                >
                  <DollarSign :size="20" />
                </div>
                <h3
                  class="text-[10px] font-black text-[#1B2559] uppercase tracking-[0.3em]"
                >
                  {{
                    isProposal
                      ? "03. Ringkasan Finansial"
                      : "01. Rincian Tagihan"
                  }}
                </h3>
              </div>
              <p
                class="text-sm font-black text-[#1B2559] uppercase tracking-widest"
              >
                {{
                  isProposal
                    ? "Penetapan Harga & Alokasi Pembayaran"
                    : "Item Layanan & Total Pembayaran"
                }}
              </p>
              <div class="space-y-6 border-l-2 border-indigo-50 pl-6">
                <!-- Revision Policy -->
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    <p
                      class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                    >
                      Kebijakan Pertumbuhan & Revisi
                    </p>
                  </div>
                  <div class="space-y-2 pl-3">
                    <div
                      class="flex items-start gap-2 text-xs text-slate-500 font-bold"
                    >
                      <Check :size="12" class="mt-0.5 text-emerald-500" />
                      <span
                        >FREE: 3x Minor Revisions (Typo, Icons, Color
                        adjustments, small wording).</span
                      >
                    </div>
                    <div
                      class="flex items-start gap-2 text-xs text-slate-500 font-bold"
                    >
                      <Check :size="12" class="mt-0.5 text-rose-500" />
                      <span
                        >PAID: Major overhauls, design restructuring, or new
                        logic modules after approval.</span
                      >
                    </div>
                  </div>
                </div>

                <div v-for="(term, idx) in terms" :key="idx" class="space-y-2">
                  <p
                    class="text-[10px] font-black text-indigo-500 uppercase tracking-widest"
                  >
                    {{ term.title }}
                  </p>
                  <p class="text-xs text-slate-500 font-bold leading-relaxed">
                    {{ term.content }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex-1 w-full max-w-sm space-y-6">
              <div
                class="p-6 md:p-8 bg-slate-50 rounded-[32px] space-y-5 border border-slate-100"
              >
                <p
                  class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]"
                >
                  Rincian Budget
                </p>
                <div class="flex flex-col gap-5">
                  <div
                    class="flex justify-between items-center text-sm font-black text-slate-600 uppercase"
                  >
                    <span>Sistem Inti Utama</span>
                    <span>{{ formatPrice(foundationPrice) }}</span>
                  </div>
                  <div class="space-y-3">
                    <div
                      class="flex justify-between items-center text-sm font-black text-slate-600 uppercase"
                    >
                      <span>Modul Tambahan</span>
                      <span>{{ formatPrice(featuresTotal) }}</span>
                    </div>
                    <!-- Details for modules -->
                    <div
                      v-if="selectedFeatures.length"
                      class="pl-4 space-y-2 border-l-2 border-slate-200 ml-1 py-1"
                    >
                      <div
                        v-for="f in selectedFeatures"
                        :key="f.id"
                        class="flex justify-between font-bold text-slate-500 text-xs"
                      >
                        <span>• {{ f.name }}</span>
                        <span class="text-slate-400">{{
                          formatPrice(f.price)
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="voucherDiscount > 0"
                    class="flex justify-between text-[10px] font-black text-rose-500 uppercase pt-2"
                  >
                    <span class="flex items-center gap-2">
                      <Tag :size="12" /> Kupon: {{ order.voucher }}
                    </span>
                    <span>- {{ formatPrice(voucherDiscount) }}</span>
                  </div>

                  <div
                    class="pt-8 mt-2 border-t border-slate-200 flex flex-col items-start gap-1"
                  >
                    <p
                      class="text-[12px] font-black text-slate-400 uppercase tracking-widest"
                    >
                      Total Investasi
                    </p>
                    <p
                      class="font-black text-[#1B2559] tracking-tighter"
                      :class="
                        isProposal ? 'text-[24px] md:text-[42px]' : 'text-3xl'
                      "
                    >
                      {{ formatPrice(finalDisplayTotal) }}
                    </p>
                    <p class="text-[10px] font-bold text-slate-400 italic">
                      Berlaku selama 14 Hari
                    </p>
                  </div>
                </div>
              </div>

              <!-- Ledger (Invoice Only) -->
              <div
                v-if="!isProposal"
                class="p-6 bg-[#1B2559] rounded-[32px] text-white space-y-4"
              >
                <div class="flex justify-between items-end">
                  <div>
                    <p class="text-[8px] font-black opacity-40 uppercase mb-1">
                      {{ order.id ? "Dibayar saat ini" : "" }}
                    </p>
                    <p class="text-xl font-black">
                      {{ formatPrice(order.paid_amount) }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-[8px] font-black opacity-40 uppercase mb-1">
                      {{ order.id ? "Sisa Tagihan" : "" }}
                    </p>
                    <p
                      class="text-xl font-black"
                      :class="
                        balanceRemaining > 0
                          ? 'text-rose-400'
                          : 'text-emerald-400'
                      "
                    >
                      {{ formatPrice(balanceRemaining) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 4.5: SCOPE & TERMS (Combined into one section) -->
        <div
          v-if="order.deliverables?.length || order.terms"
          class="bg-white rounded-[24px] md:rounded-[40px] shadow-xl overflow-hidden border border-slate-100 p-6 md:p-16 space-y-8 md:space-y-16 print:shadow-none print:border-none print:rounded-none"
        >
          <div
            class="flex flex-col lg:flex-row justify-between items-stretch gap-8 md:gap-12"
          >
            <!-- Deliverables Column -->
            <div
              v-if="order.deliverables?.length"
              class="flex-1 w-full space-y-6"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm"
                >
                  <Check :size="20" />
                </div>
                <h3
                  class="text-xs font-black text-slate-700 uppercase tracking-[0.2em]"
                >
                  Scope & Deliverables
                </h3>
              </div>
              <ul class="grid grid-cols-1 gap-3 mb-0">
                <li
                  v-for="(item, i) in order.deliverables"
                  :key="i"
                  class="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white transition-all shadow-sm"
                >
                  <div
                    class="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0"
                  >
                    <CheckCircle :size="12" />
                  </div>
                  <span class="text-sm font-bold text-slate-600">
                    {{ item }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Terms Column -->
            <div
              v-if="
                order.terms ||
                order.terms_payment ||
                order.terms_copyright ||
                order.terms_revision
              "
              class="flex-1 w-full max-w-md space-y-6"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shadow-sm"
                >
                  <FileText :size="20" class="text-indigo-600" />
                </div>
                <h3
                  class="text-xs font-black text-indigo-900 uppercase tracking-[0.2em]"
                >
                  Terms & Agreement
                </h3>
              </div>
              <div
                class="p-6 md:p-8 bg-indigo-50/30 rounded-[32px] border border-indigo-100/50 space-y-6"
              >
                <!-- Payment & Warranty -->
                <div v-if="order.terms_payment" class="space-y-2">
                  <p
                    class="text-xl font-black text-indigo-950 uppercase tracking-wider"
                  >
                    PEMBAYARAN & GARANSI :
                  </p>
                  <div
                    class="prose prose-sm prose-indigo font-medium text-slate-500 whitespace-pre-line leading-loose text-xs"
                  >
                    {{ order.terms_payment }}
                  </div>
                </div>

                <!-- Copyright & License -->
                <div
                  v-if="order.terms_copyright"
                  class="space-y-2 pt-4 border-t border-indigo-100/50"
                >
                  <p
                    class="text-xl font-black text-indigo-950 uppercase tracking-wider"
                  >
                    HAK CIPTA & LISENSI :
                  </p>
                  <div
                    class="prose prose-sm prose-indigo font-medium text-slate-500 whitespace-pre-line leading-loose text-xs"
                  >
                    {{ order.terms_copyright }}
                  </div>
                </div>

                <!-- Revision Limits -->
                <div
                  v-if="order.terms_revision"
                  class="space-y-2 pt-4 border-t border-indigo-100/50"
                >
                  <p
                    class="text-xl font-black text-indigo-950 uppercase tracking-wider"
                  >
                    BATASAN REVISI :
                  </p>
                  <div
                    class="prose prose-sm prose-indigo font-medium text-slate-500 whitespace-pre-line leading-loose text-xs"
                  >
                    {{ order.terms_revision }}
                  </div>
                </div>

                <!-- Fallback for legacy terms -->
                <div
                  v-if="
                    !order.terms_payment &&
                    !order.terms_copyright &&
                    !order.terms_revision &&
                    order.terms
                  "
                  class="prose prose-sm prose-indigo font-medium text-slate-500 whitespace-pre-line leading-loose text-xs"
                >
                  {{ order.terms }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 5: SIGNATURE & AUTHENTICATION -->
        <div
          class="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100 p-16 flex flex-col md:flex-row justify-between items-center gap-12 print:shadow-none print:border-none print:rounded-none print:pt-24 print:page-break-before"
        >
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div
                class="w-16 h-16 rounded-[24px] border border-indigo-100 flex items-center justify-center text-[#702DFF] shadow-inner"
              >
                <Zap :size="32" />
              </div>
              <div>
                <p
                  class="text-xl font-black text-[#1B2559] tracking-tighter uppercase"
                >
                  Kang <span class="text-[#7029FF]">Jessy</span>
                </p>
                <p
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >
                  Pusat Autentikasi
                </p>
              </div>
            </div>
            <p
              class="text-[10px] font-bold text-slate-400 max-w-xs leading-relaxed"
            >
              Dokumen ini diautentikasi secara digital dan sah sebagai
              kesepakatan dasar pengerjaan proyek setelah pembayaran Komitmen
              (DP) dilakukan.
            </p>
          </div>

          <!-- New Separated Payment Section -->
          <div class="col-span-full mt-10 space-y-12">
            <div
              class="p-10 bg-indigo-50/50 rounded-[48px] border border-indigo-100/50"
            >
              <div class="flex flex-col items-center text-center">
                <div
                  class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6"
                >
                  <DollarSign :size="24" />
                </div>
                <p
                  class="text-[12px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-10"
                >
                  Instruksi Pembayaran Transfer Bank
                </p>

                <div class="flex flex-col gap-5 w-full max-w-2xl mx-auto">
                  <div
                    v-for="(acc, index) in displayPaymentAccounts"
                    :key="index"
                    class="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-8 transition-all hover:shadow-md"
                  >
                    <div
                      class="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center p-3 shrink-0"
                    >
                      <img
                        v-if="getBankLogo(acc.bank_name, acc.bank_logo)"
                        :src="getBankLogo(acc.bank_name, acc.bank_logo)"
                        class="w-full h-full object-contain"
                      />
                      <div v-else class="text-[10px] font-black text-slate-300">
                        BANK
                      </div>
                    </div>
                    <div class="text-left flex-1 min-w-0">
                      <p
                        class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1"
                      >
                        {{ acc.bank_name }}
                      </p>
                      <p
                        class="text-2xl font-black text-[#1B2559] tracking-tighter"
                      >
                        {{ acc.account_number }}
                      </p>
                      <p
                        class="text-[9px] font-bold text-slate-400 uppercase mt-0.5"
                      >
                        Atas Nama: {{ acc.account_holder || branding.name }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Signature Section (Separated) -->
            <div class="text-center pt-6 pb-12">
              <p
                class="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6"
              >
                Tanda Tangan Elektronik Tervalidasi
              </p>
              <div class="flex flex-col items-center">
                <p class="text-2xl font-black text-indigo-500 italic mb-3">
                  {{ branding.name }}
                </p>
                <div
                  class="bg-indigo-50 px-5 py-1.5 rounded-full border border-indigo-100"
                >
                  <p
                    class="text-[9px] font-black text-indigo-400 uppercase tracking-widest"
                  >
                    ID VALIDASI: AUT-{{
                      String(route.params.id).slice(0, 8).toUpperCase()
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Banner (Print Only) -->
        <div class="hidden print:block text-center pt-8">
          <p
            class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
          >
            www.kangjessy.com • {{ branding.name }} Digital Solutions Hub
          </p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else
        class="text-center py-48 bg-white rounded-[40px] shadow-xl border border-slate-100"
      >
        <div
          class="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Trash2 :size="40" />
        </div>
        <h3 class="text-2xl font-black text-[#1B2559] tracking-tight">
          Kegagalan Sinkronisasi Rekaman
        </h3>
        <p class="text-slate-400 text-sm mt-3 px-12">
          Gagal menyinkronkan data dengan pangkalan data intelijen untuk ID:
          {{ route.params.id }}
        </p>
        <BaseButton
          variant="secondary"
          class="mt-10 px-10"
          @click="$router.back()"
          >Kembali</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft,
  Printer,
  Edit2,
  Zap,
  Check,
  Layout,
  Target,
  Info,
  Trash2,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Tag,
  FileText,
} from "lucide-vue-next";
import { clientsService } from "../services/clientsService";
import { proposalService } from "../services/proposalService";
import { couponsService, type Coupon } from "../services/couponsService";
import { projectTypes, availableFeatures } from "../../../agency/src/data/landing/order";
import type { Client } from "../types";
import { BaseButton } from "@kangjessy/ui";
import { useBranding } from "../composables/useBranding";
import { usePaymentSettings } from "../composables/usePaymentSettings";

const route = useRoute();
const router = useRouter(); // Init router
const id = computed(() => route.params.id as string);
const order = ref<Client | null>(null);
const loading = ref(true);
const activeVouchers = ref<Coupon[]>([]);

const { branding } = useBranding();
const { activeBanks: paymentAccounts, getBankLogo } = usePaymentSettings();

const displayPaymentAccounts = computed(() => {
  // payment_accounts might not be in Client type but added dynamically
  if (
    order.value?.payment_accounts &&
    order.value.payment_accounts.length > 0
  ) {
    return order.value.payment_accounts;
  }
  return paymentAccounts.value;
});

onMounted(() => {
  // Composables handle their own loading from localStorage
});

// Robust check: based on URL context, not status
const isProposal = computed(() => route.path.includes("/proposals/"));

const handleEdit = () => {
  if (isProposal.value) {
    router.push({ path: "/proposals/generator", query: { id: id.value } });
  } else {
    router.push(`/orders/${id.value}/edit`);
  }
};

// Logic to split the BRIEF into different narrative parts
// We expect specific markers like [BG], [PROB], [SOL] in the brief field
const parsedBrief = computed(() => {
  const b = order.value?.brief || "";
  const parts = {
    background: "",
    problem: "",
    solution: "",
  };

  if (b.includes("[BG]") || b.includes("[PROB]") || b.includes("[SOL]")) {
    const bgMatch = b.match(/\[BG\]([\s\S]*?)(?=\[PROB\]|\[SOL\]|$)/);
    const probMatch = b.match(/\[PROB\]([\s\S]*?)(?=\[BG\]|\[SOL\]|$)/);
    const solMatch = b.match(/\[SOL\]([\s\S]*?)(?=\[BG\]|\[PROB\]|$)/);

    parts.background = bgMatch?.[1]?.trim() || "";
    parts.problem = probMatch?.[1]?.trim() || "";
    parts.solution = solMatch?.[1]?.trim() || "";
  } else {
    // Legacy support: everything into background
    parts.background = b;
  }

  return parts;
});

// Use a watch to handle route changes and initial mount
watch(
  () => route.params.id,
  async (newId: any) => {
    if (!newId) return;

    loading.value = true;

    // Safety timeout to prevent infinite loading screen
    const safetyTimer = setTimeout(() => {
      if (loading.value) {
        console.warn("Loading safety timeout reached");
        loading.value = false;
      }
    }, 5000);

    try {
      const isProposalView = route.path.includes("/proposals/");

      // Parallel fetch coupons (always needed)
      const [vouchers] = await Promise.all([couponsService.getAll()]);
      activeVouchers.value = vouchers;

      let data: any = null;

      if (isProposalView) {
        // Fetch from Proposal Service
        const proposal = await proposalService.getById(String(newId));
        if (proposal) {
          // Adapt Proposal to Client interface
          data = {
            id: proposal.id,
            name: proposal.client_name,
            company: proposal.company,
            email: proposal.email || "",
            phone: proposal.phone || "",
            project_name: proposal.project_name,
            project_type: proposal.project_type,
            // Convert string[] to string for compatibility with existing logic
            features: Array.isArray(proposal.features)
              ? proposal.features.join(",")
              : proposal.features,
            status: proposal.status === "approved" ? "Deal" : "Lead",
            // Construct brief from narrative parts
            brief: `[BG] ${proposal.background || ""} [PROB] ${proposal.problem || ""} [SOL] ${proposal.solution || ""}`,
            voucher: proposal.voucher_code,
            total_amount: proposal.final_total,
            created_at: proposal.created_at || new Date().toISOString(),
            // Ensure type is treated as Client for TS
            type: "proposal_generated",
            deliverables: proposal.deliverables,
            terms: proposal.terms,
            terms_payment: proposal.terms_payment,
            terms_copyright: proposal.terms_copyright,
            terms_revision: proposal.terms_revision,
            payment_accounts: proposal.payment_accounts,
          };
        }
      } else {
        // Fetch from Clients Service (Orders)
        data = await clientsService.getById(String(newId));
      }

      if (data) {
        order.value = data;
      } else {
        console.error("No record found for ID:", newId);
      }
    } catch (err) {
      console.error("Sync record failed", err);
    } finally {
      clearTimeout(safetyTimer);
      loading.value = false;
    }
  },
  { immediate: true },
);

const selectedProjectType = computed(() =>
  projectTypes.find((t) => t.name === order.value?.project_type),
);
const foundationIcon = computed(
  () => selectedProjectType.value?.icon || Layout,
);
const foundationPrice = computed(
  () => selectedProjectType.value?.basePrice || 0,
);

const selectedFeatures = computed(() => {
  if (!order.value?.features) return [];
  const ids = order.value.features.split(",");
  return availableFeatures.filter((f) => ids.includes(f.id));
});

const featuresTotal = computed(() =>
  selectedFeatures.value.reduce((sum, f) => sum + f.price, 0),
);

const currentVoucher = computed(() =>
  activeVouchers.value.find((v) => v.code === order.value?.voucher),
);

const voucherDiscount = computed(() => {
  if (!order.value?.voucher || !currentVoucher.value) return 0;
  const subtotal = foundationPrice.value + featuresTotal.value;
  return currentVoucher.value.type === "percent"
    ? Math.round(subtotal * (currentVoucher.value.value / 100))
    : currentVoucher.value.value;
});

const finalDisplayTotal = computed(() => {
  return isProposal.value
    ? foundationPrice.value + featuresTotal.value - voucherDiscount.value
    : order.value?.total_amount || 0;
});

const balanceRemaining = computed(() => {
  return finalDisplayTotal.value - (order.value?.paid_amount || 0);
});

const terms = [
  {
    title: "01. Strategi Pembayaran",
    content:
      "Biaya investasi dibagi menjadi: Commitment Fee (50%) untuk memulai pengembangan, dan Pelunasan Akhir (50%) sebelum penyerahan akses sistem sepenuhnya.",
  },
  {
    title: "02. Kepemilikan Data",
    content:
      "Seluruh hak akses infrastruktur dan kepemilikan aset digital akan diserahkan sepenuhnya kepada klien setelah seluruh proses administrasi selesai.",
  },
];

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatPrice = (v: any) =>
  "Rp " + (Number(v) || 0).toLocaleString("id-ID");

const handlePrint = () => {
  if (globalThis.window) globalThis.window.print();
};
</script>

<style scoped>
@media print {
  .print\:hidden {
    display: none !important;
  }
  body,
  html,
  .min-h-screen {
    background: white !important;
    padding: 0 !important;
  }
  .max-w-5xl {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
  }
  .bg-white {
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
  }
  .print\:page-break-before {
    page-break-before: always;
  }
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
