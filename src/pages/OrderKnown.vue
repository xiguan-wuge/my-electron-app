<template>
  <div class="order-known">
    <Header title="购餐须知"></Header>
    <section class="content">
      <p
        class="text"
        :class="{ title: item.isTitle }"
        v-for="(item, index) in knowning"
        :key="index"
      >
        {{ item.text }}
      </p>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/Header.vue";
const knowning = [
  {
    text: "关于本部食堂增设晚餐点餐以及外卖服务通知，为了更好的为公司员工提供便利，本部食堂拟与2月13日起，晚餐增设现场点餐以及订餐外卖服务，具体安排如下：",
  },
  {
    text: "1、点餐、订餐流程",
    isTitle: true,
  },
  {
    text: "关于本部式样增设晚餐点餐以及外卖服务通知，为了更好地为公司员工提供便利，本部食堂拟于2月13日起，晚餐增设现场点餐以及订餐外卖服务",
  },
  {
    text: "现场点餐",
    isTitle: true,
  },
  {
    text: "关于本部式样增设晚餐点餐以及外卖服务通知，为了更好地为公司员工提供便利，本部食堂拟于2月13日起，晚餐增设现场点餐以及订餐外卖服务",
  },
  {
    text: "订餐外卖",
    isTitle: true,
  },
  {
    text: "关于本部式样增设晚餐点餐以及外卖服务通知，为了更好地为公司员工提供便利，本部食堂拟于2月13日起，晚餐增设现场点餐以及订餐外卖服务",
  },
];
</script>

<style lang="less" scoped>
.order-known {
  height: 100vh;
  overflow-y: scroll;
  background-color: #fff;
}
.content {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px;
  border-top: 32px solid #f2f3f5;
}
.text {
  font-size: 30px;
  color: #333333;
  line-height: 40px;
}
.title {
  color: #7F7F7F;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
