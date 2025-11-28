package api;

import entity.Cliente;
import entity.Endereco;
import entity.Produto;
import entity.Compra;

//IMPORTS IGUAL DO PROFESSOR
import static spark.Spark.*;
import com.google.gson.Gson;

import dao.*;


public class api {

    private static final Gson gson = new Gson();

    private static final ClienteDao clienteDao = new ClienteDao();
    private static final EnderecoDao enderecoDao = new EnderecoDao();
    private static final ProdutoDao produtoDao = new ProdutoDao();
    private static final CompraDao compraDao = new CompraDao();

    public static void main(String[] args) {

        port(4567);

        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        });

        after((req, res) -> res.type("application/json"));


        //CLIENTE - APIS
        get("/clientes", (req, res) ->
            gson.toJson(clienteDao.buscarTodos())
        );

        get("/clientes/:cpf", (req, res) -> {
            Cliente c = clienteDao.buscarPorCpf(req.params("cpf"));
            if (c == null) {
                res.status(404);
                return "{\"erro\":\"Cliente não encontrado\"}";
            }
            return gson.toJson(c);
        });

        post("/clientes", (req, res) -> {
            Cliente c = gson.fromJson(req.body(), Cliente.class);
            clienteDao.inserir(c);
            res.status(201);
            return gson.toJson(c);
        });

        put("/clientes/:cpf", (req, res) -> {
            Cliente c = gson.fromJson(req.body(), Cliente.class);
            c.setCpf(req.params("cpf"));
            clienteDao.atualizar(c);
            return gson.toJson(c);
        });

        delete("/clientes/:cpf", (req, res) -> {
            clienteDao.deletar(req.params("cpf"));
            res.status(204);
            return "";
        });


        //ENDEREÇOS - API
        get("/enderecos", (req, res) ->
            gson.toJson(enderecoDao.buscarTodos())
        );

        get("/enderecos/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            Endereco e = enderecoDao.buscarPorId(id);
            if (e == null) {
                res.status(404);
                return "{\"erro\":\"Endereço não encontrado\"}";
            }
            return gson.toJson(e);
        });

        post("/enderecos", (req, res) -> {
            Endereco e = gson.fromJson(req.body(), Endereco.class);
            enderecoDao.inserir(e);
            res.status(201);
            return gson.toJson(e);
        });

        put("/enderecos/:id", (req, res) -> {
            Endereco e = gson.fromJson(req.body(), Endereco.class);
            e.setId(Integer.parseInt(req.params("id")));
            enderecoDao.atualizar(e);
            return gson.toJson(e);
        });

        delete("/enderecos/:id", (req, res) -> {
            enderecoDao.deletar(Integer.parseInt(req.params("id")));
            res.status(204);
            return "";
        });

        get("/produtos", (req, res) -> {
            res.type("application/json");
            return new Gson().toJson(produtoDao.listarTodos());
        });

        get("/produtos/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            Produto p = produtoDao.buscarPorId(id);
            if (p == null) {
                res.status(404);
                return "{\"erro\":\"Produto não encontrado\"}";
            }
            return gson.toJson(p);
        });

        post("/produtos", (req, res) -> {
            Produto p = gson.fromJson(req.body(), Produto.class);
            produtoDao.inserir(p);
            res.status(201);
            return gson.toJson(p);
        });

        put("/produtos/:id", (req, res) -> {
            Produto p = gson.fromJson(req.body(), Produto.class);
            p.setId(Integer.parseInt(req.params("id")));
            produtoDao.atualizar(p);
            return gson.toJson(p);
        });

        delete("/produtos/:id", (req, res) -> {
            produtoDao.deletar(Integer.parseInt(req.params("id")));
            res.status(204);
            return "";
        });


        //COMPRAS APIS
        get("/compras", (req, res) ->
            gson.toJson(compraDao.listarTodas())
        );

        get("/compras/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            Compra c = compraDao.buscarPorId(id);
            if (c == null) {
                res.status(404);
                return "{\"erro\":\"Compra não encontrada\"}";
            }
            return gson.toJson(c);
        });

        post("/compras", (req, res) -> {
            Compra c = gson.fromJson(req.body(), Compra.class);
            compraDao.inserir(c);
            res.status(201);
            return gson.toJson(c);
        });

        delete("/compras/:id", (req, res) -> {
            compraDao.deletar(Integer.parseInt(req.params("id")));
            res.status(204);
            return "";
        });

        System.out.println("API rodando na porta 4567!");
    }
}
