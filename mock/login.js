export default {
    'POST /api/user/login': (req, res)=>{
        const { password, userName, type } = req.body;
        console.log(type);
        if(type === 'account'){
            if(userName === 'admin' && password === 'admin'){
                res.send({
                    status: 'ok',
                    currentAuthority: 'admin',
                    user_id: '00000001',
                    name: '吐槽电视机',
                    type,
                    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
                })
                return;
            }
        }

        if(type === 'mobile'){
            res.send({
                status: 'ok',
                currentAuthority: 'admin',
                user_id: '00000001',
                name: '吐槽电视机',
                type,
                avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
            })
            return;
        }

        res.send({
            status: 'error',
            type,
            message: '用户名或密码错误',
            currentAuthority: 'guest'
        })
    }
}