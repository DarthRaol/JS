// Import the necessary Camera Kit modules.
import {
  bootstrapCameraKit,
  createMediaStreamSource,
  Transform2D,
} from '@snap/camera-kit';

// Create an async function to initialize Camera Kit and start the video stream.
(async function () {
  // Bootstrap Camera Kit using your API token.
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM4MTc1MjUwLCJzdWIiOiIxYWU1NGE3Yi04ZDVhLTQ1YjYtOWMyMS0xMzU4YzQ0ZmIyYjN-U1RBR0lOR34wMDlmOTQ2Ni0zMGM5LTQzMzEtYjI0YS00NzFhNmZiNjJjMTMifQ.2B874RTDZOGERn6aEOJR9yYdBFTIrv8xygGAWLpn2CUnpm'
  });

  // Create a new CameraKit session.
  const session = await cameraKit.createSession();

  // Replace the `canvas` element with the live output from the CameraKit session.
  document.getElementById('canvas').replaceWith(session.output.live);

  // Apply the first lens in the lens group to the CameraKit session.
  let mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
  });

  // Create a CameraKit media stream source from the user's media stream.
  // for back camera use { cameraType: 'back' } instead of { cameraType: 'front' }
  // and remove transofrm property
  const source = createMediaStreamSource(
    mediaStream, {
   // transform: Transform2D.MirrorX,
    cameraType: 'back'
  }
  );

  // Set the source of the CameraKit session.
  await session.setSource(source);

  // Set the render size of the CameraKit session to the size of the browser window.
  session.source.setRenderSize(window.innerWidth, window.innerHeight);

  // Start the CameraKit session.
  session.play();

  const lens = await cameraKit.lensRepository.loadLens('73f3b4cb-55f8-4f6d-a47d-647ff5090db4');
  await session.applyLens(lens);
})();
