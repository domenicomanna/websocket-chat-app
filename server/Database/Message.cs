namespace server.Database;

public class Message{
    public string Id {get; set;} = Guid.NewGuid().ToString();
    public string GroupId {get; set;} = "";
    public string MessageContent {get; set;} = "";
}