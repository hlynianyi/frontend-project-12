import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChannelsTitle from './ChatElements/ChannelsTitle';
import ChannelsList from './ChatElements/ChannelsList';
import Messages from './ChatElements/Messages';
import InputForm from './ChatElements/InputForm';
import routes from '../routes';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { useAuth } from '../hooks';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const fetchInitData = async () => {
      try {
        const token = auth.token;
        const response = await axios.get(routes.data(), { headers: { Authorization: `Bearer ${token}` } });
        const { channels, messages, currentChannelId } = response.data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setCurrentChannelId(currentChannelId));
        dispatch(messagesActions.addMessages(messages));
      } catch (error) {
        if (error.response?.status === 401) {
          auth.logOut();
          navigate('/login');
        } else if (error.message === 'Network Error') {
          toast.error(t('toastify.network'));
        } else {
          toast.error(t('toastify.unknown'));
        }
      }
    };
    fetchInitData();
  }, [dispatch, navigate, t, auth]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
          <ChannelsTitle />
          <ChannelsList />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Messages />
            <InputForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
