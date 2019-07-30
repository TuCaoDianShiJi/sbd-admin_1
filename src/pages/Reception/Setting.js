import React, { Component } from 'react';
import { Table, Button, Divider, Icon, Modal, Form, Input, Checkbox, Select, Cascader, Tooltip, Spin, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from '../../utils/request';
import { getAllocateGroupList, getCustServiceAll, addAllocateGroup, delAllocateGrop, upAllocateGroup } from '@/services';
import getTimeSetting from '@/utils/getTimeSetting';

import styles from './setting.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
let toolTip = `1.优先归属人:客户有归属人时,分配给归属人接待;
2.优先上次接待人:客户有上次接待人时,分配给上次接待人优先接待;
3.按空闲率分配:将客户分配给当前空闲率最高的 客服空闲率=(接待上限-当前接待客户数)/接待上限 例：员工A当前接待2人，上限5人，空闲率=(5-2)/5=60%;
4.按客户接待数分配:将客户分配给当前接待数最少的员工;
5.轮流分分配:将客户轮流分配给员工`

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
            groupList: [],                          // 分组列表
            showModalForm: false,                   // 是否显示modal弹框
            serviceAllOptions: [],                  
            formSubmitLoading: false,                // modal加载状态
            total: '',                               // 总条数
            page: 1,                                 // 当前页
            limit: 10,                               // 分页长度
            groupContainer: {},
            showTableLoding: false                  // 表格加载状态                    
        };
    }

    componentDidMount() {
        this.getList();
        
    }

    // 获取所有员工列表(只有id和name)
    getServiceAll = async () => {
        let _that = this;
        let res = await getCustServiceAll();
        let list = [];
        if(res.status === 200){
            res.data.map(item=>{
                list.push({ label: item.name, value: item.id })
            })
            _that.setState({
                serviceAllOptions: list
            })
        }
    }

    // 获取分组列表
    getList = async () => {
        const _that = this;
        const { page, limit } = _that.state;
        let data = { page, limit };
        let res = await getAllocateGroupList(data);
        _that.setState({ showTableLoding: true })
        if(res.status === 200){
            res.data.map(item => item.key = item.id);
            _that.setState({
                groupList: res.data,
                total: res.total,
                showTableLoding: false
            })
        }
    }

    // 编辑按钮
    onEditItem(item) {
        let _list = [];
        item.cust_id_name.map(i=>_list.push(parseInt(i.id)))
        let data = {
            id: item.id,
            group_name: item.cust_group,
            receiver: _list,
            allocate_object: item.dist_user,
            allocate_order: JSON.parse(item.dist_order),
            timeout: item.overtime_reminder,
            again_allocate: item.redistribution,
            marked_words: item.user_tips
        }
        this.getServiceAll();
        this.setState({
            groupContainer: data,
            showModalForm: true
        })
    }

    // 删除按钮
    onDeletItem(item) {
        let _that = this;
        Modal.confirm({
            title: `确定删除 ${item.cust_group} 分组吗？`,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: ()=>_that.DelAllocateGrop(item.id)
        });
    }

    // 新建分组按钮
    addGroup() {
        this.getServiceAll();
        this.setState({
            showModalForm: true,
        });
    }

    // 新增分组 
    AddAllocateGroup = async(params) => {
        let res = await addAllocateGroup(params);
        const _that = this;
        if(res.status === 200){
            message.success('新增分组成功')
            _that.setState({
                formSubmitLoading: false,
            })
            _that.closeFormModal();
            this.getList();
        }
    }

    // 编辑分组
    UpAllocateGroup = async(params)=>{
        let res = await upAllocateGroup(params);
        const _that = this;
        if(res.status === 200){
            message.success('更新分组成功')
            _that.setState({
                formSubmitLoading: false,
            })
            _that.closeFormModal();
            this.getList();
        }
    }

    // 删除分组
    DelAllocateGrop = async (id) =>{
        let res = await delAllocateGrop(id);
        if(res.status === 200){
            message.success("删除分组成功");
            this.getList();
        }
    }

    // 提交新建会话分组表单
    handleSubmit = e => {
        e.preventDefault();
        const _that = this;
        let { groupContainer } = _that.state;
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                _that.setState({ formSubmitLoading: true })
                if(groupContainer.id){
                    values.id = groupContainer.id;
                    _that.UpAllocateGroup(values);
                }else{
                    _that.AddAllocateGroup(values)
                }
            }
        });
    };

    // 关闭新增分组弹框Modal
    closeFormModal(){
        this.props.form.resetFields();
        this.setState({
            showModalForm: false,
            groupContainer: {}
        })
    }

    // 切换分页数
    onPageChange = (page, pageSize)=>{
        this.setState({
            page: page,
            limit: pageSize
        }, ()=>this.getList())
    }

    // 分页分页长度
    onShowSizeChange = (current, size)=>{
        this.setState({
            page: current,
            limit: size
        }, ()=>this.getList())
    }

    render() {
        const { groupList, showModalForm, serviceAllOptions, formSubmitLoading, total, groupContainer, showTableLoding } = this.state;
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '分组名称',
                dataIndex: 'cust_group',
                key: 'cust_group',
                align: 'center',
                width: 120,
                render: id => <span>{id}</span>,
            },
            {
                title: '接待人',
                dataIndex: 'cust_id_name',
                key: 'cust_id_name',
                align: 'center',
                width: 150,
                render: cust_id_name =>{
                    let _list = [];
                    if(cust_id_name.length < 4){
                        cust_id_name.map(item=>_list.push(item.name));
                        let a = _list.join('，');
                        return <span>{a}</span>
                    }
                    cust_id_name.map((item, index)=>{
                        if(index<3) _list.push(item.name);
                    });
                    let a = _list.join('，');
                    return <span>{a}...等{cust_id_name.length}人</span>
                    
                },
            },
            {
                title: '分配规则',
                dataIndex: 'dist_order',
                key: 'dist_order',
                align: 'center',
                width: 200,
                render: dist_order => {
                    let a = JSON.parse(dist_order);
                    let b = a.join('>');
                    return b
                },
            },
            {
                title: '超时提醒及重新分配',
                key: 'remind',
                align: 'center',
                width: 150,
                render: text=>{
                    let a = '-', b = '-';
                    if(text.overtime_reminder){
                        a = `超时提醒：${getTimeSetting(text.overtime_reminder)}`;
                    }
                    if(text.redistribution){
                        b = `重新分配：${getTimeSetting(text.redistribution)}`;
                    }
                    return <span>{a}<br/>{b}</span>
                }
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                width: 200,
                render: (text, record) => (
                    <span>
                        <a onClick={this.onEditItem.bind(this, record)}><Icon type="edit" /> 编辑</a>
                        <Divider type="vertical" />
                        <a onClick={this.onDeletItem.bind(this, record)}><Icon type="delete" /> 删除</a>
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
                    <Button type="primary" icon="plus" onClick={this.addGroup.bind(this)}> 新建分组</Button>
                </div>
                <Table bordered columns={columns} dataSource={groupList} 
                    loading={showTableLoding}
                    pagination={{
                        total: total,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '15', '20'],
                        showTotal:total=>`共找到 ${total} 条数据`,
                        onChange:this.onPageChange.bind(this),
                        onShowSizeChange: this.onShowSizeChange.bind(this)
                    }}
                />
                <Modal maskClosable={false}
                    visible={showModalForm}
                    title="新增分组"
                    footer={null}
                    width={720}
                    onCancel={this.closeFormModal.bind(this)}
                >
                    <Spin spinning={formSubmitLoading}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item label="分组名称" style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('group_name', {
                                initialValue: groupContainer.group_name || '',
                                rules: [{ required: true, message: '请填写分组名称' }],
                            })(<Input placeholder="请填写分组名称" />)}
                        </Form.Item>
                        <Form.Item label="接待人" style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('receiver', {
                                initialValue: groupContainer.receiver || [],
                                rules: [{ required: true, message: '请选择接待人' }],
                            })(<CheckboxGroup options={serviceAllOptions} />)}
                        </Form.Item>
                        <Form.Item label="分配对象" style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('allocate_object', {
                                initialValue: '移动端在线的员工',
                            })(
                                <Select>
                                    <Option value="移动端在线的员工">移动端在线的员工</Option>
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="分配顺序" style={{ marginBottom: '10px' }}
                            extra="优先级从前往后(如果前面的条件不存在，会自动执行后面的条件)"
                        >
                            {getFieldDecorator('allocate_order', {
                                initialValue: groupContainer.allocate_order || ['轮流分配'],
                            })(<Cascader options={orderOptions} style={{width: '380px', marginRight: '15px'}}/>
                            )}
                            <Tooltip title={toolTip}>
                                <Icon type="question-circle" style={{fontSize: '18px'}}/>
                            </Tooltip>
                        </Form.Item>
                        <Form.Item label="超时提醒" style={{ marginBottom: '10px' }}>
                            超过 {getFieldDecorator('timeout', {
                                initialValue: groupContainer.timeout || 0,
                            })(
                                <Select style={{ width: '95px' }}>
                                    <Option value={0}>不设置</Option>
                                    <Option value={30}>30秒</Option>
                                    <Option value={60}>1分钟</Option>
                                    <Option value={90}>1分30秒</Option>
                                    <Option value={120}>2分钟</Option>
                                    <Option value={150}>2分30秒</Option>
                                    <Option value={180}>3分钟</Option>
                                </Select>
                            )} 接待人员未回复，发送超时提醒
                        </Form.Item>
                        <Form.Item label="重新分配" style={{ marginBottom: '10px' }}>
                            超过 {getFieldDecorator('again_allocate', {
                                initialValue: groupContainer.again_allocate || 0,
                            })(<Select style={{ width: '95px' }}>
                                    <Option value={0}>不设置</Option>
                                    <Option value={30}>30秒</Option>
                                    <Option value={60}>1分钟</Option>
                                    <Option value={90}>1分30秒</Option>
                                    <Option value={120}>2分钟</Option>
                                    <Option value={150}>2分30秒</Option>
                                    <Option value={180}>3分钟</Option>
                                </Select>
                            )} 接待人员未回复，按空闲率进行重新分配
                        </Form.Item>
                        <Form.Item label="客服提示语" style={{ marginBottom: '10px' }}>
                            {getFieldDecorator('marked_words', {
                                initialValue: groupContainer.marked_words || '客服正忙，推荐您联系转接客服，感谢理解！'
                            })(<Input />
                            )}
                        </Form.Item>
                        <div className={styles.btnContent}>
                            <Button className={styles.btn} onClick={this.closeFormModal.bind(this)}>取消</Button>
                            <Button type="primary" htmlType="submit" className={styles.btn}>提交</Button>
                        </div>
                    </Form>
                    </Spin>
                </Modal>
            </PageHeaderWrapper>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Index);

export default WrappedRegistrationForm;
