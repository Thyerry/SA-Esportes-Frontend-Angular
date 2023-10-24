import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css'],
})
export class ConsumerComponent implements OnInit, OnDestroy {
  constructor(public messageService: MessageService) {}


  ngOnDestroy(): void {
    this.messageService.stopMessageHubConnection();
  }

  ngOnInit(): void {
    this.messageService.createMessageHubConnection();
  }
}
