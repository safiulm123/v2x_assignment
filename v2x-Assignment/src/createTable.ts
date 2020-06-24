import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
const region = require('./config/keys').region;
const endpoint = require('./config/keys').endpoint;
let serviceConfOptions: ServiceConfigurationOptions = {
	region: region,
	endpoint: endpoint
};

let dynamodb = new AWS.DynamoDB(serviceConfOptions);

let params = {
	TableName: 'Data',
	KeySchema: [ { AttributeName: 'id', KeyType: 'HASH' } ],
	AttributeDefinitions: [ { AttributeName: 'id', AttributeType: 'S' } ],
	ProvisionedThroughput: {
		ReadCapacityUnits: 10,
		WriteCapacityUnits: 10
	}
};

dynamodb.createTable(params, function(err, data) {
	if (err) {
		console.error('Unable to create Table. Error JSON:', JSON.stringify(err, null, 2));
	} else {
		console.log('Created table. Table description JSON: ', JSON.stringify(data, null, 2));
	}
});
