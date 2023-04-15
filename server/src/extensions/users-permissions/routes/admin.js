'use strict';

module.exports={
    type: 'admin',
    routes: [
        {
            method: 'GET',
            path: '/user/update',
            handler: 'createCoreController'
        }
    ]
}