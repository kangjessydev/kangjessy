<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-[200]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-5xl transform overflow-hidden rounded-[24px] bg-white text-left align-middle shadow-xl transition-all border border-slate-100 flex flex-col h-[80vh]"
            >
              <!-- Header -->
              <div
                class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10"
              >
                <h3 class="text-lg font-black text-[#1B2559]">Select Media</h3>
                <button
                  @click="closeModal"
                  class="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X :size="20" />
                </button>
              </div>

              <!-- Main Content Area -->
              <div class="flex flex-1 overflow-hidden">
                <!-- Sidebar (Folders) -->
                <div
                  class="w-64 border-r border-slate-100 bg-[#FAFCFE] flex flex-col p-4 overflow-y-auto"
                >
                  <button
                    @click="selectFolder(null)"
                    class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold w-full mb-2 transition-colors"
                    :class="
                      selectedFolderId === null
                        ? 'bg-[#702DFF] text-white'
                        : 'text-slate-500 hover:bg-slate-100'
                    "
                  >
                    <LayoutGrid :size="16" />
                    <span>All Files</span>
                  </button>

                  <div class="space-y-1">
                    <p
                      class="px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 mt-4"
                    >
                      Folders
                    </p>
                    <FolderItem
                      v-for="folder in rootFolders"
                      :key="folder.id"
                      :folder="folder"
                      :all-folders="folders"
                      :selected-id="selectedFolderId"
                      :level="0"
                      @select="selectFolder"
                    />
                  </div>
                </div>

                <!-- Media Grid -->
                <div class="flex-1 flex flex-col bg-white">
                  <!-- Toolbar -->
                  <div
                    class="px-6 py-3 border-b border-slate-100 flex items-center justify-between gap-4"
                  >
                    <!-- Search -->
                    <div class="relative flex-1 max-w-md">
                      <Search
                        :size="16"
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search media..."
                        class="pl-9 pr-4 py-2 bg-slate-50 rounded-xl text-sm font-medium w-full focus:ring-2 focus:ring-[#702DFF]/20 border-none placeholder:text-slate-400"
                      />
                    </div>

                    <!-- Upload Action -->
                    <label class="btn btn-primary cursor-pointer gap-2">
                      <Upload :size="16" />
                      <span class="hidden sm:inline">Upload New</span>
                      <input
                        type="file"
                        class="hidden"
                        @change="handleUpload"
                        accept="image/*"
                      />
                    </label>
                  </div>

                  <!-- Grid Content -->
                  <div
                    class="flex-1 overflow-y-auto p-6 bg-[#F4F7FE]/50 relative"
                  >
                    <!-- Loading State -->
                    <div
                      v-if="loading"
                      class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10"
                    >
                      <Loader2 :size="32" class="animate-spin text-[#702DFF]" />
                    </div>

                    <!-- Items Grid -->
                    <div
                      v-if="filteredMedia.length > 0"
                      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4"
                    >
                      <div
                        v-for="item in filteredMedia"
                        :key="item.id"
                        @click="selectMedia(item)"
                        class="group relative aspect-square rounded-2xl border-2 overflow-hidden cursor-pointer transition-all hover:shadow-lg"
                        :class="
                          selectedMedia?.id === item.id
                            ? 'border-[#702DFF] ring-2 ring-[#702DFF]/20'
                            : 'border-transparent bg-white'
                        "
                      >
                        <img
                          :src="item.url"
                          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <!-- Selected Checkmark -->
                        <div
                          v-if="selectedMedia?.id === item.id"
                          class="absolute top-2 right-2 w-6 h-6 bg-[#702DFF] rounded-full flex items-center justify-center shadow-md z-10"
                        >
                          <Check :size="14" class="text-white" />
                        </div>

                        <!-- Hover Info -->
                        <div
                          class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform"
                        >
                          <p class="text-white text-xs font-bold truncate">
                            {{ item.name }}
                          </p>
                          <p class="text-white/70 text-[10px]">
                            {{ formatSize(item.size) }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Empty State -->
                    <div
                      v-else
                      class="h-full flex flex-col items-center justify-center text-slate-400"
                    >
                      <Image :size="48" class="mb-4 opacity-50" />
                      <p class="font-bold">No media found</p>
                    </div>
                  </div>
                </div>

                <!-- Right Sidebar (Info & Alt Text) -->
                <div
                  v-if="selectedMedia"
                  class="w-72 border-l border-slate-100 bg-white flex flex-col p-6 animate-in slide-in-from-right duration-300"
                >
                  <h4
                    class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4"
                  >
                    Media Details
                  </h4>

                  <div
                    class="aspect-video rounded-xl overflow-hidden bg-slate-50 border border-slate-100 mb-4"
                  >
                    <img
                      :src="selectedMedia.url"
                      class="w-full h-full object-contain"
                    />
                  </div>

                  <div class="space-y-4 flex-1">
                    <div>
                      <label
                        class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5"
                        >File Name</label
                      >
                      <p class="text-xs font-bold text-[#1B2559] break-all">
                        {{ selectedMedia.name }}
                      </p>
                    </div>

                    <div>
                      <label
                        class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5"
                        >Alt Text (SEO)</label
                      >
                      <textarea
                        v-model="selectedMedia.alt"
                        rows="3"
                        class="w-full bg-slate-50 border-none rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-[#702DFF]/20 outline-none placeholder:text-slate-300 transition-all resize-none"
                        placeholder="Deskripsikan gambar ini untuk SEO..."
                      ></textarea>
                      <p
                        class="text-[8px] text-slate-400 mt-1 font-bold italic uppercase"
                      >
                        Penting untuk aksesibilitas
                      </p>
                    </div>

                    <button
                      @click="saveAltText"
                      :disabled="savingAlt"
                      class="w-full py-2.5 bg-slate-100 hover:bg-[#702DFF] text-slate-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                    >
                      <span v-if="savingAlt">Saving...</span>
                      <span v-else>Update Alt Text</span>
                    </button>
                  </div>

                  <div
                    class="pt-4 border-t border-slate-100 mt-auto flex flex-col gap-2"
                  >
                    <button
                      @click="confirmSelection"
                      class="btn btn-primary w-full py-3 rounded-xl text-sm justify-center shadow-lg shadow-indigo-500/20"
                    >
                      Insert Selected
                    </button>
                    <p
                      class="text-[9px] text-slate-400 font-bold uppercase text-center mt-2"
                    >
                      {{ formatSize(selectedMedia.size) }} •
                      {{ selectedMedia.type?.split("/")[1]?.toUpperCase() }}
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <Toast
    v-if="toast.show"
    :message="toast.message"
    :variant="toast.variant"
    @close="toast.show = false"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import {
  X,
  Search,
  Upload,
  LayoutGrid,
  Image,
  Loader2,
  Check,
} from "lucide-vue-next";
import FolderItem from "./FolderItem.vue";
import Toast from "../ui/Toast.vue";
import { sanityClient, sanityWriteClient } from "@kangjessy/database";
import type { MediaFolder, MediaItem } from "../../types";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close", "select"]);

// -- State --
const selectedFolderId = ref<string | null>(null);
const selectedMedia = ref<MediaItem | null>(null);
const searchQuery = ref("");
const loading = ref(false);
const savingAlt = ref(false);

const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});
const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
  if (variant === "success") {
    setTimeout(() => {
      toast.value.show = false;
    }, 3000);
  }
};

