/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import DataTableSkeleton from '../DataTableSkeleton';

const props = () => ({
  zebra: boolean('Use zebra stripe (zebra)', false),
  compact: boolean('Compact variant (compact)', false),
});

storiesOf('DataTableSkeleton', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withInfo({
      text: `
        Skeleton states are used as a progressive loading state while the user waits for content to load.

        This example shows a skeleton state for a data table.
      `,
    })(() => (
      <div style={{ width: '800px' }}>
        <DataTableSkeleton {...props()} />
        <br />
      </div>
    ))
  );
