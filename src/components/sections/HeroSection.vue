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
            Pelanggan Datang Sendiri.
            <span class="relative inline-block">
              <span
                class="bg-clip-text text-transparent bg-linear-to-r from-accent-primary to-accent-secondary"
                >Kerja Manual Berkurang.</span
              >
              <!-- Snake Line Underline -->
              <span
                class="absolute bottom-2 left-0 w-full h-2 bg-accent-primary/20 -z-10 rounded-sm"
              ></span>
            </span>
          </h1>
          <p
            class="text-text-secondary mb-5 max-w-[580px] text-[clamp(1rem,2vw,1.15rem)] leading-[1.6] mx-auto md:mx-0"
          >
            Saya bangun website yang jualan dan sistem yang jalan otomatis — biar kamu fokus besarin bisnis, bukan urus teknis.
          </p>

          <!-- Micro-intro: Personal Identity (Responsive optimized) -->
          <div class="flex items-center mb-10 justify-center md:justify-start">
            <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-5 py-4 sm:py-2.5 bg-bg-secondary/60 border border-border-color rounded-[28px] sm:rounded-full backdrop-blur-sm group/intro w-full sm:w-auto shadow-xl shadow-black/10">
              <div class="flex items-center gap-3">
                <!-- Avatar placeholder -->
                <div class="w-8 h-8 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary flex-shrink-0 group-hover/intro:scale-110 transition-transform">
                  <UserIcon :size="15" />
                </div>
                <span class="text-[0.9rem] sm:text-[0.8rem] text-text-secondary font-medium">
                  Halo, saya <strong class="text-text-primary font-bold">{{ siteConfig.firstName }}</strong>
                </span>
              </div>
              
              <!-- Separator for desktop -->
              <div class="hidden sm:block w-px h-4 bg-border-color mx-1"></div>

              <div class="flex items-center gap-2 sm:gap-3 text-[0.75rem] sm:text-[0.8rem] text-text-tertiary sm:text-text-secondary">
                <span>Developer</span>
                <span class="opacity-40">·</span>
                <span>{{ siteConfig.location }}</span>
                <span class="opacity-40">·</span>
                <span class="whitespace-nowrap">{{ siteConfig.heroStats.experience }}+ Thn Pengalaman</span>
              </div>

              <router-link
                to="/about"
                class="mt-1 sm:mt-0 text-[0.8rem] sm:text-[0.75rem] font-black text-accent-primary hover:opacity-80 transition-opacity whitespace-nowrap sm:border-l border-border-color sm:pl-3 sm:ml-1"
              >
                Profil →
              </router-link>
            </div>
          </div>

          <div
            class="flex flex-col sm:flex-row gap-4 mb-14 justify-center md:justify-start px-4 sm:px-0"
          >
            <BaseButton
              variant="primary"
              size="lg"
              aria-label="Let's Talk via WhatsApp"
              @click="openDirectChat()"
              class="w-full sm:w-auto justify-center"
              >Konsultasi Gratis</BaseButton
            >
            <BaseButton
              href="#projects"
              aria-label="View my works"
              variant="secondary"
              size="lg"
              class="w-full sm:w-auto justify-center"
              >Lihat Karya Pilihan</BaseButton
            >
          </div>

          <!-- Hero Stats Grid -->
          <!-- <div class="flex gap-6 sm:gap-12 justify-center md:justify-start">
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
          </div> -->
        </header>

        <!-- Hero Visual (Dynamic Display) -->
        <div class="relative group h-full">
          <!-- Premium Grid Background (Garis-garis) -->
          <div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50"></div>
          
          <!-- Glassmorphism Background Glow -->
          <div class="absolute -inset-10 bg-linear-to-r from-accent-primary/10 to-accent-secondary/10 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>

          <!-- 🟠 OPTION 3: BEFORE/AFTER SLIDER (Active Now) -->
          <div ref="sliderContainerRef" class="relative z-10 w-full h-[350px] md:h-[500px] bg-[#0c1016] rounded-4xl border border-white/10 shadow-2xl overflow-hidden group/compare select-none hero-compare-slider" style="touch-action: none;">
            
            <!-- After Image (Bottom Layer) -->
            <div class="absolute inset-0 pointer-events-none">
               <img src="/assets/hero/after.png" 
                    alt="Premium Dashboard After" 
                    draggable="false"
                    @dragstart.prevent
                    class="w-full h-full object-cover" />
               <div class="absolute bottom-6 right-8 px-4 py-1.5 bg-emerald-500/80 text-white text-[10px] font-black rounded-full backdrop-blur-md uppercase tracking-widest border border-white/20">AFTER</div>
            </div>

            <!-- Before Image (Top Layer, Clipped) -->
            <div class="absolute inset-0 pointer-events-none" :style="{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }">
               <img src="/assets/hero/before.png" 
                    alt="Messy Spreadsheet Before" 
                    draggable="false"
                    @dragstart.prevent
                    class="w-full h-full object-cover grayscale-[1.0] group-hover/compare:grayscale-[0.5] transition-all duration-700" />
               <div class="absolute bottom-6 left-8 px-4 py-1.5 bg-white/10 text-white text-[10px] font-black rounded-full backdrop-blur-md border border-white/20 uppercase tracking-widest">BEFORE</div>
            </div>

            <!-- Clickable Zones (Transparent Overlays) - NOW ONLY FOR LIGHTBOX, NO DRAG SNAP -->
            <div class="absolute inset-0 flex z-10">
               <div class="h-full cursor-zoom-in" :style="{ width: `${sliderPos}%` }" @click.stop="openLightbox(0)"></div>
               <div class="h-full flex-1 cursor-zoom-in" @click.stop="openLightbox(1)"></div>
            </div>

            <div class="absolute inset-y-0 z-30 flex items-center justify-center transition-all duration-500 ease-out -translate-x-1/2" 
                 :class="{ 'duration-0!': isDragging }"
                 :style="{ left: `${sliderPos}%` }">
               
               <!-- The Vertical Line -->
               <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[4px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"></div>
               
               <!-- Handle & Label Container -->
               <div class="relative flex flex-col items-center justify-center">
                  <!-- The Drag Circle -->
                  <div class="w-12 h-12 bg-white rounded-full shadow-[0_0_50px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-auto cursor-ew-resize border-2 border-white/20 transition-all duration-300 group-hover/compare:-translate-y-10 group-hover/compare:scale-90 active:scale-110 active:shadow-accent-primary/20">
                     <div class="flex items-center gap-0.5 text-black">
                        <ChevronLeftIcon :size="18" stroke-width="3" />
                        <ChevronRightIcon :size="18" stroke-width="3" />
                     </div>
                  </div>

                  <!-- "Lihat Perbandingan" Label (Appears on Hover) -->
                  <div class="absolute top-4 opacity-0 scale-90 group-hover/compare:opacity-100 group-hover/compare:scale-100 group-hover/compare:translate-y-4 transition-all duration-500 pointer-events-auto cursor-pointer flex flex-col items-center gap-2"
                       @click.stop="openLightbox(1)">
                     <div class="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl hover:bg-white hover:text-black transition-colors">
                        <EyeIcon :size="18" />
                     </div>
                     <span class="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap drop-shadow-lg">Lihat Perbandingan</span>
                  </div>
               </div>
            </div>


          </div>

          <!-- Lightbox Modal -->
          <Teleport to="body">
            <Transition name="fade">
               <div v-if="isLightboxOpen" class="fixed inset-0 z-99999 bg-black/98 backdrop-blur-3xl p-2 md:p-6 flex flex-col items-center justify-center" @click="isLightboxOpen = false">
                  <!-- Navigation Buttons (Desktop) -->
                  <button class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-3xl items-center justify-center text-white transition-all hover:scale-110 z-100000" 
                          @click.stop="lightboxImageIndex = (lightboxImageIndex === 0 ? 1 : 0)">
                     <ChevronLeftIcon :size="24" />
                  </button>
                  <button class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-3xl items-center justify-center text-white transition-all hover:scale-110 z-100000" 
                          @click.stop="lightboxImageIndex = (lightboxImageIndex === 0 ? 1 : 0)">
                     <ChevronRightIcon :size="24" />
                  </button>

                  <div class="relative w-full max-w-6xl bg-black/80 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(var(--accent-primary-rgb),0.2)] border border-white/5 flex flex-col" @click.stop>
                     
                     <!-- The Video Area -->
                     <div class="relative w-full aspect-video bg-black z-0">
                        <Transition mode="out-in" name="fade">
                           <div :key="lightboxImageIndex" class="absolute inset-0 w-full h-full">
                              <iframe v-if="lightboxImages[lightboxImageIndex]?.videoUrl" 
                                      :src="lightboxImages[lightboxImageIndex]?.videoUrl" 
                                      class="w-full h-full" 
                                      frameborder="0" 
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                      allowfullscreen></iframe>
                              <img v-else :src="lightboxImages[lightboxImageIndex]?.src" 
                                   class="w-full h-full object-contain" alt="Full Preview" />
                           </div>
                        </Transition>
                        
                        <!-- Navigation Arrows (Mobile) - Positioned over the video -->
                        <button class="absolute md:hidden left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-xl flex items-center justify-center text-white transition-all hover:scale-110 z-20" 
                                @click.stop="lightboxImageIndex = (lightboxImageIndex === 0 ? 1 : 0)">
                           <ChevronLeftIcon :size="20" />
                        </button>
                        <button class="absolute md:hidden right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-xl flex items-center justify-center text-white transition-all hover:scale-110 z-20" 
                                @click.stop="lightboxImageIndex = (lightboxImageIndex === 0 ? 1 : 0)">
                           <ChevronRightIcon :size="20" />
                        </button>
                        
                        <!-- Close button moving to the video container so it doesn't get pushed into the text below -->
                        <button class="absolute top-3 right-3 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-black/80 md:bg-white/10 md:hover:bg-white/20 rounded-full backdrop-blur-xl flex items-center justify-center text-white transition-colors z-1000" @click="isLightboxOpen = false">
                           ✕
                        </button>
                     </div>

                     <!-- Image Labels in Lightbox (Flows below on mobile, Absolute on tablet+) -->
                     <div class="relative p-5 pb-3 md:absolute md:bottom-6 md:left-6 md:right-6 md:p-6 bg-[#0c1016] md:bg-transparent md:bg-linear-to-t md:from-black/80 md:to-transparent md:backdrop-blur-sm md:rounded-2xl border-t border-white/5 pointer-events-none z-10 flex flex-col">
                        <h3 class="text-lg md:text-2xl font-black text-white mb-1.5 md:mb-2 tracking-tight">{{ lightboxImages[lightboxImageIndex]?.title }}</h3>
                        <p class="text-text-tertiary max-w-2xl text-[11px] md:text-sm leading-relaxed">{{ lightboxImages[lightboxImageIndex]?.desc }}</p>
                     </div>

                     <!-- Page Indicator (Absolute Overlay on desktop, Flow on mobile) -->
                     <div class="pb-5 pt-1 md:pt-0 bg-[#0c1016] md:bg-transparent flex justify-center gap-1.5 md:gap-2.5 z-20 md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2">
                        <div v-for="i in 2" :key="i" class="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 border border-white/5 shadow-xl" 
                             :class="lightboxImageIndex === i-1 ? 'bg-accent-primary w-5 md:w-8 shadow-[0_0_12px_rgba(var(--accent-primary-rgb),0.5)]' : 'bg-white/20 hover:bg-white/40'"></div>
                     </div>
                  </div>
               </div>
            </Transition>
          </Teleport>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { 
  Sparkles as SparklesIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Eye as EyeIcon,
  User as UserIcon
} from "lucide-vue-next";
import { BaseButton } from "@kangjessy/ui";
import { useWhatsApp } from "../../composables/useWhatsApp";
import { siteConfig } from "../../data/config/siteConfig";

const { openDirectChat } = useWhatsApp();

const stats = ref<Record<string, number>>({
  projects: 0,
  support: 0,
  experience: 0,
});

// Interactive Dashboard State
const liveRevenue = ref(12450);
const activeUsers = ref(842);
const chartData = ref([30, 45, 25, 60, 40, 75, 50, 90]);

// Before/After Slider State
const sliderContainerRef = ref<HTMLElement | null>(null);
const sliderPos = ref(50);
const isDragging = ref(false);
const isLightboxOpen = ref(false);
const lightboxImageIndex = ref(0);
const dragDistance = ref(0);

const lightboxImages = [
  {
    src: "/assets/hero/before.png",
    title: "Before: Operasional Terpecah & Manual",
    desc: "Berjalan tanpa sistem terpusat. Data tercecer, proses manual berulang, dan waktu habis untuk urusan teknis yang menguras energi tim Anda.",
    videoUrl: "https://www.youtube.com/embed/IWxbokFbBW4?autoplay=1"
  },
  {
    src: "/assets/hero/after.png",
    title: "After: Ekosistem Digital Terpadu",
    desc: "Infrastruktur canggih yang mensinkronisasi website pencetak leads dengan dashboard automasi. Bisnis menjadi lebih terstruktur dan siap scale-up.",
    videoUrl: "https://www.youtube.com/embed/Q1bqnIf9Gv8?autoplay=1"
  }
];

// Body Scroll Lock & Z-Index Management
watch(() => isLightboxOpen.value, (isOpen) => {
  if (isOpen) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
});

const openLightbox = (index: number) => {
  lightboxImageIndex.value = index;
  isLightboxOpen.value = true;
};

const getClientX = (e: MouseEvent | TouchEvent): number => {
  if ('touches' in e) {
    return e.touches[0]?.clientX ?? 0;
  }
  return (e as MouseEvent).clientX;
};

const updatePosition = (e: MouseEvent | TouchEvent) => {
  const container = sliderContainerRef.value;
  if (!container) return;
  
  const rect = container.getBoundingClientRect();
  const x = getClientX(e);
  
  let position = ((x - rect.left) / rect.width) * 100;
  position = Math.max(0, Math.min(100, position));
  
  sliderPos.value = position;
};

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();
  updatePosition(e);
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return;
  updatePosition(e);
};

