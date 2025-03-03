// Drag-and-drop support for file uploads
document.body.addEventListener('dragover', (e) => e.preventDefault());
document.body.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const fileInput = document.getElementById('fileInput');
        const mp3Input = document.getElementById('mp3Input');
        const droppedFiles = Array.from(files);

        // Separate MP3s from images/videos
        const mp3Files = droppedFiles.filter(file => file.type === 'audio/mpeg');
        const mediaFiles = droppedFiles.filter(file => 
            file.type === 'image/jpeg' || 
            file.type === 'image/png' || 
            file.type === 'video/mp4'
        );

        // Handle images/videos
        if (mediaFiles.length > 0) {
            fileInput.files = new DataTransfer().files; // Clear previous files
            const dataTransfer = new DataTransfer();
            mediaFiles.forEach(file => dataTransfer.items.add(file));
            fileInput.files = dataTransfer.files;
            fileInput.dispatchEvent(new Event('change')); // Trigger existing logic
        }

        // Handle MP3s (one at a time, as per your original logic)
        if (mp3Files.length > 0) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(mp3Files[0]); // Only first MP3 for simplicity
            mp3Input.files = dataTransfer.files;
            mp3Input.dispatchEvent(new Event('change')); // Trigger existing logic
        }
    }
});

// Clock functionality
function updateClock() {
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = hours + ':' + minutes + ':' + seconds;

    document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();  // Call immediately to avoid initial delay

// First slider controls
const firstSlider = document.querySelector('#first-slider');
let isFirstMouseDown = false;
let firstStartX, firstStartY;
let firstRotationX = -16;
let firstRotationY = 0;

function updateFirstSliderTransform() {
    firstSlider.style.transform = `perspective(2000px) rotateX(${firstRotationX}deg) rotateY(${firstRotationY}deg)`;
}
updateFirstSliderTransform();

firstSlider.addEventListener('mousedown', (e) => {
    isFirstMouseDown = true;
    firstStartX = e.clientX;
    firstStartY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (!isFirstMouseDown) return;
    const dx = e.clientX - firstStartX;
    const dy = e.clientY - firstStartY;
    firstRotationY += dx * 0.2;
    firstRotationX -= dy * 0.2;
    updateFirstSliderTransform();
    firstStartX = e.clientX;
    firstStartY = e.clientY;
});

document.addEventListener('mouseup', () => isFirstMouseDown = false);
document.addEventListener('mouseleave', () => isFirstMouseDown = false);

// Add new variables for X post handling
const addXPostButton = document.getElementById('addXPost');
let xPostPrompt;

// Second slider controls
const secondSlider = document.querySelector('#second-slider');
let isSecondMouseDown = false;
let secondStartX, secondStartY;
let secondRotationX = -16;
let secondRotationY = 0;

function updateSecondSliderTransform() {
    secondSlider.style.transform = `perspective(2000px) rotateX(${secondRotationX}deg) rotateY(${secondRotationY}deg)`;
}
updateSecondSliderTransform();

secondSlider.addEventListener('mousedown', (e) => {
    isSecondMouseDown = true;
    secondStartX = e.clientX;
    secondStartY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
    if (!isSecondMouseDown) return;
    const dx = e.clientX - secondStartX;
    const dy = e.clientY - secondStartY;
    secondRotationY += dx * 0.2;
    secondRotationX -= dy * 0.2;
    updateSecondSliderTransform();
    secondStartX = e.clientX;
    secondStartY = e.clientY;
});

document.addEventListener('mouseup', () => isSecondMouseDown = false);
document.addEventListener('mouseleave', () => isSecondMouseDown = false);

// Zoom control
const scene = document.querySelector('#scene');
const zoomSlider = document.getElementById('zoomSlider');
const zoomValueDisplay = document.getElementById('zoomValue');
const minZoom = 1000;
const maxZoom = -1000;

function updateZoom() {
    const zoomValue = zoomSlider.value;
    const translateZ = minZoom + (maxZoom - minZoom) * (zoomValue / 100);
    scene.style.transform = `perspective(2000px) translateZ(${translateZ}px)`;
    zoomValueDisplay.textContent = `${zoomValue}%`;
}
zoomSlider.addEventListener('input', updateZoom);
updateZoom();

// Spin speed control
const speedSlider = document.getElementById('speedSlider');
const speedValueDisplay = document.getElementById('speedValue');
const minSpeed = 60;
const maxSpeed = 5;
let isClockwise = true;

function updateSpinSpeed() {
    const speedValue = speedSlider.value;
    const duration = minSpeed - ((minSpeed - maxSpeed) * (speedValue / 100));
    document.querySelectorAll('.slider').forEach(slider => {
        slider.style.animation = `autorun ${duration}s linear infinite ${isClockwise ? '' : 'reverse'}`;
        if (speedValue > 0) {
            slider.style.animationPlayState = 'running';
        } else {
            slider.style.animationPlayState = 'paused';
        }
    });
    speedValueDisplay.textContent = `${speedValue}%`;
}
speedSlider.addEventListener('input', updateSpinSpeed);
updateSpinSpeed();

// Carousel radius control
const sizeSlider = document.getElementById('sizeSlider');
const sizeValueDisplay = document.getElementById('sizeValue');
const minRadius = 460;
const maxRadius = 1200;
const tiltThreshold = 700;
const minTilt = 0;
const maxTilt = 20;

function updateCarouselRadius() {
    const radius = sizeSlider.value;
    let tilt = radius <= tiltThreshold ? minTilt : minTilt + ((maxTilt - minTilt) * ((radius - tiltThreshold) / (maxRadius - tiltThreshold)));
    document.querySelectorAll('.slider').forEach(slider => {
        const items = slider.querySelectorAll('.item');
        items.forEach(item => {
            item.style.transform = `rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(${radius}px) rotateX(${tilt}deg)`;
        });
    });
    const radiusPercent = Math.round(((radius - minRadius) / (maxRadius - minRadius)) * 100);
    sizeValueDisplay.textContent = `${radiusPercent}%`;
}
sizeSlider.addEventListener('input', updateCarouselRadius);
updateCarouselRadius();

// Vertical spacing control
const spacingSlider = document.getElementById('spacingSlider');
const spacingValueDisplay = document.getElementById('spacingValue');
const minSpacing = 80;
const maxSpacing = 200;

function updateVerticalSpacing() {
    const spacing = spacingSlider.value;
    document.querySelectorAll('.banner').forEach((banner, index) => {
        banner.style.top = `${index * spacing}vh`;
    });
    const totalHeight = document.querySelectorAll('.banner').length * spacing;
    scene.style.minHeight = `${totalHeight + 50}vh`;
    document.body.style.minHeight = `${totalHeight + 50}vh`;
    const spacingPercent = Math.round(((spacing - minSpacing) / (maxSpacing - minSpacing)) * 100);
    spacingValueDisplay.textContent = `${spacingPercent}%`;
}
spacingSlider.addEventListener('input', updateVerticalSpacing);
updateVerticalSpacing();

// Background opacity control
const bgOpacitySlider = document.getElementById('bgOpacitySlider');
const bgOpacityValueDisplay = document.getElementById('bgOpacityValue');
const mainBackground = document.getElementById('mainBackground');

function updateBackgroundOpacity() {
    const opacityValue = 1 - (bgOpacitySlider.value / 100);
    mainBackground.style.opacity = opacityValue;
    bgOpacityValueDisplay.textContent = `${bgOpacitySlider.value}%`;
}
bgOpacitySlider.addEventListener('input', updateBackgroundOpacity);
updateBackgroundOpacity();

// Button color customization
const buttonColorPicker = document.getElementById('buttonColorPicker');
function updateButtonColors() {
    const color = buttonColorPicker.value;
    const darkerColor = adjustColor(color, -20);
    
    // Update button backgrounds
    document.querySelectorAll('.dashboard button, .gradient-settings button, .audio-controls button, .mini-controls button, .close-btn').forEach(button => {
        button.style.background = `linear-gradient(135deg, ${color}, ${darkerColor})`;
        button.style.boxShadow = `0 4px 15px ${color}80, inset 0 0 10px rgba(255, 255, 255, 0.3)`;
    });
    
    // Update slider backgrounds
    document.querySelectorAll('#zoomSlider, #speedSlider, #sizeSlider, #spacingSlider, #bgOpacitySlider, #gradientSpeed, #progressSlider, #volumeSlider, #miniProgressSlider, #miniVolumeSlider').forEach(slider => {
        slider.style.background = `linear-gradient(135deg, ${color}, ${darkerColor})`;
        slider.style.boxShadow = `0 4px 15px ${color}80`;
    });
    
    // Update menu backgrounds with semi-transparent gradient
    const menuElements = document.querySelectorAll('#miniAudioPlayer, .dashboard, .options-menu, .slider-menu, .media-menu, .gradient-settings, .audio-player');
    menuElements.forEach(menu => {
        menu.style.background = `linear-gradient(135deg, ${color}33, ${darkerColor}33)`;
        menu.style.boxShadow = `0 0 20px ${color}80`; // Consistent backlight
    });
}
buttonColorPicker.addEventListener('input', updateButtonColors);
updateButtonColors();

function adjustColor(hex, percent) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, Math.max(0, r + (r * percent / 100)));
    g = Math.min(255, Math.max(0, g + (g * percent / 100)));
    b = Math.min(255, Math.max(0, b + (b * percent / 100)));
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

