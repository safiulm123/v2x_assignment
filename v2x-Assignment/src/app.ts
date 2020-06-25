import express from 'express';
import AWS from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import bodyParser from 'body-parser';
const endpoint = require('./config/keys').endpoint;
const region = require('./config/keys').region;

// Config Setting
const app = express();
const port = 5000;

let serviceConfigOptions: ServiceConfigurationOptions = {
	region: region,
	endpoint: endpoint
};
const docClient = new AWS.DynamoDB.DocumentClient(serviceConfigOptions);

// Setting up CORS and body-parser
app.use(bodyParser.json());

// All the Routes will be written over here but later it will be moved to
// routes folder
app.get('/', (req, res) => {
	res.send('<h1>V2X NETWORK APIS</h1>');
});

// Question 8 - Unfiltered data is coming  without any data types
app.get('/unfiltered_data', (req, res) => {
	var params = {
		TableName: 'Data'
	};

	docClient.scan(params, function(err, data) {
		if (err) {
			res.status(400).send(err);
			//	console.error('Unable to add movie', data, '. Error JSON:', JSON.stringify(err, null, 2));
		} else {
			res.send(data);
		}
	});
});

// Question 1 - Scan function will be used to provide the list of offers with visible equals to true
app.get('/filtered_visible', (req, res) => {
	var params = {
		TableName: 'Data',
		FilterExpression: 'visible = :abc',
		ExpressionAttributeValues: {
			':abc': true
		}
	};

	docClient.scan(params, function(err, data) {
		if (err) {
			res.status(400).send(err);
		} else {
			res.send(data);
		}
	});
});

// Question 2 - total number of Offers and it should contain id, teaser, detailURL, labels and Price
app.get('/filtered_specific_data', (req, res) => {
	var params = {
		ProjectionExpression: 'id, teaser, detailUrl,labels,pricing.price',
		TableName: 'Data'
	};

	docClient.scan(params, function(err, data: any) {
		if (err) {
			res.status(400).send(err);
		} else {
			let UpdatedData = {
				TotalOffers: data.Items.length,
				Items: data.Items
			};
			res.send(UpdatedData);
		}
	});
});

// Question 3 - Scan function will be used again and the limit will be provided by the restapi
app.get('/limit_filter', (req, res) => {
	console.log(req.body);
	var params = {
		TableName: 'Data',
		Limit: req.body.limit
	};

	// Dont forget to change the movie
	docClient.scan(params, function(err, data) {
		if (err) {
			res.status(400).send(err);
		} else {
			res.send(data);
		}
	});
});

// Question 6 - Query function will be used to provide the list of offers with visible equals to true
app.get('/detailedInfo_visible_ByID', (req, res) => {
	var params = {
		TableName: 'Data',
		KeyConditionExpression: 'id = :a',
		FilterExpression: 'visible = :b',
		ExpressionAttributeValues: {
			':a': req.body.id,
			':b': true
		}
	};

	docClient.query(params, function(err, data: any) {
		if (err) {
			res.status(400).send(err);
		} else {
			if (data.Count === 0) {
				res.status(400).send(`"visible" is false for the ID ${req.body.id} selected `);
			} else {
				res.send(data.Items[0]);
			}
		}
	});
});

//Question 7 - Remove teaser and DetailURL
app.get('/detailedInfo_without_teaser_ByID', (req, res) => {
	if (req.body.id === '') {
		res.status(400).send('Please provide id information in the body');
	} else {
		var params = {
			TableName: 'Data',
			KeyConditionExpression: 'id = :a',
			ExpressionAttributeValues: {
				':a': req.body.id
			}
		};

		docClient.query(params, async function(err, data: any) {
			if (err) {
				res.status(400).send(err);
			} else {
				let data1 = data.Items[0];
				delete data1.teaser;
				delete data1.detailUrl;
				res.send(data1);
			}
		});
	}
});

function GetSortOrderbyPrice(prop: any, prop2: any) {
	return function(a: any, b: any) {
		// console.log(prop);
		let c = a[prop][prop2];
		if (a[prop][prop2] > b[prop][prop2]) {
			return 1;
		} else if (a[prop][prop2] < b[prop][prop2]) {
			return -1;
		}
		return 0;
	};
}

// Question 5 - I created a new function that works liike a helper to sort the JSON array
app.get('/sorted_by_price', (req, res) => {
	var params = {
		//ProjectionExpression: 'id, pricing',
		TableName: 'Data'
	};

	docClient.scan(params, function(err, data: any) {
		if (err) {
			res.status(400).send(err);
		} else {
			let SortedData: [] = data.Items.sort(GetSortOrderbyPrice('pricing', 'price'));
			res.send(SortedData);
		}
	});
});

// Question 2 --- Filtered by portfolio, make and price as given in the requirement
app.get('/filtered_requested_data', (req, res) => {
	let tmpPortfolio;
	if (req.body.portfolio === '' || req.body === null) {
		tmpPortfolio = '0001';
	} else {
		tmpPortfolio = req.body.portfolio;
	}
	var params = {
		TableName: 'Data',
		FilterExpression: 'portfolio = :portfolio and pricing.price between :from and :to',
		ExpressionAttributeValues: {
			':portfolio': tmpPortfolio,
			':from': req.body.pricing.from,
			':to': req.body.pricing.to
		}
	};

	docClient.scan(params, function(err, data: any) {
		if (err) {
			console.error('Unable to add movie', data, '. Error JSON:', JSON.stringify(err, null, 2));
		} else {
			let tmpArray: any = [];
			data.Items.forEach((dataValue: any) => {
				req.body.make.forEach((makeValue: any) => {
					if (makeValue === dataValue.car.make) {
						tmpArray.push(dataValue);
					}
				});
			});
			res.send(tmpArray);
		}
	});
});

app.listen(port, (err) => {
	if (err) {
		return console.error(err);
	}
	return console.log(`Server is listening on Port ${port}`);
});

export default app;
