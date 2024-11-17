import { useEffect, useState } from 'react';
import { api } from './api';
import { Container } from '@mui/material';
import GroupsPanel from './components/groupsPanel';
import { Group } from './api/groups/types';
import Grid from '@mui/material/Grid2';
import MessagesPanel from './components/messagesPanel';
import * as signalR from '@microsoft/signalr';
import { Message } from './api/messages/types';
import { baseApiUrl } from './api/baseApiUrl';

export type ActiveGroup = {
  groupId: string;
  messages: Message[];
};

const App = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<ActiveGroup | null>(null);
  const [hubConnection, setHubConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    if (hubConnection) return;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseApiUrl}/chat`)
      .withAutomaticReconnect()
      .build();
    setHubConnection(connection);
    connection.on('ReceiveGroup', (group: Group) => {
      console.log('HI');
      setGroups((prevGroups) => {
        return [...prevGroups, group];
      });
    });

    connection.on('ReceiveMessage', (message: Message) => {
      setActiveGroup((currentActiveGroup) => {
        if (currentActiveGroup?.groupId !== message.groupId) return currentActiveGroup;
        return {
          groupId: currentActiveGroup.groupId,
          messages: [...currentActiveGroup.messages, message],
        };
      });
    });

    void connection.start();
  }, [hubConnection]);

  useEffect(() => {
    const loadGroups = async () => {
      const groups = await api.groups.getGroups();
      setGroups(groups);
    };
    void loadGroups();
  }, []);

  const onActiveGroupChange = async (groupId: string) => {
    if (hubConnection) {
      await hubConnection.invoke('JoinGroup', groupId);
      if (activeGroup) await hubConnection.invoke('LeaveGroup', activeGroup.groupId);
    }
    const messages = await api.groups.getMessages(groupId);
    setActiveGroup({
      groupId,
      messages,
    });
  };

  const onSendMessageClick = async (messageContent: string) => {
    if (!activeGroup) return;
    await api.messages.addMessage(activeGroup.groupId, messageContent);
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{
          height: '100vh',
        }}
      >
        <Grid
          size={2}
          sx={{
            borderRight: '1px solid #ccc',
          }}
        >
          <GroupsPanel
            groups={groups}
            activeGroupId={activeGroup?.groupId ?? null}
            onActiveGroupChange={onActiveGroupChange}
          />
        </Grid>
        <Grid size={10}>
          <MessagesPanel activeGroup={activeGroup} onSendMessageClick={onSendMessageClick} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
