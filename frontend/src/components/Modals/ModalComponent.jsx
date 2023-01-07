import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './index';

const ModalComponent = () => {
  const modalType = useSelector(({ modals }) => modals.modalType);
  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);
  return <Component />;
};

export default ModalComponent;


// import AddChannel from './AddChannel';
// import { useSelector } from 'react-redux';
// import React from 'react';

// const Modal = () => {
//   // const type = useSelector(({ modals }) => {
//   //   console.log('ff', modals)
//   // });
//   // if (!type) return null;
//   const modalType = useSelector(({ modals }) => modals.modalType);
//   if (!modalType) {
//     return null;
//   }

//   const modals = {
//     add: AddChannel,
//     // rename: RenameModal,
//     // delete: RemoveModal,
//   };

//   const Component = modals[modalType];
//   console.log('!Component:', Component, '\nmodalType:', modalType)
//   return <Component />
// };

// export default Modal;