import Mock from 'mockjs';

const Random = Mock.Random;

Random.cname();
Random.city(true);
Random.date();

export default {
    'POST /customer/getlist': Mock.mock({
        'data|50': [{
            'id|+1': 1,
            'name': '@cname',
            'adress': '@city(true)',
            'belong': '@cname',
            'recently': '@date'
        }]
    })
}