<template>
  <div class="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <!-- Background Decor -->
    <div
      class="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-100/30 blur-[120px] rounded-full opacity-50"
    ></div>
    <div
      class="absolute bottom-1/2 left-0 -z-10 w-[400px] h-[400px] bg-blue-50/40 blur-[100px] rounded-full opacity-40"
    ></div>
    <PageHeader
      title="Client Orders"
      subtitle="Track payments and manage active development projects"
    >
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          @click="fetchOrders"
          :loading="isLoading"
          class="!bg-white !border-slate-200 !text-slate-600 hover:!bg-slate-50 shadow-sm"
        >
          <RotateCw :size="18" :class="{ 'animate-spin': isLoading }" />
          Refresh
        </BaseButton>
        <BaseButton variant="primary" @click="$router.push('/orders/new')">
          <Plus :size="18" />
          Add New Order
        </BaseButton>
      </div>
    </PageHeader>

    <!-- Tabs Navigation -->
    <div
      class="flex gap-1 p-1 bg-slate-100/50 backdrop-blur-md rounded-[22px] w-fit mb-8 border border-slate-200/50 relative z-10"
    >
      <button
        @click="activeTab = 'board'"
        class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        :class="
          activeTab === 'board'
            ? 'bg-white text-[#702DFF] shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        "
      >
        <Layout :size="14" />
        Order Board
      </button>
      <button
        @click="activeTab = 'finance'"
        class="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
        :class="
          activeTab === 'finance'
            ? 'bg-white text-[#702DFF] shadow-sm'
            : 'text-slate-400 hover:text-slate-600'
        "
      >
        <Banknote :size="14" />
        Revenue Intelligence
      </button>
    </div>

    <!-- Tab 1: Order Board -->
    <div v-if="activeTab === 'board'" class="animate-fade-in-up">
      <!-- Stats Overview -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 mt-2">
        <BentoStat
          title="Project Pipeline"
          :value="stats.totalRevenue"
          :icon="TrendingUp"
          variant="blue"
          is-currency
          tooltip="Nilai total kotor dari seluruh pesanan klien yang tercatat di sistem."
          simulation="Jika ada pesanan baru senilai Rp 5jt, angka ini akan otomatis naik sebesar Rp 5jt meskipun klien belum membayar."
        />
        <BentoStat
          title="Settled Revenue"
          :value="stats.collected"
          :icon="CheckCircle2"
          variant="success"
          is-currency
          tooltip="Total akumulasi dana yang sudah masuk (Lunas/DP) dari seluruh pesanan."
          simulation="Jika klien membayar termin kedua sebesar Rp 2jt, maka angka Settled ini akan bertambah dan Ledger akan berkurang."
        />
        <BentoStat
          title="Unpaid Ledger"
          :value="stats.debt"
          :icon="CreditCard"
          variant="danger"
          is-currency
          tooltip="Total saldo piutang atau sisa tagihan yang belum dibayarkan oleh klien."
          simulation="Simulasi: Proyek 10jt, baru bayar 4jt. Maka 6jt sisanya akan nangkring di Unpaid Ledger ini sebagai 'Hutang Klien'."
        />
        <BentoStat
          title="Production Load"
          :value="stats.active"
          :icon="Clock"
          variant="warning"
          unit="Active"
          tooltip="Beban kerja aktif tim saat ini. Menghitung pesanan yang belum berstatus 'Done'."
          simulation="Jika Kakak mengubah status proyek Kang Surya menjadi 'Done', angka load ini akan berkurang 1 secara otomatis."
        />
      </div>

      <!-- Desktop Filter Bar -->
      <DashboardCard
        no-padding
        class="hidden lg:block mb-6 !rounded-[24px] shadow-sm bg-white/80 backdrop-blur-xl border-none"
      >
        <div class="flex gap-4 justify-between items-center p-3 sm:p-4">
          <!-- Search -->
          <div class="flex-1 relative group max-w-md">
            <Search
              :size="16"
              class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#702DFF]"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search orders..."
              @input="currentPage = 1"
              class="input-field !pl-14 !py-2.5 !rounded-xl !text-[11px] !bg-slate-50/50"
            />
          </div>

          <div class="flex gap-3">
            <!-- Status Filter -->
            <div class="relative group">
              <select
                v-model="statusFilter"
                @change="currentPage = 1"
                class="select-field !w-44 !py-2 !pl-4 !pr-10 !text-[10px] !font-black !rounded-xl !bg-white border border-slate-100 shadow-sm transition-all group-hover:border-indigo-100"
              >
                <option value="all">ANY STATUS</option>
                <option v-for="s in statusOptions" :key="s" :value="s">
                  {{ s.toUpperCase() }}
                </option>
              </select>
              <ChevronDown
                :size="14"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none transition-colors group-hover:text-[#702DFF]"
              />
            </div>

            <!-- Payment Filter -->
            <div class="relative group">
              <select
                v-model="paymentFilter"
                @change="currentPage = 1"
                class="select-field !w-44 !py-2 !pl-4 !pr-10 !text-[10px] !font-black !rounded-xl !bg-white border border-slate-100 shadow-sm transition-all group-hover:border-indigo-100"
              >
                <option value="all">ANY PAYMENT</option>
                <option value="paid">LUNAS / FULL</option>
                <option value="unpaid">PIUTANG / DEBT</option>
              </select>
              <ChevronDown
                :size="14"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none transition-colors group-hover:text-[#702DFF]"
              />
            </div>

            <!-- Sort Filter -->
            <div class="relative group">
              <select
                v-model="sortBy"
                @change="currentPage = 1"
                class="select-field !w-44 !py-2 !pl-4 !pr-10 !text-[10px] !font-black !rounded-xl !bg-white border border-slate-100 shadow-sm transition-all group-hover:border-indigo-100"
              >
                <option value="newest">RECENT FIRST</option>
                <option value="budget-high">PREMIUM BUDGET</option>
                <option value="debt-high">LEDEGER DEBT</option>
              </select>
              <ArrowUpDown
                :size="14"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none transition-colors group-hover:text-[#702DFF]"
              />
            </div>
          </div>
        </div>
      </DashboardCard>

      <!-- Mobile Search & Filter Actions -->
      <div class="lg:hidden flex gap-2 mb-6 px-1">
        <div class="flex-1 relative">
          <Search
            :size="16"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search orders..."
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

      <!-- Mobile Selection Bar -->
      <transition name="fade">
        <div
          v-if="isSelectionMode"
          class="lg:hidden flex items-center justify-between px-2 mb-4 animate-fade-in"
        >
          <button
            @click="toggleSelectAll"
            class="text-[10px] font-black uppercase tracking-widest text-[#702DFF] bg-indigo-50 px-4 py-2 rounded-xl"
          >
            {{ isAllSelected ? "Deselect All" : "Select All Filtered" }}
          </button>
          <button
            @click="isSelectionMode = false"
            class="text-[10px] font-black uppercase tracking-widest text-slate-400"
          >
            Done
          </button>
        </div>
      </transition>

      <!-- Desktop Table -->
      <DashboardCard
        no-padding
        overflow-visible
        class="hidden lg:block !rounded-[40px] border border-slate-100/50 shadow-2xl shadow-indigo-500/5 mb-12 bg-white/70 backdrop-blur-xl"
      >
        <div v-if="isLoading" class="p-20 text-center">
          <div
            class="inline-block w-8 h-8 border-4 border-[#7029FF] border-t-transparent rounded-full animate-spin"
          ></div>
          <p
            class="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]"
          >
            Syncing with Supabase...
          </p>
        </div>

        <div v-else-if="paginatedOrders.length === 0" class="p-20 text-center">
          <div
            class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-inner"
          >
            <Search :size="32" class="text-slate-200" />
          </div>
          <h3 class="text-[#1B2559] font-black">No orders found</h3>
          <p class="text-slate-400 text-sm mt-1">
            Try adjusting your filters or search terms.
          </p>
        </div>

        <div v-else class="overflow-x-auto no-scrollbar pb-32 -mb-32">
          <table class="table-main">
            <thead>
              <tr>
                <th class="w-8 !pl-8">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    @change="toggleSelectAll"
                    class="rounded-lg border-slate-300 text-[#7029FF] focus:ring-[#7029FF] h-4 w-4"
                  />
                </th>
                <th>Order Identity</th>
                <th>Status</th>
                <th>Project Value</th>
                <th>Payments / Ledger</th>
                <th class="text-right !pr-8">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in paginatedOrders"
                :key="order.id"
                class="table-row-hover group"
                :class="selectedIds.includes(order.id) ? 'bg-indigo-50/30' : ''"
              >
                <td class="!pl-8">
                  <input
                    type="checkbox"
                    :value="order.id"
                    v-model="selectedIds"
                    class="rounded-lg border-slate-300 text-[#702DFF] focus:ring-[#702DFF] h-4 w-4"
                  />
                </td>
                <td
                  class="cursor-pointer"
                  @click="$router.push(`/orders/${order.id}/edit`)"
                >
                  <div class="flex flex-col gap-1.5">
                    <!-- 1. Nama Proyek -->
                    <p
                      class="font-black text-[#1B2559] text-sm tracking-tight group-hover:text-[#702DFF] transition-colors leading-tight"
                    >
                      {{
                        order.project_name ||
                        order.project_type ||
                        "Custom Order"
                      }}
                    </p>
                    <!-- 2. Nama Klien -->
                    <div class="flex items-center gap-2">
                      <p
                        class="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none bg-slate-50/50 w-fit px-2 py-1 rounded"
                      >
                        {{ order.name }}
                      </p>
                      <span
                        v-if="order.source"
                        class="text-[8px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-50/50 px-1.5 py-0.5 rounded border border-indigo-100/30"
                      >
                        {{ order.source }}
                      </span>
                    </div>
                    <!-- 3. ID -->
                    <span
                      class="w-fit text-[9px] font-black text-slate-300 bg-white px-2 py-0.5 rounded shadow-xs border border-slate-100 flex items-center gap-1 group-hover:border-indigo-100 group-hover:text-indigo-400 transition-colors leading-none"
                    >
                      <Hash :size="8" />
                      {{ order.id.substring(0, 8).toUpperCase() }}
                    </span>
                  </div>
                </td>
                <td>
                  <select
                    :value="order.status || 'New'"
                    @change="onStatusSelect(order, $event)"
                    class="select-field !py-2 !px-4 !text-[10px] !font-black !w-36 transition-all shadow-sm rounded-xl border border-slate-100"
                    :class="getStatusClass(order.status)"
                  >
                    <option
                      v-for="opt in statusOptions"
                      :key="opt"
                      :value="opt"
                    >
                      {{ opt.toUpperCase() }}
                    </option>
                  </select>
                </td>
                <td>
                  <div
                    class="font-black text-[#1B2559] text-sm tracking-tighter"
                  >
                    {{ formatPrice(order.total_amount || order.budget || 0) }}
                  </div>
                  <div
                    class="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5"
                  >
                    Project Value
                  </div>
                </td>
                <td>
                  <div class="flex flex-col gap-2.5 py-1 max-w-[200px]">
                    <div class="flex items-baseline justify-between">
                      <span
                        class="text-[10px] font-black text-[#1B2559] tracking-tight"
                        >{{ formatPrice(order.paid_amount || 0) }}</span
                      >
                      <span
                        class="text-[9px] font-black px-1.5 py-0.5 rounded transition-colors"
                        :class="[
                          getPaymentProgress(order) >= 100
                            ? 'bg-emerald-50 text-emerald-600'
                            : getPaymentProgress(order) > 0
                              ? 'bg-amber-50 text-amber-600'
                              : 'bg-indigo-50 text-[#7029FF]',
                        ]"
                        >{{ getPaymentProgress(order) }}%</span
                      >
                    </div>
                    <div
                      class="h-2 bg-slate-100/50 rounded-full overflow-hidden p-0.5 w-36 border border-slate-100"
                    >
                      <div
                        class="h-full rounded-full transition-all duration-1000 shadow-sm"
                        :class="[
                          getPaymentProgress(order) >= 100
                            ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-emerald-500/20'
                            : getPaymentProgress(order) > 0
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-amber-500/20'
                              : 'bg-gradient-to-r from-indigo-400 to-indigo-500 shadow-indigo-500/20',
                        ]"
                        :style="{ width: getPaymentProgress(order) + '%' }"
                      ></div>
                    </div>
                    <button
                      @click="openPaymentModal(order)"
                      class="text-[9px] font-black text-emerald-600 uppercase tracking-widest hover:underline flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <Wallet :size="11" /> NEW PAYMENT
                    </button>
                  </div>
                </td>
                <td class="!pr-8">
                  <div
                    class="flex items-center justify-end gap-1 transition-all"
                  >
                    <div class="relative group">
                      <button
                        @click="$router.push(`/orders/${order.id}/preview`)"
                        class="p-2.5 rounded-xl transition-all mr-1"
                        :class="
                          order.status === 'Deal'
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-amber-600 hover:bg-amber-50'
                        "
                        :title="
                          order.status === 'Deal'
                            ? 'View Invoice'
                            : 'View Proposal'
                        "
                      >
                        <component
                          :is="order.status === 'Deal' ? Receipt : FileText"
                          :size="16"
                        />
                      </button>
                    </div>
                    <button
                      @click="$router.push(`/orders/${order.id}/edit`)"
                      class="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                      title="Edit Configuration"
                    >
                      <Edit2 :size="16" />
                    </button>

                    <button
                      v-if="
                        order.status === 'Deal' &&
                        (!(order as any).projects ||
                          (order as any).projects.length === 0)
                      "
                      @click="convertToProject(order)"
                      class="p-2.5 rounded-xl text-indigo-100 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all active:scale-95"
                      title="Start Project"
                    >
                      <Rocket :size="16" />
                    </button>
                    <button
                      v-else-if="
                        order.status === 'Deal' &&
                        (order as any).projects?.length > 0
                      "
                      class="p-2.5 rounded-xl text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all"
                      title="Project Exists"
                      @click="
                        showToast('Project already active for this order')
                      "
                    >
                      <CheckCircle2 :size="16" />
                    </button>

                    <div class="relative">
                      <button
                        @click.stop="
                          openMenuId = openMenuId === order.id ? null : order.id
                        "
                        class="p-2.5 rounded-xl text-slate-300 hover:text-[#702DFF] hover:bg-indigo-50 transition-all"
                      >
                        <MoreHorizontal :size="16" />
                      </button>

                      <div
                        v-if="openMenuId === order.id"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 z-[100] py-2 animate-fade-in-up"
                        :class="
                          paginatedOrders.indexOf(order) >=
                            paginatedOrders.length - 2 &&
                          paginatedOrders.length > 2
                            ? 'bottom-full mb-2 origin-bottom'
                            : 'top-full mt-2 origin-top'
                        "
                      >
                        <button
                          v-if="order.status === 'Deal'"
                          @click="convertToProject(order)"
                          class="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-[#702DFF] hover:bg-indigo-50 transition-all flex items-center gap-3"
                        >
                          <Target :size="14" /> Create Project
                        </button>
                        <button
                          @click="openWhatsApp(order)"
                          class="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 transition-all flex items-center gap-3"
                        >
                          <MessageCircle :size="14" /> Send to WA
                        </button>
                        <div class="h-px bg-slate-50 my-1"></div>
                        <button
                          @click="confirmDelete(order)"
                          class="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all flex items-center gap-3"
                        >
                          <Trash2 :size="14" /> Remove Record
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DashboardCard>

      <!-- Bulk Action Bar (Float) - Same style as Leads -->
      <Teleport to="body">
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
                    Manage orders bulkly
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button
                  @click="selectedIds = []"
                  class="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  @click="handleBulkDelete"
                  class="px-8 py-3 bg-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2"
                >
                  <Trash2 :size="14" />
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        </transition>
      </Teleport>

      <!-- Mobile Card List -->
      <div class="lg:hidden space-y-5 mb-16 px-1">
        <transition
          v-for="(order, idx) in paginatedOrders"
          :key="order.id"
          name="fade-up"
        >
          <div
            @click="isSelectionMode ? toggleSelection(order.id) : null"
            class="bg-white/90 backdrop-blur-xl rounded-[40px] p-7 shadow-2xl shadow-slate-200/40 border border-slate-50 relative overflow-hidden group active:scale-[0.98] transition-all duration-300"
            :class="[
              selectedIds.includes(order.id)
                ? 'ring-2 ring-[#702DFF] bg-indigo-50/50 scale-[0.97]'
                : '',
              isSelectionMode ? 'cursor-pointer active:scale-95' : '',
            ]"
            :style="{ animationDelay: `${idx * 50}ms` }"
          >
            <!-- Selection Overlay for Mobile -->
            <div v-if="isSelectionMode" class="absolute top-6 right-6 z-10">
              <div
                class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all"
                :class="
                  selectedIds.includes(order.id)
                    ? 'bg-[#702DFF] border-[#702DFF] text-white'
                    : 'bg-white border-slate-200'
                "
              >
                <Check
                  v-if="selectedIds.includes(order.id)"
                  :size="14"
                  stroke-width="4"
                />
              </div>
            </div>
            <div class="flex justify-between items-start mb-6">
              <div class="space-y-2">
                <!-- 1. Nama Proyek -->
                <p
                  class="font-black text-[#1B2559] text-lg leading-tight tracking-tight"
                >
                  {{ order.project_name || order.project_type || "Order" }}
                </p>
                <!-- 2. Nama Klien -->
                <p
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50 w-fit px-2 py-1 rounded-lg"
                >
                  {{ order.name }}
                </p>
                <!-- 3. ID -->
                <div
                  class="w-fit text-[9px] font-black text-slate-300 bg-white px-2 py-1 rounded-lg shadow-xs border border-slate-100 flex items-center gap-1"
                >
                  <Hash :size="8" />
                  {{ order.id.substring(0, 8).toUpperCase() }}
                </div>
              </div>
              <div
                class="px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border border-slate-100 shadow-sm"
                :class="getStatusClass(order.project_status)"
              >
                {{ order.project_status || "New" }}
              </div>
            </div>

            <div class="space-y-4 mb-8">
              <div class="flex items-center justify-between">
                <span
                  class="text-slate-400 font-black uppercase text-[8px] tracking-[0.2em]"
                  >Ledger Balance</span
                >
                <div class="flex items-center gap-2">
                  <span
                    class="text-[11px] font-black text-[#1B2559] tracking-tight"
                    >{{ formatPrice(order.paid_amount || 0) }}
                    <span class="text-slate-200 mx-1">/</span>
                    {{
                      formatPrice(order.total_amount || order.budget || 0)
                    }}</span
                  >
                  <span
                    class="text-[8px] font-black px-1.5 py-0.5 rounded"
                    :class="[
                      getPaymentProgress(order) >= 100
                        ? 'bg-emerald-50 text-emerald-600'
                        : getPaymentProgress(order) > 0
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-indigo-50 text-[#7029FF]',
                    ]"
                    >{{ getPaymentProgress(order) }}%</span
                  >
                </div>
              </div>
              <div
                class="h-2.5 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100"
              >
                <div
                  class="h-full rounded-full transition-all duration-1000 shadow-sm"
                  :class="[
                    getPaymentProgress(order) >= 100
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-emerald-500/10'
                      : getPaymentProgress(order) > 0
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-amber-500/10'
                        : 'bg-gradient-to-r from-indigo-400 to-indigo-500 shadow-indigo-500/10',
                  ]"
                  :style="{ width: getPaymentProgress(order) + '%' }"
                ></div>
              </div>
            </div>

            <div
              class="flex items-center justify-between pt-6 border-t border-slate-50/50"
            >
              <div class="flex flex-col">
                <span
                  class="text-[11px] font-black tracking-tighter"
                  :class="
                    getRemainingDebt(order) > 0
                      ? 'text-rose-500'
                      : 'text-emerald-500'
                  "
                >
                  {{
                    getRemainingDebt(order) > 0
                      ? "Sisa " + formatPrice(getRemainingDebt(order))
                      : "FULL SETTLED"
                  }}
                </span>
                <span
                  class="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-0.5"
                  >{{
                    new Date(order.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  }}</span
                >
              </div>
              <div class="flex gap-2">
                <button
                  @click="$router.push(`/orders/${order.id}/preview`)"
                  class="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center active:scale-90 transition-transform shadow-sm"
                >
                  <FileText :size="18" />
                </button>
                <button
                  @click="$router.push(`/orders/${order.id}/edit`)"
                  class="w-11 h-11 rounded-2xl bg-[#1B2559] text-white flex items-center justify-center active:scale-90 transition-transform shadow-lg shadow-slate-900/10"
                >
                  <Edit2 :size="18" />
                </button>
                <button
                  v-if="order.status === 'Deal'"
                  @click="convertToProject(order)"
                  class="w-11 h-11 rounded-2xl bg-indigo-600 text-indigo-100 flex items-center justify-center active:scale-90 transition-transform shadow-lg shadow-indigo-500/20"
                >
                  <Rocket :size="18" />
                </button>
                <div class="relative">
                  <button
                    @click.stop="
                      openMenuId = openMenuId === order.id ? null : order.id
                    "
                    class="w-11 h-11 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <MoreHorizontal :size="18" />
                  </button>

                  <!-- Mobile Popover -->
                  <div
                    v-if="openMenuId === order.id"
                    class="absolute bottom-full right-0 mb-3 w-48 bg-[#1B2559] text-white rounded-[28px] shadow-2xl py-3 z-50 animate-fade-in-up"
                  >
                    <button
                      @click="openPaymentModal(order)"
                      class="w-full px-6 py-3 text-left text-[9px] font-black uppercase tracking-widest flex items-center gap-3"
                    >
                      <Wallet :size="14" class="text-emerald-400" /> Ledger
                      Payment
                    </button>
                    <button
                      @click="openWhatsApp(order)"
                      class="w-full px-6 py-3 text-left text-[9px] font-black uppercase tracking-widest flex items-center gap-3"
                    >
                      <MessageCircle :size="14" class="text-[#702DFF]" /> Send
                      to WA
                    </button>
                    <div
                      v-if="order.status === 'Deal'"
                      @click="convertToProject(order)"
                      class="w-full px-6 py-3 text-left text-[9px] font-black uppercase tracking-widest flex items-center gap-3"
                    >
                      <Target :size="14" class="text-indigo-400" /> Create
                      Project
                    </div>
                    <div class="h-px bg-white/5 mx-4 my-1"></div>
                    <button
                      @click="confirmDelete(order)"
                      class="w-full px-6 py-3 text-left text-[9px] font-black uppercase tracking-widest text-rose-400 flex items-center gap-3"
                    >
                      <Trash2 :size="14" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Pagination -->
      <div
        v-if="filteredOrders.length > 0"
        class="flex items-center justify-between mb-24 px-4 lg:px-0"
      >
        <div class="hidden lg:block">
          <p
            class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
          >
            Tracking
            <span class="text-[#7029FF] font-black"
              >{{ startIndex + 1 }} -
              {{ Math.min(endIndex, filteredOrders.length) }}</span
            >
            of {{ filteredOrders.length }} Solutions
          </p>
        </div>
        <div class="flex items-center gap-2.5 w-full lg:w-auto">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="flex-1 lg:flex-none h-14 px-8 rounded-[22px] bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#1B2559] hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
          >
            Prev
          </button>
          <div class="hidden lg:flex items-center gap-1.5">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="w-14 h-14 rounded-[22px] text-[10px] font-black transition-all"
              :class="
                currentPage === page
                  ? 'bg-[#7029FF] text-white shadow-xl shadow-indigo-500/20'
                  : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'
              "
            >
              {{ page }}
            </button>
          </div>
          <div class="lg:hidden flex-1 text-center">
            <span
              class="text-[10px] font-black text-[#1B2559] uppercase tracking-[0.2em]"
              >Page {{ currentPage }} / {{ totalPages }}</span
            >
          </div>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="flex-1 lg:flex-none h-14 px-8 rounded-[22px] bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#1B2559] hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <!-- Tab 2: Revenue Intelligence -->
    <div v-else-if="activeTab === 'finance'" class="animate-fade-in-up">
      <!-- Finance Stats Overview -->
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-10 mt-2">
        <BentoStat
          title="Capital Pipeline"
          :value="stats.totalRevenue"
          :icon="TrendingUp"
          variant="blue"
          is-currency
          tooltip="Representasi nilai ekonomi dari seluruh kesepakatan (Deal) yang sedang berjalan."
          simulation="Angka ini adalah 'Target Omzet' yang ingin dicapai jika semua Invoice berhasil ditagih."
        />
        <BentoStat
          title="Liquid Cashflow"
          :value="stats.collected"
          :icon="CheckCircle2"
          variant="success"
          is-currency
          tooltip="Arus kas masuk bersih yang sudah ada di tangan (Liquid)."
          simulation="Dana ini adalah modal yang bisa Kakak gunakan untuk operasional agensi saat ini."
        />
        <BentoStat
          title="Outstanding Ledger"
          :value="stats.debt"
          :icon="CreditCard"
          variant="danger"
          is-currency
          tooltip="Jumlah tagihan yang melampaui termin dan belum diselesaikan klien."
          simulation="Semakin besar angka ini, semakin tinggi risiko Cashflow terganggu. Disarankan segera follow-up."
        />
      </div>

      <!-- Financial Insights Panel -->
      <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div
          class="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 border border-slate-100 shadow-sm relative overflow-hidden group"
        >
          <div
            class="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700"
          >
            <Banknote :size="120" />
          </div>

          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-6">
              <div class="p-3 bg-indigo-50 rounded-2xl text-[#702DFF]">
                <Layout :size="24" />
              </div>
              <div>
                <h3 class="text-xl font-black text-[#1B2559]">
                  Revenue Analytics
                </h3>
                <p
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1"
                >
                  Growth & Sustainability Insights
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div class="space-y-6">
                <div
                  class="flex justify-between items-end border-b border-slate-50 pb-4"
                >
                  <span class="text-[11px] font-black text-slate-400 uppercase"
                    >Settlement Rate</span
                  >
                  <span class="text-lg font-black text-emerald-500"
                    >{{
                      Math.round(
                        (stats.collected / stats.totalRevenue) * 100,
                      ) || 0
                    }}%</span
                  >
                </div>
                <div
                  class="flex justify-between items-end border-b border-slate-50 pb-4"
                >
                  <span class="text-[11px] font-black text-slate-400 uppercase"
                    >Average Ticket Size</span
                  >
                  <span class="text-lg font-black text-[#1B2559]">{{
                    formatPrice(stats.totalRevenue / (orders.length || 1))
                  }}</span>
                </div>
              </div>

              <div
                class="p-8 bg-slate-50/50 rounded-[32px] border border-slate-100"
              >
                <div class="flex items-center gap-2 text-[#702DFF] mb-2">
                  <Zap :size="14" />
                  <span
                    class="text-[9px] font-black uppercase tracking-widest text-[#702DFF]"
                    >Business Tip</span
                  >
                </div>
                <p class="text-[11px] font-bold text-slate-600 leading-relaxed">
                  {{
                    stats.debt > stats.collected
                      ? "Sisa tagihan (Outstanding) lebih besar dari kas masuk. Disarankan untuk follow-up invoice yang mendekati deadline."
                      : "Cashflow terlihat sehat! Anda memiliki rasio pelunasan yang sangat baik untuk kuartal ini."
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PaymentModal
      v-if="payModal.isOpen"
      :is-open="payModal.isOpen"
      :client-name="payModal.clientName"
      :total-amount="payModal.totalAmount"
      :current-paid="payModal.paidAmount"
      :loading="payModal.loading"
      @close="payModal.isOpen = false"
      @confirm="executePaymentUpdate"
    />

    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      :variant="confirmModal.variant"
      @close="confirmModal.isOpen = false"
      @confirm="handleConfirmExecute"
    />

    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />

    <WhatsAppModal
      v-if="waModal.isOpen"
      :is-open="waModal.isOpen"
      :text="waModal.text"
      :client-name="waModal.clientName"
      :client-phone="waModal.clientPhone"
      @close="waModal.isOpen = false"
    />

    <!-- Mobile Filter BottomSheet -->
    <BottomSheet :is-open="isFilterOpen" @close="isFilterOpen = false">
      <div class="p-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-2xl font-black text-[#1B2559]">Order Filters</h3>
            <p
              class="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1"
            >
              Refine your active projects
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
                v-for="st in ['all', ...statusOptions]"
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
              >Payment & Debt</label
            >
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="p in [
                  { id: 'all', l: 'All' },
                  { id: 'paid', l: 'Lunas' },
                  { id: 'unpaid', l: 'Piutang' },
                ]"
                :key="p.id"
                @click="
                  paymentFilter = p.id;
                  currentPage = 1;
                "
                class="py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2"
                :class="
                  paymentFilter === p.id
                    ? 'bg-[#702DFF] text-white border-[#702DFF] shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-50 text-slate-400 border-transparent'
                "
              >
                {{ p.l }}
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, reactive } from "vue";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  RotateCw,
  Wallet,
  CheckCircle2,
  Clock,
  CreditCard,
  Layout,
  Target,
  MessageCircle,
  X,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  FileText,
  MoreHorizontal,
  Banknote,
  TrendingUp,
  CheckSquare,
  Check,
  Zap,
  Hash,
  Eye,
  Receipt,
  Rocket,
} from "lucide-vue-next";
import { clientsService } from "../services/clientsService";
import { projectsService } from "../services/projectsService";
import { transactionsService } from "../services/transactionsService";
import { useErrorHandler } from "../composables/useErrorHandler";
import { useLoading } from "../composables/useLoading";
import type { Client } from "../types";
import DashboardCard from "../components/ui/DashboardCard.vue";
import PageHeader from "../components/ui/PageHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import BentoStat from "../components/ui/BentoStat.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";
import PaymentModal from "../components/ui/PaymentModal.vue";
import Toast from "../components/ui/Toast.vue";
import WhatsAppModal from "../components/ui/WhatsAppModal.vue";
import { BottomSheet } from "@kangjessy/ui";

