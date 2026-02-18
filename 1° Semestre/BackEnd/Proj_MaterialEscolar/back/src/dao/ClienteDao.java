package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import banco.ConnectionFactory;
import entity.Cliente;

public class ClienteDao {
    //buscar todos
    public List<Cliente> buscarTodos() {
        List<Cliente> clientes = new ArrayList<>();
        String sql = "SELECT cpf, nome, telefone, email FROM cliente";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Cliente cliente = new Cliente(
                        rs.getString("cpf"),
                        rs.getString("nome"),
                        rs.getString("telefone"),
                        rs.getString("email")
                );
                clientes.add(cliente);
            }

        } catch (SQLException e) {
            System.err.println("Erro ao buscar clientes: " + e.getMessage());
            e.printStackTrace();
        }

        return clientes;
    }

//pelo cpf
    public Cliente buscarPorCpf(String cpf) {
        Cliente cliente = null;
        String sql = "SELECT cpf, nome, telefone, email FROM cliente WHERE cpf = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, cpf);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    cliente = new Cliente(
                            rs.getString("cpf"),
                            rs.getString("nome"),
                            rs.getString("telefone"),
                            rs.getString("email")
                    );
                }
            }

        } catch (SQLException e) {
            System.err.println("Erro ao buscar cliente por CPF: " + cpf + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }

        return cliente;
    }

//inserir
    public void inserir(Cliente cliente) {
        String sql = "INSERT INTO cliente (cpf, nome, telefone, email) VALUES (?, ?, ?, ?)";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, cliente.getCpf());
            stmt.setString(2, cliente.getNome());
            stmt.setString(3, cliente.getTelefone());
            stmt.setString(4, cliente.getEmail());

            stmt.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Erro ao inserir cliente: " + cliente.getCpf() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

    //editar
    public void atualizar(Cliente cliente) {
        String sql = "UPDATE cliente SET nome = ?, telefone = ?, email = ? WHERE cpf = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, cliente.getNome());
            stmt.setString(2, cliente.getTelefone());
            stmt.setString(3, cliente.getEmail());
            stmt.setString(4, cliente.getCpf());

            stmt.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Erro ao atualizar cliente CPF: " + cliente.getCpf() + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }

//apagar
    public void deletar(String cpf) {
        String sql = "DELETE FROM cliente WHERE cpf = ?";

        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, cpf);
            stmt.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Erro ao deletar cliente CPF: " + cpf + ". Detalhes: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
