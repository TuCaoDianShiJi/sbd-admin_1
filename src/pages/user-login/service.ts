import request from '@/utils/request';
import { FromDataType } from './index';

export async function fakeAccountLogin(params: FromDataType) {
    return request('/api/login/account', {
        method: 'POST',
        data: params,
    });
}

// 获取短信验证码
export async function getFakeCaptcha(mobile: string) {
    return request(`/api/login/captcha?mobile=${mobile}`);
}

// 用户登录
export async function userLogin(params: FromDataType){
    // return request('/api/user/login', {
    //     method: 'POST',
    //     data: params,
    // })
    return request('http://192.168.3.23:8089/managerlogin/login', {
        method: 'POST',
        data: params,
    })
}
