import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized'
import SearchInput, { createFilter } from 'react-search-input'

class ChangeDepartment extends Component {
  static contextTypes = {
    list: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      departmentsIsSelected: props.departmentsIsDefault
    }

    const cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 50
    });
    this.cache = cache;
  }

  componentDidMount() {
    if (this.props.allDepartments.length === 0) this.props.getAllDepartments()
  }

  componentWillUnmount() {
    this.props.cleanStore()
  }


  componentDidUpdate(prevProps){
    if(prevProps.allDepartments !== this.props.allDepartments) this.cache.clearAll()
  }

  render() {
    const { show, handleHide, isFetching } = this.props;
    let { departmentsIsSelected } = this.state
    const allDepartments = _.difference(this.props.allDepartments, departmentsIsSelected)
    const translate = this.context.t
    return (
      <Modal show={show} onHide={handleHide} bsSize="large">
        <Modal.Header className="modal_header create-edit-document clearfix" >
          <h4 className='fl'>{translate('ADDING_A_DEPARTMENT')}</h4>
        </Modal.Header>
        <Modal.Body className="modal_attach">
          <div className="add_per_to_event-table">
            <div className="add_per_to_event-left">
              <div className="add_per_to_event-search-block">
                <div className="search-btn-block no_btn-search width100 font10 clearfix">
                  <SearchInput placeholder={translate('FIND')} maxLength="255" type="text" throttle={500} inputClassName="input fl" onChange={(value) => this.props.searchDepartments(value)} />
                  <button type="button" className="search-btn fr">
                    <span className="kaz_icons search_icon"></span>
                  </button>
                </div>
              </div>
              <div className="add_per_to_event-area" style={{ maxHeight: '380px' }}>
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      width={width}
                      height={height}
                      rowCount={allDepartments.length}
                      deferredMeasurementCache={this.cache}
                      rowHeight={this.cache.rowHeight}
                      onRowsRendered={({overscanStopIndex, stopIndex }) => {
                        if (isFetching === false && allDepartments.length === stopIndex + 1) {
                          this.props.getAllDepartments()
                        }
                      }}
                      rowRenderer={({ index, parent, key, style }) => {
                        const itm = allDepartments[index]
                        return (
                          <CellMeasurer
                            cache={this.cache}
                            columnIndex={0}
                            key={itm.id}
                            parent={parent}
                            rowIndex={index}
                          >
                            <div
                              style={style}
                              onClick={() => {
                                this.setState({
                                  departmentsIsSelected: [itm]
                                })
                                this.cache.clearAll()
                              }}
                              className="add_per_to_event-gp_block"
                            >
                              <div className="add_per_to_event-gp_name">
                                <p className="add_per_to_event-gp_title">{itm.name}</p>
                                <p className="add_per_to_event-gp_desc">{itm.path}</p>
                              </div>
                            </div>
                          </CellMeasurer>
                        );
                      }}
                    />)}
                </AutoSizer>
              </div>
            </div>
            <div className="add_per_to_event-right">
              <div className="add_per_to_event-right-content">
                <div className="add_per_to_event-area">
                  <AutoSizer>
                    {({ height, width }) => (
                      <List
                        width={width}
                        height={height}
                        rowCount={departmentsIsSelected.length}
                        deferredMeasurementCache={this.cache}
                        rowHeight={this.cache.rowHeight}
                        noRowsRenderer={() => {
                          return (
                            <div className="event-right-bg">
                              <div className="event-right-bg-img dep_empty-img"></div>
                              <p className="event-right-bg-title">{translate('THERE_ARE_NO_ADDED_DEPARTMENTS_YET')}</p>
                              <p className="event-right-bg-text">{translate('TO_ADD_A_DEPARTMENT_FIND_IT_IN_THE_WINDOW_ON_THE_LEFT_AND_CLICK_ON_IT_/_THEM')}</p>
                            </div>
                          )
                        }}
                        rowRenderer={({ index, parent, key, style }) => {
                          const itm = departmentsIsSelected[index]
                          return (
                            <CellMeasurer
                              cache={this.cache}
                              columnIndex={0}
                              key={itm.id}
                              parent={parent}
                              rowIndex={index}
                            >
                              <div
                                style={style}
                                className="add_per_to_event-gp_block"
                              >
                                <div className="add_per_to_event-gp_name">
                                  <p className="add_per_to_event-gp_title">{itm.name}</p>
                                  <p className="add_per_to_event-gp_desc">{itm.path}</p>
                                </div>
                                <div className="clear"></div>
                                <span onClick={() => {
                                  this.setState({
                                    departmentsIsSelected: []
                                  })
                                  this.cache.clearAll()
                                }} className="cal_icon del_per_from_event"></span>
                              </div>
                            </CellMeasurer>
                          )
                        }}
                      />
                    )}
                  </AutoSizer>
                </div>
              </div>
            </div>
          </div>
          <div className="clear"></div>
        </Modal.Body>
        <Modal.Footer className='modal_footer'>
          <button className="btn_cancel bord_radius3" type="button" onClick={handleHide}>{translate('CANCEL')}</button>
          <button type="button" onClick={() => {
            this.props.closeModal(departmentsIsSelected)
            handleHide()
          }} className="btn_ok">{translate('READY')}</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
ChangeDepartment.propTypes = {
  closeModal: PropTypes.func.isRequired
}

ChangeDepartment.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.modalChangeDepartments.isFetching,
    allDepartments: state.modalChangeDepartments.allDepartments
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllDepartments: actions.modals.changeDepartment.getAllDepartments,
  searchDepartments: actions.modals.changeDepartment.searchDepartments,
  cleanStore: actions.modals.changeDepartment.cleanStore
}, dispatch)

export default connectModal({ name: 'changeDepartment', destroyOnHide: true })(connect(mapStateToProps, mapDispatchToProps)(ChangeDepartment))