import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate(options: any) {
    this.setState(new MyRoomState());
    this.onMessage("solve", (client, message) => {
      const player = this.state.players.get(client.sessionId);
      player.solved++;
      this.broadcast("update", {
        id: client.sessionId,
        solved: player.solved,
      });
    });
    this.onMessage("start", (client, message) => {
      this.lock();
    });
  }

  onJoin(client: Client, options: any) {
    this.state.players.set(client.sessionId, new Player());
    console.log(client.sessionId, "joined!");
    this.broadcast("players", Array.from(this.state.players.keys()));
  }

  onLeave(client: Client, consented: boolean) {
    this.state.players.delete(client.sessionId);
    this.broadcast("players", Array.from(this.state.players.keys()));
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
