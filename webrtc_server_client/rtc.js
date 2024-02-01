"use strict";

let localVideo = document.getElementById("localVideo");
let remoteVideo = document.getElementById("remoteVideo");
let isInitiator = false;
let isChannelReady = false;
let isStarted = false;
let localStream;
let remoteStream;
let pc;

const enterRoom = document.getElementById("enterRoom");
const call = document.getElementById("call");
call.hidden = true;

let pcConfig = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

//let room = "foo";

let socket = io.connect();

/*
if (room !== "") {
  socket.emit("create or join", room);
  console.log("Attempted to create or join Room", room);
}
*/

const enterRoomButton = document.querySelector("button#enterRoombutton");
let roomName;
let roomPassword;

function startMedia() {
  enterRoom.hidden = true;
  call.hidden = false;
  //getMedia();

  /*
  socket.emit("create or join", roomName);
  console.log("Attempted to create or join Room", roomName);
  */

  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then(gotStream)
    .catch((error) => console.error(error));
}

enterRoomButton.addEventListener("click", (event) => {
  event.preventDefault(); // 이벤트 기본 동작을 막음(새로고침 방지)

  const roomNameInput = document.getElementById("enterRoomName");
  const roomPasswordInput = document.getElementById("enterRoomPassword");

  console.log("Name:", roomNameInput.value, "Password:", roomPasswordInput.value);
  roomName = roomNameInput.value.trim();
  roomPassword = roomPasswordInput.value.trim();
  try {
    socket.emit("join_room", roomName, roomPassword, startMedia);
  } catch (error) {
    console.log(error);
  }
  roomNameInput.value = "";
  roomPasswordInput.value = "";
});

// 다른 사람이 입장할때 Socket code
socket.on("welcome", () => {
  console.log("someone joined");
});
///////////////////////////////////////////////////

socket.on("created", (room, id) => {
  console.log("Created room" + room + "socket ID : " + id);
  isInitiator = true;
});

socket.on("full", (room) => {
  console.log("Room " + room + "is full");
});

socket.on("join", (room) => {
  console.log("Another peer made a request to join room" + room);
  console.log("This peer is the initiator of room" + room + "!");
  isChannelReady = true;
});

socket.on("joined", (room) => {
  console.log("joined : " + room);
  isChannelReady = true;
});
socket.on("log", (array) => {
  console.log.apply(console, array);
});

socket.on("message", (message) => {
  console.log("Client received message :", message);
  if (message === "got user media") {
    maybeStart();
  } else if (message.type === "offer") {
    if (!isInitiator && !isStarted) {
      maybeStart();
    }
    pc.setRemoteDescription(new RTCSessionDescription(message));
    doAnswer();
  } else if (message.type === "answer" && isStarted) {
    pc.setRemoteDescription(new RTCSessionDescription(message));
  } else if (message.type === "candidate" && isStarted) {
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate,
    });

    pc.addIceCandidate(candidate);
  }
});

function sendMessage(message) {
  console.log("Client sending message: ", message);
  socket.emit("message", message);
}

/*
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: false,
  })
  .then(gotStream)
  .catch((error) => console.error(error));
  */

function gotStream(stream) {
  console.log("Adding local stream");
  localStream = stream;
  localVideo.srcObject = stream;
  sendMessage("got user media");
  if (isInitiator) {
    maybeStart();
  }
}

function createPeerConnection() {
  try {
    pc = new RTCPeerConnection(null);
    pc.onicecandidate = handleIceCandidate;
    pc.onaddstream = handleRemoteStreamAdded;
    console.log("Created RTCPeerConnection");
  } catch (e) {
    alert("connot create RTCPeerConnection object");
    return;
  }
}

function handleIceCandidate(event) {
  console.log("iceCandidateEvent", event);
  if (event.candidate) {
    sendMessage({
      type: "candidate",
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate,
    });
  } else {
    console.log("end of candidates");
  }
}

function handleCreateOfferError(event) {
  console.log("createOffer() error: ", event);
}

function handleRemoteStreamAdded(event) {
  console.log("remote stream added");
  remoteStream = event.stream;
  remoteVideo.srcObject = remoteStream;
}

function maybeStart() {
  console.log(">>MaybeStart() : ", isStarted, localStream, isChannelReady);
  if (!isStarted && typeof localStream !== "undefined" && isChannelReady) {
    console.log(">>>>> creating peer connection");
    createPeerConnection();
    pc.addStream(localStream);
    isStarted = true;
    console.log("isInitiator : ", isInitiator);
    if (isInitiator) {
      doCall();
    }
  } else {
    console.error("maybeStart not Started!");
  }
}

