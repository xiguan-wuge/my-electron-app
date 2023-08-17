<template>
  <div class="feedback">
    <Header
      :title="title"
      rightText="提交"
      :isRightUse="true"
      @right="handleRight"
    ></Header>
    <div class="wrapper" v-if="!hasSubmit">
      <textarea
        cols="30"
        rows="10"
        v-model="text"
        :placeholder="placeholder"
        maxlength="200"
      >
      </textarea>
      <div class="word-count" v-if="text">{{ text.length }} / 200</div>
    </div>
    <div class="no-data" v-if="hasSubmit">
      <img src="../assets/images/icons/content_icon_successful.png" alt="" />
      <p class="text">您的意见已提交成功！</p>
      <p class="close" @click="back">关闭</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "../components/Header.vue";
import { showSuccessToast } from "vant";
import "vant/es/toast/style/index.mjs";

import { ref, computed } from "vue";
import { useRouterHook } from "../hooks/userRouterHook";

const { router, routes, back } = useRouterHook();

console.log("routes-----", router, routes);

const title = computed(() => {
  return routes.query.title + '' || '';
});

const placeholder = computed(() => {
  const type = routes.query.type === "feedback" ? "反馈" : "评论";
  return `请输入您的${type}`;
});

const text = ref("");
const hasSubmit = ref(false);
function handleRight() {
  console.log("handleRight-提交");
  showSuccessToast("提交成功");
  hasSubmit.value = true;
}
</script>

<style lang="less" scoped>
.feedback {
  background-color: #f2f3f5;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.wrapper {
  position: relative;
}
textarea {
  margin-top: 32px;
  width: 100%;
  outline: none;
  border-width: 0;
  box-sizing: border-box;
  padding: 29px 20px;
  font-size: 32px;
  line-height: 1.2;
  color: #333;
  &::placeholder {
    color: #b3b3b3;
  }
}
.word-count {
  position: absolute;
  bottom: 20px;
  right: 19px;
  text-align: right;
  font-size: 32px;
  color: #7f7f7f;
  letter-spacing: 0;
}
.no-data {
  text-align: center;
  margin-top: 255px;
  img {
    width: 100px;
    height: auto;
  }
  .text {
    font-size: 28px;
    color: #7f7f7f;
    letter-spacing: 0;
    margin: 38px 0 36px;
  }
  .close {
    font-size: 28px;
    color: #f19029;
  }
}
</style>
