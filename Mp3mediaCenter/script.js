/* General Styles */
body {
    margin: 0;
    min-height: 250vh;
    overflow-x: hidden;
    position: relative;
}

.main-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-color: #000000;
    opacity: 1;
}

.main-background.gradient-bg {
    background: #000000 linear-gradient(90deg, #ff7e5f, #feb47b, #6a11cb, #2575fc, #ff512f, #dd2476, #00ffcc, #00cc99, #ffcc00, #ff6699, #ff7e5f);
    background-size: 300% 100%;
    animation: scrollBackground 45s linear infinite;
}

.background-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    opacity: 0.7;
    animation: subtlePulse 10s ease-in-out infinite;
}

@keyframes subtlePulse {
    0% { opacity: 0.7; }
    50% { opacity: 0.65; }
    100% { opacity: 0.7; }
}

@keyframes scrollBackground {
    0% { background-position: 0% 0%; }
    100% { background-position: -300% 0%; }
}

.scene {
    width: 100%;
    min-height: 250vh;
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 1;
}

.banner { 
    width: 100%;
    height: 100vh;
    text-align: center;
    overflow: visible;
    position: absolute;
    transition: top 0.3s ease;
}

#banner1 { top: 0; }
#banner2 { top: 120vh; }

.banner .slider {
    position: absolute;
    width: 300px;
    height: 350px;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);
    transform-style: preserve-3d;
    animation: autorun 40s linear infinite;
}

@keyframes autorun {
    from { transform: perspective(2000px) rotateX(-16deg) rotateY(0deg); }
    to { transform: perspective(2000px) rotateX(-16deg) rotateY(360deg); }
}

.banner .slider .item {
    position: absolute;
    inset: 0;
    transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(700px) rotateX(20deg);
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
}

.banner .slider .item img,
.banner .slider .item video,
.banner .slider .item .mp3-card,
.banner .slider .item .x-post-card {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.mp3-card {
    position: relative;
    background: rgba(87, 86, 86, 0.8);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: #fff;
    text-align: center;
    font-family: 'Arial', sans-serif;
}

.mp3-card img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0.7;
}

.mp3-card .song-info {
    padding: 10px;
    background: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    text-shadow: 0 0 5px rgba(255, 0, 0, 0.7);
    z-index: 1;
}

.x-post-card {
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000;
    text-align: left;
    font-family: 'Arial', sans-serif;
    padding: 10px;
    user-select: none;
    -webkit-user-select: none;
    pointer-events: auto;
}

.x-post-card .post-content {
    font-size: 14px;
    max-height: 60%;
    overflow-y: auto;
    margin-bottom: 10px;
}

.x-post-card .post-meta {
    font-size: 12px;
    color: #666;
    border-top: 1px solid #ddd;
    padding-top: 5px;
}

/* Media Container Styles */
.media-container {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    max-width: 80%;
    max-height: 80%;
    z-index: 100;
    transform: translate(-50%, -50%);
    background-color: transparent;
    opacity: 1;
    transition: opacity 0.5s ease;
}

.media-container.fade-out { opacity: 0; }

.media-container img,
.media-container video {
    width: 100%;
    height: auto;
    object-fit: contain;
}

/* Pulsating Animation */
.pulsate {
    animation: pulsate 8s ease-in-out infinite;
}

@keyframes pulsate {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

/* Dashboard */
.dashboard {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    background: linear-gradient(135deg, #ff000033, #cc000033); /* Default semi-transparent */
    padding: 15px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(255, 0, 0, 1);
    display: flex;
    flex-direction: column;
    gap: 15px;
    opacity: 1;
    transition: opacity 0.3s ease;
}

.dashboard.collapsed .options-menu,
.dashboard.collapsed .slider-menu,
.dashboard.collapsed .media-menu {
    display: none;
}

.control-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.control-row span {
    color: #fff;
    font-family: 'Arial', sans-serif;
    font-size: 14px;
    text-shadow: 0 0 5px rgba(255, 0, 0, 0.7);
    width: 40px;
    text-align: right;
}

.options-container { position: relative; }

/* Sub-menus */
.options-menu,
.slider-menu,
.media-menu {
    display: none;
    position: absolute;
    bottom: 100%;
    right: 0;
    background: linear-gradient(135deg, #ff000033, #cc000033); /* Default semi-transparent */
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(255, 0, 0, 1);
    flex-direction: column;
    gap: 15px;
    width: 220px;
    border: 1px solid rgba(255, 0, 0, 0.3);
}
.dashboard label {
    color: #fff;
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    text-shadow: 0 0 5px rgba(255, 0, 0, 0.7);
    width: 100px;
}

.dashboard button {
    padding: 10px 20px;
    font-size: 14px;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    background: linear-gradient(135deg, #ff0000, #cc0000);
    border: none;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 0, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
    margin-bottom: 10px;
}

.options-menu button {
    padding: 12px 20px;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
}

.dashboard button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 0, 0, 0.7), inset 0 0 15px rgba(255, 255, 255, 0.5);
    background: linear-gradient(135deg, #ff3333, #ff0000);
}

.dashboard button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(255, 0, 0, 0.3);
}

#zoomSlider, #speedSlider, #sizeSlider, #spacingSlider, #bgOpacitySlider, #gradientSpeed {
    appearance: none;
    -webkit-appearance: none;
    width: 150px;
    height: 8px;
    background: linear-gradient(135deg, #ff0000, #cc0000);
    border-radius: 4px;
    outline: none;
    opacity: 0.9;
    transition: opacity 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 0, 0, 0.5);
}

#zoomSlider:hover, #speedSlider:hover, #sizeSlider:hover, #spacingSlider:hover, #bgOpacitySlider:hover, #gradientSpeed:hover {
    opacity: 1;
}

