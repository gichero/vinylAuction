
import $ from 'jquery';


export function write(event,type){
  return {
    type: type,
    text: event
  }
}

function pageInfo(info){
    return{
        type: 'detailImage',
        payload: info
    }
}

export function checkout(amount){

    let asyncAction = function(dispatch){

        var handler = window.StripeCheckout.configure({

    // publishable key
    key: 'pk_test_CyJ9ltSOJMEEXAnJAGrIAkcn',
    locale: 'auto',
    token: function callback(token) {
    var stripeToken = token.id;
    console.log(stripeToken, 'stripe');
    // Make checkout API call here and send the stripe token
    // to the back end
        }
    });
    // this actually opens the popup modal dialog
    handler.open({
        name: 'My vinyl store',
        description: 'Some LPs',
        amount: amount * 100
    });
        $.ajax({

        })
    }
    return asyncAction;
}
