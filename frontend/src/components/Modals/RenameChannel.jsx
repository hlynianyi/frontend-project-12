import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import { actions as modalActions } from '../../slices/modalSlice';
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from 'yup';
import { Form, Modal, Button } from 'react-bootstrap';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const id = useSelector((({ modals })=> modals.handledChannelId));
  const [isSubmitting, setSubmitting] = useState(false);
  const channelsNames = useSelector(({ channels }) => channels.channelsList)
    .map(({ name}) => name);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required().notOneOf(channelsNames),
    }),
    onSubmit: ({ name }) => {
      setSubmitting(true);
      socket.emit('renameChannel', { id, name }, (response) => {
      console.log('response:', response.status);
      setSubmitting(false);
    });
    dispatch(modalActions.setAction(null));
    }
  });

  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  return (
    <Modal centered show onHide={() => dispatch(modalActions.setAction(null))}>
      <Modal.Header closeButton>
        <Modal.Title>{'Переименовать канал'}</Modal.Title>
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
              isInvalid={ formik.errors.name}
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => dispatch(modalActions.setAction(null))}>{'Отменить'}</Button>
              <Button type="submit" disabled={isSubmitting}>{'Отправить'}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;