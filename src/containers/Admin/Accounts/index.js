import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { hasRole } from '../../../utils/roles'
import { Header, RightTitle, RightBody, RightFooter } from '../Components'
import { AutoSizer, Table, Column } from 'react-virtualized';
import { ROW_HEIGHT, HEADER_HEIGHT, PAGINATION_HEIGHT } from '../../../constant/table'
import Pagination from '../../../components/Pagination'
import { RemoveCell, DateCell, CheckBoxCell, FileStorageTypeCell } from '../../../components/TableCell'
import AccountsForm from './form'
import { show } from 'redux-modal'
import { fileStorageType } from '../../../utils/translateEnum'
import { toast } from 'react-toastify';
import HeaderDropDown from '../../../components/HeaderDropDown'
class Accounts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (hasRole('superAdmin')) {
      this.props.getAllAccountGroups()
      this.props.getAllFileStorages()
    }
    this.props.getAll(hasRole('superAdmin'))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error && this.props.error !== null) {
      toast(this.props.error.message || 'undefind error', {
        type: toast.TYPE.ERROR
      })
    }
  }

  componentWillUnmount() {
    this.props.clearStore()
  }

  render() {

    const translate = this.context.t;
    const { list = [], groupsList = [], fileStoragesList = [], selected = null, isFetching } = this.props
    return [
      <Header key='header' label={hasRole('superAdmin') ? 'CREATE_AN_ACCOUNT' : undefined} onClick={() => this.props.byId()} />,
      <div className={`main_content ${selected !== null ? 'open_params' : ''}`} key='content'>
        <div className="l-main_cont" style={{ height: '100%' }}>
          <AutoSizer>
            {({ height, width }) => [
              <Table
                key='table'
                height={height} // - PAGINATION_HEIGHT
                rowCount={list.length}
                onRowClick={({ rowData, event, index }) => {
                  if (event.target.classList.contains('fa-trash-o') || event.target.classList.contains('removed_cell')) return;
                  if (selected !== null && selected.id === rowData.id) return;
                  this.props.byId(rowData)
                }}
                rowHeight={ROW_HEIGHT}
                headerHeight={HEADER_HEIGHT}
                disableHeader={false}
                rowGetter={({ index }) => list[index]}
                width={width}
              >
                <Column
                  label={translate('NAME')}
                  dataKey='accountName'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                <Column
                  label={translate('CLOSED_ACCOUNT')}
                  dataKey='confidential'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  cellRenderer={(props) => {
                    return (
                      <CheckBoxCell {...props} id={props.rowData.id} readOnly={true} />
                    )
                  }}
                  width={40}
                />
                <Column
                  label={translate('FILE_STORAGE')}
                  dataKey='storages'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  cellDataGetter={({ rowData }) => {
                    let storage = _.find(rowData.storages, { type: FileStorageType.PRIMARY })
                    return storage ? storage.descriptionFileStorage : ''
                  }}
                  width={200}
                />
                <Column
                  label={translate('ARCHIVE_STORAGE')}
                  dataKey='storages'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  cellDataGetter={({ rowData }) => {
                    let storage = _.find(rowData.storages, { type: FileStorageType.ARCHIVE })
                    return storage ? storage.descriptionFileStorage : ''
                  }}
                  width={200}
                />
                <Column
                  label={translate('ENCRYPTION')}
                  dataKey='encrypted'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  cellRenderer={(props) => {
                    return (
                      <CheckBoxCell {...props} id={props.rowData.id} readOnly={true} />
                    )
                  }}
                  width={40}
                />
                {hasRole('superAdmin') && <Column
                  label={translate('ACCOUNT_GROUP')}
                  dataKey='accountGroupId'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  cellDataGetter={({ rowData }) => {
                    let group = _.find(groupsList, { id: rowData.accountGroupId })
                    return group === undefined ? '' : group.name
                  }}
                  width={200}
                />}
              </Table>,
              // <Pagination
              //   page={1}
              //   width={width}
              //   count={list.length}
              //   next={this.props.nextPage}
              //   prev={this.props.prevPage}
              //   loading={isFetching}
              //   key='pagination'
              // />
            ]}
          </AutoSizer>
        </div>
        <div className="r-main_cont business_proc-right">
          <RightTitle label={'ACCOUNT'} />
          <RightBody>
            {selected !== null && <AccountsForm selected={selected} groupsList={groupsList} fileStoragesList={fileStoragesList} />}
          </RightBody>
          <div className="business_proc-btn">
            <div className="btn_select">
              <span className={`btn_select-text ${false ? 'disabled' : ''}`} onClick={() => {
                document
                  .getElementById("AccountsForm")
                  .dispatchEvent(new Event("submit", { cancelable: true }))
              }}>{translate('SAVE')}</span>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

Accounts.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ...state.admin.accounts
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.admin.accounts, show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
