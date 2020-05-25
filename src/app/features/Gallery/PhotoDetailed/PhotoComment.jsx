import React, { Component } from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import PhotoDetailedCommentForm from './PhotoDetailedCommentForm';

class PhotoComment extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null
  };

  handleOpenReplyForm = id => () => {
    this.setState({
      showReplyForm: true,
      selectedCommentId: id
    });
  };

  handleCloseReplyForm = () => {
    this.setState({
      selectedCommentId: null,
      showReplyForm: false
    });
  };

  render() {
    const { addPhotoComment, photoId, photoChat } = this.props;
    return (
      <div>
        <Segment
          textAlign='center'
          attached='top'
          inverted
          color='black'
          style={{ border: 'none' }}
        >
          <Header>Comments </Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {photoChat &&
              photoChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || '/assets/user.png'}
                  />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{formatDistance(comment.date, Date.now())} ago</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                    
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              ))}
          </Comment.Group>
          <PhotoDetailedCommentForm
            addPhotoComment={addPhotoComment}
            photoId={photoId}
            form={'newComment'}
          />
        </Segment>
      </div>
    );
  }
}

export default PhotoComment;