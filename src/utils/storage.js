// Initialize demo users if not exists
const initializeDefaultUsers = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Check if demo users already exist
  const adminExists = users.some(u => u.email === 'admin@demo.com');
  const managerExists = users.some(u => u.email === 'manager@demo.com');
  const userExists = users.some(u => u.email === 'user@demo.com');
  
  // Add default users if they don't exist
  const defaultUsers = [];
  
  if (!adminExists) {
    defaultUsers.push({
      id: 'admin-demo-1',
      name: 'Admin User',
      email: 'admin@demo.com',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString()
    });
  }
  
  if (!managerExists) {
    defaultUsers.push({
      id: 'manager-demo-1',
      name: 'Manager User',
      email: 'manager@demo.com',
      password: 'manager123',
      role: 'manager',
      createdAt: new Date().toISOString()
    });
  }
  
  if (!userExists) {
    defaultUsers.push({
      id: 'user-demo-1',
      name: 'Regular User',
      email: 'user@demo.com',
      password: 'user123',
      role: 'user',
      createdAt: new Date().toISOString()
    });
  }
  
  if (defaultUsers.length > 0) {
    const updatedUsers = [...users, ...defaultUsers];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log('✅ Demo users created successfully!');
    console.log('👤 User: user@demo.com / user123');
    console.log('👥 Manager: manager@demo.com / manager123');
    console.log('🛡️ Admin: admin@demo.com / admin123');
  }
};

// Local storage se data fetch karne ke liye
export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Local storage mein data save karne ke liye
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Clear specific key from localStorage
export const clearFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error clearing from localStorage:', error);
    return false;
  }
};

// Clear all localStorage
export const clearAllStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing all localStorage:', error);
    return false;
  }
};

// Initialize storage with empty arrays if not exists
export const initializeStorage = () => {
  const keys = [
    'users',
    'languages', 
    'countries', 
    'states', 
    'districts', 
    'images'
  ];
  
  keys.forEach(key => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  });
  
  // Initialize demo users
  initializeDefaultUsers();
  
  console.log('✅ Storage initialized successfully!');
};

// Call initialization when module loads
initializeStorage();
