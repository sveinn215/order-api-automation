const { expect } = require('chai');
const chai = require('chai');
chai.use(require('chai-json-schema'));

const categoryId = 'cbbdcab7-9c43-4e7f-9ac0-3fb962637ebc';

// Response code and message
const successOkCode = 200;
const successCreatedCode = 201;
const errorServerCode = 500;
const errorBadRequestCode = 400;
const errorUnauthorizedCode = 401;
const errorForbiddenCode = 403;
const successOkMessage = 'OK';
const successCreatedMessage = 'Created';
const successAcceptedMessage = 'Accepted';
const errorBadRequestMessage = 'Bad Request';
const errorUnauthorizedMessage = 'Unauthorized';
const errorForbiddenMessage = 'Forbidden';
const errorNotFoundMessage = 'Not Found';
const errorInternalServerMessage = 'Internal Server Error';
const baseUrl = 'https://mocki.io/v1/7184fb56-cbaa-4769-82f5-f831e8f011ca';

// header for API
const header = (token) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    } 
};

const defaultAssertion = (response,schema,code) => {
    expect(response.status).to.equal(code);
    switch(code){
        case 200:
            break;
        case 201:
            expect(response.body.message).to.equal(successCreatedMessage);
            break;
        case 202:
            expect(response.body.message).to.equal(successAcceptedMessage);
            break;
        case 400:
            expect(response.body.message).to.equal(errorBadRequestMessage);
            break;
        case 401:
            expect(response.body.message).to.equal(errorUnauthorizedMessage);
            break;
        case 403:
            expect(response.body.message).to.equal(errorForbiddenMessage);
            break;
        case 404:
            expect(response.body.message).to.equal(errorNotFoundMessage);
            break;
        case 500:
            expect(response.body.message).to.equal(errorInternalServerMessage);
            break;
        default:
            break;
    }
    if(schema !== null){
        expect(response.body).to.be.jsonSchema(schema);
    }
}


module.exports={
    successOkCode,
    successCreatedCode,
    errorBadRequestCode,
    errorForbiddenCode,
    errorServerCode,
    errorUnauthorizedCode,
    baseUrl,
    header,
    defaultAssertion
}
