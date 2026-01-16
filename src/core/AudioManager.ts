export class AudioManager {
    private audio: HTMLAudioElement;
    private enabled = true;

    constructor(url: string, volume = 0.8) {
        this.audio = new Audio(url);
        this.audio.loop = true;
        this.audio.volume = volume;
        // Preload metadata to be ready
        this.audio.load();
    }

    toggle() {
        this.enabled = !this.enabled;
        if (this.enabled) {
            this.play();
        } else {
            this.pause();
        }
        return this.enabled;
    }

    async play() {
        if (!this.enabled) return false;
        try {
            await this.audio.play();
            return true;
        } catch (e) {
            console.warn("Audio play failed:", e);
            return false;
        }
    }

    pause() {
        this.audio.pause();
    }

    isEnabled() {
        return this.enabled;
    }
}
