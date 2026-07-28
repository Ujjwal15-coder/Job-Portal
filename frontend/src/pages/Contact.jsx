import React, { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className='min-h-screen bg-gray-50'>

      {/* Hero */}
      <section className='bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-14 sm:py-20 px-4'>
        <div className='max-w-3xl mx-auto text-center'>
          <h1 className='text-3xl sm:text-5xl font-bold mb-4'>Contact Us</h1>
          <p className='text-blue-100 text-base sm:text-lg'>Have a question? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className='max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>

          {/* Contact Form */}
          <div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8'>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-5'>Send a Message</h2>

            {sent && (
              <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm'>
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base'>Your Name</label>
                <input
                  type='text' name='name' required
                  value={form.name} onChange={handleChange}
                  placeholder='Enter your name'
                  className='w-full border border-gray-300 rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 outline-none transition'
                />
              </div>
              <div>
                <label className='block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base'>Email</label>
                <input
                  type='email' name='email' required
                  value={form.email} onChange={handleChange}
                  placeholder='Enter your email'
                  className='w-full border border-gray-300 rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 outline-none transition'
                />
              </div>
              <div>
                <label className='block mb-1.5 font-semibold text-gray-700 text-sm sm:text-base'>Message</label>
                <textarea
                  name='message' required rows={5}
                  value={form.message} onChange={handleChange}
                  placeholder='Write your message here...'
                  className='w-full border border-gray-300 rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-300 outline-none transition resize-none'
                />
              </div>
              <button type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition text-sm sm:text-base'>
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className='space-y-4 sm:space-y-5'>
            {[
              { label: 'Email', value: 'ujjwal@gmail.com' },
              { label: 'Phone', value: '+91 8303201078' },
              { label: 'Address', value: 'Ayodhya, India' },
              { label: 'Hours', value: 'Mon - Fri: 9am - 6pm IST' },
            ].map((info) => (
              <div key={info.label} className='bg-white rounded-2xl shadow p-4 sm:p-5'>
                <p className='text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wide'>{info.label}</p>
                <p className='font-semibold text-gray-800 text-sm sm:text-base mt-1'>{info.value}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
