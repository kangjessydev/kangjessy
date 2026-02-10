<template>
  <div class="page-container">
    <PageHeader
      title="Portfolio Areas"
      subtitle="Categorize your projects by development expertise"
    >
      <BaseButton variant="primary" @click="showAddModal = true">
        <Plus :size="18" />
        Add Area
      </BaseButton>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Areas List -->
      <AdminCard title="Project Areas" no-padding class="lg:col-span-2">
        <div v-if="loading" class="p-20 text-center">
          <div
            class="inline-block w-8 h-8 border-4 border-[#702DFF] border-t-transparent rounded-full animate-spin"
          ></div>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="table-main">
            <thead>
              <tr>
                <th>Area Name</th>
                <th>Slug</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="area in areas"
                :key="area.id"
                class="table-row-hover group"
              >
                <td class="font-bold text-[#1B2559]">{{ area.name }}</td>
                <td>
                  <code
                    class="text-[10px] bg-slate-50 px-2 py-1 rounded text-slate-400 font-bold uppercase"
                    >{{ area.slug }}</code
                  >
                </td>
                <td>
                  <div
                    class="flex items-center justify-end gap-2 transition-all"
                  >
                    <button @click="handleEdit(area)" class="btn-ghost w-8 h-8">
                      <Edit2 :size="14" />
                    </button>
                    <button
                      @click="handleDelete(area.id)"
                      class="btn-ghost w-8 h-8 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 :size="14" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="areas.length === 0">
                <td colspan="3" class="p-12 text-center text-slate-400 text-sm">
                  No areas found. Add your first development area!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminCard>

      <!-- Quick Tips -->
      <AdminCard title="Expertise Layout">
        <div class="space-y-6">
          <div
            class="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50"
          >
            <h4
              class="text-xs font-black text-indigo-700 uppercase tracking-widest mb-2 flex items-center gap-2"
            >
              <Briefcase :size="14" /> Logic
            </h4>
            <p class="text-xs text-indigo-900/70 leading-relaxed">
              Areas represent your core services like AI, Full Stack, or Mobile
              Apps.
            </p>
          </div>
          <div
            class="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50"
          >
            <h4
              class="text-xs font-black text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-2"
            >
              <Target :size="14" /> Precision
            </h4>
            <p class="text-xs text-emerald-900/70 leading-relaxed">
              Well-defined areas help clients find relevant case studies
              quickly.
            </p>
          </div>
        </div>
      </AdminCard>
    </div>

    <!-- Add Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#1B2559]/20 backdrop-blur-sm"
    >
      <div class="card w-full max-w-md p-8 shadow-2xl">
        <h3 class="heading-lg mb-6">New Portfolio Area</h3>
        <div class="space-y-4 mb-8">
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
              >Area Name</label
            >
            <input
              v-model="newArea.name"
              @input="updateSlug"
              type="text"
              class="input-field"
              placeholder="e.g. Artificial Intelligence"
            />
          </div>
          <div>
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
              >Slug</label
            >
            <input
              v-model="newArea.slug"
              type="text"
              class="input-field"
              placeholder="ai-automation"
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
          <BaseButton variant="primary" class="flex-1" @click="saveArea"
            >Save Area</BaseButton
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
import { Plus, Edit2, Trash2, Briefcase, Target } from "lucide-vue-next";
import { portfolioService } from "../services/portfolioService";
import PageHeader from "../components/ui/PageHeader.vue";
import AdminCard from "../components/ui/AdminCard.vue";
import { BaseButton } from "@kangjessy/ui";
import Toast from "../components/ui/Toast.vue";

const areas = ref<any[]>([]);
const loading = ref(true);
const showAddModal = ref(false);
const newArea = ref({ name: "", slug: "" });
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const fetchAreas = async () => {
  loading.value = true;
  try {
    areas.value = await portfolioService.getAreas();
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const updateSlug = () => {
  newArea.value.slug = newArea.value.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const showToast = (
  message: string,
  variant: "success" | "error" = "success",
) => {
  toast.value = { show: true, message, variant };
};

const saveArea = async () => {
  if (!newArea.value.name) return;
  try {
    const saved = await portfolioService.createArea(newArea.value);
    areas.value.unshift(saved);
    showAddModal.value = false;
    newArea.value = { name: "", slug: "" };
    showToast("Area created successfully");
  } catch (err) {
    showToast("Failed to save area", "error");
  }
};

const handleEdit = (a: any) => console.log("Edit", a);

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this area?")) return;
  try {
    await portfolioService.deleteArea(id);
    areas.value = areas.value.filter((a) => a.id !== id);
    showToast("Area deleted");
  } catch (err) {
    showToast("Delete failed", "error");
  }
};

onMounted(fetchAreas);
</script>
