import React from 'react'
import { Button, Dropdown, Nav, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as modalActions } from '../../slices/modalSlice';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channelsList = useSelector(({ channels }) => channels.channelsList);
  const currentChannelId = useSelector(({ channels }) => channels.currentChannelId);

  return (
    <Nav as="ul" className="flex-column nav-pill nav-fill px-2">
      {channelsList.map(channel => {
        const { id, name, removable } = channel;
      
        const remove = () => {
          console.log('TO REMOVE CH:', id)
          dispatch(modalActions.setAction('remove'));
          dispatch(modalActions.setHandledChannelId(id));
        };
        const rename = () => {
          dispatch(modalActions.setAction('rename'));
          dispatch(modalActions.setHandledChannelId(id));

        };
        return (
          <Nav.Item as="li" className='w-100' key={id}>
            {!removable && (
              <Button 
              className='w-100 rounded-0 text-start' 
              onClick={() => dispatch(channelsActions.setCurrentChannelId(id))}
              variant={id === currentChannelId ? 'secondary' : ''}
              >
              <span className='me-1'>#</span>
              {name}
            </Button>
            )}
            {removable && (
            <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              className="w-100 rounded-0 text-start text-truncate"
              onClick={() => dispatch(channelsActions.setCurrentChannelId(id))}
              variant={id === currentChannelId ? 'secondary' : ''}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
            <Dropdown.Toggle
              split
              variant={id === currentChannelId ? 'secondary' : ''}
              className="flex-grow-0"
            >
              <span className="visually-hidden">{'#'}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={remove}>{'Удалить'}</Dropdown.Item>
              <Dropdown.Item onClick={rename}>{'Переименовать'}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            )}
          </Nav.Item>
        )
      })}
    </Nav>
  )
}

export default ChannelsList;
{/* <Dropdown as={ButtonGroup}>n</Dropdown> */}
