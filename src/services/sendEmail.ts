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

interface EnquiryFile {
    name: string;
    type: string;
    content: Buffer;
}

export async function handleSendProjectEnquiryEmail(
    userName: string,
    email: string,
    companyName: string,
    projectType: string,
    budgetRange: string,
    timelinePreference: string,
    teamSize: string,
    technicalRequirements: string,
    projectDetails: string,
    files: EnquiryFile[]
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

        const attachments = files.map((file) => ({
            filename: file.name,
            content: file.content,
            contentType: file.type || "application/octet-stream",
        }));

        const info = await transporter.sendMail({
            from: `"${userName}" <${email}>`,
            to: "anuragmishrap13@gmail.com",
            subject: `📬 New Project Enquiry from ${userName}`,
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 24px;">
          <h2 style="text-align: center; color: #4CAF50;">🚀 New Project Enquiry</h2>
          
          <p><strong>👤 Name:</strong> ${userName}</p>
          <p><strong>📧 Email:</strong> ${email}</p>
          <p><strong>🏢 Company:</strong> ${companyName}</p>
          <p><strong>💼 Project Type:</strong> ${projectType}</p>
          <p><strong>💰 Budget Range:</strong> ${budgetRange}</p>
          <p><strong>📅 Timeline Preference:</strong> ${timelinePreference}</p>
          <p><strong>👥 Team Size:</strong> ${teamSize}</p>

          <h3 style="margin-top: 20px; color: #4CAF50;">🛠️ Technical Requirements</h3>
          <p style="background: #f9f9f9; padding: 10px; border-radius: 6px;">${technicalRequirements}</p>

          <h3 style="margin-top: 20px; color: #4CAF50;">📝 Project Details</h3>
          <p style="background: #f1f1f1; padding: 10px; border-radius: 6px;">${projectDetails}</p>

          ${files.length > 0
                    ? `<h3 style="margin-top: 20px; color: #4CAF50;">📎 Attached Files</h3>
               <ul style="padding-left: 20px;">${files
                        .map((file) => `<li>📄 ${file.name}</li>`)
                        .join("")}</ul>`
                    : `<p style="margin-top: 20px;">No files attached.</p>`
                }

          <hr style="margin: 30px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">
            This enquiry was submitted via your portfolio or company website.
          </p>
        </div>
      `,
            attachments,
        });

        return info.messageId;
    } catch (error) {
        console.error("Error while sending email in handleSendProjectEnquiryEmail function", error);
        return null;
    }
}
