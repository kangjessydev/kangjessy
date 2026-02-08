<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageHeader
      title="Lead Inbox"
      subtitle="Incoming inquiries from contact forms and service landings"
    >
      <div class="flex gap-2">
        <ButtonSecondary @click="fetchLeads">
          <RotateCw :size="18" :class="{ 'animate-spin': isLoading }" />
          Sync Records
        </ButtonSecondary>
      </div>
    </PageHeader>

    <!-- Tabs Navigation -->
    <div
      class="flex gap-1 p-1 bg-slate-100/50 backdrop-blur-md rounded-[22px] w-fit mb-8 border border-slate-200/50"
    >
      <button
        @click="activeTab = 'inbox'"
        class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        :class="
          activeTab === 'inbox'
            ? 'bg-white text-[#702DFF] shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        "
      >
        <Inbox :size="14" />
        Inquiry Inbox
      </button>
      <button
        @click="activeTab = 'insights'"
        class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        :class="
          activeTab === 'insights'
            ? 'bg-white text-[#702DFF] shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        "
      >
        <BarChart3 :size="14" />
        Marketing Insights
      </button>
    </div>

    <!-- Tab 1: Inbox Content -->
    <div v-if="activeTab === 'inbox'" class="animate-fade-in-up">
      <!-- Stats Summary (Minimalist for Inbox) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <BentoStat
          title="Total Prospects"
          :value="leads.length"
          :icon="Users"
          variant="blue"
          tooltip="Jumlah total orang yang telah mengisi form kontak atau memulai permintaan proyek."
          simulation="Mencerminkan jangkauan pemasaran. Jika angka ini naik tapi Deal rendah, mungkin perlu riset kualitas konten promosi."
        />
        <BentoStat
          title="Need Response"
          :value="newLeadsCount"
          :icon="Zap"
          variant="danger"
          unit="Leads"
          tooltip="Pesan pelanggan baru yang belum sempat dibalas atau diarahkan ke tahap selanjutnya."
          simulation="Urgent! Balas pesan ini dalam < 1 jam untuk meningkatkan peluang Closing hingga 300%."
        />
        <BentoStat
          title="Active Handling"
          :value="activeHandlingCount"
          :icon="MessageSquare"
          variant="warning"
          unit="Active"
          tooltip="Jumlah klien yang sedang dalam proses negosiasi, follow-up, atau tanya-jawab."
          simulation="Klien di sini adalah 'pancingan' yang sudah dimakan, tinggal ditarik pelan-pelan ke status 'Deal'."
        />
        <BentoStat
          title="Opportunity Value"
          :value="opportunityValue"
          :icon="TrendingUp"
          variant="success"
          is-currency
          tooltip="Estimasi total 'Uang di Depan Mata' jika seluruh leads yang aktif berhasil ditutup (Closing)."
          simulation="Jika ada 10 leads masing-masing budget 5jt, maka Opportunity Value Kakak adalah 50jt."
        />
      </div>
    </div>

    <!-- Tab 2: Insights Content -->
    <div v-else-if="activeTab === 'insights'" class="animate-fade-in-up">
      <!-- Detailed Stats Header for Analysis -->
      <div class="flex items-center gap-4 mb-8">
        <div
          class="w-12 h-12 rounded-2xl bg-[#702DFF] flex items-center justify-center text-white shadow-lg shadow-[#702DFF]/20"
        >
          <Target :size="20" />
        </div>
        <div>
          <h2 class="text-xl font-black text-[#1B2559] tracking-tight">
            Market Intelligence
          </h2>
          <p
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >
            Growth & Quality Performance Analytics
          </p>
        </div>
      </div>

      <!-- Marketing Analysis Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <!-- Project Distribution -->
        <DashboardCard
          title="Market Interest"
          subtitle="Top demanded project categories"
          class="h-full"
        >
          <div class="space-y-5 mt-4">
            <div
              v-for="item in projectDistribution"
              :key="item.type"
              class="group"
            >
              <div class="flex justify-between items-end mb-1.5">
                <span
                  class="text-[10px] font-black text-[#1B2559] uppercase tracking-wider"
                  >{{ item.type }}</span
                >
                <span
                  class="text-[10px] font-black text-slate-300 uppercase shrink-0"
                  >{{ item.count }} Leads ({{ item.percentage }}%)</span
                >
              </div>
              <div
                class="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50"
              >
                <div
                  class="h-full rounded-full transition-all duration-1000 ease-out"
                  :class="item.color"
                  :style="{ width: item.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <!-- Conversion Funnel -->
        <DashboardCard
          title="Conversion Funnel"
          subtitle="Lead processing efficiency"
          class="h-full"
        >
          <div class="mt-4 flex flex-col gap-2">
            <div
              v-for="(stage, idx) in conversionFunnel"
              :key="stage.name"
              class="relative flex items-center justify-between p-4 rounded-2xl border transition-all hover:translate-x-1"
              :class="stage.bg"
            >
              <!-- Connector Line -->
              <div
                v-if="idx < conversionFunnel.length - 1"
                class="absolute left-1/2 -bottom-2 w-[1px] h-2 bg-slate-200 z-0"
              ></div>

              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm"
                >
                  <component
                    :is="stage.icon"
                    :size="14"
                    :class="stage.iconColor"
                  />
                </div>
                <span
                  class="text-[11px] font-black text-[#1B2559] uppercase tracking-tighter"
                  >{{ stage.name }}</span
                >
              </div>
              <span class="text-xs font-black text-[#1B2559]">{{
                stage.count
              }}</span>
            </div>
            <div
              class="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center"
            >
              <span
                class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
                >Effective Conversion</span
              >
              <span class="text-sm font-black text-[#702DFF]"
                >{{ conversionRate }}%</span
              >
            </div>
          </div>
        </DashboardCard>

        <!-- Insights & Momentum -->
        <DashboardCard
          title="Marketing Insights"
          subtitle="Growth & Quality Performance"
          class="h-full bg-[#0F172A] !border-none"
        >
          <div class="space-y-6 mt-4">
            <div class="p-4 bg-white/5 rounded-2xl border border-white/5">
              <div class="flex justify-between items-center mb-2">
                <span
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                  >Lead Velocity</span
                >
                <div class="flex items-center gap-1 text-emerald-400">
                  <TrendingUp :size="12" />
                  <span class="text-[10px] font-bold"
                    >+{{ weeklyGrowth }}%</span
                  >
                </div>
              </div>
              <p class="text-lg font-black text-white italic">
                "{{ leadsPerDay }} Prospektus / hari"
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div
                class="p-4 bg-white/5 rounded-2xl border border-white/5 text-center"
              >
                <p
                  class="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1"
                >
                  Avg Budget
                </p>
                <p class="text-sm font-black text-white tracking-tighter">
                  {{ formatPriceCompact(avgBudget) }}
                </p>
              </div>
              <div
                class="p-4 bg-white/5 rounded-2xl border border-white/5 text-center"
              >
                <p
                  class="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1"
                >
                  Hot Deals
                </p>
                <p class="text-sm font-black text-indigo-400 tracking-tighter">
                  {{ hotDealsCount }} High-Val
                </p>
              </div>
            </div>

            <div
              class="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20"
            >
              <p
                class="text-[8px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-2 leading-none"
              >
                Marketing Tip
              </p>
              <p class="text-[10px] text-slate-400 font-medium leading-[1.6]">
                {{ marketingTip }}
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <!-- Quick Tips for Insights -->
      <div
        class="p-8 bg-indigo-50/50 rounded-[40px] border border-indigo-100 flex flex-col md:flex-row items-center gap-8"
      >
        <div
          class="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#702DFF] shadow-indigo-100 shadow-xl shrink-0"
        >
          <Zap :size="24" />
        </div>
        <div class="text-center md:text-left">
          <h4 class="text-lg font-black text-[#1B2559]">
            Optimal Handling Strategy
          </h4>
          <p class="text-sm text-slate-500 font-medium">
            Data menunjukkan bahwa merespon leads dalam 5 menit pertama
            meningkatkan peluang konversi hingga 400%. Pastikan status 'New'
            selalu segera diproses!
          </p>
        </div>
        <button
          @click="activeTab = 'inbox'"
          class="md:ml-auto px-8 py-4 bg-[#702DFF] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
        >
          Go back to Inbox
        </button>
      </div>
    </div>

    <!-- Desktop Filter Bar -->
    <DashboardCard
      no-padding
      class="hidden lg:block mb-6 !rounded-[32px] shadow-lg shadow-slate-200/5 border-slate-50 overflow-hidden"
    >
      <div class="flex gap-4 justify-between items-center p-3 sm:p-4">
        <!-- Search -->
        <div class="flex-1 relative group max-w-md">
          <Search
            :size="16"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#702DFF]"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search leads..."
            @input="currentPage = 1"
            class="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 focus:ring-4 focus:ring-[#7029FF]/5 transition-all outline-none"
          />
        </div>

        <div class="flex gap-3">
          <div class="relative">
            <select
              v-model="statusFilter"
              @change="currentPage = 1"
              class="w-44 appearance-none bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 pr-10 text-[10px] font-black uppercase tracking-widest text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="New">NEW</option>
              <option value="Pending">PENDING</option>
              <option value="Follow Up">FOLLOW UP</option>
              <option value="Deal">DEAL</option>
              <option value="Cancel">CANCEL</option>
            </select>
            <ChevronDown
              :size="14"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
            />
          </div>

          <div class="relative">
            <select
              v-model="sourceFilter"
              @change="currentPage = 1"
              class="w-44 appearance-none bg-slate-50 border-2 border-transparent rounded-2xl py-3 px-4 pr-10 text-[10px] font-black uppercase tracking-widest text-[#1B2559] focus:bg-white focus:border-[#7029FF]/20 transition-all outline-none cursor-pointer"
            >
              <option value="all">Any Source</option>
              <option value="contact_form">Contact Form (Old)</option>
              <option value="web_consultation_wait">Consultation (Wait)</option>
              <option value="web_consultation_instant">
                Consultation (Instant)
              </option>
            </select>
            <ChevronDown
              :size="14"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </DashboardCard>

    <!-- Mobile Search & Filter Button -->
    <div class="lg:hidden flex gap-2 mb-6 px-1">
      <div class="flex-1 relative">
        <Search
          :size="16"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Quick search..."
          @input="currentPage = 1"
          class="w-full bg-white border-2 border-slate-50 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold text-[#1B2559] shadow-sm outline-none focus:border-[#702DFF]/20 transition-all"
        />
      </div>
      <button
        @click="isSelectionMode = !isSelectionMode"
        class="w-14 h-auto rounded-2xl border-2 flex items-center justify-center transition-all shadow-sm active:scale-90"
        :class="
          isSelectionMode
            ? 'bg-[#702DFF] border-[#702DFF] text-white'
            : 'bg-white border-slate-50 text-[#702DFF]'
        "
      >
        <CheckSquare :size="20" />
      </button>
      <button
        @click="isFilterOpen = true"
        class="w-14 h-auto rounded-2xl bg-white border-2 border-slate-50 flex items-center justify-center text-[#702DFF] shadow-sm active:scale-90 transition-all"
      >
        <SlidersHorizontal :size="20" />
      </button>
    </div>

    <!-- Leads Content -->
    <div v-if="isLoading" class="p-20 text-center">
      <div
        class="inline-block w-10 h-10 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
      ></div>
      <p
        class="mt-6 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]"
      >
        Filtering high-quality prospects...
      </p>
    </div>

    <div v-else-if="filteredLeads.length === 0" class="p-20 text-center">
      <div
        class="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4"
      >
        <Search :size="32" class="text-slate-200" />
      </div>
      <h3 class="text-[#1B2559] font-black text-lg">No leads captured</h3>
      <p class="text-slate-400 text-sm mt-1">
        Try adjusting your filters or wait for new submissions.
      </p>
    </div>

    <!-- Desktop Table View -->
    <DashboardCard
      no-padding
      class="hidden md:block overflow-hidden !rounded-[32px] border border-slate-100/50 shadow-xl shadow-slate-200/20 mb-12"
    >
      <div class="overflow-x-auto">
        <table class="table-main">
          <thead>
            <tr>
              <th class="!pl-8 w-12">
                <div class="flex items-center justify-center">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    @change="toggleSelectAll"
                    class="w-4 h-4 rounded border-2 border-slate-200 text-[#702DFF] focus:ring-[#702DFF] cursor-pointer"
                  />
                </div>
              </th>
              <th>Identity & Details</th>
              <th>Project Goals</th>
              <th>Status</th>
              <th>Source</th>
              <th class="text-right !pr-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="lead in filteredLeads"
              :key="lead.id"
              class="table-row-hover group"
              :class="{ 'bg-indigo-50/30': selectedIds.includes(lead.id) }"
            >
              <td class="!pl-8 w-12 text-center">
                <div class="flex items-center justify-center">
                  <input
                    type="checkbox"
                    v-model="selectedIds"
                    :value="lead.id"
                    class="w-4 h-4 rounded border-2 border-slate-200 text-[#702DFF] focus:ring-[#702DFF] cursor-pointer"
                  />
                </div>
              </td>
              <td>
                <div class="flex flex-col">
                  <p
                    class="font-black text-[#1B2559] leading-tight text-sm tracking-tight group-hover:text-[#702DFF] transition-colors truncate max-w-[180px] mb-1.5"
                  >
                    {{ lead.name }}
                  </p>
                  <div class="flex items-center gap-1.5 overflow-hidden">
                    <span
                      class="text-[9px] font-black text-slate-300 bg-slate-50 px-2 py-0.5 rounded shadow-sm border border-slate-100 flex items-center gap-1 group-hover:border-indigo-100 group-hover:text-indigo-400 transition-colors"
                    >
                      <Hash :size="8" />
                      {{ lead.id.substring(0, 8).toUpperCase() }}
                    </span>
                    <span
                      class="text-[9px] font-black text-slate-300 uppercase tracking-widest truncate"
                      >{{ lead.company || `Personal` }}</span
                    >
                    <span class="text-slate-200">•</span>
                    <span
                      class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
                      >{{ formatDate(lead.created_at) }}</span
                    >
                  </div>
                </div>
              </td>
              <td class="max-w-[300px]">
                <div class="flex flex-col">
                  <p
                    class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest truncate"
                  >
                    {{ lead.project_type || lead.type || `General Inquiry` }}
                  </p>
                  <p
                    class="text-[11px] text-slate-400 line-clamp-1 mt-1 font-medium italic opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    {{ lead.brief || lead.notes || `No message provided...` }}
                  </p>
                </div>
              </td>
              <td>
                <div class="flex flex-col gap-1.5 items-start">
                  <div class="flex items-center gap-3">
                    <select
                      :value="lead.status || 'New'"
                      @change="onStatusChange(lead, $event)"
                      class="appearance-none cursor-pointer px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 transition-all outline-none shadow-sm w-32"
                      :class="getStatusClass(lead.status)"
                    >
                      <option value="New">NEW</option>
                      <option value="Pending">PENDING</option>
                      <option value="Follow Up">FOLLOW UP</option>
                      <option value="Deal">DEAL</option>
                      <option value="Cancel">CANCEL</option>
                    </select>
                  </div>
                  <span
                    v-if="lead.is_converted"
                    class="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black rounded uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                  >
                    Converted to Order
                  </span>
                </div>
              </td>
              <td>
                <span
                  class="inline-flex px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 border border-slate-200"
                >
                  {{ lead.source || "Unknown" }}
                </span>
              </td>
              <td class="!pr-8">
                <div class="flex items-center justify-end gap-1 transition-all">
                  <!-- 1. View / Edit Detail -->
                  <button
                    @click="openEditModal(lead)"
                    class="btn-action bg-slate-50 text-slate-400 hover:bg-slate-500 hover:text-white"
                    title="Lihat / Edit Detail"
                  >
                    <Eye :size="16" />
                  </button>

                  <!-- 2. Communication -->
                  <button
                    @click="openWhatsApp(lead)"
                    class="btn-action bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white"
                    title="Contact WhatsApp"
                  >
                    <MessageCircle :size="16" />
                  </button>

                  <!-- More Actions Dropdown (Table Cell) -->
                  <div>
                    <button
                      @click.stop="openMenu($event, lead)"
                      class="btn-action bg-slate-50 text-slate-300 hover:text-[#702DFF] hover:bg-indigo-50"
                    >
                      <MoreHorizontal :size="16" />
                    </button>
                    <!-- Removed inline transition menu, now handled by Teleport -->
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardCard>

    <div class="md:hidden space-y-4 mb-20 px-1">
      <!-- Mobile Bulk Header -->
      <transition name="fade">
        <div
          v-if="isSelectionMode"
          class="flex items-center justify-between px-6 py-3 bg-indigo-50/50 rounded-[24px] mb-4 border border-indigo-100/30"
        >
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              :checked="isAllSelected"
              @change="toggleSelectAll"
              class="w-5 h-5 rounded border-2 border-slate-300 text-[#702DFF] focus:ring-[#702DFF]"
            />
            <span
              class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
              >Select All filtered</span
            >
          </div>
          <button
            @click="
              isSelectionMode = false;
              selectedIds = [];
            "
            class="text-[10px] font-black text-rose-500 uppercase tracking-widest"
          >
            Done
          </button>
        </div>
      </transition>

      <div
        v-for="lead in filteredLeads"
        :key="lead.id"
        @click="isSelectionMode ? toggleSelection(lead.id) : null"
        class="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/20 border border-slate-50 transition-all relative overflow-hidden"
        :class="{
          'border-[#702DFF]/40 bg-indigo-50/20 scale-[0.98]':
            selectedIds.includes(lead.id),
          'active:scale-95': !isSelectionMode,
        }"
      >
        <div v-if="isSelectionMode" class="absolute top-6 left-3 z-10">
          <input
            type="checkbox"
            :checked="selectedIds.includes(lead.id)"
            @click.stop
            @change="toggleSelection(lead.id)"
            class="w-5 h-5 rounded-lg border-2 border-slate-200 text-[#702DFF] focus:ring-[#702DFF]"
          />
        </div>
        <div
          class="flex justify-between items-start mb-4 transition-all"
          :class="{ 'ml-8': isSelectionMode }"
        >
          <div class="flex flex-col">
            <p class="font-black text-[#1B2559] text-sm leading-tight mb-1">
              {{ lead.name }}
            </p>
            <p
              class="text-[9px] font-black text-slate-300 uppercase tracking-widest"
            >
              {{ lead.company || "Personal" }}
            </p>
          </div>
          <select
            :value="lead.status || 'New'"
            @change="onStatusChange(lead, $event)"
            class="appearance-none px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border-2 outline-none shadow-sm"
            :class="getStatusClass(lead.status)"
          >
            <option value="New">NEW</option>
            <option value="Pending">PENDING</option>
            <option value="Follow Up">FOLLOW UP</option>
            <option value="Deal">DEAL</option>
            <option value="Cancel">CANCEL</option>
          </select>
        </div>

        <div class="mb-3">
          <span
            class="inline-flex px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 border border-slate-200"
          >
            {{ lead.source || "Unknown" }}
          </span>
        </div>

        <div class="mb-4">
          <div class="flex items-center gap-2 mb-1">
            <span
              class="text-[8px] font-black text-indigo-400 uppercase tracking-widest"
              >Project Type</span
            >
            <div class="h-[1px] flex-1 bg-slate-50"></div>
          </div>
          <p class="text-xs font-black text-[#1B2559] uppercase">
            {{ lead.project_type || lead.type || "General Inquiry" }}
          </p>
          <p
            class="text-[11px] text-slate-400 mt-1 line-clamp-2 italic font-medium opacity-80"
          >
            "{{ lead.brief || lead.notes || "No message provided" }}"
          </p>
        </div>

        <div
          class="flex items-center justify-between pt-4 border-t border-slate-50"
        >
          <div class="flex flex-col">
            <span class="text-[10px] font-black text-[#1B2559]">{{
              lead.budget ? formatPrice(lead.budget) : "Negotiable"
            }}</span>
            <span
              class="text-[7px] font-black text-slate-300 uppercase tracking-widest"
              >{{ formatDate(lead.created_at) }}</span
            >
          </div>
          <div class="flex gap-2">
            <!-- 1. View / Edit Detail -->
            <button
              @click="openEditModal(lead)"
              class="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center transition-all active:scale-95"
            >
              <Eye :size="16" />
            </button>

            <!-- 2. Communication -->
            <button
              @click="openWhatsApp(lead)"
              class="w-9 h-9 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center transition-all active:scale-95"
            >
              <MessageCircle :size="16" />
            </button>

            <!-- More Actions Dropdown Trigger (Mobile Card) -->
            <button
              @click.stop="openMenu($event, lead)"
              class="w-9 h-9 rounded-xl bg-indigo-50 text-[#702DFF] flex items-center justify-center transition-all active:scale-95"
            >
              <MoreHorizontal :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="allFilteredLeads.length > 0"
      class="flex items-center justify-between mb-20 px-4 md:px-0"
    >
      <div class="hidden md:block">
        <p
          class="text-[10px] font-black text-slate-300 uppercase tracking-widest"
        >
          Showing
          <span class="text-[#702DFF]"
            >{{ paginationStart + 1 }} -
            {{ Math.min(paginationEnd, totalFiltered) }}</span
          >
          of {{ totalFiltered }} Prospects
        </p>
      </div>
      <div class="flex items-center gap-2 w-full md:w-auto">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="flex-1 md:flex-none h-12 px-6 rounded-2xl bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#1B2559] hover:bg-slate-50 disabled:opacity-20 transition-all"
        >
          Prev
        </button>
        <div class="hidden md:flex items-center gap-1">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            class="w-12 h-12 rounded-2xl text-[10px] font-black transition-all"
            :class="
              currentPage === page
                ? 'bg-[#702DFF] text-white shadow-lg shadow-indigo-500/20'
                : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'
            "
          >
            {{ page }}
          </button>
        </div>
        <div class="md:hidden flex-1 text-center">
          <span
            class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
            >Page {{ currentPage }} / {{ totalPages }}</span
          >
        </div>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="flex-1 md:flex-none h-12 px-6 rounded-2xl bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#1B2559] hover:bg-slate-50 disabled:opacity-20 transition-all"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modals -->
    <LeadEditModal
      v-if="editModal.isOpen"
      :is-open="editModal.isOpen"
      :lead="editModal.lead"
      :loading="editModal.loading"
      @close="editModal.isOpen = false"
      @save="handleSaveEdit"
    />

    <WhatsAppModal
      v-if="waModal.isOpen"
      :is-open="waModal.isOpen"
      :client-name="waModal.clientName"
      :client-phone="waModal.clientPhone"
      :text="waModal.text"
      :initial-drive-url="waModal.driveUrl"
      @close="waModal.isOpen = false"
    />

    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />

    <!-- Mobile Filter BottomSheet -->
    <BottomSheet :is-open="isFilterOpen" @close="isFilterOpen = false">
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-2xl font-black text-[#1B2559]">Lead Filters</h3>
            <p
              class="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1"
            >
              Refine your inquiry inbox
            </p>
          </div>
          <button
            @click="isFilterOpen = false"
            class="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center"
          >
            <X :size="20" />
          </button>
        </div>

        <div class="space-y-6">
          <div class="space-y-2">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
              >By Status</label
            >
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="st in [
                  'all',
                  'New',
                  'Pending',
                  'Follow Up',
                  'Deal',
                  'Cancel',
                ]"
                :key="st"
                @click="
                  statusFilter = st;
                  currentPage = 1;
                "
                class="py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2"
                :class="
                  statusFilter === st
                    ? 'bg-[#702DFF] text-white border-[#702DFF] shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-50 text-slate-400 border-transparent'
                "
              >
                {{ st === "all" ? "All" : st }}
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4"
              >By Source</label
            >
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="src in [
                  { id: 'all', l: 'All' },
                  { id: 'contact_form', l: 'Contact (Old)' },
                  { id: 'web_consultation_wait', l: 'Consul (Wait)' },
                  { id: 'web_consultation_instant', l: 'Consul (Chat)' },
                ]"
                :key="src.id"
                @click="
                  sourceFilter = src.id;
                  currentPage = 1;
                "
                class="py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2"
                :class="
                  sourceFilter === src.id
                    ? 'bg-[#702DFF] text-white border-[#702DFF] shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-50 text-slate-400 border-transparent'
                "
              >
                {{ src.l }}
              </button>
            </div>
          </div>
        </div>

        <div class="mt-10 pb-4">
          <button
            @click="isFilterOpen = false"
            class="w-full py-5 bg-[#1B2559] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-900/10 active:scale-95 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </BottomSheet>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :is-open="isConfirmDeleteOpen"
      variant="danger"
      title="Delete Leads"
      :message="`Are you sure you want to delete ${selectedIds.length} selected leads? This action cannot be undone.`"
      confirm-text="Yes, Delete All"
      @close="isConfirmDeleteOpen = false"
      @confirm="confirmBulkDelete"
    />

    <!-- Bulk Action Bar -->
    <transition name="fade-up">
      <div
        v-if="selectedIds.length > 0"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-2xl"
      >
        <div
          class="bg-[#1B2559] rounded-[32px] p-4 shadow-2xl shadow-indigo-900/40 flex items-center justify-between border border-white/10 backdrop-blur-xl"
        >
          <div class="flex items-center gap-4 pl-4">
            <div
              class="w-10 h-10 rounded-2xl bg-[#702DFF] flex items-center justify-center text-white shadow-lg shadow-[#702DFF]/20"
            >
              <CheckSquare :size="20" />
            </div>
            <div>
              <p class="text-white font-black text-sm tracking-tight">
                {{ selectedIds.length }} Selected
              </p>
              <p
                class="text-slate-400 text-[10px] uppercase font-black tracking-widest"
              >
                Manage leads bulkly
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="
                selectedIds = [];
                isSelectionMode = false;
              "
              class="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleBulkDelete"
              :disabled="isBulkDeleting"
              class="px-8 py-3 bg-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Trash2 :size="14" v-if="!isBulkDeleting" />
              <div
                v-else
                class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></div>
              Delete Selected
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Floating Dropdown Menu (Teleported to Body) -->
    <Teleport to="body">
      <div
        v-if="activeMenuLead"
        class="bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 w-48 z-[9999] overflow-hidden fixed"
        :style="{
          top: `${menuPosition.y}px`,
          left: `${menuPosition.x}px`,
        }"
        @click.stop
      >
        <button
          v-if="hasProposal(activeMenuLead)"
          @click="
            $router.push(`/proposals/generator?id=${activeMenuLead.id}`);
            closeMenu();
          "
          class="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-3"
        >
          <FileText :size="14" /> Open Proposal
        </button>

        <button
          v-else
          @click="
            $router.push(`/proposals/generator?leadId=${activeMenuLead.id}`);
            closeMenu();
          "
          class="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-[#702DFF] hover:bg-indigo-50 transition-all flex items-center gap-3"
        >
          <Zap :size="14" /> Generate Proposal
        </button>

        <button
          @click="
            openEditModal(activeMenuLead);
            closeMenu();
          "
          class="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all flex items-center gap-3"
        >
          <Edit2 :size="14" /> Edit Lead
        </button>

        <button
          @click="
            convertToOrder(activeMenuLead);
            closeMenu();
          "
          class="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 transition-all flex items-center gap-3"
        >
          <ArrowRight :size="14" /> Convert to Order
        </button>

        <div class="h-px bg-slate-50 my-1"></div>

        <button
          @click="
            confirmSingleDelete(activeMenuLead);
            closeMenu();
          "
          class="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all flex items-center gap-3"
        >
          <Trash2 :size="14" /> Remove Lead
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  Search,
  RotateCw,
  Users,
  Zap,
  MessageSquare,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  Eye,
  ChevronDown,
  X,
  SlidersHorizontal,
  CheckSquare,
  Trash2,
  MoreHorizontal,
  Globe,
  Target,
  Clock,
  CheckCircle,
  Inbox,
  BarChart3,
  Hash,
  FileText,
  Edit2,
} from "lucide-vue-next";
import { clientsService } from "../services/clientsService";
import { useErrorHandler } from "../composables/useErrorHandler";
import { useLoading } from "../composables/useLoading";
import type { Client } from "../types";
import PageHeader from "../components/ui/PageHeader.vue";
import DashboardCard from "../components/ui/DashboardCard.vue";
import ButtonPrimary from "../components/ui/ButtonPrimary.vue";
import ButtonSecondary from "../components/ui/ButtonSecondary.vue";
import BentoStat from "../components/ui/BentoStat.vue";
import Toast from "../components/ui/Toast.vue";
import WhatsAppModal from "../components/ui/WhatsAppModal.vue";
import LeadEditModal from "../components/ui/LeadEditModal.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";
import { BottomSheet } from "@kangjessy/ui";

