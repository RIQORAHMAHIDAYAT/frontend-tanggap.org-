import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '../views/LandingPageView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import ResetPasswordView from '../views/auth/ResetPasswordView.vue'
import PengajuanSekolahView from '../views/school/PengajuanSekolahView.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
import AssessmentView from '../views/assessment/AssessmentView.vue'
import AmigoView from '../views/dashboard/AmigoView.vue'
import ActionToolkitView from '../views/dashboard/ActionToolkitView.vue'
import TeacherDashboardView from '../views/dashboard/TeacherDashboardView.vue'
import TeacherMonitoringView from '../views/dashboard/TeacherMonitoringView.vue'
import PengaturanView from '../views/settings/PengaturanView.vue'
import AdminDashboardView from '../views/admin/AdminDashboardView.vue'
import AdminPengajuanView from '../views/admin/AdminPengajuanView.vue'
import AdminSekolahView from '../views/admin/AdminSekolahView.vue'
import AdminPenggunaView from '../views/admin/AdminPenggunaView.vue'
import AdminKelasView from '../views/admin/AdminKelasView.vue'
import AdminAssessmentView from '../views/admin/AdminAssessmentView.vue'
import AdminMonitoringAssessmentView from '../views/admin/AdminMonitoringAssessmentView.vue'
import AdminKontenView from '../views/admin/AdminKontenView.vue'
import AmigoLandingView from '../views/AmigoLandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // RUTE PUBLIK (Bebas diakses tanpa login)
    {
      path: '/',
      name: 'home',
      component: LandingPageView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView
    },
    {
      path: '/pengajuan-sekolah',
      name: 'pengajuan-sekolah',
      component: PengajuanSekolahView
    },
    {
      path: '/proposal-demokit',
      redirect: '/pengajuan-sekolah'
    },
    {
      path: '/tentang-amigo',
      name: 'tentang-amigo',
      component: AmigoLandingView
    },

    // RUTE SISWA / USER (Wajib Login)
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/assessment',
      name: 'assessment',
      component: AssessmentView,
      meta: { requiresAuth: true }
    },
    {
      path: '/amigo',
      name: 'amigo',
      component: AmigoView,
      meta: { requiresAuth: true }
    },
    {
      path: '/action-toolkit',
      name: 'action-toolkit',
      component: ActionToolkitView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profil',
      name: 'profil',
      component: PengaturanView,
      meta: { requiresAuth: true }
    },
    {
      path: '/pengaturan',
      name: 'pengaturan',
      component: PengaturanView,
      meta: { requiresAuth: true }
    },

    // RUTE GURU BK (Wajib Login & Role Guru / Admin)
    {
      path: '/dashboard_guru',
      name: 'dashboard_guru',
      component: TeacherDashboardView,
      meta: { requiresAuth: true, role: 'teacher' }
    },
    {
      path: '/monitoring_guru',
      name: 'monitoring_guru',
      component: TeacherMonitoringView,
      meta: { requiresAuth: true, role: 'teacher' }
    },

    // RUTE ADMINISTRATOR (Wajib Login & Role Admin)
    {
      path: '/admin',
      redirect: '/dashboard_admin'
    },
    {
      path: '/dashboard_admin',
      name: 'dashboard_admin',
      component: AdminDashboardView,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/dashboard_admin/pengajuan-kerjasama',
      name: 'admin_pengajuan',
      component: AdminPengajuanView,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/dashboard_admin/manajemen-sekolah',
      name: 'admin_sekolah',
      component: AdminSekolahView,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/dashboard_admin/manajemen-pengguna',
      name: 'admin_pengguna',
      component: AdminPenggunaView,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/dashboard_admin/manajemen-kelas',
      name: 'admin_kelas',
      component: AdminKelasView,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/dashboard_admin/manajemen-assessment',
      name: 'admin_assessment',
      component: AdminAssessmentView,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/dashboard_admin/monitoring-assessment',
      name: 'admin_monitoring_assessment',
      component: AdminMonitoringAssessmentView,
      meta: { requiresAuth: true, role: 'admin' }
    },
    {
      path: '/dashboard_admin/manajemen-konten',
      name: 'admin_konten',
      component: AdminKontenView,
      meta: { requiresAuth: true, role: 'admin' }
    },

    // Fallback 404
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Navigation Guard (Proteksi Otentikasi & Otorisasi Role)
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('tanggap_token')
  const rawUser = localStorage.getItem('tanggap_user')
  const isLoggedIn = Boolean(token || rawUser)

  let userRole: 'admin' | 'teacher' | 'student' = 'student'
  if (rawUser) {
    try {
      const u = JSON.parse(rawUser)
      const r = String(u.role || '').toLowerCase()
      if (r.includes('admin')) {
        userRole = 'admin'
      } else if (r.includes('guru') || r.includes('teacher') || r.includes('sekolah')) {
        userRole = 'teacher'
      } else {
        userRole = 'student'
      }
    } catch {
      userRole = 'student'
    }
  }

  // 1. Jika rute membutuhkan login dan user belum login -> arahkan ke /login
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  // 2. Proteksi khusus role Admin
  if (to.meta.role === 'admin') {
    if (userRole !== 'admin') {
      if (userRole === 'teacher') return next('/dashboard_guru')
      return next('/dashboard')
    }
  }

  // 3. Proteksi khusus role Guru (Teacher)
  if (to.meta.role === 'teacher') {
    if (userRole !== 'teacher' && userRole !== 'admin') {
      return next('/dashboard')
    }
  }

  // 4. Jika user sudah login dan mengakses /login atau /register -> redirect ke dashboard sesuai perannya
  if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
    if (userRole === 'admin') return next('/dashboard_admin')
    if (userRole === 'teacher') return next('/dashboard_guru')
    return next('/dashboard')
  }

  next()
})

export default router
