<template>
  <div
    class="page-container max-w-7xl mx-auto pb-24 relative px-4 sm:px-6 lg:px-8"
  >
    <!-- Background Decor -->
    <div
      class="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-100/30 blur-[120px] rounded-full opacity-50"
    ></div>
    <div
      class="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-blue-50/40 blur-[100px] rounded-full opacity-40"
    ></div>
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6"
    >
      <div class="flex items-center gap-4">
        <button
          @click="$router.back()"
          class="p-2.5 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-all text-slate-400 hover:text-indigo-600 shadow-sm"
        >
          <ArrowLeft :size="20" />
        </button>
        <div>
          <nav
            class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-1.5 ml-0.5"
          >
            <span>Production</span>
            <ChevronRight :size="10" class="opacity-30" />
            <span class="text-[#7029FF] brightness-90">Projects</span>
          </nav>
          <h1
            class="text-3xl lg:text-4xl font-black text-[#1B2559] leading-tight tracking-tight drop-shadow-sm"
          >
            {{ pageTitle }}
          </h1>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <BaseButton
          v-if="isEdit"
          variant="secondary"
          @click="openWhatsAppModal"
        >
          <MessageCircle :size="18" />
          Share Update
        </BaseButton>
        <div
          class="flex items-center bg-white border border-slate-100 rounded-2xl p-1 gap-1 shadow-sm"
        >
          <BaseButton
            variant="secondary"
            :loading="saving && !isClosing"
            @click="handleSave(false)"
            class="!border-none !shadow-none !px-4 hover:!bg-slate-50"
          >
            <Save :size="16" />
            <span class="hidden sm:inline">Simpan</span>
          </BaseButton>
          <div class="w-px h-6 bg-slate-100 mx-1"></div>
          <BaseButton
            variant="primary"
            :loading="saving && isClosing"
            @click="handleSave(true)"
            class="!rounded-xl !px-6 shadow-indigo-200"
          >
            {{ isEdit ? "Simpan & Close" : "Start Project" }}
          </BaseButton>
        </div>
      </div>
    </div>

    <div
      v-if="loading"
      class="card p-24 text-center bg-white/50 backdrop-blur-md !rounded-[40px] border-slate-100 shadow-xl"
    >
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-50 border-t-[#702DFF]"
      ></div>
      <p
        class="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]"
      >
        Assembling Project Boards...
      </p>
    </div>

    <template v-else>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Main Form Column (8) -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Project Context -->
          <AdminCard
            title="Project Foundation"
            class="shadow-2xl shadow-indigo-500/5 bg-white/70 backdrop-blur-xl !rounded-[40px] border-none"
            :stretch="false"
          >
            <div class="space-y-6">
              <div class="space-y-1.5">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                  >Project Active Name</label
                >
                <BaseInput
                  v-model="formData.name"
                  placeholder="Acme Inc - Web Revamp"
                  :icon="Layout"
                />
              </div>

              <div class="relative group">
                <select
                  v-model="formData.order_id"
                  @change="onOrderSelect"
                  class="select-field group-hover:border-indigo-100 transition-all !text-[11px] !font-black !py-3"
                >
                  <option :value="undefined">
                    No Linked Order (Internal/Friend)
                  </option>
                  <option
                    v-for="order in availableOrders"
                    :key="order.id"
                    :value="order.id"
                  >
                    {{ order.name }} - {{ order.project_name || "Project" }}
                  </option>
                </select>
                <ChevronDown
                  :size="16"
                  class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#7029FF] transition-colors"
                />
              </div>
              <p
                v-if="!isEdit"
                class="text-[9px] text-slate-300 font-bold uppercase mt-1"
              >
                Note: Only shows DEAL orders that aren't converted yet.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1.5">
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                    >Start Projection</label
                  >
                  <BaseInput
                    v-model="formData.start_date"
                    type="date"
                    :icon="Calendar"
                  />
                </div>
                <div class="space-y-1.5">
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                    >Target Deadline</label
                  >
                  <BaseInput
                    v-model="formData.deadline"
                    type="date"
                    :icon="Clock"
                  />
                </div>
              </div>
            </div>
          </AdminCard>

          <!-- Technical & Deliverables -->
          <AdminCard
            title="Deliverables & Assets"
            :stretch="false"
            class="shadow-2xl shadow-indigo-500/5 bg-white/70 backdrop-blur-xl !rounded-[40px] border-none"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                  >Figma/Design Link</label
                >
                <BaseInput
                  v-model="formData.figma_url"
                  placeholder="https://figma.com/..."
                />
              </div>
              <div class="space-y-1.5">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                  >GitHub Repository</label
                >
                <BaseInput
                  v-model="formData.github_url"
                  placeholder="https://github.com/..."
                />
              </div>
              <div
                class="md:col-span-2 space-y-6 pt-4 border-t border-slate-50 mt-2"
              >
                <AdminTextarea
                  v-model="formData.brief"
                  label="Core Brief & Objective"
                  placeholder="What is the main goal and requirements for this project?"
                />
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AdminTextarea
                    v-model="formData.visual_style"
                    label="Visual Style & Mood"
                    placeholder="Premium, minimal, dark mode, high contrast, typography focused..."
                  />
                  <AdminTextarea
                    v-model="formData.timeline_notes"
                    label="Timeline & Delivery Notes"
                    placeholder="Milestone deadlines, specific meeting schedules..."
                  />
                </div>
              </div>
            </div>
          </AdminCard>

          <!-- Task & Milestone Management -->
          <AdminCard
            title="Production Roadmap"
            :stretch="false"
            class="shadow-2xl shadow-indigo-500/5 bg-white/70 backdrop-blur-xl !rounded-[40px] border-none overflow-hidden pb-8"
          >
            <template #header-action>
              <div class="flex items-center gap-4">
                <div class="relative group/tpl">
                  <button
                    class="px-4 py-2 bg-indigo-50 text-[#7029FF] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-100 transition-all flex items-center gap-2 border border-indigo-100 shadow-sm"
                  >
                    <Wand2 :size="14" />
                    Apply Template
                  </button>
                  <!-- Template Dropdown -->
                  <div
                    class="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-100 shadow-2xl rounded-3xl p-3 opacity-0 invisible group-hover/tpl:opacity-100 group-hover/tpl:visible transition-all z-40"
                  >
                    <div
                      class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-3 px-2"
                    >
                      Roadmap Presets
                    </div>
                    <button
                      v-for="tpl in projectTemplates"
                      :key="tpl.name"
                      @click="applyTemplate(tpl)"
                      class="w-full text-left p-3 rounded-2xl hover:bg-slate-50/50 transition-all group border border-transparent hover:border-indigo-100 mb-1 last:mb-0"
                    >
                      <p
                        class="text-xs font-black text-[#1B2559] group-hover:text-[#7029FF] line-clamp-1"
                      >
                        {{ tpl.name }}
                      </p>
                      <p class="text-[9px] font-medium text-slate-400 mt-0.5">
                        {{ tpl.description }}
                      </p>
                    </button>
                  </div>
                </div>

                <div class="h-4 w-px bg-slate-100"></div>

                <span
                  class="text-[10px] font-black text-[#7029FF] px-4 py-1.5 bg-indigo-50/50 border border-indigo-100/50 rounded-full uppercase tracking-widest shadow-sm"
                >
                  {{ completedTasksCount }} / {{ tasks.length }} COMPLETED
                </span>
              </div>
            </template>

            <div class="space-y-8">
              <!-- Add New Milestone Group -->
              <div
                class="flex gap-2 p-4 bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl"
              >
                <input
                  v-model="newPhaseName"
                  type="text"
                  placeholder="Add new Task List (e.g. BRIEF, DESIGN, DEV)..."
                  class="input-field !py-3 flex-1 !bg-white"
                  @keyup.enter="addPhase"
                />
                <BaseButton
                  variant="secondary"
                  @click="addPhase"
                  :disabled="!newPhaseName.trim()"
                >
                  <Layers :size="18" />
                  Add Milestone
                </BaseButton>
              </div>

              <!-- Grouped Tasks by Phase -->
              <div
                v-for="(phaseTasks, phaseName) in groupedTasks"
                :key="phaseName"
                class="space-y-4"
              >
                <div
                  class="flex items-center justify-between border-b border-slate-100 pb-2"
                >
                  <div class="flex items-center gap-3">
                    <!-- Collapse Toggle -->
                    <button
                      @click="togglePhase(phaseName)"
                      class="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-400 transition-all"
                    >
                      <ChevronDown
                        v-if="!isPhaseCollapsed(phaseName)"
                        :size="14"
                      />
                      <ChevronRight v-else :size="14" />
                    </button>

                    <!-- Icon Picker -->
                    <div class="relative">
                      <button
                        @click.stop="
                          activeIconPicker =
                            activeIconPicker === phaseName ? null : phaseName
                        "
                        class="w-8 h-8 rounded-lg bg-indigo-50 text-[#702DFF] flex items-center justify-center hover:bg-indigo-100 transition-all border border-indigo-100 shadow-sm"
                      >
                        <component :is="getPhaseIcon(phaseName)" :size="16" />
                      </button>
                      <!-- Icon Dropdown -->
                      <div
                        v-if="activeIconPicker === phaseName"
                        class="absolute left-0 top-full mt-2 w-48 bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 transition-all z-30 grid grid-cols-4 gap-1"
                      >
                        <button
                          v-for="(icon, icon_name) in availableIcons"
                          :key="icon_name"
                          @click="setPhaseIcon(phaseName, String(icon_name))"
                          class="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-[#702DFF] transition-all"
                        >
                          <component :is="icon" :size="18" />
                        </button>
                      </div>
                    </div>

                    <div class="flex-1 min-w-0">
                      <input
                        v-if="editingPhase === phaseName"
                        v-model="phaseEditName"
                        @blur="savePhaseName(phaseName)"
                        @keyup.enter="savePhaseName(phaseName)"
                        class="text-[13px] font-black text-[#7029FF] uppercase tracking-[0.1em] bg-transparent outline-none w-full"
                        v-focus
                      />
                      <h4
                        v-else
                        @click="startEditingPhase(phaseName)"
                        class="text-[13px] font-black text-[#1B2559] uppercase tracking-[0.1em] leading-tight cursor-text hover:text-[#702DFF] transition-colors truncate"
                      >
                        {{ phaseName }}
                      </h4>
                      <div class="flex items-center gap-1.5 mt-0.5">
                        <div
                          class="w-16 h-1 bg-slate-100 rounded-full overflow-hidden"
                        >
                          <div
                            class="h-full bg-[#7029FF] rounded-full transition-all"
                            :style="{
                              width: getPhaseProgress(phaseTasks) + '%',
                            }"
                          ></div>
                        </div>
                        <span
                          class="text-[8px] font-black text-slate-400 uppercase tracking-tighter"
                          >{{ getPhaseProgress(phaseTasks) }}% DONE</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <button
                      @click="movePhase(phaseName, 'up')"
                      class="p-1.5 text-slate-300 hover:text-[#7029FF] hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      <ChevronUp :size="14" />
                    </button>
                    <button
                      @click="movePhase(phaseName, 'down')"
                      class="p-1.5 text-slate-300 hover:text-[#7029FF] hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      <ChevronDown :size="14" />
                    </button>
                    <div class="w-px h-4 bg-slate-100 mx-1"></div>
                    <button
                      @click="deletePhase(phaseName)"
                      class="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <Trash2 :size="14" />
                    </button>
                  </div>
                </div>

                <div
                  v-show="!isPhaseCollapsed(phaseName)"
                  class="space-y-3 pl-10 relative"
                >
                  <!-- Hierarchy Line -->
                  <div
                    class="absolute left-[27px] top-0 bottom-10 w-px bg-slate-100 pointer-events-none"
                  ></div>

                  <div
                    v-for="task in phaseTasks"
                    :key="task.id"
                    class="relative flex items-center gap-3 p-2.5 bg-white border border-slate-100 rounded-2xl group/task transition-all hover:border-indigo-100 hover:shadow-sm"
                    :class="{ 'opacity-60 grayscale-[0.5]': task.is_completed }"
                  >
                    <!-- Horizontal Branch Line -->
                    <div
                      class="absolute -left-[13px] top-1/2 -translate-y-1/2 w-[13px] h-px bg-slate-100 pointer-events-none"
                    ></div>

                    <button
                      @click.stop="toggleTask(task)"
                      class="w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 relative z-10 cursor-pointer"
                      :class="
                        isTaskCompleted(task)
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'bg-white border-slate-200 hover:border-[#7029FF] hover:shadow-lg hover:shadow-indigo-500/10'
                      "
                    >
                      <Check
                        :size="12"
                        v-if="isTaskCompleted(task)"
                        stroke-width="4"
                      />
                    </button>

                    <div class="flex-1 min-w-0">
                      <input
                        v-if="editingTask === task.id"
                        v-model="taskEditTitle"
                        @blur="saveTaskTitle(task)"
                        @keyup.enter="saveTaskTitle(task)"
                        class="text-[11px] font-bold text-[#7029FF] bg-transparent outline-none w-full"
                        v-focus
                      />
                      <p
                        v-else
                        @click="startEditingTask(task)"
                        class="text-[11px] font-bold text-[#1B2559] line-clamp-2 cursor-text hover:text-[#7029FF] transition-colors"
                        :class="{
                          'line-through text-slate-400': isTaskCompleted(task),
                        }"
                      >
                        {{ task.title }}
                      </p>
                    </div>

                    <div
                      class="flex items-center opacity-0 group-hover/task:opacity-100 transition-all shrink-0 relative z-10"
                    >
                      <button
                        @click="moveTask(task, 'up')"
                        class="p-1.5 text-slate-300 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <ChevronUp :size="14" />
                      </button>
                      <button
                        @click="moveTask(task, 'down')"
                        class="p-1.5 text-slate-300 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <ChevronDown :size="14" />
                      </button>
                      <button
                        @click.stop="deleteTask(task.id)"
                        class="p-1.5 text-rose-400 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 :size="14" />
                      </button>
                    </div>
                  </div>

                  <!-- Quick Add Task -->
                  <div
                    class="relative flex items-center gap-3 p-1.5 transition-all"
                  >
                    <div
                      class="absolute -left-[13px] top-1/2 -translate-y-1/2 w-[13px] h-px bg-slate-100 pointer-events-none"
                    ></div>
                    <div
                      class="w-5 h-5 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-slate-300 shrink-0"
                    >
                      <Plus :size="10" />
                    </div>
                    <input
                      v-model="newTaskInPhases[phaseName]"
                      @keyup.enter="addTaskToPhase(phaseName)"
                      type="text"
                      placeholder="Type and press Enter to add task..."
                      class="flex-1 bg-transparent border-none outline-none text-[11px] font-medium text-slate-400 placeholder:text-slate-200"
                    />
                    <button
                      @click="addTaskToPhase(phaseName)"
                      :disabled="!newTaskInPhases[phaseName]?.trim()"
                      class="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[9px] font-black text-slate-300 hover:text-[#702DFF] hover:border-indigo-100 transition-all disabled:opacity-0"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>

              <div
                v-if="tasks.length === 0"
                class="py-20 text-center border-2 border-dashed border-slate-100 rounded-[32px]"
              >
                <p
                  class="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1"
                >
                  Board is empty
                </p>
                <p class="text-[11px] font-bold text-slate-400">
                  Add milestones like BRIEF, UI/UX, and DEV to start tracking.
                </p>
              </div>
            </div>
          </AdminCard>
        </div>

        <!-- Sidebar Column (4) -->
        <div class="lg:col-span-4 space-y-6">
          <AdminCard
            title="Lifecycle & Meta"
            :stretch="false"
            class="shadow-2xl shadow-indigo-500/5 bg-white/70 backdrop-blur-xl !rounded-[40px] border-none"
          >
            <div class="space-y-6">
              <AdminSelect v-model="formData.status" label="Status Pengerjaan">
                <option value="planning">PLANNING</option>
                <option value="in_progress">IN PROGRESS</option>
                <option value="done">DONE</option>
                <option value="pending">PENDING</option>
                <option value="hold">HOLD</option>
              </AdminSelect>

              <div>
                <label class="flex justify-between items-center mb-2">
                  <span
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                    >Overall Progress</span
                  >
                  <span class="text-sm font-black text-[#7029FF]"
                    >{{ autoProgress }}%</span
                  >
                </label>
                <div
                  class="h-4 bg-slate-50 rounded-full border border-slate-100 overflow-hidden shadow-inner p-1"
                >
                  <div
                    class="h-full bg-gradient-to-r from-indigo-500 to-[#7029FF] rounded-full transition-all duration-700"
                    :style="{ width: autoProgress + '%' }"
                  ></div>
                </div>
                <p
                  class="text-[9px] font-black text-slate-300 uppercase mt-2 tracking-widest text-center"
                >
                  CALCULATED FROM {{ tasks.length }} TASKS
                </p>
              </div>

              <div
                class="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl relative overflow-hidden group/token"
              >
                <p
                  class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2"
                >
                  Portal Token
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex flex-col">
                    <code class="text-xs font-black text-[#7029FF]">{{
                      formData.client_portal_token || "GENERATING..."
                    }}</code>
                    <p
                      v-if="!formData.client_portal_token"
                      class="text-[8px] font-bold text-indigo-300 uppercase mt-0.5"
                    >
                      Will be saved on next update
                    </p>
                  </div>
                  <button
                    @click="copyPortalLink"
                    class="text-[10px] font-black uppercase transition-all px-3 py-1.5 rounded-lg hover:bg-white shadow-sm"
                    :class="
                      copied
                        ? 'text-emerald-500 bg-white'
                        : 'text-slate-400 hover:text-[#7029FF]'
                    "
                  >
                    {{ copied ? "COPIED!" : "COPY LINK" }}
                  </button>
                </div>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      <!-- WhatsApp Preview Modal -->
      <WhatsAppModal
        :is-open="waModal.isOpen"
        :text="waModal.text"
        :client-name="currentClientName"
        :client-phone="currentClientPhone"
        @close="waModal.isOpen = false"
      />

      <!-- Confirmation Modal -->
      <ConfirmModal
        :is-open="confirmModal.isOpen"
        :title="confirmModal.title"
        :message="confirmModal.message"
        variant="danger"
        @close="confirmModal.isOpen = false"
        @confirm="executeDelete"
      />

      <!-- Template Confirmation Modal -->
      <ConfirmModal
        :is-open="templateConfirmModal.isOpen"
        title="Apply Template?"
        message="This will add template milestones to your current roadmap. Existing tasks will not be deleted. Continue?"
        confirm-text="Apply Template"
        @close="templateConfirmModal.isOpen = false"
        @confirm="executeApplyTemplate(templateConfirmModal.template)"
      />

      <!-- Toast Notification -->
      <Toast
        v-if="toast.show"
        :message="toast.message"
        :variant="toast.variant"
        @close="toast.show = false"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft,
  Save,
  ChevronRight,
  Layout,
  Clock,
  Calendar,
  Plus,
  Trash2,
  Check,
  MessageCircle,
  Layers,
  Wand2,
  ChevronUp,
  ChevronDown,
  Code,
  Smartphone,
  Globe,
  Database,
  Rocket,
  Search,
  CheckCircle,
  FileText,
  Settings,
  Zap,
} from "lucide-vue-next";