#zoomSlider::-webkit-slider-thumb, #speedSlider::-webkit-slider-thumb, #sizeSlider::-webkit-slider-thumb, #spacingSlider::-webkit-slider-thumb, #bgOpacitySlider::-webkit-slider-thumb, #gradientSpeed::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.7), inset 0 0 5px rgba(255, 0, 0, 0.5);
    transition: transform 0.3s ease;
}

#zoomSlider::-webkit-slider-thumb:hover, #speedSlider::-webkit-slider-thumb:hover, #sizeSlider::-webkit-slider-thumb:hover, #spacingSlider::-webkit-slider-thumb:hover, #bgOpacitySlider::-webkit-slider-thumb:hover, #gradientSpeed::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}

/* Gradient Settings */
.gradient-settings {
    display: none;
    position: fixed;
    bottom: 200px;
    right: 20px;
    z-index: 1001;
    background: linear-gradient(135deg, #ff000033, #cc000033); /* Default semi-transparent */
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
    color: #fff;
    font-family: 'Arial', sans-serif;
}

.gradient-settings h3 {
    margin: 0 0 15px;
    text-shadow: 0 0 5px rgba(255, 0, 0, 0.7);
}

.gradient-settings .control-row { margin-bottom: 15px; }
.gradient-settings label { display: block; margin-bottom: 5px; }

#colorPickers {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.color-picker {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

/* Audio Player Styles (MP3 Player 1) */
.audio-player {
    display: none;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(135deg, #ff000033, #cc000033); /* Default semi-transparent */
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(187, 0, 0, 0.9);
}
.audio-controls {
    display: flex;
    justify-content: center;
    background-color: #000;
}
/* Mini Audio Player Styles */
#miniAudioPlayer {
    display: none;
    flex-direction: column; /* Changed to stack progress bar above buttons */
    align-items: flex-start;
    background: rgba(85, 85, 85, 0.9);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(187, 0, 0, 0.7);
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 500px;
    height: 60px;
    z-index: 1000;
    overflow: hidden;
}

#miniAlbumArt {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 10px;
}

#miniSongInfo {
    color: #fff;
    font-family: 'Arial', sans-serif;
    font-size: 14px;
    text-shadow: 0 0 5px rgba(255, 0, 0, 0.7);
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 10px;
}

.mini-controls {
    display: flex;
    gap: 5px;
}

#miniPlayPauseBtn, #miniPrevBtn, #miniNextBtn, #miniShuffleBtn, #volumeBtn {
    background: linear-gradient(135deg, #ff0000, #cc0000); /* Default, will be updated by JS */
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    width: 30px; /* Square shape */
    height: 30px; /* Square shape */
    border-radius: 8px; /* Rounded edges */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}

#miniPlayPauseBtn:hover, #miniPrevBtn:hover, #miniNextBtn:hover, #miniShuffleBtn:hover, #volumeBtn:hover {
    transform: scale(1.1); /* Slightly smaller scale for square buttons */
}

#miniProgressSlider, #miniVolumeSlider {
    appearance: none;
    -webkit-appearance: none;
    width: 150px; /* Wider for better visibility */
    height: 4px;
    background: linear-gradient(135deg, #ff0000, #cc0000); /* Default, updated by JS */
    border-radius: 2px;
    outline: none;
    margin: 5px 0; /* Space above and below */
}

#miniProgressSlider::-webkit-slider-thumb, #miniVolumeSlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.7);
}

#miniCurrentTime, #miniDuration {
    color: #fff;
    font-size: 12px;
    font-family: 'Arial', sans-serif;
    margin: 0 5px;
}

#miniVolumeSlider {
    display: none;
    position: absolute;
    bottom: 70px;
    right: 10px;
    width: 100px;
}


  
body {
    background: linear-gradient(45deg, #6a11cb, #2575fc); /* Gradient background */
    font-family: 'Arial', sans-serif;
    display: flex;
    flex-direction: column; /* Stack items vertically */
    justify-content: flex-start; /* Align clock to the top */
    align-items: center; /* Center clock horizontally */
    height: 100vh; /* Full height of the screen */
    margin: 0;
  }

  /* Styling for the clock container */
  #clock {
    font-size: 5rem;  /* Large font size */
    font-weight: bold;
    color: white;
    background: rgba(0, 0, 0, 0.4); /* Transparent black background */
    padding: 20px 40px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    text-align: center;
    display: flex;
    align-items: center; /* Center content vertically inside the clock */
    justify-content: center; /* Center content horizontally inside the clock */
    transition: 0.3s ease-in-out; /* Smooth transition for color change */
    margin-top: 20px; /* Adds a little space from the top */
  }

  /* Hover effect for clock */
  #clock:hover {
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }

  /* Blinking colon effect for separation */
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  /* Extra touch for smaller screens */
  @media (max-width: 600px) {
    #clock {
      font-size: 4rem;
      padding: 15px 30px;
    }
  }
