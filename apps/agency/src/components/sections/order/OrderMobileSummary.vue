<template>
  <div class="lg:hidden">
    <!-- mode: floating (Only for Order Page) -->
    <template v-if="isOrderPage">
      <!-- Floating Mobile Bar -->
      <div
        class="fixed bottom-0 left-0 right-0 bg-bg-secondary/95 backdrop-blur-xl border-t border-border-color pb-safe w-full transition-all duration-300"
        :class="[
          isSheetOpen ||
          isTypeSheetOpen ||
          isFeatureSheetOpen ||
          isDiscountSheetOpen
            ? 'z-0'
            : 'z-9999',
          hasActiveSheet
            ? 'opacity-0 translate-y-full pointer-events-none'
            : 'opacity-100 translate-y-0',
        ]"
      >
        <!-- Quick Selection Pills -->
        <div
          class="px-4 pt-3 flex items-center gap-2 overflow-x-auto no-scrollbar"
        >
          <template v-if="step === 1">
            <button
              @click="isTypeSheetOpen = true"
              class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-bg-primary border border-border-color rounded-full text-[0.65rem] font-black text-text-secondary uppercase tracking-widest active:scale-95 transition-all"
            >
              <LayoutIcon :size="12" class="text-accent-primary" />
              Ganti Tipe
            </button>
            <button
              @click="isFeatureSheetOpen = true"
              class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-bg-primary border border-border-color rounded-full text-[0.65rem] font-black text-text-secondary uppercase tracking-widest active:scale-95 transition-all"
            >
              <PlusIcon :size="12" class="text-accent-primary" />
              Tambah Fitur
            </button>
          </template>
          <template v-else>
            <button
              @click="$emit('back')"
              class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-bg-primary border border-border-color rounded-full text-[0.65rem] font-black text-text-secondary uppercase tracking-widest active:scale-95 transition-all"
            >
              <ChevronLeftIcon :size="12" class="text-accent-primary" />
              Kembali Ke Konf.
            </button>
          </template>

          <button
            @click="isDiscountSheetOpen = true"
            class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-bg-primary border border-border-color rounded-full text-[0.65rem] font-black text-accent-secondary uppercase tracking-widest active:scale-95 transition-all"
            :class="
              discountCode
                ? 'bg-accent-secondary/10 border-accent-secondary/30'
                : ''
            "
          >
            <TicketIcon :size="12" class="text-accent-secondary" />
            {{ discountCode ? "Kupon Aktif" : "Pake Kupon" }}
          </button>
        </div>

        <div class="px-4 py-3 pb-4 flex items-center justify-between gap-3">
          <div class="flex flex-col cursor-pointer" @click="isSheetOpen = true">
            <span
              class="text-[0.65rem] font-bold text-text-tertiary uppercase flex items-center gap-1"
            >
              Estimasi
              <div
                v-if="discountAmount > 0"
                class="ml-1 px-1.5 py-0.5 bg-emerald-500/10 rounded text-[0.55rem] font-black text-emerald-500 flex items-center"
              >
                HEMAT
              </div>
              <ChevronUpIcon
                :size="12"
                class="text-accent-primary animate-bounce-custom"
              />
            </span>
            <div class="flex items-baseline gap-1">
              <span class="text-xs font-medium text-text-tertiary">Rp</span>
              <span
                class="text-[clamp(1rem,5vw,1.125rem)] font-black text-text-primary tracking-tight"
                :class="{
                  'text-emerald-500':
                    discountAmount > 0 || totalBundleSavings > 0,
                }"
                >{{ formatPrice(totalPrice) }}</span
              >
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="isSheetOpen = true"
              class="p-3 rounded-xl bg-bg-tertiary/50 border border-border-color text-text-secondary active:scale-95 transition-all"
            >
              <ListIcon :size="20" />
            </button>

            <!-- Quick WhatsApp (Step 2 Only) -->
            <button
              v-if="step === 2"
              @click="$emit('whatsapp')"
              class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 active:scale-95 transition-all"
            >
              <MessageCircleIcon :size="20" />
            </button>

            <button
              @click="$emit('next')"
              class="px-6 py-3 rounded-xl bg-accent-primary text-white font-bold text-sm shadow-lg shadow-accent-primary/25 active:scale-95 transition-all flex items-center gap-2"
            >
              {{ step === 1 ? "Lanjut" : "Kirim" }}
              <ArrowRightIcon v-if="step === 1" :size="16" />
              <SendIcon v-else :size="16" />
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- mode: static (For Home/Services) -->
    <div
      v-else
      class="mt-8 mx-4 p-6 bg-bg-secondary border border-border-color rounded-3xl"
    >
      <div class="flex justify-between items-center mb-6">
        <span class="text-sm font-bold text-text-secondary"
          >Estimasi Biaya</span
        >
        <span class="text-2xl font-black text-text-primary tracking-tight"
          >Rp {{ formatPrice(totalPrice) }}</span
        >
      </div>

      <BaseButton
        variant="primary"
        class="w-full justify-center py-4 rounded-xl font-bold shadow-lg shadow-accent-primary/20"
        @click="$emit('next')"
      >
        Mulai Konsultasi
        <ArrowRightIcon :size="18" class="ml-2" />
      </BaseButton>
    </div>

    <!-- 1. Ringkasan Pesanan Sheet -->
    <BottomSheet
      v-model="isSheetOpen"
      title="Ringkasan Pesanan"
      :icon="LayoutIcon"
    >
      <div class="p-6 pb-12">
        <div class="space-y-6">
          <!-- Project Type -->
          <div class="p-5 bg-bg-primary border border-border-color rounded-2xl">
            <div class="flex justify-between items-start mb-2">
              <div class="flex flex-col">
                <span
                  class="text-[0.65rem] font-black text-text-tertiary uppercase"
                  >Tipe Proyek</span
                >
                <div
                  class="font-bold text-text-primary text-base sm:text-lg mt-0.5"
                >
                  {{ currentType?.name }}
                </div>
              </div>
              <button
                @click="
                  isTypeSheetOpen = true;
                  isSheetOpen = false;
                "
                class="px-3 py-1 bg-accent-primary/10 text-accent-primary text-[0.65rem] font-black uppercase rounded-lg border border-accent-primary/20"
              >
                Ubah
              </button>
            </div>
            <div
              class="flex flex-col items-end pt-2 border-t border-border-color/50 mt-2"
            >
              <div
                v-if="
                  currentType?.originalPrice &&
                  currentType.originalPrice > currentType.basePrice
                "
                class="flex gap-2 mb-0.5"
              >
                <span
                  class="text-[0.65rem] text-text-tertiary line-through opacity-70"
                >
                  Rp {{ formatPrice(currentType.originalPrice) }}
                </span>
              </div>

              <div class="flex justify-between items-center w-full">
                <span class="text-xs text-text-tertiary">Biaya Dasar</span>
                <span class="text-sm font-mono font-bold text-text-primary">
                  Rp {{ formatPrice(currentType?.basePrice || 0) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="space-y-3">
            <div class="flex justify-between items-center px-1">
              <span
                class="text-[0.65rem] font-black text-text-tertiary uppercase"
                >Fitur Tambahan</span
              >
              <button
                @click="
                  isFeatureSheetOpen = true;
                  isSheetOpen = false;
                "
                class="text-[0.65rem] font-black text-accent-primary uppercase underline"
              >
                Tambah
              </button>
            </div>
            <div class="space-y-2">
              <div
                v-for="featId in selectedFeatures"
                :key="featId"
                class="flex justify-between items-center text-sm p-4 bg-bg-secondary border border-border-color rounded-xl gap-4"
              >
                <span class="text-text-secondary">{{
                  getFeatureName(featId)
                }}</span>
                <div class="flex items-center gap-3 shrink-0">
                  <span class="font-mono text-text-primary"
                    >+Rp {{ formatPrice(getFeaturePrice(featId)) }}</span
                  >
                  <button
                    @click="$emit('toggle-feature', featId)"
                    class="text-red-500/50"
                  >
                    <TrashIcon :size="14" />
                  </button>
                </div>
              </div>
              <div
                v-if="selectedFeatures.length === 0"
                class="text-sm text-text-tertiary italic p-4 text-center border border-dashed border-border-color rounded-xl bg-bg-secondary/30"
              >
                Belum ada fitur tambahan
              </div>
            </div>
          </div>

          <!-- Modifiers & Promo -->
          <div class="space-y-3">
            <div class="flex items-center gap-3 px-1">
              <span
                class="text-[0.65rem] font-black text-text-tertiary uppercase"
                >Modifikator & Promo</span
              >
            </div>

            <!-- Timeline -->
            <div
              v-if="timelineMultiplier > 1"
              class="p-4 bg-accent-primary/5 border border-accent-primary/10 rounded-xl flex justify-between items-center text-sm"
            >
              <div class="flex flex-col">
                <span
                  class="text-[0.6rem] font-black text-accent-primary uppercase"
                  >Urgency Fee</span
                >
                <span class="text-xs text-text-secondary font-medium">{{
                  currentTimeline?.label
                }}</span>
              </div>
              <span class="font-mono text-accent-primary font-bold text-sm"
                >+Rp
                {{
                  formatPrice(
                    totalPriceBeforeDiscount - totalPriceWithoutMultiplier,
                  )
                }}</span
              >
            </div>

            <!-- Discount Trigger (Gojek Pattern) -->
            <div class="relative group">
              <button
                @click="
                  isDiscountSheetOpen = true;
                  isSheetOpen = false;
                "
                class="w-full p-4 rounded-xl border-2 border-dashed flex items-center justify-between transition-all"
                :class="
                  discountAmount > 0
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : 'bg-bg-secondary/30 border-border-color'
                "
              >
                <div class="flex items-center gap-3 text-left">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                    :class="
                      discountAmount > 0
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-bg-primary text-text-tertiary'
                    "
                  >
                    <TicketIcon :size="18" />
                  </div>
                  <div class="flex flex-col">
                    <span
                      class="text-[0.6rem] font-black uppercase text-text-tertiary"
                      >Voucher Diskon</span
                    >
                    <span
                      class="text-xs font-bold"
                      :class="
                        discountAmount > 0
                          ? 'text-emerald-500'
                          : 'text-text-primary'
                      "
                    >
                      {{
                        discountCode
                          ? `KODE: ${discountCode}`
                          : "Klik untuk pakai promo"
                      }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span
                    v-if="discountAmount > 0"
                    class="font-mono text-emerald-500 font-bold text-sm"
                    >-Rp {{ formatPrice(discountAmount) }}</span
                  >
                  <ChevronRightIcon :size="14" class="text-text-tertiary" />
                </div>
              </button>

              <!-- Remove Button if applied -->
              <button
                v-if="discountAmount > 0"
                @click.stop="applyCoupon('')"
                class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"
              >
                <XIcon :size="12" />
              </button>
            </div>
          </div>

          <!-- Final Total back to content area -->
          <div class="pt-8 flex flex-col gap-5">
            <div class="flex flex-col gap-1.5">
              <span
                class="text-[0.65rem] font-black text-text-tertiary uppercase tracking-[0.2em]"
                >Estimasi Investasi (Rp)</span
              >
              <div class="flex items-baseline">
                <span
                  class="text-[clamp(2.25rem,10vw,2.75rem)] font-black text-text-primary tracking-tighter leading-none"
                  :class="{
                    'text-emerald-500':
                      discountAmount > 0 || totalBundleSavings > 0,
                  }"
                >
                  {{ formatPrice(totalPrice) }}
                </span>
              </div>
            </div>

            <!-- Total Savings Badge -->
            <div
              v-if="discountAmount > 0 || totalBundleSavings > 0"
              class="flex flex-col gap-2"
            >
              <div
                v-if="totalBundleSavings > 0"
                class="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 rounded-[18px] border border-accent-primary/20 w-fit"
              >
                <SparklesIcon
                  :size="12"
                  class="text-accent-primary animate-pulse"
                />
                <span
                  class="text-[0.65rem] font-black text-text-primary uppercase tracking-widest leading-none"
                >
                  Hemat Rp {{ formatPrice(totalBundleSavings) }} (Bundle)
                </span>
              </div>
              <div
                v-if="discountAmount > 0"
                class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 w-fit"
              >
                <div
                  class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                ></div>
                <span
                  class="text-[0.65rem] font-black text-emerald-500 uppercase tracking-widest leading-none"
                >
                  Hemat Rp {{ formatPrice(discountAmount) }} (Kupon)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div
          class="px-6 py-6 pb-8 bg-bg-secondary border-t border-border-color"
        >
          <div class="flex gap-3">
            <!-- WhatsApp (Step 2 Only) -->
            <button
              v-if="step === 2"
              @click="$emit('whatsapp')"
              class="shrink-0 p-4 bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-500 rounded-2xl active:scale-95 transition-all flex items-center justify-center"
            >
              <MessageCircleIcon :size="24" />
            </button>

            <button
              @click="
                $emit('next');
                isSheetOpen = false;
              "
              class="flex-1 py-4 bg-accent-primary text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 outline-none"
            >
              {{ step === 1 ? "Lanjut Booking Sesi" : "Kirim Penawaran" }}
              <ArrowRightIcon v-if="step === 1" :size="20" />
              <SendIcon v-else :size="20" />
            </button>
          </div>
        </div>
      </template>
    </BottomSheet>

    <!-- 2. Ganti Tipe Proyek Sheet -->
    <BottomSheet
      v-model="isTypeSheetOpen"
      title="Pilih Tipe Proyek"
      :icon="LayoutIcon"
      full-height
    >
      <div class="px-6 pt-6 mb-4">
        <div class="relative">
          <SearchIcon
            :size="18"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            v-model="typeSearchQuery"
            type="text"
            placeholder="Cari tipe proyek..."
            class="w-full bg-bg-primary border-2 border-border-color rounded-2xl py-3.5 pl-12 pr-4 text-base text-text-primary focus:border-accent-primary outline-none transition-all"
          />
        </div>
      </div>
      <div class="px-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pb-24">
        <button
          v-for="type in filteredTypes"
          :key="type.id"
          @click="
            $emit('select-type', type.id);
            isTypeSheetOpen = false;
          "
          class="flex flex-col gap-4 p-5 rounded-[24px] border-2 transition-all text-left active:scale-[0.98] overflow-hidden"
          :class="
            currentType?.id === type.id
              ? 'bg-accent-primary/10 border-accent-primary'
              : 'bg-bg-primary border-border-color'
          "
        >
          <div class="flex justify-between items-start w-full relative z-10">
            <div
              class="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors relative"
              :class="
                currentType?.id === type.id
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-secondary text-text-tertiary'
              "
            >
              <component :is="type.icon" :size="24" />
            </div>
            <div
              v-if="currentType?.id === type.id"
              class="w-5 h-5 bg-accent-primary rounded-full flex items-center justify-center text-white"
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
              class="absolute top-[12px] -right-[28px] w-[100px] rotate-45 text-[0.5rem] font-bold uppercase tracking-widest text-center py-1 shadow-sm z-20"
              :class="
                type.badge === 'Recommended'
                  ? 'bg-accent-primary text-white'
                  : 'bg-amber-400 text-black'
              "
            >
              {{ type.badge }}
            </div>
          </div>

          <div class="mt-2 relative z-10 min-w-0">
            <span
              class="text-[0.95rem] sm:text-[1.05rem] font-black text-text-primary block mb-1 truncate"
              :class="{ 'text-accent-primary': currentType?.id === type.id }"
              >{{ type.name }}</span
            >
            <p
              class="text-[0.65rem] sm:text-[0.7rem] text-text-tertiary leading-relaxed mb-3 line-clamp-2 min-h-[1.8rem] sm:min-h-8"
            >
              {{ type.desc }}
            </p>
            <div class="flex flex-col items-start">
              <span
                v-if="type.originalPrice && type.originalPrice > type.basePrice"
                class="text-[0.7rem] text-text-tertiary line-through opacity-70 mb-0.5"
              >
                Rp {{ formatPrice(type.originalPrice) }}
              </span>
              <span
                class="text-[0.8rem] font-mono font-black text-accent-primary"
                >Rp {{ formatPrice(type.basePrice) }}</span
              >
            </div>
          </div>
        </button>
      </div>
    </BottomSheet>

    <!-- 3. Tambah Fitur Sheet -->
    <BottomSheet
      v-model="isFeatureSheetOpen"
      title="Tambah Fitur"
      :icon="PlusIcon"
      full-height
    >
      <div class="px-6 pt-6 mb-4">
        <div class="relative">
          <SearchIcon
            :size="18"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
          <input
            v-model="featureSearchQuery"
            type="text"
            placeholder="Cari fitur tambahan..."
            class="w-full bg-bg-primary border-2 border-border-color rounded-2xl py-3.5 pl-12 pr-4 text-base text-text-primary focus:border-accent-primary outline-none transition-all"
          />
        </div>
      </div>
      <div class="px-4 pb-24">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="feat in filteredFeatures"
            :key="feat.id"
            @click="$emit('toggle-feature', feat.id)"
            class="flex flex-col gap-4 p-5 rounded-[24px] border-2 transition-all text-left active:scale-[0.98] overflow-hidden"
            :class="
              selectedFeatures.includes(feat.id)
                ? 'bg-accent-primary/10 border-accent-primary'
                : 'bg-bg-primary border-border-color'
            "
          >
            <div class="flex justify-between items-start w-full">
              <div
                class="w-10 h-10 rounded-xl transition-all shadow-inner flex items-center justify-center"
                :class="
                  selectedFeatures.includes(feat.id)
                    ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/25'
                    : 'bg-bg-secondary text-text-tertiary'
                "
              >
                <CheckIcon
                  v-if="selectedFeatures.includes(feat.id)"
                  :size="20"
                />
                <PlusIcon v-else :size="20" />
              </div>
              <div class="flex flex-col items-end">
                <span
                  v-if="feat.originalPrice && feat.originalPrice > feat.price"
                  class="text-[0.6rem] text-text-tertiary line-through opacity-70 mb-0.5"
                >
                  +{{ formatPrice(feat.originalPrice) }}
                </span>
                <span
                  class="font-mono text-[0.85rem] text-accent-primary font-black"
                  >+{{ formatPrice(feat.price) }}</span
                >
              </div>
            </div>
            <div class="min-w-0">
              <span
                class="text-sm font-black text-text-primary block mb-1 truncate"
                >{{ feat.name }}</span
              >
              <p
                class="text-[0.65rem] text-text-tertiary leading-relaxed min-h-6 line-clamp-2"
              >
                {{ feat.desc }}
              </p>
            </div>
          </button>
        </div>
      </div>
      <template #footer>
        <div class="p-6">
          <button
            @click="
              isFeatureSheetOpen = false;
              isSheetOpen = true;
            "
            class="w-full py-4 bg-accent-primary text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all"
          >
            Selesai Memilih
          </button>
        </div>
      </template>
    </BottomSheet>

    <!-- 4. Diskon Sheet -->
    <BottomSheet
      v-model="isDiscountSheetOpen"
      title="Pake Kupon Diskon"
      :icon="TicketIcon"
    >
      <div class="p-6 pb-12 space-y-10">
        <!-- Manual Input -->
        <div class="space-y-4">
          <label
            class="text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1"
            >Punya kode promo sendiri?</label
          >
          <div class="flex gap-2">
            <input
              v-model="couponInput"
              type="text"
              placeholder="MASUKKAN KODE"
              class="flex-1 bg-bg-primary border-2 border-border-color rounded-xl py-3 px-4 text-sm text-text-primary outline-none focus:border-accent-primary transition-all uppercase font-mono font-bold shadow-inner"
            />
            <button
              @click="applyCoupon(couponInput)"
              class="px-6 py-3 bg-accent-primary text-white text-sm font-black rounded-xl active:scale-95 transition-all shadow-lg shadow-accent-primary/20"
            >
              Pake
            </button>
          </div>
        </div>

        <!-- Gojek Style List -->
        <div class="space-y-6">
          <h5
            class="text-[0.7rem] font-black uppercase tracking-widest text-text-tertiary px-1"
          >
            Promo Tersedia
          </h5>
          <div class="grid grid-cols-1 gap-5">
            <div
              v-for="coupon in coupons"
              :key="coupon.code"
              class="flex flex-col border-2 rounded-[28px] transition-all relative overflow-hidden"
              :class="
                discountCode?.toUpperCase() === coupon.code.toUpperCase()
                  ? 'bg-emerald-500/5 border-emerald-500'
                  : 'bg-bg-primary border-border-color'
              "
            >
              <!-- Header -->
              <div class="p-5 flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center text-accent-secondary"
                >
                  <TicketIcon :size="24" />
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-0.5">
                    <span
                      class="font-mono font-black text-sm text-text-primary"
                      >{{ coupon.code }}</span
                    >
                    <span
                      class="text-[0.6rem] font-black text-text-tertiary uppercase"
                      >{{ coupon.expiryDate }}</span
                    >
                  </div>
                  <h5 class="text-[0.85rem] font-black text-text-primary">
                    {{ coupon.label }}
                  </h5>
                </div>
              </div>

              <!-- Body -->
              <div
                class="px-5 pb-5 pt-4 border-t border-dashed border-border-color/50 bg-bg-secondary/30 text-left"
              >
                <p
                  class="text-[0.65rem] text-text-tertiary leading-relaxed mb-4"
                >
                  {{ coupon.desc }}
                </p>

                <div class="flex items-center justify-between">
                  <div class="flex flex-col">
                    <span
                      class="text-[0.55rem] font-black uppercase text-accent-secondary tracking-widest leading-none mb-1"
                      >Syarat & Ketentuan</span
                    >
                    <span
                      class="text-[0.6rem] text-text-secondary font-medium"
                      >{{ coupon.terms }}</span
                    >
                  </div>

                  <button
                    v-if="
                      discountCode?.toUpperCase() !== coupon.code.toUpperCase()
                    "
                    @click="applyCoupon(coupon.code)"
                    class="px-5 py-2 bg-accent-primary text-white text-[0.7rem] font-black rounded-lg active:scale-95 transition-all"
                  >
                    Pake
                  </button>
                  <div
                    v-else
                    class="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-[0.7rem] font-black"
                  >
                    <CheckIcon :size="12" />
                    Terpakai
                  </div>
                </div>
              </div>

              <!-- Notch -->
              <div
                class="absolute -left-3 top-[65px] -translate-y-1/2 w-5 h-5 bg-bg-secondary rounded-full border border-border-color/20"
              ></div>
              <div
                class="absolute -right-3 top-[65px] -translate-y-1/2 w-5 h-5 bg-bg-secondary rounded-full border border-border-color/20"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="p-6">
          <button
            @click="
              isDiscountSheetOpen = false;
              isSheetOpen = true;
            "
            class="w-full py-4 bg-bg-tertiary border border-border-color text-text-secondary font-black rounded-2xl active:scale-95 transition-all"
          >
            Tutup & Kembali
          </button>
        </div>
      </template>
    </BottomSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  Layout as LayoutIcon,
  ArrowRight as ArrowRightIcon,
  List as ListIcon,
  ChevronUp as ChevronUpIcon,
  ChevronRight as ChevronRightIcon,
  Plus as PlusIcon,
  Check as CheckIcon,
  Trash2 as TrashIcon,
  Ticket as TicketIcon,
  Search as SearchIcon,
  X as XIcon,
  ChevronLeft as ChevronLeftIcon,
  Send as SendIcon,
  MessageCircle as MessageCircleIcon,
  Sparkles as SparklesIcon,
} from "lucide-vue-next";
import { BottomSheet, BaseButton, activeSheet } from "@kangjessy/ui";
import { projectTypes } from "../../../data/config/orderConfig";
import type { Coupon } from "@kangjessy/config";
import type { Feature } from "../../../services/featureService";

const props = defineProps<{
  currentType: any;
  selectedFeatures: string[];
  currentTimeline: any;
  timelineMultiplier: number;
  totalPrice: number;
  totalPriceBeforeDiscount: number;
  totalPriceWithoutMultiplier: number;
  totalBundleSavings: number;
  discountCode: string;
  activeCoupon: any;
  discountAmount: number;
  coupons: Coupon[];
  getFeatureName: (id: string) => string;
  getFeaturePrice: (id: string) => number;
  formatPrice: (price: number) => string;
  step?: number;
  availableFeatures: Feature[];
}>();

const emit = defineEmits([
  "next",
  "select-type",
  "toggle-feature",
  "apply-discount",
  "back",
  "whatsapp",
]);

const route = useRoute();
const isOrderPage = computed(() => route.name === "order");

const isSheetOpen = ref(false);
const isTypeSheetOpen = ref(false);
const isFeatureSheetOpen = ref(false);
const isDiscountSheetOpen = ref(false);

const couponInput = ref("");
const typeSearchQuery = ref("");
const featureSearchQuery = ref("");

const applyCoupon = (code: string) => {
  emit("apply-discount", code);
  couponInput.value = code;
  // Auto-close after application
  if (code) {
    setTimeout(() => {
      isDiscountSheetOpen.value = false;
      isSheetOpen.value = true;
    }, 400);
  }
};

const filteredTypes = computed(() => {
  if (!typeSearchQuery.value) return projectTypes;
  const query = typeSearchQuery.value.toLowerCase();
  return projectTypes.filter(
    (t) =>
      t.name.toLowerCase().includes(query) ||
      t.desc.toLowerCase().includes(query),
  );
});

const filteredFeatures = computed(() => {
  const relevant = props.availableFeatures.filter((f) =>
    f.relevantTo.includes(props.currentType?.serviceId),
  );
  if (!featureSearchQuery.value) return relevant;
  const query = featureSearchQuery.value.toLowerCase();
  return relevant.filter(
    (f) =>
      f.name.toLowerCase().includes(query) ||
      f.desc.toLowerCase().includes(query),
  );
});

const hasActiveSheet = computed(() => activeSheet.value !== null);
</script>

<style scoped>
@keyframes bounce-custom {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}

.animate-bounce-custom {
  animation: bounce-custom 2s infinite;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
