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
      class="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-white/5"
    >
      <!-- Dynamic Background Glow -->
      <div
        class="absolute -top-1/2 -right-[10%] w-[60%] h-[200%] blur-[120px] opacity-15 z-0 pointer-events-none rounded-full"
        :style="{ background: 'var(--accent-primary)' }"
      ></div>

      <div class="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <router-link
          to="/projects"
          class="inline-flex items-center gap-2 text-text-secondary text-sm mb-10 transition-all hover:text-accent-primary hover:-translate-x-1 group"
        >
          <ArrowLeftIcon
            :size="18"
            class="transition-transform group-hover:-translate-x-1"
          />
          <span>Kembali ke Portofolio</span>
        </router-link>

        <div class="hero-content">
          <SectionHeader :badge="project.category" align="left">
            <template #title>
              <h1
                class="text-[clamp(2rem,8vw,4.5rem)] font-black m-0 bg-linear-to-r from-white to-text-secondary bg-clip-text text-transparent leading-[1.1] tracking-tighter"
              >
                {{ project.title }}
              </h1>
            </template>
          </SectionHeader>

          <div
            class="flex flex-wrap gap-4 sm:gap-8 md:gap-12 items-center mt-10"
          >
            <div class="flex flex-col gap-2">
              <span
                class="text-[0.6rem] text-text-tertiary uppercase tracking-[0.25em] font-bold"
                >Klien</span
              >
              <span
                class="text-[clamp(0.95rem,2vw,1.1rem)] font-bold text-text-primary"
                >{{ project.client || "Proyek Internal" }}</span
              >
            </div>
            <div class="hidden sm:block w-px h-8 bg-white/10"></div>
            <div class="flex flex-col gap-2">
              <span
                class="text-[0.6rem] text-text-tertiary uppercase tracking-[0.25em] font-bold"
                >Status</span
              >
              <div class="flex items-center gap-2">
                <span
                  v-if="project?.status === 'IDEA'"
                  class="flex items-center gap-1.5 px-2.5 py-0.5 bg-accent-primary/10 border border-accent-primary/20 rounded-md text-[9px] text-accent-primary font-black uppercase tracking-wider"
                  >Concept</span
                >
                <span
                  v-else-if="
                    project?.status?.toLowerCase() === 'success' ||
                    project?.status?.toLowerCase() === 'completed'
                  "
                  class="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[0.8rem] text-emerald-400 font-bold capitalize tracking-wide"
                >
                  <ShieldCheck :size="14" />
                  {{ project?.status?.toLowerCase() }}
                </span>
                <span
                  v-else
                  class="text-[clamp(0.95rem,2vw,1.1rem)] font-bold text-text-primary capitalize"
                  >{{ project?.status || "Selesai" }}</span
                >
              </div>
            </div>
            <div class="hidden sm:block w-px h-8 bg-white/10"></div>
            <div class="flex flex-col gap-2">
              <span
                class="text-[0.6rem] text-text-tertiary uppercase tracking-[0.25em] font-bold"
                >Tanggal</span
              >
              <span
                class="text-[clamp(0.95rem,2vw,1.1rem)] font-bold text-text-primary"
                >{{ project.date || "-" }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 sm:px-6 max-w-6xl py-12 md:py-24">
      <!-- Galeri Proyek -->
      <section
        v-if="project.gallery && project.gallery.length"
        class="mb-16 md:mb-24 relative"
      >
        <div
          class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div class="space-y-2">
            <h3
              class="text-[clamp(1.5rem,4vw,2.25rem)] font-black text-white tracking-tight"
            >
              Galeri Proyek
            </h3>
            <p
              class="text-[clamp(0.7rem,1.5vw,0.8rem)] text-text-tertiary uppercase tracking-[0.2em] font-bold"
            >
              Eksplorasi visual solusi
            </p>
          </div>
          <!-- Navigation Buttons -->
          <div class="flex gap-3 self-end md:self-auto group/nav">
            <button
              class="w-12 h-12 rounded-2xl bg-bg-secondary border border-white/5 text-text-primary flex items-center justify-center cursor-pointer transition-all hover:border-accent-primary hover:text-accent-primary group active:scale-95 shadow-sm"
              aria-label="Previous image"
              @click="scrollGallery('left')"
            >
              <ChevronLeft
                :size="20"
                class="transition-transform group-hover:-translate-x-0.5 shrink-0"
              />
            </button>
            <button
              class="w-12 h-12 rounded-2xl bg-bg-secondary border border-white/5 text-text-primary flex items-center justify-center cursor-pointer transition-all hover:border-accent-primary hover:text-accent-primary group active:scale-95 shadow-sm"
              aria-label="Next image"
              @click="scrollGallery('right')"
            >
              <ChevronRight
                :size="20"
                class="transition-transform group-hover:translate-x-0.5 shrink-0"
              />
            </button>
          </div>
        </div>

        <div class="relative group/gallery">
          <div
            class="overflow-x-auto scroll-auto no-scrollbar py-2 mask-linear"
            ref="scrollContainer"
          >
            <div class="flex gap-4 md:gap-6 w-max pb-4">
              <div
                v-for="(img, idx) in project.gallery"
                :key="idx"
                class="w-[280px] md:w-[520px] aspect-video bg-bg-secondary rounded-[32px] border border-white/5 cursor-pointer group transition-all duration-500 hover:border-accent-primary hover:shadow-2xl overflow-hidden shadow-xs relative"
                @click="openLightbox(urlFor(img).url())"
              >
                <img
                  :src="urlFor(img).url()"
                  :alt="project.title + ' Showcase ' + (Number(idx) + 1)"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Two Column Layout -->
      <div
        class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 relative"
      >
        <div class="space-y-24">
          <!-- Fase 00: Concept Discovery (IDEAS) -->
          <section v-if="isIdea">
            <div
              class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3"
            >
              <div class="w-8 h-px bg-emerald-400/50"></div>
              Fase 00 / Concept Discovery
            </div>
            <h2
              class="text-[clamp(2rem,5vw,2.5rem)] font-black text-white mb-8 tracking-tight leading-tight"
            >
              Visi & Hipotesis Solusi
            </h2>

            <div
              class="bg-bg-secondary/40 border border-white/5 rounded-[32px] p-6 sm:p-8 md:p-12 space-y-12 relative overflow-hidden group"
            >
              <div
                class="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full"
              ></div>

              <div class="relative z-10 space-y-12">
                <div class="flex flex-col md:flex-row gap-8 md:items-start">
                  <div
                    class="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0"
                  >
                    <Target :size="28" />
                  </div>
                  <div class="space-y-4">
                    <h3 class="text-white font-bold text-xl tracking-tight">
                      The Core Idea
                    </h3>
                    <p
                      class="text-white/60 leading-relaxed text-[0.95rem] max-w-2xl"
                    >
                      Proyek concept ini dirancang untuk menjawab tantangan
                      industri di masa depan. Fokus utama adalah pada
                      <span class="text-white font-bold"
                        >efisiensi yang didorong oleh data</span
                      >
                      dan
                      <span class="text-white font-bold"
                        >pengalaman pengguna yang imersif</span
                      >. Saat ini dalam tahap pematangan arsitektur teknis.
                    </p>
                  </div>
                </div>

                <div class="w-full h-px bg-white/5 md:block hidden"></div>

                <div class="flex flex-col md:flex-row gap-8 md:items-start">
                  <div
                    class="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0"
                  >
                    <Zap :size="28" />
                  </div>
                  <div class="space-y-4">
                    <h3 class="text-white font-bold text-xl tracking-tight">
                      Future Stack Readiness
                    </h3>
                    <p
                      class="text-white/60 leading-relaxed text-[0.95rem] max-w-2xl"
                    >
                      Direncanakan menggunakan modern stack 2025-2026, termasuk
                      optimasi <span class="text-white font-bold">WebGPU</span>,
                      integrasi
                      <span class="text-white font-bold">AI-Agent otonom</span>,
                      dan efisiensi render tingkat tinggi untuk performa
                      maksimal di semua perangkat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- Fase 01: Konteks (Challenge) -->
          <!-- Fase 01: Konteks (Challenge) -->
          <section
            v-if="project.challenge || project.summary || project.description"
          >
            <div
              class="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3"
            >
              <div class="w-8 h-px bg-accent-primary/50"></div>
              Fase 01 / Konteks
            </div>
            <h2
              class="text-[clamp(2rem,5vw,2.5rem)] font-black text-white mb-8 tracking-tight leading-tight"
            >
              Latar Belakang Proyek
            </h2>
            <div
              class="text-[clamp(1.1rem,2vw,1.25rem)] leading-[1.8] text-text-secondary space-y-6 max-w-3xl font-medium"
            >
              <div
                v-if="project.challenge?.description"
                v-html="project.challenge.description"
                class="whitespace-pre-line"
              ></div>
              <p v-else class="whitespace-pre-line">
                {{
                  (typeof project.challenge === "string"
                    ? project.challenge
                    : null) ||
                  project.summary ||
                  project.description ||
                  project.excerpt
                }}
              </p>
            </div>
          </section>

          <!-- Fase 01.5: Dynamic Pivot/Investigation (Show only if data exists) -->
          <section
            v-if="
              project.pivot &&
              (project.pivot.title ||
                (project.pivot.items && project.pivot.items.length > 0))
            "
          >
            <div
              class="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3"
            >
              <div class="w-8 h-px bg-amber-400/50"></div>
              <span
                v-text="project.pivot.subtitle || 'Fase 01.5 / Investigasi'"
              ></span>
            </div>
            <h2
              class="text-[clamp(2rem,5vw,2.5rem)] font-black text-white mb-8 tracking-tight leading-tight"
            >
              {{ project.pivot.title }}
            </h2>

            <div
              class="bg-bg-secondary/40 border border-white/5 rounded-[32px] p-8 md:p-12 space-y-12 relative overflow-hidden group"
            >
              <div
                class="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/5 blur-[120px] rounded-full"
              ></div>

              <div class="relative z-10 space-y-12">
                <div v-for="(item, idx) in project.pivot.items" :key="idx">
                  <div class="flex flex-col md:flex-row gap-8 md:items-start">
                    <div
                      class="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500/20 transition-colors"
                    >
                      <component :is="getIcon(item.icon)" :size="28" />
                    </div>
                    <div class="space-y-4">
                      <h3 class="text-white font-bold text-xl tracking-tight">
                        {{ item.title }}
                      </h3>
                      <p
                        class="text-white/60 leading-relaxed text-[0.95rem] max-w-2xl"
                      >
                        {{ item.desc }}
                      </p>
                    </div>
                  </div>
                  <div
                    v-if="Number(idx) < Number(project.pivot.items.length) - 1"
                    class="w-full h-px bg-white/5 md:block hidden mt-12"
                  ></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Fase 02: Strategi (Process/Solution) -->
          <section>
            <div
              class="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3"
            >
              <div class="w-8 h-px bg-accent-primary/50"></div>
              Fase 02 / Strategi
            </div>
            <h2
              class="text-[clamp(2rem,5vw,2.5rem)] font-black text-white mb-10 tracking-tight leading-tight"
            >
              Solusi & Implementasi
            </h2>

            <div class="space-y-4">
              <div
                v-for="(step, i) in displaySteps"
                :key="i"
                class="p-6 sm:p-8 bg-bg-secondary/30 border border-white/5 rounded-3xl group transition-all duration-300 hover:bg-bg-secondary hover:border-accent-primary/30 flex gap-4 sm:gap-6 md:gap-8 items-start relative overflow-hidden"
              >
                <div
                  class="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary text-lg font-black shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner ring-1 ring-white/5"
                >
                  {{ Number(i) + 1 }}
                </div>
                <div class="space-y-3 relative z-10">
                  <h3
                    class="text-[clamp(1.1rem,2.5vw,1.25rem)] font-bold text-white tracking-tight leading-snug group-hover:text-accent-primary transition-colors"
                  >
                    {{ step.title }}
                  </h3>
                  <p
                    class="text-[clamp(0.9rem,1.5vw,1rem)] text-text-secondary leading-relaxed opacity-80"
                  >
                    {{ step.desc }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Dynamic Steps for other projects -->
          </section>

          <!-- Fase 03: Dampak (Impact/Results) -->
          <section v-if="project.impact || project.metrics">
            <div
              class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3"
            >
              <div class="w-8 h-px bg-emerald-400/50"></div>
              Fase 03 / Dampak
            </div>
            <h2
              class="text-[clamp(2rem,5vw,2.5rem)] font-black text-white mb-10 tracking-tight leading-tight"
            >
              Hasil Akhir
            </h2>

            <!-- Impact Quote Card -->
            <div
              class="bg-emerald-500/5 border border-emerald-500/10 rounded-[32px] p-8 md:p-14 mb-12 relative overflow-hidden group transition-all hover:bg-emerald-500/[0.08]"
            >
              <!-- Ambient Glow -->
              <div
                class="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none transition-all group-hover:bg-emerald-500/15"
              ></div>
              <div class="relative z-10">
                <p
                  class="text-[clamp(1.1rem,2vw,1.35rem)] leading-relaxed text-text-primary font-medium italic opacity-90"
                >
                  "{{ impactQuote }}"
                </p>
              </div>
            </div>

            <!-- Metrics Bento Grid -->
            <div
              v-if="project.metrics"
              class="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-6 gap-5 md:gap-6"
            >
              <div
                v-for="(metric, mIdx) in project.metrics"
                :key="mIdx"
                class="p-8 bg-bg-secondary/40 border border-white/5 rounded-[24px] flex flex-col items-center text-center gap-6 transition-all group/metric shadow-sm hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
                :class="[
                  metric.proofImage
                    ? 'cursor-zoom-in hover:bg-bg-secondary hover:border-emerald-500/30'
                    : 'cursor-default',
                  mIdx === 0
                    ? 'sm:col-span-3 lg:col-span-3'
                    : 'sm:col-span-3 lg:col-span-3',
                ]"
                @click="
                  metric.proofImage ? openLightbox(metric.proofImage) : null
                "
              >
                <div
                  v-if="metric.proofImage"
                  class="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full opacity-0 group-hover/metric:opacity-100 transition-opacity"
                >
                  <ShieldCheck :size="12" class="text-emerald-400 shrink-0" />
                  <span
                    class="text-[9px] font-black text-emerald-400 uppercase tracking-wider"
                    >Verified</span
                  >
                </div>

                <div
                  class="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover/metric:scale-110 transition-transform duration-300"
                >
                  <component
                    :is="getIcon(metric.icon)"
                    :size="32"
                    class="shrink-0"
                  />
                </div>
                <div class="space-y-2">
                  <div
                    class="text-[clamp(1.75rem,5vw,2.75rem)] font-black text-white leading-none tracking-tight"
                  >
                    {{ metric.value }}
                  </div>
                  <div
                    class="text-[10px] md:text-xs text-text-tertiary uppercase tracking-[0.2em] font-bold opacity-80"
                  >
                    {{ metric.label }}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Technologies Used -->
          <section v-if="project.technologies && project.technologies.length">
            <h3
              class="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-white mb-8 tracking-tight"
            >
              Teknologi Inti
            </h3>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="tag in project.technologies"
                :key="tag"
                class="px-5 py-2.5 bg-bg-secondary border border-white/5 rounded-full text-[0.9rem] text-text-secondary font-bold hover:text-white hover:border-white/20 hover:bg-white/5 transition-all cursor-default select-none shadow-sm"
              >
                {{ tag }}
              </span>
            </div>
          </section>
        </div>

        <!-- Sidebar (Desktop Sticky) - STOPS HERE, BEFORE DEEP DIVE -->
        <aside class="hidden lg:block relative font-sans h-fit sticky top-32">
          <div class="space-y-8">
            <div
              class="bg-bg-secondary/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 shadow-2xl overflow-hidden relative group"
            >
              <div
                class="absolute -top-20 -right-20 w-60 h-60 bg-accent-primary/10 blur-[80px] rounded-full transition-all group-hover:bg-accent-primary/15 pointer-events-none"
              ></div>

              <h3
                class="text-xl font-black mb-8 text-white tracking-tight relative z-10"
              >
                Akses Proyek
              </h3>
              <div class="flex flex-col gap-4 relative z-10">
                <BaseButton
                  v-if="project.liveUrl || project.demoUrl"
                  variant="primary"
                  size="lg"
                  class="w-full shadow-lg shadow-accent-primary/20"
                  @click="handlePreviewClick"
                >
                  <span>Live Preview</span>
                  <ExternalLinkIcon :size="18" class="ml-2" />
                </BaseButton>

                <!-- Fallback Inquiry Button if Live Preview is missing -->
                <BaseButton
                  v-else
                  variant="primary"
                  size="lg"
                  class="w-full shadow-lg shadow-accent-primary/20"
                  @click="openContact"
                >
                  <span>Tanya Detail Teknis</span>
                  <MessageCircleIcon :size="18" class="ml-2" />
                </BaseButton>

                <BaseButton
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  variant="outline"
                  size="lg"
                  class="w-full hover:bg-white/5"
                >
                  <span>Lihat Kode</span>
                  <GithubIcon :size="18" class="ml-2" />
                </BaseButton>

                <!-- Privacy Note if no Github -->
                <p 
                  v-else
                  class="text-[10px] text-text-tertiary italic leading-relaxed px-2 text-center"
                >
                  * Kode sumber bersifat rahasia (NDA) untuk melindungi aset bisnis klien.
                </p>

                <!-- Case Study Shortcut -->
                <button
                  v-if="project.content"
                  @click="scrollToDeepDive"
                  class="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-text-tertiary uppercase tracking-wider hover:text-white transition-colors border-t border-white/5 mt-2 pt-5"
                >
                  <span>Baca Studi Kasus</span>
                  <ArrowDownIcon :size="16" class="animate-bounce" />
                </button>

                <div
                  v-if="!project.liveUrl && !project.githubUrl"
                  class="p-6 bg-white/5 border border-dashed border-white/10 rounded-2xl text-center"
                >
                  <LockIcon
                    :size="24"
                    class="text-text-tertiary mx-auto mb-3 opacity-50"
                  />
                  <p
                    class="text-[10px] text-text-tertiary font-bold uppercase tracking-widest"
                  >
                    Proyek Internal / NDA Protected
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-linear-to-b from-bg-secondary to-bg-primary border border-white/5 rounded-[32px] p-8 space-y-6 shadow-lg"
            >
              <h3
                class="text-xl font-black text-white tracking-tight leading-tight"
              >
                Membangun sesuatu yang serupa?
              </h3>
              <p
                class="text-[0.95rem] text-text-secondary leading-relaxed opacity-70"
              >
                Konsultasikan visi Anda. Kita akan bedah strategi teknis yang
                paling efisien.
              </p>
              <BaseButton
                variant="outline"
                size="lg"
                class="w-full border-white/10 hover:bg-white/5"
                @click="openContact"
                >Mulai Diskusi</BaseButton
              >
            </div>
          </div>
        </aside>
      </div>

      <!-- Full Width Deep Dive Section (Outside Grid) -->
      <!-- Fase 04: Konten Detail / Case Study Tambahan (Deep Dive) -->
      <section
        v-if="project.content"
        id="deep-dive-section"
        class="mt-24 md:mt-32 border-t border-white/5 pt-20 max-w-5xl mx-auto px-6 md:px-0"
      >
        <div class="text-left mb-16">
          <div
            class="text-[10px] font-black text-accent-primary uppercase tracking-[0.3em] mb-6 flex items-center justify-start gap-3"
          >
            <div class="w-8 h-px bg-accent-primary/50"></div>
            Eksplorasi Mendalam
          </div>
          <h2
            class="text-[clamp(2.5rem,5vw,3.5rem)] font-black text-white tracking-tight mb-4"
          >
            Studi Kasus Detail
          </h2>
          <p
            class="text-text-tertiary text-sm font-bold uppercase tracking-widest max-w-lg"
          >
            Dokumentasi teknis, tantangan unik, dan solusi arsitektural yang
            diterapkan
          </p>
        </div>

        <div
          class="text-[clamp(1.1rem,2vw,1.25rem)] leading-[1.8] text-text-secondary space-y-8 font-medium whitespace-pre-line border-t border-white/5 pt-16 [&>h1]:text-white [&>h1]:font-black [&>h1]:text-[clamp(2rem,4vw,2.5rem)] [&>h1]:mb-6 [&>h1]:leading-[1.1] [&>h2]:text-white [&>h2]:font-black [&>h2]:text-[clamp(1.5rem,3vw,1.8rem)] [&>h2]:mt-8 [&>h2]:mb-8 [&>h2]:leading-tight [&>h2]:text-left [&>h2]:pb-2 [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-[clamp(1.2rem,2vw,1.4rem)] [&>h3]:mt-12 [&>h3]:mb-4 [&>h4]:text-white [&>h4]:font-bold [&>h4]:text-[1.1rem] [&>h4]:mt-8 [&>h4]:mb-3 [&>ul]:pl-5 [&>ul]:space-y-4 [&>ul]:list-disc [&>ul]:my-8 [&>ul]:text-text-secondary [&>ol]:pl-5 [&>ol]:space-y-4 [&>ol]:list-decimal [&>ol]:my-8 [&>blockquote]:border-l-4 [&>blockquote]:border-accent-primary [&>blockquote]:pl-8 [&>blockquote]:italic [&>blockquote]:text-white/90 [&>blockquote]:text-xl [&>blockquote]:my-12 [&>blockquote]:bg-linear-to-r [&>blockquote]:from-bg-secondary [&>blockquote]:to-transparent [&>blockquote]:p-8 [&>blockquote]:rounded-r-2xl [&>a]:text-accent-primary [&>a]:underline [&>a]:decoration-2 [&>a]:underline-offset-4 hover:[&>a]:text-white transition-colors [&_strong]:text-white [&_strong]:font-black [&>img]:w-full [&>img]:rounded-[32px] [&>img]:border-4 [&>img]:border-white/10 [&>img]:shadow-2xl [&>img]:my-16"
          v-html="renderedContent"
        ></div>
      </section>

      <!-- FAQ Section (Moved to Bottom) -->
      <section
        class="border-t border-white/5 pt-20 mt-24 max-w-5xl mx-auto px-6 md:px-0"
      >
        <div class="text-left mb-16">
          <div
            class="w-16 h-16 rounded-3xl bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-6"
          >
            <HelpCircle :size="32" />
          </div>
          <h2
            class="text-[clamp(2rem,4vw,2.5rem)] font-black text-white tracking-tight mb-4"
          >
            Pertanyaan Umum
          </h2>
          <p
            class="text-text-tertiary uppercase tracking-widest font-bold text-xs"
          >
            Detail Pengerjaan & Hasil
          </p>
        </div>

        <!-- FAQ Grid (Desktop) -->
        <div class="hidden md:grid grid-cols-1 gap-6">
          <div
            v-for="(faq, i) in displayFAQs"
            :key="i"
            class="bg-bg-secondary/40 border border-white/5 rounded-[24px] p-8 hover:bg-bg-secondary hover:border-white/10 transition-all duration-300 group"
          >
            <h4
              class="text-xl font-bold text-white mb-4 leading-snug group-hover:text-accent-primary transition-colors flex items-start gap-3"
            >
              <span class="text-accent-primary/50 opacity-50">Q.</span>
              {{ faq.q }}
            </h4>
            <p
              class="text-text-secondary leading-relaxed text-[1.05rem] opacity-80 pl-8"
            >
              {{ faq.a }}
            </p>
          </div>
        </div>

        <!-- FAQ Accordion (Mobile) -->
        <div class="md:hidden space-y-3">
          <AccordionItem
            v-for="(faq, i) in displayFAQs"
            :key="'mob-faq-' + i"
            :title="faq.q"
            :isOpen="activeFaqIndex === i"
            @toggle="toggleFaq(i)"
            class="bg-bg-secondary/40 border-white/5 rounded-2xl overflow-hidden shadow-sm"
          >
            <p
              class="text-[0.95rem] text-text-secondary leading-relaxed opacity-80"
            >
              {{ faq.a }}
            </p>
          </AccordionItem>
        </div>
      </section>
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
          class="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[10000] flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          @click="selectedImage = null"
        >
          <div
            class="w-full max-w-7xl max-h-[90vh] relative cursor-default outline-none items-center flex justify-center"
            @click.stop
          >
            <img
              :src="selectedImage"
              alt="Gallery Preview"
              class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <button
              @click="selectedImage = null"
              class="absolute -top-12 right-0 text-white hover:text-accent-primary transition-colors flex items-center gap-2 font-black uppercase tracking-widest text-xs z-20"
            >
              Tutup
              <XIcon :size="20" />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Demo Explanation Modal -->
    <BottomSheet
      v-model="isDemoModalOpen"
      title="Demo Version"
      :icon="MonitorIcon"
    >
      <div class="p-8 text-center space-y-6">
        <div class="w-16 h-16 bg-accent-primary/10 rounded-2xl flex items-center justify-center text-accent-primary mx-auto">
          <InfoIcon :size="32" />
        </div>
        
        <div class="space-y-3">
          <h4 class="text-xl font-bold text-white">Versi Demonstrasi</h4>
          <p class="text-sm text-text-secondary leading-relaxed">
            Dikarenakan website asli proyek ini sudah tidak aktif (legacy), saya telah menyiapkan 
            <strong>versi kloning/demonstrasi</strong> dengan data dummy agar Anda tetap dapat meninjau interface dan alur fungsionalitasnya.
          </p>
        </div>

        <div class="pt-4 space-y-3">
          <BaseButton 
            v-if="project"
            :href="project.demoUrl"
            variant="primary" 
            size="lg" 
            class="w-full"
            target="_blank"
            @click="isDemoModalOpen = false"
          >
            Buka Demo Project
          </BaseButton>
          <BaseButton 
            variant="ghost" 
            size="md" 
            class="w-full"
            @click="isDemoModalOpen = false"
          >
            Tutup
          </BaseButton>
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
import SectionHeader from "../../components/ui/SectionHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import { BottomSheet } from "@kangjessy/ui";
import AccordionItem from "../../components/ui/AccordionItem.vue";

import {
  ArrowLeft as ArrowLeftIcon,
  ExternalLink as ExternalLinkIcon,
  Github as GithubIcon,
  ArrowDown as ArrowDownIcon,
  X as XIcon,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Globe as GlobeIcon,
  Layers as LayersIcon,
  Zap,
  Target,
  TrendingUp,
  BarChart,
  Clock,
  ShieldCheck,
  MessageCircle as MessageCircleIcon,
  Lock as LockIcon,
  ShieldAlert,
  Leaf,
  Boxes,
  Cpu,
  MapPinned,
  Monitor as MonitorIcon,
  Info as InfoIcon,
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
const activeFaqIndex = ref<number | null>(null);

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

const isIdea = computed(() => {
  return project.value?.status === "IDEA";
});

const showDesktopBar = ref(false);

const scrollToDeepDive = () => {
  const el = document.getElementById("deep-dive-section");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

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

const impactQuote = computed(() => {
  if (isIdea.value) {
    return "Project ini merupakan representasi dari visi teknologi 2025-2026. Fokus pengembangannya adalah pada otomatisasi cerdas dan antarmuka yang lebih human-centric. Meskipun saat ini masih dalam tahap ide/konsep, fundamental teknisnya telah dirancang untuk skalabilitas masif.";
  }
  return (
    project.value?.impact ||
    "Proyek ini berhasil diselesaikan sesuai target dan memberikan dampak positif bagi operasional bisnis klien."
  );
});

const projectFAQs = [
  {
    q: "Bagaimana pendekatan keamanan yang diterapkan?",
    a: 'Saya menggunakan pendekatan "Defense in Depth", melapisi keamanan dari level server, aplikasi, hingga user interface untuk meminimalkan celah risiko.',
  },
  {
    q: "Apakah sistem ini mempengaruhi performa website?",
    a: "Tidak signifikan. Semua modul keamanan dikonfigurasi secara efisien dan menggunakan caching level lanjut agar user experience tetap instan.",
  },
  {
    q: "Berapa lama proses implementasi fitur keamanan ini?",
    a: "Untuk audit dan hardening standar biasanya memakan waktu 3-5 hari kerja, tergantung kompleksitas sistem yang sudah ada.",
  },
  {
    q: "Apakah ada garansi jika website tetap terkena hack?",
    a: "Keamanan adalah proses berkelanjutan, bukan status permanen. Namun, saya memberikan layanan monitoring dan patching gratis selama 30 hari pasca-rilis.",
  },
];

const displayFAQs = computed(() => {
  const raw = project.value?.faqs?.length ? project.value.faqs : projectFAQs;
  return raw.map((f: any) => ({
    q: f.q || f.question || "",
    a: f.a || f.answer || "",
  }));
});

const defaultSteps = [
  {
    title: "Research & Discovery",
    desc: "Menganalisis kebutuhan bisnis dan target audiens secara mendalam.",
  },
  {
    title: "Strategy & Architecture",
    desc: "Menyusun arsitektur informasi dan strategi teknologi yang paling efisien.",
  },
  {
    title: "Implementation & Launch",
    desc: "Eksekusi teknis dengan standar kualitas tinggi dan pengawasan ketat.",
  },
];

const displaySteps = computed(() => {
  // Prioritize Sanity/Local dynamic steps if they exist
  if (project.value?.steps?.length) return project.value.steps;

  // Fallback to manual template handling or defaults
  if (isIdea.value) return [];
  return defaultSteps;
});

const toggleFaq = (index: number | string) => {
  const idx = typeof index === "string" ? parseInt(index) : index;
  activeFaqIndex.value = activeFaqIndex.value === idx ? null : idx;
};

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

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Zap,
    Target,
    TrendingUp,
    BarChart,
    Clock,
    ShieldCheck,
    ShieldAlert,
    Leaf,
    Boxes,
    Cpu,
    MapPinned,
  };
  return icons[iconName] || BarChart;
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

  if (demoUrl && !project.value.liveUrl) {
    isDemoModalOpen.value = true;
  } else if (project.value.liveUrl) {
    window.open(project.value.liveUrl, "_blank");
  } else {
    // If no links at all, though button shouldn't show
    openContact();
  }
};

const renderedContent = computed(() => {
  if (!project.value?.content) return "";
  // If content starts with <, treat as HTML (legacy support for other projects)
  if (project.value.content.trim().startsWith("<")) {
    return project.value.content;
  }
  // Otherwise parse as Markdown
  // @ts-ignore
  return marked.parse(project.value.content);
});
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
</style>
