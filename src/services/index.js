import request from '@/utils/request';

const path = '';

// 获取短信验证码
export async function getCaptcha(mobile){
    return request(`${path}/getCaptcha?mobile=${mobile}`)
}

// 手机号验证码登录
export async function userLogin(params){
    return request(`${path}/managerlogin/login`, {
        method: 'POST',
        data: params,
    })
}

// 获取用户基本信息
export async function getUserInfo(params){
    return request(`${path}/manager/getUser`)
}