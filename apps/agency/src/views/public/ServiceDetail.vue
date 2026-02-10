<template>
  <div class="min-h-screen bg-bg-primary" v-if="service">
    <!-- Hero Section -->
    <header
      class="bg-bg-secondary border-b border-border-color pt-32 pb-15 md:pt-40 md:pb-20"
    >
      <div class="container mx-auto px-6 max-w-6xl">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-text-secondary text-sm mb-8 transition-all hover:text-accent-primary hover:-translate-x-1"
        >
          <ArrowLeft :size="18" /> <span>Back to Services</span>
        </router-link>

        <div class="flex flex-col md:items-start">
          <div
            class="w-16 h-16 bg-bg-primary border border-border-color rounded-2xl flex items-center justify-center text-accent-primary mb-6 shadow-sm"
          >
            <component :is="getServiceIcon(service.icon)" :size="40" />
          </div>

          <h1
            class="text-[clamp(2.25rem,5vw,3rem)] font-extrabold mb-3 text-text-primary tracking-tight leading-tight"
          >
            {{ service.title }}
          </h1>
          <p
            class="text-[clamp(1.125rem,2vw,1.25rem)] text-text-secondary max-w-2xl leading-relaxed mb-8"
          >
            {{ service.tagline }}
          </p>

          <div class="flex flex-wrap gap-10">
            <div class="flex items-center gap-3">
              <Clock :size="20" class="text-accent-primary shrink-0" />
              <div class="flex flex-col">
                <small
                  class="text-[11px] uppercase tracking-wider text-text-secondary opacity-70"
                  >Delivery Time</small
                >
                <span class="font-bold text-text-primary">{{
                  service.deliveryTime
                }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <RefreshCw :size="20" class="text-accent-primary shrink-0" />
              <div class="flex flex-col">
                <small
                  class="text-[11px] uppercase tracking-wider text-text-secondary opacity-70"
                  >Revisions</small
                >
                <span class="font-bold text-text-primary">{{
                  service.revisions
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-6 max-w-6xl py-15 md:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-15 lg:gap-20">
        <!-- Info Column -->
        <div class="space-y-16">
          <section>
            <h3
              class="text-[clamp(1.5rem,3vw,1.875rem)] font-bold mb-5 text-text-primary"
            >
              Service Overview
            </h3>
            <p
              class="text-[clamp(1rem,1.5vw,1.125rem)] leading-loose text-text-secondary"
            >
              {{ service.overview }}
            </p>
          </section>

          <!-- Packages Grid -->
          <section v-if="availablePackages.length">
            <div class="flex justify-between items-end mb-6">
              <div>
                <h3 class="text-2xl font-bold text-text-primary">
                  Available Packages
                </h3>
                <p class="text-text-secondary text-sm mt-1">
                  Pilih paket yang paling sesuai dengan skala bisnis Anda.
                </p>
              </div>
              <button
                v-if="availablePackages.length > 4"
                @click="isPackagesSheetOpen = true"
                class="text-accent-primary font-bold text-sm hover:underline"
              >
                View All ({{ availablePackages.length }})
              </button>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <div
                v-for="pkg in featuredPackages"
                :key="pkg.id"
                class="p-5 bg-bg-secondary/40 border-2 rounded-[24px] cursor-pointer flex flex-col gap-3 transition-all duration-300 hover:bg-bg-secondary/60 hover:border-accent-primary/50 relative overflow-hidden group"
                :class="
                  selectedPkg?.id === pkg.id
                    ? 'border-accent-primary! bg-accent-primary/5 shadow-[0_10px_30px_rgba(var(--accent-rgb),0.1)]'
                    : 'border-border-color'
                "
                @click="selectedPkg = pkg"
              >
                <!-- Badge -->
                <div
                  v-if="pkg.badge"
                  class="absolute -right-8 top-4 text-white text-[9px] font-black py-1 px-10 rotate-45 shadow-sm"
                  :class="
                    pkg.badge.toLowerCase().includes('recommend')
                      ? 'bg-accent-primary'
                      : 'bg-amber-500'
                  "
                >
                  {{ pkg.badge }}
                </div>

                <div
                  v-if="selectedPkg?.id === pkg.id"
                  class="absolute top-4 left-4 w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse"
                ></div>

                <div
                  class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent-primary transition-transform group-hover:scale-110 shrink-0"
                >
                  <component :is="pkg.icon" :size="20" />
                </div>

                <div>
                  <h4
                    class="font-bold text-text-primary text-[clamp(1rem,1.5vw,1.1rem)] leading-tight mb-1"
                  >
                    {{ pkg.name }}
                  </h4>
                  <!-- Price Display -->
                  <div class="flex flex-col leading-none">
                    <span
                      v-if="
                        pkg.originalPrice && pkg.originalPrice > pkg.basePrice
                      "
                      class="text-[0.8rem] text-text-secondary line-through opacity-70 mb-0.5"
                    >
                      {{ formatCurrency(pkg.originalPrice) }}
                    </span>
                    <div
                      class="text-accent-primary font-black text-[clamp(1.1rem,1.5vw,1.2rem)]"
                    >
                      {{ formatCurrency(pkg.basePrice) }}
                    </div>
                  </div>
                </div>

                <!-- Operational Info (Grid) -->
                <div class="flex flex-wrap gap-2 mt-1">
                  <div
                    v-if="pkg.maxPages"
                    class="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-[9px] font-bold text-text-secondary uppercase"
                  >
                    <FileText :size="10" /> {{ pkg.maxPages }}
                  </div>
                  <div
                    v-if="pkg.deliveryTime"
                    class="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-[9px] font-bold text-text-secondary uppercase"
                  >
                    <Clock :size="10" /> {{ pkg.deliveryTime }}
                  </div>
                </div>

                <p
                  class="text-[0.75rem] text-text-secondary leading-relaxed opacity-70 line-clamp-2"
                >
                  {{ pkg.desc }}
                </p>
              </div>

              <!-- Not Sure Card -->
              <div
                class="p-5 bg-accent-primary/5 border-2 border-dashed border-accent-primary/20 rounded-[24px] cursor-pointer flex flex-col gap-3 transition-all duration-300 hover:border-accent-primary/50 group relative overflow-hidden"
                @click="scrollToFoundation"
              >
                <div
                  class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0"
                >
                  <HelpCircle :size="20" />
                </div>
                <div>
                  <h4
                    class="font-bold text-text-primary text-[clamp(1rem,1.5vw,1.1rem)] leading-tight mb-1"
                  >
                    Pusing pilih paket?
                  </h4>
                  <div
                    class="text-accent-primary font-black text-xs uppercase tracking-widest"
                  >
                    Mulai dari nol saja
                  </div>
                </div>
                <p
                  class="text-[0.7rem] text-text-secondary leading-relaxed opacity-70"
                >
                  Pilih "The Foundation" untuk instalasi dasar, lalu rakit fitur
                  Anda sendiri kemudian.
                </p>
                <div
                  class="mt-auto pt-2 flex items-center gap-2 text-accent-primary font-bold text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all"
                >
                  Lihat Pondasi
                  <ArrowRight :size="12" />
                </div>
              </div>
            </div>

            <!-- See More Button for Mobile/Landing -->
            <div v-if="availablePackages.length > 4" class="mt-6">
              <button
                @click="isPackagesSheetOpen = true"
                class="w-full py-4 bg-white/5 border border-dashed border-border-color rounded-[20px] text-text-secondary font-bold text-sm transition-all hover:bg-white/10 hover:border-accent-primary/50"
              >
                + {{ availablePackages.length - 4 }} Paket Lainnya Tersedia
              </button>
            </div>
          </section>

          <!-- Extra Features (Enhance Your Solution) - Only for Foundation -->
          <section
            v-if="
              relevantFeatures.length &&
              selectedPkg?.id.startsWith('foundation-')
            "
            class="space-y-8 pb-10 border-b border-border-color/20 mb-10"
          >
            <div class="flex items-center justify-between">
              <div class="flex flex-col gap-1">
                <h3
                  class="text-xl font-bold text-text-primary uppercase tracking-tight"
                >
                  Enhance Your Solution
                </h3>
                <p class="text-text-tertiary text-[0.8rem]">
                  Pondasi ini dapat Anda upscale dengan fitur tambahan berikut
                  sesuai kebutuhan bisnis.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="feature in relevantFeatures"
                :key="feature.id"
                class="p-5 bg-bg-primary border border-border-color rounded-2xl flex flex-col justify-between group transition-all hover:border-accent-primary/30 relative overflow-hidden"
              >
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <h4
                      class="font-bold text-text-primary text-[0.95rem] group-hover:text-accent-primary transition-colors"
                    >
                      {{ feature.name }}
                    </h4>
                    <div
                      class="text-[0.7rem] font-mono font-bold text-accent-primary bg-accent-primary/5 px-2 py-0.5 rounded-lg border border-accent-primary/10"
                    >
                      +Rp
                      {{
                        formatCurrency(feature.price).replace("Rp", "").trim()
                      }}
                    </div>
                  </div>
                  <p
                    class="text-[0.75rem] text-text-secondary leading-relaxed line-clamp-2"
                  >
                    {{ feature.desc }}
                  </p>
                </div>

                <div
                  class="mt-4 pt-3 border-t border-border-color/10 flex justify-between items-center group-hover:border-accent-primary/10"
                >
                  <span
                    class="text-[9px] font-black text-text-tertiary uppercase tracking-widest"
                    >Optional Add-on</span
                  >
                  <PlusIcon :size="12" class="text-accent-primary" />
                </div>
              </div>
            </div>

            <div
              class="p-6 bg-accent-primary/5 border border-accent-primary/20 rounded-3xl text-center"
            >
              <p class="text-xs text-text-secondary mb-4 italic">
                Semua fitur di atas dapat Anda pilih secara fleksibel di halaman
                kalkulator.
              </p>
              <BaseButton
                variant="secondary"
                size="md"
                @click="
                  router.push(`/order?type=${selectedPkg?.id || service.id}`)
                "
              >
                <PlusIcon :size="16" class="mr-2" />
                Pilih Fitur di Kalkulator
              </BaseButton>
            </div>
          </section>

          <!-- What's Included -->
          <section v-if="!service.detailedFeatures">
            <h3 class="text-2xl font-bold mb-5 text-text-primary">
              What's Included
            </h3>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li
                v-for="item in service.included"
                :key="item"
                class="flex items-center gap-3 text-text-secondary"
              >
                <Check :size="18" class="text-accent-primary shrink-0" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </section>

          <!-- Detailed Features (Animated Bento) -->
          <section
            v-else
            class="space-y-10 border-t border-border-color/20 pt-10 mt-10 overflow-hidden"
          >
            <div class="flex flex-col gap-2">
              <h3 class="text-2xl font-bold text-text-primary">
                What's Included in {{ selectedPkg?.name || service.title }}
              </h3>
              <p class="text-text-secondary text-sm">
                Fitur berikut sudah termasuk dalam paket yang Anda pilih untuk
                menjamin hasil terbaik bagi bisnis Anda.
              </p>
            </div>

            <TransitionGroup
              tag="div"
              name="bento-list"
              class="grid grid-cols-1 gap-8 relative"
            >
              <div
                v-for="(feature, fIdx) in selectedPkg?.detailedFeatures ||
                service.detailedFeatures"
                :key="(selectedPkg?.id || 'default') + '-' + fIdx"
                class="group p-6 md:p-8 bg-bg-secondary border border-border-color rounded-[32px] transition-all hover:bg-bg-secondary/80 hover:border-accent-primary/20 relative overflow-hidden"
                :style="{ '--delay': (Number(fIdx) * 0.1).toFixed(1) + 's' }"
              >
                <div
                  class="absolute -right-4 -top-4 w-32 h-32 bg-accent-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>

                <div
                  class="flex flex-col md:flex-row items-start md:gap-6 relative z-10"
                >
                  <div
                    class="flex items-center md:items-start gap-4 md:gap-0 mb-5 md:mb-0 w-full md:w-auto"
                  >
                    <div
                      class="w-12 h-12 bg-accent-primary/10 border border-accent-primary/20 rounded-2xl flex items-center justify-center text-accent-primary shadow-sm shrink-0 transition-transform group-hover:scale-110"
                    >
                      <component
                        :is="getFeatureIcon(feature.icon)"
                        :size="24"
                      />
                    </div>
                    <h4
                      class="md:hidden text-lg font-bold text-text-primary leading-tight"
                    >
                      {{ feature.title }}
                    </h4>
                  </div>

                  <div class="flex-1 w-full">
                    <h4
                      class="hidden md:block text-xl font-bold text-text-primary mb-4"
                    >
                      {{ feature.title }}
                    </h4>
                    <ul class="space-y-4">
                      <li
                        v-for="(item, iIdx) in feature.items"
                        :key="iIdx"
                        class="flex items-start gap-3.5 group/item"
                      >
                        <div
                          class="mt-2 w-1.5 h-1.5 rounded-full bg-accent-primary/40 shrink-0 transition-all group-hover/item:scale-150 group-hover/item:bg-accent-primary"
                        ></div>
                        <span
                          class="text-text-secondary text-[0.92rem] md:text-[0.95rem] leading-relaxed"
                          >{{ item }}</span
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </section>

          <!-- Workflow -->
          <section>
            <h3 class="text-2xl font-bold mb-6 text-text-primary">
              Our Workflow
            </h3>
            <div class="space-y-5">
              <div
                v-for="(step, idx) in service.process"
                :key="idx"
                class="flex gap-6 p-6 bg-bg-secondary border border-border-color rounded-2xl transition-all hover:border-accent-primary/30"
              >
                <div
                  class="w-10 h-10 bg-accent-primary text-white rounded-xl flex items-center justify-center font-extrabold shrink-0"
                >
                  {{ (idx + 1).toString().padStart(2, "0") }}
                </div>
                <div class="space-y-1">
                  <h4 class="font-bold text-text-primary">{{ step.title }}</h4>
                  <p
                    class="text-text-secondary opacity-70 text-[0.95rem] leading-relaxed"
                  >
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Technology -->
          <section v-if="service.technologies">
            <h3 class="text-2xl font-bold mb-5 text-text-primary">
              Stack Used
            </h3>
            <div class="flex flex-wrap gap-2.5">
              <span
                v-for="tech in service.technologies"
                :key="tech"
                class="px-4 py-2 bg-bg-secondary border border-border-color rounded-lg text-[0.85rem] text-text-secondary font-medium"
              >
                {{ tech }}
              </span>
            </div>
          </section>

          <!-- Related Projects -->
          <section v-if="relatedProjects.length">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h3 class="text-2xl font-bold text-text-primary">
                  Studi Kasus Relevan
                </h3>
                <p class="text-text-secondary text-sm mt-1">
                  Lihat bagaimana solusi ini diimplementasikan di dunia nyata.
                </p>
              </div>
              <button
                @click="isProjectsSheetOpen = true"
                class="text-accent-primary font-bold text-sm hover:underline flex items-center gap-1 group"
              >
                Lihat Semua
                <ArrowUpRight
                  :size="14"
                  class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <router-link
                v-for="project in relatedProjects.slice(0, 2)"
                :key="project.id"
                :to="`/project/${project.slug}`"
                class="bg-bg-primary/50 border border-border-color rounded-2xl p-4 md:p-6 hover:border-accent-primary/50 transition-all group relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div
                  class="absolute inset-0 bg-linear-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>

                <div class="relative z-10 flex flex-col gap-3">
                  <div
                    class="w-10 h-10 bg-bg-secondary border border-border-color rounded-xl flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all shrink-0"
                  >
                    <component :is="getProjectIcon(project.icon)" :size="20" />
                  </div>
                  <div>
                    <h4
                      class="font-bold text-text-primary text-[clamp(0.85rem,2vw,0.95rem)] leading-tight mb-1 group-hover:text-accent-primary transition-colors line-clamp-2"
                    >
                      {{ project.title }}
                    </h4>
                    <div class="flex flex-wrap gap-1.5 opacity-60">
                      <span
                        v-for="tag in project.tags.slice(0, 2)"
                        :key="tag"
                        class="text-[9px] font-bold uppercase tracking-wider text-text-tertiary"
                      >
                        #{{ tag }}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  class="relative z-10 mt-4 pt-3 border-t border-border-color/30 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-tertiary group-hover:text-accent-primary transition-colors"
                >
                  <span>Case Study</span>
                  <ArrowRight
                    :size="12"
                    class="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </router-link>
            </div>
          </section>

          <section
            v-else
            class="rounded-2xl border border-dashed border-border-color p-8 text-center bg-bg-secondary/30"
          >
            <div
              class="w-12 h-12 bg-bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 text-text-tertiary"
            >
              <FolderOpen :size="24" />
            </div>
            <h4 class="text-base font-bold text-text-primary mb-1">
              Belum Ada Studi Kasus Spesifik
            </h4>
            <p class="text-sm text-text-secondary max-w-sm mx-auto">
              Saat ini belum ada studi kasus publik untuk layanan ini. Namun
              banyak proyek internal yang menggunakan teknologi serupa.
            </p>
          </section>

          <!-- FAQ -->
          <section v-if="service.faq && service.faq.length">
            <h3 class="text-2xl font-bold mb-5 text-text-primary">
              Common Questions
            </h3>
            <div class="space-y-4">
              <AccordionItem
                v-for="(item, index) in service.faq"
                :key="index"
                :title="item.question"
                :isOpen="activeFaqIndex === index"
                @toggle="toggleFaq(index)"
              >
                <p>{{ item.answer }}</p>
              </AccordionItem>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <aside class="hidden lg:block">
          <div class="sticky top-24">
            <div
              class="bg-bg-secondary border border-border-color rounded-3xl p-10 shadow-sm relative overflow-hidden"
            >
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 blur-3xl rounded-full"
              ></div>

              <div class="relative z-10">
                <span
                  class="text-xs uppercase tracking-widest text-text-secondary opacity-70 font-bold"
                  >Project Investment</span
                >
                <div class="mt-3 mb-6">
                  <div
                    v-if="
                      selectedPkg?.originalPrice &&
                      selectedPkg.originalPrice > selectedPkg.basePrice
                    "
                    class="flex items-center gap-2 mb-1"
                  >
                    <span
                      class="text-sm text-text-secondary line-through opacity-70"
                    >
                      {{ formatCurrency(selectedPkg.originalPrice) }}
                    </span>
                    <span
                      class="bg-red-500/10 text-red-400 border border-red-500/20 text-[0.65rem] font-bold px-2 py-0.5 rounded-full"
                    >
                      Hemat
                      {{
                        formatCurrency(
                          selectedPkg.originalPrice - selectedPkg.basePrice,
                        )
                      }}
                    </span>
                  </div>
                  <span
                    class="text-[clamp(1.875rem,3vw,2.25rem)] font-extrabold text-text-primary block leading-none"
                  >
                    {{
                      selectedPkg
                        ? formatCurrency(selectedPkg.basePrice)
                        : formatCurrency(service.price)
                    }}
                  </span>
                </div>

                <!-- Operational Highlights in Sidebar -->
                <div v-if="selectedPkg" class="grid grid-cols-2 gap-2 mb-8">
                  <div
                    v-if="selectedPkg.maxPages"
                    class="bg-white/5 border border-white/10 p-3 rounded-2xl"
                  >
                    <FileText :size="14" class="text-accent-primary mb-1" />
                    <div
                      class="text-[8px] font-black text-text-tertiary uppercase tracking-widest"
                    >
                      Scope
                    </div>
                    <div
                      class="text-[10px] font-bold text-text-primary truncate"
                    >
                      {{ selectedPkg.maxPages }}
                    </div>
                  </div>
                  <div
                    v-if="selectedPkg.deliveryTime"
                    class="bg-white/5 border border-white/10 p-3 rounded-2xl"
                  >
                    <Clock :size="14" class="text-accent-primary mb-1" />
                    <div
                      class="text-[8px] font-black text-text-tertiary uppercase tracking-widest"
                    >
                      Waktu
                    </div>
                    <div
                      class="text-[10px] font-bold text-text-primary truncate"
                    >
                      {{ selectedPkg.deliveryTime }}
                    </div>
                  </div>
                </div>

                <!-- Package Description in Sidebar -->
                <p
                  v-if="selectedPkg?.desc"
                  class="text-[0.85rem] text-text-secondary leading-relaxed mb-6 opacity-80 italic"
                >
                  "{{ selectedPkg.desc }}"
                </p>

                <ul
                  class="space-y-3.5 mb-10 border-t border-border-color/10 pt-8"
                >
                  <li
                    v-for="f in selectedPkg?.features ||
                    service.packageFeatures"
                    :key="f"
                    class="flex items-start gap-3 text-[0.92rem] text-text-secondary leading-tight"
                  >
                    <Check
                      :size="16"
                      class="text-accent-primary grow-0 shrink-0 mt-0.5"
                    />
                    <span>{{ f }}</span>
                  </li>
                </ul>

                <div class="flex flex-col gap-3">
                  <BaseButton
                    variant="primary"
                    size="lg"
                    @click="
                      router.push(
                        `/order?type=${selectedPkg?.id || service.id}`,
                      )
                    "
                  >
                    Start Project
                  </BaseButton>
                  <BaseButton
                    variant="secondary"
                    size="lg"
                    @click="openConsultation"
                  >
                    Free Consultation
                  </BaseButton>
                </div>

                <div
                  class="mt-6 flex items-center justify-center gap-2 text-[12px] text-text-secondary opacity-70"
                >
                  <ShieldCheck :size="14" class="shrink-0" />
                  <span>Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- Floating Mobile Action Bar -->
    <div
      v-if="selectedPkg"
      class="fixed bottom-[84px] left-4 right-4 z-[1100] md:hidden transition-all duration-500"
      :class="{
        'opacity-0 pointer-events-none translate-y-10': isPackagesSheetOpen,
      }"
    >
      <!-- Peek Overlay (Click to see features) -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-10 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-10 scale-95"
      >
        <div
          v-if="isFloatingExpanded"
          class="absolute bottom-full left-0 right-0 mb-3 bg-bg-secondary/98 backdrop-blur-3xl border border-white/10 rounded-[28px] p-6 shadow-2xl origin-bottom"
        >
          <div class="flex items-center justify-between mb-4">
            <h5
              class="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary"
            >
              Included Features
            </h5>
            <button
              @click="isFloatingExpanded = false"
              class="text-text-tertiary hover:text-white transition-colors"
            >
              <X :size="16" />
            </button>
          </div>
          <ul class="space-y-3.5">
            <li
              v-for="(f, idx) in selectedPkg.features ||
              service.packageFeatures"
              :key="f"
              class="flex items-start gap-3 text-[0.85rem] text-text-secondary leading-tight"
              :style="{ transitionDelay: `${Number(idx) * 50}ms` }"
            >
              <Check :size="14" class="text-accent-primary shrink-0 mt-0.5" />
              <span>{{ f }}</span>
            </li>
          </ul>
          <div class="mt-5 pt-4 border-t border-white/5">
            <p class="text-[0.75rem] text-text-tertiary italic leading-relaxed">
              "{{ selectedPkg.desc }}"
            </p>
          </div>
        </div>
      </Transition>

      <div
        class="bg-bg-secondary/95 backdrop-blur-2xl border border-white/10 rounded-[24px] p-3 shadow-[0_15px_60px_rgba(0,0,0,0.6)] relative z-20"
      >
        <div class="flex items-center justify-between gap-3">
          <!-- Package Selector & Peek Toggle -->
          <div
            class="flex flex-col flex-1 pl-1 cursor-pointer select-none"
            @click="isFloatingExpanded = !isFloatingExpanded"
          >
            <div class="flex items-center gap-2 mb-0.5">
              <div class="flex items-center gap-1.5">
                <span
                  class="text-[10px] font-black uppercase tracking-wider text-text-tertiary"
                >
                  {{ isFloatingExpanded ? "Tutup" : "Detail" }}
                </span>
                <component
                  :is="isFloatingExpanded ? ChevronDown : ChevronUp"
                  :size="12"
                  class="text-text-tertiary"
                />
              </div>

              <div class="w-px h-2 bg-white/10"></div>

              <button
                @click.stop="
                  isPackagesSheetOpen = true;
                  isFloatingExpanded = false;
                "
                class="text-[10px] font-black uppercase tracking-wider text-accent-primary hover:text-white transition-colors"
              >
                Ganti
              </button>
            </div>
            <div class="flex flex-col">
              <span
                class="text-[15px] font-bold text-text-primary leading-tight"
              >
                {{ selectedPkg.name }}
              </span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span
                  v-if="selectedPkg.originalPrice"
                  class="text-[10px] text-text-secondary line-through opacity-70 decoration-1"
                >
                  {{ formatCurrency(selectedPkg.originalPrice) }}
                </span>
                <span class="text-[13px] font-bold text-accent-primary">
                  {{ formatCurrency(selectedPkg.basePrice) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2">
            <button
              class="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-text-primary active:scale-90 transition-transform"
              @click="openConsultation"
            >
              <MessageCircle :size="20" class="text-[#25D366]" />
            </button>
            <BaseButton
              variant="primary"
              class="rounded-xl! px-6! h-10! font-bold text-[13px] shadow-lg shadow-accent-primary/20"
              @click="router.push(`/order?type=${selectedPkg.id}`)"
            >
              Order
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Packages Bottom Sheet -->
    <BottomSheet
      v-model="isPackagesSheetOpen"
      title="Paket Layanan Tersedia"
      :icon="Layers"
    >
      <!-- Search Bar -->
      <div class="px-6 pt-4">
        <div class="relative">
          <Search
            :size="16"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari paket (misal: CRM, POS...)"
            class="w-full bg-bg-primary border border-border-color rounded-xl py-2.5 pl-10 pr-4 text-sm text-text-primary focus:border-accent-primary outline-none transition-all"
          />
        </div>
      </div>

      <!-- Grid View (Single Column for Mobile detail) -->
      <div class="px-6 py-6 grid grid-cols-1 gap-4 pb-safe">
        <div
          v-for="pkg in filteredPackages"
          :key="pkg.id"
          class="p-4 rounded-[24px] border transition-all active:scale-[0.98] flex flex-col gap-2 relative bg-bg-primary/50 cursor-pointer overflow-hidden group col-span-2"
          :class="
            selectedPkg?.id === pkg.id
              ? 'border-accent-primary bg-accent-primary/5 shadow-md shadow-accent-primary/10'
              : 'border-border-color'
          "
          @click="handleSelectPackage(pkg)"
        >
          <!-- Badge -->
          <div
            v-if="pkg.badge"
            class="absolute right-0 top-0 text-[8px] font-black py-1.5 px-4 rounded-bl-xl shadow-sm text-white"
            :class="
              pkg.badge.toLowerCase().includes('recommend')
                ? 'bg-accent-primary'
                : 'bg-amber-500'
            "
          >
            {{ pkg.badge }}
          </div>

          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent-primary shrink-0 transition-transform group-hover:scale-110"
            >
              <component :is="pkg.icon" :size="24" />
            </div>

            <div class="flex-1">
              <h4
                class="font-bold text-text-primary text-[1rem] leading-tight mb-1"
              >
                {{ pkg.name }}
              </h4>
              <div class="flex items-center gap-2">
                <span
                  v-if="pkg.originalPrice"
                  class="text-[0.75rem] text-text-secondary line-through opacity-70"
                >
                  {{ formatCurrency(pkg.originalPrice) }}
                </span>
                <div class="text-accent-primary font-black text-[0.95rem]">
                  {{ formatCurrency(pkg.basePrice) }}
                </div>
              </div>
            </div>
          </div>

          <div class="mt-2 pt-3 border-t border-white/5">
            <p
              v-if="pkg.desc"
              class="text-[0.75rem] text-text-secondary mb-3 leading-relaxed"
            >
              {{ pkg.desc }}
            </p>

            <!-- Mini Features Checklist in Selection -->
            <div class="flex flex-wrap gap-x-4 gap-y-2">
              <div
                v-for="f in (pkg.features || service.packageFeatures).slice(
                  0,
                  3,
                )"
                :key="f"
                class="flex items-center gap-1.5 text-[0.65rem] text-text-tertiary font-bold uppercase tracking-wider"
              >
                <Check :size="10" class="text-accent-primary" />
                {{ f }}
              </div>
              <div
                v-if="(pkg.features || service.packageFeatures).length > 3"
                class="text-[0.65rem] text-accent-primary font-bold uppercase tracking-wider"
              >
                +{{ (pkg.features || service.packageFeatures).length - 3 }}
                Lainnya
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredPackages.length === 0"
          class="col-span-2 py-20 text-center flex flex-col items-center gap-4"
        >
          <div
            class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-text-tertiary"
          >
            <Search :size="32" />
          </div>
          <div>
            <p class="text-text-primary font-bold">Paket tidak ditemukan</p>
            <p class="text-text-secondary text-sm">Coba kata kunci lain.</p>
          </div>
        </div>
      </div>
    </BottomSheet>
    <!-- Related Projects Bottom Sheet -->
    <BottomSheet
      v-model="isProjectsSheetOpen"
      :title="`Studi Kasus ${service?.title || 'Layanan'}`"
      :icon="Layers"
    >
      <div class="px-6 py-6 pb-20 sm:pb-6 space-y-4">
        <p
          class="text-[clamp(0.85rem,2vw,0.9rem)] text-text-secondary leading-relaxed mb-4"
        >
          Berikut adalah beberapa case study yang relevan dengan layanan
          <strong>{{ service?.title }}</strong
          >. Klik salah satu untuk melihat detail pengerjaan.
        </p>

        <div class="grid grid-cols-1 gap-3">
          <router-link
            v-for="project in relatedProjects"
            :key="project.id"
            :to="`/project/${project.slug}`"
            class="flex items-center gap-4 p-4 bg-bg-primary/50 border border-border-color rounded-2xl hover:border-accent-primary/50 transition-all group relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-linear-to-r from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>

            <div
              class="w-12 h-12 bg-bg-secondary border border-border-color rounded-xl flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all shrink-0"
            >
              <component :is="getProjectIcon(project.icon)" :size="20" />
            </div>

            <div class="flex-1 min-w-0">
              <h4
                class="font-bold text-text-primary text-[clamp(0.9rem,2vw,1rem)] truncate group-hover:text-accent-primary transition-colors"
              >
                {{ project.title }}
              </h4>
              <div class="flex items-center gap-2 mt-1">
                <span
                  class="text-[10px] font-black uppercase tracking-wider text-text-tertiary"
                  >{{ project.category }}</span
                >
                <div class="w-1 h-1 rounded-full bg-border-color"></div>
                <span class="text-[10px] font-medium text-text-tertiary italic"
                  >Case Study</span
                >
              </div>
            </div>

            <div
              class="w-8 h-8 rounded-lg border border-border-color flex items-center justify-center text-text-tertiary group-hover:text-accent-primary group-hover:border-accent-primary/30 transition-all"
            >
              <ArrowRight :size="14" />
            </div>
          </router-link>
        </div>

        <!-- Explore more btn -->
        <div class="pt-6 border-t border-border-color/50">
          <BaseButton
            :to="
              relatedProjects[0]
                ? `/projects?category=${relatedProjects[0].category}`
                : '/projects'
            "
            variant="secondary"
            size="lg"
            class="w-full justify-between"
          >
            <span>Lihat Seluruh Portfolio dalam Kategori Ini</span>
            <ArrowUpRight :size="18" />
          </BaseButton>
        </div>
      </div>
    </BottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { servicesData, type Service } from "../../data/landing/services";
import { projectsData } from "../../data/landing/projects";
// import { projectTypes } from "../../data/config/orderConfig"; // REMOVED: Static Data
import {
  pricingService,
  type Feature,
  type ProjectType,
} from "../../services/pricingService"; // ADDED: Dynamic Service

import { usePopupManager, Popups } from "../../composables/usePopupManager";
import { BaseButton } from "@kangjessy/ui";
import AccordionItem from "../../components/ui/AccordionItem.vue";
import { BottomSheet } from "@kangjessy/ui";
import { useSEO } from "../../composables/useSEO";

// ICONS
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  HelpCircle,
  FolderOpen,
  Clock,
  RefreshCw,
  FileText,
  Check,
  ShieldCheck,
  Monitor,
  Brain,
  Settings,
  ShoppingCart,
  ShoppingBag,
  Bug,
  Puzzle,
  ChevronDown,
  MessageCircle,
  Layers,
  Search,
  Rocket,
  Zap,
  Globe,
  Hotel,
  BarChart3,
  Building2,
  UserCheck,
  BookOpen,
  Lock,
  Palette,
  X,
  ChevronUp,
  Database,
  Workflow,
  Activity,
  CreditCard,
  PlusIcon, // Added missing import if needed, assuming it was used in template
} from "lucide-vue-next";

// ...

const route = useRoute();
const router = useRouter();
const popup = usePopupManager();

const service = ref<Service | null>(null);
const features = ref<Feature[]>([]);
const allProjectTypes = ref<ProjectType[]>([]); // ADDED: Dynamic State

// SEO Setup
useSEO({
  title: computed(() => service.value?.title),
  description: computed(
    () =>
      service.value?.tagline || "Layanan profesional dari KangJessy Agency.",
  ),
  url: computed(() => `/services/${route.params.id}`),
});
const selectedPkg = ref<ProjectType | null>(null); // Updated Type

const relevantFeatures = computed(() => {
  if (!service.value) return [];
  // Use 'relevantTo' from dynamic feature service
  return features.value.filter((f) => f.relevantTo.includes(service.value!.id));
});
const activeFaqIndex = ref<number | null>(null);
const isPackagesSheetOpen = ref(false);
const isProjectsSheetOpen = ref(false);
const searchQuery = ref("");
const isFloatingExpanded = ref(false);

const relatedProjects = computed(() => {
  if (!service.value) return [];
  // Filter projects where project.relatedServices includes current service.id
  return projectsData.filter((p) =>
    p.relatedServices?.includes(service.value!.id),
  );
});

const availablePackages = computed(() => {
  if (!service.value || !allProjectTypes.value.length) return [];

  // Filter packages for this service using dynamic data
  let packages = allProjectTypes.value.filter(
    (p) => p.serviceId === service.value?.id,
  );

  // Sort Logic:
  // 1. Recommended/Featured goes first
  // 2. Then sort by Lowest Price
  return packages.sort((a, b) => {
    // Check for badges
    const aIsFeatured = a.badge || a.isFeatured;
    const bIsFeatured = b.badge || b.isFeatured;

    if (aIsFeatured && !bIsFeatured) return -1;
    if (!aIsFeatured && bIsFeatured) return 1;

    // If both featured or both not, sort by price
    return (a.basePrice || 0) - (b.basePrice || 0);
  });
});

const filteredPackages = computed(() => {
  if (!searchQuery.value) return availablePackages.value;
  const q = searchQuery.value.toLowerCase();
  return availablePackages.value.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.desc && p.desc.toLowerCase().includes(q)),
  );
});

