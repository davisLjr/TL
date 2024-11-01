import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export interface Product {
  titulo: string;
  descripcion: string;
  categoria: string;
}

export interface Todo {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  completed: boolean;
}

const useTodos = (loadFromJson: boolean) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:3000/productos"
        );
        const products = response.data;
        setTodos(
          products.map((product) => ({
            id: uuidv4(),
            titulo: product.titulo,
            descripcion: product.descripcion,
            categoria: product.categoria,
            completed: false,
          }))
        );

        const categories = Array.from(
          new Set(products.map((product) => product.categoria))
        );
        setUniqueCategories(categories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (loadFromJson) {
      fetchProducts();
    }
  }, [loadFromJson]);

  const addTodo = async (todo: Omit<Todo, "id">) => {
    try {
      const newTodo: Todo = {
        ...todo,
        id: uuidv4(),
      };
      await axios.post<Todo>("http://localhost:3000/productos", newTodo);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filterTodos = () => {
    return categoryFilter
      ? todos.filter((todo) => todo.categoria === categoryFilter)
      : todos;
  };

  return {
    todos: filterTodos(),
    addTodo,
    toggleTodo,
    deleteTodo,
    setCategoryFilter,
    categoryFilter,
    uniqueCategories,
  };
};

export default useTodos;