// Intersection Observer for continuous spinning
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const slider = entry.target;
        if (entry.isIntersecting) {
            slider.classList.add('visible');
            if (speedSlider.value > 0) slider.style.animationPlayState = 'running';
        } else {
            slider.classList.remove('visible');
            if (speedSlider.value > 0) slider.style.animationPlayState = 'paused';
        }
    });
}, { threshold: 0.1, rootMargin: '1000px' });

document.querySelectorAll('.slider').forEach(slider => observer.observe(slider));

// Media handling
const mediaContainer = document.getElementById('mediaContainer');
const enlargedImg = document.getElementById('enlargedImg');
const videoPlayer = document.getElementById('videoPlayer');
const audioPlayer = document.getElementById('audioPlayer');
const audioElement = document.getElementById('audioElement');
const albumArt = document.getElementById('albumArt');
const songInfoPlayer = document.getElementById('songInfoPlayer');
const closeAudioBtn = document.getElementById('closeAudioBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const progressSlider = document.getElementById('progressSlider');
const volumeSlider = document.getElementById('volumeSlider');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const miniAudioPlayer = document.getElementById('miniAudioPlayer');
const miniAlbumArt = document.getElementById('miniAlbumArt');
const miniSongInfo = document.getElementById('miniSongInfo');
const miniPlayPauseBtn = document.getElementById('miniPlayPauseBtn');
const miniPrevBtn = document.getElementById('miniPrevBtn');
const miniNextBtn = document.getElementById('miniNextBtn');
const miniProgressSlider = document.getElementById('miniProgressSlider');
const miniCurrentTime = document.getElementById('miniCurrentTime');
const miniDuration = document.getElementById('miniDuration');
const volumeBtn = document.getElementById('volumeBtn');
const miniVolumeSlider = document.getElementById('miniVolumeSlider');
const miniShuffleBtn = document.getElementById('miniShuffleBtn');
const audioControls = document.querySelector('.audio-controls');

let playlist = [];
let currentTrackIndex = -1;
let isShuffled = false;

// Set initial volume to 20%
audioElement.volume = 0.2;

function updateMediaListeners() {
    document.querySelectorAll('.item img, .item video, .item .mp3-card').forEach(item => {
        item.removeEventListener('click', handleMediaClick);
        item.addEventListener('click', handleMediaClick);
    });
}

function handleMediaClick(e) {
    e.stopPropagation();
    if (isDeleteMode) {
        handleDeleteClick(e);
        return;
    }
    if (isReplaceMode) {
        replaceInput.click();
        replaceInput.dataset.target = e.target;
        return;
    }
    mediaContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';

    if (this.classList.contains('mp3-card') || (this.tagName === 'IMG' && this.dataset.mp3)) {
        audioPlayer.style.display = 'flex';
        enlargedImg.style.display = 'none';
        videoPlayer.style.display = 'none';
        miniAudioPlayer.style.display = 'none';
        const mp3Url = this.dataset.mp3;
        albumArt.src = this.dataset.art || 'default-album-art.jpg';
        miniAlbumArt.src = this.dataset.art || 'default-album-art.jpg';
        songInfoPlayer.textContent = this.dataset.title || 'Unknown Song';
        miniSongInfo.textContent = this.dataset.title || 'Unknown Song';
        audioElement.src = mp3Url;
        const trackIndex = playlist.findIndex(track => track.mp3 === mp3Url);
        currentTrackIndex = trackIndex !== -1 ? trackIndex : playlist.length;
        if (trackIndex === -1) {
            playlist.push({ art: this.dataset.art, mp3: mp3Url, title: this.dataset.title, album: this.dataset.album });
        }
        audioElement.play();
        playPauseBtn.textContent = '⏸️';
        miniPlayPauseBtn.textContent = '⏸️';
    } else if (this.tagName === 'IMG') {
        enlargedImg.src = this.src;
        enlargedImg.alt = this.alt;
        enlargedImg.style.display = 'block';
        videoPlayer.style.display = 'none';
        audioPlayer.style.display = 'none';
        miniAudioPlayer.style.display = 'none';
        enlargedImg.classList.add('pulsate');
    } else if (this.tagName === 'VIDEO') {
        videoPlayer.src = this.src;
        videoPlayer.style.display = 'block';
        enlargedImg.style.display = 'none';
        audioPlayer.style.display = 'none';
        miniAudioPlayer.style.display = 'none';
        videoPlayer.play();
    }
}

mediaContainer.addEventListener('click', (e) => {
    if (audioPlayer.style.display === 'flex' && !audioPlayer.contains(e.target)) {
        closeMediaContainer();
    } else if (enlargedImg.style.display === 'block' || videoPlayer.style.display === 'block') {
        closeMediaContainer();
    }
});

closeAudioBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMediaContainer();
});

