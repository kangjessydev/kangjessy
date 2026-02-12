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
        <BaseButton variant="primary" @click="triggerInput">
          <Upload :size="18" />
          Upload Files
        </BaseButton>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          multiple
          accept="image/*"
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
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 mb-6 text-[11px] font-bold">
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
              class="transition-colors"
            >
              {{ crumb.name }}
            </button>
          </div>
        </div>

        <!-- View Toggle & Search -->
        <div class="flex items-center justify-between mb-6">
          <div class="relative flex-1 max-w-xs">
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
          <div class="flex gap-2 bg-slate-100 p-1 rounded-xl">
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

          <!-- Grid View -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <!-- Upload Placeholder -->
            <div
              @click="triggerInput"
              class="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#702DFF] hover:bg-indigo-50/30 transition-all group"
            >
              <div
                class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-[#702DFF] transition-all"
              >
                <Plus :size="20" />
              </div>
              <span
                class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >Upload</span
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
              <img
                :src="item.url"
                :alt="item.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-[#1B2559]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]"
              >
                <p
                  class="text-[9px] font-black text-white uppercase tracking-widest px-3 text-center truncate w-full"
                >
                  {{ item.name }}
                </p>
                <div class="flex gap-2">
                  <button
                    @click.stop="copyUrl(item.url)"
                    class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white text-white hover:text-[#1B2559] flex items-center justify-center transition-all"
                    title="Copy URL"
                  >
                    <Copy :size="14" />
                  </button>
                  <button
                    @click.stop="openMoveModal(item)"
                    class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white text-white hover:text-[#1B2559] flex items-center justify-center transition-all"
                    title="Move"
                  >
                    <FolderInput :size="14" />
                  </button>
                  <button
                    @click.stop="handleDeleteMedia(item.id)"
                    class="w-8 h-8 rounded-lg bg-white/10 hover:bg-rose-500 text-white flex items-center justify-center transition-all"
                    title="Delete"
                  >
                    <Trash2 :size="14" />
                  </button>
                </div>
                <p class="text-[8px] text-white/60 mt-1">
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
                        class="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0"
                      >
                        <img
                          :src="item.url"
                          class="w-full h-full object-cover"
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
              class="w-full md:w-3/5 bg-slate-900 flex items-center justify-center relative group p-8"
            >
              <img
                :src="selectedFile.url"
                class="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
              />

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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
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
} from "lucide-vue-next";
import PageHeader from "../components/ui/PageHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import AdminCard from "../components/ui/AdminCard.vue";
import Toast from "../components/ui/Toast.vue";
import FolderItem from "../components/media/FolderItem.vue";
import { sanityClient, sanityWriteClient } from "@kangjessy/database";
import type { MediaFolder, MediaItem } from "../types";

const fileInput = ref<HTMLInputElement | null>(null);
const loading = ref(false);
const viewMode = ref<"grid" | "list">("grid");
const searchQuery = ref("");
const selectedFolderId = ref<string | null>(null);
const selectedFile = ref<MediaItem | null>(null);
const savingAlt = ref(false);
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

  return items;
});

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
      "url": image.asset->url,
      "assetId": image.asset._ref,
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

const triggerInput = () => fileInput.value?.click();

import { validateImage, optimizeImage } from "../utils/imageOptimizer";

const handleFileUpload = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files || files.length === 0) return;

  loading.value = true;
  try {
    for (const file of Array.from(files)) {
      // 1. Validate
      const validation = await validateImage(file);
      if (!validation.valid) {
        showToast(validation.error || "Image quality too low", "error");
        continue;
      }

      // 2. Optimize
      const optimizedFile = await optimizeImage(file);

      // 3. Upload Asset
      const asset = await (sanityWriteClient as any).assets.upload(
        "image",
        optimizedFile,
        { filename: optimizedFile.name },
      );

      if (!asset || !asset._id) throw new Error("Cloud upload failed");

      // 4. Create Media Document
      const doc = {
        _type: "media",
        name: optimizedFile.name,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
        folderId: selectedFolderId.value,
        size: optimizedFile.size,
        type: optimizedFile.type,
      };

      const createdDoc = await (sanityWriteClient as any).create(doc);

      // 5. Reactive Update (Success)
      const newItem: MediaItem = {
        id: createdDoc._id,
        assetId: asset._id,
        name: optimizedFile.name,
        url: asset.url || "", // Use asset.url directly from upload response
        size: optimizedFile.size,
        folderId: selectedFolderId.value,
        createdAt: new Date().toISOString(),
        type: optimizedFile.type,
      };

      mediaItems.value.unshift(newItem);
    }
    showToast("Galleri Media disinkronkan!", "success");
  } catch (err: any) {
    console.error("Upload Error:", err);
    showToast("Gagal mengupload aset: " + err.message, "error");
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
