import "dotenv/config";
import twilio from "twilio";

// Twilio credentials and service SID
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const service_sid = process.env.TWILIO_VERIFY_SERVICE_SID;

// Helper to format number to E.164 (assuming India for example)
function formatPhoneNumber(number) {
  const trimmed = number.trim();
  if (!trimmed.startsWith('+')) {
    return `+91${trimmed}`; // modify if your user base is not only India
  }
  return trimmed;
}

async function sendOTP(number) {
  try {
    const formattedNumber = `+91${number}`;
    const verification = await client.verify.v2
      .services(service_sid)
      .verifications.create({
        to: formattedNumber,
        channel: "sms",
      });
    console.log(verification.status); // "pending"
    return true;
  } catch (error) {
    console.error("Twilio error:", error);
    return {
      success: false,
      message: error?.message || "Failed to send OTP",
      code: error?.code,
    };
  }
}


  async function verifyOTP(phoneNumber, otpCode) {
      try {
        const formatNum = `+91${phoneNumber}`;
        const verificationCheck = await client.verify.v2
          .services(service_sid)
          .verificationChecks.create({
            to: formatNum,
            code: otpCode,
          });
        
        return verificationCheck.status === 'approved';
      } catch (error) {
         console.error(error);
        return false;
      }
  }

export { sendOTP, verifyOTP };
