<template>
  <!-- Loading State -->
  <div v-if="isLoading" class="min-h-screen bg-bg-primary flex items-center justify-center">
    <div class="flex flex-col items-center gap-4">
      <div class="w-12 h-12 border-2 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin"></div>
      <p class="text-text-tertiary text-sm font-medium">Memuat layanan...</p>
    </div>
  </div>

  <!-- Not Found State -->
  <div v-else-if="!service && !isLoading" class="min-h-screen bg-bg-primary flex items-center justify-center">
    <div class="text-center">
      <p class="text-text-secondary text-lg font-bold mb-4">Layanan tidak ditemukan</p>
      <router-link to="/" class="text-accent-primary hover:underline text-sm">← Kembali ke beranda</router-link>
    </div>
  </div>

  <div class="min-h-screen bg-bg-primary" v-else-if="service">
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
                  selectedPkg?.deliveryTime || service.deliveryTime
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
                  selectedPkg?.revisions || service.revisions
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
        <div class="space-y-16 min-w-0">
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

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
                  v-if="pkg.badge || getPackageOriginalPrice(pkg) > pkg.basePrice"
                  class="absolute -right-8 top-4 text-white text-[9px] font-black py-1 px-10 rotate-45 shadow-sm"
                  :class="
                    (pkg.badge && pkg.badge.toLowerCase().includes('recommend'))
                      ? 'bg-accent-primary'
                      : 'bg-amber-500'
                  "
                >
                  {{ pkg.badge || 'PROMO' }}
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
                        getPackageOriginalPrice(pkg) > pkg.basePrice
                      "
                      class="text-[0.8rem] text-text-secondary line-through opacity-70 mb-0.5"
                    >
                      {{ formatCurrency(getPackageOriginalPrice(pkg)) }}
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
                v-if="service.id !== 'maintenance-custom'"
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
            v-if="relevantFeatures.length"
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
                  {{ service.id === 'maintenance-custom' ? 'Pilih fitur yang ingin Anda tambahkan atau rakit ke dalam sistem Anda.' : 'Pondasi ini dapat Anda upscale dengan fitur tambahan berikut sesuai kebutuhan bisnis.' }}
                </p>
              </div>
            </div>

            <!-- Category Tabs (UI Standard) -->
            <div 
              v-if="featureCategories.length > 1"
              class="flex bg-bg-secondary p-1 rounded-2xl border border-border-color w-full lg:w-fit max-w-full overflow-x-auto no-scrollbar items-center gap-1 mb-6"
              role="tablist"
            >
              <button
                v-for="cat in featureCategories"
                :key="cat"
                @click="activeFeatureCategory = cat"
                role="tab"
                :aria-selected="activeFeatureCategory === cat"
                class="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap shrink-0"
                :class="activeFeatureCategory === cat 
                  ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' 
                  : 'text-text-tertiary hover:text-text-primary hover:bg-white/5'"
              >
                {{ cat }}
                <span class="ml-1 opacity-50 text-[10px]">
                  ({{ relevantFeatures.filter(f => (f.category || 'Other') === cat).length }})
                </span>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="feature in (featureCategories.length > 1 ? filteredRelevantFeatures : relevantFeatures)"
                :key="feature.id"
                class="p-5 bg-bg-primary border rounded-2xl flex flex-col justify-between group transition-all cursor-pointer relative overflow-hidden"
                :class="selectedFeatures.includes(feature.id) 
                  ? 'border-accent-primary bg-accent-primary/5 shadow-sm' 
                  : 'border-border-color hover:border-accent-primary/30 hover:bg-white/5'"
                @click="toggleFeature(feature.id)"
              >
                <!-- Selection Mark -->
                <div 
                  v-if="selectedFeatures.includes(feature.id)"
                  class="absolute top-0 right-0 w-8 h-8 bg-accent-primary text-white flex items-center justify-center rounded-bl-xl shadow-lg"
                >
                  <Check :size="14" />
                </div>
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <h4
                      class="font-bold text-text-primary text-[0.95rem] group-hover:text-accent-primary transition-colors"
                    >
                      {{ feature.name }}
                    </h4>
                    <div class="flex flex-col items-end">
                      <span
                        v-if="feature.originalPrice && feature.originalPrice > feature.price"
                        class="text-[0.6rem] text-text-tertiary line-through opacity-70 mb-0.5"
                      >
                        +Rp {{ formatCurrency(feature.originalPrice).replace("Rp", "").trim() }}
                      </span>
                      <div
                        class="text-[0.7rem] font-mono font-bold text-accent-primary bg-accent-primary/5 px-2 py-0.5 rounded-lg border border-accent-primary/10 leading-none"
                      >
                        +Rp
                        {{
                          formatCurrency(feature.price).replace("Rp", "").trim()
                        }}
                      </div>
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
                @click="goToOrder"
              >
                <PlusIcon :size="16" class="mr-2" />
                Pilih Fitur di Kalkulator
              </BaseButton>
            </div>
          </section>

          <!-- What's Included (Simple List - only when NO features at all) -->
          <section v-if="allFeaturesList.length === 0 && (service.included?.length || selectedPkg?.features?.length)">
            <h3 class="text-2xl font-bold mb-5 text-text-primary">
              What's Included
            </h3>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li
                v-for="item in selectedPkg?.features || service.included"
                :key="item"
                class="flex items-center gap-3 text-text-secondary"
              >
                <Check :size="18" class="text-accent-primary shrink-0" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </section>

          <!-- Detailed Features (Animated Bento) - shows when features exist from relational mapping -->
          <section
            v-if="allFeaturesList.length > 0"
            class="space-y-10 border-t border-border-color/20 pt-10 mt-10 overflow-hidden"
          >
            <div class="flex flex-col gap-2">
              <h3 class="text-2xl font-bold text-text-primary">
                {{ service.id === 'maintenance-custom' ? 'Standard Assembly & Scalability' : `What's Included in ${selectedPkg?.name || service.title}` }}
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
                v-for="(feature, fIdx) in displayedFeatures"
                :key="(selectedPkg?.id || 'default') + '-' + fIdx"
                class="group p-6 md:p-8 rounded-[32px] transition-all relative overflow-hidden"
                :class="[
                  feature.title === 'Starter Pack' 
                    ? 'bg-linear-to-br from-accent-primary/[0.08] via-bg-secondary to-bg-secondary border-2 border-accent-primary/40 shadow-[0_0_40px_-15px_rgba(59,130,246,0.1)] ring-1 ring-accent-primary/20 hover:border-accent-primary/60 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)]' 
                    : 'bg-bg-secondary border border-border-color hover:bg-bg-secondary/80 hover:border-accent-primary/20'
                ]"
                :style="{ '--delay': (Number(fIdx) * 0.1).toFixed(1) + 's' }"
              >
                <!-- Bento Badge for Starter Pack -->
                <div 
                  v-if="feature.title === 'Starter Pack'"
                  class="absolute top-6 right-6 px-3 py-1 bg-accent-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full z-20 shadow-lg shadow-accent-primary/20"
                >
                  Core Foundation
                </div>

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
                    <ul v-if="feature.items && feature.items.length" class="space-y-4">
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

            <!-- Show all features btn -->
            <div 
              v-if="allFeaturesList.length > 5"
              class="flex justify-center mt-12"
            >
              <BaseButton 
                variant="secondary"
                size="lg"
                class="rounded-full! px-8!"
                @click="isFeaturesSheetOpen = true"
              >
                Lihat Semua Fitur ({{ allFeaturesList.length }})
              </BaseButton>
            </div>
          </section>

          <!-- Workflow -->
          <section>
            <h3 class="text-2xl font-bold mb-6 text-text-primary">
              Our Workflow
            </h3>
            <div class="space-y-5">
              <div
                v-for="(step, idx) in (selectedPkg as any)?.workflow || (selectedPkg as any)?.process || service.process"
                :key="idx"
                class="flex gap-6 p-6 bg-bg-secondary border border-border-color rounded-2xl transition-all hover:border-accent-primary/30"
              >
                <div
                  class="w-10 h-10 bg-accent-primary text-white rounded-xl flex items-center justify-center font-extrabold shrink-0"
                >
                  {{ (Number(idx) + 1).toString().padStart(2, "0") }}
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
          <section v-if="(selectedPkg as any)?.technologies || service.technologies">
            <h3 class="text-2xl font-bold mb-5 text-text-primary">
              Stack Used
            </h3>
            <div class="flex flex-wrap gap-2.5">
              <span
                v-for="tech in (selectedPkg as any)?.technologies || service.technologies"
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
                        v-for="tag in (project.tags || []).slice(0, 2)"
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
          <section v-if="((selectedPkg as any)?.faq && (selectedPkg as any).faq.length) || (service.faq && service.faq.length)">
            <h3 class="text-2xl font-bold mb-5 text-text-primary">
              Common Questions
            </h3>
            <div class="space-y-4">
              <AccordionItem
                v-for="(item, index) in (selectedPkg as any)?.faq || service.faq"
                :key="index"
                :title="item.question"
                :isOpen="activeFaqIndex === index"
                @toggle="toggleFaq(Number(index))"
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
                      effectiveOriginalPrice > (selectedPkg?.basePrice || 0)
                    "
                    class="flex items-center gap-2 mb-1"
                  >
                    <span
                      class="text-sm text-text-secondary line-through opacity-70"
                    >
                      {{ formatCurrency(effectiveOriginalPrice) }}
                    </span>
                    <span
                      class="bg-red-500/10 text-red-400 border border-red-500/20 text-[0.65rem] font-bold px-2 py-0.5 rounded-full"
                    >
                      Hemat
                      {{
                        formatCurrency(
                          effectiveOriginalPrice - (selectedPkg?.basePrice || 0),
                        )
                      }}
                    </span>
                  </div>
                  <span
                    class="text-[clamp(1.875rem,3vw,2.25rem)] font-extrabold text-text-primary block leading-none"
                  >
                    {{ formatCurrency(totalInvestment) }}
                  </span>
                  <p
                    v-if="selectedFeatures.length > 0"
                    class="mt-2 text-[10px] text-accent-primary font-bold uppercase tracking-wider"
                  >
                    + {{ selectedFeatures.length }} Fitur Tambahan
                  </p>
                </div>

                <!-- Operational Highlights in Sidebar -->
                <div v-if="selectedPkg" class="grid grid-cols-3 gap-2 mb-6">
                  <div
                    v-if="selectedPkg.maxPages"
                    class="bg-white/5 border border-white/10 p-2.5 rounded-xl"
                  >
                    <FileText :size="12" class="text-accent-primary mb-1" />
                    <div
                      class="text-[7.5px] font-black text-text-tertiary uppercase tracking-widest"
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
                    class="bg-white/5 border border-white/10 p-2.5 rounded-xl"
                  >
                    <Clock :size="12" class="text-accent-primary mb-1" />
                    <div
                      class="text-[7.5px] font-black text-text-tertiary uppercase tracking-widest"
                    >
                      Waktu
                    </div>
                    <div
                      class="text-[10px] font-bold text-text-primary truncate"
                    >
                      {{ selectedPkg.deliveryTime }}
                    </div>
                  </div>
                  <div
                    v-if="selectedPkg.revisions"
                    class="bg-white/5 border border-white/10 p-2.5 rounded-xl"
                  >
                    <RefreshCw :size="12" class="text-accent-primary mb-1" />
                    <div
                      class="text-[7.5px] font-black text-text-tertiary uppercase tracking-widest"
                    >
                      Revisi
                    </div>
                    <div
                      class="text-[10px] font-bold text-text-primary truncate"
                    >
                      {{ selectedPkg.revisions }}
                    </div>
                  </div>
                </div>

                <h4 v-if="service?.id === 'maintenance-custom' && selectedFeatures.length" class="text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mb-4">
                  Fitur yang bapak rakit
                </h4>
                <p
                  v-if="selectedPkg?.desc"
                  class="text-[0.85rem] text-text-secondary leading-relaxed mb-6 opacity-80 italic"
                >
                  "{{ selectedPkg.desc }}"
                </p>

                <ul
                  class="space-y-3 mb-8 border-t border-border-color/10 pt-6"
                >
                  <li
                    v-for="f in sidebarDisplayList"
                    :key="f.title"
                    class="flex items-start gap-3 text-[0.88rem] text-text-secondary leading-tight"
                  >
                    <Check
                      :size="14"
                      class="text-accent-primary grow-0 shrink-0 mt-0.5"
                    />
                    <span>{{ f.title }}</span>
                  </li>
                  
                  <li v-if="(service?.id === 'maintenance-custom' ? selectedFeatures.length : allFeaturesList.length) > 5">
                    <button 
                      @click="isFeaturesSheetOpen = true"
                      class="text-[11px] font-black uppercase tracking-widest text-accent-primary hover:text-white transition-colors flex items-center gap-2 mt-2"
                    >
                      +{{ (service?.id === 'maintenance-custom' ? selectedFeatures.length : allFeaturesList.length) - 5 }} Fitur Lainnya
                      <ArrowRight :size="12" />
                    </button>
                  </li>
                </ul>

                <div class="flex flex-col gap-3">
                  <BaseButton
                    variant="primary"
                    size="lg"
                    @click="goToOrder"
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
      class="fixed bottom-[84px] left-4 right-4 z-1100 md:hidden transition-all duration-500"
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
          <ul class="space-y-3">
            <li
              v-for="f in displayedFeatures"
              :key="f.title"
              class="flex items-start gap-3 text-[0.825rem] text-text-secondary leading-tight"
            >
              <Check :size="13" class="text-accent-primary shrink-0 mt-0.5" />
              <span>{{ f.title }}</span>
            </li>
          </ul>
          
          <div v-if="allFeaturesList.length > 5" class="mt-4">
            <button 
              @click="isFeaturesSheetOpen = true; isFloatingExpanded = false"
              class="text-[10px] font-black uppercase tracking-widest text-accent-primary flex items-center gap-2"
            >
              Lihat {{ allFeaturesList.length - 5 }} Fitur Lainnya
              <ArrowRight :size="12" />
            </button>
          </div>

          <div class="mt-5 pt-4 border-t border-white/5">
            <p class="text-[0.7rem] text-text-tertiary italic leading-relaxed">
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
                <span class="text-[14px] font-bold text-accent-primary">
                  {{ formatCurrency(totalInvestment) }}
                </span>
                <span 
                  v-if="selectedFeatures.length"
                  class="text-[9px] font-black text-accent-primary uppercase"
                >
                  +{{ selectedFeatures.length }} Add-ons
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
              @click="goToOrder"
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
      :maxWidth="packageModalMaxWidth"
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

      <!-- Grid View (Dynamic Column Layout) -->
      <div 
        class="px-6 py-6 grid gap-4 pb-safe overflow-x-hidden"
        :class="packageModalGridClass"
      >
        <div
          v-for="pkg in filteredPackages"
          :key="pkg.id"
          class="p-4 rounded-[24px] border transition-all active:scale-[0.98] flex flex-col gap-2 relative bg-bg-primary/50 cursor-pointer overflow-hidden group col-span-1"
          :class="
            selectedPkg?.id === pkg.id
              ? 'border-accent-primary bg-accent-primary/5 shadow-md shadow-accent-primary/10'
              : 'border-border-color'
          "
          @click="handleSelectPackage(pkg)"
        >
          <!-- Badge -->
          <div
            v-if="pkg.badge || getPackageOriginalPrice(pkg) > pkg.basePrice"
            class="absolute right-0 top-0 text-[8px] font-black py-1.5 px-4 rounded-bl-xl shadow-sm text-white"
            :class="
              (pkg.badge && pkg.badge.toLowerCase().includes('recommend'))
                ? 'bg-accent-primary'
                : 'bg-amber-500'
            "
          >
            {{ pkg.badge || 'PROMO' }}
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
                v-for="f in (pkg.features || service?.packageFeatures || []).slice(
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
                v-if="(pkg.features || service?.packageFeatures || []).length > 3"
                class="text-[0.65rem] text-accent-primary font-bold uppercase tracking-wider"
              >
                +{{ (pkg.features || service?.packageFeatures || []).length - 3 }}
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
      :maxWidth="projectsModalMaxWidth"
    >
      <div class="px-6 py-6 pb-20 sm:pb-6 space-y-6">
        <p
          class="text-[clamp(0.85rem,2vw,0.9rem)] text-text-secondary leading-relaxed"
        >
          Berikut adalah beberapa case study yang relevan dengan layanan
          <strong>{{ service?.title }}</strong
          >. Klik salah satu untuk melihat detail pengerjaan.
        </p>

        <div 
          class="grid gap-4"
          :class="projectsModalGridClass"
        >
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

    <!-- All Features Bottom Sheet -->
    <BottomSheet
      v-model="isFeaturesSheetOpen"
      :title="service?.id === 'maintenance-custom' ? 'Daftar Rakitan Fitur' : `Full Features: ${selectedPkg?.name || service?.title}`"
      :icon="Check"
      :maxWidth="featuresModalMaxWidth"
    >
      <div 
        class="px-6 py-6 pb-24 sm:pb-8 grid gap-8"
        :class="featuresModalGridClass"
      >
        <div 
          v-for="(feature, idx) in modalFeaturesList" 
          :key="idx"
          class="space-y-4 pb-8 border-b lg:border-b-0 border-white/5 last:border-0"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-accent-primary/10 border border-accent-primary/20 rounded-xl flex items-center justify-center text-accent-primary shrink-0">
               <component :is="getFeatureIcon(feature.icon)" :size="20" />
            </div>
            <h4 class="text-lg font-bold text-text-primary">
              {{ feature.title }}
            </h4>
          </div>

          <ul v-if="feature.items && feature.items.length" class="space-y-3.5 pl-1">
            <li 
              v-for="(item, iIdx) in feature.items" 
              :key="iIdx"
              class="flex items-start gap-3"
            >
              <div class="mt-2 w-1.5 h-1.5 rounded-full bg-accent-primary/40 shrink-0"></div>
              <span class="text-text-secondary text-sm leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </BottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { servicesData, type Service } from "../../data/landing/services"; // REMOVED
