function fluidText(el, options){
  options            = options || {};

  var canvas         = document.createElement('canvas'),
      ctx            = canvas.getContext('2d'),
      fontSize, lineHeight, multiplier;

  function getNewFontSize(){
    var style        = getComputedStyle(el),
        maxFontSize  = options.maxFontSize || parseFloat(style['font-size']),
        minFontSize  = options.minFontSize || 0;

    fontSize         = fontSize || maxFontSize;
    lineHeight       = lineHeight || (options.lineHeight || (parseFloat(style['line-height']) / parseFloat(style['font-size'])));
    
    var fontFamily   = options.fontFamily  || style['font-family'],
        fontWeight   = options.fontWeight  || style['font-weight'],
        fontStyle    = options.fontStyle   || style['font-style'],
        fontVariant  = options.fontVariant || style['font-variant'],
        words        = el.innerText.split(' '),
        wordsLength  = words.length,
        y            = fontSize * lineHeight,
        line,
        i            = 0,
        maxWidth     = options.maxWidth  || el.clientWidth,
        maxHeight    = options.maxHeight || el.clientHeight;

    ctx.font         = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;

    options.maxFontSize = options.maxFontSize || maxFontSize;
    options.minFontSize = options.minFontSize || minFontSize;
    multiplier          = options.multiplier  || 1;

    while(i < wordsLength){
      var word      = words[i],
          testLine  = line ? `${line} ${word}` : word,
          metrics   = ctx.measureText(testLine),
          testWidth = metrics.width;
      if(ctx.measureText(word).width > maxWidth){
        fontSize = fontSize - 0.1;
        return getNewFontSize();
      }
      if(testWidth > maxWidth){
        y   += (fontSize * lineHeight);
        line = word;
      } else {
        line = testLine;
      }
      i++;
    };
    if (fontSize <= minFontSize){
      return `${minFontSize * multiplier}px`;
    }
    if (y > maxHeight) {
      fontSize = fontSize - 0.1;
      return getNewFontSize();
    }
    return `${fontSize * multiplier}px`;
  }

  function adjust(){
    el.style.fontSize = getNewFontSize();
    options.fontSize  = fontSize;
    fontSize          = undefined;
    lineHeight        = undefined;
    multiplier        = undefined;
  }

  adjust();
  return adjust;
}
if (typeof module !== 'undefined') {
  module.exports = fluidText;
}

