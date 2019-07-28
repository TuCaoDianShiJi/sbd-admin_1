export default {
    'POST /service/getlist': (req, res)=>{
        res.send({
            status: 200,
            message: 'success',
            total: 2,
            data: [
                {
                    id: '001',
                    account: 'wangrong001',
                    password: '123456',
                    name: '王玉龙',
                    gender: 1,
                    phone: 13012345678,
                    email: '',
                    department: '客服部',
                    position: '一般员工',
                    wechat: 'wechat001',
                    nickname: '昵称1',
                    attention: ['商标注册', '版权登记', '专利申请']
                },
                {
                    id: '002',
                    account: 'wangrong002',
                    password: '123456',
                    name: '欧易',
                    gender: 1,
                    phone: 13012345678,
                    email: '',
                    department: '客服部',
                    position: '部门主管',
                    wechat: 'wechat002',
                    nickname: '昵称2',
                    attention: ['商标注册', '版权登记', '专利申请']
                }
            ]
        })
    }
}