const availableIcons: Record<string, any> = {
  Layers,
  Layout,
  Code,
  Smartphone,
  Globe,
  Database,
  Rocket,
  Search,
  CheckCircle,
  FileText,
  Settings,
  Zap,
};
import { projectsService } from "../services/projectsService";
import { clientsService } from "../services/clientsService";
import { tasksService } from "../services/tasksService";
import {
  projectTemplates,
  type ProjectTemplate,
} from "../data/projectTemplates";
import { timelineOptions } from "../data/order/options";
import type { Project, Task } from "../types";
import AdminCard from "../components/ui/AdminCard.vue";
import { BaseButton } from "@kangjessy/ui";
import BaseInput from "../components/ui/BaseInput.vue";
import WhatsAppModal from "../components/ui/WhatsAppModal.vue";
import ConfirmModal from "../components/ui/ConfirmModal.vue";
import AdminSelect from "../components/ui/AdminSelect.vue";
import AdminTextarea from "../components/ui/AdminTextarea.vue";
import Toast from "../components/ui/Toast.vue";

const route = useRoute();
const router = useRouter();
const isEdit = computed(() => !!route.params.id);
const id = computed(() => route.params.id as string);
const pageTitle = computed(() =>
  isEdit.value ? "Modify Production Board" : "Initiate New Project",
);

