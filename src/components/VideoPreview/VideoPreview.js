import React from 'react';
import './VideoPreview.scss';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { getShortNumberString } from '../../services/number/number-format';
import { getVideoDurationString } from '../../services/date/date-format';
import classNames from 'classnames';

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

export function VideoPreview(props) {
  const { video } = props;
  if (!video) {
    return <div />;
  }
  const duration = video.contentDetails ? video.contentDetails.duration : null;
  const videoDuration = getVideoDurationString(duration);
  const viewAndTimeString = getFormattedViewAndTime(video);
  const description = props.expanded ? video.snippet.description : null;

  function videoPreviewClass() {
    return classNames('video-preview', {
      horizontal: props.horizontal,
      expanded: props.expanded
    });
  }

  function getFormattedViewAndTime(video) {
    const publicationDate = new Date(video.snippet.publishedAt);
    const viewCount = video.statistics ? video.statistics.viewCount : null;
    if (viewCount) {
      const viewCountShort = getShortNumberString(video.statistics.viewCount);
      return `${viewCountShort} views • ${timeAgo.format(publicationDate)}`;
    }
    return '';
  }

  return (
    <Link to={{ pathname: props.pathname, search: props.search }}>
      <div className={videoPreviewClass()}>
        <div className="image-container">
          <Image src={video.snippet.thumbnails.medium.url} />
          <div className="time-label">
            <span>{videoDuration}</span>
          </div>
        </div>

        <div className="video-info">
          <div
            className={classNames('semi-bold', 'show-max-two-lines', {
              expanded: props.expanded
            })}
          >
            {video.snippet.title}
          </div>
          <div className="video-preview-metadata-container">
            <div className="channel-title">{video.snippet.channelTitle}</div>
            <div>
              <div className="view-and-time">{viewAndTimeString}</div>
              <div className="show-max-two-lines">{description}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

VideoPreview.propTypes = {
  video: PropTypes.object,
  horizontal: PropTypes.bool,
  expanded: PropTypes.bool,
  pathname: PropTypes.string,
  search: PropTypes.string
};
