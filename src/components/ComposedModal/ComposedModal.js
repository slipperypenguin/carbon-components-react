import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { iconClose } from 'carbon-icons';
import Button from '../Button';
import Icon from '../Icon';
import classNames from 'classnames';

export default class ComposedModal extends Component {
  state = {};

  static defaultProps = {
    onKeyDown: () => {},
  };

  static propTypes = {
    /**
     * Specify an optional className to be applied to the modal root node
     */
    className: PropTypes.string,

    /**
     * Specify an optional className to be applied to the modal node
     */
    containerClassName: PropTypes.string,

    /**
     * Specify an optional handler for the `onKeyDown` event. Called for all
     * `onKeyDown` events that do not close the modal
     */
    onKeyDown: PropTypes.func,
  };

  handleKeyDown = evt => {
    if (evt.which === 27) {
      this.closeModal();
    }

    this.props.onKeyDown(evt);
  };

  componentDidMount() {
    if (this.modal) {
      this.modal.focus();
    }
  }

  static getDerivedStateFromProps({ open }, state) {
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          open,
          prevOpen: open,
        };
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { open } = this.state;
    const { className, containerClassName, children, ...other } = this.props;

    const modalClass = classNames({
      'bx--modal': true,
      'is-visible': open,
      [className]: className,
    });

    const containerClass = classNames({
      'bx--modal-container': true,
      [containerClassName]: containerClassName,
    });

    const childrenWithProps = React.Children.toArray(children).map(child => {
      if (child.type === ModalHeader || child.type === ModalFooter) {
        return React.cloneElement(child, {
          closeModal: this.closeModal,
        });
      }

      return child;
    });

    return (
      <div
        {...other}
        role="presentation"
        ref={modal => (this.modal = modal)}
        onKeyDown={this.handleKeyDown}
        className={modalClass}
        tabIndex={-1}>
        <div className={containerClass}>{childrenWithProps}</div>
      </div>
    );
  }
}

export class ModalHeader extends Component {
  static propTypes = {
    /**
     * Specify an optional className to be applied to the modal header
     */
    className: PropTypes.string,

    /**
     * Specify an optional className to be applied to the modal header label
     */
    labelClassName: PropTypes.string,

    /**
     * Specify an optional className to be applied to the modal heading
     */
    titleClassName: PropTypes.string,

    /**
     * Specify an optional className to be applied to the modal close node
     */
    closeClassName: PropTypes.string,

    /**
     * Specify an optional className to be applied to the modal close icon node
     */
    closeIconClassName: PropTypes.string,

    /**
     * Specify an optional label to be displayed
     */
    label: PropTypes.string,

    /**
     * Specify an optional title to be displayed
     */
    title: PropTypes.string,

    /**
     * Specify the content to be placed in the ModalHeader
     */
    children: PropTypes.node,

    /**
     * Specify a description for the close icon that can be read by screen
     * readers
     */
    iconDescription: PropTypes.string,

    /**
     * Provide an optional function to be called when the modal is closed
     */
    closeModal: PropTypes.func,

    /**
     * Provide an optional function to be called when the close button is
     * clicked
     */
    buttonOnClick: PropTypes.func,
  };

  static defaultProps = {
    iconDescription: 'Close the modal',
    buttonOnClick: () => {},
  };

  handleCloseButtonClick = () => {
    this.props.closeModal();
    this.props.buttonOnClick();
  };

  render() {
    const {
      className,
      labelClassName,
      titleClassName,
      closeClassName,
      closeIconClassName,
      label,
      title,
      children,
      iconDescription,
      closeModal, // eslint-disable-line
      buttonOnClick, // eslint-disable-line
      ...other
    } = this.props;

    const headerClass = classNames({
      'bx--modal-header': true,
      [className]: className,
    });

    const labelClass = classNames({
      'bx--modal-header__label bx--type-delta': true,
      [labelClassName]: labelClassName,
    });

    const titleClass = classNames({
      'bx--modal-header__heading bx--type-beta': true,
      [titleClassName]: titleClassName,
    });

    const closeClass = classNames({
      'bx--modal-close': true,
      [closeClassName]: closeClassName,
    });

    const closeIconClass = classNames({
      'bx--modal-close__icon': true,
      [closeIconClassName]: closeIconClassName,
    });

    return (
      <div className={headerClass} {...other}>
        {label && <p className={labelClass}>{label}</p>}

        {title && <p className={titleClass}>{title}</p>}

        {children}

        <button
          onClick={this.handleCloseButtonClick}
          className={closeClass}
          type="button">
          <Icon
            icon={iconClose}
            className={closeIconClass}
            description={iconDescription}
          />
        </button>
      </div>
    );
  }
}

export class ModalBody extends Component {
  static propTypes = {
    /**
     * Specify an optional className to be added to the Modal Body node
     */
    className: PropTypes.string,
  };

  render() {
    const { className, children, ...other } = this.props;

    const contentClass = classNames({
      'bx--modal-content': true,
      [className]: className,
    });

    return (
      <div className={contentClass} {...other}>
        {children}
      </div>
    );
  }
}

export class ModalFooter extends Component {
  static propTypes = {
    /**
     * Specify a custom className to be applied to the Modal Footer container
     */
    className: PropTypes.string,

    /**
     * Specify a custom className to be applied to the primary button
     */
    primaryClassName: PropTypes.string,

    /**
     * Specify the text for the primary button
     */
    primaryButtonText: PropTypes.string,

    /**
     * Specify whether the primary button should be disabled
     */
    primaryButtonDisabled: PropTypes.bool,

    /**
     * Specify a custom className to be applied to the secondary button
     */
    secondaryClassName: PropTypes.string,

    /**
     * Specify the text for the secondary button
     */
    secondaryButtonText: PropTypes.string,

    /**
     * Specify an optional function for when the modal is requesting to be
     * closed
     */
    onRequestClose: PropTypes.func,

    /**
     * Specify an optional function for when the modal is requesting to be
     * submitted
     */
    onRequestSubmit: PropTypes.func,

    /**
     * Specify an optional function that is called whenever the modal is closed
     */
    closeModal: PropTypes.func,

    /**
     * Pass in content that will be rendered in the Modal Footer
     */
    children: PropTypes.node,
  };

  static defaultProps = {
    onRequestClose: () => {},
    onRequestSubmit: () => {},
  };

  handleRequestClose = evt => {
    this.props.closeModal();
    this.props.onRequestClose(evt);
  };

  render() {
    const {
      className,
      primaryClassName,
      secondaryClassName,
      secondaryButtonText,
      primaryButtonText,
      primaryButtonDisabled,
      closeModal, // eslint-disable-line
      onRequestClose, // eslint-disable-line
      onRequestSubmit, // eslint-disable-line
      children,
      ...other
    } = this.props;

    const footerClass = classNames({
      'bx--modal-footer': true,
      [className]: className,
    });

    const primaryClass = classNames({
      [primaryClassName]: primaryClassName,
    });

    const secondaryClass = classNames({
      [secondaryClassName]: secondaryClassName,
    });

    return (
      <div className={footerClass} {...other}>
        {secondaryButtonText && (
          <Button
            className={secondaryClass}
            onClick={this.handleRequestClose}
            kind="secondary">
            {secondaryButtonText}
          </Button>
        )}

        {primaryButtonText && (
          <Button
            onClick={onRequestSubmit}
            className={primaryClass}
            disabled={primaryButtonDisabled}
            kind="primary">
            {primaryButtonText}
          </Button>
        )}

        {children}
      </div>
    );
  }
}
