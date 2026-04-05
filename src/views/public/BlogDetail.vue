<template>
    <div class="bg-bg-primary min-h-screen">
        <div v-if="loading" class="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary pointer-events-auto">
            <div
                class="w-10 h-10 border-4 border-bg-secondary border-t-accent-primary rounded-full animate-spin shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]">
            </div>
        </div>

        <template v-else-if="post">

            <!-- Article Header -->
            <header class="relative pt-[120px] pb-10 md:pt-[180px] md:pb-[60px] overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-[450px] z-0">
                    <img :src="post.mainImage" alt="Hero Background" class="w-full h-full object-cover">
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,12,0.7)] via-bg-primary/50 to-bg-primary">
                    </div>
                </div>

                <div class="container max-w-[800px] mx-auto px-6">
                    <div
                        class="relative z-10 flex items-center gap-2.5 mb-6 text-[clamp(0.8rem,1.5vw,0.85rem)] text-text-tertiary font-semibold">
                        <router-link to="/blog" class="hover:text-white transition-colors">Blog</router-link>
                        <span>/</span>
                        <span class="text-accent-primary">{{ post.categories?.[0] || 'Agency' }}</span>
                    </div>

                    <div class="relative z-10 mt-10">
                        <span
                            class="inline-block bg-accent-primary text-white px-4 py-1.5 rounded-full text-[clamp(0.75rem,1.5vw,0.8rem)] font-bold mb-6 shadow-lg shadow-accent-primary/20">
                            {{ post.categories?.[0] || 'Agency' }}
                        </span>
                        <h1
                            class="text-[2.2rem] md:text-[clamp(2rem,5vw,3.5rem)] font-black text-text-primary leading-[1.2] md:leading-[1.1] mb-8 tracking-[-0.02em]">
                            {{ post.title }}
                        </h1>

                        <div
                            class="flex flex-col md:flex-row justify-between md:items-center pb-10 border-b border-border-color gap-5 md:gap-0">
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-extrabold shadow-lg shrink-0">
                                    {{ getAuthorInitials(post.author) }}
                                </div>
                                <div class="flex flex-col">
                                    <span class="block font-bold text-text-primary">{{ post.author }}</span>
                                    <span class="text-[clamp(0.85rem,1.5vw,0.9rem)] text-text-secondary">
                                        {{ formatDate(post.publishedAt) }} • {{ post.readTime || '4 min read' }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex gap-3">
                                <button @click="shareOnTwitter" title="Twitter"
                                    class="w-10 h-10 rounded-full bg-bg-secondary border border-border-color text-text-secondary flex items-center justify-center transition-all hover:border-accent-primary hover:text-accent-primary hover:bg-bg-primary active:scale-95 cursor-pointer shrink-0">
                                    <Twitter :size="18" class="shrink-0" />
                                </button>
                                <button @click="shareOnLinkedIn" title="LinkedIn"
                                    class="w-10 h-10 rounded-full bg-bg-secondary border border-border-color text-text-secondary flex items-center justify-center transition-all hover:border-accent-primary hover:text-accent-primary hover:bg-bg-primary active:scale-95 cursor-pointer shrink-0">
                                    <LinkedinIcon :size="18" class="shrink-0" />
                                </button>
                                <button @click="shareOnWhatsApp" title="WhatsApp"
                                    class="w-10 h-10 rounded-full bg-bg-secondary border border-border-color text-text-secondary flex items-center justify-center transition-all hover:border-accent-primary hover:text-accent-primary hover:bg-bg-primary active:scale-95 cursor-pointer shrink-0">
                                    <WhatsAppIcon :size="18" class="shrink-0" />
                                </button>
                                <button @click="copyLink" title="Salin Link"
                                    class="w-10 h-10 rounded-full bg-bg-secondary border border-border-color text-text-secondary flex items-center justify-center transition-all hover:border-accent-primary hover:text-accent-primary hover:bg-bg-primary active:scale-95 cursor-pointer shrink-0">
                                    <Copy :size="18" class="shrink-0" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Toast Notification -->
            <Teleport to="body">
                <Transition enter-active-class="transform ease-out duration-300 transition"
                    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                    leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <div v-if="showToast"
                        class="fixed bottom-5 right-5 z-[3000] flex items-center gap-3 bg-bg-secondary border border-accent-primary/50 text-text-primary px-5 py-3 rounded-xl shadow-2xl shadow-accent-primary/10">
                        <CheckCircle2 :size="18" class="text-accent-primary shrink-0" />
                        <span class="font-bold text-sm">{{ toastMessage }}</span>
                    </div>
                </Transition>
            </Teleport>

            <!-- Image Lightbox -->
            <Teleport to="body">
                <Transition
                    enter-active-class="transition-opacity duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-opacity duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-if="lightboxImage" 
                        class="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                        @click="lightboxImage = null">
                        <button class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm" @click.stop="lightboxImage = null">
                            <X :size="24" />
                        </button>
                        <img :src="lightboxImage" class="max-w-full max-h-full object-contain cursor-default select-none" @click.stop />
                    </div>
                </Transition>
            </Teleport>

            <!-- Table of Contents Component -->
            <TableOfContents v-if="enableTableOfContents" :items="tableOfContents" :is-visible="tocVisible"
                @navigate="scrollToSection" />

            <!-- Article Body -->
            <main class="py-[40px] md:py-[60px] pb-[120px]">
                <div class="container max-w-[800px] mx-auto px-6">
                    <!-- Inline Table of Contents (Shows first, triggers sidebar when scrolled past) -->
                    <div v-if="enableTableOfContents && tableOfContents.length > 0" ref="inlineTocRef"
                        class="mb-12 md:mb-16">
                        <div class="bg-bg-secondary/50 border border-border-color rounded-2xl p-6 md:p-8">
                            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-border-color">
                                <List :size="20" class="text-accent-primary shrink-0" />
                                <h4 class="text-lg font-bold text-text-primary">Daftar Isi Article</h4>
                            </div>
                            <nav class="flex flex-col gap-3">
                                <a v-for="item in tableOfContents" :key="item.id"
                                    @click.prevent="scrollToSection(item.id)" :href="`#${item.id}`"
                                    class="text-text-secondary hover:text-accent-primary transition-colors text-[0.95rem] md:text-base leading-relaxed cursor-pointer"
                                    :class="{ 'pl-4 border-l border-border-color': item.level === 3 }">
                                    {{ item.text }}
                                </a>
                            </nav>
                        </div>
                    </div>

                    <article class="prose prose-invert prose-lg max-w-none mb-20">
                        <!-- Support both PortableText and HTML from RichEditor (Priority to Dashboard Content) -->
                        <div v-if="post.content" v-html="processedContentHTML" class="rich-content prose prose-invert prose-lg max-w-none"></div>
                        <template v-else-if="post.body && post.body.length">
                            <PortableText :value="post.body" :components="portableTextComponents" />
                        </template>
                    </article>

                    <!-- Article Footer -->
                    <footer class="mt-20 pt-[60px] border-t border-border-color">
                        <div class="flex flex-wrap gap-3 mb-[60px]">
                            <span v-for="tag in post.tags" :key="tag"
                                class="text-[0.9rem] text-accent-primary bg-accent-primary/10 px-3.5 py-1.5 rounded-full font-semibold">
                                #{{ tag }}
                            </span>
                        </div>

                        <!-- Sharing Box -->
                        <div class="bg-bg-secondary p-8 md:p-10 rounded-[32px] border border-border-color mb-[60px]">
                            <h3 class="text-xl font-bold text-text-primary mb-6">Bagikan artikel ini:</h3>
                            <div class="flex flex-wrap gap-4">
                                <button @click="shareOnTwitter"
                                    class="px-6 py-3 rounded-full border border-border-color bg-bg-primary text-text-primary font-bold flex items-center gap-2.5 transition-all hover:border-accent-primary hover:bg-bg-secondary hover:-translate-y-0.5 cursor-pointer w-full md:w-auto justify-center">
                                    <Twitter :size="18" class="shrink-0" /> Twitter
                                </button>
                                <button @click="shareOnLinkedIn"
                                    class="px-6 py-3 rounded-full border border-border-color bg-bg-primary text-text-primary font-bold flex items-center gap-2.5 transition-all hover:border-accent-primary hover:bg-bg-secondary hover:-translate-y-0.5 cursor-pointer w-full md:w-auto justify-center">
                                    <LinkedinIcon :size="18" class="shrink-0" /> LinkedIn
                                </button>
                                <button @click="shareOnWhatsApp"
                                    class="px-6 py-3 rounded-full border border-border-color bg-bg-primary text-text-primary font-bold flex items-center gap-2.5 transition-all hover:border-accent-primary hover:bg-bg-secondary hover:-translate-y-0.5 cursor-pointer w-full md:w-auto justify-center">
                                    <WhatsAppIcon :size="18" class="shrink-0" /> WhatsApp
                                </button>
                                <button @click="copyLink"
                                    class="px-6 py-3 rounded-full border border-border-color bg-bg-primary text-text-primary font-bold flex items-center gap-2.5 transition-all hover:border-accent-primary hover:bg-bg-secondary hover:-translate-y-0.5 cursor-pointer w-full md:w-auto justify-center">
                                    <Copy :size="18" class="shrink-0" /> Salin Link
                                </button>
                            </div>
                        </div>

                        <!-- AI Concierge CTA -->
                        <!-- <div
                            class="bg-gradient-to-br from-accent-primary/10 to-accent-primary/2 border border-accent-primary/20 rounded-[32px] p-8 md:p-10 mb-8 text-center text-bg-primary">
                            <div class="mb-5">
                                <div
                                    class="inline-flex items-center gap-2 bg-accent-primary text-white px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
                                    <BotIcon :size="16" class="shrink-0" />
                                    <span>AI Assistant</span>
                                </div>
                                <h3 class="text-[1.8rem] font-bold text-text-primary">Tanya KangJessy AI</h3>
                            </div>
                            <p class="text-text-secondary text-[1.1rem] max-w-[500px] mx-auto mb-8">
                                Bingung atau ingin tahu lebih dalam soal <strong>"{{ post.title }}"</strong>? Ngobrol
                                bareng asisten pintar kami.
                            </p>
                            <div class="flex flex-col items-center gap-4">
                                <button @click="chatWithAI"
                                    class="w-full max-w-[320px] bg-[#0088cc] text-white border-0 py-4 rounded-2xl font-extrabold text-[1.1rem] cursor-pointer transition-all hover:bg-[#0077b5] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0088cc]/30 shadow-md">
                                    Mulai Tanya AI
                                </button>
                                <button @click="consultOnWhatsApp"
                                    class="bg-transparent border-0 text-text-tertiary text-[0.85rem] cursor-pointer font-bold hover:text-text-primary transition-colors flex items-center gap-2">
                                    <WhatsAppIcon :size="16" />
                                    Tanya WhatsApp (Diskusi Langsung)
                                </button>
                            </div>
                        </div> -->

                        <!-- WhatsApp Professional Consultation CTA -->
                        <!-- <div class="text-center mb-[60px]">
                            <p class="text-[0.9rem] text-text-tertiary">
                                Mau langsung eksekusi project?
                                <span @click="consultOnWhatsApp"
                                    class="text-[#25D366] font-bold cursor-pointer inline-flex items-center gap-1 ml-1 hover:underline">
                                    Chat Konsultasi Sekarang
                                    <WhatsAppIcon :size="14" class="shrink-0" />
                                </span>
                            </p>
                        </div> -->

                        <!-- CTA Ebook Vibe Coding -->
                        <div v-if="showLeadMagnet" class="bg-gradient-to-r from-accent-primary to-accent-secondary p-[2px] rounded-[32px] relative overflow-hidden mt-8">
                            <!-- Background accent -->
                            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)]" style="background-size: 20px 20px;"></div>
                            
                            <div class="bg-bg-primary px-8 py-10 md:px-10 md:py-16 rounded-[30px] text-center relative z-10">
                                <div
                                    class="w-16 h-16 bg-accent-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent-primary shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.3)]">
                                    <BookOpen :size="32" class="shrink-0" />
                                </div>
                                <div class="inline-flex items-center gap-2 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary px-3 py-1.5 rounded-lg text-xs font-bold mb-4 max-w-fit uppercase tracking-wider mx-auto">
                                    <BotIcon :size="14" class="text-accent-primary" /> Khusus 100 Pengunduh Pertama
                                </div>
                                <h2 class="text-2xl md:text-[2rem] font-bold mb-4 text-text-primary tracking-tight leading-tight">
                                    Gratis: E-Book Vibe Coding Masterclass 2026</h2>
                                <p class="text-text-secondary mb-8 max-w-xl mx-auto text-[0.95rem] md:text-lg leading-relaxed">
                                    Pelajari cara bikin website sampai punya dashboard mandiri & deploy tanpa bayar hosting sepeserpun. Menggunakan Antigravity IDE dipadukan dengan Gemini & Claude AI.
                                </p>

                                <form @submit.prevent="handleLeadMagnet"
                                    class="max-w-md mx-auto relative flex flex-col items-center">
                                    <div class="relative w-full flex items-center drop-shadow-xl">
                                        <Mail class="absolute left-4 text-text-tertiary" :size="20" />
                                        <input v-model="leadEmail" type="email"
                                            placeholder="Masukkan email untuk download..." required
                                            class="w-full pl-12 pr-40 py-4 bg-bg-secondary border border-border-color rounded-2xl outline-none text-text-primary placeholder:text-text-tertiary focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all font-medium shadow-inner" />
                                        <button type="submit" :disabled="submittingLead"
                                            class="absolute right-2 top-2 bottom-2 px-6 bg-accent-primary hover:bg-accent-secondary text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
                                            <Loader2 v-if="submittingLead" class="animate-spin" :size="18" />
                                            <template v-else>
                                                <Download :size="16" />
                                                <span>Download</span>
                                            </template>
                                        </button>
                                    </div>
                                    <button @click.prevent="showEbookPreview = true" type="button" class="mt-5 text-sm font-bold text-accent-primary hover:text-white transition-colors cursor-pointer border-b border-dashed border-accent-primary/50 pb-0.5">
                                        Intip Cover & Daftar Isi E-book →
                                    </button>
                                </form>
                            </div>
                        </div>

                        <!-- E-Book Preview Popup via BottomSheet -->
                        <BottomSheet
                            :modelValue="showEbookPreview"
                            title="Preview E-Book"
                            :icon="BookOpen"
                            maxWidth="5xl"
                            contentClass="!overflow-hidden !p-0"
                            fullHeight
                            @update:modelValue="showEbookPreview = $event"
                            @close="showEbookPreview = false"
                        >
                            <!-- Content Modal Split -->
                            <div class="flex flex-col md:grid md:grid-cols-12 bg-bg-primary h-[calc(100dvh-120px)] md:h-[700px] md:max-h-[85vh] overflow-y-auto md:overflow-hidden custom-scrollbar">
                                
                                <!-- Left Column: Cover & Form (Sticky in desktop) -->
                                <div class="md:col-span-5 lg:col-span-4 bg-bg-secondary/40 md:border-r border-b md:border-b-0 border-border-color p-8 pb-16 md:pb-24 flex flex-col gap-6 md:h-full md:overflow-y-auto custom-scrollbar shrink-0">
                                    
                                    <!-- Cover Design -->
                                    <div class="w-full max-w-[280px] md:max-w-full mx-auto aspect-[3/4] shrink-0 rounded-2xl relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 group">
                                        <!-- Dark Tech Background Image -->
                                        <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Cover Background" />
                                        <div class="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-accent-primary/30 to-black z-10"></div>
                                        
                                        <!-- Text Overlay -->
                                        <div class="absolute inset-0 z-20 flex flex-col p-6 items-center text-center">
                                            <div class="w-full text-left pt-2">
                                                <div class="inline-block bg-accent-primary text-white text-[0.6rem] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">Masterclass</div>
                                            </div>
                                            <div class="flex-1 flex flex-col items-center justify-center -mt-6">
                                                <BotIcon :size="56" class="text-white drop-shadow-[0_0_15px_rgba(var(--accent-primary-rgb),0.8)] mb-4"/>
                                                <h4 class="text-white font-black text-4xl leading-[0.9] tracking-tighter drop-shadow-lg">VIBE<br/>CODING</h4>
                                                <div class="w-12 h-1 bg-accent-primary mt-6 mb-4 shadow-[0_0_10px_var(--accent-primary)]"></div>
                                                <span class="text-[0.7rem] text-white/80 font-semibold uppercase tracking-[0.2em] px-4 leading-relaxed">Website & Dashboard<br/>Deployment Playbook</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Rating/Downloads -->
                                    <div class="flex items-center justify-between mx-1 pb-4 border-b border-border-color/50">
                                        <div class="flex items-center gap-1.5 text-yellow-400">
                                            <span class="text-sm">⭐️⭐️⭐️⭐️⭐️</span>
                                            <span class="text-xs text-text-tertiary ml-1">(4.9/5)</span>
                                        </div>
                                        <div class="flex items-center gap-1.5 text-text-secondary">
                                            <Users :size="14"/>
                                            <span class="text-[0.8rem] font-bold">4,850+ Unduhan</span>
                                        </div>
                                    </div>

                                    <!-- Form Insight -->
                                    <div class="flex flex-col gap-4">
                                        <div>
                                            <span class="text-[0.65rem] font-black uppercase tracking-[0.2em] text-accent-primary mb-2 block">Dapatkan Secara Gratis</span>
                                            <h4 class="text-white font-bold leading-tight mb-2">Akses PDF Sekarang</h4>
                                        </div>
                                        <form @submit.prevent="handleLeadMagnet" class="flex flex-col gap-3">
                                            <div class="relative w-full text-left">
                                                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" :size="18" />
                                                <input v-model="leadEmail" type="email" placeholder="Email aktif kamu..." required
                                                    class="w-full pl-11 pr-4 py-3.5 bg-bg-primary/80 border border-border-color rounded-xl outline-none text-text-primary text-sm placeholder:text-text-tertiary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary" />
                                            </div>
                                            <button type="submit" :disabled="submittingLead"
                                                class="w-full py-3.5 bg-accent-primary hover:bg-accent-secondary text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-accent-primary/20 flex justify-center items-center gap-2">
                                                <Loader2 v-if="submittingLead" class="animate-spin" :size="18" />
                                                <span v-else>Kirim ke Email Saya</span>
                                            </button>
                                        </form>
                                        <p class="text-[0.65rem] text-text-tertiary text-center leading-relaxed">Pesan dikirim aman tanpa SPAM. Pastikan inbox/promosi di cek ya.</p>
                                    </div>
                                    <!-- Spacer Support -->
                                    <div class="h-8 md:h-12 w-full shrink-0"></div>
                                </div>

                                <!-- Right Column: Details & Syllabus (Scrollable) -->
                                <div class="md:col-span-7 lg:col-span-8 p-6 md:p-10 flex flex-col gap-8 flex-1 md:h-full md:overflow-y-auto custom-scrollbar pb-20 md:pb-24">
                                    
                                    <!-- Main Heading -->
                                    <div class="shrink-0 relative">
                                        <div class="flex flex-wrap items-end gap-3 mb-3">
                                            <span class="text-[2rem] md:text-[2.5rem] font-black text-accent-primary leading-none">GRATIS</span>
                                            <span class="text-lg text-text-tertiary line-through font-bold mb-1.5">Rp 200.000</span>
                                        </div>
                                        <div class="inline-flex items-center gap-2 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary px-3 py-1.5 rounded-lg text-xs font-bold mb-5 max-w-fit uppercase tracking-wider">
                                            <BotIcon :size="14" class="text-accent-primary" /> Khusus 100 Pengunduh Pertama
                                        </div>
                                        <h3 class="text-3xl font-black text-white leading-tight mb-4 tracking-tight">Membangun Web & Dashboard Tanpa Modal Hosting</h3>
                                        <p class="text-[0.95rem] md:text-base text-text-secondary leading-relaxed mb-6">Buku panduan revolusioner yang akan mengubah cara kamu mendevelop sistem. Pemula sekalipun dapat merancang, coding, dan merilis produk digital berstandar industri dengan bantuan "AI Engineers" cerdas, sepenuhnya gratis tanpa cicilan hosting per bulan.</p>
                                    </div>

                                    <!-- Tech Stack Badges -->
                                    <div class="shrink-0 flex flex-col gap-3">
                                        <span class="text-[0.65rem] font-black text-text-tertiary uppercase tracking-[0.2em]">Tech Stack yang Digunakan:</span>
                                        <div class="flex flex-wrap gap-2">
                                            <span class="bg-bg-secondary border border-border-color text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2"><BotIcon :size="12" class="text-accent-primary"/> Antigravity IDE</span>
                                            <span class="bg-bg-secondary border border-border-color text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Supabase</span>
                                            <span class="bg-bg-secondary border border-border-color text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Sanity CMS</span>
                                            <span class="bg-bg-secondary border border-border-color text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Vue/React</span>
                                            <span class="bg-bg-secondary border border-border-color text-white px-3 py-1.5 rounded-lg text-xs font-semibold">GitHub</span>
                                            <span class="bg-bg-secondary border border-border-color text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Vercel</span>
                                        </div>
                                    </div>

                                    <!-- Syllabus Accordion / LMS List -->
                                    <div class="shrink-0 pt-4 border-t border-border-color">
                                        <h5 class="text-[0.8rem] font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                            <List :size="16" class="text-accent-primary"/> Silabus & Kurikulum (5 Bab)
                                        </h5>
                                        
                                        <div class="flex flex-col gap-4">
                                            <!-- Module 1 -->
                                            <div class="bg-bg-secondary/50 rounded-2xl border border-border-color p-5 hover:border-accent-primary/50 transition-colors">
                                                <div class="flex items-start gap-4">
                                                    <div class="w-8 h-8 rounded-full bg-accent-primary/10 text-accent-primary font-black flex items-center justify-center shrink-0">1</div>
                                                    <div>
                                                        <h6 class="text-white font-bold mb-1">Pondasi Vibe Coding & Setup Lingkungan</h6>
                                                        <p class="text-[0.8rem] text-text-tertiary leading-[1.6]">Pengenalan paradigma "Vibe Coding" dan instalasi Antigravity IDE. Setup awal sistem operasi dan integrasi bersama Claude serta Gemini secara seamless.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Module 2 -->
                                            <div class="bg-bg-secondary/50 rounded-2xl border border-border-color p-5 hover:border-accent-primary/50 transition-colors">
                                                <div class="flex items-start gap-4">
                                                    <div class="w-8 h-8 rounded-full bg-accent-primary/10 text-accent-primary font-black flex items-center justify-center shrink-0">2</div>
                                                    <div>
                                                        <h6 class="text-white font-bold mb-1">Membangun Struktur Frontend & UI Layouting</h6>
                                                        <p class="text-[0.8rem] text-text-tertiary leading-[1.6]">Pemahaman arsitektur komponen modern (Vue/React). Mendesain UI yang estetik dalam hitungan menit menggunakan command prompts canggih.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Module 3 -->
                                            <div class="bg-bg-secondary/50 rounded-2xl border border-border-color p-5 hover:border-accent-primary/50 transition-colors">
                                                <div class="flex items-start gap-4">
                                                    <div class="w-8 h-8 rounded-full bg-accent-primary/10 text-accent-primary font-black flex items-center justify-center shrink-0">3</div>
                                                    <div>
                                                        <h6 class="text-white font-bold mb-1">Mengokohkan Backend dengan Supabase & Sanity</h6>
                                                        <p class="text-[0.8rem] text-text-tertiary leading-[1.6]">Tidak perlu repot menulis SQL rumit. Implementasi database realtime dengan Supabase, Authentication, dan CMS dinamis menggunakan Sanity.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Module 4 -->
                                            <div class="bg-bg-secondary/50 rounded-2xl border border-border-color p-5 hover:border-accent-primary/50 transition-colors">
                                                <div class="flex items-start gap-4">
                                                    <div class="w-8 h-8 rounded-full bg-accent-primary/10 text-accent-primary font-black flex items-center justify-center shrink-0">4</div>
                                                    <div>
                                                        <h6 class="text-white font-bold mb-1">Menciptakan Dashboard Admin Eksklusif</h6>
                                                        <p class="text-[0.8rem] text-text-tertiary leading-[1.6]">Membangun panel kendali admin untuk melihat data pelanggan, form submissions, dan analytic, divalidasi dengan role access.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Module 5 -->
                                            <div class="bg-bg-secondary/50 rounded-2xl border border-border-color p-5 hover:border-accent-primary/50 transition-colors">
                                                <div class="flex items-start gap-4">
                                                    <div class="w-8 h-8 rounded-full bg-accent-primary/10 text-accent-primary font-black flex items-center justify-center shrink-0">5</div>
                                                    <div>
                                                        <h6 class="text-white font-bold mb-1">Deploy Otomatis ke Vercel via GitHub</h6>
                                                        <p class="text-[0.8rem] text-text-tertiary leading-[1.6]">Mendorong kode lokal kamu ke repository GitHub dan menghubungkannya dengan Vercel Edge Server agar live 24/7 selamanya tanpa bayar biaya bulanan.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Spacer Support -->
                                    <div class="h-12 w-full shrink-0"></div>
                                </div>
                            </div>
                        </BottomSheet>
                    </footer>
                </div>
            </main>
        </template>

        <!-- 404 State -->
        <div v-else class="min-h-screen flex flex-col items-center justify-center text-center">
            <h2 class="text-4xl font-bold mb-4 text-text-primary">Post not found</h2>
            <router-link to="/blog" class="text-accent-primary font-bold hover:underline">Back to Blog</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, h, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import {
    Twitter, Linkedin as LinkedinIcon, Copy, MessageCircle as WhatsAppIcon,
    Bot as BotIcon, CheckCircle2, Mail, Loader2, List, X, BookOpen, Download, Users
} from 'lucide-vue-next';
import { blogService } from '../../services/blogService';
import { PortableText } from '@portabletext/vue';
import { usePopupManager, Popups } from '../../composables/usePopupManager';
import { BottomSheet } from '@kangjessy/ui';
import CodeBlock from '../../components/ui/CodeBlock.vue';
import TableOfContents from '../../components/ui/TableOfContents.vue';
import { useSEO } from '../../composables/useSEO';
import { common, createLowlight } from 'lowlight';

