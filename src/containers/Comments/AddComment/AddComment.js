import React from 'react';
import './AddComment.scss';
import { Form, Image, TextArea } from 'semantic-ui-react';

export function AddComment() {
  return (
    <div className="add-comment">
      <Image
        className="user-image"
        src="https://via.placeholder.com/48x48"
        circular
      />
      <Form>
        <Form.TextArea
          control={TextArea}
          // autoHeight //check https://www.npmjs.com/package/react-textarea-autosize if require this feature
          placeholder="Add a public comment"
        />
      </Form>
    </div>
  );
}
