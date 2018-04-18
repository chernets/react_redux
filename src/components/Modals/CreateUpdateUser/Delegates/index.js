import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AutoSizer, Table, Column } from 'react-virtualized';
import { ROW_HEIGHT, HEADER_HEIGHT } from '../../../../constant/table'

import { UserFullFio, DateCell, AccountCell, CreateCell, RemoveCell } from '../../../TableCell'

class Delegates extends Component {
  constructor(props) {
    super(props)
  }

  // shouldComponentUpdate(nextProps) {
  //   return !_.isEqual(nextProps.sc, this.props.sc)
  // }

  render() {
    const translate = this.context.t
    const { delegates = [] } = this.props
    console.log(delegates)
    return (
      <React.Fragment>
        <div className="create_doc_modal-header decision">
          <span className="create_doc_modal-content-title-bold">{translate('DELEGATION')}</span>
        </div>
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
                      console.log('add')
                    }} />
                  }}
                  cellRenderer={(props) => {
                    return <RemoveCell {...props} onClick={() => {
                      console.log('remove')
                    }}/>
                  }}
                />
              </Table>
            )}
          </AutoSizer>
        </div>
      </React.Fragment>
    )
  }
}

Delegates.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Delegates