const lowlight = createLowlight(common);

// Helper to convert Lowlight AST to HTML string
const toHTML = (node: any): string => {
    if (node.type === 'text') return node.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (node.type === 'element') {
        const children = node.children.map((c: any) => toHTML(c)).join('');
        const className = node.properties?.className?.join(' ') || '';
        return `<span class="${className}">${children}</span>`;
    }
    return '';
};

const route = useRoute();
const popup = usePopupManager();

const post = ref<any>(null);
const loading = ref(true);
const readingProgress = ref(0);
const showToast = ref(false);
const toastMessage = ref('');
const showLeadMagnet = ref(true); // Aktifkan supaya user bisa lihat desainnya
const showEbookPreview = ref(false); // Modal preview Ebook state
const leadEmail = ref('');

// Scroll lock ketika modal preview terbuka
watch(showEbookPreview, (isOpen) => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
});
const submittingLead = ref(false);
const processedContentHTML = ref('');
const lightboxImage = ref<string | null>(null);

// SEO Setup
useSEO({
    title: computed(() => post.value?.seoTitle || post.value?.title),
    description: computed(() => post.value?.seoDescription || post.value?.excerpt || 'Artikel terbaru dari KangJessy.'),
    image: computed(() => post.value?.mainImage),
    url: computed(() => `/blog/${route.params.slug}`),
    keywords: computed(() => post.value?.seoKeywords)
});

