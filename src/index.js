import './styles.css';
import BinarySortTree from './modules/binary-search-tree';

const test = new BinarySortTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

test.insert(2);
test.prettyPrint();
console.log(test.isBalanced());
test.reBalance();
console.log(test.isBalanced());
test.prettyPrint();
