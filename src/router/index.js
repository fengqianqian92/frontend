import home from '../components/home'
import NotFound from '../components/404'


const routes = [
  {
    path: '/',
    component: home,
    name: '',
  }, {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  // { path: '/main', component: Main },
  {
    path: '*',
    hidden: true,
    redirect: {
      path: '/404'
    }
  }
]

export default routes
