<template>
  <div class="page-container">
    <PageHeader
      title="Blog Categories"
      subtitle="Organize your articles into meaningful topics"
    >
      <BaseButton variant="primary" @click="openAddModal">
        <Plus :size="18" />
        Add Category
      </BaseButton>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Categories List -->
      <AdminCard
        title="All Categories"
        no-padding
        class="lg:col-span-2 overflow-hidden rounded-[32px]!"
      >
        <BentoTable
          :columns="[
            { key: 'name', label: 'Category Name' },
            { key: 'slug', label: 'Slug' },
            { key: 'posts', label: 'Posts' },
            { key: 'actions', label: 'Actions', align: 'right' },
          ]"
          :items="categories"
          :loading="loading"
          empty-title="No categories found"
          empty-message="Organize your articles into meaningful topics."
          :empty-icon="Search"
        >
          <!-- Custom Name Cell -->
          <template #cell-name="{ item }">
            <span class="font-black text-[#1B2559] leading-tight">{{
              item.name
            }}</span>
          </template>

          <!-- Custom Slug Cell -->
          <template #cell-slug="{ item }">
            <code
              class="text-[10px] bg-slate-50/50 px-2 py-1 rounded-lg text-slate-400 font-bold uppercase tracking-widest border border-slate-100/50"
            >
              {{ item.slug }}
            </code>
          </template>

          <!-- Custom Posts Cell -->
          <template #cell-posts>
            <span
              class="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100/50"
            >
              12 Posts
            </span>
          </template>

          <!-- Actions Cell -->
          <template #cell-actions="{ item }">
            <div class="flex items-center justify-end gap-1">
              <button
                @click="handleEdit(item)"
                class="p-2.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all"
                title="Edit Category"
              >
                <Edit2 :size="16" />
              </button>
              <button
                @click="openDeleteConfirm(item)"
                class="p-2.5 rounded-xl text-slate-200 hover:text-rose-600 hover:bg-rose-50 transition-all"
                title="Delete Category"
              >
                <Trash2 :size="16" />
              </button>
            </div>
          </template>
        </BentoTable>
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
      class="fixed inset-0 z-1000 flex items-center justify-center p-6 bg-[#1B2559]/40 backdrop-blur-sm"
      @click.self="showAddModal = false"
    >
      <div
        class="bg-white w-full max-w-md p-8 shadow-2xl rounded-[32px]! animate-scale-in"
      >
        <h3 class="text-2xl font-black text-[#1B2559] mb-6">
          {{ isEditing ? "Edit Category" : "New Category" }}
        </h3>
        <div class="space-y-4 mb-8">
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1"
              >Category Name</label
            >
            <input
              v-model="newCat.name"
              @input="updateSlug"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
              placeholder="e.g. Digital Marketing"
            />
          </div>
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1"
              >Slug</label
            >
            <input
              v-model="newCat.slug"
              type="text"
              class="w-full px-4 py-3 rounded-xl border border-slate-100 focus:border-[#702DFF] outline-none text-sm font-bold text-[#1B2559]"
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

    <!-- Confirm Modal -->
    <ConfirmModal
      :is-open="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      variant="danger"
      confirm-text="Delete Category"
      @close="confirmModal.isOpen = false"
      @confirm="executeDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus, Edit2, Trash2, Info, Search } from "lucide-vue-next";
import { blogService } from "../services/blogService";
import type { BlogCategory } from "../types";
import PageHeader from "../components/ui/PageHeader.vue";
import BentoTable from "../components/ui/BentoTable.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import { BaseButton } from "@kangjessy/ui";
import ConfirmModal from "../components/ui/ConfirmModal.vue";

const categories = ref<BlogCategory[]>([]);
const loading = ref(true);
const showAddModal = ref(false);
const isEditing = ref(false);
const currentId = ref<string | null>(null);
const newCat = ref({ name: "", slug: "" });
const confirmModal = ref({
  isOpen: false,
  title: "",
  message: "",
  targetId: null as string | null,
});

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
    if (isEditing.value && currentId.value) {
      const updated = await blogService.updateCategory(
        currentId.value,
        newCat.value,
      );
      const index = categories.value.findIndex((c) => c.id === currentId.value);
      if (index !== -1) categories.value[index] = updated;
    } else {
      const saved = await blogService.createCategory(newCat.value);
      categories.value.unshift(saved);
    }
    showAddModal.value = false;
    newCat.value = { name: "", slug: "" };
  } catch (err) {
    // Fallback for demo
    if (isEditing.value && currentId.value) {
      const index = categories.value.findIndex((c) => c.id === currentId.value);
      if (index !== -1)
        categories.value[index] = { id: currentId.value, ...newCat.value };
    } else {
      categories.value.unshift({ id: Date.now().toString(), ...newCat.value });
    }
    showAddModal.value = false;
    newCat.value = { name: "", slug: "" };
  }
};

const handleEdit = (c: any) => {
  isEditing.value = true;
  currentId.value = c.id;
  newCat.value = { name: c.name, slug: c.slug };
  showAddModal.value = true;
};

const openDeleteConfirm = (cat: BlogCategory) => {
  confirmModal.value = {
    isOpen: true,
    title: "Delete Category?",
    message: `Are you sure you want to delete "${cat.name}"? Articles in this category might become uncategorized.`,
    targetId: cat.id,
  };
};

const executeDelete = async () => {
  const id = confirmModal.value.targetId;
  confirmModal.value.isOpen = false;
  if (!id) return;

  try {
    await blogService.deleteCategory(id);
    categories.value = categories.value.filter((c) => c.id !== id);
  } catch (err) {
    console.error(err);
    categories.value = categories.value.filter((c) => c.id !== id);
  }
};

const openAddModal = () => {
  isEditing.value = false;
  currentId.value = null;
  newCat.value = { name: "", slug: "" };
  showAddModal.value = true;
};

onMounted(fetchCategories);
</script>