// -- Data --
const folders = ref<MediaFolder[]>([]);
const mediaItems = ref<MediaItem[]>([]);

// -- Lifecycle --
onMounted(async () => {
  // Initial hardcoded folders (same as Media.vue)
  folders.value = [
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
    {
      id: "products",
      name: "Products",
      parentId: null,
      createdAt: "2026-01-01",
    },
    {
      id: "branding",
      name: "Branding",
      parentId: null,
      createdAt: "2026-01-01",
    },
    { id: "misc", name: "Misc", parentId: null, createdAt: "2026-01-01" },
  ];
  await fetchMedia();
});

// -- Methods --
const fetchMedia = async () => {
  loading.value = true;
  try {
    // 1. Fetch Remote Folders
    const folderQuery = `*[_type == "mediaFolder"] | order(name asc){
      "id": _id,
      name,
      parentId,
      "createdAt": _createdAt
    }`;
    const remoteFolders = await (sanityClient as any).fetch(folderQuery);

    // Merge
    const defaultIds = new Set(folders.value.map((f) => f.id));
    const uniqueRemote = remoteFolders.filter(
      (rf: any) => !defaultIds.has(rf.id),
    );
    folders.value = [...folders.value, ...uniqueRemote];

    // 2. Fetch Media
    const query = `*[_type == "media"] | order(_createdAt desc){
            "id": _id,
            name,
            alt,
            "url": image.asset->url,
            "assetId": image.asset._ref,
            folderId,
            size,
            type,
            "createdAt": _createdAt
        }`;
    const data = await (sanityClient as any).fetch(query);
    mediaItems.value = data.map((item: any) => ({
      ...item,
      url: item.url || "",
    }));
  } catch (e) {
    console.error("Fetch media failed", e);
  } finally {
    loading.value = false;
  }
};

