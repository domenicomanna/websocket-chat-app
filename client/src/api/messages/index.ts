import { baseApiUrl } from '../baseApiUrl';
import { Message } from './types';
import axios from 'axios';

export const messagesApi = {
  addMessage: async (groupId: string, messageContent: string): Promise<Message> => {
    const groupsResponse = await axios.post(`${baseApiUrl}/messages`, {
      groupId,
      messageContent,
    });
    return groupsResponse.data;
  },
};
