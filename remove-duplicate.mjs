export default function removeDuplicate(array) {
  let previous;

  array.forEach((item, index) => {
    if (item === previous) {
      array.splice(index, 1);
    }
    previous = item;
  });

  return array;
}
