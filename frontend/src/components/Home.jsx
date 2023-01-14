import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ChannelsTitle from './ChatElements/ChannelsTitle';
import ChannelsList from './ChatElements/ChannelsList';
import Messages from './ChatElements/Messages';
import InputForm from './ChatElements/InputForm';
import { Container, Row, Col } from 'react-bootstrap';
import routes from './../routes';
import axios from 'axios';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitData = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(routes.data(), { headers: { Authorization: `Bearer ${token}` } });
      const { channels, messages, currentChannelId } = response.data;
      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchInitData();
  }, [dispatch]);

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
