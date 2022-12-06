import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import OptionContainer from '../OptionContainer'
import './index.css'

const DataStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
const months = {
  Jan: '1',
  Feb: '2',
  Mar: '3',
  Apr: '4',
  May: '5',
  Jun: '6',
  Jul: '7',
  Aug: '8',
  Sep: '9',
  Oct: '10',
  Nov: '11',
  Dec: '12',
}
class Trending extends Component {
  state = {
    trendingStatus: DataStatus.initial,
    trendingData: '',
  }

  componentDidMount() {
    this.fetchingData()
  }

  fetchingData = async () => {
    this.setState({trendingStatus: DataStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const method = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchData = await fetch(apiUrl, method)
    const data = await fetchData.json()
    if (fetchData.ok) {
      const convertedData = data.videos.map(itemData => ({
        id: itemData.id,
        title: itemData.title,
        thumbnailUrl: itemData.thumbnail_url,
        viewCount: itemData.view_count,
        publishedAt: itemData.published_at,
        channel: {
          name: itemData.channel.name,
          profileImageUrl: itemData.channel.profile_image_url,
        },
      }))
      this.setState({
        trendingData: convertedData,
        trendingStatus: DataStatus.success,
      })
    } else {
      this.setState({trendingStatus: DataStatus.failure})
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
    const {trendingData} = this.state
    return (
      <ul className="ul">
        {trendingData.map(trendingItem => {
          const date = trendingItem.publishedAt.split(' ')
          const data1 = date[1].split(',')
          const convertedDate = formatDistanceToNow(
            new Date(date[2], months[date[0]], data1[0]),
          ).split(' ')
          const newDate =
            convertedDate.length === 3
              ? `${convertedDate[1]} years ago`
              : `${convertedDate[0]} months ago`

          return (
            <Link
              to={`/videos/${trendingItem.id}`}
              key={trendingItem.id}
              className="linkItem"
            >
              <div>
                <li className="liContainerTrending">
                  <img
                    src={trendingItem.thumbnailUrl}
                    alt="video thumbnail"
                    className="trendingImg"
                  />
                  <div className="div">
                    <p className="trendingHead">{trendingItem.title}</p>
                    <p className="channelName">{trendingItem.channel.name}</p>
                    <div className="views">
                      <p className="channelName">
                        {trendingItem.viewCount} Views
                      </p>
                      <p className="channelName">{newDate}</p>
                    </div>
                  </div>
                </li>
              </div>
            </Link>
          )
        })}
      </ul>
    )
  }

  switchFunction = () => {
    const {trendingStatus} = this.state
    switch (trendingStatus) {
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
        <div className="trendingMainContainer">
          <OptionContainer />
          <div className="TrendingVideosDisplay">
            <div className="trendingLogoContainer">
              <HiFire className="TrendingDisplayIcon" size="60" />
              <h1 className="TrendingHead">Trending </h1>
            </div>
            {this.switchFunction()}
          </div>
        </div>
      </div>
    )
  }
}

export default Trending
