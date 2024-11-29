"use client"
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll';
import { sendMail } from '@/lib/mail';
import { CheckCircle2, XCircleIcon } from 'lucide-react';
import { useFormState } from 'react-dom';

async function sendMessage(prevState:{ success: boolean; message: string; } | Promise<{ success: boolean; message: string; } | null> | null, formData:FormData){
    
    prevState = null;

    const contactFormEmail = formData.get("email") as string;
    const contactFormSubject = formData.get("subject") as string;
    const contactFormBody = formData.get("body") as string;
    
    const sendmailResponse = await sendMail({
        email: contactFormEmail,
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
            <ThemeSwitcherScroll/>
            {formState?.success === true && (
                <p id="success" className='bg-white w-fit py-2 px-3 my-3 text-black rounded-md'><CheckCircle2 className='flex flex-row gap-2 text-white bg-green-700 rounded-full'/>{formState?.message}</p>
            )}
            {formState?.success === false && (
                <p id="error" className='bg-white w-fit py-2 px-3 my-3 text-black rounded-md'><XCircleIcon className='text-white bg-red-600 rounded-full'/>{formState?.message}</p>
            )}
            <div className='flex flex-col py-8 px-6 mx-80 rounded-lg bg-slate-800'>
                <h1 className='text-2xl'>Contact Us</h1>
                <form action={formAction} className='flex flex-col gap-6 py-8 px-6 rounded-2xl'>
                    <label>Email</label>
                    <input placeholder='Enter your email' className='light:text-black text-white bg-slate-600 py-4 px-4 rounded-lg' type="text" name='email' id='email'/>
                    <label>Subject</label>
                    <input placeholder='Enter the subject' className='light:text-black text-white bg-slate-600 py-4 px-4 rounded-lg' type="text" name='subject' id='subject'/>
                    <label>Message</label> 
                    <textarea placeholder='Type your message here...' className='light:text-black text-white bg-slate-600 py-4 px-4 rounded-lg' name='body' minLength={1} maxLength={500} rows={6}/>
                    <button className='py-2 px-2 rounded-lg bg-indigo-500' type='submit'>Submit</button>
                </form>
            </div>
        </>
        
    )
}

export default ContactPage