var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// PATIENT SCHEMA
var PatientSchema = new mongoose.Schema({
    name: String,
    investigation: String,
    phone: String,
    hospital_name: String,
    hospital_address: String,
    hospital_id: String,
    accession_number: String,
    status: String,
    referrer: String,
    referrer_id: String,
    amount_paid: Number,
    commission_rate: Number,
    hospital_commission: Number,
    referrer_commission: Number,
    platform_commission: Number,
    referral_year: String,
    referral_month: String,
    referral_date: String,
    referral_time: String,
    authentication_year: String,
    authentication_month: String,
    authentication_date: String,
    authentication_time: String,
});

module.exports = mongoose.model("Patient", PatientSchema);