<template>
  <div class="page-container">
    <PageHeader
      title="Article Tags"
      subtitle="Detailed labeling for granular article discovery"
    >
      <BaseButton variant="primary" @click="showAddModal = true">
        <Plus :size="18" />
        Add Tag
      </BaseButton>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <AdminCard
        title="Popular Tags"
        no-padding
        class="lg:col-span-2 overflow-hidden rounded-[32px]!"
      >
        <BentoTable
          :columns="[
            { key: 'name', label: 'Tag Name' },
            { key: 'slug', label: 'Slug' },
            { key: 'actions', label: 'Actions', align: 'right' },
          ]"
          :items="tags"
          :loading="loading"
          empty-title="No tags found"
          empty-message="Detailed labeling for granular discovery."
          :empty-icon="Hash"
        >
          <!-- Custom Name Cell -->
          <template #cell-name="{ item }">
            <div class="flex items-center gap-2">
              <Hash :size="14" class="text-indigo-400" />
              <span class="font-black text-[#1B2559]">{{ item.name }}</span>
            </div>
          </template>

          <!-- Custom Slug Cell -->
          <template #cell-slug="{ item }">
            <code
              class="text-[10px] bg-slate-50 px-2 py-1 rounded-lg text-slate-400 font-bold uppercase tracking-widest border border-slate-100/50"
            >
              {{ item.slug }}
            </code>
          </template>

          <!-- Actions Cell -->
          <template #cell-actions="{ item }">
            <div class="flex items-center justify-end gap-1">
              <button
                @click="openDeleteConfirm(item)"
                class="p-2.5 rounded-xl text-slate-200 hover:text-rose-600 hover:bg-rose-50 transition-all"
                title="Delete Tag"
              >
                <Trash2 :size="16" />
              </button>
            </div>
          </template>
        </BentoTable>
      </AdminCard>

      <AdminCard title="Tag Cloud">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in tags"
            :key="tag.id"
            class="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-100/50 hover:bg-[#702DFF] hover:text-white hover:border-[#702DFF] transition-all cursor-pointer"
          >
            #{{ tag.name }}
          </span>
        </div>
      </AdminCard>
    </div>

    <!-- Add Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-1000 flex items-center justify-center p-6 bg-[#1B2559]/40 backdrop-blur-sm"
      @click.self="showAddModal = false"
    >
      <div
        class="bg-white w-full max-w-md p-8 shadow-2xl rounded-[32px]! animate-scale-in"
      >
        <h3 class="text-2xl font-black text-[#1B2559] mb-6">Create New Tag</h3>
        <div class="space-y-4 mb-8">
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1"
              >Tag Name</label
            >
            <input
              v-model="newTag.name"
              @input="updateSlug"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
              placeholder="e.g. TailwindCSS"
            />
          </div>
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1"
              >Slug</label
            >
            <input
              v-model="newTag.slug"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
              placeholder="tailwindcss"
            />
          </div>
        </div>
        <div class="flex gap-3">
          <BaseButton
            variant="secondary"
            class="flex-1"
            @click="showAddModal = false"
            >Cancel</BaseButton
          >
          <BaseButton variant="primary" class="flex-1" @click="saveTag"
            >Add Tag</BaseButton
          >
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      confirm-text="Delete Tag"
      @close="confirmModal.isOpen = false"
      @confirm="executeDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus, Hash, Trash2 } from "lucide-vue-next";
import { blogService } from "../services/blogService";
import type { BlogTag } from "../types";
import PageHeader from "../components/ui/PageHeader.vue";
import BentoTable from "../components/ui/BentoTable.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import { BaseButton } from "@kangjessy/ui";
import ConfirmModal from "../components/ui/ConfirmModal.vue";

const tags = ref<BlogTag[]>([]);
const loading = ref(true);
const showAddModal = ref(false);
const newTag = ref({ name: "", slug: "" });
const confirmModal = ref({
  isOpen: false,
  title: "",
  message: "",
  targetId: null as string | null,
});

const fetchTags = async () => {
  loading.value = true;
  try {
    tags.value = await blogService.getTags();
  } catch (err) {
    console.error(err);
    tags.value = [
      { id: "1", name: "Vue.js", slug: "vuejs" },
      { id: "2", name: "Supabase", slug: "supabase" },
      { id: "3", name: "UI Design", slug: "ui-design" },
      { id: "4", name: "Case Study", slug: "case-study" },
    ];
  } finally {
    loading.value = false;
  }
};

const updateSlug = () => {
  newTag.value.slug = newTag.value.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const saveTag = async () => {
  if (!newTag.value.name) return;
  try {
    const saved = await blogService.createTag(newTag.value);
    tags.value.unshift(saved);
    showAddModal.value = false;
    newTag.value = { name: "", slug: "" };
  } catch (err) {
    tags.value.unshift({ id: Date.now().toString(), ...newTag.value });
    showAddModal.value = false;
    newTag.value = { name: "", slug: "" };
  }
};

const openDeleteConfirm = (tag: BlogTag) => {
  confirmModal.value = {
    isOpen: true,
    title: "Delete Tag?",
    message: `Are you sure you want to delete "#${tag.name}"? This will remove the label from all articles.`,
    targetId: tag.id,
  };
};

const executeDelete = async () => {
  const id = confirmModal.value.targetId;
  confirmModal.value.isOpen = false;
  if (!id) return;

  try {
    await blogService.deleteTag(id);
    tags.value = tags.value.filter((t) => t.id !== id);
  } catch (err) {
    console.error(err);
    // Optimistic fallback for demo
    tags.value = tags.value.filter((t) => t.id !== id);
  }
};

onMounted(fetchTags);
</script>
