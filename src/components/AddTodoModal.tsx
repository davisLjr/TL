import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "../validation/validationSchema";
import { Todo } from "../hooks/useTodos";
import { v4 as uuidv4 } from "uuid";

interface AddTodoModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (todo: Todo) => void;
  uniqueCategories: string[];
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  open,
  onClose,
  onAdd,
  uniqueCategories,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(todoSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      categoria: "",
    },
  });

  const onSubmit = (data: Omit<Todo, "id" | "completed">) => {
    const newTodo: Todo = { id: uuidv4(), completed: false, ...data }; // Genera un nuevo UUID como id
    onAdd(newTodo);
    onClose();
    reset();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 3,
          backgroundColor: "white",
          borderRadius: 2,
          width: 400,
          mx: "auto",
          my: "20vh",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Task
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="titulo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                error={!!errors.titulo}
                helperText={
                  errors.titulo ? (errors.titulo.message as string) : ""
                }
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                error={!!errors.descripcion}
                helperText={
                  errors.descripcion
                    ? (errors.descripcion.message as string)
                    : ""
                }
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="categoria"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Category"
                error={!!errors.categoria}
                helperText={
                  errors.categoria ? (errors.categoria.message as string) : ""
                }
                fullWidth
                margin="normal"
              >
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Task
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTodoModal;
