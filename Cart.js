import React from 'react';
import axios from 'axios';

const Cart = ({ cartItems, user, setView }) => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const placeOrderHandler = async () => {
        if (!user) {
            alert("Please login to place an order");
            setView('login');
            return;
        }

        try {
            const orderData = {
                userId: user.id,
                totalPrice: totalPrice,
                items: cartItems
            };

            const { data } = await axios.post('http://localhost:5000/api/orders', orderData);
            alert("Order Placed Successfully! Order ID: " + data.orderId);
            
            // Clear cart and go home
            localStorage.removeItem('cartItems');
            window.location.reload(); 
        } catch (err) {
            alert("Order failed: " + err.message);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' }}>
                            <span>{item.name} (x{item.qty})</span>
                            <span>${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                    ))}
                    <h3 style={{ textAlign: 'right' }}>Total: ${totalPrice.toFixed(2)}</h3>
                    <button 
                        onClick={placeOrderHandler}
                        style={{ background: '#ffd814', width: '100%', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Proceed to Buy (Cash on Delivery)
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;