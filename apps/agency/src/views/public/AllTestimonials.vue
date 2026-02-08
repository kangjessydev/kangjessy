<template>
  <div class="min-h-screen bg-bg-primary pt-[120px] pb-20">
    <div class="container mt-5">
      <!-- Header -->
      <header class="mb-[60px] relative animate-fade-in-up">
        <SectionHeader align="center">
          <template #title>
            Real Results from
            <span
              class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
              >Real Partnerships</span
            >
          </template>
          <template #subtitle>
            Kumpulan cerita sukses dan pengalaman nyata dari para mitra yang
            telah bertransformasi digital bersama kami.
          </template>
        </SectionHeader>

        <!-- Share Button Integrated -->
        <div class="mt-8 flex justify-center">
          <BaseButton
            to="/share-experience"
            variant="secondary"
            size="md"
            class="group"
          >
            <PlusIcon
              :size="18"
              class="mr-2 shrink-0 text-accent-primary group-hover:rotate-90 transition-transform duration-300"
            />
            <span>Bagikan Pengalaman Anda</span>
          </BaseButton>
        </div>
      </header>

      <!-- Skeleton Loading -->
      <div
        v-if="isLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="bg-bg-secondary border border-border-color rounded-2xl p-10 relative overflow-hidden shadow-sm"
        >
          <!-- Shimmer Effect -->
          <div
            class="absolute inset-0 bg-linear-to-r from-transparent via-white/[0.03] to-transparent animate-[shimmer_1.5s_infinite]"
          ></div>

          <div class="flex justify-between mb-6">
            <div class="w-8 h-8 bg-white/5 rounded-full"></div>
            <div class="w-12 h-12 bg-white/5 rounded-xl"></div>
          </div>
          <div class="space-y-3">
            <div class="h-3 bg-white/5 rounded-md w-full"></div>
            <div class="h-3 bg-white/5 rounded-md w-[70%]"></div>
            <div class="h-3 bg-white/5 rounded-md w-[40%]"></div>
          </div>
          <div
            class="flex items-center gap-3 mt-6 pt-6 border-t border-border-color"
          >
            <div class="w-8 h-8 bg-white/5 rounded-lg"></div>
            <div class="flex-1 space-y-2">
              <div class="h-2.5 bg-white/5 rounded w-20"></div>
              <div class="h-2 bg-white/[0.03] rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonials Grid -->
      <div
        v-else-if="testimonials.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up"
      >
        <TestimonialCard
          v-for="(item, index) in testimonials"
          :key="index"
          v-bind="item"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="text-center p-20 bg-bg-secondary rounded-2xl border border-dashed border-border-color animate-fade-in-up"
      >
        <div class="text-text-tertiary mb-5">
          <MessageSquareOff :size="48" class="mx-auto shrink-0" />
        </div>
        <h3 class="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold mb-3">
          Belum Ada Testimonial
        </h3>
        <p class="text-text-secondary mb-8">
          Jadilah yang pertama untuk berbagi cerita sukses Anda bersama kami.
        </p>
        <router-link
          to="/share-experience"
          class="inline-block px-8 py-4 bg-accent-primary text-white rounded-xl font-bold hover:-translate-y-1 transition-transform"
        >
          Tulis Testimonial
        </router-link>
      </div>

      <!-- CTA Footer -->
      <div
        v-if="!isLoading"
        class="mt-24 relative overflow-hidden rounded-3xl border border-border-color bg-bg-secondary/50 backdrop-blur-md p-12 md:p-20 text-center animate-fade-in-up"
      >
        <!-- Subtle Glows -->
        <div
          class="absolute -top-24 -left-24 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full"
        ></div>
        <div
          class="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-secondary/5 blur-[100px] rounded-full"
        ></div>

        <div class="relative z-10">
          <h3
            class="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight mb-6 bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent"
          >
            Siap Menjadi Bagian dari Cerita Sukses Berikutnya?
          </h3>
          <p
            class="text-[clamp(1rem,1.5vw,1.125rem)] text-text-secondary mb-12 max-w-[600px] mx-auto leading-relaxed"
          >
            Wujudkan sistem operasional yang cerdas dan efisien untuk bisnis
            Anda. Konsultasikan kebutuhan proyek Anda sekarang tanpa biaya.
          </p>
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <BaseButton
              to="/order"
              variant="primary"
              size="lg"
              class="w-full sm:w-auto px-10"
            >
              <span>Mulai Proyek</span>
              <ArrowRightIcon :size="18" class="ml-2 shrink-0" />
            </BaseButton>
            <BaseButton
              to="/share-experience"
              variant="secondary"
              size="lg"
              class="w-full sm:w-auto px-10"
            >
              <span>Kirim Testimonial</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button Mobile -->
    <router-link
      to="/share-experience"
      class="md:hidden fixed bottom-[110px] left-5 w-14 h-14 bg-accent-primary text-white rounded-xl flex items-center justify-center shadow-[0_10px_25px_rgba(59,130,246,0.4)] z-[1000] transition-transform hover:scale-110"
    >
      <PlusIcon :size="24" class="shrink-0" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  MessageSquareOff,
  Plus as PlusIcon,
  ArrowRight as ArrowRightIcon,
} from "lucide-vue-next";
import SectionHeader from "../../components/ui/SectionHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import TestimonialCard from "../../components/ui/TestimonialCard.vue";
import { dummyTestimonials } from "../../data/landing/testimonials_dummy";
import { useSEO } from "../../composables/useSEO";

useSEO({
  title: "Client Testimonials",
  description:
    "Apa kata mereka tentang KangJessy Agency? Lihat kumpulan testimoni dan cerita sukses dari mitra kami.",
  url: "/testimonials",
});

interface Testimonial {
  name: string;
  text: string;
  jobTitle: string;
  company: string;
  companyUrl?: string;
  initials?: string;
}

const testimonials = ref<Testimonial[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    // Use dummy data first for rapid development
    testimonials.value = [...dummyTestimonials];

    // Purely use dummy data for now as per user request to remove GSheet
  } catch (e) {
    console.error("Failed to load testimonials", e);
    // Fallback to dummy data is already handled above
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Scoped styles kept for any specific tweaks, but utilizing global animate-fade-in-up */
</style>
