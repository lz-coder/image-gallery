const gallery_items = document.getElementsByClassName("gallery-item");
const gallery_container = document.querySelector("body");

function animateItem(item, dir) {
    item.animate ([
        {transform: 'scale(1, 1)'},
        {transform: 'scale(1.2, 1.2)'}
    ], 
    {
        duration: 150,
        direction: dir
    });
}

function zoomModalAnimation(item, dir) {
    item.animate ([
        {transform: 'scale(0)'},
        {transform: 'scale(1)'}
    ], {
        duration: 300,
        direction: dir
    });

}

function viewImage(img) {
    const viewer = document.createElement('div');
    viewer.className = "modal";
    const viewer_close_button = document.createElement("span");
    viewer_close_button.innerHTML = "&times;";
    viewer_close_button.className = "close";
    const image = document.createElement("img");
    image.className += "modal-content";
    image.src = img;
    zoomModalAnimation(image, "normal");

    viewer.appendChild(viewer_close_button);
    viewer.appendChild(image);
    gallery_container.appendChild(viewer);

    viewer_close_button.onclick = function () {
        zoomModalAnimation(image, "reverse");
        setTimeout(function () {gallery_container.removeChild(viewer)}, 200);
    }

}

for (i=0; i <gallery_items.length; i++) {
    gallery_items[i].addEventListener('mouseover', function() {
        this.style.transform = "scale(1.2, 1.2)";
        animateItem(this, "normal");
        this.style.boxShadow = "0 0 5px red";
        this.style.zIndex = "2";
        this.style.cursor = "pointer";
    });
    gallery_items[i].addEventListener('mouseout', function() {
        animateItem(this, "reverse");
        this.style.transform = "scale(1, 1)";
        this.style.boxShadow = "none";
        this.style.zIndex = "1";
    });
    gallery_items[i].addEventListener('click', function() {
        viewImage(this.src);
    });
}