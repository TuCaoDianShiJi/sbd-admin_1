import { queryCurrent, query as queryUsers } from '@/services/user';
import { routerRedux } from 'dva/router';
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

        *fetchCurrent(_, { call, put }) {
            const response = yield call(queryCurrent);
            let Authority = getCookie('Authority');
            if(Authority !== 'admin'){
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
