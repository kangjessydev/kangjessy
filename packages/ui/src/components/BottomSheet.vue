<template>
  <Teleport to="body">
    <!-- Backdrop Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        @click="handleBackdropClick"
        class="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000]"
        :class="backdropClass"
      ></div>
    </Transition>

    <!-- Bottom Sheet / Side Drawer Panel -->
    <Transition :name="isDesktop ? 'drawer' : 'sheet'">
      <div
        v-if="modelValue"
        ref="sheetRef"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        class="fixed z-[10001] bg-bg-secondary border-border-color shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 flex flex-col"
        :class="[
          sheetClass,
          'bottom-0 left-0 right-0 border-t rounded-t-[32px]',
          {
            'h-[75vh]': !localFullHeight,
            'h-[97vh] border-t-0 rounded-t-none': localFullHeight,
          },
          'lg:bottom-0 lg:top-0 lg:right-0 lg:left-auto lg:w-[500px] lg:h-screen lg:border-t-0 lg:border-l-2 lg:border-accent-primary/20 lg:rounded-l-[40px] lg:rounded-t-none lg:max-h-none',
        ]"
      >
        <!-- Drag Handle (Mobile Only) -->
        <div
          v-if="showHandle"
          ref="handleRef"
          class="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing lg:hidden select-none touch-none"
        >
          <div class="w-10 h-1 bg-border-color rounded-full"></div>
        </div>

        <!-- Header -->
        <div
          v-if="title || $slots.header"
          class="px-6 py-4 border-b border-border-color/50"
        >
          <slot name="header">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  v-if="icon"
                  class="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary"
                >
                  <component :is="icon" :size="18" />
                </div>
                <h4
                  class="text-[1.1rem] font-bold text-text-primary tracking-tight"
                >
                  {{ title }}
                </h4>
              </div>
              <button
                v-if="showClose"
                @click="emit('update:modelValue', false)"
                class="w-10 h-10 rounded-xl bg-bg-tertiary/50 hover:bg-bg-tertiary flex items-center justify-center text-text-tertiary transition-all active:scale-90"
              >
                <X :size="20" />
              </button>
            </div>
          </slot>
        </div>

        <!-- Content Area -->
        <div
          ref="contentRef"
          class="overflow-y-auto overflow-x-hidden flex-1 custom-scrollbar pb-20"
          :class="contentClass"
        >
          <slot></slot>
        </div>

        <!-- Footer (Optional) -->
        <div
          v-if="$slots.footer"
          class="border-t border-border-color bg-inherit"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { X } from "lucide-vue-next";
import { useBottomSheetManager } from "../composables/useBottomSheetManager";

interface Props {
  modelValue?: boolean;
  isOpen?: boolean;
  title?: string;
  showClose?: boolean;
  showHandle?: boolean;
  fullHeight?: boolean;
  closeOnBackdrop?: boolean;
  swipeToClose?: boolean;
  backdropClass?: string;
  sheetClass?: string;
  contentClass?: string;
  icon?: any;
}

const props = withDefaults(defineProps<Props>(), {
  showClose: true,
  showHandle: true,
  closeOnBackdrop: true,
  swipeToClose: true,
  fullHeight: false,
  modelValue: false,
  isOpen: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
}>();

const sheetId = ref(`bottomsheet-${Math.random().toString(36).substr(2, 9)}`);
const sheetManager = useBottomSheetManager(sheetId.value);

const sheetRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);

const localFullHeight = ref(props.fullHeight);
const touchStartY = ref(0);
const touchCurrentY = ref(0);
const isDragging = ref(false);
const startedOnHandle = ref(false);

const isDesktop = ref(false);
const updateBreakpoint = () => {
  isDesktop.value = window.innerWidth >= 1024;
};

watch(
  () => props.fullHeight,
  (newVal) => {
    localFullHeight.value = newVal;
  },
);

onMounted(() => {
  updateBreakpoint();
  window.addEventListener("resize", updateBreakpoint);
  sheetManager.register(() => {
    emit("update:modelValue", false);
    emit("close");
  });
});

onUnmounted(() => {
  sheetManager.unregister();
  document.body.style.overflow = "";
  window.removeEventListener("resize", updateBreakpoint);
});

watch(
  () => [props.modelValue, props.isOpen],
  ([newVal, newIsOpen]) => {
    const active = newVal || newIsOpen;
    sheetManager.syncWithModel(active);
    if (active) {
      localFullHeight.value = props.fullHeight;
    }
  },
);

const notifyClose = () => {
  emit("update:modelValue", false);
  emit("close");
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    notifyClose();
  }
};

const handleTouchStart = (e: TouchEvent) => {
  if (!props.swipeToClose) return;
  const touch = e.touches[0];
  if (touch) {
    touchStartY.value = touch.clientY;
    isDragging.value = true;
    startedOnHandle.value =
      handleRef.value?.contains(e.target as Node) || false;
  }
};

const handleTouchMove = (e: TouchEvent) => {
  if (!props.swipeToClose || !isDragging.value || !sheetRef.value) return;
  const touch = e.touches[0];
  if (!touch) return;
  touchCurrentY.value = touch.clientY;

  const deltaY = touchCurrentY.value - (touchStartY.value || 0);
  const isScrollingUp = deltaY < 0;
  const isPullingDown = deltaY > 0;

  if (startedOnHandle.value && isScrollingUp && !localFullHeight.value) {
    if (Math.abs(deltaY) > 5) {
      e.preventDefault();
      sheetRef.value.style.transform = `translateY(${deltaY}px)`;
      sheetRef.value.style.transition = "none";
    }
    return;
  }

  const scrollTop = contentRef.value?.scrollTop || 0;
  if (isPullingDown && (scrollTop <= 0 || startedOnHandle.value)) {
    e.preventDefault();
    sheetRef.value.style.transform = `translateY(${deltaY}px)`;
    sheetRef.value.style.transition = "none";
  }
};

const handleTouchEnd = () => {
  if (!props.swipeToClose || !isDragging.value) return;
  const deltaY = touchCurrentY.value - touchStartY.value;

  if (startedOnHandle.value && deltaY < -80 && !localFullHeight.value) {
    localFullHeight.value = true;
  } else if (deltaY > 120) {
    const scrollTop = contentRef.value?.scrollTop || 0;
    if (scrollTop <= 0 || startedOnHandle.value) {
      notifyClose();
    }
  }

  if (sheetRef.value) {
    sheetRef.value.style.transform = "";
    sheetRef.value.style.transition =
      "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
  }

  isDragging.value = false;
  startedOnHandle.value = false;
};

watch(
  () => [props.modelValue, props.isOpen],
  ([newVal, newIsOpen]) => {
    if (newVal || newIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.sheet-enter-active {
  transition: transform 0.3s ease-out;
}
.sheet-leave-active {
  transition: transform 0.2s ease-in;
}
.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(100%);
}

.drawer-enter-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 10px;
}
</style>
