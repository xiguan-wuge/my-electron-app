export default {
  "get|get/myorder": () => {
    return {
      code: 0,
      message: 'ok',
      data: [
        {
          foods: [
            {
              name: '麻婆豆腐300g',
              count: 1,
              price: 23
            },
            {
              name: '红枣糕2块',
              count: 2,
              price: 20
            }
          ],
          status: 1,
          time: '2023/08/06 12:30'
        },
        {
          foods: [
            {
              name: '红烧排骨300g',
              count: 1,
              price: 28
            },
            
          ],
          status: 2,
          time: '2023/08/06 12:30'
        },
        {
          foods: [
            {
              name: '麻婆豆腐300g',
              count: 1,
              price: 23
            },
            {
              name: '红枣糕2块',
              count: 2,
              price: 20
            }
          ],
          status: 3,
          time: '2023/08/06 12:30'
        },
        {
          foods: [
            {
              name: '麻婆豆腐300g',
              count: 1,
              price: 23
            },
            {
              name: '红枣糕2块',
              count: 2,
              price: 20
            }
          ],
          status: 4,
          time: '2023/08/06 12:30'
        },
        {
          foods: [
            {
              name: '麻婆豆腐300g',
              count: 1,
              price: 23
            },
            {
              name: '红枣糕2块',
              count: 2,
              price: 20
            }
          ],
          status: 5,
          time: '2023/08/06 12:30'
        },
        
      ]
    }
  }
}