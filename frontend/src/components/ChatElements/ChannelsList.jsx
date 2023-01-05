import React from 'react'
import { Button, Dropdown, Nav, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions as channelsActions } from '../../slices/channelsSlice';
// import { actions as modalActions } from '../../slices/modalSlice';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channelsList = useSelector(({ channels }) => channels.channelsList);
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);

  return (
    <Nav as="ul" className="flex-column nav-pill nav-fill px-2">
      {channelsList.map(channel => {
        const { id, name, removable } = channel;
        
        return (
          <Nav.Item as="li" className='w-100' key={id}>
            <Button 
              className='w-100 rounded-0 text-start' 
              variant={id === currentChannelId ? 'secondary' : ''}
              onClick={() => dispatch(channelsActions.setCurrentChannelId)}
              >
              <span className='me-1'>#</span>
              {name}
            </Button>
          </Nav.Item>
        )
      })}
    </Nav>
  )
}

export default ChannelsList