function createCache(capacity) {
  const cache = {};
  cache.capacity = capacity;
  cache.map = new Map();
  return cache;
}

function getFromCache(cache, key) {
  if (!cache.map.has(key)) {
    return -1;
  }

  const value = cache.map.get(key);

  // move to end = mark as most recently used
  cache.map.delete(key);
  cache.map.set(key, value);

  return value;
}

function putInCache(cache, key, value) {
  if (cache.map.has(key)) {
    cache.map.delete(key);
  } else if (cache.map.size >= cache.capacity) {
    // evict least recently used = first key in the map
    const oldestKey = cache.map.keys().next().value;
    cache.map.delete(oldestKey);
  }

  cache.map.set(key, value);
}




const myCache = createCache(2);

putInCache(myCache, "A", 10);
putInCache(myCache, "B", 20);
console.log(getFromCache(myCache, "A")); // 10

putInCache(myCache, "C", 30);
console.log(getFromCache(myCache, "B")); // -1
console.log(getFromCache(myCache, "C")); // 30
console.log(getFromCache(myCache, "A")); // 10