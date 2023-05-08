const { Given, When , Then } = require('@cucumber/cucumber');
const { HomePage } = require('../page-objects/home-page');
const homePage = new HomePage();
const nodemailer = require('nodemailer');

Given('I go to Bangaladesh Embassy', async function() {
  await homePage.embassyHomePage();
});

Then('I log into the website', async function(){
  await homePage.embassyLogin();
});
Then('I click reschedual', async function(){
  await page.getByRole('link', { name: 'Reschedule Appointment' }).click();
  await page.waitForURL('https://portal.ustraveldocs.com/scheduleappointment');
});
Then('I get the dates available', async function(){
  await getAllDatesAndSendEmail();
});

async function getAllDatesAndSendEmail() {
  const firstMonthDates = await homePage.firstMonth();
  const middleMonthDates = await homePage.middleMonth();
  const lastMonthDates = await homePage.lastMonth();
  const dateTime = getCurrentDateTime();
  // console.log(firstMonthDates);
  // console.log(middleMonthDates);
  // console.log(lastMonthDates);

  const allDatesText = `${firstMonthDates}\n${middleMonthDates}\n${lastMonthDates}`;

  await sendEmail('These are the Available Dates at the moment', allDatesText, dateTime);
}

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} ${formattedTime}`;
}

async function sendEmail(subject, text, dateTime) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'iftat100@gmail.com',
      pass: 'ftbrvhjrkozueokb',
    },
  });

  const mailOptions = {
    from: 'iftat100@gmail.com',
    to: 'iftatbhuiyan100@gmail.com',
    cc: ['shahriararnab22@gmail.com', 'Sorafat@mariestopesbd.org'],
    subject: subject,
    text: `These are the dates currently available at ${dateTime} for rescheduling:\n${text}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}





