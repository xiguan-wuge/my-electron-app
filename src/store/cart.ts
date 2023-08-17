import { defineStore } from 'pinia'
import {selectedCount} from '../hooks/useCardListHook'
import type { FoodType } from '@/pages/Home.vue'

const useUserStore = defineStore('Cart', {
  state: () => {
    return {
      cartList: [] as FoodType[],
      currentFoodKey: '', // 当前修改项的key
      currentFoodCount: 0,
    }
  },
  actions: {
    refreshCurKey() {
      this.currentFoodKey = ''
    },
    setCartList(list: FoodType[]) {
      this.currentFoodKey = 'all'
      this.cartList = list
    },
    clearCartLsit() {
      this.cartList = []
    },
    changeCount(food:FoodType, count:number) {
      this.currentFoodKey = food.key
      this.currentFoodCount = count
      const index = this.cartList.findIndex(item => item.key === food.key)
      if(index > -1) {
        if(count) {
          this.cartList[index][selectedCount] = count
        } else {
          this.cartList.splice(index, 1)
        }
      } else {
        this.cartList.push({
          ...food,
          [selectedCount]: count
        })
      }
    }
  }
})

export default useUserStore