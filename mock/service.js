import Mock from 'mockjs';

const Random = Mock.Random;

Random.cname();
Random.city(true);
Random.date();

export default {
    'POST /service/getlist': Mock.mock({
        'data|50': [{
            'id|+1': 1,
            'name': '@cname',
            'gender|0-1': 1,
            'department|1': ['客服部', '市场部', '技术部'],
            'position|1': ['驻场客服', '网络客服'],
            'focuson|1': ['创业专项', '公积金开户', '工商注册'],
            'wechat': /^1[385][1-9]\d{8}/,
        }]
    })
}