const loading = ref(false);
const saving = ref(false);
const availableOrders = ref<any[]>([]);
const tasks = ref<any[]>([]);
const localPhases = ref<string[]>([]);
const phaseIconsCache = reactive<Record<string, string>>({});
const collapsedPhases = reactive<Record<string, boolean>>({});
const newPhaseName = ref("");
const newTaskInPhases = reactive<Record<string, string>>({});
const copied = ref(false);
const isClosing = ref(false);
const editingTask = ref<string | null>(null);
const taskEditTitle = ref("");
const editingPhase = ref<string | null>(null);
const phaseEditName = ref("");
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
};
const activeIconPicker = ref<string | null>(null);

const formData = ref<Partial<Project>>({
  name: "",
  description: "",
  brief: "",
  visual_style: "",
  timeline_notes: "",
  status: "planning",
  progress: 0,
  deadline: "",
  start_date: "",
  order_id: undefined,
  client_id: "",
  client_portal_token: "",
});

const waModal = reactive({
  isOpen: false,
  text: "",
});

const confirmModal = reactive({
  isOpen: false,
  title: "",
  message: "",
  type: "task" as "task" | "phase",
  id: "" as any,
  phaseName: "",
});

const templateConfirmModal = reactive({
  isOpen: false,
  template: null as any,
});