const orders = ref<Client[]>([]);
const selectedIds = ref<string[]>([]);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

// Composables
const { handleError } = useErrorHandler();
const { isLoading, withLoading } = useLoading("orders");

// Filters
const searchQuery = ref("");
const statusFilter = ref("all");
const paymentFilter = ref("all");
const sortBy = ref("newest");
const isFilterOpen = ref(false);
const openMenuId = ref<string | null>(null);
const activeTab = ref<"board" | "finance">("board");
const isSelectionMode = ref(false);

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

const statusOptions = ["New", "Pending", "Follow Up", "Deal", "Cancel"];

const confirmModal = ref({
  isOpen: false,
  title: "",
  message: "",
  targetIds: [] as string[],
  variant: "danger" as "danger" | "info",
  onConfirm: null as any,
});
const payModal = reactive({
  isOpen: false,
  leadId: "",
  clientName: "",
  totalAmount: 0,
  paidAmount: 0,
  loading: false,
});
const waModal = reactive({
  isOpen: false,
  text: "",
  clientName: "",
  clientPhone: "",
});
const projectToCreate = ref<Client | null>(null);

function toggleSelection(id: string) {
  const index = selectedIds.value.indexOf(id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    selectedIds.value.push(id);
  }
}

onMounted(() => {
  fetchOrders();
  window.addEventListener("click", () => (openMenuId.value = null));
});

