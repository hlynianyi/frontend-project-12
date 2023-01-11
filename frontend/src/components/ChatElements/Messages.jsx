import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/messagesSlice';
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const { t } = useTranslation();

  const { channel, id } = useSelector(({ channels }) => {
    const { channelsList, currentChannelId } = channels;
    const curChannel = channelsList.find(({ id }) => id === currentChannelId);
    return { channel: curChannel, id: currentChannelId };
  });

  const currentChannelName = channel ? channel.name : 'general';
  
 const messages = useSelector(selectors.selectAll)
    .filter((messages) => messages.channelId === id);

  const messagesBottomRef = useRef(null);
  const scrollToBottom = () => {
    messagesBottomRef.current?.scrollIntoView({ behavior: "auto" })
  };
  
  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return(
    <>
      <div className='bg-light mb-4 p-3 shadow-sm small'>
        <p className='m-0'>
          <b>{currentChannelName}</b>
        </p>
        <span className="text-muted">{t('homepage.message', { count: messages.length })}</span>
      </div>
      <div className='chat-messages overflow-auto px-5'>
        {messages.map(({id, username, body}) => (
          <div className='text-break mb-2' key={id}>
            <b>{username}</b>
            {t('homepage.separator')}
            {body}
          </div>
        ))}
        <div ref={messagesBottomRef}></div>
      </div>
    </>
  )
}

export default Messages;