const router = useRouter();
import { docsService } from "../services/docsService";

const leads = ref<Client[]>([]);
const selectedIds = ref<string[]>([]);
const isBulkDeleting = ref(false);
const isConfirmDeleteOpen = ref(false);
const isSelectionMode = ref(false);
const activeTab = ref<"inbox" | "insights">("inbox");
// const openMenuId = ref<string | null>(null); // Removed in favor of Teleport menu

// Teleport Menu Logic
const activeMenuLead = ref<Client | null>(null);
const menuPosition = ref({ x: 0, y: 0 });

const openMenu = (event: MouseEvent, lead: Client) => {
  // If clicking the same lead, toggle close
  if (activeMenuLead.value && activeMenuLead.value.id === lead.id) {
    closeMenu();
    return;
  }

  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();

  // Calculate position: Align right edge of menu to right edge of button, place below button
  // Menu width is roughly 192px (w-48 = 12rem = 192px)
  const menuWidth = 192;
  let x = rect.right - menuWidth;
  let y = rect.bottom + 8; // slighly below

  // Boundary check (rudimentary)
  if (x < 10) x = 10;
  if (y + 150 > window.innerHeight) y = rect.top - 160; // Flip up if too low

  menuPosition.value = { x, y };
  activeMenuLead.value = lead;
};

