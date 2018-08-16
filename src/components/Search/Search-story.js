/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Search from '../Search';
import SearchSkeleton from '../Search/Search.Skeleton';
import SearchFilterButton from '../SearchFilterButton';
import SearchLayoutButton from '../SearchLayoutButton';

const props = () => ({
  className: 'some-class',
  small: boolean('Small UI (small)', false),
  light: boolean('Light variant (light)', false),
  name: text('Form item name (name)', ''),
  value: text('Value (value)', ''),
  labelText: text('Label text (labelText)', 'Search'),
  closeButtonLabelText: text(
    'The label text for the close button (closeButtonLabelText)',
    ''
  ),
  placeHolderText: text('Placeholder text (placeHolderText)', 'Search'),
  onChange: action('onChange'),
});

storiesOf('Search', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    withInfo({
      text: `
        Search enables users to specify a word or a phrase to find particular relevant pieces of content
        without the use of navigation. Search can be used as the primary means of discovering content,
        or as a filter to aid the user in finding content.
      `,
    })(() => <Search {...props()} id="search-1" />)
  )
  .add(
    'custom buttons',
    withInfo({
      text: `
        You can control what set of buttons you want.
      `,
    })(() => (
      <div style={{ display: 'flex' }}>
        <Search {...props()} id="search-1" />
        <SearchFilterButton onClick={action('onClick')} />
        <SearchLayoutButton onClick={action('onClick')} />
      </div>
    ))
  )
  .add(
    'skeleton',
    withInfo({
      text: `
        Placeholder skeleton state to use when content is loading.
      `,
    })(() => (
      <div style={{ width: '200px' }}>
        <SearchSkeleton />&nbsp;
        <SearchSkeleton small />
      </div>
    ))
  );