onUnmounted(() => {
  window.removeEventListener("click", () => (openMenuId.value = null));
});

async function fetchOrders() {
  await withLoading(async () => {
    try {
      orders.value = await clientsService.getOrders();
    } catch (err) {
      handleError(err, "Sync Orders");
    }
  });
}

const safeNumber = (val: any) => {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    if (/\d+\.\d{3}/.test(val)) {
      return parseFloat(val.replace(/\./g, "").replace(/[^0-9.-]/g, "")) || 0;
    }
    const cleaned = val.replace(/[^0-9.-]/g, "");
    return parseFloat(cleaned) || 0;
  }
  return Number(val) || 0;
};

const stats = computed(() => ({
  totalRevenue: orders.value.reduce(
    (sum, o) => sum + safeNumber(o.total_amount || o.budget || 0),
    0,
  ),
  collected: orders.value.reduce(
    (sum, o) => sum + safeNumber(o.paid_amount || 0),
    0,
  ),
  debt: orders.value.reduce(
    (sum, o) =>
      sum +
      (safeNumber(o.total_amount || o.budget || 0) -
        safeNumber(o.paid_amount || 0)),
    0,
  ),
  active: orders.value.filter((o) => o.project_status !== "Done").length,
}));

const filteredOrders = computed(() => {
  let res = [...orders.value];
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    res = res.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        (o.project_name || "").toLowerCase().includes(q),
    );
  }
  if (statusFilter.value !== "all")
    res = res.filter((o) => o.status === statusFilter.value);
  if (paymentFilter.value === "paid")
    res = res.filter((o) => getRemainingDebt(o) <= 0);
  else if (paymentFilter.value === "unpaid")
    res = res.filter((o) => getRemainingDebt(o) > 0);

  if (sortBy.value === "newest")
    res.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  else if (sortBy.value === "budget-high")
    res.sort(
      (a, b) =>
        safeNumber(b.total_amount || b.budget || 0) -
        safeNumber(a.total_amount || a.budget || 0),
    );
  else if (sortBy.value === "debt-high")
    res.sort((a, b) => getRemainingDebt(b) - getRemainingDebt(a));
  return res;
});

