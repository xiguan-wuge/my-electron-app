<template>
  <div class="shopcart">
    <div class="cart-content">
      <div class="cart" @click="toggleCart">
        <div class="icon" :class="{ 'icon-nor': !cartCount }">
          <span class="count" v-show="cartCount">{{ cartCount }}</span>
        </div>
        <p class="price">
          <span class="price-count" v-if="totalPrice">￥{{ totalPrice }}</span>
          <span class="price-nor" v-else>购物车是空的</span>
        </p>
      </div>
      <div class="handle" :class="{'handle-multi': !showSingle}" v-if="cartCount">
        <div class="single flex-center" v-if="showSingle" @click="handle">{{ handleText }}</div>
        <div class="multi" v-else>
          <div class="multi-item flex-center" @click="revoke">撤销</div>
          <div class="multi-item flex-center multi-edit" @click="edit">编辑</div>
        </div>
      </div>
    </div>
    <transition name="up">
      <div class="cart-list" v-show="showCart && cartCount">
        <p class="cart-title">
          <span class="cart-title-name">已选商品{{ cartCount }}件</span>
          <span class="cart-title-handle" @click="handleClear">
            <img src="../assets/images/icons/content_icon_delete.png" alt="" />
            <span>清空</span>
          </span>
        </p>
        <div class="list">
          <div
            class="list-item van-hairline--bottom"
            v-for="(food, index) in list"
            :key="index"
          >
            <div class="name">{{ food.name }}</div>
            <div class="price">￥{{ food.price }}</div>
            <div class="food-handle">
              <Stepper
                :model-value="food[selectedCount]"
                :max="food.count"
                @change="(count) => handleStepper(food, count)"
              ></Stepper>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div
        class="mask"
        v-show="showCart && cartCount"
        @click="toggleCart"
      ></div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useCartListHook, selectedCount } from "../hooks/useCardListHook.ts";
import {
  orderStatusMap,
  curOrderStatus,
  changeOrderStatus,
  showSingleStatus,
} from "../hooks/useOrderHook";

import Stepper from "./Stepper.vue";

const emit = defineEmits(['handle', 'edit', 'revoke'])

const {
  cartList,
  handleStepper,
  clearCart,
} = useCartListHook();

const list = computed(() => {
  return cartList.value;
});

const cartCount = computed(() => {
  let count = 0;
  list.value.forEach((item) => {
    count += item[selectedCount] || 0;
  });
  return count;
});
const totalPrice = computed(() => {
  let price = 0;
  list.value.forEach((item) => {
    price += (item[selectedCount] || 0) * item.price;
  });
  return price;
});

const showSingle = computed(() => {
  let bool = false;
  console.log('curOrderStatus', curOrderStatus.value);
  
  bool = showSingleStatus(curOrderStatus.value)
  return bool
});
const handleText = computed(() => {
  return orderStatusMap[curOrderStatus.value + '']
});

watch(cartCount, (val, old) => {
  console.log('cart-count-val', val, old);
  if(val >= 1 && old === 0) {
    changeOrderStatus(1)
  } else if(old >= 1 && val === 0) {
    changeOrderStatus(0)
  }

  console.log('status',curOrderStatus.value);
  
  
})

const showCart = ref(false);
function toggleCart() {
  showCart.value = !showCart.value;
}

function handleClear() {
  showCart.value = false;
  clearCart();
}

function revoke() {
  emit('revoke')
}
function edit() {
  emit('edit')
}
function handle() {
  emit('handle', curOrderStatus.value)
}
</script>

<style lang="less" scoped>
.shopcart {
  width: 100vw;
  height: 100px;
  display: flex;
  position: fixed;
  bottom: 0;
}
.cart-content {
  position: absolute;
  z-index: 2;
  background: #2d313b;
  width: 100%;
  display: flex;
}
.cart {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 22px 31px;
}
.icon {
  background-image: url("../assets/images/icons/bottom_icon_shopping_cart_sel.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 61px;
  height: 55px;
  margin-right: 37px;
}
.icon-nor {
  background-image: url("../assets/images/icons/bottom_icon_shopping_cart_nor.png");
}
.count {
  background: #f15a4a;
  border-radius: 13px;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  overflow: hidden;
  padding: 2px 8px;
  position: absolute;
  top: 13px;
  left: 83px;
}
.price-count {
  font-size: 48px;
  color: #f19029;
}
.price-nor {
  font-size: 30px;
  color: #7f7f7f;
  letter-spacing: 0;
}
.handle {
  flex: 0 1 240px;
  background: #f19029;
  font-size: 36px;
  color: #ffffff;
}
.handle-multi {
  flex: 0 1 320px;
}
.single {
  width: 100%;
  height: 100%;
}
.multi {
  display: flex;
  height: 100%;
}
.multi-item {
  flex: 1;
  height: 100%;
}
.multi-edit {
  background: #49B851;
}

.cart-list {
  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;
  z-index: 1;
  transform: translate3d(0, 0, 0);
}
.cart-title {
  background: #f5f5f5;
  height: 60px;
  padding: 17px 19px;
  font-size: 26px;
  line-height: 28px;
  color: #666666;
  display: flex;
  box-sizing: border-box;
}
.cart-title-name {
  flex: 1;
}
.cart-title-handle {
  display: flex;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
    margin-right: 10px;
    vertical-align: center;
  }
}

.list {
  background-color: #fff;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 33px 20px;
  position: relative;
}
.name {
  font-size: 28px;
  color: #333333;
  width: 290px;
}
.price {
  font-size: 32px;
  color: #f15a4a;
}
.food-handle {
  position: absolute;
  right: 20px;
}
// 自下向上 transition 
// 目标元素需要设置 transform: translate3d(0, 0, 0);
.up-enter-from,
.up-leave-to {
  transform: translate3d(0, 100%, 0);
}
.up-enter-active,
.up-leave-active {
  transition: all, 0.3s;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  width: 100%;
  opacity: 1;
}
// 透明度变化，适用于遮罩层 配合 mask
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all, 0.3s;
}
</style>
