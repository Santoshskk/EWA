import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizComponent from '../components/quiz/QuizComponent.vue'
import QuizResultsView from '@/views/quizResultsView'
import SdgInfoPage from '@/components/LandingPage/SdgInfoPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about_us',
    name: 'about_us',
    redirect: '/about_us/team',
    children: [
      { path: 'client', component: () => import('../components/AboutUs/ClientComponent') },
      { path: 'team', component: () => import('../components/AboutUs/TeamComponent') },
      { path: 'purpose', component: () => import('../components/AboutUs/PurposeComponent') }
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../components/UnknownRoute')
  },
  {
    path: '/quiz_results',
    name: 'quiz_results1',
    component: () => import('../views/quizResultsView')

  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUpView')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LogInView')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/profile/ProfilePage')
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizComponent
  },
  {
    path: '/quiz/results',
    name: 'quiz_results',
    component: QuizResultsView
  },
  {
    path: '/sdg',
    name: 'sdgInfo',
    component: SdgInfoPage,
    children:
      [
        { path: ':id', component: SdgInfoPage, props: true }
      ]
  },
  {
    path: '/admin_dashboard',
    name: 'admin_dashboard',
    redirect: '/admin_dashboard/intro',
    children: [
      { path: 'intro', component: () => import('@/components/AdminDashboard/IntroComponent') }
    ],
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminDashboardView')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