const closeMenu = () => {
  activeMenuLead.value = null;
};

const isAllSelected = computed(() => {
  return (
    filteredLeads.value.length > 0 &&
    selectedIds.value.length === filteredLeads.value.length
  );
});

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedIds.value = [];
  } else {
    selectedIds.value = filteredLeads.value.map((l) => l.id);
  }
}

function toggleSelection(id: string) {
  const idx = selectedIds.value.indexOf(id);
  if (idx > -1) {
    selectedIds.value.splice(idx, 1);
  } else {
    selectedIds.value.push(id);
  }
}

async function handleBulkDelete() {
  isConfirmDeleteOpen.value = true;
}

async function confirmBulkDelete() {
  isBulkDeleting.value = true;
  try {
    await clientsService.deleteMany(selectedIds.value);
    showToast(`${selectedIds.value.length} leads deleted`, "success");
    selectedIds.value = [];
    isSelectionMode.value = false;
    await fetchLeads();
  } catch (e: any) {
    showToast(e.message || "Failed to delete leads", "error");
  } finally {
    isBulkDeleting.value = false;
    isConfirmDeleteOpen.value = false;
  }
}

const searchQuery = ref("");
const statusFilter = ref("all");
const sourceFilter = ref("all");
const isFilterOpen = ref(false);

