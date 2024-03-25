import Tree from './tree.mjs';

const array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree1 = new Tree(array1);

tree1.prettyPrint();
console.log(tree1.isBalanced());

tree1.insert(2);
tree1.insert(6346);
tree1.insert(6347);
tree1.insert(6349);
tree1.insert(6348);
tree1.deleteItem(67);
tree1.deleteItem(1);
tree1.deleteItem(23);
tree1.deleteItem(8);
tree1.deleteItem(7);
tree1.prettyPrint();
console.log(tree1.isBalanced());

console.log('find3', tree1.find(3));

console.log('height', tree1.height());
console.log('height3', tree1.height(tree1.find(3)));

console.log('depth', tree1.depth());
console.log('depth3', tree1.depth(tree1.find(3)));

console.log('depthl', tree1.height(tree1.root.left));
console.log('depthr', tree1.height(tree1.root.right));

console.log(tree1.isBalanced());
tree1.rebalance();
tree1.prettyPrint();
console.log(tree1.isBalanced());
