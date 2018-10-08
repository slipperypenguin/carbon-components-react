import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export default class Loading extends React.Component {
  static propTypes = {
    /**
     * Specify whether you want the loading indicator to be spinning or not
     */
    active: PropTypes.bool,

    /**
     * Provide an optional className to be applied to the containing node
     */
    className: PropTypes.string,

    /**
     * Specify whether you want the loader to be applied with an overlay
     */
    withOverlay: PropTypes.bool,

    /**
     * Specify whether you would like the small variant of <Loading>
     */
    small: PropTypes.bool,
  };

  static defaultProps = {
    active: true,
    withOverlay: true,
    small: false,
  };

  render() {
    const { active, className, withOverlay, small, ...other } = this.props;

    const loadingClasses = classNames('bx--loading', className, {
      'bx--loading--small': small,
      'bx--loading--stop': !active,
    });

    const overlayClasses = classNames('bx--loading-overlay', {
      'bx--loading-overlay--stop': !active,
    });

    const loading = (
      <div
        {...other}
        aria-live={active ? 'assertive' : 'off'}
        className={loadingClasses}>
        <svg className="bx--loading__svg" viewBox="-75 -75 150 150">
          <circle cx="0" cy="0" r="37.5" />
        </svg>
      </div>
    );

    return withOverlay ? (
      <div className={overlayClasses}>{loading}</div>
    ) : (
      loading
    );
  }
}
