// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
    // 支持值为 Object 和 Array
    'GET /api/currentUser': {
        name: '吐槽电视机',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
    },
    'POST /api/login/account': (req, res) => {
        const { password, userName, type } = req.body;
        if (password === 'admin' && userName === 'admin') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'admin',
            });
            return;
        }

        if (password === 'admin' && userName === 'user') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'user',
            });
            return;
        }

        res.send({
            status: 'error',
            type,
            currentAuthority: 'guest',
        });
    },
    'POST /api/register': (req, res) => {
        res.send({
            status: 'ok',
            currentAuthority: 'user',
        });
    },
    'GET /api/500': (req, res) => {
        res.status(500).send({
            timestamp: 1513932555104,
            status: 500,
            error: 'error',
            message: 'error',
            path: '/base/category/list',
        });
    },
    'GET /api/404': (req, res) => {
        res.status(404).send({
            timestamp: 1513932643431,
            status: 404,
            error: 'Not Found',
            message: 'No message available',
            path: '/base/category/list/2121212',
        });
    },
    'GET /api/403': (req, res) => {
        res.status(403).send({
            timestamp: 1513932555104,
            status: 403,
            error: 'Unauthorized',
            message: 'Unauthorized',
            path: '/base/category/list',
        });
    },
    'GET /api/401': (req, res) => {
        res.status(401).send({
            timestamp: 1513932555104,
            status: 401,
            error: 'Unauthorized',
            message: 'Unauthorized',
            path: '/base/category/list',
        });
    },
};
