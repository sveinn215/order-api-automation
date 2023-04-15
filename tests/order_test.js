const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));
const common = require('../helper/common');
const endpoint = require('../helper/method');
const param = require('../parameter/order_parameter');
const schema = require('../schema/order_schema.json');

let http = {};

const testCase = {
    positive: 'As a system i can create order',
    negative: {
        requiredField: 'As a system i can verify {field} is required',
        invalidType: 'As a system i can verify {field} is invalid type',
        noAuth: 'As a system i can verify if the API request not using authentication',
        noAccess: 'As a system i can verify if the API request using unauthorized accesss',
        expiredAuth: 'As a system i can verify if the API request using expired authentication',
        invalidDateFormat: 'As a system i can verify if the API request using invalid date format',
        invalidOrderStatus: 'As a system i can verify if the API request using invalid order status'
    }
}

const invalidReq = ['String orderId', {}, [], false, 12345 ];

describe(`@order ${testCase.describe}`, () => {
    
    before(async () => {
        http.headers = common.header('AuthToken');
        http.url = common.baseUrl;
        http.path = '/processOrder';
        http.body = null;
    })

    it(`${testCase.positive}`, async () => {
        http.body = param.orderParameter;
        const response = await endpoint.create(http);
        
        common.defaultAssertion(response,schema,common.successOk);
        expect(response.body.code).to.equal(common.successCreatedCode);
        expect(response.body.result.last_updated_timestamp).to.greaterThan(param.orderParameter.last_updated_timestamp);
        expect(response.body.result.order_status).to.equal('Created'); 
    });

    param.orderParameter.forEach( param => {
        it(`${testCase.negative.requiredField.replace('{field}',param)}`, async () => {
            http.body = param.orderParameter;
            http.body[param] = null;
            const response = await endpoint.create(http);
            
            common.defaultAssertion(response,schema,common.errorServerCode);
        });
    });

    let invalidReqCount = 0;
    param.orderParameter.forEach(param => {
        it(`${testCase.negative.invalidType.replace('{field}',param)}`, async () => {
            http.body = param.orderParameter;
            http.body[param] = invalidReq[invalidReqCount];
            const response = await endpoint.create(http);
            
            common.defaultAssertion(response,schema,common.errorBadRequestCode);
        });
        invalidReqCount++;
    });

    it(`${testCase.negative.noAuth}`, async () => {
        http.body = param.orderParameter;
        http.headers = common.header(null);
        const response = await endpoint.create(http);
        
        common.defaultAssertion(response,schema,common.successOk);
        expect(response.body.code).to.equal(common.errorUnauthorizedCode);
    });

    it(`${testCase.negative.noAccess}`, async () => {
        http.body = param.orderParameter;
        http.headers = common.header(null);
        const response = await endpoint.create(http);
        
        common.defaultAssertion(response,schema,common.successOk);
        expect(response.body.code).to.equal(common.errorForbiddenCode);
    });

    it(`${testCase.negative.expiredAuth}`, async () => {
        http.body = param.orderParameter;
        http.headers = common.header(null);
        const response = await endpoint.create(http);
        
        common.defaultAssertion(response,schema,common.successOk);
        expect(response.body.code).to.equal(common.errorUnauthorizedCode);
    });

    it(`${testCase.negative.invalidDateFormat}`, async () => {
        http.body = param.orderParameter;
        http.body.last_updated_timestamp = '2023-02-19';
        const response = await endpoint.create(http);
        
        common.defaultAssertion(response,schema,common.errorBadRequestCode);
    });

    it(`${testCase.negative.invalidOrderStatus}`, async () => {
        http.body = param.orderParameter;
        http.body.order_status = 'invalid';
        const response = await endpoint.create(http);
        
        common.defaultAssertion(response,schema,common.errorBadRequestCode);
    });
});
