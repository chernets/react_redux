import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import _ from 'lodash'
import { LEFTBAR_LOGO } from '../../constant/images'
import NavbarLink from '../NavbarLink'
import { show } from 'redux-modal'
import { hasRole } from '../../utils/roles'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toogleMenu() {
    this.setState({
      open: !this.state.open
    })
  }

  getMenu() {
    return [
      {
        'title': 'HOME_PAGE',
        'link': '/',
        'show': true,
        'class': 'nav-icons dashboard'
      },
      {
        'title': 'DOCUMENTS',
        'link': '/documents',
        'show': true,
        'class': 'nav-icons docs'
      },
      {
        'title': 'REGISTERS',
        'link': '/registerDocuments',
        'show': hasRole('USER_REGISTRY_VIEW'),
        'class': 'nav-icons registers'
      },
      {
        'title': 'REPORTS',
        'link': '/report',
        'show': true,
        'class': 'nav-icons reports'
      },
      {
        'title': 'CALENDAR',
        'link': '/calendar',
        'show': true,
        'class': 'nav-icons calendars'
      },
      {
        'title': 'USERS',
        'link': '/users',
        'show': true,
        'class': 'nav-icons users'
      },
      {
        'title': 'ADMINISTRATION',
        'show': true,
        'class': 'nav-icons admin',
        'subMenu': [
          {
            'title': 'REGISTERS',
            'link': '/admin/registries',
            'show': hasRole('ADMIN_REGISTRY_UPDATE'),
            'class': 'nav-admin-icons registries'
          },
          {
            'title': 'FILE_STORAGES',
            'link': '/admin/filestorages',
            'show': hasRole('ADMIN_STORAGE_UPDATE'),
            'class': 'nav-admin-icons file-storage'
          },
          {
            'title': 'EXTERNAL_MODULES',
            'link': '/admin/externalmodule',
            'show': hasRole('ADMIN_EXTERNAL_MODULES_UPDATE'),
            'class': 'nav-admin-icons external-modules'
          },
          {
            'title': 'FIELDS',
            'link': '/admin/fields',
            'show': hasRole('ADMIN_FILTER_UPDATE'),
            'class': 'nav-admin-icons fields'
          },
          {
            'title': 'REPRESENRATION',
            'link': '/admin/represenration',
            'show': hasRole('ADMIN_FILTER_UPDATE'),
            'class': 'nav-admin-icons filters'
          },
          {
            'title': 'SESSIONS',
            'link': '/admin/sessions',
            'show': hasRole('ADMIN_SESSION_UPDATE'),
            'class': 'nav-admin-icons sessions'
          },
          {
            'title': 'USERS',
            'link': '/admin/users',
            'show': hasRole('ADMIN_USER_UPDATE'),
            'class': 'nav-admin-icons users'
          },
          {
            'title': 'KEYS_PAGE',
            'link': '/admin/publickeys',
            'show': hasRole('ADMIN_PUBLIC_KEY_UPDATE'),
            'class': 'nav-admin-icons keys'
          }
        ]

      }
    ]
  }

  render() {
    const { clientInfo } = this.props
    const translate = this.context.t
    const list = this.getMenu()
    return (
      <div className={`lefbar${this.state.open ? ' open' : ''}`} >
        <div className="lefbar_logo">
          <img className="lefbar_logo_img" src={LEFTBAR_LOGO} />
        </div>
        <a className="lefbar_nav_itm fa-bars-block">
          <i onClick={this.toogleMenu.bind(this)} className="fa fa-bars" aria-hidden="true" ></i>
        </a>
        <nav className="lefbar_nav">
          <div className="lefbar_nav_content" style={{ paddingRight: 0 }}>
            {_.filter(list, { show: true }).map(item => {
              return (
                <NavbarLink to={item.link}
                  key={item.title}
                  activeOnlyWhenExact={true}
                  label={translate(item.title)}
                  open={this.state.open}
                  fa={item.fa}
                  subMenu={item.subMenu || []}
                  classLink={item.class}
                />
              )
            })}
          </div>
        </nav>
        <div className="lefbar_profile">
          <div className="lefbar_profile_user">
            <div className="lefbar_profile_user_img">
              <img className="lefbar_profile_user_ava" src={clientInfo.getAvatar()} />
            </div>
            <div className="lefbar_profile_user_info">
              <p className="lefbar_profile_user_name">
                <span>{clientInfo.getFio()}</span>
              </p>
              <span className="lefbar_profile_user_position">{clientInfo.position}</span>
            </div>
            <div className="clear"></div>
          </div>
          <div className={`lefbar_profile_actions font0 ${(this.state.open && 'open-leftbar')}`}>
            <a className="font10">{translate('BLOCK')}</a>
            <a className="font10" onClick={() => this.props.showModal('profile', {
              userOrGroup: clientInfo,
              disabledEdit: false,
              closeModal: (result) => {
                console.log(result)
              }
            })}>{translate('MY_PROFILE')}</a>
            <a className="font10">{translate('LOGOUT')}</a>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    routing: state.routing,
    clientInfo: state.auth.clientInfo
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showModal: show
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


Navbar.contextTypes = {
  t: PropTypes.func.isRequired
}