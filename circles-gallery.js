var activeItem;

// Here all the action starts
function init(element, options) {
    // create the gallery items container
    var galleryItems = document.createElement('div');
    galleryItems.className = 'gallery-items';

    // check if options paramter has items 
    if(options.items && options.items.length > 0) {
        // create gallery items
        options.items.forEach(function(item, i) {
            var galleryItem = document.createElement('div');
            if(i == 0){ // first item is added as the active item in gallery
                galleryItem.className = 'active-item';
                galleryItem.innerHTML = '<a href="#"></a>';
            }
            else {  // the rest of items are added as gallery items
                galleryItem.id = 'gallery-item-' + i;
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = '<a href="#gallery-item-' + i + '"></a>';
            }
            galleryItem.style.backgroundImage = `url(${item.image})`;
            galleryItem.style.backgroundSize = 'cover';
            galleryItems.appendChild(galleryItem);
        });
    }
    element.appendChild(galleryItems);

    
    activeItem = document.querySelector('.active-item');
    animate(activeItem, 5000, 0, 5);

    // setting style for each gallery item
    var galleryItemsAll = document.querySelectorAll('.gallery-item');
    galleryItemsAll.forEach(function(item, i) {
        // set position with reference to active gallery item
        item.style.top = angleToY(
            activeItem.offsetTop + item.clientHeight * 2, 
            activeItem.clientHeight / 2 + item.clientHeight / 2 + options.distance, 
            - (360 / galleryItemsAll.length * (i + 1) - 45)) + 'px';
        item.style.left = angleToX(
            activeItem.offsetLeft + item.clientWidth * 2, 
            activeItem.clientWidth / 2 + item.clientWidth / 2 + options.distance, 
            - (360 / galleryItemsAll.length * (i + 1) - 45)) + 'px';
        
        // attach click event to the item
        item.addEventListener('click', function(e) {
            swapImages(item, activeItem);
        });

        // animate the item
        animate(item, 4000, 360 / galleryItemsAll.length * i, 50);
    });
}

/// Got the idea from here https://stackoverflow.com/a/43642478/2398288
/// calculate x coordinate from angle, distance, and an origin point
/// originX: the x coordinate of origin point
/// r: radius (distance)
/// theta: angle
function angleToY(originY, r, theta) {
    theta = (theta - 180) * Math.PI / 180;

    return originY + r * Math.cos(theta);
}

/// Got the idea from here https://stackoverflow.com/a/43642478/2398288
/// calculate y coordinate from angle, distance, and an origin point
/// originY: the y coordinate of origin point
/// r: radius (distance)
/// theta: angle
function angleToX(originX, r, theta) {
    theta = (theta - 180) * Math.PI / 180;

    return originX - r * Math.sin(theta);
}

/// create circular rotation
/// element: item to be rotated
/// duration: 
function animate(element, duration, startAngle, r){
    var steps = 0.0;
    setInterval(() => {
        if(steps == duration / 10) {
            steps = 0.0;
        }

        element.style.transform = `rotate(${startAngle + (360 / (duration / 10) * steps)}deg)`;
        element.style.transform += `translate(${r}px)`; 
        element.style.transform += `rotate(${- (startAngle + (360 / (duration / 10) * steps))}deg)`;

        steps++;
    }, 10);
}

function swapImages(sourceElement, targetElement) {
    var temp = sourceElement.style.backgroundImage;
    targetElement.style.backgroundImage = sourceElement.style.backgroundImage;
    sourceElement.style.backgroundImage = temp;
}

// add circle gallery function to DOM elements when using Vanilla JavaScript
Element.prototype.circlesGallery = function(options = {}) {
    init(this, options);
}

// add circle gallery function to jQuery elements when using jQuery
if(window.jQuery) {
    jQuery.fn.extend({
        circlesGallery: function(options = {}) {
            let that = this;
            return this.each(function() {
                init(that[0], options);
            });
        }
    });
}
