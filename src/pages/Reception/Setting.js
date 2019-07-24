import React, { Component } from 'react';
import { Table, Button, Divider, Icon, Modal, Form, Input, Checkbox, Select } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import request from '../../utils/request';

import styles from './setting.less';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const plainOptions = ['张波', '王玉龙', '欧宜', '袁佳伟'];

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
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
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
            <Form.Item label="分配顺序" style={{ marginBottom: '10px' }}>
              {getFieldDecorator('allocate_order', {
                initialValue: '优先归属人',
              })(
                <Select>
                  <Option value="优先归属人">优先归属人</Option>
                  <Option value="优先上次接待人">优先上次接待人</Option>
                  <Option value="按空闲率分配">按空闲率分配</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="超时提醒" style={{ marginBottom: '10px' }}>
              <div className={styles.rules}>
                <Checkbox></Checkbox> 超过{' '}
                <Select defaultValue="30秒" style={{ width: '95px' }}>
                  <Option value="30秒">30秒</Option>
                  <Option value="1分钟">1分钟</Option>
                  <Option value="1分30秒">1分30秒</Option>
                  <Option value="2分钟">2分钟</Option>
                  <Option value="2分20秒">2分20秒</Option>
                  <Option value="3分钟">3分钟</Option>
                </Select>{' '}
                接待人员未回复，发送超时提醒
              </div>
            </Form.Item>
            <Form.Item label="重新分配" style={{ marginBottom: '10px' }}>
              <div className={styles.rules}>
                <Checkbox></Checkbox> 超过{' '}
                <Select defaultValue="30秒" style={{ width: '95px' }}>
                  <Option value="30秒">30秒</Option>
                  <Option value="1分钟">1分钟</Option>
                  <Option value="1分30秒">1分30秒</Option>
                  <Option value="2分钟">2分钟</Option>
                  <Option value="2分20秒">2分20秒</Option>
                  <Option value="3分钟">3分钟</Option>
                </Select>{' '}
                待人员未回复，按空闲率进行重新分配
              </div>
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
