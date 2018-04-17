import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { COUNT_FILTER } from '../../constant/variables'

class Pagination extends Component {
  
  render() {
    const { page, width = null, count, next, prev, loading = false } = this.props
    const translate = this.context.t
    return (
      <div className="table_pagin-block" style={{ width }}>
        {page - 1 > 0 && <button disabled={loading} className="table_pagin-left" onClick={prev} type="button"></button>}
        <span className="table_pagin-pages">
          {page - 1 > 0 && <span>{(page - 1) * COUNT_FILTER + 1} - </span>}
          <span>{page * COUNT_FILTER > count ? count : page * COUNT_FILTER}</span>
          <span>{` ${translate('OF')} ${count}`}</span>
        </span>
        {page * COUNT_FILTER < count && <button disabled={loading} className="table_pagin-right" onClick={next} type="button"></button>}
      </div>
    )
  }
}

Pagination.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Pagination