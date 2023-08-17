<template>
  <van-nav-bar :title="title">
    <template #left>
      <img
        @click="onClickLeft"
        class="left"
        src="../assets//images/icons/top_icon_back_nor_1.png"
        alt=""
      />
    </template>
    <template #right>
      <img
        v-if="rightIcon === 'Order'"
        class="right"
        src="../assets/images/icons/top_icon_order_nor_1.png"
        alt=""
        @click="onRightClick"
      />
      <div class="right-text" v-if="rightText" @click="onRightClick">{{ rightText }}</div>

    </template>
  </van-nav-bar>
</template>

<script lang="ts" setup>
import { useRouterHook } from "../hooks/userRouterHook";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  isBackUse: {
    type: Boolean,
    default: false,
  },
  isRightUse: {
    type: Boolean,
    default: false
  },
  rightIcon: {
    type: String,
    default: "",
  },
  rightText: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["back", "right"]);

const { back, goMyOrder } = useRouterHook();

function onClickLeft() {
  console.log("onClickLeft");

  if (props.isBackUse) {
    emit("back");
  } else {
    back();
  }
}
function onRightClick() {
  if(props.isRightUse) {
    emit('right')
  } else {
    if(props.rightIcon === 'Order') {
      goMyOrder()
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  width: 60px;
  height: auto;
  margin-left: -20px;
}
.right {
  width: 60px;
  height: auto;
  margin-right: -20px;
}
.right-text {
  font-size: 32px;
color: #F19029;
}
</style>
