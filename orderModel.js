const db = require('../config/db');

const Order = {
    createOrder: async (userId, totalPrice, items) => {
        // We use a transaction to ensure data integrity
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // 1. Insert the main order record
            const [orderRes] = await connection.query(
                "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
                [userId, totalPrice]
            );
            const orderId = orderRes.insertId;

            // 2. Insert each item into the order_items table
            for (let item of items) {
                await connection.query(
                    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                    [orderId, item.id, item.qty, item.price]
                );
            }

            await connection.commit(); // Save changes
            return orderId;
        } catch (error) {
            await connection.rollback(); // Undo changes if something fails
            throw error;
        } finally {
            connection.release(); // Close connection
        }
    }
};

module.exports = Order;