import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import _ from 'lodash'
import * as actions from '../../../actions'
import SearchInput, { createFilter } from 'react-search-input'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      moreOpen: false
    }
  }


  render() {
    const translate = this.context.t
    const { open, moreOpen } = this.state
    const { searchField, handlerSearchField, handlerSearchText, searchText } = this.props
    return (
      <div className="fr">
        <div className="header_search-area font0">
          <div className={`header_search-block font10 clearfix ${moreOpen ? 'open' : ''}`}>
            <div className="search_hide-block">
              <div className={`header_search-btn-block tc fr ${open ? 'active' : ''}`}>
                <button className="header_search-btn" onClick={() => this.setState({ open: !this.state.open, moreOpen: false })}>
                  <span className="kaz_icons search_icon"></span>
                </button>
              </div>
              <div className="header_search-type fr">
                <SearchInput onChange={handlerSearchText} throttle={500} placeholder={translate('ENTER_VALUE')} />
                <span className="header_search-select" onClick={() => this.setState({ moreOpen: !this.state.moreOpen })}></span>
              </div>
            </div>
            {moreOpen && <div className="header_search-filter-area" >
              <div className="header_search-filter active">
                <p>
                  <span>{translate('ON_THE_FIELD')}</span>
                </p>
                <div className="header_search-filter-settings">
                  <div className="search-filter-settings-block clearfix">
                    <div className="radiobtn_block">
                      <input id="chkT_1" name="searchField" checked={searchField === 'FIO'} onChange={(e) => handlerSearchField(e.target.value)} type="radio" value="FIO" />
                      <label htmlFor="chkT_1">{translate('FULL_NAME')}</label>
                    </div>
                    <div className="radiobtn_block">
                      <input id="chkT_2" name="searchField" checked={searchField === 'login'} onChange={(e) => handlerSearchField(e.target.value)} type="radio" value="login" />
                      <label htmlFor="chkT_2">{translate('LOGIN')}</label>
                    </div>
                    <div className="radiobtn_block">
                      <input id="chkT_3" name="searchField" checked={searchField === 'email'} onChange={(e) => handlerSearchField(e.target.value)} type="radio" value="email" />
                      <label htmlFor="chkT_3">{translate('EMAIL')}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    )
  }
}

Search.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    searchField: state.users.searchField,
    searchText: state.users.searchText
    // users: state.users.users,
    // error: state.users.error,
    // page: state.users.page,
    // count: state.users.count,
    // accountSelected: state.users.accountSelected,
    // accounts: state.users.accounts
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  handlerSearchField: actions.users.handlerSearchField,
  handlerSearchText: actions.users.handlerSearchText
  // nextPage: actions.users.nextPage,
  // prevPage: actions.users.prevPage,
  // selectedAccount: actions.users.selectedAccount,
  // allAccounts: actions.users.allAccounts,
  // cleanState: actions.users.cleanState,
  // showModal: show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Search);