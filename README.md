fluid-text
===========
Make your text always fit both the width & height of a container.

## Installation
You can either use the JS file directly in the browser or use it as a Node module with Browserify or Webpack.

For Node.js: `npm install --save fluidtext`

## Use
```css
#text {
  height: 20px,
  width: 20px
}
```
```html
<div id="text">
  This text will adjust to both the width and the height of its container.  Resize the window to try it.
</div>
```
```javascript
var text     = document.querySelector('#text');
var adjuster = fluidText(text);
window.addEventListener('resize', function(){
  adjuster();
});
```

### Options
The fluidText function can take an object as the second argument, providing some options:
- *maxFontSize* - The largest font size that the text will be expanded to.  By default, this is the detected font size.
- *minFontSize* - The smallest font size that the text will be shrunk to.  The default is 0px.
- *multiplier*  - An integer that multiplies the resulting font size.  The default is 1.
- *lineHeight*  - Manually override the detected line height.  This should be an integer relative to the font size.
- *fontFamily*  - Force the font family.
- *fontWeight*  - Force the font weight.
- *fontStyle*   - Force the font style.
- *fontVariant* - Force the font variant.
- *maxWidth*    - Force the container width value.
- *maxHeight*   - Force the container height value.

## Notes
Currently, containers with padding aren't fully-supported.  To get around this, you can provide maxHeight & maxWidth as option values.