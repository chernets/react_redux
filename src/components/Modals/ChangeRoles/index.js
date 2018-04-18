import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Field } from 'react-final-form'
import * as actions from '../../../actions'
import { AutoSizer, List } from 'react-virtualized';

import SearchInput, { createFilter } from 'react-search-input'
class ChangeRoles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      rolesIsSelected: props.rolesIsDefault.sort()
    }
  }

  componentDidMount() {
    if (this.props.allRoles.length === 0) this.props.getAllRoles()
  }

  render() {
    const { show, handleHide, rolesIsFixed } = this.props;
    let { rolesIsSelected } = this.state
    rolesIsSelected = rolesIsSelected.filter(createFilter(this.state.search))
    const allRoles = _.difference(this.props.allRoles, rolesIsSelected).sort().filter(createFilter(this.state.search))
    const translate = this.context.t
    return (
      <Modal show={show} onHide={handleHide} bsSize="large">
        <Modal.Header className="modal_header create-edit-document clearfix" >
          <h4 className='fl'>{translate('ADD_/_REMOVE_ROLE')}</h4>
        </Modal.Header>
        <Modal.Body className="modal_attach">
          <div className="add_per_to_event-search-block">
            <div className="search-btn-block no_btn-search width100 font10 clearfix">
              <input placeholder={translate('FIND')} maxLength="255" type="text" className="input fl" onChange={(e) => this.setState({ search: e.target.value })} />
              <button type="button" className="search-btn fr">
                <span className="kaz_icons search_icon"></span>
              </button>
            </div>
          </div>
          <div className="add_per_to_event-table">
            <div className="add_per_to_event-left">
              <div className="add_per_to_event-area" style={{ maxHeight: '430px' }}>
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      width={width}
                      height={height}
                      rowCount={allRoles.length}
                      rowHeight={45}
                      rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
                        const itm = allRoles[index]
                        return (
                          <div
                            key={key}
                            style={style}
                            className="add_per_to_event-block"
                            onClick={() => this.setState({
                              rolesIsSelected: [...rolesIsSelected, itm].sort()
                            })}
                          >
                            <span>{itm}</span>
                            <div className="clear"></div>
                          </div>
                        )
                      }}
                    />
                  )}
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
                        rowCount={rolesIsSelected.length}
                        rowHeight={45}
                        noRowsRenderer={() => {
                          return (
                            <div className="event-right-bg">
                              <div className="event-right-bg-img role_empty-img"></div>
                              <p className="event-right-bg-title">{translate('NO_ADDED_ROLES_YET')}</p>
                              <p className="event-right-bg-text">{translate('TO_ADD_A_ROLE_FIND_IT_IN_THE_WINDOW_ON_THE_LEFT_AND_CLICK_ON_IT')}</p>
                            </div>
                          )
                        }}
                        rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
                          const itm = rolesIsSelected[index]
                          return (
                            <div
                              key={key}
                              style={style}
                              className="add_per_to_event-block"
                            >
                              <span>{itm}</span>
                              <div className="clear"></div>
                              {rolesIsFixed.indexOf(itm) === -1 && <span onClick={() => {
                                this.setState({
                                  rolesIsSelected: _.filter(rolesIsSelected, (item) => {
                                    return item !== itm
                                  }).sort()
                                })
                              }} className="cal_icon del_per_from_event"></span>}
                            </div>
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
            this.props.closeModal(rolesIsSelected)
            handleHide()
          }} className="btn_ok">{translate('READY')}</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
ChangeRoles.propTypes = {
  rolesIsDefault: PropTypes.array.isRequired,
  rolesIsFixed: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired
}

ChangeRoles.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.modalChangeRoles.isFetching,
    allRoles: state.modalChangeRoles.allRoles
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllRoles: actions.modals.changeRoles.getAllRoles
}, dispatch)

export default connectModal({ name: 'changeRoles', destroyOnHide: true })(connect(mapStateToProps, mapDispatchToProps)(ChangeRoles))