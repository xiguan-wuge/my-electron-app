<template>
  <div class="order">
    <Header :title="title"></Header>
    <p class="title">商品信息</p>
    <div class="order-list">
      <div class="order-item" v-for="food in cartList">
        <p class="name">{{ food.name }}</p>
        <p class="count">X{{ food[selectedCount] }}</p>
        <p class="price">￥{{ food.price }}</p>
      </div>
    </div>
    <div class="total van-hairline--bottom van-hairline--top">
      <div class="total-prompt">总计</div>
      <div class="total-price">￥{{ totalPrice }}</div>
    </div>
    <div class="time van-hairline--bottom van-hairline--top">
      <span class="time-prompt">取餐时间</span>
      <span class="time-select" @click="toggleShowPicker">
        <span v-if="timeValue" class="time-selected">{{ timeValue }}</span>
        <span v-else>
          选择取餐时间
          <img src="../assets/images/icons/list_downward_icon.png" alt="" />
        </span>
      </span>
    </div>
    <div class="prompt">
      <p class="prompt-title">友情提示</p>
      <p class="prompt-detail">
        订餐人须于当天15：00前到201室办理外卖刷卡消费，
        <br />
        <br />
        温馨提示：保质期常温下2小时，低温保存24小时，再
      </p>
    </div>
    <ShopCart @handle="handleCart"></ShopCart>
    <TimePicker
      :show="isShowPicker"
      @close="toggleShowPicker"
      @confirm="handleTimeConfirm"
    ></TimePicker>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import {
  useCartListHook,
  totalPrice,
  selectedCount,
} from "../hooks/useCardListHook";
import {
  curOrderStatus,
} from "../hooks/useOrderHook";

import Header from "../components/Header.vue";
import ShopCart from "../components/ShopCart.vue";
import TimePicker from "../components/TimePicker.vue";
import { showSuccessToast } from "vant";
import "vant/es/toast/index.css";
import type {PickerConfirmEventParams} from 'vant'

const title = computed(() => {
  let text = curOrderStatus.value === 2 ? "确定下单" : "我的订单";
  return text;
});

const { cartList } = useCartListHook();

const isShowPicker = ref(false);

function toggleShowPicker() {
  isShowPicker.value = !isShowPicker.value;
}
const timeValue = ref("");
function handleTimeConfirm(e: PickerConfirmEventParams) {
  timeValue.value = `${e.selectedValues[0]}:${e.selectedValues[1]}`;
  toggleShowPicker();
}

function handleCart() {
  showSuccessToast("下单成功");

  // const toast = showLoadingToast({
  //   duration: 0,
  //   forbidClick: true,
  //   message: "倒计时 3 秒",
  // });
  // let second = 3;
  // const timer = setInterval(() => {
  //   second--;
  //   if (second) {
  //     toast.message = `倒计时 ${second} 秒`;
  //   } else {
  //     clearInterval(timer);
  //     closeToast();
  //   }
  // }, 1000);
}
</script>

<style lang="less" scoped>
.order {
  height: 100vh;
  overflow-y: scroll;
  background-color: #f2f3f5;
  box-sizing: border-box;
  padding-bottom: 100px;
}
.title {
  padding: 17px 20px;
  font-size: 28px;
  color: #666666;
  letter-spacing: 0;
}

.order-item {
  height: 90px;
  display: flex;
  align-items: center;
  font-size: 28px;
  color: #333333;
  letter-spacing: 0;
  background-color: #fff;
  padding: 0 20px;
  .name {
    flex: 0 1 400px;
    padding-right: 20px;
  }
  .count {
    font-size: 32px;
    color: #7f7f7f;
    flex: 1;
    padding-right: 20px;
  }
  .price {
    text-align: right;
  }
}
.total {
  background: #ffffff;
  box-shadow: 0 1px 0 0 #eaeaea;
  height: 88px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 32px;
  .total-prompt {
    flex: 1;
  }
  .total-price {
    font-size: 32px;
    color: #f15a4a;
    letter-spacing: 0;
  }
}
.time {
  background: #ffffff;
  box-shadow: 0 1px 0 0 #eaeaea;
  height: 88px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  font-size: 32px;
  color: #7f7f7f;
  .time-prompt {
    flex: 1;
  }
  .time-select {
    color: #b3b3b3;
    img {
      height: 26px;
      margin-left: 20px;
    }
    .time-selected {
      font-size: 32px;
      color: #333333;
      letter-spacing: 0;
    }
  }
}
.prompt {
  padding: 33px 20px;
  background-color: #fff;
}

.prompt-title {
  margin-left: 10px;
  font-size: 28px;
  color: #7f7f7f;
  margin-bottom: 22px;
}
.prompt-detail {
  font-size: 28px;
  line-height: 1.5;
  color: #666666;
  letter-spacing: 0;
}
</style>
