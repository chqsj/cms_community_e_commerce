import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Panel from '@/components/Panel';
import {
  Button,
  Layout,
  Breadcrumb,
  Divider,
  Table,
  Form
} from 'antd';
import { fetchAdminList } from '@/actions/index';
import AddAdminModal from './AddAdminModal';
import UpdateAdminModal from './UpdateAdminModal';
import DeleteAdminModal from './DeleteAdminModal';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token,
    admins: state.adminInfo.admins,
    isFetching: state.adminInfo.isFetching
  }),
  dispatch => ({
    fetchAdmins: (adminId, token) => dispatch(fetchAdminList(adminId, token))
  })
)
export default class Administrators extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    addModalVisible: false,
    updateModalVisible: false,
    updateValue: {},
    deleteModalVisible: false,
    deleteValue: {}
  }

  componentDidMount() {
    this.fetchAdmins()
  }

  fetchAdmins = async () => {
    const {
      adminId,
      token,
      fetchAdmins
    } = this.props

    await fetchAdmins(adminId, token)
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  handleAddOpen = () => {
    this.setState({
      addModalVisible: true
    })
  }

  handleUpdateOpen = (record) => {
    this.setState({
      updateModalVisible: true,
      updateValue: record
    })
  }

  handleDeleteOpen = async (record) => {
    this.setState({
      deleteModalVisible: true,
      deleteValue: record
    })

    await this.fetchAdmins()
  }

  handleAddCancel = () => {
    this.setState({
      addModalVisible: false
    })
  }

  handleUpdateCancel = () => {
    this.setState({
      updateModalVisible: false
    })
  }

  handleDeleteCancel = () => {
    this.setState({
      deleteModalVisible: false
    })
  }

  handleAddSuccess = () => {
    this.setState({
      addModalVisible: false
    })
  }

  handleUpdateSuccess = () => {
    this.setState({
      updateModalVisible: false
    })
  }

  handleDeleteSuccess = () => {
    this.setState({
      deleteModalVisible: false
    })
  }

  render() {
    const {
      admins,
      isFetching
    } = this.props

    let {
      filteredInfo,
      sortedInfo
    } = this.state

    filteredInfo = filteredInfo || {}
    sortedInfo = sortedInfo || {}

    const columns =[{
      title: 'id',
      dataIndex: 'administratorId',
      key: 'administratorId',
      sorter: (a, b) => a.administratorId- b.administratorId,
      sortOrder: sortedInfo.columnKey === 'administratorId' && sortedInfo.order
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
      key: 'nickName',
    }, {
      title: '?????????',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '????????????????????????',
      dataIndex: 'superLevel',
      key: 'superLevel',
      render: (text, record) => {
        if (record.superLevel === true) {
          return <span>???</span>
        } else {
          return <span>???</span>
        }
      }
    }, {
      title: '??????',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => this.handleUpdateOpen(record)}
          >
            ??????
          </Button>
          <Divider type="vertical" />
          <Button
            type="danger"
            onClick={() => this.handleDeleteOpen(record)}
          >
            ??????
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
              <Breadcrumb.Item>???????????????</Breadcrumb.Item>
            </Breadcrumb>
            <h2>???????????????</h2>
            <p>??????????????????????????????????????????????????????????????????????????????????????????</p>
            <Divider style={{marginTop: '10px', marginBottom: '30px'}} />
            <Button
              type="primary"
              onClick={this.handleAddOpen}
            >
              ???????????????
            </Button>
          </Panel.Header>
          <Panel.Body type="light">
            <Table
              rowKey={record => record.administratorId}
              dataSource={admins}
              columns={columns}
              bordered
              onChange={this.handleChange}
              loading={isFetching}
            />
          </Panel.Body>
          <AddAdminModal
            visible={this.state.addModalVisible}
            handleSubmit={this.handleAddSuccess}
            handleCancel={this.handleAddCancel}
          />
          <UpdateAdminModal
            visible={this.state.updateModalVisible}
            value={this.state.updateValue}
            handleSubmit={this.handleUpdateSuccess}
            handleCancel={this.handleUpdateCancel}
          />
          <DeleteAdminModal
            visible={this.state.deleteModalVisible}
            value={this.state.deleteValue}
            handleSubmit={this.handleDeleteSuccess}
            handleCancel={this.handleDeleteCancel}
          />
        </Panel>
      </Layout.Content>
    )
  }
}
