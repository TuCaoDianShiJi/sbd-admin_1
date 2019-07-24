import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
    InputNumber,
    Button,
    Select,
    Table,
    Divider,
    Icon,
    Row,
    Col,
    Modal,
    Form,
    Checkbox,
} from 'antd';
import request from '../../utils/request';
import img1 from '../../assets/allocate_01.png';
import img2 from '../../assets/allocate_02.png';
import img3 from '../../assets/allocate_03.png';
import img4 from '../../assets/allocate_04.png';
import styles from './allocate.less';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const timeList = [
    '3分钟',
    '5分钟',
    '10分钟',
    '20分钟',
    '30分钟',
    '1小时',
    '2小时',
    '3小时',
    '6小时',
    '12小时',
];
const checkList = ['张波', '王玉龙', '欧宜', '袁佳伟'];

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
            showModalForm1: false,
        };
    }

    componentDidMount() {
        this.getGroupList();
    }

    // 获取分组列表
    getGroupList() {
        const _that = this;
        request('/reception/groupList')
            .then(res => {
                res.data.map(item => (item.key = item.id));
                _that.setState({
                    groupList: res.data,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    // 个别员工设置上限按钮
    onUpperLimit() {
        this.setState({
            showModalForm1: true,
        });
    }

    // 修改上限提交按钮
    onUpperSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { groupList, showModalForm1 } = this.state;
        const columns = [
            {
                title: '分组名称',
                dataIndex: 'group_name',
                key: 'group_name',
                align: 'center',
                width: 100,
                render: name => <span>{name}</span>,
            },
            {
                title: '分配规则',
                dataIndex: 'rule',
                key: 'rule',
                align: 'center',
                width: 120,
                render: name => <span>{name}</span>,
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                width: 100,
                render: (text, record) => (
                    <span>
                        <a>
                            <Icon type="edit" /> 编辑
            </a>
                        {/* <Divider type="vertical" />
                      <a><Icon type="delete" /> 删除</a> */}
                    </span>
                ),
            },
        ];
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <PageHeaderWrapper>
                <div className={styles.allocate}>
                    <Row className={styles.content001}>
                        <Col xs={0} sm={8} md={8} lg={8} xl={4} className={styles.left}>
                            <img src={img1} alt="" />
                        </Col>
                        <Col xs={24} sm={16} md={12} lg={14} xl={18}>
                            <h3>接待上限</h3>
                            <p>客户来访时，单个员工可同时接待的客户数量上限(也可以对个别员工调整上限)</p>
                            <h4>
                                每位员工接待上限 <InputNumber min={1} max={50} defaultValue={5} /> 人{' '}
                            </h4>
                            <h4>
                                个别员工接待上限{' '}
                                <Button size="small" type="primary" onClick={this.onUpperLimit.bind(this)}>
                                    添加
                </Button>
                            </h4>
                        </Col>
                    </Row>
                    <Row className={styles.content001}>
                        <Col xs={0} sm={8} md={8} lg={8} xl={4} className={styles.left}>
                            <img src={img2} alt="" />
                        </Col>
                        <Col xs={24} sm={16} md={12} lg={14} xl={18}>
                            <h3>满负荷分配</h3>
                            <p>指定的整组或单个员工关闭接待/离线/达到接待上限时，对不同来源客户的分配方式</p>
                            <h4>QQ企业主号/网页接待/微信公众号/微信小程序来源的客户</h4>
                            <Select defaultValue="分配给紧急接待人" style={{ width: '300px' }}>
                                <Option value="分配给紧急接待人">分配给紧急接待人</Option>
                                <Option value="接待分配组内随机分配">接待分配组内随机分配</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className={styles.content001}>
                        <Col xs={0} sm={8} md={8} lg={8} xl={4} className={styles.left}>
                            <img src={img3} alt="" />
                        </Col>
                        <Col xs={24} sm={16} md={12} lg={14} xl={18}>
                            <div>
                                <h3>超时设置</h3>
                                <p>超时提醒、超时重新分配及超时结束会话规则</p>
                                {/* <h4>分组设置 <Button type='primary' size='small'>添加</Button></h4> */}
                                <Table bordered columns={columns} dataSource={groupList}></Table>
                            </div>
                        </Col>
                    </Row>
                    <Row className={styles.content001}>
                        <Col xs={0} sm={8} md={8} lg={8} xl={4} className={styles.left}>
                            <img src={img4} alt="" />
                        </Col>
                        <Col xs={24} sm={16} md={12} lg={14} xl={18}>
                            <h3>超时结束会话</h3>
                            <h4>
                                超过{' '}
                                <Select defaultValue="3分钟" style={{ width: '100px' }}>
                                    {timeList.map((item, index) => (
                                        <Option value={item} key={index}>
                                            {item}
                                        </Option>
                                    ))}
                                </Select>{' '}
                                客户或接待员工未发送消息，则自动结束会话
              </h4>
                            <p>每次修改设置，将在第二天零点生效，同时影响所有统计报表的会话统计数量</p>
                        </Col>
                    </Row>
                    <Modal
                        visible={showModalForm1}
                        title="修改上限"
                        onCancel={() => this.setState({ showModalForm1: false })}
                        footer={null}
                    >
                        <Form {...formItemLayout} onSubmit={this.onUpperSubmit}>
                            <Form.Item label="选择员工">
                                {getFieldDecorator('name_list', {
                                    rules: [{ required: true, message: '请选择员工' }],
                                })(<CheckboxGroup options={checkList} />)}
                            </Form.Item>
                            <Form.Item label="设置上限">
                                {getFieldDecorator('limit', {
                                    rules: [{ required: true, message: '请设置上限' }],
                                })(
                                    <div>
                                        <InputNumber /> 人
                  </div>,
                                )}
                            </Form.Item>
                            <div className={styles.btnContent}>
                                <Button className={styles.btn}
                                    onClick={_ => this.setState({ showModalForm1: false })}
                                >取消</Button>
                                <Button type="primary" htmlType="submit" className={styles.btn}>设置</Button>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </PageHeaderWrapper>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Index);

export default WrappedRegistrationForm;
