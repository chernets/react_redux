import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Field } from 'react-final-form'
import * as actions from '../../../actions'
import { AutoSizer, List } from 'react-virtualized';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import SearchInput, { createFilter } from 'react-search-input'

const SortableItem = SortableElement(({ value }) => {
  return (
      <span>{value.displayName}</span>
  );
});

class VirtualList extends Component {
  render() {
    const { items, updateList } = this.props;
    const translate = this.context.t
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            rowRenderer={({ key, index, style }) => {
              const value = items[index];
              return <div
                style={style}
                key={key}
                className="add_per_to_event-block"
              >
                <SortableItem style={style} index={index} value={value} />
                <div className="clear"></div>
                <span onClick={() => { updateList(value) }} className="cal_icon del_per_from_event"></span>
              </div>
            }}
            noRowsRenderer={() => {
              return (
                <div className="event-right-bg">
                  <div className="event-right-bg-img role_empty-img"></div>
                  <p className="event-right-bg-title">{translate('NO_FIELDS_ADDED_YET')}</p>
                  <p className="event-right-bg-text">{translate('TO_ADD_A_FIELD_FIND_IT_IN_THE_WINDOW_ON_THE_LEFT_AND_CLICK_ON_IT')}</p>
                </div>
              )
            }}
            rowHeight={45}
            rowCount={items.length}
            width={width}
            height={height}
          />
        )}
      </AutoSizer>
    )
  }
}

const SortableList = SortableContainer(VirtualList, { withRef: true });

class ChangeDocumentFields extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      fieldsIsSelected: props.isDefault
    }
  }

  componentDidMount() {
    if (this.props.allFields.length === 0) this.props.getAllFields()
  }

  render() {
    const { show, handleHide } = this.props;
    let { fieldsIsSelected } = this.state
    fieldsIsSelected = fieldsIsSelected.filter(createFilter(this.state.search, ['displayName']))
    const allFields = _.differenceBy(this.props.allFields, fieldsIsSelected, 'id').filter(createFilter(this.state.search, ['displayName']))
    const translate = this.context.t
    return (
      <Modal show={show} onHide={handleHide} bsSize="large">
        <Modal.Header className="modal_header create-edit-document clearfix" >
          <h4 className='fl'>{translate('ADDING_FIELDS')}</h4>
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
                      rowCount={allFields.length}
                      rowHeight={45}
                      rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
                        const itm = allFields[index]
                        return (
                          <div
                            key={key}
                            style={style}
                            className="add_per_to_event-block"
                            onClick={() => this.setState({
                              fieldsIsSelected: [...fieldsIsSelected, itm]
                            })}
                          >
                            <span>{itm.displayName}</span>
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
                  <SortableList
                    items={fieldsIsSelected}
                    updateList={(itm) => {
                      this.setState({
                        fieldsIsSelected: _.filter(fieldsIsSelected, (item) => {
                          return item !== itm
                        })
                      })
                    }}
                    onSortEnd={({ oldIndex, newIndex }) => {
                      if (oldIndex !== newIndex) {
                        this.setState({
                          fieldsIsSelected: arrayMove(this.state.fieldsIsSelected, oldIndex, newIndex),
                        });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="clear"></div>
        </Modal.Body>
        <Modal.Footer className='modal_footer'>
          <button className="btn_cancel bord_radius3" type="button" onClick={handleHide}>{translate('CANCEL')}</button>
          <button type="button" onClick={() => {
            this.props.closeModal(fieldsIsSelected)
            handleHide()
          }} className="btn_ok">{translate('READY')}</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
ChangeDocumentFields.propTypes = {
  isDefault: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired
}

ChangeDocumentFields.contextTypes = {
  t: PropTypes.func.isRequired
}

VirtualList.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.modals.changeDocumentFields.isFetching,
    allFields: state.modals.changeDocumentFields.allFields
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllFields: actions.modals.changeDocumentFields.getAllFields
}, dispatch)

export default connectModal({ name: 'changeDocumentFields', destroyOnHide: true })(connect(mapStateToProps, mapDispatchToProps)(ChangeDocumentFields))