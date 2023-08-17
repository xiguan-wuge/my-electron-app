export default {
  "get|get/shopcart/list": () => {
    return {
      code: 0,
      message: 'ok',
      data: [
        {
          name: "金针云耳蒸鸡500g",
          count: 23,
          praise: 28,
          price: 28,
          key: "123",
          selectedCount: 1,
        },
        {
          name: "麻婆豆腐300g",
          count: 20,
          praise: 28,
          price: 28,
          key: "456",
          selectedCount: 2,

        },
      ]
    }
  }
}