// import { projectsData } from "../../data/landing/projects";
// import { projectTypes } from "../../data/config/orderConfig"; // REMOVED: Static Data
import {
  pricingService,
  type Feature,
  type ProjectType,
  type ServiceData,
} from "../../services/pricingService"; // ADDED: Dynamic Service
import { portfolioService, type PortfolioProject } from "../../services/portfolioService";

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
  Plus as PlusIcon,
  Layout,
  Cpu,
} from "lucide-vue-next";

// ...

const route = useRoute();
const router = useRouter();
const popup = usePopupManager();

const service = ref<ServiceData | null>(null);
const features = ref<Feature[]>([]);
const allProjectTypes = ref<ProjectType[]>([]);
const isLoading = ref(true); // Loading guard to prevent premature redirect

// SEO Setup
useSEO({
  title: computed(() => service.value?.title),
  description: computed(
    () =>
      service.value?.tagline || "Layanan profesional dari KangJessy Agency.",
  ),
  url: computed(() => `/service/${route.params.id}`),
});
const selectedPkg = ref<ProjectType | null>(null); // Updated Type
const selectedFeatures = ref<string[]>([]);

const toggleFeature = (id: string) => {
  const idx = selectedFeatures.value.indexOf(id);
  if (idx > -1) {
    selectedFeatures.value.splice(idx, 1);
  } else {
    selectedFeatures.value.push(id);
  }
};

