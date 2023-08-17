import { computed } from "vue";
import type {StoreDefinition} from 'pinia'
import useUserStore from '../store/cart'
import type { FoodType } from "@/pages/Home.vue";


export const selectedCount = 'selectedCount'

export interface CartStoreType extends StoreDefinition {
  key: String
  cartList: FoodType[]
  currentFoodKey: String
  currentFoodCount: Number
  changeCount: Function
  clearCartLsit: Function
}

let store:CartStoreType

function handleStepper(food:FoodType, count:number) {
  store?.changeCount(food, count)
}

function clearCart() {
  store.clearCartLsit()
}

export const totalCount = computed(() => {
  let count = 0
  if(store) {
    store.cartList.forEach(item => {
      if(item[selectedCount]) {
        count += item[selectedCount]
      }
    })
  }
  return count
})

export const totalPrice = computed(() => {
  let price = 0
  if(store) {
    store.cartList.forEach(item => {
      price += item.price * (item[selectedCount] || 0)
    })
  }
  return price
})

export function changeCartCount(target: FoodType, count:number) {
  target[selectedCount] = count
}

export function useCartListHook() {
  store = useUserStore()
  const cartList = computed(() => store.cartList)
  const currentFoodKey = computed(() => store.currentFoodKey)
  const currentFoodCount = computed(() => store.currentFoodCount)  

  return {
    store,
    cartList,
    currentFoodKey,
    currentFoodCount,
    handleStepper,
    clearCart
  }
}