// Feature Toggle & TOC State
const enableTableOfContents = ref(true);
const tableOfContents = ref<any[]>([]);
const tocVisible = ref(false);
const inlineTocRef = ref<HTMLElement | null>(null);

const handleLeadMagnet = async () => {
    if (!leadEmail.value) return;
    submittingLead.value = true;

    try {
        // [SIMULATION ATAU FETCH REALN-NYA DISINI]
        // Nanti tinggal buka comment fetch ini jika endpoint Google Apps Script doPost() sudah ada:
        
        const GOOGLE_SCRIPT_WEBHOOK = "https://script.google.com/macros/s/AKfycby1cuNcZ2xAAdg1yIR8b6zdigtYXQk7NKCrRzp9YY5TRN_trR1TplhnTsPbBhmiIyNo/exec";
        
        // Kita lemparkan fetch ke backend Google Script untuk kirim email.
        await fetch(GOOGLE_SCRIPT_WEBHOOK, {
            method: 'POST',
            body: JSON.stringify({ email: leadEmail.value, info: 'E-Book Vibe Coding' })
        }).catch(() => console.log('Network error connecting to webhook'));
        
        triggerToast('Terkirim! Silakan periksa kotak masuk e-mail kamu.');
        
        leadEmail.value = '';
        showEbookPreview.value = false;
    } catch (error) {
        triggerToast('Gagal memproses unduhan, coba lagi.');
    } finally {
        submittingLead.value = false;
    }
};

