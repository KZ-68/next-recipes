import { sendMail } from '@/lib/mail';
import React from 'react'

function ContactPage () {

    const send = async(formData:any) => {
        "use server"
        const contactFormName = formData.get("name") as string;
        const contactFormSubject = formData.get("subject") as string;
        const contactFormBody = formData.get("body") as string;

        await sendMail({
            to:"nextjsrecipetest@gmail.com",
            name: contactFormName,
            subject: contactFormSubject,
            body: contactFormBody
        })
    }
    
    return (
        <div className='flex flex-col py-8 px-6 mx-56 rounded-lg bg-slate-700'>
            <h1 className='text-2xl'>Contact Us</h1>
            <form action={send} className='flex flex-col gap-10 py-8 px-6 rounded-2xl bg-slate-700'>
                <input className='py-4 px-2 rounded-xl' disabled={true} type='text' name="to" placeholder='nextjsrecipetest@gmail.com'/>
                <input className='text-black py-4 px-2 rounded-xl' type="text" name='name' placeholder="test"/>
                <input className='text-black py-4 px-2 rounded-xl' type="text" name='subject'/>
                <input className='text-black py-4 px-2 rounded-xl' type="text" name='body'/>
                <button className='py-2 px-2 rounded-xl bg-slate-800' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ContactPage