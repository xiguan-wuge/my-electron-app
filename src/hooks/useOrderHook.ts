import { ref } from "vue"
export const orderStatusMap = {
  0: '待选择',
  1: '去下单',
  2: '确定下单',
  3: '已下单',
  4: '已付款'
}

export let curOrderStatus = ref(0)

export function changeOrderStatus(status: number) {
  curOrderStatus.value = status
}

export function showSingleStatus(status:number) {
  return [1, 2, 4].indexOf(status) > -1
}