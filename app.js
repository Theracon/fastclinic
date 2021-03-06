/******************************************************************************************************************************/
// IMPORT DEPENDENCIES & FILES, DEFINE GLOBAL VARIABLES
/******************************************************************************************************************************/
// Import dependencies
var bodyParser = require('body-parser'),
    express = require('express'),
    cookieParser = require("cookie-parser"),
    flash = require("connect-flash"),
    LocalStrategy = require("passport-local").Strategy,
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    passport = require("passport"),
    session = require("express-session"),

    // Import index route file
    indexRoutes = require("./routes/index"),

    // Import admin route files
    adminIndexRoutes = require("./routes/admin_index"),
    adminBroadcastRoutes = require("./routes/admin_broadcast"),
    adminHospitalRoutes = require("./routes/admin_hospitals"),
    adminReferrerRoutes = require("./routes/admin_referrers"),
    adminSignupRoutes = require("./routes/admin_signup"),
    adminLoginRoutes = require("./routes/admin_login"),

    // Import hospital route files
    hospitalIndexRoutes = require("./routes/hospital_index"),
    hospitalAuthenticateRoutes = require("./routes/hospital_authentication"),
    hospitalDeactivateRoutes = require("./routes/hospital_deactivate"),
    hospitalDepartmentsRoutes = require("./routes/hospital_departments"),
    hospitalNotificationsRoutes = require("./routes/hospital_notifications"),
    hospitalPatientsRoutes = require("./routes/hospital_patients"),
    hospitalProceduresRoutes = require("./routes/hospital_procedures"),
    hospitalCommissionRatesRoutes = require("./routes/hospital_commission_rates"),
    hospitalProfileRoutes = require("./routes/hospital_profile"),
    hospitalSignupRoutes = require("./routes/hospital_signup"),
    hospitalLoginRoutes = require("./routes/hospital_login"),

    // Import referrer route files
    referrerIndexRoutes = require("./routes/referrer_index"),
    referrerDeactivateRoutes = require("./routes/referrer_deactivate"),
    referrerNotificationsRoutes = require("./routes/referrer_notifications"),
    referrerPatientsRoutes = require("./routes/referrer_patients"),
    referrerProfileRoutes = require("./routes/referrer_profile"),
    referrerSignupRoutes = require("./routes/referrer_signup"),
    referrerLoginRoutes = require("./routes/referrer_login"),

    // Import wildcard route file
    wildcardRoute = require("./routes/wildcard"),

    // Import the user model
    User = require("./models/user");

// Import dotenv
require('dotenv').config();


/******************************************************************************************************************************/
// CONFIGURE APP
/******************************************************************************************************************************/
// Initialize app
var app = express();

// Configure app to use cookie-parser
app.use(cookieParser("secret"));

// Configure app to parse json data from request object
app.use(express.json());

// Configure app to use express-session
app.use(session({ secret: "wonders", resave: false, saveUninitialized: false }));

// Configure app to use flash
app.use(flash());

// Configure app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set view engine
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// Configure app to use passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define the currentUser global variable
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Configure app to use index route file
app.use(indexRoutes);

// Configure app to use admin route files
app.use(adminIndexRoutes);
app.use(adminBroadcastRoutes);
app.use(adminHospitalRoutes);
app.use(adminReferrerRoutes);
app.use(adminSignupRoutes);
app.use(adminLoginRoutes);

// Configure app to use hospital route files
app.use(hospitalIndexRoutes);
app.use(hospitalAuthenticateRoutes);
app.use(hospitalDeactivateRoutes);
app.use(hospitalNotificationsRoutes);
app.use(hospitalPatientsRoutes);
app.use(hospitalProfileRoutes);
app.use(hospitalDepartmentsRoutes);
app.use(hospitalProceduresRoutes);
app.use(hospitalCommissionRatesRoutes);
app.use(hospitalSignupRoutes);
app.use(hospitalLoginRoutes);

// Configure app to use referrer route files
app.use(referrerIndexRoutes);
app.use(referrerDeactivateRoutes);
app.use(referrerNotificationsRoutes);
app.use(referrerPatientsRoutes);
app.use(referrerProfileRoutes);
app.use(referrerSignupRoutes);
app.use(referrerLoginRoutes);

// Configure app to use wildcard route file
app.use(wildcardRoute);


/******************************************************************************************************************************/
// CONNECT MONGOOSE TO DATABASE
/******************************************************************************************************************************/
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, { useUnifiedTopology: true });


/******************************************************************************************************************************/
// CONFIGURE APP LISTEN ROUTE
/******************************************************************************************************************************/
app.listen(process.env.PORT, function() {
    console.log(`Fastclinic local server now live at port ${process.env.PORT}`);
});