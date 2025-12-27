import React from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formStatus, setFormStatus] = React.useState<null | 'success' | 'error'>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormStatus('success');
    setIsSubmitting(false);
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're here to help with any questions about our parking services. Reach out to our team and we'll respond as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-700 mt-0.5 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600 mt-1">
                      Chennai Parking Limited<br />
                      123 GST Road, Vandalur<br />
                      Chennai - 600048<br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-700 mt-0.5 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600 mt-1">
                      +91 8667005641
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Monday to Saturday, 9am to 6pm
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-700 mt-0.5 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600 mt-1">
                      info@chennaiparkingapp.com
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      We'll respond as soon as possible
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-blue-700 mt-0.5 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">Operating Hours</h3>
                    <div className="text-gray-600 mt-1 space-y-1">
                      <p>
                        <span className="font-medium">Parking Facilities:</span> 24/7
                      </p>
                      <p>
                        <span className="font-medium">Customer Support:</span> 8:00 AM - 8:00 PM
                      </p>
                      <p>
                        <span className="font-medium">Office Hours:</span> Monday to Saturday, 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Location</h3>
              <div className="h-64 bg-gray-200 rounded-md w-full overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31094.723185589204!2d80.07732905!3d12.8953886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f712b82a78d9%3A0xffd0a76c1aaec2e3!2sVandalur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1653298426197!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Chennai Parking Office Location"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            
            {formStatus === 'success' && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div className="ml-3">
                    <p className="text-green-700 font-medium">Message sent successfully!</p>
                    <p className="text-green-600 mt-1">
                      Thank you for contacting us. We'll get back to you shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-md font-medium text-white transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                You can also reach us through our social media channels
              </p>
              <div className="flex justify-center space-x-4 mt-3">
                <a href="#" className="text-gray-500 hover:text-blue-800 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.666.254 1.23.598 1.8 1.153.55.55.886 1.114 1.141 1.78.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.141 1.78c-.55.55-1.114.886-1.8 1.141-.636.247-1.363.416-2.427.465-1.024.048-1.379.06-4.12.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.78-1.141c-.55-.55-.886-1.114-1.141-1.78-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-4.12v-.08c0-2.643.013-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.141-1.78c.55-.55 1.114-.886 1.78-1.141.636-.247 1.363-.416 2.427-.465C9.56 2.013 9.9 2 12.32 2h.08zm-.08 1.802h-.08c-2.502 0-2.792.011-3.822.058-.921.042-1.416.195-1.75.325-.44.17-.754.371-1.082.703-.333.333-.538.646-.703 1.082-.13.334-.283.83-.325 1.75-.048 1.03-.058 1.32-.058 3.822v.08c0 2.502.011 2.792.058 3.822.042.921.195 1.416.325 1.75.17.44.371.754.703 1.082.333.333.646.538 1.082.703.334.13.83.283 1.75.325 1.03.048 1.32.058 3.822.058h.08c2.502 0 2.792-.011 3.822-.058.921-.042 1.416-.195 1.75-.325.44-.17.754-.371 1.082-.703.333-.333.538-.646.703-1.082.13-.334.283-.83.325-1.75.048-1.03.058-1.32.058-3.822v-.08c0-2.502-.011-2.792-.058-3.822-.042-.921-.195-1.416-.325-1.75-.17-.44-.371-.754-.703-1.082-.333-.333-.646-.538-1.082-.703-.334-.13-.83-.283-1.75-.325-1.03-.047-1.32-.058-3.822-.058zM12 7a5 5 0 105 5 5 5 0 00-5-5zm0 8.259A3.259 3.259 0 118.741 12 3.259 3.259 0 0112 15.259zM16.5 8a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                How do I find parking availability?
              </h3>
              <p className="text-gray-600">
                You can check parking availability on our homepage or booking page. Each location shows the number of available slots in real-time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Can I modify or cancel my booking?
              </h3>
              <p className="text-gray-600">
                Yes, you can modify or cancel your booking up to 2 hours before your reserved time. Log in to your account, go to your bookings, and select the reservation you want to change.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept UPI payments and all major credit/debit cards. All transactions are secure and encrypted.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Are your parking locations secured?
              </h3>
              <p className="text-gray-600">
                Yes, all our parking locations are monitored 24/7 with security personnel and CCTV cameras to ensure the safety of your vehicle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;