onMounted(async () => {
  fetchAvailableOrders();
  if (isEdit.value) {
    await fetchProject();
    await fetchTasks();
    ensurePortalToken();
  } else {
    ensurePortalToken();
  }
  window.addEventListener("click", () => {
    activeIconPicker.value = null;
  });
});

function ensurePortalToken() {
  if (!formData.value.client_portal_token) {
    formData.value.client_portal_token = Math.random()
      .toString(36)
      .substring(2, 15);
  }
}

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

async function fetchAvailableOrders() {
  try {
    const data = await clientsService.getDealOrdersWithoutProject();
    availableOrders.value = data;
  } catch (err) {
    console.error(err);
  }
}

async function fetchProject() {
  loading.value = true;
  try {
    const data = await projectsService.getById(id.value);
    formData.value = { ...data };
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function applyTemplate(template: ProjectTemplate) {
  if (tasks.value.length > 0) {
    templateConfirmModal.template = template;
    templateConfirmModal.isOpen = true;
    return;
  }
  executeApplyTemplate(template);
}

async function executeApplyTemplate(template: ProjectTemplate) {
  templateConfirmModal.isOpen = false;
  loading.value = true;
  try {
    const isNewProject =
      !isEdit.value || id.value?.toString().startsWith("temp");
    const newTasks: Partial<Task>[] = [];

    template.phases.forEach((phase) => {
      phase.tasks.forEach((taskTitle) => {
        const newTask: any = {
          project_id: isNewProject ? id.value : id.value,
          title: taskTitle,
          phase: phase.name,
          status: "in_progress",
          icon: "Layers",
        };

        if (isNewProject) {
          newTask.id = "temp-" + Date.now() + Math.random();
          newTask.is_completed = false;
          tasks.value.push(newTask);
        } else {
          newTasks.push(newTask);
        }
      });
    });

    if (!isNewProject && newTasks.length > 0) {
      await tasksService.bulkCreate(newTasks);
      await fetchTasks();
    }
  } catch (err) {
    console.error(err);
    showToast("Failed to apply template. Please try again.", "error");
  } finally {
    loading.value = false;
  }
}

async function fetchTasks() {
  try {
    const data = await tasksService.getByProject(id.value);
    tasks.value = data.map((t) => ({
      ...t,
      // Ensure local state uses is_completed for UI consistency,
      // but syncs back to status: 'done' via tasksService
      is_completed: t.status === "done" || !!t.is_completed,
    }));
    // Update icons cache from tasks
    tasks.value.forEach((t) => {
      if (t.phase && t.icon) phaseIconsCache[t.phase] = t.icon;
    });
  } catch (err) {
    console.error(err);
  }
}

// Progress Calculation
const autoProgress = computed(() => {
  if (tasks.value.length === 0) return 0;
  const completed = tasks.value.filter((t) => isTaskCompleted(t)).length;
  return Math.round((completed / tasks.value.length) * 100);
});

const completedTasksCount = computed(
  () => tasks.value.filter((t) => isTaskCompleted(t)).length,
);

function isTaskCompleted(task: any) {
  return task.status === "done" || task.is_completed;
}

// Task Logic
const groupedTasks = computed(() => {
  const groups: Record<string, any[]> = {};

  // Sort tasks by sort_order
  const sortedTasks = [...tasks.value].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0),
  );

  // Add actual tasks
  sortedTasks.forEach((task) => {
    const phase = task.phase || "General";
    if (!groups[phase]) {
      groups[phase] = [];
      if (!newTaskInPhases[phase]) newTaskInPhases[phase] = "";
    }
    groups[phase].push(task);
  });

  // Add empty local phases
  localPhases.value.forEach((phase) => {
    if (!groups[phase]) {
      groups[phase] = [];
      if (!newTaskInPhases[phase]) newTaskInPhases[phase] = "";
    }
  });

  return groups;
});

