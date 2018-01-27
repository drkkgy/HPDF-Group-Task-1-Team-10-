var express = reqire('express');
var router = express.Router();

// Routes
router.get('/products', function(req,res){
	res.send('api is working fine')
});

// Return  router
module.exports = router;