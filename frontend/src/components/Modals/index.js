import AddChannel from './AddChannel';
// import RemoveModal from './RemoveModal';
// import RenameModal from './RenameModal';

const modals = {
  add: AddChannel,
  // renaming: RenameModal,
  // removing: RemoveModal,
};

export default (modalName) => modals[modalName];
