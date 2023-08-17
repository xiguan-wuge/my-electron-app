<template>
  <div class="my-order no-scrollbar">
    <Header title="我的订单"></Header>
    <div class="order" v-for="item in list">
      <div class="food van-hairline--bottom">
        <div class="food-item" v-for="(food, foodIdx) in item.foods">
          <p class="food-item-name">{{ food.name }}</p>
          <p class="food-item-count">X{{ food.count }}</p>
          <div class="time" v-if="foodIdx === 0">刚刚</div>
        </div>
      </div>
      <div class="total">
        <div class="total-price">
          总计 <span>￥{{ item.totalPrice }}</span>
        </div>
        <div class="status">
          <!-- 可编辑 -->
          <div class="handle" v-if="item.status === 1">
            <button class="btn" @click="handleCancel(item)">撤销</button>
            <button class="btn btn-green" @click="handleEdit(item)">编辑</button>
          </div>
          <!-- 确认下单 -->
          <div class="handle" v-if="item.status === 2">
            <button class="btn btn-yellow" @click="handleConfirm">确认下单</button>
          </div>
          <!-- 已付款 -->
          <div class="handle pay" v-if="item.status === 3">
            <p class="pay-text">已付款</p>
            <p class="pay-code">取货码：44387</p>
          </div>
          <!-- 已完成 -->
          <div class="handle done" v-if="item.status === 4">已完成</div>
          <!-- 已过期 -->
          <div class="handle over-time" v-if="item.status === 5">已过期</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import api from "@/api";

import Header from "@/components/Header.vue";
import {  showConfirmDialog, showToast } from 'vant';
import "vant/es/toast/style/index.mjs";
import "vant/es/dialog/style/index.mjs";


const list = ref([]);
function getData() {
  api
    .get("getMyOrder")
    .then((res: any) => {
      console.log("getMyOrder-res", res);
      list.value = computedList(res.data);
    })
    .catch((err: any) => {
      console.log("getMyOrder-err", err);
    });
}
getData();

function computedList(list: any) {
  if(!Array.isArray(list)) return list
  const listTemp = list
  listTemp.forEach(item => {
    let totalPrice = 0
    item.foods.forEach((food: any) => {
      totalPrice += food.count * food.price
    })
    item.totalPrice = totalPrice
  })
  return listTemp
}

function handleCancel(item) {
  console.log('handleCancel');
  
  showConfirmDialog({
    title: '确认撤销该订单？',
  })
    .then(() => {
      showToast('撤销成功')
    })
    .catch(() => {})
}

function handleEdit(item) {
  showToast('模拟编辑成功')
}

function handleConfirm(item){
  showConfirmDialog({
    title: '确认该订单？',
  })
    .then(() => {
      showToast('确认成功')
    })
    .catch(() => {})
}

</script>

<style lang="less" scoped>
.my-order {
  background-color: #f7f7f7;
  box-sizing: border-box;
  padding-bottom: 32px;
}
.order {
  margin-top: 32px;
  background-color: #fff;
}
.food {
  padding: 0 20px;
  font-size: 28px;
  color: #333333;
  .food-item {
    display: flex;
    align-items: center;
    height: 74px;
    position: relative;

    .food-item-name {
      flex: 0 1 370px;
    }
  }
}
.time {
  position: absolute;
  right: 20px;
  // top: 27px;
  font-size: 26px;
  color: #b3b3b3;
}

.total {
  height: 98px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  .total-price {
    font-size: 32px;
    color: #7f7f7f;
    margin-right: 30px;
    flex: 1;
    span {
      color: #f15a4a;
    }
  }
}
.handle {
  .btn {
    border: 1px solid #b3b3b3;
    border-radius: 8px;
    width: 150px;
    height: 56px;
    font-size: 28px;
    color: #7f7f7f;
    text-align: center;
    line-height: 56px;
    padding: 0;
    background-color: #fff;
  }
  .btn + .btn {
    margin-left: 20px;
  }
  .btn-green {
    background: #49b851;
    border-color: #49b851;
    color: #fff;
  }
  .btn-yellow {
    background: #f19029;
    border-color: #f19029;
    color: #fff;
  }
  &.pay {
    text-align: right;
    p {
      line-height: 1;
    }
    .pay-text {
      font-size: 28px;
      color: #49b851;
    }
    .pay-code {
      font-size: 24px;
      color: #7f7f7f;
      margin-top: 13px;
    }
  }

  &.done {
    text-align: right;
    font-size: 28px;
    color: #0191e5;
  }

  &.over-time {
    text-align: right;
    font-size: 28px;
    color: #7f7f7f;
  }
}
</style>
