'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
    'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
    'name': 'fiat-500-x',
    'pricePerDay': 36,
    'pricePerKm': 0.10
}, {
    'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
    'name': 'mercedes-class-a',
    'pricePerDay': 44,
    'pricePerKm': 0.30
}, {
    'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
    'name': 'bmw-x1',
    'pricePerDay': 52,
    'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
    'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
    'driver': {
        'firstName': 'Roman',
        'lastName': 'Frayssinet'
    },
    'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
    'pickupDate': '2020-01-02',
    'returnDate': '2020-01-02',
    'distance': 100,
    'options': {
        'deductibleReduction': false
    },
    'price': 0,
    'commission': {
        'insurance': 0,
        'treasury': 0,
        'virtuo': 0
    }
}, {
    'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
    'driver': {
        'firstName': 'Redouane',
        'lastName': 'Bougheraba'
    },
    'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
    'pickupDate': '2020-01-05',
    'returnDate': '2020-01-09',
    'distance': 300,
    'options': {
        'deductibleReduction': true
    },
    'price': 0,
    'commission': {
        'insurance': 0,
        'treasury': 0,
        'virtuo': 0
    }
}, {
    'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
    'driver': {
        'firstName': 'Fadily',
        'lastName': 'Camara'
    },
    'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
    'pickupDate': '2019-12-01',
    'returnDate': '2019-12-15',
    'distance': 1000,
    'options': {
        'deductibleReduction': true
    },
    'price': 0,
    'commission': {
        'insurance': 0,
        'treasury': 0,
        'virtuo': 0
    }
}];

//list of actors for payment
//useful from step 5
const actors = [{
    'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
    'payment': [{
        'who': 'driver',
        'type': 'debit',
        'amount': 0
    }, {
        'who': 'partner',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'insurance',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'treasury',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'virtuo',
        'type': 'credit',
        'amount': 0
    }]
}, {
    'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
    'payment': [{
        'who': 'driver',
        'type': 'debit',
        'amount': 0
    }, {
        'who': 'partner',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'insurance',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'treasury',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'virtuo',
        'type': 'credit',
        'amount': 0
    }]
}, {
    'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
    'payment': [{
        'who': 'driver',
        'type': 'debit',
        'amount': 0
    }, {
        'who': 'partner',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'insurance',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'treasury',
        'type': 'credit',
        'amount': 0
    }, {
        'who': 'virtuo',
        'type': 'credit',
        'amount': 0
    }]
}];


//console.log(cars);
//console.log(rentals);
//console.log(actors);

var c = calculate_price();
console.log(c);

function calculate_price() {
    var rental_prices = [];
    for (var index in rentals) {
        var rental = rentals[index];
        rental_prices[index] = {};
        var date_pickup = new Date(rental.pickupDate);
        var date_return = new Date(rental.returnDate);

        var days = date_return.getDate() - date_pickup.getDate() + 1;
        var km = rental.distance;
        var car = cars.find(element => element.id === rental.carId);

        var price_time = days * car.pricePerDay;
        var price_distance = km * car.pricePerKm;
        rental_prices[index].id = rental.id;
        rental_prices[index].price = price_time + price_distance;

        // STEP 2
        if (days > 10) {
            rental_prices[index].price -= rental_prices[index].price * 0.5;
        }
        else if (days > 4) {
            rental_prices[index].price -= rental_prices[index].price * 0.3;
        }
        else if (days > 1) {
            rental_prices[index].price -= rental_prices[index].price * 0.1;
        }

        // STEP 3
        rental_prices[index].commision = {};
        var comission_total = rental_prices[index].price * 0.3;
        rental_prices[index].commision.insurance = comission_total * 0.5;
        rental_prices[index].commision.treasury = days * 1;
        rental_prices[index].commision.virtuo = comission_total
            - rental_prices[index].commision.insurance
            - rental_prices[index].commision.treasury;

        // STEP 4
        rental_prices[index].options = {};
        rental_prices[index].options.deductibleReduction = rental.options.deductibleReduction;
        if (rental_prices[index].options.deductibleReduction) {
            rental_prices[index].commision.virtuo += 4 * days;
        }
    }
    return rental_prices;
}