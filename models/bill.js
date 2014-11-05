module.exports = function(Bill) {
    
    
    Bill.listBills = function(cb) {
        
        // Bill.find({include: ['user','course']}, cb);
        
        Bill.find({
            include: {
                relation: 'course',
                scope: {
                    fields: ['title']
                }
                // relation: 'user'
                // scope: {
                //     fields: ['fullName', 'sex', 'email']
                // }
            }
        }, cb);
    };
    
    Bill.remoteMethod(
        'listBills',
        {
            // accepts: [
            //     { arg: 'CourseID', type: 'any', required: false},
            //     { arg: 'UserID', type: 'any', required: false}
            // ],
            returns: {
                arg: 'Bills', type: 'array'
            },
            http: {
                path: '/listBills', verb: 'post'
            }
        });
};
