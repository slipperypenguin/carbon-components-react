import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import SearchFilterButton from '../SearchFilterButton';
import SearchLayoutButton from '../SearchLayoutButton';

export default class Search extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.string,
    small: PropTypes.bool,
    placeHolderText: PropTypes.string,
    labelText: PropTypes.node.isRequired,
    id: PropTypes.string,
    searchButtonLabelText: PropTypes.string,
    layoutButtonLabelText: PropTypes.string,
    closeButtonLabelText: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
    small: false,
    placeHolderText: '',
    onChange: () => {},
  };

  state = {
    hasContent: this.props.value || this.props.defaultValue || false,
  };

  clearInput = evt => {
    if (!this.props.value) {
      this.input.value = '';
      this.props.onChange(evt);
    } else {
      const clearedEvt = Object.assign({}, evt.target, {
        target: {
          value: '',
        },
      });
      this.props.onChange(clearedEvt);
    }

    this.setState({ hasContent: false }, () => this.input.focus());
  };

  handleChange = evt => {
    this.setState({
      hasContent: evt.target.value !== '',
    });

    this.props.onChange(evt);
  };

  render() {
    const {
      className,
      type,
      id = (this._inputId =
        this._inputId ||
        `search__input__id_${Math.random()
          .toString(36)
          .substr(2)}`),
      placeHolderText,
      labelText,
      searchButtonLabelText,
      layoutButtonLabelText,
      closeButtonLabelText,
      small,
      children,
      ...other
    } = this.props;

    const { hasContent } = this.state;

    const searchClasses = classNames({
      'bx--search bx--search-with-options': true,
      'bx--search--lg': !small,
      'bx--search--sm': small,
      [className]: className,
    });

    const clearClasses = classNames({
      'bx--search-close': true,
      'bx--search-close--hidden': !hasContent,
    });

    const renderButtons = !children && !small;

    return (
      <div className={searchClasses} role="search">
        <Icon
          name="search--glyph"
          description="search"
          className="bx--search-magnifier"
        />
        <label htmlFor={id} className="bx--label">
          {labelText}
        </label>
        <input
          {...other}
          type={type}
          className="bx--search-input"
          id={id}
          placeholder={placeHolderText}
          onChange={this.handleChange}
          ref={input => {
            this.input = input;
          }}
        />
        <button
          className={clearClasses}
          onClick={this.clearInput}
          type="button"
          aria-label={closeButtonLabelText}>
          <Icon name="close--glyph" description="close" />
        </button>
        {children}
        {renderButtons && (
          <SearchFilterButton labelText={searchButtonLabelText} />
        )}
        {renderButtons && (
          <SearchLayoutButton labelText={layoutButtonLabelText} />
        )}
      </div>
    );
  }
}
