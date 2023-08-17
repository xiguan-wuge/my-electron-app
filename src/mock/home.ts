export default {
  "get|get/foodlist": () => {
    return {
      code: 0,
      data: [
        {
          title: "星期一",
          key: "1",
          list: [
            {
              name: "金针云耳蒸鸡500g",
              count: 23,
              praise: 28,
              price: 28,
              key: "123",
            },
            {
              name: "麻婆豆腐300g",
              count: 20,
              praise: 28,
              price: 28,
              key: "456",
            },
            {
              name: "清炒土豆丝200g",
              count: 30,
              praise: 28,
              price: 28,
              key: "789",
            },
          ],
        },
      ],
      message: "ok",
    };
  },
};