// Composables
const { handleError } = useErrorHandler();
const { isLoading, withLoading } = useLoading("leads");

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});
const editModal = ref<{
  isOpen: boolean;
  lead: Client | null;
  loading: boolean;
}>({
  isOpen: false,
  lead: null,
  loading: false,
});
const waModal = ref({
  isOpen: false,
  clientName: "",
  clientPhone: "",
  text: "",
  driveUrl: "",
});

// Lifecycle
// Lifecycle
const closeMenuOnClickOutside = () => {
  activeMenuLead.value = null;
};

onMounted(() => {
  fetchLeads();
  window.addEventListener("click", closeMenuOnClickOutside);
  const subscription = clientsService.subscribeToClients(() => fetchLeads());
  onUnmounted(() => {
    subscription.unsubscribe();
    window.removeEventListener("click", closeMenuOnClickOutside);
  });
});

async function fetchLeads() {
  await withLoading(async () => {
    try {
      leads.value = await clientsService.getLeads();
    } catch (err) {
      handleError(err, "Sync Inbox");
    }
  });
}
const safeNumber = (val: any) => {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    // Detect Indonesian format: dots as thousand separators (e.g. 1.750.000)
    if (/\d+\.\d{3}/.test(val)) {
      return parseFloat(val.replace(/\./g, "").replace(/[^0-9.-]/g, "")) || 0;
    }
    const cleaned = val.replace(/[^0-9.-]/g, "");
    return parseFloat(cleaned) || 0;
  }
  return Number(val) || 0;
};

