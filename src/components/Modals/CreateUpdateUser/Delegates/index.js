import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from 'redux-modal'
import { AutoSizer, Table, Column } from 'react-virtualized';
import { ROW_HEIGHT, HEADER_HEIGHT } from '../../../../constant/table'
import { Field } from 'react-final-form'
import { UserFullFio, DateCell, AccountCell, CreateCell, RemoveCell } from '../../../TableCell'

class Delegates extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.delegates, this.props.delegates)
  }

  render() {
    const translate = this.context.t
    const { delegates = [] } = this.props
    return (
      <React.Fragment>
        <div className="create_doc_modal-header decision">
          <span className="create_doc_modal-content-title-bold">{translate('DELEGATION')}</span>
        </div>
        <Field name={`delegates`} component={(propsField) => {
          return (
            <div className="create_doc_modal-content decision clearfix" style={{ height: delegates.length * ROW_HEIGHT + HEADER_HEIGHT + 1 }}>
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    height={height}
                    rowCount={delegates.length}
                    rowHeight={ROW_HEIGHT}
                    headerHeight={HEADER_HEIGHT}
                    disableHeader={false}
                    rowGetter={({ index }) => delegates[index]}
                    width={width}
                  >
                    <Column
                      label={translate('USER')}
                      dataKey={'fromUserId'}
                      flexGrow={1}
                      className='table_body_cell'
                      headerClassName='table_head_cell'
                      width={200}
                      cellRenderer={UserFullFio}
                    />
                    <Column
                      label={translate('THE_DATE_OF_THE_BEGINNING')}
                      dataKey={'dateStart'}
                      flexGrow={1}
                      className='table_body_cell'
                      headerClassName='table_head_cell'
                      width={200}
                      cellRenderer={(props) => {
                        return <DateCell {...props} format='D MMM YYYY' />
                      }}
                    />
                    <Column
                      label={translate('EXPIRATION_DATE')}
                      dataKey={'dateEnd'}
                      flexGrow={1}
                      className='table_body_cell'
                      headerClassName='table_head_cell'
                      width={200}
                      cellRenderer={(props) => {
                        return <DateCell {...props} format='D MMM YYYY' />
                      }}
                    />
                    <Column
                      label={translate('ACCOUNT')}
                      dataKey={'account'}
                      flexGrow={1}
                      className='table_body_cell'
                      headerClassName='table_head_cell'
                      width={200}
                      cellRenderer={AccountCell}
                    />
                    <Column
                      label={''}
                      dataKey={'id'}
                      flexGrow={1}
                      className='table_body_cell'
                      headerClassName='table_head_cell clickable'
                      width={40}
                      headerRenderer={(props) => {
                        return <CreateCell {...props} onClick={() => {
                          this.props.showModal('createDelegate', {
                            closeModal: (values) => {
                              propsField.input.onChange([
                                ...propsField.input.value, ...values
                              ])
                            }
                          })
                        }} />
                      }}
                      cellRenderer={(props) => {
                        return <RemoveCell {...props} onClick={() => {
                          propsField.input.onChange(
                            _.filter(propsField.input.value, (val, index) => {
                              return index !== props.rowIndex 
                            })
                          )
                        }} />
                      }}
                    />
                  </Table>
                )}
              </AutoSizer>
            </div>
          )
        }} />
      </React.Fragment>
    )
  }
}

Delegates.contextTypes = {
  t: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal: show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Delegates);