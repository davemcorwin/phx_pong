const Keys = {
  LEFT: 65,
  RIGHT: 66
}

const handledKeys = Object.keys(Keys).map(k => Keys[k])

const Events = {
  TAP: 'tap',
  HOLD: 'hold'
}

let _window = null,
    keyHandler = null,
    currentKey = -1,
    time = -1,
    listeners = new Map()

function register(window) {
  _window = window
  _window.addEventListener('keydown', handleKeyDown)
  _window.addEventListener('keyup', handleKeyUp)
}

function unregister() {
  _window.removeEventListener('keydown', handleKeyDown)
  _window.removeEventListener('keyup', handleKeyUp)
  _window = null
}

function addListener(keys, cb) {
  const _keys = Array.isArray(keys) ? keys : [keys]
  const unhandledKeys = _keys.filter(key => !handledKeys.includes(key))

  if (unhandledKeys.length > 0)
    throw new Error(`Unhandled keys: ${unhandledKeys} passed to key handler.`)

  listeners.set(cb, _keys)

  return cb
}

function removeListener(cb) {
  return listeners.delete(cb)
}

function handleKeyDown(event) {
  if (currentKey === -1) {
    currentKey = event.keyCode
    time = Date.now()
  }
}

function handleKeyUp(event) {
  if (currentKey === event.keyCode) {
    if (Date.now() - time >= 500)
      notify(Events.HOLD, event.keyCode)
    else
      notify(Events.TAP, event.keyCode)

    currentKey = -1
    time = -1
  }
}

function notify(event, key) {
  // Need to create a copy of this array, otherwise a new listener could get called...
  Array.from(listeners.keys()).forEach(cb => {
    if (listeners.get(cb) && listeners.get(cb).includes(key))
      cb(event, key)
  })
}

export default { register, unregister, addListener, removeListener }
export { Keys, Events }
