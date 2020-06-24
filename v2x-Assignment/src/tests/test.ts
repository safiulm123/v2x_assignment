import { expect } from 'chai';
import request from 'supertest';

import app from '../app';

describe('Get Detailed Info without teaser and detailURL using ID', () => {
	it('OK, detailedInfo_without_teaser_ByID API initial Test ', (done) => {
		request(app)
			.get('/detailedInfo_without_teaser_ByID')
			.send({
				id: '195'
			})
			.then((res) => {
				const body = res.body.id;
				expect(res.status).to.equal(200);
				expect(body).to.equal('195');
				done();
			});
	});

	it('OK, detailedInfo_without_teaser_ByID API with another ID', (done) => {
		request(app)
			.get('/detailedInfo_without_teaser_ByID')
			.send({
				id: '180'
			})
			.then((res) => {
				const body = res.body.id;
				expect(res.status).to.equal(200);
				expect(body).to.equal('180');
				done();
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

describe('Get List of Offers with a limit e.g. return 10 offers', () => {
	it('OK, API test to check if the limit provided by user will be exact output of the list of Offers', (done) => {
		request(app)
			.get('/limit_filter')
			.send({
				limit: '5'
			})
			.then((res) => {
				const body = res.body.Items;
				expect(res.status).to.equal(200);
				expect(body.length).to.equal(5);
				done();
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

describe('Get List of Offers with visible equals to 2', () => {
	it('OK, API test is to check if only the visible items are shown. Total visible value is 57 from total data of 82', (
		done
	) => {
		request(app).get('/filtered_visible').send().then((res) => {
			const body = res.body.Items;
			expect(res.status).to.equal(200);
			expect(body.length).to.equal(57);
			done();
		});
	});
});

describe('Get List of Offers contains the number of returned offers and id,teaser, detailURL and Labels', () => {
	it('OK, API test to check if the response comes with the required data', (done) => {
		request(app).get('/filtered_specific_data').send().then((res) => {
			const body = res.body;
			expect(res.status).to.equal(200);
			expect(body.TotalOffers).to.equal(82);
			expect(body.Items[0]).to.have.property('id');
			expect(body.Items[0]).to.have.property('teaser');
			expect(body.Items[0]).to.have.property('detailUrl');
			expect(body.Items[0]).to.have.property('labels');
			expect(body.Items[0]).to.have.property('pricing');
			done();
		});
	});
});

describe('Get List of Offers sorted in ascending order by price ', () => {
	it('OK, API test to check if the first two values are in ascending order', (done) => {
		request(app).get('/sorted_by_price').send().then((res) => {
			const body = res.body;
			let confirm: boolean = false;
			expect(res.status).to.equal(200);
			if (body[1].pricing.price >= body[0].pricing.price) {
				confirm = true;
				expect(confirm).to.be.equal(true);
				done();
			}
		});
	});

	it('OK, API test to check if the last two values are in ascending order', (done) => {
		request(app).get('/sorted_by_price').send().then((res) => {
			const body = res.body;
			let confirm: boolean = false;
			expect(res.status).to.equal(200);
			if (body[81].pricing.price >= body[80].pricing.price) {
				confirm = true;
				expect(confirm).to.be.equal(true);
				done();
			}
		});
	});

	it('OK, API test to check if the middle two values are in ascending order', (done) => {
		request(app).get('/sorted_by_price').send().then((res) => {
			const body = res.body;
			let confirm: boolean = false;
			expect(res.status).to.equal(200);
			if (body[41].pricing.price >= body[40].pricing.price) {
				confirm = true;
				expect(confirm).to.be.equal(true);
				done();
			}
		});
	});
});
