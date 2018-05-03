import React, { Component } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'

class HeaderDropDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      page: 1
    }
  }

  handleClickOutside() {
    if (!this.state.open) return;
    this.setState({
      open: false
    })
  }

  toogle() {
    if (this.props.items.length === 1) return;
    this.setState({
      open: !this.state.open
    })
  }

  prev() {
    this.setState({
      page: this.state.page - 1
    })
  }

  next() {
    this.setState({
      page: this.state.page + 1
    })
  }

  render() {
    const { open } = this.state
    const { active, name, desc, items, icon, defaultTitle, updateActive, translate = false } = this.props
    return (
      <div className={'header_btn-area fl dropdown' + (open ? ' open' : '')} >
        <button onClick={() => this.toogle()} className={items.length === 1 ? 'no-items' : ''}>
          <span className={'kaz_icons ' + icon}></span>
          <span>
            {active === null ? (translate ? this.context.t(defaultTitle) : defaultTitle) : (translate ? this.context.t(active[name]) : active[name])}
          </span>
        </button>
        <div className="header_drop_menu clearfix" style={{ width: '300px' }}>
          <div className="header_drop-slide">
            <div className="header_drop_menu-column fl">
              {
                items.slice((this.state.page - 1) * 10, this.state.page * 10).map((item, key) => {
                  return (
                    <div className={'header_drop_menu-item' + ((active !== null && item.id === active.id) || item.id === active ? ' active' : '')
                    } key={key} onClick={() => {
                      updateActive(item)
                      this.toogle()
                    }
                    }>
                      <p>
                        <span>{translate ? this.context.t(item[name]) : item[name]}</span>
                        {desc !== null && <span>{item[desc]}</span>}
                      </p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          {
            items.length > 10 &&
            <p className="header_drop_menu-pagination clearfix">
              {
                this.state.page !== 1 ? (
                  <span style={{ display: 'block' }} onClick={() => this.prev()} className="fl">{(this.state.page - 2 === 0 ? '1' : ((this.state.page - 2) * 10 + 1)) + '...' + (this.state.page - 1) * 10}</span>
                ) : null
              }
              {
                (this.state.page + 1) * 10 < items.length ? (
                  <span style={{ display: 'block' }} onClick={() => this.next()} className="fr ss">{this.state.page * 10 + 1 + '...' + (this.state.page + 1) * 10}</span>
                ) : null
              }
              {
                (this.state.page + 1) * 10 >= items.length && this.state.page * 10 < items.length ? (
                  <span style={{ display: 'block' }} onClick={() => this.next()} className="fr">{this.state.page * 10 + 1 + '...' + items.length}</span>
                ) : null
              }
            </p>
          }
        </div>
      </div>
    );
  }
}

HeaderDropDown.contextTypes = {
  t: PropTypes.func.isRequired
}

export default enhanceWithClickOutside(HeaderDropDown);