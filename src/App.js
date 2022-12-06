import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login/index'
import Trending from './components/Trending/index'
import Gaming from './components/Gaming/index'
import ProtectedRoute from './components/ProtectedRoute'
import SavedVideos from './components/SavedVideos'
import VideoDetails from './components/VideoDetails'
import ThemeContext from './components/ThemeContext/index'
import NotFound from './components/NotFound'
import Home from './components/Home'
import './App.css'

class App extends Component {
  state = {
    themeActive: false,
  }

  changeTheme = () => {
    this.setState(prevState => ({themeActive: !prevState.themeActive}))
  }

  render() {
    const {themeActive} = this.state
    return (
      <ThemeContext.Provider
        value={{themeActive, changeTheme: this.changeTheme}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}
export default App
