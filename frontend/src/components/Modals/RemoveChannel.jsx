import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions as modalActions } from '../../slices/modalSlice';
import { useSocket } from '../../hooks';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socketApi = useSocket();
  const [isSubmitting, setSubmitting] = useState(false);
  const id = useSelector((({ modals }) => modals.handledChannelId));

  const submit = async () => {
    setSubmitting(true);

    await socketApi.removeChannel({ id })
      .then(() => {
        setSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
      });

    toast.success(t('toastify.deleted'));
    dispatch(modalActions.setAction(null));
  };

  return (
    <Modal centered show onHide={() => dispatch(modalActions.setAction(null))}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.delete')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => dispatch(modalActions.setAction(null))}>{t('modals.cancel')}</Button>
          <Button variant="danger" disabled={isSubmitting} onClick={submit}>{t('modals.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
