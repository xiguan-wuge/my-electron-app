import { useRouter, useRoute } from 'vue-router'
import type { Router } from 'vue-router'

function back(router:Router) {
  router.back()
}
function goMyOrder(router:Router){
  router.push({
    path: '/my-order'
  })
}

export function useRouterHook() {
  const router = useRouter()
  const routes = useRoute()

  return {
    router,
    routes,
    back: () => back(router),
    goMyOrder: () => goMyOrder(router)
  }
}