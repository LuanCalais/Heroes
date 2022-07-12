import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  // Metodo que irá adicionar a mensagem
  add(message: string){
    this.messages.push(message);
  }

  // Método que limpa as mensagens
  clear(){
    this.messages = [];
  }

  constructor() { }
}
