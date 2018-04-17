import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import PropTypes from 'prop-types'


class NavbarLink extends Component {
  
  render() {
    const { label, to, activeOnlyWhenExact, open, fa, classLink, subMenu } = this.props
    const translate = this.context.t
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
          to !== undefined ? (
            <Link to={to}>
              <div className={`lefbar_nav_itm${match ? " active" : ""}`}>
                <span className={`lefbar_nav_itm_name${open ? ' fix-sub-menu' : ''}`}>{label}</span>
                <i className={`fa${fa !== undefined ? ` ${fa}` : ''}`} >
                  {classLink !== null && <span className={` ${classLink}`}></span>}
                </i>
                {
                  subMenu.length > 0 && (
                    < div class="lefbar_nav_itm-sub">
                      {_.filter(subMenu, { show: true }).map(item => {
                        return (
                          <NavbarLink to={item.link}
                            key={item.title}
                            activeOnlyWhenExact={true}
                            label={translate(item.title)}
                            open={open}
                            fa={item.fa}
                            subMenu={item.subMenu || []}
                            classLink={item.class}
                          />
                        )
                      })}
                    </div>
                  )
                }
              </div>
            </Link >
          ) : (
              <div className={`lefbar_nav_itm`}>
                <span className={`lefbar_nav_itm_name${open ? ' fix-sub-menu' : ''}`}>{label}</span>
                <i className={`fa${fa !== undefined ? ` ${fa}` : ''}`} >
                  {classLink !== null && <span className={`${classLink}`}></span>}
                </i>
                {
                  subMenu.length > 0 && (
                    < div className="lefbar_nav_itm-sub">
                      {_.filter(subMenu, { show: true }).map(item => {
                        return (
                          <NavbarLink to={item.link}
                            key={item.title}
                            activeOnlyWhenExact={true}
                            label={translate(item.title)}
                            open={open}
                            fa={item.fa}
                            subMenu={item.subMenu || []}
                            classLink={item.class}
                          />
                        )
                      })}
                    </div>
                  )
                }
              </div>
            )
        )}
      />
    )
  }
}

NavbarLink.contextTypes = {
  t: PropTypes.func.isRequired
}


export default NavbarLink;
