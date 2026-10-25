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
  running?: boolean;
};

const WORLD_LIMIT = 40;
const WALK_SPEED = 3.15;
const RUN_SPEED = 5.8;

class ValeRoom extends Room<WorldState> {
  maxClients = 8;
  private inputs = new Map<string, MoveInput>();

  onCreate() {
    this.setState(new WorldState());

    // O cliente envia intenção de movimento, nunca uma posição final para o servidor aceitar.
    this.onMessage("input", (client: Client, input: MoveInput) => {
      if (!this.state.players.has(client.sessionId) || !input || typeof input !== "object") return;
      const x = Number(input.x);
      const z = Number(input.z);
      const rotation = Number(input.rotation);
      if (!Number.isFinite(x) || !Number.isFinite(z)) return;
      const length = Math.hypot(x, z) || 1;
      this.inputs.set(client.sessionId, {
        x: Math.max(-1, Math.min(1, x / length)),
        z: Math.max(-1, Math.min(1, z / length)),
        rotation: Number.isFinite(rotation) ? Math.max(-Math.PI * 4, Math.min(Math.PI * 4, rotation)) : undefined,
        running: input.running === true
      });
    });

    this.setSimulationInterval((deltaTime) => {
      const dt = Math.min(deltaTime / 1000, 0.1);
      for (const [sessionId, input] of this.inputs) {
        const player = this.state.players.get(sessionId);
        if (!player) continue;
        const speed = input.running ? RUN_SPEED : WALK_SPEED;
        player.x = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, player.x + (input.x || 0) * speed * dt));
        player.z = Math.max(-WORLD_LIMIT, Math.min(WORLD_LIMIT, player.z + (input.z || 0) * speed * dt));
        if (typeof input.rotation === "number") player.rotation = input.rotation;
      }
    }, 50);
  }

  onJoin(client: Client, options: { name?: string }) {
    const player = new PlayerState();
    const requestedName = typeof options?.name === "string" ? options.name.trim() : "";
    player.name = requestedName.slice(0, 20) || "Viajante";
    this.state.players.set(client.sessionId, player);
    this.inputs.set(client.sessionId, { x: 0, z: 0, running: false });
    console.info("[vale] jogador entrou", client.sessionId);
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
    this.inputs.delete(client.sessionId);
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
