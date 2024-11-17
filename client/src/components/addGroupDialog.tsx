import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { api } from '../api';
import { Group } from '../api/groups/types';

type Props = {
  handleClose: () => void;
  onGroupAdded: (group: Group) => void;
};

const AddGroupDialog: FC<Props> = ({ handleClose, onGroupAdded }) => {
  const [groupName, setGroupName] = useState('');

  const addGroup = async () => {
    const group = await api.groups.addGroup(groupName);
    onGroupAdded(group);
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Add group</DialogTitle>
      <DialogContent>
        <TextField
          label="Group Name"
          variant="outlined"
          size="small"
          margin="dense"
          value={groupName}
          onChange={(event) => setGroupName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addGroup} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGroupDialog;
