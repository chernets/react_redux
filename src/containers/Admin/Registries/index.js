import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { Header, RightTitle, RightBody, RightFooter } from '../Components'
import { AutoSizer, Table, Column } from 'react-virtualized';
import { ROW_HEIGHT, HEADER_HEIGHT, PAGINATION_HEIGHT } from '../../../constant/table'
import Pagination from '../../../components/Pagination'
import RemoveCell from '../../../components/TableCell/RemoveCell'
class Registries extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAll()
  }

  componentWillUnmount() {
    this.props.clearStore()
  }

  render() {
    const translate = this.context.t;
    const { list = [], selected = null, isFetching } = this.props
    return [
      <Header key='header' label={'CREATE_A_REGISTRY'} onClick={() => console.log('create')} />,
      <div className={`main_content ${selected !== null ? 'open_params' : ''}`} key='content'>
        <div className="l-main_cont" style={{ width: '100%', height: '100%' }}>
          <AutoSizer>
            {({ height, width }) => [
              <Table
                key='table'
                height={height - PAGINATION_HEIGHT}
                rowCount={list.length}
                onRowClick={({ rowData, event, index }) => {
                  if (event.target.classList.contains('close_big')) return;
                  console.log(rowData)
                }}
                rowHeight={ROW_HEIGHT}
                headerHeight={HEADER_HEIGHT}
                disableHeader={false}
                rowGetter={({ index }) => list[index]}
                width={width}
              >
                <Column
                  label={translate('NAME')}
                  dataKey='regName'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                <Column
                  label={translate('DESCRIPTION')}
                  dataKey='regDescription'
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                <Column
                  label={''}
                  dataKey='id'
                  className='table_body_cell'
                  headerClassName='table_head_cell clickable'
                  width={40}
                  cellRenderer={(props) => {
                    return <RemoveCell {...props} onClick={() => {
                      console.log(props.cellData)
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
          <RightTitle label={'REGISTRY'} />
          <RightBody>
            <div>123</div>
          </RightBody>
          <RightFooter disabled={false} />
        </div>
      </div>
    ]
  }
}

Registries.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ...state.admin.registries
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: actions.admin.registries.getAll,
  clearStore: actions.admin.registries.clearStore
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Registries);
