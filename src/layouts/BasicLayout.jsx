
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Icon } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { isAntDesignPro } from '@/utils/utils';
import logo from '../assets/Gitlab_white.png';
import { getCookie } from '../utils/cookies';

const menuDataRender = menuList =>
    menuList.map(item => {
        const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
        return Authorized.check(item.authority, localItem, null);
    });

const footerRender = (_, defaultDom) => {

    return (
        <>
            <div style={{textAlign: 'center', color: '#888'}}>
            Copyright <Icon type="copyright" size='18'/> www.g4b.cn All Rights Reserved
            <p>广州网融信息技术有限公司</p>
            </div>
        </>
    );
};

const BasicLayout = props => {
    const { dispatch, children, settings } = props;

    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'user/fetchCurrent',
            });
            dispatch({
                type: 'settings/getSetting',
            });
        }
    }, []);

    const handleMenuCollapse = payload =>
        dispatch &&
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload,
        });

    return (
        <ProLayout logo={logo}
            onCollapse={handleMenuCollapse}
            menuItemRender={(menuItemProps, defaultDom) => {
                if (menuItemProps.isUrl) {
                    return defaultDom;
                }

                return <Link to={menuItemProps.path}>{defaultDom}</Link>;
            }}
            breadcrumbRender={(routers = []) => [
                {
                    path: '/',
                    breadcrumbName: formatMessage({
                        id: 'menu.home',
                        defaultMessage: 'Home',
                    }),
                },
                ...routers,
            ]}
            itemRender={(route, params, routes, paths) => {
                const first = routes.indexOf(route) === 0;
                return first ? (
                    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                ) : (
                        <span>{route.breadcrumbName}</span>
                    );
            }}
            footerRender={footerRender}
            menuDataRender={menuDataRender}
            formatMessage={formatMessage}
            rightContentRender={rightProps => <RightContent {...rightProps} />}
            {...props}
            {...settings}
        >
            {children}
        </ProLayout>
    );
};

export default connect(({ global, settings }) => ({
    collapsed: global.collapsed,
    settings,
}))(BasicLayout);
