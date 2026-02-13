<template>
  <div class="page-container" id="portfolio-editor-page">
    <!-- Sticky Header -->
    <!-- Action Header -->
    <PageHeader :title="headerTitle">
      <template #breadcrumb>
        <nav
          class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5"
        >
          <router-link
            to="/portfolio"
            class="hover:text-[#7029FF] transition-colors"
            >Portfolio</router-link
          >
          <ChevronRight :size="10" />
          <span class="text-[#7029FF]">{{
            isEdit ? "Edit Case" : "New Case"
          }}</span>
        </nav>
      </template>
      <div class="flex gap-3">
        <BaseButton variant="secondary" @click="router.back()"
          >Cancel</BaseButton
        >
        <BaseButton variant="primary" @click="handleSave" :loading="saving">
          <Save :size="18" />
          {{ isEdit ? "Update Project" : "Publish Project" }}
        </BaseButton>
      </div>
    </PageHeader>

    <!-- Floating Action Button (FAB) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-20 opacity-0 scale-90"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-20 opacity-0 scale-90"
    >
      <div
        v-if="isScrolled"
        class="fixed bottom-8 right-8 z-[100] flex flex-col gap-3"
      >
        <button
          @click="handleSave"
          class="w-14 h-14 rounded-full bg-[#702DFF] text-white shadow-[0_10px_30px_rgba(112,45,255,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
          :class="{ 'opacity-80 pointer-events-none': saving }"
          title="Save Changes"
        >
          <Save v-if="!saving" :size="24" />
          <div
            v-else
            class="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"
          ></div>

          <!-- Tooltip -->
          <span
            class="absolute right-full mr-4 px-3 py-1.5 bg-[#1B2559] text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          >
            {{ isEdit ? "Update Changes" : "Publish Project" }}
          </span>
        </button>
      </div>
    </transition>

    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      <!-- Main Content Area -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Title & Slug -->
        <div class="space-y-4 px-1">
          <div>
            <input
              v-model="project.title"
              @input="handleTitleInput"
              type="text"
              class="w-full bg-transparent border-b-2 border-transparent p-0 pb-3 text-2xl sm:text-4xl font-black text-[#1B2559] placeholder:text-slate-200 focus:ring-0 focus:border-[#7029FF]/10 outline-none transition-all duration-300 tracking-tight"
              placeholder="Project Title..."
            />
          </div>
          <div
            class="flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 rounded-xl w-fit shadow-sm"
          >
            <span
              class="text-[9px] font-black text-[#A3AED0] uppercase tracking-widest"
              >SLUG:</span
            >
            <span
              v-if="!isEditingSlug"
              class="text-[11px] font-bold text-[#702DFF]"
              >{{ project.slug || "generating..." }}</span
            >
            <input
              v-else
              v-model="project.slug"
              type="text"
              class="bg-transparent border-none p-0 text-[11px] font-bold text-[#702DFF] focus:ring-0 w-64 tracking-wider lowercase"
            />
            <button
              @click="isEditingSlug = !isEditingSlug"
              class="text-slate-300 hover:text-[#702DFF] transition-colors"
            >
              <Edit3 v-if="!isEditingSlug" :size="12" />
              <Check v-else :size="12" />
            </button>
          </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="flex gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            :class="
              activeTab === tab.id
                ? 'bg-white text-[#702DFF] shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            "
          >
            {{ tab.name }}
          </button>
        </div>

        <!-- Tab Contents -->
        <div class="space-y-6">
          <!-- General Tab -->
          <div v-show="activeTab === 'general'" class="space-y-6">
            <AdminCard title="Ringkasan & Link">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminTextarea
                  v-model="project.excerpt"
                  :rows="3"
                  label="Ringkasan Pendek (Muncul di Kartu Portofolio)"
                  placeholder="Misal: Website profil perusahaan dengan sistem manajemen konten otomatis dan desain premium..."
                  class="md:col-span-2"
                />
                <BaseInput
                  v-model="project.websiteUrl"
                  label="Link Preview (Live / Demo)"
                  placeholder="https://..."
                  :icon="Globe"
                />
                <BaseInput
                  v-model="project.githubUrl"
                  label="Kode Sumber (GitHub)"
                  placeholder="https://github.com/..."
                  :icon="Github"
                />
              </div>
            </AdminCard>

            <div class="space-y-3">
              <label class="label-heading !pl-1"
                >Latar Belakang Proyek (Fase 01)</label
              >
              <TipTapEditor
                :model-value="getChallengeText()"
                @update:model-value="updateChallenge"
              />
            </div>
          </div>

          <!-- Process Tab -->
          <div v-show="activeTab === 'process'" class="space-y-6">
            <!-- Investigation (Pivot) -->
            <AdminCard
              v-if="project.pivot"
              title="Fase 01.5 / Investigasi (Audit)"
            >
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="label-heading">Subjudul Fase</label>
                    <input
                      v-model="project.pivot.subtitle"
                      type="text"
                      class="input-field"
                      placeholder="e.g. Fase 01.5 / Investigasi"
                    />
                  </div>
                  <div>
                    <label class="label-heading">Judul Investigasi</label>
                    <input
                      v-model="project.pivot.title"
                      type="text"
                      class="input-field"
                      placeholder="e.g. Audit & Analisis"
                    />
                  </div>
                </div>
                <div class="space-y-3">
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
                  >
                    Item Investigasi / Temuan
                  </p>
                  <div
                    v-for="(item, idx) in project.pivot.items"
                    :key="idx"
                    class="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 relative group"
                  >
                    <div
                      class="w-12 h-12 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center shrink-0"
                    >
                      <input
                        v-model="item.icon"
                        type="text"
                        class="w-full bg-transparent border-none text-center text-xs font-bold p-0 focus:ring-0"
                        placeholder="Icon"
                      />
                      <span
                        class="text-[8px] text-slate-300 font-black uppercase mt-0.5"
                        >Icon</span
                      >
                    </div>
                    <div class="flex-1 space-y-2">
                      <input
                        v-model="item.title"
                        type="text"
                        class="w-full bg-transparent border-none font-bold text-sm p-0 focus:ring-0"
                        placeholder="Judul Temuan"
                      />
                      <textarea
                        v-model="item.desc"
                        rows="2"
                        class="w-full bg-transparent border-none text-xs text-slate-500 p-0 focus:ring-0 resize-none"
                        placeholder="Description..."
                      ></textarea>
                    </div>
                    <button
                      @click="project.pivot.items.splice(idx, 1)"
                      class="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-white shadow-md text-rose-500 flex items-center justify-center transition-all hover:scale-110"
                    >
                      <X :size="14" />
                    </button>
                  </div>
                  <button
                    @click="
                      project.pivot.items.push({
                        icon: 'Search',
                        title: '',
                        desc: '',
                      })
                    "
                    class="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-[#702DFF] hover:text-[#702DFF] transition-all"
                  >
                    + Tambah Item Investigasi
                  </button>
                </div>
              </div>
            </AdminCard>

            <!-- Solution Steps -->
            <AdminCard v-if="project.steps" title="Fase 02 / Strategi (Solusi)">
              <div class="space-y-4">
                <div
                  v-for="(step, idx) in project.steps"
                  :key="idx"
                  class="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex gap-5 relative group"
                >
                  <div
                    class="w-10 h-10 bg-[#1B2559] text-white rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                  >
                    {{ idx + 1 }}
                  </div>
                  <div class="flex-1 space-y-2">
                    <input
                      v-model="step.title"
                      type="text"
                      class="w-full bg-transparent border-none font-bold text-base p-0 focus:ring-0"
                      placeholder="Judul Langkah Solusi"
                    />
                    <textarea
                      v-model="step.desc"
                      rows="3"
                      class="w-full bg-transparent border-none text-sm text-slate-500 p-0 focus:ring-0 resize-none"
                      placeholder="How it was implemented..."
                    ></textarea>
                  </div>
                  <button
                    @click="project.steps.splice(idx, 1)"
                    class="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-white shadow-md text-rose-500 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <X :size="14" />
                  </button>
                </div>
                <button
                  @click="project.steps.push({ title: '', desc: '' })"
                  class="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-[#702DFF] hover:text-[#702DFF] transition-all"
                >
                  + Tambah Langkah Solusi
                </button>
              </div>
            </AdminCard>
          </div>

          <!-- Impact Tab -->
          <div v-show="activeTab === 'impact'" class="space-y-6">
            <AdminCard v-if="project.metrics" title="Fase 03 / Dampak (Hasil)">
              <div class="space-y-6">
                <AdminTextarea
                  v-model="project.impact"
                  :rows="3"
                  label="Hasil Akhir / Testimonial"
                  placeholder="e.g. 'Project was delivered ahead of schedule with 99.9% uptime...'"
                  class="italic"
                />

                <div class="space-y-3">
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest !pl-1"
                  >
                    Metrik Utama & Bukti Hasil
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="(metric, idx) in project.metrics"
                      :key="idx"
                      class="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 relative group"
                    >
                      <div class="flex gap-4">
                        <div
                          class="w-12 h-12 bg-white rounded-xl border border-emerald-100 flex flex-col items-center justify-center shrink-0"
                        >
                          <input
                            v-model="metric.icon"
                            type="text"
                            class="w-full bg-transparent border-none text-center text-xs font-bold p-0 focus:ring-0 text-emerald-600"
                            placeholder="Icon"
                          />
                        </div>
                        <div class="flex-1 space-y-1">
                          <input
                            v-model="metric.value"
                            type="text"
                            class="w-full bg-transparent border-none font-black text-xl p-0 focus:ring-0 text-slate-800"
                            placeholder="Value (e.g. 100%)"
                          />
                          <input
                            v-model="metric.label"
                            type="text"
                            class="w-full bg-transparent border-none text-[10px] font-black uppercase tracking-widest p-0 focus:ring-0 text-slate-400"
                            placeholder="Label (e.g. Security Score)"
                          />
                        </div>
                      </div>
                      <div class="mt-4 flex flex-col gap-2">
                        <label
                          class="text-[8px] font-black text-slate-400 uppercase tracking-widest pl-1"
                          >Proof Image URL (Optional)</label
                        >
                        <input
                          v-model="metric.proofImage"
                          type="text"
                          class="w-full bg-white border border-slate-200 rounded-lg text-[10px] px-3 py-1.5 focus:border-emerald-400 outline-none"
                          placeholder="URL to screenshot..."
                        />
                      </div>
                      <button
                        @click="project.metrics.splice(idx, 1)"
                        class="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full bg-white shadow-md text-rose-500 flex items-center justify-center transition-all hover:scale-110"
                      >
                        <X :size="12" />
                      </button>
                    </div>
                    <button
                      @click="
                        project.metrics.push({
                          icon: 'TrendingUp',
                          value: '',
                          label: '',
                        })
                      "
                      class="md:col-span-1 py-10 border-2 border-dashed border-emerald-200 rounded-2xl text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:border-emerald-400 transition-all flex flex-col items-center justify-center gap-2"
                    >
                      <Plus :size="20" />
                      Tambah Metrik
                    </button>
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>

          <!-- SEO & Gallery Tab -->
          <div v-show="activeTab === 'media'" class="space-y-6">
            <AdminCard
              v-if="project.gallery"
              title="Project Gallery (Showcase)"
            >
              <div class="space-y-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                    v-for="(img, idx) in project.gallery"
                    :key="idx"
                    class="aspect-video bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden relative group"
                  >
                    <img :src="img" class="w-full h-full object-cover" />
                    <button
                      @click="project.gallery.splice(idx, 1)"
                      class="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-500 text-white shadow-lg opacity-0 group-hover:opacity-100 flex items-center justify-center z-10 transition-all"
                    >
                      <X :size="12" />
                    </button>
                  </div>
                  <button
                    @click="openMediaPickerForGallery"
                    class="aspect-video border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-[#702DFF] hover:text-[#702DFF] transition-all group"
                  >
                    <ImageIcon
                      :size="24"
                      class="mb-2 group-hover:scale-110 transition-transform"
                    />
                    <span
                      class="text-[9px] font-black uppercase tracking-widest"
                      >Add Image</span
                    >
                  </button>
                </div>
              </div>
            </AdminCard>

            <AdminCard
              v-if="project.faqs"
              title="F.A.Q (Frequently Asked Questions)"
            >
              <div class="space-y-4">
                <div
                  v-for="(faq, idx) in project.faqs"
                  :key="idx"
                  class="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 relative group"
                >
                  <div
                    class="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-[#1B2559] shrink-0 font-black text-sm"
                  >
                    Q
                  </div>
                  <div class="flex-1 space-y-3">
                    <BaseInput v-model="faq.q" placeholder="Question Title" />
                    <AdminTextarea
                      v-model="faq.a"
                      :rows="3"
                      placeholder="Detailed answer..."
                      class="border-t border-slate-200 pt-2"
                    />
                  </div>
                  <button
                    @click="project.faqs.splice(idx, 1)"
                    class="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-white shadow-md text-rose-500 flex items-center justify-center transition-all hover:scale-110"
                  >
                    <X :size="14" />
                  </button>
                </div>
                <button
                  @click="project.faqs.push({ q: '', a: '' })"
                  class="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-[#702DFF] hover:text-[#702DFF] transition-all"
                >
                  + Tambah F.A.Q
                </button>
              </div>
            </AdminCard>

            <div class="space-y-3">
              <label class="label-heading pl-1"
                >Konten Detail / Case Study Tambahan (Muncul di Bawah
                FAQ)</label
              >
              <TipTapEditor
                ref="editorRef"
                :model-value="project.content || ''"
                @update:model-value="handleContentUpdate"
                @trigger-media-modal="openMediaPickerForEditor"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6 pt-16">
        <!-- Project Status & Display -->
        <AdminCard title="Status & Visibilitas" :stretch="false">
          <div class="space-y-4">
            <div>
              <label class="label-heading">Area Pengembangan</label>

              <!-- Custom Dropdown Trigger -->
              <div class="relative" ref="dropdownRef">
                <button
                  @click="toggleDropdown"
                  class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-[#702DFF] focus:border-[#702DFF] focus:ring-1 focus:ring-[#702DFF] transition-all"
                >
                  <span
                    class="text-xs font-bold"
                    :class="
                      getCategoryName(project.category)
                        ? 'text-[#1B2559]'
                        : 'text-slate-400'
                    "
                  >
                    {{ getCategoryName(project.category) || "Select Area" }}
                  </span>
                  <ChevronRight
                    :size="14"
                    class="text-slate-400 transition-transform duration-200"
                    :class="{ 'rotate-90': isAreaDropdownOpen }"
                  />
                </button>

                <!-- Dropdown Menu -->
                <div
                  v-if="isAreaDropdownOpen"
                  class="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-100 shadow-xl rounded-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <!-- Sticky Search Header -->
                  <div
                    class="p-2 border-b border-slate-50 bg-white sticky top-0 z-10"
                  >
                    <div class="relative">
                      <Search
                        :size="12"
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
                      />
                      <input
                        v-model="areaInput"
                        ref="areaSearchInput"
                        @keyup.enter="handleAreaEnter"
                        type="text"
                        class="w-full bg-slate-50 border-none rounded-lg py-2 pl-9 pr-3 text-[10px] font-bold text-[#1B2559] placeholder:text-slate-300 focus:ring-1 focus:ring-[#702DFF]"
                        placeholder="Search area..."
                      />
                    </div>
                  </div>

                  <!-- Options List -->
                  <div class="max-h-48 overflow-y-auto custom-scrollbar p-1">
                    <button
                      v-for="area in filteredAreas"
                      :key="area.id"
                      @click="selectArea(area.name)"
                      class="w-full px-3 py-2 text-left text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between group"
                    >
                      <span
                        :class="
                          getCategoryName(project.category) === area.name
                            ? 'text-[#702DFF]'
                            : 'text-slate-600'
                        "
                        >{{ area.name }}</span
                      >
                      <Check
                        v-if="getCategoryName(project.category) === area.name"
                        :size="12"
                        class="text-[#702DFF]"
                      />
                    </button>

                    <!-- Add New Option -->
                    <button
                      v-if="
                        areaInput &&
                        !filteredAreas.some(
                          (a) =>
                            a.name.toLowerCase() === areaInput.toLowerCase(),
                        )
                      "
                      @click="handleAreaEnter"
                      class="w-full px-3 py-2 text-left rounded-lg hover:bg-indigo-50 transition-colors border-t border-slate-50 mt-1"
                    >
                      <div class="flex items-center gap-2">
                        <div
                          class="w-6 h-6 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"
                        >
                          <Plus :size="12" />
                        </div>
                        <div class="flex flex-col">
                          <span
                            class="text-[9px] font-black uppercase text-[#702DFF]"
                            >Tambah Area Baru</span
                          >
                          <span
                            class="text-[10px] font-bold text-slate-500 truncate"
                            >"{{ areaInput }}"</span
                          >
                        </div>
                      </div>
                    </button>

                    <!-- Empty State -->
                    <div
                      v-if="!areaInput && filteredAreas.length === 0"
                      class="py-4 text-center"
                    >
                      <p
                        class="text-[9px] font-bold text-slate-300 uppercase tracking-widest"
                      >
                        Area tidak ditemukan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label class="label-heading">Status Saat Ini</label>
              <div class="flex bg-slate-50 p-1 rounded-xl">
                <button
                  @click="project.status = 'SUCCESS'"
                  class="flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all"
                  :class="
                    project.status === 'SUCCESS'
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-600'
                  "
                >
                  Success
                </button>
                <button
                  @click="project.status = 'IDEA'"
                  class="flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all"
                  :class="
                    project.status === 'IDEA'
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-600'
                  "
                >
                  Idea
                </button>
              </div>
            </div>
            <div class="pt-2 border-t border-slate-100">
              <AdminSelect
                v-model="project.visibility"
                label="Visibilitas di Web"
              >
                <option value="published">Ya, Tampilkan (Live)</option>
                <option value="draft">Tidak, Sembunyikan (Draft)</option>
              </AdminSelect>
            </div>
          </div>
        </AdminCard>

        <!-- Tech Stack (Detailed) -->
        <AdminCard title="Teknologi Inti" :stretch="false">
          <div class="space-y-3">
            <div class="flex flex-wrap gap-1.5 min-h-[20px]">
              <span
                v-for="tag in project.technologies"
                :key="tag"
                class="px-2 py-1 bg-indigo-50 text-[#702DFF] text-[9px] font-black uppercase tracking-widest rounded-lg border border-indigo-100 flex items-center gap-1.5 transition-all hover:-translate-y-0.5 shadow-xs"
              >
                {{ getTagName(tag) }}
                <button @click="removeTag(tag)" class="hover:text-rose-500">
                  <X :size="10" />
                </button>
              </span>
            </div>
            <div class="relative">
              <input
                v-model="techInput"
                @keyup.enter="addTechTag"
                type="text"
                class="input-field !py-2 !text-[10px] !pl-9"
                placeholder="Tambah teknologi..."
              />
              <Code
                :size="12"
                class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300"
              />
            </div>
            <div v-if="availableTechnologies.length > 0" class="mt-2">
              <div
                class="flex flex-wrap gap-1 max-h-32 overflow-y-auto custom-scrollbar"
              >
                <button
                  v-for="tech in availableTechnologies.filter(
                    (t) => !project.technologies?.includes(t.id),
                  )"
                  :key="tech.id"
                  @click="addSuggestedTech(tech)"
                  class="px-2 py-0.5 border border-slate-100 rounded-md text-[9px] font-bold text-slate-400 hover:border-indigo-200 hover:text-[#702DFF] whitespace-nowrap transition-all"
                >
                  + {{ tech.name }}
                </button>
              </div>
            </div>
          </div>
        </AdminCard>

        <!-- Client Info -->
        <AdminCard title="Metadata Konteks" :stretch="false">
          <div class="space-y-4">
            <BaseInput
              v-model="project.client"
              label="Nama Klien"
              placeholder="e.g. Nur Alam Hotel"
              :icon="User"
            />
            <BaseInput
              v-model="project.industry"
              label="Industri"
              placeholder="e.g. Hospitality"
              :icon="Briefcase"
            />
            <BaseInput
              v-model="project.completionDate"
              label="Tanggal Penyelesaian"
              type="date"
            />
          </div>
        </AdminCard>

        <!-- Featured Image -->
        <AdminCard title="Thumbnail Utama" :stretch="false">
          <div class="space-y-4">
            <div
              class="aspect-[16/10] bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 overflow-hidden relative group cursor-pointer transition-all hover:border-[#702DFF] hover:bg-slate-100/50"
              @click="openMediaPicker"
            >
              <img
                v-if="project.mainImage"
                :src="project.mainImage"
                class="w-full h-full object-cover"
              />

              <!-- Placeholder when no image -->
              <div
                v-if="!project.mainImage"
                class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-[2px]"
              >
                <div class="relative mb-6">
                  <!-- Central Icons Layer -->
                  <div
                    class="w-24 h-24 bg-white rounded-[32px] shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative z-10 border border-slate-100"
                  >
                    <div class="relative">
                      <ImageIcon
                        :size="40"
                        class="text-slate-200 group-hover:text-[#702DFF] transition-colors"
                      />
                      <Camera
                        :size="18"
                        class="absolute -top-1 -right-1 text-indigo-300 group-hover:text-[#702DFF]/40 transition-colors"
                      />
                    </div>
                  </div>

                  <!-- Decorative back layer -->
                  <div
                    class="absolute inset-0 bg-indigo-50 rounded-[32px] rotate-6 scale-95 opacity-50 group-hover:rotate-12 transition-all duration-500"
                  ></div>

                  <!-- Upload Badge -->
                  <div
                    class="absolute -bottom-3 -right-3 w-10 h-10 bg-[#702DFF] rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-xl z-20 group-hover:bounce transition-all"
                  >
                    <UploadCloud :size="20" />
                  </div>
                </div>

                <div class="space-y-1.5 relative z-10">
                  <span
                    class="text-xs font-black uppercase tracking-[0.2em] text-[#1B2559]"
                    >Pilih Foto Utama</span
                  >
                  <p
                    class="text-[9px] text-slate-400 uppercase font-black tracking-widest opacity-60"
                  >
                    Rekomendasi: 16:10 Ratio / PNG / JPG
                  </p>
                </div>

                <!-- Subtle background decoration -->
                <div
                  class="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none group-hover:scale-125 transition-transform duration-1000"
                >
                  <ImageIcon :size="200" />
                </div>
              </div>

              <!-- Click Overlay -->
              <div
                v-if="!project.mainImage"
                class="absolute inset-0 bg-[#702DFF] opacity-0 group-hover:opacity-[0.03] transition-opacity"
              ></div>

              <!-- Remove Button -->
              <button
                v-if="project.mainImage"
                @click.stop="
                  project.mainImage = '';
                  project.mainImageRef = '';
                "
                class="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md text-rose-500 shadow-xl opacity-0 group-hover:opacity-100 flex items-center justify-center z-20 hover:bg-rose-500 hover:text-white transition-all scale-90 group-hover:scale-100"
              >
                <X :size="20" />
              </button>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>

    <MediaPickerModal
      :is-open="isMediaPickerOpen"
      @close="isMediaPickerOpen = false"
      @select="handleMediaSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ChevronRight,
  Save,
  Edit3,
  Check,
  User,
  Globe,
  Github,
  Image as ImageIcon,
  X,
  Plus,
  Code,
  Briefcase,
  Search,
  Camera,
  UploadCloud,
} from "lucide-vue-next";
import {
  portfolioService,
  type PortfolioItem,
} from "../services/portfolioService";
import type { PortfolioArea, Technology } from "../types";
import { BaseButton } from "@kangjessy/ui";
import AdminCard from "../components/ui/AdminCard.vue";
import AdminSelect from "../components/ui/AdminSelect.vue";
import AdminTextarea from "../components/ui/AdminTextarea.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import TipTapEditor from "../components/ui/TipTapEditor.vue";
import Toast from "../components/ui/Toast.vue";
import MediaPickerModal from "../components/media/MediaPickerModal.vue";

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => !!route.params.id);
const headerTitle = computed(() =>
  isEdit.value ? "Modify Case Study" : "Create New Case Study",
);