const getPhaseProgress = (phaseTasks: any[]) => {
  if (phaseTasks.length === 0) return 0;
  const completed = phaseTasks.filter((t) => isTaskCompleted(t)).length;
  return Math.round((completed / phaseTasks.length) * 100);
};

function addPhase() {
  if (!newPhaseName.value.trim()) return;
  const name = newPhaseName.value.toUpperCase();
  if (groupedTasks.value[name])
    return showToast("Milestone already exists", "error");

  localPhases.value.push(name);
  newTaskInPhases[name] = "";
  newPhaseName.value = "";
}

function startEditingPhase(name: string) {
  editingPhase.value = name;
  phaseEditName.value = name;
}

async function savePhaseName(oldName: string) {
  if (
    !editingPhase.value ||
    !phaseEditName.value.trim() ||
    phaseEditName.value.toUpperCase() === oldName
  ) {
    editingPhase.value = null;
    return;
  }

  const newName = phaseEditName.value.toUpperCase();

  // Update all tasks in this phase locally
  tasks.value = tasks.value.map((t) => {
    if (t.phase === oldName) return { ...t, phase: newName };
    return t;
  });

  // If edit mode, update in DB
  if (isEdit.value && !id.value?.toString().startsWith("temp")) {
    try {
      const tasksInPhase = tasks.value.filter(
        (t) => t.phase === newName && !t.id.toString().startsWith("temp"),
      );
      for (const t of tasksInPhase) {
        await tasksService.update(t.id, { phase: newName });
      }
    } catch (err) {
      console.error("Failed to update phase in DB:", err);
    }
  }

  editingPhase.value = null;
}

