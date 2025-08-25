import './styles.css';
import BinarySortTree from './modules/binary-search-tree';

driverScript();

function driverScript() {
  console.log('Generating Random Array');
  const randomArray = Array.from({ length: 15 }, () => {
    return Math.floor(Math.random() * 100);
  });
  console.log(randomArray);

  console.log('Creating Balanced Tree');
  const tree = new BinarySortTree(randomArray);
  tree.prettyPrint();
  console.log(`Tree is Balanced: ${tree.isBalanced()}`);

  let preOrder = [];
  let postOrder = [];
  let inOrder = [];

  tree.preOrderForEach((node) => preOrder.push(node.value));
  tree.postOrderForEach((node) => postOrder.push(node.value));
  tree.inOrderForEach((node) => inOrder.push(node.value));

  console.log(`Pre Order: ${preOrder}`);
  console.log(`Post Order: ${postOrder}`);
  console.log(`In Order: ${inOrder}`);

  console.log('Unbalancing Tree');
  const extraValues = Array.from({ length: 5 }, () => {
    return 101 + Math.floor(Math.random() * 500);
  });
  console.log(`Adding extra values ${extraValues}`);
  extraValues.forEach((value) => {
    tree.insert(value);
  });
  tree.prettyPrint();

  console.log(`Tree is Balanced: ${tree.isBalanced()}`);
  console.log('Rebalancing Tree');
  tree.reBalance();
  tree.prettyPrint();
  console.log(`Tree is Balanced: ${tree.isBalanced()}`);

  preOrder = [];
  postOrder = [];
  inOrder = [];

  tree.preOrderForEach((node) => preOrder.push(node.value));
  tree.postOrderForEach((node) => postOrder.push(node.value));
  tree.inOrderForEach((node) => inOrder.push(node.value));

  console.log(`Pre Order: ${preOrder}`);
  console.log(`Post Order: ${postOrder}`);
  console.log(`In Order: ${inOrder}`);
}
