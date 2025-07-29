/* =========================================================
   script.js – logique client pour Sakura Shop
   ========================================================= */
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let count = cart.reduce((sum, p) => sum + p.qty, 0);
cartCount.textContent = count;

/* ---------- Données produits factices ---------- */
const produits = [
  {
    id: 1,
    img: 'https://picsum.photos/400/300?random=1',
    titre: 'Casque audio sakura',
    prix: 79.99,
    desc: 'Son haute fidélité et design fleuri.',
  },
  {
    id: 2,
    img: 'https://picsum.photos/400/300?random=2',
    titre: 'Roman « Tokyo Bloom »',
    prix: 14.9,
    desc: 'Un voyage littéraire au pays des cerisiers.',
  },
  {
    id: 3,
    img: 'https://picsum.photos/400/300?random=3',
    titre: 'Sweat hoodie rose',
    prix: 49.5,
    desc: 'Confort et style japonais.',
  },
  {
    id: 4,
    img: 'https://picsum.photos/400/300?random=4',
    titre: 'Tasse matcha artisanale',
    prix: 22.0,
    desc: 'Parfaite pour vos thés verts.',
  },
  {
    id: 5,
    img: 'https://picsum.photos/400/300?random=5',
    titre: 'Figurine anime édition limitée',
    prix: 129.99,
    desc: 'Un must pour les collectionneurs.',
  },
]

/* ---------- Références DOM ---------- */
const grid = document.getElementById('productGrid')
const cartCount = document.getElementById('cartCount')

/* Compteur global du panier */
let count = 0

/* =========================================================
   1. Injection dynamique des cartes-produit
   ========================================================= */
function renderProducts(list) {
  const fragment = document.createDocumentFragment()

  list.forEach((p) => {
    const card = document.createElement('article')
    card.className = 'card'
    card.innerHTML = `
      <img src="${p.img}" alt="${p.titre}">
      <div class="info">
        <h3>${p.titre}</h3>
        <p>${p.desc}</p>
        <strong>${p.prix.toFixed(2)} €</strong>
        <button data-id="${p.id}">Ajouter au panier</button>
      </div>
    `
    fragment.appendChild(card)
  })

  grid.appendChild(fragment)
}

/* =========================================================
   2. Gestion très simple du panier
   ========================================================= */
function handleAddToCart(e) {
  if (e.target.tagName !== 'BUTTON') return

  count++
  cartCount.textContent = count

  e.target.textContent = 'Ajouté ✓'
  e.target.disabled = true
const id = Number(e.target.dataset.id);
const existing = cart.find(it => it.id === id);
if (existing) { existing.qty++; }
else {
  const product = produits.find(p => p.id === id);
  cart.push({ ...product, qty: 1 });
}
localStorage.setItem('cart', JSON.stringify(cart));
count++;
cartCount.textContent = count;


}

/* =========================================================
   3. Décor : génération de pétales animés
   ========================================================= */
function spawnPetals(quantity = 20) {
  for (let i = 0; i < quantity; i++) {
    const petal = document.createElement('span')
    petal.className = 'petal'

    /* Position horizontale et paramètres d'animation aléatoires */
    petal.style.left = Math.random() * 100 + 'vw'
    petal.style.animationDuration = 5 + Math.random() * 5 + 's'
    petal.style.animationDelay = Math.random() * 5 + 's'

    document.body.appendChild(petal)
  }
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(produits) // Ajoute les cartes
  grid.addEventListener('click', handleAddToCart)
  spawnPetals(20) // Ambiance sakura
})
/* ① ---------- dark mode toggle : colle tout en haut après les const ---------- */
const root = document.documentElement
const btnDark = document.querySelector('.toggle-dark')

btnDark.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  localStorage.setItem('darkMode', document.body.classList.contains('dark'))
})

// à l’init :
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark')
}

/* ② ---------- persistance panier : modifie handleAddToCart ---------- */
function updateCartDisplay() {
  cartCount.textContent = count
  localStorage.setItem('cartCount', count)
}
function handleAddToCart(e) {
  if (e.target.tagName !== 'BUTTON') return
  count++
  updateCartDisplay()
  e.target.textContent = 'Ajouté ✓'
  e.target.disabled = true
}
// À la fin du DOMContentLoaded :
count = Number(localStorage.getItem('cartCount')) || 0
updateCartDisplay()

/* ③ ---------- recherche instantanée : après renderProducts() ---------- */
const inputSearch = document.querySelector('.search-bar input')
inputSearch.addEventListener('input', () => {
  const q = inputSearch.value.toLowerCase()
  const filtres = produits.filter((p) => p.titre.toLowerCase().includes(q))
  grid.innerHTML = '' // reset
  renderProducts(filtres)
})

/* ④ ---------- skeleton loader pendant fetch simulé ---------- */
async function initProducts() {
  // Affiche 5 « cards » vides
  for (let i = 0; i < 5; i++) {
    const skeleton = document.createElement('article')
    skeleton.className = 'card loading'
    grid.appendChild(skeleton)
  }
  await new Promise((r) => setTimeout(r, 800)) // faux délai serveur
  grid.innerHTML = ''
  renderProducts(produits)
}

document.addEventListener('DOMContentLoaded', () => {
  initProducts()
  grid.addEventListener('click', handleAddToCart)
  spawnPetals(8)
})
const CACHE = 'sakura-v1'
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './favicon.svg',
]

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)))
})
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)))
})
function spawnPetals(quantity = 20) {
  const layer = document.getElementById('petal-layer') // nouveau calque
  for (let i = 0; i < quantity; i++) {
    const petal = document.createElement('span')
    petal.className = 'petal'
    petal.style.left = Math.random() * 100 + 'vw'
    petal.style.animationDuration = 5 + Math.random() * 5 + 's'
    petal.style.animationDelay = Math.random() * 5 + 's'
    layer.appendChild(petal) // on ajoute DANS le calque
  }
}

function spawnPetals(quantity = 20) {
  let layer = document.getElementById('petal-layer')

  // Sécurité : au cas où le calque n’existerait pas encore
  if (!layer) {
    layer = document.createElement('div')
    layer.id = 'petal-layer'
    document.getElementById('productGrid').prepend(layer)
  }

  for (let i = 0; i < quantity; i++) {
    const petal = document.createElement('span')
    petal.className = 'petal'
    petal.style.left = Math.random() * 100 + 'vw'
    petal.style.animationDuration = 5 + Math.random() * 5 + 's'
    petal.style.animationDelay = Math.random() * 5 + 's'
    layer.appendChild(petal)
  }
}
card.innerHTML = `
  <img src="${p.img}" alt="${p.titre}">
  <div class="info">
    <h3>${p.titre}</h3>
    <!-- Bouton devient un lien sponsorisé -->
    <a href="${p.lien}" class="btn-amz" target="_blank" rel="noopener sponsored">
      Acheter sur Amazon
    </a>
  </div>
`