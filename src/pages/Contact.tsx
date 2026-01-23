import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          We'd love to hear from you. Get in touch with us today!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">+234 XXX XXX XXXX</p>
                <p className="text-gray-600">+234 XXX XXX XXXX</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">info@liananaflowers.com.ng</p>
                <p className="text-gray-600">orders@liananaflowers.com.ng</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-gray-600">Lagos, Nigeria</p>
                <p className="text-gray-600">We deliver across Lagos</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Saturday: 8:00 AM - 8:00 PM
                </p>
                <p className="text-gray-600">
                  Sunday: 10:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="space-y-4">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-rose-600 hover:bg-rose-700"
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
