import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

export default class Copy extends Component {
  static propTypes = {
    /**
     * Pass in content to be rendred in the underlying <button>
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the underlying <button>
     */
    className: PropTypes.string,

    /**
     * Specify the string that is displayed when the button is clicked and the
     * content is copied
     */
    feedback: PropTypes.string,

    /**
     * Specify the time it takes for the feedback message to timeout
     */
    feedbackTimeout: PropTypes.number,

    /**
     * Specify an optional `onClick` handler that is called when the underlying
     * <button> is clicked
     */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    feedback: 'Copied!',
    feedbackTimeout: 2000,
    onClick: () => {},
  };

  state = {
    showFeedback: false,
  };

  /* istanbul ignore next */
  componentWillUnmount() {
    if (typeof this.timeoutId !== 'undefined') {
      clearTimeout(this.timeoutId);
      delete this.timeoutId;
    }
  }

  handleClick = evt => {
    this.setState({ showFeedback: true });
    this.timeoutId = setTimeout(() => {
      this.setState({ showFeedback: false });
    }, this.props.feedbackTimeout);

    this.props.onClick(evt);
  }; // eslint-disable-line no-unused-vars

  render() {
    const {
      className,
      feedback,
      children,
      feedbackTimeout, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;
    const feedbackClassNames = classnames('bx--btn--copy__feedback', {
      'bx--btn--copy__feedback--displayed': this.state.showFeedback,
    });

    return (
      <button
        type="button"
        className={className}
        onClick={this.handleClick}
        {...other}>
        {children}
        <div className={feedbackClassNames} data-feedback={feedback} />
      </button>
    );
  }
}
