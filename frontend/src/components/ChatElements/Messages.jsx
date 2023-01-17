import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { selectors } from '../../slices/messagesSlice';

const Messages = () => {
  const { t } = useTranslation();
  filter.loadDictionary('ru');

  const { channel, id } = useSelector(({ channels }) => {
    const { channelsList, currentChannelId } = channels;
    const curChannel = channelsList.find(({ channelId }) => channelId === currentChannelId);
    return { channel: curChannel, id: currentChannelId };
  });

  const currentChannelName = channel ? channel.name : 'general';

  const messages = useSelector(selectors.selectAll)
    .filter((message) => message.channelId === id);

  const messagesBottomRef = useRef(null);
  const scrollToBottom = () => {
    messagesBottomRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{filter.clean(currentChannelName)}</b>
        </p>
        <span className="text-muted">{t('homepage.message', { count: messages.length })}</span>
      </div>
      <div className="chat-messages overflow-auto px-5">
        {messages.map((message) => (
          <div className="text-break mb-2" key={message.id}>
            <b>{message.username}</b>
            {t('homepage.separator')}
            {filter.clean(message.body)}
          </div>
        ))}
        <div ref={messagesBottomRef} />
      </div>
    </>
  );
};

export default Messages;
