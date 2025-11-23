// Servicio simple para manejar órdenes en localStorage (desarrollo)
const ORDERS_KEY = 'orders'

export function getOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Error leyendo órdenes:', e)
    return []
  }
}

function saveOrders(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  } catch (e) {
    console.error('Error guardando órdenes:', e)
  }
}

export function addOrder(order) {
  const orders = getOrders()
  const newOrder = { id: Date.now(), date: new Date().toISOString(), ...order }
  orders.unshift(newOrder)
  saveOrders(orders)
  return newOrder
}

export function clearOrders() {
  try { localStorage.removeItem(ORDERS_KEY) } catch(e) { console.error(e) }
}

export default { getOrders, addOrder, clearOrders }
