<template>
    <ToolLayout title="Advanced Palette Engineer"
        subtitle="Ekstrak palet warna profesional dari produk Anda & simulasikan identitas brand secara instan."
        badge="Enterprise Brand Tool" :history="history" @clear-history="clearHistory" @remove-entry="removeEntry"
        @restore="restoreFromHistory">

        <div class="space-y-8 pb-20">
            <!-- Navigation & Source Selection -->
            <div class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div class="flex flex-wrap items-center gap-1 p-1 bg-bg-secondary border border-border-color rounded-2xl shadow-sm w-full md:w-auto">
                    <button @click="activeTab = 'random'"
                        class="flex-1 md:flex-none px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-[clamp(0.6rem,1.8vw,0.7rem)] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        :class="activeTab === 'random' ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'text-text-tertiary hover:text-text-primary'">
                        <RefreshCw :size="14" :class="{ 'animate-spin': isSpinning }" class="shrink-0" />
                        Pengacak
                    </button>
                    <button @click="activeTab = 'image'"
                        class="flex-1 md:flex-none px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-[clamp(0.6rem,1.8vw,0.7rem)] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        :class="activeTab === 'image' ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'text-text-tertiary hover:text-text-primary'">
                        <Sparkles :size="14" class="shrink-0" />
                        Analisis AI
                    </button>
                </div>

                <div class="flex gap-3 shrink-0">
                    <BaseButton variant="secondary" @click="copyAllAs('hex')" class="h-12 px-6 rounded-xl border-border-color text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-widest shrink-0">
                        <Copy :size="14" class="mr-2" /> Salin Semua
                    </BaseButton>
                    <div class="relative group shrink-0">
                        <BaseButton variant="secondary" class="h-12 px-4 rounded-xl border-border-color shrink-0">
                            <Download :size="16" class="shrink-0" />
                        </BaseButton>
                        <div class="absolute top-full right-0 mt-2 bg-bg-secondary border border-border-color rounded-2xl p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col min-w-[160px] z-50">
                            <button @click="copyAllAs('css')" class="px-4 py-2.5 hover:bg-bg-tertiary rounded-xl text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-left text-text-secondary hover:text-accent-primary transition-colors shrink-0">Ekspor sebagai CSS</button>
                            <button @click="copyAllAs('tailwind')" class="px-4 py-2.5 hover:bg-bg-tertiary rounded-xl text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest text-left text-text-secondary hover:text-accent-primary transition-colors shrink-0">Ekspor sebagai Tailwind</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Interactive Area -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <!-- Left: Source Panel -->
                <div class="lg:col-span-4 space-y-6">
                    <div v-if="activeTab === 'image'" class="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                        <!-- Image Dropzone -->
                        <div @click="triggerFileInput" @dragover.prevent @drop.prevent="e => e.dataTransfer && processFile(e.dataTransfer.files[0])"
                            class="relative group cursor-pointer border-2 border-dashed border-border-color hover:border-accent-primary/50 transition-all rounded-[2.5rem] aspect-square flex flex-col items-center justify-center overflow-hidden bg-bg-secondary shadow-sm">
                            <input type="file" id="file-upload" class="hidden" accept="image/*" @change="handleFileUpload">
                            
                            <template v-if="!previewImage">
                                <div class="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center text-accent-primary mb-4 group-hover:scale-110 transition-transform shrink-0">
                                    <Upload :size="32" class="shrink-0" />
                                </div>
                                <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] font-black uppercase tracking-[0.2em] text-text-primary text-center px-4">Unggah Foto Produk</p>
                                <p class="text-[clamp(0.5rem,1.5vw,0.55rem)] text-text-tertiary mt-2 uppercase tracking-widest text-center">GESER & LEPAS ATAU KLIK</p>
                            </template>
                            
                            <img v-else :src="previewImage" class="absolute inset-0 w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700">
                            
                            <div v-if="previewImage" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] p-4 text-center">
                                <span class="bg-white text-black text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-xl shadow-xl">Ganti Gambar</span>
                            </div>

                            <div v-if="isScanning" class="absolute inset-0 bg-bg-secondary/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8">
                                <div class="relative w-16 h-16 mb-4 shrink-0">
                                    <div class="absolute inset-0 border-2 border-accent-primary/20 rounded-full"></div>
                                    <div class="absolute inset-0 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <p class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-[0.2em] text-accent-primary animate-pulse">Mengekstrak DNA Warna...</p>
                            </div>
                        </div>

                        <!-- URL Input -->
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-tertiary">
                                <LinkIcon :size="14" class="shrink-0" />
                            </div>
                            <input v-model="imageUrlInput" type="text" placeholder="https://link-foto-anda.com/img.jpg"
                                class="w-full bg-bg-secondary border border-border-color rounded-2xl py-5 pl-10 pr-24 text-[clamp(0.7rem,1.8vw,0.75rem)] focus:border-accent-primary outline-none transition-all shadow-sm"
                                @keyup.enter="handleUrlSubmit">
                            <button @click="handleUrlSubmit" class="absolute right-2 top-2 bottom-2 px-6 bg-linear-to-r from-accent-primary to-accent-secondary text-white text-[clamp(0.55rem,1.5vw,0.6rem)] font-black uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-accent-primary/20 shrink-0">
                                Ambil
                            </button>
                        </div>
                    </div>

                    <div v-else class="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                        <div class="bg-bg-secondary border border-border-color rounded-[2.5rem] p-10 text-center space-y-6 shadow-sm">
                            <div class="w-20 h-20 bg-accent-primary/10 rounded-3xl flex items-center justify-center text-accent-primary mx-auto shrink-0">
                                <RefreshCw :size="40" :class="{ 'animate-spin': isSpinning }" class="shrink-0" />
                            </div>
                            <div class="space-y-2">
                                <h4 class="text-[clamp(1rem,2.5vw,1.25rem)] font-black text-text-primary tracking-tight">Pengacak Cerdas</h4>
                                <p class="text-[clamp(0.75rem,2vw,0.8rem)] text-text-tertiary leading-relaxed">Gunakan algoritma kami untuk menemukan kombinasi warna yang harmonis.</p>
                            </div>
                            <BaseButton variant="primary" @click="generatePalette" class="w-full h-14 rounded-2xl font-black shadow-xl shadow-accent-primary/20 shrink-0">
                                Buat Vibe Baru
                            </BaseButton>
                        </div>
                    </div>
                </div>

                <!-- Right: Palette & Simulation Area -->
                <div class="lg:col-span-8 space-y-8">
                    
                    <!-- The Palette Display -->
                    <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
                        <div v-for="(color, index) in palette" :key="index"
                            class="group relative h-[100px] sm:h-[450px] rounded-[2rem] overflow-hidden border border-border-color/30 transition-all duration-500 shadow-sm"
                            :style="{ backgroundColor: color.hex }">
                            
                            <div class="absolute inset-0 flex flex-col items-center justify-between p-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
                                <button @click="toggleLock(index)" 
                                    class="p-3 rounded-full backdrop-blur-xl bg-white/20 border border-white/20 text-white shadow-lg active:scale-90 transition-all shrink-0">
                                    <Lock v-if="color.locked" :size="18" class="shrink-0" />
                                    <Unlock v-else :size="18" class="opacity-60 shrink-0" />
                                </button>
                                
                                <div class="absolute inset-x-0 bottom-6 flex flex-col items-center gap-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 px-4 w-full">
                                    <div class="text-center w-full">
                                        <p class="text-[clamp(0.5rem,1.5vw,0.55rem)] font-black tracking-widest text-white/50 uppercase mb-1">HEX CODE</p>
                                        <input v-model="color.hex" type="text" 
                                            class="w-full bg-transparent border-none text-white font-mono text-[clamp(1rem,2.5vw,1.125rem)] font-black tracking-wider text-center outline-none focus:ring-0 p-0 shadow-sm"
                                            @input="validateHex($event, index)">
                                    </div>
                                    <button @click="copyToClipboard(color.hex)" class="w-full py-4 rounded-2xl bg-white text-black text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                                        Salin
                                    </button>
                                </div>
                            </div>

                             <!-- Mobile Actions Bar (Hidden on Desktop) -->
                            <div class="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-linear-to-t from-black/20 to-transparent backdrop-blur-xs flex sm:hidden items-center justify-between gap-1 transition-all">
                                <button @click.stop="toggleLock(index)" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 active:bg-white/20 shrink-0">
                                    <Lock v-if="color.locked" :size="12" class="shrink-0" />
                                    <Unlock v-else :size="12" class="shrink-0" />
                                </button>
                                <input v-model="color.hex" type="text" 
                                    class="flex-1 min-w-0 bg-transparent border-none text-[clamp(0.55rem,1.5vw,0.6rem)] font-mono font-black text-white text-center outline-none p-0 focus:ring-0"
                                    @input="validateHex($event, index)">
                                <button @click.stop="copyToClipboard(color.hex)" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white active:bg-white/20 shrink-0">
                                    <Copy :size="12" class="shrink-0" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Identity Simulation -->
                    <div class="bg-bg-secondary md:border md:border-border-color rounded-none md:rounded-[3rem] p-0 md:p-10 space-y-10 md:shadow-sm">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 md:px-0 pt-8 md:pt-0">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                    <Monitor :size="24" class="shrink-0" />
                                </div>
                                <div class="min-w-0">
                                    <h4 class="text-[clamp(1rem,2.5vw,1.125rem)] font-black text-text-primary tracking-tight">Simulasi Identitas Brand</h4>
                                    <p class="text-[clamp(0.65rem,1.8vw,0.7rem)] text-text-tertiary">Lihat bagaimana warna Anda bekerja pada interface nyata.</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button @click="previewMode = previewMode === 'light' ? 'dark' : 'light'" 
                                    class="relative w-16 h-8 rounded-full transition-all duration-500 flex items-center px-1 shrink-0"
                                    :class="previewMode === 'dark' ? 'bg-slate-700' : 'bg-amber-100'">
                                    <div class="absolute inset-0 rounded-full opacity-20" :style="{ backgroundColor: palette[0]?.hex }"></div>
                                    <div class="w-6 h-6 rounded-full shadow-lg transform transition-all duration-500 flex items-center justify-center relative z-10"
                                        :class="previewMode === 'dark' ? 'translate-x-8 bg-slate-950 text-yellow-400' : 'translate-x-0 bg-white text-orange-500'">
                                        <Sun v-if="previewMode === 'light'" :size="14" :stroke-width="2.5" class="shrink-0" />
                                        <Moon v-else :size="14" :stroke-width="2.5" class="shrink-0" />
                                    </div>
                                </button>
                                <span class="text-[0.65rem] font-black uppercase tracking-widest text-text-tertiary hidden sm:inline">Mode {{ previewMode === 'light' ? 'Siang' : 'Malam' }}</span>
                            </div>
                        </div>

                        <!-- Real-time Mockup -->
                        <div class="rounded-3xl md:rounded-[2.5rem] border md:border border-border-color overflow-hidden transition-all duration-700 md:shadow-2xl" 
                            :class="previewMode === 'dark' ? 'bg-[#0a0a0b]' : 'bg-white'">
                            
                            <div class="p-6 md:p-16 space-y-10 md:space-y-12">
                                <div class="flex items-center justify-between gap-4">
                                    <div class="flex items-center gap-2">
                                        <div class="w-8 h-8 rounded-lg rotate-12 shrink-0 shadow-lg" :style="{ backgroundColor: palette[0]?.hex }"></div>
                                        <span class="text-[clamp(0.75rem,2vw,0.85rem)] font-black tracking-tight" :class="previewMode === 'dark' ? 'text-white' : 'text-gray-900'">BRAND<span :style="{ color: palette[0]?.hex }">GEN.</span></span>
                                    </div>
                                    <div class="flex md:hidden items-center gap-1 shrink-0">
                                        <div class="w-4 h-0.5" :class="previewMode === 'dark' ? 'bg-white/40' : 'bg-gray-400'"></div>
                                        <div class="w-4 h-0.5" :class="previewMode === 'dark' ? 'bg-white/40' : 'bg-gray-400'"></div>
                                    </div>
                                    <div class="hidden md:flex gap-6 shrink-0">
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest cursor-pointer" :class="previewMode === 'dark' ? 'text-white/40' : 'text-gray-400'">Produk</span>
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest cursor-pointer" :class="previewMode === 'dark' ? 'text-white/40' : 'text-gray-400'">Studio</span>
                                        <span class="text-[clamp(0.6rem,1.5vw,0.65rem)] font-black uppercase tracking-widest cursor-pointer" :class="previewMode === 'dark' ? 'text-white/40' : 'text-gray-400'">Kontak</span>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
                                    <div class="space-y-6 md:space-y-8 text-center md:text-left">
                                        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shrink-0 mx-auto md:mx-0" 
                                            :style="{ backgroundColor: palette[1]?.hex + '15', borderColor: palette[1]?.hex + '30', color: palette[1]?.hex }">
                                            <Sparkles :size="12" class="shrink-0" />
                                            <span class="text-[10px] font-black uppercase tracking-widest">DNA Baru Terdeteksi</span>
                                        </div>
                                        <h2 class="text-[clamp(1.5rem,5vw,2.5rem)] font-black tracking-tight leading-tight" :class="previewMode === 'dark' ? 'text-white' : 'text-slate-900'">
                                            Rancang <span :style="{ color: palette[0]?.hex }">Identitas Modern</span> dengan Presisi.
                                        </h2>
                                        <p class="text-[clamp(0.8rem,2.2vw,0.9rem)] leading-relaxed font-medium px-4 md:px-0" :class="previewMode === 'dark' ? 'text-white/60' : 'text-slate-500'">
                                            Membangun brand bukan cuma soal warna, tapi soal bagaimana warna tersebut hidup dalam interaksi digital Anda.
                                        </p>
                                        <div class="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4 shrink-0">
                                            <button class="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-xs text-white shadow-xl transition-all hover:scale-105 active:scale-95 shrink-0" 
                                                :style="{ backgroundColor: palette[0]?.hex, boxShadow: `0 20px 40px -10px ${palette[0]?.hex}40` }">
                                                Tombol Aksi Utama
                                            </button>
                                            <button class="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-xs border bg-transparent transition-all hover:bg-gray-500/5 shrink-0"
                                                :style="{ borderColor: palette[0]?.hex + '40', color: previewMode === 'dark' ? 'white' : 'slate-900' }">
                                                Aksi Sekunder
                                            </button>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-2 gap-3 md:gap-4">
                                        <div class="space-y-3 md:space-y-4">
                                            <div class="h-32 md:h-40 rounded-3xl p-5 md:p-6 flex flex-col justify-between" :style="{ backgroundColor: palette[1]?.hex }">
                                                <div class="w-8 h-8 rounded-full bg-white/20 shrink-0"></div>
                                                <p class="text-white font-black text-[10px] uppercase tracking-widest leading-none">Fitur Satu</p>
                                            </div>
                                            <div class="h-44 md:h-56 rounded-3xl p-5 md:p-6 border flex flex-col justify-end" :style="{ borderColor: palette[0]?.hex + '30' }">
                                                <p class="font-black text-[10px] uppercase tracking-widest leading-none" :class="previewMode === 'dark' ? 'text-white' : 'text-slate-900'">Minimalisme</p>
                                            </div>
                                        </div>
                                        <div class="pt-8 md:pt-12 space-y-3 md:space-y-4">
                                            <div class="h-44 md:h-56 rounded-3xl p-5 md:p-6 flex flex-col justify-end overflow-hidden relative" :class="previewMode === 'dark' ? 'bg-white/5 border border-white/5' : 'bg-slate-50 border border-slate-100'">
                                                <div class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-40 shrink-0" :style="{ backgroundColor: palette[2]?.hex }"></div>
                                                <p class="font-black text-[10px] uppercase tracking-widest relative z-10 leading-none" :class="previewMode === 'dark' ? 'text-white' : 'text-slate-900'">Gradasi</p>
                                            </div>
                                            <div class="h-32 md:h-40 rounded-3xl p-5 md:p-6 flex flex-col justify-between" :style="{ backgroundColor: palette[2]?.hex }">
                                                <div class="flex -space-x-2 shrink-0">
                                                    <div v-for="i in 3" :key="i" class="w-6 h-6 rounded-full border-2 border-white/20 bg-white/10 shrink-0"></div>
                                                </div>
                                                <p class="text-white font-black text-[10px] uppercase tracking-widest leading-none">User</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Lead Magnet -->
                        <div class="bg-linear-to-br from-accent-primary to-accent-secondary rounded-3xl md:rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group mt-4 md:mt-12 text-center md:text-left mx-2 md:mx-0">
                            <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000"></div>
                            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div class="space-y-3 flex-1">
                                    <h3 class="text-2xl md:text-3xl font-black tracking-tight">Butuh Brand Kit Professional?</h3>
                                    <p class="text-sm text-white/80 leading-relaxed max-w-xl">
                                        Palet ini adalah awal yang bagus. Ayo buat brand Anda tak terlupakan dengan strategi visual yang konsisten.
                                    </p>
                                </div>
                                <BaseButton variant="secondary" class="w-full md:w-auto h-16 px-10 rounded-2xl font-black text-[13px] tracking-widest uppercase shadow-2xl transition-all shrink-0" @click="consultBrand">
                                    Konsultasi Gratis
                                </BaseButton>
                            </div>
                        </div>
                    </div>

                    <!-- Intelligence Insights (Psikologi Brand) -->
                    <div v-if="moodboardAnalysis" class="md:bg-linear-to-br from-bg-secondary to-bg-tertiary md:border md:border-border-color rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 space-y-6 md:shadow-sm relative overflow-hidden group">
                        <div class="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform hidden md:block">
                            <BrainCircuit :size="120" />
                        </div>
                        <div class="relative z-10 space-y-6">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                                    <Sparkles :size="20" class="shrink-0" />
                                </div>
                                <h5 class="text-[clamp(0.7rem,2vw,0.75rem)] font-black uppercase tracking-[0.2em] text-text-tertiary">Psikologi Brand</h5>
                            </div>
                            <div class="space-y-3">
                                <span class="inline-block text-[10px] font-black py-1.5 px-4 bg-accent-primary/10 text-accent-primary rounded-full uppercase tracking-widest shrink-0">{{ moodboardAnalysis.vibe }}</span>
                                <h4 class="text-[clamp(1.25rem,4vw,1.5rem)] font-black text-text-primary tracking-tight leading-tight">{{ moodboardAnalysis.title }}</h4>
                            </div>
                            <p class="text-[clamp(0.85rem,2.2vw,0.9rem)] text-text-secondary leading-relaxed italic border-l-4 border-accent-primary/20 pl-6">"{{ moodboardAnalysis.desc }}"</p>
                            
                            <div class="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div v-for="point in moodboardAnalysis.points" :key="point" class="flex items-start gap-3 bg-bg-tertiary/40 p-4 rounded-2xl border border-border-color/50">
                                    <Check :size="16" class="text-green-500 shrink-0 mt-0.5" />
                                    <p class="text-[11px] text-text-tertiary font-bold leading-snug">{{ point }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Welcome/Empty State -->
            <div v-if="palette.length === 0" class="flex flex-col items-center justify-center py-32 text-center select-none">
                <div class="w-24 h-24 bg-accent-primary/10 rounded-[2.5rem] flex items-center justify-center text-accent-primary mb-8 shrink-0">
                    <Palette :size="48" class="shrink-0" />
                </div>
                <h3 class="text-2xl font-black text-text-primary mb-4 tracking-tight">Mulai Engineering Brand Anda.</h3>
                <p class="text-xs text-text-tertiary max-w-md leading-relaxed mb-12 uppercase tracking-widest px-4">Generate warna random atau biarkan AI kami menganalisa foto produk Anda.</p>
            </div>
        </div>

        <!-- Education Content -->
        <template #education>
            <div class="space-y-10 py-4">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                    <div class="md:col-span-12 space-y-4 text-center md:text-left">
                        <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-lg text-[10px] font-black uppercase tracking-widest font-mono shrink-0">
                            Arsitektur Warna
                        </div>
                        <h4 class="text-2xl font-black text-text-primary tracking-tight">Kekuatan Psikologi di Balik Hex Code.</h4>
                        <p class="text-sm leading-relaxed text-text-secondary max-w-2xl mx-auto md:mx-0">
                            Dalam dunia digital, warna bukan sekadar estetika. Warna adalah cara otak kita memproses emosi sebelum membaca kata-kata.
                        </p>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div class="p-8 bg-bg-secondary rounded-3xl border border-border-color space-y-4 hover:-translate-y-2 transition-transform">
                        <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0"><ShieldCheck :size="24" class="shrink-0" /></div>
                        <h5 class="text-[10px] font-black uppercase tracking-widest text-text-primary">Kepercayaan</h5>
                        <p class="text-xs text-text-tertiary leading-relaxed font-medium">Warna Biru dan Navy sering digunakan oleh institusi keuangan untuk memberikan kesan stabil dan aman.</p>
                    </div>
                    <div class="p-8 bg-bg-secondary rounded-3xl border border-border-color space-y-4 hover:-translate-y-2 transition-transform">
                        <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0"><Zap :size="24" class="shrink-0" /></div>
                        <h5 class="text-[10px] font-black uppercase tracking-widest text-text-primary">Energi</h5>
                        <p class="text-xs text-text-tertiary leading-relaxed font-medium">Warna Oranye memicu aksi cepat dan memberikan kesan ramah serta enerjik.</p>
                    </div>
                    <div class="p-8 bg-bg-secondary rounded-3xl border border-border-color space-y-4 hover:-translate-y-2 transition-transform">
                        <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0"><Sparkles :size="24" class="shrink-0" /></div>
                        <h5 class="text-[10px] font-black uppercase tracking-widest text-text-primary">Kemewahan</h5>
                        <p class="text-xs text-text-tertiary leading-relaxed font-medium">Ungu Gelap dan Hitam Matte memberikan kesan elegan, premium, dan futuristik.</p>
                    </div>
                </div>
            </div>
        </template>

        <!-- Custom History Item -->
        <template #history-item="{ item }">
            <div class="flex items-center gap-4 group">
                <div class="flex -space-x-3 shrink-0">
                    <div v-for="(hex, i) in item.input.palette" :key="i"
                        class="w-10 h-10 rounded-full border-4 border-bg-secondary shadow-sm shrink-0" :style="{ backgroundColor: hex }">
                    </div>
                </div>
                <div class="flex flex-col min-w-0">
                    <span class="text-xs font-black text-text-primary group-hover:text-accent-primary transition-colors truncate">{{ item.input.name }}</span>
                    <span class="text-[10px] text-text-tertiary font-mono truncate">{{ item.input.palette.join(', ') }}</span>
                </div>
            </div>
        </template>
    </ToolLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
    RefreshCw, Lock, Unlock, Copy, Download,
    Check, Upload, Sparkles, BrainCircuit, Link as LinkIcon,
    Monitor, Palette, ShieldCheck, Zap, Sun, Moon
} from 'lucide-vue-next';
import ToolLayout from '@/components/ToolLayout.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useToolHistory } from '@/composables/useToolHistory';
import { useToast } from '@/composables/useToast';
import { usePopupManager, Popups } from '@/composables/usePopupManager';

