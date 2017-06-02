const express = require('express');
const Promise = require('bluebird');
const cors  = require('cors');
const pgp = require('pg-promise')({
    promiseLib: Promise
});
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt');
const uuid = require('uuid');

const db = pgp({
    database: 'vinyl'
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

// API requesting  all products

app.get('/api/products', (req, resp, next) => {
    db.any('select * from product')
   .then(data => resp.json(data))
   .catch(next);
});

// API requesting specific product use an inner join or left join

app.get('/api/product/:id', (req, resp, next) => {
  let id = req.params.id;
  //db.oneOrNone('select * from product where id = $1', id)
  db.oneOrNone('select product.*, bid.price as bid from product  left outer join bid on (product.id = bid.product_id) where product.id = $1 order by bid.price desc limit 1;', id)
    .then(data => {
      if (data) {
        resp.json(data);
      } else {
        resp.status(404);
        resp.json({
          message: "Product not found."
        });
      }
    })
    .catch(next);
});

//API requesting customer information

app.post('/api/user/signup', (req, resp, next) => {
  let data = req.body;
  bcrypt.hash(data.password, 10)
    .then((encryptedPassword) =>
      db.one(`
        insert into customer
        values (default, $1, $2, $3, $4, $5)
        returning username, email, first_name, last_name
        `,
        [
          data.username,
          data.email,
          encryptedPassword,
          data.first_name,
          data.last_name
        ]
      )
    )
    .then(data => resp.json(data))
    .catch(next);
});


//API requesting Login

app.post('/api/user/login', (req, resp, next) => {
  let username = req.body.username;
  let password = req.body.password;
  db.one(
    'select * from customer where username = $1',
    username)
    .then(customer =>
      [customer,
          //password encryption
        bcrypt.compare(password, customer.password)])
    .spread((customer, matches) => {
      if (matches) {
        let token = uuid.v4();
        return [
          customer,
          db.one(
            `insert into login_session values
            ($1, default, $2) returning *`,
            [token, customer.id]
          )
        ];
      } else {
        throw new Error('Login failed.');
      }
    })
    .spread((customer, loginSession) => {
      resp.json({
        id: customer.id,
        username: customer.username,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        auth_token: loginSession.token
      });
    });
    //.catch(next);
});
//
function respondUnauthorized(resp){
    resp.status(403);
    resp.json({

        message: 'Unauthorized'
    });
}

app.use(function authorization(req, resp, next) {
    let token = req.body.token;
    if(!token){
        respondUnauthorized(resp);
        return;
    }

    db.oneOrNone(`select * from login_session where token = $1`, token)
    .then(loginSession => {
        if(!loginSession){
            respondUnauthorized(resp);
            return;
        }
        req.loginSession = loginSession;
        next();
    })
    .catch(next);
});


//API that places a bid on a product and increases the starting or current price by 5$

app.post('/api/user/bid', (req, resp, next)=>{
    let productId = req.body.product_id + "";
    let customerId = req.body.user;
    db.oneOrNone(`select * from bid where product_id = $1 order by price desc limit 1;`, [productId])
    .then(highBid => {
        if(highBid){
            return  db.one(`insert into bid values (default, $1, $2 + 5, $3) returning *`, [customerId, highBid.price, productId])
        }else {
            return db.one(`select * from product where id = $1`, [productId])

            .then(product =>{

                    return db.one(`insert into bid values (default, $1, $2, $3) returning *`, [customerId, product.price, productId])
            })
        }
    })
    .then(data => resp.json(data))
    .catch(next);
});

// function that takes expired bid to the shopping_cart

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

             let promises = auctions.map(auction => {
             let productId = auction.id;
             return db.none(`update product set state = FALSE where id = $1` [productId])
         })
         return [auctions, Promise.all(promises)];
     })

      .catch(error => {
          console.log(error, 'error');
      });
 }

 setInterval(expiredAuction, 120000);

//API shopping cart

app.post('/api/shopping_cart',(req, resp, next)=>{
    let productId = req.body.product_id;
    let customerId = req.loginSession.customer_id;
    db.one(`insert into product_in_shopping_cart values (default, $1, $2) returning *`, [productId, customerId])
    .then(data => resp.json(data))
    .catch(next);
});

app.get('/api/shopping_cart', (req, resp, next)=>{
    let customerId = req.loginSession.customer_id;
    db.any(`select
            product.*
         from
            product_in_shopping_cart
         inner join
            product on product.id = product_in_shopping_cart.product_id
             where customer id = $1`, customerId)
    .then(data => resp.json(data))
    .catch(next);
});

app.use((err, req, resp, next) => {
  resp.status(500);
  resp.json({
    message: err.message,
    stack: err.stack.split('\n')
  });
});

app.listen(4000, () => console.log('Listening on 4000.'));
