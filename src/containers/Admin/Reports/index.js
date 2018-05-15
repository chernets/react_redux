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
import ReportsForm from './form'
import { show } from 'redux-modal'
import { toast } from 'react-toastify';
import HeaderDropDown from '../../../components/HeaderDropDown'
class Reports extends Component {
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
    const { list = [], selected = null, isFetching } = this.props
    return [
      <Header key='header' label={'CREATE_A_LABEL'} onClick={() => this.props.byId()} />,
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
                  dataKey='gname'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={100}
                />
                <Column
                  label={translate('GROUP')}
                  dataKey='group'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={100}
                />
                <Column
                  label={translate('DESCRIPTION')}
                  dataKey='scDescription'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                <Column
                  label={translate('ASSOCIATED_VULTURES')}
                  dataKey='dependencies'
                  flexGrow={1}
                  className='table_body_cell secur-class'
                  headerClassName='table_head_cell'
                  cellRenderer={(props) => {
                    return (
                      props.rowData.dependencies.slice(0, 4).map(item => {
                        return (
                          <span className='sc-name' key={item.id}>{item.gname.substr(0, 3)}</span>
                        )
                      })
                    )
                  }}
                  width={200}
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
                        desc: translate('YOU_ARE_ABOUT_TO_DELETE_THE_FINGERBOARD_WHICH_MAY_RESULT_IN_THE_DELETION_OF_CONFIDENTIAL_DOCUMENTS', { name: props.rowData.gname }),
                        closeModal: () => this.props.destroy(props.cellData)
                      })
                    }} />
                  }}
                />
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
          <RightTitle label={'VULTURE'} />
          <RightBody>
            {selected !== null && <ReportsForm selected={selected} />}
          </RightBody>
          <div className="business_proc-btn">
            <div className="btn_select">
              <span className={`btn_select-text ${false ? 'disabled' : ''}`} onClick={() => {
                document
                  .getElementById("ReportsForm")
                  .dispatchEvent(new Event("submit", { cancelable: true }))
              }}>{translate('SAVE')}</span>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

Reports.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ...state.admin.securityClassification
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.admin.securityClassification, show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
