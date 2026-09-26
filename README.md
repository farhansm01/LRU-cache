# LRU Cache

A simple Least Recently Used (LRU) Cache implemented in JavaScript, supporting `Cache(capacity)`, `get(key)`, and `put(key, value)`, with O(1) average time for both operations.

## Data structure used and why

I used a JavaScript `Map` to store the cache data instead of a plain object plus a separate array for tracking order.

A `Map` was the right choice here because it keeps track of insertion order automatically, and its `.get()`, `.set()`, `.delete()`, and `.has()` methods all run in O(1) average time. This means I don't need to manually loop through anything to find or reorder items, which is what made my first draft slow.

## How LRU ordering is maintained

The Map naturally keeps keys in the order they were inserted. I use that to track which key is "oldest" and which is "freshest":

- Whenever a key is read with `get()` or updated with `put()`, I delete it from the Map and immediately set it again. This pushes it to the end of the Map, marking it as the most recently used.
- The least recently used key is always the very first key in the Map, since it hasn't been touched (deleted and re-set) in the longest time.
- When the cache is full and a brand new key needs to be added, I grab that first key with `map.keys().next().value` and delete it, that's the eviction step.

## Time complexity

- `get(key)`: O(1) average time, since Map lookup, delete, and set are all O(1)
- `put(key, value)`: O(1) average time, for the same reason

## Space complexity

O(capacity), since the cache never stores more than `capacity` key/value pairs at once.

## How to run it

Clone or download this file, then run it with Node:

    node cache.js

You should see output like:

    get A: 10
    get B: -1
    get C: 30
    get A: 10

This matches the example scenario in the assignment: after the cache (capacity 2) evicts key B to make room for key C, `get("B")` correctly returns -1.