const saving = ref(false);
const isScrolled = ref(false);
const isEditingSlug = ref(false);
const isMediaPickerOpen = ref(false);
const isAreaDropdownOpen = ref(false);
const areaInput = ref("");
const mediaPickerContext = ref<"main" | "content" | "gallery">("main");
const editorRef = ref();
const techInput = ref("");
const activeTab = ref("general");
const availableAreas = ref<PortfolioArea[]>([]);
const availableTechnologies = ref<Technology[]>([]);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const tabs = [
  { id: "general", name: "Overview" },
  { id: "process", name: "Proses & Solusi" },
  { id: "impact", name: "Hasil & Dampak" },
  { id: "media", name: "SEO & Galeri" },
];

const project = ref<PortfolioItem>({
  id: "",
  title: "",
  slug: "",
  client: "",
  industry: "",
  category: "Full Stack",
  icon: "Globe",
  color: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
  completionDate: new Date().toISOString().split("T")[0],
  websiteUrl: "",
  githubUrl: "",
  content: "",
  excerpt: "",
  mainImage: "",
  mainImageRef: "",
  gallery: [],
  tags: [],
  technologies: [],
  status: "SUCCESS",
  visibility: "published",
  challenge: { description: "" },
  pivot: { title: "", subtitle: "", items: [] },
  steps: [],
  metrics: [],
  faqs: [],
});

