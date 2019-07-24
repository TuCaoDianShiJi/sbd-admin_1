import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row, Col, Radio, Input, Select } from 'antd';

import styles from './record.less';

const listData = ['张波', '王玉龙', '欧宜', '袁佳伟'];
const otherData = ['杨过', '张无忌', '令狐冲'];
const { Search } = Input;
const { Option } = Select;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedName: '',
    };
  }

  // 点击员工单选按钮
  onCheckedName(e) {
    this.setState({
      checkedName: e.target.value,
    });
  }

  render() {
    const { checkedName } = this.state;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <PageHeaderWrapper>
        <Row className={styles.record}>
          <Col xs={24} sm={12} md={6} lg={6} xl={4} className={styles.leftContainer}>
            <Col span={24}>
              <Search placeholder="请输入员工姓名" style={{ width: 150 }} />
            </Col>
            <Col span={24}>
              <Radio.Group className={styles.radioGroup} onChange={this.onCheckedName.bind(this)}>
                {listData.map((item, index) => (
                  <Radio style={radioStyle} value={item} key={index}>
                    {item}
                  </Radio>
                ))}
              </Radio.Group>
            </Col>
          </Col>
          <Col xs={24} sm={12} md={18} lg={18} xl={20} className={styles.rightContainer}>
            {checkedName !== '' ? (
              <div>
                {checkedName} 与{' '}
                <Select placeholder="请选择" style={{ width: 130 }}>
                  {otherData.map((item, index) => (
                    <Option value={item} key={index}>
                      {item}
                    </Option>
                  ))}
                </Select>{' '}
                的聊天记录
              </div>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Index;
