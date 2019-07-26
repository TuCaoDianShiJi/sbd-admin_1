import { getCustomerList } from '@/services';

const Model = {
    namespace: 'customer',
    state: {},
    effects: {
        // 获取列表
        *getList({payload}, { call, put }){
            let response = yield call(getCustomerList, payload )
            response.data.map(item=> item.key = item.id)
            yield put({
                type: 'setList',
                payload: {
                    list: response.data,
                    total: response.total
                }
            })
        },
    },
    reducers: {
        setList({ state }, { payload }){
            return payload
        }
    }
}

export default Model;