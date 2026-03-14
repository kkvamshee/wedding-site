// Configuration - Replace these with your actual credentials
const CONFIG = {
  // JSONBin.io - Free tier: 10k requests/month
  JSONBIN_API_KEY: '', // Replace with your JSONBin API key
  JSONBIN_BIN_ID: 'your-bin-id', // Replace with your bin ID after creating it
  
  // Telegram Bot - Completely free
  TELEGRAM_BOT_TOKEN: 'your_bot_token', // Replace with your bot token from @BotFather
  TELEGRAM_CHAT_ID: 'your_chat_id', // Replace with your chat ID

  // Sheet URL
  SHEET_WEB_APP_URL: 'https://script.google.com/macros/s/AKfycby_YzU9F9hSffm9fB-K66iFXJSdcp2bWHic14Y6SvAytt1iutKS9XDicDHscLLWT6yYyw/exec'
};

export interface RSVPData {
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  message: string;
  submittedAt: string;
}

/**
 * Store RSVP data in JSONBin.io
 */
export const storeRSVPData = async (data: RSVPData): Promise<boolean> => {
  try {    
    await fetch(CONFIG.SHEET_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    return true;
  } catch (error) {
    console.error('Error storing RSVP data:', error);
    return false;
  }
};

/**
 * Send Telegram notification
 */
export const sendTelegramNotification = async (data: RSVPData): Promise<boolean> => {
  try {
    // TODO: Uncomment and configure when you have your Telegram bot credentials
    /*
    const message = `
🎉 *New Wedding RSVP!*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
✅ *Attending:* ${data.attending ? 'Yes' : 'No'}
👥 *Guests:* ${data.guests}
💬 *Message:* ${data.message || 'No message'}
🕐 *Submitted:* ${new Date(data.submittedAt).toLocaleString()}
    `.trim();
    
    const response = await fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CONFIG.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
    
    return response.ok;
    */
    
    console.log('Telegram notification would be sent:', data);
    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
};

/**
 * Submit RSVP - stores data and sends notifications
 */
export const submitRSVP = async (data: RSVPData): Promise<{ success: boolean; message: string }> => {
  try {
    // Store data
    const stored = await storeRSVPData(data);
    if (!stored) {
      return { success: false, message: 'Failed to store RSVP data' };
    }
    
    // Send notifications (don't fail if notifications fail)
    await Promise.all([
      sendTelegramNotification(data),
    ]);
    
    return { success: true, message: 'RSVP submitted successfully!' };
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

export default {
  submitRSVP,
  storeRSVPData,
  sendTelegramNotification,
};
