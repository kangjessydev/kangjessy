<template>
  <!-- 1. Loading State -->
  <div
    v-if="loading"
    class="min-h-screen bg-bg-primary flex items-center justify-center"
  >
    <div class="space-y-4 text-center">
      <div
        class="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto"
      ></div>
      <p
        class="text-text-tertiary animate-pulse font-bold uppercase tracking-widest text-xs"
      >
        Memuat Detail Proyek...
      </p>
    </div>
  </div>

  <!-- 2. Project Detail State -->
  <div class="min-h-screen bg-bg-primary" v-else-if="project">
    <!-- Hero Section -->
    <header
      class="relative pt-28 pb-14 md:pt-44 md:pb-20 border-b border-white/5"
    >
      <div class="container mx-auto px-4 sm:px-6 max-w-6xl">
        <!-- Back link -->
        <router-link
          to="/projects"
          class="inline-flex items-center gap-1.5 text-text-tertiary text-[0.72rem] font-semibold mb-10 transition-colors hover:text-text-primary group"
        >
          <ArrowLeftIcon :size="14" class="transition-transform group-hover:-translate-x-0.5" />
          Semua Proyek
        </router-link>

        <!-- Eyebrow: category + live badge -->
        <div class="flex items-center gap-3 mb-4">
          <span class="w-7 h-px bg-accent-primary/60 block"></span>
          <span class="text-[0.58rem] font-black uppercase tracking-[0.2em] text-accent-primary">
            {{ project.category }}
          </span>
          <span class="text-[0.58rem] font-black uppercase tracking-[0.2em] text-accent-primary">
            {{ project.category }}
          </span>
        </div>

        <!-- Title -->
        <h1
          class="text-[clamp(2.2rem,8vw,4rem)] font-black m-0 text-white leading-[1.04] tracking-tighter mb-5"
        >
          {{ project.title }}
        </h1>

        <!-- Lead / description -->
        <p class="text-[clamp(0.95rem,1.8vw,1.05rem)] text-text-secondary leading-relaxed max-w-[580px] mb-10">
          {{ project.description || project.excerpt }}
        </p>

        <!-- Meta strip: 3 universal fields with icons -->
        <div class="flex flex-wrap items-center gap-0">
          <!-- Klien -->
          <div class="flex items-center gap-2.5 pr-6 mr-6 border-r border-white/8">
            <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-text-tertiary shrink-0">
              <Building2Icon :size="13" />
            </div>
            <div>
              <div class="text-[0.5rem] font-bold uppercase tracking-[0.14em] text-text-tertiary mb-0.5">Klien</div>
              <div class="text-[0.8rem] font-bold text-text-primary leading-none">{{ project.client || 'Internal' }}</div>
            </div>
          </div>
          <!-- Selesai -->
          <div class="flex items-center gap-2.5 pr-6 mr-6 border-r border-white/8">
            <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-text-tertiary shrink-0">
              <CalendarIcon :size="13" />
            </div>
            <div>
              <div class="text-[0.5rem] font-bold uppercase tracking-[0.14em] text-text-tertiary mb-0.5">Selesai</div>
              <div class="text-[0.8rem] font-bold text-text-primary leading-none">{{ project.date || '-' }}</div>
            </div>
          </div>
          <!-- Industri -->
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-text-tertiary shrink-0">
              <PackageIcon :size="13" />
            </div>
            <div>
              <div class="text-[0.5rem] font-bold uppercase tracking-[0.14em] text-text-tertiary mb-0.5">Industri</div>
              <div class="text-[0.8rem] font-bold text-text-primary leading-none">{{ project.category }}</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>

      <!-- ═══ COVER IMAGE ═══ -->
      <div v-if="project.mainImage" class="px-4 sm:px-6 max-w-6xl mx-auto pt-10 md:pt-14">
        <img
          :src="project.mainImage"
          :alt="project.title"
          class="w-full aspect-[16/7] object-cover rounded-2xl md:rounded-3xl border border-white/5 block"
          loading="eager"
        />
      </div>

      <!-- ═══ BODY: Prose + Sidebar ═══ -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-20 items-start">

          <!-- LEFT: Prose -->
          <div id="deep-dive-section">

            <!-- Rich Prose Content (one rich-text field from CMS) -->
            <div v-if="project.content" class="rich-content" v-html="renderedContent"></div>

            <!-- Fallback jika belum ada content field -->
            <div v-else-if="project.challenge || project.description || project.excerpt" class="rich-content">
              <p class="text-text-secondary leading-relaxed text-[clamp(1rem,2vw,1.1rem)]">
                {{
                  (typeof project.challenge === 'string' ? project.challenge : project.challenge?.description) ||
                  project.description ||
                  project.excerpt
                }}
              </p>
            </div>

            <!-- Metrics Strip -->
            <div
              v-if="project.metrics && project.metrics.length"
              class="grid grid-cols-2 sm:grid-cols-3 gap-3 my-10 p-6 md:p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl"
            >
              <div
                v-for="(metric, i) in project.metrics"
                :key="i"
                class="text-center"
                :class="metric.proofImage ? 'cursor-zoom-in' : ''"
                @click="metric.proofImage ? openLightbox(metric.proofImage) : null"
              >
                <div class="text-[clamp(1.8rem,5vw,2.4rem)] font-black text-white leading-none tracking-tight mb-1.5">{{ metric.value }}</div>
                <div class="text-[0.58rem] font-black text-emerald-400/70 uppercase tracking-[0.18em]">{{ metric.label }}</div>
              </div>
            </div>

            <!-- Tech Stack Chips -->
            <div v-if="project.technologies && project.technologies.length" class="mt-10 pt-8 border-t border-white/5">
              <div class="text-[0.58rem] font-black uppercase tracking-[0.16em] text-text-tertiary mb-4">Tech &amp; Tools</div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.technologies"
                  :key="tag"
                  class="px-4 py-2 bg-bg-secondary border border-white/5 rounded-full text-[0.78rem] text-text-secondary font-bold hover:text-white hover:border-white/15 transition-all cursor-default"
                >{{ tag }}</span>
              </div>
            </div>

            <!-- Share Box -->
            <div class="mt-14 pt-8 border-t border-white/5">
              <p class="text-[0.72rem] font-black uppercase tracking-[0.15em] text-text-tertiary mb-5">Bagikan Proyek</p>
              <div class="flex flex-wrap gap-3">
                <button @click="shareOnTwitter" class="px-5 py-2.5 rounded-full border border-white/8 bg-bg-secondary text-text-secondary font-bold flex items-center gap-2 transition-all hover:border-white/20 hover:text-white text-[0.8rem] cursor-pointer">
                  <Twitter :size="15" class="shrink-0" /> Twitter
                </button>
                <button @click="shareOnLinkedIn" class="px-5 py-2.5 rounded-full border border-white/8 bg-bg-secondary text-text-secondary font-bold flex items-center gap-2 transition-all hover:border-white/20 hover:text-white text-[0.8rem] cursor-pointer">
                  <LinkedinIcon :size="15" class="shrink-0" /> LinkedIn
                </button>
                <button @click="copyLink" class="px-5 py-2.5 rounded-full border border-white/8 bg-bg-secondary text-text-secondary font-bold flex items-center gap-2 transition-all hover:border-white/20 hover:text-white text-[0.8rem] cursor-pointer">
                  <Copy :size="15" class="shrink-0" /> Salin Link
                </button>
              </div>
            </div>
          </div>

          <!-- RIGHT: Sidebar -->
          <aside class="hidden lg:block relative font-sans h-fit sticky top-32">
            <div class="space-y-5">
              <!-- Access card -->
              <div class="bg-bg-secondary/80 backdrop-blur-xl border border-white/5 rounded-[24px] p-6 shadow-xl">
                <h3 class="text-[0.6rem] font-black text-text-tertiary uppercase tracking-[0.15em] mb-4">Akses Proyek</h3>
                <div class="flex flex-col gap-3">
                  <BaseButton v-if="project.liveUrl || project.demoUrl" variant="primary" size="lg" class="w-full shadow-lg shadow-accent-primary/20" @click="handlePreviewClick">
                    <ExternalLinkIcon :size="16" class="mr-2" />
                    <span>{{ project.liveUrl ? 'Live Preview' : 'Lihat Demo' }}</span>
                  </BaseButton>
                  <BaseButton v-else variant="primary" size="lg" class="w-full" @click="openContact">
                    <MessageCircleIcon :size="16" class="mr-2" />
                    <span>Tanya Detail Teknis</span>
                  </BaseButton>
                  <BaseButton v-if="project.githubUrl" :href="project.githubUrl" variant="outline" size="lg" class="w-full hover:bg-white/5" target="_blank">
                    <GithubIcon :size="16" class="mr-2" />
                    <span>Lihat Kode</span>
                  </BaseButton>
                  <p v-if="!project.githubUrl" class="text-[0.65rem] text-text-tertiary italic leading-relaxed text-center">
                    * Kode sumber bersifat rahasia (NDA) untuk melindungi aset bisnis klien.
                  </p>
                </div>
              </div>
              <!-- Detail card -->
              <div class="border border-white/5 rounded-[24px] p-6">
                <h3 class="text-[0.6rem] font-black text-text-tertiary uppercase tracking-[0.15em] mb-4">Detail</h3>
                <div>
                  <div class="flex justify-between items-center py-2.5 border-b border-white/5 text-[0.78rem]">
                    <span class="text-text-tertiary font-semibold">Klien</span>
                    <span class="text-text-primary font-bold text-right">{{ project.client || 'Internal' }}</span>
                  </div>
                  <div class="flex justify-between items-center py-2.5 border-b border-white/5 text-[0.78rem]">
                    <span class="text-text-tertiary font-semibold">Selesai</span>
                    <span class="text-text-primary font-bold">{{ project.date || '-' }}</span>
                  </div>
                  <div class="flex justify-between items-center py-2.5 border-b border-white/5 text-[0.78rem]">
                    <span class="text-text-tertiary font-semibold">Kategori</span>
                    <span class="text-text-primary font-bold">{{ project.category }}</span>
                  </div>
                  <div class="flex justify-between items-center py-2.5 text-[0.78rem]">
                    <span class="text-text-tertiary font-semibold">Platform</span>
                    <span class="text-text-primary font-bold text-right">{{ project.technologies?.[0] || project.tags?.[0] || '-' }}</span>
                  </div>
                </div>
              </div>
              <!-- CTA card -->
              <div class="border border-white/5 rounded-[24px] p-6 space-y-4">
                <h3 class="text-[0.9rem] font-black text-white tracking-tight leading-snug">Membangun sesuatu yang serupa?</h3>
                <p class="text-[0.8rem] text-text-secondary leading-relaxed opacity-70">Diskusikan strategi teknis yang paling efisien untuk proyek Anda.</p>
                <BaseButton variant="outline" size="lg" class="w-full border-white/10 hover:bg-white/5" @click="openContact">Mulai Diskusi</BaseButton>
              </div>
            </div>
          </aside>

        </div>
      </div>

      <!-- ═══ GALLERY ═══ -->
      <section v-if="project.gallery && project.gallery.length" class="border-t border-white/5 pt-12 pb-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <p class="text-[0.58rem] font-black uppercase tracking-[0.18em] text-text-tertiary mb-1.5">Galeri Proyek</p>
            <h3 class="text-[clamp(1.2rem,3vw,1.6rem)] font-black text-white tracking-tight">Eksplorasi Visual</h3>
          </div>
          <div class="flex gap-2">
            <button class="w-10 h-10 rounded-xl bg-bg-secondary border border-white/5 flex items-center justify-center text-text-primary transition-all hover:border-accent-primary/40 hover:text-accent-primary active:scale-95" @click="scrollGallery('left')"><ChevronLeft :size="18" /></button>
            <button class="w-10 h-10 rounded-xl bg-bg-secondary border border-white/5 flex items-center justify-center text-text-primary transition-all hover:border-accent-primary/40 hover:text-accent-primary active:scale-95" @click="scrollGallery('right')"><ChevronRight :size="18" /></button>
          </div>
        </div>
        <div class="overflow-x-auto no-scrollbar scroll-smooth" ref="scrollContainer">
          <div class="flex gap-4 w-max pb-3">
            <div
              v-for="(img, idx) in project.gallery"
              :key="idx"
              class="w-[80vw] max-w-[480px] md:w-[400px] aspect-video bg-bg-secondary rounded-2xl border border-white/5 cursor-zoom-in overflow-hidden group shrink-0 relative"
              @click="openLightbox(urlFor(img).url())"
            >
              <img :src="urlFor(img).url()" :alt="project.title + ' ' + (Number(idx) + 1)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ CTA BANNER ═══ -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div class="border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 class="text-[clamp(1.1rem,2.5vw,1.45rem)] font-black text-white tracking-tight mb-2">Punya tantangan teknis serupa?</h3>
            <p class="text-[0.88rem] text-text-secondary leading-relaxed opacity-70">Ceritakan masalah Anda. Saya spesialis dalam situasi yang sudah dicoba orang lain tapi gagal.</p>
          </div>
          <BaseButton variant="primary" size="lg" class="shrink-0 shadow-lg shadow-accent-primary/20 md:min-w-[180px]" @click="openContact">
            <MessageCircleIcon :size="16" class="mr-2" />Mulai Diskusi
          </BaseButton>
        </div>
      </div>

      <!-- ═══ FAQ (Hidden) ═══ 
      <section class="border-t border-white/5 pt-16 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div class="mb-10">
          <p class="text-[0.58rem] font-black uppercase tracking-[0.18em] text-text-tertiary mb-2">FAQ</p>
          <h2 class="text-[clamp(1.4rem,3vw,2rem)] font-black text-white tracking-tight">Pertanyaan Umum</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(faq, i) in displayFAQs"
            :key="i"
            class="p-6 bg-bg-secondary/30 border border-white/5 rounded-2xl hover:bg-bg-secondary/60 transition-all group"
          >
            <p class="text-[0.8rem] font-black text-white mb-3 leading-snug group-hover:text-accent-primary transition-colors">{{ faq.q }}</p>
            <p class="text-[0.82rem] text-text-secondary leading-relaxed opacity-80">{{ faq.a }}</p>
          </div>
        </div>
      </section>
      -->
    </main>


    <!-- Modals & Overlays (Placed inside v-else-if for structure) -->

    <!-- Desktop Floating Action Bar -->
    <div
      class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1000] hidden lg:flex transition-all duration-500"
      :class="
        showDesktopBar
          ? 'translate-y-0 opacity-100'
          : 'translate-y-20 opacity-0 pointer-events-none'
      "
    >
      <div
        class="bg-bg-secondary/90 backdrop-blur-3xl border border-white/10 rounded-full p-2 pl-6 shadow-2xl flex items-center gap-6 ring-1 ring-white/5"
      >
        <div class="flex flex-col">
          <span
            class="text-[10px] font-bold text-text-tertiary uppercase tracking-wider"
            >Sedang Membaca</span
          >
          <span class="text-sm font-bold text-white max-w-[200px] truncate">{{
            project.title
          }}</span>
        </div>
        <div class="w-px h-8 bg-white/10"></div>
        <div class="flex items-center gap-2">
          <BaseButton
            v-if="project.liveUrl || project.demoUrl"
            variant="primary"
            size="md"
            class="rounded-full! px-6! h-10! text-xs font-bold"
            @click="handlePreviewClick"
          >
            Live Preview
            <ExternalLinkIcon :size="14" class="ml-2" />
          </BaseButton>
          <BaseButton
            v-else-if="project.githubUrl"
            :href="project.githubUrl"
            variant="outline"
            size="md"
            target="_blank"
            class="rounded-full! px-6! h-10! text-xs font-bold border-white/10 hover:bg-white/5"
          >
            Lihat Kode
            <GithubIcon :size="14" class="ml-2" />
          </BaseButton>
          <BaseButton
            v-else
            @click="openContact"
            variant="primary"
            size="md"
            class="rounded-full! px-6! h-10! text-xs font-bold"
          >
            Tanya Detail
          </BaseButton>

          <button
            @click="openContact"
            class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
            title="Hubungi Saya"
          >
            <MessageCircleIcon :size="18" />
          </button>
          <!-- Scroll to Top Shortcut -->
          <button
            @click="scrollToTop"
            class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-tertiary hover:text-white transition-colors ml-1"
            title="Kembali ke Atas"
          >
            <ChevronLeft :size="18" class="rotate-90" />
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Teleport to="body">
        <Transition enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="showToast"
                class="fixed bottom-5 right-5 z-[3000] flex items-center gap-3 bg-bg-secondary border border-accent-primary/50 text-text-primary px-5 py-3 rounded-xl shadow-2xl shadow-accent-primary/10">
                <ShieldCheck :size="18" class="text-accent-primary shrink-0" />
                <span class="font-bold text-sm">{{ toastMessage }}</span>
            </div>
        </Transition>
    </Teleport>

    <!-- Floating Action Bar (Mobile) -->
    <div
      class="fixed bottom-[84px] left-4 right-4 z-[1100] lg:hidden transition-all duration-500 animate-fade-in-up pb-safe"
      :class="{ 'opacity-0 pointer-events-none translate-y-10': isLinksOpen }"
    >
      <div
        class="bg-bg-secondary/90 backdrop-blur-2xl border border-white/10 rounded-[28px] p-3 pl-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4"
      >
        <div class="flex flex-col flex-1 min-w-0">
          <span
            class="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-0.5"
            >Studi Kasus</span
          >
          <span class="text-[14px] font-bold text-white truncate pr-2">{{
            project.title
          }}</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="project.liveUrl || project.githubUrl"
            class="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent-primary active:scale-95 transition-all hover:bg-white/10"
            @click="isLinksOpen = true"
          >
            <LayersIcon :size="20" />
          </button>
          <button
            class="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-all hover:bg-white/10"
            @click="openContact"
          >
            <MessageCircleIcon :size="20" />
          </button>
          <BaseButton
            variant="primary"
            class="rounded-2xl! px-6! h-11! font-bold text-[13px] shadow-lg"
            @click="project.liveUrl || project.demoUrl ? handlePreviewClick() : openContact()"
          >
            {{ project.liveUrl || project.demoUrl ? "Live Preview" : "Mulai" }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Links BottomSheet -->
    <BottomSheet v-model="isLinksOpen" title="Akses Proyek" :icon="LayersIcon">
      <div class="px-6 py-8 space-y-6 pb-10">
        <div class="grid grid-cols-1 gap-4">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            class="flex items-center gap-5 p-5 bg-bg-tertiary/50 border border-white/5 rounded-[24px] active:bg-accent-primary/10 transition-colors group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform"
            >
              <GlobeIcon :size="24" />
            </div>
            <div class="flex flex-col flex-1">
              <span class="text-[15px] font-bold text-text-primary"
                >Live Preview</span
              >
              <span
                class="text-[11px] text-text-tertiary uppercase tracking-wider mt-0.5"
                >Buka di Tab Baru</span
              >
            </div>
            <ExternalLinkIcon :size="18" class="text-text-tertiary" />
          </a>
          <button
            v-else-if="project.demoUrl"
            @click="isLinksOpen = false; handlePreviewClick()"
            class="flex items-center gap-5 p-5 bg-bg-tertiary/50 border border-white/5 rounded-[24px] active:bg-accent-primary/10 transition-colors group w-full text-left"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform"
            >
              <MonitorIcon :size="24" />
            </div>
            <div class="flex flex-col flex-1">
              <span class="text-[15px] font-bold text-text-primary"
                >Demo Preview</span
              >
              <span
                class="text-[11px] text-text-tertiary uppercase tracking-wider mt-0.5"
                >Versi Demonstrasi</span
              >
            </div>
            <ExternalLinkIcon :size="18" class="text-text-tertiary" />
          </button>
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            class="flex items-center gap-5 p-5 bg-bg-tertiary/50 border border-white/5 rounded-[24px] active:bg-white/10 transition-colors group"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform"
            >
              <GithubIcon :size="24" />
            </div>
            <div class="flex flex-col flex-1">
              <span class="text-[15px] font-bold text-text-primary"
                >Lihat Kode Sumber</span
              >
              <span
                class="text-[11px] text-text-tertiary uppercase tracking-wider mt-0.5"
                >Repositori Terbuka</span
              >
            </div>
            <ExternalLinkIcon :size="18" class="text-text-tertiary" />
          </a>
          <div
            v-if="!project.liveUrl && !project.githubUrl"
            class="py-12 text-center bg-white/5 rounded-[24px] border border-dashed border-white/10"
          >
            <LockIcon
              :size="32"
              class="text-text-tertiary mx-auto mb-4 opacity-30"
            />
            <p
              class="text-xs text-text-tertiary font-bold uppercase tracking-widest"
            >
              Konten Internal / NDA
            </p>
          </div>
        </div>
        <div class="pt-6 border-t border-white/5">
          <BaseButton
            variant="primary"
            size="lg"
            class="w-full h-14! text-[15px] shadow-xl"
            @click="openContact"
          >
            Diskusikan Proyek Serupa</BaseButton
          >
        </div>
      </div>
    </BottomSheet>

    <!-- Lightbox -->
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
          v-if="selectedImage"
          class="fixed inset-0 bg-black/95 backdrop-blur-xl z-[10000] overflow-y-auto cursor-zoom-out"
          @click="selectedImage = null"
        >
          <!-- Fixed Close Button -->
          <button
            @click.stop="selectedImage = null"
            class="fixed top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-bg-secondary/80 hover:bg-accent-primary backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white transition-all z-[10001] shadow-2xl"
          >
            <XIcon :size="24" />
          </button>

          <!-- Image Container with Safe Centering -->
          <div 
            class="min-h-screen w-full flex justify-center p-4 md:p-12"
            style="align-items: safe center;"
          >
            <div
              class="relative w-full max-w-6xl cursor-default outline-none pb-12 pt-4"
              @click.stop
            >
              <img
                 :src="selectedImage"
                 alt="Gallery Preview"
                 class="w-full h-auto rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Demo Info Modal (Desktop popup + Mobile BottomSheet) -->
    <!-- Desktop modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isDemoModalOpen"
          class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9000] hidden lg:flex items-center justify-center p-6"
          @click.self="isDemoModalOpen = false"
        >
          <Transition
            enter-active-class="transition duration-250 ease-out"
            enter-from-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
          >
            <div
              v-if="isDemoModalOpen"
              class="bg-bg-secondary border border-white/8 rounded-[24px] p-8 w-full max-w-[420px] shadow-2xl"
            >
              <!-- Close -->
              <div class="flex justify-end mb-4">
                <button
                  @click="isDemoModalOpen = false"
                  class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-tertiary hover:text-white transition-colors"
                >
                  <XIcon :size="16" />
                </button>
              </div>
              <!-- Icon -->
              <div
                class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                :class="project?.demoType === 'nda' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'"
              >
                <LockIcon v-if="project?.demoType === 'nda'" :size="22" />
                <MonitorIcon v-else :size="22" />
              </div>
              <!-- Content -->
              <h4 class="text-[1rem] font-black text-white tracking-tight mb-2">{{ demoInfo.title }}</h4>
              <p class="text-[0.82rem] text-text-secondary leading-relaxed mb-6" v-html="demoInfo.message"></p>
              <!-- Actions -->
              <div class="flex gap-3">
                <BaseButton
                  v-if="project?.demoUrl"
                  :href="project.demoUrl"
                  variant="primary"
                  size="lg"
                  class="flex-1"
                  target="_blank"
                  @click="isDemoModalOpen = false"
                >{{ demoInfo.buttonText }}</BaseButton>
                <BaseButton
                  v-else
                  variant="primary"
                  size="lg"
                  class="flex-1"
                  @click="isDemoModalOpen = false; openContact()"
                >{{ demoInfo.buttonText }}</BaseButton>
                <BaseButton
                  variant="ghost"
                  size="lg"
                  class="flex-1"
                  @click="isDemoModalOpen = false"
                >Tutup</BaseButton>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Mobile BottomSheet (existing) -->
    <BottomSheet
      v-model="isDemoModalOpen"
      :title="demoInfo.title"
      :icon="project?.demoType === 'nda' ? LockIcon : MonitorIcon"
      class="lg:hidden"
    >
      <div class="p-8 text-center space-y-6">
        <div
          class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
          :class="project?.demoType === 'nda' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'"
        >
          <LockIcon v-if="project?.demoType === 'nda'" :size="32" />
          <MonitorIcon v-else :size="32" />
        </div>
        <div class="space-y-3">
          <h4 class="text-xl font-bold text-white">{{ demoInfo.title }}</h4>
          <p class="text-sm text-text-secondary leading-relaxed" v-html="demoInfo.message"></p>
        </div>
        <div class="pt-4 space-y-3">
          <BaseButton
            v-if="project?.demoUrl"
            :href="project.demoUrl"
            variant="primary"
            size="lg"
            class="w-full"
            target="_blank"
            @click="isDemoModalOpen = false"
          >{{ demoInfo.buttonText }}</BaseButton>
          <BaseButton
            v-else
            variant="primary"
            size="lg"
            class="w-full"
            @click="isDemoModalOpen = false; openContact()"
          >{{ demoInfo.buttonText }}</BaseButton>
          <BaseButton
            variant="ghost"
            size="md"
            class="w-full"
            @click="isDemoModalOpen = false"
          >Tutup</BaseButton>
        </div>
      </div>
    </BottomSheet>
  </div>

  <!-- 3. 404 State -->
  <div
    v-else
    class="min-h-screen bg-bg-primary flex flex-col items-center justify-center space-y-8 p-10"
  >
    <div
      class="w-24 h-24 bg-bg-secondary rounded-full flex items-center justify-center border border-white/5"
    >
      <div class="w-12 h-12 text-text-tertiary">
        <XIcon :size="48" />
      </div>
    </div>
    <div class="text-center space-y-2">
      <h2 class="text-3xl font-black text-white italic">
        Proyek Tidak Ditemukan
      </h2>
      <p class="text-text-secondary">
        Proyek mungkin belum di-publish atau URL salah.
      </p>
    </div>
    <BaseButton to="/projects" variant="secondary" size="lg"
      >Kembali ke Portofolio</BaseButton
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import { useSEO } from "../../composables/useSEO";
import { urlFor } from "../../services/portfolioService";
import { portfolioService } from "../../services/portfolioService";
import { projectsData } from "../../data/landing/projects"; // Direct import for instant load
import { usePopupManager, Popups } from "../../composables/usePopupManager";
import { BaseButton } from "@kangjessy/ui";
import { BottomSheet } from "@kangjessy/ui";

