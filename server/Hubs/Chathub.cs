using Microsoft.AspNetCore.SignalR;
using server.Database;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly InMemoryDB _inMemoryDb;

        public ChatHub(InMemoryDB inMemoryDB)
        {
            _inMemoryDb = inMemoryDB;
        }

        public async Task SendGroup(Group group)
        {
            await Clients.All.SendAsync("ReceiveGroup", group);
        }

        public async Task JoinGroup(string groupId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
        }

        public async Task LeaveGroup(string groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId);
        }
    }
}