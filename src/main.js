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
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM4MTgyNDgzLCJzdWIiOiIwOWI2MjMyNy1lMGI5LTQ5NGYtYmYxNC0zZmUzNWYzYzVkNzF-U1RBR0lOR345MTY5MDdjNy1iNmExLTQ2ZjAtYTU1My1kZjczZDlkZDM3YjYifQ.ecVDtM5HCBvKRWwSYroITuyQrqOkYVgTStBsiaHMxCc'
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

  const lens = await cameraKit.lensRepository.loadLens('d63acbbc-cb72-4648-b4b6-7b9fd731b645','6a06dcdd-79f3-4e99-a9d9-a0ddcf4fb42e');
  await session.applyLens(lens);
})();



setTimeout(() => {
  let displayElement = document.getElementById("blocker");
  displayElement.style.display = "inline";

  displayElement.onclick = function() {
    window.open("https://mohitj9.sg-host.com/beta/arscene/pages/rewardPage.html"); // Opens link in a new tab
};
}, 15000); // 10000ms = 10 seconds
