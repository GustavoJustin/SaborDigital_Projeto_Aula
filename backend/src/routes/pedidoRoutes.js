const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

/**
 * @openapi
 * /pedidos:
 *   post:
 *     tags: [Pedidos]
 *     summary: Cria um novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
router.post('/', PedidoController.create);

/**
 * @openapi
 * /pedidos:
 *   get:
 *     tags: [Pedidos]
 *     summary: Lista todos os pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */
router.get('/', PedidoController.getAll);

/**
 * @openapi
 * /pedidos/{id}:
 *   get:
 *     tags: [Pedidos]
 *     summary: Busca um pedido por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 */
router.get('/:id', PedidoController.getById);

/**
 * @openapi
 * /pedidos/{id}/status:
 *   patch:
 *     tags: [Pedidos]
 *     summary: Atualiza o status de um pedido
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
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pendente, preparo, pronto, entregue]
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */
router.patch('/:id/status', PedidoController.updateStatus);

/**
 * @openapi
 * /pedidos/{id}:
 *   delete:
 *     tags: [Pedidos]
 *     summary: Exclui um pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido excluído com sucesso
 */
router.delete('/:id', PedidoController.delete);

module.exports = router;
