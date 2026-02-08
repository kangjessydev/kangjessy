import { ref, reactive } from "vue";
import { closeAllSheets } from "./useBottomSheetManager";

// Registered Modal IDs as a const object
export const Popups = {
  CHAT_AI: "CHAT_AI",
  CHAT_WA: "CHAT_WA",
  CHAT_EMAIL: "CHAT_EMAIL",
  PROMO: "PROMO_POPUP",
  ORDER_SUCCESS: "ORDER_SUCCESS",
} as const;

export type PopupId = typeof Popups[keyof typeof Popups];

// Global state with pre-initialized keys for maximum reactivity stability
const activeModals = reactive<Record<string, boolean>>({
  [Popups.CHAT_AI]: false,
  [Popups.CHAT_WA]: false,
  [Popups.CHAT_EMAIL]: false,
  [Popups.PROMO]: false,
  [Popups.ORDER_SUCCESS]: false,
});

const modalProps = ref<Record<string, any>>({});

// Close all modals function
const closeAll = () => {
  Object.keys(activeModals).forEach(key => activeModals[key] = false);
  modalProps.value = {};
  document.body.style.overflow = "";
};

// Coordination is handled via BottomSheet's internal management.

export function usePopupManager() {
  const openModal = (id: PopupId, props: Record<string, any> = {}) => {
    // Close all bottom sheets when opening a modal
    closeAllSheets();
    
    // Interactive Modals (Chats) should close others to prevent stacking
    if ([Popups.CHAT_AI, Popups.CHAT_WA, Popups.CHAT_EMAIL].includes(id as any)) {
      closeAll();
    }

    // Set props
    modalProps.value[id] = props;
    activeModals[id] = true;

    // Lock body scroll for better UX
    document.body.style.overflow = "hidden";
  };

  const closeModal = (id: PopupId) => {
    activeModals[id] = false;
    delete modalProps.value[id];

    // Check if any modal is still open
    const hasOpenModal = Object.values(activeModals).some(val => val === true);
    if (!hasOpenModal) {
      document.body.style.overflow = "";
    }
  };

  const isModalOpen = (id: PopupId) => !!activeModals[id];

  const getModalProps = (id: PopupId) => modalProps.value[id] || {};

  return {
    Popups,
    openModal,
    closeModal,
    closeAll,
    activeModals, // Expose for direct property access
    isModalOpen,
    getModalProps,
  };
}
