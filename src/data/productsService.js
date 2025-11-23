import { productos as defaultProductos } from './products.js'

const KEY = 'products'

function getStored() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('Error reading products from storage', e)
    return null
  }
}

function saveStored(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch (e) {
    console.error('Error saving products to storage', e)
  }
}

export function getProducts() {
  const stored = getStored()
  if (stored && Array.isArray(stored)) return stored
  // clone default to avoid mutation
  return defaultProductos.map(p => ({ ...p }))
}

export function addProduct(product) {
  const list = getProducts()
  const maxId = list.reduce((m, p) => Math.max(m, p.id || 0), 0)
  const newProduct = { id: maxId + 1, ...product }
  list.unshift(newProduct)
  saveStored(list)
  return newProduct
}

export function updateProduct(id, updates) {
  const list = getProducts()
  const idx = list.findIndex(p => p.id === id)
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...updates }
  saveStored(list)
  return list[idx]
}

export function deleteProduct(id) {
  let list = getProducts()
  list = list.filter(p => p.id !== id)
  saveStored(list)
  return true
}

export default { getProducts, addProduct, updateProduct, deleteProduct }
