import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from 'redux-modal'
import { Field } from 'react-final-form'

class Security extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.sc, this.props.sc)
  }

  render() {
    const translate = this.context.t
    const { sc, showModal } = this.props
    return (
      <React.Fragment>
        <div className="create_doc_modal-header decision">
          <span className="create_doc_modal-content-title-bold">{translate('SECURITY_LABELS')}</span>
        </div>
        <div className="create_doc_modal-content decision clearfix">
          <div className="column_content column-big fl">
            <div>
              {sc.map(greef => {
                return (
                  <span className={`sc-name ${!greef.himself ? 'group-show' : ''}`} key={greef.gname}>
                    {greef.gname.substr(0, 3)}
                    {!greef.himself && <span className="kaz_icons group-icon"></span>}
                  </span>
                )
              })}
            </div>
          </div>
          <Field name={`sc`} component={(props) => {
            return (
              <div className="column_content fr">
                <button type="button" onClick={() =>
                  showModal('changeSecurityClassifications', {
                    scIsDefault: sc.map(itm => { return itm.id }),
                    scIsFixed: _.filter(sc, { himself: false }).map(itm => { return itm.id }),
                    closeModal: (values) => {
                      props.input.onChange(values.map((item) => {
                        if (_.find(sc, { id: item.id }) !== undefined) {
                          return _.find(sc, { id: item.id })
                        }
                        return {
                          ...new RoleScHelper({
                            id: item.id,
                            himself: true,
                            usersOrGrous: [],
                          }),
                          gname: item.gname
                        }
                      }))
                    }
                  })
                  //props.input.onChange([])
                } className="btn_cancel btn_edit bord_radius3">{translate('CHANGE')}</button>
              </div>
            )
          }} />
        </div>
      </React.Fragment>
    )
  }
}

Security.contextTypes = {
  t: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal: show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Security);