function doCall() {
  console.log("Sending offer to peer");
  pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
}

function doAnswer() {
  console.log("Sending answer to peer");
  pc.createAnswer().then(setLocalAndSendMessage, onCreateSessionDescriptionError);
}

function setLocalAndSendMessage(sessionDescription) {
  pc.setLocalDescription(sessionDescription);
  sendMessage(sessionDescription);
}

function onCreateSessionDescriptionError(error) {
  console.error("Falied to create session Description", error);
}

// 녹화 관련 내용
// 버튼과 코덱 변수 할당
const codecPreferences = document.querySelector("#codecPreferences");

const errorMsgElement = document.querySelector("span#errorMsg");
const recordedVideo = document.querySelector("video#recorded");
const recordButton = document.querySelector("button#record");

let mediaRecorder;
let recordedBlobs;

// 녹화 관련 함수들 01-11
function handleDataAvailable(event) {
  console.log("handleDataAvailable", event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function getSupportedMimeTypes() {
  const possibleTypes = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm;codecs=h264,opus",
    "video/mp4;codecs=h264,aac",
    "video/webm;codecs=av01,opus",
  ];
  return possibleTypes.filter((mimeType) => {
    return MediaRecorder.isTypeSupported(mimeType);
  });
}

function startRecording() {
  recordedBlobs = [];
  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value;
  const options = { mimeType };

  try {
    mediaRecorder = new MediaRecorder(localStream, options);
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }

  console.log("Created MediaRecorder", mediaRecorder, "with options", options);
  recordButton.textContent = "Stop Recording";
  playButton.disabled = true;
  downloadButton.disabled = true;
  codecPreferences.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log("Recorder stopped: ", event);
    console.log("Recorded Blobs: ", recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log("MediaRecorder started", mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
}

function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log("getUserMedia() got stream:", stream);
  window.stream = stream;

  const gumVideo = document.querySelector("video#localVideo");
  gumVideo.srcObject = stream;

  getSupportedMimeTypes().forEach((mimeType) => {
    const option = document.createElement("option");
    option.value = mimeType;
    option.innerText = option.value;
    codecPreferences.appendChild(option);
  });
  codecPreferences.disabled = false;
}

// 녹화 관련 내용 01-11
recordButton.addEventListener("click", (event) => {
  event.preventDefault(); // 이벤트 기본 동작을 막음(새로고침 방지)

  if (recordButton.textContent === "Start Recording") {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = "Start Recording";
    playButton.disabled = false;
    downloadButton.disabled = false;
    codecPreferences.disabled = false;
  }
});

const playButton = document.querySelector("button#play"); // playButton 이벤트 리스너 설정
playButton.addEventListener("click", (event) => {
  event.preventDefault(); // 이벤트 기본 동작을 막음(새로고침 방지)

  const mimeType = codecPreferences.options[codecPreferences.selectedIndex].value.split(";", 1)[0];
  const superBuffer = new Blob(recordedBlobs, { type: mimeType });
  recordedVideo.src = null; // 이전 소스 제거
  recordedVideo.srcObject = null; // 이전에 설정된 미디어 스트림 객체 제거
  recordedVideo.src = window.URL.createObjectURL(superBuffer); // Blob 객체를 메모리에 저장된 파일과 연결된 URL로 변경
  recordedVideo.controls = true; // 컨트롤을 표시하도록 함
  recordedVideo.play();
});

const downloadButton = document.querySelector("button#download");
downloadButton.addEventListener("click", (event) => {
  event.preventDefault(); // 이벤트 기본 동작을 막음(새로고침 방지)

  const blob = new Blob(recordedBlobs, { type: "video/webm" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "test.webm";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
});

async function init(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    console.error("navigator.getUserMedia error:", e);
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

document.querySelector("button#start").addEventListener("click", async (event) => {
  event.preventDefault(); // 이벤트 기본 동작을 막음(새로고침 방지)

  console.log("Start camera click");
  document.querySelector("button#start").disabled = true;
  const hasEchoCancellation = document.querySelector("#echoCancellation").checked;
  const constraints = {
    audio: {
      echoCancellation: { exact: hasEchoCancellation },
    },
    video: {
      width: 1280,
      height: 720,
    },
  };

  console.log("Using media constraints:", constraints);
  await init(constraints);
});
