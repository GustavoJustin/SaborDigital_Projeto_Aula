const ProdutoService = require('../services/produtoService');

class ProdutoController {
    async listar(req, res) {
        try {
            const resultado = await ProdutoService.listarProdutos();
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const resultado = await ProdutoService.buscarProdutoPorId(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async cadastrar(req, res) {
        try {
            console.log(req.body);
            console.log(req.file); // Para você ver a imagem chegando no terminal

            const dadosProduto = {
                ...req.body,
                imagem: req.file ? req.file.filename : null // Salva o nome do arquivo se ele existir
            };

            const resultado = await ProdutoService.cadastrarProduto(dadosProduto);
            res.status(201).json(resultado);
        } catch (erro) {
            console.error("Erro ao cadastrar produto:", erro);
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || erro.message || "Erro ao cadastrar produto",
                erro: erro.stack
            });
        }
    }



    async atualizar(req, res) {
        try {
            const resultado = await ProdutoService.atualizarProduto(req.params.id, req.body);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async deletar(req, res) {
        try {
            const resultado = await ProdutoService.deletarProduto(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }
}

module.exports = new ProdutoController();