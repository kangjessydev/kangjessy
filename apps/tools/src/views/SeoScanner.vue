<template>
    <ToolLayout title="Advanced SEO Auditor"
        subtitle="Analisis teknis mendalam untuk mendominasi halaman pertama Google. Lengkap dengan rekomendasi prioritas."
        badge="Enterprise SEO" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">
        
        <div class="space-y-8">
            <!-- URL Input -->
            <div class="md:bg-bg-secondary md:border md:border-border-color rounded-none md:rounded-3xl p-0 md:p-10 md:shadow-sm relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <Search :size="120" />
                </div>
                
                <div class="relative z-10 space-y-8">
                    <div class="space-y-4">
                        <label class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
                             <Globe :size="14" class="text-accent-primary shrink-0" />
                             URL Website Target
                        </label>
                        <div class="flex flex-col md:flex-row gap-4">
                                <div class="relative group/url">
                                    <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <span class="text-text-tertiary font-mono text-[1rem] opacity-50">https://</span>
                                    </div>
                                    <input v-model="targetUrl" type="text" placeholder="website-bisnis-kamu.com"
                                        class="w-full bg-bg-tertiary border border-border-color rounded-2xl py-5 pl-[5.5rem] pr-6 text-text-primary focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/5 outline-none transition-all font-mono text-[1rem]"
                                        @keyup.enter="startScan">
                                </div>
                            <BaseButton variant="primary" :disabled="!isValidUrl || loading" @click="startScan"
                                class="px-10 h-[60px] rounded-2xl shadow-xl shadow-accent-primary/20 text-md font-black shrink-0">
                                <template v-if="!loading">
                                    <Zap :size="20" class="mr-2" />
                                    <span>Audit Sekarang</span>
                                </template>
                                <template v-else>
                                    <Loader2 class="animate-spin mr-2" :size="20" />
                                    <span>Memindai...</span>
                                </template>
                            </BaseButton>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-3 md:gap-4 items-center">
                        <div class="flex items-center gap-2 text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-bold bg-bg-tertiary/50 px-3 py-1.5 rounded-full border border-border-color shrink-0">
                            <Check :size="12" class="text-green-500 shrink-0" /> Cek Header Teknis
                        </div>
                        <div class="flex items-center gap-2 text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-bold bg-bg-tertiary/50 px-3 py-1.5 rounded-full border border-border-color shrink-0">
                            <Check :size="12" class="text-green-500 shrink-0" /> Audit Alt-Text Gambar
                        </div>
                        <div class="flex items-center gap-2 text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-bold bg-bg-tertiary/50 px-3 py-1.5 rounded-full border border-border-color shrink-0">
                            <Check :size="12" class="text-green-500 shrink-0" /> Kepadatan Kata Kunci
                        </div>
                        <div class="flex items-center gap-2 text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-bold bg-bg-tertiary/50 px-3 py-1.5 rounded-full border border-border-color shrink-0">
                            <Check :size="12" class="text-green-500 shrink-0" /> Distribusi Link
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error / Blocked State -->
            <div v-if="fetchStatus === 'blocked' || fetchStatus === 'error'" 
                class="bg-red-500/5 border border-red-500/20 rounded-none md:rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center animate-in fade-in zoom-in duration-500">
                <div class="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                    <ShieldAlert :size="40" />
                </div>
                <div class="flex-1 text-center md:text-left space-y-4">
                    <h3 class="text-[clamp(1.1rem,3vw,1.25rem)] font-black text-text-primary tracking-tight">Akses Website Terblokir Firewall</h3>
                    <p class="text-sm text-text-secondary leading-relaxed max-w-2xl">
                        Website target ({{ targetUrl }}) menggunakan sistem keamanan (seperti Cloudflare atau Wordfence) yang memblokir robot pemindai otomatis kami.
                    </p>
                    <div class="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                        <BaseButton variant="secondary" @click="fetchStatus = 'idle'" class="text-xs py-2 px-4 rounded-xl font-bold">
                            Coba URL Lain
                        </BaseButton>
                        <BaseButton variant="primary" @click="showManualInput = true" class="text-xs py-2 px-4 rounded-xl font-bold">
                            Input Manual (Simulasi)
                        </BaseButton>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-16 md:py-24 gap-6 md:bg-bg-secondary md:border md:border-border-color rounded-[2.5rem]">
                <div class="relative w-24 h-24">
                    <div class="absolute inset-0 border-4 border-accent-primary/5 rounded-full"></div>
                    <div class="absolute inset-0 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <Rocket :size="40" class="text-accent-primary animate-bounce" />
                    </div>
                </div>
                <div class="text-center space-y-2">
                    <h3 class="text-xl font-black text-text-primary tracking-tight">AI Kami Sedang Membedah Situs Kamu...</h3>
                    <p class="text-sm text-text-tertiary max-w-xs mx-auto leading-relaxed">Menganalisis metadata, struktur hierarki, dan aset visual untuk memberikan hasil paling akurat.</p>
                </div>
            </div>

            <!-- Manual Input Simulation -->
            <div v-if="showManualInput && !scanResult && !loading" class="md:bg-bg-secondary md:border md:border-border-color rounded-none md:rounded-[2.5rem] p-0 md:p-10 space-y-8 animate-in slide-in-from-top-4 duration-500">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                        <Code :size="20" class="shrink-0" />
                    </div>
                    <div>
                        <h4 class="text-[clamp(1rem,2.5vw,1.125rem)] font-black text-text-primary">Mode Simulasi Data</h4>
                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary">Masukkan data teknis secara manual untuk melakukan simulasi audit SEO.</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase text-text-tertiary px-1">Page Title Tag</label>
                        <input v-model="manualData.title" type="text" placeholder="Contoh: Jasa Pembuatan Website Terbaik" class="w-full bg-bg-tertiary border border-border-color rounded-xl p-4 text-sm font-medium">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase text-text-tertiary px-1">H1 Main Heading</label>
                        <input v-model="manualData.h1" type="text" placeholder="Contoh: Solusi Digital untuk Bisnis Anda" class="w-full bg-bg-tertiary border border-border-color rounded-xl p-4 text-sm font-medium">
                    </div>
                    <div class="space-y-2 md:col-span-2">
                        <label class="text-[10px] font-black uppercase text-text-tertiary px-1">Meta Deskripsi</label>
                        <textarea v-model="manualData.description" rows="3" placeholder="Deskripsi singkat website kamu..." class="w-full bg-bg-tertiary border border-border-color rounded-xl p-4 text-sm font-medium resize-none"></textarea>
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase text-text-tertiary px-1">Jumlah Link Internal</label>
                        <input v-model.number="manualData.intLinks" type="number" class="w-full bg-bg-tertiary border border-border-color rounded-xl p-4 text-sm font-medium">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase text-text-tertiary px-1">Jumlah Gambar</label>
                        <input v-model.number="manualData.imgCount" type="number" class="w-full bg-bg-tertiary border border-border-color rounded-xl p-4 text-sm font-medium">
                    </div>
                </div>
                <div class="flex justify-end pt-4">
                    <BaseButton variant="primary" @click="runSimulation" class="px-8 font-black">
                        Jalankan Simulasi Audit
                    </BaseButton>
                </div>
            </div>

            <!-- Results Section -->
            <div v-else-if="scanResult" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                <!-- Left Column: Score & Summary -->
                <div class="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                    <!-- Score Card -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-none md:rounded-[2.5rem] p-0 md:p-10 text-center relative overflow-hidden md:shadow-sm">
                        <div class="hidden md:block absolute top-0 left-0 w-full h-1.5 bg-linear-to-r" :class="scoreColorClass"></div>
                        <h4 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.25em] text-text-tertiary mb-8">Hasil Kesehatan SEO</h4>
                        
                        <div class="relative inline-flex items-center justify-center mb-8 group">
                            <!-- Background Glow -->
                            <div class="absolute inset-0 rounded-full blur-[40px] opacity-20 scale-110" :class="scoreBgClass"></div>
                            
                            <svg class="w-40 h-40 transform -rotate-90 relative z-10 transition-transform group-hover:scale-105 duration-500">
                                <circle cx="80" cy="80" r="72" stroke="currentColor" stroke-width="12" fill="transparent" class="text-bg-tertiary" />
                                <circle cx="80" cy="80" r="72" stroke="currentColor" stroke-width="12" fill="transparent" 
                                    :stroke-dasharray="452.4" :stroke-dashoffset="452.4 - (452.4 * scanResult.score / 100)"
                                    class="transition-all duration-1500 ease-out" :stroke-linecap="'round'" :class="scoreStrokeClass" />
                            </svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center z-20">
                                <span class="text-[clamp(2.5rem,8vw,3rem)] font-black text-text-primary tracking-tighter">{{ scanResult.score }}</span>
                                <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase text-text-tertiary opacity-50">Skor</span>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/5 border border-accent-primary/10">
                                <p class="text-[clamp(0.85rem,2vw,0.9rem)] font-bold" :class="scoreTextClass">{{ scoreLabel }}</p>
                            </div>
                            <p class="text-[clamp(0.7rem,1.8vw,0.75rem)] text-text-tertiary leading-relaxed px-4">{{ scoreDescription }}</p>
                        </div>
                    </div>

                    <!-- Priority Action Card -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-none md:rounded-[2.5rem] p-0 md:p-8 space-y-6">
                        <h4 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-tertiary flex items-center gap-2">
                            <Zap :size="14" class="text-accent-primary shrink-0" />
                            Perbaikan Prioritas ({{ priorityActions.length }})
                        </h4>
                        
                        <div class="space-y-4">
                            <div v-for="(fix, idx) in priorityActions" :key="idx" 
                                class="p-4 rounded-2xl bg-bg-tertiary/50 border border-border-color space-y-2 group transition-all hover:border-accent-primary/30">
                                <div class="flex items-center justify-between">
                                    <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black py-0.5 px-2 bg-red-500/10 text-red-500 rounded uppercase">Kritis</span>
                                    <ArrowRight :size="12" class="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                </div>
                                <p class="text-[clamp(0.7rem,2vw,0.75rem)] font-bold text-text-primary">{{ fix.title }}</p>
                                <p class="text-[clamp(0.6rem,1.8vw,0.65rem)] text-text-tertiary leading-snug">{{ fix.action }}</p>
                            </div>
                            <p v-if="priorityActions.length === 0" class="text-center py-4 text-xs text-green-500 font-bold italic">
                                Semua sistem teknis krusial tampak SOLID!
                            </p>
                        </div>
                    </div>

                    <!-- CTA -->
                    <div class="bg-linear-to-br from-accent-primary to-accent-secondary rounded-[2.5rem] p-10 text-white shadow-2xl shadow-accent-primary/20 relative overflow-hidden group">
                        <!-- Abstract Deco -->
                        <div class="absolute -right-5 -bottom-5 w-32 h-32 bg-white/10 rounded-full blur-[40px] group-hover:scale-125 transition-transform"></div>
                        
                        <h4 class="font-black text-2xl mb-3 tracking-tight">Kalahkan Kompetitor.</h4>
                        <p class="text-xs text-white/80 leading-relaxed mb-8">Peringkat 1 bukan kebetulan, tapi hasil dari optimalisasi teknis yang presisi. Ayo beresin sekarang.</p>
                        <BaseButton variant="secondary" class="w-full font-black text-[13px] py-4 rounded-2xl" @click="openConsultation">
                            Konsultasi Strategis
                        </BaseButton>
                    </div>
                </div>

                <!-- Right Column: Detailed Analysis -->
                <div class="lg:col-span-8 space-y-6 pb-20">
                    
                    <!-- Section: Summary Stats Overview -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div v-for="stat in summaryStats" :key="stat.label" class="bg-bg-secondary border border-border-color rounded-3xl p-5 flex flex-col items-center text-center">
                            <component :is="stat.icon" :size="20" class="text-accent-primary mb-3 shrink-0" />
                            <span class="text-[clamp(1.1rem,3vw,1.25rem)] font-black text-text-primary">{{ stat.value }}</span>
                            <span class="text-[clamp(0.5rem,1.5vw,0.55rem)] uppercase font-bold text-text-tertiary tracking-widest mt-1">{{ stat.label === 'Int Links' ? 'Link Internal' : stat.label === 'Ext Links' ? 'Link Eksternal' : stat.label === 'Images' ? 'Gambar' : stat.label }}</span>
                        </div>
                    </div>

                    <!-- Section: Heading Analysis (Collapsible) -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-none md:rounded-[2.5rem] overflow-hidden transition-all duration-500"
                        :class="sections.headings ? 'shadow-lg' : 'shadow-none'">
                        <button @click="sections.headings = !sections.headings" 
                            class="w-full p-8 flex items-center justify-between text-left group bg-transparent border-none cursor-pointer">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                                    <Type :size="24" />
                                </div>
                                <div>
                                    <h4 class="text-[clamp(0.85rem,2.2vw,1rem)] font-black uppercase tracking-wider text-text-primary">Struktur Heading</h4>
                                    <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-medium">Analisis hirarki konten H1-H3.</p>
                                </div>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center transition-all duration-300"
                                :class="{ 'rotate-180 bg-accent-primary/20 text-accent-primary': sections.headings }">
                                <ChevronDown :size="20" />
                            </div>
                        </button>
                        
                        <Transition name="expand">
                            <div v-if="sections.headings" class="px-4 md:px-8 pb-8 border-t border-border-color/30 pt-8 animate-in slide-in-from-top-2 duration-300">
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div v-for="h in ['h1', 'h2', 'h3']" :key="h" 
                                        class="bg-bg-tertiary/30 rounded-2xl p-4 border border-border-color flex flex-col items-center text-center">
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase text-accent-primary mb-1">{{ h }}</span>
                                        <span class="text-[clamp(1.25rem,4vw,1.5rem)] font-black text-text-primary">{{ scanResult?.headings[h]?.length || 0 }}</span>
                                        <div v-if="h === 'h1'" class="mt-2">
                                            <span v-if="(scanResult?.headings['h1']?.length || 0) === 1" class="text-[clamp(0.5rem,1.5vw,0.55rem)] px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full font-black">Sempurna</span>
                                            <span v-else class="text-[clamp(0.5rem,1.5vw,0.55rem)] px-2 py-0.5 bg-red-500/10 text-red-500 rounded-full font-black">Masalah</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    <div v-for="(h, idx) in allHeadings" :key="idx" 
                                        class="flex gap-4 p-4 rounded-2xl border border-border-color/50 hover:border-accent-primary/30 group transition-all">
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black text-accent-primary w-8 shrink-0 flex items-center justify-center bg-accent-primary/10 rounded-lg h-6">{{ h.tag }}</span>
                                        <span class="text-[0.85rem] font-bold text-text-secondary line-clamp-2 leading-snug group-hover:text-text-primary transition-colors">"{{ h.text || '[Pesan Kosong]' }}"</span>
                                    </div>
                                    <p v-if="allHeadings.length === 0" class="text-center py-6 text-xs text-text-tertiary italic">Keamanan teknis: Tidak ada struktur heading terdeteksi.</p>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <!-- Section: Checklist Findings (Collapsible) -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-none md:rounded-[2.5rem] overflow-hidden transition-all duration-500"
                        :class="sections.checklist ? 'shadow-lg' : 'shadow-none'">
                        <button @click="sections.checklist = !sections.checklist" 
                            class="w-full p-8 flex items-center justify-between text-left group bg-transparent border-none cursor-pointer">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                                    <ShieldCheck :size="24" />
                                </div>
                                <div>
                                    <h4 class="text-[clamp(0.85rem,2.2vw,1rem)] font-black uppercase tracking-wider text-text-primary">Temuan Audit</h4>
                                    <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-medium">Ceklis standar teknis Google & SEO.</p>
                                </div>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center transition-all duration-300"
                                :class="{ 'rotate-180 bg-accent-primary/20 text-accent-primary': sections.checklist }">
                                <ChevronDown :size="20" />
                            </div>
                        </button>
                        
                        <Transition name="expand">
                            <div v-if="sections.checklist" class="px-4 md:px-8 pb-8 border-t border-border-color/30 pt-4 divide-y divide-border-color/30">
                                <div v-for="(check, idx) in auditFindings" :key="idx" class="py-6 flex gap-6 group">
                                    <div class="shrink-0 pt-1">
                                        <div v-if="check.status === 'success'" class="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-sm">
                                            <Check :size="20" stroke-width="3" />
                                        </div>
                                        <div v-else-if="check.status === 'warning'" class="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 shadow-sm">
                                            <AlertTriangle :size="20" stroke-width="3" />
                                        </div>
                                        <div v-else class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shadow-sm">
                                            <X :size="20" stroke-width="3" />
                                        </div>
                                    </div>
                                    <div class="flex-1 space-y-2">
                                        <h5 class="text-[0.95rem] font-black text-text-primary group-hover:text-accent-primary transition-colors">{{ check.title }}</h5>
                                        <p class="text-[0.8rem] text-text-tertiary leading-relaxed">{{ check.description }}</p>
                                        <div v-if="check.status !== 'success'" class="mt-4 p-4 bg-bg-tertiary/50 rounded-2xl border border-dashed border-border-color/50 flex flex-col gap-2">
                                            <div class="flex items-center gap-1.5">
                                                <Zap :size="12" class="text-accent-primary shrink-0" />
                                                <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-text-primary">Rekomendasi Ahli:</span>
                                            </div>
                                            <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-medium text-text-secondary italic leading-relaxed">{{ check.solution }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <!-- Section: Media & Assets (Collapsible) -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-none md:rounded-[2.5rem] overflow-hidden transition-all duration-500"
                        :class="sections.media ? 'shadow-lg' : 'shadow-none'">
                        <button @click="sections.media = !sections.media" 
                            class="w-full p-8 flex items-center justify-between text-left group bg-transparent border-none cursor-pointer">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                                    <ImageIcon :size="24" />
                                </div>
                                <div>
                                    <h4 class="text-[clamp(0.85rem,2.2vw,1rem)] font-black uppercase tracking-wider text-text-primary">Media & Aset Visual</h4>
                                    <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-medium">Audit gambar, alt-text, dan meta-media.</p>
                                </div>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center transition-all duration-300"
                                :class="{ 'rotate-180 bg-accent-primary/20 text-accent-primary': sections.media }">
                                <ChevronDown :size="20" />
                            </div>
                        </button>
                        
                        <Transition name="expand">
                            <div v-if="sections.media" class="px-4 md:px-8 pb-8 border-t border-border-color/30 pt-8 animate-in slide-in-from-top-2">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div class="bg-bg-tertiary/30 rounded-[2rem] p-8 border border-border-color text-center space-y-2">
                                        <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] uppercase font-black text-text-tertiary tracking-widest">Total Gambar</p>
                                        <p class="text-[clamp(2rem,6vw,2.5rem)] font-black text-text-primary">{{ scanResult.images.total }}</p>
                                        <p class="text-[clamp(0.55rem,1.5vw,0.6rem)] text-text-tertiary font-medium">Teresource dalam dokumen HTML.</p>
                                    </div>
                                    <div class="bg-bg-tertiary/30 rounded-[2rem] p-8 border text-center space-y-2"
                                        :class="scanResult.images.missingAlt > 0 ? 'border-red-500/20' : 'border-green-500/20'">
                                        <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] uppercase font-black text-text-tertiary tracking-widest">Alt-Text Bermasalah</p>
                                        <p class="text-[clamp(2rem,6vw,2.5rem)] font-black" :class="scanResult.images.missingAlt > 0 ? 'text-red-500' : 'text-green-500'">
                                            {{ scanResult.images.missingAlt }}
                                        </p>
                                        <div class="flex items-center justify-center gap-2">
                                            <span class="text-[10px] font-bold text-text-tertiary">{{ ((scanResult.images.missingAlt / (scanResult.images.total || 1)) * 100).toFixed(0) }}% Gagal</span>
                                            <div class="w-20 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                                                <div class="h-full bg-red-500 transition-all duration-1000" :style="{ width: (scanResult.images.missingAlt / (scanResult.images.total || 1) * 100) + '%' }"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-bg-tertiary/20 border border-border-color rounded-2xl p-6 flex gap-4 items-start">
                                    <InfoIcon :size="16" class="text-accent-primary shrink-0 mt-0.5" />
                                    <div class="space-y-1">
                                        <p class="text-[11px] font-black text-text-primary uppercase tracking-wider">MENGAPAA INI PENTING?</p>
                                        <p class="text-[10px] text-text-tertiary leading-relaxed">Tanpa <code>alt text</code>, Google tidak tahu apa isi gambar Anda. Ini adalah peluang traffic besar yang terbuang sia-sia dari Google Images.</p>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <!-- Section: Keyword Density & Topics (Collapsible) -->
                    <div class="md:bg-bg-secondary md:border md:border-border-color rounded-none md:rounded-[2.5rem] overflow-hidden transition-all duration-500"
                        :class="sections.keywords ? 'shadow-lg' : 'shadow-none'">
                        <button @click="sections.keywords = !sections.keywords" 
                            class="w-full p-8 flex items-center justify-between text-left group bg-transparent border-none cursor-pointer">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                                    <Target :size="24" />
                                </div>
                                <div>
                                    <h4 class="text-[clamp(0.85rem,2.2vw,1rem)] font-black uppercase tracking-wider text-text-primary">Intelijen Kata Kunci</h4>
                                    <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary font-medium">Kata kunci paling dominan yang terdeteksi.</p>
                                </div>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center transition-all duration-300"
                                :class="{ 'rotate-180 bg-accent-primary/20 text-accent-primary': sections.keywords }">
                                <ChevronDown :size="20" />
                            </div>
                        </button>
                        
                        <Transition name="expand">
                            <div v-if="sections.keywords" class="px-4 md:px-8 pb-8 border-t border-border-color/30 pt-8 animate-in slide-in-from-top-2">
                                <div class="flex flex-wrap gap-3">
                                    <div v-for="kw in topKeywords" :key="kw.word" 
                                        class="flex items-center gap-3 px-5 py-3 rounded-2xl bg-bg-tertiary/50 border border-border-color transition-all hover:border-accent-primary/50 group">
                                        <span class="text-xs font-black text-text-primary">{{ kw.word }}</span>
                                        <span class="text-[10px] font-bold text-accent-primary px-2 py-0.5 bg-accent-primary/10 rounded-lg">{{ kw.count }}x</span>
                                    </div>
                                    <p v-if="topKeywords.length === 0" class="text-center py-6 text-xs text-text-tertiary italic w-full">Gagal menganalisis kepadatan kata kunci.</p>
                                </div>
                                <div class="mt-8 p-6 bg-accent-primary/5 border border-accent-primary/10 rounded-3xl">
                                    <h5 class="text-[10px] font-black uppercase tracking-widest text-accent-primary mb-2">Perspektif Google</h5>
                                    <p class="text-xs text-text-secondary leading-relaxed">Google menganggap halaman Anda relevan untuk topik terkait <strong>{{ topKeywords.slice(0, 3).map(k => k.word).join(', ') }}</strong>. Jika target Anda bukan ini, Anda perlu merevisi konten secara teknis.</p>
                                </div>
                            </div>
                        </Transition>
                    </div>

                </div>
            </div>

            <!-- Welcome State -->
            <div v-else class="flex flex-col items-center justify-center py-24 text-center px-4 bg-bg-secondary border border-border-color rounded-[3rem] shadow-sm relative overflow-hidden">
                <div class="absolute -top-20 -left-20 w-64 h-64 bg-accent-primary/5 blur-[80px] rounded-full"></div>
                <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-secondary/5 blur-[80px] rounded-full"></div>

                <div class="w-24 h-24 bg-linear-to-tr from-accent-primary/20 to-accent-secondary/20 rounded-[2rem] flex items-center justify-center text-accent-primary mb-10 shadow-inner group transition-transform hover:rotate-6">
                    <History :size="48" class="group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 class="text-[clamp(1.5rem,5vw,2rem)] font-black text-text-primary mb-4 tracking-tight max-w-lg">Rank #1 Gak Bisa Pake Jampi-Jampi.</h3>
                <p class="text-[clamp(0.85rem,2vw,0.95rem)] text-text-secondary max-w-lg leading-relaxed mb-12 opacity-80">
                    Banyak orang fokus ke desain, tapi lupa struktur teknis. Audit website Anda sekarang dan temukan masalah "invisible" yang menghambat traffic bisnis Anda.
                </p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
                    <div v-for="tip in auditTips" :key="tip.title" class="bg-bg-tertiary/50 border border-border-color rounded-3xl p-8 text-left transition-all hover:border-accent-primary/50 hover:-translate-y-2 group">
                        <div class="w-12 h-12 rounded-2xl bg-bg-secondary border border-border-color flex items-center justify-center text-accent-primary mb-6 group-hover:bg-accent-primary group-hover:text-white transition-all">
                            <component :is="tip.icon" :size="24" />
                        </div>
                        <h5 class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-[0.2em] text-text-primary mb-3">{{ tip.title }}</h5>
                        <p class="text-[clamp(0.7rem,1.8vw,0.75rem)] text-text-tertiary leading-relaxed font-medium">{{ tip.desc }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Education Content -->
        <template #education>
            <div class="space-y-10 py-4">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                    <div class="md:col-span-12 space-y-4">
                        <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-lg text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest">
                            Dasar-Dasar SEO
                        </div>
                        <h4 class="text-[clamp(1.25rem,4vw,1.5rem)] font-black text-text-primary tracking-tight">Kesehatan Teknis Adalah Koentji.</h4>
                        <p class="text-[clamp(0.85rem,2vw,0.95rem)] leading-relaxed text-text-secondary">
                            Membangun SEO tanpa audit teknis ibarat membangun rumah di atas pasir. Anda bisa punya konten terbaik di dunia, tapi jika Google Bot "tersandung" saat merayapi situs Anda, halaman tersebut tidak akan pernah muncul di SERP (Search Engine Result Page).
                        </p>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="p-8 bg-bg-secondary rounded-3xl border border-border-color space-y-4">
                        <Type :size="28" class="text-accent-primary shrink-0" />
                        <h5 class="text-[clamp(0.8rem,2vw,0.85rem)] font-black uppercase tracking-widest text-text-primary">Hierarki Heading</h5>
                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed">
                            Pastikan hirarki <code>H1</code> (Topik Utama), <code>H2</code> (Sub-topik), dan <code>H3</code> (Detail) berurutan. Hindari loncat dari H1 ke H3 langsung. Ini penting untuk aksesibilitas dan SEO.
                        </p>
                    </div>
                    <div class="p-8 bg-bg-secondary rounded-3xl border border-border-color space-y-4">
                        <ShieldCheck :size="28" class="text-green-500 shrink-0" />
                        <h5 class="text-[clamp(0.8rem,2vw,0.85rem)] font-black uppercase tracking-widest text-text-primary">Kesiapan Meta</h5>
                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed">
                            Title & Description bukan cuma teks, itu adalah "sales pitch" Anda di hasil pencarian. Gunakan kata kunci yang relevan tanpa terlihat seperti spam (Keyword Stuffing).
                        </p>
                    </div>
                    <div class="p-8 bg-bg-secondary rounded-3xl border border-border-color space-y-4">
                        <ImageIcon :size="28" class="text-orange-500 shrink-0" />
                        <h5 class="text-[clamp(0.8rem,2vw,0.85rem)] font-black uppercase tracking-widest text-text-primary">Dampak Visual</h5>
                        <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary leading-relaxed">
                            Alt-text membantu Google memahami konteks gambar. Selain itu, gambar yang berat memperlambat LCP (Largest Contentful Paint) yang merupakan bagian dari Core Web Vitals.
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { 
    Globe, Zap, Loader2, Search, Check, X, AlertTriangle, 
    Type, ShieldCheck, Image as ImageIcon, History,
    Layout, Gauge, Code, Rocket, ChevronDown, Target, 
    Info as InfoIcon, ArrowRight, Share2, Link as LinkIcon,
    Smartphone, ShieldAlert
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useToolHistory } from '@/composables/useToolHistory';
import { usePopupManager, Popups } from '@/composables/usePopupManager';

// --- Types & Interfaces ---
interface ScanResult {
    url: string;
    score: number;
    metadata: {
        title: string;
        description: string;
        viewport: boolean;
        canonical: string;
        charset: string;
        ogTags: Record<string, string>;
    };
    headings: Record<string, string[]>;
    images: {
        total: number;
        missingAlt: number;
    };
    security: {
        isHttps: boolean;
    };
    links: {
        internal: number;
        external: number;
    };
    topKeywords: { word: string; count: number }[];
}

// --- State Management ---
const targetUrl = ref('');
const loading = ref(false);
const scanResult = ref<ScanResult | null>(null);
const fetchStatus = ref<'idle' | 'success' | 'blocked' | 'error'>('idle');
const showManualInput = ref(false);
const manualData = reactive({
    title: '',
    description: '',
    h1: '',
    intLinks: 5,
    imgCount: 1,
    missingAlt: 0
});

const { history, addEntry, removeEntry, clearHistory } = useToolHistory('seo-scanner-v2');
const popup = usePopupManager();

// Section Visibility (Collapsible)
const sections = reactive({
    headings: true,
    checklist: true,
    media: true,
    keywords: true
});

// --- Constants ---
const auditTips = [
    { icon: Layout, title: 'Alur Logis', desc: 'Google menyukai struktur yang rapi (H1 > H2 > H3). Jangan loncat-loncat!' },
    { icon: Gauge, title: 'LCP & Kecepatan', desc: 'Kecepatan pemuatan elemen utama (Largest Contentful Paint) sangat krusial di 2026.' },
    { icon: Smartphone, title: 'Mobile First', desc: 'Pastikan viewport terpasang agar tampilan responsif dan tidak kena penalti Google.' }
];

// --- Computed Props ---
const isValidUrl = computed(() => {
    try {
        const u = targetUrl.value.trim();
        if (!u) return false;
        new URL(u.startsWith('http') ? u : `https://${u}`);
        return u.includes('.');
    } catch {
        return false;
    }
});

const allHeadings = computed(() => {
    if (!scanResult.value) return [];
    const res: { tag: string; text: string }[] = [];
    ['h1', 'h2', 'h3'].forEach(tag => {
        if (scanResult.value!.headings[tag]) {
            scanResult.value!.headings[tag].forEach(text => res.push({ tag: tag.toUpperCase(), text }));
        }
    });
    return res;
});

const topKeywords = computed(() => scanResult.value?.topKeywords || []);

const summaryStats = computed(() => {
    if (!scanResult.value) return [];
    return [
        { label: 'Heading', value: allHeadings.value.length, icon: Type },
        { label: 'Gambar', value: scanResult.value.images.total, icon: ImageIcon },
        { label: 'Link Int', value: scanResult.value.links.internal, icon: LinkIcon },
        { label: 'Link Eks', value: scanResult.value.links.external, icon: Share2 }
    ];
});

const priorityActions = computed(() => {
    if (!scanResult.value) return [];
    const actions = [];
    const r = scanResult.value;

    if ((r.headings['h1'] || []).length === 0) {
        actions.push({ title: 'Tag H1 Hilang', action: 'Pasang satu tag H1 sebagai identitas utama halaman.' });
    }
    if ((r.headings['h1'] || []).length > 1) {
        actions.push({ title: 'Duplikat H1 Ditemukan', action: 'Google bingung mana judul utamanya. Sisakan hanya satu.' });
    }
    if (!r.metadata.description) {
        actions.push({ title: 'Meta Description Kosong', action: 'Tulis ringkasan 150 karakter untuk menarik klik di Google.' });
    }
    if (r.images.missingAlt > 0) {
        actions.push({ title: 'Gambar Tanpa Alt-Text', action: `Ada ${r.images.missingAlt} gambar yang "buta". Berikan konteks ke Google.` });
    }
    if (!r.security.isHttps) {
        actions.push({ title: 'Website Tidak Aman (Non-HTTPS)', action: 'Gunakan HTTPS untuk menghindari penalti ranking & peringatan browser.' });
    }
    return actions;
});

const auditFindings = computed(() => {
    if (!scanResult.value) return [];
    const r = scanResult.value;
    const items = [];

    // Title Check
    const titleLen = r.metadata.title.length;
    items.push({
        status: titleLen >= 40 && titleLen <= 65 ? 'success' : (titleLen === 0 ? 'error' : 'warning'),
        title: 'Optimasi Tag Judul (Title)',
        description: titleLen === 0 ? 'Tag judul website kosong!' : `Tag judul ditemukan: "${r.metadata.title}". Panjang: ${titleLen} karakter.`,
        solution: 'Idealnya 50-60 karakter. Sertakan kata kunci utama di bagian paling depan.',
    });

    // Social Metadata (OG Tags)
    const ogCount = Object.keys(r.metadata.ogTags).length;
    items.push({
        status: ogCount >= 3 ? 'success' : 'warning',
        title: 'Meta Sosial (Open Graph)',
        description: `Ditemukan ${ogCount} OG Tags. Ini menentukan tampilan link Anda saat di-share ke WA/FB.`,
        solution: 'Pastikan og:title, og:description, dan og:image terpasang di <head>.',
    });

    // Mobile Readiness
    items.push({
        status: r.metadata.viewport ? 'success' : 'error',
        title: 'Kesiapan Mobile',
        description: r.metadata.viewport ? 'Tag Viewport ditemukan. Web siap untuk mobile.' : 'Viewport tidak ada. Tampilan akan berantakan di HP.',
        solution: 'Tambahkan <meta name="viewport" content="width=device-width, initial-scale=1">.',
    });

    // Link Distribution
    const totalLinks = r.links.internal + r.links.external;
    items.push({
        status: totalLinks > 0 ? (r.links.internal > r.links.external ? 'success' : 'warning') : 'error',
        title: 'Strategi Link Internal',
        description: `Internal: ${r.links.internal}, External: ${r.links.external}.`,
        solution: 'Internal link membantu distribusi "SEO Juice" ke halaman lain di web Anda.',
    });

    return items;
});

// --- Score Styling ---
const scoreColorClass = computed(() => {
    const s = scanResult.value?.score || 0;
    if (s >= 85) return 'from-green-500 to-emerald-400';
    if (s >= 60) return 'from-yellow-500 to-amber-400';
    return 'from-red-600 to-rose-400';
});

const scoreStrokeClass = computed(() => {
    const s = scanResult.value?.score || 0;
    if (s >= 85) return 'text-green-500';
    if (s >= 60) return 'text-yellow-500';
    return 'text-red-500';
});

const scoreBgClass = computed(() => {
    const s = scanResult.value?.score || 0;
    if (s >= 85) return 'bg-green-500';
    if (s >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
});

const scoreTextClass = computed(() => {
    const s = scanResult.value?.score || 0;
    if (s >= 85) return 'text-green-500';
    if (s >= 60) return 'text-yellow-500';
    return 'text-red-500';
});

const scoreLabel = computed(() => {
    const s = scanResult.value?.score || 0;
    if (s >= 85) return 'Teknis Sangat Sehat!';
    if (s >= 60) return 'Butuh Pijat SEO';
    return 'Kondisi Kritis!';
});

const scoreDescription = computed(() => {
    const s = scanResult.value?.score || 0;
    if (s >= 85) return 'Struktur website kamu sudah sangat ramah terhadap robot Google. Siap untuk scale!';
    if (s >= 60) return 'Masih ada beberapa ganjalan teknis yang bikin rank kamu stuck di halaman belakang.';
    return 'Banyak masalah fundamental yang bikin Google malas mengindeks situs kamu. Harus segera dibenahi.';
});

// --- Actions ---
async function startScan() {
    if (!isValidUrl.value) return;
    
    loading.value = true;
    scanResult.value = null;
    fetchStatus.value = 'idle';
    showManualInput.value = false;

    const fullUrl = targetUrl.value.startsWith('http') ? targetUrl.value : `https://${targetUrl.value}`;

    try {
        // Try multiple proxies
        let html = '';
        const proxies = [
            `https://api.allorigins.win/get?url=${encodeURIComponent(fullUrl)}`,
            `https://corsproxy.io/?${encodeURIComponent(fullUrl)}`
        ];

        for (const proxy of proxies) {
            try {
                const response = await fetch(proxy);
                let text = '';
                if (proxy.includes('allorigins')) {
                    const data = await response.json();
                    text = data.contents;
                } else {
                    text = await response.text();
                }
                
                if (text && text.length > 500) {
                    // Check if it's a real block page or a successful fetch
                    const isChallenge = text.includes('Just a moment...') || 
                                       text.includes('cf-browser-verification') || 
                                       text.includes('Attention Required! | Cloudflare');
                    
                    if (!isChallenge) {
                        html = text;
                        break;
                    }
                }
            } catch (e) {
                console.warn(`Proxy ${proxy} failed, trying next...`);
            }
        }

        const isReallyBlocked = !html || 
                               (html.includes('<title>Just a moment...</title>') && html.includes('Cloudflare')) ||
                               (html.includes('<title>Access denied</title>') && html.includes('Cloudflare')) ||
                               html.includes('cf-browser-verification') ||
                               (html.includes('Ray ID:') && html.includes('Cloudflare'));

        if (html && !isReallyBlocked) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // 1. Meta Audit (Extended)
            const meta = {
                title: doc.querySelector('title')?.innerText || '',
                description: doc.querySelector('meta[name="description"]')?.getAttribute('content') || 
                             doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
                viewport: !!doc.querySelector('meta[name="viewport"]'),
                canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
                charset: doc.querySelector('meta[charset]')?.getAttribute('charset') || '',
                ogTags: {} as Record<string, string>
            };
            
            // Extract OG Tags
            doc.querySelectorAll('meta[property^="og:"]').forEach(el => {
                const prop = el.getAttribute('property') || '';
                const content = el.getAttribute('content') || '';
                meta.ogTags[prop] = content;
            });

            // 2. Heading Audit (Full)
            const headings: Record<string, string[]> = {
                h1: Array.from(doc.querySelectorAll('h1')).map(el => el.innerText.trim()).filter(t => t),
                h2: Array.from(doc.querySelectorAll('h2')).map(el => el.innerText.trim()).filter(t => t).slice(0, 50),
                h3: Array.from(doc.querySelectorAll('h3')).map(el => el.innerText.trim()).filter(t => t).slice(0, 50),
            };

            // 3. Image & Link Audit
            const imgs = doc.querySelectorAll('img');
            let missingAlt = 0;
            imgs.forEach(img => { if (!img.getAttribute('alt')) missingAlt++; });

            const links = doc.querySelectorAll('a');
            let internal = 0; let external = 0;
            const hostnameStr = new URL(fullUrl).hostname.replace('www.', '');
            links.forEach(link => {
                const href = link.getAttribute('href') || '';
                if (href.startsWith('http')) {
                    if (href.includes(hostnameStr)) internal++; else external++;
                } else if (href.startsWith('/') || !href.includes(':')) {
                    internal++;
                }
            });

            // 4. Keyword Analysis (Simplified)
            const bodyText = doc.body.innerText || '';
            const words = bodyText.toLowerCase()
                .replace(/[^\w\s]/g, '')
                .split(/\s+/)
                .filter(w => w.length > 4 && !['dan', 'yang', 'untuk', 'dengan', 'adalah', 'dari', 'pada', 'the', 'and'].includes(w));
            
            const kwMap: Record<string, number> = {};
            words.forEach(w => { kwMap[w] = (kwMap[w] || 0) + 1; });
            const topKeywordsArr = Object.entries(kwMap)
                .map(([word, count]) => ({ word, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10);

            // 5. Score Calculation
            const res = calculateScore(fullUrl, meta, headings, imgs.length, missingAlt, internal, external, topKeywordsArr);

            setTimeout(() => {
                scanResult.value = res;
                loading.value = false;
                fetchStatus.value = 'success';
                addEntry({ url: fullUrl }, res);
            }, 1000);

        } else {
            fetchStatus.value = 'blocked';
            loading.value = false;
        }
    } catch (e) {
        console.error(e);
        fetchStatus.value = 'error';
        loading.value = false;
    }
}

function calculateScore(url: string, meta: any, headings: any, imgCount: number, missingAlt: number, internal: number, external: number, topKeywords: any[]) {
    let currentScore = 100;
    if (headings.h1.length === 0) currentScore -= 20;
    if (headings.h1.length > 1) currentScore -= 10;
    if (!meta.description) currentScore -= 15;
    if (missingAlt > 0) currentScore -= Math.min(15, (missingAlt / (imgCount || 1)) * 20);
    if (!url.startsWith('https')) currentScore -= 25;
    if (!meta.viewport) currentScore -= 10;
    if (meta.title.length < 30) currentScore -= 5;
    if (Object.keys(meta.ogTags).length < 2) currentScore -= 5;

    return {
        url,
        score: Math.max(0, Math.floor(currentScore)),
        metadata: meta,
        headings,
        images: { total: imgCount, missingAlt },
        security: { isHttps: url.startsWith('https') },
        links: { internal, external },
        topKeywords
    };
}

function runSimulation() {
    loading.value = true;
    const fullUrl = targetUrl.value;
    
    const mockRes = calculateScore(
        fullUrl,
        {
            title: manualData.title,
            description: manualData.description,
            viewport: true,
            ogTags: { 'og:title': manualData.title }
        },
        {
            h1: manualData.h1 ? [manualData.h1] : [],
            h2: [],
            h3: []
        },
        manualData.imgCount,
        manualData.missingAlt,
        manualData.intLinks,
        2,
        [{ word: 'Simulation', count: 1 }]
    );

    setTimeout(() => {
        scanResult.value = mockRes;
        loading.value = false;
        showManualInput.value = false;
        fetchStatus.value = 'success';
    }, 1500);
}

function restoreFromHistory(item: any) {
    targetUrl.value = item.input.url;
    scanResult.value = item.result;
    fetchStatus.value = 'success';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openConsultation() {
    popup.openModal(Popups.CHAT_WA, { 
        initialMessage: `Halo Kang Jessy! Saya baru saja melakukan Advanced SEO Audit untuk website saya: ${targetUrl.value}. Skornya ${scanResult.value?.score}/100. Saya ingin diskusi strategi teknis yang mendalam agar website saya lebih SEO friendly.` 
    });
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s cubic-bezier(0.32, 0.72, 0, 1);
  max-height: 1200px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 10px;
}
</style>