import {
  ArrowLeft as ArrowLeftIcon,
  ExternalLink as ExternalLinkIcon,
  Github as GithubIcon,
  X as XIcon,
  ChevronLeft,
  ChevronRight,
  Globe as GlobeIcon,
  Layers as LayersIcon,
  ShieldCheck,
  MessageCircle as MessageCircleIcon,
  Lock as LockIcon,
  Monitor as MonitorIcon,
  Building2 as Building2Icon,
  Calendar as CalendarIcon,
  Package as PackageIcon,
  Twitter, 
  Linkedin as LinkedinIcon, 
  Copy, 
} from "lucide-vue-next";

const route = useRoute();
const popup = usePopupManager();

// Try to load synchronously first to prevent flicker
const slug = route.params.slug as string;
const initialProject = projectsData.find(p => p.slug === slug);

const project = ref<any>(initialProject || null);
const loading = ref(!initialProject); // Only show spinner if not found locally
const selectedImage = ref<string | null>(null);
const scrollContainer = ref<HTMLElement | null>(null);
const isLinksOpen = ref(false);
const isDemoModalOpen = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

// SEO Setup
useSEO({
  title: computed(() => project.value?.title),
  description: computed(
    () =>
      project.value?.excerpt ||
      project.value?.summary ||
      "Detail proyek portfolio KangJessy Agency.",
  ),
  image: computed(() => project.value?.mainImage),
  url: computed(() => `/project/${route.params.slug}`),
});

