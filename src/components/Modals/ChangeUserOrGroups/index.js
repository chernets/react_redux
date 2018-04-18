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
class ChangeUserOrGroups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userOrGroupsSelected: props.userOrGroupsSelected
    }
  }

  componentDidMount() {
    if (this.props.allUserOrGroups.length === 0) this.props.getAllUsersOrGroups(true)
  }

  componentWillUnmount() {
    this.props.cleanStore()
  }

  render() {
    const { show, handleHide, isFetching, name, searchText,
      bpmRoles, userOrGroupsFixed, multiSelect
    } = this.props;
    const { userOrGroupsSelected } = this.state
    const allUserOrGroups = [...bpmRoles, ..._.differenceBy(this.props.allUserOrGroups, userOrGroupsSelected, 'id')]
    const translate = this.context.t
    return (
      <Modal show={show} onHide={handleHide} bsSize="large">
        <Modal.Header className="modal_header create-edit-document clearfix" >
          <h4 className='fl'>{translate(name)}</h4>
        </Modal.Header>
        <Modal.Body className="modal_attach">
          <div className="add_per_to_event-table">
            <div className="add_per_to_event-left">
              <div className="add_per_to_event-search-block">
                <div className="search-btn-block no_btn-search width100 font10 clearfix">
                  <SearchInput placeholder={translate('FIND')} maxLength="255" type="text" throttle={500} inputClassName="input fl" onChange={(value) => this.props.searchUserOrGroups(value)} />
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
                      rowCount={allUserOrGroups.length}
                      rowHeight={45}
                      onRowsRendered={({ stopIndex }) => {
                        if (isFetching === false && allUserOrGroups.length === stopIndex + 1) {
                          this.props.getAllUsersOrGroups()
                        }
                      }}
                      rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
                        const itm = allUserOrGroups[index]
                        return (
                          <div
                            key={key}
                            style={style}
                            className={`${itm.type === UserOrGroupType.USER ? 'add_per_to_event-block' : 'add_per_to_event-gp_block'}`}
                            onClick={() => this.setState({
                              userOrGroupsSelected: multiSelect ? [...userOrGroupsSelected, itm] : [itm]
                            })}
                          >
                            {itm.type === UserOrGroupType.USER && [
                              <div className="msg-ava" key='ava'>
                                <img src={itm.getAvatar()} alt="avatar" />
                              </div>,
                              <div className="msg_cont-info" key='info'>
                                <p className="msg_fio">{itm.getFioFull()}</p>
                                <p className="msg_fio-position">{itm.position}</p>
                              </div>
                            ]}
                            {itm.type === UserOrGroupType.GROUP && (
                              <div className="add_per_to_event-gp_name">
                                <p className="add_per_to_event-gp_title">{itm.nameGroup}</p>
                                <p className="add_per_to_event-gp_count">{itm.descriptionGroup}</p>
                              </div>
                            )}
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
                        rowCount={userOrGroupsSelected.length}
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
                          const itm = userOrGroupsSelected[index]
                          return (
                            <div
                              key={key}
                              style={style}
                              className={`${itm.type === UserOrGroupType.USER ? 'add_per_to_event-block' : 'add_per_to_event-gp_block'}`}
                            >
                              {itm.type === UserOrGroupType.USER && [
                                <div className="msg-ava" key='ava'>
                                  <img src={itm.getAvatar()} alt="avatar" />
                                </div>,
                                <div className="msg_cont-info" key='info'>
                                  <p className="msg_fio">{itm.getFioFull()}</p>
                                  <p className="msg_fio-position">{itm.position}</p>
                                </div>
                              ]}
                              {itm.type === UserOrGroupType.GROUP && (
                                <div className="add_per_to_event-gp_name">
                                  <p className="add_per_to_event-gp_title">{itm.nameGroup}</p>
                                  <p className="add_per_to_event-gp_count">{itm.descriptionGroup}</p>
                                </div>
                              )}
                              <div className="clear"></div>
                              {userOrGroupsFixed.indexOf(itm.id) === -1 && <span onClick={() => {
                                this.setState({
                                  userOrGroupsSelected: _.filter(userOrGroupsSelected, (item) => {
                                    return item.id !== itm.id
                                  })
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
            this.props.closeModal(userOrGroupsSelected)
            handleHide()
          }} className="btn_ok">{translate('READY')}</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
ChangeUserOrGroups.propTypes = {
  userOrGroupsSelected: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired
}

ChangeUserOrGroups.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    ...state.modalChangeUserOrGroups
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.modals.changeUserOrGroups
}, dispatch)

export default connectModal({ name: 'changeUserOrGroups', destroyOnHide: true })((connect(mapStateToProps, mapDispatchToProps)(ChangeUserOrGroups)))