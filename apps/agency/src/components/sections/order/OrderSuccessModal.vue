  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 bg-black/90 z-[10001] flex items-center justify-center p-5 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <div
          class="max-w-[540px] w-full bg-bg-secondary border border-border-color rounded-[40px] p-8 sm:p-12 text-center shadow-2xl animate-scale-in relative overflow-hidden"
        >
          <!-- Background Decoration -->
          <div class="absolute -top-24 -right-24 w-48 h-48 bg-accent-primary/10 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>

          <div class="relative z-10">
            <div class="text-accent-primary mb-8 flex justify-center">
              <div class="w-20 h-20 rounded-3xl bg-accent-primary/10 flex items-center justify-center text-accent-primary animate-bounce-subtle">
                <CheckCircle :size="48" />
              </div>
            </div>

            <h2 class="text-[clamp(1.75rem,8vw,2.25rem)] font-black mb-4 text-text-primary tracking-tighter leading-tight">
              Pesanan Terkirim!
            </h2>
            
            <p class="text-text-secondary leading-relaxed mb-10 text-base font-medium">
              Terima kasih <strong class="text-text-primary underline decoration-accent-primary/30 decoration-2">@{{ customerName }}</strong>! Kami telah menerima detail proyek Anda. Tim kami akan segera meninjau brief Anda dan menyiapkan penawaran terbaik.
            </p>

            <!-- Order Brief Box -->
            <div class="bg-bg-primary/50 p-6 rounded-[24px] mb-10 border border-border-color/50 backdrop-blur-sm">
              <div class="grid grid-cols-2 gap-4">
                <div class="text-left">
                  <span class="text-[0.65rem] font-black text-text-tertiary uppercase tracking-widest block mb-1">Project ID</span>
                  <span class="text-sm font-black text-text-primary font-mono truncate block">
                    #{{ projectId ? projectId.substring(0, 8).toUpperCase() : "PENDING" }}
                  </span>
                </div>
                <div class="text-right">
                  <span class="text-[0.65rem] font-black text-text-tertiary uppercase tracking-widest block mb-1">Total Investasi</span>
                  <span class="text-sm font-black text-emerald-500 block">
                    Rp {{ formatPrice(totalPrice) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-3.5">
              <!-- Primary Action: View Proposal (Draft #) -->
              <BaseButton
                variant="primary"
                size="lg"
                class="w-full h-14 rounded-2xl font-bold text-base shadow-xl shadow-accent-primary/20"
                href="#"
              >
                <FileText :size="18" class="mr-2.5" />
                Lihat Penawaran (Invoice)
              </BaseButton>

              <!-- Secondary Actions: WhatsApp & Home -->
              <div class="grid grid-cols-2 gap-3.5">
                <button
                  @click="handleWhatsAppFollowUp"
                  class="flex items-center justify-center gap-2.5 h-14 bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <MessageCircleIcon :size="18" />
                  WhatsApp
                </button>
                
                <BaseButton
                  variant="secondary"
                  size="lg"
                  class="h-14 rounded-2xl font-bold text-xs uppercase tracking-widest border-2"
                  @click="$emit('go-home')"
                >
                  <Home :size="18" class="mr-2" />
                  Beranda
                </BaseButton>
              </div>

              <button 
                @click="$emit('close')"
                class="mt-4 text-[0.7rem] font-black text-text-tertiary uppercase tracking-[0.2em] hover:text-rose-500 transition-colors"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {
  CheckCircle,
  FileText,
  MessageCircle,
  Home,
} from "lucide-vue-next";
import { BaseButton } from "@kangjessy/ui";
import { usePopupManager, Popups } from "../../../composables/usePopupManager";

const props = defineProps<{
  show: boolean;
  customerName: string;
  totalPrice: number;
  formatPrice: (price: number) => string;
  projectId?: string;
  projectType?: string;
}>();

const emit = defineEmits(["close", "view-invoice", "go-home"]);
const { openModal } = usePopupManager();

const handleWhatsAppFollowUp = () => {
  // Close the success modal first
  emit("close");
  
  // Open the global WhatsApp Modal with the follow-up message
  const msg = `Halo Kak Jessy, saya baru saja mengirim pesanan ${props.projectType || 'Proyek'}. Tolong dicek ya agar bisa segera diproses.`;
  
  openModal(Popups.CHAT_WA, { 
    initialMessage: msg,
    initialName: props.customerName,
    bubbleMessage: "Siap Kak! Pesan Kakak akan langsung masuk ke WhatsApp saya untuk saya prioritaskan. Silakan kirim detailnya ya."
  });
};
</script>

<style scoped>
@keyframes scale-in {
  from {
    transform: scale(0.8);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounce-subtle {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s infinite ease-in-out;
}
</style>
