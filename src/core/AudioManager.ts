export class AudioManager {
    private music: HTMLAudioElement;

    private enabled = true;

    constructor(url: string, volume = 0.3) {
        this.music = new Audio(url);
        this.music.loop = true;
        this.music.volume = volume;
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
        if (!this.enabled) return;
        // Browser might block autoplay until interaction
        try {
            await this.music.play();
        } catch (e) {
            console.warn("Audio playback blocked or failed:", e);
            throw e;
        }
    }

    pause() {
        this.music.pause();
    }

    isEnabled() {
        return this.enabled;
    }
}
