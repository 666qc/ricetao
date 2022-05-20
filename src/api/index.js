import request from "./request.js"


// 轮播图
export function feachCarousel() {
    return request.get('http://api.w0824.com/api/getlunbo');
  }

// 首页商品http://api.w0824.com
export function feachgoods(page=1,limit=10) {
  return request.get(`/api/recommend?page=${page}&limit=${limit}`);
}

// 获取商品列表 http://api.w0824.com

export function fetchGoodsList(page = 1, pagesize = 10) {
  return request.get(`http://api.w0824.com/api/getgoods?pageindex=${page}&pagesize=${pagesize}`)
}