// Portable Text Custom Components (Matching Reference Design with Optimized Typography)
const portableTextComponents = {
    types: {
        image: ({ value }: any) => h('img', {
            src: value.imageUrl || value.image || '/placeholder-blog.jpg',
            class: 'rounded-2xl border border-white/5 my-8 md:my-12 w-full shadow-xl'
        }),
        code: ({ value }: any) => h(CodeBlock, {
            code: value.code,
            language: value.language
        })
    },
    block: {
        h2: ({ value }: any, { slots }: any) => {
            const text = value.children?.[0]?.text || '';
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            return h('h2', { id, class: 'text-[clamp(1.5rem,3vw,2rem)] font-bold mt-10 md:mt-16 mb-6 text-text-primary tracking-tight leading-tight scroll-mt-24' }, slots.default?.());
        },
        h3: ({ value }: any, { slots }: any) => {
            const text = value.children?.[0]?.text || '';
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            return h('h3', { id, class: 'text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold mt-8 md:mt-12 mb-4 text-text-primary tracking-tight leading-tight scroll-mt-24' }, slots.default?.());
        },
        normal: (_: any, { slots }: any) => h('p', { class: 'mb-6 md:mb-8 leading-[1.7] text-[clamp(1rem,1.5vw,1.125rem)] text-text-secondary' }, slots.default?.()),
        blockquote: (_: any, { slots }: any) => h('blockquote', {
            class: 'border-l-4 border-accent-primary bg-bg-secondary/50 py-6 px-6 md:py-[32px] md:px-[40px] my-8 md:my-12 rounded-r-2xl md:rounded-r-3xl italic text-[clamp(1.125rem,2vw,1.25rem)] text-text-primary leading-[1.6]'
        }, slots.default?.()),
    },
    list: {
        bullet: (_: any, { slots }: any) => h('ul', { class: 'mb-6 md:mb-8 pl-6 md:pl-8 list-disc marker:text-accent-primary space-y-2 md:space-y-3' }, slots.default?.()),
        number: (_: any, { slots }: any) => h('ol', { class: 'mb-6 md:mb-8 pl-6 md:pl-8 list-decimal marker:text-accent-primary space-y-2 md:space-y-3' }, slots.default?.()),
    },
    listItem: {
        bullet: (_: any, { slots }: any) => h('li', { class: 'text-[clamp(1rem,1.5vw,1.125rem)] text-text-secondary pl-1 md:pl-2 leading-[1.7]' }, slots.default?.()),
        number: (_: any, { slots }: any) => h('li', { class: 'text-[clamp(1rem,1.5vw,1.125rem)] text-text-secondary pl-1 md:pl-2 leading-[1.7]' }, slots.default?.()),
    },
    marks: {
        strong: (_: any, { slots }: any) => h('strong', { class: 'text-text-primary font-bold' }, slots.default?.()),
        link: ({ value }: any, { slots }: any) => h('a', {
            href: value.href,
            class: 'text-accent-primary hover:text-accent-secondary underline underline-offset-4 decoration-1 font-bold transition-all',
            target: '_blank',
            rel: 'noopener'
        }, slots.default?.()),
    }
};

