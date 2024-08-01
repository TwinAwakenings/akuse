import 'react-activity/dist/Dots.css';

import {
  faAngleLeft,
  faCompress,
  faExpand,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Hls from 'hls.js';
import { useState } from 'react';

import { ListAnimeData } from '../../../types/anilistAPITypes';
import { EpisodeInfo } from '../../../types/types';
import VideoEpisodesChange from './VideoEpisodesChange';
import VideoSettings from './VideoSettings';

interface TopControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  hls?: Hls;
  listAnimeData: ListAnimeData;
  episodesInfo?: EpisodeInfo[];
  episodeNumber: number;
  episodeTitle: string;
  showPreviousEpisodeButton: boolean;
  showNextEpisodeButton: boolean;
  fullscreen: boolean;
  onFullScreentoggle: () => void;
  onPiPToggle: () => void;
  onChangeEpisode: (
    episode: number | null,
    reloadAtPreviousTime?: boolean,
  ) => Promise<boolean>;
  onExit: () => void;
  onClick?: (event: any) => void;
  onDblClick?: (event: any) => void;
}

const TopControls: React.FC<TopControlsProps> = ({
  videoRef,
  hls,
  listAnimeData,
  episodesInfo,
  episodeNumber,
  episodeTitle,
  showPreviousEpisodeButton,
  showNextEpisodeButton,
  fullscreen,
  onFullScreentoggle,
  onPiPToggle,
  onChangeEpisode,
  onExit,
  onClick,
  onDblClick,
}) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showEpisodesChange, setShowEpisodesChange] = useState<boolean>(false);

  const closeOthers = () => {
    setShowSettings(false);
    setShowEpisodesChange(false);
    if (videoRef.current) videoRef.current.focus();
  };

  return (
    <div className="up-controls" onClick={onClick} onDoubleClick={onDblClick}>
      <div className="left">
        <div className="info exit-video" onClick={onExit}>
          <span className="title">{listAnimeData.media.title?.english}</span>
          <span className="back">
            <FontAwesomeIcon className="i" icon={faAngleLeft} />
            <span className="episode">
              <span>{`Ep. ${episodeNumber} - `}</span>
              {episodeTitle}
            </span>
          </span>
        </div>
      </div>
      <div className="center"></div>
      <div className="right">
        <VideoSettings
          show={showSettings}
          onShow={(show) => {
            closeOthers();
            setShowSettings(show);
          }}
          videoRef={videoRef}
          hls={hls}
          onChangeEpisode={onChangeEpisode}
        />
        <VideoEpisodesChange
          show={showEpisodesChange}
          onShow={(show) => {
            closeOthers();
            setShowEpisodesChange(show);
          }}
          listAnimeData={listAnimeData}
          episodeNumber={episodeNumber}
          episodesInfo={episodesInfo}
          showPreviousEpisodeButton={showPreviousEpisodeButton}
          showNextEpisodeButton={showNextEpisodeButton}
          onChangeEpisode={onChangeEpisode}
        />
        <button className="b-player" onClick={onPiPToggle}>
          <FontAwesomeIcon
            className="i"
            icon={faUpRightFromSquare}
          />
        </button>
        <button className="b-player fullscreen" onClick={onFullScreentoggle}>
          <FontAwesomeIcon
            className="i"
            icon={fullscreen ? faCompress : faExpand}
          />
        </button>
      </div>
    </div>
  );
};

export default TopControls;