const totalPages = computed(() =>
  Math.ceil(filteredOrders.value.length / itemsPerPage.value),
);
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => startIndex.value + itemsPerPage.value);
const paginatedOrders = computed(() =>
  filteredOrders.value.slice(startIndex.value, endIndex.value),
);
const isAllSelected = computed(
  () =>
    paginatedOrders.value.length > 0 &&
    paginatedOrders.value.every((o) => selectedIds.value.includes(o.id)),
);

watch(
  [searchQuery, statusFilter, paymentFilter, itemsPerPage],
  () => (currentPage.value = 1),
);

function showToast(m: string, v: "success" | "error" = "success") {
  toast.value = { show: true, message: m, variant: v };
}
const formatPrice = (p: any) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(safeNumber(p));
const getRemainingDebt = (o: Client) =>
  safeNumber(o.total_amount || o.budget || 0) - safeNumber(o.paid_amount || 0);
const getPaymentProgress = (o: Client) => {
  const t = safeNumber(o.total_amount || o.budget || 0);
  return t
    ? Math.min(Math.round((safeNumber(o.paid_amount || 0) / t) * 100), 100)
    : 0;
};

const getStatusClass = (status: string | undefined) => {
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
};

function onStatusSelect(order: Client, event: any) {
  const val = event.target?.value;
  if (val) handleStatusChange(order, val);
}

