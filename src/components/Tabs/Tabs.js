import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { iconCaretDown } from 'carbon-icons';
import Icon from '../Icon';
import TabContent from '../TabContent';

export default class Tabs extends React.Component {
  static propTypes = {
    /**
     * Specify the text to be read by screen-readers when visiting the <Tabs>
     * component
     */
    ariaLabel: PropTypes.string,

    /**
     * Pass in a collection of <Tab> children to be rendered depending on the
     * currently selected tab
     */
    children: PropTypes.node,

    /**
     * Provide a className that is applied to the root <nav> component for the
     * <Tabs>
     */
    className: PropTypes.string,

    /**
     * Specify whether the Tab content is hidden
     */
    hidden: PropTypes.bool,

    /**
     * By default, this value is "navigation". You can also provide an alternate
     * role if it makes sense from the accessibility-side
     */
    role: PropTypes.string.isRequired,

    /**
     * Optionally provide an `onClick` handler that is invoked when a <Tab> is
     * clicked
     */
    onClick: PropTypes.func,

    /**
     * Optionally provide an `onKeyDown` handler that is invoked when keyed
     * navigation is triggered
     */
    onKeyDown: PropTypes.func,

    /**
     * Provide an optional handler that is called whenever the selection
     * changes. This method is called with the index of the tab that was
     * selected
     */
    onSelectionChange: PropTypes.func,

    /**
     * Provide a string that represents the `href` for the triggered <Tab>
     */
    triggerHref: PropTypes.string.isRequired,

    /**
     * Optionally provide an index for the currently selected <Tab>
     */
    selected: PropTypes.number,

    /**
     * Provide a description that is read out when a user visits the caret icon
     * for the dropdown menu of items
     */
    iconDescription: PropTypes.string.isRequired,
  };

  static defaultProps = {
    iconDescription: 'show menu options',
    role: 'navigation',
    triggerHref: '#',
    selected: 0,
    ariaLabel: 'listbox',
  };

  state = {
    dropdownHidden: true,
  };

  static getDerivedStateFromProps({ selected }, state) {
    const { prevSelected } = state;
    return prevSelected === selected
      ? null
      : {
          selected,
          prevSelected: selected,
        };
  }

  getTabs() {
    return React.Children.map(this.props.children, tab => tab);
  }

  getTabAt = index => {
    return (
      this[`tab${index}`] || React.Children.toArray(this.props.children)[index]
    );
  };

  setTabAt = (index, tabRef) => {
    this[`tab${index}`] = tabRef;
  };

  // following functions (handle*) are Props on Tab.js, see Tab.js for parameters
  handleTabClick = onSelectionChange => {
    return (index, label, evt) => {
      evt.preventDefault();
      this.selectTabAt(index, onSelectionChange);
      this.setState({
        dropdownHidden: true,
      });
    };
  };

  handleTabKeyDown = onSelectionChange => {
    return (index, label, evt) => {
      const key = evt.key || evt.which;

      if (key === 'Enter' || key === 13 || key === ' ' || key === 32) {
        this.selectTabAt(index, onSelectionChange);
        this.setState({
          dropdownHidden: true,
        });
      }
    };
  };

  handleTabAnchorFocus = onSelectionChange => {
    return index => {
      const tabCount = React.Children.count(this.props.children) - 1;
      let tabIndex = index;

      if (index < 0) {
        tabIndex = tabCount;
      } else if (index > tabCount) {
        tabIndex = 0;
      }

      const tab = this.getTabAt(tabIndex);

      if (tab) {
        this.selectTabAt(tabIndex, onSelectionChange);
        if (tab.tabAnchor) {
          tab.tabAnchor.focus();
        }
      }
    };
  };

  handleDropdownClick = () => {
    this.setState({
      dropdownHidden: !this.state.dropdownHidden,
    });
  };

  selectTabAt = (index, onSelectionChange) => {
    if (this.state.selected !== index) {
      this.setState({
        selected: index,
      });
      if (typeof onSelectionChange === 'function') {
        onSelectionChange(index);
      }
    }
  };

  render() {
    const {
      ariaLabel,
      iconDescription,
      className,
      triggerHref,
      role,
      onSelectionChange,
      ...other
    } = this.props;

    const tabsWithProps = this.getTabs().map((tab, index) => {
      const newTab = React.cloneElement(tab, {
        index,
        selected: index === this.state.selected,
        handleTabClick: this.handleTabClick(onSelectionChange),
        handleTabAnchorFocus: this.handleTabAnchorFocus(onSelectionChange),
        ref: e => {
          this.setTabAt(index, e);
        },
        handleTabKeyDown: this.handleTabKeyDown(onSelectionChange),
      });

      return newTab;
    });

    const tabContentWithProps = React.Children.map(tabsWithProps, tab => {
      const { children, selected } = tab.props;

      return (
        <TabContent
          className="tab-content"
          aria-hidden={!selected}
          hidden={!selected}
          selected={selected}>
          {children}
        </TabContent>
      );
    });

    const classes = {
      tabs: classNames('bx--tabs', className),
      tablist: classNames('bx--tabs__nav', {
        'bx--tabs__nav--hidden': this.state.dropdownHidden,
      }),
    };

    const selectedTab = this.getTabAt(this.state.selected);
    const selectedLabel = selectedTab ? selectedTab.props.label : '';

    return (
      <>
        <nav {...other} className={classes.tabs} role={role}>
          <div
            role="listbox"
            aria-label={ariaLabel}
            tabIndex={0}
            className="bx--tabs-trigger"
            onClick={this.handleDropdownClick}
            onKeyPress={this.handleDropdownClick}>
            <a
              tabIndex={-1}
              className="bx--tabs-trigger-text"
              href={triggerHref}
              onClick={this.handleDropdownClick}>
              {selectedLabel}
            </a>
            <Icon description={iconDescription} icon={iconCaretDown} />
          </div>
          <ul role="tablist" className={classes.tablist}>
            {tabsWithProps}
          </ul>
        </nav>
        {tabContentWithProps}
      </>
    );
  }
}
