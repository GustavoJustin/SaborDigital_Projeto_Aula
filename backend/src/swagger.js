const fs = require('fs');
const path = require('path');

const doc = {
    openapi: '3.0.0',
    info: {
        title: 'Sabor Digital API',
        description: 'API do sistema Sabor Digital para gestão de produtos, cardápios e pedidos.',
        version: '1.0.0'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local de desenvolvimento'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Token JWT para autenticação'
            }
        },
        schemas: {
            Produto: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Espaguete à Bolonhesa' },
                    descricao: { type: 'string', example: 'Massa com molho de tomate e carne moída' },
                    preco: { type: 'number', format: 'float', example: 35.5 },
                    categoria: { type: 'string', nullable: true, example: 'Massa' },
                    disponivel: { type: 'boolean', example: true },
                    imagem: { type: 'string', nullable: true, example: 'espaguete.jpg' },
                    criado_em: { type: 'string', format: 'date-time', example: '2026-01-01T12:00:00.000Z' },
                    atualizado_em: { type: 'string', format: 'date-time', example: '2026-01-01T13:00:00.000Z' }
                }
            },
            Cardapio: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Cardápio do Almoço' },
                    descricao: { type: 'string', nullable: true, example: 'Pratos principais e acompanhamento' },
                    disponivel: { type: 'boolean', example: true },
                    criado_em: { type: 'string', format: 'date-time', example: '2026-01-01T12:00:00.000Z' },
                    atualizado_em: { type: 'string', format: 'date-time', example: '2026-01-01T13:00:00.000Z' }
                }
            },
            ItemPedido: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 10 },
                    pedido_id: { type: 'integer', example: 5 },
                    produto_id: { type: 'integer', example: 2 },
                    quantidade: { type: 'integer', example: 2 },
                    preco_unitario: { type: 'number', format: 'float', example: 25.5 }
                }
            },
            Pedido: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    cliente: { type: 'string', nullable: true, example: 'João da Silva' },
                    status: { type: 'string', enum: ['pendente', 'preparo', 'pronto', 'entregue'], example: 'pendente' },
                    total: { type: 'number', format: 'float', example: 81.0 },
                    criado_em: { type: 'string', format: 'date-time', example: '2026-01-01T12:00:00.000Z' },
                    atualizado_em: { type: 'string', format: 'date-time', example: '2026-01-01T12:45:00.000Z' },
                    itens: { type: 'array', items: { $ref: '#/components/schemas/ItemPedido' } }
                }
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    erro: { type: 'string', example: 'Mensagem de erro' },
                    mensagem: { type: 'string', example: 'Erro ao processar a requisição' }
                }
            }
        }
    },
    paths: {
        '/': {
            get: {
                summary: 'Status da API',
                responses: {
                    200: {
                        description: 'API funcionando corretamente'
                    }
                }
            }
        },
        '/produtos': {
            get: {
                summary: 'Listar produtos',
                responses: {
                    200: {
                        description: 'Lista de produtos retornada com sucesso'
                    }
                }
            },
            post: {
                summary: 'Cadastrar produto',
                requestBody: {
                    required: true,
                    content: {
                        'multipart/form-data': {
                            schema: {
                                type: 'object',
                                required: ['nome', 'descricao', 'preco'],
                                properties: {
                                    nome: { type: 'string' },
                                    descricao: { type: 'string' },
                                    preco: { type: 'number' },
                                    categoria: { type: 'string' },
                                    disponivel: { type: 'boolean' },
                                    imagem: { type: 'string', format: 'binary' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Produto criado com sucesso' }
                }
            }
        },
        '/produtos/{id}': {
            get: {
                summary: 'Buscar produto por ID',
                parameters: [{ $ref: '#/components/parameters/IdParam' }],
                responses: {
                    200: { description: 'Produto encontrado' }
                }
            },
            put: {
                summary: 'Atualizar produto',
                parameters: [{ $ref: '#/components/parameters/IdParam' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Produto' }
                        }
                    }
                },
                responses: {
                    200: { description: 'Produto atualizado com sucesso' }
                }
            },
            delete: {
                summary: 'Excluir produto',
                parameters: [{ $ref: '#/components/parameters/IdParam' }],
                responses: {
                    200: { description: 'Produto removido com sucesso' }
                }
            }
        },
        '/cardapios': {
            get: {
                summary: 'Listar cardápios',
                responses: {
                    200: { description: 'Lista de cardápios retornada com sucesso' }
                }
            },
            post: {
                summary: 'Cadastrar cardápio',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Cardapio' }
                        }
                    }
                },
                responses: {
                    201: { description: 'Cardápio criado com sucesso' }
                }
            }
        },
        '/pedidos': {
            get: {
                summary: 'Listar pedidos',
                responses: {
                    200: { description: 'Lista de pedidos retornada com sucesso' }
                }
            },
            post: {
                summary: 'Criar pedido',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Pedido' }
                        }
                    }
                },
                responses: {
                    201: { description: 'Pedido criado com sucesso' }
                }
            }
        },
        '/pedidos/{id}': {
            get: {
                summary: 'Buscar pedido por ID',
                parameters: [{ $ref: '#/components/parameters/IdParam' }],
                responses: {
                    200: { description: 'Pedido encontrado' }
                }
            },
            delete: {
                summary: 'Excluir pedido',
                parameters: [{ $ref: '#/components/parameters/IdParam' }],
                responses: {
                    200: { description: 'Pedido excluído com sucesso' }
                }
            }
        },
        '/pedidos/{id}/status': {
            patch: {
                summary: 'Atualizar status do pedido',
                parameters: [{ $ref: '#/components/parameters/IdParam' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['status'],
                                properties: {
                                    status: {
                                        type: 'string',
                                        enum: ['pendente', 'preparo', 'pronto', 'entregue']
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: { description: 'Status atualizado com sucesso' }
                }
            }
        }
    },
    components: {
        parameters: {
            IdParam: {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'integer' }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Token JWT para autenticação'
            }
        },
        schemas: {
            Produto: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Espaguete à Bolonhesa' },
                    descricao: { type: 'string', example: 'Massa com molho de tomate e carne moída' },
                    preco: { type: 'number', format: 'float', example: 35.5 },
                    categoria: { type: 'string', nullable: true, example: 'Massa' },
                    disponivel: { type: 'boolean', example: true },
                    imagem: { type: 'string', nullable: true, example: 'espaguete.jpg' }
                }
            },
            Cardapio: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Cardápio do Almoço' },
                    descricao: { type: 'string', nullable: true, example: 'Pratos principais e acompanhamento' },
                    disponivel: { type: 'boolean', example: true }
                }
            },
            ItemPedido: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 10 },
                    pedido_id: { type: 'integer', example: 5 },
                    produto_id: { type: 'integer', example: 2 },
                    quantidade: { type: 'integer', example: 2 },
                    preco_unitario: { type: 'number', format: 'float', example: 25.5 }
                }
            },
            Pedido: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    cliente: { type: 'string', nullable: true, example: 'João da Silva' },
                    status: { type: 'string', enum: ['pendente', 'preparo', 'pronto', 'entregue'], example: 'pendente' },
                    total: { type: 'number', format: 'float', example: 81.0 },
                    itens: { type: 'array', items: { $ref: '#/components/schemas/ItemPedido' } }
                }
            }
        }
    }
};

const outputDir = __dirname;
const payload = JSON.stringify(doc, null, 2);

fs.writeFileSync(path.join(outputDir, 'openapi.json'), payload);
fs.writeFileSync(path.join(outputDir, 'swagger_output.json'), payload);

console.log('Contrato OpenAPI válido gerado com sucesso!');