// Stats
const newLeadsCount = computed(
  () => leads.value.filter((l) => (l.status || "New") === "New").length,
);
const activeHandlingCount = computed(
  () =>
    leads.value.filter((l) => ["Follow Up", "Pending"].includes(l.status || ""))
      .length,
);
const opportunityValue = computed(() =>
  leads.value
    .filter((l) => l.status !== "Cancel")
    .reduce((acc, lead) => acc + safeNumber((lead as any).budget), 0),
);

// Marketing Insights Computations
const projectDistribution = computed(() => {
  const counts: Record<string, number> = {};
  leads.value.forEach((l) => {
    const type = l.project_type || l.type || "General";
    counts[type] = (counts[type] || 0) + 1;
  });

  const total = leads.value.length || 1;
  const colors = [
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-amber-500",
    "bg-emerald-500",
  ];

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([type, count], idx) => ({
      type,
      count,
      percentage: Math.round((count / total) * 100),
      color: colors[idx % colors.length],
    }));
});

const conversionFunnel = computed(() => [
  {
    name: "Total Awareness",
    count: leads.value.length,
    icon: Globe,
    iconColor: "text-blue-500",
    bg: "bg-blue-50/30 border-blue-100",
  },
  {
    name: "Qualified Inquiry",
    count: leads.value.filter((l) => l.status !== "Cancel").length,
    icon: Target,
    iconColor: "text-amber-500",
    bg: "bg-amber-50/30 border-amber-100",
  },
  {
    name: "Handling Stage",
    count: activeHandlingCount.value,
    icon: Clock,
    iconColor: "text-indigo-500",
    bg: "bg-indigo-50/30 border-indigo-100",
  },
  {
    name: "Deals Secured",
    count: leads.value.filter((l) => l.status === "Deal").length,
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    bg: "bg-emerald-50/30 border-emerald-100",
  },
]);

