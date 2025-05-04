/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

let db;
const JWT_SECRET = 'eyJhbGciOiJIUzI1';
export default (database) => {
  db = database;

  router.get('/farms', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM farms');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
  });
  router.get('/products', async (req, res) => {
    try {
      // Извлекаем параметры из запроса
      const { farmId, rating, minPrice, maxPrice, order, catId, productId, offset } = req.query;

      // Базовый SQL-запрос
      let query = 'SELECT * FROM products WHERE 1=1'; // 1=1 для удобства добавления условий
      const queryParams = [];

      if (farmId) {
        console.log('farmId', farmId);
        query += ' AND farmId IN (' + farmId.map(() => '?').join(',') + ')';
        queryParams.push(...farmId);
      }
      if (catId) {
        console.log('catId', catId);
        query += ' AND categoryId = ?';
        queryParams.push(...catId);
      }

      if (rating) {
        query += ' AND rating IN (' + rating.map(() => '?').join(',') + ')';
        queryParams.push(...rating);
        console.log('rating', rating);
      }

      // Фильтр по минимальной цене
      if (minPrice) {
        console.log('minPrice', minPrice);
        query += ' AND price >= ?';
        queryParams.push(parseFloat(minPrice));
      }

      // Фильтр по максимальной цене
      if (maxPrice) {
        console.log('maxPrice', maxPrice);
        query += ' AND price <= ?';
        queryParams.push(parseFloat(maxPrice));
      }

      if (productId && Array.isArray(productId)) {
        console.log('productId', productId);
        query += ' AND productId IN (' + productId.map(() => '?').join(',') + ')';
        queryParams.push(...productId);
      }
      else if (productId) {
        console.log('productId', productId);
        query += ' AND productId = ?';
        queryParams.push(parseInt(productId));
      }

      // Сортировка (например, по цене или имени)
      if (order) {
        query += ` ORDER BY price ${order}`; // Можно сделать динамическую сортировку через req.query.sort

      }

      if (offset) {
        console.log('offset', offset);
        query += ' limit 6 offset ?';
        queryParams.push(parseInt(offset));
      }

      let logQuery = query;
      let paramIndex = 0;
      logQuery = logQuery.replace(/\?/g, () => {
        const value = queryParams[paramIndex++];
        return typeof value === 'string' ? `'${value}'` : value; // Добавляем кавычки для строк
      });

      console.log('QUERY:', logQuery);
      // Выполнение запроса
      const [rows] = await db.query(query, queryParams);
      res.json(rows);
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
      res.status(500).send('Ошибка сервера');
    }
  });
  router.get('/categories', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM categories');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
  });
  router.get('/farms_categories', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM farms_categories');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
  });
  router.get('/blogs', async (req, res) => {
    try {
      const { blogId } = req.query;
      // Базовый SQL-запрос
      let query = 'SELECT * FROM blogs WHERE 1=1'; // 1=1 для удобства добавления условий
      const queryParams = [];


      if (blogId) {
        console.log('blogId', blogId);
        query += ' AND blogId = ?';
        queryParams.push(parseInt(blogId));
      }

      let logQuery = query;
      let paramIndex = 0;
      logQuery = logQuery.replace(/\?/g, () => {
        const value = queryParams[paramIndex++];
        return typeof value === 'string' ? `'${value}'` : value; // Добавляем кавычки для строк
      });

      console.log('QUERY:', logQuery);

      // Выполнение запроса
      const [rows] = await db.query(query, queryParams);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
  });
  router.get('/tagsdir', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM tagsdir');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
  });
  router.get('/blogs_tags', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM blogs_tags');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
  });
  router.get('/authors', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM authors');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
  });
  router.get('/measuredir', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM measuredir');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
  });
  router.get('/users_orders_products', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM users_orders_products');
      res.json(rows);
    }
    catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  router.get('/orders', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM orders');
      res.json(rows);
    }
    catch (error) {
      console.error(error);
      res.status(500).send('Server error');

    }
  })
  router.get('/reviews', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM reviews');
      res.json(rows)
    }
    catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  })
  // Курс валют
  router.get('/exchange-rate', async (req, res) => {
    try {
      const response = await axios.get(
        'https://v6.exchangerate-api.com/v6/ca512db5fb941cbd13022812/latest/USD'
      );
      const rate = response.data.conversion_rates.UAH;
      res.json({ rate });
    } catch (error) {
      console.error('Error fetching exchange rate:', error.message);
      res.status(500).json({ error: 'Failed to fetch exchange rate' });
    }
  });
  router.get('/products/search', async (req, res) => {
    const { query } = req.query; // Получаем параметр query из URL
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
      const [rows] = await db.execute(
        'SELECT * FROM products WHERE title_ua LIKE ? OR title_us LIKE ? LIMIT 10',
        [`%${query}%`, `%${query}%`]
      );
      //await db.end();
      res.json(rows);
    } catch (error) {
      console.error('Error searching products:', error.message);
      res.status(500).json({ error: 'Failed to search products' });
    }
  });
  router.get('/last_order', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM orders ORDER BY orderId DESC LIMIT 1');
      res.json(rows)
    }
    catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  })
  router.get('/last_address', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM addresses ORDER BY addressId DESC LIMIT 1');
      res.json(rows)
    }
    catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  })
  router.post('/addresses', async (req, res) => {
    const { addressId, city, street, appartment, zip } = req.body;
    try {
      console.log(`INSERT INTO addresses (addressId, city, street, appartment, zip) values (?, ?, ?, ?, ?),
        ${[addressId, city, street, appartment, zip]}`)
      await db.query('INSERT INTO addresses (addressId, city, street, appartment, zip) values (?, ?, ?, ?, ?)',
        [addressId, city, street, appartment, zip]
      );
      res.json();
    }
    catch (error) {
      console.error(error);
      res.status(500).send('server error');
    }
  })
  router.post('/order', async (req, res) => {
    const { orderId, complete, date, info, paymentId, deliveryId, addressId } = req.body;
    try {
      console.log(`INSERT INTO orders (orderId, complete, date, info, paymentId, deliveryId, addressId) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ${[orderId, complete, date, info, paymentId, deliveryId, addressId]}`);
      await db.query('INSERT INTO orders (orderId, complete, date, info, paymentId, deliveryId, addressId) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [orderId, complete, date, info, paymentId, deliveryId, addressId]);
      res.json();
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });
  router.post('/users_orders_products', async (req, res) => {
    const { userId, orderId, productId, amount } = req.body;
    try {
      console.log(`INSERT INTO users_orders_products (userId, orderId, productId, amount) values (?, ?, ?, ?)',
        ${[userId, orderId, productId, amount]}`);
      await db.query('INSERT INTO users_orders_products (userId, orderId, productId, amount) values (?, ?, ?, ?)',
        [userId, orderId, productId, amount]
      );
      res.json();
    }
    catch (error) {
      console.error(error);
      res.status(500).send('server error');
    }
  })
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log(email, password)
      console.log('Email и пароль обязательны');
      return res.status(400).json({ error: 'неверніе данніе' });
    }

    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

      if (rows.length === 0) {
        console.log('neverniy email2');
        return res.status(401).json({ error: "neverniy email" });
      }
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ error: "neverniy parol3" });
      }
      console.log({ id: user.userId, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
      const token = jwt.sign({ id: user.userId, userEmail: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ userId: user.userId, userName: user.name, userSurname: user.surname, userEmail: user.email, userPhone: user.phone, token });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });
  router.post('/register', async (req, res) => {
    const { email, password, name, surname, phone } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Неверные данные' });
    }

    try {
      const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
      }

      // Хеширування паролю
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await db.query(
        'INSERT INTO users (email, password, name, surname, phone) VALUES (?, ?, ?, ?, ?)',
        [email, hashedPassword, name, surname, phone]
      );

      res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });

  return router;
};