const goToOrder = () => {
  if (!service.value) return;
  const baseUrl = "/order";
  const type = selectedPkg.value?.id || service.value.id;
  let url = `${baseUrl}?type=${type}`;
  
  if (selectedFeatures.value.length > 0) {
    url += `&addFeature=${selectedFeatures.value.join(",")}`;
  }
  
  router.push(url);
};

// Helper for identifying Website services (Aggressive Detection)
const isWebsiteService = computed(() => {
  const currentId = route.params.id as string;
  const sId = service.value?.id || '';
  const pServiceId = selectedPkg.value?.serviceId || '';
  
  return currentId === 'website-high-conversion' || 
         sId === 'website-high-conversion' || 
         pServiceId === 'website-high-conversion';
});

const packageMarketValue = computed(() => {
  if (!selectedPkg.value || !selectedPkg.value.features) return 0;
  
  // Sum up all features that are included in this package based on their individual prices
  return selectedPkg.value.features.reduce((acc, fId) => {
    const cleanId = String(fId).trim().toLowerCase();
    const f = features.value.find(feat => feat.id.trim().toLowerCase() === cleanId);
    if (!f && cleanId === 'starter-pack') return acc + 1000000;
    return acc + (f?.price || 0);
  }, 0);
});

const effectiveOriginalPrice = computed(() => {
  if (!selectedPkg.value) return 0;
  // Use the larger of the two: hardcoded original price OR the sum of individual features (market value)
  const baseOriginal = selectedPkg.value.originalPrice || 0;
  return Math.max(baseOriginal, packageMarketValue.value);
});

