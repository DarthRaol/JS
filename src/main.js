// Import the necessary Camera Kit modules.
import {
  bootstrapCameraKit,
  createMediaStreamSource,
  Transform2D,
} from '@snap/camera-kit';

// Create an async function to initialize Camera Kit and start the video stream.
(async function() {
  // Bootstrap Camera Kit using your API token.
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM4MDYxMzI5LCJzdWIiOiJmMjIyZmZkMy1jZmM5LTQyNDYtYmNkZi1jZjE0YjVhN2U1NDB-U1RBR0lOR35iZGMzYTVkZi03NzYwLTQwNjEtYWIyOS1kYjRiNjFmYjkyNDIifQ.b5BvJlt0PJ74NR1tC8IvCLSE22biv8gBA4FpiHRJ9mU'
  });

  // Create a new CameraKit session.
  const session = await cameraKit.createSession();

  // Replace the `canvas` element with the live output from the CameraKit session.
  document.getElementById('canvas').replaceWith(session.output.live);

  // Load the specified lens group.
  const lens = await cameraKit.lensRepository.loadLens('f7c4c5d3-9d1f-481c-9348-f80aeab69673','daa500ca-e430-4c9b-b6f8-ad1d8643fdf9');


  // Get the user's media stream.
  // for back camera use { facingMode: "environment" } instead of { facingMode: "user" }
  let mediaStream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
  });

  // Create a CameraKit media stream source from the user's media stream.
  // for back camera use { cameraType: 'back' } instead of { cameraType: 'front' }
  // and remove transofrm property
  const source = createMediaStreamSource(
    mediaStream, {
      transform: Transform2D.MirrorX,
      cameraType: 'back'
    }
  );

  // Set the source of the CameraKit session.
  await session.setSource(source);

  // Set the render size of the CameraKit session to the size of the browser window.
  session.source.setRenderSize( window.innerWidth,  window.innerHeight);

  // Start the CameraKit session.
  session.play();
})();
