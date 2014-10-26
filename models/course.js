module.exports = function(Course) {
    // List course
    Course.listCourses = function(cb) {
        Course.find({}, cb);
    };
    
    Course.remoteMethod('listCourses', {
        returns: {arg: 'courses', type: 'array'},
        http: {path:'/list-courses', verb: 'get'}
    });
};
