import Mock from 'mockjs';

const Random = Mock.Random;
Random.cname();

export default {
  'GET /reception/list': Mock.mock({
    'data|20': [
      {
        'id|+1': 1,
        name: '@cname',
        'group_name|1': ['网融信息', '黄埔小程序', '全电易'],
        'rule|1': ['优先归属人', '优先上次接待人', '按空闲分配'],
        'remind|1': ['重新分配: 3分0秒', '超时提醒: 1分'] ,
      },
    ],
  }),
  'GET /reception/groupList': Mock.mock({
    'data|5': [
      {
        'id|+1': 1,
        'group_name|1': ['网融信息', '黄埔小程序', '全电易'],
        'rule|1': ['超过3分未回复重新分配', '超过1分未回复提醒'],
      },
    ],
  }),
};
