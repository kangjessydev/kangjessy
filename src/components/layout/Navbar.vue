<template>
  <nav
    class="fixed top-0 left-0 right-0 p-5 md:p-6 transition-all duration-400 ease-in-out"
    :class="[
      hasActiveSheet
        ? 'z-100 opacity-0 -translate-y-full pointer-events-none'
        : 'z-1000 opacity-100 translate-y-0',
      {
        'py-3 md:py-4 bg-bg-primary/80 border-b border-border-color backdrop-blur-xl':
          isScrolled && !isMobileMenuOpen,
        'bg-transparent border-transparent pt-6': isMobileMenuOpen,
      },
    ]"
  >
    <div class="max-w-[1400px] mx-auto" ref="navbarRef">
      <div class="flex justify-between items-center">
        <!-- Logo & Ecosystem (Desktop) -->
        <div class="flex items-center gap-6">
          <router-link
            to="/"
            class="flex items-center gap-3 text-[1.25rem] font-extrabold text-text-primary z-1001"
            @click="closeMenu"
          >
            <img
              src="/logo.png"
              alt="KangJessy Logo"
              class="w-8 h-8 rounded-lg object-contain"
              width="32"
              height="32"
              fetchpriority="high"
            />
            <span
              >Kang<span
                class="bg-linear-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
                >Jessy</span
              ></span
            >
          </router-link>

          <!-- Ecosystem Dropdown (Desktop Only) -->
          <div class="hidden md:block relative" ref="ecosystemDropdownRef">
            <button
              @click="toggleEcosystemDropdown"
              aria-label="Toggle ecosystem dropdown"
              class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-color hover:border-accent-primary/50 bg-bg-secondary/50 text-text-secondary hover:text-text-primary transition-all text-xs font-bold cursor-pointer"
            >
              <span>Ecosystem</span>
              <ChevronDown
                :size="12"
                class="transition-transform duration-300"
                :class="{ 'rotate-180': isEcosystemDropdownOpen }"
              />
            </button>

            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0 translate-y-2"
              enter-to-class="transform scale-100 opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100 translate-y-0"
              leave-to-class="transform scale-95 opacity-0 translate-y-2"
            >
              <div
                v-if="isEcosystemDropdownOpen"
                class="absolute top-full left-0 mt-2 w-56 bg-bg-secondary border border-border-color rounded-xl shadow-xl overflow-hidden py-1 z-50"
              >
                <!-- Main Agency (Active) -->
                <router-link
                  to="/"
                  class="flex items-center gap-3 px-4 py-3 bg-accent-primary/5 border-l-2 border-accent-primary"
                >
                  <Globe :size="14" class="text-accent-primary" />
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-accent-primary"
                      >Main Agency</span
                    >
                    <span class="text-[10px] text-accent-primary/70"
                      >Current Workspace</span
                    >
                  </div>
                </router-link>
                <div class="h-px bg-border-color/50 my-1"></div>
                <a
                  href="https://kangjessy-tools.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 px-4 py-3 hover:bg-bg-tertiary transition-colors group"
                >
                  <Wrench
                    :size="14"
                    class="text-text-tertiary group-hover:text-accent-primary"
                  />
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-text-primary"
                      >Smart Tools</span
                    >
                    <span class="text-[10px] text-text-tertiary"
                      >kangjessy-tools.vercel.app</span
                    >
                  </div>
                </a>
                <a
                  href="https://kangjessy-store.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 px-4 py-3 hover:bg-bg-tertiary transition-colors group"
                >
                  <ShoppingBag
                    :size="14"
                    class="text-text-tertiary group-hover:text-accent-secondary"
                  />
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-text-primary"
                      >Digital Store</span
                    >
                    <span class="text-[10px] text-text-tertiary"
                      >kangjessy-store.vercel.app</span
                    >
                  </div>
                </a>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Desktop Links -->
        <div class="hidden md:flex items-center gap-7">
          <div
            v-for="item in menuItems"
            :key="item.text"
            class="relative group"
          >
            <template v-if="item.isMegaMenu">
              <button
                class="nav-link flex items-center gap-2 text-[14px] font-medium bg-none border-none cursor-pointer py-2"
                :class="{
                  'text-accent-primary!': activeDropdown === item.text,
                }"
                @click="toggleDropdown(item.text)"
              >
                {{ item.text }}
                <ChevronDown
                  :size="14"
                  class="transition-transform duration-300 opacity-50"
                  :class="{ 'rotate-180': activeDropdown === item.text }"
                />
              </button>
              <!-- Mega Menu Content -->
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 -translate-y-2 scale-95"
              >
                <div
                  v-if="activeDropdown === item.text"
                  class="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 bg-bg-secondary border border-border-color rounded-2xl p-8 shadow-2xl backdrop-blur-xl transition-all duration-300"
                  :class="[
                    item.groups?.length === 3 ? 'w-[900px]' : 'w-[640px]',
                  ]"
                >
                  <div
                    class="grid gap-8"
                    :class="[
                      item.groups?.length === 3 ? 'grid-cols-3' : 'grid-cols-2',
                    ]"
                  >
                    <div v-for="group in item.groups" :key="group.title">
                      <h5
                        class="text-[0.75rem] font-bold uppercase tracking-widest text-accent-primary mb-4 flex items-center gap-2"
                      >
                        {{ group.title }}
                      </h5>
                      <div class="flex flex-col gap-1">
                        <template v-for="sub in group.items">
                          <!-- External Link Case -->
                          <a
                            v-if="
                              !sub.comingSoon &&
                              sub.url &&
                              isExternalLink(sub.url)
                            "
                            :href="ensureProtocol(sub.url)"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="group/item flex items-start gap-4 p-3 rounded-xl transition-all duration-300 active:scale-[0.98] text-left w-full hover:bg-accent-primary/10 cursor-pointer text-decoration-none"
                            :key="'ext-' + sub.text"
                            @click.stop="handleSubItemClick(sub)"
                          >
                            <div
                              class="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center text-accent-primary transition-all group-hover/item:bg-accent-primary group-hover/item:text-white"
                            >
                              <component
                                :is="sub.icon"
                                v-if="sub.icon"
                                :size="18"
                              />
                            </div>
                            <div class="flex flex-col flex-1">
                              <div class="flex items-center gap-2">
                                <span
                                  class="text-[0.9rem] font-bold text-text-primary transition-colors duration-300 group-hover/item:text-accent-primary"
                                  >{{ sub.text }}</span
                                >
                                <ExternalLink :size="10" class="opacity-30" />
                              </div>
                              <span
                                class="text-[0.75rem] text-text-secondary leading-snug"
                                >{{ sub.desc }}</span
                              >
                            </div>
                          </a>

                          <!-- Coming Soon Case -->
                          <div
                            v-else-if="sub.comingSoon"
                            :key="'soon-' + sub.text"
                            class="group/item flex items-start gap-4 p-3 rounded-xl opacity-50 cursor-not-allowed text-left w-full"
                          >
                            <div
                              class="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center text-accent-primary"
                            >
                              <component
                                :is="sub.icon"
                                v-if="sub.icon"
                                :size="18"
                              />
                            </div>
                            <div class="flex flex-col flex-1">
                              <div class="flex items-center gap-2">
                                <span
                                  class="text-[0.9rem] font-bold text-text-primary"
                                  >{{ sub.text }}</span
                                >
                                <span
                                  class="px-1.5 py-0.5 bg-accent-primary/10 text-accent-primary text-[8px] font-black rounded uppercase tracking-widest"
                                  >Soon</span
                                >
                              </div>
                              <span
                                class="text-[0.75rem] text-text-secondary leading-snug"
                                >{{ sub.desc }}</span
                              >
                            </div>
                          </div>

                          <!-- Internal / Trigger Case -->
                          <component
                            v-else
                            :is="
                              sub.url
                                ? isExternalLink(sub.url)
                                  ? 'a'
                                  : 'router-link'
                                : 'button'
                            "
                            :key="'int-' + sub.text"
                            :to="
                              sub.url && !isExternalLink(sub.url)
                                ? sub.url
                                : undefined
                            "
                            :href="
                              sub.url && isExternalLink(sub.url)
                                ? ensureProtocol(sub.url)
                                : undefined
                            "
                            :target="
                              sub.url && isExternalLink(sub.url)
                                ? '_blank'
                                : undefined
                            "
                            class="group/item flex items-start gap-4 p-3 rounded-xl transition-all duration-300 active:scale-[0.98] text-left w-full bg-transparent border-none text-decoration-none hover:bg-accent-primary/10 cursor-pointer"
                            @click="handleSubItemClick(sub)"
                          >
                            <div
                              class="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center text-accent-primary transition-all group-hover/item:bg-accent-primary group-hover/item:text-white"
                            >
                              <component
                                :is="sub.icon"
                                v-if="sub.icon"
                                :size="18"
                              />
                            </div>
                            <div class="flex flex-col flex-1">
                              <span
                                class="text-[0.9rem] font-bold text-text-primary transition-colors duration-300 group-hover/item:text-accent-primary"
                                >{{ sub.text }}</span
                              >
                              <span
                                class="text-[0.75rem] text-text-secondary leading-snug"
                                >{{ sub.desc }}</span
                              >
                            </div>
                          </component>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </template>

            <template v-else-if="item.isDropdown">
              <button
                class="nav-link flex items-center gap-2 text-[14px] font-medium bg-none border-none cursor-pointer py-2"
                :class="{
                  'text-accent-primary!': activeDropdown === item.text,
                }"
                @click="toggleDropdown(item.text)"
              >
                {{ item.text }}
                <ChevronDown
                  :size="14"
                  class="transition-transform duration-300 opacity-50"
                  :class="{ 'rotate-180': activeDropdown === item.text }"
                />
              </button>
              <!-- Dropdown -->
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 -translate-y-2 scale-95"
              >
                <div
                  v-if="activeDropdown === item.text"
                  class="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 min-w-[220px] bg-bg-secondary border border-border-color rounded-xl p-2 shadow-xl flex flex-col gap-1"
                >
                  <template v-for="sub in item.children">
                    <a
                      v-if="
                        sub.trigger === 'link' ||
                        (sub.url && isExternalLink(sub.url))
                      "
                      :href="ensureProtocol(sub.url || '')"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group/sub flex items-center gap-3 px-4 py-3 rounded-lg text-[0.85rem] transition-all active:scale-[0.98] text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary"
                      :key="'drop-ext-' + sub.text"
                      @click="closeMenu()"
                    >
                      <component
                        :is="sub.icon"
                        v-if="sub.icon"
                        :size="16"
                        class="opacity-50 group-hover/sub:opacity-100"
                      />
                      <span class="font-medium flex-1">{{ sub.text }}</span>
                      <ExternalLink
                        :size="12"
                        class="opacity-30 group-hover/sub:opacity-100"
                      />
                    </a>
                    <component
                      v-else
                      :is="
                        sub.comingSoon
                          ? 'div'
                          : sub.url && isExternalLink(sub.url)
                            ? 'a'
                            : 'router-link'
                      "
                      :key="'drop-int-' + sub.text"
                      :to="
                        !sub.comingSoon && sub.url && !isExternalLink(sub.url)
                          ? sub.url
                          : undefined
                      "
                      :href="
                        sub.url &&
                        (isExternalLink(sub.url) || (sub.trigger as string) === 'link')
                          ? ensureProtocol(sub.url)
                          : undefined
                      "
                      :target="
                        sub.url && isExternalLink(sub.url)
                          ? '_blank'
                          : undefined
                      "
                      :rel="
                        sub.url && isExternalLink(sub.url)
                          ? 'noopener noreferrer'
                          : undefined
                      "
                      class="group/sub flex items-center gap-3 px-4 py-3 rounded-lg text-[0.85rem] transition-all active:scale-[0.98]"
                      :class="[
                        sub.comingSoon
                          ? 'opacity-50 cursor-not-allowed text-text-tertiary'
                          : 'text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary',
                      ]"
                      @click="sub.comingSoon ? null : closeMenu()"
                    >
                      <component
                        :is="sub.icon"
                        v-if="sub.icon"
                        :size="16"
                        class="opacity-50"
                        :class="{
                          'group-hover/sub:opacity-100': !sub.comingSoon,
                        }"
                      />
                      <span class="font-medium flex-1">{{ sub.text }}</span>
                      <span
                        v-if="sub.comingSoon"
                        class="px-1.5 py-0.5 bg-accent-primary/10 text-accent-primary text-[8px] font-black rounded uppercase tracking-widest"
                        >Soon</span
                      >
                    </component>
                  </template>
                </div>
              </Transition>
            </template>

            <BaseButton
              v-else-if="item.isAction"
              variant="primary"
              size="sm"
              @click="handleActionClick(item)"
              class="font-bold text-[13px] px-5!"
            >
              {{ item.text }}
            </BaseButton>

            <a
              v-else-if="
                item.trigger === 'link' ||
                (item.url && isExternalLink(item.url))
              "
              :href="ensureProtocol(item.url || '')"
              target="_blank"
              rel="noopener noreferrer"
              class="nav-link text-[14px] font-medium py-2"
            >
              {{ item.text }}
            </a>

            <router-link
              v-else
              :to="
                (item.url || '').startsWith('#')
                  ? { path: '/', hash: item.url || '#' }
                  : item.url || '#'
              "
              class="nav-link text-[14px] font-medium py-2"
            >
              {{ item.text }}
            </router-link>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            :aria-label="
              isDark ? 'Switch to light mode' : 'Switch to dark mode'
            "
            class="w-[38px] h-[38px] rounded-xl bg-white/5 border border-border-color text-text-primary flex items-center justify-center cursor-pointer hover:bg-border-color hover:text-accent-primary transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <component :is="isDark ? Moon : Sun" :size="18" />
          </button>
        </div>

        <!-- Mobile Actions -->
        <div class="flex md:hidden items-center gap-2 z-1001">
          <button
            @click="toggleTheme"
            :aria-label="
              isDark ? 'Switch to light mode' : 'Switch to dark mode'
            "
            class="w-9 h-9 rounded-xl bg-white/5 border border-border-color text-text-primary flex items-center justify-center active:scale-95"
          >
            <component :is="isDark ? Moon : Sun" :size="18" />
          </button>
          <button
            @click="toggleMobileMenu"
            aria-label="Toggle mobile menu"
            :aria-expanded="isMobileMenuOpen"
            class="w-9 h-9 flex flex-col justify-center items-center gap-1.5 focus:outline-none active:scale-95"
          >
            <span
              class="block w-6 h-0.5 bg-text-primary transition-all duration-300"
              :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen }"
            ></span>
            <span
              class="block w-6 h-0.5 bg-text-primary transition-all duration-300"
              :class="{ 'opacity-0': isMobileMenuOpen }"
            ></span>
            <span
              class="block w-6 h-0.5 bg-text-primary transition-all duration-300"
              :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu & Desktop Side Drawer -->
    <BottomSheet
      v-model="isMobileMenuOpen"
      title="Navigation Menu"
      :show-handle="true"
      @close="closeMenu"
    >
      <div class="p-6">
        <!-- Ecosystem Switcher (Mobile) -->
        <div
          class="mb-8 p-1.5 bg-bg-secondary border border-border-color rounded-2xl flex gap-1"
        >
          <button
            class="flex-1 py-2.5 px-2 rounded-xl bg-accent-primary text-white shadow-lg text-[10px] font-black uppercase tracking-wider flex flex-col items-center gap-1 cursor-default"
          >
            <Globe :size="16" />
            Agency
          </button>
          <a
            href="https://kangjessy-tools.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 py-2.5 px-2 rounded-xl hover:bg-bg-tertiary text-text-tertiary hover:text-accent-primary transition-all text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 decoration-none"
          >
            <Wrench :size="16" />
            Tools
          </a>
          <a
            href="https://kangjessy-store.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 py-2.5 px-2 rounded-xl hover:bg-bg-tertiary text-text-tertiary hover:text-accent-secondary transition-all text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1 decoration-none"
          >
            <ShoppingBag :size="16" />
            Store
          </a>
        </div>

        <!-- Main Nav Links Groups (3 Columns Pattern) -->
        <div class="space-y-10 mb-10 mt-2">
          <div
            v-for="group in mobileMenuGroups"
            :key="group.title"
            class="space-y-4"
          >
            <h4
              class="px-1 text-[11px] uppercase font-black tracking-[0.15em] text-text-primary/70"
            >
              {{ group.title }}
            </h4>
            <div class="grid grid-cols-3 gap-3">
              <template v-for="item in group.items" :key="item.text">
                <!-- Option 1: External Link -->
                <a
                  v-if="
                    item.trigger === 'link' ||
                    (item.url && isExternalLink(item.url))
                  "
                  :href="ensureProtocol(item.url || '#')"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group flex flex-col items-center justify-between px-2 py-4 rounded-2xl transition-all duration-300 active:scale-95 bg-bg-primary border border-border-color/60 shadow-sm hover:border-accent-primary/40 text-center w-full cursor-pointer h-full text-decoration-none"
                  @click="closeMenu"
                >
                  <div
                    class="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 bg-bg-secondary border border-border-color shadow-inner text-accent-primary transition-all group-active:scale-90 mx-auto"
                  >
                    <component :is="item.icon" v-if="item.icon" :size="20" />
                  </div>
                  <span
                    class="text-[0.7rem] font-black text-text-primary text-center leading-tight"
                  >
                    {{ item.text }}
                  </span>
                </a>

                <!-- Option 2: Internal Router Link -->
                <router-link
                  v-else-if="item.url"
                  :to="item.url"
                  class="group flex flex-col items-center justify-between px-2 py-4 rounded-2xl transition-all duration-300 active:scale-95 bg-bg-primary border border-border-color/60 shadow-sm hover:border-accent-primary/40 text-center w-full cursor-pointer h-full text-decoration-none"
                  @click="closeMenu"
                >
                  <div
                    class="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 bg-bg-secondary border border-border-color shadow-inner text-accent-primary transition-all group-active:scale-90 mx-auto"
                  >
                    <component :is="item.icon" v-if="item.icon" :size="20" />
                  </div>
                  <span
                    class="text-[0.7rem] font-black text-text-primary text-center leading-tight"
                  >
                    {{ item.text }}
                  </span>
                </router-link>

                <!-- Option 3: Button (Action Trigger) -->
                <button
                  v-else
                  class="group flex flex-col items-center justify-between px-2 py-4 rounded-2xl transition-all duration-300 active:scale-95 bg-bg-primary border border-border-color/60 shadow-sm hover:border-accent-primary/40 text-center w-full cursor-pointer h-full"
                  :key="'mob-btn-' + item.text"
                  @click="handleMobileItemClick(item)"
                >
                  <div
                    class="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 bg-bg-secondary border border-border-color shadow-inner text-accent-primary transition-all group-active:scale-90 mx-auto"
                  >
                    <component :is="item.icon" v-if="item.icon" :size="20" />
                  </div>
                  <span
                    class="text-[0.7rem] font-black text-text-primary text-center leading-tight"
                  >
                    {{ item.text }}
                  </span>
                </button>
              </template>
            </div>
          </div>
        </div>

        <!-- Quick Access / Action Center -->
        <div class="flex flex-col gap-3 mb-8">
          <!-- Client Portal Card -->
          <router-link
            to="/portal"
            id="nav-action-portal"
            class="group relative overflow-hidden flex items-center gap-3 p-4 md:p-5 bg-bg-secondary border border-border-color rounded-3xl transition-all duration-300 active:scale-[0.98] hover:border-accent-primary/40"
            @click="closeMenu"
          >
            <div
              class="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-accent-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>

            <div
              class="w-11 h-11 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0 group-hover:scale-110 transition-transform"
            >
              <Users :size="20" />
            </div>

            <div class="flex flex-col flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-0.5">
                <span
                  class="text-[clamp(0.85rem,2vw,0.9rem)] font-black text-text-primary tracking-tight leading-tight"
                  >Client Portal</span
                >
                <span
                  class="px-1.5 py-0.5 bg-accent-primary text-white text-[9px] font-black rounded uppercase tracking-widest whitespace-nowrap shrink-0"
                  >New</span
                >
              </div>
              <span
                class="text-[clamp(0.65rem,1.5vw,0.7rem)] text-text-tertiary leading-tight truncate"
                >Pantau progres proyek & invoice aktif</span
              >
            </div>

            <ChevronRight
              :size="16"
              class="text-text-tertiary shrink-0 group-hover:translate-x-1 transition-transform"
            />
          </router-link>

          <!-- Prime CTA / Start Project -->
          <button
            id="nav-action-order"
            @click="popup.openModal(Popups.ORDER_CHECKOUT); closeMenu();"
            class="group relative overflow-hidden w-full p-6 bg-linear-to-tr from-accent-primary to-accent-secondary rounded-3xl flex items-center justify-between text-white shadow-xl shadow-accent-primary/20 active:scale-[0.98] transition-all"
          >
            <!-- Shine effect -->
            <div
              class="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            ></div>

            <div class="flex flex-col items-start z-10 text-left">
              <span
                class="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-1"
                >Siap Beraksi?</span
              >
              <span class="text-[1.1rem] font-black tracking-tight"
                >Mulai Proyek Sekarang</span
              >
            </div>

            <div
              class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center z-10"
            >
              <Rocket :size="20" />
            </div>
          </button>
        </div>

        <!-- Footer Socials -->
        <div
          class="mt-auto pt-6 border-t border-border-color flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <div class="flex flex-wrap justify-center gap-3">
            <a
              v-for="social in settings.socialLinks"
              :key="'mob-soc-' + social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Visit our ${social.name}`"
              class="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 transition-all active:scale-90 shrink-0"
            >
              <component :is="getSocialIcon(social.icon)" :size="20" />
            </a>
          </div>
          <div class="text-center sm:text-right">
            <p
              class="text-text-tertiary text-[10px] uppercase font-black tracking-widest leading-none mb-1"
            >
              KangJessy
            </p>
            <p class="text-text-tertiary text-[9px] font-medium opacity-50">
              EST. 2024
            </p>
          </div>
        </div>
      </div>
    </BottomSheet>
  </nav>
