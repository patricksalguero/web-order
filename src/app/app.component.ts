import { Component, OnInit, ViewContainerRef } from '@angular/core';
import * as io from 'socket.io-client';
declare var toastr ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public title = 'app';
  public socket : SocketIOClient.Socket;
  public socketDataTest : any;

  constructor() {
    this.socket = io.connect("http://localhost:8002/socket-app");
  }

  ngOnInit() {
    this.socket.on('psalguero', (data: any) => {
      toastr.success('Servidor: ' + data.message )      
    })

    this.socket.on('test-save', (data) => {
      toastr.info( data.message , 'Notificacion')
    })
  }


}
