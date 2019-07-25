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
    },
    'POST /managerlogin/login': (req, res)=>{
        const { phone, verifyCode } = req.body;
        if(phone === '13012345678' && verifyCode === '123456'){
            res.send({
                status: 200,
                message: '登录成功',
                id: 'adadada132d',
            })
            return;
        }

        res.send({
            status: 'error',
            message: '用户名或密码错误',
        })
    },
    'GET /manager/getUser': (req, res)=>{
        let cookie = req.headers.cookie;
        if( cookie && cookie !== ''){
            res.send({
                status: 200,
                name: '吐槽电视机',
                avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            })
            return
        }
        res.send({
            status: 404,
            message: '用户未登录'
        })
    }
}