const generateTableOfContents = (content: any[]) => {
    if (!content) return [];

    return content
        .filter(block => block.style === 'h2' || block.style === 'h3')
        .map(block => {
            const text = block.children?.[0]?.text || 'Section';
            const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            return {
                id,
                text,
                level: block.style === 'h2' ? 2 : 3
            };
        });
};

const generateTOCFromHTML = (html: string) => {
    if (!html) return [];
    
    // Create a temporary element to parse HTML
    const div = document.createElement('div');
    div.innerHTML = html;
    
    const headings = Array.from(div.querySelectorAll('h2, h3'));
    return headings.map(heading => {
        const text = heading.textContent || 'Section';
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        return {
            id,
            text,
            level: heading.tagName === 'H2' ? 2 : 3
        };
    });
};

const updateProcessedContent = () => {
    if (!post.value || !post.value.content) {
        processedContentHTML.value = '';
        return;
    }
    
    const div = document.createElement('div');
    div.innerHTML = post.value.content;
    
    // Highlight Headings for TOC
    const headings = div.querySelectorAll('h2, h3');
    headings.forEach(heading => {
        const text = heading.textContent || '';
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        heading.id = id;
        heading.classList.add('scroll-mt-24');
    });

    // Highlight Code Blocks & Add Copy Button
    const preBlocks = div.querySelectorAll('pre');
    preBlocks.forEach((pre) => {
        const codeEl = pre.querySelector('code');
        if (!codeEl) return;

        // 1. Syntax Highlighting
        const classes = Array.from(codeEl.classList);
        const langClass = classes.find(c => c.startsWith('language-'));
        const lang = langClass ? langClass.replace('language-', '') : 'plaintext';
        
        const rawCode = codeEl.textContent || '';
        let highlighted;
        try {
            highlighted = (lang && lang !== 'plaintext') ? lowlight.highlight(lang, rawCode) : lowlight.highlightAuto(rawCode);
        } catch (e) {
            try {
                highlighted = lowlight.highlightAuto(rawCode);
            } catch (err) {
                highlighted = { children: [{ type: 'text', value: rawCode }] };
            }
        }
        
        let numLines = rawCode.split('\n').length;
        if (rawCode.endsWith('\n')) numLines -= 1;
        if (numLines < 1) numLines = 1;
        
        const linesHTML = Array.from({ length: numLines }).map((_, i) => `<span class="line-number">${i + 1}</span>`).join('');
        const codeHTML = highlighted.children.map(c => toHTML(c)).join('');
        
        codeEl.innerHTML = `<div class="code-wrapper"><div class="line-numbers">${linesHTML}</div><div class="code-content">${codeHTML}</div></div>`;
        codeEl.classList.add('hljs', 'has-lines');

        // 2. Add Copy Button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
        copyBtn.setAttribute('title', 'Salin Kode');
        pre.appendChild(copyBtn);
    });
    
    // Wrap Tables and Add Copy Button
    const tables = div.querySelectorAll('table');
    tables.forEach((table) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper relative group overflow-x-auto rounded-2xl border border-white/5 my-8 bg-[rgba(255,255,255,0.02)]';
        
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-table-btn absolute top-3 right-3 bg-bg-primary/90 backdrop-blur-md border border-border-color text-text-tertiary w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 hover:text-white hover:border-accent-primary cursor-pointer shadow-lg';
        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
        copyBtn.setAttribute('title', 'Salin Tabel');
        wrapper.appendChild(copyBtn);
    });

    // Enhance Images for Lightbox
    const images = div.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('cursor-zoom-in', 'hover:opacity-90', 'transition-opacity');
    });

    processedContentHTML.value = div.innerHTML;
};

