import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/applyfood", async (req, res) => {
  const {
    ownerEmail,
    applicantName,
    applicantContact,
    applicantEmail,
    foodName,
  } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
  from: `"Food Donation Platform" <${process.env.EMAIL_USER}>`,
  to: ownerEmail,
  replyTo: applicantEmail,
  subject: `New Food Request for ${foodName}`,
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
    
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: #000000; color: #ffffff; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">New Food Application</h2>
      </div>

      <!-- Body -->
      <div style="padding: 25px; color: #333;">
        <p style="font-size: 16px;">
          Hello,
        </p>

        <p style="font-size: 15px;">
          You have received a new application request for your listed food item.
        </p>

        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>🍛 Food Item:</strong> ${foodName}</p>
          <p><strong>🏢 NGO Name:</strong> ${applicantName}</p>
          <p><strong>📞 Contact Number:</strong> ${applicantContact}</p>
          <p><strong>📧 Applicant Email:</strong> ${applicantEmail}</p>
        </div>

        <p style="font-size: 14px; color: #555;">
          You may reply directly to this email to contact the applicant.
        </p>

        <div style="text-align: center; margin-top: 25px;">
          <a href="mailto:${applicantEmail}" 
             style="background: #000000; color: #ffffff; padding: 10px 20px; 
             text-decoration: none; border-radius: 6px; font-weight: bold;">
            Reply to Applicant
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} Food Donation Platform <br/>
        Connecting food providers with NGOs
      </div>

    </div>

  </div>
  `,
};

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Application sent successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email sending failed" });
  }
});

export default router;