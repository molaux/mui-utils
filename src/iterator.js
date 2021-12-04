// Get the Iterator prototype, which has no global name
const iteratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf([][Symbol.iterator]())
)

export const Iterator = (source) => {
  // Allow source to be an iterable or an iterator
  if (Symbol.iterator in source) {
    source = source[Symbol.iterator]()
  }
  // Create our wrapper iterator
  const iterator = Object.create(iteratorPrototype)
  // Remember the last value we saw from `next`
  let current
  // The iterator method
  iterator.next = () => {
    current = source.next()
    return current
  }
  // Our additional methods
  iterator.currentValue = () => (current ? current.value : undefined)
  iterator.current = () => current
  return iterator
}
