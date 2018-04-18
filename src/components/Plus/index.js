import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
class Plus extends Component {

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props)
  }

  render() {
    const translate = this.context.t
    const { handlerClick, title = 'ADD_USER', meta } = this.props
    return (
      <div className="doc_img-block" onClick={handlerClick}>
        <div className="doc_img-area add_doc-area">
          <div className="add_doc">
            <span className="kaz_icons add_icon"></span>
          </div>
          <p>{translate(title)}</p>
        </div>
        {meta.error && meta.touched && meta.error}
      </div>
    )
  }
}

Plus.contextTypes = {
  t: PropTypes.func.isRequired
}

Plus.propTypes = {
  title: PropTypes.string.isRequired,
  handlerClick: PropTypes.func.isRequired
}

export default Plus