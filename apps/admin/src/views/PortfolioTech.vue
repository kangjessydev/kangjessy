<template>
  <div class="page-container">
    <PageHeader
      title="Tech Stack"
      subtitle="Manage the technologies used across your projects"
    >
      <BaseButton variant="primary" @click="showAddModal = true">
        <Plus :size="18" />
        Add Technology
      </BaseButton>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Tech List -->
      <DashboardCard title="All Technologies" no-padding class="lg:col-span-2">
        <div v-if="loading" class="p-20 text-center">
          <div
            class="inline-block w-8 h-8 border-4 border-[#702DFF] border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="table-main">
            <thead>
              <tr>
                <th>Technology</th>
                <th>Slug</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="tech in technologies"
                :key="tech.id"
                class="table-row-hover group"
              >
                <td>
                  <div class="flex items-center gap-2">
                    <Code :size="14" class="text-slate-300" />
                    <span class="font-bold text-[#1B2559]">{{
                      tech.name
                    }}</span>
                  </div>
                </td>
                <td>
                  <code
                    class="text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-400 font-bold uppercase"
                    >{{ tech.slug }}</code
                  >
                </td>
                <td>
                  <div
                    class="flex items-center justify-end gap-2 transition-all"
                  >
                    <button
                      @click="handleDelete(tech.id)"
                      class="btn-ghost w-8 h-8 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 :size="14" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="technologies.length === 0">
                <td colspan="3" class="p-12 text-center text-slate-400 text-sm">
                  No technologies found. Grow your stack!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DashboardCard>

      <DashboardCard title="Stack Highlights">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in technologies"
            :key="tech.id"
            class="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-100/50 hover:bg-[#702DFF] hover:text-white hover:border-[#702DFF] transition-all cursor-pointer"
          >
            {{ tech.name }}
          </span>
        </div>
      </DashboardCard>
    </div>

    <!-- Add Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#1B2559]/20 backdrop-blur-sm"
    >
      <div class="card w-full max-w-md p-8 shadow-2xl">
        <h3 class="heading-lg mb-6">Create New Technology</h3>
        <div class="space-y-4 mb-8">
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
              >Tech Name</label
            >
            <input
              v-model="newTech.name"
              @input="updateSlug"
              type="text"
              class="input-field"
              placeholder="e.g. Next.js"
            />
          </div>
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
              >Slug</label
            >
            <input
              v-model="newTech.slug"
              type="text"
              class="input-field"
              placeholder="nextjs"
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
          <BaseButton variant="primary" class="flex-1" @click="saveTech"
            >Add to Stack</BaseButton
          >
        </div>
      </div>
    </div>

    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus, Code, Trash2 } from "lucide-vue-next";
import { portfolioService } from "../services/portfolioService";
import PageHeader from "../components/ui/PageHeader.vue";
import DashboardCard from "../components/ui/DashboardCard.vue";
import { BaseButton } from "@kangjessy/ui";
import Toast from "../components/ui/Toast.vue";

const technologies = ref<any[]>([]);
const loading = ref(true);
const showAddModal = ref(false);
const newTech = ref({ name: "", slug: "" });
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const fetchTech = async () => {
  loading.value = true;
  try {
    technologies.value = await portfolioService.getTechnologies();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
};

const updateSlug = () => {
  newTech.value.slug = newTech.value.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const saveTech = async () => {
  if (!newTech.value.name) return;
  try {
    const saved = await portfolioService.createTechnology(newTech.value);
    technologies.value.unshift(saved);
    showAddModal.value = false;
    newTech.value = { name: "", slug: "" };
    showToast("Technology added to stack");
  } catch (err) {
    showToast("Failed to save technology", "error");
  }
};

const handleDelete = async (id: string) => {
  if (!confirm("Eliminate this tech from the stack?")) return;
  try {
    await portfolioService.deleteTechnology(id);
    technologies.value = technologies.value.filter((t) => t.id !== id);
    showToast("Tech removed");
  } catch (err) {
    showToast("Delete failed", "error");
  }
};

onMounted(fetchTech);
</script>
