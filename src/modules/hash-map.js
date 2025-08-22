import Node from './node';
import LinkedList from './linked-list';

export default class HashMap {
  constructor() {
    this.loadFactor = 0.8;
    this.capacity = 16;
    this.buckets = new Array(16);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let hashCode = hash(key);
    if (hashCode < 0 || hashCode > this.buckets.length)
      throw new Error('Trying to access index out of bounds');
    this.buckets[hashCode];
  }
}
