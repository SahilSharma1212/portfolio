<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sahil Sharma Portfolio Website</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background: #f5f5f5; }
    h1, h2, h3, h4 { color: #111; }
    code { background: #eee; padding: 2px 4px; border-radius: 4px; }
    pre { background: #eee; padding: 10px; border-radius: 6px; overflow-x: auto; }
    a { color: #0070f3; text-decoration: none; }
    a:hover { text-decoration: underline; }
    ul { margin-bottom: 20px; }
    section { margin-bottom: 40px; }
    img { max-width: 100%; border-radius: 8px; margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Sahil Sharma Portfolio Website</h1>
  <p>A modern <strong>personal portfolio website</strong> built with <strong>Next.js</strong>, <strong>TailwindCSS</strong>, <strong>Framer Motion</strong>, <strong>React Hot Toast</strong>, and <strong>Resend API</strong>. This project showcases a responsive <strong>Contact Section</strong> with email functionality and a <strong>Footer Section</strong> with social links and newsletter subscription.</p>

  <section>
    <h2>Features</h2>

    <h3>Contact Section</h3>
    <ul>
      <li>Fully responsive contact form</li>
      <li>Sends messages directly to email using <strong>Resend API</strong></li>
      <li>Form validation for email and message</li>
      <li><strong>React Hot Toast</strong> notifications for success or error</li>
      <li>Built with <strong>Framer Motion</strong> animations and <strong>TailwindCSS</strong> styling</li>
    </ul>

    <h3>Footer Section</h3>
    <ul>
      <li>Separate footer with branding and social links</li>
      <li>Newsletter subscription integrated with <strong>Resend API</strong></li>
      <li>Clean and minimal <strong>TailwindCSS</strong> layout</li>
      <li>Optional email subscription with <strong>success/error toasts</strong></li>
      <li>Mobile-friendly grid layout</li>
    </ul>

    <h3>Tech Stack</h3>
    <ul>
      <li><strong>Next.js</strong> – React framework for server-side rendering</li>
      <li><strong>TailwindCSS</strong> – Utility-first CSS framework for styling</li>
      <li><strong>Framer Motion</strong> – For subtle animations and transitions</li>
      <li><strong>React Hot Toast</strong> – For showing success/error notifications</li>
      <li><strong>Resend API</strong> – To send emails programmatically</li>
      <li><strong>Lucide React</strong> – Icons for social links and UI elements</li>
    </ul>
  </section>

  <section>
    <h2>Screenshots</h2>
    <p><strong>Contact Section</strong></p>
    <img src="link-to-screenshot" alt="Contact Section Screenshot">
    <p><strong>Footer Section</strong></p>
    <img src="link-to-screenshot" alt="Footer Section Screenshot">
  </section>

  <section>
    <h2>Installation</h2>
    <ol>
      <li>Clone the repository:
        <pre><code>git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website</code></pre>
      </li>
      <li>Install dependencies:
        <pre><code>npm install
# or
yarn install</code></pre>
      </li>
      <li>Create a <code>.env</code> file and add your Resend API key:
        <pre><code>NEXT_PUBLIC_RESEND_API_KEY=your_resend_api_key</code></pre>
      </li>
      <li>Run the development server:
        <pre><code>npm run dev
# or
yarn dev</code></pre>
      </li>
    </ol>
    <p>Open <a href="http://localhost:3000">http://localhost:3000</a> to view it in the browser.</p>
  </section>

  <section>
    <h2>Usage</h2>
    <ul>
      <li>Fill in the contact form and submit to send an email</li>
      <li>Subscribe to the newsletter from the footer</li>
      <li>Click social icons to visit your social profiles</li>
    </ul>
  </section>

  <section>
    <h2>Folder Structure</h2>
    <pre><code>
/app
  |_ _components
       |_ ContactSection.tsx
       |_ FooterSection.tsx
       |_ email-template.tsx
    </code></pre>
    <ul>
      <li><code>ContactSection.tsx</code> – The contact form component</li>
      <li><code>FooterSection.tsx</code> – The footer with social links and newsletter</li>
      <li><code>email-template.tsx</code> – React component used as the email body template for Resend</li>
    </ul>
  </section>

  <section>
    <h2>Customization</h2>
    <ul>
      <li>Update <code>socialLinks</code> array in <code>FooterSection.tsx</code> with your own social profiles</li>
      <li>Update email recipient in <code>ContactSection.tsx</code> and <code>FooterSection.tsx</code></li>
      <li>Change styling in TailwindCSS classes according to your theme</li>
    </ul>
  </section>

  <section>
    <h2>License</h2>
    <p>This project is open source and available under the <strong>MIT License</strong>.</p>
  </section>

  <section>
    <h2>GitHub Description</h2>
    <p>A sleek, modern personal portfolio website built with Next.js, TailwindCSS, Framer Motion, React Hot Toast, and Resend API. Includes a contact form with email notifications and a footer with social links and newsletter subscription.</p>
  </section>
</body>
</html>
