namespace Game {

  import fudge = FudgeCore;

  class SoundFile {

    public context: AudioContext;
    public loadComplete: boolean = false;
    public xhr: XMLHttpRequest;

    public buffer: AudioBuffer;
    source: AudioBufferSourceNode;

    constructor() {
      try {
        this.context = new AudioContext();
      } catch (e) {
        fudge.Debug.log("no audio");
      }
    }

    public loadFile = (fileName: string) => {
      if (this.context == undefined) {
        return;
      }

      this.xhr = new XMLHttpRequest();
      this.xhr.open("GET", fileName, true);
      this.xhr.responseType = "arraybuffer";
      this.xhr.onload = this.onLoadComplete;
      this.xhr.send();
    }
  

    public onLoadComplete = (ev: Event): any => {
      this.xhr = <XMLHttpRequest>ev.currentTarget;
      this.context.decodeAudioData(this.xhr.response, this.decodeData);
  }

  public decodeData = (buffer: AudioBuffer): void => {
    this.buffer = buffer;
    this.loadComplete = true;
  }

  public play = (startTime: number, duration: number) => {
    if (this.context == undefined) {
      return;
    }

    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.context.destination);
    this.source.start(this.context.currentTime, startTime, duration);
  }
}
}