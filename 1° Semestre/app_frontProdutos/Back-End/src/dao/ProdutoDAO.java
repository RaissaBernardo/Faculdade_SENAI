package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Produto;
import model.Categoria;
import util.ConnectionFactory;

public class ProdutoDAO {

    // ------------------------------------
    // READ ALL
    // ------------------------------------
    public List<Produto> buscarTodos() {
        List<Produto> produtos = new ArrayList<>();

        String sql = "SELECT p.id, p.nome, p.preco, p.estoque, " +
                     "c.id as id_categoria, c.nome as nome_categoria " +
                     "FROM produtos p " +
                     "LEFT JOIN categorias c ON p.id_categoria = c.id";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {

                Long idCategoria = rs.getObject("id_categoria", Long.class); // CORRETO
                Categoria categoria = null;
                if (idCategoria != null) {
                    categoria = new Categoria(idCategoria, rs.getString("nome_categoria"));
                }

                Produto produto = new Produto(
                        rs.getLong("id"),
                        rs.getString("nome"),
                        rs.getDouble("preco"),
                        rs.getInt("estoque"),
                        categoria
                );

                produtos.add(produto);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao buscar produtos: " + e.getMessage());
            e.printStackTrace();
        }

        return produtos;
    }

    // ------------------------------------
    // READ BY ID
    // ------------------------------------
    public Produto buscarPorId(Long id) {

        Produto produto = null;

        String sql = "SELECT p.id, p.nome, p.preco, p.estoque, " +
                     "c.id as id_categoria, c.nome as nome_categoria " +
                     "FROM produtos p " +
                     "LEFT JOIN categorias c ON p.id_categoria = c.id " +
                     "WHERE p.id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Long idCategoria = rs.getObject("id_categoria", Long.class); // CORRETO
                    Categoria categoria = null;
                    if (idCategoria != null) {
                        categoria = new Categoria(idCategoria, rs.getString("nome_categoria"));
                    }

                    produto = new Produto(
                            rs.getLong("id"),
                            rs.getString("nome"),
                            rs.getDouble("preco"),
                            rs.getInt("estoque"),
                            categoria
                    );
                }
            }

        } catch (SQLException e) {
            System.err.println("Erro ao buscar produto por ID: " + id + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }

        return produto;
    }

    // ------------------------------------
    // CREATE
    // ------------------------------------
    public void inserir(Produto produto) {

        String sql = "INSERT INTO produtos (nome, preco, estoque, id_categoria) VALUES (?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, produto.getNome());
            stmt.setDouble(2, produto.getPreco());
            stmt.setInt(3, produto.getEstoque());

            if (produto.getCategoria() != null && produto.getCategoria().getId() != null) {
                stmt.setLong(4, produto.getCategoria().getId());
            } else {
                stmt.setNull(4, java.sql.Types.BIGINT);
            }

            stmt.executeUpdate();

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    produto.setId(rs.getLong(1));
                }
            }

        } catch (SQLException e) {
            System.err.println("Erro ao inserir produto: " + produto.getNome() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ------------------------------------
    // UPDATE
    // ------------------------------------
    public void atualizar(Produto produto) {

        String sql = "UPDATE produtos SET nome = ?, preco = ?, estoque = ?, id_categoria = ? WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, produto.getNome());
            stmt.setDouble(2, produto.getPreco());
            stmt.setInt(3, produto.getEstoque());

            if (produto.getCategoria() != null && produto.getCategoria().getId() != null) {
                stmt.setLong(4, produto.getCategoria().getId());
            } else {
                stmt.setNull(4, java.sql.Types.BIGINT);
            }

            stmt.setLong(5, produto.getId());

            int linhasAfetadas = stmt.executeUpdate();
            System.out.println("Produto ID " + produto.getId() + " atualizado. Linhas afetadas: " + linhasAfetadas);

        } catch (SQLException e) {
            System.err.println("Erro ao atualizar produto ID: " + produto.getId() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ------------------------------------
    // DELETE
    // ------------------------------------
    public void deletar(Long id) {

        String sql = "DELETE FROM produtos WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);

            int linhasAfetadas = stmt.executeUpdate();
            System.out.println("Tentativa de deletar Produto ID " + id + ". Linhas afetadas: " + linhasAfetadas);

        } catch (SQLException e) {
            System.err.println("Erro ao deletar produto ID: " + id + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
