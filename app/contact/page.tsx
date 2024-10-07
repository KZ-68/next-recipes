import { sendMail } from '@/lib/mail';
import React from 'react'

function ContactPage () {

    const send = async(formData:any) => {
        "use server"
        const contactFormSubject = formData.get("subject") as string;
        const contactFormBody = formData.get("body") as string;

        await sendMail({
            to:"nextjsrecipetest@gmail.com",
            subject: contactFormSubject,
            body: contactFormBody
        })
    }
    
    return (
        <div className='flex flex-col py-8 px-6 mx-56 rounded-lg bg-slate-700'>
            <h1 className='text-2xl'>Contact Us</h1>
            <form action={send} className='flex flex-col gap-6 py-8 px-6 rounded-2xl bg-slate-700'>
                <input className='py-4 px-2 rounded-xl' disabled={true} type='text' name="to" placeholder='nextjsrecipetest@gmail.com'/>
                <label>Subject :</label>
                <input className='text-black py-4 px-2 rounded-xl' type="text" name='subject' id='subject'/>
                <label>Text :</label> 
                <input className='text-black py-4 px-2 rounded-xl' type="text" name='body'/>
                <button className='py-2 px-2 rounded-xl bg-slate-800' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ContactPage