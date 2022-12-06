import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import ReactPlayer from 'react-player'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Options from '../OptionContainer'
import {ParaItem} from './styledComponents'
import Header from '../Header'
import './index.css'

const DataStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
class VideoDetails extends Component {
  state = {
    channelData: '',
    channelStatus: DataStatus.loading,
    active: '',
    saved: false,
  }

  componentDidMount() {
    this.dataExtraction()
  }

  onSaved = () => {
    this.setState(prevState => ({saved: !prevState.saved}))
  }

  onLike = () => {
    this.setState({active: 'Like'})
  }

  onDisLike = () => {
    this.setState({active: 'DisLike'})
  }

  dataExtraction = async () => {
    this.setState({channelStatus: DataStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchData = await fetch(url, options)
    const data = await fetchData.json()
    const videoDetails = data.video_details
    if (fetchData.ok) {
      const convertedData = {
        id: videoDetails.id,
        description: videoDetails.description,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        videoUrl: videoDetails.video_url,
        title: videoDetails.title,
        viewCount: videoDetails.view_count,
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
      }
      this.setState({
        channelData: convertedData,
        channelStatus: DataStatus.success,
      })
    } else {
      this.setState({channelStatus: DataStatus.failure})
    }
  }

  retryFun = () => {
    this.dataExtraction()
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
    const {channelData, active, saved} = this.state
    const {
      description,
      publishedAt,
      title,
      videoUrl,
      viewCount,
      channel,
    } = channelData
    return (
      <div>
        <ReactPlayer url={videoUrl} height="45vh" width="80vw" />

        <p className="videoTitle">{title}</p>
        <div className="videoViewMainContainer">
          <div className="videoViewContainer">
            <p className="videoView">{viewCount} views</p>
            <p className="videoView">.</p>
            <p className="videoView"> {publishedAt} views</p>
          </div>
          <div className="videoViewContainer">
            <ParaItem
              type="button"
              className="videoViewContainer"
              onClick={this.onLike}
              activeicon={active === 'Like'}
            >
              <AiOutlineLike />
              <p className="videoView">Like</p>
            </ParaItem>
            <ParaItem
              type="button"
              className="videoViewContainer"
              onClick={this.onDisLike}
              activeicon={active === 'DisLike'}
            >
              <AiOutlineDislike />
              <p className="videoView" activeIcon={active}>
                DisLike
              </p>
            </ParaItem>
            <ParaItem
              type="button"
              className="videoViewContainer"
              activeicon={saved}
              onClick={this.onSaved}
            >
              <MdPlaylistAdd />
              {saved ? (
                <p className="videoView">Saved</p>
              ) : (
                <p className="videoView">Save</p>
              )}
            </ParaItem>
          </div>
        </div>
        <hr />
        <div className="channelContainer">
          <img
            src={channel.profileImageUrl}
            alt="channel logo"
            className="channelLogo"
          />
          <div className="channelNameContainer">
            <p className="videoView">{channel.name}</p>
            <p className="channelSub">{channel.subscriberCount}</p>
          </div>
        </div>
        <p className="des">{description}</p>
      </div>
    )
  }

  switchFunction = () => {
    const {channelStatus} = this.state
    switch (channelStatus) {
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
        <div className="optionsContainer">
          <Options />
          {this.switchFunction()}
        </div>
      </div>
    )
  }
}

export default VideoDetails
