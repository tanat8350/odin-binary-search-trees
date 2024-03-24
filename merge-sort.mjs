function merge(first, second) {
  if (!first.length) {
    return second;
  } else if (!second.length) {
    return first;
  }

  let lowest;
  if (first[0] < second[0]) {
    lowest = first.shift();
  } else {
    lowest = second.shift();
  }
  return [].concat(lowest).concat(merge(first, second));
}

export default function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const first = array.slice(0, mid);
  const second = array.slice(mid, array.length);
  const sorted1 = mergeSort(first);
  const sorted2 = mergeSort(second);
  return [].concat(merge(sorted1, sorted2));
}