</template>

<script setup lang="ts">
import { isExternalLink, ensureProtocol } from "@kangjessy/config";
import { ref, onMounted, onUnmounted, computed } from "vue";
import {
  ChevronDown,
  Moon,
  Sun,
  Github,
  Linkedin,
  Youtube,
  Instagram,
  Hash,
  ExternalLink,
  Users,
  ChevronRight,
  Globe,
  Wrench,
  ShoppingBag,
  Rocket,
} from "lucide-vue-next";
import { BaseButton, BottomSheet, activeSheet } from "@kangjessy/ui";
import { useGlobalTheme } from "../../composables/useTheme";
import { menuItems, mobileMenuGroups } from "../../data/config/menuConfig";
import { useSiteSettings } from "../../composables/useSiteSettings";
import { usePopupManager, Popups } from "../../composables/usePopupManager";
import { useRouter } from "vue-router";

const router = useRouter();
const popup = usePopupManager();
const { settings } = useSiteSettings();

const getSocialIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Github: Github,
    Linkedin: Linkedin,
    Youtube: Youtube,
    Instagram: Instagram,
    Thread: Hash,
    Hash: Hash,
    Twitter: Hash,
    Globe: Globe,
  };
  return icons[iconName] || ExternalLink;
};

const { isDark, toggleTheme } = useGlobalTheme();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeDropdown = ref<string | null>(null);
const isEcosystemDropdownOpen = ref(false);
const navbarRef = ref<HTMLElement | null>(null);
const ecosystemDropdownRef = ref<HTMLElement | null>(null);

