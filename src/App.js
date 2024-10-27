import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Modal, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Helmet } from 'react-helmet';
import SocialShare from './SocialShare';
import VideoOverlay from './VideoOverlay';

const App = () => {
  const [showAd, setShowAd] = useState(true);
  const [countdown, setCountdown] = useState('');
  const [adLink, setAdLink] = useState('');
  const [viewers, setViewers] = useState(0);

  const adLinks = useMemo(() => [
    'https://s.shopee.com.my/9zg3Ov55S1',
    'https://s.shopee.com.my/AUcJzq3BR8',
    'https://s.shopee.com.my/AKItnX3om7',
    'https://s.shopee.com.my/8AEPDYC4Ai',
    'https://s.shopee.com.my/7zuz1FChVh'
  ], []);

  useEffect(() => {
    const randomLink = adLinks[Math.floor(Math.random() * adLinks.length)];
    setAdLink(randomLink);
  }, [adLinks]); // Include adLinks in the dependency array



  useEffect(() => {
    const ws = new WebSocket('wss://berita-viral.com:8080/ws');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setViewers(data.viewers);
    };

    return () => ws.close();
  }, []);


  // Countdown logic to match start time (6 PM Malaysia Time)
  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(20, 15, 0, 0); // 6:00 PM today

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetTime - now;

      if (difference <= 0) {
        setCountdown('The match has started!');
        clearInterval(interval);
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const handleCloseAd = () => {
    window.open(adLink, '_blank'); // Open random ad link
    setShowAd(false);
  };


  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Live Stream: Selangor vs JDT | Berita Viral</title>
        <meta name="description" content="Watch Selangor vs JDT live streaming. Stay updated with match info and exciting offers." />
        <meta property="og:title" content="Live Stream: Selangor vs JDT" />
        <meta property="og:description" content="Join the live stream and enjoy the exciting match!" />
        <link rel="canonical" href="https://jdt-live.netlify.app/" />
        <meta property="og:image" content="https://www.imghost.net/ib/Bbxzm7VQZpr41NP_1730014602.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <Container fluid className="App my-4 dark-mode">
        <h2 className="text-center">Live Stream: Selangor vs JDT</h2>


        {/* Video Player */}
        {/* <Row className="justify-content-center mb-4">
          <Col xs={12} md={8}>
            <ReactPlayer
              url="https://berita-viral.com/live/stream/index.m3u8"
              playing
              controls
              width="100%"
              height="100%" // Dynamic height
            />
          </Col>
        </Row> */}

        {/* <div style={{ position: 'relative', padding: '56.25% 0 0 0', height: 0 }}>
          <ReactPlayer
            url="https://berita-viral.com/live/stream/index.m3u8"
            className='react-player'
            width='100%'
            height='100%'
            controls={true} // Show controls
            style={{ position: 'absolute', top: 0, left: 0 }}
            playing // Automatically start playing
            config={{
              file: {
                attributes: {
                  crossOrigin: 'anonymous',
                },
              },
            }}
          />
        </div> */}



        {/* Use the VideoWithOverlay component */}
        <VideoOverlay viewers={viewers} /> {/* Pass viewer count as a prop */}

        {/* Add the Social Share Component */}
        <h4 className="text-center my-3">Share this match:</h4>
        <SocialShare title="Live Stream: Selangor vs JDT" url="https://jdt-live.netlify.app/" />

        {/* Match Details */}
        <Image
          src="https://www.imghost.net/ib/Bbxzm7VQZpr41NP_1730014602.jpg"
          alt="Match Preview"
          rounded
          className="my-3"
          fluid
          width="800vw"
        />

        <Row className="text-start mb-4" style={{ margin: '0 20%' }}>
          <h5>Info Siaran Langsung & Live Streaming:</h5>
          <p>
            <strong>Tarikh:</strong> 27 Oktober 2024 (Ahad)<br />
            <strong>Masa:</strong> 8.15 pm<br />
            <strong>Venue:</strong> Stadium MBPJ, Kelana Jaya
          </p>

          {/* Match Countdown */}
          <h4 className="text-center my-3">⏳ Time left until match: {countdown}</h4>




        </Row>

        {/* Ad Popup */}
        <Modal show={showAd} onHide={handleCloseAd} centered dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Shopee 11.11 Big Sale</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>90% OFF. Lowest Price Guaranteed. Free Shipping. No Min Spend. Check out this amazing deal! Click below to explore.</p>
            <Image src={`${process.env.PUBLIC_URL}/shopee1111.jpg`} fluid onClick={handleCloseAd} alt="Shopee Ad"
              style={{ width: '100%' }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseAd}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Visitor Counter & Popularity Nudge */}
        <h4 className="text-center my-3 py-2">👀  people are watching now!</h4>
      </Container>
    </>
  );
};

export default App;