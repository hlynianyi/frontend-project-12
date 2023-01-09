import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions as modalActions } from '../../slices/modalSlice';
import { Modal, Button } from 'react-bootstrap';
import socket from '../../socket';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const id = useSelector((( { modals }) => modals.handledChannelId));
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = () => {
    setSubmitting(true);
    socket.emit('removeChannel', { id }, (response) => {
      console.log('reponse:', response.status);
      setSubmitting(false);
    });
    dispatch(modalActions.setAction(null));
  };

  return(
    <Modal centered show onHide={() => dispatch(modalActions.setAction(null))}>
    <Modal.Header closeButton>
      <Modal.Title>{'Удалить канал'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="lead">{'Уверены?'}</p>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={() => dispatch(modalActions.setAction(null))}>{'Отменить'}</Button>
        <Button variant="danger" disabled={isSubmitting} onClick={submit}>{'Удалить'}</Button>
      </div>
    </Modal.Body>
  </Modal>
  );
};

export default RemoveChannel;