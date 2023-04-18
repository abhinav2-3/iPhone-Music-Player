const music = document.querySelector("audio");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const img = document.querySelector("img");
const progress_div = document.getElementById("progress_div");

let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
let progress = document.getElementById("progress");

const songs = [
  {
    Name: "Pyaar Hota Kayi Baar Hai",
    title: "Pyaar Hota Kayi Baar Hai",
    artist: "Arijit Singh",
  },
  {
    Name: "Dosti",
    title: "Dosti",
    artist: "Amit Trivedi",
  },
  {
    Name: "Kahani Suno 2.0",
    title: "Kahani Suno 2.0",
    artist: "Kaifi Khalil",
  },
];

let songsindex = 0;
let isPlaying = false;

// For Play
const musicPlay = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("uil-play", "uil-pause");
  img.classList.add("anime");
};

// For Pause
const musicPause = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("uil-pause", "uil-play");
  img.classList.remove("anime");
};
play.addEventListener("click", () => {
  isPlaying ? musicPause() : musicPlay();
});

const loadSongs = (songs) => {
  title.innerHTML = songs.title;
  artist.innerHTML = songs.artist;
  music.src = `Music/${songs.title}.mp3`;
  img.src = `Img/${songs.title}.jpeg`;
};
// Defaul song
loadSongs(songs[0]);
// Fon Next Song
const nextSong = () => {
  songsindex = (songsindex + 1) % songs.length;
  loadSongs(songs[songsindex]);
  musicPlay();
};

// Fon Previous Song
const prevSong = () => {
  songsindex = (songsindex - 1 + songs.length) % songs.length;
  loadSongs(songs[songsindex]);
  musicPlay();
};

// Progress Js

music.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.target;

  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  // Music Duration Update

  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);

  if (sec_duration < 10) {
    sec_duration = `0${sec_duration}`;
  }

  let tot_duration = `${min_duration}:${sec_duration}`;
  if (duration) {
    total_duration.textContent = `${tot_duration}`;
  }
  // Music Current Time Update

  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);
  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
  if (currentTime) {
    current_time.textContent = `${tot_currentTime}`;
  }
});

// Change Song after complete
music.addEventListener("ended", nextSong);

progress_div.addEventListener("click", (event) => {
  const { duration } = music;
  let move_progress = (event.offsetX / event.target.clientWidth) * duration;
  music.currentTime = move_progress;
});
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
