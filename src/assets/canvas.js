(function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'sekret-link-vice-city-2.webp';
  const cw = canvas.width;
  const ch = canvas.height;

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  function rgbToHsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, l };
  }

  function hslToRgb(h, s, l) {
    let r, g, b;
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  function hueShift(orig, imgData, shift) {
    const data = imgData.data;
    const originalData = orig.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = originalData[i + 0];
      const green = originalData[i + 1];
      const blue = originalData[i + 2];
      const alpha = originalData[i + 3];

      // skip transparent/semiTransparent pixels
      if (alpha < 230) {
        continue;
      }

      const hsl = rgbToHsl(red, green, blue);

      const newRgb = hslToRgb(hsl.h + shift, hsl.s, hsl.l);
      data[i + 0] = newRgb.r;
      data[i + 1] = newRgb.g;
      data[i + 2] = newRgb.b;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  let originalData;
  function draw() {
    const imageData = ctx.getImageData(0, 0, cw, ch);
    hueShift(originalData, imageData, 2 / 100);
    originalData = ctx.getImageData(0, 0, cw, ch);

    window.requestAnimationFrame(draw);
  }

  img.addEventListener('load', () => {
    window.requestAnimationFrame(() => {
      ctx.drawImage(img, 0, 0);
      originalData = ctx.getImageData(0, 0, cw, ch);
      draw();
    });
  });
})();
