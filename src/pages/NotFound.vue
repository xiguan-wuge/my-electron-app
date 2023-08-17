<template>
  <div class="not-found">
    <Header title="异常页面"></Header>
    <img src="../assets/images/icons/content_icon_blank.png" alt="暂无页面">
    <p>暂无该页面，请确认地址</p>
  </div>
</template>


<script lang="ts" setup>
import Header from '@/components/Header.vue';
</script>

<style lang="less" scoped>
.not-found {
  text-align: center;

  img {
    margin-top: 280px;
    width: auto;
    height: auto;
    margin-bottom: 20px;
  }
  p {
    font-size: 28px;
    color: #7f7f7f;
  }
}
</style>