
/* Middleware function check if user is logged in before serving specific pages */
module.exports = {
    checkAuth: function(req, res , next) {
        if(req.isAuthenticated()) {
            return next()
        } 
        req.flash('errorMsg', 'Please Login');
        res.redirect('login');
    }
}