const showDesktopBar = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const setupScrollObserver = () => {
  const deepDiveSection = document.getElementById("deep-dive-section");
  if (!deepDiveSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Show bar if Deep Dive section is intersecting (visible)
        // You might want to tweak the threshold or logic (e.g., if top of section is near top of viewport)
        showDesktopBar.value =
          entry.isIntersecting && entry.intersectionRatio > 0;
      });
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-50% 0px 0px 0px", // Trigger when section is halfway up/visible
    },
  );

  observer.observe(deepDiveSection);
};

const projectFAQs = [
  {
    q: "Berapa lama waktu pengerjaan proyek serupa?",
    a: "Tergantung kompleksitas fitur. Untuk website premium biasanya 2-4 minggu, sedangkan sistem custom bisa memakan waktu 1-3 bulan untuk hasil maksimal.",
  },
  {
    q: "Apakah saya mendapatkan akses ke source code?",
    a: "Ya, setelah proyek selesai dan serah terima dilakukan, source code sepenuhnya menjadi milik Anda (kecuali ada perjanjian khusus).",
  },
  {
    q: "Bagaimana dengan dukungan setelah proyek rilis?",
    a: "Saya memberikan garansi maintenance dan bug fixing gratis selama 30 hari pertama untuk memastikan transisi berjalan mulus.",
  },
  {
    q: "Apakah platform ini bisa di-scale di masa depan?",
    a: "Tentu. Saya membangun arsitektur kode yang modular dan terdokumentasi dengan baik agar mudah dikembangkan oleh tim developer lain nantinya.",
  },
];



