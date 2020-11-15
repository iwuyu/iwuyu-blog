import {instance} from './request';

// 获取分类
export function getCategory(){
  return instance.get("/article/getCategory")
}

// 获取标签
export function getLabel(){
  return instance.get("/article/getLabel")
}

// 请求分页文章
export function getArticlePage(page) {
  return instance.get(`/article/page?pageNo=${page.pageNo}&pageSize=${page.pageSize}`)
}

// 请求分页分类
export function getCategoryPage(page,categoryId) {
  return instance.get(`/category/page?pageNo=${page.pageNo}&pageSize=${page.pageSize}&categoryId=${categoryId}`)
}

// 请求分页标签
export function getLabelPage(page,labelId) {
  return instance.get(`/label/page?pageNo=${page.pageNo}&pageSize=${page.pageSize}&labelId=${labelId}`)
}

// 请求分页模糊查询
export function getKeyWordPage(page,keyWord) {
  return instance.get(`/keyword/page?pageNo=${page.pageNo}&pageSize=${page.pageSize}&keyWord=${keyWord}`)
}

// 请求文章详情
export function getArticleDetail(articleId) {
  return instance.get(`/article/detail?articleId=${articleId}`)
}

// 判断是否有留言
export function hasMessage(articleId) {
  return instance.get(`/article/hasMessage?articleId=${articleId}`)
}

// 获取评论与回复内容
export function getMessageAndReply(articleId) {
  return instance.get(`/article/getMessageAndReply?articleId=${articleId}`)
}

// 获取最新评论内容
export function getNewMessage() {
  return instance.get("/article/getNewMessage")
}

// 获取站点统计信息
export function getSiteStatistics() {
  return instance.get("/article/getSiteStatistics")
}

// 获取最新公告
export function getNotice() {
  return instance.get("/notice/getNotice")
}

// 获取素材&工具
export function getTool() {
  return instance.get("/tool/getTool")
}

// 获取Demo
export function getDemo() {
  return instance.get("/demo/getDemo")
}