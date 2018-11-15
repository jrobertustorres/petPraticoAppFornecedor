import { ItemPedidoFornecedorEntity } from '../model/item-pedido-fornecedor-entity';

export class PedidoDetalheEntity {

  public idPedido: number;
  public idPessoa: number;

  public numeroPedidoFormat: string;
  public dataPedidoFormat: string;
  public tipoPagamento: string;
  public trocoPara: string;

  public valorPedidoFormat: string;
  public valorDescontoFormat: string;
  public valorTotalPedidoFormat: string;
  public porcentagemDescontoFormat: string;
  public valorFreteFormat: string;

  public tipoEntrega: string;

  public nomePessoa: string;
  public cpfPessoa: string;
  public telefone: string;
  public endereco: string;
  public statusPedido: string;

  public listItemPedidoFornecedorEntity: ItemPedidoFornecedorEntity[] = [];

  constructor(){
  }

}