const featuredPackages = computed(() => {
  if (!availablePackages.value.length) return [];
  // Show first 4 or marked as featured
  return availablePackages.value.slice(0, 4);
});

const toggleFaq = (index: number) => {
  activeFaqIndex.value = activeFaqIndex.value === index ? null : index;
};

const handleSelectPackage = (pkg: any) => {
  selectedPkg.value = pkg;
  isPackagesSheetOpen.value = false;
};

const scrollToFoundation = () => {
  const foundation = availablePackages.value.find((p) =>
    p.id.startsWith("foundation-"),
  );
  if (foundation) {
    selectedPkg.value = foundation;
    // Find the features section and scroll to it
    const featureSection = document.querySelector(".mt-10.pt-10");
    if (featureSection) {
      featureSection.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    isPackagesSheetOpen.value = true;
  }
};

const getServiceIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Monitor: Monitor,
    Brain: Brain,
    Settings: Settings,
    ShoppingCart: ShoppingCart,
    Bug: Bug,
    Puzzle: Puzzle,
    Layers: Layers,
    Rocket: Rocket,
    Zap: Zap,
    Database: Database,
    Workflow: Workflow,
    Activity: Activity,
    CreditCard: CreditCard,
    ShieldCheck: ShieldCheck,
    BarChart3: BarChart3,
    Globe: Globe,
    Lock: Lock,
    Palette: Palette,
  };
  return icons[iconName] || Puzzle;
};