function closeMediaContainer() {
    mediaContainer.classList.add('fade-out');
    setTimeout(() => {
        mediaContainer.style.display = 'none';
        mediaContainer.classList.remove('fade-out');
        enlargedImg.style.display = 'none';
        enlargedImg.classList.remove('pulsate');
        videoPlayer.style.display = 'none';
        videoPlayer.pause();
        audioPlayer.style.display = 'none';
        if (!audioElement.paused) {
            console.log('Showing mini audio player');
            miniAudioPlayer.style.display = 'flex';
            miniAlbumArt.src = albumArt.src;
            miniSongInfo.textContent = songInfoPlayer.textContent;
            miniPlayPauseBtn.textContent = audioElement.paused ? '▶️' : '⏸️';
        } else {
            miniAudioPlayer.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
    }, 500);
}

// Add and Delete functionality
const addPictureButton = document.getElementById('addPicture');
const addMp3Button = document.getElementById('addMp3');
const addFolderButton = document.getElementById('addFolder');
const bgToggleBtn = document.getElementById('bgToggleBtn');
const deletePictureButton = document.getElementById('deletePicture');
const replacePictureButton = document.getElementById('replacePicture');
const fileInput = document.getElementById('fileInput');
const mp3Input = document.getElementById('mp3Input');
const folderInput = document.getElementById('folderInput');
const bgImageInput = document.getElementById('bgImageInput');
const replaceInput = document.getElementById('replaceInput');
let carouselCount = 2;
let isDeleteMode = false;
let isReplaceMode = false;

addXPostButton.addEventListener('click', () => {
    console.log('Add X Post button clicked');
    if (xPostPrompt) {
        xPostPrompt.remove();
    }
    xPostPrompt = document.createElement('div');
    xPostPrompt.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        padding: 20px;
        border-radius: 15px;
        z-index: 1001;
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
    `;
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter X post URL (e.g., https://x.com/username/status/123)';
    input.style.cssText = `
        width: 300px;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: none;
        font-size: 14px;
    `;
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Add';
    submitBtn.style.cssText = `
        padding: 10px 20px;
        margin-right: 10px;
        background: linear-gradient(135deg, #ff0000, #cc0000);
        border: none;
        border-radius: 25px;
        color: #fff;
        cursor: pointer;
    `;
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        padding: 10px 20px;
        background: linear-gradient(135deg, #ff0000, #cc0000);
        border: none;
        border-radius: 25px;
        color: #fff;
        cursor: pointer;
    `;
    submitBtn.addEventListener('click', () => {
        console.log('Submit button clicked, URL:', input.value);
        handleXPostSubmit(input.value);
    });
    cancelBtn.addEventListener('click', () => {
        console.log('Cancel button clicked');
        xPostPrompt.remove();
    });
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('Enter pressed, URL:', input.value);
            handleXPostSubmit(input.value);
        }
    });
    xPostPrompt.appendChild(input);
    xPostPrompt.appendChild(submitBtn);
    xPostPrompt.appendChild(cancelBtn);
    document.body.appendChild(xPostPrompt);
    input.focus();
    closeMenusAfterDelay();
});

