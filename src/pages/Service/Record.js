import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Select, Button } from 'antd';

import styles from './record.less';

const serviData = ['张波', '王玉龙', '欧宜', '袁佳伟'];
const customerData = ['杨过', '张无忌', '令狐冲'];
const { Search } = Input;
const { Option } = Select;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviData: [],
            customerData: []
        };
    }

    // 提交查询表单
    onFormSubmit = e=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log(values);
            }
        });
    }

    // 选择员工下拉框改变，然后请求对应客户列表的接口
    onSelectChange = e =>{
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderWrapper>
                <Form layout='inline' onSubmit={this.onFormSubmit.bind(this)}>
                    <Form.Item label='客服姓名'>
                        {getFieldDecorator('service_name',{
                            rules: [{ required: true, message: '请选择员工' }],
                            initialValue: ''
                        })(<Select showSearch style={{width: 200}}
                            onChange={this.onSelectChange.bind(this)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value=''>请选择或输入查询</Option>
                            { serviData.map((item, index)=><Option key={index}>{item}</Option>) }
                        </Select>)}
                    </Form.Item>
                    <Form.Item label='客户姓名'>
                        {getFieldDecorator('customer_name',{
                            rules: [{ required: true, message: '请选择客户' }],
                            initialValue: ''
                        })(<Select showSearch style={{width: 200}}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value=''>请选择或输入查询</Option>
                            { customerData.map((item, index)=><Option key={index}>{item}</Option>) }
                        </Select>)}
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' icon='search' htmlType='submit'>查询记录</Button>
                    </Form.Item>
                </Form>
            </PageHeaderWrapper>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Index);

export default WrappedNormalLoginForm;
