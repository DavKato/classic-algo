// Use recursion to write a function that accepts an array of strings and returns the total number of characters across all the strings.
export const countChars = (strings: string[]): number =>
  strings.length ? strings[0].length + countChars(strings.slice(1)) : 0;

export const retainEvens = (numbers: number[]): number[] => {
  if (!numbers.length) return [];

  return numbers[0] % 2 === 0
    ? [numbers[0], ...retainEvens(numbers.slice(1))]
    : retainEvens(numbers.slice(1));
};

export const trianguler = (n: number): number => {
  if (n === 1) return 1;

  return n + trianguler(n - 1);
};

// Find the first index of x.
// Assume x is always included.
export const xIndex = (str: string): number =>
  str[0] === "x" ? 0 : xIndex(str.slice(1)) + 1;

interface Grid {
  row: number;
  col: number;
}
const serialize = ({ row, col }: Grid) => `${row}-${col}`;

export const shortestPath = ( // memoized
  grid: Grid,
  memo: Map<string, number> = new Map(),
): number => {
  if (grid.row === 1 || grid.col === 1) return 1;

  if (!memo.has(serialize(grid))) {
    memo.set(
      serialize(grid),
      shortestPath({ row: grid.row, col: grid.col - 1 }, memo) +
        shortestPath({ row: grid.row - 1, col: grid.col }, memo),
    );
  }

  return memo.get(serialize(grid)) as number;
};
