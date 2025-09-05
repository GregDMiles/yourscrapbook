
function register() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user && pass) {
        localStorage.setItem(user, pass);
        alert('Registered successfully!');
    } else {
        alert('Please enter username and password');
    }
}

function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (localStorage.getItem(user) === pass) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('userDisplay').innerText = user;
        loadGallery(user);
    } else {
        alert('Invalid credentials');
    }
}

function logout() {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('gallery').innerHTML = '';
}

function uploadMedia() {
    const user = document.getElementById('userDisplay').innerText;
    const files = document.getElementById('mediaUpload').files;
    let gallery = JSON.parse(localStorage.getItem(user + '_gallery') || '[]');
    let count = files.length;
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            gallery.push({ type: file.type, data: e.target.result });
            localStorage.setItem(user + '_gallery', JSON.stringify(gallery));
            count--;
            if (count === 0) loadGallery(user);
        }
        reader.readAsDataURL(file);
    }
}

function loadGallery(user) {
    const galleryDiv = document.getElementById('gallery');
    galleryDiv.innerHTML = '';
    const gallery = JSON.parse(localStorage.getItem(user + '_gallery') || '[]');
    for (let item of gallery) {
        if (item.type.startsWith('image')) {
            const img = document.createElement('img');
            img.src = item.data;
            galleryDiv.appendChild(img);
        } else if (item.type.startsWith('video')) {
            const video = document.createElement('video');
            video.src = item.data;
            video.controls = true;
            galleryDiv.appendChild(video);
        }
    }
}
