import { Button, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { Group } from '../api/groups/types';
import { FC, useState } from 'react';
import AddGroupDialog from './addGroupDialog';

type Props = {
  groups: Group[];
  activeGroupId: string | null;
  onActiveGroupChange: (groupId: string) => void;
};

const GroupsPanel: FC<Props> = ({ groups, onActiveGroupChange, activeGroupId }) => {
  const [showAddGroupDialog, setShowAddGroupDialog] = useState(false);

  return (
    <>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Typography fontWeight="bold">Groups</Typography>
        <Button size="small" onClick={() => setShowAddGroupDialog(true)}>
          +
        </Button>
      </Stack>
      <List>
        {groups.map((group, index) => (
          <ListItemButton
            key={index}
            selected={group.id === activeGroupId}
            onClick={() => onActiveGroupChange(group.id)}
          >
            <ListItemText>{group.groupName}</ListItemText>
          </ListItemButton>
        ))}
      </List>
      {showAddGroupDialog && (
        <AddGroupDialog
          handleClose={() => setShowAddGroupDialog(false)}
          onGroupAdded={() => setShowAddGroupDialog(false)}
        />
      )}
    </>
  );
};

export default GroupsPanel;
