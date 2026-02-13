<template>
  <div class="page-container">
    <PageHeader
      title="Media Library"
      subtitle="Organize your assets with folders"
    >
      <div class="flex gap-3">
        <BaseButton variant="secondary" @click="showNewFolderModal = true">
          <FolderPlus :size="18" />
          New Folder
        </BaseButton>
        <BaseButton variant="primary" @click="triggerInput" :disabled="loading">
          <Loader2 v-if="loading" :size="18" class="animate-spin" />
          <Upload v-else :size="18" />
          {{ loading ? "Uploading..." : "Upload Files" }}
        </BaseButton>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          multiple
          accept="image/*,video/*,audio/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain"
          @change="handleFileUpload"
        />
      </div>
    </PageHeader>

    <div class="flex gap-6">
      <!-- Folder Sidebar -->
      <div class="w-64 shrink-0 hidden lg:block">
        <AdminCard title="Folders" :stretch="false">
          <div class="space-y-1">
            <!-- All Files -->
            <button
              @click="selectFolder(null)"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
              :class="
                selectedFolderId === null
                  ? 'bg-indigo-50 text-[#702DFF]'
                  : 'hover:bg-slate-50 text-slate-600'
              "
            >
              <Database :size="16" />
              <span class="text-[11px] font-bold flex-1">All Files</span>
              <span class="text-[10px] font-black text-slate-400">{{
                totalMediaCount
              }}</span>
            </button>

            <!-- Folder Tree -->
            <div v-for="folder in rootFolders" :key="folder.id">
              <FolderItem
                :folder="folder"
                :all-folders="allFolders"
                :selected-id="selectedFolderId"
                :level="0"
                @select="selectFolder"
                @delete="handleDeleteFolder"
              />
            </div>
          </div>

          <!-- Storage Info -->
          <div class="mt-6 pt-4 border-t border-slate-100">
            <div class="flex justify-between items-center mb-2">
              <span
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                >Storage Used</span
              >
              <span class="text-[10px] font-bold text-[#702DFF]">{{
                formatBytes(totalSize)
              }}</span>
            </div>
            <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-[#702DFF] to-indigo-400 rounded-full"
                :style="{
                  width: `${Math.min((totalSize / maxStorage) * 100, 100)}%`,
                }"
              ></div>
            </div>
            <p class="text-[9px] text-slate-400 mt-1 text-right">
              of {{ formatBytes(maxStorage) }}
            </p>
          </div>
        </AdminCard>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1">
        <!-- Breadcrumb & Mobile Folder Toggle -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
        >
          <div class="flex items-center gap-2 text-[11px] font-bold">
            <button
              @click="selectFolder(null)"
              class="text-slate-400 hover:text-[#702DFF] transition-colors"
            >
              All Files
            </button>
            <div
              v-for="(crumb, idx) in breadcrumbs"
              :key="crumb.id"
              class="flex items-center gap-2"
            >
              <ChevronRight :size="12" class="text-slate-300" />
              <button
                @click="selectFolder(crumb.id)"
                :class="
                  idx === breadcrumbs.length - 1
                    ? 'text-[#702DFF]'
                    : 'text-slate-400 hover:text-[#702DFF]'
                "
                class="transition-colors truncate max-w-[100px]"
              >
                {{ crumb.name }}
              </button>
            </div>
          </div>

          <!-- Mobile Folder Toggle (Bento Style) -->
          <div v-if="isTablet" class="lg:hidden">
            <button
              @click="showMobileFolderDrawer = true"
              class="flex items-center justify-between w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[11px] font-black uppercase tracking-widest text-[#1B2559] hover:bg-slate-100 transition-all active:scale-[0.98]"
            >
              <div class="flex items-center gap-3">
                <Folder :size="16" class="text-amber-400" />
                <span>{{
                  selectedFolderId
                    ? getFolderPath(selectedFolderId).split("/").pop()
                    : "Root Directory"
                }}</span>
              </div>
              <ChevronRight :size="14" class="text-slate-300" />
            </button>
          </div>
        </div>

        <!-- View Toggle & Search -->
        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
        >
          <div class="relative flex-1 md:max-w-xs">
            <Search
              :size="16"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
            />
            <input
              v-model="searchQuery"
              type="text"
              class="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-[#702DFF]/20 focus:border-[#702DFF] outline-none transition-all"
              placeholder="Search files..."
            />
          </div>
          <div
            class="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-hide"
          >
            <!-- Filter Type -->
            <div class="flex gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <button
                v-for="option in [
                  { label: 'All', value: 'all', icon: Database },
                  { label: 'Images', value: 'images', icon: ImageIcon },
                  { label: 'Videos', value: 'videos', icon: Video },
                  { label: 'Docs', value: 'documents', icon: FileText },
                ]"
                :key="option.value"
                @click="setFilterType(option.value)"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap"
                :class="
                  filterType === option.value
                    ? 'bg-white text-[#702DFF] shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                "
              >
                <component :is="option.icon" :size="12" />
                {{ option.label }}
              </button>
            </div>

            <!-- View Toggle -->
            <div
              class="hidden sm:flex gap-1 bg-slate-100 p-1 rounded-xl shrink-0"
            >
              <button
                @click="viewMode = 'grid'"
                class="p-2 rounded-lg transition-all"
                :class="
                  viewMode === 'grid'
                    ? 'bg-white text-[#702DFF] shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                "
              >
                <Grid3x3 :size="18" />
              </button>
              <button
                @click="viewMode = 'list'"
                class="p-2 rounded-lg transition-all"
                :class="
                  viewMode === 'list'
                    ? 'bg-white text-[#702DFF] shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                "
              >
                <List :size="18" />
              </button>
            </div>
          </div>
        </div>

        <!-- Subfolders (if any) -->
        <div v-if="currentSubfolders.length > 0" class="mb-6">
          <h3
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3"
          >
            Folders
          </h3>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <div
              v-for="subfolder in currentSubfolders"
              :key="subfolder.id"
              @click="selectFolder(subfolder.id)"
              class="p-4 bg-white border border-slate-100 rounded-2xl cursor-pointer hover:border-[#702DFF] hover:shadow-lg hover:shadow-indigo-500/5 transition-all group"
            >
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
              >
                <Folder :size="24" class="text-amber-500" />
              </div>
              <p class="text-sm font-bold text-[#1B2559] truncate">
                {{ subfolder.name }}
              </p>
              <p class="text-[10px] text-slate-400">
                {{ getFolderItemCount(subfolder.id) }} items
              </p>
            </div>
          </div>
        </div>

        <!-- Media Grid -->
        <div v-if="filteredMedia.length > 0">
          <h3
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3"
          >
            Files
          </h3>

          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
          >
            <!-- Upload Placeholder -->
            <div
              @click="!loading && triggerInput()"
              class="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#702DFF] hover:bg-indigo-50/30 transition-all group shrink-0"
              :class="{ 'opacity-50 cursor-not-allowed': loading }"
            >
              <div
                class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-[#702DFF] transition-all"
              >
                <Loader2
                  v-if="loading"
                  :size="18"
                  class="animate-spin text-[#702DFF]"
                />
                <Plus v-else :size="18" />
              </div>
              <span
                class="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >{{ loading ? "Uploading" : "Upload" }}</span
              >
            </div>

            <!-- Media Items -->
            <div
              v-for="item in filteredMedia"
              :key="item.id"
              @click="selectedFile = item"
              class="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer"
              :class="
                selectedFile?.id === item.id
                  ? 'ring-4 ring-[#702DFF]/20 border-[#702DFF]'
                  : ''
              "
            >
              <div v-if="isImage(item.type)" class="w-full h-full">
                <img
                  :src="item.url"
                  :alt="item.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div
                v-else
                class="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-indigo-50/50 transition-colors"
              >
                <component
                  :is="getFileIcon(item.type)"
                  :size="isMobile ? 32 : 48"
                  class="mb-2 transition-transform group-hover:scale-110"
                />
                <span
                  class="text-[7px] md:text-[8px] font-black uppercase tracking-widest"
                  >{{ item.type?.split("/").pop() || "FILE" }}</span
                >
              </div>

              <!-- Overlay / Actions -->
              <div
                class="absolute inset-0 transition-opacity flex flex-col items-center justify-center gap-2"
                :class="
                  isMobile
                    ? 'opacity-100 bg-transparent justify-end p-2'
                    : 'opacity-0 bg-[#1B2559]/70 group-hover:opacity-100 backdrop-blur-[2px]'
                "
              >
                <p
                  v-if="!isMobile"
                  class="text-[9px] font-black text-white uppercase tracking-widest px-3 text-center truncate w-full"
                >
                  {{ item.name }}
                </p>
                <div
                  class="flex gap-1.5 md:gap-2"
                  :class="
                    isMobile
                      ? 'bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-white/20'
                      : ''
                  "
                >
                  <button
                    @click.stop="copyUrl(item.url)"
                    class="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center transition-all"
                    :class="
                      isMobile
                        ? 'bg-indigo-50 text-[#1B2559]'
                        : 'bg-white/10 hover:bg-white text-white hover:text-[#1B2559]'
                    "
                    title="Copy URL"
                  >
                    <Copy :size="14" />
                  </button>
                  <button
                    @click.stop="openMoveModal(item)"
                    class="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center transition-all"
                    :class="
                      isMobile
                        ? 'bg-indigo-50 text-[#1B2559]'
                        : 'bg-white/10 hover:bg-white text-white hover:text-[#1B2559]'
                    "
                    title="Move"
                  >
                    <FolderInput :size="14" />
                  </button>
                  <button
                    @click.stop="handleDeleteMedia(item.id)"
                    class="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center transition-all"
                    :class="
                      isMobile
                        ? 'bg-rose-50 text-rose-500'
                        : 'bg-white/10 hover:bg-rose-500 text-white'
                    "
                    title="Delete"
                  >
                    <Trash2 :size="14" />
                  </button>
                </div>
                <p v-if="!isMobile" class="text-[8px] text-white/60 mt-1">
                  {{ formatBytes(item.size) }}
                </p>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div
            v-else
            class="bg-white rounded-2xl border border-slate-100 overflow-hidden"
          >
            <table class="w-full">
              <thead class="bg-slate-50/50">
                <tr
                  class="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest"
                >
                  <th class="py-3 px-4">File</th>
                  <th class="py-3 px-4 hidden md:table-cell">Size</th>
                  <th class="py-3 px-4 hidden sm:table-cell">Date</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in filteredMedia"
                  :key="item.id"
                  class="border-t border-slate-50 hover:bg-slate-50/50 transition-colors group"
                >
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center"
                      >
                        <img
                          v-if="isImage(item.type)"
                          :src="item.url"
                          class="w-full h-full object-cover"
                        />
                        <component
                          v-else
                          :is="getFileIcon(item.type)"
                          :size="20"
                          class="text-slate-400"
                        />
                      </div>
                      <span
                        class="text-sm font-bold text-[#1B2559] truncate max-w-[200px]"
                        >{{ item.name }}</span
                      >
                    </div>
                  </td>
                  <td
                    class="py-3 px-4 text-xs text-slate-500 hidden md:table-cell"
                  >
                    {{ formatBytes(item.size) }}
                  </td>
                  <td
                    class="py-3 px-4 text-xs text-slate-500 hidden sm:table-cell"
                  >
                    {{ formatDate(item.createdAt) }}
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex items-center justify-end gap-1">
                      <button
                        @click="copyUrl(item.url)"
                        class="btn-ghost w-8 h-8"
                        title="Copy URL"
                      >
                        <Copy :size="14" />
                      </button>
                      <button
                        @click="openMoveModal(item)"
                        class="btn-ghost w-8 h-8"
                        title="Move"
                      >
                        <FolderInput :size="14" />
                      </button>
                      <button
                        @click="handleDeleteMedia(item.id)"
                        class="btn-ghost w-8 h-8 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete"
                      >
                        <Trash2 :size="14" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="!loading"
          class="flex flex-col items-center justify-center py-20"
        >
          <div
            class="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-4"
          >
            <ImageIcon :size="32" class="text-slate-300" />
          </div>
          <h3 class="text-lg font-bold text-[#1B2559] mb-1">No files here</h3>
          <p class="text-sm text-slate-400 mb-4">
            Upload files or create a subfolder
          </p>
          <BaseButton variant="primary" @click="triggerInput">
            <Upload :size="18" />
            Upload Files
          </BaseButton>
        </div>
      </div>

      <!-- Right Sidebar (File Details) -->
    </div>

    <!-- New Folder Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showNewFolderModal"
          class="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="showNewFolderModal = false"
          ></div>
          <div
            class="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <h2 class="text-xl font-black text-[#1B2559] mb-6">
              Create New Folder
            </h2>
            <div class="space-y-4">
              <div>
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
                  >Folder Name</label
                >
                <input
                  v-model="newFolderName"
                  type="text"
                  class="input-field"
                  placeholder="e.g. Blog Images"
                  autofocus
                />
              </div>
              <div>
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
                  >Parent Folder</label
                >
                <select v-model="newFolderParent" class="select-field">
                  <option :value="null">Root (No Parent)</option>
                  <option
                    v-for="folder in allFolders"
                    :key="folder.id"
                    :value="folder.id"
                  >
                    {{ getFolderPath(folder.id) }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex gap-3 mt-8">
              <BaseButton
                variant="secondary"
                class="flex-1"
                @click="showNewFolderModal = false"
                >Cancel
              </BaseButton>
              <BaseButton variant="primary" class="flex-1" @click="createFolder"
                >Create Folder
              </BaseButton>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- File Details Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="selectedFile"
          class="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="selectedFile = null"
          ></div>

          <!-- Modal Content -->
          <div
            class="relative bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
          >
            <!-- Left: Image Preview -->
            <div
              class="w-full md:w-3/5 bg-slate-900 flex items-center justify-center relative group p-8 min-h-[300px]"
            >
              <img
                v-if="isImage(selectedFile.type)"
                :src="selectedFile.url"
                class="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
              />
              <div
                v-else
                class="flex flex-col items-center justify-center text-white gap-4"
              >
                <div
                  class="w-32 h-32 rounded-3xl bg-white/10 flex items-center justify-center backdrop-blur-md"
                >
                  <component :is="getFileIcon(selectedFile.type)" :size="64" />
                </div>
                <p
                  class="text-sm font-bold opacity-60 uppercase tracking-widest"
                >
                  {{ selectedFile.type }}
                </p>
              </div>

              <!-- Overlay Actions -->
              <div class="absolute top-4 right-4 flex gap-2">
                <button
                  @click="copyUrl(selectedFile.url)"
                  class="p-2 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-lg backdrop-blur-md transition-all"
                  title="Copy URL"
                >
                  <Copy :size="16" />
                </button>
                <a
                  :href="selectedFile.url"
                  target="_blank"
                  class="p-2 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-lg backdrop-blur-md transition-all"
                  title="Open Original"
                >
                  <ExternalLink :size="16" />
                </a>
              </div>
            </div>

            <!-- Right: Details Form -->
            <div
              class="w-full md:w-2/5 flex flex-col border-l border-slate-100 bg-white"
            >
              <!-- Header -->
              <div
                class="p-6 border-b border-slate-100 flex items-center justify-between"
              >
                <div>
                  <h3 class="text-lg font-black text-[#1B2559]">
                    File Details
                  </h3>
                  <p
                    class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1"
                  >
                    Manage Asset & SEO
                  </p>
                </div>
                <button
                  @click="selectedFile = null"
                  class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 text-slate-400 transition-colors"
                >
                  <X :size="18" />
                </button>
              </div>

              <!-- Scrollable Content -->
              <div class="flex-1 overflow-y-auto p-6 space-y-6">
                <div class="grid grid-cols-2 gap-4">
                  <div
                    class="bg-slate-50 p-3 rounded-xl border border-slate-100"
                  >
                    <p
                      class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1"
                    >
                      File Size
                    </p>
                    <p class="text-xs font-bold text-[#1B2559]">
                      {{ formatBytes(selectedFile.size) }}
                    </p>
                  </div>
                  <div
                    class="bg-slate-50 p-3 rounded-xl border border-slate-100"
                  >
                    <p
                      class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1"
                    >
                      Type
                    </p>
                    <p class="text-xs font-bold text-[#1B2559] uppercase">
                      {{ selectedFile.name.split(".").pop() || "IMG" }}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
                    >File Name</label
                  >
                  <div
                    class="p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 break-all"
                  >
                    {{ selectedFile.name }}
                  </div>
                </div>

                <div>
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
                    >Alt Text (SEO)</label
                  >
                  <textarea
                    v-model="selectedFile.alt"
                    rows="5"
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-[#702DFF]/20 focus:border-[#702DFF] outline-none placeholder:text-slate-400 transition-all resize-none"
                    placeholder="Describe this image for search engines..."
                  ></textarea>
                  <p
                    class="text-[9px] text-slate-400 mt-2 flex items-center gap-1.5"
                  >
                    <Info :size="12" />
                    Important for accessibility and SEO ranking.
                  </p>
                </div>
              </div>

              <!-- Footer Actions -->
              <div class="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
                <button
                  @click="
                    handleDeleteMedia(selectedFile.id);
                    selectedFile = null;
                  "
                  class="flex-1 py-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 :size="16" />
                  Delete File
                </button>
                <button
                  @click="saveAltText(selectedFile)"
                  :disabled="savingAlt"
                  class="flex-1 py-3 rounded-xl bg-[#1B2559] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#2c3b87] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span v-if="savingAlt">Saving...</span>
                  <span v-else>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showMoveModal"
          class="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="showMoveModal = false"
          ></div>
          <div
            class="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <h2 class="text-xl font-black text-[#1B2559] mb-2">Move File</h2>
            <p class="text-sm text-slate-500 mb-6">
              Moving:
              <span class="font-bold text-[#1B2559]">{{
                moveTarget?.name
              }}</span>
            </p>
            <div>
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
                >Destination Folder</label
              >
              <select v-model="moveDestination" class="select-field">
                <option :value="null">Root (No Folder)</option>
                <option
                  v-for="folder in allFolders"
                  :key="folder.id"
                  :value="folder.id"
                >
                  {{ getFolderPath(folder.id) }}
                </option>
              </select>
            </div>
            <div class="flex gap-3 mt-8">
              <BaseButton
                variant="secondary"
                class="flex-1"
                @click="showMoveModal = false"
                >Cancel
              </BaseButton>
              <BaseButton variant="primary" class="flex-1" @click="moveFile"
                >Move Here</BaseButton
              >
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Toast -->
    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />

    <!-- Mobile Folder Drawer (Show/Hide Sidebar) -->
    <Transition name="fade">
      <div
        v-if="showMobileFolderDrawer"
        @click="showMobileFolderDrawer = false"
        class="fixed inset-0 z-50 bg-[#1B2559]/40 backdrop-blur-sm lg:hidden"
      ></div>
    </Transition>

    <Transition name="slide-left">
      <div
        v-if="showMobileFolderDrawer"
        class="fixed inset-y-0 left-0 z-50 w-full max-w-[300px] bg-white shadow-2xl lg:hidden flex flex-col pt-safe"
      >
        <div
          class="p-6 border-b border-slate-50 flex items-center justify-between"
        >
          <div>
            <h3
              class="text-sm font-black text-[#1B2559] uppercase tracking-widest"
            >
              Library Explorer
            </h3>
            <p class="text-[10px] text-slate-400 font-bold mt-1">
              Manage your categories
            </p>
          </div>
          <button
            @click="showMobileFolderDrawer = false"
            class="btn-ghost w-10 h-10"
          >
            <X :size="20" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div class="space-y-4">
            <!-- Root Option -->
            <button
              @click="
                selectFolder(null);
                showMobileFolderDrawer = false;
              "
              class="w-full flex items-center gap-3 p-3 rounded-2xl transition-all"
              :class="
                !selectedFolderId
                  ? 'bg-indigo-50 text-[#702DFF]'
                  : 'hover:bg-slate-50 text-slate-600'
              "
            >
              <Database
                :size="18"
                :class="!selectedFolderId ? 'text-[#702DFF]' : 'text-slate-400'"
              />
              <span class="text-xs font-black uppercase tracking-widest"
                >All Repository</span
              >
            </button>

            <!-- Folder Tree -->
            <div class="pt-2 border-t border-slate-50">
              <FolderItem
                v-for="folder in rootFolders"
                :key="folder.id"
                :folder="folder"
                :all-folders="allFolders"
                :selected-id="selectedFolderId"
                :level="0"
                @select="
                  selectFolder($event);
                  showMobileFolderDrawer = false;
                "
                @delete="handleDeleteFolder"
              />
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-6 bg-slate-50/50 border-t border-slate-50">
          <BaseButton
            variant="primary"
            class="w-full"
            @click="
              showNewFolderModal = true;
              showMobileFolderDrawer = false;
            "
          >
            <FolderPlus :size="18" />
            New Category
          </BaseButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, provide } from "vue";
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
import {
  Upload,
  Plus,
  Copy,
  Trash2,
  FolderPlus,
  Folder,
  FolderInput,
  ChevronRight,
  Search,
  Grid3x3,
  List,
  Database,
  Image as ImageIcon,
  X,
  Info,
  ExternalLink,
  Loader2,
  Video,
  FileText,
  Music,
  File,
} from "lucide-vue-next";
import PageHeader from "../components/ui/PageHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import AdminCard from "../components/ui/AdminCard.vue";
import Toast from "../components/ui/Toast.vue";
import FolderItem from "../components/media/FolderItem.vue";
import { sanityClient, sanityWriteClient } from "@kangjessy/database";
import type { MediaFolder, MediaItem } from "../types";

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("md");
const isTablet = breakpoints.smaller("lg");

const fileInput = ref<HTMLInputElement | null>(null);
const loading = ref(false);
const viewMode = ref<"grid" | "list">("grid");
const searchQuery = ref("");
const selectedFolderId = ref<string | null>(null);
const selectedFile = ref<MediaItem | null>(null);
const savingAlt = ref(false);
const showMobileFolderDrawer = ref(false);
const filterType = ref<"all" | "images" | "videos" | "documents">("all");
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

// Modals
const showNewFolderModal = ref(false);
const newFolderName = ref("");
const newFolderParent = ref<string | null>(null);

const showMoveModal = ref(false);
const moveTarget = ref<MediaItem | null>(null);
const moveDestination = ref<string | null>(null);

// Initial folder structure
const folders = ref<MediaFolder[]>([
  { id: "blog", name: "Blog", parentId: null, createdAt: "2026-01-01" },
  {
    id: "blog-covers",
    name: "Covers",
    parentId: "blog",
    createdAt: "2026-01-01",
  },
  {
    id: "blog-content",
    name: "Content Images",
    parentId: "blog",
    createdAt: "2026-01-01",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    parentId: null,
    createdAt: "2026-01-01",
  },
  {
    id: "portfolio-thumbnails",
    name: "Thumbnails",
    parentId: "portfolio",
    createdAt: "2026-01-01",
  },
  {
    id: "portfolio-galleries",
    name: "Galleries",
    parentId: "portfolio",
    createdAt: "2026-01-01",
  },
  { id: "products", name: "Products", parentId: null, createdAt: "2026-01-01" },
  {
    id: "products-ebooks",
    name: "E-Books",
    parentId: "products",
    createdAt: "2026-01-01",
  },
  {
    id: "products-courses",
    name: "E-Courses",
    parentId: "products",
    createdAt: "2026-01-01",
  },
  { id: "branding", name: "Branding", parentId: null, createdAt: "2026-01-01" },
  {
    id: "branding-logos",
    name: "Logos",
    parentId: "branding",
    createdAt: "2026-01-01",
  },
  {
    id: "branding-icons",
    name: "Icons",
    parentId: "branding",
    createdAt: "2026-01-01",
  },
  { id: "misc", name: "Misc", parentId: null, createdAt: "2026-01-01" },
]);

provide("folders", folders);

// Sample media items
// Media Items (Fetched from Sanity)
const mediaItems = ref<MediaItem[]>([]);

const maxStorage = 1024 * 1024 * 1024; // 1GB

// Computed
const allFolders = computed(() => folders.value);

const rootFolders = computed(() =>
  folders.value.filter((f) => f.parentId === null),
);

const totalMediaCount = computed(() => mediaItems.value.length);

const totalSize = computed(() =>
  mediaItems.value.reduce((sum, m) => sum + m.size, 0),
);

const currentSubfolders = computed(() => {
  return folders.value.filter((f) => f.parentId === selectedFolderId.value);
});

const breadcrumbs = computed(() => {
  if (!selectedFolderId.value) return [];
  const crumbs: MediaFolder[] = [];
  let current = folders.value.find((f) => f.id === selectedFolderId.value);
  while (current) {
    crumbs.unshift(current);
    current = current.parentId
      ? folders.value.find((f) => f.id === current!.parentId)
      : undefined;
  }
  return crumbs;
});

const filteredMedia = computed(() => {
  let items = mediaItems.value;

  // Filter by folder
  if (selectedFolderId.value !== null) {
    // Include items in this folder and all subfolders
    const folderIds = getDescendantFolderIds(selectedFolderId.value);
    folderIds.push(selectedFolderId.value);
    items = items.filter((m) => folderIds.includes(m.folderId || ""));
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter((m) => m.name.toLowerCase().includes(query));
  }

  // Type filter
  if (filterType.value !== "all") {
    items = items.filter((m) => {
      if (filterType.value === "images") return isImage(m.type);
      if (filterType.value === "videos") return m.type?.startsWith("video/");
      if (filterType.value === "documents") {
        return (
          m.type?.includes("pdf") ||
          m.type?.includes("msword") ||
          m.type?.includes("officedocument") ||
          m.type?.includes("text/")
        );
      }
      return true;
    });
  }

  return items;
});

const isImage = (type?: string) => type?.startsWith("image/");

const getFileIcon = (type?: string) => {
  if (!type) return File;
  if (type.startsWith("video/")) return Video;
  if (type.startsWith("audio/")) return Music;
  if (type.includes("pdf")) return FileText;
  if (
    type.includes("msword") ||
    type.includes("officedocument") ||
    type.includes("text/")
  )
    return FileText;
  return File;
};

// Methods
const getDescendantFolderIds = (parentId: string): string[] => {
  const children = folders.value.filter((f) => f.parentId === parentId);
  let ids: string[] = children.map((c) => c.id);
  children.forEach((child) => {
    ids = ids.concat(getDescendantFolderIds(child.id));
  });
  return ids;
};

const getFolderItemCount = (folderId: string): number => {
  const folderIds = getDescendantFolderIds(folderId);
  folderIds.push(folderId);
  return mediaItems.value.filter((m) => folderIds.includes(m.folderId || ""))
    .length;
};

const getFolderPath = (folderId: string): string => {
  const parts: string[] = [];
  let current = folders.value.find((f) => f.id === folderId);
  while (current) {
    parts.unshift(current.name);
    current = current.parentId
      ? folders.value.find((f) => f.id === current!.parentId)
      : undefined;
  }
  return parts.join(" / ");
};

const fetchMediaData = async () => {
  loading.value = true;
  try {
    // 1. Fetch Folders
    const folderQuery = `*[_type == "mediaFolder"] | order(name asc){
      "id": _id,
      name,
      parentId,
      "createdAt": _createdAt
    }`;
    const remoteFolders = await (sanityClient as any).fetch(folderQuery);

    // Merge remote folders with hardcoded defaults (avoiding duplicates)
    const defaultIds = new Set(folders.value.map((f) => f.id));
    const uniqueRemote = remoteFolders.filter(
      (rf: any) => !defaultIds.has(rf.id),
    );
    folders.value = [...folders.value, ...uniqueRemote];

    // 2. Fetch Media
    const mediaQuery = `*[_type == "media"] | order(_createdAt desc){
      "id": _id,
      name,
      alt,
      "url": coalesce(image.asset->url, file.asset->url),
      "assetId": coalesce(image.asset._ref, file.asset._ref),
      size,
      folderId,
      "createdAt": _createdAt,
      type
    }`;
    const fetchedItems = await (sanityClient as any).fetch(mediaQuery);
    mediaItems.value = fetchedItems.map((item: any) => ({
      ...item,
      url: item.url || "", // Force empty string instead of null
    }));
  } catch (e) {
    console.error("Fetch failed", e);
    showToast("Failed to sync media repository", "error");
  } finally {
    loading.value = false;
  }
};

const selectFolder = (folderId: string | null) => {
  selectedFolderId.value = folderId;
};

const onFolderSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  selectFolder(target.value || null);
};

const setFilterType = (type: string) => {
  filterType.value = type as any;
};

const triggerInput = () => fileInput.value?.click();

import { validateImage, optimizeImage } from "../utils/imageOptimizer";

const handleFileUpload = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files || files.length === 0) return;

  loading.value = true;
  let successCount = 0;
  let failCount = 0;
  let lastError = "";

  try {
    for (const file of Array.from(files)) {
      const isImageFile = file.type.startsWith("image/");
      let asset;

      try {
        if (isImageFile) {
          const validation = await validateImage(file);
          if (!validation.valid) {
            lastError = validation.error || "Image quality too low";
            showToast(lastError, "error");
            failCount++;
            continue;
          }
          const optimizedFile = await optimizeImage(file);
          asset = await (sanityWriteClient as any).assets.upload(
            "image",
            optimizedFile,
            { filename: optimizedFile.name },
          );
        } else {
          asset = await (sanityWriteClient as any).assets.upload("file", file, {
            filename: file.name,
          });
        }

        if (!asset || !asset._id) throw new Error("Cloud upload failed");

        const doc: any = {
          _type: "media",
          name: file.name,
          folderId: selectedFolderId.value,
          size: file.size,
          type: file.type,
        };

        if (isImageFile) {
          doc.image = {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          };
        } else {
          doc.file = {
            _type: "file",
            asset: { _type: "reference", _ref: asset._id },
          };
        }

        await (sanityWriteClient as any).create(doc);
        successCount++;
      } catch (err) {
        console.error("Single file upload failed:", err);
        failCount++;
      }
    }

    if (successCount > 0) {
      showToast(`${successCount} aset berhasil diupload!`, "success");
      await fetchMediaData();
    } else if (failCount > 0) {
      showToast("Gagal mengupload beberapa aset.", "error");
    }
  } catch (err: any) {
    console.error("Global Upload Error:", err);
    showToast("Gagal mengupload: " + (err.message || "Error server"), "error");
  } finally {
    loading.value = false;
    if (fileInput.value) fileInput.value.value = "";
  }
};

const createFolder = async () => {
  if (!newFolderName.value.trim()) return;

  const name = newFolderName.value.trim();
  const parentId = newFolderParent.value || selectedFolderId.value;

  try {
    // Persist to Sanity
    const doc = {
      _type: "mediaFolder",
      name: name,
      parentId: parentId,
    };

    const created = await (sanityWriteClient as any).create(doc);

    const newFolder: MediaFolder = {
      id: created._id,
      name: name,
      parentId: parentId,
      createdAt: created._createdAt || new Date().toISOString(),
    };

    folders.value.push(newFolder);
    showNewFolderModal.value = false;
    newFolderName.value = "";
    newFolderParent.value = null;
    showToast("Folder berhasil dibuat!", "success");
  } catch (e: any) {
    showToast("Gagal membuat folder: " + e.message, "error");
  }
};

const handleDeleteFolder = async (folderId: string) => {
  if (!confirm("Hapus folder ini? File di dalamnya akan dipindah ke Root."))
    return;

  const descendantIds = getDescendantFolderIds(folderId);
  descendantIds.push(folderId);

  try {
    // 1. Move files in Sanity (optional but good for consistency)
    const affectedMedia = mediaItems.value.filter((m) =>
      descendantIds.includes(m.folderId || ""),
    );
    for (const m of affectedMedia) {
      await (sanityWriteClient as any)
        .patch(m.id)
        .set({ folderId: null })
        .commit();
      m.folderId = null;
    }

    // 2. Delete folders in Sanity
    for (const fid of descendantIds) {
      // Only delete if it's a remote folder (standard IDs don't start with 'blog' etc)
      if (
        !["blog", "portfolio", "products", "branding", "misc"].includes(fid)
      ) {
        await (sanityWriteClient as any).delete(fid);
      }
    }

    // 3. Update local state
    folders.value = folders.value.filter((f) => !descendantIds.includes(f.id));
    if (
      selectedFolderId.value &&
      descendantIds.includes(selectedFolderId.value)
    ) {
      selectedFolderId.value = null;
    }

    showToast("Folder berhasil dihapus", "success");
  } catch (e: any) {
    showToast("Gagal menghapus folder: " + e.message, "error");
  }
};

const handleDeleteMedia = async (mediaId: string) => {
  if (!confirm("Hapus file ini secara permanen?")) return;

  // Optimistic update
  const previousItems = [...mediaItems.value];
  mediaItems.value = mediaItems.value.filter((m) => m.id !== mediaId);

  try {
    await (sanityWriteClient as any).delete(mediaId);
    showToast("Aset berhasil dihapus", "success");
  } catch (e) {
    console.error("Delete failed", e);
    showToast("Gagal menghapus dari server", "error");
    mediaItems.value = previousItems; // Revert
  }
};

const openMoveModal = (item: MediaItem) => {
  moveTarget.value = item;
  moveDestination.value = item.folderId;
  showMoveModal.value = true;
};

const moveFile = async () => {
  if (!moveTarget.value) return;

  const targetId = moveTarget.value.id;
  const newFolderId = moveDestination.value;
  const previousFolderId = moveTarget.value.folderId;

  // Optimistic update
  const item = mediaItems.value.find((m) => m.id === targetId);
  if (item) {
    item.folderId = newFolderId;
  }

  showMoveModal.value = false;
  moveTarget.value = null;

  try {
    const update = newFolderId ? { folderId: newFolderId } : { folderId: null };
    await (sanityWriteClient as any).patch(targetId).set(update).commit();
    showToast("File berhasil dipindah", "success");
  } catch (e) {
    console.error("Move failed", e);
    showToast("Gagal memindah file", "error");
    if (item) item.folderId = previousFolderId;
  }
};

const saveAltText = async (item: MediaItem) => {
  if (!item.id) return;
  savingAlt.value = true;
  try {
    await (sanityWriteClient as any)
      .patch(item.id)
      .set({ alt: item.alt || "" })
      .commit();
    showToast("Teks Alt berhasil disimpan", "success");
  } catch (e) {
    console.error("Failed to save alt text", e);
    showToast("Gagal menyimpan perubahan", "error");
  } finally {
    savingAlt.value = false;
  }
};

const copyUrl = (url: string) => {
  if (!url) {
    showToast("URL tidak tersedia", "error");
    return;
  }
  navigator.clipboard.writeText(url);
  showToast("URL berhasil disalin!", "success");
};

const formatBytes = (bytes: number): string => {
  if (!bytes) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1024 * 1024 * 1024)
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
};

const formatDate = (date: string): string => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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

onMounted(async () => {
  fetchMediaData();
});
</script>

<style scoped>
@reference "../style.css";

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Base Bento Styles */
.card {
  @apply bg-white rounded-[32px] border border-slate-100 shadow-sm transition-all;
}

.input-field {
  @apply w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559] transition-all bg-white;
}

.select-field {
  @apply w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559] transition-all bg-white cursor-pointer;
}

.btn-ghost {
  @apply flex items-center justify-center rounded-xl transition-all text-slate-400 hover:bg-slate-50 hover:text-[#702DFF];
}

/* Custom Table for Bento */
.table-main {
  @apply w-full;
}

.table-main thead tr {
  @apply bg-slate-50/50 border-b border-slate-100;
}

.table-main th {
  @apply py-3 px-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest;
}

.table-main tbody tr {
  @apply border-t border-slate-50 hover:bg-slate-50/50 transition-colors;
}

.table-main td {
  @apply py-3 px-4;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  @apply transition-transform duration-300 ease-out;
}
.slide-left-enter-from,
.slide-left-leave-to {
  @apply -translate-x-full;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-100 rounded-full;
}

.pt-safe {
  padding-top: env(safe-area-inset-top);
}
</style>
