<template>
  <section class="py-24 md:py-32" id="pricing">
    <div class="container relative z-10">
      <SectionHeader 
        badge="Solusi Digital Untuk Bisnis Anda" 
        title="Pilih Paket Investasi Untuk Pondasi Digital Bisnis Anda" 
        subtitle="Mulai dari website yang memikat hingga sistem automasi yang efisien, kami punya solusi yang tepat untuk kebutuhan bisnis Anda."
        align="center"
      />

      <!-- Category Tabs -->
      <div class="flex justify-center mt-12 mb-16">
        <div class="inline-flex p-1.5 bg-white/3 border border-border-color rounded-2xl backdrop-blur-md">
          <button 
            v-for="tab in categories" 
            :key="tab.id"
            @click="activeCategory = tab.id"
            class="px-8 py-3 rounded-xl transition-all duration-300 font-semibold text-[0.95rem] relative"
            :class="activeCategory === tab.id ? 'bg-accent-primary text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)]' : 'text-text-secondary hover:text-text-primary'"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Frequency Toggle (only for Maintenance) -->
      <div v-if="activeCategory === 'maintenance'" class="flex justify-center mb-16 animate-in fade-in slide-in-from-top-4 duration-500">
        <div class="inline-flex p-1 bg-white/2 border border-border-color/50 rounded-full">
          <button 
            v-for="freq in frequencies" 
            :key="freq.id"
            @click="activeFrequency = freq.id"
            class="px-6 py-2 rounded-full text-sm font-medium transition-all"
            :class="activeFrequency === freq.id ? 'bg-white/10 text-white' : 'text-text-secondary hover:text-text-primary'"
          >
            {{ freq.name }}
          </button>
        </div>
      </div>

      <!-- Mobile Controls (Development) -->
      <div v-if="activeCategory === 'development'" class="md:hidden flex justify-end gap-2.5 mb-4 px-4">
        <button
          @click="scrollSliderDev('prev')"
          aria-label="Previous plan"
          class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors"
        >
          <ChevronLeftIcon :size="20" />
        </button>
        <button
          @click="scrollSliderDev('next')"
          aria-label="Next plan"
          class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors"
        >
          <ChevronRightIcon :size="20" />
        </button>
      </div>

      <!-- Development Plans Grid -->
      <div v-if="activeCategory === 'development'" ref="devSliderRef" @scroll="handleScrollDev" class="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 animate-in fade-in zoom-in-95 duration-700 pt-16 pb-16 -mt-12 md:-mt-16 -mb-12 md:-mb-16 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        <div 
          v-for="plan in developmentPlans" 
          :key="plan.id"
          class="relative group shrink-0 w-[85vw] md:w-auto snap-center hover:z-50"
        >
          <div 
            class="h-full rounded-[32px] p-8 flex flex-col transition-all duration-500 backdrop-blur-xl group-hover:-translate-y-2 relative"
            :class="plan.isPopular 
              ? 'bg-gradient-to-b from-accent-primary/8 to-transparent border border-accent-primary shadow-[0_0_40px_rgba(59,130,246,0.2)]' 
              : 'bg-white/3 border border-border-color hover:bg-white/5 hover:border-accent-primary/50'"
          >
            <!-- Plan Header -->
            <div class="mb-8 relative z-10">
              <span 
                v-if="plan.badge" 
                class="px-4 py-1.5 text-[0.75rem] font-bold rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm"
                :class="plan.isPopular ? 'bg-accent-primary text-white' : 'bg-accent-primary/10 text-accent-primary'"
              >
                {{ plan.badge }}
              </span>
              <h3 class="text-2xl font-bold text-text-primary mb-3">{{ plan.name }}</h3>
              <p class="text-[0.9rem] text-text-secondary leading-relaxed min-h-[48px]">{{ plan.description }}</p>
            </div>

            <!-- Pricing -->
            <div class="mb-8">
              <div class="flex items-baseline gap-2">
                <span class="text-text-secondary text-lg font-medium">Rp</span>
                <span class="text-4xl font-extrabold text-text-primary tracking-tight">{{ plan.price }}</span>
              </div>
            </div>

            <!-- Metadata (Estimate & Revisions) -->
            <div class="grid grid-cols-2 gap-2 mb-8 py-5 border-y border-white/5">
              <div class="flex flex-col items-center text-center gap-1.5 border-r border-white/5">
                <Clock :size="16" class="text-accent-primary opacity-80" />
                <span class="text-[0.65rem] text-text-tertiary uppercase font-black tracking-widest">Estimasi</span>
                <span class="text-[0.8rem] text-text-primary font-bold">{{ plan.estimate }}</span>
              </div>
              <div class="flex flex-col items-center text-center gap-1.5">
                <RefreshCw :size="16" class="text-accent-primary opacity-80" />
                <span class="text-[0.65rem] text-text-tertiary uppercase font-black tracking-widest">Revisi</span>
                <span class="text-[0.8rem] text-text-primary font-bold">{{ plan.revisions }}</span>
              </div>
            </div>

            <!-- Features List (Grouped) -->
            <div class="grow space-y-7 mb-10">
               <div v-for="group in plan.featureGroups" :key="group.name" class="space-y-3.5">
                  <h4 class="text-[0.7rem] font-black text-text-tertiary uppercase tracking-[0.2em] flex items-center gap-2.5">
                    <span class="w-5 h-px bg-accent-primary/30"></span>
                    {{ group.name }}
                  </h4>
                  <ul class="space-y-3 px-1">
                    <li v-for="feature in group.items" :key="feature.text" class="flex items-start gap-3 group/item" :class="feature.included ? '' : 'opacity-25 grayscale select-none'">
                       <div class="shrink-0 mt-0.5">
                          <CheckCircle v-if="feature.included" :size="16" class="text-accent-primary group-hover/item:scale-110 transition-transform" />
                          <XCircle v-else :size="16" class="text-text-tertiary shrink-0" />
                       </div>
                       <div class="flex items-center gap-1.5 flex-wrap">
                           <span class="text-[0.9rem] leading-tight font-medium" :class="feature.isPopular ? 'text-accent-primary font-bold' : (feature.included ? 'text-text-primary' : 'text-text-tertiary')">
                             {{ feature.text }}
                           </span>
                           <div v-if="feature.tooltip" class="relative inline-flex items-center group/tooltip w-4 h-4 cursor-help text-text-tertiary hover:text-accent-primary transition-colors">
                             <Info :size="12" @click="openMobileTooltip(feature.text, feature.tooltip)" />
                             <!-- Desktop Tooltip -->
                             <div class="hidden md:block absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 p-3 rounded-xl bg-[#0f1117] border border-border-color shadow-xl text-[0.7rem] text-text-secondary font-medium leading-relaxed opacity-0 invisible pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 min-w-[200px]">
                               {{ feature.tooltip }}
                               <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0f1117] border-b border-r border-border-color rotate-45"></div>
                             </div>
                           </div>
                        </div>
                    </li>
                  </ul>
               </div>
            </div>

            <!-- Target User Note -->
            <div class="mb-8 p-5 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group/note">
               <div class="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover/note:opacity-100 transition-opacity"></div>
               <p class="text-[0.85rem] text-text-secondary leading-relaxed relative z-10">
                  <span class="text-text-primary font-black uppercase text-[0.7rem] tracking-widest block mb-1.5 opacity-60">Cocok untuk:</span>
                  {{ plan.suitableFor }}
               </p>
            </div>

            <!-- CTA -->
            <BaseButton 
              :variant="plan.isPopular ? 'primary' : 'secondary'" 
              size="lg" 
              class="w-full justify-center group-hover:scale-[1.02] transition-all py-6! text-[1rem] shadow-xl"
              :class="plan.isPopular ? 'shadow-accent-primary/20' : ''"
              @click="handleOrder(plan.id)"
            >
              {{ plan.ctaText }}
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Mobile Indicator for Development -->
      <div v-if="activeCategory === 'development'" class="md:hidden flex justify-center gap-2 -mt-4 mb-12 relative z-20">
        <span
          v-for="(_, i) in developmentPlans"
          :key="i"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="devSlide === i ? 'w-6 bg-accent-primary' : 'w-2 bg-border-color'"
        ></span>
      </div>

      <!-- Divider / Transition to Custom -->
      <div v-if="activeCategory === 'development'" class="mt-24 mb-12 text-center animate-in fade-in duration-700">
        <div class="inline-flex items-center gap-4 mb-4">
          <div class="w-12 h-px bg-linear-to-r from-transparent to-accent-primary/30"></div>
          <span class="text-[0.7rem] font-black text-accent-primary uppercase tracking-[0.3em]">Limitless Possible</span>
          <div class="w-12 h-px bg-linear-to-l from-transparent to-accent-primary/30"></div>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Butuh Yang Benar-benar Spesifik?</h3>
        <p class="text-text-secondary mt-3 max-w-xl mx-auto text-sm leading-relaxed">
          Jika bisnismu membutuhkan logika yang tidak biasa atau skala yang melampaui standar, kami siap mewujudkan ekosistem kustom tanpa batas.
        </p>
      </div>

      <!-- Solusi Custom Card (Full Width) -->
      <div v-if="activeCategory === 'development'" class="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div class="relative group">
          <!-- Ambient Glow -->
          <div class="absolute -inset-4 bg-linear-to-r from-accent-primary/5 to-accent-secondary/5 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div class="relative bg-white/3 border border-border-color rounded-[40px] p-8 md:p-12 backdrop-blur-xl overflow-hidden flex flex-col lg:flex-row gap-12 lg:gap-20">
            <!-- Left Side: Pricing & Info -->
            <div class="flex-1 space-y-8">
              <div>
                <span class="inline-block px-4 py-1.5 bg-accent-primary/10 text-accent-primary text-[0.7rem] font-black uppercase tracking-widest rounded-full mb-6">Fully Custom</span>
                <h2 class="text-4xl md:text-5xl font-black text-text-primary tracking-tight mb-6">Solusi Custom</h2>
                <p class="text-text-secondary text-lg leading-relaxed max-w-xl">
                  Kebutuhan bisnis kamu tidak cocok dengan paket manapun? Kita bangun dari nol — sesuai alur kerja, skala, dan visi bisnis kamu. Tidak ada template, tidak ada kompromi.
                </p>
              </div>

              <div class="pt-8 border-y border-white/5 py-8">
                <span class="text-text-tertiary text-[0.7rem] font-black uppercase tracking-widest mb-3 block">Investasi</span>
                <div class="flex items-baseline gap-3 mb-2">
                  <span class="text-text-primary text-3xl md:text-4xl font-extrabold tracking-tight">Mulai Rp 10.000.000</span>
                </div>
                <p class="text-sm text-text-secondary opacity-70 italic max-w-md">
                  Harga final ditentukan setelah diskusi kebutuhan — tidak ada biaya tersembunyi, semua disepakati di awal.
                </p>

                <!-- Feature Tags Inline -->
                <div class="flex flex-wrap gap-4 mt-8">
                  <div class="flex items-center gap-2 group/tag cursor-default">
                    <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-accent-primary border border-white/10 group-hover/tag:bg-accent-primary group-hover/tag:text-white transition-all">
                      <Clock :size="14" />
                    </div>
                    <span class="text-xs font-bold text-text-secondary group-hover/tag:text-text-primary transition-colors">Estimasi via diskusi</span>
                  </div>
                  <div class="flex items-center gap-2 group/tag cursor-default">
                    <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-accent-primary border border-white/10 group-hover/tag:bg-accent-primary group-hover/tag:text-white transition-all">
                      <RefreshCw :size="14" />
                    </div>
                    <span class="text-xs font-bold text-text-secondary group-hover/tag:text-text-primary transition-colors">Revisi fleksibel</span>
                  </div>
                  <div class="flex items-center gap-2 group/tag cursor-default">
                    <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-accent-primary border border-white/10 group-hover/tag:bg-accent-primary group-hover/tag:text-white transition-all">
                      <FileText :size="14" />
                    </div>
                    <span class="text-xs font-bold text-text-secondary group-hover/tag:text-text-primary transition-colors">Dokumentasi lengkap</span>
                  </div>
                </div>
              </div>

              <!-- CTAs Redesigned -->
              <div class="flex flex-col sm:flex-row gap-5 pt-4">
                <button 
                  @click="handleCustomOrder"
                  class="group relative flex items-center justify-center gap-3 px-8 py-5 bg-linear-to-r from-accent-primary to-accent-secondary rounded-2xl text-white font-bold text-base tracking-wide shadow-2xl shadow-accent-primary/30 active:scale-95 transition-all overflow-hidden"
                >
                  <span class="relative z-10">Konsultasi Gratis</span>
                  <MessageCircle :size="20" class="relative z-10 group-hover:rotate-12 transition-transform" />
                  <!-- Shine Effect -->
                  <div class="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                
                <a 
                  href="#projects"
                  class="flex items-center justify-center gap-3 px-8 py-5 border border-white/10 hover:border-accent-primary/40 bg-white/5 hover:bg-white/10 rounded-2xl text-text-primary font-bold text-base tracking-wide active:scale-90 transition-all group/btn"
                >
                  <span>Lihat Projek</span>
                  <ArrowRight :size="20" class="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <!-- Right Side: Capability & Process -->
            <div class="flex-1 space-y-12">
              <!-- What can be built -->
              <div class="space-y-6">
                <h4 class="text-[0.7rem] font-black text-text-tertiary uppercase tracking-[0.2em] flex items-center gap-3">
                  <span class="w-8 h-px bg-accent-primary/30"></span>
                  Apa Yang Bisa Dibangun
                </h4>
                <div class="space-y-5">
                  <ul class="space-y-3.5">
                    <li v-for="(item, index) in builtItems" :key="item.text" 
                      v-show="isAllCapabilitiesOpen || index < 5"
                      class="flex items-center gap-3.5 cursor-default group"
                    >
                      <div class="w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0 opacity-60"></div>
                      <span class="text-[1rem] md:text-[1.05rem] text-text-primary font-medium leading-tight">{{ item.text }}</span>
                    </li>
                  </ul>

                  <!-- Expand/Collapse Button -->
                  <button 
                    @click="isAllCapabilitiesOpen = !isAllCapabilitiesOpen"
                    class="group/toggle flex items-center gap-2 text-text-tertiary hover:text-accent-primary transition-all pt-2"
                  >
                    <span class="text-xs font-bold tracking-wider uppercase border-b border-transparent group-hover/toggle:border-accent-primary/30 pb-0.5">
                      {{ isAllCapabilitiesOpen ? 'Sembunyikan' : 'Lihat Selengkapnya' }}
                    </span>
                    <ChevronDown v-if="!isAllCapabilitiesOpen" :size="14" class="group-hover/toggle:translate-y-0.5 transition-transform" />
                    <ChevronUp v-else :size="14" class="group-hover/toggle:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              <!-- Process -->
              <div class="space-y-6">
                <h4 class="text-[0.7rem] font-black text-text-tertiary uppercase tracking-[0.2em] flex items-center gap-3">
                  <span class="w-8 h-px bg-accent-primary/30"></span>
                  Proses Kerja
                </h4>
                <div class="space-y-6 border-l border-white/5 pl-4 ml-2">
                  <div v-for="(process, i) in [
                    { title: 'Diskusi kebutuhan', desc: 'Kamu ceritakan bisnis, masalah, dan tujuannya — via WhatsApp atau video call, gratis.' },
                    { title: 'Analisis & penawaran', desc: 'Saya breakdown kebutuhan teknis dan kirim estimasi biaya + timeline yang jelas.' },
                    { title: 'Sepakat & mulai', desc: 'Semua disepakati di awal — scope, harga, timeline — baru pengerjaan dimulai.' },
                    { title: 'Serah terima + dokumentasi', desc: 'Sistem diserahkan lengkap dengan dokumentasi teknis dan panduan penggunaan.' }
                  ]" :key="process.title" class="relative">
                    <div class="absolute -left-[25px] top-1.5 w-4 h-4 rounded-full bg-accent-primary border-4 border-bg-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                    <h5 class="text-[0.95rem] font-black text-text-primary mb-1">{{ i+1 }}. {{ process.title }}</h5>
                    <p class="text-xs text-text-secondary leading-relaxed opacity-70">{{ process.desc }}</p>
                  </div>
                </div>
              </div>

              <!-- Consultation Note -->
              <div class="p-6 rounded-3xl bg-accent-primary/5 border border-accent-primary/10 relative overflow-hidden group/note">
                <div class="absolute top-0 right-0 p-3 opacity-10 group-hover/note:rotate-12 transition-transform">
                  <MessageSquare :size="40" class="text-accent-primary" />
                </div>
                <p class="text-[0.85rem] text-text-secondary leading-relaxed italic relative z-10">
                  <span class="text-text-primary font-bold">Konsultasi awal gratis.</span> Tidak ada kewajiban lanjut — kamu bebas memutuskan setelah tahu estimasi biaya dan pendekatannya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategy Note (Development) -->
      <div v-if="activeCategory === 'development'" class="max-w-3xl mx-auto mt-10 md:mt-16 mb-4 p-5 md:p-6 rounded-[24px] bg-accent-primary/5 border border-accent-primary/10 flex items-start gap-4 animate-in fade-in duration-500">
        <div class="mt-0.5 w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
          <Info :size="16" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-text-primary mb-1">Catatan Penting</h4>
          <p class="text-[0.85rem] text-text-secondary leading-relaxed">
            Paket di atas tidak ditentukan dari <strong>jenis website</strong> (Toko Online, Profil Bisnis, dll), melainkan murni dari <strong>skala pendataan dan kompleksitas teknisnya</strong>. Segala jenis website bisa dimulai dari <span class="text-text-primary font-semibold">Starter</span>. Masih ragu menentukan skala? <a href="#" @click.prevent="openConsultation" class="text-accent-primary font-semibold hover:underline">Mari diskusikan gratis!</a>
          </p>
        </div>
      </div>

      <!-- Mobile Controls (Maintenance) -->
      <div v-else-if="activeCategory === 'maintenance'" class="md:hidden flex justify-end gap-2.5 mb-4 px-4">
        <button
          @click="scrollSliderMaint('prev')"
          aria-label="Previous plan"
          class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors"
        >
          <ChevronLeftIcon :size="20" />
        </button>
        <button
          @click="scrollSliderMaint('next')"
          aria-label="Next plan"
          class="w-9 h-9 rounded-full border border-border-color bg-bg-secondary text-text-primary flex items-center justify-center cursor-pointer hover:bg-bg-tertiary transition-colors"
        >
          <ChevronRightIcon :size="20" />
        </button>
      </div>

      <!-- Maintenance Plans Grid -->
      <div v-if="activeCategory === 'maintenance'" ref="maintSliderRef" @scroll="handleScrollMaint" class="flex md:grid md:grid-cols-2 max-w-5xl md:mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 animate-in fade-in zoom-in-95 duration-700 pt-16 pb-16 -mt-12 md:-mt-16 -mb-12 md:-mb-16 -mx-4 px-4 md:px-0 no-scrollbar">
        <div 
          v-for="plan in maintenancePlans" 
          :key="plan.id"
          class="bg-white/3 border border-border-color rounded-[32px] p-8 flex flex-col hover:bg-white/5 transition-all duration-500 backdrop-blur-xl group hover:border-accent-secondary/50 shrink-0 w-[85vw] md:w-auto snap-center"
        >
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-text-primary mb-3">{{ plan.name }}</h3>
            <p class="text-[0.9rem] text-text-secondary leading-relaxed min-h-[48px]">{{ plan.description }}</p>
          </div>

          <!-- Price Display based on frequency -->
          <div class="mb-8">
            <div class="flex items-baseline gap-2">
              <span class="text-text-secondary text-lg font-medium">Rp</span>
              <span class="text-4xl font-extrabold text-text-primary tracking-tight transition-all duration-300">
                {{ getMaintenancePrice(plan) }}
              </span>
              <span class="text-sm text-text-secondary">/ {{ activeFrequency }}</span>
            </div>
          </div>

          <ul class="flex-grow space-y-4 mb-10">
            <li v-for="feat in plan.features" :key="feat" class="flex items-center gap-3">
              <div class="shrink-0">
                <ShieldCheck :size="18" class="text-accent-secondary" />
              </div>
              <span class="text-[0.9rem] text-text-primary leading-tight">{{ feat }}</span>
            </li>
          </ul>

          <BaseButton 
            variant="secondary" 
            size="lg" 
            class="w-full justify-center hover:bg-accent-secondary hover:text-white transition-all"
            @click="handleOrder(plan.id)"
          >
            {{ plan.ctaText }}
          </BaseButton>
        </div>
      </div>

      <!-- Mobile Indicator for Maintenance -->
      <div v-if="activeCategory === 'maintenance'" class="md:hidden flex justify-center gap-2 mt-4 relative z-20">
        <span
          v-for="(_, i) in maintenancePlans"
          :key="i"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="maintSlide === i ? 'w-6 bg-accent-primary' : 'w-2 bg-border-color'"
        ></span>
      </div>

      <!-- Strategy Note (Maintenance) -->
      <div v-if="activeCategory === 'maintenance'" class="max-w-3xl mx-auto mt-10 md:mt-16 mb-4 p-5 md:p-6 rounded-[24px] bg-accent-secondary/5 border border-accent-secondary/10 flex items-start gap-4 animate-in fade-in duration-500">
        <div class="mt-0.5 w-8 h-8 rounded-full bg-accent-secondary/10 flex items-center justify-center text-accent-secondary shrink-0">
          <Info :size="16" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-text-primary mb-1">Penting Diketahui</h4>
          <p class="text-[0.85rem] text-text-secondary leading-relaxed">
            Setiap paket maintenance mencakup layanan secara menyeluruh — tidak dipisah per fitur — agar penanganannya lebih efektif dan terstruktur. Sebelum servis dimulai, saya akan melakukan pengecekan awal gratis untuk memahami kondisi website Anda dan memastikan layanan yang tepat. Punya pertanyaan atau kendala mendesak? <a href="#" @click.prevent="openConsultation" class="text-accent-secondary font-semibold hover:underline border-b border-accent-secondary/30">Mari kita bicarakan!</a>
          </p>
        </div>
      </div>

      <!-- Add-on Extras Grid -->
      <div class="mt-24">
        <div class="flex items-center gap-4 mb-12">
          <div class="h-px bg-linear-to-r from-accent-primary/50 to-transparent flex-grow"></div>
          <h3 class="text-xl font-bold text-text-primary uppercase tracking-widest px-4 text-center">Individual Services & Add-ons</h3>
          <div class="h-px bg-linear-to-l from-accent-primary/50 to-transparent flex-grow"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div v-for="cat in addonServices" :key="cat.category" class="space-y-6">
            <h4 class="text-accent-primary font-bold text-lg border-b border-border-color pb-3 mb-6">{{ cat.category }}</h4>
            
            <div 
              v-for="item in cat.items" 
              :key="item.name"
              @click="handleAddonOrder(item, cat.category)"
              class="flex justify-between items-start gap-4 p-4 rounded-2xl hover:bg-white/3 transition-all group border border-transparent hover:border-border-color/50 cursor-pointer"
            >
              <div class="grow">
                <h5 class="text-text-primary font-semibold group-hover:text-accent-primary transition-colors">{{ item.name }}</h5>
                <p class="text-[0.85rem] text-text-secondary mt-1">{{ item.desc }}</p>
              </div>
              <div class="text-right shrink-0">
                <div class="flex items-center justify-end">
                  <span class="text-text-primary font-bold text-[1rem]">Rp {{ item.price }}</span>
                </div>
                <button class="block w-full text-[0.7rem] text-accent-primary mt-2 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                   + Add Service
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Addon Note -->
        <div class="max-w-3xl mx-auto mt-12 text-center px-4">
          <p class="text-[0.85rem] text-text-secondary italic opacity-80">
            *Perlu diketahui: Setiap penambahan fitur akan dicek dulu kesesuaiannya dengan sistem website kamu — tanpa biaya tambahan untuk evaluasi awal. Harga berlaku untuk website baru atau yang dibangun oleh KangJessy. Untuk website pihak lain, estimasi diberikan setelah evaluasi singkat. 
          </p>
        </div>


      </div>
    </div>

    <!-- Mobile Tooltip BottomSheet -->
    <BottomSheet v-model="isMobileTooltipOpen" :title="mobileTooltipTitle" :showClose="true">
      <div class="px-6 py-8 text-text-secondary leading-relaxed text-sm">
        {{ mobileTooltipText }}
      </div>
    </BottomSheet>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import SectionHeader from '../ui/SectionHeader.vue';
