const nodemailer = require("nodemailer");

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailService = process.env.EMAIL_SERVICE || "gmail";

  if (!emailUser || !emailPass) {
    console.warn("Email credentials not configured. Emails will not be sent.");
    return null;
  }

  transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  return transporter;
}

async function sendApprovalEmail(registration) {
  const mail = getTransporter();
  if (!mail) return null;

  const tournamentName = getTournamentName(registration.eventId);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: registration.email,
    subject: `✓ Your NEXX Esports Registration is Approved! - ${tournamentName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0b0f1a; color: #e6efff;">
        <div style="border: 2px solid #00d1ff; border-radius: 12px; padding: 30px; background: #0d1120;">
          <h1 style="color: #00d1ff; text-align: center; margin-top: 0;">🎮 Registration Approved!</h1>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Hi <strong>${registration.fullName}</strong>,
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Great news! Your registration for <strong>${tournamentName}</strong> has been <span style="color: #00d1ff; font-weight: bold;">approved</span>!
          </p>
          
          <div style="background: #121a2b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Tournament:</strong> ${tournamentName}</p>
            <p style="margin: 10px 0;"><strong>In-Game Name:</strong> ${registration.inGameName}</p>
            <p style="margin: 10px 0;"><strong>UID:</strong> ${registration.uid}</p>
            <p style="margin: 10px 0;"><strong>Status:</strong> <span style="color: #00d1ff;">✓ Approved</span></p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">
            You're all set! Make sure you're ready for the tournament. Check the NEXX Esports website for the event date and time.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            If you have any questions, feel free to reach out to our support team on Discord.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #00d1ff; text-align: center;">
            <p style="color: #a3f5ff; font-size: 14px;">– The NEXX Esports Team</p>
            <p style="color: #53e8ff; font-size: 12px;">May the best player win. 🏆</p>
          </div>
        </div>
      </div>
    `
  };

  try {
    await mail.sendMail(mailOptions);
    console.log(`Approval email sent to ${registration.email}`);
  } catch (err) {
    console.error("Failed to send approval email:", err);
  }
}

async function sendDeclineEmail(registration) {
  const mail = getTransporter();
  if (!mail) return null;

  const tournamentName = getTournamentName(registration.eventId);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: registration.email,
    subject: `Registration Update - ${tournamentName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0b0f1a; color: #e6efff;">
        <div style="border: 2px solid #ff6b6b; border-radius: 12px; padding: 30px; background: #0d1120;">
          <h1 style="color: #ff6b6b; text-align: center; margin-top: 0;">Registration Update</h1>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Hi <strong>${registration.fullName}</strong>,
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for your interest in <strong>${tournamentName}</strong>. Unfortunately, your registration has been <span style="color: #ff6b6b; font-weight: bold;">declined</span> at this time.
          </p>
          
          <div style="background: #121a2b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Tournament:</strong> ${tournamentName}</p>
            <p style="margin: 10px 0;"><strong>In-Game Name:</strong> ${registration.inGameName}</p>
            <p style="margin: 10px 0;"><strong>Status:</strong> <span style="color: #ff6b6b;">Declined</span></p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">
            This may have happened due to payment verification or other compliance reasons. You can re-apply for future tournaments on our website.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            If you believe this is an error, please contact our support team on Discord for more information.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ff6b6b; text-align: center;">
            <p style="color: #ff6b6b; font-size: 14px;">– The NEXX Esports Team</p>
            <p style="color: #ffa8a8; font-size: 12px;">Better luck next time! 🎮</p>
          </div>
        </div>
      </div>
    `
  };

  try {
    await mail.sendMail(mailOptions);
    console.log(`Decline email sent to ${registration.email}`);
  } catch (err) {
    console.error("Failed to send decline email:", err);
  }
}

function getTournamentName(eventId) {
  const tournaments = require("../data/tournaments");
  return tournaments[eventId]?.name || eventId;
}

module.exports = {
  sendApprovalEmail,
  sendDeclineEmail
};
