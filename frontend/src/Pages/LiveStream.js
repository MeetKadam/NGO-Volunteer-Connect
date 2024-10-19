import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const LiveStream = () => {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  let role_str = getUrlParams(window.location.href).get('role') || 'Host';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Audience'
      ? ZegoUIKitPrebuilt.Audience
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host) {
    sharedLinks.push({
      name: 'Join as audience',
      url: window.location.protocol + '//' +
        window.location.hostname + ':3000' + window.location.pathname +
        '?roomID=' +
        roomID +
        '&role=Audience',
    });
  }

  // Generate Kit Token
  const appID = 817546416; // Your App ID
  const serverSecret = '9d699eae47b63f3ca0c7bd57d14b9848'; // Your Server Secret
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

  // Use useRef to hold the DOM element
  const myLiveStreamRef = useRef();

  // Start the live stream
  useEffect(() => {
    const startLiveStream = async () => {
      try {
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        if (!zp || !zp.joinRoom) {
          throw new Error('joinRoom method is not available on ZegoUIKitPrebuilt object.');
        }

        // Start the live stream
        zp.joinRoom({
          container: myLiveStreamRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.LiveStreaming,
            config: {
              role,
              turnOnCameraWhenJoining: true,
              showMyCameraToggleButton: true,
              showAudioVideoSettingsButton: true,
              showScreenSharingButton: true,
              showTextChat: true,
              showUserList: true,
            },
          },
          sharedLinks,
        });
      } catch (error) {
        console.error('Error initializing live stream:', error.message);
      }
    };

    startLiveStream();
  }, [kitToken, role, sharedLinks]);

  return (
    <>
      <div
        className="liveStreamContainer"
        ref={myLiveStreamRef}
        style={{ width: '100vw', height: '100vh' }}
      ></div>
    </>
  );
};

export default LiveStream;
