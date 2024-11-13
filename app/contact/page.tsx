"use client"
import { sendMail } from '@/lib/mail';
import { CheckCircle2 } from 'lucide-react';
import { useFormState } from 'react-dom';

async function sendMessage(prevState, formData:FormData){
    
    const contactFormSubject = formData.get("subject") as string;
    const contactFormBody = formData.get("body") as string;

    
    const sendmailResponse = await sendMail({
        subject: contactFormSubject,
        body: contactFormBody
    })
    
    if(sendmailResponse?.startsWith('250 2.0.0 OK')) {
        return {
            success: true,
            message: 'Message sended successfully !',
        };
    } else {
        return {
            success: false,
            message: 'Error when sending the message ',
        };
    }
}

function ContactPage () {
    const [formState, formAction] = useFormState(sendMessage, null);
    
    return (
        <>
            {formState?.success === true && (
                <p id="success" className='bg-white w-fit py-2 px-3 my-3 text-black rounded-md'><CheckCircle2 className='flex flex-row gap-2 text-white bg-green-700 rounded-full'/>{formState?.message}</p>
            )}
            {formState?.success === false && (
                <p id="error">{formState?.message}</p>
            )}
            <div className='flex flex-col py-8 px-6 mx-56 rounded-lg bg-slate-700'>
                <h1 className='text-2xl'>Contact Us</h1>
                <form action={formAction} className='flex flex-col gap-6 py-8 px-6 rounded-2xl bg-slate-700'>
                    <label>Subject :</label>
                    <input className='text-black bg-white py-4 px-2 rounded-xl' type="text" name='subject' id='subject'/>
                    <label>Text :</label> 
                    <textarea className='text-black bg-white py-4 px-2 rounded-xl' name='body' minLength={1} maxLength={500}/>
                    <button className='py-2 px-2 rounded-xl bg-slate-800' type='submit'>Submit</button>
                </form>
            </div>
        </>
        
    )
}

export default ContactPage