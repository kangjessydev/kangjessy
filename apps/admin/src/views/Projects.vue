<template>
  <div class="page-container">
    <PageHeader
      title="Lajur Produksi"
      subtitle="Pantau perkembangan proyek, tenggat waktu, dan pengiriman klien"
    >
      <div class="flex gap-3">
        <BaseButton
          variant="secondary"
          @click="fetchProjects"
          :loading="loading"
        >
          <RotateCw :size="18" />
          Selaraskan Data
        </BaseButton>
        <BaseButton variant="primary" @click="router.push('/projects/new')">
          <Plus :size="18" />
          Tambah Proyek Baru
        </BaseButton>
      </div>
    </PageHeader>

    <!-- Project Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <BentoStat
        title="Dalam Antrean"
        :value="stats.review"
        :icon="FolderOpen"
        variant="blue"
        tooltip="Daftar proyek yang baru masuk atau masih dalam tahap persiapan (Planning)."
        simulation="Setelah persiapan matang, pindahkan status ke 'Sedang Dikerjakan' agar tim mulai eksekusi."
      />
      <BentoStat
        title="Sedang Dikerjakan"
        :value="stats.active"
        :icon="Zap"
        variant="primary"
        tooltip="Beban kerja aktif yang sedang dikerjakan hari ini oleh tim agensi."
        simulation="Simulasi: Jika load di sini > 5, agensi mungkin mulai sibuk. Pertimbangkan menaikkan estimasi deadline untuk klien baru."
      />
      <BentoStat
        title="Mendekati Tenggat"
        :value="stats.nearDeadline"
        :icon="Clock"
        variant="danger"
        tooltip="Proyek dengan deadline < 3 hari lagi. Membutuhkan perhatian ekstra (High Priority)."
        simulation="Prioritaskan proyek di sini untuk menjaga reputasi pengerjaan tepat waktu agensi."
      />
      <BentoStat
        title="Selesai"
        :value="stats.completed"
        :icon="CheckCircle"
        variant="success"
        tooltip="Total project yang sudah diselesaikan dan dikirim ke klien (Final Handover)."
        simulation="Makin besar angka ini, makin banyak portofolio sukses yang bisa Kakak pamerkan di website."
      />
    </div>

    <!-- Filters & Search -->
    <AdminCard
      no-padding
      class="mb-6 rounded-[32px]! border-none shadow-sm overflow-hidden"
    >
      <div
        class="flex flex-col lg:flex-row gap-4 justify-between items-center p-3 sm:p-4"
      >
        <div class="flex-1 w-full lg:max-w-md relative group px-1 lg:px-0">
          <BaseInput
            v-model="searchQuery"
            placeholder="Cari proyek..."
            :icon="Search"
            class="w-full"
            @input="currentPage = 1"
          />
        </div>

        <!-- Actions Group -->
        <div
          class="flex items-center gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 lg:pb-0"
        >
          <div
            class="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 shadow-inner shrink-0"
          >
            <button
              @click="viewMode = 'table'"
              class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
              :class="
                viewMode === 'table'
                  ? 'bg-white text-[#702DFF] shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              "
            >
              <Layout :size="12" />
              Table
            </button>
            <button
              @click="viewMode = 'kanban'"
              class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
              :class="
                viewMode === 'kanban'
                  ? 'bg-white text-[#702DFF] shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              "
            >
              <Columns :size="12" />
              Kanban
            </button>
          </div>

          <div class="h-6 w-px bg-slate-200 hidden lg:block mx-1"></div>

          <AdminSelect
            v-model="statusFilter"
            class="w-40 lg:w-44"
            @change="currentPage = 1"
          >
            <option value="all">SEMUA STATUS</option>
            <option value="planning">PERENCANAAN</option>
            <option value="in_progress">SEDANG DIKERJAKAN</option>
            <option value="done">SELESAI</option>
            <option value="waiting">MENUNGGU (BELUM LUNAS)</option>
            <option value="pending">PENDING</option>
            <option value="hold">HOLD</option>
          </AdminSelect>
        </div>
      </div>
    </AdminCard>

    <!-- Projects Content -->
    <AdminCard
      no-padding
      class="overflow-hidden border border-slate-100/50 shadow-xl shadow-slate-200/20 rounded-[32px]!"
    >
      <!-- Loading State -->
      <div v-if="loading" class="p-6">
        <SkeletonTable :rows="5" :cols="5" />
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProjects.length === 0" class="p-20 text-center">
        <div
          class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <FolderOpen :size="32" class="text-slate-200" />
        </div>
        <h3 class="text-[#1B2559] font-bold">Proyek tidak ditemukan</h3>
        <p class="text-slate-400 text-sm mt-1">
          Coba segarkan atau sesuaikan filter pencarian Anda.
        </p>
      </div>

      <!-- Data Display -->
      <div v-else>
        <!-- Desktop: Table Mode -->
        <div
          v-if="viewMode === 'table'"
          class="hidden lg:block overflow-x-auto"
        >
          <table class="table-main">
            <thead>
              <tr>
                <th class="pl-8!">Proyek & Klien</th>
                <th>Kemajuan</th>
                <th>Tahapan</th>
                <th>Tenggat Waktu</th>
                <th class="text-right pr-8!">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="project in paginatedProjects"
                :key="project.id"
                class="table-row-hover group"
              >
                <td class="pl-8! py-5">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-11 h-11 rounded-2xl bg-[#702DFF]/5 text-[#702DFF] flex items-center justify-center font-black text-xs border border-[#702DFF]/10 shadow-sm transition-all group-hover:bg-[#702DFF] group-hover:text-white"
                    >
                      {{ project.name.charAt(0) }}
                    </div>
                    <div>
                      <h4
                        class="font-black text-[#1B2559] leading-tight text-sm tracking-tight mb-1"
                      >
                        {{ project.name }}
                      </h4>
                      <div class="flex items-center gap-2">
                        <span
                          class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
                          >{{ (project as any).year || "2024" }}</span
                        >
                        <span class="text-slate-200 text-[10px]">•</span>
                        <span
                          class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
                        >
                          {{ project.client?.name || "N/A" }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="w-[200px]">
                  <div class="flex flex-col gap-1.5 pr-6">
                    <div
                      class="flex justify-between items-center text-[9px] font-black uppercase tracking-widest mb-0.5"
                    >
                      <span class="text-slate-300">Penyelesaian</span>
                      <span
                        :class="
                          project.progress === 100
                            ? 'text-emerald-500'
                            : 'text-[#702DFF]'
                        "
                      >
                        {{ project.progress || 0 }}%
                      </span>
                    </div>
                    <div
                      class="h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5 shadow-inner"
                    >
                      <div
                        class="h-full bg-gradient-to-r from-indigo-500 to-[#702DFF] transition-all duration-700 rounded-full"
                        :style="{ width: (project.progress || 0) + '%' }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    class="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm transition-all"
                    :class="getStatusClass(project.status)"
                  >
                    {{
                      (project.status || "new").replace("_", " ").toUpperCase()
                    }}
                  </span>
                </td>
                <td>
                  <div class="flex flex-col">
                    <div
                      class="flex items-center gap-1.5 text-[10px] font-black text-[#1B2559] tracking-tight"
                    >
                      <Clock :size="12" class="text-slate-300" />
                      {{
                        project.deadline
                          ? formatDate(project.deadline)
                          : "UNSET"
                      }}
                    </div>
                    <span
                      v-if="project.deadline"
                      class="text-[8px] font-black uppercase tracking-[0.15em] mt-1"
                      :class="
                        isNearDeadline(project.deadline)
                          ? 'text-rose-500'
                          : 'text-slate-400'
                      "
                    >
                      {{ getDaysRemaining(project.deadline) }}
                    </span>
                  </div>
                </td>
                <td class="!pr-8 text-right">
                  <div
                    class="flex items-center justify-end gap-1 transition-all"
                  >
                    <button
                      @click="openWhatsAppModal(project)"
                      class="p-2.5 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-all active:scale-90"
                      title="Update via WA"
                    >
                      <MessageCircle :size="16" />
                    </button>
                    <button
                      @click="router.push('/projects/' + project.id + '/edit')"
                      class="p-2.5 rounded-xl text-[#7029FF] hover:bg-indigo-50 transition-all active:scale-95"
                      title="Edit Project"
                    >
                      <Edit2 :size="16" />
                    </button>

                    <!-- More Actions -->
                    <div class="relative">
                      <button
                        @click.stop="
                          openMenuId =
                            openMenuId === project.id ? null : project.id
                        "
                        class="p-2.5 rounded-xl text-slate-300 hover:text-[#702DFF] hover:bg-slate-50 transition-all"
                      >
                        <MoreHorizontal :size="16" />
                      </button>

                      <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                      >
                        <div
                          v-if="openMenuId === project.id"
                          class="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 z-[100] py-2"
                        >
                          <button
                            v-if="project.client_portal_token"
                            @click="openPortal(project)"
                            class="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-[#702DFF] hover:bg-indigo-50 transition-all flex items-center gap-3"
                          >
                            <ExternalLink :size="14" /> View Portal
                          </button>
                          <div class="h-px bg-slate-50 my-1"></div>
                          <button
                            @click="triggerDelete(project)"
                            class="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all flex items-center gap-3"
                          >
                            <Trash2 :size="14" /> Remove Project
                          </button>
                        </div>
                      </transition>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Desktop: Kanban Mode -->
        <div
          v-else-if="viewMode === 'kanban'"
          class="hidden lg:block p-8 overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div class="flex gap-6 min-w-max pb-4">
            <div
              v-for="status in kanbanColumns"
              :key="status"
              class="w-80 flex-shrink-0"
            >
              <div class="flex items-center justify-between mb-5 px-3">
                <h4
                  class="text-[11px] font-black text-[#1B2559] uppercase tracking-[0.2em] flex items-center gap-2"
                >
                  <div
                    class="w-1.5 h-4 rounded-full shadow-sm"
                    :class="getStatusAccent(status)"
                  ></div>
                  {{ status.replace("_", " ").toUpperCase() }}
                  <span class="text-slate-300 ml-1 font-bold"
                    >({{ getProjectsByStatus(status).length }})</span
                  >
                </h4>
              </div>

              <div
                class="space-y-4 min-h-[600px] bg-slate-50/40 rounded-[40px] p-3 border border-dashed border-slate-200/60"
              >
                <div
                  v-for="p in getProjectsByStatus(status)"
                  :key="p.id"
                  @click="router.push('/projects/' + p.id + '/edit')"
                  class="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all cursor-pointer group"
                >
                  <div class="flex justify-between items-start mb-4">
                    <h5
                      class="text-[13px] font-black text-[#1B2559] group-hover:text-[#702DFF] transition-colors leading-snug"
                    >
                      {{ p.name }}
                    </h5>
                    <div class="flex items-center gap-1 transition-all">
                      <button
                        v-if="status !== 'planning'"
                        @click.stop="moveStatus(p, 'prev')"
                        class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#702DFF]"
                      >
                        <ChevronLeft :size="14" />
                      </button>
                      <button
                        v-if="status !== 'done'"
                        @click.stop="moveStatus(p, 'next')"
                        class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#702DFF]"
                      >
                        <ChevronRight :size="14" />
                      </button>
                    </div>
                  </div>

                  <div class="space-y-3 mb-6">
                    <div
                      class="flex justify-between items-center text-[9px] font-black uppercase text-slate-300 tracking-widest"
                    >
                      <span>Progress</span>
                      <span class="text-[#702DFF]">{{ p.progress || 0 }}%</span>
                    </div>
                    <div class="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-gradient-to-r from-indigo-400 to-[#702DFF] transition-all duration-1000"
                        :style="{ width: (p.progress || 0) + '%' }"
                      ></div>
                    </div>
                  </div>

                  <div
                    class="flex items-center justify-between pt-5 border-t border-slate-50"
                  >
                    <div class="flex items-center gap-2">
                      <div
                        class="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-[10px] font-black text-[#702DFF]"
                      >
                        {{ p.client?.name?.charAt(0) || "C" }}
                      </div>
                      <span
                        class="text-[10px] font-bold text-slate-400 truncate max-w-[100px]"
                        >{{ p.client?.name || "Client" }}</span
                      >
                    </div>
                    <span
                      class="text-[10px] font-black tracking-tight"
                      :class="
                        isNearDeadline(p.deadline)
                          ? 'text-rose-500'
                          : 'text-slate-400'
                      "
                    >
                      {{ p.deadline ? formatDate(p.deadline) : "-" }}
                    </span>
                  </div>
                </div>

                <div
                  v-if="getProjectsByStatus(status).length === 0"
                  class="h-32 flex items-center justify-center"
                >
                  <p
                    class="text-[9px] font-black text-slate-300 uppercase tracking-widest italic"
                  >
                    Stage Empty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile: Card List -->
        <div class="lg:hidden divide-y divide-slate-50">
          <div
            v-for="project in paginatedProjects"
            :key="project.id"
            class="p-5 active:bg-slate-50 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-indigo-50 text-[#702DFF] border border-indigo-100 flex items-center justify-center font-black text-xs"
                >
                  {{ project.name.charAt(0) }}
                </div>
                <div>
                  <h4 class="text-sm font-black text-[#1B2559] tracking-tight">
                    {{ project.name }}
                  </h4>
                  <p
                    class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    {{ project.client?.name || "Client" }}
                  </p>
                </div>
              </div>
              <span
                class="px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border"
                :class="getStatusClass(project.status)"
              >
                {{ (project.status || "new").toUpperCase() }}
              </span>
            </div>

            <div class="space-y-3 mb-5">
              <div
                class="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-300"
              >
                <span>Production Track</span>
                <span class="text-[#702DFF]">{{ project.progress || 0 }}%</span>
              </div>
              <div
                class="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5"
              >
                <div
                  class="h-full bg-gradient-to-r from-indigo-500 to-[#702DFF] rounded-full transition-all duration-700"
                  :style="{ width: (project.progress || 0) + '%' }"
                ></div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex flex-col">
                  <span
                    class="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5"
                    >Deadline</span
                  >
                  <span
                    class="text-[10px] font-black tracking-tight"
                    :class="
                      isNearDeadline(project.deadline)
                        ? 'text-rose-500'
                        : 'text-[#1B2559]'
                    "
                  >
                    {{
                      project.deadline
                        ? formatDate(project.deadline)
                        : "Not Set"
                    }}
                  </span>
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="openWhatsAppModal(project)"
                  class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center active:scale-90 transition-all"
                >
                  <MessageCircle :size="16" />
                </button>
                <button
                  @click="router.push('/projects/' + project.id + '/edit')"
                  class="w-10 h-10 rounded-xl bg-[#1B2559] text-white flex items-center justify-center active:scale-90 transition-all shadow-lg shadow-slate-900/10"
                >
                  <Edit2 :size="16" />
                </button>

                <!-- More Button for Mobile -->
                <div class="relative">
                  <button
                    @click.stop="
                      openMenuId = openMenuId === project.id ? null : project.id
                    "
                    class="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center active:scale-90 transition-all"
                  >
                    <MoreHorizontal :size="16" />
                  </button>

                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <div
                      v-if="openMenuId === project.id"
                      class="absolute right-0 bottom-full mb-3 w-48 bg-white rounded-2xl shadow-2xl border border-slate-50 z-[100] py-2"
                    >
                      <button
                        @click="triggerDelete(project)"
                        class="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all flex items-center gap-3"
                      >
                        <Trash2 :size="14" /> Remove Project
                      </button>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Footer -->
        <div
          v-if="filteredProjects.length > itemsPerPage"
          class="px-8 py-5 flex items-center justify-between bg-slate-50/30 border-t border-slate-100"
        >
          <p
            class="hidden sm:block text-[10px] font-black text-slate-400 uppercase tracking-widest"
          >
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} -
            {{ Math.min(currentPage * itemsPerPage, filteredProjects.length) }}
            of {{ filteredProjects.length }}
          </p>
          <div
            class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end"
          >
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white border border-slate-100 text-slate-400 disabled:opacity-30 hover:text-[#702DFF] transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
            >
              <ChevronLeft :size="14" />
              Prev
            </button>

            <div class="hidden sm:flex items-center gap-1">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                class="w-10 h-10 rounded-xl text-[11px] font-black transition-all"
                :class="
                  currentPage === page
                    ? 'bg-[#7029FF] text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'
                "
              >
                {{ page }}
              </button>
            </div>

            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white border border-slate-100 text-slate-400 disabled:opacity-30 hover:text-[#702DFF] transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
            >
              Next
              <ChevronRight :size="14" />
            </button>
          </div>
        </div>
      </div>
    </AdminCard>

    <!-- Parking Lot: Pending & Hold -->
    <div
      v-if="pendingAndHoldProjects.length > 0"
      class="mt-12 mb-20 animate-fade-in"
    >
      <div class="flex items-center gap-3 mb-6 px-2">
        <div
          class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-sm"
        >
          <Clock :size="20" />
        </div>
        <div>
          <h3 class="text-xl font-black text-[#1B2559] tracking-tight">
            Parking Lot
          </h3>
          <p
            class="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1"
          >
            Projects on standby or temporary hold
          </p>
        </div>
      </div>

      <AdminCard
        no-padding
        class="overflow-hidden border border-slate-100/50 shadow-xl shadow-slate-200/10 rounded-[32px]"
      >
        <div class="overflow-x-auto">
          <table class="table-main">
            <thead>
              <tr>
                <th class="!pl-8">Project Details</th>
                <th>Issues / Notes</th>
                <th>Status</th>
                <th class="text-right !pr-8">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="p in pendingAndHoldProjects"
                :key="p.id"
                class="table-row-hover group"
              >
                <td class="!pl-8 py-5">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0"
                      :class="
                        p.status === 'hold'
                          ? 'bg-rose-50 text-rose-600 border border-rose-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      "
                    >
                      {{ p.name.charAt(0) }}
                    </div>
                    <div>
                      <h5
                        class="text-sm font-black text-[#1B2559] group-hover:text-[#702DFF] transition-colors tracking-tight"
                      >
                        {{ p.name }}
                      </h5>
                      <p
                        class="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5"
                      >
                        {{ p.client?.name || "Client" }}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <p
                    class="text-[11px] text-slate-400 font-medium line-clamp-1 italic max-w-xs"
                  >
                    "Waiting for client feedback or assets..."
                  </p>
                </td>
                <td>
                  <span
                    class="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border"
                    :class="getStatusClass(p.status)"
                  >
                    {{ p.status }}
                  </span>
                </td>
                <td class="!pr-8 text-right">
                  <button
                    @click="router.push('/projects/' + p.id + '/edit')"
                    class="p-2.5 rounded-xl text-[#1B2559] hover:bg-slate-50 transition-all"
                  >
                    <Edit2 :size="16" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>

    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      @close="confirmModal.isOpen = false"
      @confirm="executeDelete"
    />

    <WhatsAppModal
      :is-open="waModal.isOpen"
      :text="waModal.text"
      :client-name="waModal.clientName"
      :client-phone="waModal.clientPhone"
      @close="waModal.isOpen = false"
    />

    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  Plus,
  Search,
  Edit2,
  Zap,
  Clock,
  CheckCircle,
  FolderOpen,
  MessageCircle,
  Columns,
  Layout,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Trash2,
  ExternalLink,
} from "lucide-vue-next";
import { projectsService } from "../services/projectsService";
import type { Project } from "../types";
import AdminCard from "../components/ui/AdminCard.vue";
import PageHeader from "../components/ui/PageHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import AdminSelect from "../components/ui/AdminSelect.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import BentoStat from "../components/ui/BentoStat.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";
import WhatsAppModal from "../components/ui/WhatsAppModal.vue";
import Toast from "../components/ui/Toast.vue";
import SkeletonTable from "../components/ui/SkeletonTable.vue";

const router = useRouter();
const projects = ref<Project[]>([]);
const loading = ref(true);
const searchQuery = ref("");
const statusFilter = ref("all");
const viewMode = ref<"table" | "kanban">("table");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});
const confirmModal = ref({
  isOpen: false,
  title: "",
  message: "",
  targetId: null as string | null,
});