// Handle Interactivity inside rich content
const handleRichClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // 1. Copy Code
    if (target.classList.contains('copy-code-btn')) {
        const pre = target.closest('pre');
        const code = (pre?.querySelector('.code-content') as HTMLElement)?.innerText || (pre?.querySelector('code') as HTMLElement)?.innerText || '';
        
        navigator.clipboard.writeText(code).then(() => {
            const originalIcon = target.innerHTML;
            target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none"><polyline points="20 6 9 17 4 12"/></svg>';
            target.classList.add('copied');
            setTimeout(() => {
                target.innerHTML = originalIcon;
                target.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy code:', err);
        });
        return;
    }

    // 2. Copy Table
    if (target.closest('.copy-table-btn')) {
        const btn = target.closest('.copy-table-btn') as HTMLElement;
        const wrapper = btn.closest('.table-wrapper');
        const table = wrapper?.querySelector('table');
        if (!table) return;

        // Convert table exactly to tab-delimited text
        const rows = Array.from(table.querySelectorAll('tr'));
        const text = rows.map(row => {
            const cells = Array.from(row.querySelectorAll('th, td'));
            return cells.map(cell => (cell as HTMLElement).innerText.trim()).join('\t');
        }).join('\n');

        navigator.clipboard.writeText(text).then(() => {
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none"><polyline points="20 6 9 17 4 12"/></svg>';
            btn.classList.add('!text-green-400', '!border-green-400/50');
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.classList.remove('!text-green-400', '!border-green-400/50');
            }, 2000);
        });
        return;
    }

    // 3. Image Lightbox
    if (target.tagName.toLowerCase() === 'img' && target.closest('.rich-content')) {
        lightboxImage.value = (target as HTMLImageElement).src;
        return;
    }
};

