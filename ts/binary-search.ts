const getMidPoint = (min: number, max: number) => Math.floor((max + min) / 2);

export default (target: any, arr: any[]): number | undefined => {
  let lowerBound = 0;
  let higherBound = arr.length - 1;
  let midPoint = getMidPoint(lowerBound, higherBound);

  while (lowerBound <= higherBound) {
    const val = arr[midPoint];

    if (val === target) {
      return midPoint;
    }

    val < target ? lowerBound = midPoint + 1 : higherBound = midPoint - 1;

    midPoint = getMidPoint(lowerBound, higherBound);
  }

  return undefined;
};
