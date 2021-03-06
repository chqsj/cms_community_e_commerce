import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from '../../components/Panel';
import UpdateUserModal from './UpdateUserModal';
import UpdatePassWord from './UpdatePassWord';
import {
  Table,
  Button,
  Divider,
  Layout,
  Breadcrumb,
  Spin
} from 'antd';
import {
  fetchUsers
} from '../../actions';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token,
    isFetching: state.users.isFetching,
    users: state.users.users
  }),
  dispatch => ({
    fetchUsers: (adminId, token) => {
      dispatch(fetchUsers(adminId, token))
    }
  })
)
export default class Users extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    updateFormVisible: false,
    updateFormValue: {},
    updatePasswordVisible: false
  }

  static propTypes = {
    adminId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
  }

  handleUpdateOpen = (value) => {
    this.setState({
      updateFormVisible: true,
      updateFormValue: value
    })
  }

  handleAlterOpen = (value) => {
    this.setState({
      updatePasswordVisible: true,
      updateFormValue: value
    })
  }

  handleAlterSuccess = () => {
    this.setState({
      updatePasswordVisible: false
    })
  }

  handleUpdateSuccess = () => {
    this.setState({
      updateFormVisible: false
    })
  }

  handleClose = () => {
    this.setState({
      updateFormVisible: false,
      updatePasswordVisible: false
    })
  }

  setUpdateFormRef = (form) =>{
    this.updateForm = form
  }

  componentDidMount() {
    this.props.fetchUsers(this.props.adminId, this.props.token)
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  render() {
    const {
      isFetching
    } = this.props

    let { users } = this.props
    let {
      filteredInfo,
      sortedInfo
    } = this.state

    filteredInfo = filteredInfo || {}
    sortedInfo = sortedInfo || {}

    const columns =[{
      title: 'id',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (a, b) => a.userId - b.userId,
      sortOrder: sortedInfo.columnKey === 'userId' && sortedInfo.order
    }, {
      title: '??????',
      dataIndex: 'userName',
      key: 'userName'
    }, {
      title: '??????',
      dataIndex: 'passWord',
      key: 'passWord'
    }, {
      title: '??????',
      dataIndex: 'nickName',
      key: 'nickName'
    }, {
      title: '????????????',
      dataIndex: 'phone',
      key: 'phone'
    }, {
      title: '??????',
      dataIndex: 'sex',
      key: 'sex',
      filters: [
        { text: '???', value: 'MAN' },
        { text: '???', value: 'WOMAN' }
      ],
      filteredValue: filteredInfo.sex || null,
      onFilter: (value, recored) => recored.sex === value
    }, {
      title: '??????',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => this.handleUpdateOpen(record)}>
            ????????????
          </Button>
          <Divider type="vertical" />
          <Button type="danger" onClick={() => this.handleAlterOpen(record)}>
            ????????????
          </Button>
        </span>
      )
    }]

    return (
      <Layout.Content>
        <Panel minus>
          <Panel.Header type="light">
            <Breadcrumb>
              <Breadcrumb.Item>??????</Breadcrumb.Item>
              <Breadcrumb.Item>????????????</Breadcrumb.Item>
            </Breadcrumb>
            <h2>????????????</h2>
            <p>????????????????????????????????????????????????????????????????????????????????????</p>
          </Panel.Header>
          <Panel.Body type="light">
            <Table
              rowKey={record => record.userId}
              dataSource={users}
              columns={columns}
              loading={isFetching}
              bordered
              onChange={this.handleChange}
            />
            <UpdateUserModal
              value={this.state.updateFormValue}
              ref={this.setUpdateFormRef}
              visible={this.state.updateFormVisible}
              handleSubmit={this.handleUpdateSuccess}
              handleCancel={this.handleClose}
            />
            <UpdatePassWord
              visible={this.state.updatePasswordVisible}
              value={this.state.updateFormValue}
              handleSubmit={this.handleAlterSuccess}
              handleCancel={this.handleClose}
            />
          </Panel.Body>
        </Panel>
      </Layout.Content>
    )
  }
}
