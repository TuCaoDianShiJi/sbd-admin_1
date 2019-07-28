// 客户列表 
export default {
    'POST /customer/getlist': (req, res)=>{
        res.send({
            status: 200,
            message: 'success',
            total: 2,
            data: [
                {
                    id: '001',
                    name: '张无忌',
                    address: '湖北武汉',
                    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                    belong: '王玉龙',
                    recently: '2019-07-28 12:22',
                    source: '全电易'
                },
                {
                    id: '002',
                    name: '杨过',
                    address: '广东深圳',
                    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                    belong: '欧宜',
                    recently: '2019-07-28 12:22',
                    source: '企业商城'
                }
            ]
        })
    }
}