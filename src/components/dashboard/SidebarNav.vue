<template>
  <aside
    class="bg-[#1E40AF] text-white flex flex-col shrink-0 select-none overflow-hidden transition-all duration-300 ease-in-out"
    :class="[
      isMobile
        ? [
            'fixed inset-y-0 left-0 w-72 shadow-2xl z-40 transform',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          ]
        : [
            'relative w-64 md:w-72 min-h-screen z-20',
            isOpen ? 'ml-0 opacity-100 pointer-events-auto' : '-ml-64 md:-ml-72 opacity-0 pointer-events-none'
          ]
    ]"
    aria-label="Sidebar Navigasi"
  >
    <!-- Top Branding in Sidebar (Matching Figma screenshot) -->
    <div class="h-20 flex items-center justify-between px-6 md:px-8 shrink-0">
      <router-link to="/dashboard" class="flex items-center gap-2 group" @click="onLinkClick">
        <span class="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:opacity-90 transition-opacity">
          tanggap.org
        </span>
      </router-link>

      <!-- Close button on Mobile only -->
      <button
        v-if="isMobile"
        @click="$emit('toggle-sidebar')"
        type="button"
        class="p-2 rounded-lg hover:bg-white/10 active:bg-white/20 text-white focus:outline-none transition-colors cursor-pointer"
        title="Tutup Menu"
        aria-label="Tutup Menu Sidebar"
      >
        <span class="text-xl leading-none">✕</span>
      </button>
    </div>

    <!-- Navigation Menu Items (Matching Figma screenshot) -->
    <nav class="flex-1 px-5 py-6 space-y-2.5">
      <router-link
        v-for="item in activeMenuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center px-6 py-3.5 rounded-2xl text-base md:text-lg font-semibold transition-all duration-200"
        :class="[
          isActive(item.path)
            ? 'bg-white text-[#1E40AF] shadow-sm font-bold'
            : 'text-white hover:bg-white/10 font-medium'
        ]"
        @click="onLinkClick"
      >
        {{ item.label }}
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = withDefaults(
  defineProps<{
    isOpen?: boolean
    isMobile?: boolean
    menuItems?: Array<{ label: string; path: string }>
  }>(),
  {
    isOpen: true,
    isMobile: false
  }
)

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
  (e: 'navigate-mobile'): void
}>()

const route = useRoute()

const defaultMenuItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Assessment', path: '/assessment' },
  { label: 'Amigo', path: '/amigo' },
  { label: 'Action Toolkit', path: '/action-toolkit' }
]

const activeMenuItems = computed(() => props.menuItems && props.menuItems.length > 0 ? props.menuItems : defaultMenuItems)

const isActive = (path: string) => {
  return route.path === path || (path !== '/dashboard' && route.path.startsWith(path))
}

const onLinkClick = () => {
  // Hanya menutup drawer jika sedang di perangkat mobile/layar kecil (< 1024px)
  // Di desktop/laptop, sidebar TETAP terbuka lebar sesuai instruksi pengguna
  if (props.isMobile) {
    emit('navigate-mobile')
  }
}
</script>