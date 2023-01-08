import React from 'react';
import { useSelector } from 'react-redux';
import pickAction from './index';

const ModalComponent = () => {
  const type = useSelector(({ modals }) => modals.action);
  if (!type) {
    return null;
  }
  const Component = pickAction(type);
  return <Component />;
};

export default ModalComponent;