watch(() => post.value?.content, updateProcessedContent, { immediate: true });

const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
};

const fetchPost = async () => {
    loading.value = true;
    try {
        const slug = route.params.slug as string;
        const livePost = await blogService.getPostBySlug(slug);

        if (livePost) {
            post.value = livePost;
            if (enableTableOfContents.value) {
                if (livePost.content) {
                    tableOfContents.value = generateTOCFromHTML(livePost.content);
                } else if (livePost.body) {
                    tableOfContents.value = generateTableOfContents(livePost.body);
                }
            }
        }
    } catch (e) {
        console.error('Error loading blog detail from Sanity:', e);
    } finally {
        loading.value = false;
    }
};

const formatDate = (date: string) => {
    if (!date) return 'Draft Mode';
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const getAuthorInitials = (name: string) => {
    if (!name) return 'KJ';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

// Reading Progress & TOC Visibility
const handleScroll = () => {
    if (typeof window === 'undefined') return;
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    readingProgress.value = (winScroll / height) * 100;

    // Show sidebar TOC only after inline TOC has scrolled out of view
    if (inlineTocRef.value) {
        const inlineTocRect = inlineTocRef.value.getBoundingClientRect();
        // Sidebar TOC appears when inline TOC's bottom edge passes the top of viewport
        tocVisible.value = inlineTocRect.bottom < 0;
    } else {
        // Fallback if ref not available
        tocVisible.value = winScroll > 400;
    }
};

// Sharing Logic
const triggerToast = (msg: string) => {
    toastMessage.value = msg;
    showToast.value = true;
    setTimeout(() => {
        showToast.value = false;
    }, 3000);
};

const shareOnTwitter = () => {
    if (!post.value) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.value.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
};

const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
};

const shareOnWhatsApp = () => {
    if (!post.value) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.value.title);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
};

