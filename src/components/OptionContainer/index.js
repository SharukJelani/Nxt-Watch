import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {HiFire} from 'react-icons/hi'
import {OptionContainer, OptionMainContainer} from './styledComponents'
import ThemeContext from '../ThemeContext'
import './index.css'

class Options extends Component {
  state = {
    activeOption: 'Home',
  }

  componentDidMount() {
    this.optionContainer()
  }

  changeHome = () => {
    this.setState({activeOption: 'Home'}, this.optionContainer)
  }

  changeTrending = () => {
    this.setState({activeOption: 'Trending'}, this.optionContainer)
  }

  changeGaming = () => {
    this.setState({activeOption: 'Gaming'}, this.optionContainer)
    this.optionContainer()
  }

  changeSaved = () => {
    this.setState({activeOption: 'Saved'}, this.optionContainer)
  }

  optionContainer = () => (
    <ThemeContext.Consumer>
      {value => {
        const {themeActive} = value
        const {activeOption} = this.state
        return (
          <OptionMainContainer active={themeActive}>
            <ul className="ulContainer">
              <Link to="/" className="linkItem" onClick={this.changeHome}>
                <li>
                  <OptionContainer
                    colorOption={activeOption === 'Home'}
                    active={themeActive}
                  >
                    <AiFillHome
                      color={`${activeOption === 'Home' ? '#ff0000' : 'black'}`}
                      size="25"
                    />
                    <h1 className="optionName">Home</h1>
                  </OptionContainer>
                </li>
              </Link>
              <Link to="/trending" className="linkItem">
                <li>
                  <OptionContainer
                    colorOption={activeOption === 'Trending'}
                    onClick={this.changeTrending}
                  >
                    <HiFire
                      size="25"
                      color={`${activeOption === 'Trending' ? 'red' : 'black'}`}
                    />
                    <h1 className="optionName">Trending</h1>
                  </OptionContainer>
                </li>
              </Link>
              <Link
                to="/gaming"
                className="linkItem"
                onClick={this.changeGaming}
              >
                <li>
                  <OptionContainer colorOption={activeOption === 'Gaming'}>
                    <SiYoutubegaming
                      color={`${activeOption === 'Gaming' ? 'red' : 'black'}`}
                      size="25"
                    />
                    <h1 className="optionName">Gaming</h1>
                  </OptionContainer>
                </li>
              </Link>
              <Link
                to="/saved-videos"
                className="linkItem"
                onClick={this.changeSaved}
              >
                <li>
                  <OptionContainer colcolorOptionor={activeOption === 'Saved'}>
                    <MdPlaylistAdd
                      color={`${activeOption === 'Saved' ? 'red' : 'black'}`}
                      size="25"
                    />
                    <h1 className="optionName">Saved videos</h1>
                  </OptionContainer>
                </li>
              </Link>
            </ul>
            <div className="contactContainer">
              <p className="contactHead">CONTACT US</p>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt=" facebook logo"
                  className="logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                  alt="  twitter logo"
                  className="logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt=" linked in logo"
                  className="logo"
                />
                <p className="contactPara">
                  Enjoy!Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          </OptionMainContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return <>{this.optionContainer()}</>
  }
}

export default Options
