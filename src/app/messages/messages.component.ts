import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  // notice the the MessageService is injected as public to make it possible to refer it in the template
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
