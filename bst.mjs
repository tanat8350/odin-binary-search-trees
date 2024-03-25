import mergeSort from './merge-sort.mjs';
import removeDuplicate from './remove-duplicate.mjs';

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(this.prepareArray(array));
  }

  prepareArray(array) {
    return removeDuplicate(mergeSort(array));
  }

  buildTree(array) {
    if (0 > array.length - 1) return;

    const mid = Math.floor(array.length / 2);
    const start = array.slice(0, mid);
    const end = array.slice(mid + 1);

    this.root = new Node(
      array[mid],
      this.buildTree(start),
      this.buildTree(end)
    );
    return this.root;
  }

  insert(value, node = this.root) {
    if (node === null) {
      return (node = new Node(value));
    }

    if (node.data > value) node.left = this.insert(value, node.left);
    if (node.data < value) node.right = this.insert(value, node.right);

    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (node.data > value) node.left = this.deleteItem(value, node.left);
    if (node.data < value) node.right = this.deleteItem(value, node.right);

    if (node.data === value && node.left && node.right) {
      let replacement = node.right;
      let previous = node;
      while (replacement.left !== null) {
        previous = replacement;
        replacement = replacement.left;
      }
      if (replacement.right) {
        previous.left = replacement.right;
      } else {
        previous.left = null;
      }
      node.data = replacement.data;
      return node;
    }

    if (node.data === value && (!node.left || !node.right)) {
      return (node = node.left || node.right);
    }

    if (node.data === value) return (node = null);

    return node;
  }

  find(value, node = this.root) {
    if (node === null) return null;

    if (node.data < value) {
      this.find(value, node.right);
    }

    if (node.data < value) {
      this.find(value, node.left);
    }

    if (node.data === value) return console.log('find', node);
  }

  logTreeOrder(node = this.root, result = []) {
    if (node === null) return;

    this.logTreeOrder(node.left, result);
    result.push(node.data);
    this.logTreeOrder(node.right, result);

    if (node === this.root) console.log('logTreeOrder', result);
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

const array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree1 = new Tree(array1);

tree1.prettyPrint();
// tree1.logTreeOrder();
// tree1.insert(6);
// tree1.insert(2);
tree1.deleteItem(67);
tree1.deleteItem(1);
tree1.deleteItem(23);
tree1.deleteItem(8);
tree1.deleteItem(7);
tree1.prettyPrint();
// tree1.logTreeOrder();
tree1.find(324);
console.log(tree1);
