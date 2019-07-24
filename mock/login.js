export default {
    'POST /api/user/login': (req, res)=>{
        const { password, userName } = req.body;
        if(userName === 'admin' && password === 'admin'){
            res.send({
                status: 'ok',
                currentAuthority: 'admin',
                user_id: '00000001',
                name: '吐槽电视机',
                avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
            })
            return;
        }
        res.send({
            status: 'error',
            message: '用户名或密码错误',
            currentAuthority: 'guest'
        })
    }
}