function handleXPostSubmit(url) {
    console.log('handleXPostSubmit called with URL:', url);
    const xPostRegex = /^https:\/\/(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/;
    if (!xPostRegex.test(url)) {
        alert('Please enter a valid X post URL');
        console.log('Invalid URL format');
        return;
    }
    const sanitizedUrl = encodeURI(url);
    console.log('Sanitized URL:', sanitizedUrl);
    const postCard = document.createElement('div');
    postCard.className = 'x-post-card';
    postCard.dataset.xUrl = sanitizedUrl;
    postCard.innerHTML = `
        <div class="post-content">Loading X post...</div>
        <div class="post-meta"></div>
    `;
    console.log('Adding post card to carousel');
    addXPostToCarousel(postCard);
    fetchXPostData(sanitizedUrl)
        .then(data => {
            console.log('Fetched X post data:', data);
            postCard.querySelector('.post-content').textContent = data.text || 'Post content unavailable';
            postCard.querySelector('.post-meta').textContent = `${data.username || 'Unknown'} • ${new Date().toLocaleDateString()}`;
            updateMediaListeners();
        })
        .catch(error => {
            console.error('Error fetching X post:', error);
            postCard.querySelector('.post-content').textContent = 'Failed to load X post';
            updateMediaListeners();
        });
    if (xPostPrompt) {
        xPostPrompt.remove();
        console.log('Prompt removed');
    }
}

function addXPostToCarousel(postCard) {
    console.log('addXPostToCarousel called');
    const sliders = document.querySelectorAll('.slider');
    let added = false;
    for (let slider of sliders) {
        const emptyItems = Array.from(slider.querySelectorAll('.item')).filter(item => item.children.length === 0);
        console.log('Found empty items in slider:', emptyItems.length);
        if (emptyItems.length > 0) {
            emptyItems[0].appendChild(postCard);
            added = true;
            console.log('Post card added to existing slider');
            break;
        }
    }
    if (!added) {
        console.log('Creating new slider for post card');
        const newSlider = createNewSlider();
        const firstItem = newSlider.querySelector('.item');
        firstItem.appendChild(postCard);
        console.log('Post card added to new slider');
    }
    updateMediaListeners();
}

async function fetchXPostData(url) {
    console.log('fetchXPostData called with URL:', url);
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = {
                text: "This is a sample X post content",
                username: "SampleUser"
            };
            console.log('fetchXPostData resolving with:', mockData);
            resolve(mockData);
        }, 1000);
    });
}

