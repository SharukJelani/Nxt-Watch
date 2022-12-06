import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {LoginButton} from './styledComponents'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    checked: true,
    displayError: false,
    msg: '',
  }

  changeUsernameFunction = event => {
    this.setState({username: event.target.value})
  }

  changePasswordFunction = event => {
    this.setState({password: event.target.value})
  }

  checkBoxFunction = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }))
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onFailure = error => {
    this.setState({displayError: true, msg: error})
  }

  loginFunction = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const URL = ' https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(URL, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, checked, displayError, msg} = this.state
    const typeofPassword = checked ? 'password' : 'text'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginContainer">
        <div className="loginBox">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="logoImg"
          />
          <form className="formContainer">
            <label htmlFor="username" className="labelName">
              USERNAME
            </label>
            <input
              type="text"
              className="inputContainer"
              placeholder="Username"
              value={username}
              onChange={this.changeUsernameFunction}
              id="username"
            />
            <label htmlFor="password" className="labelName">
              PASSWORD
            </label>
            <input
              type={typeofPassword}
              className="inputContainer"
              onChange={this.changePasswordFunction}
              value={password}
              placeholder="Password"
              id="password"
            />
            <div className="showPasswordContainer">
              <input
                type="checkBox"
                id="ShowPassword"
                onClick={this.checkBoxFunction}
              />
              <label htmlFor="ShowPassword" className="sName">
                Show Password
              </label>
            </div>
            <LoginButton type="submit" onClick={this.loginFunction}>
              Login
            </LoginButton>
            <p className="errorDisplay">{displayError && `*${msg}`}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