const waModal = reactive({
  isOpen: false,
  text: "",
  clientName: "",
  clientPhone: "",
});

const openMenuId = ref<string | null>(null);

async function fetchProjects() {
  loading.value = true;
  try {
    const data = await projectsService.getAll();
    projects.value = data || [];
  } catch (err) {
    console.error("Fetch error:", err);
    showToast("Failed to load projects", "error");
  } finally {
    loading.value = false;
  }
}

const closeMenuOnClick = () => {
  openMenuId.value = null;
};

onMounted(() => {
  fetchProjects();
  window.addEventListener("click", closeMenuOnClick);
});

onUnmounted(() => {
  window.removeEventListener("click", closeMenuOnClick);
});

function triggerDelete(project: any) {
  confirmModal.value = {
    isOpen: true,
    title: "Remove Project Profile",
    message: `Are you sure you want to stop tracking "${project.name}"? All associated data will be removed from the ledger.`,
    targetId: project.id,
  };
}

const stats = computed(() => {
  const all = projects.value || [];
  return {
    active: all.filter((p) => p.status === "in_progress").length,
    review: all.filter((p) => p.status === "planning").length,
    nearDeadline: all.filter((p) => p.deadline && isNearDeadline(p.deadline))
      .length,
    completed: all.filter((p) => p.status === "done").length,
  };
});