const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast('Link berhasil disalin!');
};

// Interactions
const chatWithAI = () => {
    popup.openModal(Popups.CHAT_AI);
};

const consultOnWhatsApp = () => {
    if (!post.value) return;
    popup.openModal(Popups.CHAT_WA, {
        category: 'Blog Consultation',
        initialMessage: `Saya baru saja membaca artikel "${post.value.title}" dan tertarik untuk konsultasi profesional mengenai topik ini.`
    });
};

onMounted(() => {
    window.scrollTo(0, 0);
    fetchPost();
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleRichClick);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('click', handleRichClick);
});
</script>

<style scoped>
.rich-content :deep(h2) {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 900;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    line-height: 1.1;
    letter-spacing: -0.02em;
}

.rich-content :deep(h3) {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 800;
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
    color: var(--text-primary);
    line-height: 1.2;
}

.rich-content :deep(p) {
    font-size: clamp(1rem, 1.5vw, 1.125rem);
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

.rich-content :deep(blockquote) {
    border-left: 4px solid var(--accent-primary);
    background: rgba(var(--accent-primary-rgb), 0.05);
    padding: 2.5rem 3rem;
    margin: 3rem 0;
    font-style: italic;
    font-size: 1.25rem;
    border-radius: 0 2rem 2rem 0;
    color: var(--text-primary);
}

.rich-content :deep(ul) {
    list-style-type: disc;
    margin-bottom: 2rem;
    padding-left: 2rem;
    color: var(--text-secondary);
}

.rich-content :deep(ol) {
    list-style-type: decimal;
    margin-bottom: 2rem;
    padding-left: 2rem;
    color: var(--text-secondary);
}

.rich-content :deep(li) {
    margin-bottom: 0.75rem;
    line-height: 1.8;
    padding-left: 0.5rem;
}

.rich-content :deep(li::marker) {
    color: var(--accent-primary);
    font-weight: 800;
}

.rich-content :deep(img) {
    border-radius: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    margin: 3rem 0;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

/* Table Style */
.rich-content :deep(.table-wrapper) {
    width: 100%;
    margin-bottom: 2rem;
}

.rich-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
}

.rich-content :deep(th) {
    background: rgba(var(--accent-primary-rgb), 0.1);
    color: var(--text-primary);
    font-weight: 800;
    text-align: left;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.rich-content :deep(td) {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: var(--text-secondary);
}

.rich-content :deep(tr:last-child td) {
    border-bottom: none;
}

.rich-content :deep(tr:hover) {
    background: rgba(255, 255, 255, 0.02);
}

/* VS Code Theme Code Window */
.rich-content :deep(pre) {
    background: #1E1E1E; /* VS Code Default Dark */
    border-radius: 1.5rem;
    padding: 2.5rem 2rem 1.5rem;
    margin: 3rem 0;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.6), 0 18px 36px -18px rgba(0, 0, 0, 0.7);
    overflow: hidden;
}

/* Mac Window Dots */
.rich-content :deep(pre)::before {
    content: "";
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #ff5f56;
    box-shadow: 1rem 0 0 #ffbd2e, 2rem 0 0 #27c93f;
    z-index: 10;
}

.rich-content :deep(pre) code {
    background: transparent;
    padding: 0;
    border-radius: 0;
    color: #D4D4D4; /* VS Code Default foreground */
    font-family: 'Fira Code', 'JetBrains Mono', 'Source Code Pro', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
    display: block;
    overflow: hidden;
}

.rich-content :deep(pre) code .code-wrapper {
    display: flex;
    overflow: hidden;
}

.rich-content :deep(pre) code .line-numbers {
    display: flex;
    flex-direction: column;
    padding-right: 1.5rem;
    margin-right: 1.5rem;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    color: #858585;
    text-align: right;
    user-select: none;
    min-width: 3rem;
}

.rich-content :deep(pre) code .code-content {
    overflow-x: auto;
    width: 100%;
    white-space: pre;
    padding-bottom: 0.5rem;
}

.rich-content :deep(.copy-code-btn) {
    position: absolute;
    top: 0.8rem;
    right: 1.2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #64748B;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 20;
    user-select: none;
}

.rich-content :deep(.copy-code-btn:hover) {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-color: var(--accent-primary);
}

.rich-content :deep(.copy-code-btn.copied) {
    color: #34D399;
    border-color: #34D399;
    background: rgba(52, 211, 153, 0.1);
}

/* Syntax Highlighting matching VS Code (Dark+ Theme) */
.rich-content :deep(.hljs-comment) { color: #6A9955; font-style: normal; }
.rich-content :deep(.hljs-keyword) { color: #C586C0; font-weight: 400; }
.rich-content :deep(.hljs-string) { color: #CE9178; }
.rich-content :deep(.hljs-title) { color: #DCDCAA; font-weight: 400; }
.rich-content :deep(.hljs-title.function_) { color: #DCDCAA; }
.rich-content :deep(.hljs-variable) { color: #9CDCFE; }
.rich-content :deep(.hljs-number) { color: #B5CEA8; }
.rich-content :deep(.hljs-attr) { color: #9CDCFE; }
.rich-content :deep(.hljs-selector-tag) { color: #569CD6; }
.rich-content :deep(.hljs-type) { color: #4EC9B0; }
.rich-content :deep(.hljs-literal) { color: #569CD6; }
.rich-content :deep(.hljs-built_in) { color: #4EC9B0; }
.rich-content :deep(.hljs-property) { color: #9CDCFE; }
.rich-content :deep(.hljs-operator) { color: #D4D4D4; }
.rich-content :deep(.hljs-punctuation) { color: #D4D4D4; }
</style>
