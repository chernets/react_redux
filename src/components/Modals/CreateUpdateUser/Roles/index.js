import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from 'redux-modal'
import { Field } from 'react-final-form'
class Roles extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.roles, this.props.roles)
  }

  render() {
    const translate = this.context.t
    const { roles, showModal } = this.props
    return (
      <React.Fragment>
        <div className="create_doc_modal-header decision">
          <span className="create_doc_modal-content-title-bold">{translate('ROLES')}</span>
        </div>
        <div className="create_doc_modal-content decision clearfix">
          <div className="column_content column-big fl">
            <div className="role">
              {roles.map(role => {
                return (
                  <span className={`sc-group ${role.usersOrGrous.length > 0 ? 'group-show' : ''}`} key={role.name}>
                    <span>{role.name}</span>
                    <span className="kaz_icons group-icon"></span>
                  </span>
                )
              })}
            </div>
          </div>
          <Field name={`roles`} component={(props) => {
            return (
              <div className="column_content fr">
                <button type="button" onClick={() =>
                  showModal('changeRoles', {
                    rolesIsDefault: roles.map(item => { return item.name }),
                    rolesIsFixed: _.filter(roles, (item) => { return item.usersOrGrous.length !== 0 }).map(item => { return item.name }),
                    closeModal: (values) => {
                      props.input.onChange(values.map((item) => {
                        if (_.find(roles, { name: item }) !== undefined) {
                          return _.find(roles, { name: item })
                        }
                        return {
                          ...new RoleScHelper({
                            himself: false,
                            usersOrGrous: [],
                          }),
                          name: item
                        }
                      }))
                    }
                  })
                } className="btn_cancel btn_edit bord_radius3">{translate('CHANGE')}</button>
              </div>
            )
          }} />
        </div>
      </React.Fragment>
    )
  }
}

Roles.contextTypes = {
  t: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal: show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Roles);