const pendingAndHoldProjects = computed(() => {
  return projects.value.filter(
    (p) => p.status === "pending" || p.status === "hold",
  );
});

const filteredProjects = computed(() => {
  let result = [...(projects.value || [])];

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(
      (p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.client?.name || "").toLowerCase().includes(q),
    );
  }

  if (statusFilter.value !== "all") {
    result = result.filter((p) => p.status === statusFilter.value);
  }

  return result;
});

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProjects.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage.value);
});

const moveStatus = async (project: any, direction: "next" | "prev") => {
  const statusFlow = ["planning", "in_progress", "done"];
  const currentIndex = statusFlow.indexOf(project.status || "planning");
  let nextIndex = currentIndex;

  if (direction === "next" && currentIndex < statusFlow.length - 1) nextIndex++;
  if (direction === "prev" && currentIndex > 0) nextIndex--;

  if (nextIndex !== currentIndex) {
    const newStatus = statusFlow[nextIndex] as Project["status"];
    try {
      await projectsService.update(project.id, { status: newStatus });
      project.status = newStatus;
      showToast(`Moved to ${newStatus?.replace("_", " ").toUpperCase()}`);
    } catch (err) {
      showToast("Failed to move project stage", "error");
    }
  }
};

const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const formatDate = (date: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-ID", {
    month: "short",
    day: "numeric",
  });
};

