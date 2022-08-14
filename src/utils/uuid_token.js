import { v4 as uuidv4 } from 'uuid';
// 生成一个随机字符串，每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  // 先看本地存储是否有uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 没有则生成一个uuid
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem('UUIDTOKEN', uuid_token);
  }
  return uuid_token;
}