const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

let index = 4;

let loop = true;

const songList = [
  {
    name: "Yalnız Kurt",
    link: "assest/ahmet-şafak-yalnız-kurt.mp3",
    artist: "Ahmet Şafak",
    image: "assest/kurt.jpg"
  },
  {
    name: "Gözlerin",
    link: "assest/barış-akarsu-gözlerin.mp3",
    artist: "Barış Akarsu",
    image: "assest/barış-akarsu.jpeg"
  },
  {
    name: "Senden Daha Güzel",
    link: "assest/duman-senden-daha-güzel.mp3",
    artist: "Duman",
    image: "assest/duman.jpeg"
  },
  {
    name: "100.Yıl Marşı",
    link: "assest/kırac-fb.mp3",
    artist: "Kıraç",
    image: "assest/fb.jpeg"
  },
  {
    name: "İsyan",
    link: "assest/halil-sezai-isyan.mp3",
    artist: "Halil Sezai",
    image: "assest/isyan.jpeg"
  },
  {
    name: "Vur Kadehi Ustam",
    link: "assest/sıla-vur-kadehi.mp3",
    artist: "Sıla",
    image: "assest/sıla.jpg"
  }
]

const playAudio= () => {
  audio.play()
  pauseButton.classList.remove("hide")
  playButton.classList.add("hide")
};

const pauseAudio = () => {
  audio.pause()
  pauseButton.classList.add("hide")
  playButton.classList.remove("hide")
};

const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songList[arrayIndex]

  audio.src = link
  songName.innerHTML = name
  songArtist.innerHTML = artist
  songImage.src = image

  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration)
  }

  playListContainer.classList.add("hide")
  playAudio()
}

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);

progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left

  let coordEnd = event.clientX

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth

  currentProgress.style.width = progress * 100 + "%"

  audio.currentTime = progress * audio.duration

  audio.play()
  pauseButton.classList.remove("hide")
  playButton.classList.add("hide")
})

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60)
  minute = minute < 10 ? "0" + minute : minute
  let second = Math.floor(timeInput % 60)
  second = second < 10 ? "0" + second : second
  return `${minute}:${second}`
}

const previousSong = () => {
  if (index > 0) {
    pauseAudio()
    index = index - 1
  } else {
    index = songList.length - 1
  }
  setSong(index)
}

const nextSong = () => {
  if (loop) {
    if (index == (songList.length - 1)) {
      index = 0
    } else {
      index = index + 1
    }
    setSong(index)
  } else {
    let randIndex = Math.floor(Math.random() * songList.length)
    setSong(randIndex)
  }
};

repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains('active')) {
    repeatButton.classList.remove('active')
    audio.loop = false
  } else {
    repeatButton.classList.add('active')
    audio.loop = true
  }
});

shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active")
    audio.loop = true
  } else {
    shuffleButton.classList.add("active")
    audio.loop = false
  }
});

audio.onended = () => {
  nextSong()
}

playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide")
})

closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide")
})

playButton.addEventListener("click", playAudio)

pauseButton.addEventListener("click", pauseAudio)

prevButton.addEventListener("click", previousSong)

nextButton.addEventListener("click", nextSong)


const initializePlaylist = () => {
  for (let i in songList) {
    playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
        <img src="${songList[i].image}"/>
        </div>
        <div class="playlist-song-datails">
        <span id="playlist-song-name">
        ${songList[i].name}
        </span>
        <span id="playlist-song-artist-album">
        ${songList[i].artist}
        </span>
        </div>
        </li>`
  }
}

window.onload = () => {
  index = 0
  setSong(index)
  pauseAudio()
  initializePlaylist()
}