const isNearDeadline = (deadline: string | undefined) => {
  if (!deadline) return false;
  const diff = new Date(deadline).getTime() - new Date().getTime();
  return diff > 0 && diff < 1000 * 60 * 60 * 24 * 3; // 3 days
};

const getDaysRemaining = (deadline: string) => {
  if (!deadline) return "";
  const diff = new Date(deadline).getTime() - new Date().getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return "Overdue";
  if (days === 0) return "Due Today";
  return days + "d left";
};

const getStatusClass = (status: string | undefined) => {
  const s = status || "planning";
  if (s === "done") return "bg-emerald-50 text-emerald-600 border-emerald-100";
  if (s === "in_progress")
    return "bg-[#7029FF]/5 text-[#7029FF] border-[#7029FF]/10";
  if (s === "planning") return "bg-blue-50 text-blue-600 border-blue-100";
  if (s === "pending") return "bg-amber-50 text-amber-600 border-amber-100";
  if (s === "hold") return "bg-rose-50 text-rose-600 border-rose-100";
  return "bg-slate-50 text-slate-600 border-slate-100";
};

const kanbanColumns = ["planning", "in_progress", "done", "waiting"];

const getProjectsByStatus = (status: string) => {
  return filteredProjects.value.filter((p) => p.status === status);
};

