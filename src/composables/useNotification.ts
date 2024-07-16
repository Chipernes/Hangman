import {ref} from "vue";
import InfoNotification from "@/components/InfoNotification.vue";

export const useNotification = () => {
    const notification = ref<InstanceType<typeof InfoNotification> | null>(null);
    const showNotification = () => {
        notification.value?.open();
        setTimeout(() => notification.value?.close(), 2000);
    };

    return {
        notification,
        showNotification
    }
}