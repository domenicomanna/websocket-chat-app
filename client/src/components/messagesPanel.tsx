import { Box, IconButton, InputAdornment, List, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { ActiveGroup } from '../App';

type Props = {
  activeGroup: ActiveGroup | null;
  onSendMessageClick: (messageContent: string) => Promise<void>;
};

const MessagesPanel: FC<Props> = ({ activeGroup, onSendMessageClick }) => {
  const [messageContent, setMessageContent] = useState('');
  return (
    <Stack sx={{ height: '100%' }}>
      <Typography fontWeight="bold">Messages</Typography>
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {(activeGroup?.messages ?? []).map((message, index) => (
            <ListItemText key={index}>{message.messageContent}</ListItemText>
          ))}
        </List>
      </Box>
      <TextField
        label="Message"
        variant="outlined"
        size="small"
        margin="dense"
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={!messageContent || !activeGroup}
                  onClick={async () => {
                    await onSendMessageClick(messageContent);
                    setMessageContent('');
                  }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  );
};

export default MessagesPanel;
