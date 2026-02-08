<template>
  <header
    class="content-header px-6 py-4 sticky top-0 z-40 flex items-center justify-between transition-all duration-300"
    :class="
      scrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-indigo-500/5'
        : 'bg-transparent'
    "
  >
    <div class="flex items-center gap-4">
      <!-- Toggle Button -->
      <button
        @click="toggleSidebar"
        class="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-[#702DFF] hover:bg-white hover:shadow-lg hover:shadow-indigo-500/10 transition-all active:scale-95"
      >
        <Menu v-if="isCollapsed" :size="20" />
        <MenuIcon v-else :size="20" />
      </button>

      <!-- Breadcrumb / Page Title -->
      <div>
        <div
          class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5"
        >
          Pages / {{ currentPage }}
        </div>
        <h2 class="text-2xl font-black text-[#1B2559] tracking-tight">
          {{ currentTitle }}
        </h2>
      </div>
    </div>

    <!-- Right Actions -->
    <div
      class="flex items-center gap-3 md:gap-4 p-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm border border-white/50"
    >
      <!-- Search (Collapsed on mobile) -->
      <div class="relative group hidden sm:block">
        <div
          class="flex items-center bg-[#F4F7FE] rounded-full px-4 py-2.5 transition-all group-focus-within:bg-white group-focus-within:ring-2 group-focus-within:ring-[#702DFF] group-focus-within:shadow-lg group-focus-within:shadow-indigo-500/20"
        >
          <Search
            :size="16"
            class="text-slate-400 group-focus-within:text-[#702DFF] transition-colors"
          />
          <input
            type="text"
            placeholder="Search..."
            class="bg-transparent border-none text-xs font-bold text-[#1B2559] placeholder:text-slate-400 focus:ring-0 ml-2 w-24 focus:w-48 transition-all duration-300"
          />
        </div>
      </div>

      <!-- Theme Toggle -->
      <ThemeToggle :size="18" />

      <!--Notifications -->
      <div class="relative">
        <button
          @click="showNotifications = !showNotifications"
          class="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-[#702DFF] hover:bg-white hover:shadow-md transition-all relative"
        >
          <Bell :size="18" />
          <span
            v-if="notifications.length > 0"
            class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"
          ></span>
        </button>

        <!-- Notifications Dropdown -->
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 scale-95 translate-y-2"
          enter-to-class="transform opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100 translate-y-0"
          leave-to-class="transform opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="showNotifications"
            class="absolute right-0 mt-4 w-80 bg-white rounded-[24px] shadow-2xl shadow-indigo-500/10 border border-slate-100 overflow-hidden z-[60]"
          >
            <div
              class="p-5 border-b border-slate-50 flex justify-between items-center bg-gradient-to-r from-[#1B2559] to-[#2a3a7d]"
            >
              <h3 class="text-sm font-black text-white">Notifications</h3>
              <button
                @click="notifications = []"
                class="text-[10px] font-bold text-indigo-200 uppercase tracking-wider hover:text-white transition-colors"
              >
                Mark read
              </button>
            </div>
            <div class="max-h-[350px] overflow-y-auto">
              <div v-if="notifications.length === 0" class="p-10 text-center">
                <div
                  class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3"
                >
                  <Bell :size="20" class="text-slate-300" />
                </div>
                <p class="text-xs font-bold text-slate-400">
                  No new notifications
                </p>
              </div>
              <div
                v-else
                v-for="(n, idx) in notifications"
                :key="idx"
                class="p-4 hover:bg-slate-50 border-b border-slate-50 last:border-0 cursor-pointer transition-colors group"
              >
                <div class="flex gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                  >
                    <component
                      :is="n.icon || Users"
                      :size="18"
                      class="text-[#702DFF]"
                    />
                  </div>
                  <div>
                    <p
                      class="text-xs font-bold text-[#1B2559] leading-snug group-hover:text-[#702DFF] transition-colors"
                    >
                      {{ n.title }}
                    </p>
                    <p class="text-[10px] text-slate-400 font-medium mt-1">
                      {{ n.time }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Profile -->
      <!-- Profile Dropdown -->
      <div class="relative profile-menu-container">
        <button
          @click.stop="showProfileMenu = !showProfileMenu"
          class="flex items-center gap-3 p-1 pl-2 rounded-[28px] hover:bg-slate-100/50 hover:shadow-sm transition-all group border border-transparent hover:border-slate-100"
        >
          <div class="hidden md:block text-right mr-1">
            <p
              class="text-xs font-bold text-[#1B2559] leading-tight group-hover:text-[#702DFF] transition-colors"
            >
              Admin User
            </p>
            <p
              class="text-[9px] text-slate-400 font-bold uppercase tracking-wider"
            >
              Simpli.
            </p>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B2559] to-[#702DFF] p-[2px] cursor-pointer shadow-md shadow-indigo-500/10 group-hover:shadow-indigo-500/20 transition-all"
          >
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=fff&color=1B2559"
              alt="Profile"
              class="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
          <ChevronDown
            :size="14"
            class="text-slate-400 hidden md:block group-hover:text-[#702DFF] transition-transform duration-300 mr-2"
            :class="showProfileMenu ? 'rotate-180 text-[#702DFF]' : ''"
          />
        </button>

        <!-- Profile Dropdown Menu -->
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 scale-95 translate-y-2"
          enter-to-class="transform opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100 translate-y-0"
          leave-to-class="transform opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="showProfileMenu"
            class="absolute right-0 mt-4 w-64 bg-white rounded-[24px] shadow-2xl shadow-indigo-500/15 border border-slate-100 overflow-hidden z-[60] py-2"
          >
            <div
              class="px-5 py-4 border-b border-slate-50 mb-1 bg-gradient-to-r from-slate-50/50 to-white"
            >
              <p class="text-sm font-black text-[#1B2559]">Admin User</p>
              <p class="text-[10px] font-medium text-slate-400 truncate">
                admin@kangjessy.com
              </p>
            </div>

            <div class="px-2 space-y-1 py-1">
              <router-link
                to="/settings/profile"
                class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-[#702DFF] hover:bg-indigo-50 transition-colors w-full group"
                @click="showProfileMenu = false"
              >
                <User
                  :size="16"
                  class="text-slate-400 group-hover:text-[#702DFF] transition-colors"
                />
                My Profile
              </router-link>
              <router-link
                to="/settings"
                class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-[#702DFF] hover:bg-indigo-50 transition-colors w-full group"
                @click="showProfileMenu = false"
              >
                <Settings
                  :size="16"
                  class="text-slate-400 group-hover:text-[#702DFF] transition-colors"
                />
                Settings
              </router-link>
            </div>

            <div class="h-px bg-slate-100 my-2 mx-4"></div>

            <div class="px-2 pb-1">
              <button
                @click="handleLogout"
                class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors w-full group"
              >
                <LogOut
                  :size="16"
                  class="text-slate-400 group-hover:text-rose-500 transition-colors"
                />
                Sign Out
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Search,
  Bell,
  Users,
  ShoppingCart,
  MessageSquare,
  Menu,
  MenuIcon,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-vue-next";
import { clientsService } from "../../services/clientsService";
import { useSidebar } from "../../composables/useSidebar";
import ThemeToggle from "../ui/ThemeToggle.vue";
import { auth } from "@kangjessy/database";

const route = useRoute();
const router = useRouter();
const { isCollapsed, toggleSidebar } = useSidebar();
const showNotifications = ref(false);
const showProfileMenu = ref(false);
const scrolled = ref(false);

const handleLogout = async () => {
  await auth.signOut();
  router.push("/login");
};

// Dynamic Page Title
const currentPage = computed(() => {
  const path = route.path;
  if (path === "/") return "Overview";
  // Remove leading slash, split by slash, take first part, capitalize
  const part = path.substring(1).split("/")[0] || "";
  return part.charAt(0).toUpperCase() + part.slice(1);
});

// ... (rest of the computed properties for title)
const currentTitle = computed(() => {
  switch (route.name) {
    case "dashboard":
      return "Dashboard Overview";
    case "orders":
      return "Orders Management";
    case "leads":
      return "Leads";
    case "blog":
      return "Blog Posts";
    case "blog-create":
      return "Create Article";
    case "blog-edit":
      return "Edit Article";
    case "media":
      return "Media Library";
    case "portfolio":
      return "Portfolio Projects";
    case "finance":
      return "Finance & Stats";
    case "vouchers":
      return "Vouchers & Coupons";
    case "settings":
      return "System Settings";
    default:
      return currentPage.value;
  }
});

const notifications = ref<any[]>([
  {
    title: "New order received from Andi",
    time: "2 mins ago",
    icon: ShoppingCart,
  },
  { title: "New lead from Contact Form", time: "45 mins ago", icon: Users },
  {
    title: "Payment confirmed: Order #123",
    time: "2 hours ago",
    icon: MessageSquare,
  },
]);

let subscription: any = null;

const handleScroll = () => {
  scrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  subscription = clientsService.subscribeToClients((payload) => {
    if (payload.eventType === "INSERT") {
      const newClient = payload.new;
      notifications.value.unshift({
        title: `${newClient.name} - ${newClient.status === "Deal" ? "New Order" : "New Lead"}`,
        time: "Just now",
        icon: newClient.status === "Deal" ? ShoppingCart : Users,
      });
    }
  });

  const closeDropdown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (showNotifications.value && !target.closest(".relative")) {
      showNotifications.value = false;
    }
    if (showProfileMenu.value && !target.closest(".profile-menu-container")) {
      showProfileMenu.value = false;
    }
  };
  window.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (subscription) subscription.unsubscribe();
});
</script>
