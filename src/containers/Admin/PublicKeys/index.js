import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { Header } from '../Components'
import { AutoSizer, Table, Column, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { ROW_HEIGHT, HEADER_HEIGHT, PAGINATION_HEIGHT } from '../../../constant/table'
import Pagination from '../../../components/Pagination'
import { DateCell } from '../../../components/TableCell'
import { show } from 'redux-modal'
import { keyState } from '../../../utils/translateEnum'
import HeaderDropDown from '../../../components/HeaderDropDown'
import { toast } from 'react-toastify';
class PublicKeys extends Component {
  constructor(props) {
    super(props)
    const cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: ROW_HEIGHT,
    });
    this.cache = cache;
  }

  componentDidMount() {
    this.props.getAll()
  }

  componentWillUnmount() {
    this.cache.clearAll();
    this.props.clearStore()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error && this.props.error !== null) {
      toast(this.props.error.message || 'undefind error', {
        type: toast.TYPE.ERROR
      })
    }
  }

  confirmUserPublicKey(id, confirm){
    this.props.show('confirmation', {
      desc: this.context.t(confirm ? 'CONFIRM_THE_PERMISSIONS_TO_USE_THE_KEY' : 'CONFIRM_THAT_YOU_DO_NOT_WANT_TO_USE_THE_KEY'),
      closeModal: () => {
        this.props.confirmUserPublicKey(id, confirm)
      }
    })
   
  }

  render() {
    const translate = this.context.t;
    const { list = [], isFetching, keyStateFilter } = this.props
    return [
      <Header key='header'>
        <HeaderDropDown
          translate={true}
          defaultTitle={'ALL_KEYS'}
          icon={'kaz_account_icon'}
          name={'name'}
          desc={null}
          active={keyStateFilter}
          items={[{ id: null, name: 'ALL_KEYS' }, ...keyState]}
          updateActive={(data) => this.props.selectedFilter(data)}
        />
      </Header>,
      <div className={`main_content`} key='content'>
        <div className="l-main_cont" style={{ height: '100%' }}>
          <AutoSizer>
            {({ height, width }) => [
              <Table
                key='table'
                deferredMeasurementCache={this._cache}
                height={height}
                rowCount={list.length}
                rowHeight={this.cache.rowHeight}
                headerHeight={HEADER_HEIGHT}
                disableHeader={false}
                rowGetter={({ index }) => list[index]}
                width={width}
              >
                <Column
                  label={translate('UPLOADED')}
                  dataKey='createDate'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={(props) => {
                    return <DateCell {...props} format='DD.MM.YYYY HH:mm' />
                  }}
                />
                <Column
                  label={translate('USER')}
                  dataKey='userId'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                <Column
                  label={translate('SERIAL_NUMBER_1')}
                  cellDataGetter={({ rowData }) => {
                    return rowData.certificateInfo.serialNumber
                  }}
                  dataKey='certificateInfo.serialNumber'
                  flexGrow={1}
                  className='ui-grid-cell-contents cell-custom tc'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={(props) => {
                    const { dataKey, parent, rowIndex, columnIndex, cellData } = props
                    return (
                      <CellMeasurer
                        cache={this.cache}
                        columnIndex={columnIndex}
                        key={dataKey}
                        parent={parent}
                        rowIndex={rowIndex}>
                        <div style={{
                          whiteSpace: 'normal',
                          textOverflow: 'inherit',
                          wordBreak: 'break-word'
                        }}>{cellData}</div>
                      </CellMeasurer>
                    )
                  }}
                />
                <Column
                  label={translate('ISSUED_BY')}
                  cellDataGetter={({ rowData }) => {
                    return rowData.certificateInfo.issuerDN
                  }}
                  dataKey='certificateInfo.issuerDN'
                  className='ui-grid-cell-contents cell-custom tc'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={(props) => {
                    const { dataKey, parent, rowIndex, columnIndex, cellData } = props
                    return (
                      <CellMeasurer
                        cache={this.cache}
                        columnIndex={columnIndex}
                        key={dataKey}
                        parent={parent}
                        rowIndex={rowIndex}>
                        <div style={{
                          whiteSpace: 'normal',
                          textOverflow: 'inherit',
                          wordBreak: 'break-word'
                        }}>{cellData}</div>
                      </CellMeasurer>
                    )
                  }}
                />
                <Column
                  label={translate('ISSUED_TO')}
                  cellDataGetter={({ rowData }) => {
                    return rowData.certificateInfo.subjectDN
                  }}
                  dataKey='certificateInfo.subjectDN'
                  className='ui-grid-cell-contents cell-custom tc'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={({ dataKey, parent, rowIndex, columnIndex, cellData }) => {
                    return (
                      <CellMeasurer
                        cache={this.cache}
                        columnIndex={columnIndex}
                        key={dataKey}
                        parent={parent}
                        rowIndex={rowIndex}>
                        <div style={{
                          whiteSpace: 'normal',
                          textOverflow: 'inherit',
                          wordBreak: 'break-word'
                        }}>{cellData}</div>
                      </CellMeasurer>
                    )
                  }}
                />
                <Column
                  label={translate('DATE_OF_ISSUE')}
                  cellDataGetter={({ rowData }) => {
                    return rowData.certificateInfo.beforeDate
                  }}
                  dataKey='certificateInfo.beforeDate'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={(props) => {
                    return <DateCell {...props} format='DD.MM.YYYY HH:mm' />
                  }}
                />
                <Column
                  label={translate('EXPIRATION_DATE')}
                  cellDataGetter={({ rowData }) => {
                    return rowData.certificateInfo.afterDate
                  }}
                  dataKey='certificateInfo.afterDate'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={(props) => {
                    return <DateCell {...props} format='DD.MM.YYYY HH:mm' />
                  }}
                />
                <Column
                  label={translate('CONFIRM_DATE')}
                  dataKey='confirmDate'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={(props) => {
                    return <DateCell {...props} format='DD.MM.YYYY HH:mm' />
                  }}
                />
                <Column
                  label={translate('CONFIRMED')}
                  dataKey='adminId'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                <Column
                  label={translate('STATUS')}
                  dataKey='keyState'
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  cellDataGetter={({ rowData }) => {
                    return translate(keyState[rowData.keyState].name)
                  }}
                  width={200}
                />
                <Column
                  label={translate('ACT')}
                  dataKey='keyState'
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                  cellRenderer={({ cellData, rowData }) => {
                    return (
                      cellData === KeyState.LOADED && <span>
                        <i className='fa fa-check' style={{ color: '#2975b2', fontSize: '1.2em' }} onClick={() => this.confirmUserPublicKey(rowData.id, true)}></i>
                        <i className='fa fa-ban' style={{ color: '#db7380', fontSize: '1.2em', marginLeft: '5px' }} onClick={() => this.confirmUserPublicKey(rowData.id, false)}></i>
                      </span>
                    )
                  }}
                />
              </Table>
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
      </div>
    ]
  }
}

PublicKeys.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ...state.admin.publickeys
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.admin.publickeys, show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PublicKeys);
