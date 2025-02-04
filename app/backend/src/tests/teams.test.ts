import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { teamsList } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa Teams', function () {

    beforeEach(function () {
        sinon.restore();
    });
    it('Testa se retorna todos os times', async function () {
        sinon.stub(SequelizeTeam, 'findAll').resolves(teamsList as any);
        const res = await chai.request(app).get('/teams');
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(teamsList);
    });

    it('Testa se retorna um time pelo id', async function () {
        sinon.stub(SequelizeTeam, 'findByPk').resolves(teamsList[0] as any);
        const res = await chai.request(app).get('/teams/1');
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(teamsList[0]);
    })
    it('Testa se não retorna um time pelo id', async function () {
        sinon.stub(SequelizeTeam, 'findByPk').resolves(null as any);
        const res = await chai.request(app).get('/teams/1');
        expect(res.status).to.equal(404);
        expect(res.body).to.deep.equal({ message: 'Team not found' });
    })
});
