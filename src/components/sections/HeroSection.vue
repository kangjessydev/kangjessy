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
            class="text-[clamp(2rem,6vw,4rem)] leading-[1.1] font-bold text-text-primary mb-6 tracking-[-0.04em]"
          >
            Bikin Bisnis Kamu
            <span class="relative inline-block">
              <span
                class="bg-clip-text text-transparent bg-linear-to-r from-accent-primary to-accent-secondary"
                >Auto-Pilot</span
              >
              <!-- Snake Line Underline -->
              <span
                class="absolute bottom-2 left-0 w-full h-2 bg-accent-primary/20 -z-10 rounded-sm"
              ></span>
            </span>
          </h1>
          <p
            class="text-text-secondary mb-10 max-w-[540px] text-[clamp(1rem,2vw,1.2rem)] leading-[1.6] mx-auto md:mx-0"
          >
            Dari landing page yang jago jualan sampai sistem internal yang rapi.
            Saya bantu beresin tantangan teknis kamu, biar kamu bisa fokus
            besarin bisnis.
          </p>

          <div
            class="flex flex-wrap gap-4 mb-14 justify-center md:justify-start"
          >
            <BaseButton
              variant="primary"
              aria-label="Let's Talk via WhatsApp"
              @click="isWAModalOpen = true"
              >Let's Talk</BaseButton
            >
            <BaseButton
              href="#projects"
              aria-label="View my works"
              variant="secondary"
              >View Work</BaseButton
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
                {{ Math.floor(val) }}+
              </h3>
              <p
                class="text-[clamp(0.7rem,1.5vw,0.75rem)] uppercase tracking-widest font-semibold text-text-secondary"
              >
                {{ formatLabel(String(key)) }}
              </p>
            </div>
          </div>
        </header>

        <!-- Hero Image Mockup (Code Window) -->
        <div class="relative animate-float">
          <div
            class="rounded-xl bg-bg-tertiary border border-border-color shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            <!-- Mac Style Window Header -->
            <div
              class="bg-bg-secondary px-[18px] py-[14px] flex gap-2 border-b border-border-color"
            >
              <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
            </div>
            <!-- Code Editor Space -->
            <div
              class="p-6 md:p-[30px] font-mono text-[13px] md:text-[14px] text-left min-h-[180px] md:h-[220px] overflow-hidden"
            >
              <pre
                class="m-0 whitespace-pre-wrap md:whitespace-pre"
              ><code ref="codeContainerRef"></code><span class="inline-block animate-pulse text-accent-primary">|</span></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Down Icon -->
    <div
      aria-label="Scroll down to content"
      role="button"
      class="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-70 transition-all hover:opacity-100 cursor-pointer hidden md:flex flex-col items-center gap-3"
      @click="scrollToNext"
    >
      <div class="flex flex-col items-center">
        <span
          class="text-[clamp(0.65rem,1.5vw,0.7rem)] uppercase tracking-[0.2em] font-bold text-text-secondary mb-2"
          >Scroll</span
        >
        <div
          class="w-[24px] h-[40px] border-2 border-text-secondary/30 rounded-full relative"
        >
          <div
            class="w-1.5 h-1.5 bg-accent-primary rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-scroll-wheel"
          ></div>
        </div>
      </div>
      <ChevronDownIcon :size="20" class="text-accent-primary animate-bounce" />
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
  ChevronDown as ChevronDownIcon,
  Sparkles as SparklesIcon,
} from "lucide-vue-next";
import { BaseButton } from "@kangjessy/ui";
import WhatsAppModal from "../modals/WhatsAppModal.vue";
import { siteConfig } from "../../data/config/siteConfig";
import { useSiteSettings } from "../../composables/useSiteSettings";

const isWAModalOpen = ref(false);
const { settings } = useSiteSettings();

const stats = ref<Record<string, number>>({
  projects: 0,
  bugfix: 0,
  experience: 0,
});
const typewriterSessionId = ref(0);
const codeContainerRef = ref<HTMLElement | null>(null);

const codeLines = [
  { text: "const ", cls: "text-[#c678dd]" },
  { text: "developer ", cls: "text-[#e06c75]" },
  { text: "= {\n  name: ", cls: "text-[#a1a1a1]" },
  { text: '"Your Name"', cls: "text-[#98c379]" },
  { text: ",\n  role: ", cls: "text-[#a1a1a1]" },
  { text: '"Fullstack"', cls: "text-[#98c379]" },
  { text: "\n};\n\n", cls: "text-[#a1a1a1]" },
  { text: "if ", cls: "text-[#c678dd]" },
  { text: "(coffee.empty) ", cls: "text-[#a1a1a1]" },
  { text: "{\n  dev.code();\n}", cls: "text-[#61afef]" },
];

const formatLabel = (key: string): string => {
  const map: Record<string, string> = {
    projects: "Project Selesai",
    bugfix: "Bug Berhasil Dimatikan",
    experience: "Tahun Ngulik Kode",
  };
  return map[key] || key;
};

const runTypewriter = () => {
  const currentSession = ++typewriterSessionId.value;
  let tokenIndex = 0;
  let charIndex = 0;

  const type = () => {
    if (currentSession !== typewriterSessionId.value) return;

    const container = codeContainerRef.value;
    if (!container) return;

    if (tokenIndex < codeLines.length) {
      const token = codeLines[tokenIndex];
      if (!token) return;

      if (charIndex === 0) {
        const span = document.createElement("span");
        if (token.cls) span.className = token.cls;
        container.appendChild(span);
      }

      const activeSpan = container.lastElementChild as HTMLElement;
      if (activeSpan) {
        activeSpan.innerHTML += token.text[charIndex++];
      }

      if (charIndex >= token.text.length) {
        tokenIndex++;
        charIndex = 0;
      }
      setTimeout(type, 50);
    } else {
      setTimeout(() => {
        if (currentSession === typewriterSessionId.value) {
          const c = codeContainerRef.value;
          if (c) {
            c.innerHTML = "";
            tokenIndex = 0;
            charIndex = 0;
            type();
          }
        }
      }, 5000);
    }
  };
  type();
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
  const targetStats = settings.value.marketingStats;
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

const scrollToNext = () => {
  const targetEl = document.getElementById("why-choose");
  if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
  runTypewriter();
  setTimeout(startObserver, 200);
});

onUnmounted(() => {
  typewriterSessionId.value++;
});
</script>
