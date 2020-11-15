import {instance} from './request';
import qs from 'qs';

// 管理员登录
export function adminLogin(userName,userPassword) {
  let data = qs.stringify({
    username:userName,
    password:userPassword,
  })
  return instance.post('/admin/login',data)
}

// 验证管理员是否登录
export function adminIsLogined() {
  return instance.get('/admin/adminIsLogined')
}


// 上传图片
export function uploadSectionFile(param) {
  var fileObj = param; // 要上传的文件对象
  let data = qs.stringify({
    upload:fileObj
  })
  return instance.post('/upload',data)
}

// 取消上传
export function cancelUpload(filepath) {
  let data = qs.stringify({
    filePath:filepath
  })
  return instance.post('/removeFile',data)
}

// 文章上传
export function articlePublish(articleDate){
  let data = qs.stringify({
  articleTitle:articleDate.title,
  articleCategoryId:articleDate.categroy,
  articleLabelId:articleDate.label,
  articleImage:articleDate.imgsrc,
  articleSynopsis:articleDate.brief,
  articleContent:articleDate.content
  })
  return instance.post('/article/Publish',data)
}

// 获取文章
// export function getLabelArticle(){
//   return instance.get("/article/getArticle")
// }

// /* 获取文章 */
export function getArticle(param) {
  return instance.get(`/article/getArticle?categoryId=${param.categoryId}&labelId=${param.labelId}&currentPage=${param.currentPage}&pageSize=${param.pageSize}&keyword=${param.keyword}`)
}

/* 跟据关键字获取文章 */
export function getGoodsByKeyword(param) {
  return instance.get({
    url:`/getGoodsByKeyword?keyword=${param}`
  })
}

/* 获取文章数量 */
export function getArticlesCount(param) {
  return instance.get(`/article/getArticlesCount?categoryId=${param.categoryId}&labelId=${param.labelId}&keyword=${param.keyword}`)
}

// 修改文章
export function updateArticle(articleDate,articleId){
  let data = qs.stringify({
  articleTitle:articleDate.title,
  articleCategoryId:articleDate.categroy,
  articleLabelId:articleDate.label,
  articleImage:articleDate.imgsrc,
  articleSynopsis:articleDate.brief,
  articleContent:articleDate.content,
  articleId:articleId
  })
  return instance.post('/article/updataArticle',data)
}

// 删除文章
export function deleteArticle(articleId,imgsrc) {
  let data = qs.stringify({
    articleId:articleId,
    articleImage:imgsrc
  })
  return instance.post('/article/deleteArticle',data)
}

// 获取用户
export function getAllUserInfo(){
  return instance.get("/user/getAllUserInfo")
}

// 删除用户
export function deleteUser(username) {
  let data = qs.stringify({
    username:username
  })
  return instance.post('/user/deleteUser',data)
}

// 添加分类
export function addCategory(category) {
  let data = qs.stringify({
    categoryName:category
  })
  return instance.post('/article/addCategory',data)
}

// 修改分类
export function updateCategory(category) {
  let data = qs.stringify({
    oldCategoryName:category.oldCategoryName,
    newCategoryName:category.newCategoryName
  })
  return instance.post('/article/updateCategory',data)
}

// 删除分类
export function deleteCategory(categoryName) {
  let data = qs.stringify({
    categoryName:categoryName
  })
  return instance.post('/article/deleteCategory',data)
}

// 添加标签
export function addLabel(label) {
  let data = qs.stringify({
    categoryId:label.categoryId,
    labelName:label.labelName
  })
  return instance.post('/article/addLabel',data)
}

// 修改标签
export function updateLabel(label) {
  let data = qs.stringify({
    oldLabelName:label.oldLabelName,
    newLabelName:label.newLabelName
  })
  return instance.post('/article/updateLabel',data)
}

// 删除标签
export function deleteLabel(labelId) {
  let data = qs.stringify({
    labelId:labelId
  })
  return instance.post('/article/deleteLabel',data)
}

// 删除评论
export function deleteMessage(messageId,articleId) {
  let data = qs.stringify({
    messageId:messageId,
    articleId:articleId
  })
  return instance.post('/article/deleteMessage',data)
}

// 发布公告
export function publishNotice(notice) {
  let data = qs.stringify({
    notice:notice
  })
  return instance.post('/notice/publish',data)
}

// 发布素材&工具
export function publishTool(tool) {
  let data = qs.stringify({
    toolName:tool.toolName,
    toolPath:tool.toolPath,
    toolImage:tool.toolImage,
    toolBrief:tool.toolBrief
  })
  return instance.post('/tool/publish',data)
}

// 发布Demo
export function publishDemo(demo) {
  let data = qs.stringify({
    demoName:demo.demoName,
    demoPath:demo.demoPath,
    demoVideo:demo.demoVideo,
    demoBrief:demo.demoBrief
  })
  return instance.post('/demo/publish',data)
}

// 退出后台
export function adminExit() {
  return instance.get('/admin/exit')
}