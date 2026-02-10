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
      <AdminCard title="Popular Tags" no-padding class="lg:col-span-2">
        <div v-if="loading" class="p-20 text-center">
          <div
            class="inline-block w-8 h-8 border-4 border-[#702DFF] border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="table-main">
            <thead>
              <tr>
                <th>Tag Name</th>
                <th>Slug</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="tag in tags"
                :key="tag.id"
                class="table-row-hover group"
              >
                <td>
                  <div class="flex items-center gap-2">
                    <Hash :size="14" class="text-slate-300" />
                    <span class="font-bold text-[#1B2559]">{{ tag.name }}</span>
                  </div>
                </td>
                <td>
                  <code
                    class="text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-400 font-bold uppercase"
                    >{{ tag.slug }}</code
                  >
                </td>
                <td>
                  <div
                    class="flex items-center justify-end gap-2 transition-all"
                  >
                    <button
                      @click="handleDelete(tag.id)"
                      class="btn-ghost w-8 h-8 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 :size="14" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

    <!-- Simple Add Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#1B2559]/20 backdrop-blur-sm"
    >
      <div class="card w-full max-w-md p-8 shadow-2xl">
        <h3 class="heading-lg mb-6">Create New Tag</h3>
        <div class="space-y-4 mb-8">
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
              >Tag Name</label
            >
            <input
              v-model="newTag.name"
              @input="updateSlug"
              type="text"
              class="input-field"
              placeholder="e.g. TailwindCSS"
            />
          </div>
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
              >Slug</label
            >
            <input
              v-model="newTag.slug"
              type="text"
              class="input-field"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus, Hash, Trash2 } from "lucide-vue-next";
import { blogService } from "../services/blogService";
import type { BlogTag } from "../types";
import PageHeader from "../components/ui/PageHeader.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import { BaseButton } from "@kangjessy/ui";

const tags = ref<BlogTag[]>([]);
const loading = ref(true);
const showAddModal = ref(false);
const newTag = ref({ name: "", slug: "" });

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

const handleDelete = (id: string) => {
  if (confirm("Delete tag?"))
    tags.value = tags.value.filter((t) => t.id !== id);
};

onMounted(fetchTags);
</script>