const totalInvestment = computed(() => {
  // basePrice already computed with tiered discount in pricingService
  let base = selectedPkg.value?.basePrice || 0;
  
  // Add manually selected add-on features
  let addonsTotal = 0;
  selectedFeatures.value.forEach(fId => {
    const cleanId = String(fId).trim().toLowerCase();
    // Skip if feature is already part of the package bundle
    if (selectedPkg.value?.features?.map(id => id.trim().toLowerCase()).includes(cleanId)) return;
    
    const f = features.value.find(feat => feat.id.trim().toLowerCase() === cleanId);
    if (f) {
      addonsTotal += f.price;
    } else if (cleanId === 'starter-pack') {
      addonsTotal += 1000000;
    }
  });
  
  return base + addonsTotal;
});

// Build features list from relational mapping
const pkgRelevantFeatures = computed(() => {
  if (!selectedPkg.value) return [];
  return features.value.filter(f => f.relevantTo?.map(r => r.trim().toLowerCase()).includes(selectedPkg.value!.id.trim().toLowerCase()));
});

const allFeaturesList = computed(() => {
  const rawFeatures = selectedPkg.value?.features || [];
  const includedIds = rawFeatures.map(id => String(id).trim().toLowerCase());
  
  // Also include manually selected features that are NOT in the bundle
  selectedFeatures.value.forEach(fId => {
    const cleanId = String(fId).trim().toLowerCase();
    if (!includedIds.includes(cleanId)) includedIds.push(cleanId);
  });

  const list: any[] = [];
  
  // 1. MANDATORY: Starter Pack for all Website High-Conversion or if pack includes it
  if (isWebsiteService.value || includedIds.includes('starter-pack')) {
    list.push({
      title: "Starter Pack",
      icon: "Zap",
      items: [
        "Mobile Responsive Optimization (Smartphone & Tablet)",
        "Security Setup (SSL, Modern Encryption & Anti-Brute)",
        "Performance Tuning (Fast Page Loads & Core Web Vitals)",
        "Basic SEO Setup (Meta tags, Sitemap & Search Console)",
        "Integrated Analytics (Google Analytics & Meta Pixel Tracking)"
      ]
    });
  }

  // 2. Detailed Features (if not maintenance-starter which is covered by Starter Pack)
  if (selectedPkg.value?.id !== 'maintenance-starter') {
    if (selectedPkg.value?.detailedFeatures?.length) {
      list.push(...selectedPkg.value.detailedFeatures);
    } else if (service.value?.detailedFeatures?.length) {
      list.push(...service.value.detailedFeatures);
    }
  }

  // 3. Simple Features from include list
  includedIds.forEach(id => {
    if (id === 'starter-pack') return;
    const f = features.value.find(feat => feat.id.trim().toLowerCase() === id);
    if (f && !list.find(l => l.title === f.name)) {
      list.push({
        title: f.name,
        items: [f.desc],
        icon: f.icon || 'Puzzle'
      });
    }
  });

  if (list.length > 0) return list;

  return pkgRelevantFeatures.value.map(f => ({
    title: f.name,
    items: [f.desc],
    icon: f.icon || 'Zap'
  }));
});