const getFeatureIcon = (iconName?: string) => {
  const icons: Record<string, any> = {
    ShieldCheck: ShieldCheck,
    Palette: Palette,
    Zap: Zap,
    Lock: Lock,
    Globe: Globe,
  };
  return icons[iconName || "Check"] || Check;
};

const getProjectIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Globe: Globe,
    ShieldCheck: ShieldCheck,
    ShoppingBag: ShoppingBag,
    Hotel: Hotel,
    BarChart3: BarChart3,
    Building2: Building2,
    MessageCircle: MessageCircle,
    UserCheck: UserCheck,
    ShoppingCart: ShoppingCart,
    BookOpen: BookOpen,
    Monitor: Monitor,
  };
  return icons[iconName] || Puzzle;
};

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(val);
};

const fetchData = async () => {
  const id = route.params.id as string;
  const foundData = servicesData[id];

  if (foundData) {
    service.value = foundData;
    window.scrollTo({ top: 0, behavior: "instant" } as any);

    // Fetch dynamic project types & features concurrently
    const [fetchedFeatures, fetchedProjects] = await Promise.all([
      pricingService.getAllFeatures(), // Use new pricing service
      pricingService.getAllProjectTypes(), // Use new pricing service
    ]);

    features.value = fetchedFeatures;
    allProjectTypes.value = fetchedProjects;

    // Set initial selected package
    if (availablePackages.value.length > 0) {
      selectedPkg.value = availablePackages.value[0];
    }
  } else {
    router.push("/");
  }
};

const openConsultation = () => {
  if (!service.value) return;
  popup.openModal(Popups.CHAT_WA, {
    category: `Service: ${service.value.title}`,
    initialMessage: `Halo Kang Jessy! Saya tertarik dengan layanan ${service.value.title} dan ingin konsultasi gratis.`,
  });
};

onMounted(fetchData);
watch(() => route.params.id, fetchData);

watch(availablePackages, (newPkgs) => {
  if (newPkgs.length > 0 && !selectedPkg.value) {
    selectedPkg.value = newPkgs[0];
  }
});
</script>

<style scoped>
/* Bento List Animation */
.bento-list-enter-active,
.bento-list-leave-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay);
}

.bento-list-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.bento-list-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
  position: absolute;
  width: 100%;
}

.bento-list-move {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