const conversionRate = computed(() => {
  if (leads.value.length === 0) return 0;
  const deals = leads.value.filter((l) => l.status === "Deal").length;
  return Math.round((deals / leads.value.length) * 100);
});

const avgBudget = computed(() => {
  const nonCanceled = leads.value.filter(
    (l) => l.status !== "Cancel" && safeNumber(l.budget) > 0,
  );
  if (nonCanceled.length === 0) return 0;
  const sum = nonCanceled.reduce((acc, l) => acc + safeNumber(l.budget), 0);
  return sum / nonCanceled.length;
});

const hotDealsCount = computed(
  () =>
    leads.value.filter(
      (l) => safeNumber(l.budget) > 10000000 && l.status !== "Cancel",
    ).length,
);

const leadsPerDay = computed(() => {
  if (leads.value.length === 0) return 0;
  // Sample calculation based on total leads over 30 days
  return (leads.value.length / 30).toFixed(1);
});

const weeklyGrowth = computed(() => {
  // Mock growth calculation (could be more complex if we had more history)
  return 12.5;
});

const marketingTip = computed(() => {
  const pendingCount = leads.value.filter((l) => l.status === "New").length;
  if (pendingCount > 3)
    return "Terdapat prospek baru yang belum direspon. Balas secepatnya untuk meningkatkan peluang closing sebesar 60%!";
  if (conversionRate.value < 10)
    return "Coba tawarkan mini-service untuk leads yang memiliki budget terbatas agar konversi meningkat.";
  return (
    "Analisa Market: Tipe proyek " +
    (projectDistribution.value[0]?.type || "Web") +
    " sedang trending. Pertimbangkan promo khusus kategori ini."
  );
});

