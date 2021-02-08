// Utility functions specific to color handling
// There are enough of these to put in a separate file
// Formula reference: http://www.easyrgb.com/en/math.php

// All conversions use a D65/2° standard illuminant where applicable

// Converts sRGB to XYZ color space
export function srgb2xyz(rgb: number[]): number[] {
  // Intermediary RGB values
  const irgb = rgb.map(val => {
    let vNew = val / 255.0;
    vNew = (vNew > 0.04045) ?
      Math.pow((vNew + 0.055) / 1.055, 2.4) :
      vNew / 12.92;
    return vNew * 100;
  });
  
  return [
    irgb[0] * 0.4124 + irgb[1] * 0.3576 + irgb[2] * 0.1805, // X
    irgb[0] * 0.2126 + irgb[1] * 0.7152 + irgb[2] * 0.0722, // Y
    irgb[0] * 0.0193 + irgb[1] * 0.1192 + irgb[2] * 0.9505  // Z
  ];
}

// Converts XYZ color space to sRGB
export function xyz2srgb(xyz: number[]): number[] {
  // Intermediary XYZ values
  const ixyz = xyz.map(val => val / 100.0);

  // Intermediary RGB values
  const irgb = [
    ixyz[0] *  3.2406 + ixyz[1] * -1.5372 + ixyz[2] * -0.4986,
    ixyz[0] * -0.9689 + ixyz[1] *  1.8758 + ixyz[2] *  0.0415,
    ixyz[0] *  0.0557 + ixyz[1] * -0.2040 + ixyz[2] *  1.0570
  ];

  return irgb.map(val => {
    const vNew = (val > 0.0031308) ?
      1.055 * Math.pow(val, 1/2.4) - 0.055 :
      val * 12.92;
    return vNew * 255;
  });
}

// Converts XYZ color to CIE-L*ab
export function xyz2lab(xyz: number[]): number[] {
  let ixyz = [
    xyz[0] * 95.047,
    xyz[1] * 100.000,
    xyz[2] * 108.883
  ];

  ixyz = ixyz.map(val => (val > 0.008856) ?
    Math.pow(val, 1/3) :
    (val * 7.787) + (16 / 116)
  );

  return [
    (116 * ixyz[1]) - 16,       // L
    500 * (ixyz[0] - ixyz[1]),  // a
    200 * (ixyz[1] - ixyz[2])   // b
  ];
}

// Converts CIE-L*ab to XYZ color
export function lab2xyz(lab: number[]): number[] {
  const iy = (lab[0] + 16) / 116;
  let ixyz = [
    lab[1] / 500 + iy,
    iy,
    iy - (lab[2] / 200)
  ];

  ixyz = ixyz.map(val => {
    const cubed = Math.pow(val, 3);
    return (cubed > 0.008856) ?
      cubed :
      (val - 16 / 116) / 7.787;
  });

  return [
    ixyz[0] * 95.047,
    ixyz[1] * 100.000,
    ixyz[2] * 108.883
  ];
}

// Converts sRGB to CIE-L*ab
export function srgb2lab(rgb: number[]): number[] {
  return xyz2lab(srgb2xyz(rgb));
}

// Converts CIE-L*ab to sRGB
export function lab2srgb(rgb: number[]): number[] {
  return xyz2srgb(lab2xyz(rgb));
}
