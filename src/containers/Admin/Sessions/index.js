import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { Header } from '../Components'
import { AutoSizer, Table, Column } from 'react-virtualized';
import { ROW_HEIGHT, HEADER_HEIGHT, PAGINATION_HEIGHT } from '../../../constant/table'
import Pagination from '../../../components/Pagination'
import { DateCell } from '../../../components/TableCell'
import { show } from 'redux-modal'
import { toast } from 'react-toastify';

import VirtualizedSelect from 'react-virtualized-select'
import DatePicker from 'react-datepicker';
import moment from 'moment'

import { UserManagementClient, kazFilter, filterItem, filterFieldType, filterCondition } from '../../../api/index'

class CustomInput extends React.Component {

  render() {
    return (
      <span className="calendar-area">
        <input {...this.props} />
      </span>
    )
  }
}

class Sessions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.props.getAll()
  }

  componentWillUnmount() {
    this.props.clearStore()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error && this.props.error !== null) {
      toast(this.props.error.message || 'undefind error', {
        type: toast.TYPE.ERROR
      })
    }
  }

  confirmUserPublicKey(id, confirm) {
    this.props.show('confirmation', {
      desc: this.context.t(confirm ? 'CONFIRM_THE_PERMISSIONS_TO_USE_THE_KEY' : 'CONFIRM_THAT_YOU_DO_NOT_WANT_TO_USE_THE_KEY'),
      closeModal: () => {
        this.props.confirmUserPublicKey(id, confirm)
      }
    })

  }

  render() {
    const translate = this.context.t;
    const { list = [], isFetching, count, page, dateStart, dateEnd, isClosed, user, token } = this.props
    return [
      <Header key='header'>
        <div className="event_logs-title" style={{ lineHeight: '50px' }}>
          <div className="event_logs-title-filter">
            <p className="txt_for_calen" style={{ color: 'white' }}>{translate('USER')}</p>
            <div style={{ width: '180px', height: '30px', display: 'inline-block' }}>
              <VirtualizedSelect
                async
                backspaceRemoves={false}
                labelKey='fio'
                loadOptions={(input) => {
                  let filter =  kazFilter({
                    countFilter: 25,
                    position: 0,
                    items: []
                  })
                  filter.items.push(filterItem({
                    field: 'FIO',
                    value: input,
                    fType: filterFieldType.STRING,
                    condition: filterCondition.CONTAIN
                  }))
                  return UserManagementClient.getAllUsers(token, filter).then(result => {
                    this.setState({ users: result.map(itm => { itm.fio = itm.getFio(); return itm }) })
                    return { options: result.map(itm => { itm.fio = itm.getFio(); return itm }) }
                  })
                }}
                minimumInput={1}
                onChange={(selectedUser) => this.props.changeUser(selectedUser)}
                options={this.state.users}
                value={user}
                valueKey='fio'
              />
            </div>
            <span className="txt_for_calen" style={{ color: 'white' }}>{translate('SESSION_START_DATE')}</span>
            <div style={{ width: '110px', display: 'inline-block' }}>
              <DatePicker
                customInput={<CustomInput />}
                className="calendar input bord_radius2"
                selected={dateStart === null ? null : moment(dateStart)}
                showTimeSelect={false}
                timeFormat="HH:mm"
                dateFormat={'DD.MM.YYYY'}
                onChange={(dateTime) => {
                  this.props.changeDateStart(dateTime)
                }}
                maxDate={dateEnd === null ? moment() : dateEnd}
                onKeyDown={e => {
                  e.preventDefault()
                }}
                isClearable={true}
              />
            </div>
            <span className="txt_for_calen mrg" style={{ color: 'white' }}>{translate('SESSION_END_DATE')}</span>
            <div style={{ width: '110px', display: 'inline-block' }}>
              <DatePicker
                customInput={<CustomInput />}
                className="calendar input bord_radius2"
                selected={dateEnd === null ? null : moment(dateEnd)}
                showTimeSelect={false}
                timeFormat="HH:mm"
                dateFormat={'DD.MM.YYYY'}
                minDate={dateStart}
                maxDate={moment()}
                onChange={(dateTime) => {
                  this.props.changeDateEnd(dateTime)
                }}
                onKeyDown={e => {
                  e.preventDefault()
                }}
                isClearable={true}
              />
            </div>
            <div className="search_dropdown_checkgroup_content_l" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px' }}>
              <input id="chkI_isClosed" type="checkbox" checked={isClosed} onChange={e => this.props.changeIsClosed(e.target.checked)} />
              <label htmlFor="chkI_isClosed" style={{ color: 'white' }}>{translate('ACTIVE_SESSIONS')}</label>
            </div>
          </div>
        </div>
      </Header>,
      <div className={`main_content`} key='content'>
        <div className="l-main_cont" style={{ height: '100%' }}>
          <AutoSizer>
            {({ height, width }) => [
              <Table
                key='table'
                height={height - PAGINATION_HEIGHT}
                rowCount={list.length}
                rowHeight={ROW_HEIGHT}
                headerHeight={HEADER_HEIGHT}
                disableHeader={false}
                rowGetter={({ index }) => list[index]}
                width={width}
              >
                <Column
                  label={translate('THE_DATE_OF_THE_BEGINNING')}
                  dataKey='createDate'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={(props) => {
                    return <DateCell {...props} format='DD.MM.YYYY HH:mm:ss' />
                  }}
                />
                <Column
                  label={translate('DATE_OF_UPDATE')}
                  dataKey='updateDate'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={(props) => {
                    return <DateCell {...props} format='DD.MM.YYYY HH:mm:ss' />
                  }}
                />
                <Column
                  label={translate('EXPIRATION_DATE')}
                  dataKey='expireDate'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={(props) => {
                    return <DateCell {...props} format='DD.MM.YYYY HH:mm:ss' />
                  }}
                />
                <Column
                  label={translate('USER')}
                  dataKey='clientInfo'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                  cellDataGetter={({ rowData }) => {
                    return rowData.clientInfo.getFioFull()
                  }}
                />
                <Column
                  label={translate('IP')}
                  dataKey='ip1'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                <Column
                  label={translate('IP(local)')}
                  dataKey='ip2'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
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
    ]
  }
}

Sessions.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    ...state.admin.sessions
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.admin.sessions, show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