function togglePhase(phaseName: string) {
  collapsedPhases[phaseName] = !collapsedPhases[phaseName];
}

function isPhaseCollapsed(phaseName: string) {
  return !!collapsedPhases[phaseName];
}

async function addTaskToPhase(phaseName: string) {
  const title = newTaskInPhases[phaseName];
  if (!title?.trim()) return;

  const maxSort =
    tasks.value.length > 0
      ? Math.max(...tasks.value.map((t) => t.sort_order || 0))
      : 0;
  const newTask: Partial<Task> = {
    project_id: id.value,
    title: title,
    phase: phaseName,
    status: "in_progress",
    icon: phaseIconsCache[phaseName] || "Layers",
    sort_order: maxSort + 1,
  };

  // If editing, save to DB immediately. If creating, keep in local state.
  if (isEdit.value && !id.value?.toString().startsWith("temp")) {
    try {
      // Create a clean copy for DB - ONLY columns that exist in DB
      const dbTask = { ...newTask };
      delete (dbTask as any).is_completed;

      const savedTask = await tasksService.create(dbTask);

      // Add back UI-only field for the reactive list
      tasks.value.push({
        ...savedTask,
        is_completed: false,
      });

      newTaskInPhases[phaseName] = "";
    } catch (err: any) {
      console.error(err);
      showToast(
        `Failed to save task: ${err.message || "Unknown error"}`,
        "error",
      );
    }
  } else {
    // For new projects
    const tempTask = {
      ...newTask,
      id: "temp-" + Date.now() + Math.random(),
      is_completed: false,
    } as any;
    tasks.value.push(tempTask);
    newTaskInPhases[phaseName] = "";
  }

  // Remove from local phases once it has tasks
  localPhases.value = localPhases.value.filter((p) => p !== phaseName);
}

function startEditingTask(task: any) {
  editingTask.value = task.id;
  taskEditTitle.value = task.title;
}

async function saveTaskTitle(task: any) {
  if (
    !editingTask.value ||
    !taskEditTitle.value.trim() ||
    taskEditTitle.value === task.title
  ) {
    editingTask.value = null;
    return;
  }

  const oldTitle = task.title;
  task.title = taskEditTitle.value;

  if (isEdit.value && !task.id.toString().startsWith("temp")) {
    try {
      await tasksService.update(task.id, { title: task.title });
    } catch (err) {
      task.title = oldTitle;
      showToast("Failed to update task title", "error");
    }
  }

  editingTask.value = null;
}

