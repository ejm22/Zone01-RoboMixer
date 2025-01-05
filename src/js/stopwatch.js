const stopwatchDisplay = document.getElementById('stop-watch');

export class StopWatch {
    constructor() {
        this.interval = null;
        this.elapsedTime = 0;
        this.startTime = 0;
        this.countdownDuration = 0;
        this.isCountdown = false;

        const savedTime = sessionStorage.getItem('elapsedTime');
        if (savedTime) {
            this.elapsedTime = parseInt(savedTime);
            this.updateStopwatch();
        }

        const savedCountdownDuration = sessionStorage.getItem('countdownDuration');
        const savedElapsedCountdownTime = sessionStorage.getItem('elapsedCountdownTime');
        if (savedCountdownDuration && savedElapsedCountdownTime) {
            this.countdownDuration = parseInt(savedCountdownDuration);
            this.elapsedTime = parseInt(savedElapsedCountdownTime);
            this.isCountdown = true;
            this.updateStopwatch();  
        }
    }

    start() {
        clearInterval(this.interval);

        if (this.isCountdown) {
            this.startTime = Date.now() - (this.countdownDuration - this.elapsedTime);
        } else {
            this.startTime = Date.now() - this.elapsedTime;
        }

        this.interval = setInterval(() => this.updateStopwatch(), 100);
    }

    startCountdown(durationInSeconds) {
        clearInterval(this.interval);
        this.countdownDuration = durationInSeconds * 1000;
        this.startTime = Date.now();
        this.isCountdown = true;
        this.elapsedTime = this.countdownDuration;

        sessionStorage.setItem('countdownDuration', this.countdownDuration.toString());
        sessionStorage.setItem('elapsedCountdownTime', this.elapsedTime.toString());

        this.interval = setInterval(() => this.updateStopwatch(), 100);
    }

    updateStopwatch() {
        if (this.startTime) {
            if (this.isCountdown) {
                this.elapsedTime = this.countdownDuration - (Date.now() - this.startTime);
                if (this.elapsedTime <= 0) {
                    this.elapsedTime = 0;
                    this.stop();
                }

                sessionStorage.setItem('elapsedCountdownTime', this.elapsedTime.toString());
            } else {
                this.elapsedTime = Date.now() - this.startTime;
            }
        }

        const totalSeconds = Math.floor(this.elapsedTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        stopwatchDisplay.textContent = 
            `${String(hours)}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (!this.isCountdown) {
            sessionStorage.setItem('elapsedTime', this.elapsedTime.toString());
        }
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.startTime = 0;
        this.isCountdown = false;
        stopwatchDisplay.textContent = "0:00:00";

        sessionStorage.removeItem('elapsedTime');
        sessionStorage.removeItem('countdownDuration');
        sessionStorage.removeItem('elapsedCountdownTime');
    }
}
