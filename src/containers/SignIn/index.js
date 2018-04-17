import React, { Component } from 'react'
import { Form, Field } from 'react-final-form'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setTranslations, setLanguage } from 'redux-i18n'
import PropTypes from 'prop-types'
import * as actions from '../../actions'
import Input from '../../components/FormComponents/Input'
import { LOGO } from '../../constant/images'
class SignIn extends Component {
  constructor(props) {
    super(props)
  }

  validateForm(values) {
    const errors = {};
    if (!values.email || values.email === '') {
      errors.email = this.context.t('REQUIRED_FOR_INPUT')
    }
    if (!values.password || values.password === '') {
      errors.password = this.context.t('REQUIRED_FOR_INPUT')
    }
    return errors
  }

  setlang = async (lang) => {
    try {
      const request = await fetch(`/assets/translate/${lang.value}.json`)
      const translates = await request.json()
      this.props.setTranslations(translates, lang.value)
      this.props.setLanguage(lang.value)
      localStorage.setItem('lang', lang.value)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    if (this.props.token !== null) {
      return <Redirect to={{
        pathname: '/',
      }} />
    }
    const { listLanguages, lang } = this.props
    const translate = this.context.t
    return (
      <div className="login-page-wrapper">
        <div className="login-header">
          <div className="r-main_cont-tab">
            <ul className="r_tab-name">
              {
                listLanguages.map((item) => {
                  return (
                    <li onClick={() => lang === item.value ? () => { } : this.setlang(item)} key={item.value} className={lang === item.value ? 'r_tab-name-active' : ''}>
                      <a>{item.name}</a>
                      <span className="r_tab-name-underline"></span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className="login-content-wrapper">
          <div className="login-content">
            <div className="login-auth tc">
              <div className="logo-area">
                <img className="almex-logo" src={LOGO} alt="almexecm" />
              </div>
              <Form
                validate={this.validateForm.bind(this)}
                initialValues={{
                  email: '',
                  password: ''
                }}
                onSubmit={submittedValues => {
                  this.props.loginRequest(submittedValues.email, submittedValues.password)
                }}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                  <form onSubmit={handleSubmit} className="form" noValidate>
                    <Field
                      name="email"
                      component={Input}
                      inputProps={{
                        placeholder: translate('LOGIN'),
                        type:"email"
                      }}
                    />
                    <Field
                      name="password"
                      component={Input}
                      inputProps={{
                        placeholder: translate('PASSWORD'),
                        type:"password"
                      }}
                    />
                    {this.props.error !== null && (
                      <div className="messages">{this.props.error.message}</div>
                    )}
                    <button type="submit" disabled={this.props.isFetching}>{translate('ENTER')}</button>
                  </form>
                )}
              />
            </div>
            <a className="underline" target="_blank" href="https://almexecm.com.ua/">{translate('NEED_HELP')}</a>
          </div>
        </div>
        <div className="login-footer">
          <p>&copy;{` AlmexECM ${new Date().getFullYear()}`}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    error: state.auth.error,
    isFetching: state.auth.isFetching,
    lang: state.i18nState.lang,
    listLanguages: state.i18nState.list
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loginRequest: actions.auth.loginRequest,
  setTranslations,
  setLanguage
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

SignIn.contextTypes = {
  t: PropTypes.func.isRequired
}