const displayedFeatures = computed(() => allFeaturesList.value.slice(0, 5));

const sidebarDisplayList = computed(() => {
  const list: any[] = [];
  const rawFeatures = selectedPkg.value?.features || [];
  const includedIds = rawFeatures.map(id => String(id).trim().toLowerCase());
  
  // 1. Always show Starter Pack if it's there (Priority #1)
  if (isWebsiteService.value || includedIds.includes('starter-pack') || selectedFeatures.value.map(id => id.trim().toLowerCase()).includes('starter-pack')) {
    list.push({ title: 'Starter Pack Included', icon: 'Zap' });
  }

  // 2. Add other bundled features
  includedIds.forEach(fId => {
    if (fId === 'starter-pack') return;
    const f = features.value.find(feat => feat.id.trim().toLowerCase() === fId);
    if (f) list.push({ title: f.name });
  });

  // 3. Add manually selected add-ons
  selectedFeatures.value.forEach(fId => {
    const cleanId = String(fId).trim().toLowerCase();
    if (cleanId === 'starter-pack') return;
    if (includedIds.includes(cleanId)) return;
    const f = features.value.find(feat => feat.id.trim().toLowerCase() === cleanId);
    if (f) list.push({ title: f.name });
  });

  return list.slice(0, 5);
});

