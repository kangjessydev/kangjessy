<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Illustration/Branding -->
    <div
      class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1B2559] via-[#2a3a7d] to-[#702DFF] relative overflow-hidden"
    >
      <!-- Decorative elements -->
      <div class="absolute inset-0">
        <div
          class="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-20 right-20 w-96 h-96 bg-[#702DFF]/20 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl"
        ></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-between p-12 w-full">
        <div>
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20"
            >
              <span class="text-white font-black text-lg">KJ</span>
            </div>
            <span class="text-white font-bold text-xl">KangJessy</span>
          </div>
        </div>

        <div class="max-w-md">
          <h2 class="text-4xl font-black text-white leading-tight mb-6">
            Manage Your<br />
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200"
              >Digital Empire</span
            >
          </h2>
          <p class="text-indigo-200/80 text-lg leading-relaxed">
            Control your orders, blog, portfolio, and finances — all from one
            powerful dashboard.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mt-10">
            <div
              class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
            >
              <p class="text-3xl font-black text-white">99%</p>
              <p
                class="text-[10px] font-bold text-indigo-200/60 uppercase tracking-widest mt-1"
              >
                Uptime
              </p>
            </div>
            <div
              class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
            >
              <p class="text-3xl font-black text-white">50+</p>
              <p
                class="text-[10px] font-bold text-indigo-200/60 uppercase tracking-widest mt-1"
              >
                Projects
              </p>
            </div>
            <div
              class="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
            >
              <p class="text-3xl font-black text-white">24/7</p>
              <p
                class="text-[10px] font-bold text-indigo-200/60 uppercase tracking-widest mt-1"
              >
                Access
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <p class="text-indigo-300/50 text-sm">
          © 2026 KangJessy Agency. All rights reserved.
        </p>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div
      class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F4F7FE]"
    >
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-8">
          <div
            class="inline-flex w-16 h-16 bg-gradient-to-br from-[#1B2559] to-[#702DFF] rounded-3xl items-center justify-center mb-4 shadow-xl shadow-indigo-500/20"
          >
            <span class="text-white font-black text-2xl">KJ</span>
          </div>
          <h1 class="text-2xl font-black text-[#1B2559]">KangJessy Admin</h1>
        </div>

        <!-- Form Card -->
        <div
          class="bg-white rounded-[32px] p-8 md:p-10 shadow-xl shadow-slate-200/50"
        >
          <div class="text-center mb-8">
            <h1 class="text-2xl font-black text-[#1B2559] mb-2">
              Welcome Back!
            </h1>
            <p class="text-slate-400 text-sm">
              Enter your credentials to access dashboard
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Email -->
            <div>
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
                >Email Address</label
              >
              <div class="relative">
                <Mail
                  :size="18"
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="admin@kangjessy.com"
                  class="w-full pl-12 pr-4 py-3.5 bg-[#F4F7FE] border-2 border-transparent rounded-2xl text-sm font-medium text-[#1B2559] placeholder:text-slate-300 focus:border-[#702DFF] focus:bg-white outline-none transition-all"
                  :class="{ 'border-rose-500 bg-rose-50/50': errors.email }"
                  required
                />
              </div>
              <p
                v-if="errors.email"
                class="text-xs text-rose-500 mt-2 font-medium"
              >
                {{ errors.email }}
              </p>
            </div>

            <!-- Password -->
            <div>
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2"
                >Password</label
              >
              <div class="relative">
                <Lock
                  :size="18"
                  class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full pl-12 pr-12 py-3.5 bg-[#F4F7FE] border-2 border-transparent rounded-2xl text-sm font-medium text-[#1B2559] placeholder:text-slate-300 focus:border-[#702DFF] focus:bg-white outline-none transition-all"
                  :class="{ 'border-rose-500 bg-rose-50/50': errors.password }"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  <Eye v-if="!showPassword" :size="18" />
                  <EyeOff v-else :size="18" />
                </button>
              </div>
              <p
                v-if="errors.password"
                class="text-xs text-rose-500 mt-2 font-medium"
              >
                {{ errors.password }}
              </p>
            </div>

            <!-- Remember Me & Forgot -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="rememberMe"
                  class="w-4 h-4 rounded border-slate-300 text-[#702DFF] focus:ring-[#702DFF]"
                />
                <span class="text-xs font-medium text-slate-400"
                  >Remember me</span
                >
              </label>
              <a
                href="#"
                class="text-xs font-bold text-[#702DFF] hover:text-indigo-600 transition-colors"
                >Forgot password?</a
              >
            </div>

            <!-- Error Message -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-if="errors.general"
                class="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl"
              >
                <div
                  class="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center shrink-0"
                >
                  <AlertCircle :size="16" class="text-rose-500" />
                </div>
                <p class="text-sm text-rose-600 font-medium">
                  {{ errors.general }}
                </p>
              </div>
            </Transition>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-4 bg-gradient-to-r from-[#1B2559] to-[#702DFF] text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              <Loader2 v-if="loading" :size="18" class="animate-spin" />
              <span>{{ loading ? "Signing in..." : "Sign In" }}</span>
              <ArrowRight v-if="!loading" :size="18" />
            </button>
          </form>
        </div>

        <!-- Footer (Desktop) -->
        <p class="hidden lg:block text-center text-xs text-slate-400 mt-8">
          Protected by enterprise-grade security
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-vue-next";
import { auth } from "@kangjessy/database";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const loading = ref(false);
const errors = ref({
  email: "",
  password: "",
  general: "",
});

const handleLogin = async () => {
  // Reset errors
  errors.value = { email: "", password: "", general: "" };

  // Validation
  if (!email.value) {
    errors.value.email = "Email is required";
    return;
  }
  if (!password.value) {
    errors.value.password = "Password is required";
    return;
  }

  loading.value = true;

  try {
    const { error } = await auth.signIn(email.value, password.value);

    if (error) {
      errors.value.general = error.message;
    } else {
      router.push("/");
    }
  } catch (err) {
    errors.value.general = "An error occurred. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
