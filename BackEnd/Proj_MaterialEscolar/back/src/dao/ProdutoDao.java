package dao;

import entity.Produto;
import java.util.ArrayList;
import java.util.List;
import banco.ConnectionFactory;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ProdutoDao {
//insert um produto no banco
    public void inserir(Produto produto) throws SQLException {
        String sql = "INSERT INTO Produto (tamanho, cor, marca, genero, preco, estoque, descricao) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setDouble(1, produto.getTamanho());
            stmt.setString(2, produto.getCor());
            stmt.setString(3, produto.getMarca());
            stmt.setString(4, produto.getGenero());
            stmt.setDouble(5, produto.getPreco());
            stmt.setInt(6, produto.getEstoque());
            stmt.setString(7, produto.getDescricao());
            
            stmt.executeUpdate();
            
            // pega o id gerado aurotmaticamente
            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    produto.setId(rs.getInt(1));
                }
            }
        }
    }
    
   //lista produtos
    public List<Produto> listarTodos() throws SQLException {
        String sql = "SELECT * FROM Produto";
        List<Produto> produtos = new ArrayList<>();
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                produtos.add(extrairProdutoDoResultSet(rs));
            }
        }
        
        return produtos;
    }
    
//busca produto por id
    public Produto buscarPorId(int id) throws SQLException {
        String sql = "SELECT * FROM Produto WHERE id = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return extrairProdutoDoResultSet(rs);
                }
            }
        }
        
        return null;
    }
    
//busca produtos por marca
    public List<Produto> buscarPorMarca(String marca) throws SQLException {
        String sql = "SELECT * FROM Produto WHERE marca LIKE ?";
        List<Produto> produtos = new ArrayList<>();
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, "%" + marca + "%");
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    produtos.add(extrairProdutoDoResultSet(rs));
                }
            }
        }
        
        return produtos;
    }
    
    //busca produtos por gênero
    public List<Produto> buscarPorGenero(String genero) throws SQLException {
        String sql = "SELECT * FROM Produto WHERE genero = ?";
        List<Produto> produtos = new ArrayList<>();
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, genero);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    produtos.add(extrairProdutoDoResultSet(rs));
                }
            }
        }
        
        return produtos;
    }
    
     //busca produtos com estoque baixo 
    public List<Produto> buscarEstoqueBaixo(int limite) throws SQLException {
        String sql = "SELECT * FROM Produto WHERE estoque <= ?";
        List<Produto> produtos = new ArrayList<>();
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, limite);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    produtos.add(extrairProdutoDoResultSet(rs));
                }
            }
        }
        
        return produtos;
    }
    
    //busca por faixa de preço
    public List<Produto> buscarPorFaixaPreco(double precoMin, double precoMax) throws SQLException {
        String sql = "SELECT * FROM Produto WHERE preco BETWEEN ? AND ?";
        List<Produto> produtos = new ArrayList<>();
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setDouble(1, precoMin);
            stmt.setDouble(2, precoMax);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    produtos.add(extrairProdutoDoResultSet(rs));
                }
            }
        }
        
        return produtos;
    }
    
    //att um produto existente
    public void atualizar(Produto produto) throws SQLException {
        String sql = "UPDATE Produto SET tamanho = ?, cor = ?, marca = ?, genero = ?, " +
                     "preco = ?, estoque = ?, descricao = ? WHERE id = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setDouble(1, produto.getTamanho());
            stmt.setString(2, produto.getCor());
            stmt.setString(3, produto.getMarca());
            stmt.setString(4, produto.getGenero());
            stmt.setDouble(5, produto.getPreco());
            stmt.setInt(6, produto.getEstoque());
            stmt.setString(7, produto.getDescricao());
            stmt.setInt(8, produto.getId());
            
            int linhasAfetadas = stmt.executeUpdate();
            
            if (linhasAfetadas == 0) {
                throw new SQLException("Produto não encontrado com ID: " + produto.getId());
            }
        }
    }
    
    //att o estoque do produto
    public void atualizarEstoque(int id, int novoEstoque) throws SQLException {
        String sql = "UPDATE Produto SET estoque = ? WHERE id = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, novoEstoque);
            stmt.setInt(2, id);
            
            int linhasAfetadas = stmt.executeUpdate();
            
            if (linhasAfetadas == 0) {
                throw new SQLException("Produto não encontrado com ID: " + id);
            }
        }
    }
    
    //atualiza o estoque de acordo com as vendas feitas
    public boolean diminuirEstoque(int id, int quantidade) throws SQLException {
        //se há estoque
        Produto produto = buscarPorId(id);
        
        if (produto == null) {
            throw new SQLException("Produto não encontrado");
        }
        
        if (produto.getEstoque() < quantidade) {
            return false; 
        }
        
        String sql = "UPDATE Produto SET estoque = estoque - ? WHERE id = ? AND estoque >= ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, quantidade);
            stmt.setInt(2, id);
            stmt.setInt(3, quantidade);
            
            int linhasAfetadas = stmt.executeUpdate();
            return linhasAfetadas > 0;
        }
    }
    
//reposição
    public void aumentarEstoque(int id, int quantidade) throws SQLException {
        String sql = "UPDATE Produto SET estoque = estoque + ? WHERE id = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, quantidade);
            stmt.setInt(2, id);
            
            int linhasAfetadas = stmt.executeUpdate();
            
            if (linhasAfetadas == 0) {
                throw new SQLException("Produto não encontrado com ID: " + id);
            }
        }
    }
    
    //deleta produto
    public void deletar(int id) throws SQLException {
        String sql = "DELETE FROM Produto WHERE id = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            int linhasAfetadas = stmt.executeUpdate();
            
            if (linhasAfetadas == 0) {
                throw new SQLException("Produto não encontrado com ID: " + id);
            }
        }
    }
    
    //verifica se ecxiste produto
    public boolean existe(int id) throws SQLException {
        String sql = "SELECT COUNT(*) FROM Produto WHERE id = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) > 0;
                }
            }
        }
        
        return false;
    }

    public int contarProdutos() throws SQLException {
        String sql = "SELECT COUNT(*) FROM Produto";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            if (rs.next()) {
                return rs.getInt(1);
            }
        }
        
        return 0;
    }
    
    private Produto extrairProdutoDoResultSet(ResultSet rs) throws SQLException {
        Produto produto = new Produto();
        produto.setId(rs.getInt("id"));
        produto.setTamanho(rs.getDouble("tamanho"));
        produto.setCor(rs.getString("cor"));
        produto.setMarca(rs.getString("marca"));
        produto.setGenero(rs.getString("genero"));
        produto.setPreco(rs.getDouble("preco"));
        produto.setEstoque(rs.getInt("estoque"));
        produto.setDescricao(rs.getString("descricao"));
        
        return produto;
    }
}