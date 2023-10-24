import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageHubConnection?: HubConnection;
  messages: Message[] = [];
  onlineUsers: number = 0;
  constructor(private httpClient: HttpClient) {}

  sendMessage(message: Message) {
    return this.httpClient.post(
      `${environment.apiUrl}api/Contador/SendText`,
      message,
      { responseType: 'text' }
    );
  }

  stopMessageHubConnection(){
      this.messageHubConnection?.stop().catch((err) => console.log(err));
  }

  createMessageHubConnection() {
    this.messageHubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}hubs/messages`)
      .withAutomaticReconnect()
      .build();

    this.messageHubConnection.start().catch((err) => console.log(err));

    this.messageHubConnection.on('ReceiveMessage', (message: Message) => {
      this.messages = [message, ...this.messages];
    });

    this.messageHubConnection.on('OnlineConsumers', (onlineUsers) => {
      this.onlineUsers = onlineUsers;
    });
  }
}
