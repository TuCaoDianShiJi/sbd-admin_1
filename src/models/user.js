import { queryCurrent, query as queryUsers } from '@/services/user';
import { routerRedux } from 'dva/router';
import { getUserInfo } from '@/services';
import { getCookie } from '@/utils/cookies';
import request from '@/utils/request';

const UserModel = {
    namespace: 'user',
    state: {
        currentUser: {},
    },
    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(queryUsers);
            yield put({
                type: 'save',
                payload: response,
            });
        },

        // 获取当前用户基本信息
        *fetchCurrent(_, { call, put }) {
            let userId = getCookie('userId')
            const response = yield call(getUserInfo);
            if(response.status !== 200){
                yield put(routerRedux.replace('/user/login'));
                return;
            }
            // let userInfo = {
            //     name: response.user.usr_name,
            //     avatar: response.user.usr_image_url
            // }
            let userInfo = {
                name: '吐槽电视机',
                avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
            }

            yield put({
                type: 'saveCurrentUser',
                payload: userInfo,
            });
        },
    },
    reducers: {
        // 保存用户信息
        saveCurrentUser(state, action) {
            return { ...state, currentUser: action.payload || {} };
        },

        changeNotifyCount(
            state = {
                currentUser: {},
            },
            action,
        ) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload.totalCount,
                    unreadCount: action.payload.unreadCount,
                },
            };
        },
    },
};
export default UserModel;
