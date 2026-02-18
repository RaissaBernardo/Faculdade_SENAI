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

    // insere
    public void inserir(Produto produto) throws SQLException {
        String sql = "INSERT INTO Produto (nome, tamanho, cor, marca, genero, preco, estoque, descricao) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, produto.getNome());
            stmt.setDouble(2, produto.getTamanho());
            stmt.setString(3, produto.getCor());
            stmt.setString(4, produto.getMarca());
            stmt.setString(5, produto.getGenero());
            stmt.setDouble(6, produto.getPreco());
            stmt.setInt(7, produto.getEstoque());
            stmt.setString(8, produto.getDescricao());
            
            stmt.executeUpdate();
            
            // pegar ID gerado
            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    produto.setId(rs.getInt(1));
                }
            }
        }
    }
    
    // retorna
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

    //busca
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

    // busca porm arca
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

    //busca por genero
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

    // att
    public void atualizar(Produto produto) throws SQLException {
        String sql = "UPDATE Produto SET nome = ?, tamanho = ?, cor = ?, marca = ?, genero = ?, " +
                     "preco = ?, estoque = ?, descricao = ? WHERE id = ?";
        
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, produto.getNome());
            stmt.setDouble(2, produto.getTamanho());
            stmt.setString(3, produto.getCor());
            stmt.setString(4, produto.getMarca());
            stmt.setString(5, produto.getGenero());
            stmt.setDouble(6, produto.getPreco());
            stmt.setInt(7, produto.getEstoque());
            stmt.setString(8, produto.getDescricao());
            stmt.setInt(9, produto.getId());
            
            int linhasAfetadas = stmt.executeUpdate();
            
            if (linhasAfetadas == 0) {
                throw new SQLException("Produto não encontrado com ID: " + produto.getId());
            }
        }
    }

    // estoque att
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

    public boolean diminuirEstoque(int id, int quantidade) throws SQLException {
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

    // aumentar estoque
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

    // deletar produto
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

    // existe?
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

    // quantidade total
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
        produto.setNome(rs.getString("nome"));
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