async function handleStatusChange(order: Client, newStatus: string) {
  const old = order.status;
  order.status = newStatus;
  try {
    await clientsService.update(order.id, { status: newStatus });
    showToast("Status updated");
  } catch (err) {
    order.status = old;
    showToast("Failed to update", "error");
  }
}

function openPaymentModal(order: Client) {
  payModal.leadId = order.id;
  payModal.clientName = order.name;
  payModal.totalAmount = safeNumber(order.total_amount || order.budget || 0);
  payModal.paidAmount = safeNumber(order.paid_amount || 0);
  payModal.isOpen = true;
}

async function executePaymentUpdate(payload: {
  amount: number;
  notes: string;
}) {
  payModal.loading = true;
  const order = orders.value.find((o) => o.id === payModal.leadId);
  if (!order) return;

  const newTotalPaid = (order.paid_amount || 0) + payload.amount;
  try {
    // 1. Update Client Paid Amount
    await clientsService.update(order.id, { paid_amount: newTotalPaid });

    // 2. Log Transaction
    await transactionsService.create({
      client_id: order.id,
      amount: payload.amount,
      type: "income",
      category: "services",
      title: `Payment for ${order.project_name || "Project"}`,
      description: payload.notes,
      date: new Date().toISOString(),
    });

    order.paid_amount = newTotalPaid;
    showToast(`Payment of ${formatPrice(payload.amount)} recorded!`);
    payModal.isOpen = false;
  } catch (err) {
    showToast("Failed to record payment", "error");
  } finally {
    payModal.loading = false;
  }
}