const openLightbox = (url: string) => {
  selectedImage.value = url;
};

const scrollGallery = (direction: "left" | "right") => {
  if (!scrollContainer.value) return;
  const scrollAmount = 400;
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;

  if (direction === "right") {
    if (scrollLeft + clientWidth >= scrollWidth - 5) {
      scrollContainer.value.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollContainer.value.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  } else {
    if (scrollLeft <= 5) {
      scrollContainer.value.scrollTo({ left: scrollWidth, behavior: "smooth" });
    } else {
      scrollContainer.value.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  }
};

const openContact = () => {
  if (!project.value) return;
  popup.openModal(Popups.CHAT_WA, {
    initialMessage: `Halo Kang Jessy! Saya melihat portfolio "${project.value.title}" dan tertarik untuk berdiskusi tentang proyek serupa.`,
  });
};

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: "auto" });
  try {
    const slug = route.params.slug as string;

    // 1. Try fetching from Sanity first
    const sanityProject = await portfolioService.getProjectBySlug(slug);

    if (sanityProject) {
      console.log("Using Sanity data for:", slug);
      const sp = sanityProject as any;
      project.value = {
        ...sanityProject,
        id: sp._id || sp.id,
        client: sp.clientName || sp.client,
        content: sp.content || sp.description,
        demoUrl: sp.demoUrl || "",
        demoType: sp.demoType || "legacy",
        tags: sp.tags || [],
        technologies: sp.technologies || sp.tags || [],
        gallery: sanityProject.gallery || [],
        steps: sanityProject.steps || [],
        metrics: sanityProject.metrics || [],
        faqs: sanityProject.faqs || [],
        pivot: sanityProject.pivot || null,
        challenge: sanityProject.challenge || { description: "" },
      };

      // Wait for DOM update
      setTimeout(() => {
        setupScrollObserver();
      }, 500);
    } else {
      // Redirect or show 404 state if needed, for now just log
      console.warn("Project not found in Sanity:", slug);
    }
  } catch (e) {
    console.error("Error fetching project detail", e);
  } finally {
    loading.value = false;
  }
});
const handlePreviewClick = () => {
  if (!project.value) return;
  const demoUrl = project.value.demoUrl;
  const liveUrl = project.value.liveUrl;

  if (liveUrl) {
    triggerToast("Membuka Situs Live...");
    setTimeout(() => {
        window.open(liveUrl, "_blank");
    }, 800);
  } else if (demoUrl) {
    isDemoModalOpen.value = true;
  } else {
    // If no links at all, though button shouldn't show
    openContact();
  }
};

