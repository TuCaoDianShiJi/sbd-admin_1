import { queryCurrent, query as queryUsers } from '@/services/user';
import { routerRedux } from 'dva/router';
import { getUserInfo } from '@/services';
import { getCookie } from '@/utils/cookies';
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
            const response = yield call(getUserInfo);
            if(response.status !== 200){
                yield put(routerRedux.replace('/user/login'));
                return;
            }

            yield put({
                type: 'saveCurrentUser',
                payload: response,
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
