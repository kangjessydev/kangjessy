import { ref, watch } from 'vue';

/**
 * Global Bottom Sheet Manager
 * Ensures only one bottom sheet/modal is open at a time
 * Automatically closes other sheets when a new one opens
 */

type SheetId = string;

export const activeSheet = ref<SheetId | null>(null);
const sheets = new Map<SheetId, { close: () => void }>();

export function useBottomSheetManager(sheetId: SheetId) {
    const isOpen = ref(false);

    // Register this sheet
    const register = (closeFn: () => void) => {
        sheets.set(sheetId, { close: closeFn });
    };

    // Unregister on unmount
    const unregister = () => {
        sheets.delete(sheetId);
        if (activeSheet.value === sheetId) {
            activeSheet.value = null;
        }
    };

    // Open this sheet (and close others)
    const open = () => {
        // Close currently active sheet if it's different
        if (activeSheet.value && activeSheet.value !== sheetId) {
            const currentSheet = sheets.get(activeSheet.value);
            if (currentSheet) {
                currentSheet.close();
            }
        }
        
        activeSheet.value = sheetId;
        isOpen.value = true;
    };

    // Close this sheet
    const close = () => {
        isOpen.value = false;
        if (activeSheet.value === sheetId) {
            activeSheet.value = null;
        }
    };

    // Watch for external changes (e.g., from v-model)
    const syncWithModel = (modelValue: boolean) => {
        if (modelValue && !isOpen.value) {
            open();
        } else if (!modelValue && isOpen.value) {
            close();
        }
    };

    // Watch active sheet changes - close this sheet if another becomes active
    watch(activeSheet, (newActiveSheet) => {
        if (newActiveSheet !== sheetId && isOpen.value) {
            isOpen.value = false;
        }
    });

    return {
        isOpen,
        open,
        close,
        register,
        unregister,
        syncWithModel,
        isActive: () => activeSheet.value === sheetId
    };
}

/**
 * Get the currently active sheet ID
 */
export function getActiveSheet() {
    return activeSheet.value;
}

/**
 * Close all sheets
 */
export function closeAllSheets() {
    sheets.forEach(sheet => sheet.close());
    activeSheet.value = null;
}