function getPhaseIcon(phaseName: string) {
  const iconName = phaseIconsCache[phaseName] || "Layers";
  return availableIcons[iconName] || Layers;
}

async function setPhaseIcon(phaseName: string, iconName: string) {
  phaseIconsCache[phaseName] = iconName;
  // If edit mode, update in DB for all tasks in this phase
  if (isEdit.value && !id.value?.toString().startsWith("temp")) {
    const phaseTasks = tasks.value.filter(
      (t) => t.phase === phaseName && !t.id.toString().startsWith("temp"),
    );
    try {
      for (const t of phaseTasks) {
        await tasksService.update(t.id, { icon: iconName });
        t.icon = iconName;
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    // Just update locally
    tasks.value.forEach((t) => {
      if (t.phase === phaseName) t.icon = iconName;
    });
  }
}

async function moveTask(task: any, direction: "up" | "down") {
  const index = tasks.value.findIndex((t) => t.id === task.id);
  if (index === -1) return;

  const phaseTasks = tasks.value.filter((t) => t.phase === task.phase);
  const taskIdxInPhase = phaseTasks.findIndex((t) => t.id === task.id);

  if (direction === "up" && taskIdxInPhase === 0) return;
  if (direction === "down" && taskIdxInPhase === phaseTasks.length - 1) return;

  const swapTask =
    direction === "up"
      ? phaseTasks[taskIdxInPhase - 1]
      : phaseTasks[taskIdxInPhase + 1];

  // Swap sort_orders
  const tempOrder = task.sort_order || 0;
  task.sort_order = swapTask.sort_order || 0;
  swapTask.sort_order = tempOrder;

  if (isEdit.value && !task.id.toString().startsWith("temp")) {
    try {
      await Promise.all([
        tasksService.update(task.id, { sort_order: task.sort_order }),
        tasksService.update(swapTask.id, { sort_order: swapTask.sort_order }),
      ]);
    } catch (err) {
      console.error(err);
    }
  }

  tasks.value.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

async function movePhase(phaseName: string, direction: "up" | "down") {
  const phaseNames = Object.keys(groupedTasks.value);
  const index = phaseNames.indexOf(phaseName);
  if (index === -1) return;
  if (direction === "up" && index === 0) return;
  if (direction === "down" && index === phaseNames.length - 1) return;

  const newPhaseOrder = [...phaseNames];
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  newPhaseOrder.splice(index, 1);
  newPhaseOrder.splice(targetIndex, 0, phaseName);

  // Update localPhases order if any are empty
  const updatedLocalPhases: string[] = [];
  newPhaseOrder.forEach((p) => {
    if (localPhases.value.includes(p)) updatedLocalPhases.push(p);
  });
  localPhases.value = updatedLocalPhases;

  // Re-assign sort_orders to all real tasks
  try {
    let currentOrder = 0;
    const updates = [];
    for (const pName of newPhaseOrder) {
      const pTasks = tasks.value.filter((t) => t.phase === pName);
      for (const t of pTasks) {
        t.sort_order = currentOrder++;
        if (isEdit.value && t.id && !t.id.toString().startsWith("temp")) {
          updates.push(tasksService.update(t.id, { sort_order: t.sort_order }));
        }
      }
    }
    if (updates.length > 0) await Promise.all(updates);
    tasks.value.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  } catch (err) {
    console.error(err);
  }
}

async function deletePhase(phaseName: string) {
  confirmModal.title = "Delete Milestone?";
  confirmModal.message = `Are you sure you want to delete "${phaseName}" and all its tasks? This action cannot be undone.`;
  confirmModal.type = "phase";
  confirmModal.phaseName = phaseName;
  confirmModal.isOpen = true;
}

async function executeDelete() {
  confirmModal.isOpen = false;
  if (confirmModal.type === "phase") {
    const phaseName = confirmModal.phaseName;
    const phaseTasks = tasks.value.filter((t) => t.phase === phaseName);
    try {
      const dbDeletes = phaseTasks
        .filter((t) => t.id && !t.id.toString().startsWith("temp"))
        .map((t) => tasksService.delete(t.id));

      if (dbDeletes.length > 0) await Promise.all(dbDeletes);

      tasks.value = tasks.value.filter((t) => t.phase !== phaseName);
      localPhases.value = localPhases.value.filter((p) => p !== phaseName);
    } catch (err) {
      console.error(err);
    }
  } else {
    const taskId = confirmModal.id;
    try {
      if (taskId && !taskId.toString().startsWith("temp")) {
        await tasksService.delete(taskId);
      }
      tasks.value = tasks.value.filter((t) => t.id !== taskId);
    } catch (err) {
      console.error(err);
    }
  }
}

async function toggleTask(task: any) {
  try {
    const nextState = !isTaskCompleted(task);
    const index = tasks.value.findIndex(
      (t) => t.id?.toString() === task.id?.toString(),
    );
    if (index === -1) return;

    if (task.id?.toString().startsWith("temp")) {
      const updatedTasks = [...tasks.value];
      updatedTasks[index] = {
        ...task,
        is_completed: nextState,
        status: nextState ? "done" : "in_progress",
      };
      tasks.value = updatedTasks;
      return;
    }

    const updated = await tasksService.toggleComplete(task.id, nextState);
    const updatedTasks = [...tasks.value];
    updatedTasks[index] = {
      ...updated,
      is_completed: updated.status === "done",
    };
    tasks.value = updatedTasks;
  } catch (err) {
    console.error(err);
  }
}

async function deleteTask(taskId: string) {
  confirmModal.title = "Remove Task?";
  confirmModal.message =
    "Are you sure you want to remove this task from the list?";
  confirmModal.type = "task";
  confirmModal.id = taskId;
  confirmModal.isOpen = true;
}

// Data Binding
function onOrderSelect() {
  const order = availableOrders.value.find(
    (o) => o.id === formData.value.order_id,
  );
  if (order) {
    formData.value.client_id = order.client_id || order.id;
    formData.value.name = order.project_name || `${order.name} - Project`;

    // Sync additional info from Order
    if (order.brief) formData.value.brief = order.brief;
    if (order.visual_style) formData.value.visual_style = order.visual_style;

    // Sync Timeline Preference
    if (order.selected_timeline) {
      const t = timelineOptions.find((o) => o.id === order.selected_timeline);
      if (t) {
        formData.value.timeline_notes = `[${t.label.toUpperCase()}]\n${t.desc}`;
      }
    }

    // Attempt to map features as brief if brief is empty
    if (!formData.value.brief && order.features) {
      formData.value.brief = `Project Features:\n${order.features}`;
    }
  }
}

async function handleSave(shouldClose: boolean = true) {
  if (!formData.value.name)
    return showToast("Project Name is required", "error");
  saving.value = true;
  isClosing.value = shouldClose;
  try {
    formData.value.progress = autoProgress.value;

    let projectId = id.value;
    // Cleanup foreign key objects before saving to avoid schema errors
    const saveData = { ...formData.value };
    delete (saveData as any).client;
    delete (saveData as any).client_portal_token; // Temporarily exclude if column missing in DB

    if (isEdit.value && !id.value.toString().startsWith("temp")) {
      await projectsService.update(id.value, saveData);
      showToast("Project updated successfully");
    } else {
      const newProject = await projectsService.create(saveData as any);
      projectId = newProject.id;
      showToast("New project initiated!");

      // Sync temp tasks to DB if any
      const tempTasks = tasks.value.filter((t) =>
        t.id?.toString().startsWith("temp"),
      );
      if (tempTasks.length > 0) {
        const cleanTasks = tempTasks.map((t) => {
          const { id, is_completed, ...rest } = t;
          return { ...rest, project_id: projectId };
        });
        await tasksService.bulkCreate(cleanTasks);
      }
    }

    if (shouldClose) router.push("/projects");
    else if (!isEdit.value) router.replace(`/projects/${projectId}/edit`);
  } catch (err: any) {
    showToast(`Error: ${err.message}`, "error");
  } finally {
    saving.value = false;
  }
}

function copyPortalLink() {
  if (!formData.value.client_portal_token) {
    ensurePortalToken();
  }

  const url = `${window.location.origin}/portal/${formData.value.client_portal_token}`;
  navigator.clipboard.writeText(url);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function openWhatsAppModal() {
  const clientName = (formData.value as any).client?.name || "Client";
  const progress = autoProgress.value;
  const status = (formData.value.status || "new")
    .toUpperCase()
    .replace("_", " ");

  let text = `Halo ${clientName}, ini update progres proyek *${formData.value.name}*:\n\n`;
  text += `Progres: *${progress}%*\n`;
  text += `Status: *${status}*\n\n`;

  if (tasks.value.length > 0) {
    text += `Detail Roadmap:\n`;
    const grouped = groupedTasks.value;
    Object.entries(grouped).forEach(([phase, phaseTasks]: [string, any]) => {
      const done = phaseTasks.filter((t: any) => isTaskCompleted(t)).length;
      text += `- ${phase}: ${done}/${phaseTasks.length} Selesai\n`;
    });
  }

  if (formData.value.client_portal_token) {
    text += `\nCek progres real-time di sini ya: ${window.location.origin}/portal/${formData.value.client_portal_token}`;
  }

  waModal.text = text;
  waModal.isOpen = true;
}

const currentClientName = computed(
  () => (formData.value as any).client?.name || "Client",
);
const currentClientPhone = computed(
  () => (formData.value as any).client?.phone || "",
);
</script>

<style scoped>
@reference "tailwindcss";
.page-container {
  animation: fade-in 0.6s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.input-field {
  @apply w-full bg-white border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-[#1B2559] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-[#702DFF] transition-all placeholder:text-slate-300 shadow-sm shadow-slate-100/50;
}

.select-field {
  @apply w-full bg-white border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-[#1B2559] outline-none appearance-none cursor-pointer focus:ring-4 focus:ring-indigo-500/10 focus:border-[#702DFF] transition-all shadow-sm;
}
</style>
