import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { Header, RightTitle, RightBody, RightFooter } from '../Components'
import { AutoSizer, Table, Column } from 'react-virtualized';
import { ROW_HEIGHT, HEADER_HEIGHT, PAGINATION_HEIGHT } from '../../../constant/table'
import Pagination from '../../../components/Pagination'
import { RemoveCell, DateCell } from '../../../components/TableCell'
import RepresenrationsForm from './form'
import { show } from 'redux-modal'
import { toast } from 'react-toastify';
import HeaderDropDown from '../../../components/HeaderDropDown'
class Represenrations extends Component {
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
      <Header key='header' label={'CREATE_VIEW'} onClick={() => this.props.byId()} />,
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
                  dataKey='name'
                  flexGrow={1}
                  className='table_body_cell tl'
                  headerClassName='table_head_cell'
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
                      console.log(props)
                      this.props.show('confirmation', {
                        desc: translate('YOU_ARE_ABOUT_TO_DELETE_THE_FILTER_WHICH_MAY_RESULT_IN_A_LOSS_OF_FUNCTIONALITY', { name: props.rowData.name }),
                        closeModal: () => this.props.destroy(props.cellData)
                      })
                    }} />
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
          <RightTitle label={'REPRESENRATION'} />
          <RightBody>
            {selected !== null && <RepresenrationsForm selected={selected} addParametr={click => this.addParametr = click} />}
          </RightBody>
          <div className="business_proc-btn">
            <div className="btn_select">
              <span className="btn_select-text" onClick={() => this.addParametr()}>{translate('ADD_PARAMETER')}</span>
            </div>
            <div className="btn_select">
              <span className={`btn_select-text ${false ? 'disabled' : ''}`} onClick={() => {
                document
                  .getElementById("RepresenrationsForm")
                  .dispatchEvent(new Event("submit", { cancelable: true }))
              }}>{translate('SAVE')}</span>
            </div>
          </div>
        </div>
      </div>
    ]
  }
}

Represenrations.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ...state.admin.represenrations
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.admin.represenrations, show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Represenrations);
