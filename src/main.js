const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const ul = document.querySelector('#list')
for (const value of arr) {
  const li = document.createElement('li')
  li.textContent = String(value)
  ul.appendChild(li)
}

document.querySelector('#button').addEventListener('click', () => {
  const oldUl = document.querySelector('#list')
  const oldPosition = getPosition(document.querySelectorAll('li'))

  shuffle(arr) // 反转

  const newUl = document.createElement('ul')
  newUl.id = 'list'

  arr.forEach(value => {
    const li = document.createElement('li')
    li.textContent = String(value)
    newUl.appendChild(li)
  })

  // 替换旧的 ul 为新的 ul
  document.querySelector('#demo').replaceChild(newUl, oldUl)

  init(oldPosition)
})

function init(oldPositions) {
  const lis = document.querySelectorAll('li')
  const newPositions = getPosition(lis)

  for (const li of lis) {
    const text = li.textContent
    const { left: oldLeft, top: oldTop } = oldPositions.get(text)
    const { left: newLeft, top: newTop } = newPositions.get(text)
    const dx = oldLeft - newLeft
    const dy = oldTop - newTop

    if (dx || dy) {
      li.style.transform = `translate(${dx}px,${dy}px)`
      li.style.transitionDuration = '0s'
    }
  }

  setTimeout(transition, 100)
}

function getPosition(nodes) {
  const hashMap = new Map()
  for (const node of nodes) hashMap.set(node.textContent, node.getBoundingClientRect())
  return hashMap
}

function transition() {
  document.querySelectorAll('li').forEach(li => {
    li.style.transform = ''
    li.style.transitionDuration = ''
    li.className = 'move'
  })
}

function shuffle(array) {
  let m = array.length
  let t = undefined
  let i = undefined

  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
}
