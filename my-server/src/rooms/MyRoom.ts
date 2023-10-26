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
    this.onMessage("end", (client, message) => {
      const player = this.state.players.get(client.sessionId);
      this.broadcast("final", {
        id: client.sessionId,
        solved: player.solved,
      });
    });
    this.onMessage("unlock", (client, message) => {
      this.unlock();
    });
  }

  onJoin(client: Client, options: any) {
    this.state.players.set(client.sessionId, new Player());
    console.log(client.sessionId, "joined!");
    this.broadcast("players", Array.from(this.state.players.keys()));
  }

  async onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    const playerIDs = Array.from(this.state.players.keys());
    this.broadcast(
      "players",
      playerIDs.splice(playerIDs.indexOf(client.sessionId)),
    );
    try {
      if (consented) {
        throw new Error("consented leave");
      }
      // allow disconnected client to reconnect into this room until 20 seconds
      await this.allowReconnection(client, 20);
      // client returned! broadcast changes.
      console.log(client.sessionId, "reconnected!");
      this.broadcast("players", playerIDs);
    } catch (e) {
    } finally {
      // 20 seconds expired. let's remove the client.
      this.state.players.delete(client.sessionId);
    }
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
