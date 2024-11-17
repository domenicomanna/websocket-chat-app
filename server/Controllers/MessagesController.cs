using ChatApp.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using server.Database;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class MessagesController : ControllerBase{
    private InMemoryDB _inMemoryDB;
    private readonly IHubContext<ChatHub> _hubContext;

    public MessagesController(InMemoryDB inMemoryDB, IHubContext<ChatHub> hubContext){
        _inMemoryDB = inMemoryDB;
        _hubContext = hubContext;
    }

    [HttpPost()]
    public Message CreateMessage(Message message)
    {
        _inMemoryDB.Messages.Add(message);
        _hubContext.Clients.Group(message.GroupId).SendAsync("ReceiveMessage", message);
        return message;
    }
}



