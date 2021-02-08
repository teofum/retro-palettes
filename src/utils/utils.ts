// General utility functions

export const vec3distance = (a: number[], b: number[]): number => {
  let d = 0;
  for (let i = 0; i < 3; i++)
    d += (a[i] - b[i]) * (a[i] - b[i]);
  return d;
};

export const loadFile = (e: Event): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const input = e.target as HTMLInputElement;
    if (input?.files) {
      const file = input.files[0];
      const img = new Image();
      img.onload = () => resolve(img);

      img.src = URL.createObjectURL(file);
    } else reject();
  });
};
