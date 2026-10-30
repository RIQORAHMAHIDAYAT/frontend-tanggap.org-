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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/dashboard_guru',
      name: 'dashboard_guru',
      component: TeacherDashboardView
    },
    {
      path: '/monitoring_guru',
      name: 'monitoring_guru',
      component: TeacherMonitoringView
    },
    {
      path: '/admin',
      redirect: '/dashboard_admin'
    },
    {
      path: '/dashboard_admin',
      name: 'dashboard_admin',
      component: AdminDashboardView
    },
    {
      path: '/dashboard_admin/pengajuan-kerjasama',
      name: 'admin_pengajuan',
      component: AdminPengajuanView
    },
    {
      path: '/dashboard_admin/manajemen-sekolah',
      name: 'admin_sekolah',
      component: AdminSekolahView
    },
    {
      path: '/dashboard_admin/manajemen-pengguna',
      name: 'admin_pengguna',
      component: AdminPenggunaView
    },
    {
      path: '/dashboard_admin/manajemen-kelas',
      name: 'admin_kelas',
      component: AdminKelasView
    },
    {
      path: '/dashboard_admin/manajemen-assessment',
      name: 'admin_assessment',
      component: AdminAssessmentView
    },
    {
      path: '/dashboard_admin/monitoring-assessment',
      name: 'admin_monitoring_assessment',
      component: AdminMonitoringAssessmentView
    },
    {
      path: '/dashboard_admin/manajemen-konten',
      name: 'admin_konten',
      component: AdminKontenView
    },
    {
      path: '/assessment',
      name: 'assessment',
      component: AssessmentView
    },
    {
      path: '/amigo',
      name: 'amigo',
      component: AmigoView
    },
    {
      path: '/action-toolkit',
      name: 'action-toolkit',
      component: ActionToolkitView
    },
    {
      path: '/profil',
      name: 'profil',
      component: PengaturanView
    },
    {
      path: '/pengaturan',
      name: 'pengaturan',
      component: PengaturanView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