const modalFeaturesList = computed(() => {
  if (service.value?.id === 'maintenance-custom') {
    const list: any[] = [];
    if (isWebsiteService.value || selectedPkg.value?.features?.map(id => id.trim().toLowerCase()).includes('starter-pack') || selectedFeatures.value.map(id => id.trim().toLowerCase()).includes('starter-pack')) {
       list.push({
         title: "Starter Pack",
         items: ["Mobile Responsive, Security, Speed, SEO, & Analytics"],
         icon: 'Zap'
       });
    }
    
    selectedFeatures.value.forEach(fId => {
      const cleanId = String(fId).trim().toLowerCase();
      if (cleanId === 'starter-pack') return;
      const f = features.value.find(feat => feat.id.trim().toLowerCase() === cleanId);
      if (f) {
        list.push({ 
          title: f.name, 
          items: [f.desc],
          icon: f.icon || 'Zap'
        });
      }
    });
    return list;
  }
  return allFeaturesList.value;
});

const relevantFeatures = computed(() => {
  if (!service.value) return [];
  
  const includedFeatureIds = (selectedPkg.value?.features || []).map(id => id.trim().toLowerCase());
  
  let baseList: Feature[] = [];
  if (service.value.id === 'maintenance-custom') {
    baseList = features.value;
  } else if (selectedPkg.value) {
    baseList = features.value.filter(f => f.relevantTo?.map(r => r.trim().toLowerCase()).includes(selectedPkg.value!.id.trim().toLowerCase()));
  } else {
    const serviceProjectIds = allProjectTypes.value
      .filter(p => p.serviceId === service.value!.id)
      .map(p => p.id.trim().toLowerCase());
    baseList = features.value.filter(f => 
      f.relevantTo?.some(rt => serviceProjectIds.includes(rt.trim().toLowerCase()) || rt.trim().toLowerCase() === 'maintenance-custom')
    );
  }

  return baseList.filter(f => {
    const cleanId = f.id.trim().toLowerCase();
    // Hide if already included in bundle
    if (includedFeatureIds.includes(cleanId)) return false;
    // For non-maintenance, hide foundation items like starter-pack from add-ons list
    if (!isWebsiteService.value && service.value?.id !== 'maintenance-custom' && cleanId === 'starter-pack') return false;
    // For website service, always hide starter pack from add-ons because it's bundled
    if (isWebsiteService.value && cleanId === 'starter-pack') return false;
    return true;
  });
});

