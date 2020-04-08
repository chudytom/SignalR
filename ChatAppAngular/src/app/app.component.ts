import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: string;
  private hubConnection: HubConnection;
  inputMessage = '';
  messagesList: string[] = [];

  ngOnInit(): void {
    this.user = window.prompt('Enter your name: ', '');

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44303/chatHub')
      .build();

    this.startConnection();

    this.hubConnection.on('ReceiveMessage',
      (user: string, message: string) => {
        const composedMessage = user + ' says: ' + message;
        this.messagesList.push(composedMessage);
      });
  }

  private startConnection() {
    this.hubConnection.start()
      .then(() => console.log('Connection established'))
      .catch((error) => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  sendMessage(): void {
    this.hubConnection
      .invoke('SendMessage', this.user, this.inputMessage)
      .catch(error => console.error(error.toString()));
  }
}
