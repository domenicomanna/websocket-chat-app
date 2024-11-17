using ChatApp.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using server.Database;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class GroupsController : ControllerBase{
    private InMemoryDB _inMemoryDB;
    private readonly IHubContext<ChatHub> _hubContext;

    public GroupsController(InMemoryDB inMemoryDB, IHubContext<ChatHub> hubContext){
        _inMemoryDB = inMemoryDB;
        _hubContext = hubContext;
    }

    [HttpGet()]
    public IEnumerable<Group> Get()
    {
        return _inMemoryDB.Groups;
    }

    [HttpPost()]
    public Group CreateGroup(Group group)
    {
        _inMemoryDB.Groups.Add(group);
        _hubContext.Clients.All.SendAsync("ReceiveGroup", group);
        return group;
    }

    [HttpGet("/messages/{groupId}")]
    public IEnumerable<Message> GetMessage(string groupId)
    {
        return _inMemoryDB.Messages.Where(x => x.GroupId == groupId);
    }

}



