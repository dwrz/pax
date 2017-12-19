import React from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import { getArticleVoteData, vote } from '../actions/voteActions.js';

@connect((store) => {
  return {
    id: store.analyzer.id,
    downVote: store.vote.downVote,
    downVoteCount: store.vote.downVoteCount,
    login: store.user.login,
    upVote: store.vote.upVote,
    upVoteCount: store.vote.upVoteCount,
  };
}) export default class ResultsVote extends React.Component {
  componentDidMount() {
    this.props.dispatch(getArticleVoteData(this.props.id));
  }

  checkLogin() {
    if (this.props.login) { // User exists, and is not undefined or false.
      return true;
    } else {
      alert('Please log in to vote.');
      return false;
    }
  }

  handleKeyPress(e) {
    if (e.key === 'ArrowDown') {
      this.voteDown();
    } else if (e.key === 'ArrowUp') {
      this.voteUp();
    }
  }

  voteDown() {
    if (this.checkLogin()) {
      this.props.dispatch(downvote(this.props.id));
    }
  }

  voteUp() {
    if (this.checkLogin()) {
      this.props.dispatch(upvote(this.props.id));
    }
  }

  render() {
    return (
      <div className="arrows">
        <div className="arrowsContainer">
          <span
            role="button"
            tabIndex="0"
            className={this.props.upVote ? 'arrow arrowUpSelected' : 'arrow'}
            onClick={this.handleVote.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          >
            ↑
          </span>
          <Badge
            badgeContent={this.props.upVoteCount}
            primary
          />
        </div>
        <div className="arrowsContainer">
          <span
            role="button"
            tabIndex="0"
            className={this.props.downVote ? 'arrow arrowDownSelected' : 'arrow'}
            onClick={this.handleVote.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          >
            ↓
          </span>
          <Badge
            badgeContent={this.props.downVoteCount}
            secondary
          />
        </div>
      </div>
    );
  }
}
