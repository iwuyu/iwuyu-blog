import {instance} from './request';
import qs from 'qs';

// 登录
export function userLogin(userName,userPassword) {
  let data = qs.stringify({
    username:userName,
    password:userPassword,
  })
  return instance.post('/user/login',data)
}

// 用户验证token是否过期
export function userIsLogined(token) {
  let data = qs.stringify({
    token: token
  })
  return instance.post('/user/userIsLogined',data)
}

// 邮箱
export function sendMail(mail) {
  let data = qs.stringify({
    mail: mail
  })
  return instance.post('/sendMail',data)
}

// 注册
export function registe(formRegister) {
  let data = qs.stringify({
    username:formRegister.username,
    password:formRegister.password,
    mail:formRegister.email,
    code:formRegister.code
  })
  return instance.post('/user/registe',data)
}

// 获取用户信息
export function getUserInfo(username) {
  return instance.get(`/user/getUserInfo?token=${username}`)
}

// 修改头像updateAvatar
export function updateAvatar(updateData) {
  let data = qs.stringify({
    token:updateData.username,
    avatar:updateData.avatar
  })
  return instance.post('/user/updateAvatar',data)
}

// 用户评论
export function leaveMessages(message) {
  let data = qs.stringify({
    token:message.username,
    articleId:message.articleId,
    messageContent:message.messageContent
  })
  return instance.post('/article/message',data)
}

// 用户回复
export function leaveReply(reply) {
  let data = qs.stringify({
    token:reply.username,
    messageId:reply.messageId,
    replyContent:reply.replyContent
  })
  return instance.post('/article/reply',data)
}

// 用户点赞 
export function articleLike(articleId) {
  let data = qs.stringify({
    articleId:articleId,
  })
  return instance.post('/article/like',data)
}