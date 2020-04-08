using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleSignalR.Hubs
{
    public class ChatHub : Hub
    {
        private const string ReceiveStringMethod = "ReceiveMessage";

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync(ReceiveStringMethod, user, message);
        }
    }
}
