import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {GrFormSearch} from 'react-icons/gr'
import Cookies from 'js-cookie'
import Options from '../OptionContainer'
import Subscription from '../Subscription'
import Header from '../Header'
import './index.css'

const DataStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
class Home extends Component {
  state = {
    dataStatus: DataStatus.initial,
    data: '',
    searchElement: '',
  }

  componentDidMount() {
    this.getData()
  }

  retryFun = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({dataStatus: DataStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {searchElement} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchElement}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updateData = fetchedData.videos.map(videoObj => ({
        id: videoObj.id,
        title: videoObj.title,
        thumbnailUrl: videoObj.thumbnail_url,
        viewCount: videoObj.view_count,
        publishedAt: videoObj.published_at,
        channel: {
          name: videoObj.channel.name,
          profileImageUrl: videoObj.channel.profile_image_url,
        },
      }))
      this.setState({data: updateData, dataStatus: DataStatus.success})
    } else {
      this.setState({dataStatus: DataStatus.failure})
    }
  }

  searchFunction = event => {
    this.setState({searchElement: event.target.value})
  }

  getSearch = () => {
    this.getData()
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
    const {data} = this.state
    if (data.length !== 0) {
      return (
        <ul className="resultsContainer">
          {data.map(item => (
            <Link to={`/videos/${item.id}`} key={item.id} className="linkCSS">
              <li className="resultsItemContainer">
                <img
                  src={item.thumbnailUrl}
                  alt="video thumbnail"
                  className="resultsImg"
                />
                <div className="channelContainer">
                  <img
                    src={item.channel.profileImageUrl}
                    alt="channel logo"
                    className="channelLogo"
                  />
                  <div>
                    <p className="channelHead">{item.title}</p>
                    <p className="channelTitle">{item.channel.name}</p>
                    <div className="titleContainer">
                      <p className="channelTitle">{item.viewCount}</p>
                      <p className="channelTitle">.</p>
                      <p className="channelTitle">{item.publishedAt}</p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )
    }
    return (
      <div className="searchFailureContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="searchFailureImg"
        />
        <h1 className="searchFailureHead">No Search results found</h1>
        <p className="searchFailurePara">
          Try different key words or remove search filter
        </p>
        <button type="button" className="searchRetry" onClick={this.getSearch}>
          Retry
        </button>
      </div>
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
      <>
        <Header />
        <div className="backgroundContainer">
          <Options />
          <div>
            <Subscription />
            <div className="ResultsContainer">
              <div className="searchContainer">
                <input
                  type="search"
                  className="searchItem"
                  placeholder="Search"
                  onChange={this.searchFunction}
                />
                <button
                  data-testid="searchButton"
                  type="button"
                  className="searchIconContainer"
                  onClick={this.getSearch}
                >
                  <GrFormSearch size="30" />
                </button>
              </div>
              {this.switchFunction()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
