import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import '../App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Questions from './Questions';
import NewQuestion from './NewQuestion';
import QuestionAdded from './QuestionAdded';
import Leaderboard from './Leaderboard';
import WrongPath from './WrongPath';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B3E5FC',
      main: '#03A9F4',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#FF9800',
      main: '#FF9800',
      dark: '#F57C00',
      contrastText: '#FFFFFF'
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'roboto',
    fontSize: 12,
    htmlFontSize: 10
  },
  overrides: {
    MuiAppBar: {
      root: {
        color: '#FFFFFF'
      }
    }
  }
})

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <LoadingBar />
          <Navbar />
          { 
            !authedUser 
            
            ? <Switch>
                <Route component={Login} />
              </Switch>
            : <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/add' component={NewQuestion} />
                <Route exact path='/added' component={QuestionAdded} />
                <Route exact path='/leaderboard' component={Leaderboard} />
                <Route path='/questions/:question_id' component={Questions} />
                <Route component={WrongPath} />
              </Switch>
          }
        </MuiThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = state => (
  {
    authedUser: state.authedUser
  }
)

export default connect(mapStateToProps)(App);
