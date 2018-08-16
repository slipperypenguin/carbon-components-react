import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Loading from '../Loading';

const props = () => ({
  active: boolean('Active (active)', true),
  withOverlay: boolean('With overlay (withOverlay)', false),
  small: boolean('Small (small)', false),
});

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    withInfo({
      text: `
        Loading spinners are used when retrieving data or performing slow computations,
        and help to notify users that loading is underway. The 'active' property is true by default;
        set to false to end the animation.
      `,
    })(() => {
      return <Loading {...props()} className={'some-class'} />;
    })
  );
