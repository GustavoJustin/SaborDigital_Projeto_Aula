const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');
const upload = require('../config/multer');

/**
 * @openapi
 * /produtos:
 *   get:
 *     tags: [Produtos]
 *     summary: Lista todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get('/', ProdutoController.listar);

/**
 * @openapi
 * /produtos/{id}:
 *   get:
 *     tags: [Produtos]
 *     summary: Busca um produto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 */
router.get('/:id', ProdutoController.buscarPorId);

/**
 * @openapi
 * /produtos:
 *   post:
 *     tags: [Produtos]
 *     summary: Cria um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [nome, descricao, preco]
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *                 format: float
 *               categoria:
 *                 type: string
 *               disponivel:
 *                 type: boolean
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post('/', upload.single('imagem'), ProdutoController.cadastrar);

/**
 * @openapi
 * /produtos/{id}:
 *   put:
 *     tags: [Produtos]
 *     summary: Atualiza um produto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 */
router.put('/:id', ProdutoController.atualizar);

/**
 * @openapi
 * /produtos/{id}:
 *   delete:
 *     tags: [Produtos]
 *     summary: Remove um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 */
router.delete('/:id', ProdutoController.deletar);

module.exports = router;