const stopDragging = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('touchmove', onTouchMove);
  window.removeEventListener('mouseup', stopDragging);
  window.removeEventListener('touchend', stopDragging);
};

const onPointerDown = (e: MouseEvent | TouchEvent) => {
  const startX = getClientX(e);
  let hasDragged = false;

  const onMove = (moveEvent: MouseEvent | TouchEvent) => {
    const currentX = getClientX(moveEvent);
    const delta = Math.abs(currentX - startX);

    // Only commit to dragging after moving more than 5px (prevents jump on tap/click)
    if (!hasDragged && delta < 5) return;

    if (!hasDragged) {
      hasDragged = true;
      isDragging.value = true;
    }

    if ('touches' in moveEvent) {
      (moveEvent as TouchEvent & { cancelable: boolean }).cancelable && moveEvent.preventDefault();
    }
    updatePosition(moveEvent);
  };

  const onUp = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('touchmove', onMove as any);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchend', onUp);
  };

  dragDistance.value = 0;
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove as any, { passive: false });
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchend', onUp);
};



const updateLiveStats = () => {
  liveRevenue.value += Math.floor(Math.random() * 10) - 2;
  activeUsers.value += Math.floor(Math.random() * 5) - 2;
  // Rotate chart data
  chartData.value.shift();
  chartData.value.push(Math.floor(Math.random() * 60) + 20);
};

let statsInterval: any = null;



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

  // Register touchstart as NON-PASSIVE on the slider container.
  // Vue template modifiers cannot do this — browser forces passive by default,
  // which means preventDefault() inside touchmove is ignored and page scrolls instead of dragging.
  const el = sliderContainerRef.value;
  if (el) {
    el.addEventListener('mousedown', onPointerDown);
    el.addEventListener('touchstart', onPointerDown, { passive: false });
  }
});

onUnmounted(() => {
  if(statsInterval) clearInterval(statsInterval);
  // isDragging is scoped inside onPointerDown closures, no global cleanup needed
  const el = sliderContainerRef.value;
  if (el) {
    el.removeEventListener('mousedown', onPointerDown);
    el.removeEventListener('touchstart', onPointerDown);
  }
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

/* Fade Transition for Slider */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