interface Color {
    hex: string;
    locked: boolean;
}

// State
const activeTab = ref<'random' | 'image'>('random');
const palette = ref<Color[]>([]);
const isSpinning = ref(false);
const isScanning = ref(false);
const previewImage = ref<string | null>(null);
const imageUrlInput = ref('');
const uploadError = ref<string | null>(null);
const previewMode = ref<'light' | 'dark'>('dark');

const { history, addEntry, removeEntry, clearHistory } = useToolHistory('palette-v2');
const { success } = useToast();
const popup = usePopupManager();

// Computed for Moodboard Analysis
const moodboardAnalysis = computed(() => {
    if (palette.value.length === 0) return null;

    const colors = palette.value.map(c => c.hex);
    const isDark = colors.every(hex => isColorDark(hex));
    const isPastel = colors.every(hex => {
        const rgb = hexToRgb(hex);
        return rgb && (rgb.r > 200 || rgb.g > 200 || rgb.b > 200);
    });

    if (isDark) return {
        title: 'Infinite Darkness',
        desc: 'Palet ini memancarkan aura futuristik, teknologi tinggi, dan eksklusivitas. Cocok untuk produk yang ingin terlihat "High-End".',
        vibe: 'Premium Techno',
        points: ['Konsep Dark UI Modern', 'Visual Fokus & Tajam', 'Inspirasi Cyber-Luxury']
    };

    if (isPastel) return {
        title: 'Soft Minimalist',
        desc: 'Warna-warna ini sangat ramah di mata, memberikan kenyamanan psikologis, dan perasaan transparan.',
        vibe: 'Friendly & Clean',
        points: ['Aksesibilitas Tinggi', 'Kesan Welcoming', 'Desain Ergonomis']
    };

    return {
        title: 'High Dynamic Range',
        desc: 'Komposisi yang berani dengan kontras yang kuat. Memastikan elemen penting dalam brand Anda terlihat seketika.',
        vibe: 'Dinamis & Berani',
        points: ['Pemicu Konversi Tinggi', 'Identitas Karakter Kuat', 'Navigasi yang Jelas']
    };
});

