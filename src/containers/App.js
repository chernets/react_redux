import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/index.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom';



class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    const { children, asyncInitialState } = this.props;
    return [
        asyncInitialState.loading && (
          <div key="loading">loading</div>
        ),
        asyncInitialState.error !== null && (
          <div key="error">server error</div>
        ),
        asyncInitialState.error === null && !asyncInitialState.loading && children

      ];
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  asyncInitialState: state.asyncInitialState
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))