const featureCategories = computed(() => {
  const cats = relevantFeatures.value.reduce((acc: string[], f) => {
    const cat = f.category || 'Other';
    if (!acc.includes(cat)) acc.push(cat);
    return acc;
  }, []);
  return cats;
});

const activeFeatureCategory = ref<string>("");

const getPackageOriginalPrice = (pkg: ProjectType) => {
  if (!features.value.length) return pkg.originalPrice || 0;
  const marketVal = (pkg.features || []).reduce((acc, fId) => {
    const f = features.value.find(feat => feat.id === fId);
    return acc + (f?.price || 0);
  }, 0);
  return Math.max(pkg.originalPrice || 0, marketVal);
};

const filteredRelevantFeatures = computed(() => {
  if (!activeFeatureCategory.value) {
    if (featureCategories.value.length > 0) return relevantFeatures.value.filter(f => (f.category || 'Other') === featureCategories.value[0]);
    return relevantFeatures.value;
  }
  return relevantFeatures.value.filter(f => (f.category || 'Other') === activeFeatureCategory.value);
});

watch(featureCategories, (newCats) => {
  if (newCats.length > 0 && (!activeFeatureCategory.value || !newCats.includes(activeFeatureCategory.value))) {
    activeFeatureCategory.value = newCats[0] || "";
  }
}, { immediate: true });
const activeFaqIndex = ref<number | null>(null);
const isPackagesSheetOpen = ref(false);
const isProjectsSheetOpen = ref(false);
const isFeaturesSheetOpen = ref(false);
const searchQuery = ref("");
const isFloatingExpanded = ref(false);

