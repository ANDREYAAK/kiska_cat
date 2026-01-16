export class AudioManager {
    private ctx: AudioContext;
    private gainNode: GainNode;
    private buffer: AudioBuffer | null = null;
    private source: AudioBufferSourceNode | null = null;
    private enabled = true;
    private isPlaying = false;
    private url: string;

    constructor(url: string, volume = 0.3) {
        this.url = url;
        // Helper for cross-browser support (though modern is standard)
        const Ctx = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new Ctx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.value = volume;
        this.gainNode.connect(this.ctx.destination);

        this.loadAudio();
    }

    private async loadAudio() {
        try {
            const resp = await fetch(this.url);
            const arrayBuffer = await resp.arrayBuffer();
            this.buffer = await this.ctx.decodeAudioData(arrayBuffer);
            // If user tried to play before load finished
            if (this.enabled && this.isPlaying) {
                this.startSource();
            }
        } catch (e) {
            console.error("Failed to load audio:", e);
        }
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
        this.isPlaying = true;

        // Critical for mobile: resume context on user interaction
        if (this.ctx.state === "suspended") {
            try {
                await this.ctx.resume();
            } catch (e) {
                console.warn("Context resume failed:", e);
                // If we couldn't resume, we probably can't play. 
                // Don't swallow the error completely for the caller?
                // Or just return false.
                return false;
            }
        }

        if (this.buffer && !this.source) {
            this.startSource();
        }
        return true;
    }

    pause() {
        this.isPlaying = false;
        if (this.source) {
            try {
                this.source.stop();
            } catch (e) {
                // ignore
            }
            this.source = null;
        }
        // We can also suspend context to save battery, but stopping source is enough
    }

    private startSource() {
        if (!this.buffer) return;
        // Sources are one-time use
        if (this.source) {
            try {
                this.source.stop();
            } catch (e) { }
        }
        this.source = this.ctx.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.loop = true;
        this.source.connect(this.gainNode);
        this.source.start(0);
    }

    isEnabled() {
        return this.enabled;
    }
}
