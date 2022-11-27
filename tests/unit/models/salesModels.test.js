const { expect } = require('chai'); // Enables assertions
const sinon = require('sinon'); // Simulates functions

const { regProductMock, getSalesMock, getSaleByIdMock } = require('../mock/salesMock');
const connection = require('../../../src/models/db/connection');
const salesModel = require('../../../src/models/sales.model');

describe('Tests da camada Model dos sales', () => {
  it('Verifica se registra uma venda', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 999 }]);
    const result = await salesModel.registerSaleId();
    expect(result).to.deep.equal(999);
  });

  it('Verifica se registra um produto de uma venda', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 999 }]);
    const [{ productId, quantity }] = regProductMock;
    const result = await salesModel.registerSaleProducts(999, { productId, quantity });
    expect(result).to.deep.equal({ saleId: 999, productId, quantity });
  });

  it('Verifica se todas as vendas são listadas', async () => {
    sinon.stub(connection, 'execute').resolves([getSalesMock]);
    const result = await salesModel.getSales();
    expect(result).to.deep.equal(getSalesMock);
  });

  it('Verifica se uma venda buscada por id é listada', async () => {
    sinon.stub(connection, 'execute').resolves([getSaleByIdMock]);
    const [result] = await salesModel.getSaleById(999);
    expect(result).to.deep.equal(getSaleByIdMock[0]);
  });

  it('Verifica se deleta uma venda', async () => {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.deleteSale(2);
    expect(result).to.deep.equal();
  });

  afterEach(sinon.restore);
});
