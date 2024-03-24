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

  logTreeOrder() {
    const result = [];
    const catArray = (node = this.root) => {
      if (node === null) return;

      catArray(node.left);
      result.push(node.data);
      catArray(node.right);
    };
    catArray();

    console.log('logTreeOrder', result);
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
tree1.logTreeOrder();
