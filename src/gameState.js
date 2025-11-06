// src/gameState.js
import { redisClient, pubClient, subClient } from "./redisClient.js";

const GAME_STATE_KEY = "game-state:";     // game-state:<roomId>
const GAME_CHANNEL = "game-updates";      // pub/sub channel

// Store board state in Redis
export async function setGameState(roomId, state) {
  const key = GAME_STATE_KEY + roomId;
  await redisClient.set(key, JSON.stringify(state));
  await pubClient.publish(GAME_CHANNEL, JSON.stringify({ roomId, state }));
}

// Retrieve board state from Redis
export async function getGameState(roomId) {
  const key = GAME_STATE_KEY + roomId;
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}

// Listen for game updates (Socket.IO will use this)
export function subscribeToGameUpdates(callback) {
  subClient.subscribe(GAME_CHANNEL, (message) => {
    const parsed = JSON.parse(message);
    callback(parsed);
  });
}