// Lower z-index when a bottom sheet is active
const hasActiveSheet = computed(() => activeSheet.value !== null);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
    activeDropdown.value = null;
  }
};

const toggleDropdown = (itemText: string) => {
  activeDropdown.value = activeDropdown.value === itemText ? null : itemText;
};

const toggleEcosystemDropdown = () => {
  isEcosystemDropdownOpen.value = !isEcosystemDropdownOpen.value;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
  activeDropdown.value = null;
  isEcosystemDropdownOpen.value = false;
};

const handleTrigger = (trigger?: string, props?: any) => {
  if (!trigger) return false;

  if (trigger === "whatsapp") {
    popup.openModal(Popups.CHAT_WA, props);
  } else if (trigger === "email") {
    popup.openModal(Popups.CHAT_EMAIL, props);
  } else if (trigger === "ai") {
    popup.openModal(Popups.CHAT_AI, props);
  } else if (trigger === "checkout") {
    popup.openModal(Popups.ORDER_CHECKOUT);
  } else if (trigger === "link") {
    return false;
  }
  closeMenu();
  return true;
};

const handleSubItemClick = (sub: any) => {
  if (handleTrigger(sub.trigger, sub.triggerProps)) return;
  closeMenu();
};

const handleActionClick = (item: any) => {
  if (handleTrigger(item.trigger, item.triggerProps)) return;
  popup.openModal(Popups.ORDER_CHECKOUT);
  closeMenu();
};

const handleMobileItemClick = (item: any) => {
  if (handleTrigger(item.trigger, item.triggerProps)) return;
  if (item.url && !item.url.startsWith("/")) {
    // window.location.href = item.url;
  }
  closeMenu();
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;

  // Close Ecosystem Dropdown if clicked outside
  if (
    isEcosystemDropdownOpen.value &&
    ecosystemDropdownRef.value &&
    !ecosystemDropdownRef.value.contains(target)
  ) {
    isEcosystemDropdownOpen.value = false;
  }

  // Close Mega Menu if clicked outside (optional, existing logic was checking closure)
  const isOutsideNav = navbarRef.value && !navbarRef.value.contains(target);
  if (isOutsideNav && activeDropdown.value) {
    activeDropdown.value = null;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("mousedown", handleClickOutside);
});
</script>
