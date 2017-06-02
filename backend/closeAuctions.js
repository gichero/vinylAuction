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
            where bid.bid_time < now() - interval '2 minutes' and product.state = TRUE
        order by
	         product.id, bid.price desc;
`)

     .then((auctions) => {
         console.log("insert");
         let promises = auctions.map(auction => {
             let productId = auction.id;
             let customerId =auction.customer_id;
             return db.any(`insert into product_in_shopping_cart values (default, $1, $2) returning *`, [productId, customerId])
         })
         return [auctions, Promise.all(promises)];

     })
     .spread(auctions => {
            console.log("update");
             let promises = auctions.map(auction => {
             let productId = auction.id;
             console.log("productid", productId);
             return db.none('update product set state = FALSE where id = $1', [productId])
         })
         return [auctions, Promise.all(promises)];
     })

      .catch(error => {
          console.log(error, 'error');
      });
 }

 //setInterval(expiredAuction, 120000);

expiredAuction()
