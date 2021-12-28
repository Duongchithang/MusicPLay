const song = document.getElementById("song");
const playBtn = document.querySelector(".play");
const NextBtn = document.querySelector(".icon-next");
const PrevBtn = document.querySelector(".icon-prev");
const durationTime = document.querySelector(".duration");
const remandingTime = document.querySelector(".remanding");
const rangeBar = document.querySelector(".music-play");
const musicName = document.querySelector(".music-namesong");
const MusicImg = document.querySelector(".music-img img");
const Musicanimation = document.querySelector(".music-img");
const MusicAuthor = document.querySelector(".music-nameauthor");
const PlayAgain = document.querySelector(".play-again");
console.log(PlayAgain);
let isRepeat = false;
let isPlaying = true;
let indexSong = 0;


const SongMusic = [{
        id: 1,
        title: "Ghé Qua",
        name: "Tofu x Dick",
        file: "Ghequa.mp3",
        img: "https://i1.sndcdn.com/artworks-000456671934-b2gp2f-t500x500.jpg"
    },
    {
        id: 2,
        title: "Love Yourself",
        name: "Justin Bieber",
        file: "love-yoursefl.mp3",
        img: "https://upload.wikimedia.org/wikipedia/vi/0/0b/JustinBieberLoveYourself.png"
    },
    {
        id: 3,
        title: "Mood",
        name: "24kgoln",
        file: "Mood.mp3",
        img: "https://avatar-ex-swe.nixcdn.com/playlist/2020/11/23/8/3/f/9/1606121782753_500.jpg"
    },
    {
        id: 4,
        title: "One Call Away",
        name: "Charlie Puth",
        file: "Onecallaway.mp3",
        img: "https://avatar-ex-swe.nixcdn.com/song/2020/08/05/a/d/4/9/1596621129906_640.jpg"
    },
    {
        id: 5,
        title: "Chuyến Đi Của Năm 2",
        name: "Soobin Hoàng Sơn",
        file: "Chuyendicuanam.mp3",
        img: "https://avatar-ex-swe.nixcdn.com/playlist/2018/01/02/f/7/9/8/1514869737389_500.jpg"
    },
    {
        id: 6,
        title: "Đi Về Nhà",
        name: "Đen Vâu x Justatee",
        file: "Divenha.mp3",
        img: "https://data.chiasenhac.com/data/cover/133/132896.jpg"
    },
    {
        id: 7,
        title: "Crying Over You",
        name: "Justatee x Binz",
        file: "Crying.mp3",
        img: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/07/22/f/e/a/2/1563758181487_600.jpg"
    }
];
PlayAgain.addEventListener('click', function() {
    if (isRepeat) {
        isRepeat = false;
        PlayAgain.classList.remove('active');
    } else {
        PlayAgain.classList.add('active');
        isRepeat = true;
    }
});
playBtn.addEventListener('click', playPause);
NextBtn.addEventListener('click', function() {
    changeSong(1);
})
PrevBtn.addEventListener('click', function() {
    changeSong(-1);
})
song.addEventListener('ended', handleChangeSong);

function handleChangeSong() {
    if (isRepeat == true) {
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
};

function changeSong(dir) {
    if (dir === 1) {

        indexSong++;
        if (indexSong >= SongMusic.length) {
            indexSong = 0;
        }
        isPlaying = true;

    } else if (dir === -1) {
        indexSong--;
        if (indexSong < 0) {
            indexSong = SongMusic.length - 1;
        }
        isPlaying = true;

    }
    init(indexSong);

    song.setAttribute("src", `./audio/${SongMusic[indexSong].file}`);
    playPause();
}

function playPause() {
    if (isPlaying) {
        song.play();
        Musicanimation.classList.add('is-playing');
        playBtn.innerHTML = '<i class="fas fa-pause"></i>'
        isPlaying = false;
    } else {
        song.pause();
        Musicanimation.classList.remove('is-playing');
        playBtn.innerHTML = '<i class="fas fa-play icon-play"></i>'
        isPlaying = true;
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remandingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);

    return `${minutes < 10 ? '0' + minutes:minutes}:${seconds<10 ? '0'+ seconds:seconds}`;
}
displayTimer();
const timer = setInterval(displayTimer, 500);
rangeBar.addEventListener('change', handleChange);

function handleChange() {
    song.currentTime = rangeBar.value;
}

function init(indexSong) {
    displayTimer();
    song.setAttribute("src", `./audio/${SongMusic[indexSong].file}`);
    MusicImg.setAttribute("src", SongMusic[indexSong].img);
    musicName.textContent = SongMusic[indexSong].title;
    MusicAuthor.textContent = SongMusic[indexSong].name;
}
init(indexSong);