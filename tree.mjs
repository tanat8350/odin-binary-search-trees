import Node from './node.mjs';
import mergeSort from './merge-sort.mjs';
import removeDuplicate from './remove-duplicate.mjs';

export default class Tree {
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

  find(value) {
    let result = null;
    const findRec = (value, node) => {
      if (node === null) return null;

      if (node.data < value) {
        findRec(value, node.right);
      }

      if (node.data > value) {
        findRec(value, node.left);
      }

      if (node.data === value) return (result = node);
    };
    findRec(value, this.root);
    return result;
  }

  levelOrder(callback) {
    const queue = [];
    const result = [];
    queue.push(this.root);
    while (queue.length > 0) {
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      result.push(queue[0].data);
      if (callback) callback(queue[0].data);
      queue.shift();
    }

    return result;
  }

  inOrder(callback, node = this.root, result = []) {
    if (node === null) return;

    this.inOrder(callback, node.left, result);
    result.push(node.data);
    if (callback) callback(node.data);
    this.inOrder(callback, node.right, result);

    if (node === this.root) return result;
  }

  preOrder(callback, node = this.root, result = []) {
    if (node === null) return;

    result.push(node.data);
    if (callback) callback(node.data);
    this.preOrder(callback, node.left, result);
    this.preOrder(callback, node.right, result);

    if (node === this.root) return result;
  }

  postOrder(callback, node = this.root, result = []) {
    if (node === null) return;

    this.postOrder(callback, node.left, result);
    this.postOrder(callback, node.right, result);
    result.push(node.data);
    if (callback) callback(node.data);

    if (node === this.root) return result;
  }

  height(node = this.root, count = 0, result = []) {
    let countCopy = count;
    result.push(count);

    if (node.left) this.height(node.left, ++count, result);
    if (node.right) this.height(node.right, ++countCopy, result);

    return Math.max(...result);
  }

  depth(node) {
    let result = null;
    const depthRec = (node, current, count) => {
      if (node === current) result = count;

      let countCopy = count;
      if (current.left) depthRec(node, current.left, ++count);
      if (current.right) depthRec(node, current.right, ++countCopy);
    };
    depthRec(node, this.root, 0);
    return result;
  }

  isBalanced() {
    const count = (node, result = []) => {
      if (node === null) return result;
      result.push(1);
      count(node.left, result);
      count(node.right, result);
      return result;
    };

    const left = count(this.root.left).length;
    const right = count(this.root.right).length;

    const calDiff = Math.abs(left - right);
    if (calDiff <= 1) return true;
    return false;
  }

  rebalance() {
    this.buildTree(this.inOrder());
  }

  printInOrder(node = this.root, result = []) {
    if (node === null) return;

    this.printInOrder(node.left, result);
    result.push(node.data);
    this.printInOrder(node.right, result);

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
