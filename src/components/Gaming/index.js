import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Options from '../OptionContainer'
import Header from '../Header'
import './index.css'

const DataStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
class Gaming extends Component {
  state = {
    dataStatus: DataStatus.loading,
    gamingData: '',
  }

  componentDidMount() {
    this.fetchingData()
  }

  fetchingData = async () => {
    this.setState({dataStatus: DataStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const method = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchedData = await fetch(apiUrl, method)
    const parsedData = await fetchedData.json()
    if (fetchedData.ok) {
      const updatedData = parsedData.videos.map(gamingItem => ({
        id: gamingItem.id,
        title: gamingItem.title,
        thumbnailUrl: gamingItem.thumbnail_url,
        viewCount: gamingItem.view_count,
      }))
      this.setState({dataStatus: DataStatus.success, gamingData: updatedData})
    } else {
      this.setState({dataStatus: DataStatus.failure})
    }
  }

  retryFun = () => {
    this.fetchingData()
  }

  loadingFunction = () => (
    <div className="loadingContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  failureFunction = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1 className="failureHead">Oops! Something Went Wrong</h1>
      <p className="failurePara">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button type="button" className="failureBut" onClick={this.retryFun}>
        Retry
      </button>
    </div>
  )

  successFunction = () => {
    const {gamingData} = this.state
    return (
      <ul className="gamingDisplayContainer">
        {gamingData.map(displayItem => (
          <Link
            to={`/videos/${displayItem.id}`}
            key={displayItem.id}
            className="linkItem"
          >
            <li className="gamingIconContainer">
              <img
                src={displayItem.thumbnailUrl}
                alt="video thumbnail"
                className="displayImg"
              />
              <p className="displayTitle">{displayItem.title}</p>
              <p className="displayPara">
                {displayItem.viewCount} Watching WorldWide
              </p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  switchFunction = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case DataStatus.loading:
        return this.loadingFunction()
      case DataStatus.failure:
        return this.failureFunction()
      case DataStatus.success:
        return this.successFunction()
      default:
        return this.loadingFunction()
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="gamingContainer">
          <Options />
          <div className="gamingVideosDisplay">
            <div className="gamingHeadContainer">
              <SiYoutubegaming size="60" className="gamingDisplayIcon" />
              <h1 className="gamingHeadIcon">Gaming</h1>
            </div>
            {this.switchFunction()}
          </div>
        </div>
      </div>
    )
  }
}

export default Gaming
