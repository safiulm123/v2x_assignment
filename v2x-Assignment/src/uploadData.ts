import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import fs from 'fs';
const region = require('./config/keys').region;
const endpoint = require('./config/keys').endpoint;

let serviceConfigOptions: ServiceConfigurationOptions = {
	region: region,
	endpoint: endpoint
};

let docClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);

console.log('Importing V2X Data into DynamoDB. Please Wait');

// Reading the given Data file and then converting into JSON
let allData = JSON.parse(fs.readFileSync('./utils/v2x_dynamodb.export.json', 'utf8'));

allData.Items.forEach((item: {}) => {
	let params = {
		TableName: 'Data',
		Item: AWS.DynamoDB.Converter.unmarshall(item),
		ReturnValues: 'ALL_OLD'
	};

	docClient.put(params, (err, data) => {
		if (err) {
			console.error('Unable to add movie', data, '. Error JSON:', JSON.stringify(err, null, 2));
		} else {
			console.log('Items Successfully Loaded');
		}
	});
});
