/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/user/orders/${user.user_id}`
      );

      const orders = await response.json();
      if (!response.ok) {
        setError("Falló en el fetch de órdenes: " + response.statusText);
        return;
      }
      setIsLoading(false);
      setOrders(orders);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const getAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/seller/orders`
      );

      const orders = await response.json();
      if (!response.ok) {
        setError("Falló en el fetch de órdenes: " + response.statusText);
        return;
      }
      setIsLoading(false);
      setOrders(orders);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (id) => {
    return orders.find((order) => order.id === id);
  };

  return (
    <OrderContext.Provider
      value={{ user, orders, error, isLoading, getOrderById, getAllOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  const { user, orders, error, isLoading, getOrderById, getAllOrders } = context;
  return { user, orders, error, isLoading, getOrderById, getAllOrders };
};
