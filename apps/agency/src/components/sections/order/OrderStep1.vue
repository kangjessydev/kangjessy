<template>
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_420px] relative items-start">
    <div
      class="p-6 sm:p-8 lg:p-14 lg:border-r border-border-color/50 bg-bg-primary/30 min-h-[400px] lg:min-h-[800px]"
    >
      <!-- Project Type (Trigger Card Pattern) -->
      <div class="mb-14">
        <div class="flex items-center gap-3 mb-8">
          <div
            class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary"
          >
            <LayoutIcon :size="20" />
          </div>
          <div>
            <h4
              class="text-[1.1rem] font-black text-text-primary tracking-tight"
            >
              Pilih Tipe Proyek
            </h4>
            <p class="text-xs text-text-tertiary font-medium">
              Langkah 1: Tentukan landasan sistem Anda
            </p>
          </div>
        </div>

        <!-- Bento Trigger Card -->
        <div
          class="group relative w-full p-6 border-2 rounded-[28px] cursor-pointer transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 overflow-hidden"
          role="button"
          tabindex="0"
          aria-label="Pilih Tipe Proyek"
          :class="
            selectedTypeData
              ? 'bg-accent-primary/5 border-accent-primary shadow-xl shadow-accent-primary/5'
              : 'bg-bg-secondary/30 border-dashed border-border-color/50 hover:bg-bg-secondary/50 hover:border-accent-primary/30'
          "
          @click="openSelectionSheet('type')"
          @keydown.enter="openSelectionSheet('type')"
          @keydown.space.prevent="openSelectionSheet('type')"
        >
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative z-10 min-w-0"
          >
            <!-- Icon -->
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0"
              :class="
                selectedTypeData
                  ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-105 sm:scale-110'
                  : 'bg-bg-primary border border-border-color text-text-tertiary group-hover:scale-110 group-hover:text-accent-primary group-hover:border-accent-primary/30'
              "
            >
              <component
                :is="selectedTypeData?.icon || LayoutIcon"
                :size="32"
                stroke-width="1.5"
                class="shrink-0 scale-75 sm:scale-100 transition-transform"
              />
            </div>

            <!-- Content -->
            <div class="flex flex-col min-w-0">
              <h5
                class="text-[clamp(1rem,5vw,1.25rem)] font-black text-text-primary tracking-tight mb-1.5 sm:mb-1"
              >
                {{ selectedTypeData?.name || "Pilih Tipe Proyek" }}
              </h5>

              <p
                class="text-xs sm:text-sm text-text-secondary line-clamp-2 max-w-md"
              >
                {{ selectedTypeData?.desc || defaultTypeDesc }}
              </p>

              <!-- Operational Highlights (Trigger Card) -->
              <div
                v-if="selectedTypeData"
                class="flex flex-wrap gap-2 mt-3 mb-1"
              >
                <div
                  v-if="selectedTypeData.maxPages"
                  class="flex items-center gap-1.5 bg-bg-primary/50 border border-border-color px-2.5 py-1 rounded-lg text-[9px] font-black text-text-secondary uppercase"
                >
                  <FileTextIcon :size="10" class="text-accent-primary" />
                  {{ selectedTypeData.maxPages }}
                </div>
                <div
                  v-if="selectedTypeData.deliveryTime"
                  class="flex items-center gap-1.5 bg-bg-primary/50 border border-border-color px-2.5 py-1 rounded-lg text-[9px] font-black text-text-secondary uppercase"
                >
                  <ClockIcon :size="10" class="text-accent-primary" />
                  {{ selectedTypeData.deliveryTime }}
                </div>
                <div
                  v-if="selectedTypeData.revisions"
                  class="flex items-center gap-1.5 bg-bg-primary/50 border border-border-color px-2.5 py-1 rounded-lg text-[9px] font-black text-text-secondary uppercase"
                >
                  <RefreshCwIcon :size="10" class="text-accent-primary" />
                  {{ selectedTypeData.revisions }}
                </div>
              </div>

              <div v-if="selectedTypeData" class="flex flex-col mt-3">
                <div class="flex items-center justify-between mb-1">
                  <span
                    class="text-[0.65rem] font-black uppercase tracking-widest text-text-tertiary"
                    >Investasi Mulai</span
                  >
                  <span
                    v-if="totalBundleSavings > 0"
                    class="text-[10px] font-black text-emerald-500 animate-pulse"
                  >
                    Hemat Rp {{ formatPrice(totalBundleSavings) }}
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <span
                    v-if="
                      selectedTypeData.originalPrice &&
                      selectedTypeData.originalPrice >
                        selectedTypeData.basePrice
                    "
                    class="text-xs text-text-tertiary line-through opacity-70"
                  >
                    Rp {{ formatPrice(selectedTypeData.originalPrice) }}
                  </span>
                  <span
                    class="bg-bg-primary px-3 py-1.5 rounded-lg border border-border-color text-xs font-mono font-bold text-accent-primary group-hover:border-accent-primary/30 transition-colors"
                  >
                    Rp {{ formatPrice(selectedTypeData.basePrice) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Indicator -->
          <div
            class="absolute top-6 right-6 sm:static flex items-center justify-center transition-all duration-300 shrink-0"
            :class="
              selectedTypeData
                ? 'w-auto h-10 px-5 rounded-full bg-accent-primary text-white shadow-lg shadow-accent-primary/30 hover:scale-110'
                : 'w-10 h-10 sm:w-12 sm:h-12 rounded-full border bg-bg-tertiary border-transparent text-text-secondary group-hover:bg-accent-primary group-hover:text-white'
            "
          >
            <span
              v-if="selectedTypeData"
              class="text-[10px] font-black uppercase tracking-widest"
            >
              Ganti Paket
            </span>
            <ChevronRight v-else :size="20" />
          </div>

          <!-- Background Decor -->
          <div
            class="absolute -right-4 -bottom-4 w-32 h-32 bg-accent-primary/5 rounded-full blur-3xl group-hover:bg-accent-primary/10 transition-colors"
          ></div>
        </div>
      </div>

      <!-- Features (Trigger Card Pattern) -->
      <div
        class="mb-14 p-6 sm:p-8 bg-bg-secondary/20 border border-border-color/40 rounded-[28px]"
      >
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary"
            >
              <ZapIcon :size="20" />
            </div>
            <div>
              <h4
                class="text-[1.1rem] font-black text-text-primary tracking-tight"
              >
                Fitur Tambahan
              </h4>
              <p class="text-xs text-text-tertiary">
                Langkah 2: Tambahkan fungsi khusus
              </p>
            </div>
          </div>
        </div>

        <!-- Feature Trigger Card -->
        <div
          class="group w-full p-5 sm:p-6 border-2 rounded-[20px] cursor-pointer transition-all duration-300 flex flex-col gap-5 sm:gap-4"
          role="button"
          tabindex="0"
          aria-label="Buka Library Fitur"
          :class="
            selectedFeatures.length > 0
              ? 'bg-bg-primary border-accent-primary/30 hover:border-accent-primary/60'
              : 'bg-bg-secondary/30 border-dashed border-border-color/50 hover:bg-bg-secondary/50 hover:border-text-tertiary'
          "
          @click="openSelectionSheet('feature')"
          @keydown.enter="openSelectionSheet('feature')"
          @keydown.space.prevent="openSelectionSheet('feature')"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 min-w-0"
            >
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-bg-secondary border border-border-color flex items-center justify-center text-text-secondary group-hover:scale-110 transition-transform shrink-0"
              >
                <PlusIcon v-if="selectedFeatures.length === 0" :size="20" />
                <ListIcon v-else :size="20" />
              </div>
              <div class="flex flex-col min-w-0">
                <span
                  class="font-black text-text-primary text-[clamp(1.1rem,4vw,1.125rem)]"
                >
                  {{
                    selectedFeatures.length > 0
                      ? "Kelola Fitur"
                      : "Tambah Fitur"
                  }}
                </span>
                <span class="text-xs sm:text-xs text-text-tertiary">
                  {{ featureHintText }}
                </span>
              </div>
            </div>
            <div
              class="absolute top-6 right-6 sm:static flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-bg-tertiary border border-border-color/20 sm:border-transparent text-text-tertiary group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-colors shrink-0"
            >
              <ChevronRight :size="14" class="sm:size-16" />
            </div>
          </div>

          <!-- Selected Preview Tags -->
          <div
            v-if="selectedFeatures.length > 0"
            class="flex flex-wrap gap-2 pt-4 border-t border-border-color/50"
          >
            <span
              v-for="feat in previewFeatures"
              :key="feat.id"
              class="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-md text-[0.7rem] font-bold border border-accent-primary/10 flex items-center gap-2"
            >
              {{ feat.name }}
            </span>
            <span
              v-if="selectedFeatures.length > 3"
              class="px-2 py-1 text-text-tertiary text-[0.7rem] font-medium"
            >
              +{{ selectedFeatures.length - 3 }} lainnya
            </span>
          </div>
        </div>
      </div>

      <!-- Style & Timeline Group -->
      <div
        v-if="isStyleVisible || isTimelineVisible"
        class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
      >
        <!-- Visual Style Trigger Card -->
        <div
          v-if="isStyleVisible"
          class="group relative p-6 border-2 rounded-[28px] cursor-pointer transition-all duration-300"
          :class="
            selectedStyleData
              ? 'bg-bg-primary border-accent-primary shadow-lg shadow-accent-primary/5'
              : 'bg-bg-secondary/20 border-dashed border-border-color/50 hover:border-accent-primary/30'
          "
          @click="openSelectionSheet('style')"
        >
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary"
            >
              <PaletteIcon :size="20" />
            </div>
            <h4
              class="text-sm font-black text-text-primary tracking-tight uppercase"
            >
              3. Visual Style
            </h4>
          </div>

          <div class="flex items-center justify-between gap-4">
            <div class="flex-1 min-w-0">
              <span
                class="block font-black text-text-primary text-base mb-0.5 truncate"
              >
                {{ selectedStyleData?.name || "Pilih Mood & Style" }}
              </span>
              <span
                class="block text-[0.65rem] text-text-tertiary font-medium line-clamp-1"
              >
                {{
                  selectedStyleData?.desc || "Tentukan arah visual desain Anda"
                }}
              </span>
            </div>
            <div
              class="w-8 h-8 rounded-full bg-bg-tertiary border border-border-color/20 flex items-center justify-center text-text-tertiary group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-colors shrink-0"
            >
              <ChevronRight :size="14" />
            </div>
          </div>
        </div>

        <!-- Timeline Trigger Card -->
        <div
          v-if="isTimelineVisible"
          class="group relative p-6 border-2 rounded-[28px] cursor-pointer transition-all duration-300"
          :class="
            selectedTimelineData
              ? 'bg-bg-primary border-accent-primary shadow-lg shadow-accent-primary/5'
              : 'bg-bg-secondary/20 border-dashed border-border-color/50 hover:border-accent-primary/30'
          "
          @click="openSelectionSheet('timeline')"
        >
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary"
            >
              <ClockIcon :size="20" />
            </div>
            <h4
              class="text-sm font-black text-text-primary tracking-tight uppercase"
            >
              4. Deadline
            </h4>
          </div>

          <div class="flex items-center justify-between gap-4">
            <div class="flex-1 min-w-0">
              <span
                class="block font-black text-text-primary text-base mb-0.5 truncate"
              >
                {{ selectedTimelineData?.label || "Atur Kecepatan" }}
              </span>
              <span
                class="block text-[0.65rem] text-text-tertiary font-medium line-clamp-1"
              >
                {{
                  selectedTimelineData?.desc || "Tentukan prioritas pengerjaan"
                }}
              </span>
            </div>
            <div
              class="w-8 h-8 rounded-full bg-bg-tertiary border border-border-color/20 flex items-center justify-center text-text-tertiary group-hover:text-accent-primary group-hover:bg-accent-primary/10 transition-colors shrink-0"
            >
              <ChevronRight :size="14" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Slot -->
    <div class="hidden lg:block sticky top-24 h-fit">
      <slot name="summary"></slot>
    </div>

    <!-- Selection BottomSheet/Drawer (Improved UX) -->
    <BottomSheet
      v-model="isSheetOpen"
      :title="sheetTitle"
      :icon="sheetIcon"
      :maxWidth="sheetMaxWidth"
      full-height
    >
      <!-- Combined Desktop Header: Search + Category Tabs -->
      <div 
        class="sticky top-0 z-40 bg-bg-secondary border-b border-border-color/30 px-6 py-4"
      >
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-8">
          <!-- Search Box (Compact) -->
          <div class="flex items-center gap-2 w-full md:w-[200px] shrink-0">
            <div class="relative flex-1">
              <SearchIcon
                :size="14"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari..."
                class="w-full bg-bg-primary border-2 border-border-color rounded-xl py-2 pl-10 pr-4 text-xs font-medium text-text-primary focus:border-accent-primary outline-none transition-all placeholder:text-text-tertiary/50"
              />
            </div>
            
            <!-- Mobile-only Reset Button (Trash Icon - Inline with Search) -->
            <button
              v-if="
                ((sheetMode === 'type' && selectedType) ||
                  (sheetMode === 'feature' && selectedFeatures.length > 0))
              "
              @click="handleReset"
              class="sm:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-500/80 active:scale-90 transition-all shrink-0"
            >
              <TrashIcon :size="16" />
            </button>
          </div>

          <!-- Category Tabs (Main Area) -->
          <div
            v-if="
              sheetMode === 'type' ||
              (sheetMode === 'feature' &&
                props.selectedType === 'custom-maintenance')
            "
            class="flex-1 w-full overflow-hidden"
          >
            <div class="flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
              <button
                v-for="cat in currentCategories"
                :key="cat"
                @click.stop="activeCategory = cat"
                class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border-2 whitespace-nowrap transition-all shrink-0"
                :class="
                  activeCategory === cat
                    ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20'
                    : 'bg-bg-secondary/50 text-text-tertiary border-transparent hover:border-border-color'
                "
              >
                {{ cat }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Selection Grid (Dynamic Columns) -->
      <div class="px-6 py-6 pb-24">
        <div 
          class="grid gap-4"
          :class="sheetGridClass"
        >
          <template v-if="sheetMode === 'type'">
            <button
              v-for="type in filteredProjectTypes"
              :key="type.id"
              class="p-5 bg-bg-primary border-2 rounded-[28px] cursor-pointer flex flex-col gap-4 transition-all relative overflow-hidden group hover:border-accent-primary shadow-sm"
              :class="
                selectedType === type.id
                  ? 'border-accent-primary bg-accent-primary/5'
                  : 'border-border-color'
              "
              @click="
                $emit('update:selectedType', type.id);
                isSheetOpen = false;
              "
            >
              <div
                class="flex justify-between items-start w-full relative z-10"
              >
                <div
                  class="w-14 h-14 rounded-2xl bg-bg-secondary flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform relative"
                >
                  <component :is="getIconComponent(type.icon)" :size="28" />
                </div>
                <div
                  v-if="selectedType === type.id"
                  class="w-6 h-6 bg-accent-primary rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <CheckIcon :size="12" />
                </div>
              </div>

              <!-- Corner Ribbon Badge -->
              <div
                v-if="type.badge"
                class="absolute top-0 right-0 overflow-hidden w-24 h-24 pointer-events-none"
              >
                <div
                  class="absolute top-[12px] -right-[28px] w-[100px] rotate-45 text-[0.55rem] font-bold uppercase tracking-widest text-center py-1 shadow-sm z-20"
                  :class="
                    type.badge === 'Recommended'
                      ? 'bg-accent-primary text-white'
                      : 'bg-amber-400 text-black'
                  "
                >
                  {{ type.badge }}
                </div>
              </div>

              <div class="text-left relative z-10 mt-2">
                <span
                  class="font-black text-text-primary text-base tracking-tight block mb-1"
                  >{{ type.name }}</span
                >
                <p
                  class="text-[0.7rem] text-text-tertiary line-clamp-2 mb-3 leading-relaxed min-h-10"
                >
                  {{ type.desc }}
                </p>

                <!-- Operational Badges in Selection -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <div
                    v-if="type.maxPages"
                    class="flex items-center gap-1 bg-bg-secondary px-2 py-0.5 rounded text-[8px] font-black text-text-tertiary uppercase tracking-wider"
                  >
                    <FileTextIcon :size="10" /> {{ type.maxPages }}
                  </div>
                  <div
                    v-if="type.deliveryTime"
                    class="flex items-center gap-1 bg-bg-secondary px-2 py-0.5 rounded text-[8px] font-black text-text-tertiary uppercase tracking-wider"
                  >
                    <ClockIcon :size="10" /> {{ type.deliveryTime }}
                  </div>
                </div>

                <div class="flex flex-col items-start gap-0.5">
                  <span
                    v-if="
                      type.originalPrice && type.originalPrice > type.basePrice
                    "
                    class="text-[10px] text-text-tertiary line-through opacity-60"
                  >
                    Rp {{ formatPrice(type.originalPrice) }}
                  </span>
                  <span
                    class="text-xs font-black text-accent-primary font-mono tracking-tight uppercase"
                    >Rp {{ formatPrice(type.basePrice) }}</span
                  >
                </div>
              </div>
            </button>
          </template>

          <template v-else-if="sheetMode === 'style'">
            <button
              v-for="style in styleOptions"
              :key="style.id"
              class="bg-bg-primary border-2 rounded-[28px] cursor-pointer flex flex-col transition-all relative overflow-hidden group hover:border-accent-primary shadow-sm"
              :class="
                selectedStyle === style.id
                  ? 'border-accent-primary bg-accent-primary/5'
                  : 'border-border-color'
              "
              @click="
                $emit('update:selectedStyle', style.id);
                isSheetOpen = false;
              "
            >
              <!-- Style Preview Image -->
              <div class="w-full aspect-16/10 overflow-hidden relative">
                <img
                  :src="style.image || '/placeholder-style.jpg'"
                  :alt="style.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"
                ></div>
                <div
                  v-if="selectedStyle === style.id"
                  class="absolute top-4 right-4 w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center text-white shadow-lg z-20"
                >
                  <CheckIcon :size="16" />
                </div>
              </div>

              <div class="p-5 text-left">
                <span
                  class="font-black text-text-primary text-base tracking-tight block mb-1"
                >
                  {{ style.name }}
                </span>
                <p class="text-[0.7rem] text-text-tertiary leading-relaxed">
                  {{ style.desc }}
                </p>
              </div>
            </button>
          </template>

          <template v-else-if="sheetMode === 'timeline'">
            <button
              v-for="time in timelineOptions"
              :key="time.id"
              class="p-7 bg-bg-primary border-2 rounded-[32px] cursor-pointer flex flex-col items-center text-center transition-all relative overflow-hidden group hover:border-accent-primary shadow-sm"
              :class="
                selectedTimeline === time.id
                  ? 'border-accent-primary bg-accent-primary/5'
                  : 'border-border-color'
              "
              @click="
                $emit('update:selectedTimeline', time.id);
                isSheetOpen = false;
              "
            >
              <!-- Icon Above -->
              <div
                class="w-16 h-16 rounded-2xl bg-bg-secondary flex items-center justify-center mb-6 transition-all"
                :class="
                  selectedTimeline === time.id
                    ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20 scale-105'
                    : 'text-text-tertiary group-hover:text-accent-primary'
                "
              >
                <ZapIcon v-if="time.multiplier > 1.25" :size="32" />
                <ClockIcon v-else :size="32" />
              </div>

              <div class="flex flex-col items-center">
                <span
                  class="font-black text-text-primary text-lg tracking-tight block mb-1"
                >
                  {{ time.label }}
                </span>

                <div
                  v-if="time.multiplier > 1"
                  class="w-fit bg-accent-primary/10 text-accent-primary border border-accent-primary/20 px-3 py-1 rounded-lg text-[0.65rem] font-black tracking-widest uppercase mt-1 mb-3"
                >
                  {{ Math.round((time.multiplier - 1) * 100) }}% Lebih Cepat
                </div>

                <p
                  class="text-[0.7rem] text-text-tertiary leading-relaxed font-secondary font-medium"
                >
                  {{ time.desc }}
                </p>
              </div>

              <div class="absolute top-6 right-6">
                <div
                  class="w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all"
                  :class="
                    selectedTimeline === time.id
                      ? 'bg-accent-primary border-accent-primary text-white scale-110 shadow-lg shadow-accent-primary/20'
                      : 'bg-bg-primary border-border-color group-hover:border-accent-primary/50'
                  "
                >
                  <CheckIcon v-if="selectedTimeline === time.id" :size="12" />
                </div>
              </div>
            </button>
          </template>

          <template v-else>
            <button
              v-for="feature in filteredFeatures"
              :key="feature.id"
              class="p-5 bg-bg-primary border-2 rounded-[24px] cursor-pointer flex flex-col gap-4 transition-all group active:scale-[0.98] text-left overflow-hidden relative"
              :class="
                selectedFeatures.includes(feature.id)
                  ? 'border-accent-primary bg-accent-primary/5'
                  : 'border-border-color hover:border-accent-primary/30'
              "
              @click="$emit('toggle-feature', feature.id)"
            >
              <div
                class="flex justify-between items-start w-full relative z-10"
              >
                <div
                  class="w-10 h-10 rounded-xl transition-all shadow-inner flex items-center justify-center"
                  :class="
                    selectedFeatures.includes(feature.id)
                      ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/25'
                      : 'bg-bg-secondary text-text-tertiary'
                  "
                >
                  <CheckIcon
                    v-if="selectedFeatures.includes(feature.id)"
                    :size="20"
                  />
                  <PlusIcon v-else :size="20" />
                </div>
                <div class="flex flex-col items-end">
                  <span
                    v-if="
                      feature.originalPrice &&
                      feature.originalPrice > feature.price
                    "
                    class="text-[0.65rem] text-text-tertiary line-through opacity-60"
                  >
                    +{{ formatPrice(feature.originalPrice) }}
                  </span>
                  <span
                    class="font-mono text-[0.85rem] text-accent-primary font-black"
                    >+{{ formatPrice(feature.price) }}</span
                  >
                </div>
              </div>

              <div class="flex flex-col relative z-10">
                <span
                  class="text-sm font-black text-text-primary group-hover:text-accent-primary transition-colors block mb-1"
                  >{{ feature.name }}</span
                >
                <p
                  class="text-[0.65rem] text-text-tertiary line-clamp-2 leading-snug min-h-6"
                >
                  {{ feature.desc }}
                </p>
              </div>
            </button>
          </template>
        </div>

        <!-- Empty State -->
        <div
          v-if="
            (sheetMode === 'type' && filteredProjectTypes.length === 0) ||
            (sheetMode === 'feature' && filteredFeatures.length === 0)
          "
          class="py-20 flex flex-col items-center justify-center text-center"
        >
          <div
            class="w-16 h-16 bg-bg-secondary rounded-2xl flex items-center justify-center mb-4"
          >
            <SearchIcon :size="24" class="text-text-tertiary" />
          </div>
          <p class="text-text-secondary font-bold">Data tidak ditemukan</p>
          <button
            @click="
              searchQuery = '';
              activeCategory = 'Semua';
            "
            class="mt-4 px-6 py-2 bg-accent-primary/10 text-accent-primary text-xs font-black uppercase tracking-widest rounded-xl hover:bg-accent-primary hover:text-white transition-all"
          >
            Reset Filter
          </button>
        </div>
      </div>

      <template #footer v-if="sheetMode === 'feature'">
        <div class="py-5 px-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-bg-primary/50 border-t border-border-color/30 backdrop-blur-md">
          <!-- Reset Selection Button (Desktop Only) -->
          <button
            v-if="selectedFeatures.length > 0"
            @click="handleReset"
            class="hidden sm:flex items-center gap-2 group px-4 py-2 rounded-lg hover:bg-red-500/5 transition-all active:scale-95"
          >
            <div class="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <TrashIcon :size="14" />
            </div>
            <span class="text-[10px] font-black uppercase tracking-widest text-red-500/80 group-hover:text-red-500">
              Hapus Semua Pilihan
            </span>
          </button>
          <div v-else class="hidden sm:block"></div>

          <!-- Action Button -->
          <BaseButton
            variant="primary"
            class="w-full sm:w-fit min-w-[200px] px-8 rounded-xl py-3.5 font-black shadow-xl shadow-accent-primary/20 hover:scale-105 active:scale-95 transition-all text-[12px] uppercase tracking-wider"
            @click="isSheetOpen = false"
          >
            Selesai Memilih
          </BaseButton>
        </div>
      </template>
    </BottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  Layout as LayoutIcon,
  Zap as ZapIcon,
  Palette as PaletteIcon,
  Clock as ClockIcon,
  Check as CheckIcon,
  Plus as PlusIcon,
  ChevronRight,
  List as ListIcon,
  Search as SearchIcon,
  Trash2 as TrashIcon,
  FileText as FileTextIcon,
  RefreshCw as RefreshCwIcon,
  Globe,
  Cpu,
  Rocket,
  ShoppingCart,
  BookOpen,
  Users,
  PieChart,
  Activity,
  Workflow,
  Bot,
  FileSearch,
  TrendingUp,
} from "lucide-vue-next";
import * as LucideIcons from "lucide-vue-next";
import {
  type ProjectType,
  type Feature,
} from "../../../services/pricingService";
import { BottomSheet, BaseButton } from "@kangjessy/ui";

const props = defineProps<{
  selectedType: string;
  selectedFeatures: string[];
  selectedStyle: string;
  selectedTimeline: string;
  totalPriceWithoutMultiplier: number;
  totalBundleSavings: number;
  isMicro: boolean;
  formatPrice: (price: number) => string;
  availableFeatures: Feature[];
  projectTypes: ProjectType[];
  serviceTypes: any[];
  styles: any[];
  timelines: any[];
}>();

const emit = defineEmits([
  "update:selectedType",
  "update:selectedStyle",
  "update:selectedTimeline",
  "toggle-feature",
]);

// Use props for style selection
const styleOptions = computed(() => {
  return Array.isArray(props.styles) && props.styles.length > 0
    ? props.styles
    : [];
});

const timelineOptions = computed(() => {
  return Array.isArray(props.timelines) && props.timelines.length > 0
    ? props.timelines
    : [];
});

// --- Dynamic Modal Controls ---
const sheetItemsCount = computed(() => {
  if (sheetMode.value === 'type') return filteredProjectTypes.value.length;
  if (sheetMode.value === 'feature') return filteredFeatures.value.length;
  if (sheetMode.value === 'style') return styleOptions.value.length;
  if (sheetMode.value === 'timeline') return timelineOptions.value.length;
  return 0;
});

const sheetMaxWidth = computed(() => {
  const count = sheetItemsCount.value;
  if (count <= 2) return "2xl";
  if (count === 3) return "3xl";
  return "4xl"; // Conservative max-width to ensure margins on desktop
});

const sheetGridClass = computed(() => {
  const count = sheetItemsCount.value;
  if (count <= 1) return "grid-cols-1 max-w-sm mx-auto";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  // For style, we might want 2 columns because images are large, 
  // but let's stick to the 4-column pattern for consistency first.
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
});

const isTimelineVisible = computed(() => !props.isMicro);
const isStyleVisible = computed(() => {
  // Some micros might still need style (e.g. Speed optimization doesn't, but a small custom feature might)
  // For now, let's hide for all Micro/Maintenance to keep it lean.
  return !props.isMicro;
});

const defaultTypeDesc =
  "Klik untuk membuka katalog tipe proyek dan mulai estimasi.";
const featureHintText = computed(() =>
  props.selectedFeatures.length > 0
    ? `${props.selectedFeatures.length} fitur telah dipilih.`
    : "Belum ada fitur dipilih.",
);

const selectedTypeData = computed<ProjectType | undefined>(() => {
  if (!props.projectTypes) return undefined;
  return props.projectTypes.find((t) => t.id === props.selectedType);
});

const previewFeatures = computed<Feature[]>(() => {
  if (!props.selectedFeatures || !props.availableFeatures) return [];
  return props.selectedFeatures
    .slice(0, 3)
    .map((id) => props.availableFeatures.find((f) => f.id === id))
    .filter((f): f is Feature => !!f);
});

const isSheetOpen = ref(false);
const sheetMode = ref<"type" | "feature" | "style" | "timeline">("type");
const sheetTitle = computed(() => {
  if (sheetMode.value === "type") return "Pilih Tipe Proyek";
  if (sheetMode.value === "feature") return "Library Fitur";
  if (sheetMode.value === "style") return "Pilih Mood & Style";
  return "Atur Kecepatan Pengerjaan";
});
const sheetIcon = computed(() => {
  if (sheetMode.value === "type") return LayoutIcon;
  if (sheetMode.value === "feature") return ZapIcon;
  return ClockIcon;
});

const openSelectionSheet = (
  mode: "type" | "feature" | "style" | "timeline",
) => {
  sheetMode.value = mode;
  isSheetOpen.value = true;
};

const selectedStyleData = computed(() => {
  return styleOptions.value.find((s) => s.id === props.selectedStyle);
});

const selectedTimelineData = computed(() => {
  return timelineOptions.value.find((t) => t.id === props.selectedTimeline);
});

const searchQuery = ref("");
const activeCategory = ref("Semua");

const currentCategories = computed(() => {
  if (sheetMode.value === "type") {
    const types = props.projectTypes || [];
    const cats = new Set(types.map((t) => t.category || "Proyek Umum"));
    return ["Semua", ...Array.from(cats)];
  } else {
    // Feature mode
    const allServiceIds = new Set<string>();
    const features = props.availableFeatures || [];

    features.forEach((f) => f.relevantTo?.forEach((s) => allServiceIds.add(s)));

    // Map service internal IDs to human readable names from DB
    return [
      "Semua",
      ...Array.from(allServiceIds).map((id) => {
        const services = props.serviceTypes || [];
        const svc = services.find((s) => s.id === id);
        return svc ? svc.title : id;
      }),
    ];
  }
});

const filteredProjectTypes = computed(() => {
  let result = props.projectTypes ? [...props.projectTypes] : [];
  if (activeCategory.value !== "Semua") {
    result = result.filter((t) => t.category === activeCategory.value);
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.desc.toLowerCase().includes(query),
    );
  }

  // Sort: Custom Maintenance first, then Micro-Services, then others
  return result.sort((a, b) => {
    if (a.id === "custom-maintenance") return -1;
    if (b.id === "custom-maintenance") return 1;
    if (a.category === "Micro-Service" && b.category !== "Micro-Service")
      return -1;
    if (a.category !== "Micro-Service" && b.category === "Micro-Service")
      return 1;
    return 0;
  });
});

const filteredFeatures = computed(() => {
  let result = props.availableFeatures ? [...props.availableFeatures] : [];

  // 1. Handle Categorization (Tabs)
  if (activeCategory.value !== "Semua") {
    const services = props.serviceTypes || [];
    const targetService = services.find(
      (s) => s.title === activeCategory.value,
    );
    const targetServiceId = targetService
      ? targetService.id
      : activeCategory.value;

    if (targetServiceId) {
      result = result.filter((f) => f.relevantTo?.includes(targetServiceId));
    }
  } else {
    // 'Semua' is active.
    if (
      selectedTypeData.value?.id !== "custom-maintenance" &&
      selectedTypeData.value?.serviceId
    ) {
      result = result.filter((f) =>
        f.relevantTo?.includes(selectedTypeData.value!.serviceId),
      );
    }
  }

  // 2. Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (f) =>
        f.name.toLowerCase().includes(query) ||
        f.desc.toLowerCase().includes(query),
    );
  }
  return result;
});

watch(sheetMode, () => {
  activeCategory.value = "Semua";
  searchQuery.value = "";
});

const handleReset = () => {
  if (sheetMode.value === "type") {
    emit("update:selectedType", "");
  } else {
    props.selectedFeatures.forEach((id) => emit("toggle-feature", id));
  }
};

const getIconComponent = (name: any) => {
  if (typeof name !== "string") return name || LayoutIcon;
  const iconMap: any = {
    Zap: ZapIcon,
    Globe: Globe,
    Cpu: Cpu,
    Rocket: Rocket,
    Layout: LayoutIcon,
    ShoppingCart: ShoppingCart,
    BookOpen: BookOpen,
    Clock: ClockIcon,
    Users: Users,
    PieChart: PieChart,
    Activity: Activity,
    Workflow: Workflow,
    Bot: Bot,
    FileSearch: FileSearch,
    TrendingUp: TrendingUp,
    MessageSquare: LucideIcons.MessageSquare,
    Database: LucideIcons.Database,
    Layers: LucideIcons.Layers,
  };
  return iconMap[name] || (LucideIcons as any)[name] || LayoutIcon;
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
