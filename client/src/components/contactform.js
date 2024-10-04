import React, { useState } from 'react';
import Globe from "";

const ContactForm = () => {
const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
});

const [formStatus, setFormStatus] = useState('');

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
    ...formData,
    [name]: value
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setFormStatus('Message sent successfully!');
    setFormData({
    email: '',
    name: '',
    message: ''
    });
};

return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 relative p-4">
        <image src={Globe} alt="Globe" className="absolute top-0 right-0 w-32 h-32 mt-12 mr-12" />
        
    <div className="max-w-lg w-full p-8 bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg rounded-lg">
        <h2 className="text-4xl font-bold text-white mb-4">
        Get In <span className="text-sky-400">Touch</span>
        </h2>
        <p className="text-gray-400 mb-8">
        A good design is not only aesthetically pleasing, but also functional. It should be able to solve the problem.
        </p>

        {formStatus && <p className="text-green-500 mb-4">{formStatus}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 placeholder-gray-500"
            required
            />
        </div>

        <div>
            <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 placeholder-gray-500"
            required
            />
        </div>

        <div>
            <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 placeholder-gray-500"
            rows="4"
            required
            />
        </div>

        <button
        type="submit"
        className="w-full py-4 font-bold rounded-lg border-2 border-sky-400 bg-white/10 text-gray-100 cursor-pointer transition-all ease-in-out duration-300 backdrop-blur-md hover:bg-sky-400 hover:text-gray-900 hover:shadow-[0_0_25px_rgba(56,189,248,0.7)] hover:scale-105"
        >
            Get in Touch
        </button>

        </form>
    </div>
    </div>

);
};

export default ContactForm;
