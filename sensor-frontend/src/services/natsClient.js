import { connect } from "nats.ws";

let nc;

export async function initNATS(onMessage) {
  nc = await connect({ servers: "ws://localhost:4222" });
  const sub = nc.subscribe("sensores.atualizar");
  (async () => {
    for await (const m of sub) {
      onMessage(new TextDecoder().decode(m.data));
    }
  })();
}

export async function sendNATSMessage(msg) {
  if (nc) {
    nc.publish("sensores.atualizar", new TextEncoder().encode(msg));
  }
}