import { BaseButton, BottomSheet } from "@kangjessy/ui";
import { 
  developmentPlans, 
  maintenancePlans, 
  addonServices,
  type MaintenancePlan 
} from '../../data/landing/pricing';
import { 
  CheckCircle, 
  XCircle, 
  ShieldCheck,
  Info,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Clock,
  RefreshCw,
  FileText,
  MessageSquare,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-vue-next';

import { usePopupManager, Popups } from '../../composables/usePopupManager';
import { useWhatsApp } from '../../composables/useWhatsApp';

const popup = usePopupManager();
const { openDirectChat } = useWhatsApp();

const isAllCapabilitiesOpen = ref(false);

const isMobileTooltipOpen = ref(false);
const mobileTooltipTitle = ref('');
const mobileTooltipText = ref('');

const openMobileTooltip = (title: string, text: string) => {
  if (window.innerWidth < 768) {
    mobileTooltipTitle.value = title;
    mobileTooltipText.value = text;
    isMobileTooltipOpen.value = true;
  }
};

const builtItems = [
  { text: 'E-Commerce Multi-Vendor', tooltip: 'Platform jual-beli kompleks dengan sistem komisi, manajemen toko mandiri untuk banyak penjual, dan sistem pengiriman otomatis.' },
  { text: 'Custom CRM / ERP System', tooltip: 'Dashboard manajemen operasional internal yang disesuaikan dengan alur kerja tim Anda, dari manajemen stok hingga laporan keuangan otomatis.' },
  { text: 'Sistem Reservasi & Booking', tooltip: 'Alur penjadwalan real-time untuk hotel, klinik, atau jasa profesional dengan integrasi pembayaran dan pengingat otomatis via email/WA.' },
  { text: 'Platform SaaS Application', tooltip: 'Membangun produk digital berbasis langganan dengan manajemen akun pengguna, pembatasan fitur, dan sistem pembayaran recurring.' },
  { text: 'Automasi & Integrasi Enterprise', tooltip: 'Menghubungkan berbagai software (accounting, CRM, marketing) dalam satu dashboard pusat untuk efisiensi bisnis mutlak.' },
  { text: 'Learning Management System', tooltip: 'Portal edukasi online dengan manajemen kursus, kuis interaktif, sertifikasi otomatis, dan progres belajar siswa yang terstruktur.' },
  { text: 'Real Estate & Property Portal', tooltip: 'Platform listing properti dengan filter pencarian lanjut, manajemen agen, integrasi peta interaktif, dan sistem booking survey.' },
  { text: 'Job Portal & Recruitment System', tooltip: 'Sistem rekrutmen kustom dengan manajemen lowongan, filter pelamar otomatis, dan dashboard evaluasi kandidat untuk tim HR.' },
  { text: 'API Gateway & Microservices', tooltip: 'Pengembangan infrastruktur backend yang mampu menangani banyak layanan dan trafik tinggi secara bersamaan dengan efisiensi tinggi.' },
  { text: 'Custom Payment & FinTech Solution', tooltip: 'Implementasi alur keuangan kustom, wallet internal, integrasi multi-gateway, dan sistem rekonsiliasi data otomatis yang aman.' },
];

defineEmits(['consultation']);

const openConsultation = () => {
  openDirectChat("Halo! Saya ingin berdiskusi tentang kebutuhan proyek saya. Bisa bantu?");
};

const handleCustomOrder = () => {
  popup.openModal(Popups.ORDER_CHECKOUT, { 
    plan: {
      id: 'custom-project',
      name: 'Custom Ecosystem Solution',
      price: '10.000.000',
      description: 'Solusi digital kustom yang dibangun dari nol sesuai kebutuhan unik bisnis Anda.',
      badge: 'Fully Custom',
      features: ['Arsitektur kustom', 'Integrasi tanpa batas', 'Skala enterprise', 'Full support & dokumentasi'],
      ctaText: 'Mulai Proyek Custom',
      isPopular: false,
      billingCycle: 'project'
    }
  });
};

const categories = [
  { id: 'development', name: 'Digital Development' },
  { id: 'maintenance', name: 'Maintenance Plans' }
];

const frequencies = [
  { id: 'monthly', name: 'Monthly' },
  { id: 'one-time', name: 'One-time' }
];

const route = useRoute();
const activeCategory = ref(route.hash === '#maintenance' ? 'maintenance' : 'development');

const scrollToSection = () => {
  nextTick(() => {
    const el = document.getElementById('pricing');
    if (el) {
      // smooth scroll with an offset for any sticky navbar
      const yOffset = -80; 
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
};

watch(() => route.hash, (newHash) => {
  if (newHash === '#maintenance') {
    activeCategory.value = 'maintenance';
    scrollToSection();
  } else if (newHash === '#development') {
    activeCategory.value = 'development';
    scrollToSection();
  }
});

onMounted(() => {
  if (route.hash === '#maintenance' || route.hash === '#development') {
    setTimeout(scrollToSection, 300); // allow DOM to settle for initial load
  }
});

const activeFrequency = ref('monthly');



const devSlide = ref(0);
const devSliderRef = ref<HTMLElement | null>(null);

const handleScrollDev = (e: Event) => {
  const target = e.target as HTMLElement;
  const firstChild = target.children[0] as HTMLElement;
  if (firstChild) {
    const itemWidth = firstChild.offsetWidth + 24; // approx standard gap
    devSlide.value = Math.round(target.scrollLeft / itemWidth);
  }
};

const scrollSliderDev = (direction: "next" | "prev") => {
  if (!devSliderRef.value) return;
  const items = devSliderRef.value.querySelectorAll(".snap-center");
  if (items.length === 0) return;
  const itemWidth = (items[0] as HTMLElement).offsetWidth + 24;
  const totalSlides = developmentPlans.length;
  if (direction === "next") {
    if (devSlide.value >= totalSlides - 1) devSliderRef.value.scrollTo({ left: 0, behavior: "smooth" });
    else devSliderRef.value.scrollBy({ left: itemWidth, behavior: "smooth" });
  } else {
    if (devSlide.value <= 0) devSliderRef.value.scrollTo({ left: itemWidth * (totalSlides - 1), behavior: "smooth" });
    else devSliderRef.value.scrollBy({ left: -itemWidth, behavior: "smooth" });
  }
};

const maintSlide = ref(0);
const maintSliderRef = ref<HTMLElement | null>(null);

const handleScrollMaint = (e: Event) => {
  const target = e.target as HTMLElement;
  const firstChild = target.children[0] as HTMLElement;
  if (firstChild) {
    const itemWidth = firstChild.offsetWidth + 24; // approx standard gap
    maintSlide.value = Math.round(target.scrollLeft / itemWidth);
  }
};

const scrollSliderMaint = (direction: "next" | "prev") => {
  if (!maintSliderRef.value) return;
  const items = maintSliderRef.value.querySelectorAll(".snap-center");
  if (items.length === 0) return;
  const itemWidth = (items[0] as HTMLElement).offsetWidth + 24;
  const totalSlides = maintenancePlans.length;
  if (direction === "next") {
    if (maintSlide.value >= totalSlides - 1) maintSliderRef.value.scrollTo({ left: 0, behavior: "smooth" });
    else maintSliderRef.value.scrollBy({ left: itemWidth, behavior: "smooth" });
  } else {
    if (maintSlide.value <= 0) maintSliderRef.value.scrollTo({ left: itemWidth * (totalSlides - 1), behavior: "smooth" });
    else maintSliderRef.value.scrollBy({ left: -itemWidth, behavior: "smooth" });
  }
};

const handleAddonOrder = (item: any, categoryName: string) => {
  popup.openModal(Popups.ORDER_CHECKOUT, { 
    plan: {
      id: `addon-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: item.name,
      price: item.price,
      description: item.desc,
      badge: categoryName,
      features: [],
      ctaText: 'Pesan Layanan',
      isPopular: false,
      billingCycle: 'one-time'
    }
  });
};

const getMaintenancePrice = (plan: MaintenancePlan) => {
  if (activeFrequency.value === 'one-time') return plan.oneTimePrice;
  return plan.monthlyPrice;
};

const handleOrder = (planId: string) => {
  // Find the plan object
  const allPlans = activeCategory.value === 'development' ? developmentPlans : maintenancePlans;
  const selectedPlan = (allPlans as any[]).find(p => p.id === planId);

  // If maintenance, we need to pass the price correctly based on frequency
  const planData = { ...selectedPlan };
  if (activeCategory.value === 'maintenance') {
    planData.price = getMaintenancePrice(selectedPlan as MaintenancePlan);
    planData.billingCycle = activeFrequency.value;
  } else {
    planData.billingCycle = 'project';
  }

  popup.openModal(Popups.ORDER_CHECKOUT, { 
    plan: planData 
  });
};


</script>

<style scoped>
/* Optional micro-animations */
.animate-in {
  animation: slide-up 0.6s ease-out forwards;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
