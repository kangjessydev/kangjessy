<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { clientService, type Client } from '@/services/clientService'
import { Printer, MessageCircle, FileText, Calendar, CheckCircle } from 'lucide-vue-next'

const route = useRoute()
const isLoading = ref(true)
const proposal = ref<Client | null>(null)

// Function to format currency
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}

onMounted(async () => {
  const id = route.params.id as string
  console.log('Fetching proposal with ID:', id)
  if (id) {
    try {
      const data = await clientService.getById(id)
      console.log('Received data:', data)
      if (data && data.type === 'proposal') {
        proposal.value = data as Client
      } else {
        console.warn('Data found but not a proposal or empty:', data)
      }
    } catch (e) {
      console.error('Failed to load proposal', e)
    } finally {
      isLoading.value = false
      setTimeout(() => {
        // Automatically open print dialog if ?print=true is in URL
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('print') === 'true' && proposal.value) {
          window.print()
        }
      }, 500)
    }
  }
})

const goWhatsApp = () => {
  const message = `Halo KangJessy, saya sudah meninjau Proposal / Penawaran dengan ID ${proposal.value?.id?.substring(0,8)?.toUpperCase()} untuk project ${proposal.value?.project_name}. Mari kita diskusikan lebih lanjut.`
  window.open(`https://wa.me/6282216853708?text=${encodeURIComponent(message)}`, '_blank')
}

const printPage = () => {
  window.print()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 print:py-0 print:bg-white">
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 print:hidden">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-500">Memuat Proposal...</p>
    </div>

    <!-- Cannot find proposal -->
    <div v-else-if="!proposal" class="max-w-md w-full text-center py-20 print:hidden bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <FileText class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Proposal Tidak Ditemukan</h2>
      <p class="text-gray-500 mb-6">Proposal yang Anda cari tidak ada, tipenya salah, atau mungkin link telah kadaluarsa.</p>
      <div class="text-xs text-gray-400 font-mono mb-8 py-2 px-4 bg-gray-50 rounded select-all">
        Debug ID: {{ route.params.id }}
      </div>
      <a href="/" class="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
        <span class="text-xl">←</span> Kembali ke Beranda
      </a>
    </div>

    <!-- Proposal Content -->
    <div v-else class="max-w-4xl w-full">
      <!-- Top Action Bar (Hidden in Print) -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 print:hidden">
        <div class="text-sm text-gray-500">
          Ref ID: <span class="font-mono bg-gray-200 px-2 py-1 rounded">#{{ proposal.id?.substring(0, 8)?.toUpperCase() }}</span>
        </div>
        <div class="flex gap-3">
          <button @click="printPage" class="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 text-sm font-medium">
            <Printer class="w-4 h-4" />
            <span>Cetak / PDF</span>
          </button>
          <button @click="goWhatsApp" class="flex items-center gap-2 bg-green-600 rounded-md px-4 py-2 hover:bg-green-700 text-white text-sm font-medium">
            <MessageCircle class="w-4 h-4" />
            <span>Diskusi WhatsApp</span>
          </button>
        </div>
      </div>

      <!-- Main Document -->
      <div class="bg-white shadow-xl sm:rounded-2xl p-8 sm:p-12 border border-gray-100 print:shadow-none print:border-none print:p-0">
        
        <!-- Header / Letterhead -->
        <div class="flex flex-col md:flex-row justify-between items-start border-b-2 border-gray-100 pb-8 mb-8 gap-8">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <!-- Dummy Agency Logo -->
              <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span class="text-white font-bold text-xl">K.</span>
              </div>
              <h1 class="text-2xl font-bold text-gray-900 tracking-tight">KANGJESSY<span class="text-primary">.AGENCY</span></h1>
            </div>
            <p class="text-sm text-gray-500">Pakar Web Development & Solusi Digital</p>
            <p class="text-sm text-gray-500 mt-1">contact@kangjessy.com</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-6 md:text-right border border-gray-100 min-w-[280px]">
            <p class="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">Dipersiapkan Untuk:</p>
            <h2 class="text-lg font-bold text-gray-900 leading-tight">{{ proposal.name || 'Klien Terhormat' }}</h2>
            <p v-if="proposal.company" class="text-gray-600 font-medium">{{ proposal.company }}</p>
            <p v-if="proposal.email" class="text-sm text-gray-500 mt-2">{{ proposal.email }}</p>
            <p v-if="proposal.phone" class="text-sm text-gray-500">{{ proposal.phone }}</p>
          </div>
        </div>

        <!-- Proposal Title -->
        <div class="mb-10 text-center">
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-serif">PENAWARAN PROJECT</h1>
          <h2 class="text-xl md:text-2xl text-primary font-semibold tracking-wide">"{{ proposal.project_name || 'Project Digital' }}"</h2>
        </div>

        <!-- Scope & Brief -->
        <div class="mb-10">
          <h3 class="flex items-center text-lg font-bold text-gray-900 mb-4 gap-2 border-b border-gray-100 pb-2">
            <CheckCircle class="w-5 h-5 text-primary" />
            Ruang Lingkup Pekerjaan (Scope)
          </h3>
          <div class="prose prose-sm max-w-none text-gray-600 font-medium whitespace-pre-line leading-relaxed">
            {{ proposal.brief || 'Detail ruang lingkup akan didiskusikan lebih lanjut.' }}
          </div>
        </div>

        <!-- Investment & Timeline -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div class="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
            <Calendar class="w-8 h-8 text-primary mb-3" />
            <p class="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">Estimasi Pengerjaan</p>
            <p class="text-xl font-bold text-gray-900">
              {{ proposal.notes?.match(/\[Timeline:\s*(.*?)\]/)?.[1] || 'TBA' }}
            </p>
          </div>
          <div class="bg-primary/5 p-6 rounded-xl border border-primary/20 flex flex-col items-center justify-center text-center">
            <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-3">Rp</div>
            <p class="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-1">Total Investasi</p>
            <p class="text-2xl font-extrabold text-primary">
              {{ formatRupiah(proposal.budget || 0) }}
            </p>
          </div>
        </div>

        <!-- Terms Footer -->
        <div class="text-sm text-gray-500 border-t border-gray-100 pt-8 print:mb-0 mb-8">
          <h4 class="font-bold text-gray-700 mb-2">Syarat & Ketentuan:</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>Penawaran ini berlaku selama 14 hari sejak tanggal diterbitkan.</li>
            <li>Pekerjaan dimulai setelah DP (Down Payment) minimal 50% diterima.</li>
            <li>Pelunasan dilakukan setelah pekerjaan selesai 100% dan sebelum serah terima aset.</li>
            <li>Revisi di luar ruang lingkup (scope) yang disepakati akan dikenakan biaya tambahan.</li>
          </ul>
        </div>
        
        <div class="text-center text-sm text-gray-400 mt-12 print:mt-16 border-t border-gray-100 pt-6">
          <p>&copy; {{ new Date().getFullYear() }} KangJessy Agency. All rights reserved.</p>
        </div>

      </div>
    </div>
  </div>
</template>
