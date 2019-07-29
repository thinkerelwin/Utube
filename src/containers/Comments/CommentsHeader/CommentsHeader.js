import React from 'react';
import './CommentsHeader.scss';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

export function CommentsHeader(props) {
  return (
    <div className="comments-header">
      <h4>{props.amountComments} Comments</h4>
      <Button basic compact icon labelPosition="left">
        <Icon name="align left" />
        Sort by
      </Button>
    </div>
  );
}
CommentsHeader.propTypes = {
  amountComments: PropTypes.string
};
