const Promise = require('bluebird');

const pgp = require('pg-promise')({
    promiseLib: Promise
});

const db = pgp({
    database: 'vinyl'
});



function expiredAuction(){

    console.log('querying');
     db.any(`select distinct on (product.id)
	bid.price as high_bid,
	customer_id,
	product.id
from
	product inner join bid
		on (product.id = bid.product_id)
where bid.bid_time < now() - interval '3 minutes'
order by
	product.id, bid.price desc;
`)

     .then( (auctions) => {
         console.log('done querying', auctions);
         if (auctions.length > 0){
             return auctions;
         }
     })
    //  .catch(error => {
    //      console.log(error, 'error');
    //  });

     .then((auctions) => {

         let auction = auctions[0];

         let promises = auctions.map(auction => {
             let productId = auction.id;
             let customerId =auction.customer_id;
             return db.any(`insert into product_in_shopping_cart values (default, $1, $2) returning *`, [productId, customerId])
         })
         return [auctions, Promise.all(promises)];

     })
     .spread(auctions => {
         if(auctions === true){

             return "Auction Closed";
         }
     })

      .catch(error => {
          console.log(error, 'error');
      });
 }

expiredAuction()
