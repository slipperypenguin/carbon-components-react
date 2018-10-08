import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

export const ProgressStep = ({ ...props }) => {
  const { label, description, className, current, complete } = props;

  const classes = classnames({
    'bx--progress-step': true,
    'bx--progress-step--current': current,
    'bx--progress-step--complete': complete,
    'bx--progress-step--incomplete': !complete && !current,
    [className]: className,
  });

  const currentSvg = current && (
    <svg>
      <circle cx="12" cy="12" r="12" />
      <circle cx="12" cy="12" r="6" />
      <title>{description}</title>
    </svg>
  );

  const completeSvg = complete && (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <title>{description}</title>
      <g fillRule="nonzero">
        <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
        <path d="M11.646 5.146l.708.708-5.604 5.603-3.104-3.103.708-.708 2.396 2.397z" />
      </g>
    </svg>
  );

  const incompleteSvg = !complete && (
    <svg>
      <title>{description}</title>
      <circle cx="12" cy="12" r="12" />
    </svg>
  );

  return (
    <li className={classes}>
      {currentSvg || completeSvg || incompleteSvg}
      <p className="bx--progress-label">{label}</p>
      <span className="bx--progress-line" />
    </li>
  );
};

ProgressStep.propTypes = {
  /**
   * Provide the label for the <ProgressStep>
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional className to be applied to the containing <li> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the step is the current step
   */
  current: PropTypes.bool,

  /**
   * Specify whether the step has been completed
   */
  complete: PropTypes.bool,

  /**
   * Provide a description for the <ProgressStep>
   */
  description: PropTypes.string,
};

export class ProgressIndicator extends Component {
  state = {};

  static propTypes = {
    /**
     * Provide <ProgressStep> components to be rendered in the
     * <ProgressIndicator>
     */
    children: PropTypes.node,

    /**
     * Provide an optional className to be applied to the containing node
     */
    className: PropTypes.string,

    /**
     * Optionally specify the current step array index
     */
    currentIndex: PropTypes.number,
  };

  static defaultProps = {
    currentIndex: 0,
  };

  static getDerivedStateFromProps({ currentIndex }, state) {
    const { prevCurrentIndex } = state;
    return prevCurrentIndex === currentIndex
      ? null
      : {
          currentIndex,
          prevCurrentIndex: currentIndex,
        };
  }

  renderSteps = () =>
    React.Children.map(this.props.children, (child, index) => {
      if (index === this.state.currentIndex) {
        return React.cloneElement(child, {
          current: true,
        });
      } else if (index < this.state.currentIndex) {
        return React.cloneElement(child, {
          complete: true,
        });
      } else if (index > this.state.currentIndex) {
        return React.cloneElement(child, {
          complete: false,
        });
      }
      return null;
    });

  render() {
    const { className, currentIndex, ...other } = this.props; // eslint-disable-line no-unused-vars
    const classes = classnames({
      'bx--progress': true,
      [className]: className,
    });
    return (
      <ul className={classes} {...other}>
        {this.renderSteps()}
      </ul>
    );
  }
}
