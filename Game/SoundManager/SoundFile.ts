namespace Game {

  import fudge = FudgeCore;

  export class SoundFile {

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





  export class SoundMarker {
    public name: string = "";
    public start: number = 0;
    public duration: number = 0;
    public volume: number = 1;
    public loop: boolean = false;

    constructor(name: string, start: number, duration: number, volume: number, loop: boolean) {
      this.name = name;
      this.start = start;
      this.duration = duration;
      this.volume = volume;
      this.loop = loop;
    }
  }






  
  export class SoundManager {

    public mute: boolean = false;
    public soundsLoaded: boolean = false;
    public soundMarkers: { [id: string]: SoundMarker; } = {};
    
    private _jsonFileLoaded: boolean = false;
    private _soundFileString: string = "";
    private _soundFile: SoundFile = new SoundFile();

    constructor(soundFile: string) {
      this._soundFileString = soundFile;
      this._loadMarkers(soundFile + ".json");
    }

    public mp3Enable = (): boolean => {
      var a: HTMLAudioElement = document.createElement("audio");
      return !!(a.canPlayType && a.canPlayType("audio/mpeg;").replace(/no/, ""));
    }

    public play = (soundName: string): void => {
      if (this.mute) {
        return;
      }
      var marker: SoundMarker = this.soundMarkers[soundName];
      if (marker != null && marker != undefined) {
        this._soundFile.play(marker.start, marker.duration);
      }
    }
    
    private _loadMarkers = (jsonfile: string): void => {
      var markerXhr: XMLHttpRequest = new XMLHttpRequest();
      markerXhr.onreadystatechange = () => {
        if (markerXhr.readyState === XMLHttpRequest.DONE && markerXhr.status === 200) {
          this._onRead(JSON.parse(markerXhr.responseText));
        } 
        else {
          this._onError(markerXhr);
        }
      };
      markerXhr.open("GET", jsonfile, true);
      markerXhr.send();
    }

    // tslint:disable-next-line: member-ordering
    protected _onRead = (data: any) => {
      for (var markerName in data.markers) {
        var markers: any = data.marker[markerName];
        this.addMarker(new SoundMarker(markerName, markers.start, markers.duration, markers.volume, markers.loop));
      }

      this._jsonFileLoaded = true;

      if (this._soundFile.loadComplete == true) {
        this._soundFile.loadFile(this._soundFileString + ".mp3");
      }
      else {
        this._soundFile.loadFile(this._soundFileString + ".ogg");
      }
    }

    // tslint:disable-next-line: member-ordering
    public SoundFileLoaded = (): void => {
      if (this._jsonFileLoaded == true) {
        this.soundsLoaded = true;
      }
    }

    // tslint:disable-next-line: member-ordering
    protected _onError = (xhr: XMLHttpRequest) => {
      fudge.Debug.log("Failed to load sound marker file: " + this._soundFileString + ".json.status=" + xhr.readyState);
    }

    // tslint:disable-next-line: member-ordering
    public addMarker = (soundMarker: SoundMarker): void => {
      this.soundMarkers[soundMarker.name] = soundMarker;
    }

    // tslint:disable-next-line: member-ordering
    public removeMarker = (markerName: string): void => {
      delete this.soundMarkers[markerName];
    }
  }

  var soundManager: SoundManager;

  window.onload = () => {
    soundManager = new SoundManager("audio/sounds");
  };

}