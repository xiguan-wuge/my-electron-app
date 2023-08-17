<template>
  <div class="detail no-scrollbar">
    <header class="banner">
      <van-swipe
        style="height: 250px"
        vertical
        :lazy-render="true"
        :loop="true"
      >
        <van-swipe-item v-for="banner in bannerList">
          <img :src="banner" alt="" class="banner-img" />
        </van-swipe-item>
      </van-swipe>
      <div class="back cursor" @click="back"></div>
      <div class="order cursor" @click="goOrder"></div>
    </header>
    <main>
      <section class="food-detail">
        <p class="name">{{ foodDetail.name }}</p>
        <p class="prompt">{{ foodDetail.propmt }}</p>
        <p class="count">剩余{{ foodDetail.count }}</p>
        <p class="price">￥{{ foodDetail.praise }}</p>
        <div class="praise cursor" @click="togglePraise">
          <img
            src="../assets/images/icons/details_icon_good_sel.png"
            alt=""
            v-if="hasPraised"
          />
          <img
            src="../assets/images/icons/details_icon_good_nor.png"
            alt=""
            v-else
          />
          <span>{{ foodDetail.praise }}</span>
        </div>
        <div class="add-cart">
          <div
            class="add cursor flex-center"
            v-if="!userCartCount"
            @click="handleStepper(foodDetail, 1)"
          >
            <img
              src="../assets/images/icons/bottom_icon_shopping_cart_sel.png"
              alt=""
            />
            <span>加入购物车</span>
          </div>
          <Stepper
            v-else
            :model-value="userCartCount"
            :max="foodDetail.count"
            @change="(count) => handleStepper(foodDetail, count)"
            >></Stepper
          >
        </div>
      </section>
      <section class="intro van-hairline--top">
        <p class="intro-title">菜品介绍</p>
        <p class="intro-detail">{{ foodDetail.introduce }}</p>
      </section>
      <section class="comments">
        <p class="comments-title flex-center">
          <span class="comment-title-left"
            >评论&nbsp;({{ foodDetail.comments.length }}条)</span
          >
          <span class="comments-add cursor" @click="goComment">我要评论</span>
        </p>
        <div class="comment-list">
          <div
            class="comments-item van-hairline--bottom"
            v-for="comment in foodDetail.comments"
          >
            <div class="avatar">
              <img :src="comment.avatar" />
            </div>
            <div class="user-detail">
              <p class="user-detail-name">{{ comment.useName }}</p>
              <p class="user-detail-comment">{{ comment.comment }}</p>
            </div>
            <div class="time">{{ comment.time }}</div>
          </div>
        </div>
      </section>
    </main>
    <footer>
      <ShopCart></ShopCart>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { useCartListHook, selectedCount } from "../hooks/useCardListHook.ts";
import { useRouterHook } from "../hooks/userRouterHook.ts";

import ShopCart from "../components/ShopCart.vue";
import Stepper from "../components/Stepper.vue";

const bannerList = ref([
  new URL("../assets/images/mapodoufu.jpeg", import.meta.url).href,
  new URL("../assets/images/kaoyu.jpeg", import.meta.url).href,
  new URL("../assets/images/meicaikourou.jpeg", import.meta.url).href,
  new URL("../assets/images/qingzhengluyu.jpeg", import.meta.url).href,
]);

const foodDetail = reactive({
  key: "123",
  name: "金针云耳蒸鸡500g",
  propmt: "糕点每人限购3份",
  limitCount: 3,
  praise: 285,
  count: 23,
  price: 28,
  introduce: "金针菇不仅口感鲜美、营养丰富，还可以增强人的智力",
  comments: [
    {
      useName: "黄艳茹",
      account: "huangyanru",
      comment: "超级好吃的，每周必点~~",
      time: "12：30",
    },
    {
      useName: "张三",
      account: "zhangsan",
      comment: "超级好吃的，每周必点~~",
      time: "12：40",
    },
    {
      useName: "李四",
      account: "lisi",
      comment: "超级好吃的，每周必点~~",
      time: "12：30",
    },
  ],
});

const {
  cartList,
  handleStepper,
} = useCartListHook();
const hasPraised = ref(false);
function togglePraise() {
  hasPraised.value = !hasPraised.value;
}

const userCartCount = computed(() => {
  let count = 0;
  cartList.value.forEach((item) => {
    if (item.key === foodDetail.key) {
      count = item[selectedCount] || 0;
    }
  });
  return count;
});

const { router, back } = useRouterHook();

function goOrder() {
  router.push({
    path: "/order",
  });
}

function goComment() {
  router.push({
    path: "/feedback",
    query: {
      title: '填写评论',
      type: 'comment',
      foodId: foodDetail.key
    }
  });
}
</script>

<style lang="less" scoped>
.detail {
  position: relative;
  height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
  padding-bottom: 100px;
  overflow-y: scroll;
}
.banner-img {
  width: 100%;
  height: auto;
}
.back,
.order {
  position: absolute;
  top: 60px;
  left: 11px;
  width: 60px;
  height: 60px;
  background-image: url("../assets/images/icons/top_icon_back_sel.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.order {
  background-image: url("../assets/images/icons/top_icon_order_sel.png");
  left: unset;
  right: 11px;
}
.food-detail {
  padding: 29px 21px;
  box-sizing: border-box;
  font-size: 26px;
  color: #7f7f7f;
  letter-spacing: 0;
  position: relative;
  .name {
    font-size: 32px;
    color: #000000;
    letter-spacing: 0;
    margin-bottom: 19px;
  }
  .count {
    margin: 12px 0 22px;
  }
  .price {
    font-size: 64px;
    color: #f15a4a;
  }
  .praise {
    position: absolute;
    right: 19px;
    top: 82px;
    text-align: right;
    font-size: 28px;
    color: #7f7f7f;
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      width: auto;
      height: 30px;
    }
  }
  .add-cart {
    position: absolute;
    right: 20px;
    bottom: 30px;
    .add {
      background: #f19029;
      border-radius: 8px;
      width: 210px;
      height: 60px;
      font-size: 24px;
      color: #ffffff;
      img {
        width: 32px;
        height: auto;
        margin: 19px;
      }
    }
  }
}

.intro {
  box-sizing: border-box;
  padding: 29px 21px;
  font-size: 28px;
  color: #666666;
  letter-spacing: 0;
  .intro-title {
    color: #7f7f7f;
    margin-bottom: 25px;
  }
}

.comments {
  .comments-title {
    height: 71px;
    background: lightgray;
    box-shadow: 0 1px 0 0 #eaeaea;
    font-size: 28px;
    color: #000000;
    letter-spacing: 0;
    line-height: 29px;
    box-sizing: border-box;
    padding: 0 20px;
    .comment-title-left {
      flex: 1;
    }
    .comments-add {
      color: #f19029;
    }
  }
  .comments-item {
    box-sizing: border-box;
    min-height: 145px;
    padding: 20px;
    display: flex;
    font-size: 28px;
    .avatar {
      width: 70px;
      height: 70px;
      margin-right: 20px;
      border-radius: 50%;
      background-color: lightgrey;
      img {
        width: 100%;
        height: auto;
      }
    }
    .user-detail {
      flex: 1;
      margin-top: 21px;
    }
    .user-detail-name {
      color: #7f7f7f;
      margin-bottom: 16px;
    }
    .user-detail-comment {
      color: #000000;
    }
    .time {
      font-size: 26px;
      color: #b3b3b3;
      margin-top: 21px;
    }
  }
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
}
</style>
