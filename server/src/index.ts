import { createServer } from "node:http";
import { Server, Room, Client } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { MapSchema, Schema, type } from "@colyseus/schema";

class PlayerState extends Schema {
  @type("string") name = "Viajante";
  @type("number") x = 0;
  @type("number") z = 4;
  @type("number") rotation = 0;
}

class WorldState extends Schema {
  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
}

type MoveInput = {
  x?: number;
  z?: number;
  rotation?: number;
};

const WORLD_LIMIT = 40;
const MAX_STEP = 1.5;

class ValeRoom extends Room<WorldState> {
  maxClients = 8;

  onCreate() {
    this.setState(new WorldState());

    this.onMessage("move", (client: Client, input: MoveInput) => {
      const player = this.state.players.get(client.sessionId);
      if (!player || !input || typeof input !== "object") return;

      const x = Number(input.x);
      const z = Number(input.z);
      const rotation = Number(input.rotation);
      if (!Number.isFinite(x) || !Number.isFinite(z)) return;

      // O servidor limita cada atualização para evitar teleporte por inputs inválidos.
      const dx = Math.max(-MAX_STEP, Math.min(MAX_STEP, x - player.x));
      const dz = Math.max(-MAX_STEP, Math.min(MAX_STEP, z - player.z));
      player.x = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, player.x + dx));
      player.z = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, player.z + dz));
      if (Number.isFinite(rotation)) {
        player.rotation = Math.max(-Math.PI * 4, Math.min(Math.PI * 4, rotation));
      }
    });
  }

  onJoin(client: Client, options: { name?: string }) {
    const player = new PlayerState();
    const requestedName = typeof options?.name === "string" ? options.name.trim() : "";
    player.name = requestedName.slice(0, 20) || "Viajante";
    this.state.players.set(client.sessionId, player);
    console.info("[vale] jogador entrou", client.sessionId);
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
    console.info("[vale] jogador saiu", client.sessionId);
  }
}

const port = Number(process.env.PORT || 2567);
const httpServer = createServer();
const gameServer = new Server({
  transport: new WebSocketTransport({ server: httpServer })
});

gameServer.define("vale", ValeRoom);
gameServer.listen(port).then(() => {
  console.info(`CHORÃO ONLINE multiplayer listening on port ${port}`);
}).catch((error: unknown) => {
  console.error("Falha ao iniciar o servidor multiplayer:", error);
  process.exitCode = 1;
});
