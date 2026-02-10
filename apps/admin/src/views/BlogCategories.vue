<template>
  <div class="page-container">
    <PageHeader
      title="Blog Categories"
      subtitle="Organize your articles into meaningful topics"
    >
      <BaseButton variant="primary" @click="showAddModal = true">
        <Plus :size="18" />
        Add Category
      </BaseButton>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Categories List -->
      <AdminCard title="All Categories" no-padding class="lg:col-span-2">
        <div v-if="loading" class="p-20 text-center">
          <div
            class="inline-block w-8 h-8 border-4 border-[#702DFF] border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="table-main">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Posts</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cat in categories"
                :key="cat.id"
                class="table-row-hover group"
              >
                <td class="font-bold text-[#1B2559]">{{ cat.name }}</td>
                <td>
                  <code
                    class="text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-400 font-bold uppercase"
                    >{{ cat.slug }}</code
                  >
                </td>
                <td><span class="badge-chip badge-gray">12 Posts</span></td>
                <td>
                  <div
                    class="flex items-center justify-end gap-2 transition-all"
                  >
                    <button @click="handleEdit(cat)" class="btn-ghost w-8 h-8">
                      <Edit2 :size="14" />
                    </button>
                    <button
                      @click="handleDelete(cat.id)"
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

      <!-- Quick Tips -->
      <AdminCard title="Hierarchy Tips">
        <div class="space-y-6">
          <div
            class="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50"
          >
            <h4
              class="text-xs font-black text-indigo-700 uppercase tracking-widest mb-2 flex items-center gap-2"
            >
              <Info :size="14" /> Planning
            </h4>
            <p class="text-xs text-indigo-900/70 leading-relaxed">
              Use broad categories for the main navigation and tags for specific
              details.
            </p>
          </div>
          <div
            class="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50"
          >
            <h4
              class="text-xs font-black text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-2"
            >
              <Search :size="14" /> SEO Benefit
            </h4>
            <p class="text-xs text-emerald-900/70 leading-relaxed">
              Consistent categories help search engines understand your site
              structure.
            </p>
          </div>
        </div>
      </AdminCard>
    </div>

    <!-- Simple Add Modal Placeholder -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#1B2559]/20 backdrop-blur-sm"
    >
      <div class="card w-full max-w-md p-8 shadow-2xl">
        <h3 class="heading-lg mb-6">New Category</h3>
        <div class="space-y-4 mb-8">
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
              >Category Name</label
            >
            <input
              v-model="newCat.name"
              @input="updateSlug"
              type="text"
              class="input-field"
              placeholder="e.g. Digital Marketing"
            />
          </div>
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
              >Slug</label
            >
            <input
              v-model="newCat.slug"
              type="text"
              class="input-field"
              placeholder="digital-marketing"
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
          <BaseButton variant="primary" class="flex-1" @click="saveCategory"
            >Save Category</BaseButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus, Edit2, Trash2, Info, Search } from "lucide-vue-next";
import { blogService } from "../services/blogService";
import type { BlogCategory } from "../types";
import PageHeader from "../components/ui/PageHeader.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import { BaseButton } from "@kangjessy/ui";

const categories = ref<BlogCategory[]>([]);
const loading = ref(true);
const showAddModal = ref(false);
const newCat = ref({ name: "", slug: "" });

const fetchCategories = async () => {
  loading.value = true;
  try {
    categories.value = await blogService.getCategories();
  } catch (err) {
    console.error(err);
    categories.value = [
      { id: "1", name: "Design", slug: "design" },
      { id: "2", name: "Development", slug: "development" },
      { id: "3", name: "Business", slug: "business" },
    ];
  } finally {
    loading.value = false;
  }
};

const updateSlug = () => {
  newCat.value.slug = newCat.value.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const saveCategory = async () => {
  if (!newCat.value.name) return;
  try {
    const saved = await blogService.createCategory(newCat.value);
    categories.value.unshift(saved);
    showAddModal.value = false;
    newCat.value = { name: "", slug: "" };
  } catch (err) {
    alert("Failed to save to database, showing as success for demo.");
    categories.value.unshift({ id: Date.now().toString(), ...newCat.value });
    showAddModal.value = false;
    newCat.value = { name: "", slug: "" };
  }
};

const handleEdit = (c: any) => console.log("Edit", c);
const handleDelete = async (id: string) => {
  if (confirm("Delete category?")) {
    categories.value = categories.value.filter((c) => c.id !== id);
  }
};

onMounted(fetchCategories);
</script>
