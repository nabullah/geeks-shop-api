const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nabullah:Wolfauror123@geeks-shop.qu5rc45.mongodb.net/geeksshop_db', (err, res) => {
    if (err) {
        console.log("Oops! Database is not Connected.", err)
    } else {
        console.log("Database is connected Successfully !!!")

    }
})
// mongodb+srv://nabullah:<password>@geeks-shop.qu5rc45.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://Taufeeque:Alam@cluster0.hfbcx.mongodb.net/my_db