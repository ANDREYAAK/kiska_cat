import "./styles.css";
import { Game } from "@core/Game";

const container = document.getElementById("app");
if (!container) {
  throw new Error("App container not found");
}

// HMR Cleanup: Dispose previous instance if it exists
if ((window as any).__GAME_INSTANCE__) {
  console.log("Disposing previous Game instance (HMR)");
  (window as any).__GAME_INSTANCE__.dispose();
}

const game = new Game(container);
game.start();

// Store instance for HMR
(window as any).__GAME_INSTANCE__ = game;
