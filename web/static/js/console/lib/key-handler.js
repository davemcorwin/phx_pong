const Keys = {
  LEFT: 65,
  RIGHT: 66
}

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
  listeners.set(cb, Array.isArray(keys) ? keys : [keys])
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
  for (let [cb, keys] of listeners) {
    if (keys.includes(key))
      cb(event, key)
  }
}

export default { register, unregister, addListener, removeListener }
export { Keys, Events }
