import React, { useState } from 'react';
import './VideoInfoBox.scss';
import { Image, Button, Divider } from 'semantic-ui-react';

export function VideoInfoBox() {
  const [collapsed, setCollapsed] = useState(true);

  const onToggleCollapseButtonClick = () => {
    setCollapsed(!collapsed);
  };

  let descriptionTextClass = 'collapsed';
  let buttonTitle = 'Show More';
  if (!collapsed) {
    descriptionTextClass = 'expanded';
    buttonTitle = 'Show Less';
  }

  return (
    <>
      <div className="video-info-box">
        <Image
          className="channel-image"
          src="http://via.placeholder.com/48x48"
          circular
        />
        <div className="video-info">
          <div className="channel-name">Channel Name</div>
          <div className="video-publication-date">Thu 24, 2017</div>
        </div>
        <Button color="youtube">91.5K Subscribe</Button>
        <div className="video-description">
          <div className={descriptionTextClass}>
            {' '}
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <p>Paragraph 3</p>
            <p>Paragraph 4</p>
            <p>Paragraph 5</p>
          </div>
          <Button
            className="content-toggle"
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
