import Node from './node';
import LinkedList from './linked-list';

export default class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(16).fill(null);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  increaseCapacity() {
    this.capacity *= 2;
    const currentEntries = this.entries();
    this.buckets = new Array(this.capacity).fill(null);
    for (let i = 0; i < currentEntries.length; i++) {
      this.set(currentEntries[i][0], currentEntries[i][1]);
    }
  }

  set(key, value) {
    let hashCode = this.hash(key);
    if (hashCode < 0 || hashCode > this.buckets.length)
      throw new Error('Trying to access index out of bounds');
    if (this.buckets[hashCode] == null) {
      this.buckets[hashCode] = new LinkedList();
    }
    const bucket = this.buckets[hashCode];
    if (bucket.contains(key)) {
      const index = bucket.find(key);
      const node = bucket.at(index);
      node.value = value;
    } else {
      bucket.append(key, value);
    }
    if (this.length() > this.loadFactor * this.capacity) {
      this.increaseCapacity();
    }
  }

  get(key) {
    let hashCode = this.hash(key);
    if (this.buckets[hashCode] == null) return null;
    const bucket = this.buckets[hashCode];
    if (bucket.contains(key)) {
      const index = bucket.find(key);
      const node = bucket.at(index);
      return node.value;
    }
    return null;
  }

  has(key) {
    let hashCode = this.hash(key);
    if (this.buckets[hashCode] == null) return false;
    const bucket = this.buckets[hashCode];
    if (bucket.contains(key)) return true;
    return false;
  }

  remove(key) {
    if (!this.has(key)) return false;
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];
    const index = bucket.find(key);
    bucket.removeAt(index);
    return true;
  }

  length() {
    let length = 0;
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket == null) continue;
      length += bucket.size;
    }
    return length;
  }

  clear() {
    this.capacity = 16;
    this.buckets = new Array(16).fill(null);
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        let current = bucket.headNode();
        while (current) {
          keys.push(current.key);
          current = current.next;
        }
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        let current = bucket.headNode();
        while (current) {
          values.push(current.value);
          current = current.next;
        }
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        let current = bucket.headNode();
        while (current) {
          entries.push([current.key, current.value]);
          current = current.next;
        }
      }
    }
    return entries;
  }
}
