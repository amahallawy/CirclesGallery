# Circles Gallery
This is a library that will give your website a cool circular photo gallery.

You can use it by adding CSS and JS files to your HTML
```html
<link rel="stylesheet" href="circles-gallery.css">
```
```html
<script src="circles-gallery.js"></script>
```

It's working with both Vanilla JavaScript and jQuery. Just be noted, when working with jQuery, its JS file must be referenced before CirclesGallery JS file.

To use CirclesGallery simply with Vanilla JavaScript
```js
var gallery = document.querySelector('.gallery');<br/>
gallery.circlesGallery(galleryOptions);
```

and with jQuery
```js
$('.gallery').circlesGallery(galleryOptions);
```

the `galleryOptions` parameter contains all options for creating the gallery in the way you like it.