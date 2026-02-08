import { ref, watch } from 'vue';

type SheetId = string;

export const activeSheet = ref<SheetId | null>(null);
const sheets = new Map<SheetId, { close: () => void }>();

export function useBottomSheetManager(sheetId: SheetId) {
    const isOpen = ref(false);

    const register = (closeFn: () => void) => {
        sheets.set(sheetId, { close: closeFn });
    };

    const unregister = () => {
        sheets.delete(sheetId);
        if (activeSheet.value === sheetId) {
            activeSheet.value = null;
        }
    };

    const open = () => {
        if (activeSheet.value && activeSheet.value !== sheetId) {
            const currentSheet = sheets.get(activeSheet.value);
            if (currentSheet) {
                currentSheet.close();
            }
        }
        
        activeSheet.value = sheetId;
        isOpen.value = true;
    };

    const close = () => {
        isOpen.value = false;
        if (activeSheet.value === sheetId) {
            activeSheet.value = null;
        }
    };

    const syncWithModel = (modelValue: boolean) => {
        if (modelValue && !isOpen.value) {
            open();
        } else if (!modelValue && isOpen.value) {
            close();
        }
    };

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

export function getActiveSheet() {
    return activeSheet.value;
}

export function closeAllSheets() {
    sheets.forEach(sheet => sheet.close());
    activeSheet.value = null;
}