const renderedContent = computed(() => {
  if (!project.value?.content) return "";
  
  let html = "";
  // If content starts with <, treat as HTML (legacy support for other projects)
  if (project.value.content.trim().startsWith("<")) {
    html = project.value.content;
  } else {
    // Otherwise parse as Markdown
    // @ts-ignore
    html = marked.parse(project.value.content);
  }

  // Post-process HTML to wrap tables for responsiveness
  if (typeof window !== 'undefined') {
    const div = document.createElement('div');
    div.innerHTML = html;
    
    const tables = div.querySelectorAll('table');
    tables.forEach(table => {
      // Check if already wrapped
      if (table.parentElement?.classList.contains('table-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    return div.innerHTML;
  }

  return html;
});


const demoInfo = computed(() => {
  const type = project.value?.demoType || 'legacy';
  
  if (type === 'nda') {
    return {
      title: 'Akses Terbatas — NDA',
      message: `Proyek ini dilindungi perjanjian kerahasiaan (NDA) dengan klien untuk menjaga kerahasiaan data bisnis & intelektual. Preview publik tidak tersedia. Hubungi saya untuk diskusi teknis mendalam.`,
      buttonText: 'Tanya Detail Teknis'
    };
  }

  if (type === 'archive') {
    return {
      title: 'Membuka Demo Arsip',
      message: `Website asli sudah tidak aktif di domain klien (expired/migrasi). Yang akan Anda buka adalah <strong>Demo Clone</strong> yang saya hosting sendiri untuk keperluan portofolio agar fungsionalitas tetap bisa dicoba.`,
      buttonText: 'Lihat Demo Arsip'
    };
  }

  // legacy / fallback
  return {
    title: 'Membuka Demo Clone',
    message: `Proyek asli bersifat internal atau berjalan di domain privat. Yang akan dibuka adalah <strong>demo clone</strong> dengan data simulasi agar Anda bisa melihat alur kerjanya secara langsung.`,
    buttonText: 'Buka Demo'
  };
});

const triggerToast = (msg: string) => {
    toastMessage.value = msg;
    showToast.value = true;
    setTimeout(() => {
        showToast.value = false;
    }, 3000);
};

const shareOnTwitter = () => {
    if (!project.value) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${project.value.title} by KangJessy`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
};

const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
};

const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast('Link berhasil disalin!');
};

</script>

<style scoped>
.mask-linear {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* --- TOAST ANIMATIONS --- */
.translate-y-2 { transform: translateY(0.5rem); }
.translate-y-0 { transform: translateY(0px); }
.translate-x-2 { transform: translateX(0.5rem); }
.translate-x-0 { transform: translateX(0px); }
.opacity-0 { opacity: 0; }
.opacity-100 { opacity: 1; }

/* --- RICH CONTENT STYLES (MATCHES BLOG DETAIL) --- */
.rich-content {
  color: var(--text-secondary);
  font-weight: 500;
  line-height: 1.8;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 3rem;
}

.rich-content :deep(h1) {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 900;
  margin-bottom: 2rem;
  line-height: 1.1;
  color: white;
}

.rich-content :deep(h2) {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 900;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: white;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.rich-content :deep(h3) {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 800;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  color: white;
  line-height: 1.2;
}

.rich-content :deep(h4) {
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.rich-content :deep(p) {
  margin-bottom: 1.5rem;
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}

.rich-content :deep(blockquote) {
  border-left: 4px solid var(--accent-primary);
  background: linear-gradient(to right, rgba(var(--bg-secondary-rgb), 0.5), transparent);
  padding: 2.5rem 2rem;
  margin: 3rem 0;
  font-style: italic;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  border-radius: 0 1rem 1rem 0;
}

.rich-content :deep(ul) {
  list-style-type: disc;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

.rich-content :deep(ol) {
  list-style-type: decimal;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

.rich-content :deep(li) {
  margin-bottom: 0.75rem;
  line-height: 1.8;
  padding-left: 0.5rem;
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}

.rich-content :deep(li::marker) {
  color: var(--accent-primary);
  font-weight: 800;
}

.rich-content :deep(a) {
  color: var(--accent-primary);
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
  font-weight: 500;
  transition: color 0.2s;
}

.rich-content :deep(a:hover) {
  color: white;
}

.rich-content :deep(strong) {
  color: white;
  font-weight: 900;
}

.rich-content :deep(img) {
  border-radius: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  margin: 3rem 0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  width: 100%;
}

.rich-content :deep(hr) {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin: 4rem 0;
}

/* --- TABLE STYLES --- */
/* --- TABLE STYLES --- */
.rich-content :deep(.table-wrapper) {
  display: block;
  width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  margin: 2rem 0;
  background: rgba(15, 23, 42, 0.5); /* #0F172A at 50% */
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.rich-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  background: transparent;
  border: none;
}

.rich-content :deep(th) {
  text-align: left;
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.05);
}

.rich-content :deep(th:first-child) { padding-left: 2rem; }
.rich-content :deep(th:last-child) { padding-right: 2rem; }

.rich-content :deep(td) {
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  transition: background-color 0.2s;
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}

.rich-content :deep(td:first-child) { padding-left: 2rem; }
.rich-content :deep(td:last-child) { padding-right: 2rem; }

.rich-content :deep(tr:last-child td) { border-bottom: none; }
.rich-content :deep(tr:hover td) { background: rgba(255, 255, 255, 0.05); }


/* --- MAC WINDOW CODE BLOCK --- */
.rich-content :deep(pre) {
  background: #0F172A;
  border-radius: 1rem;
  padding: 3rem 1.5rem 1.5rem; /* Top padding for Traffic Lights */
  margin: 2rem 0;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  overflow: hidden;
}

/* Traffic Lights (Mac Dots) */
.rich-content :deep(pre)::before {
  content: "";
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: #ff5f56; /* Red */
  box-shadow: 1.25rem 0 0 #ffbd2e, 2.5rem 0 0 #27c93f; /* Yellow & Green */
  z-index: 10;
}

.rich-content :deep(code) {
  background: rgba(255,255,255,0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  color: var(--accent-primary);
  font-family: monospace;
  font-size: 0.95em;
}

.rich-content :deep(pre code) {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: #e2e8f0;
  display: block;
  overflow-x: auto;
  white-space: pre;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.7;
}
</style>
