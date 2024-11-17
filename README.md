A simple chat application that utilizes web sockets

## Installation / Running locally

#### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js](https://nodejs.org/en/)

### Running the Server

1. Clone the project: `git clone https://github.com/domenicomanna/websocket-chat-app.git`
2. Run the api
   ```
   cd server/
   dotnet watch run
   ```
   The api should be listening on https://localhost:5085/

### Running the Client App

1. First, follow the instructions for running the server

2. `cd` to the correct directory: `cd client`

3. Install dependencies: `npm install`

4. Start the app: `npm start`

5. The client app should be listening on http://localhost:5173/