const relatedProjects = ref<PortfolioProject[]>([]);

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

// Dynamic Modal Width & Grid Logic
const packageModalMaxWidth = computed(() => {
  const count = filteredPackages.value.length;
  if (count <= 2) return "3xl"; // Approx 2 columns width
  if (count === 3) return "5xl"; // Approx 3 columns width
  return "7xl"; // Max 4 columns width
});

const packageModalGridClass = computed(() => {
  const count = filteredPackages.value.length;
  if (count <= 1) return "grid-cols-1 max-w-sm mx-auto";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
});

// Projects Modal
const projectsModalMaxWidth = computed(() => {
  const count = relatedProjects.value.length;
  if (count <= 2) return "3xl";
  if (count === 3) return "5xl";
  return "7xl";
});

const projectsModalGridClass = computed(() => {
  const count = relatedProjects.value.length;
  if (count <= 1) return "grid-cols-1 max-w-sm mx-auto";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
});

// Features Modal
const featuresModalMaxWidth = computed(() => {
  const count = modalFeaturesList.value.length;
  if (count <= 2) return "3xl";
  if (count === 3) return "5xl";
  return "7xl";
});

const featuresModalGridClass = computed(() => {
  const count = modalFeaturesList.value.length;
  if (count <= 1) return "grid-cols-1 max-w-sm mx-auto";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
});

const toggleFaq = (index: number) => {
  activeFaqIndex.value = activeFaqIndex.value === index ? null : index;
};

const handleSelectPackage = (pkg: any) => {
  selectedPkg.value = pkg;
  isPackagesSheetOpen.value = false;
};

const scrollToFoundation = () => {
  router.push("/service/maintenance-custom");
};

const getServiceIcon = (iconName: any) => {
  if (typeof iconName !== 'string') return iconName || Puzzle;

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

const getFeatureIcon = (icon: any) => {
  if (icon && typeof icon !== 'string') return icon;
  
  const icons: Record<string, any> = {
    ShieldCheck, Palette, Zap, Lock, Globe, Rocket, Layers, Search, Layout, Cpu, Database
  };
  return (icon ? icons[icon] : Zap) || Zap;
};

const getProjectIcon = (iconName?: string) => {
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
  return (iconName ? icons[iconName] : Puzzle) || Puzzle;
};

const formatCurrency = (val?: number) => {
  if (val === undefined || val === null) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(val);
};

const fetchData = async () => {
  const id = route.params.id as string;
  if (!id) return;

  isLoading.value = true;
  service.value = null;

  try {
    const [allServices, fetchedFeatures, fetchedProjects] = await Promise.all([
      pricingService.getAllServices(),
      pricingService.getAllFeatures(),
      pricingService.getAllProjectTypes(),
    ]);

    const foundData = allServices.find((s) => s.id === id);

    if (foundData) {
      service.value = foundData;
      features.value = fetchedFeatures;
      allProjectTypes.value = fetchedProjects;

      window.scrollTo({ top: 0, behavior: "instant" } as any);

      // Set initial selected package
      if (foundData.id === 'maintenance-custom') {
        selectedPkg.value = fetchedProjects.find(p => p.id === 'maintenance-starter') || fetchedProjects.find(p => p.id === 'fitur-rakitan') || null;
      } else if (availablePackages.value.length > 0 && availablePackages.value[0]) {
        selectedPkg.value = availablePackages.value[0];
      }
      
      // Fetch related projects
      try {
        relatedProjects.value = await portfolioService.getProjectsByRelatedService(foundData.id);
      } catch (e) {
        console.error("Failed to load related projects", e);
      }
    }
    // NOTE: No longer auto-redirect to home if not found — show 404 state instead
  } catch (e) {
    console.error("Failed to load service data", e);
  } finally {
    isLoading.value = false;
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
  const firstPkg = newPkgs[0];
  if (newPkgs.length > 0 && !selectedPkg.value && firstPkg) {
    selectedPkg.value = firstPkg;
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
