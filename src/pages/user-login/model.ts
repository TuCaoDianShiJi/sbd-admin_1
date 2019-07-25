import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';
import { fakeAccountLogin, getFakeCaptcha, userLogin } from './service';
import { setCookie } from '../../utils/cookies';

export interface StateType {
    status?: 'ok' | 'error';
    type?: string;
    currentAuthority?: 'user' | 'guest' | 'admin';
}

export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
    namespace: string;
    state: StateType;
    effects: {
        login: Effect;
        getCaptcha: Effect;
    };
    reducers: {
        changeLoginStatus: Reducer<StateType>;
    };
}

const Model: ModelType = {
    namespace: 'userLogin',

    state: {
        status: undefined,
    },

    effects: {
        // 用户登录
        *login({ payload }, { call, put }) {
            // const response = yield call(fakeAccountLogin, payload);
            let data = {
                phone: payload.mobile,
                verifyCode: payload.captcha
            }
            const response = yield call(userLogin, data);
            // 根据payload.type判断是短信验证码还是账号密码登录
            // console.log(payload);
            // yield put({
            //     type: 'changeLoginStatus',
            //     payload: response,
            // });
            // Login successfully
            console.log(response);
            return;
            if (response.status === 'ok') {
                // const urlParams = new URL(window.location.href);
                // const params = getPageQuery();
                // let { redirect } = params as { redirect: string };
                // if (redirect) {
                //     const redirectUrlParams = new URL(redirect);
                //     if (redirectUrlParams.origin === urlParams.origin) {
                //         redirect = redirect.substr(urlParams.origin.length);
                //         if (redirect.match(/^\/.*#/)) {
                //             redirect = redirect.substr(redirect.indexOf('#') + 1);
                //         }
                //     } else {
                //         window.location.href = redirect;
                //         return;
                //     }
                // }
                yield put(routerRedux.replace('/'));
            }
        },

        // 点击发送验证码
        *getCaptcha({ payload }, { call }) {
            yield call(getFakeCaptcha, payload);
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setCookie('Authority', payload.currentAuthority, 1);
            console.log(payload);
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            };
        },
    },
};

export default Model;
