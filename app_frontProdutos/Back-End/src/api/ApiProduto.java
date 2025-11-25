package api;

import static spark.Spark.*;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Filter;
import dao.CategoriaDAO;
import dao.ProdutoDAO;
import model.Categoria;
import model.Produto;

import com.google.gson.Gson;

public class ApiProduto {

    private static final ProdutoDAO dao = new ProdutoDAO();
    private static final CategoriaDAO categoriaDAO = new CategoriaDAO();
    private static final Gson gson = new Gson();

    private static final String APPLICATION_JSON = "application/json";

    public static void main(String[] args) {

        port(4567);

        //        CORS
        options("/*", (request, response) -> {

            String reqHeaders = request.headers("Access-Control-Request-Headers");
            if (reqHeaders != null) {
                response.header("Access-Control-Allow-Headers", reqHeaders);
            }

            String reqMethod = request.headers("Access-Control-Request-Method");
            if (reqMethod != null) {
                response.header("Access-Control-Allow-Methods", reqMethod);
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "http://localhost:5173");
            response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            response.header("Access-Control-Allow-Headers", "*");
        });

        // =========================
        //  SEU AFTER ORIGINAL
        // =========================
        after((req, res) -> res.type(APPLICATION_JSON));


        // =========================
        //      ROTAS PRODUTO
        // =========================

        get("/produtos", (req, res) -> gson.toJson(dao.buscarTodos()));

        get("/produtos/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));
                Produto produto = dao.buscarPorId(id);

                if (produto != null) {
                    return gson.toJson(produto);
                } else {
                    res.status(404);
                    return "{\"mensagem\": \"Produto não encontrado\"}";
                }
            } catch (NumberFormatException e) {
                res.status(400);
                return "{\"mensagem\": \"ID inválido\"}";
            }
        });

        post("/produtos", (req, res) -> {
            try {
                Produto novoProduto = gson.fromJson(req.body(), Produto.class);
                dao.inserir(novoProduto);

                res.status(201);
                return gson.toJson(novoProduto);
            } catch (Exception e) {
                res.status(500);
                return "{\"mensagem\": \"Erro ao criar produto.\"}";
            }
        });

        put("/produtos/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));

                if (dao.buscarPorId(id) == null) {
                    res.status(404);
                    return "{\"mensagem\": \"Produto não encontrado\"}";
                }

                Produto p = gson.fromJson(req.body(), Produto.class);
                p.setId(id);

                dao.atualizar(p);

                return gson.toJson(p);

            } catch (NumberFormatException e) {
                res.status(400);
                return "{\"mensagem\": \"ID inválido\"}";
            }
        });

        delete("/produtos/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));

                if (dao.buscarPorId(id) == null) {
                    res.status(404);
                    return "{\"mensagem\": \"Produto não encontrado\"}";
                }

                dao.deletar(id);
                res.status(204);
                return "";

            } catch (NumberFormatException e) {
                res.status(400);
                return "{\"mensagem\": \"ID inválido\"}";
            }
        });


        // =========================
        //      ROTAS CATEGORIA
        // =========================

        get("/categorias", (req, res) -> gson.toJson(categoriaDAO.buscarTodos()));

        get("/categorias/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));
                Categoria categoria = categoriaDAO.buscarPorId(id);

                if (categoria != null) {
                    return gson.toJson(categoria);
                } else {
                    res.status(404);
                    return "{\"mensagem\": \"Categoria não encontrada\"}";
                }
            } catch (NumberFormatException e) {
                res.status(400);
                return "{\"mensagem\": \"ID inválido\"}";
            }
        });

        post("/categorias", (req, res) -> {
            try {
                Categoria nova = gson.fromJson(req.body(), Categoria.class);
                categoriaDAO.inserir(nova);

                res.status(201);
                return gson.toJson(nova);
            } catch (Exception e) {
                res.status(500);
                return "{\"mensagem\": \"Erro ao criar categoria\"}";
            }
        });

        put("/categorias/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));

                if (categoriaDAO.buscarPorId(id) == null) {
                    res.status(404);
                    return "{\"mensagem\": \"Categoria não encontrada\"}";
                }

                Categoria categoria = gson.fromJson(req.body(), Categoria.class);
                categoria.setId(id);

                categoriaDAO.atualizar(categoria);
                return gson.toJson(categoria);

            } catch (NumberFormatException e) {
                res.status(400);
                return "{\"mensagem\": \"ID inválido\"}";
            }
        });

        delete("/categorias/:id", (req, res) -> {
            try {
                Long id = Long.parseLong(req.params(":id"));

                if (categoriaDAO.buscarPorId(id) == null) {
                    res.status(404);
                    return "{\"mensagem\": \"Categoria não encontrada\"}";
                }

                categoriaDAO.deletar(id);
                res.status(204);
                return "";

            } catch (NumberFormatException e) {
                res.status(400);
                return "{\"mensagem\": \"ID inválido\"}";
            }
        });

        System.out.println("API rodando na porta 4567.");
    }
}
