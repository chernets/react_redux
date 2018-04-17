import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { groups } = this.props
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
                <button type="button" onClick={() => props.input.onChange([])} className="btn_cancel btn_edit bord_radius3">{translate('CHANGE')}</button>
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

export default Groups