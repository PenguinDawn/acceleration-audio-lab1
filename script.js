
// variables (picture, title, speed)
const songPic = document.getElementById("songPicture");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const tracker = document.getElementById("speed-tracker");

// buttons
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const forward = document.getElementById("forward");
const backwards = document.getElementById("backwards");

// seconds + 
const secondHolder = document.getElementById("seconds");
const speedTracker = document.getElementById("speed-tracker");
const audioPlayer = document.getElementById("audi");
const progressBar = document.getElementById("progress");
const customProgressBar = document.getElementById("custom-progress-bar");
let min = 0;
let sec = 0;
let secDur = 0;
let minDur = 0;
let duration = audioPlayer.duration;

// predetermine url
const baseURL = "/songs";
// and our current track
let currentTrack = 0;
audioPlayer.playbackRate = 1.0;
speedTracker.innerHTML = audioPlayer.playbackRate;

// bringing in our files
const songs = [
  { file: "Deep-Abstract-Ambient-Snowcap-play.mp3", albumArt: "Deep-Abstract-Ambient-Snowcap-Img.png", title: "Ambient Snowcap", artist: "ummbrella"},
  { file: "future-design-play.mp3", albumArt: "Future-Design-Img.png", title: "Future Design", artist: "penguinmusic" },
  { file: "vlog-beat-play.mp3", albumArt: "Vlog-Beat-Img.png", title: "Vlog Beat", artist: "Tunetank"}
];

// adding our play button
playButton.addEventListener("click", () => {
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  songTitle.innerHTML = songs[currentTrack].title;
  songPic.src = `${baseURL}/${songs[currentTrack].albumArt}`;
  songArtist.innerHTML = songs[currentTrack].artist;
  audioPlayer.load();
  audioPlayer.play();
});

// pausing
pauseButton.addEventListener("click", () => {
  audioPlayer.pause();
});

// skipping
forward.addEventListener("click", () => {
  if(currentTrack != songs.length - 1) {
        currentTrack++;
    }
    else {
        currentTrack = 0;
    }
    
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  songTitle.innerHTML = songs[currentTrack].title;
  songArtist.innerHTML = songs[currentTrack].artist;
  songPic.src = `${baseURL}/${songs[currentTrack].albumArt}`;
  audioPlayer.load();
  audioPlayer.play();
  audioPlayer.playbackRate = 1.0;
  speedTracker.innerHTML = audioPlayer.playbackRate;
})

// going back
backwards.addEventListener("click", () => {
   if(currentTrack == 0) {
        currentTrack = songs.length - 1;
    }
    else {
        currentTrack -= 1;
    }
    audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  songTitle.innerHTML = songs[currentTrack].title;
  songArtist.innerHTML = songs[currentTrack].artist;
  songPic.src = `${baseURL}/${songs[currentTrack].albumArt}`;
  audioPlayer.load();
  audioPlayer.play();
  audioPlayer.playbackRate = 1.0;
  speedTracker.innerHTML = audioPlayer.playbackRate;
})

// updating the audioPlayer!



audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value = audioPlayer.currentTime / audioPlayer.duration;
  // width of the bar
  customProgressBar.style.width = `${
    (audioPlayer.currentTime / audioPlayer.duration) * 100
  }%`;


  //current time
  let secondsGo = audioPlayer.currentTime;

  minDur = 0;
  while (secondsGo > 60) {
    secondsGo -= 60;
    minDur += 1
  }
  secDur = parseInt(secondsGo);

  if (secDur < 10) {
    secDur = "0" + secDur.toString()
  }

  
  let durationSetting = audioPlayer.duration;
  min = 0;
  while (durationSetting > 60) {
    durationSetting -= 60;
    min += 1
  }
  sec = parseInt(durationSetting);
  if (sec < 10) {
    sec = "0" + sec.toString()
  }
  duration = `${min}:${sec}`

  secondHolder.innerHTML = `${minDur}:${secDur} / ${min}:${sec}`;


  // speed tracker and speed
  if (audioPlayer.playbackRate != 2.5) {
    audioPlayer.playbackRate += 0.01;
  }
  
  speedTracker.innerHTML = parseFloat(audioPlayer.playbackRate).toFixed(2);

  // changing track
  if(audioPlayer.currentTime == audioPlayer.duration) {
    if(currentTrack != songs.length - 1) {
        currentTrack++;
    }
    else {
        currentTrack = 0;
    }
    audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
    songTitle.innerHTML = songs[currentTrack].title;
    songPic.src = `${baseURL}/${songs[currentTrack].albumArt}`;
    songArtist.innerHTML = songs[currentTrack].artist;
    audioPlayer.load();
    audioPlayer.play();
    audioPlayer.playbackRate = 1.0;
    speedTracker.innerHTML = audioPlayer.playbackRate;
  }
});


// keydown events
document.addEventListener("keydown", (event) => {
  console.log(audioPlayer.duration - audioPlayer.currentTime);
  switch (event.key.toLowerCase()) {   
    case " ":
      event.preventDefault();
      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
      break;

    case "m":
      audioPlayer.muted = !audioPlayer.muted;
      break;
    case "arrowright":
        if((audioPlayer.duration - audioPlayer.currentTime) > 10) {
            audioPlayer.currentTime += 10;
        }
      break;
    case "arrowleft":
        if(audioPlayer.currentTime > 10) {
            audioPlayer.currentTime -= 10;
        }
        else {
            audioPlayer.currentTime = 0;
        }
      break;}
});