addPictureButton.addEventListener('click', () => fileInput.click());
addMp3Button.addEventListener('click', () => mp3Input.click());
addFolderButton.addEventListener('click', () => folderInput.click());
bgToggleBtn.addEventListener('click', () => bgImageInput.click());

deletePictureButton.addEventListener('click', () => {
    isDeleteMode = !isDeleteMode;
    deletePictureButton.textContent = isDeleteMode ? 'Cancel Delete' : 'Delete Media';
    document.querySelectorAll('.item img, .item video, .item .mp3-card').forEach(item => {
        item.style.cursor = 'pointer';
        item.style.outline = isDeleteMode ? '2px solid red' : 'none';
    });
    closeMenusAfterDelay();
});

replacePictureButton.addEventListener('click', () => {
    isReplaceMode = !isReplaceMode;
    replacePictureButton.textContent = isReplaceMode ? 'Cancel Replace' : 'Replace Media';
    document.querySelectorAll('.item img, .item video, .item .mp3-card').forEach(item => {
        item.style.cursor = 'pointer';
        item.style.outline = isReplaceMode ? '2px solid yellow' : 'none';
    });
    closeMenusAfterDelay();
});

function handleDeleteClick(e) {
    e.stopPropagation();
    if (!isDeleteMode) return;
    const item = e.target.parentElement;
    while (item.firstChild) item.removeChild(item.firstChild);
    isDeleteMode = false;
    deletePictureButton.textContent = 'Delete Media';
    updateMediaListeners();
    document.querySelectorAll('.item img, .item video, .item .mp3-card').forEach(item => item.style.outline = 'none');
}

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files).filter(file => 
        file.type === 'image/jpeg' || 
        file.type === 'image/png' || 
        file.type === 'video/mp4'
    );
    if (!files.length) return;

    let remainingFiles = files.slice();
    const sliders = document.querySelectorAll('.slider');

    for (let slider of sliders) {
        const emptyItems = Array.from(slider.querySelectorAll('.item')).filter(item => item.children.length === 0);
        for (let i = 0; i < emptyItems.length && remainingFiles.length > 0; i++) {
            const file = remainingFiles.shift();
            const item = emptyItems[i];
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.alt = `Uploaded Image`;
                item.appendChild(img);
            } else if (file.type === 'video/mp4') {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.muted = true;
                video.loop = true;
                video.playsinline = true;
                video.preload = 'auto';
                item.appendChild(video);
            }
        }
        if (remainingFiles.length === 0) break;
    }

    while (remainingFiles.length > 0) {
        const newSlider = createNewSlider();
        const items = newSlider.querySelectorAll('.item');
        const emptyItems = Array.from(items).filter(item => item.children.length === 0);
        const filesToAdd = remainingFiles.splice(0, Math.min(emptyItems.length, remainingFiles.length));
        filesToAdd.forEach((file, index) => {
            const item = emptyItems[index];
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.alt = `Uploaded Image`;
                item.appendChild(img);
            } else if (file.type === 'video/mp4') {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.muted = true;
                video.loop = true;
                video.playsinline = true;
                video.preload = 'auto';
                item.appendChild(video);
            }
        });
    }

    document.querySelectorAll('.slider.visible video').forEach(video => video.play());
    updateMediaListeners();
    fileInput.value = '';
    closeMenusAfterDelay();
});

mp3Input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    jsmediatags.read(file, {
        onSuccess: (tag) => {
            const picture = tag.tags.picture;
            let albumArtUrl = 'default-album-art.jpg';
            if (picture) {
                const base64String = arrayBufferToBase64(picture.data, picture.format);
                albumArtUrl = `data:${picture.format};base64,${base64String}`;
            }
            const title = tag.tags.title || file.name;
            const album = tag.tags.album || 'Unknown Album';
            addMp3ToCarousel(file, albumArtUrl, title, album);
        },
        onError: (error) => {
            console.error('Error reading MP3 tags:', error);
            addMp3ToCarousel(file, 'default-album-art.jpg', file.name, 'Unknown Album');
        }
    });
    mp3Input.value = '';
    closeMenusAfterDelay();
});

folderInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
        jsmediatags.read(file, {
            onSuccess: (tag) => {
                const picture = tag.tags.picture;
                let albumArtUrl = 'default-album-art.jpg';
                if (picture) {
                    const base64String = arrayBufferToBase64(picture.data, picture.format);
                    albumArtUrl = `data:${picture.format};base64,${base64String}`;
                }
                const title = tag.tags.title || file.name;
                const album = tag.tags.album || 'Unknown Album';
                addMp3ToCarousel(file, albumArtUrl, title, album);
            },
            onError: (error) => {
                console.error('Error reading MP3 tags:', error);
                addMp3ToCarousel(file, 'default-album-art.jpg', file.name, 'Unknown Album');
            }
        });
    });
    folderInput.value = '';
    closeMenusAfterDelay();
});

bgImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        mainBackground.style.background = `#000000 url(${imageUrl}) no-repeat center center fixed`;
        mainBackground.style.backgroundSize = 'contain';
        mainBackground.style.animation = 'none';
        mainBackground.classList.remove('gradient-bg');
        backgroundLayer.style.background = `url(${imageUrl}) no-repeat center center fixed`;
        backgroundLayer.style.backgroundSize = '175%';
        backgroundLayer.style.filter = 'blur(5px)';
        backgroundLayer.style.opacity = '0.7';
        isGradient = false;
        bgToggleBtn.textContent = 'Switch to Gradient';
        bgImageInput.value = '';
        updateBackgroundOpacity();
    }
    closeMenusAfterDelay();
});

replaceInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file || !isReplaceMode || !replaceInput.dataset.target) return;

    const target = replaceInput.dataset.target;
    const item = target.parentElement;

    if (file.type === 'audio/mpeg') {
        jsmediatags.read(file, {
            onSuccess: (tag) => {
                const picture = tag.tags.picture;
                let albumArtUrl = 'default-album-art.jpg';
                if (picture) {
                    const base64String = arrayBufferToBase64(picture.data, picture.format);
                    albumArtUrl = `data:${picture.format};base64,${base64String}`;
                }
                const title = tag.tags.title || file.name;
                const album = tag.tags.album || 'Unknown Album';
                replaceMp3(item, file, albumArtUrl, title, album);
            },
            onError: (error) => {
                console.error('Error reading MP3 tags:', error);
                replaceMp3(item, file, 'default-album-art.jpg', file.name, 'Unknown Album');
            }
        });
    } else if (file.type.startsWith('image/') || file.type === 'video/mp4') {
        while (item.firstChild) item.removeChild(item.firstChild);
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = `Replaced Image`;
            item.appendChild(img);
        } else if (file.type === 'video/mp4') {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.muted = true;
            video.loop = true;
            video.playsinline = true;
            video.preload = 'auto';
            item.appendChild(video);
            if (item.closest('.slider.visible')) video.play();
        }
    }

    isReplaceMode = false;
    replacePictureButton.textContent = 'Replace Media';
    document.querySelectorAll('.item img, .item video, .item .mp3-card').forEach(item => item.style.outline = 'none');
    updateMediaListeners();
    replaceInput.value = '';
    closeMenusAfterDelay();
});

function arrayBufferToBase64(data, format) {
    const binary = data.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return window.btoa(binary);
}

function addMp3ToCarousel(file, albumArtUrl, title, album) {
    const sliders = document.querySelectorAll('.slider');
    let added = false;

    for (let slider of sliders) {
        const emptyItems = Array.from(slider.querySelectorAll('.item')).filter(item => item.children.length === 0);
        if (emptyItems.length > 0) {
            const item = emptyItems[0];
            if (albumArtUrl === 'default-album-art.jpg') {
                const card = document.createElement('div');
                card.className = 'mp3-card';
                card.dataset.mp3 = URL.createObjectURL(file);
                card.dataset.art = albumArtUrl;
                card.dataset.title = title;
                card.dataset.album = album;

                const img = document.createElement('img');
                img.src = albumArtUrl;
                card.appendChild(img);

                const songInfo = document.createElement('div');
                songInfo.className = 'song-info';
                songInfo.textContent = title;
                card.appendChild(songInfo);

                item.appendChild(card);
            } else {
                const img = document.createElement('img');
                img.src = albumArtUrl;
                img.dataset.mp3 = URL.createObjectURL(file);
                img.dataset.art = albumArtUrl;
                img.dataset.title = title;
                img.dataset.album = album;
                item.appendChild(img);
            }
            playlist.push({ art: albumArtUrl, mp3: item.children[0].dataset.mp3, title: title, album: album });
            added = true;
            break;
        }
    }

    if (!added) {
        const newSlider = createNewSlider();
        const item = newSlider.querySelector('.item');
        if (albumArtUrl === 'default-album-art.jpg') {
            const card = document.createElement('div');
            card.className = 'mp3-card';
            card.dataset.mp3 = URL.createObjectURL(file);
            card.dataset.art = albumArtUrl;
            card.dataset.title = title;
            card.dataset.album = album;

            const img = document.createElement('img');
            img.src = albumArtUrl;
            card.appendChild(img);

            const songInfo = document.createElement('div');
            songInfo.className = 'song-info';
            songInfo.textContent = title;
            card.appendChild(songInfo);

            item.appendChild(card);
        } else {
            const img = document.createElement('img');
            img.src = albumArtUrl;
            img.dataset.mp3 = URL.createObjectURL(file);
            img.dataset.art = albumArtUrl;
            img.dataset.title = title;
            img.dataset.album = album;
            item.appendChild(img);
        }
        playlist.push({ art: albumArtUrl, mp3: item.children[0].dataset.mp3, title: title, album: album });
    }

    updateMediaListeners();
}

