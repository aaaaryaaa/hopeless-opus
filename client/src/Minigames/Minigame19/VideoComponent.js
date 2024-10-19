import React from 'react';

const VideoComponent = () => {
  return (
    <div style={styles.container}>
      <video width="600" controls autoPlay muted style={styles.video}>
        <source src="https://res.cloudinary.com/diswj8gya/video/upload/v1729342995/WhatsApp_Video_2024-10-19_at_17.02.43_xwhg89.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
  },
  video: {
    maxWidth: '100%', // Ensures responsiveness
  },
};

export default VideoComponent;