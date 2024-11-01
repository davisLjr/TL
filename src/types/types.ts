// types.ts
export interface Product {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  completed?: boolean;
}

export interface ProductsData {
  productos: Product[];
}
