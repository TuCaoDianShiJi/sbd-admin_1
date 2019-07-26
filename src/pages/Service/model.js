import { getCustServiceList } from '@/services';

const Model = {
    namespace: 'custservice',
    state: {},
    effects: {
        // 获取列表
        *getList({payload}, { call, put }){
            let response = yield call(getCustServiceList, payload )
            console.log(response);
            // yield put({
            //     type: 'setList',
            //     payload: {
            //         list: response.data,
            //         total: response.total
            //     }
            // })
        },
    },
    reducers: {
        setList({ state }, { payload }){
            return payload
        }
    }
}

export default Model;