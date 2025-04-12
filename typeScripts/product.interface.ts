export interface IproductListProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
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

export interface IproductDetailsProps {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
  }

  export interface IproductDeleteProps {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
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