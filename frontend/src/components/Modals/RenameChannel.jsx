import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions as modalActions } from '../../slices/modalSlice';
import { useSocket } from '../../hooks';

const RenameChannel = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const id = useSelector((({ modals }) => modals.handledChannelId));

  const channelsNames = useSelector(({ channels }) => channels.channelsList)
    .map(({ name }) => name);

  const socketApi = useSocket();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required(t('errors.required')).notOneOf(channelsNames),
    }),
    onSubmit: async ({ name }, actions) => {
      actions.setSubmitting(true);

      console.log('blocked');
      await socketApi.renameChannel({ id, name})
        .then(() => {
          actions.setSubmitting(false);
        })
        .catch((error) => {
          console.error(error);
        });

      console.log('unblocked');
      // socketApi.renameChannel(id, name);
      // actions.setSubmitting(false);

      toast.success(t('toastify.renamed'));
      dispatch(modalActions.setAction(null));
    },
  });

  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  return (
    <Modal centered show onHide={() => dispatch(modalActions.setAction(null))}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              required
              className="mb-2"
              name="name"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.errors.name}
            />
            <Form.Label className="visually-hidden">{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => dispatch(modalActions.setAction(null))}>{t('modals.cancel')}</Button>
              <Button type="submit" disabled={formik.isSubmitting}>{t('modals.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
