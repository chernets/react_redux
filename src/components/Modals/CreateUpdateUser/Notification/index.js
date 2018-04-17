import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationCheckBox from './NotificationCheckBox'
import { AutoSizer, Table, Column } from 'react-virtualized';
import _ from 'lodash'
import { ROW_HEIGHT, HEADER_HEIGHT } from '../../../../constant/table'

class Notification extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.notification, this.props.notification)
  }

  render() {
    const translate = this.context.t
    const { notification, transportTypes } = this.props
    return (
      <React.Fragment>
        <div className="create_doc_modal-header decision">
          <span className="create_doc_modal-content-title-bold">{translate('NOTICE')}</span>
        </div>
        <div className="create_doc_modal-content decision clearfix" style={{ height: notification.length * ROW_HEIGHT + HEADER_HEIGHT }}>
          <AutoSizer>
            {({ height, width }) => (
              <Table
                height={height}
                rowCount={notification.length}
                rowHeight={ROW_HEIGHT}
                headerHeight={HEADER_HEIGHT}
                disableHeader={false}
                rowGetter={({ index }) => notification[index]}
                width={width}
              >
                <Column
                  label={translate('NOTIFICATION')}
                  dataKey={'caption'}
                  flexGrow={1}
                  className='table_body_cell'
                  headerClassName='table_head_cell'
                  width={200}
                />
                {transportTypes.map(type => {
                  return (
                    <Column
                      key={type.key}
                      label={type.caption}
                      dataKey={type.key}
                      columnData={type}
                      flexGrow={1}
                      className='table_body_cell'
                      headerClassName='table_head_cell'
                      width={200}
                      cellRenderer={(props) => {
                        return (
                          <NotificationCheckBox {...props} />
                        )
                      }}
                    />
                  )
                })}
              </Table>
            )}
          </AutoSizer>
        </div>
      </React.Fragment>
    )
  }
}

Notification.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Notification