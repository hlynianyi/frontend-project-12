import addChannel from './AddChannel';
// import RemoveModal from './RemoveModal';
// import RenameModal from './RenameModal';

const modals = {
  add: addChannel,
  // renaming: RenameModal,
  // removing: RemoveModal,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (modalName) => modals[modalName];
