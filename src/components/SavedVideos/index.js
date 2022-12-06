import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import Options from '../OptionContainer'
import './index.css'

const SavedVideos = () => {
  const noVideos = () => (
    <div className="noVideosContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="noVideosImg"
      />
      <h1>No saved videos found.</h1>
      <p className="noVideosPara">
        You can save your videos while watching them
      </p>
    </div>
  )

  return (
    <div>
      <Header />
      <div className="gamingContainer">
        <Options />
        <div className="gamingVideosDisplay">
          <div className="gamingHeadContainer">
            <HiFire size="60" className="gamingDisplayIcon" />
            <h1 className="gamingHeadIcon">Saved Videos</h1>
          </div>
          {noVideos()}
        </div>
      </div>
    </div>
  )
}

export default SavedVideos
