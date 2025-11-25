package entity;

public class Compra {
    private int idCompra;
    private dateTime dataCompra;
    private dateTime dataEntrega;
    private double valorTotal;
    private int quantidadeItens;

    public int getIdCompra() {
        return idCompra;
    }
    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }
    public dateTime getDataCompra() {
        return dataCompra;
    }
    public void setDataCompra(dateTime dataCompra) {
        this.dataCompra = dataCompra;
    }
    public dateTime getDataEntrega() {
        return dataEntrega;
    }
    public void setDataEntrega(dateTime dataEntrega) {
        this.dataEntrega = dataEntrega;
    }
    public double getValorTotal() {
        return valorTotal;
    }
    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
    public int getQuantidadeItens() {
        return quantidadeItens;
    }
    public void setQuantidadeItens(int quantidadeItens) {
        this.quantidadeItens = quantidadeItens;
    }

    //construtor
    public Compra(int idCompra, dateTime dataCompra, dateTime dataEntrega, double valorTotal, int quantidadeItens) {
        this.idCompra = idCompra;
        this.dataCompra = dataCompra;
        this.dataEntrega = dataEntrega;
        this.valorTotal = valorTotal;
        this.quantidadeItens = quantidadeItens;
    }   

    public Compra() {
    }
}
