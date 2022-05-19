import { Injectable } from '@nestjs/common';
import {
  InjectIoClientProvider,
  IoClient,
  OnConnect,
  OnConnectError,
  OnDisconnect,
} from 'nestjs-io-client';
import { Logger } from 'nestjs-pino';

@Injectable()
export class SearchClient {
  constructor(
    @InjectIoClientProvider()
    private readonly io: IoClient,
    private readonly logger: Logger,
  ) {}

  @OnConnect()
  connect() {
    this.logger.log(`IoSocketId: ${this.io.id}`);
    this.logger.log(`connected: ${this.io.connected}`);
  }

  @OnConnectError()
  connectError(err: Error) {
    this.logger.error(err, `WebSocket error`);
  }

  search(data: any) {
    this.logger.log(data, `performing search`);
    this.io.emit('search', data);
  }

  @OnDisconnect()
  disconnect(reason: IoClient.DisconnectReason) {
    this.logger.error(reason);
    if (reason === 'io server disconnect') {
      // the disconnection was initiated by the server, you need to reconnect manually
      this.io.connect();
    }
  }
}
