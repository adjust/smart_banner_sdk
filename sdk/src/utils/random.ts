// Returns an integer number in range [min, max).
export function random(min: number, max: number) {
  if (min === max) {
    return min;
  }

  if (min > max) { // then swapping
    const temp = max;
    max = min;
    min = temp;
  }

  return Math.floor(Math.random() * (max - min)) + min;
}