async function convertToProject(order: Client) {
  confirmModal.value = {
    isOpen: true,
    title: "Create Development Project",
    message: `Initiate project roadmap for "${order.name}"? This will move it to the production pipeline.`,
    variant: "info",
    targetIds: [order.id],
    onConfirm: () => executeConvertToProject(order),
  };
}

async function executeConvertToProject(order: Client) {
  if (!order) return;
  confirmModal.value.isOpen = false;

  try {
    await projectsService.create({
      client_id: order.id,
      name: order.project_name || order.name,
      status: "planning",
      progress: 0,
      price: safeNumber(order.total_amount || order.budget || 0),
      deadline: order.deadline,
      brief: order.brief,
      visual_style: order.visual_style,
      paid_amount: safeNumber(order.paid_amount || 0),
      payment_status: order.payment_status,
      description: order.notes,
    });
    showToast("Production board initiated!");
    fetchOrders();
  } catch (err: any) {
    console.error("Failed to create project:", err);
    showToast(`Failed: ${err.message || "Unknown error"}`, "error");
  } finally {
    projectToCreate.value = null;
  }
}

function handleConfirmExecute() {
  if (confirmModal.value.onConfirm) {
    confirmModal.value.onConfirm();
  } else {
    executeDelete();
  }
}

function confirmDelete(order: Client) {
  confirmModal.value = {
    isOpen: true,
    title: "Delete Order",
    message: `Remove "${order.name}"?`,
    targetIds: [order.id],
    variant: "danger",
    onConfirm: executeDelete,
  };
}
function handleBulkDelete() {
  confirmModal.value = {
    isOpen: true,
    title: "Delete Selected",
    message: `Remove ${selectedIds.value.length} records?`,
    targetIds: [...selectedIds.value],
    variant: "danger",
    onConfirm: executeDelete,
  };
}
async function executeDelete() {
  const ids = confirmModal.value.targetIds;
  confirmModal.value.isOpen = false;
  await withLoading(async () => {
    try {
      await Promise.all(ids.map((id) => clientsService.delete(id)));
      orders.value = orders.value.filter((o) => !ids.includes(o.id));
      selectedIds.value = [];
      showToast("Records removed");
    } catch (err) {
      handleError(err, "Bulk Delete");
      fetchOrders();
    }
  });
}

