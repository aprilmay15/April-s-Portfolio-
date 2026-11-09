export default async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        return response.status(405).json({ message: 'Method not allowed.' });
    }

    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
    const name = String(body.contact_name || '').trim();
    const email = String(body.contact_email || '').trim();
    const subject = String(body.contact_subject || '').trim();
    const message = String(body.contact_message || '').trim();
    const honeypot = String(body.contact_website || '').trim();

    if (honeypot) {
        return response.status(200).json({ ok: true });
    }

    if (!name || !subject || !message || !/^\S+@\S+\.\S+$/.test(email)) {
        return response.status(400).json({ message: 'Please complete every field with a valid email address.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_TO_EMAIL;
    const sender = process.env.CONTACT_FROM_EMAIL || 'April Amedu Website <onboarding@resend.dev>';

    if (!apiKey || !recipient) {
        return response.status(503).json({ message: 'The contact form is not configured yet.' });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: sender,
            to: [recipient],
            reply_to: email,
            subject: `Website enquiry: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        })
    });

    if (!resendResponse.ok) {
        return response.status(502).json({ message: 'The message could not be sent. Please try again.' });
    }

    return response.status(200).json({ ok: true });
}
