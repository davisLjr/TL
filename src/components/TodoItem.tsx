import React from "react";
import { Todo } from "../hooks/useTodos";
import { Checkbox, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <ListItem style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <ListItemText primary={todo.titulo} secondary={todo.descripcion} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '5rem' }}>
        <p style={{ margin: '0' }}>
          <strong>categoria:</strong>
        </p>
        <p style={{ margin: '0' }}>{todo.categoria}</p>
      </div>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => onDelete(todo.id)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