function replaceMp3(item, file, albumArtUrl, title, album) {
    while (item.firstChild) item.removeChild(item.firstChild);
    if (albumArtUrl === 'default-album-art.jpg') {
        const card = document.createElement('div');
        card.className = 'mp3-card';
        card.dataset.mp3 = URL.createObjectURL(file);
        card.dataset.art = albumArtUrl;
        card.dataset.title = title;
        card.dataset.album = album;

        const img = document.createElement('img');
        img.src = albumArtUrl;
        card.appendChild(img);

        const songInfo = document.createElement('div');
        songInfo.className = 'song-info';
        songInfo.textContent = title;
        card.appendChild(songInfo);

        item.appendChild(card);
    } else {
        const img = document.createElement('img');
        img.src = albumArtUrl;
        img.dataset.mp3 = URL.createObjectURL(file);
        img.dataset.art = albumArtUrl;
        img.dataset.title = title;
        img.dataset.album = album;
        item.appendChild(img);
    }
    const index = playlist.findIndex(track => track.mp3 === item.children[0].dataset.mp3);
    if (index !== -1) {
        playlist[index] = { art: albumArtUrl, mp3: item.children[0].dataset.mp3, title: title, album: album };
    } else {
        playlist.push({ art: albumArtUrl, mp3: item.children[0].dataset.mp3, title: title, album: album });
    }
}

function createNewSlider() {
    carouselCount++;
    const newBanner = document.createElement('div');
    newBanner.className = 'banner';
    newBanner.id = `banner${carouselCount}`;
    const newSlider = document.createElement('div');
    newSlider.className = 'slider';
    newSlider.id = `slider-${carouselCount}`;
    newSlider.style.setProperty('--quantity', 10);
    newBanner.appendChild(newSlider);
    scene.appendChild(newBanner);

    for (let i = 1; i <= 10; i++) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'item';
        emptyItem.style.setProperty('--position', i);
        newSlider.appendChild(emptyItem);
    }

    let isMouseDown = false;
    let startX, startY;
    let rotationX = -16;
    let rotationY = 0;

    newSlider.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        rotationY += dx * 0.2;
        rotationX -= dy * 0.2;
        newSlider.style.transform = `perspective(2000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mouseup', () => isMouseDown = false);
    document.addEventListener('mouseleave', () => isMouseDown = false);

    updateSpinSpeed();
    updateCarouselRadius();
    updateVerticalSpacing();
    observer.observe(newSlider);
    return newSlider;
}

// Dashboard toggle
const optionsBtn = document.getElementById('optionsBtn');
const mediaBtn = document.getElementById('mediaBtn');
const slidersBtn = document.getElementById('slidersBtn');
const dashboard = document.getElementById('dashboard');
const optionsMenu = document.getElementById('optionsMenu');
const mediaMenu = document.getElementById('mediaMenu');
const sliderMenu = document.getElementById('sliderMenu');
let timeoutId;
let isHovering = false;

function closeMenus() {
    if (!isHovering) {
        dashboard.classList.add('collapsed');
        optionsMenu.style.display = 'none';
        mediaMenu.style.display = 'none';
        sliderMenu.style.display = 'none';
    }
}

function closeMenusAfterDelay() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(closeMenus, 10000);
}

dashboard.addEventListener('mouseenter', () => {
    isHovering = true;
    clearTimeout(timeoutId);
});

dashboard.addEventListener('mouseleave', () => {
    isHovering = false;
    closeMenusAfterDelay();
});

optionsBtn.addEventListener('click', () => {
    dashboard.classList.toggle('collapsed');
    optionsMenu.style.display = dashboard.classList.contains('collapsed') ? 'none' : 'block';
    mediaMenu.style.display = 'none';
    sliderMenu.style.display = 'none';
    closeMenusAfterDelay();
});

mediaBtn.addEventListener('click', () => {
    mediaMenu.style.display = mediaMenu.style.display === 'block' ? 'none' : 'block';
    optionsMenu.style.display = 'none';
    sliderMenu.style.display = 'none';
    closeMenusAfterDelay();
});

slidersBtn.addEventListener('click', () => {
    sliderMenu.style.display = sliderMenu.style.display === 'block' ? 'none' : 'block';
    optionsMenu.style.display = 'none';
    mediaMenu.style.display = 'none';
    closeMenusAfterDelay();
});

document.addEventListener('click', (e) => {
    if (!dashboard.contains(e.target) && !mediaContainer.contains(e.target)) {
        closeMenus();
    }
});

const fullscreenBtn = document.getElementById('fullscreenBtn');
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.textContent = 'Exit Full Screen';
    } else {
        document.exitFullscreen();
        fullscreenBtn.textContent = 'Full Screen';
    }
    closeMenus();
});

let isGradient = true;
bgToggleBtn.addEventListener('click', () => {
    if (isGradient) bgImageInput.click();
    else {
        mainBackground.style.background = 'none';
        mainBackground.style.backgroundColor = '#000000';
        mainBackground.style.backgroundSize = '';
        mainBackground.style.animation = '';
        mainBackground.classList.add('gradient-bg');
        backgroundLayer.style.background = 'none';
        isGradient = true;
        bgToggleBtn.textContent = 'Add Background';
        updateGradient();
    }
});

const directionToggleBtn = document.getElementById('directionToggleBtn');
directionToggleBtn.addEventListener('click', () => {
    isClockwise = !isClockwise;
    directionToggleBtn.textContent = isClockwise ? 'Reverse Direction' : 'Normal Direction';
    updateSpinSpeed();
    closeMenus();
});

const gradientSettingsBtn = document.getElementById('gradientSettingsBtn');
const gradientSettings = document.getElementById('gradientSettings');
const gradientSpeed = document.getElementById('gradientSpeed');
const gradientSpeedValueDisplay = document.getElementById('gradientSpeedValue');
const colorPickers = document.querySelectorAll('.color-picker');
const closeGradientSettings = document.getElementById('closeGradientSettings');

gradientSettingsBtn.addEventListener('click', () => {
    gradientSettings.style.display = 'block';
    closeMenus();
});

closeGradientSettings.addEventListener('click', () => gradientSettings.style.display = 'none');

function updateGradient() {
    if (!isGradient) return;
    const colors = Array.from(colorPickers).map(picker => picker.value);
    const speed = gradientSpeed.value;
    mainBackground.style.background = `#000000 linear-gradient(90deg, ${colors.join(', ')}, ${colors[0]})`;
    mainBackground.style.backgroundSize = '300% 100%';
    mainBackground.style.animation = `scrollBackground ${speed}s linear infinite`;
    const speedPercent = Math.round(((speed - 20) / (120 - 20)) * 100);
    gradientSpeedValueDisplay.textContent = `${speedPercent}%`;
    updateBackgroundOpacity();
}

