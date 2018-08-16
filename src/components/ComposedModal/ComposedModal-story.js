import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import ComposedModal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../ComposedModal';
import Button from '../Button';

const props = {
  composedModal: () => ({
    open: boolean('Open (open in <ComposedModal>)', true),
    onKeyDown: action('onKeyDown'),
  }),
  modalHeader: () => ({
    label: text('Optional Label (label in <ModalHeader>)', 'Optional Label'),
    title: text('Optional title (title in <ModalHeader>)', 'Example'),
    iconDescription: text(
      'Close icon description (iconDescription in <ModalHeader>)',
      'Close'
    ),
    buttonOnClick: action('buttonOnClick'),
  }),
  modalFooter: () => ({
    primaryButtonText: text(
      'Primary button text (primaryButtonText in <ModalFooter>)',
      'Save'
    ),
    primaryButtonDisabled: boolean(
      'Primary button disabled (primaryButtonDisabled in <ModalFooter>)',
      false
    ),
    secondaryButtonText: text(
      'Secondary button text (secondaryButtonText in <ModalFooter>)',
      ''
    ),
    onRequestClose: action('onRequestClose'),
    onRequestSubmit: action('onRequestSubmit'),
  }),
};

storiesOf('ComposedModal', module)
  .addDecorator(withKnobs)
  .add(
    'Using Header / Footer Props',
    withInfo({
      text: `
        Composed Modal allows you to create your own modal with just the parts you need. The ComposedModal element provides the state management for open/close, as well as passes the ModalHeader a prop to close the modal (with the close button).
    
        The interior components - ModalHeader / ModalBody / ModalFooter - are all container elements that will render any children you add in, wrapped in the appropriate CSS classes.
    
        The Modal Header / Modal Footer come with some built in props to let you accelerate towards standard Carbon modal UI. If there are customizations you need to do, see the next example of just using the interior components as containers.
      `,
    })(() => (
      <ComposedModal {...props.composedModal()}>
        <ModalHeader {...props.modalHeader()} />
        <ModalBody>
          <p className="bx--modal-content__text">
            Please see ModalWrapper for more examples and demo of the
            functionality.
          </p>
        </ModalBody>
        <ModalFooter {...props.modalFooter()} />
      </ComposedModal>
    ))
  )
  .add(
    'Using child nodes',
    withInfo({
      text: `
        Alternatively, you can just use the Modal components as wrapper elements and figure the children out yourself. We do suggest for the header you utilize the built in props for label and title though, for the footer it's mostly a composed element so creating the two buttons yourself (using the Button component) is probably the most straight-forward pattern.
      `,
    })(() => (
      <ComposedModal {...props.composedModal()}>
        <ModalHeader {...props.modalHeader()}>
          <h1>Testing</h1>
        </ModalHeader>
        <ModalBody>
          <p>
            Please see ModalWrapper for more examples and demo of the
            functionality.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button kind="secondary">Cancel</Button>
          <Button kind="primary">Save</Button>
        </ModalFooter>
      </ComposedModal>
    ))
  );
