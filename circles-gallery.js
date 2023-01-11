// Here goes all the action
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
            galleryItems.appendChild(galleryItem);
        });
    }
    element.appendChild(galleryItems);

    var activeItem = document.querySelector('.active-item');
    var galleryItemsAll = document.querySelectorAll('.gallery-item');
    galleryItemsAll.forEach(function(item, i) {
        item.style.top = angleToX(
            activeItem.offsetTop - item.clientHeight / 2, 
            activeItem.clientHeight / 2 + item.clientHeight / 2 + options.distance, 
            - (270 / galleryItemsAll.length * (i + 1) - 45)) + 'px';
        item.style.left = angleToY(
            activeItem.offsetLeft - item.clientWidth / 2, 
            activeItem.clientWidth / 2 + item.clientWidth / 2 + options.distance, 
            - (270 / galleryItemsAll.length * (i + 1) - 45)) + 'px';
        item.style.background = '#de7f5f';
    });
}

function angleToX(originX, r, theta) {
    theta = (theta - 180) * Math.PI / 180;

    return originX + r * Math.cos(theta);
}

function angleToY(originY, r, theta) {
    theta = (theta - 180) * Math.PI / 180;

    return originY - r * Math.sin(theta);
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
