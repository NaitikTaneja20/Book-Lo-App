import type { Product, Order, BookRequest } from './types';

export const schools = ["Greenwood High", "Oakridge International", "Valley School", "Northfield Academy"];
export const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
export const subjects = ["Mathematics", "Science", "English", "Social Studies", "History", "Physics", "Chemistry"];

export let products: Product[] = [
  {
    id: 'prod_1',
    name: 'Advanced Mathematics for Class 10',
    description: 'A comprehensive guide to Class 10 mathematics, covering all topics in the curriculum. Includes practice problems and solutions.',
    price: 450,
    imageId: 'book-1',
    stock: 25,
    school: 'Greenwood High',
    class: 'Class 10',
    subject: 'Mathematics',
    type: 'book',
    isbn: '978-3-16-148410-0',
  },
  {
    id: 'prod_2',
    name: 'Spiral Bound Notebook - 200 Pages',
    description: 'High-quality 200-page spiral notebook, perfect for taking notes in any subject. Durable cover and smooth paper.',
    price: 80,
    imageId: 'notebook-1',
    stock: 150,
    type: 'notebook',
  },
  {
    id: 'prod_3',
    name: 'Introduction to Physics',
    description: 'An introductory textbook for Class 9 Science, focusing on the fundamental concepts of physics with clear explanations and diagrams.',
    price: 375,
    imageId: 'book-3',
    stock: 40,
    school: 'Oakridge International',
    class: 'Class 9',
    subject: 'Science',
    type: 'book',
    isbn: '978-1-86-197271-2',
  },
  {
    id: 'prod_4',
    name: 'English Literature Anthology',
    description: 'A collection of classic and modern literature pieces prescribed for Class 8 English. Includes poems, short stories, and essays.',
    price: 299,
    imageId: 'book-2',
    stock: 30,
    class: 'Class 8',
    subject: 'English',
    type: 'book',
    isbn: '978-0-74-327356-5',
  },
    {
    id: 'prod_5',
    name: 'World History: Ancient Civilizations',
    description: 'Explore the wonders of ancient civilizations with this engaging history textbook for Class 6.',
    price: 320,
    imageId: 'book-4',
    stock: 18,
    school: 'Valley School',
    class: 'Class 6',
    subject: 'History',
    type: 'book',
    isbn: '978-0-13-133426-8',
  },
  {
    id: 'prod_6',
    name: 'Composition Notebook - Set of 3',
    description: 'A pack of three durable composition notebooks for various subjects. College-ruled, 100 sheets each.',
    price: 150,
    imageId: 'notebook-3',
    stock: 80,
    type: 'notebook',
  },
  {
    id: 'prod_7',
    name: 'Social Studies for Modern India',
    description: 'A textbook covering the social and political landscape of modern India for Class 7.',
    price: 250,
    imageId: 'book-1',
    stock: 22,
    school: 'Northfield Academy',
    class: 'Class 7',
    subject: 'Social Studies',
    type: 'book',
    isbn: '978-0-32-158621-4',
  },
  {
    id: 'prod_8',
    name: 'Hardcover Journal',
    description: 'A premium hardcover journal with 150 unlined pages, perfect for sketching or journaling.',
    price: 200,
    imageId: 'notebook-4',
    stock: 45,
    type: 'notebook',
  },
];

let ordersData: Order[] = [
  {
    id: 'ORD-170423',
    customerName: 'Anika Sharma',
    customerEmail: 'anika@example.com',
    shippingAddress: '123, Blossom Heights, Mumbai, 400001',
    items: [
      { id: 'prod_1', name: 'Advanced Mathematics for Class 10', price: 450, imageId: 'book-1', quantity: 1 },
      { id: 'prod_2', name: 'Spiral Bound Notebook - 200 Pages', price: 80, imageId: 'notebook-1', quantity: 5 },
    ],
    total: 850,
    status: 'Delivered',
    createdAt: new Date('2023-04-17T10:30:00Z').toISOString(),
  },
    {
    id: 'ORD-180423',
    customerName: 'Rohan Mehta',
    customerEmail: 'rohan@example.com',
    shippingAddress: '45, Sunnyside Apartments, New Delhi, 110001',
    items: [
      { id: 'prod_3', name: 'Introduction to Physics', price: 375, imageId: 'book-3', quantity: 1 },
    ],
    total: 375,
    status: 'Shipped',
    createdAt: new Date('2023-04-18T14:00:00Z').toISOString(),
  },
];

let bookRequests: BookRequest[] = [
  {
    id: 'req_1',
    bookTitle: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '978-0061122415',
    customerName: 'Priya Singh',
    customerContact: 'priya@example.com',
    status: 'Pending',
    createdAt: new Date('2023-05-01T12:00:00Z').toISOString(),
  },
  {
    id: 'req_2',
    bookTitle: 'Comprehensive Chemistry for Class 11',
    author: 'Dr. N. K. Verma',
    customerName: 'Amit Kumar',
    customerContact: 'amit@example.com',
    status: 'Sourced',
    createdAt: new Date('2023-04-28T09:15:00Z').toISOString(),
  },
];


// In a real app, you would use a database.
// For this example, we use an in-memory array and export functions to interact with it.

export const getProducts = async () => {
  // Return a copy to avoid mutation issues outside of the intended functions
  return [...products];
};

export const getProductById = async (id: string) => {
  return products.find(p => p.id === id);
};

export const addProduct = async (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
        ...productData,
        id: `prod_${products.length + 1 + Math.floor(Math.random() * 100)}`,
    };
    products.unshift(newProduct);
    return newProduct;
};


export const getOrders = async () => {
  return ordersData;
};

export const getOrderById = async (id: string) => {
  return ordersData.find(o => o.id === id);
};

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt'>) => {
  const newOrder: Order = {
    ...order,
    id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  ordersData.push(newOrder);
  return newOrder;
}

export const updateOrderStatus = async (id: string, status: Order['status']) => {
    const orderIndex = ordersData.findIndex(o => o.id === id);
    if(orderIndex !== -1) {
        ordersData[orderIndex].status = status;
        return ordersData[orderIndex];
    }
    return null;
}

export const getBookRequests = async () => {
  return [...bookRequests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const addBookRequest = async (requestData: Omit<BookRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRequest: BookRequest = {
        ...requestData,
        id: `req_${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'Pending',
    };
    bookRequests.unshift(newRequest);
    return newRequest;
};
