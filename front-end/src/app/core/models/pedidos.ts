
export interface ItemPedido {
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  quantidade: number;
}

export interface Pedido {
  id: string;
  dataCompra: string;
  previsaoEntrega: string;
  total: number;
  status: 'Pedido confirmado' | 'Em preparação' | 'Enviado' | 'Entregue';
  itens: ItemPedido[];
}
