import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { userLogout, getUser, setView } from '../actions/userActions';

const styles = {
  navBar: {
    activeBgColor: '#00bfa5',
    unactiveBgColor: null,
  },
};

@connect((store) => {
  return {
    login: store.user.login,
    signup: store.user.signup,
    username: store.user.username,
    success: store.analyzer.success,
    waiting: store.analyzer.waiting,
    noSearchSoFar: store.analyzer.init,
    dashboardView: store.user.dashboardView,
    loginView: store.user.loginView,
    inputView: store.user.inputView,
    resultView: store.user.resultView,
    waitingView: store.user.waitingView,
    aboutView: store.user.aboutView,

  };
}) export default class Nav extends React.Component {
  static handleKeyEntry(e) {
    e.preventDefault();
  }

  componentWillMount() {
    this.props.dispatch(getUser());
  }

  handleLogoutClick() {
    this.props.dispatch(userLogout());
  }

  handleResultsClick() {
    this.props.dispatch(setView('SET_RESULT_VIEW'));
  }

  handleAboutClick() {
    this.props.dispatch(setView('SET_ABOUT_VIEW'));
  }

  handleAnalyzeClick() {
    this.props.dispatch(setView('SET_ANALYZE_VIEW'));
  }

  handleDashboardClick() {
    this.props.dispatch(setView('SET_DASHBOARD_VIEW'));
  }

  render() {
    return (
      <AppBar
        title={
          <span
            role="button"
            tabIndex="0"
            className="title"
            onClick={this.handleAnalyzeClick.bind(this)}
            onKeyUp={Nav.handleKeyEntry.bind(this)}
          >
                Pax Atlantica
          </span>
            }
        showMenuIconButton={false}
        iconElementRight={
          <div className="nav">
            <FlatButton
              label="Analyze"
              onClick={this.handleAnalyzeClick.bind(this)}
              backgroundColor={this.props.inputView ?
                                         styles.navBar.activeBgColor :
                                         styles.navBar.unactiveBgColor
                                        }
            />
            <FlatButton
              label="About"
              onClick={this.handleAboutClick.bind(this)}
              backgroundColor={this.props.aboutView ?
                                           styles.navBar.activeBgColor :
                                           styles.navBar.unactiveBgColor
                                          }
            />
            { !this.props.waiting && !this.props.noSearchSoFar &&
            <FlatButton
              label="Results"
              onClick={this.handleResultsClick.bind(this)}
              backgroundColor={this.props.resultView ?
                                               styles.navBar.activeBgColor :
                                               styles.navBar.unactiveBgColor
                                              }
            />
                            }
            { this.props.login ?
              <div>
                <FlatButton
                  label="Dashboard"
                  onClick={this.handleDashboardClick.bind(this)}
                  backgroundColor={this.props.dashboardView ?
                                                       styles.navBar.activeBgColor :
                                                       styles.navBar.unactiveBgColor
                                                      }
                />
                <FlatButton
                  label="Log Out"
                  onClick={this.handleLogoutClick.bind(this)}
                />
              </div>
                                :
              <FlatButton
                href="/auth/google"
                label="Log In"
              />
                                  }
          </div>
                }
      />
    );
  }
}
