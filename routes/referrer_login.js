var express = require("express"),
    passport = require("passport"),
    router = express.Router(),
    User = require("../models/user"),
    Patient = require("../models/patient"),
    hospitalCount = '',
    referrerCount = '',
    patientCount = '';

// INDEX(GET): LOGIN PAGE/ALL
router.get("/accounts/referrers/login", function(req, res) {
    // Fetch all hospitals
    User.find({ typeOfUser: "hospital" }, function(err, hospitals) {
        // Fetch all referrers
        User.find({ typeOfUser: "referrer" }, function(err, referrers) {
            // Fetch all patients
            Patient.find({}, function(err, patients) {
                // Update counts
                hospitalCount = hospitals.length;
                referrerCount = referrers.length;
                patientCount = patients.length;
                return res.render("referrers/login", { hospitalCount, referrerCount, patientCount });
            });
        });
    });
});

// LOGIN(POST): REFERRER LOGIN LOGIC/REFERRERS
router.post("/accounts/referrers/login", function(req, res) {
    // Check if username exists in the database
    User.findOne({ typeOfUser: "referrer", username: req.body.username }, function(err, user) {
        if (!err) {
            if (user) {
                // Check if entered password matches password in the database
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        passport.authenticate("local")(req, res, function() {
                            return res.redirect('/referrers/' + req.user.username + "/dashboard");
                        });
                    } else {
                        req.flash("error", "Incorrect password. Try again.");
                        return res.redirect("back");
                    }
                });
                return;
            }
            req.flash("error", "Incorrect username. Try again.")
            return res.redirect("/login");
        }
        req.flash("error", "Oops! Something isn't quite right.")
        res.redirect("back");
    });
});

module.exports = router;