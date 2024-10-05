import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import image from "../Resources/globe.png";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        from_email: '',
        from_name: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState('');
    const form = useRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // EmailJS Integration
        emailjs
            .sendForm('service_do3d2kl', 'template_89039e6', form.current, '9pEXNR7QqYIwln_Fq')
            .then(
                (result) => {
                    console.log('SUCCESS!', result.text);
                    setFormStatus('Message sent successfully!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setFormStatus('Failed to send message. Please try again.');
                }
            );

        // Reset form after submission
        setFormData({
            from_email: '',
            from_name: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative p-4">
            <div className="flex max-w-5xl w-full -space-x-36 gap-16">
                <img src={image} alt="Globe" className="w-[40%] h-full object-cover rounded-l-lg mr-40 my-auto" />

                <div className="max-w-xl mx-10 p-8 bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg rounded-lg">
                    <h2 className="text-4xl font-bold text-white mb-4 text-left">
                        Get In <span className="text-sky-400">Touch</span>
                    </h2>
                    <p className="text-gray-400 mb-8 text-left">
                        Have any questions or issues that you want to bring to our attention? Feel free to drop us a message here, and we'll get back to you ASAP.
                    </p>

                    {formStatus && <p className="text-green-500 mb-4">{formStatus}</p>}

                    <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                name="from_email"
                                placeholder="Your Email"
                                value={formData.from_email}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 placeholder-gray-500"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="from_name"
                                placeholder="Name"
                                value={formData.from_name}
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
        </div>
    );
};

export default ContactForm;
