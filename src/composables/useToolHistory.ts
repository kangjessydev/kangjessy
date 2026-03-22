import { ref, onMounted } from 'vue';

export interface HistoryItem {
    id: string;
    timestamp: number;
    input: any;
    result: any;
}

export function useToolHistory(toolId: string, limit: number = 10) {
    const history = ref<HistoryItem[]>([]);

    const loadHistory = () => {
        const stored = localStorage.getItem(`tool_history_${toolId}`);
        if (stored) {
            try {
                history.value = JSON.parse(stored);
            } catch (e) {
                console.error(`Failed to parse history for ${toolId}`, e);
                history.value = [];
            }
        }
    };

    const saveHistory = () => {
        localStorage.setItem(`tool_history_${toolId}`, JSON.stringify(history.value));
    };

    const addEntry = (input: any, result: any) => {
        const newEntry: HistoryItem = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            input,
            result
        };

        // Add to the beginning
        history.value.unshift(newEntry);

        // Limit size
        if (history.value.length > limit) {
            history.value = history.value.slice(0, limit);
        }

        saveHistory();
    };

    const removeEntry = (id: string) => {
        history.value = history.value.filter(item => item.id !== id);
        saveHistory();
    };

    const clearHistory = () => {
        history.value = [];
        localStorage.removeItem(`tool_history_${toolId}`);
    };

    onMounted(() => {
        loadHistory();
    });

    return {
        history,
        addEntry,
        removeEntry,
        clearHistory
    };
}
