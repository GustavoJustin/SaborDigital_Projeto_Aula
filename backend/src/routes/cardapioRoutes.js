const express = require('express');
const router = express.Router();
const CardapioController = require('../controllers/CardapioController');

/**
 * @openapi
 * /cardapios:
 *   get:
 *     tags: [Cardápios]
 *     summary: Lista todos os cardápios
 *     responses:
 *       200:
 *         description: Lista de cardápios retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cardapio'
 */
router.get('/', CardapioController.listar);

/**
 * @openapi
 * /cardapios/{id}:
 *   get:
 *     tags: [Cardápios]
 *     summary: Busca um cardápio por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cardápio encontrado
 */
router.get('/:id', CardapioController.buscarPorId);

/**
 * @openapi
 * /cardapios:
 *   post:
 *     tags: [Cardápios]
 *     summary: Cria um novo cardápio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cardapio'
 *     responses:
 *       201:
 *         description: Cardápio criado com sucesso
 */
router.post('/', CardapioController.cadastrar);

/**
 * @openapi
 * /cardapios/{id}:
 *   delete:
 *     tags: [Cardápios]
 *     summary: Remove um cardápio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cardápio removido com sucesso
 */
router.delete('/:id', CardapioController.deletar);

module.exports = router;
