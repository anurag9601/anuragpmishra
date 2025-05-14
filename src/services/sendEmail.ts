import nodemailer from "nodemailer";

export async function handleSendQuestionEmail(
    userName: string,
    email: string,
    questionCategory: string,
    urgencyLevel: string,
    preferredResponseTime: string,
    yourQuestion: string
) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NEXT_PUBLIC_MY_EMAIL as string,
                pass: process.env.NEXT_PUBLIC_MY_APP_PASSWORD as string,
            },
        });

        const info = await transporter.sendMail({
            from: email,
            to: "anuragmishrap13@gmail.com",
            subject: "💬 Quick Question for You",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 10px; line-height: 1.6; color: #333;">
                    <h2 style="color: #4CAF50;">📩 New Question Received!</h2>
                    
                    <p><strong>👤 Sender Name:</strong> ${userName}</p>
                    <p><strong>📧 Sender Email:</strong> <a href="mailto:${email}" style="color: #1a73e8;">${email}</a></p>
                    <p><strong>📂 Question Category:</strong> ${questionCategory}</p>
                    <p><strong>⏱️ Urgency Level:</strong> ${urgencyLevel}</p>
                    <p><strong>🕒 Preferred Response Time:</strong> ${preferredResponseTime}</p>

                    <hr style="margin: 20px 0;" />

                    <h3 style="color: #555;">📝 Question:</h3>
                    <p style="background-color: #f9f9f9; padding: 12px; border-left: 4px solid #4CAF50; white-space: pre-line;">
                        ${yourQuestion}
                    </p>

                    <hr style="margin: 20px 0;" />
                    <p style="font-size: 0.9em; color: #888;">This email was generated from your website's query form.</p>
                </div>
            `
        })

        return info.messageId;

    } catch (error) {
        console.log("Error while sending email in handleSendQuestionEmail function", error);
        return null;
    }
}