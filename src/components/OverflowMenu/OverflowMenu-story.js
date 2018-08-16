import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { iconAdd } from 'carbon-icons';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import Icon from '../Icon';

const directions = {
  bottom: 'Bottom of the trigger button (bottom)',
  top: 'Top of the trigger button (top)',
};

const props = {
  menu: () => ({
    floatingMenu: boolean('Floating menu (floatingMenu)', false),
    direction: select(
      'Menu direction (Only with `floatingMenu`) (direction)',
      directions,
      'bottom'
    ),
    ariaLabel: text('ARIA label (ariaLabel)', ''),
    iconDescription: text('Icon description (iconDescription)', ''),
    onClick: action('onClick'),
    onFocus: action('onFocus'),
    onKeyDown: action('onKeyDown'),
    onClose: action('onClose'),
    onOpen: action('onOpen'),
  }),
  menuItem: () => ({
    className: 'some-class',
    disabled: boolean('Disabled (disabled)', false),
    requireTitle: boolean(
      'Use hover over text for menu item (requireTitle)',
      false
    ),
    onClick: action('onClick'),
  }),
};

storiesOf('OverflowMenu', module)
  .addDecorator(withKnobs)
  .add(
    'basic',
    withInfo({
      text: `
        Overflow Menu is used when additional options are available to the user and there is a space constraint.
        Create Overflow Menu Item components for each option on the menu.
      `,
    })(() => {
      const overflowMenuItemProps = props.menuItem();
      return (
        <OverflowMenu {...props.menu()}>
          <OverflowMenuItem
            {...overflowMenuItemProps}
            itemText="Option 1"
            primaryFocus={true}
          />
          <OverflowMenuItem
            {...overflowMenuItemProps}
            itemText="Option 2 is an example of a really long string and how we recommend handling this"
            requireTitle
          />
          <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 3" />
          <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 4" />
          <OverflowMenuItem
            {...overflowMenuItemProps}
            itemText={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                Add <Icon icon={iconAdd} style={{ height: '12px' }} />
              </div>
            }
          />
          <OverflowMenuItem
            {...overflowMenuItemProps}
            itemText="Danger option"
            hasDivider
            isDelete
          />
        </OverflowMenu>
      );
    })
  )
  .add(
    'custom trigger',
    withInfo({
      text: `
        Sometimes you just want to render something other than an icon
      `,
    })(() => {
      const overflowMenuItemProps = props.menuItem();
      return (
        <OverflowMenu
          {...props.menu()}
          style={{ width: 'auto' }}
          renderIcon={iconProps => <div {...iconProps}>Custom trigger</div>}>
          <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 1" />
          <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 2" />
          <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 3" />
          <OverflowMenuItem {...overflowMenuItemProps} itemText="Option 4" />
          <OverflowMenuItem
            {...overflowMenuItemProps}
            itemText="Danger option"
            hasDivider
            isDelete
          />
        </OverflowMenu>
      );
    })
  );
