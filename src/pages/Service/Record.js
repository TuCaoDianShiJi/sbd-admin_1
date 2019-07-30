import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Input, Select, Button } from 'antd';
import { getCustServiceAll } from '@/services';

import styles from './record.less';

const { Search } = Input;
const { Option } = Select;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],            // 客服列表
            customerList: []            // 客户列表
        };
    }

    componentDidMount(){
        this.getServiceList();
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

    // 获取所有员工列表id和name
    getServiceList = async () =>{
        let res = await getCustServiceAll();
        let list = [];
        const _that = this;
        if(res.status === 200){
            res.data.map(item=>list.push({ label: item.name, value: item.id }))
            _that.setState({
                serviceList: list
            })
        }
    }

    // 选择员工下拉框改变，然后请求对应客户列表的接口
    onSelectChange = e =>{
        console.log(e)
    }

    render() {
        const { serviceList, customerList } = this.state;
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
                            { serviceList.map((item, index)=><Option key={index} value={item.value}>{item.label}</Option>) }
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
                            { customerList.map((item, index)=><Option key={index}>{item}</Option>) }
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
