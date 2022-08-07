import { WebSocket } from "ws";

class RoomsStore {
  private store: Map<string, { name: string; socket: WebSocket }[]> = new Map<
    string,
    { name: string; socket: WebSocket }[]
  >();

  public add(room: string, user: { name: string; socket: WebSocket }) {
    if (this.store.has(room)) {
      this.store.get(room)?.push(user);
    } else {
      this.store.set(room, [user]);
    }
    console.log(room);
  }

  public getRoomClients(room: string) {
    return this.store.get(room) ?? null;
  }
}

export const roomsStore = new RoomsStore();