const rootFolders = computed(() =>
  folders.value.filter((f) => f.parentId === null),
);

const filteredMedia = computed(() => {
  let items = mediaItems.value;
  if (selectedFolderId.value) {
    items = items.filter((i) => i.folderId === selectedFolderId.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    items = items.filter((i) => i.name.toLowerCase().includes(q));
  }
  return items;
});

const selectFolder = (id: string | null) => {
  selectedFolderId.value = id;
  selectedMedia.value = null;
};

const selectMedia = (item: MediaItem) => {
  selectedMedia.value = item;
};

const closeModal = () => {
  emit("close");
  selectedMedia.value = null;
};

const confirmSelection = () => {
  if (selectedMedia.value) {
    const result = {
      ...selectedMedia.value,
      id: selectedMedia.value.assetId || selectedMedia.value.id,
      alt: selectedMedia.value.alt || "",
    };
    emit("select", result);
    closeModal();
  }
};

const saveAltText = async () => {
  if (!selectedMedia.value || !selectedMedia.value.id) return;

  savingAlt.value = true;
  try {
    await (sanityWriteClient as any)
      .patch(selectedMedia.value.id)
      .set({ alt: selectedMedia.value.alt || "" })
      .commit();
    showToast("Alt text tervalidasi");
  } catch (e) {
    console.error("Failed to save alt text", e);
    showToast("Gagal update teks alt", "error");
  } finally {
    savingAlt.value = false;
  }
};

const formatSize = (bytes: number) => {
  if (!bytes && bytes !== 0) return "Unknown";
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

import { validateImage, optimizeImage } from "../../utils/imageOptimizer";

const handleUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  loading.value = true;
  try {
    // 1. Validate
    const validation = await validateImage(file);
    if (!validation.valid) {
      showToast(validation.error || "Resolusi gambar terlalu rendah", "error");
      loading.value = false;
      input.value = "";
      return;
    }

    // 2. Optimize
    const optimizedFile = await optimizeImage(file);

    // 3. Upload Asset
    const asset = await (sanityWriteClient as any).assets.upload(
      "image",
      optimizedFile,
      { filename: optimizedFile.name },
    );

    if (!asset || !asset._id) throw new Error("Cloud synchronization failed");

    // 4. Create Document
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

    // 5. Successful Update
    const newItem: MediaItem = {
      id: createdDoc._id,
      assetId: asset._id,
      name: optimizedFile.name,
      url: asset.url || "",
      folderId: selectedFolderId.value,
      size: optimizedFile.size,
      type: optimizedFile.type,
      createdAt: new Date().toISOString(),
    };

    mediaItems.value.unshift(newItem);
    selectMedia(newItem);
    showToast("Aset berhasil diupload & disinkronkan");
  } catch (error: any) {
    console.error("Upload failed", error);
    showToast(`Upload gagal: ${error.message}`, "error");
  } finally {
    loading.value = false;
    input.value = "";
  }
};
</script>