// Helpers
function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16)
    } : null;
}

function isColorDark(hex: string) {
    const rgb = hexToRgb(hex);
    if (!rgb) return false;
    const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
    return yiq < 128;
}

const rgbToHex = (r: number, g: number, b: number) => {
    return ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
};

function validateHex(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    let val = input.value.toUpperCase();
    
    // Ensure starts with #
    if (val && !val.startsWith('#')) val = '#' + val;
    
    // Limit length (e.g. #FFFFFF)
    if (val.length > 7) val = val.substring(0, 7);
    
    // Allow only hex chars
    val = val.replace(/[^#0-9A-F]/g, '');
    
    // Update local state and input value
    if (palette.value[index]) {
        palette.value[index]!.hex = val;
    }
}

// Actions
const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) processFile(file);
};

const triggerFileInput = () => {
    document.getElementById('file-upload')?.click();
};

const processFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        uploadError.value = 'Format file harus gambar.';
        return;
    }
    uploadError.value = null;
    isScanning.value = true;
    const reader = new FileReader();
    reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
            previewImage.value = result;
            extractColorsFromImage(result);
        }
    };
    reader.readAsDataURL(file);
};

const handleUrlSubmit = () => {
    if (!imageUrlInput.value) return;
    if (!imageUrlInput.value.startsWith('http')) {
        uploadError.value = 'URL tidak valid.';
        return;
    }
    uploadError.value = null;
    isScanning.value = true;
    extractColorsFromImage(imageUrlInput.value);
    imageUrlInput.value = '';
};

