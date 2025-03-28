import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log(response.data[0]);
        // {"address": {"city": "Gwenborough", "geo": {"lat": "-37.3159", "lng": "81.1496"}, "street": "Kulas Light", "suite": "Apt. 556", "zipcode": "92998-3874"}, "company": {"bs": "harness real-time e-markets", "catchPhrase": "Multi-layered client-server neural-net", "name": "Romaguera-Crona"}, "email": "Sincere@april.biz", "id": 1, "name": "Leanne Graham", "phone": "1-770-736-8031 x56442", "username": "Bret", "website": "hildegard.org"}
        
        setAllUsers(response.data);
      } catch (error) {
        console.warn('Something wrong fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const login = (identifier) => {
    const user = allUsers.find(
      (u) => u.username?.toLowerCase() === identifier.toLowerCase() ||
             u.email?.toLowerCase() === identifier.toLowerCase()
    );

    if (user) {
      setLoggedInUser(user);
      return { success: true, message: `Welcome ${user.username}!` };
    }
    return { success: false, message: 'User not found' };
  };

  const signUp = (username, email) => {
    const exists = allUsers.some(
      (u) =>
        u.username?.toLowerCase() === username.toLowerCase() ||
        u.email?.toLowerCase() === email.toLowerCase()
    );

    if (!exists) {
      const newUser = {
        id: Date.now(),
        username,
        email,
      };
      setAllUsers((prev) => [...prev, newUser]);
      setLoggedInUser(newUser);
      return { success: true, message: `Welcome ${username}!` };
    }
    return { success: false, message: 'Emmail already in use' };
  };

  const logout = () => {
    setLoggedInUser(null);
    return { success: true, message: 'logut Success' };
  };

  return (
    <AuthContext.Provider value={{ allUsers, loggedInUser, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
