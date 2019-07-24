import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, Select, Table } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from '../../utils/request';

const { Option } = Select;
const columns = [
    { title: '序号', dataIndex: 'id', key: 'id', align: 'center', width: 80,
        render: id=>(<span>{id}</span>)
    },
    { title: '姓名', dataIndex: 'name', key: 'name', align: 'center', width: 120,
        render: name=>(<span>{name}</span>)
    },
    { title: '所在地区', dataIndex: 'adress', key: 'adress', align: 'center', width: 200,
        render: text=>(<span>{text}</span>)
    },
    { title: '归属人', dataIndex: 'belong', key: 'belong', align: 'center', width: 120,
        render: text=>(<span>{text}</span>)
    },
    { title: '最近接待', dataIndex: 'recently', key: 'recently', align: 'center', width: 200,
        render: text=>(<span>{text}</span>)
    },
]
class Index extends Component{

    constructor(props){
        super(props);
        this.state = {
            customerList: []
        }
    }

    componentDidMount(){
        const _that = this;
        request('/customer/getlist', { method: 'POST' })
        .then( res=>{
            console.log(res)
            res.data.map(item=>{
                item.key = item.id
            })
            _that.setState({
                customerList: res.data
            })
        })
        .catch( err=>{
            console.log(err)
        })
    }

    // 表单查询
    handleSubmit = e=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
        });
    }

    // 归属人选择
    onBelongChange(value){
        console.log(value)
    }
    
    // 分页页码切换
    onPageChange(page, pageSize){
        console.log(page, pageSize)
    }

    // 分页长度页面
    onShowSizeChange(current, size){
        console.log(current, size)
    }

    render(){
        const { customerList } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                md: { span: 8 },
                lg: { span: 7 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
                md: { span: 14 },
                lg: { span: 15}
            },
        };
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return(
            <PageHeaderWrapper>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xs={20} sm={11} md={10} lg={9} xl={6}>
                            <Form.Item label="客户姓名">
                            {getFieldDecorator('name', {
                                rules: [
                                {
                                    required: true,
                                    message: '请输入客户姓名',
                                },
                                ],
                            })(<Input placeholder='请输入客户姓名'/>)}
                            </Form.Item>
                        </Col>
                        <Col xs={20} sm={11} md={10} lg={9} xl={6}>
                            <Form.Item label="客户归属人" name='belong'>
                                <Select defaultValue='全部' onChange={this.onBelongChange.bind(this)}>
                                    <Option value="全部">全部</Option>
                                    <Option value="张波">张波</Option>
                                    <Option value="欧宜">欧宜</Option>
                                    <Option value="王玉龙">王玉龙</Option>
                                    <Option value="袁佳伟">袁佳伟</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={20} sm={11} md={4} lg={2} xl={2}>
                            <Form.Item>
                                <Button type='primary' htmlType="submit" icon="search">查询</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Table bordered columns={columns} dataSource={customerList}
                    rowSelection={rowSelection}
                    pagination={{
                        total: 50,
                        showSizeChanger: true,
                        onChange:this.onPageChange.bind(this),
                        pageSizeOptions: ['10', '15', '20'],
                        onShowSizeChange: this.onShowSizeChange.bind(this)
                    }}
                />
            </PageHeaderWrapper>
        )
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Index);

export default WrappedRegistrationForm;