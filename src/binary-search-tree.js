const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }
  add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      this.insertNode(this.rootNode, newNode);
    }
  }
  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
  has(data) {
    return !!this.findNode(this.rootNode, data);
  }
  findNode(node, data) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      return this.findNode(node.left, data);
    } else if (data > node.data) {
      return this.findNode(node.right, data);
    } else {
      return node;
    }
  }
  find(data) {
    return this.findNode(this.rootNode, data);
  }
  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }
  removeNode(node, data) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }
      const tempNode = this.findMinNode(node.right);
      node.data = tempNode.data;
      node.right = this.removeNode(node.right, tempNode.data);
      return node;
    }
  }
  findMinNode(node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }
  min() {
    if (!this.rootNode) {
      return null;
    }
    return this.findMinNode(this.rootNode).data;
  }
  max() {
    let node = this.rootNode;
    while (node && node.right !== null) {
      node = node.right;
    }
    return node ? node.data : null;
  }
}
module.exports = {
  BinarySearchTree
};