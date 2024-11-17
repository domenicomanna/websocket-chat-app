namespace server.Database;

public class Group{
    public string Id {get; set;} = Guid.NewGuid().ToString();
    public string GroupName {get; set;} = string.Empty;
}