import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Marca/lista',
    name: 'Marca',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Marca/MarcaView.vue')
  },
  {
    path: '/marca/formulario',
    name: 'marca-formulario-view',
    component: () => import(/* webpackChunkName: "about" */ '../views/Marca/MarcaFormView.vue'),
    children: [
      {
        path: '/marca/formulario',
        name: 'marca-formulario-editar-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Marca/MarcaFormView.vue')
      },
      {
        path: '/marca/formulario',
        name: 'marca-formulario-excluir-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Marca/MarcaFormView.vue')
      }
    ]
  },
  {
    path: '/Modelo/listar',
    name: 'Modelo-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/ModeloView.vue')
  }
  ,
  {
    path: '/Movimentacao/listar',
    name: 'Movimentacao-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/MovimentacaoView.vue')
  }
  ,
  {
    path: '/Configuracao/listar',
    name: 'Configuracao-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/ConfiguracaoView.vue')
  }
  ,
  {
    path: '/condutor/listar',
    name: 'condutor-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/CondutorView.vue')
  }
  ,
  {
    path: '/veiculo/listar',
    name: 'veiculo-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/VeiculoView.vue')
  }
  ,
  {
    path: '/cadastro/listar',
    name: 'cadastro',
    component: () => import(/* webpackChunkName: "list" */ '../views/Cadastro.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
