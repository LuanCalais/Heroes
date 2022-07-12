import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // Deve ser pública pois os metodos da service serão chamados no template
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