const dropdownRef = ref();
const areaSearchInput = ref();

const toggleDropdown = async () => {
  isAreaDropdownOpen.value = !isAreaDropdownOpen.value;
  if (isAreaDropdownOpen.value) {
    areaInput.value = ""; // Reset search on open
    // Wait for DOM update to focus input
    setTimeout(() => {
      areaSearchInput.value?.focus();
    }, 50);
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isAreaDropdownOpen.value = false;
  }
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("mousedown", handleClickOutside);
  try {
    const [areas, techs] = await Promise.all([
      portfolioService.getAreas(),
      portfolioService.getTechnologies(),
    ]);
    availableAreas.value = areas;
    availableTechnologies.value = techs;
  } catch (e) {
    console.error("Failed to load portfolio meta", e);
  }

  if (isEdit.value) {
    try {
      const data = await portfolioService.getById(route.params.id as string);
      project.value = {
        ...data,
        tags: data.tags || [],
        technologies: data.technologies || [],
        challenge: data.challenge || { description: "" },
        pivot: data.pivot || { title: "", subtitle: "", items: [] },
        steps: data.steps || [],
        metrics: data.metrics || [],
        faqs: data.faqs || [],
        gallery: data.gallery || [],
        status: (data.status as any) || "SUCCESS",
        visibility: (data.visibility as any) || "published",
        icon: data.icon || "Globe",
        color:
          data.color || "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
      };
      areaInput.value =
        typeof project.value.category === "string"
          ? project.value.category
          : (project.value.category as any)?.title || "";
    } catch (e) {
      showToast("Failed to load project", "error");
    }
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 300;
};

const handleTitleInput = () => {
  if (!isEditingSlug.value && !isEdit.value) {
    project.value.slug = project.value.title
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }
};

const handleContentUpdate = (html: string) => {
  project.value.content = html;
  if (!project.value.excerpt || project.value.excerpt.length < 5) {
    project.value.excerpt = html.replace(/<[^>]*>/g, "").substring(0, 160);
  }
};

const filteredAreas = computed(() => {
  if (!areaInput.value) return availableAreas.value;
  return availableAreas.value.filter((a) =>
    a.name.toLowerCase().includes(areaInput.value.toLowerCase()),
  );
});

const selectArea = (name: string) => {
  project.value.category = name;
  areaInput.value = name;
  isAreaDropdownOpen.value = false;
};

const handleAreaEnter = async () => {
  const val = areaInput.value.trim();
  if (!val) return;

  const existing = availableAreas.value.find(
    (a) => a.name.toLowerCase() === val.toLowerCase(),
  );
  if (existing) {
    selectArea(existing.name);
    return;
  }

  try {
    await portfolioService.createArea({
      name: val,
      slug: val.toLowerCase().replace(/\s+/g, "-"),
    });
    const areas = await portfolioService.getAreas();
    availableAreas.value = areas;
    selectArea(val);
    showToast("New area created successfully", "success");
  } catch (e) {
    showToast("Failed to create area", "error");
  }
};

const getChallengeText = () => {
  const c = project.value.challenge;
  return typeof c === "string" ? c : c?.description || "";
};

const updateChallenge = (html: string) => {
  if (typeof project.value.challenge === "string") {
    project.value.challenge = html;
  } else {
    project.value.challenge = { description: html };
  }
};

const openMediaPicker = () => {
  mediaPickerContext.value = "main";
  isMediaPickerOpen.value = true;
};

const openMediaPickerForEditor = () => {
  mediaPickerContext.value = "content";
  isMediaPickerOpen.value = true;
};

const openMediaPickerForGallery = () => {
  mediaPickerContext.value = "gallery";
  isMediaPickerOpen.value = true;
};

const handleMediaSelect = (media: any) => {
  if (mediaPickerContext.value === "main") {
    project.value.mainImage = media.url;
    project.value.mainImageRef = media.id;
  } else if (mediaPickerContext.value === "content") {
    editorRef.value?.insertImage(media.url);
  } else if (mediaPickerContext.value === "gallery") {
    if (!project.value.gallery) project.value.gallery = [];
    project.value.gallery.push(media.url);
  }
  isMediaPickerOpen.value = false;
};

const addTechTag = async () => {
  const val = techInput.value.trim();
  if (!val) return;
  techInput.value = "";
  const existing = availableTechnologies.value.find(
    (t) => t.name.toLowerCase() === val.toLowerCase(),
  );
  if (existing) {
    addSuggestedTech(existing);
  } else {
    try {
      const newTech = await portfolioService.createTechnology({
        name: val,
        slug: val.toLowerCase().replace(/\s+/g, "-"),
      });
      availableTechnologies.value.push(newTech);
      addSuggestedTech(newTech);
    } catch (e) {
      showToast("Failed to create tech", "error");
    }
  }
};

const addSuggestedTech = (tech: Technology) => {
  if (!project.value.technologies) project.value.technologies = [];
  if (!project.value.technologies.includes(tech.id))
    project.value.technologies.push(tech.id);
};

const removeTag = (id: string) => {
  project.value.technologies = project.value.technologies?.filter(
    (t) => t !== id,
  );
};

const getTagName = (id: string) =>
  availableTechnologies.value.find((t) => t.id === id)?.name || id;

const getCategoryName = (category: string | any) => {
  if (!category) return "";
  return typeof category === "string" ? category : category.title || "";
};

const handleSave = async () => {
  if (!project.value.title) return showToast("Title is required", "error");
  saving.value = true;

  // Prepare payload (convert category string to reference if possible)
  const payload = { ...project.value };
  if (typeof payload.category === "string") {
    const matchedArea = availableAreas.value.find(
      (a) =>
        a.name.toLowerCase() === (payload.category as string).toLowerCase(),
    );
    if (matchedArea) {
      // @ts-ignore
      payload.category = {
        _type: "reference",
        _ref: matchedArea.id,
      };
    }
  }

  try {
    if (isEdit.value) {
      await portfolioService.update(route.params.id as string, payload);
      showToast("Project updated successfully", "success");
    } else {
      await portfolioService.create(payload);
      showToast("New project !published", "success");
      setTimeout(() => router.push("/portfolio"), 1000);
    }
  } catch (e) {
    showToast("Save failed", "error");
  } finally {
    saving.value = false;
  }
};

const showToast = (message: string, variant: "success" | "error") => {
  toast.value = { show: true, message, variant };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};
</script>

<style scoped>
@reference "tailwindcss";
.label-heading {
  @apply text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