function formatPriceCompact(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(price);
}

// Filtering & Pagination
const allFilteredLeads = computed(() => {
  return leads.value.filter((l) => {
    const matchesSearch =
      !searchQuery.value ||
      l.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (l.company &&
        l.company.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (l.project_type &&
        l.project_type.toLowerCase().includes(searchQuery.value.toLowerCase()));

    const matchesStatus =
      statusFilter.value === "all" ||
      (l.status || "New") === statusFilter.value;
    const matchesSource =
      sourceFilter.value === "all" || l.source === sourceFilter.value;

    return matchesSearch && matchesStatus && matchesSource;
  });
});

const totalFiltered = computed(() => allFilteredLeads.value.length);
const totalPages = computed(() =>
  Math.ceil(totalFiltered.value / itemsPerPage.value),
);
const paginationStart = computed(
  () => (currentPage.value - 1) * itemsPerPage.value,
);
const paginationEnd = computed(
  () => paginationStart.value + itemsPerPage.value,
);

const filteredLeads = computed(() => {
  return allFilteredLeads.value.slice(
    paginationStart.value,
    paginationEnd.value,
  );
});

// Actions
function showToast(message: string, variant: "success" | "error" = "success") {
  toast.value = { show: true, message, variant };
}

function getStatusClass(status: string | undefined) {
  const s = status || "New";
  switch (s) {
    case "New":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "Follow Up":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "Deal":
      return "bg-indigo-50 text-[#702DFF] border-indigo-100";
    case "Pending":
      return "bg-blue-50 text-blue-600 border-blue-100";
    case "Cancel":
      return "bg-slate-50 text-slate-400 border-slate-100";
    default:
      return "bg-slate-50 text-slate-400 border-slate-100";
  }
}

async function onStatusChange(lead: Client, event: Event) {
  const target = event.target as HTMLSelectElement;
  await updateStatus(lead, target.value);
}

async function updateStatus(lead: Client, newStatus: string) {
  const oldStatus = lead.status;
  lead.status = newStatus;
  try {
    await clientsService.update(lead.id, { status: newStatus });
    showToast(`Status updated to ${newStatus}`);
  } catch (err) {
    lead.status = oldStatus;
    showToast("Failed to update status", "error");
  }
}

function openEditModal(lead: Client) {
  editModal.value = {
    isOpen: true,
    lead: { ...lead },
    loading: false,
  };
}

async function handleSaveEdit(updatedData: any) {
  if (!editModal.value.lead) return;

  editModal.value.loading = true;
  try {
    const updatedLead = await clientsService.update(
      editModal.value.lead.id,
      updatedData,
    );
    // Update local state
    const index = leads.value.findIndex((l) => l.id === updatedLead.id);
    if (index !== -1) leads.value[index] = updatedLead;

    showToast("Lead updated successfully");
    editModal.value.isOpen = false;
  } catch (err) {
    showToast("Failed to update lead", "error");
  } finally {
    editModal.value.loading = false;
  }
}

function convertToOrder(lead: Client) {
  router.push(`/orders/${lead.id}/edit?convert=true`);
}

async function confirmSingleDelete(lead: Client) {
  if (
    confirm(`Hapus lead dari "${lead.name}"? Action ini tidak bisa dibatalkan.`)
  ) {
    try {
      await clientsService.delete(lead.id);
      leads.value = leads.value.filter((l) => l.id !== lead.id);
      showToast("Lead berhasil dihapus");
    } catch (e: any) {
      showToast(e.message || "Gagal menghapus lead", "error");
    }
  }
}

function openWhatsApp(lead: Client) {
  const phone = lead.phone?.replace(/[^0-9]/g, "");
  if (!phone) return showToast("Client phone missing", "error");

  waModal.value.clientName = lead.name;
  waModal.value.clientPhone = phone;

  // Extract and format budget
  const rawBudget =
    lead.budget || lead.notes?.match(/\[Budget Range: (.*?)\]/)?.[1];
  let budgetDisplay = "Sesuai Diskusi";

  if (rawBudget) {
    const num = safeNumber(rawBudget);
    if (num > 0) {
      budgetDisplay = formatPrice(num);
    } else {
      budgetDisplay = String(rawBudget);
    }
  }

  // Auto-fetch proposal link based on project type
  docsService.getLinks().then((links) => {
    const match = links.find((l) => l.project_type === lead.project_type);
    if (match && match.proposal_link) {
      waModal.value.driveUrl = match.proposal_link;
    } else {
      waModal.value.driveUrl = ""; // Default empty if no match
    }
  });

  waModal.value.text = `Halo Kak ${lead.name}! 👋

Terima kasih telah mengisi formulir di *KangJessy Agency*. Saya sudah meninjau rincian kebutuhan yang Kakak kirimkan:

📊 *Rangkuman Inkuiri Proyek:*
• *Tipe Jasa:* ${lead.project_type || "-"}
• *Estimasi Budget:* ${budgetDisplay}
• *Visual Vibe/Style:* ${lead.visual_style || "-"}
${
  lead.brief
    ? `• *Brief:* _"${lead.brief.substring(0, 100)}${
        lead.brief.length > 100 ? "..." : ""
      }"_`
    : ""
}

Berdasarkan data tersebut, saya telah menyusun *Proposal Penawaran Khusus* yang disesuaikan dengan kebutuhan dan budget Kakak agar hasilnya maksimal. 🚀

Berikut adalah detail lengkap penawarannya (link ada di bawah ya Kak). Sambil dibaca-baca, jika ada detail yang ingin disesuaikan atau ingin diskusi lebih lanjut, saya siap membantu. 😊

Salam hangat,
*KangJessy Agency*`;

  waModal.value.isOpen = true;
}

const hasProposal = (lead: Client) => {
  // Only consider it a proposal if status is moving towards 'Concept' or explicit project type
  // Simple 'project_name' is common in leads, so ignore that for 'hasProposal' check
  return (
    lead.status === "Concept" ||
    lead.status === "Sent" ||
    lead.type === "project_order"
  );
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-ID", {
    day: "numeric",
    month: "short",
  });
}

function formatPrice(price: any) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(safeNumber(price));
}
</script>

<style scoped>
.btn-action {
  @apply w-10 h-10 rounded-2xl transition-all flex items-center justify-center;
}
</style>
