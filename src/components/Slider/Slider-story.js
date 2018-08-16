import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import Slider from '../Slider';
import SliderSkeleton from '../Slider/Slider.Skeleton';

const props = () => ({
  name: text('Form item name (name)', ''),
  inputType: text('The form element type (inputType)', ''),
  ariaLabelInput: text('The ARIA label for the <input> (ariaLabelInput)', ''),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  hideTextInput: boolean('Without text input (hideTextInput)', false),
  min: number('The minimum value (min)', 0),
  max: number('The maximum value (max)', 100),
  step: number('The step (step)', 1),
  stepMuliplier: number(
    'The step factor for Shift+arrow keys (stepMuliplier)',
    4
  ),
  labelText: text('Label text (labelText)', 'Slider Label'),
  minLabel: text('Label for minimum value (minLabel)', ''),
  maxLabel: text('Label for maximum value (maxLabel)', ''),
  onChange: action('onChange'),
});

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withInfo({
      text: `
        Sliders provide a visual indication of adjustable content, where the user can move the handle along a horizontal track to increase or decrease the value.
      `,
    })(() => (
      <div style={{ marginTop: '2rem' }}>
        <Slider id="slider" value={50} {...props()} />
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
      <div style={{ marginTop: '2rem' }}>
        <SliderSkeleton />
      </div>
    ))
  );
