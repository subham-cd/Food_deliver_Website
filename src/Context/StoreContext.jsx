import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { data } from "react-router-dom";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list,setFoodList]= useState([])

  const url = "http://localhost:4000";

  // ✅ Load token from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    async function loadData() {
      await fetchFoodList();
       if (storedToken) {
      setToken(storedToken);
    }
    }
    loadData();
  }, []);

  // ✅ Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
 const fetchFoodList = async () => {
  try {
    const response = await axios.get(url + "/api/food/list");
    console.log("🍽️ Backend Response:", response.data); // add this
    if (response.data.success) {
      setFoodList(response.data.data); // ✅ set only if success
    } else {
      console.warn("⚠️ Food list fetch failed:", response.data.message);
    }
  } catch (err) {
    console.error("❌ Error fetching food list", err);
  }
};
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