gradientSpeed.addEventListener('input', updateGradient);
colorPickers.forEach(picker => picker.addEventListener('input', updateGradient));
updateGradient();

// Audio player controls
function playTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentTrackIndex = index;
    audioElement.src = playlist[index].mp3;
    albumArt.src = playlist[index].art || 'default-album-art.jpg';
    miniAlbumArt.src = playlist[index].art || 'default-album-art.jpg';
    songInfoPlayer.textContent = playlist[index].title || 'Unknown Song';
    miniSongInfo.textContent = playlist[index].title || 'Unknown Song';
    audioElement.play();
    playPauseBtn.textContent = '⏸️';
    miniPlayPauseBtn.textContent = '⏸️';
}

// Mini audio player controls
miniPlayPauseBtn.addEventListener('click', () => {
    console.log('Mini play/pause clicked');
    if (audioElement.paused) {
        audioElement.play();
        miniPlayPauseBtn.textContent = '⏸️';
        playPauseBtn.textContent = '⏸️';
    } else {
        audioElement.pause();
        miniPlayPauseBtn.textContent = '▶️';
        playPauseBtn.textContent = '▶️';
    }
});

miniPrevBtn.addEventListener('click', () => {
    console.log('Mini prev clicked');
    if (currentTrackIndex > 0) {
        playTrack(currentTrackIndex - 1);
    }
});

miniNextBtn.addEventListener('click', () => {
    console.log('Mini next clicked');
    if (currentTrackIndex < playlist.length - 1) {
        playTrack(currentTrackIndex + 1);
    }
});

miniProgressSlider.addEventListener('input', () => {
    console.log('Mini progress slider moved');
    const seekTime = (miniProgressSlider.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

volumeBtn.addEventListener('click', () => {
    console.log('Volume button clicked');
    miniVolumeSlider.style.display = miniVolumeSlider.style.display === 'block' ? 'none' : 'block';
});

miniVolumeSlider.addEventListener('input', () => {
    console.log('Mini volume adjusted:', miniVolumeSlider.value);
    audioElement.volume = miniVolumeSlider.value;
    volumeSlider.value = miniVolumeSlider.value;
});

miniShuffleBtn.addEventListener('click', () => {
    console.log('Mini shuffle clicked');
    isShuffled = !isShuffled;
    miniShuffleBtn.style.opacity = isShuffled ? '1' : '0.5';
    shuffleBtn.style.opacity = isShuffled ? '1' : '0.5';
    if (isShuffled) {
        playlist = shuffleArray(playlist);
        currentTrackIndex = 0;
        playTrack(currentTrackIndex);
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

// Initial setup
updateFirstSliderTransform();
updateSecondSliderTransform();
updateMediaListeners();
