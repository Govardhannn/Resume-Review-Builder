import otpTamplate from "./otp.template.js";
import sendEmail from "./send.email.js";

const sendOtp = async (code,email) => {
    try {
        const msg = otpTamplate(code);
        await sendEmail({
            email,
            sub: 'verification email from NovaX',
            message: msg
        })
        return {sucess: true, message: "verification code send sucessful"};
    } 
    catch (error) {
        return {sucess: false, message: "verification code failed to send"};
    }
}

export default sendOtp;