import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { Header, RightTitle, RightBody, RightFooter } from '../Components'
import { AutoSizer, Table, Column } from 'react-virtualized';
import { ROW_HEIGHT, HEADER_HEIGHT, PAGINATION_HEIGHT } from '../../../constant/table'
import Pagination from '../../../components/Pagination'
import { RemoveCell, DateCell, CheckBoxCell, FileStorageTypeCell } from '../../../components/TableCell'
import FileStorageForm from './form'
import { show } from 'redux-modal'
import { fileStorageType } from '../../../utils/translateEnum'
import { toast } from 'react-toastify';
import HeaderDropDown from '../../../components/HeaderDropDown'
class FileStorages extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAll()
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
    const { list = [], selected = null, isFetching, accounts, account, type } = this.props
    return [
      <Header key='header' label={'CREATE_A_STORE'} onClick={() => this.props.byId()}>
        <HeaderDropDown
          defaultTitle={translate('ALL_ACCOUNTS')}
          icon={'kaz_account_icon'}
          name={'accountName'}
          desc={null}
          active={account}
          items={[new Account({ id: null, accountName: translate('ALL_ACCOUNTS') }), ...accounts]}
          updateActive={(data) => this.props.selectedAccount(data)}
        />
        <HeaderDropDown
          defaultTitle={translate('ALL_TYPES')}
          icon={'kaz_account_icon'}
          name={'name'}
          desc={null}
          active={type}
          items={[{
            id: null,
            name: translate('ALL_TYPES')
          },
          {
            id: FileStorageType.PRIMARY,
            name: translate('BASIC')
          },
          {
            id: FileStorageType.ARCHIVE,
            name: translate('ARCHIVE')
          }]}
          updateActive={(data) => this.props.selectedType(data)}
        />
      </Header>,
      <div className={`main_content ${selected !== null ? 'open_params' : ''}`} key='content'>
        <div className="l-main_cont" style={{ height: '100%' }}>
          <AutoSizer>
            {({ height, width }) => [
              <Table
                key='table'
                height={height - PAGINATION_HEIGHT}
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
                  dataKey='descriptionFileStorage'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                <Column
                  label={translate('TYPE')}
                  dataKey='type'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  cellDataGetter={({ rowData }) => {
                    return fileStorageType[rowData.type].name
                  }}
                  width={60}
                />
                <Column
                  label={translate('A_PRIORITY')}
                  dataKey='priority'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={60}
                />
                <Column
                  label={translate('URL')}
                  dataKey='uri'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                <Column
                  label={translate('RECORDING')}
                  dataKey='readOnly'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  cellDataGetter={({ rowData }) => {
                    return !rowData.readOnly
                  }}
                  cellRenderer={(props) => {
                    return (
                      <CheckBoxCell {...props} id={props.rowData.id} readOnly={true} />
                    )
                  }}
                  width={40}
                />
                <Column
                  label={translate('AVAILABLE_SPACE')}
                  dataKey='opened'
                  flexGrow={1}
                  cellDataGetter={({ rowData }) => {
                    return `${Math.round(rowData.freeSpace / rowData.capacity * 100)}%`
                  }}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                <Column
                  label={translate('DATE_OF_CREATION')}
                  dataKey='createDate'
                  flexGrow={1}
                  cellRenderer={(props) => {
                    return <DateCell {...props} format={'DD.MM.YYYY HH:mm'} />
                  }}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={100}
                />
                <Column
                  label={''}
                  dataKey='id'
                  className='table_body_cell removed_cell'
                  headerClassName='table_head_cell clickable'
                  width={40}
                  cellRenderer={(props) => {
                    return <RemoveCell {...props} onClick={() => {
                      this.props.show('confirmation', {
                        desc: translate('YOU_ARE_ABOUT_TO_DELETE_THE_FILE_STORAGE_WHICH_MAY_RESULT_IN_LOSS_OF_DATA_FROM_THIS_STORAGE', { name: props.rowData.descriptionFileStorage }),
                        closeModal: () =>
                          this.props.show('adminPassword', {
                            closeModal: (password) => {
                              this.props.destroy([props.cellData], password)
                            }
                          })
                      })
                    }
                    } />
                  }}
                />
              </Table>,
              <Pagination
                page={1}
                width={width}
                count={list.length}
                next={this.props.nextPage}
                prev={this.props.prevPage}
                loading={isFetching}
                key='pagination'
              />
            ]}
          </AutoSizer>
        </div>
        <div className="r-main_cont business_proc-right">
          <RightTitle label={'FILE_STORAGE'} />
          <RightBody>
            {selected !== null && <FileStorageForm selected={selected} />}
          </RightBody>
          <div className="business_proc-btn">
            <div className="btn_select">
              <span className={`btn_select-text ${false ? 'disabled' : ''}`} onClick={() => {
                document
                  .getElementById("FileStorageForm")
                  .dispatchEvent(new Event("submit", { cancelable: true }))
              }}>{translate('SAVE')}</span>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

FileStorages.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ...state.admin.filestorages,
    accounts: state.auth.accounts
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.admin.filestorages, show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FileStorages);
