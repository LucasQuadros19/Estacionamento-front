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
    path: '/modelo/listar',
    name: 'modelo-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/Modelo/ModeloView.vue')
  },
  {
    path: '/modelo/formulario',
    name: 'modelo-formulario-view',
    component: () => import(/* webpackChunkName: "about" */ '../views/Modelo/ModeloFormView.vue'),
    children: [
      {
        path: '/modelo/formulario',
        name: 'modelo-formulario-editar-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Modelo/ModeloFormView.vue')
      },
      {
        path: '/modelo/formulario',
        name: 'modelo-formulario-excluir-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Modelo/ModeloFormView.vue')
      }
    ]
  }
  ,
  {
    path: '/movimentacao/listar',
    name: 'movimentacao-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/Movimentacao/MovimentacaoView.vue')
  },
  {
    path: '/movimentacao/formulario',
    name: 'movimentacao-formulario-view',
    component: () => import(/* webpackChunkName: "about" */ '../views/Movimentacao/MovimentacaoFormView.vue'),
    children: [
      {
        path: '/movimentacao/formulario',
        name: 'movimentacao-formulario-editar-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Movimentacao/MovimentacaoFormView.vue')
      },
      {
        path: '/movimentacao/formulario',
        name: 'movimentacao-formulario-excluir-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Movimentacao/MovimentacaoFormView.vue')
      }
      ,
      {
        path: '/movimentacao/formulario',
        name: 'movimentacao-finalizar-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Movimentacao/MovimentacaoFormView.vue')
      }
    ]
  },
  {
    path: '/movimentacao/final',
    name: 'movimentacao-final-view',
    component: () => import(/* webpackChunkName: "about" */ '../views/Movimentacao/MovimentacaoFinalizacaoView.vue')
  }
  ,
  {
    path: '/movimentacao/ativos',
    name: 'movimentacao-ativos-view',
    component: () => import(/* webpackChunkName: "about" */ '../views/Movimentacao/MovimentacaoAtivosView.vue')
  }
  ,
  {
    path: '/configuracao/listar',
    name: 'configuracao-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/Configuracao/ConfiguracaoView.vue')
  },
  {
    path: '/configuracao/formulario',
    name: 'configuracao-formulario-view',
    component: () => import(/* webpackChunkName: "about" */ '../views/Configuracao/ConfiguracaoFormView.vue'),
    children: [
      {
        path: '/configuracao/formulario',
        name: 'configuracao-formulario-editar-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Configuracao/ConfiguracaoFormView.vue')
      },
      {
        path: '/configuracao/formulario',
        name: 'configuracao-formulario-excluir-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Configuracao/ConfiguracaoFormView.vue')
      }
    ]
  }
  ,
  {
    path: '/condutor/listar',
    name: 'condutor-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/Condutor/CondutorView.vue')
  },
  {
    path: '/condutor/formulario',
    name: 'condutor-formulario-view',
    component: () => import(/* webpackChunkName: "about" */ '../views/Condutor/CondutorFormView.vue'),
    children: [
      {
        path: '/condutor/formulario',
        name: 'condutor-formulario-editar-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Condutor/CondutorFormView.vue')
      },
      {
        path: '/condutor/formulario',
        name: 'condutor-formulario-excluir-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Condutor/CondutorFormView.vue')
      }
    ]
  }
  ,
  {
    path: '/veiculo/listar',
    name: 'veiculo-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/Veiculo/VeiculoView.vue')
  },
  {
    path: '/veiculo/formulario',
    name: 'veiculo-formulario-view',
    component: () => import(/* webpackChunkName: "about" */ '../views/Veiculo/VeiculoFormView.vue'),
    children: [
      {
        path: '/veiculo/formulario',
        name: 'veiculo-formulario-editar-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Veiculo/VeiculoFormView.vue')
      },
      {
        path: '/veiculo/formulario',
        name: 'veiculo-formulario-excluir-view',
        component: () => import(/* webpackChunkName: "about" */ '../views/Veiculo/VeiculoFormView.vue')
      }
    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router