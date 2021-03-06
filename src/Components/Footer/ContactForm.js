import React from 'react';
import TextInput from '../Common/TextInput';
import TextArea from '../Common/TextArea';
import httpClient from '../../API/httpClient';
import { Form as FinalForm, Field } from 'react-final-form';
import {
  combineValidators,
  composeValidators,
  isRequired,
  matchesPattern,
} from 'revalidate';

const contactFormValidator = combineValidators({
  firstName: isRequired({
    message: 'Pole imię jest wymagane',
  }),
  lastName: isRequired({
    message: 'Pole nazwisko jest wymagane',
  }),
  email: composeValidators(
    isRequired({ message: 'Pole e-mail jest wymagane' }),
    matchesPattern(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )({ message: 'Pole e-mail ma nieprawidłową strukturę' })
  )('Pole e-mail ma nieprawidłową strukturę'),
  content: isRequired({
    message: 'Pole treść nie może być puste',
  }),
});

const ContactForm = ({ setFormSendInfo }) => {
  const handleSubmitContactForm = async (values, form) => {
    try {
      await httpClient.contactRequests.send(values);
      setFormSendInfo({
        status: 'ok',
        message: 'Wiadomość została wysłana poprawnie',
      });
      form.resetFieldState('firstName');
      form.resetFieldState('lastName');
      form.resetFieldState('email');
      form.resetFieldState('content');
      form.reset();
    } catch (e) {
      setFormSendInfo({
        status: 'error',
        message: 'Wystąpił błąd podczas wysyłania wiadomości',
      });
    }
  };

  return (
    <FinalForm
      validate={contactFormValidator}
      onSubmit={handleSubmitContactForm}
      render={({ handleSubmit, invalid, pristine, submitting, form }) => (
        <form className='contact__form' onSubmit={handleSubmit}>
          <Field
            key='firstName'
            name='firstName'
            className='contact__text-input'
            placeholder='Wprowadź swoje imię'
            type='text'
            component={TextInput}
          />
          <Field
            key='lastName'
            name='lastName'
            placeholder='Wprowadź swoje nazwisko'
            className='contact__text-input'
            type='text'
            component={TextInput}
          />
          <Field
            key='email'
            name='email'
            placeholder='Wprowadź adres email'
            className='contact__text-input'
            type='text'
            component={TextInput}
          />
          <Field
            key='content'
            name='content'
            placeholder='Wprowadź swoje imię'
            className='contact__text-area'
            type='text'
            component={TextArea}
          />
          <button
            type='submit'
            disabled={invalid}
            className='contact__send-form'
          >
            Wyślij
          </button>
          <button
            type='reset'
            onClick={() => {
              form.resetFieldState('firstName');
              form.resetFieldState('lastName');
              form.resetFieldState('email');
              form.resetFieldState('content');
              form.reset();
            }}
            className='contact__clear-form'
          >
            Wyczyść
          </button>
        </form>
      )}
    />
  );
};

export default ContactForm;
