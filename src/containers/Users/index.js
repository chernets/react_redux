import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { AutoSizer, Table, Column } from 'react-virtualized';
import { show } from 'redux-modal'


import * as actions from '../../actions'
import HeaderDropDown from '../../components/HeaderDropDown'
import Pagination from '../../components/Pagination'

import Search from './Search'

import { UserPosition, UserFullFio, UserDepartmentName } from '../../components/TableCell/'

import { ROW_HEIGHT, HEADER_HEIGHT, PAGINATION_HEIGHT } from '../../constant/table'

class Users extends Component {

  componentWillMount() {
    this.props.allAccounts(this.props.admin)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.admin !== this.props.admin) {
      this.props.cleanState()
      this.props.allAccounts(this.props.admin)
    }
  }

  componentWillUnmount() {
    this.props.cleanState()
  }

  render() {
    const translate = this.context.t
    const { users, isFetching, error, page, count, accounts, accountSelected, admin, getAllUsers } = this.props
    return [
      <header key='header'>
        <HeaderDropDown
          defaultTitle={translate('ALL_ACCOUNTS')}
          icon={'kaz_account_icon'}
          name={'accountName'}
          desc={null}
          active={accountSelected}
          items={[new Account({ id: null, accountName: translate('ALL_ACCOUNTS') }), ...accounts]}
          updateActive={(data) => this.props.selectedAccount(data)}
        />
        {admin && (
          <div className="create_doc-area font10 fr">
            <button
              className="create_doc"
              onClick={() => this.props.showModal('createUpdateUser', {
                userOrGroup: new UserOrGroup({ 
                  haveAccess: true,
                  userType: UserType.EMPLOYEE 
                }),
                login: '',
                closeModal: () => { }
              })}
            >
              <span>{translate('CREATE_USER')}</span>
            </button>
          </div>
        )}
        <Search />
      </header>,
      <div className="main_content users" key='content'>
        <div className="l-main_cont">
          <div className="event_logs-table log" style={{ height: "100%", width: '100%' }}>
            <AutoSizer>
              {({ height, width }) => [
                <Table
                  key='table'
                  height={height - PAGINATION_HEIGHT}
                  rowCount={users.length}
                  onRowClick={({ rowData }) => {
                    if (admin) {
                      this.props.showModal('createUpdateUser', {
                        userOrGroup: rowData.userOrGroup,
                        login: rowData.login,
                        closeModal: () => getAllUsers(false)
                      })
                    } else {
                      this.props.showModal('profile', {
                        userOrGroup: rowData.userOrGroup,
                        disabledEdit: true,
                        closeModal: () => { }
                      })
                    }
                  }}
                  rowHeight={ROW_HEIGHT}
                  headerHeight={HEADER_HEIGHT}
                  disableHeader={false}
                  rowGetter={({ index }) => users[index]}
                  width={width}
                >
                  <Column
                    label={translate('FULL_NAME')}
                    dataKey='id'
                    flexGrow={1}
                    className='table_body_cell'
                    headerClassName='table_head_cell'
                    width={200}
                    cellRenderer={UserFullFio}
                  />
                  <Column
                    width={200}
                    label={translate('SUBDIVISION')}
                    flexGrow={1}
                    className='table_body_cell tl'
                    headerClassName='table_head_cell'
                    dataKey='id'
                    cellRenderer={UserDepartmentName}
                  />
                  <Column
                    width={200}
                    label={translate('POSITION_USER')}
                    flexGrow={1}
                    className='table_body_cell tl'
                    headerClassName='table_head_cell'
                    dataKey={`id`}
                    cellRenderer={UserPosition}
                  />
                </Table>,
                <Pagination
                  page={page}
                  width={width}
                  count={count}
                  next={this.props.nextPage}
                  prev={this.props.prevPage}
                  loading={isFetching}
                  key='pagination'
                />
              ]}
            </AutoSizer>
          </div>
        </div>
      </div>
    ]
  }
}

Users.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.users.isFetching,
    users: state.users.users,
    error: state.users.error,
    page: state.users.page,
    count: state.users.count,
    accountSelected: state.users.accountSelected,
    accounts: state.users.accounts
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllUsers: actions.users.getAllUsers,
  nextPage: actions.users.nextPage,
  prevPage: actions.users.prevPage,
  selectedAccount: actions.users.selectedAccount,
  allAccounts: actions.users.allAccounts,
  cleanState: actions.users.cleanState,
  showModal: show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Users);