function openWhatsApp(order: Client) {
  const phone = order.phone?.replace(/[^0-9]/g, "");
  if (!phone) return showToast("WA Missing", "error");
  const total = safeNumber(order.total_amount || order.budget || 0),
    paid = safeNumber(order.paid_amount || 0),
    debt = total - paid;
  waModal.clientName = order.name;
  waModal.clientPhone = phone;

  const docLink = `https://kangjessy.pro/orders/${order.id.slice(0, 8)}/preview`;

  waModal.text = `*PROJECT STATEMENT & INVOICE*
---------------------------------------
Halo Kak ${order.name}! 👋

Semoga rincian ini menemui Kakak dalam keadaan baik. Bersama pesan ini, saya lampirkan update dokumen resmi (Proposal/Kontrak/Invoice) untuk proyek:

💎 *${order.project_name || "Exclusive Digital Project"}*

Berikut rincian Ledger per hari ini:
• *Total Investment:* ${formatPrice(total)}
• *Status:* ${debt <= 0 ? "✅ *FULL SETTLED*" : "🕒 *AWAITING PAYMENT*"}

🔗 *Dokumen Digital:*
${docLink}

${"*(Link di atas adalah portal digital agensi, Kakak juga bisa menyimpannya sebagai PDF)*"}

Jika ada rincian yang perlu didiskusikan kembali, jangan ragu untuk menghubungi saya ya Kak. 😊

Best regards,
*KangJessy Agency*`;
  waModal.isOpen = true;
}

function toggleSelectAll() {
  if (isAllSelected.value)
    selectedIds.value = selectedIds.value.filter(
      (id) => !paginatedOrders.value.find((p) => p.id === id),
    );
  else
    paginatedOrders.value.forEach((p) => {
      if (!selectedIds.value.includes(p.id)) selectedIds.value.push(p.id);
    });
}
</script>
