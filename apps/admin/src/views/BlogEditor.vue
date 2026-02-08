<template>
    <div class="page-container" id="blog-editor-page">
        <!-- Action Header with Breadcrumbs -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sticky top-0 z-40 bg-[#FAFCFE]/80 backdrop-blur-md py-4 border-b border-transparent transition-all" 
             :class="{ '!border-slate-200 shadow-sm': isScrolled }" id="editor-action-header">
            <div class="flex flex-col gap-1">
                <nav class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#B5B5B5]">
                    <router-link to="/blog" class="hover:text-[#702DFF] transition-colors">Blog Articles</router-link>
                    <ChevronRight :size="10" />
                    <span class="text-[#702DFF]">{{ isEdit ? 'Edit Post' : 'New Article' }}</span>
                </nav>
                <h1 class="text-2xl font-black text-[#1B2559] mt-1">{{ isEdit ? 'Edit Article' : 'Create New Article' }}</h1>
            </div>
            <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                <BaseButton variant="secondary" @click="router.back()" class="flex-1 sm:flex-none">Cancel</BaseButton>
                <BaseButton variant="secondary" @click="handleSave(false)" :loading="saving" class="flex-1 sm:flex-none !border-indigo-100 !text-[#702DFF] hover:!bg-indigo-50">
                    <Save :size="18" />
                    Save
                </BaseButton>
                <BaseButton variant="primary" @click="handleSave(true)" :loading="saving" class="w-full sm:w-auto">
                    <Check :size="18" />
                    {{ isEdit ? 'Save & Close' : 'Publish Article' }}
                </BaseButton>
            </div>
        </div>



        <!-- Toast Notifications -->
        <Toast v-if="toast.show" :message="toast.message" :variant="toast.variant" @close="toast.show = false" />

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Main Content Area -->
            <div class="lg:col-span-3 space-y-6" id="main-editor-column">

                <!-- Title & Slug (Outside Card as requested) -->
                <div class="space-y-5 px-1" id="header-section">
                    <div>
                        <input v-model="post.title" @input="handleTitleInput" type="text"
                            class="w-full bg-transparent border-b-2 border-transparent p-0 pb-3 text-3xl font-extrabold text-[#1B2559] placeholder:text-[#E2E8F0] focus:ring-0 focus:border-slate-200 outline-none transition-all duration-300 leading-tight"
                            placeholder="Enter article title here..." id="input-post-title" />
                    </div>
                    <div class="flex items-center gap-2 px-3 py-1 bg-white border border-slate-100/50 rounded-xl w-fit shadow-sm"
                        id="slug-indicator">
                        <span class="text-[9px] font-black text-[#A3AED0] uppercase tracking-widest">URL SLUG:</span>
                        <span v-if="!isEditingSlug" class="text-[11px] font-bold text-[#702DFF]">{{ post.slug ||
                            'generating...' }}</span>
                        <input v-else v-model="post.slug" type="text"
                            class="bg-transparent border-none p-0 text-[11px] font-bold text-[#702DFF] focus:ring-0 w-64 tracking-wider lowercase"
                            id="input-post-slug" />
                        <button @click="isEditingSlug = !isEditingSlug"
                            class="text-slate-300 hover:text-[#702DFF] transition-colors">
                            <Check v-if="isEditingSlug" :size="12" />
                            <Edit3 v-else :size="12" />
                        </button>
                    </div>
                </div>

                <!-- Editor (ID: content-section) -->
                <div id="content-section">
                    <TipTapEditor ref="editorRef" :model-value="post.content || ''"
                        @update:model-value="handleContentUpdate" @trigger-media-modal="openMediaPickerForEditor" />
                </div>

                <!-- SEO Card (ID: seo-section) -->
                <DashboardCard id="seo-section" title="SEO Settings" :stretch="false"
                    subtitle="Customize how your post appears in search engines">
                    <div class="space-y-5">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Meta Title</label>
                                    <span :class="getTitleHint(post.seo_title || '').color" class="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                                        {{ getTitleHint(post.seo_title || '').text }}
                                    </span>
                                </div>
                                <input v-model="post.seo_title" type="text" class="input-field"
                                    placeholder="Best title for Google..." id="input-seo-title" />
                                <div class="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div class="h-full transition-all duration-500" :class="getTitleHint(post.seo_title || '').barColor" 
                                        :style="{ width: Math.min((post.seo_title?.length || 0) / 60 * 100, 100) + '%' }"></div>
                                </div>
                                <p class="text-[9px] text-slate-400 mt-1.5 font-bold uppercase tracking-tighter">{{ post.seo_title?.length || 0 }} / 60 Characters</p>
                            </div>
                            <div>
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Target Keywords</label>
                                <div class="relative">
                                    <div class="input-field min-h-[42px] flex flex-wrap gap-2 py-2 pr-10 transition-all"
                                         :class="{ 'border-[#702DFF] ring-4 ring-[#702DFF]/5': isKeywordsFocused }">
                                        <span v-for="(kw, idx) in keywordTags" :key="idx" 
                                            class="px-2 py-0.5 bg-[#702DFF]/10 text-[#702DFF] text-[10px] font-bold rounded-lg border border-[#702DFF]/20 flex items-center gap-1.5">
                                            {{ kw }}
                                            <button @click="removeKeyword(idx)" class="hover:text-rose-500 transition-colors">
                                                <X :size="10" />
                                            </button>
                                        </span>
                                        <input v-model="keywordInput" 
                                            @keydown.enter.prevent="addKeyword" 
                                            @keydown="handleKeywordKeydown"
                                            @focus="isKeywordsFocused = true"
                                            @blur="isKeywordsFocused = false"
                                            type="text" class="bg-transparent border-none p-0 text-sm focus:ring-0 flex-1 min-w-[100px]" 
                                            placeholder="Type and press Enter or comma..." />
                                    </div>
                                    <div class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                                        <TagIcon :size="14" />
                                    </div>
                                </div>
                                <p class="text-[9px] text-slate-400 mt-1.5 font-bold uppercase">Press Enter or Comma to add (First one is the Focus Keyword)</p>
                            </div>
                        </div>

                        <!-- Article Excerpt -->
                        <div class="mb-8 shadow-sm bg-indigo-50/20 p-5 rounded-2xl border border-indigo-100/50">
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Article Excerpt (Tampil di List)</label>
                                <div class="flex items-center gap-3">
                                    <button @click="regenerateExcerpt" class="text-[9px] font-black text-[#702DFF] hover:underline uppercase tracking-tighter">Regenerate</button>
                                    <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider bg-white text-slate-400 border border-slate-100">
                                        {{ (post.excerpt || '').length }} / 160
                                    </span>
                                </div>
                            </div>
                            <textarea v-model="post.excerpt" rows="2" class="input-field !py-3 !bg-white"
                                placeholder="Ringkasan singkat untuk kartu artikel..." id="input-excerpt"></textarea>
                            <p class="text-[9px] text-slate-400 mt-1.5 font-bold uppercase italic tracking-tighter">Diambil dari konten jika kosong. Ringkasan ini muncul di halaman depan.</p>
                        </div>

                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Meta Description</label>
                                <span :class="getDescHint(post.seo_description || '').color" class="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                                    {{ getDescHint(post.seo_description || '').text }}
                                </span>
                            </div>
                            <textarea v-model="post.seo_description" rows="3" class="input-field !py-4"
                                placeholder="Brief summary for search results..." id="input-seo-description"></textarea>
                            <div class="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div class="h-full transition-all duration-500" :class="getDescHint(post.seo_description || '').barColor" 
                                    :style="{ width: Math.min((post.seo_description?.length || 0) / 160 * 100, 100) + '%' }"></div>
                            </div>
                            <p class="text-[9px] text-slate-400 mt-1.5 font-bold uppercase tracking-tighter">{{ post.seo_description?.length || 0 }} / 160 Characters</p>
                        </div>

                        <!-- SEO Analysis (Yoast Style) -->
                        <div class="pt-6 border-t border-slate-100 mt-6 overflow-hidden">
                            <div class="flex items-center justify-between mb-5">
                                <div class="flex items-center gap-1 p-1 bg-slate-100/50 rounded-lg">
                                    <button @click="activeAnalysisTab = 'seo'" 
                                        class="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all"
                                        :class="activeAnalysisTab === 'seo' ? 'bg-white text-[#702DFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'">
                                        SEO
                                    </button>
                                    <button @click="activeAnalysisTab = 'readability'" 
                                        class="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all"
                                        :class="activeAnalysisTab === 'readability' ? 'bg-white text-[#702DFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'">
                                        Readability
                                    </button>
                                    <button @click="activeAnalysisTab = 'social'" 
                                        class="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all"
                                        :class="activeAnalysisTab === 'social' ? 'bg-white text-[#702DFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'">
                                        Social
                                    </button>
                                </div>
                                <div class="flex items-center gap-2">
                                     <div class="w-2 h-2 rounded-full animate-pulse" :class="activeAnalysisTab === 'seo' ? overallSeoScore.bg : (activeAnalysisTab === 'readability' ? overallReadabilityScore.bg : 'bg-blue-500')"></div>
                                     <span class="text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest" :class="activeAnalysisTab === 'seo' ? overallSeoScore.class : (activeAnalysisTab === 'readability' ? overallReadabilityScore.class : 'bg-blue-50 text-blue-500')">
                                        {{ activeAnalysisTab === 'seo' ? overallSeoScore.text : (activeAnalysisTab === 'readability' ? overallReadabilityScore.text : 'Config') }} Score
                                    </span>
                                </div>
                            </div>

                            <!-- SEO Tab Content -->
                            <div v-show="activeAnalysisTab === 'seo'" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                <div v-for="(check, idx) in seoChecks" :key="idx" class="flex items-start gap-3 group">
                                    <div class="mt-1 shrink-0 transition-transform group-hover:scale-110">
                                        <div v-if="check.status === 'good'" class="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                                        <div v-else-if="check.status === 'ok'" class="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
                                        <div v-else class="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
                                    </div>
                                    <div class="flex flex-col">
                                        <p class="text-[11px] font-bold text-slate-600 line-clamp-1 group-hover:text-[#1B2559] transition-colors">{{ check.title }}</p>
                                        <p class="text-[9px] font-medium text-slate-400 leading-tight">{{ check.message }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Readability Tab Content -->
                            <div v-show="activeAnalysisTab === 'readability'" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                <div v-for="(check, idx) in readabilityChecks" :key="idx" class="flex items-start gap-3 group">
                                    <div class="mt-1 shrink-0 transition-transform group-hover:scale-110">
                                        <div v-if="check.status === 'good'" class="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                                        <div v-else-if="check.status === 'ok'" class="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
                                        <div v-else class="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
                                    </div>
                                    <div class="flex flex-col">
                                        <p class="text-[11px] font-bold text-slate-600 line-clamp-1 group-hover:text-[#1B2559] transition-colors">{{ check.title }}</p>
                                        <p class="text-[9px] font-medium text-slate-400 leading-tight">{{ check.message }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Social Tab Content -->
                            <div v-show="activeAnalysisTab === 'social'" class="space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div class="space-y-4">
                                        <div>
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Social Title</label>
                                            <input v-model="post.social_title" type="text" class="input-field" :placeholder="post.seo_title || post.title" />
                                        </div>
                                        <div>
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Social Description</label>
                                            <textarea v-model="post.social_description" rows="3" class="input-field !py-4" :placeholder="post.seo_description || post.excerpt"></textarea>
                                        </div>
                                    </div>
                                    
                                    <!-- Facebook/X Preview -->
                                    <div class="space-y-4">
                                        <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Social Card Preview</p>
                                        <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-w-[320px]">
                                            <div class="aspect-[1.91/1] bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                                                <img v-if="post.social_image || post.featured_image" :src="post.social_image || post.featured_image" class="w-full h-full object-cover" />
                                                <div v-else class="text-slate-300 flex flex-col items-center">
                                                    <ImageIcon :size="24" />
                                                    <span class="text-[8px] font-bold uppercase mt-1">Image 1.91:1</span>
                                                </div>
                                            </div>
                                            <div class="p-3 bg-[#F2F3F5] border-t border-slate-200">
                                                <p class="text-[10px] text-slate-500 uppercase font-black tracking-tighter">kangjessy.com</p>
                                                <h6 class="text-[13px] font-bold text-[#1c1e21] leading-[1.3] mt-1 line-clamp-1">{{ post.social_title || post.seo_title || post.title }}</h6>
                                                <p class="text-[11px] text-[#606770] leading-[1.3] mt-1 line-clamp-2">{{ post.social_description || post.seo_description || post.excerpt }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- SEO Preview -->
                        <div class="p-5 bg-slate-50/50 rounded-[20px] border border-slate-100/50 mt-8"
                            id="google-preview">
                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Google
                                Preview</p>
                            <h4 class="text-lg font-bold text-[#1a0dab] hover:underline cursor-pointer mb-1">{{
                                post.seo_title || post.title || 'Your Article Title' }}</h4>
                            <p class="text-xs text-[#006621] mb-1.5 font-medium">kangjessy.com/blog/{{ post.slug ||
                                'slug' }}</p>
                            <p class="text-[11px] text-slate-500 leading-relaxed">{{ post.seo_description ||
                                post.excerpt ||
                                'Write a meta description to see how it looks on Google results page...' }}</p>
                        </div>
                    </div>
                </DashboardCard>
            </div>

            <!-- Settings Sidebar -->
            <div class="lg:col-span-1 space-y-6" id="sidebar-editor-column">
                <!-- Publishing (ID: publishing-sidebar) -->
                <DashboardCard id="publishing-sidebar" title="Status & Visibility" :stretch="false">
                    <div class="space-y-5">
                        <div>
                            <label
                                class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest block mb-2">Visibility</label>
                            <select v-model="post.status" class="select-field !py-3" id="select-status">
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="scheduled">Scheduled</option>
                            </select>
                        </div>

                        <div v-if="post.status === 'scheduled'">
                            <label
                                class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest block mb-2">Schedule
                                Date</label>
                            <input v-model="post.publish_schedule" type="datetime-local" class="input-field !py-2.5" />
                        </div>

                        <div class="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div
                                class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <User :size="18" />
                            </div>
                            <div>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Author</p>
                                <p class="text-xs font-bold text-[#1B2559]">Kang Jessy (Admin)</p>
                            </div>
                        </div>
                    </div>
                </DashboardCard>

                <!-- Organization (ID: organization-sidebar) -->
                <DashboardCard id="organization-sidebar" title="Organization" :stretch="false">
                    <div class="space-y-6">
                        <!-- Categories -->
                        <div>
                            <label
                                class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest block mb-3">Categories</label>
                            <div class="space-y-1.5 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                <label v-for="cat in categories" :key="cat.id"
                                    class="flex items-center gap-3 p-2.5 bg-slate-50 hover:bg-white rounded-xl cursor-pointer transition-all border border-slate-50 hover:border-indigo-100 group">
                                    <input type="checkbox" :value="cat.id" v-model="post.categories"
                                        class="w-4 h-4 rounded-md border-slate-200 text-[#702DFF] focus:ring-[#702DFF]" />
                                    <span class="text-[11px] font-bold text-slate-600 group-hover:text-[#1B2559]">{{
                                        cat.name }}</span>
                                </label>
                            </div>
                        </div>

                        <!-- Tags -->
                        <div>
                            <label
                                class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest block mb-3">Tags</label>
                            <div class="flex flex-wrap gap-2 mb-3">
                                <span v-for="tag in post.tags" :key="getTagId(tag)"
                                    class="px-2.5 py-1 bg-indigo-50 text-[#702DFF] text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-100 flex items-center gap-1.5">
                                    {{ getTagDisplayName(tag) }}
                                    <button @click="removeTag(getTagId(tag))"
                                        class="hover:text-rose-500 transition-colors">
                                        <X :size="10" />
                                    </button>
                                </span>
                            </div>
                            <div class="relative">
                                <input v-model="tagInput" @keyup.enter="addTag" type="text"
                                    class="input-field !py-2.5 text-[11px]! !pl-9" placeholder="Add new tag..." />
                                <Tag :size="12" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                <button @click="addTag"
                                    class="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                                    <Plus :size="12" />
                                </button>
                            </div>

                            <!-- Suggested Tags -->
                            <div v-if="suggestedTags.length > 0" class="mt-3">
                                <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">Suggested
                                </p>
                                <div class="flex flex-wrap gap-1.5">
                                    <button v-for="tag in suggestedTags.filter(t => !post.tags?.includes(t.id))"
                                        :key="tag.id" @click="addSuggestedTag(tag)"
                                        class="px-2 py-0.5 border border-slate-100 rounded-md text-[10px] font-bold text-slate-400 hover:border-indigo-200 hover:text-[#702DFF] whitespace-nowrap transition-all">
                                        + {{ tag.name }}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                class="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest block mb-2">Read
                                Time</label>
                            <div class="relative">
                                <input v-model="post.read_time" type="number" class="input-field !pr-12" placeholder="5"
                                    id="input-read-time" />
                                <span
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">Min</span>
                            </div>
                        </div>
                    </div>
                </DashboardCard>

                <!-- Thumbnail (ID: thumbnail-sidebar) -->
                <DashboardCard id="thumbnail-sidebar" title="Featured Image" :stretch="false">
                    <div class="space-y-4">
                        <div class="aspect-[16/10] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden relative group cursor-pointer transition-all hover:border-indigo-200 hover:bg-slate-100/50"
                            @click="openMediaPicker" id="image-picker-zone">

                            <!-- Image Preview -->
                            <img v-if="post.featured_image" :src="post.featured_image"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                            <!-- Loading Overlay -->
                            <div v-if="uploading"
                                class="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                                <div
                                    class="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-2">
                                </div>
                                <span
                                    class="text-[9px] font-black uppercase tracking-widest text-[#702DFF]">Uploading...</span>
                            </div>

                            <!-- Placeholder -->
                            <div v-if="!post.featured_image && !uploading"
                                class="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-2">
                                <div class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-[#702DFF] transition-colors">
                                    <ImageIcon :size="20" />
                                </div>
                                <div class="text-center">
                                    <span class="block text-[10px] font-black uppercase tracking-widest">Select Image</span>
                                    <span class="block text-[8px] font-bold text-slate-400 mt-1 uppercase">Recommended 16:10</span>
                                </div>
                            </div>

                            <!-- Remove Button -->
                            <button v-if="post.featured_image && !uploading"
                                @click.stop="post.featured_image = ''; post.featured_image_ref = ''; post.featured_image_alt = ''"
                                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 flex items-center justify-center z-20">
                                <X :size="14" />
                            </button>
                        </div>

                        <!-- Image Alt Text -->
                        <div v-if="post.featured_image" class="space-y-2">
                             <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Alt Text (Deskripsi Gambar)</label>
                             <input v-model="post.featured_image_alt" type="text" class="input-field !py-2.5 text-[10px]!"
                                 placeholder="Deskripsikan gambar ini untuk SEO..." id="input-featured-image-alt" />
                             <p class="text-[8px] text-slate-300 font-bold uppercase italic">Penting untuk aksesibilitas & SEO Google</p>
                        </div>



                        <div class="space-y-2">
                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Image
                                URL</label>
                            <input v-model="post.featured_image" type="text" class="input-field !py-2.5 text-[10px]!"
                                placeholder="Or paste direct image URL..." id="input-featured-image" />
                        </div>
                    </div>
                </DashboardCard>
            </div>
        </div>

        <!-- Media Picker Modal -->
        <MediaPickerModal 
            :is-open="isMediaPickerOpen" 
            @close="isMediaPickerOpen = false" 
            @select="handleMediaSelect" 
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronRight, Save, Edit3, Check, User, Image as ImageIcon, X, Plus, Tag as TagIcon } from 'lucide-vue-next'
import { blogService } from '../services/blogService'
import type { BlogPost, BlogCategory, BlogTag } from '../types'
import DashboardCard from '../components/ui/DashboardCard.vue'
import { BaseButton } from "@kangjessy/ui"
import TipTapEditor from '../components/ui/TipTapEditor.vue'
import Toast from '../components/ui/Toast.vue'
import MediaPickerModal from '../components/media/MediaPickerModal.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)

const saving = ref(false)
const uploading = ref(false)
const isScrolled = ref(false)
const isEditingSlug = ref(false)

// Handle Scroll for Sticky Header
const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const isMediaPickerOpen = ref(false)
const tagInput = ref('')
const toast = ref({ show: false, message: '', variant: 'success' as 'success' | 'error' })
const categories = ref<BlogCategory[]>([])
const suggestedTags = ref<BlogTag[]>([])
const post = ref<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    categories: [],
    tags: [],
    read_time: 5,
    status: 'published',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    social_title: '',
    social_description: '',
    social_image: '',
    social_image_ref: '',
    author: 'Admin'
})

const activeAnalysisTab = ref<'seo' | 'readability' | 'social'>('seo')
const isKeywordsFocused = ref(false)
const keywordInput = ref('')
const keywordTags = computed(() => {
    if (!post.value.seo_keywords) return []
    return post.value.seo_keywords.split(',').map(k => k.trim()).filter(k => k)
})

const addKeyword = () => {
    const val = keywordInput.value.trim()
    if (!val) return
    
    // Clean comma from value if it came from comma press
    const cleanVal = val.replace(/,/g, '')
    if (!cleanVal) return

    const currentKeywords = post.value.seo_keywords ? post.value.seo_keywords.split(',').map(k => k.trim()) : []
    if (!currentKeywords.includes(cleanVal)) {
        currentKeywords.push(cleanVal)
        post.value.seo_keywords = currentKeywords.filter(k => k).join(', ')
    }
    keywordInput.value = ''
}

const removeKeyword = (index: number) => {
    const currentKeywords = post.value.seo_keywords ? post.value.seo_keywords.split(',').map(k => k.trim()) : []
    currentKeywords.splice(index, 1)
    post.value.seo_keywords = currentKeywords.filter(k => k).join(', ')
}

// SEO Logic Indicators
const getTitleHint = (text: string) => {
    const len = text.length
    if (len === 0) return { text: 'Missing', color: 'bg-slate-100 text-slate-400', barColor: 'bg-slate-200' }
    if (len < 30) return { text: 'Too Short', color: 'bg-amber-50 text-amber-500', barColor: 'bg-amber-400' }
    if (len <= 60) return { text: 'Perfect', color: 'bg-emerald-50 text-emerald-500', barColor: 'bg-emerald-400' }
    return { text: 'Too Long', color: 'bg-rose-50 text-rose-500', barColor: 'bg-rose-400' }
}

const getDescHint = (text: string) => {
    const len = text.length
    if (len === 0) return { text: 'Missing', color: 'bg-slate-100 text-slate-400', barColor: 'bg-slate-200' }
    if (len < 70) return { text: 'Too Short', color: 'bg-amber-50 text-amber-500', barColor: 'bg-amber-400' }
    if (len <= 160) return { text: 'Perfect', color: 'bg-emerald-50 text-emerald-500', barColor: 'bg-emerald-400' }
    return { text: 'Too Long', color: 'bg-rose-50 text-rose-500', barColor: 'bg-rose-400' }
}

const handleKeywordKeydown = (e: KeyboardEvent) => {
    if (e.key === ',') {
        e.preventDefault()
        addKeyword()
    }
}

// Advanced SEO Analysis (Yoast Style)
const seoChecks = computed(() => {
    const checks = []
    const focusKW = keywordTags.value[0]?.toLowerCase()
    const title = (post.value.seo_title || post.value.title || '').toLowerCase()
    const desc = (post.value.seo_description || post.value.excerpt || '').toLowerCase()
    const content = (post.value.content || '').toLowerCase().replace(/<[^>]*>/g, '')
    const slug = (post.value.slug || '').toLowerCase()

    // 1. Keyword in Title
    if (!focusKW) {
        checks.push({ title: 'Focus Keyword', message: 'Tentukan kata kunci fokus untuk memulai analisis.', status: 'bad' })
    } else {
        // Keyword in Introduction (first 100 words)
        const intro = content.split(/\s+/).slice(0, 100).join(' ')
        if (intro.includes(focusKW)) {
            checks.push({ title: 'Keyword in Intro', message: 'Keren! Kata kunci ditemukan di paragraf pertama.', status: 'good' })
        } else {
            checks.push({ title: 'Keyword in Intro', message: 'Coba tambahkan kata kunci di 100 kata pertama.', status: 'ok' })
        }

        if (title.includes(focusKW)) {
            checks.push({ title: 'Keyword in Title', message: 'Sempurna! Kata kunci Anda ada di dalam judul.', status: 'good' })
        } else {
            checks.push({ title: 'Keyword in Title', message: 'Coba masukkan kata kunci fokus ke dalam judul.', status: 'bad' })
        }

        // Keyword in H2/H3
        const hasInHeading = (post.value.content || '').match(/<h[23][^>]*>.*?<\/h[23]>/gi)?.some((h: any) => h.toLowerCase().includes(focusKW))
        if (hasInHeading) {
            checks.push({ title: 'Keyword in Subheading', message: 'Bagus sekali! Kata kunci ditemukan di H2/H3.', status: 'good' })
        } else {
            checks.push({ title: 'Keyword in Subheading', message: 'Gunakan kata kunci di dalam judul sub-bab (H2/H3).', status: 'ok' })
        }

        // 2. Keyword in Description
        if (desc.includes(focusKW)) {
            checks.push({ title: 'Keyword in Meta Description', message: 'Kerja bagus, kata kunci ada di deskripsi.', status: 'good' })
        } else {
            checks.push({ title: 'Keyword in Meta Description', message: 'Tambahkan kata kunci ke dalam deskripsi meta.', status: 'ok' })
        }

        // 3. Keyword in Slug
        if (slug.includes(focusKW.replace(/\s+/g, '-'))) {
            checks.push({ title: 'Keyword in Slug', message: 'URL slug Anda sudah teroptimasi dengan baik.', status: 'good' })
        } else {
            checks.push({ title: 'Keyword in Slug', message: 'Slug URL sebaiknya mengandung kata kunci.', status: 'ok' })
        }

        // 4. Keyword Density
        const count = (content.match(new RegExp(focusKW, 'g')) || []).length
        if (count >= 2) {
            checks.push({ title: 'Keyword Density', message: `Ditemukan ${count} kali. Sangat bagus!`, status: 'good' })
        } else if (count === 1) {
            checks.push({ title: 'Keyword Density', message: 'Kata kunci hanya ditemukan sekali di konten.', status: 'ok' })
        } else {
            checks.push({ title: 'Keyword Density', message: 'Kata kunci tidak ditemukan di dalam isi konten.', status: 'bad' })
        }
    }

    // 5. Link Analysis
    const hasInternalLink = (post.value.content || '').includes('kangjessy.com')
    const hasExternalLink = (post.value.content || '').match(/<a[^+]+href="http(s)?:\/\/(?!kangjessy\.com)/i)
    
    checks.push({ title: 'Internal Links', message: hasInternalLink ? 'Mantap, ditemukan link internal.' : 'Belum ada link internal ke website Anda.', status: hasInternalLink ? 'good' : 'ok' })
    checks.push({ title: 'External Links', message: hasExternalLink ? 'Bagus, ada link referensi keluar.' : 'Belum ada link keluar (outbound links).', status: hasExternalLink ? 'good' : 'ok' })

    // 6. Image Alt Text
    const imagesInContent = (post.value.content || '').match(/<img[^>]+>/g) || []
    const missingAltInContent = imagesInContent.some((img: any) => !img.includes('alt=') || img.includes('alt=""'))
    const hasFeaturedAlt = !!post.value.featured_image_alt

    if (imagesInContent.length > 0) {
        checks.push({ title: 'Content Image Alt', message: missingAltInContent ? 'Ditemukan gambar di konten tanpa Alt Text.' : 'Semua gambar di konten sudah punya Alt Text.', status: missingAltInContent ? 'bad' : 'good' })
    }
    
    if (post.value.featured_image) {
        checks.push({ title: 'Featured Image Alt', message: hasFeaturedAlt ? 'Featured image sudah punya Alt Text.' : 'Featured image belum punya Alt Text.', status: hasFeaturedAlt ? 'good' : 'bad' })
    }

    // 7. Text Length
    if (content.length > 500) {
        checks.push({ title: 'Text Length', message: 'Panjang artikel sudah sangat ideal.', status: 'good' })
    } else if (content.length > 200) {
        checks.push({ title: 'Text Length', message: 'Sedikit pendek, coba tambah detail lagi.', status: 'ok' })
    } else {
        checks.push({ title: 'Text Length', message: 'Konten terlalu tipis untuk bersaing.', status: 'bad' })
    }

    // 8. Integration Check (Anti-Ipsum)
    const placeholders = ['lorem ipsum', 'indo ipsum', 'dummy text', 'teks dummy']
    const hasPlaceholder = placeholders.some(p => content.toLowerCase().includes(p))
    if (hasPlaceholder) {
        checks.push({ title: 'Quality Check', message: 'Peringatan: Ditemukan teks placeholder (Ipsum)!', status: 'bad' })
    }

    // 9. Title/Desc Length
    const titleStatus = getTitleHint(post.value.seo_title || '').text
    checks.push({ 
        title: 'SEO Title Length', 
        message: titleStatus === 'Perfect' ? 'Panjang judul sudah optimal.' : 'Panjang judul perlu disesuaikan.', 
        status: titleStatus === 'Perfect' ? 'good' : (titleStatus === 'Missing' ? 'bad' : 'ok') 
    })

    return checks
})

const overallSeoScore = computed(() => {
    const good = seoChecks.value.filter(c => c.status === 'good').length
    const bad = seoChecks.value.filter(c => c.status === 'bad').length
    const total = seoChecks.value.length

    const firstCheck = seoChecks.value[0]
    if (total === 0 || (total === 1 && firstCheck && firstCheck.title === 'Focus Keyword')) {
         return { text: 'Empty', class: 'bg-slate-100 text-slate-400', bg: 'bg-slate-300' }
    }
    
    if (good > total * 0.7 && bad === 0) return { text: 'Great', class: 'bg-emerald-50 text-emerald-500', bg: 'bg-emerald-500' }
    if (good > total * 0.5) return { text: 'Good', class: 'bg-blue-50 text-blue-500', bg: 'bg-blue-500' }
    if (bad > 0) return { text: 'Fair', class: 'bg-amber-50 text-amber-500', bg: 'bg-amber-500' }
    return { text: 'Bad', class: 'bg-rose-50 text-rose-500', bg: 'bg-rose-500' }
})

const readabilityChecks = computed(() => {
    const checks = []
    const content = (post.value.content || '').replace(/<[^>]*>/g, ' ')
    const paragraphs = (post.value.content || '').match(/<p>.*?<\/p>/g) || []
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
    
    // 1. Sentence length
    const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 20)
    const percentageLong = sentences.length > 0 ? (longSentences.length / sentences.length * 100) : 0
    
    if (percentageLong < 20) {
        checks.push({ title: 'Sentence length', message: 'Bagus! Kalimat Anda singkat dan padat.', status: 'good' })
    } else {
        checks.push({ title: 'Sentence length', message: `${Math.round(percentageLong)}% kalimat > 20 kata. Usahakan lebih pendek.`, status: 'bad' })
    }

    // 2. Paragraph length
    const longParagraphs = paragraphs.filter(p => p.replace(/<[^>]*>/g, '').split(/\s+/).length > 150)
    if (longParagraphs.length === 0 && paragraphs.length > 0) {
        checks.push({ title: 'Paragraph length', message: 'Tidak ada paragraf yang terlalu panjang.', status: 'good' })
    } else if (paragraphs.length > 0) {
        checks.push({ title: 'Paragraph length', message: 'Coba potong paragraf yang terlalu panjang.', status: 'bad' })
    }

    // 4. Passive voice (Simple logic for Indo/Eng)
    const passiveWords = ['di', 'ter', 'was', 'were', 'been', 'is being', 'are being']
    const passiveCount = sentences.filter(s => {
        const words = s.trim().toLowerCase().split(/\s+/)
        return words.some(w => w.startsWith('di') || w.startsWith('ter') || passiveWords.includes(w))
    }).length
    const passivePercentage = sentences.length > 0 ? (passiveCount / sentences.length * 100) : 0
    if (passivePercentage < 10) {
        checks.push({ title: 'Passive voice', message: 'Penggunaan kalimat aktif sangat baik.', status: 'good' })
    } else {
        checks.push({ title: 'Passive voice', message: `${Math.round(passivePercentage)}% kalimat pasif. Gunakan lebih banyak kalimat aktif.`, status: 'ok' })
    }

    // 5. Transition words (Simple logic for Indo/Eng)
    const transitions = ['namun', 'selain itu', 'oleh karena itu', 'kemudian', 'tetapi', 'meskipun', 'karena', 'sehingga', 'however', 'moreover', 'therefore', 'because', 'although']
    const hasTransitions = transitions.some(word => content.toLowerCase().includes(word))
    if (hasTransitions) {
        checks.push({ title: 'Transition words', message: 'Penggunaan kata penghubung sudah baik.', status: 'good' })
    } else {
        checks.push({ title: 'Transition words', message: 'Gunakan lebih banyak kata penghubung (namun, karena, dll).', status: 'ok' })
    }

    // 6. Consecutive sentences starting with same word
    let consecutiveSame = false
    for (let i = 0; i < sentences.length - 1; i++) {
        const firstWord1 = (sentences[i]?.trim().split(/\s+/)[0] || '').toLowerCase()
        const firstWord2 = (sentences[i+1]?.trim().split(/\s+/)[0] || '').toLowerCase()
        if (firstWord1 && firstWord1 === firstWord2 && firstWord1.length > 3) {
            consecutiveSame = true; break
        }
    }
    if (!consecutiveSame) {
        checks.push({ title: 'Sentence variety', message: 'Variasi awal kalimat sangat bagus.', status: 'good' })
    } else {
        checks.push({ title: 'Sentence variety', message: 'Hindari memulai kalimat dengan kata yang sama berturut-turut.', status: 'ok' })
    }

    return checks
})

const overallReadabilityScore = computed(() => {
    const good = readabilityChecks.value.filter(c => c.status === 'good').length
    const total = readabilityChecks.value.length

    if (total === 0) return { text: 'Empty', class: 'bg-slate-100 text-slate-400', bg: 'bg-slate-300' }
    if (good >= total * 0.75) return { text: 'Great', class: 'bg-emerald-50 text-emerald-500', bg: 'bg-emerald-500' }
    if (good >= total * 0.5) return { text: 'Good', class: 'bg-blue-50 text-blue-500', bg: 'bg-blue-500' }
    return { text: 'Needs Improvement', class: 'bg-amber-50 text-amber-500', bg: 'bg-amber-500' }
})

onMounted(async () => {


    // Load static data
    try {
        const [cats, tags] = await Promise.all([
            blogService.getCategories(),
            blogService.getTags()
        ])
        categories.value = cats
        suggestedTags.value = tags
    } catch (err) {
        categories.value = [{ id: '1', name: 'UI Design', slug: 'ui' }]
    }

    // Load post if edit mode
    if (isEdit.value) {
        try {
            const data = await blogService.getById(route.params.id as string)
            post.value = { ...data }

            // Ensure categories and tags are initialized as arrays
            if (!post.value.categories) post.value.categories = []
            if (!post.value.tags) post.value.tags = []
        } catch (err) {
            console.error(err)
        }
    }
})



const mediaPickerContext = ref<'featured' | 'content'>('featured')
const editorRef = ref()

const openMediaPicker = () => {
    mediaPickerContext.value = 'featured'
    isMediaPickerOpen.value = true
}

const openMediaPickerForEditor = () => {
    mediaPickerContext.value = 'content'
    isMediaPickerOpen.value = true
}

const handleMediaSelect = (mediaItem: any) => {
    if (mediaPickerContext.value === 'featured') {
        post.value.featured_image = mediaItem.url
        post.value.featured_image_ref = mediaItem.id
        // Also auto-fill alt text if available from media library
        if (mediaItem.alt) {
            post.value.featured_image_alt = mediaItem.alt
        }
        showToast('Featured image updated', 'success')
    } else {
        // Insert into editor with Alt Text
        editorRef.value?.insertImage({ 
            src: mediaItem.url, 
            alt: mediaItem.alt || '' 
        })
    }
    isMediaPickerOpen.value = false
}

// Keep direct file upload as fallback or secondary option inside picker (handled within picker now mainly)


const addTag = async () => {
    const tagName = tagInput.value.trim()
    if (!tagName) return

    tagInput.value = ''

    // Check if tag already exists in suggestedTags
    const existing = suggestedTags.value.find(t => t.name.toLowerCase() === tagName.toLowerCase())
    if (existing) {
        addSuggestedTag(existing)
        return
    }

    // Otherwise create new tag in Sanity
    try {
        const newTag = await blogService.createTag({
            name: tagName,
            slug: tagName.toLowerCase().replace(/\s+/g, '-')
        })
        suggestedTags.value.push(newTag)
        addSuggestedTag(newTag)
        showToast(`Tag "${tagName}" created`, 'success')
    } catch (err: any) {
        showToast('Failed to create tag: ' + err.message, 'error')
    }
}

const addSuggestedTag = (tag: BlogTag) => {
    if (!post.value.tags) post.value.tags = []
    if (!post.value.tags.includes(tag.id)) {
        post.value.tags.push(tag.id)
    }
}

const removeTag = (tagIdToRemove: string) => {
    post.value.tags = post.value.tags?.filter(t => getTagId(t) !== tagIdToRemove)
}

// Helper to get tag ID regardless of type
const getTagId = (tag: string | { id: string; name: string }): string => {
    return typeof tag === 'string' ? tag : tag.id
}

// Helper to get tag display name
const getTagDisplayName = (tag: string | { id: string; name: string }): string => {
    if (typeof tag === 'object') return tag.name
    const found = suggestedTags.value.find(t => t.id === tag)
    return found ? found.name : tag
}



const handleContentUpdate = (html: string) => {
    post.value.content = html

    // Auto-generate excerpt if empty
    if (!post.value.excerpt || post.value.excerpt.length < 5) {
        post.value.excerpt = html.replace(/<[^>]*>/g, '').substring(0, 160).trim()
    }

    // Auto-generate SEO Description if empty
    if (!post.value.seo_description || post.value.seo_description.length < 5) {
        post.value.seo_description = post.value.excerpt
    }

    // Auto-calculate Read Time (avg 200 wpm)
    const text = html.replace(/<[^>]*>/g, ' ')
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length
    if (words > 0) {
        post.value.read_time = Math.max(1, Math.ceil(words / 200))
    }
}

const regenerateExcerpt = () => {
    const html = post.value.content || ''
    post.value.excerpt = html.replace(/<[^>]*>/g, '').substring(0, 160).trim()
}

const handleTitleInput = () => {
    if (!isEditingSlug.value && !isEdit.value) {
        post.value.slug = post.value.title?.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
    }

    // Auto SEO
    post.value.seo_title = post.value.title?.substring(0, 60)
}

const handleSave = async (redirect: boolean = false) => {
    saving.value = true
    try {
        if (isEdit.value) {
            await blogService.update(route.params.id as string, post.value)
            showToast('Article updated successfully', 'success')
            if (redirect) {
                setTimeout(() => router.push('/blog'), 1000)
            }
        } else {
            const result = await blogService.create(post.value)
            showToast('Article published successfully', 'success')
            if (redirect) {
                setTimeout(() => router.push('/blog'), 1000)
            } else if (result && result.id) {
                // Redirect to edit page for the new post
                router.replace(`/blog/${result.id}/edit`)
            }
        }
    } catch (err: any) {
        console.error('Database Save Error:', err)

        // Show friendly error message (no localStorage backup to avoid duplication)
        const errorMsg = err?.message || 'Database connection issue'
        showToast(`Save failed: ${errorMsg}. Please check your connection.`, 'error')
    } finally {
        saving.value = false
    }
}

const showToast = (message: string, variant: 'success' | 'error' = 'success') => {
    toast.value = { show: true, message, variant }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #E2E8F0;
    border-radius: 10px;
}
</style>
