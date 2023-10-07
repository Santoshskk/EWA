import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientComponent from '@/components/AboutUs/ClientComponent'
import TeamComponent from '@/components/AboutUs/TeamComponent'
import PurposeComponent from '@/components/AboutUs/PurposeComponent'
import QuizComponent from '../components/quiz/QuizComponent.vue'

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
      { path: 'client', component: ClientComponent },
      { path: 'team', component: TeamComponent },
      { path: 'purpose', component: PurposeComponent }
    ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }, {
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
    component: QuizComponent,
    children: [
      {
        path: 'results',
        name: 'Quiz',
        component: QuizComponent
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