const getStatusAccent = (status: string) => {
  if (status === "done") return "bg-emerald-500";
  if (status === "in_progress") return "bg-[#702DFF]";
  if (status === "planning") return "bg-blue-500";
  if (status === "pending") return "bg-amber-500";
  if (status === "hold") return "bg-rose-500";
  return "bg-slate-400";
};

function openWhatsAppModal(project: any) {
  const phone = project.client?.phone;
  if (!phone) return showToast("Client phone missing", "error");

  const client = project.client;
  const isPaid = (client?.paid_amount || 0) >= (client?.total_amount || 0);

  waModal.clientName = client?.name || "Client";
  waModal.clientPhone = phone;
  
  const status = (project.status || "new").toUpperCase().replace("_", " ");
  
  let text = `*PROJECT REPORT & MILESTONE UPDATE*
---------------------------------------
Halo Kak ${waModal.clientName}! 👋

Berikut update progres untuk proyek:
🚀 *${project.name}*

📊 *Status Progres:*
• Pengerjaan: ${project.progress || 0}%
• Current Phase: ${status}
• Target Deadline: ${project.deadline ? formatDate(project.deadline) : "-"}

🔗 *Akses Link & Aset:*
• Demo Preview: ${project.preview_url || "_"}
`;
  
  if (isPaid) {
    text += `• Production Link: ${project.prod_preview_url || "_"}\n`;
    text += `• Figma Design: ${project.figma_url || "_"}\n`;
    text += `• Source Code: ${project.github_url || "_"}\n`;
  } else {
    text += `• Production/Figma/GitHub: 🔒 *Locked (Pelunasan Belum Tercatat)*\n`;
  }

  if (project.client_portal_token) {
    text += `\n🎯 *Portal Monitoring Real-time:*
${window.location.origin}/portal/${project.client_portal_token}`;
  }
  
  text += `\n\nSemangat! 🔥`;
  
  waModal.text = text;
  waModal.isOpen = true;
}

const openPortal = (project: any) => {
  window.open(
    "https://kangjessy.com/portal/" + project.client_portal_token,
    "_blank",
  );
};

async function executeDelete() {
  const id = confirmModal.value.targetId;
  if (!id) return;
  confirmModal.value.isOpen = false;
  loading.value = true;
  try {
    await projectsService.delete(id);
    projects.value = projects.value.filter((p) => p.id !== id);
    showToast("Project record removed");
  } catch (err) {
    showToast("Failed to delete project", "error");
  } finally {
    loading.value = false;
  }
}
</script>
