import React, { Component } from 'react';
import { Table, Button, Divider, Icon, Modal, Form, Input, Checkbox, Select, Cascader, Tooltip } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from '../../utils/request';

import styles from './setting.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
let toolTip = `1、优先归属人：客户有归属人时，分配给归属人接待。/n        2、优先上次接待人：客户有上次接待人时，分配给上次接待人优先接待。
3、按空闲率分配：将客户分配给当前空闲率最高的客服
                          空闲率=（接待上限-当前接待客户数）/ 接待上限
                          例：员工A当前接待2人，上限5人，空闲率=（5-2）/ 5=60%
4、按客户接待数分配：将客户分配给当前接待数最少的员工
5、轮流分分配：将客户轮流分配给员工`

const plainOptions = ['张波', '王玉龙', '欧宜', '袁佳伟'];
const orderOptions = [
    { 
        value: '优先归属人',
        label: '优先归属人',
        children: [
            {
                value: '优先上次接待人',
                label: '优先上次接待人',
                children: [
                    { value: '按空闲率分配', label: '按空闲率分配' },
                    { value: '按接待数分配', label: '按接待数分配' },
                    { value: '轮流分配', label: '轮流分配' },
                ]
            },
            { value: '按空闲率分配', label: '按空闲率分配' },
            { value: '按接待数分配', label: '按接待数分配' },
            { value: '轮流分配', label: '轮流分配' },
        ]
    },
    { 
        value: '优先上次接待人',
        label: '优先上次接待人',
        children: [
            {
                value: '优先归属人',
                label: '优先归属人',
                children: [
                    { value: '按空闲率分配', label: '按空闲率分配' },
                    { value: '按接待数分配', label: '按接待数分配' },
                    { value: '轮流分配', label: '轮流分配' },
                ]
            },
            { value: '按空闲率分配', label: '按空闲率分配' },
            { value: '按接待数分配', label: '按接待数分配' },
            { value: '轮流分配', label: '轮流分配' },
        ]
    },
    { value: '按空闲率分配', label: '按空闲率分配' },
    { value: '按接待数分配', label: '按接待数分配' },
    { value: '轮流分配', label: '轮流分配' },
]

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            showModalForm: false,
        };
    }

    componentDidMount() {
        this.getList();
    }

    // 获取分组列表
    getList() {
        const _that = this;
        request('/reception/list')
            .then(res => {
                res.data.map(item => (item.key = item.id));
                _that.setState({
                    dataList: res.data,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    // 编辑按钮
    onEditItem(item) {
        console.log(item);
    }

    // 删除按钮
    onDeletItem(item) {
        console.log(item);
        Modal.confirm({
            title: `确定删除 ${item.group_name} 分组吗？`,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
        });
    }

    // 新建分组按钮
    addGroup() {
        this.setState({
            showModalForm: true,
        });
    }

    // 提交表单
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { dataList, showModalForm } = this.state;
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '分组名称',
                dataIndex: 'group_name',
                key: 'group_name',
                align: 'center',
                width: 120,
                render: id => <span>{id}</span>,
            },
            {
                title: '接待人',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                width: 100,
                render: name => <span>{name}</span>,
            },
            {
                title: '组内分配规则',
                dataIndex: 'rule',
                key: 'rule',
                align: 'center',
                width: 150,
                render: text => <span>{text}</span>,
            },
            {
                title: '超时提醒及重新分配',
                dataIndex: 'remind',
                key: 'remind',
                align: 'center',
                width: 200,
                render: text => <span>{text}</span>,
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                width: 200,
                render: (text, record) => (
                    <span>
                        <a onClick={this.onEditItem.bind(this, record)}>
                            <Icon type="edit" /> 编辑
            </a>
                        <Divider type="vertical" />
                        <a onClick={this.onDeletItem.bind(this, record)}>
                            <Icon type="delete" /> 删除
            </a>
                    </span>
                ),
            },
        ];
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
                md: { span: 16 }
            },
        };
        return (
            <PageHeaderWrapper>
                <div className={styles.receptionSetting}>
                    <Button type="primary" icon="plus" onClick={this.addGroup.bind(this)}>
                        新建分组
          </Button>
                </div>
                <Table bordered columns={columns} dataSource={dataList} />
                <Modal
                    visible={showModalForm}
                    title="新增分组"
                    footer={null}
                    width={720}
                    onCancel={() => this.setState({ showModalForm: false })}
                >
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="分组名称" style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('group_name', {
                                rules: [{ required: true, message: '请填写分组名称' }],
                            })(<Input placeholder="请填写分组名称" />)}
                        </Form.Item>
                        <Form.Item label="接待人" style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('receiver', {
                                rules: [{ required: true, message: '请选择接待人' }],
                            })(<CheckboxGroup options={plainOptions} />)}
                        </Form.Item>
                        <Form.Item label="分配对象" style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('allocate_object', {
                                initialValue: 'PC端或移动端在线的员工',
                            })(
                                <Select>
                                    <Option value="PC端或移动端在线的员工">PC端或移动端在线的员工</Option>
                                    <Option value="仅PC端在线的员工">仅PC端在线的员工</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="分配顺序" style={{ marginBottom: '10px' }}
                            extra="优先级从前往后(如果前面的条件不存在，会自动执行后面的条件)"
                        >
                            {getFieldDecorator('allocate_order', {
                                initialValue: ['轮流分配']
                            })(<Cascader options={orderOptions} style={{width: '380px', marginRight: '15px'}}/>
                            )}
                            <Tooltip title={toolTip}>
                                <Icon type="question-circle" style={{fontSize: '18px'}}/>
                            </Tooltip>
                        </Form.Item>
                        <Form.Item label="超时提醒" style={{ marginBottom: '10px' }}>
                            超过 {getFieldDecorator('timeout', {
                                initialValue: '',
                            })(
                                <Select style={{ width: '95px' }}>
                                    <Option value="">不设置</Option>
                                    <Option value="30秒">30秒</Option>
                                    <Option value="1分钟">1分钟</Option>
                                    <Option value="1分30秒">1分30秒</Option>
                                    <Option value="2分钟">2分钟</Option>
                                    <Option value="2分20秒">2分20秒</Option>
                                    <Option value="3分钟">3分钟</Option>
                                </Select>
                            )} 接待人员未回复，发送超时提醒
                        </Form.Item>
                        <Form.Item label="重新分配" style={{ marginBottom: '10px' }}>
                            超过 {getFieldDecorator('again_allocate', {
                                initialValue: '',
                            })(<Select style={{ width: '95px' }}>
                                    <Option value="">不设置</Option>
                                    <Option value="30秒">30秒</Option>
                                    <Option value="1分钟">1分钟</Option>
                                    <Option value="1分30秒">1分30秒</Option>
                                    <Option value="2分钟">2分钟</Option>
                                    <Option value="2分20秒">2分20秒</Option>
                                    <Option value="3分钟">3分钟</Option>
                                </Select>
                            )} 接待人员未回复，按空闲率进行重新分配
                        </Form.Item>
                        <div className={styles.btnContent}>
                            <Button type="primary" htmlType="submit">
                                提交
              </Button>
                        </div>
                    </Form>
                </Modal>
            </PageHeaderWrapper>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Index);

export default WrappedRegistrationForm;
