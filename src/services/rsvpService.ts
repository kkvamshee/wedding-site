import emailjs from '@emailjs/browser';

// Configuration - Replace these with your actual credentials
const CONFIG = {
  // JSONBin.io - Free tier: 10k requests/month
  JSONBIN_API_KEY: '', // Replace with your JSONBin API key
  JSONBIN_BIN_ID: 'your-bin-id', // Replace with your bin ID after creating it
  
  // EmailJS - Free tier: 200 emails/month
  EMAILJS_SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
  EMAILJS_TEMPLATE_ID: 'your_template_id', // Replace with your EmailJS template ID
  EMAILJS_PUBLIC_KEY: 'your_public_key', // Replace with your EmailJS public key
  
  // Telegram Bot - Completely free
  TELEGRAM_BOT_TOKEN: 'your_bot_token', // Replace with your bot token from @BotFather
  TELEGRAM_CHAT_ID: 'your_chat_id', // Replace with your chat ID
};

export interface RSVPData {
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  message: string;
  submittedAt: string;
}

// Initialize EmailJS
emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);

/**
 * Store RSVP data in JSONBin.io
 */
export const storeRSVPData = async (data: RSVPData): Promise<boolean> => {
  try {
    // For demo: Store in localStorage as fallback
    const existingRSVPs = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
    existingRSVPs.push(data);
    localStorage.setItem('wedding-rsvps', JSON.stringify(existingRSVPs));
    
    // TODO: Uncomment and configure when you have your JSONBin credentials
    /*
    // First, get existing data
    const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.JSONBIN_BIN_ID}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': CONFIG.JSONBIN_API_KEY,
      },
    });
    
    const existingData = await getResponse.json();
    const rsvps = existingData.record?.rsvps || [];
    rsvps.push(data);
    
    // Update bin with new data
    const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.JSONBIN_BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': CONFIG.JSONBIN_API_KEY,
      },
      body: JSON.stringify({ rsvps }),
    });
    
    return updateResponse.ok;
    */
    
    return true;
  } catch (error) {
    console.error('Error storing RSVP data:', error);
    return false;
  }
};

/**
 * Send email notification using EmailJS
 */
export const sendEmailNotification = async (data: RSVPData): Promise<boolean> => {
  try {
    // TODO: Uncomment and configure when you have your EmailJS credentials
    /*
    const templateParams = {
      to_email: 'your-email@example.com', // Your email address
      from_name: data.name,
      from_email: data.email,
      attending: data.attending ? 'Yes' : 'No',
      guests: data.guests,
      message: data.message || 'No message',
      submitted_at: new Date(data.submittedAt).toLocaleString(),
    };
    
    const response = await emailjs.send(
      CONFIG.EMAILJS_SERVICE_ID,
      CONFIG.EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    return response.status === 200;
    */
    
    console.log('Email notification would be sent:', data);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
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
      sendEmailNotification(data),
      sendTelegramNotification(data),
    ]);
    
    return { success: true, message: 'RSVP submitted successfully!' };
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

/**
 * Get all RSVPs (for admin view)
 */
export const getAllRSVPs = async (): Promise<RSVPData[]> => {
  try {
    // For demo: Get from localStorage
    return JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
    
    // TODO: Uncomment when using JSONBin
    /*
    const response = await fetch(`https://api.jsonbin.io/v3/b/${CONFIG.JSONBIN_BIN_ID}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': CONFIG.JSONBIN_API_KEY,
      },
    });
    
    const data = await response.json();
    return data.record?.rsvps || [];
    */
  } catch (error) {
    console.error('Error getting RSVPs:', error);
    return [];
  }
};

export default {
  submitRSVP,
  getAllRSVPs,
  storeRSVPData,
  sendEmailNotification,
  sendTelegramNotification,
};
