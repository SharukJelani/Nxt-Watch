import {Component} from 'react'
import {IoIosClose} from 'react-icons/io'
import './index.css'

class Subscription extends Component {
  state = {display: true}

  changeDisplay = () => {
    this.setState({display: false})
  }

  render() {
    const {display} = this.state
    return (
      <div>
        {display && (
          <div className="backgroundImg" data-testid="banner">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
                className="SLogo"
              />
              <p className="logoHead">
                Buy Nxt Watch Premium prepaid plans with UPI
              </p>
              <button className="logoBut" type="button">
                GET IT NOW
              </button>
            </div>
            <button type="button" data-testid="close">
              <IoIosClose
                size="35"
                className="closeIcon"
                onClick={this.changeDisplay}
              />
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Subscription
