import React, { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import useTodos from "./hooks/useTodos";
import TodoList from "./components/TodoList";
import AddTodoModal from "./components/AddTodoModal";

const App: React.FC = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    setCategoryFilter,
    categoryFilter,
    uniqueCategories,
  } = useTodos(true);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategoryFilter(event.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Add Todo
      </Button>

      <AddTodoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addTodo}
        uniqueCategories={uniqueCategories}
      />

      <Typography variant="h6" gutterBottom>
        Filter by Category
      </Typography>
      <Select
        value={categoryFilter ?? ""}
        onChange={handleCategoryChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">All Categories</MenuItem>
        {uniqueCategories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>

      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
        Incomplete Tasks
      </Typography>
      <TodoList
        todos={todos.filter((todo) => !todo.completed)}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <Typography variant="h5" gutterBottom>
        Completed Tasks
      </Typography>
      <TodoList
        todos={todos.filter((todo) => todo.completed)}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </Container>
  );
};

export default App;
