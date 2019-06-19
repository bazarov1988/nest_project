import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit
} from '@nestjs/websockets';
import {from, Observable, interval} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';
import {Client, Server} from 'socket.io';

@WebSocketGateway(8989)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer()
    server: Server;
    wsClients = [];

    afterInit() {
        this.server.emit('testing', {do: 'stuff'});
    }

    handleConnection(client: any) {
        this.wsClients.push(client);
        this.broadcast('testing', 'test');
        this.server.emit('testing', {do: 'stuff'});
    }

    handleDisconnect(client) {
        for (let i = 0; i < this.wsClients.length; i++) {
            if (this.wsClients[i].id === client.id) {
                this.wsClients.splice(i, 1);
                break;
            }
        }
        this.broadcast('disconnect', {});
    }

    private broadcast(event, message: any) {
        const broadCastMessage = JSON.stringify(message);
        for (let c of this.wsClients) {
            c.emit(event, broadCastMessage);
        }
    }

    @SubscribeMessage('events')
    findAll(client: Client, data: any): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(
            filter(item => item % 2 === 1),
            map(item => ({event: 'events', data: item}))
        );
    }

    @SubscribeMessage('identity')
    async identity(client: Client, data: number): Promise<number> {
        return data;
    }
}