import request from '@/utils/request';

const path = 'http://192.168.3.23:8089';

// 手机号验证码登录
export async function userLogin(params){
    return request(`${path}/managerlogin/login`, {
        method: 'POST',
        data: params,
    })
}