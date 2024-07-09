import React from 'react';

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    margin: 0,
    padding: 0,
    backgroundColor: '#FF4500', // Orange-red background color
    color: '#333',
  },
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    overflow: 'hidden',
    padding: '20px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    padding: '20px',
    borderBottom: '2px solid #FF4500', // Orange-red border color
    textAlign: 'center',
  },
  headerH1: {
    margin: 0,
    fontSize: '2em',
    color: '#FF4500', // Orange-red text color
  },
  section: {
    padding: '20px',
    borderBottom: '1px solid #ddd',
  },
  lastSection: {
    padding: '20px',
  },
  sectionH2: {
    margin: '0 0 10px',
    fontSize: '1.5em',
    color: '#FF4500', // Orange-red text color
  },
  p: {
    margin: '10px 0',
  },
  strong: {
    color: '#FF4500', // Orange-red text color
  },
  footer: {
    padding: '20px',
    textAlign: 'center',
    background: '#FF4500', // Orange-red background color
    color: '#fff',
    borderTop: '2px solid #FF4500', // Orange-red border color
  },
  footerH2: {
    margin: '0 0 10px',
    fontSize: '1.5em',
  },
  footerP: {
    margin: '10px 0',
  },
  footerA: {
    color: '#fff',
    textDecoration: 'none',
  },
  footerAHover: {
    textDecoration: 'underline',
  }
};

const PP = () => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.headerH1}>Campus Express Terms and Policies</h1>
          <p>Welcome to Campus Express, an e-commerce platform designed specifically for students living on campus in Nigeria. To ensure a secure, fair, and reliable marketplace, we have established the following terms and policies based on Nigerian legal frameworks. By using Campus Express, you agree to comply with these terms and policies.</p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionH2}>1. General Principles</h2>
          <p style={styles.p}><strong style={styles.strong}>1.1 User Eligibility:</strong> Only registered students residing on campus are eligible to use Campus Express. Verification of student status and campus residency may be required.</p>
          <p style={styles.p}><strong style={styles.strong}>1.2 Acceptance of Terms:</strong> By registering and using Campus Express, you agree to abide by these terms and policies, as well as any updates or modifications.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionH2}>2. Consumer Rights and Protection</h2>
          <p style={styles.p}><strong style={styles.strong}>2.1 Consumer Protection Act, 2019:</strong> Campus Express is committed to protecting your consumer rights. We ensure transparency, accuracy of product information, and protection against unfair trade practices.</p>
          <p style={styles.p}><strong style={styles.strong}>2.2 Dispute Resolution:</strong> Any disputes arising from transactions on Campus Express will be handled in accordance with the Consumer Protection Act, 2019, and through our internal dispute resolution mechanisms.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionH2}>3. Data Privacy and Security</h2>
          <p style={styles.p}><strong style={styles.strong}>3.1 Nigerian Data Protection Regulation (NDPR), 2019:</strong> We prioritize your data privacy and comply with the NDPR. Your personal data will be processed lawfully, fairly, and transparently.</p>
          <p style={styles.p}><strong style={styles.strong}>3.2 Data Subject Rights:</strong> You have the right to access, correct, and delete your personal data. You also have the right to data portability and to restrict or object to certain data processing activities.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionH2}>4. Electronic Transactions and Contracts</h2>
          <p style={styles.p}><strong style={styles.strong}>4.1 Electronic Transactions Bill:</strong> Transactions on Campus Express are governed by the principles of the Electronic Transactions Bill. Electronic contracts formed on our platform are legally binding.</p>
          <p style={styles.p}><strong style={styles.strong}>4.2 Electronic Signatures:</strong> We recognize and accept electronic signatures for the authentication of transactions and agreements.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionH2}>5. Cybersecurity and Fraud Prevention</h2>
          <p style={styles.p}><strong style={styles.strong}>5.1 Cybercrimes (Prohibition, Prevention, etc.) Act, 2015:</strong> We take cybersecurity seriously and implement measures to prevent fraud, identity theft, and other cybercrimes.</p>
          <p style={styles.p}><strong style={styles.strong}>5.2 User Responsibilities:</strong> Users are responsible for maintaining the confidentiality of their account information and for all activities conducted under their accounts.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionH2}>6. Communications and Payments</h2>
          <p style={styles.p}><strong style={styles.strong}>6.1 Nigerian Communications Act, 2003:</strong> Our platform complies with the regulations governing electronic communications, ensuring reliable and secure connectivity for transactions.</p>
          <p style={styles.p}><strong style={styles.strong}>6.2 Central Bank of Nigeria (CBN) Guidelines:</strong> All electronic payments on Campus Express are processed in compliance with CBN guidelines, ensuring secure and efficient payment systems.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionH2}>7. Fair Business Practices</h2>
          <p style={styles.p}><strong style={styles.strong}>7.1 Federal Competition and Consumer Protection Commission (FCCPC):</strong> We adhere to the standards set by the FCCPC, promoting fair competition and preventing anti-competitive practices.</p>
          <p style={styles.p}><strong style={styles.strong}>7.2 Seller Responsibilities:</strong> Sellers on Campus Express must provide accurate product descriptions, fair pricing, and comply with all applicable laws and regulations.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionH2}>8. Amendments and Updates</h2>
          <p style={styles.p}><strong style={styles.strong}>8.1 Policy Changes:</strong> Campus Express reserves the right to amend these terms and policies as needed. Users will be notified of any significant changes.</p>
          <p style={styles.p}><strong style={styles.strong}>8.2 User Agreement:</strong> Continued use of Campus Express constitutes acceptance of any amended terms and policies.</p>
        </section>

        <section style={styles.lastSection}>
          <h2 style={styles.sectionH2}>9. Return and Refund Policy</h2>
          <p style={styles.p}><strong style={styles.strong}>9.1 Returns:</strong> Products can be returned within 14 days of receipt if they are defective, damaged, or not as described. To initiate a return, contact our customer support team.</p>
          <p style={styles.p}><strong style={styles.strong}>9.2 Refunds:</strong> Refunds will be processed within 7-10 business days after we receive and inspect the returned product. Refunds will be issued to the original payment method used during purchase.</p>
          <p style={styles.p}><strong style={styles.strong}>9.3 Conditions:</strong> Products must be returned in their original packaging and condition. Items that show signs of wear or have been altered will not be eligible for a refund.</p>
        </section>

        <footer style={styles.footer}>
          <h2 style={styles.footerH2}>Contact Information</h2>
          <p style={styles.footerP}>For any inquiries, concerns, or disputes, please contact our customer support team at <a href="mailto:support@campusexpress.ng" style={styles.footerA}>support@campusexpress.ng</a>.</p>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndPolicies;
