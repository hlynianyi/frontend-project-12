import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Form, Modal, Button } from 'react-bootstrap';
import { actions as modalActions } from '../../slices/modalSlice';
import { actions as channelsActions } from '../../slices/channelsSlice';
import socket from '../../socket';

const AddModal = () => {
  const dispatch = useDispatch();
  const channelsNames = useSelector(({ channels }) => channels.channelsList)
    .map(({ name }) => name);
  const [isSubmitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required().notOneOf(channelsNames),
    }),
    onSubmit: ({ name }) => {
      setSubmitting(true);
      socket.emit('newChannel', { name }, (response) => {
        const { status, data } = response;
        console.log(status);
        dispatch(channelsActions.setCurrentChannelId(data.id));
        setSubmitting(false);
      });
      dispatch(modalActions.setModalType(null));
    },
  });

  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), [])

  return (
    <Modal centered show onHide={() => dispatch(modalActions.setModalType(null))}>
      <Modal.Header closeButton>
        <Modal.Title>
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control 
              required
              className="mb-2"
              id="name" 
              name="name"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => dispatch(modalActions.setModalType(null))}>{'Отменить'}</Button>
              <Button type="submit" disabled={isSubmitting}>{'Отправить'}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;