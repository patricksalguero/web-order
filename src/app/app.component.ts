import { Component, OnInit, ViewChild , ElementRef } from '@angular/core';
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

  public notication : any = {
    title : 'Información',
    icon  : 'https://goo.gl/KqoDpf', 
    body : ''
  }

  @ViewChild("my_notification") my_notification : any;

  public isLocal : boolean = false;
  public wspoint : string = "";
  
  constructor() {
    this.wspoint = (this.isLocal) ? 'http://localhost:8002/socket-app' : '/socket-app'
    this.socket = io.connect(this.wspoint);
  }

  ngOnInit() {
    this.socket.on('psalguero', (data: any) => {
      toastr.success('Servidor: ' + data.message)      
      this.notication.title = 'Información'
      this.notication.body = data.message;
      this.my_notification.show()
    })

    this.socket.on('test-save', (data) => {
      toastr.info( data.message , 'Notificacion')
      this.notication.title = 'Nuevo Registro'
      this.notication.body = data.message;
      this.my_notification.show()
    })
  }

  cargar( event : any ) {
    console.log(event)
  }

  mostrado( event : any ) {
    console.log( event )
  }

}
