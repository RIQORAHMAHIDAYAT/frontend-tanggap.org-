import { ref, watch } from 'vue'

const STORAGE_KEY = 'tanggap_sidebar_open'

// Default closed (navbar biru), or persisted preference from user session
const getInitialState = (): boolean => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      return saved === 'true'
    }
  } catch {
    // Ignore error in restricted environments
  }
  return false
}

// Global reactive state shared across all views & layout instances
// Persistent across route changes in the SPA session
const isSidebarOpen = ref<boolean>(getInitialState())

watch(isSidebarOpen, (val) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(val))
  } catch {
    // Ignore error in restricted environments
  }
})

export function useSidebar() {
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const openSidebar = () => {
    isSidebarOpen.value = true
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
  }

  return {
    isSidebarOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar
  }
}

