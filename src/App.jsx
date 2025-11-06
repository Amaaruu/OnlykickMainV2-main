import { useState, useEffect } from 'react'; 
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer'; 
import Home from './pages/Home';
import Products from './pages/Products'; 
import Carrito from './pages/Carrito.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Blogs from './pages/Blogs.jsx';
import Contacto from './pages/Contacto.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

function App() {
  //Logica del carrito de compras
  const [cartItems, setCartItems] = useState(() => {
    //Al iniciar, intentamos cargar el carrito desde el almacenamiento local.
    const localData = localStorage.getItem('cartItems');
    //Si hay datos, los usamos. Si no, empezamos con un carrito vacio.
    return localData ? JSON.parse(localData) : [];
  });

  //Este useEffect se ejecuta cada vez que cartItems cambia.
  useEffect(() => {
    // Guardamos el estado actual del carrito en el almacenamiento local.
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  //Funcion para añadir un producto al carrito.
  const addToCart = (product) => {
    setCartItems(prevItems => [...prevItems, product]);
    alert(`"${product.nombre}" fue añadido al carrito.`);
  };

  // Función para eliminar un producto del carrito (la usaremos más adelante).
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  //Fin de la logica del carrito de compras

  return (
    //Pasamos la cantidad de items al NavBar como un prop
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar cartItemCount={cartItems.length} />
      
      <main style={{ flex: 1 }}>
        <Routes>
          {/*Pasamos la función addToCart a las paginas que la necesitaran*/}
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/productos" element={<Products addToCart={addToCart} />} />
          <Route path="/producto/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {/*Pasamos los items y la funcion de remover a la pagina del carrito*/}
          <Route 
            path="/carrito" 
            element={<Carrito cartItems={cartItems} removeFromCart={removeFromCart} />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;