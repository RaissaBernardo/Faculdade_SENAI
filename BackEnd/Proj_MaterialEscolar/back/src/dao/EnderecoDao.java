package dao;

import java.sql.Statement;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import banco.ConnectionFactory;
import entity.Endereco;

public class EnderecoDao {

    //buscar todos
    public List<Endereco> buscarTodos() {
        List<Endereco> enderecos = new ArrayList<>();
        String sql = "SELECT id, rua, cidade, estado, cep, bairro, numero FROM endereco";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Endereco endereco = new Endereco(
                        rs.getInt("id"),
                        rs.getString("rua"),
                        rs.getString("cidade"),
                        rs.getString("estado"),
                        rs.getString("cep"),
                        rs.getString("bairro"),
                        rs.getString("numero")
                );

                enderecos.add(endereco);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao buscar endereços: " + e.getMessage());
            e.printStackTrace();
        }

        return enderecos;
    }

    //buscar por ID
    public Endereco buscarPorId(int id) {
        Endereco endereco = null;
        String sql = "SELECT id, rua, cidade, estado, cep, bairro, numero FROM endereco WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    endereco = new Endereco(
                            rs.getInt("id"),
                            rs.getString("rua"),
                            rs.getString("cidade"),
                            rs.getString("estado"),
                            rs.getString("cep"),
                            rs.getString("bairro"),
                            rs.getString("numero")
                    );
                }
            }

        } catch (SQLException e) {
            System.err.println("Erro ao buscar endereço por ID: " + id + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }

        return endereco;
    }

    //inserir
    public void inserir(Endereco endereco) {
        String sql = "INSERT INTO endereco (rua, cidade, estado, cep, bairro, numero) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, endereco.getRua());
            stmt.setString(2, endereco.getCidade());
            stmt.setString(3, endereco.getEstado());
            stmt.setString(4, endereco.getCep());
            stmt.setString(5, endereco.getBairro());
            stmt.setString(6, endereco.getNumero());

            stmt.executeUpdate();

            // pega ID auto increment
            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    endereco.setId(rs.getInt(1));
                }
            }

        } catch (SQLException e) {
            System.err.println("Erro ao inserir endereço: " + e.getMessage());
            e.printStackTrace();
        }
    }

    //atualizar
    public void atualizar(Endereco endereco) {
        String sql = "UPDATE endereco SET rua = ?, cidade = ?, estado = ?, cep = ?, bairro = ?, numero = ? WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, endereco.getRua());
            stmt.setString(2, endereco.getCidade());
            stmt.setString(3, endereco.getEstado());
            stmt.setString(4, endereco.getCep());
            stmt.setString(5, endereco.getBairro());
            stmt.setString(6, endereco.getNumero());
            stmt.setInt(7, endereco.getId());

            stmt.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Erro ao atualizar endereço ID: " + endereco.getId() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

    //deletar
    public void deletar(int id) {
        String sql = "DELETE FROM endereco WHERE id = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Erro ao deletar endereço ID: " + id + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
