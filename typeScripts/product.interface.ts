export interface IproductListProps {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  // token: string,
  // message: string,
  // status: number
  map:any,
}

export interface IproductCreateProps {
    name:string,
    price:string,
    description:string,
    category:string,
    token: string,
    message: string,
    status: number
}

export interface ProductListResponse {
  product: Product[]; // ✅ product is an array
}

export interface IproductDetailsProps {
    id: number;
    name:string,
    price:string,
    description:string,
    category:string,
    token: string,
    message: string,
    status: number
  }

  export interface IproductDeleteProps {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
  }

  export interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    description?: string;
  }
  
  export interface IProductListProps {
    product: Product[]; // 👈 this should be an array
  }
export interface productList extends IproductListProps {
    product: IproductListProps
}

export interface productCreateProps extends IproductCreateProps {
    product: IproductCreateProps
}

export interface productDetail extends IproductDetailsProps {
    product: IproductDetailsProps
}

export interface productDelete extends IproductDeleteProps {
    product: IproductDeleteProps
}