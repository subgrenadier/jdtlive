import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Image, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Helmet } from 'react-helmet';
import SocialShare from './SocialShare';
import VideoPlayer from './VideoPlayer.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [showAd, setShowAd] = useState(true);
  const [adLink, setAdLink] = useState('');
  const [videoHeight, setVideoHeight] = useState('500px'); // Default height for video

  const adLinks = useMemo(() => [
    'https://s.shopee.com.my/40PnWOLWnN',
    'https://s.shopee.com.my/4VM47JJcmU',
    'https://s.shopee.com.my/4L2dv0KG7T',
    'https://s.shopee.com.my/qSlkZXaDo'
  ], []);

  useEffect(() => {
    const randomLink = adLinks[Math.floor(Math.random() * adLinks.length)];
    setAdLink(randomLink);
  }, [adLinks]); // Include adLinks in the dependency array


  const handleCloseAd = () => {
    window.open(adLink, '_blank'); // Open random ad link
    setShowAd(false);
  };

  // Adjust video height based on screen orientation and size
  const updateVideoHeight = () => {
    const aspectRatio = 9 / 16; // 16:9 aspect ratio
    if (window.innerHeight > window.innerWidth) {
      // Portrait mode: Height is adjusted to fit the width based on aspect ratio
      setVideoHeight(`${window.innerWidth * aspectRatio}px`);
    } else {
      // Landscape mode: Default height
      setVideoHeight('500px');
    }
  };

  useEffect(() => {
    updateVideoHeight(); // Set the height initially
    window.addEventListener('resize', updateVideoHeight); // Listen for window resize events

    return () => window.removeEventListener('resize', updateVideoHeight); // Cleanup event listener
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Live Stream: JDT FC vs Buriram United FC | Berita Viral</title>
        <meta name="description" content="Watch JDT FC vs Buriram United FC live streaming. Stay updated with match info and exciting offers." />
        <meta property="og:title" content="Live Stream: JDT FC vs Buriram United FC" />
        <meta property="og:description" content="Join the live stream and enjoy the exciting match!" />
        <link rel="canonical" href="https://jdtlive.netlify.app/" />
        <meta property="og:image" content="https://i.ytimg.com/vi/C1oue5778GY/hq720.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <Container fluid className="dark-mode">
        <h2 className="text-center">Live Stream: JDT FC vs Buriram United FC</h2>


        {/* Video Player */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={8}>
            <VideoPlayer height={videoHeight} url="https://berita-viral.com/live/buriram/index.m3u8" />
          </Col>
        </Row>

        <Row className="text-start mb-4" style={{ margin: '0 10%' }}>

          {/* Add the Social Share Component */}
          <h4 className="text-center my-3">Share this match:</h4>
          <SocialShare title="Live Stream: JDT FC vs Buriram United FC" url="https://jdtlive.netlify.app/" />

          <div className="info-container" style={{ marginTop: '10em' }}>
            <h5>Info Siaran Langsung & Live Streaming:</h5>
            <p>
              <strong>Tarikh:</strong> 3 Disember 2024 (Selasa)<br />
              <strong>Masa:</strong> 8.00 pm<br />
              <strong>Venue:</strong> Stadium Sultan Ibrahim, Iskandar Puteri
            </p>
          </div>

        </Row>

        {/* Ad Popup */}
        <Modal show={showAd} onHide={handleCloseAd} centered dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Shopee 12.12 Birthday Sale</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Shopee Live 90% OFF. Lowest Price Guaranteed. Free Shipping. No Min Spend. Check out this amazing deal! Click below to explore.</p>
            <Image src={`${process.env.PUBLIC_URL}/shopee1212.jpeg`} fluid onClick={handleCloseAd} alt="Shopee Ad"
              style={{ width: '100%' }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseAd}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>


      </Container>
    </>
  );
};

export default App;