import { baseApiUrl } from '../baseApiUrl';
import { Message } from '../messages/types';
import { Group } from './types';
import axios from 'axios';

export const groupsApi = {
  getGroups: async (): Promise<Group[]> => {
    const groupsResponse = await axios.get(`${baseApiUrl}/groups`);
    return groupsResponse.data;
  },

  getMessages: async (groupId: string): Promise<Message[]> => {
    const groupsResponse = await axios.get(`${baseApiUrl}/messages/${groupId}`);
    return groupsResponse.data;
  },

  addGroup: async (groupName: string): Promise<Group> => {
    const groupsResponse = await axios.post(`${baseApiUrl}/groups`, {
      groupName,
    });
    return groupsResponse.data;
  },
};
