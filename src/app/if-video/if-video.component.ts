import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'if-video',
    templateUrl: './if-video.component.html',
    styleUrls: ['./if-video.component.scss']
})
export class IfVideoComponent implements OnInit {
    @Input('src') src: string;
    @ViewChild('video') videoRef: ElementRef;
    video: HTMLVideoElement;
    playing: boolean;
    sound = 0;
    fullScreen = false;

    constructor() { }

    ngOnInit() {
        this.video = this.videoRef.nativeElement;
        this.playing = true;
        this.changeSound();
    }

    playPause() {
        this.playing ? this.video.pause() : this.video.play();
        this.playing = !this.playing;
        console.log(
            this.video.currentTime,
            this.video.duration
        );
    }

    changeSound(event?) {
        if (!event) this.sound = this.sound ? 0 : 1;
        this.video.volume = this.sound;
        // this.video.volume++;
    }

    setFullScreen() {
        const cancel = (<any>document).mozCancelFullScreen || (<any>document).exitFullScreen ||
            document.webkitExitFullscreen || (<any>document).msExitFullscreen;
        const full = (<any>this.video.parentElement).mozRequestFullScreen || (<any>this.video.parentElement).requestFullScreen ||
            this.video.parentElement.webkitRequestFullScreen || (<any>this.video.parentElement).msRequestFullScreen;
        this.fullScreen ? cancel.call(document) : full.call(this.video.parentElement);
        this.fullScreen = !this.fullScreen;
    }
}
