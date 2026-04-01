<template>
  <section
    id="home"
    class="min-h-screen flex items-center relative overflow-hidden py-20 bg-bg-primary"
  >
    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center md:text-left"
      >
        <!-- Hero Text Content -->
        <header class="hero-text">
          <span
            class="inline-block px-3.5 py-1.5 bg-bg-secondary border border-border-color rounded-full text-[clamp(0.8rem,1.5vw,0.85rem)] font-medium text-accent-primary mb-5"
          >
            <SparklesIcon :size="14" class="inline align-middle mr-1" />
            {{ siteConfig.tagline }}
          </span>
          <h1
            class="text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.1] font-bold text-text-primary mb-6 tracking-[-0.04em]"
          >
            Stop Kerja Manual, Kelola Bisnis Anda dalam
            <span class="relative inline-block">
              <span
                class="bg-clip-text text-transparent bg-linear-to-r from-accent-primary to-accent-secondary"
                >Satu Dashboard</span
              >
              <!-- Snake Line Underline -->
              <span
                class="absolute bottom-2 left-0 w-full h-2 bg-accent-primary/20 -z-10 rounded-sm"
              ></span>
            </span>
          </h1>
          <p
            class="text-text-secondary mb-10 max-w-[580px] text-[clamp(1rem,2vw,1.15rem)] leading-[1.6] mx-auto md:mx-0"
          >
            Kami hadir sebagai partner digital jangka panjang untuk membantu UMKM & Agensi merapikan operasional lewat website dan sistem otomatis yang mudah dijalankan. Anda fokus kembangkan bisnis, urusan sistem biar kami yang jaga.
          </p>

          <div
            class="flex flex-wrap gap-4 mb-14 justify-center md:justify-start"
          >
            <BaseButton
              variant="primary"
              aria-label="Let's Talk via WhatsApp"
              @click="isWAModalOpen = true"
              >Konsultasi Gratis</BaseButton
            >
            <BaseButton
              href="#projects"
              aria-label="View my works"
              variant="secondary"
              >Lihat Karya Pilihan</BaseButton
            >
          </div>

          <!-- Hero Stats Grid -->
          <div class="flex gap-6 sm:gap-12 justify-center md:justify-start">
            <div
              v-for="(val, key) in stats"
              :key="key"
              class="text-center md:text-left"
            >
              <h3
                class="text-[clamp(1.75rem,3vw,2rem)] font-extrabold mb-1 bg-clip-text text-transparent bg-linear-to-r from-accent-primary to-accent-secondary"
              >
                {{ Math.floor(val) }}{{ key === 'support' ? '%' : '+' }}
              </h3>
              <p
                class="text-[clamp(0.65rem,1.5vw,0.7rem)] uppercase tracking-widest font-bold text-text-secondary"
              >
                {{ formatLabel(String(key)) }}
              </p>
            </div>
          </div>
        </header>

        <!-- Hero Visual (Dynamic Display) -->
        <div class="relative group h-full">
          <!-- Premium Grid Background (Garis-garis) -->
          <div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50"></div>
          
          <!-- Glassmorphism Background Glow -->
          <div class="absolute -inset-10 bg-linear-to-r from-accent-primary/10 to-accent-secondary/10 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>

          <!-- 🟢 OPTION 1: BENTO DASHBOARD (Hidden for now, keep code) -->
          <div v-if="false" class="grid grid-cols-2 md:grid-cols-6 md:grid-rows-6 gap-3 h-auto md:h-[550px] relative z-10">
            <!-- 1. Main Dashboard Card (Interactive Revenue) -->
            <div class="col-span-2 md:col-span-4 md:row-span-4 bg-bg-secondary/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-5 md:p-6 shadow-2xl flex flex-col gap-5 md:gap-6 overflow-hidden group/card hover:border-accent-primary/50 transition-all duration-500 cursor-default">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 md:gap-3">
                  <div class="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_10px_rgba(var(--accent-primary-rgb),0.5)]"></div>
                  <span class="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-tertiary">Real-time Metrics</span>
                </div>
                <div class="px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-white/5 border border-white/5 text-[8px] md:text-[9px] font-bold text-accent-primary">LIVE</div>
              </div>
              
              <div class="flex-1 flex flex-col justify-between">
                <div>
                  <div class="relative inline-block mb-1 group/tooltip">
                    <h4 class="text-3xl md:text-5xl font-black text-white tracking-tighter cursor-pointer active:scale-95 transition-transform hover:text-accent-primary" @click="toggleTooltip('revenue')">
                      ${{ formatCurrency(liveRevenue) }}
                    </h4>
                    <Transition>
                      <div v-if="activeTooltip === 'revenue'" class="absolute -top-10 left-0 px-3 py-1.5 bg-accent-primary text-black text-[10px] font-bold rounded-lg whitespace-nowrap shadow-xl z-20">
                         Revenue Target: {{ (liveRevenue/15000 * 100).toFixed(1) }}% 🚀
                      </div>
                    </Transition>
                  </div>
                  <p class="text-[9px] md:text-[10px] text-text-tertiary font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <TrendingUpIcon :size="10" class="text-emerald-400" />
                    +12.5% MTD Growth
                  </p>
                </div>

                <div class="grid grid-cols-2 gap-2 md:gap-3">
                   <div class="p-3 md:p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-colors group/stat">
                      <span class="text-[8px] font-black text-text-tertiary uppercase block mb-1">Users</span>
                      <span class="text-lg md:text-xl font-bold text-white tracking-tight">{{ activeUsers.toLocaleString() }}</span>
                   </div>
                   <div class="p-3 md:p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-colors group/stat">
                      <span class="text-[8px] font-black text-text-tertiary uppercase block mb-1">Conv.</span>
                      <span class="text-lg md:text-xl font-bold text-white tracking-tight">4.2%</span>
                   </div>
                </div>

                <div class="h-16 md:h-24 flex items-end gap-1 md:gap-1.5 mt-4">
                  <div v-for="(val, idx) in chartData" :key="idx" 
                    class="flex-1 bg-accent-primary/20 rounded-t-lg transition-all duration-700 hover:bg-accent-primary"
                    :style="{ height: `${val}%` }">
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. Performance Card (Interactive Gauge) -->
            <div class="col-span-1 md:col-span-2 md:row-span-2 bg-bg-secondary/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-4 shadow-xl flex flex-col items-center justify-center text-center group/speed hover:border-accent-secondary/50 transition-all duration-500 hover:scale-[1.02]">
              <div class="relative w-12 h-12 md:w-16 md:h-16 mb-2 flex items-center justify-center">
                <svg class="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="40%" stroke="currentColor" stroke-width="5" fill="transparent" class="text-white/5"/>
                  <circle cx="50%" cy="50%" r="40%" stroke="currentColor" stroke-width="5" fill="transparent" class="text-accent-secondary" :stroke-dasharray="100" :stroke-dashoffset="10" style="transition: stroke-dashoffset 2s ease-in-out"/>
                </svg>
                <ActivityIcon :size="16" class="text-accent-secondary animate-pulse" />
              </div>
              <span class="text-xl md:text-2xl font-black text-white">99%</span>
              <span class="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-text-tertiary">Efficiency</span>
            </div>

            <!-- 3. Integrations Card (Stack Display) -->
            <div class="col-span-1 md:col-span-2 md:row-span-2 md:col-start-5 md:row-start-3 bg-bg-secondary/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-4 md:p-5 shadow-xl flex flex-col gap-3 md:gap-4 justify-center items-center group/stack hover:border-accent-primary/50 transition-all duration-500 hover:-translate-y-1">
              <div class="grid grid-cols-2 gap-1.5 md:gap-2">
                <div v-for="i in 4" :key="i" class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shadow-lg transform transition-transform group-hover/stack:scale-110 group-hover/stack:bg-white/[0.08]" :style="{ transitionDelay: `${i * 100}ms` }">
                  <component :is="[MessageCircleIcon, MailIcon, LayoutGridIcon, DatabaseIcon][i-1]" :size="14" class="text-accent-primary" />
                </div>
              </div>
              <div class="text-center">
                <span class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-text-tertiary block">Auto Stack</span>
              </div>
            </div>

            <!-- 4. Partner Banner (Bottom Full Width) -->
            <div class="col-span-2 md:col-span-6 md:row-span-2 bg-linear-to-br from-accent-primary/10 to-bg-secondary/60 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2rem] border border-white/10 p-4 md:p-6 shadow-2xl flex items-center justify-between group/partner hover:border-accent-primary/40 transition-all duration-700 overflow-hidden relative">
              <div class="absolute inset-0 bg-linear-to-r from-accent-primary/5 to-transparent opacity-0 group-hover/partner:opacity-100 transition-opacity duration-1000"></div>
              <div class="flex items-center gap-4 md:gap-6 z-10">
                <div class="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-accent-primary/95 flex items-center justify-center text-white shadow-xl shadow-accent-primary/20 group-hover/partner:scale-110 group-hover/partner:rotate-3 transition-all duration-500">
                  <BriefcaseIcon :size="20" />
                </div>
                <div class="flex flex-col">
                  <h5 class="text-xs md:text-base font-black text-white mb-0.5 tracking-tight">Partner Strategis</h5>
                  <p class="text-[9px] md:text-xs font-medium text-text-tertiary">Pendampingan penuh untuk bisnis Anda.</p>
                </div>
              </div>
              <div class="hidden sm:flex items-center gap-2 z-10 px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                 <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span class="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-text-primary">Reliable</span>
              </div>
            </div>
          </div>

          <!-- 🔵 OPTION 2: PREMIUM CODE WINDOW (Active Now) -->
          <div class="relative z-10 w-full h-[350px] md:h-[500px] bg-[#0c1016]/80 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden group/ide hover:border-accent-primary/30 transition-all duration-700">
             <!-- IDE Header Bar -->
             <div class="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                <div class="flex gap-2">
                   <div class="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
                   <div class="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
                   <div class="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                </div>
                <div class="flex items-center gap-2">
                   <div class="px-3 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-2">
                      <LayoutGridIcon :size="12" class="text-accent-primary" />
                      <span class="text-[10px] font-bold text-text-tertiary tracking-tight">partnership.config.ts</span>
                   </div>
                </div>
             </div>

             <!-- IDE Content Area -->
             <div class="p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed overflow-hidden">
                <div class="flex gap-6">
                   <!-- Line Numbers -->
                   <div class="hidden md:flex flex-col text-white/20 select-none text-right">
                      <span v-for="i in 12" :key="i">{{ i }}</span>
                   </div>
                   
                   <!-- Code Content -->
                   <div class="flex-1 space-y-1">
                      <div class="flex items-center gap-2 group/line">
                         <span class="text-purple-400">const</span>
                         <span class="text-blue-400">collaboration</span>
                         <span class="text-text-primary">=</span>
                         <span class="text-accent-primary">{</span>
                      </div>
                      <div class="pl-6 group/line hover:bg-white/[0.02]">
                         <span class="text-blue-300">client</span><span class="text-text-primary">:</span>
                         <span class="text-emerald-300">"YourBusiness"</span>,
                      </div>
                      <div class="pl-6 group/line">
                         <span class="text-blue-300">duration</span><span class="text-text-primary">:</span>
                         <span class="text-emerald-300">"LongTerm"</span>,
                      </div>
                      <div class="pl-6 group/line">
                         <span class="text-blue-300">status</span><span class="text-text-primary">:</span>
                         <span class="text-emerald-300">"Automated"</span>
                      </div>
                      <div class="group/line"><span class="text-accent-primary">}</span>;</div>
                      <div class="py-2"></div>
                      <div class="flex items-center gap-2 group/line">
                         <span class="text-purple-400">function</span>
                         <span class="text-amber-300">optimizeWorkflow</span><span class="text-text-primary">() {</span>
                      </div>
                      <div class="pl-6 group/line">
                         <span class="text-purple-400">while</span> <span class="text-text-primary">(isManualWork) {</span>
                      </div>
                      <div class="pl-12 group/line group-hover/ide:translate-x-1 transition-transform">
                         <span class="text-blue-300">replaceWith</span><span class="text-text-primary">(</span><span class="text-amber-300">SmartSolution</span><span class="text-text-primary">);</span>
                      </div>
                      <div class="pl-12 group/line">
                         <span class="text-blue-300">ensure</span><span class="text-text-primary">(</span><span class="text-emerald-300">"PeaceOfMind"</span><span class="text-text-primary">);</span>
                      </div>
                      <div class="pl-6 group/line"><span>}</span></div>
                      <div class="group/line"><span>}</span></div>
                   </div>
                </div>

                <!-- Subtle Cursor Blink -->
                <div class="mt-8 flex items-center gap-2 bg-accent-primary/20 border border-accent-primary/30 rounded-lg px-4 py-2 w-fit">
                   <span class="text-[10px] font-bold text-accent-primary leading-none uppercase tracking-widest">Building your future...</span>
                   <div class="w-1.5 h-4 bg-accent-primary animate-pulse"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    <WhatsAppModal
      :isOpen="isWAModalOpen"
      initialMessage="Halo Kang Jessy! Saya ingin diskusi tentang project baru."
      category="Hero CTA"
      @close="isWAModalOpen = false"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { 
  Sparkles as SparklesIcon,
  Activity as ActivityIcon,
  MessageCircle as MessageCircleIcon,
  Mail as MailIcon,
  LayoutGrid as LayoutGridIcon,
  Database as DatabaseIcon,
  Briefcase as BriefcaseIcon,
  TrendingUp as TrendingUpIcon
} from "lucide-vue-next";
import { BaseButton } from "@kangjessy/ui";
import WhatsAppModal from "../modals/WhatsAppModal.vue";
import { siteConfig } from "../../data/config/siteConfig";

