import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../../actions'
import { Field } from 'react-final-form'

class Groups extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.groups, this.props.groups)
  }

  render() {
    const translate = this.context.t
    const { groups, userOrGroup } = this.props
    return (
      <React.Fragment>
        <div className="create_doc_modal-header decision">
          <span className="create_doc_modal-content-title-bold">{translate('GROUPS')}</span>
        </div>
        <div className="create_doc_modal-content decision clearfix">
          <div className="column_content column-big fl">
            <div className="role">
              {groups.map(group => {
                return (
                  <span className="sc-group" key={group.id}>{group.nameGroup}</span>
                )
              })}
            </div>
          </div>
          <Field name={`groups`} component={(props) => {
            return (
              <div className="column_content fr">
                <button type="button" onClick={() =>
                  this.props.showModalUsersOrGroup({
                    showUsers: false,
                    userOrGroupsSelected: groups,
                    userOrGroupsFixed: _.filter(groups, { fixed: true }).map(item => { return item.id }),
                    profileUserEdit: userOrGroup.id,
                    userDoNotHasGroups: true,
                    cb: (values) => {
                      props.input.onChange(values.map((item) => {
                        if (_.find(groups, { id: item.id }) !== undefined) {
                          return _.find(groups, { id: item.id })
                        }
                        return {
                          ...new UserOrGroup(item)
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

Groups.contextTypes = {
  t: PropTypes.func.isRequired
}



const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  showModalUsersOrGroup: actions.modals.changeUserOrGroups.showModal
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Groups);