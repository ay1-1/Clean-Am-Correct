export interface SiteConfig {
  businessName: string;
  tagline: string;
  supportingCopy: string;
  location: string;
  city: string;
  state: string;
  country: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappLink: string;
  operatingHours: string;
  email: string;
}

export const siteConfig: SiteConfig = {
  businessName: 'Clean Am Correct',
  tagline: 'Cleaner Spaces. Healthier Lives.',
  supportingCopy:
    'Professional cleaning services designed to give your home or business a fresher, cleaner and more comfortable space in Ikorodu, Lagos.',
  location: 'Ikorodu, Lagos, Nigeria',
  city: 'Ikorodu',
  state: 'Lagos State',
  country: 'Nigeria',
  phoneDisplay: '07046975466',
  phoneRaw: '2347046975466',
  whatsappLink:
    'https://wa.me/2347046975466?text=Hello%20Clean%20Am%20Correct%2C%20I%27d%20like%20to%20book%20a%20cleaning%20appointment.',
  operatingHours: 'Monday – Saturday: 7:30 AM – 6:00 PM',
  email: 'info@cleanamcorrect.com',
};

export const createWhatsAppBookingUrl = (data: {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  locationArea?: string;
}) => {
  const text = `Hello Clean Am Correct,
I would like to book a cleaning appointment.

Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service}
Preferred Date: ${data.preferredDate || 'Flexible'}
Preferred Time: ${data.preferredTime || 'Morning'}
${data.locationArea ? `Location / Area: ${data.locationArea}\n` : ''}${
    data.message ? `Message: ${data.message}` : ''
  }`.trim();

  return `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(text)}`;
};
