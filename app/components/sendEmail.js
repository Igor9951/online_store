'use server'

import nodemailer from 'nodemailer'


function generateStyle(code){
  return `
  <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #f9fafb; color: #111827;">
    <div style="max-width: 480px; margin: auto; background: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">Підтвердження email</h2>
      <p style="margin-bottom: 12px;">Вітаємо! Дякуємо за реєстрацію в <strong>My App</strong>.</p>
      <p style="margin-bottom: 12px;">Ваш код підтвердження:</p>
      <div style="font-size: 28px; font-weight: bold; color: #4f46e5; text-align: center; letter-spacing: 4px; margin: 20px 0;">
        ${code}
      </div>
      <p style="margin-bottom: 12px;">Цей код дійсний протягом 10 хвилин.</p>
      <p style="font-size: 14px; color: #6b7280;">Якщо ви не реєструвалися — просто ігноруйте це повідомлення.</p>
    </div>
  </div>
`
}

export async function sendMail(to,code){


  const email=to.toString().replace('%40','@')
  const transporter =nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey', 
    pass: process.env.SMTP_PASSWORD,
  },
});

  try{
    const test=await transporter.verify();

    console.log(test);

  }

  catch(err){
    console.log(err)
  }

  try{
    const sendRes=await transporter.sendMail({
      from:process.env.SMTP_EMAIL,
      to:to,
      subject:'Код для підтвердження пошти',
      html:generateStyle(code)
    })

    console.log(sendRes)
  }

  catch(err){
    console.log(err)
  }

}