const extractColorsFromImage = (imageSrc: string) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    const finalize = (imgElement: HTMLImageElement) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const scale = Math.min(200 / imgElement.width, 200 / imgElement.height);
        canvas.width = imgElement.width * scale;
        canvas.height = imgElement.height * scale;
        ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorCounts: Record<string, number> = {};

        for (let i = 0; i < imageData.length; i += 16) {
            const r = imageData[i]!; const g = imageData[i+1]!; const b = imageData[i+2]!;
            const qr = Math.round(r / 20) * 20; const qg = Math.round(g / 20) * 20; const qb = Math.round(b / 20) * 20;
            const hex = "#" + rgbToHex(qr, qg, qb);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            if (brightness > 20 && brightness < 240) {
                colorCounts[hex] = (colorCounts[hex] || 0) + 1;
            }
        }

        const sorted = Object.entries(colorCounts).sort((a,b) => b[1] - a[1]).slice(0, 5).map(e => e[0]);
        while (sorted.length < 5) sorted.push(generateRandomHex());
        
        palette.value = sorted.map(hex => ({ hex, locked: false }));
        addEntry({ palette: sorted, name: `AI Extract ${formatDateShort(Date.now())}` }, sorted);
        isScanning.value = false;
    };

    img.onerror = async () => {
        try {
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageSrc)}`;
            const response = await fetch(proxyUrl);
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const proxyImg = new Image();
            proxyImg.onload = () => {
                previewImage.value = objectUrl;
                finalize(proxyImg);
            };
            proxyImg.src = objectUrl;
        } catch {
            isScanning.value = false;
            uploadError.value = 'Security: Access Blocked.';
        }
    };

    img.onload = () => {
        previewImage.value = imageSrc;
        finalize(img);
    };
    img.src = imageSrc;
};

const generateRandomHex = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

const generatePalette = () => {
    isSpinning.value = true;
    if (palette.value.length === 0) {
        for (let i = 0; i < 5; i++) {
            palette.value.push({ hex: generateRandomHex(), locked: false });
        }
    } else {
        palette.value = palette.value.map(color => ({
            ...color,
            hex: color.locked ? color.hex : generateRandomHex()
        }));
    }
    const hexes = palette.value.map(c => c.hex);
    addEntry({ palette: hexes, name: `Engineered ${formatDateShort(Date.now())}` }, hexes);
    setTimeout(() => { isSpinning.value = false; }, 400);
};

const toggleLock = (index: number) => {
    palette.value[index]!.locked = !palette.value[index]!.locked;
};

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    success(`DNA Berhasil Disalin: ${text}`);
};

const copyAllAs = (format: 'hex' | 'css' | 'tailwind') => {
    const colors = palette.value.map(c => c.hex);
    let text = colors.join(', ');
    if (format === 'css') text = colors.map((hex, i) => `--color-brand-${i + 1}: ${hex};`).join('\n');
    if (format === 'tailwind') text = colors.map((hex, i) => `brand-${i + 1}: '${hex}',`).join('\n');
    copyToClipboard(text);
};

const restoreFromHistory = (item: any) => {
    palette.value = item.input.palette.map((hex: string) => ({ hex, locked: false }));
};

const formatDateShort = (timestamp: number) => {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(timestamp));
};

function consultBrand() {
    popup.openModal(Popups.CHAT_WA, { 
        initialMessage: `Halo Kang Jessy! Saya baru saja menggunakan Advanced Palette Engineer. Saya punya palet warna pilihan: ${palette.value.map(c => c.hex).join(', ')}. Saya tertarik untuk membuat Brand Kit professional untuk bisnis saya.` 
    });
}

onMounted(() => { if (palette.value.length === 0) generatePalette(); });
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
</style>
