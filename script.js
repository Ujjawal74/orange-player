/*
Created By: Connect/Follow me on LinkedIn.
=> https://www.linkedin.com/in/ujjawal-biswas-b40611142/
          _   _                         _  _      _                           
  _   _  (_) (_)  __ _ __      __ __ _ | || |__  (_) ___ __      __ __ _  ___ 
 | | | | | | | | / _` |\ \ /\ / // _` || || '_ \ | |/ __|\ \ /\ / // _` |/ __|
 | |_| | | | | || (_| | \ V  V /| (_| || || |_) || |\__ \ \ V  V /| (_| |\__ \
  \__,_|_/ |_/ | \__,_|  \_/\_/  \__,_||_||_.__/ |_||___/  \_/\_/  \__,_||___/
       |__/|__/                                                                                                                                                                               
*/


// on music play bottom music player sample songs
songs_info = {
  cradles: {
    title: "Cradles",
    singer: "Sub Urban",
  },
  bloody_mary: {
    title: "Bloody Mary",
    singer: "Lady Gaga",
  },
  old_town_road: {
    title: "Old Town Road",
    singer: "Lil Nas X",
  },
  under_the_influence: {
    title: "Under The Influence",
    singer: "Chris Brown",
  },
};

// global event listener
document.addEventListener("click", eventHandler);

// collecting all elements
let audio = document.getElementById("media");
let progress = document.getElementById("progress");
let togglePause = document.getElementById("pause");
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");
let volume = document.getElementById("volume");
let audio_source = document.getElementById("audio_source");

let cover = document.querySelector(".info .cover img");
let song = document.querySelector(".info .about .song");
let singer = document.querySelector(".info .about .singer");

// on audio element loaded
audio.onloadedmetadata = function () {
  progress.max = audio.duration;
  progress.value = audio.currentTime;
};

// on moving slider [timestamp]
progress.onchange = function () {
  audio.play();
  audio.currentTime = progress.value;
};

// on moving slider [volume]
volume.onchange = function () {
  audio.volume = volume.value / 100;
};

// refreshing in 1/2 second the slider [timestamp]
if (audio.play()) {
  setInterval(function () {
    progress.value = audio.currentTime;
  }, 500);
}

// toggle pause/play button
togglePause.addEventListener("click", function () {
  if (togglePause.classList.contains("fa-pause-circle")) {
    audio.pause();
    togglePause.classList.remove("fa-pause-circle");
    togglePause.classList.add("fa-play");
  } else {
    audio.play();
    togglePause.classList.add("fa-pause-circle");
    togglePause.classList.remove("fa-play");
  }
});

// global listener to play song if it has data-id attribute
function eventHandler(e) {
  if (e.target.hasAttribute("data-id")) {
    let id = e.target.dataset.id;
    audio_source.setAttribute("src", `./assests/songs/${id}.mp3`);
    audio.load();
    audio.play();
    togglePause.classList.add("fa-pause-circle");
    togglePause.classList.remove("fa-play");

    cover.setAttribute("src", `./assests/english_pop_covers/${id}.jpg`);
    song.innerHTML = `${songs_info[id].title}`;
    singer.innerHTML = `${songs_info[id].singer}`;
  } else {
    return;
  }
}

// setting a random song on backward/forward button pressed!
var key = 0;
function playRandom() {
  var keys = Object.keys(songs_info);
  var random_key = keys[key];
  key++;
  if (key >= 4) key = 0;
  audio_source.setAttribute("src", `./assests/songs/${random_key}.mp3`);
  audio.load();
  audio.play();
  togglePause.classList.add("fa-pause-circle");
  togglePause.classList.remove("fa-play");

  cover.setAttribute("src", `./assests/english_pop_covers/${random_key}.jpg`);
  song.innerHTML = `${songs_info[random_key].title}`;
  singer.innerHTML = `${songs_info[random_key].singer}`;
}
