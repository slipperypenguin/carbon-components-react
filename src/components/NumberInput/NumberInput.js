import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from '../Icon';
import classNames from 'classnames';

export default class NumberInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconDescription: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    step: PropTypes.number,
    value: PropTypes.number,
    invalid: PropTypes.bool,
    invalidText: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    iconDescription: 'choose a number',
    label: ' ',
    onChange: () => {},
    onClick: () => {},
    step: 1,
    value: 0,
    invalid: false,
    invalidText: 'Provide invalidText',
  };

  constructor(props) {
    super(props);

    let value = props.value;
    if (props.min || props.min === 0) {
      value = Math.max(props.min, value);
    }

    this.state = {
      value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = evt => {
    if (!this.props.disabled) {
      this.setState(
        {
          value: Number(evt.target.value),
        },
        () => {
          this.props.onChange(this.state.value);
        }
      );
    }
  };

  handleArrowClick = (direction) => {
    let value =
      typeof this.state.value === 'string'
        ? Number(this.state.value)
        : this.state.value;
    const { disabled, min, max, step } = this.props;
    const conditional =
      direction === 'down'
        ? (min !== undefined && value > min) || min === undefined
        : (max !== undefined && value < max) || max === undefined;

    if (!disabled && conditional) {
      value = direction === 'down' ? value - step : value + step;

      this.setState(
        {
          value,
        },
        () => {
          this.props.onClick(value);
          this.props.onChange(value);
        }
      );
    }
  };

  render() {
    const {
      className,
      disabled,
      iconDescription, // eslint-disable-line
      id,
      label,
      max,
      min,
      step,
      invalid,
      invalidText,
      ...other
    } = this.props;

    const numberInputClasses = classNames('bx--number', className);

    const props = {
      disabled,
      id,
      max,
      min,
      step,
      onChange: this.handleChange,
      value: this.state.value,
    };

    const buttonProps = {
      disabled,
      type: 'button',
      className: 'bx--number__control-btn',
    };

    const inputWrapperProps = {};
    let error = null;
    if (invalid) {
      inputWrapperProps['data-invalid'] = true;
      error = <div className="bx--form-requirement">{invalidText}</div>;
    }

    return (
      <div className="bx--form-item">
        <label htmlFor={id} className="bx--label">
          {label}
        </label>
        <div className={numberInputClasses} {...inputWrapperProps}>
          <input type="number" pattern="[0-9]*" {...other} {...props} />
          <div className="bx--number__controls">
            <button
              {...buttonProps}
              onClick={() => this.handleArrowClick('up')}>
              <Icon
                className="up-icon"
                name="caret--up"
                description={this.props.iconDescription}
                viewBox="0 2 10 5"
              />
            </button>
            <button
              {...buttonProps}
              onClick={() => {
                this.handleArrowClick('down')}}>
              <Icon
                className="down-icon"
                name="caret--down"
                viewBox="0 2 10 5"
                description={this.props.iconDescription}
              />
            </button>
          </div>
        </div>
        {error}
      </div>
    );
  }
}
