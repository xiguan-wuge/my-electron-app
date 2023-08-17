<template>
  <div class="home">
    <header>
      <Header title="菜品订购" rightIcon="Order" ></Header>
    </header>
    <main>
      <aside class="nav">
        <p class="nav-title flex-center cursor">订餐需知</p>
        <ul class="nav-list cursor">
          <li
            class="nav-item flex-center"
            :class="{ 'nav-item-active': nav.key === curNavKey }"
            @click="handleClickNav(nav.key)"
            v-for="nav in navList"
            :key="nav.key"
          >
            {{ nav.name }}
          </li>
        </ul>
        <div class="nav-feedback cursor" @click="goFeedback">
          <van-icon name="chat-o" color="#F19029" size="20" />
          <p>意见反馈</p>
        </div>
      </aside>
      <div class="content">
        <div class="food" v-for="foodType in foodList" :key="foodType.key">
          <p class="food-title">{{ foodType.title }}</p>
          <div
            class="food-detail cursor van-hairline--bottom"
            v-for="(food, index) in foodType.list"
            :key="index"
            @click="goDetail(food)"
          >
            <div class="food-img flex-center">
              <img :src="food.img" alt="" v-if="food.img" />
              <div class="img-error">暂无图片</div>
            </div>
            <div class="food-right">
              <p class="food-name">{{ food.name }}</p>
              <p class="food-other">
                剩余{{ food.count }} &nbsp;&nbsp; 点赞{{ food.praise }}
              </p>
              <p class="food-price">￥{{ food.price }}</p>
              <Stepper
                :model-value="food[selectedCount]"
                @change="(count:number) => handleStepper(food, count)"
                :max="food.count"
                class="stepper"
              ></Stepper>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="shopping-cart">
      <ShopCart @handle="goOrder"></ShopCart>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import type { Ref, ComputedRef } from 'vue'
import useUserStore from '@/store/cart'
import {changeCartCount, selectedCount} from '@/hooks/useCardListHook'
import { useRouterHook } from "@/hooks/userRouterHook.ts";
import { changeOrderStatus } from '@/hooks/useOrderHook.ts';
import api from '@/api'


import Stepper from "@/components/Stepper.vue";
import ShopCart from "@/components/ShopCart.vue";
import Header from "@/components/Header.vue";

export interface FoodType {
  key: string
  name: string
  count: number
  selectedCount?: number
  price: number
  praise: number
  img: string | undefined
}

export interface FoodListType {
  key: string
  title: string
  list: FoodType[]
}

const curNavKey = ref("hot");
const navList = ref([
  {
    name: "热销",
    key: "hot",
  },
  {
    name: "特卖",
    key: "special",
  },
  {
    name: "星期一",
    key: "1",
  },
  {
    name: "星期二",
    key: "2",
  },
  {
    name: "星期三",
    key: "3",
  },
  {
    name: "星期四",
    key: "4",
  },
  {
    name: "星期五",
    key: "5",
  },
  {
    name: "星期六",
    key: "6",
  },
  {
    name: "星期七",
    key: "7",
  },
  
]);
function handleClickNav(key: string) {
  curNavKey.value = key;
}

const foodList:Ref<FoodListType[]> = ref([]);

const store = useUserStore()
const cartList:ComputedRef<FoodType[]> = computed(() => store.cartList)
const currentFoodKey = computed(() => store.currentFoodKey)
const currentFoodCount = computed(() => store.currentFoodCount)
watch(
  cartList, 
  (val) => {
    if(val.length) {
        // 购物车新增
        // console.log('val-------------');
        
        if(currentFoodKey.value === 'all') {
          foodList.value.forEach((item, ) => {
            item.list.forEach(food => {
              val.forEach(cart => {
                if(food.key === cart.key) {
                  changeCartCount(food, cart[selectedCount] || 0)
                }
              })
            
            })
          })
          store.refreshCurKey()
          return
        } 
        // 购物车更新
        foodList.value.forEach((item, ) => {
          item.list.forEach(food => {
            if(food.key === currentFoodKey.value) {
              changeCartCount(food, currentFoodCount.value)
            }
          })
        })
    } else {
      // 购物车已清空
      foodList.value.forEach((item, ) => {
          item.list.forEach(food => {
            food[selectedCount] = 0
          })
        })
    }
  },
  {
    deep: true
  }
)
function handleStepper(food:FoodType, count:number) {
  store.changeCount(food, count)
}

function initFoodList() {
  return api.get('getFoodList')
  .then((res:any) => {
    console.log('res---', res);
    if(res && res.code === 0) {
      foodList.value = res.data
    }
  })
  .catch((err: any) => {
    console.log('err--', err);
    
  })
}

function initCartList() {
  return api.get('getShopcartList')
  .then((res:any) => {
    console.log('getShopcartList-res',res);
    store.setCartList(res.data)
  })
  .catch((err:any) => {
    console.log('getShopcartList-err', err);
    
  })
}

async function initHome() {
  try {
    await initFoodList()
    await initCartList()
  } catch (error) {
    console.log('initHome-err', error);
    
  }
}
initHome()
// 接口请求


const {router } = useRouterHook()

function goDetail(food:FoodType) {
  router.push({
    path: '/detail',
    query: {
      foodKey: food.key
    }
  })
}

function goFeedback() {
  router.push({
    path: '/feedback',
    query: {
      title: '意见反馈',
      type: 'feedback'
    }
  })
}

function goOrder(status: number) {
  router.push({
    path: '/order'
  })
  if(status === 1) {
    changeOrderStatus(2)
  }
  
}


</script>
<style lang="less" scoped>
.home {
  padding-bottom: 100px;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: scroll;
}
main {
  display: flex;
  position: absolute;
  top: 100px;
  bottom: 100px;
  left: 0;
  right: 0;
}
.nav {
  width: 165px;
  font-size: 28px;
  color: #333;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.nav-title {
  height: 116px;
  flex: 0 1 116px;
  color: #f19029;
}
.nav-list {
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    width: 0px;
  }
}
.nav-item {
  height: 115px;
}
.nav-item-active {
  background-color: #fff;
}
.nav-feedback {
  flex: 0 1 120px;
  text-align: center;
  padding: 41px 0;
  p {
    padding: 19px 0 0;
    font-size: 28px;
    color: #f19029;
    letter-spacing: 0;
  }
}
.shopping-cart {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  z-index: 1;
}
.content {
  flex: 1;
}
.food-title {
  font-size: 28px;
  padding: 16px 20px;
  font-size: 28px;
  color: #666666;
  letter-spacing: 0;
  background-color: #f4f4f4;
}
.food-detail {
  background-color: #fff;
  padding: 20px;
  display: flex;
  position: relative;
}
.food-img {
  width: 120px;
  height: 120px;
  overflow: hidden;
  background: #eaeaea;
  border-radius: 3px;
  font-size: 24px;
  color: #b3b3b3;
  margin-right: 20px;
}
.food-name {
  font-size: 28px;
  color: #333333;
}
.food-other {
  font-size: 22px;
  color: #7f7f7f;
  padding: 10px 0 8px;
}
.food-price {
  font-size: 30px;
  color: #f15a4a;
  position: relative;
}
.food-right {
  position: relative;
  flex: 1;
}
.stepper {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
