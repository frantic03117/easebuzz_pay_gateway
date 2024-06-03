const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const sha512 = require('js-sha512');
const key = "S12C58OSWC"
const salt = "LQZ3S33484"
const { URLSearchParams } = require('url');
const submit_form = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array(), is_success: 0 });
    }

    const encodedParams = new URLSearchParams();

    const txnid = "T" + new Date().getTime();

    const { firstname, email, phone, amount, productinfo } = req.body;

    const string = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;

    const hash = sha512(string);

    encodedParams.set('key', key);
    encodedParams.set('txnid', txnid);
    encodedParams.set('amount', amount);
    encodedParams.set('productinfo', productinfo);
    encodedParams.set('firstname', firstname);
    encodedParams.set('phone', phone);
    encodedParams.set('email', email);
    encodedParams.set('surl', 'http://localhost:3000/payment/success');
    encodedParams.set('furl', 'http://localhost:3000/payment/failure');
    encodedParams.set('hash', hash);
    encodedParams.set('udf1', '');
    encodedParams.set('udf2', '');
    encodedParams.set('udf3', '');
    encodedParams.set('udf4', '');
    encodedParams.set('udf5', '');
    encodedParams.set('udf6', '');
    encodedParams.set('udf7', '');



    const options = {
        method: 'POST',
        url: 'https://pay.easebuzz.in/payment/initiateLink',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        },
        data: encodedParams,
    };


    try {
        const { data } = await axios.request(options);
        // console.log(data);
        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}
const init_payment = async (req, res) => {
    const data = req.body;
    return res.json(data)
}
const response_success = async (req, res) => {
    const body = req.body;
    return res.json(body);
}

module.exports = {
    submit_form, init_payment, response_success
}