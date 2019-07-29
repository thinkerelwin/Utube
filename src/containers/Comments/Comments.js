import React from 'react';
import PropTypes from 'prop-types';
import { CommentsHeader } from './CommentsHeader/CommentsHeader';
import { AddComment } from './AddComment/AddComment';
import { Comment } from './Comment/Comment';

export function Comments(props) {
  if (!props.comments) {
    return <div />;
  }

  const comments = props.comments.map(comment => {
    return <Comment comment={comment} key={comment.id} />;
  });

  return (
    <div>
      <CommentsHeader amountComments={props.amountComments} />
      <AddComment key="add-comment" />
      {comments}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array,
  amountComments: PropTypes.string
};
