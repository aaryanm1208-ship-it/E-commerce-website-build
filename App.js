// ... existing imports
import Cart from './components/Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('products'); // 'products', 'login', 'register', 'cart'
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userInfo');
    if (loggedInUser) setUser(JSON.parse(loggedInUser));

    // Load cart from local storage if it exists
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) setCartItems(JSON.parse(savedCart));

    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(cartItems.map((x) => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    alert("Added to cart!");
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x.id !== id));
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    window.location.reload();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        <h1 onClick={() => setView('products')} style={{ cursor: 'pointer' }}>Amazon Clone</h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div onClick={() => setView('cart')} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
             🛒 Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})
          </div>
          {user ? (
            <>
              <span>Hello, {user.name} </span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <button onClick={() => setView('login')}>Sign In</button>
          )}
        </div>
      </nav>

      {view === 'products' && (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {products.map(p => (
            <div key={p.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '200px' }}>
              <img src={p.image_url} alt={p.name} style={{ width: '100%' }} />
              <h3>{p.name}</h3>
              <p><strong>${p.price}</strong></p>
              <button 
                onClick={() => addToCart(p)}
                style={{ background: '#f0c14b', padding: '5px 10px', cursor: 'pointer', width: '100%' }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {view === 'login' && <Login setView={setView} />}
      {view === 'register' && <Register setView={setView} />}
      {view === 'cart' && <Cart cartItems={cartItems} removeFromCart={removeFromCart} setView={setView} />}
    </div>
  );
}

export default App;