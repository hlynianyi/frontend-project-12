import addChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const modals = {
  add: addChannel,
  rename: RenameChannel,
  remove: RemoveChannel,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (actionType) => modals[actionType];
