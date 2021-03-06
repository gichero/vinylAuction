import $ from 'jquery';

export function getShoppingcart(token){

console.log('reached get shopping cart');
    return(dispatch)=> {
        $.get('http://localhost:4000/api/shopping_cart', {
            token:token
        })
        .then(data => {
            dispatch({
                type: 'shoppingCart',
                data: data
            });
        })
        .catch(resp => {
            let error = resp.responseJSON && resp.responseJSON.message ||
            'Error';
            dispatch({
                type: 'shoppingCart error',
                error: error
            });
        });
    };
}
