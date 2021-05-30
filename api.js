
let pincode = '' // enter your area pincode
let date = '' // --> day-month-year format


const axios = require('axios')
const nodemailer = require('nodemailer');
let API_Link = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`

axios.get(API_Link)
    .then(response => {

        let path = response.data.sessions
        for (exec in path) {
            let path2 = path[exec].slots
            var data_fetcher = `
             Center-name: ${path[exec].name} (${path[exec].block_name})                 
             Fee: ${path[exec].fee_type}                                                
             Date: ${path[exec].date}                                                   
             Number of available dose 1 capacity: ${path[exec].available_capacity_dose1}
             Number of available dose 2 capacity: ${path[exec].available_capacity_dose2}
             Age limit: ${path[exec].min_age_limit}                                     
             Timing: ${path[exec].slots}                                                
            `
            var temp;
             temp = temp + data_fetcher
             temp = temp.replace('undefined', "")
        } 
        console.log(temp)

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'your email here',
                pass: 'your email pass here'
            }
        });
        
        let mailOptions = {
            from: 'your email here',
            to: 'target email id',
            subject: 'Covid-19 Vaccine Slot',
            text: temp
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.message);
            }
            console.log('success');
        });
    });

