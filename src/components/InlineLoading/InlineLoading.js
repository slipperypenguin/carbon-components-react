import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Loading from '../Loading';

export default class InlineLoading extends React.Component {
  static propTypes = {
    /**
     * Specify a custom className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether the load was successful
     */
    success: PropTypes.bool,

    /**
     * Specify the description for the inline loading text
     */
    description: PropTypes.string,

    /**
     * Provide an optional handler to be inovked when <InlineLoading> is
     * successful
     */
    onSuccess: PropTypes.func,

    /**
     * Provide a delay for the `setTimeout` for success
     */
    successDelay: PropTypes.number,
  };

  static defaultProps = {
    success: false,
    successDelay: 1500,
  };

  render() {
    const {
      className,
      success,
      description,
      onSuccess,
      successDelay,
      ...other
    } = this.props;

    const loadingClasses = classNames('bx--inline-loading', className);

    const getLoading = () => {
      if (success) {
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, successDelay);

        return (
          <svg
            className="bx--inline-loading__checkmark-container bx--inline-loading__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10">
            <polyline
              className="bx--inline-loading__checkmark"
              points="0.74 3.4 3.67 6.34 9.24 0.74"
            />
          </svg>
        );
      }

      return <Loading small withOverlay={false} />;
    };

    const loadingText = (
      <p className="bx--inline-loading__text">{description}</p>
    );

    return (
      <div className={loadingClasses} {...other}>
        <div className="bx--inline-loading__animation">{getLoading()}</div>
        {description && loadingText}
      </div>
    );
  }
}
