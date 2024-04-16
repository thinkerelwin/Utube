import React, { useState } from 'react';
import './VideoInfoBox.scss';
import PropTypes from 'prop-types';
import { Image, Button, Divider } from 'semantic-ui-react';
import Linkify from 'react-linkify';
import { getPublishedAtDateString } from '../../services/date/date-format';
import { getShortNumberString } from '../../services/number/number-format';

export function VideoInfoBox(props) {
  const [collapsed, setCollapsed] = useState(true);

  if (!props.video || !props.channel) {
    return <div />;
  }

  const descriptionParagraphs = getDescriptionParagraphs();
  const { descriptionTextClass, buttonTitle } = getConfig();
  const publishedAtString = getPublishedAtDateString(
    props.video.snippet.publishedAt,
  );

  const onToggleCollapseButtonClick = () => {
    setCollapsed(!collapsed);
  };

  function getDescriptionParagraphs() {
    const videoDescription = props.video.snippet
      ? props.video.snippet.description
      : null;
    if (!videoDescription) {
      return null;
    }
    return videoDescription.split('\n').map((paragraph, index) => (
      <p key={index}>
        <Linkify>{paragraph}</Linkify>
      </p>
    ));
  }

  function getConfig() {
    const descriptionTextClass = collapsed ? 'collapsed' : 'expanded';
    let buttonTitle = collapsed ? 'Show More' : 'Show Less';
    return {
      descriptionTextClass,
      buttonTitle,
    };
  }

  function getSubscriberButtonText() {
    const parsedSubscriberCount = Number(
      props.channel.statistics.subscriberCount,
    );
    const subscriberCount = getShortNumberString(parsedSubscriberCount);
    return `Subscribe ${subscriberCount}`;
  }

  const buttonText = getSubscriberButtonText();
  const channelThumbnail = props.channel.snippet.thumbnails.medium.url;
  const channelTitle = props.channel.snippet.title;

  return (
    <>
      <div className="video-info-box">
        <Image className="channel-image" src={channelThumbnail} circular />
        <div className="video-info">
          <div className="channel-name">{channelTitle}</div>
          <div className="video-publication-date">{publishedAtString}</div>
        </div>
        <Button color="youtube">{buttonText}</Button>
        <div className="video-description">
          <div className={descriptionTextClass}>{descriptionParagraphs}</div>
          <Button
            className="description-toggle"
            compact
            onClick={onToggleCollapseButtonClick}
          >
            {buttonTitle}
          </Button>
        </div>
      </div>
      <Divider />
    </>
  );
}

VideoInfoBox.propTypes = {
  video: PropTypes.object,
  channel: PropTypes.object,
};
