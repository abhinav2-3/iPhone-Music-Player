const music = document.querySelector("audio");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const img = document.querySelector("img");

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
  }
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

const loadSongs = (songs) =>{
    title.innerHTML = songs.title;
    artist.innerHTML = songs.artist;
    music.src = `Music/${songs.title}.mp3`;
    img.src = `Img/${songs.title}.jpeg`;
}
// Defaul song
loadSongs(songs[0]);
// Fon Next Song
const nextSong = () =>{
    songsindex = (songsindex + 1) % songs.length;
    loadSongs(songs[songsindex]);
    musicPlay();

}

// Fon Previous Song
const prevSong = () =>{
    songsindex = (songsindex - 1 + songs.length) % songs.length;
    loadSongs(songs[songsindex]);
    musicPlay();
}

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);