import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions'
import { AutoSizer, List } from 'react-virtualized';
import SearchInput, { createFilter } from 'react-search-input'
class ChangeSecurityClassifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      scIsSelected: []
    }
  }

  componentDidMount() {
    if (this.props.allSecurityClassification.length === 0) {
      this.props.getAllSecurityClassifications()
    } else {
      this.setState({
        scIsSelected: _.filter(this.props.allSecurityClassification, (itm) => {
          return this.props.scIsDefault.indexOf(itm.id) !== -1
        })
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allSecurityClassification !== this.props.allSecurityClassification) {
      this.setState({
        scIsSelected: _.filter(this.props.allSecurityClassification, (itm) => {
          return this.props.scIsDefault.indexOf(itm.id) !== -1
        })
      })
    }
  }

  render() {
    const { show, handleHide, scIsFixed, scIsDefault } = this.props;
    let { scIsSelected } = this.state
    scIsSelected = scIsSelected.filter(createFilter(this.state.search, ['gname']))
    const allSecurityClassification = _.difference(this.props.allSecurityClassification, scIsSelected).filter(createFilter(this.state.search, ['gname']))
    const translate = this.context.t
    return (
      <Modal show={show} onHide={handleHide} bsSize="large">
        <Modal.Header className="modal_header create-edit-document clearfix" >`
          <h4 className='fl'>{translate('ADD_REMOVE_SC')}</h4>
        </Modal.Header>
        <Modal.Body className="modal_attach">
          <div className="add_per_to_event-table">
            <div className="add_per_to_event-left">
              <div className="add_per_to_event-search-block">
                <div className="search-btn-block no_btn-search width100 font10 clearfix">
                  <input placeholder={translate('FIND')} maxLength="255" type="text" className="input fl" onChange={(e) => this.setState({ search: e.target.value })} />
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
                      rowCount={allSecurityClassification.length}
                      rowHeight={45}
                      rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
                        const itm = allSecurityClassification[index]
                        return (
                          <div
                            key={key}
                            style={style}
                            className="add_per_to_event-block secur-class"
                            onClick={() => this.setState({
                              scIsSelected: [...scIsSelected, itm]
                            })}
                          >
                            {itm.dependencies.length === 0 ?
                              <span className="sc-name sc-name-parent">{itm.gname.substr(0, 3)}</span> :
                              <span className="sc-name sc-name-parent">
                                {itm.gname.substr(0, 3)}
                                <i className="fa fa-external-link" aria-hidden="true"></i>
                              </span>}
                            {itm.group !== null && <span className="sc-group">{itm.group.substr(0, 3)}</span>}
                            {itm.scDescription !== null && <span className="sc-desc">{itm.scDescription.substr(0, 3)}</span>}
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
                        noRowsRenderer={() => {
                          return (
                            <div className="event-right-bg">
                              <div className="event-right-bg-img greef_empty-img"></div>
                              <p className="event-right-bg-title">{translate('NO_ADDED_VULTURES_YET')}</p>
                              <p className="event-right-bg-text">{translate('TO_ADD_A_FINGERBOARD_FIND_IT_IN_THE_WINDOW_ON_THE_LEFT_AND_CLICK_ON_IT')}</p>
                            </div>
                          )
                        }}
                        rowCount={scIsSelected.length}
                        rowHeight={45}
                        rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
                          const itm = scIsSelected[index]
                          return (
                            <div
                              key={key}
                              style={style}
                              className="add_per_to_event-block"
                            >
                              {itm.dependencies.length === 0 ?
                                <span className="sc-name sc-name-parent">{itm.gname.substr(0, 3)}</span> :
                                <span className="sc-name sc-name-parent">
                                  {itm.gname.substr(0, 3)}
                                  <i className="fa fa-external-link" aria-hidden="true"></i>
                                </span>}
                              {itm.group !== null && <span className="sc-group">{itm.group.substr(0, 3)}</span>}
                              {itm.scDescription !== null && <span className="sc-desc">{itm.scDescription.substr(0, 3)}</span>}
                              <div className="clear"></div>
                              {scIsFixed.indexOf(itm.id) === -1 && <span onClick={() => {
                                this.setState({
                                  scIsSelected: _.filter(scIsSelected, (item) => {
                                    return item !== itm
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
            this.props.closeModal(scIsSelected)
            handleHide()
          }} className="btn_ok">{translate('READY')}</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
ChangeSecurityClassifications.propTypes = {
  scIsDefault: PropTypes.array.isRequired,
  scIsFixed: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired
}

ChangeSecurityClassifications.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.modalChangeSecurityClassifications.isFetching,
    allSecurityClassification: state.modalChangeSecurityClassifications.allSecurityClassification
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllSecurityClassifications: actions.modals.changeSecurityClassifications.getAllSecurityClassifications
}, dispatch)

export default connectModal({ name: 'changeSecurityClassifications', destroyOnHide: true })((connect(mapStateToProps, mapDispatchToProps)(ChangeSecurityClassifications)))