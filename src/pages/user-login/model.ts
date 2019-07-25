import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';
import { getCaptcha, userLogin } from '@/services';
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
            let data = {
                phone: payload.mobile,
                verifyCode: payload.captcha
            }
            let response = yield call(userLogin, data);
            let _response = {
                status: response.status,
                type: 'mobile',
                userId: response.id,
                message: response.message,
            }
            yield put({
                type: 'changeLoginStatus',
                payload: _response,
            });
            // 登录成功页面跳转
            if (response.status === 200) {
                yield put(routerRedux.replace('/'));
            }
        },

        // 点击发送验证码
        *getCaptcha({ payload }, { call }) {
            yield call(getCaptcha, payload);
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            // 将userId放在cookie里面，设置过期时间为五天
            setCookie('userId', payload.userId, 5);
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            };
        },
    },
};

export default Model;
