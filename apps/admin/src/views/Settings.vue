<template>
  <div class="page-container">
    <PageHeader
      title="System Settings"
      subtitle="Manage your preferences, security, and data"
    >
      <div class="flex gap-3">
        <BaseButton variant="secondary" @click="$router.push('/')"
          >Back</BaseButton
        >
        <BaseButton
          v-if="activeTab === 'general'"
          variant="primary"
          @click="handleSave"
          :loading="saving"
        >
          <Save :size="18" />
          Save Changes
        </BaseButton>
      </div>
    </PageHeader>

    <!-- Tabs Navigation -->
    <div
      class="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-fit"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
      >
        <component :is="tab.icon" :size="16" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <transition name="tab-fade" mode="out-in">
      <!-- General Settings Tab -->
      <div
        v-if="activeTab === 'general'"
        key="general"
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        <!-- Admin Core Info -->
        <div class="lg:col-span-4 space-y-8">
          <AdminCard title="Profile" :stretch="false">
            <div class="flex flex-col items-center py-6">
              <div class="relative group cursor-pointer mb-6">
                <div
                  class="w-32 h-32 rounded-[40px] bg-slate-50 border-4 border-white shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-105"
                >
                  <img :src="profileImage" class="w-full h-full object-cover" />
                </div>
                <div
                  class="absolute inset-0 bg-[#702DFF]/20 backdrop-blur-[2px] rounded-[40px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                >
                  <div
                    class="p-3 bg-white rounded-2xl shadow-xl text-[#702DFF]"
                  >
                    <Camera :size="24" />
                  </div>
                </div>
              </div>
              <h3 class="text-xl font-black text-[#1B2559]">Kang Jessy</h3>
              <p
                class="text-[10px] font-black text-[#702DFF] bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest mt-2 border border-indigo-100"
              >
                Super Admin
              </p>
            </div>

            <div class="space-y-4 px-2">
              <div>
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                  >Name</label
                >
                <BaseInput v-model="profile.name" placeholder="Your Name" />
              </div>
              <div>
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                  >Email</label
                >
                <BaseInput
                  v-model="profile.email"
                  type="email"
                  placeholder="admin@agency.com"
                />
              </div>
            </div>
          </AdminCard>
        </div>

        <!-- Preferences -->
        <div class="lg:col-span-8 space-y-8">
          <AdminCard title="Preferences">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 py-4">
              <div class="space-y-8">
                <div class="flex items-center justify-between group">
                  <div>
                    <p
                      class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                    >
                      Email Notifications
                    </p>
                    <p class="text-[10px] text-slate-400 font-medium">
                      Get notified for new leads
                    </p>
                  </div>
                  <button
                    @click="toggles.notifications = !toggles.notifications"
                    class="w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner"
                    :class="
                      toggles.notifications ? 'bg-emerald-500' : 'bg-slate-200'
                    "
                  >
                    <div
                      class="absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-md"
                      :class="toggles.notifications ? 'left-7' : 'left-1'"
                    ></div>
                  </button>
                </div>

                <div class="flex items-center justify-between group">
                  <div>
                    <p
                      class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                    >
                      WhatsApp Alerts
                    </p>
                    <p class="text-[10px] text-slate-400 font-medium">
                      Alert when deal is closed
                    </p>
                  </div>
                  <button
                    @click="toggles.wa = !toggles.wa"
                    class="w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner"
                    :class="toggles.wa ? 'bg-emerald-500' : 'bg-slate-200'"
                  >
                    <div
                      class="absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-md"
                      :class="toggles.wa ? 'left-7' : 'left-1'"
                    ></div>
                  </button>
                </div>
              </div>

              <div class="space-y-6">
                <AdminSelect label="Currency" class="!text-[10px]">
                  <option>Rupiah (IDR)</option>
                  <option>Dollar (USD)</option>
                </AdminSelect>
                <AdminSelect label="Language" class="!text-[10px]">
                  <option>Bahasa Indonesia</option>
                  <option>English</option>
                </AdminSelect>
              </div>
            </div>
          </AdminCard>

          <!-- Agency Branding -->
          <AdminCard
            title="Agency Branding"
            subtitle="Sesuaikan identitas agensi Bapak yang muncul di Proposal & Invoice"
            class="mt-8"
          >
            <div class="flex items-center gap-8 py-2">
              <div class="relative group cursor-pointer shrink-0">
                <div
                  class="w-20 h-20 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#702DFF]/30"
                >
                  <img
                    v-if="branding.logo"
                    :src="branding.logo"
                    class="w-full h-full object-contain p-2"
                  />
                  <Image v-else :size="24" class="text-slate-300" />
                </div>
                <div
                  @click="openMediaPicker('branding')"
                  class="absolute inset-0 bg-[#702DFF]/80 backdrop-blur-[2px] rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                >
                  <Upload :size="18" class="text-white" />
                </div>
              </div>

              <div class="flex-1 space-y-4">
                <div>
                  <label
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                    >Nama Agensi</label
                  >
                  <BaseInput
                    v-model="branding.name"
                    placeholder="e.g. KANG JESSY ECOSYSTEM"
                  />
                </div>
              </div>
            </div>
          </AdminCard>

          <!-- Contact Info -->
          <AdminCard
            title="Info Kontak"
            subtitle="Nomor WhatsApp, Email, dan Alamat Agensi"
            class="mt-8"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
              <div>
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                  >Nomor WhatsApp</label
                >
                <BaseInput
                  v-model="contact.whatsapp"
                  placeholder="e.g. 6288218705xxx"
                >
                  <template #icon>
                    <MessageCircle :size="16" class="text-emerald-500" />
                  </template>
                </BaseInput>
              </div>
              <div>
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                  >Email Support</label
                >
                <BaseInput
                  v-model="contact.email"
                  type="email"
                  placeholder="admin@agency.com"
                >
                  <template #icon>
                    <Mail :size="16" class="text-rose-500" />
                  </template>
                </BaseInput>
              </div>
              <div class="md:col-span-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                  >Pesan WA Default</label
                >
                <textarea
                  v-model="contact.whatsappMsg"
                  rows="2"
                  class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#702DFF]/10 focus:border-[#702DFF] transition-all"
                  placeholder="Halo KangJessy..."
                ></textarea>
              </div>
              <div class="md:col-span-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                  >Lokasi / Alamat</label
                >
                <BaseInput
                  v-model="contact.location"
                  placeholder="e.g. Bandung, Indonesia"
                >
                  <template #icon>
                    <MapPin :size="16" class="text-indigo-500" />
                  </template>
                </BaseInput>
              </div>
            </div>
          </AdminCard>

          <!-- Social Media Links -->
          <AdminCard
            title="Sosial Media"
            subtitle="Kelola link Instagram, LinkedIn, YouTube, dll"
            class="mt-8"
          >
            <template #action>
              <BaseButton variant="secondary" size="sm" @click="addSocial">
                <Plus :size="14" /> Tambah Sosmed
              </BaseButton>
            </template>

            <div class="space-y-4 py-2">
              <div
                v-for="(social, index) in contact.socials"
                :key="index"
                class="flex flex-col md:flex-row gap-4 p-4 bg-slate-50 border border-slate-100 rounded-3xl relative group"
              >
                <button
                  @click="removeSocial(index)"
                  class="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  <Trash2 :size="14" />
                </button>

                <div class="w-full md:w-32">
                  <label
                    class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1"
                    >Platform</label
                  >
                  <select
                    v-model="social.icon"
                    class="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#702DFF]/10 focus:border-[#702DFF] appearance-none cursor-pointer"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="Linkedin">LinkedIn</option>
                    <option value="Github">GitHub</option>
                    <option value="Youtube">YouTube</option>
                    <option value="Hash">Thread</option>
                    <option value="Twitter">Twitter / X</option>
                    <option value="Globe">Website</option>
                  </select>
                </div>

                <div class="flex-1">
                  <label
                    class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1"
                    >Nama Tampilan</label
                  >
                  <BaseInput
                    v-model="social.name"
                    placeholder="e.g. Instagram"
                  />
                </div>

                <div class="flex-2">
                  <label
                    class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1"
                    >URL Profile</label
                  >
                  <BaseInput
                    v-model="social.url"
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              <div
                v-if="contact.socials.length === 0"
                class="py-12 flex flex-col items-center justify-center text-slate-400"
              >
                <Hash :size="48" class="opacity-10 mb-4" />
                <p class="text-xs font-medium">Belu ada link sosial media.</p>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      <!-- Payment Settings Tab -->
      <div
        v-else-if="activeTab === 'payment'"
        key="payment"
        class="space-y-8 animate-fade-in-up"
      >
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-7 space-y-6">
            <AdminCard
              title="Metode Pembayaran"
              subtitle="Kelola daftar rekening bank tujuan pembayaran"
            >
              <template #action>
                <BaseButton variant="secondary" size="sm" @click="addAccount">
                  <Plus :size="14" /> Tambah Rekening
                </BaseButton>
              </template>

              <div class="space-y-6">
                <div
                  v-for="(acc, index) in bankAccounts"
                  :key="index"
                  class="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4 relative group"
                >
                  <button
                    v-if="bankAccounts.length > 1"
                    @click="removeAccount(index)"
                    class="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 :size="16" />
                  </button>

                  <div class="flex items-center gap-6">
                    <div class="relative group cursor-pointer">
                      <div
                        class="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center overflow-hidden transition-all group-hover:border-[#702DFF]/30 group-hover:shadow-indigo-500/10"
                      >
                        <img
                          v-if="getBankLogo(acc.bank_name, acc.bank_logo)"
                          :src="getBankLogo(acc.bank_name, acc.bank_logo)"
                          class="w-full h-full object-contain p-2"
                        />
                        <div
                          v-else
                          class="flex flex-col items-center gap-1 text-slate-300"
                        >
                          <Image :size="20" />
                          <span class="text-[8px] font-black uppercase"
                            >Logo</span
                          >
                        </div>
                      </div>
                      <!-- Hover Overlay -->
                      <div
                        @click="openMediaPicker('bank', index)"
                        class="absolute inset-0 bg-[#702DFF]/80 backdrop-blur-[2px] rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                      >
                        <Upload :size="16" class="text-white" />
                      </div>
                    </div>

                    <div class="flex-1 space-y-3">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                            >Nama Bank</label
                          >
                          <BaseInput
                            v-model="acc.bank_name"
                            placeholder="e.g. BCA"
                          />
                        </div>
                        <div>
                          <label
                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                            >Nomor Rekening</label
                          >
                          <BaseInput
                            v-model="acc.account_number"
                            placeholder="e.g. 1234567890"
                          />
                        </div>
                      </div>
                      <div class="flex items-center justify-between gap-4">
                        <div class="flex-1">
                          <label
                            class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1"
                            >Atas Nama</label
                          >
                          <BaseInput
                            v-model="acc.account_holder"
                            placeholder="e.g. PT Kang Jessy"
                          />
                        </div>
                        <div class="pt-6">
                          <button
                            @click="acc.is_active = !acc.is_active"
                            class="flex items-center gap-2 px-3 py-2 rounded-xl transition-all border"
                            :class="
                              acc.is_active
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                : 'bg-slate-50 border-slate-100 text-slate-400 opacity-50'
                            "
                          >
                            <div
                              class="w-2 h-2 rounded-full"
                              :class="
                                acc.is_active
                                  ? 'bg-emerald-500'
                                  : 'bg-slate-300'
                              "
                            ></div>
                            <span
                              class="text-[9px] font-black uppercase tracking-widest"
                            >
                              {{ acc.is_active ? "Aktif" : "Non-aktif" }}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>

          <div class="lg:col-span-5 space-y-6">
            <AdminCard
              title="Preview Tampilan"
              subtitle="Tampilan di Proposal & Invoice"
            >
              <div
                class="p-8 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col gap-4 min-h-[300px]"
              >
                <div
                  v-for="(acc, idx) in bankAccounts.filter((a) => a.is_active)"
                  :key="idx"
                  class="w-full p-4 bg-white rounded-2xl border border-indigo-100 shadow-sm"
                >
                  <p
                    class="text-[8px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2"
                  >
                    Official Account {{ idx + 1 }}
                  </p>
                  <div class="flex items-center gap-4">
                    <div
                      class="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center p-1.5 shadow-sm overflow-hidden"
                    >
                      <img
                        v-if="getBankLogo(acc.bank_name, acc.bank_logo)"
                        :src="getBankLogo(acc.bank_name, acc.bank_logo)"
                        class="w-full h-full object-contain"
                      />
                      <div
                        v-else
                        class="w-full h-full bg-indigo-50 flex items-center justify-center font-black text-indigo-600 text-[8px]"
                      >
                        {{
                          acc.bank_name?.substring(0, 3).toUpperCase() || "BNK"
                        }}
                      </div>
                    </div>
                    <div>
                      <p
                        class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest leading-none mb-1"
                      >
                        {{ acc.account_number || "000-000-000" }}
                      </p>
                      <p
                        class="text-[9px] font-bold text-slate-400 leading-none"
                      >
                        a.n. {{ acc.account_holder || "Nama Pemilik" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
        <div class="flex justify-end border-t border-slate-100 pt-6">
          <BaseButton
            variant="primary"
            :loading="saving"
            @click="handleSavePayment"
          >
            <Save :size="18" /> Simpan Konfigurasi
          </BaseButton>
        </div>
      </div>

      <!-- Dokumen Settings Tab -->
      <div
        v-else-if="activeTab === 'documents'"
        key="documents"
        class="space-y-8 animate-fade-in-up"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <AdminCard
            title="Proposal Links"
            subtitle="Link GDrive Proposal sesuai tipe proyek"
          >
            <div class="space-y-6">
              <div
                v-for="doc in docLinks"
                :key="doc.id"
                class="p-4 bg-slate-50 rounded-2xl space-y-3"
              >
                <BaseInput
                  v-model="doc.proposal_link"
                  :label="doc.project_type"
                  placeholder="Pastikan link GDrive sudah 'Anyone with link'..."
                  :icon="LinkIcon"
                />
              </div>
            </div>
          </AdminCard>

          <AdminCard
            title="Kontrak Kerja"
            subtitle="Link GDrive Kontrak sesuai tipe proyek"
          >
            <div class="space-y-6">
              <div
                v-for="doc in docLinks"
                :key="doc.id"
                class="p-4 bg-slate-50 rounded-2xl space-y-3"
              >
                <BaseInput
                  v-model="doc.contract_link"
                  :label="doc.project_type"
                  placeholder="Link Draft Kontrak Kerja..."
                  :icon="FileText"
                />
              </div>
            </div>
          </AdminCard>
        </div>

        <div class="flex justify-end pt-4">
          <BaseButton
            variant="primary"
            @click="handleSaveDocs"
            :loading="saving"
          >
            <Save :size="18" />
            Simpan Konfigurasi Dokumen
          </BaseButton>
        </div>
      </div>

      <!-- Security Tab -->
      <div v-else-if="activeTab === 'security'" key="security">
        <AdminCard title="Security Settings">
          <div class="space-y-6">
            <div
              class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-4 bg-slate-50 rounded-2xl"
            >
              <div class="flex items-center gap-5">
                <div
                  class="w-14 h-14 rounded-3xl bg-indigo-50 text-[#702DFF] flex items-center justify-center border border-indigo-100"
                >
                  <ShieldCheck :size="28" />
                </div>
                <div>
                  <p
                    class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                  >
                    Two-Factor Authentication
                  </p>
                  <p
                    class="text-[10px] text-rose-500 font-black uppercase tracking-tighter flex items-center gap-1.5"
                  >
                    <AlertCircle :size="10" />
                    Not enabled
                  </p>
                </div>
              </div>
              <BaseButton variant="primary" size="sm">Enable 2FA</BaseButton>
            </div>

            <div
              class="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-4 bg-slate-50 rounded-2xl"
            >
              <div class="flex items-center gap-5">
                <div
                  class="w-14 h-14 rounded-3xl bg-slate-100 text-slate-500 flex items-center justify-center"
                >
                  <Key :size="28" />
                </div>
                <div>
                  <p
                    class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                  >
                    Change Password
                  </p>
                  <p class="text-[10px] text-slate-400 font-medium">
                    Last changed 30 days ago
                  </p>
                </div>
              </div>
              <BaseButton variant="secondary" size="sm">Update</BaseButton>
            </div>

            <div
              class="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center"
            >
              <div class="flex items-center gap-2">
                <div
                  class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                ></div>
                <p
                  class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >
                  Supabase Auth
                </p>
              </div>
              <button
                class="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-700 transition-colors"
              >
                Logout All Sessions
              </button>
            </div>
          </div>
        </AdminCard>
      </div>

      <!-- Backup & Export Tab -->
      <div v-else-if="activeTab === 'backup'" key="backup">
        <AdminCard title="Backup & Export">
          <div class="space-y-6">
            <!-- Full Backup -->
            <div
              class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-2xl bg-[#702DFF] text-white flex items-center justify-center"
                >
                  <Archive :size="24" />
                </div>
                <div>
                  <p
                    class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                  >
                    Full System Backup
                  </p>
                  <p class="text-[10px] text-slate-400 font-medium">
                    Export all data in one JSON file
                  </p>
                </div>
              </div>
              <BaseButton
                variant="primary"
                @click="handleFullBackup"
                :loading="isExporting"
              >
                <Database :size="16" />
                Create Backup
              </BaseButton>
            </div>

            <!-- Per-Module Export -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Blog Posts -->
              <div
                class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"
                  >
                    <FileJson :size="16" />
                  </div>
                  <div>
                    <p
                      class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                    >
                      Blog Posts
                    </p>
                    <p class="text-[9px] text-slate-400">
                      {{ blogPosts.length }} records
                    </p>
                  </div>
                </div>
                <ExportButton
                  :data="blogPosts"
                  moduleName="blog"
                  size="sm"
                  @exported="handleExported"
                  class="w-fit"
                />
              </div>

              <!-- Portfolio -->
              <div
                class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center"
                  >
                    <FileJson :size="16" />
                  </div>
                  <div>
                    <p
                      class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                    >
                      Portfolio
                    </p>
                    <p class="text-[9px] text-slate-400">
                      {{ portfolioProjects.length }} records
                    </p>
                  </div>
                </div>
                <ExportButton
                  :data="portfolioProjects"
                  moduleName="portfolio"
                  size="sm"
                  @exported="handleExported"
                  class="w-fit"
                />
              </div>

              <!-- Clients -->
              <div
                class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"
                  >
                    <FileJson :size="16" />
                  </div>
                  <div>
                    <p
                      class="text-[10px] font-black text-[#1B2559] uppercase tracking-widest"
                    >
                      Clients
                    </p>
                    <p class="text-[9px] text-slate-400">
                      {{ clients.length }} records
                    </p>
                  </div>
                </div>
                <ExportButton
                  :data="clients"
                  moduleName="clients"
                  size="sm"
                  @exported="handleExported"
                  class="w-fit"
                />
              </div>
            </div>

            <!-- Export Info -->
            <div
              class="flex items-center gap-2 text-slate-400 mt-4 p-3 bg-slate-50 rounded-xl"
            >
              <Download :size="14" />
              <p class="text-[10px] font-medium">
                All exports include metadata for easy re-import
              </p>
            </div>
          </div>
        </AdminCard>

        <!-- Restore / Import Section -->
        <AdminCard title="Restore Data" class="mt-6">
          <div
            class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center"
              >
                <Upload :size="24" />
              </div>
              <div>
                <p
                  class="text-[11px] font-black text-[#1B2559] uppercase tracking-widest mb-1"
                >
                  Restore from Backup
                </p>
                <p class="text-[10px] text-slate-400 font-medium">
                  Import data from a previously exported JSON file
                </p>
              </div>
            </div>
            <ImportButton
              label="Import Data"
              variant="primary"
              :importHandler="handleImport"
              @imported="handleImported"
            />
          </div>
          <div
            class="flex items-start gap-2 mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100"
          >
            <AlertTriangle :size="14" class="text-amber-500 shrink-0 mt-0.5" />
            <p class="text-[10px] text-amber-700">
              Import will add new records. Existing data with same ID may be
              updated.
            </p>
          </div>
        </AdminCard>
      </div>
    </transition>

    <MediaPickerModal
      :is-open="isPickerOpen"
      @close="isPickerOpen = false"
      @select="handleMediaSelect"
    />

    <!-- Toast -->
    <Toast
      v-if="toast.show"
      :message="toast.message"
      :variant="toast.variant"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, markRaw, computed } from "vue";
import {
  Save,
  Camera,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  Download,
  Upload,
  Database,
  FileJson,
  Archive,
  Settings as SettingsIcon,
  Shield,
  HardDrive,
  Key,
  FileText,
  Link as LinkIcon,
  CreditCard,
  Plus,
  Trash2,
  Image,
  Hash,
  Linkedin,
  Github,
  Youtube,
  Instagram,
  MapPin,
  Mail,
  MessageCircle,
} from "lucide-vue-next";
import AdminCard from "../components/ui/AdminCard.vue";
import AdminSelect from "../components/ui/AdminSelect.vue";
import PageHeader from "../components/ui/PageHeader.vue";
import { BaseButton } from "@kangjessy/ui";
import BaseInput from "../components/ui/BaseInput.vue";
import Toast from "../components/ui/Toast.vue";
import MediaPickerModal from "../components/media/MediaPickerModal.vue";
import ExportButton from "../components/ui/ExportButton.vue";
import ImportButton from "../components/ui/ImportButton.vue";
import { useExport } from "../composables/useExport";
import { useBranding } from "../composables/useBranding";
import { usePaymentSettings } from "../composables/usePaymentSettings";
import { useProfile } from "../composables/useProfile";
import { useContact } from "../composables/useContact";
import { blogService } from "../services/blogService";
import { portfolioService } from "../services/portfolioService";
import { clientsService } from "../services/clientsService";
import { docsService, type DocLink } from "../services/docsService";

// Tabs Configuration
const tabs = [
  { id: "general", label: "General", icon: markRaw(SettingsIcon) },
  { id: "payment", label: "Payment Methods", icon: markRaw(CreditCard) },
  { id: "documents", label: "Dokumen", icon: markRaw(FileText) },
  { id: "security", label: "Security", icon: markRaw(Shield) },
  { id: "backup", label: "Backup & Export", icon: markRaw(HardDrive) },
];

const activeTab = ref("general");

const profileImage = computed(() => {
  return (
    profile.value.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.value.name)}&background=702DFF&color=fff&size=200`
  );
});

const saving = ref(false);
const toast = ref({
  show: false,
  message: "",
  variant: "success" as "success" | "error",
});

// Media Picker State
const isPickerOpen = ref(false);
const pickerContext = ref<{ type: "bank" | "branding"; index?: number } | null>(
  null,
);

const openMediaPicker = (type: "bank" | "branding", index?: number) => {
  pickerContext.value = { type, index };
  isPickerOpen.value = true;
};

const handleMediaSelect = (media: any) => {
  const ctx = pickerContext.value;
  if (!ctx) return;

  if (ctx.type === "bank" && ctx.index !== undefined) {
    bankAccounts.value[ctx.index].bank_logo = media.url;
  } else if (ctx.type === "branding") {
    branding.value.logo = media.url;
  }
  isPickerOpen.value = false;
  pickerContext.value = null;
};

const { branding, saveBranding } = useBranding();
const {
  bankAccounts,
  saveBankAccounts,
  addAccount,
  removeAccount,
  getBankLogo,
} = usePaymentSettings();
const { contact, saveContact, addSocial, removeSocial, initContact } =
  useContact();
const { profile, saveProfile, initProfile } = useProfile();

const toggles = ref({
  notifications: true,
  wa: false,
});

const handleSaveBranding = async () => {
  saving.value = true;
  saveBranding(branding.value);
  setTimeout(() => {
    saving.value = false;
    toast.value = {
      show: true,
      message: "Identitas Agensi tersimpan!",
      variant: "success",
    };
  }, 800);
};

const handleSavePayment = async () => {
  saving.value = true;
  saveBankAccounts(bankAccounts.value);
  setTimeout(() => {
    saving.value = false;
    toast.value = {
      show: true,
      message: "Info pembayaran tersimpan!",
      variant: "success",
    };
  }, 800);
};

// Export functionality
const { exportFullBackup, isExporting } = useExport();

// Data for export
const blogPosts = ref<any[]>([]);
const portfolioProjects = ref<any[]>([]);
const clients = ref<any[]>([]);

const loadExportData = async () => {
  try {
    blogPosts.value = await blogService.getAll();
    portfolioProjects.value = await portfolioService.getAll();
    clients.value = await clientsService.getAll();
  } catch (error) {
    console.error("Failed to load export data:", error);
  }
};

const handleFullBackup = async () => {
  const result = await exportFullBackup({
    blog: blogPosts.value,
    portfolio: portfolioProjects.value,
    clients: clients.value,
  });
  if (result.success) {
    toast.value = {
      show: true,
      message: `Full backup created: ${result.filename}`,
      variant: "success",
    };
  } else {
    toast.value = {
      show: true,
      message: "Backup failed. Please try again.",
      variant: "error",
    };
  }
};

const handleExported = (result: { success: boolean; filename?: string }) => {
  if (result.success) {
    toast.value = {
      show: true,
      message: `Exported: ${result.filename}`,
      variant: "success",
    };
  }
};

// Import Handlers
const handleImport = async (moduleName: string, data: any[]) => {
  let imported = 0;
  const errors: string[] = [];

  try {
    for (const item of data) {
      try {
        if (moduleName.toLowerCase().includes("blog")) {
          if (item.id) {
            await blogService.update(item.id, item);
          } else {
            await blogService.create(item);
          }
        } else if (moduleName.toLowerCase().includes("portfolio")) {
          if (item.id) {
            await portfolioService.update(item.id, item);
          } else {
            await portfolioService.create(item);
          }
        } else if (
          moduleName.toLowerCase().includes("clients") ||
          moduleName.toLowerCase().includes("leads")
        ) {
          if (item.id) {
            await clientsService.update(item.id, item);
          } else {
            const { id, created_at, ...cleanInfo } = item;
            await clientsService.create(cleanInfo);
          }
        }
        imported++;
      } catch (err: any) {
        errors.push(`Error in record ${imported + 1}: ${err.message}`);
      }
    }
    return {
      success: true,
      imported,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (err: any) {
    return { success: false, imported, errors: [err.message] };
  }
};

const handleImported = (result: {
  success: boolean;
  message: string;
  recordCount?: number;
}) => {
  if (result.success) {
    toast.value = { show: true, message: result.message, variant: "success" };
    loadExportData();
  } else {
    toast.value = { show: true, message: result.message, variant: "error" };
  }
};

const docLinks = ref<DocLink[]>([]);

const loadDocs = async () => {
  docLinks.value = await docsService.getLinks();
};

onMounted(() => {
  loadExportData();
  loadDocs();
  initContact();
});

const handleSaveDocs = async () => {
  saving.value = true;
  try {
    await docsService.saveLinks(docLinks.value);
    toast.value = {
      show: true,
      message: "Link dokumen berhasil diperbarui!",
      variant: "success",
    };
  } catch (e) {
    toast.value = {
      show: true,
      message: "Gagal memperbarui link.",
      variant: "error",
    };
  } finally {
    saving.value = false;
  }
};

const handleSaveProfile = async () => {
  saving.value = true;
  saveProfile(profile.value);
  setTimeout(() => {
    saving.value = false;
    toast.value = {
      show: true,
      message: "Profil Admin diperbarui!",
      variant: "success",
    };
  }, 800);
};

const handleSave = async () => {
  saving.value = true;
  try {
    await saveProfile(profile.value);
    await saveBranding(branding.value);
    await saveContact(contact.value);
    toast.value = {
      show: true,
      message: "Seluruh pengaturan umum berhasil disimpan!",
      variant: "success",
    };
  } catch (e) {
    toast.value = {
      show: true,
      message: "Gagal menyimpan beberapa pengaturan.",
      variant: "error",
    };
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
@reference "tailwindcss";
.tab-button {
  @apply px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200;
  @apply text-slate-500 hover:text-slate-700 hover:bg-slate-50;
}

.tab-button.active {
  @apply bg-[#702DFF] text-white shadow-lg shadow-indigo-500/20;
}

.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.2s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
