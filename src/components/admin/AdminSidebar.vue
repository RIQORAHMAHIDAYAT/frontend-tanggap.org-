<template>
  <aside
    class="bg-white border-r border-slate-200/90 text-slate-800 flex flex-col shrink-0 select-none overflow-hidden transition-all duration-300 ease-in-out shadow-xs"
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
    aria-label="Admin Sidebar Navigasi"
  >
    <!-- Top Branding in Sidebar (Matching Figma Screenshot) -->
    <div class="h-20 flex items-center justify-between px-6 md:px-8 shrink-0 border-b border-slate-100">
      <router-link to="/dashboard_admin" class="flex items-center gap-2 group" @click="onLinkClick">
        <span class="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1E40AF] group-hover:opacity-90 transition-opacity">
          tanggap.org
        </span>
      </router-link>

      <!-- Close button on Mobile only -->
      <button
        v-if="isMobile"
        @click="$emit('toggle-sidebar')"
        type="button"
        class="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 focus:outline-none transition-colors cursor-pointer"
        title="Tutup Menu"
        aria-label="Tutup Menu Sidebar"
      >
        <span class="text-xl leading-none">✕</span>
      </button>
    </div>

    <!-- Navigation Menu Items (Matching Figma Screenshot 2026-10-29 at 15.21.26.png) -->
    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center px-5 py-3.5 rounded-2xl text-sm md:text-base font-semibold transition-all duration-200"
        :class="[
          isActive(item.path)
            ? 'bg-[#1E40AF] text-white shadow-sm font-bold'
            : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 font-medium'
        ]"
        @click="onLinkClick"
      >
        {{ item.label }}
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const props = withDefaults(
  defineProps<{
    isOpen?: boolean
    isMobile?: boolean
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

const menuItems = [
  { label: 'Dashboard', path: '/dashboard_admin' },
  { label: 'Pengajuan Kerja Sama', path: '/dashboard_admin/pengajuan-kerjasama' },
  { label: 'Manajemen Sekolah', path: '/dashboard_admin/manajemen-sekolah' },
  { label: 'Manajemen Pengguna', path: '/dashboard_admin/manajemen-pengguna' },
  { label: 'Manajemen Kelas', path: '/dashboard_admin/manajemen-kelas' },
  { label: 'Manajemen Assessment', path: '/dashboard_admin/manajemen-assessment' },
  { label: 'Monitoring Assessment', path: '/dashboard_admin/monitoring-assessment' },
  { label: 'Manajemen Konten', path: '/dashboard_admin/manajemen-konten' }
]

const isActive = (path: string) => {
  if (path === '/dashboard_admin') {
    return route.path === '/dashboard_admin' || route.path === '/admin'
  }
  return route.path.startsWith(path)
}

const onLinkClick = () => {
  // Hanya menutup drawer jika sedang di perangkat mobile/layar kecil (< 1024px)
  // Di desktop/laptop, sidebar TETAP terbuka lebar sesuai instruksi pengguna
  if (props.isMobile) {
    emit('navigate-mobile')
  }
}
</script>

