// function that takes an array of positive numbers and a size of the set
// and returns an array of the possible combinations
const getSets = (arr: number[], size: number): number[][] => {
  // validation to avoid scenario of sets greater than the original array size
  // e.g. set of 3 elements from size 2 array
  // as well checks for negatives
  if (size > arr.length || size <= 0 || arr.some((e) => e < 0)) {
    return [];
  }

  // if the set is the same size of the array return the array
  if (size == arr.length) {
    return [arr];
  }

  //when the array is size 1 to avoid array[0] during evaluation
  if (size === 1) {
    return arr.reduce((acc, cur) => [...acc, [cur]], []);
  }

  let combs = [];
  let tail = [];

  for (let i = 0; i <= arr.length - size + 1; i++) {
    // tail will include small combination from the rest of the array
    tail = getSets(arr.slice(i + 1), size - 1);
    for (let j = 0; j < tail.length; j++) {
      // head will be always the first element of the array
      combs.push([arr[i], ...tail[j]]);
    }
  }

  return combs;
};

function countSetsOfThree(numbers: number[], threshold: number): number {
  // first get the sets of the determined shape (in this case 3), it will return
  // an empty array if it have a negative value
  const sets = getSets(numbers, 3);
  // check how many do we have that will be <= threshold
  const sums = sets.reduce((arr: number[][], x: number[]) => {
    x.reduce((prev, curr) => prev + curr) <= threshold && arr.push(x);
    return arr;
  }, []);
  return sums.length;
}

append(`countSetsOfThree([1,2,3,4], 7)`, countSetsOfThree([1, 2, 3, 4], 7), 2);
append(`countSetsOfThree([4,1,3,2], 7)`, countSetsOfThree([4, 1, 3, 2], 7), 2);
append(`countSetsOfThree([1,2,3,9], 7)`, countSetsOfThree([1, 2, 3, 9], 7), 1);
append(`countSetsOfThree([2,2,2,2], 7)`, countSetsOfThree([2, 2, 2, 2], 7), 4);
append(`countSetsOfThree([3,3,3,3], 7)`, countSetsOfThree([3, 3, 3, 3], 7), 0);
append(
  `countSetsOfThree([1,2,3,4,5], 7)`,
  countSetsOfThree([1, 2, 3, 4, 5], 7),
  2
);
append(
  `countSetsOfThree([1,2,3,4,5,10,2,6], 7)`,
  countSetsOfThree([1, 2, 3, 4, 5, 10, 2, 6], 7),
  6
);
append(
  `countSetsOfThree([1,2,3,4,5,1,3], 7)`,
  countSetsOfThree([1, 2, 3, 4, 5, 1, 3], 7),
  13
);
// negative scenario
append(
  `countSetsOfThree([1,2,3,4,5,0,3,4,-1], 0)`,
  countSetsOfThree([1, 2, 3, 4, 5, 0, 3, 4, -1], 7),
  0
);
append(`countSetsOfThree([3,4,5], 7)`, countSetsOfThree([3, 4, 5], 7), 0);
append(`countSetsOfThree([3,2,1], 7)`, countSetsOfThree([3, 2, 1], 7), 1);
// less than 3 elements
append(`countSetsOfThree([3,1], 7)`, countSetsOfThree([3, 1], 7), 0);
append(`countSetsOfThree([3,3,3,3], 7)`, countSetsOfThree([3, 3, 3, 3], 7), 0);

function append(description: string, actual: number, expected: number) {
  const item = document.createElement('div');
  item.textContent = `${description}. Expected: ${expected}. Actual: ${actual}.`;
  document.querySelector('#results').append(item);
}
