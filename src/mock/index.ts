/**
 * mock 初始化配置
 */
import Mock from 'mockjs'
import {baseURL} from '@/api/index'

let configArray:any[] = []
export function initMock() {
  console.log('initMock')
  // 设置拦截ajax请求的相应时间
  Mock.setup({
    timeout: '200-600'
  });

    // 正则匹配mock目录下的文件
    const files = import.meta.globEager('../mock/*.ts')
  
  // 读取mock文件的接口数据
  for(const key in files) {
    console.log('key', key);
    
    const item = files[key]
    if(key !== '../mock/index.ts') {
      configArray.push(item.default)
    }
  }
  configArray.forEach(item => {
    for(let [path, target] of Object.entries(item)) {
      const protocol = path.split('|')
      console.log('protocol[1]', protocol[1]);
      
      Mock.mock(new RegExp('^' + baseURL+protocol[1]), protocol[0], target);
    }
  })
}
