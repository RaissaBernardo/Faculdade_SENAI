package entity;

import java.time.LocalDateTime;
import java.time.Duration;
import java.time.format.DateTimeFormatter;

public class Compra {
    private int idCompra;
    private LocalDateTime dataCompra;
    private LocalDateTime dataEntrega;
    private int idProduto;
    private int idCliente;
    private int quantidade;
    private double valorTotal;
    
    // Formatador para exibição de datas
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
    
    // Constructors
    public Compra() {
        this.dataCompra = LocalDateTime.now(); // Define data atual automaticamente
    }
    
    public Compra(int idCompra, LocalDateTime dataCompra, LocalDateTime dataEntrega, 
                  int idProduto, int idCliente, int quantidade, double valorTotal) {
        this.idCompra = idCompra;
        this.dataCompra = dataCompra;
        this.dataEntrega = dataEntrega;
        this.idProduto = idProduto;
        this.idCliente = idCliente;
        this.quantidade = quantidade;
        this.valorTotal = valorTotal;
    }
    
    // Getters e Setters
    public int getIdCompra() {
        return idCompra;
    }
    
    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }
    
    public LocalDateTime getDataCompra() {
        return dataCompra;
    }
    
    public void setDataCompra(LocalDateTime dataCompra) {
        this.dataCompra = dataCompra;
    }
    
    public LocalDateTime getDataEntrega() {
        return dataEntrega;
    }
    
    public void setDataEntrega(LocalDateTime dataEntrega) {
        this.dataEntrega = dataEntrega;
    }
    
    public int getIdProduto() {
        return idProduto;
    }
    
    public void setIdProduto(int idProduto) {
        this.idProduto = idProduto;
    }
    
    public int getIdCliente() {
        return idCliente;
    }
    
    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }
    
    public int getQuantidade() {
        return quantidade;
    }
    
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    
    public double getValorTotal() {
        return valorTotal;
    }
    
    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
    
    // ========== MÉTODOS DE REGRAS DE NEGÓCIO TEMPORAIS ==========
    
    /**
     * Calcula o prazo de entrega previsto (em dias)
     */
    public long calcularPrazoEntregaDias() {
        if (dataEntrega == null || dataCompra == null) {
            return 0;
        }
        Duration duracao = Duration.between(dataCompra, dataEntrega);
        return duracao.toDays();
    }
    
    /**
     * Verifica se a entrega está atrasada
     */
    public boolean isEntregaAtrasada() {
        if (dataEntrega == null) {
            return false;
        }
        return LocalDateTime.now().isAfter(dataEntrega);
    }
    
    /**
     * Calcula multa por atraso na entrega
     * Regra: R$ 5,00 por dia de atraso
     */
    public double calcularMultaPorAtraso() {
        if (!isEntregaAtrasada()) {
            return 0.0;
        }
        
        Duration atraso = Duration.between(dataEntrega, LocalDateTime.now());
        long diasAtraso = atraso.toDays();
        
        return diasAtraso * 5.00; // R$ 5 por dia
    }
    
    /**
     * Retorna o status da entrega
     */
    public String getStatusEntrega() {
        if (dataEntrega == null) {
            return "SEM_PREVISAO";
        }
        
        LocalDateTime agora = LocalDateTime.now();
        
        if (agora.isBefore(dataEntrega)) {
            long diasRestantes = Duration.between(agora, dataEntrega).toDays();
            return "EM_TRANSITO (" + diasRestantes + " dias restantes)";
        } else if (agora.isAfter(dataEntrega)) {
            long diasAtraso = Duration.between(dataEntrega, agora).toDays();
            return "ATRASADA (" + diasAtraso + " dias de atraso)";
        } else {
            return "ENTREGA_PREVISTA_HOJE";
        }
    }
    
    /**
     * Define a data de entrega com base em dias úteis
     */
    public void definirDataEntregaComPrazo(int diasUteis) {
        this.dataEntrega = dataCompra.plusDays(diasUteis);
    }
    
    /**
     * Formata a data de compra para exibição
     */
    public String getDataCompraFormatada() {
        return dataCompra != null ? dataCompra.format(FORMATTER) : "N/A";
    }
    
    /**
     * Formata a data de entrega para exibição
     */
    public String getDataEntregaFormatada() {
        return dataEntrega != null ? dataEntrega.format(FORMATTER) : "N/A";
    }
    
    @Override
    public String toString() {
        return "Compra{" +
                "idCompra=" + idCompra +
                ", dataCompra=" + getDataCompraFormatada() +
                ", dataEntrega=" + getDataEntregaFormatada() +
                ", status=" + getStatusEntrega() +
                ", idProduto=" + idProduto +
                ", idCliente=" + idCliente +
                ", quantidade=" + quantidade +
                ", valorTotal=" + valorTotal +
                ", multa=" + calcularMultaPorAtraso() +
                '}';
    }
}