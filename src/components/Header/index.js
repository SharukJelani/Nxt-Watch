import {Link, withRouter} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {BsSun} from 'react-icons/bs'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import ThemeContext from '../ThemeContext/index'
import {HeaderLogo, Logout} from './styledComponents'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {themeActive, changeTheme} = value
      const themeChange = () => {
        changeTheme()
      }
      const logOutFunction = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const LogoutBut = () => (
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <Logout active={themeActive} type="button">
                Logout
              </Logout>
            }
          >
            {close => (
              <>
                <div className="logoutPopContainer">
                  <p>Are your sure,you want logout?</p>

                  <div>
                    <button
                      type="button"
                      className="cancelBut"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="popLogoutBut"
                      onClick={logOutFunction}
                    >
                      logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </Popup>
        </div>
      )

      return (
        <HeaderLogo active={themeActive}>
          <Link to="/" className="linkItem">
            <img
              src={
                themeActive
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
              className="HomeLogo"
            />
          </Link>
          <div className="logoutContainer">
            <button
              type="button"
              className="theme"
              data-testid="theme"
              onClick={themeChange}
            >
              {!themeActive ? (
                <FaMoon size="30px" className="profile" />
              ) : (
                <BsSun size="30px" className="profile1" />
              )}
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
              alt="profile"
              className="profile"
            />
            <LogoutBut />
          </div>
        </HeaderLogo>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
