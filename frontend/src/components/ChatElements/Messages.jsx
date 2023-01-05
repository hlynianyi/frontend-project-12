import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/messagesSlice';

const Messages = () => {
  const { currentChannel, currentChannelId } = useSelector(({ channels }) => {
    const { curChannelId, channelsList } = channels;
    const curChannel = channelsList.find(({ id }) => id === curChannelId);
    return { currentChannel: curChannel, currentChannelId: curChannelId };
  });

  const curChannelName = currentChannel ? currentChannel.name : 'general';
  const messages = useSelector(selectors.selectAll)
    .filter(({ channelId }) => channelId === currentChannelId);
  
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);

  return(
    <>
      <div className='bg-light mb-4 p-3 shadow-sm small'>
        <p className='m-0'>
          <b>{curChannelName}</b>
        </p>
        <span className="text-muted">{messages.length} сообщений</span>
      </div>
      <div className='chat-messages overflow-auto px-5'>
        {messages.map(({id, username, body}) => (
          <div className='text-break mb-2' key={id}>
            <b>{username}</b>
            {': '}
            {body}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </>
  )
}

export default Messages;