package dao;

import entity.Compra;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import banco.ConnectionFactory;

public class CompraDao {
    
    /**
     * Insere uma nova compra no banco
     */
    public void inserir(Compra compra) throws SQLException {
        String sql = "INSERT INTO Compra (data_compra, data_entrega, id_produto, id_cliente, quantidade, valorTotal) " +
                     "VALUES (?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setObject(1, compra.getDataCompra());
            stmt.setObject(2, compra.getDataEntrega());
            stmt.setInt(3, compra.getIdProduto());
            stmt.setInt(4, compra.getIdCliente());
            stmt.setInt(5, compra.getQuantidade());
            stmt.setDouble(6, compra.getValorTotal());
            
            stmt.executeUpdate();
            
            // Recupera o ID gerado
            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    compra.setIdCompra(rs.getInt(1));
                }
            }
        }
    }
    
    /**
     * Busca todas as compras
     */
    public List<Compra> listarTodas() throws SQLException {
        String sql = "SELECT * FROM Compra";
        List<Compra> compras = new ArrayList<>();
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                compras.add(extrairCompraDoResultSet(rs));
            }
        }
        
        return compras;
    }
    
    /**
     * Busca compra por ID
     */
    public Compra buscarPorId(int id) throws SQLException {
        String sql = "SELECT * FROM Compra WHERE idCompra = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return extrairCompraDoResultSet(rs);
                }
            }
        }
        
        return null;
    }
    
    /**
     * Lista compras atrasadas
     */
    public List<Compra> listarComprasAtrasadas() throws SQLException {
        String sql = "SELECT * FROM Compra WHERE data_entrega < NOW()";
        List<Compra> compras = new ArrayList<>();
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                compras.add(extrairCompraDoResultSet(rs));
            }
        }
        
        return compras;
    }
    
    /**
     * Lista compras por período
     */
    public List<Compra> listarPorPeriodo(LocalDateTime inicio, LocalDateTime fim) throws SQLException {
        String sql = "SELECT * FROM Compra WHERE data_compra BETWEEN ? AND ?";
        List<Compra> compras = new ArrayList<>();
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setObject(1, inicio);
            stmt.setObject(2, fim);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    compras.add(extrairCompraDoResultSet(rs));
                }
            }
        }
        
        return compras;
    }
    
    /**
     * Atualiza a data de entrega
     */
    public void atualizarDataEntrega(int idCompra, LocalDateTime novaDataEntrega) throws SQLException {
        String sql = "UPDATE Compra SET data_entrega = ? WHERE idCompra = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setObject(1, novaDataEntrega);
            stmt.setInt(2, idCompra);
            
            stmt.executeUpdate();
        }
    }
    
    /**
     * Deleta uma compra
     */
    public void deletar(int id) throws SQLException {
        String sql = "DELETE FROM Compra WHERE idCompra = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
    
    /**
     * Extrai objeto Compra do ResultSet
     */
    private Compra extrairCompraDoResultSet(ResultSet rs) throws SQLException {
        Compra compra = new Compra();
        compra.setIdCompra(rs.getInt("idCompra"));
        
        // Converte DATETIME do MySQL para LocalDateTime
        Timestamp tsCompra = rs.getTimestamp("data_compra");
        if (tsCompra != null) {
            compra.setDataCompra(tsCompra.toLocalDateTime());
        }
        
        Timestamp tsEntrega = rs.getTimestamp("data_entrega");
        if (tsEntrega != null) {
            compra.setDataEntrega(tsEntrega.toLocalDateTime());
        }
        
        compra.setIdProduto(rs.getInt("id_produto"));
        compra.setIdCliente(rs.getInt("id_cliente"));
        compra.setQuantidade(rs.getInt("quantidade"));
        compra.setValorTotal(rs.getDouble("valorTotal"));
        
        return compra;
    }
}