const isWAModalOpen = ref(false);

const stats = ref<Record<string, number>>({
  projects: 0,
  support: 0,
  experience: 0,
});

// Interactive Dashboard State
const liveRevenue = ref(12450);
const activeUsers = ref(842);
const chartData = ref([30, 45, 25, 60, 40, 75, 50, 90]);
const activeTooltip = ref<string | null>(null);

const formatCurrency = (val: number) => val.toLocaleString();

const toggleTooltip = (key: string) => {
  activeTooltip.value = activeTooltip.value === key ? null : key;
  if(activeTooltip.value) {
    setTimeout(() => activeTooltip.value = null, 3000);
  }
};

const updateLiveStats = () => {
  liveRevenue.value += Math.floor(Math.random() * 10) - 2;
  activeUsers.value += Math.floor(Math.random() * 5) - 2;
  // Rotate chart data
  chartData.value.shift();
  chartData.value.push(Math.floor(Math.random() * 60) + 20);
};

let statsInterval: any = null;

const formatLabel = (key: string): string => {
  const map: Record<string, string> = {
    projects: "Karya Pilihan",
    support: "Layanan Penuh",
    experience: "Tahun Melayani",
  };
  return map[key] || key;
};

const animateStatValue = (key: string, target: number, duration: number) => {
  let startTime: number | null = null;
  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    stats.value[key] = progress * target;
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
};

const triggerStatsAnimation = () => {
  const targetStats = siteConfig.heroStats;
  Object.keys(targetStats).forEach((key) => {
    const val = targetStats[key as keyof typeof targetStats];
    animateStatValue(key, val, 2000);
  });
};

const resetStatsValue = () => {
  Object.keys(stats.value).forEach((k) => {
    stats.value[k] = 0;
  });
};

const startObserver = () => {
  const triggerEl = document.querySelector(".hero-text");
  if (!triggerEl) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) triggerStatsAnimation();
      else resetStatsValue();
    },
    { threshold: 0.5 },
  );
  observer.observe(triggerEl);
};

onMounted(() => {
  setTimeout(startObserver, 200);
  statsInterval = setInterval(updateLiveStats, 3000);
});

onUnmounted(() => {
  if(statsInterval) clearInterval(statsInterval);
});
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float-slow {
  animation: float 6s infinite ease-in-out;
}

.animate-float-delayed {
  animation: float 6s infinite ease-in-out -3s;
}

/* Tooltip Transition */
.v-enter-active,
.v-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}
</style>
