import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
//const socket = io("http://localhost:8080");

import axios from "axios";

function VideoConsulting() {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isChannelReady, setIsChannelReady] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  //const [pc, setPc] = useState(null);
  let pc;

  //const socket = io.connect("http://localhost:8080");

  let pcConfig = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  let room = "foo";

  //let socket = io.connect("http://localhost:8080");

  let socket;

  useEffect(() => {
    socket = io.connect("http://localhost:8081");

    /*
    if (room !== "") {
      socket.emit("create or join", room);
      console.log("Attempted to create or join Room", room);
    }
    */

    let myUser;

    axios
      .get("http://localhost:8080/auth")
      .then((response) => {
        myUser = response.data;
        console.log("응답 데이터: ", myUser);
        //console.log("auth: ", auth);
      })
      .catch((error) => {
        console.error("에러: ", error);
      });

    axios
      .get("http://localhost:8080/search")
      .then((response) => {
        const data = response.data; // 응답 데이터를 변수에 저장
        console.log(data); // 받은 데이터를 콘솔에 출력하거나 필요한 처리를 수행
        data.forEach((item) => {
          console.log(item);
          console.log("id: " + item.id);
          console.log("password: " + item.password);
          console.log("token: " + item.token);

          if (myUser.userID === item.id) {
            console.log("myuserName: " + item.id);
            //socket.emit("join_room", item.ROOM_NAME, roomPassword, startMedia);
            socket.emit("join_room", myUser.userID);
          }
        });
      })
      .catch((error) => {
        console.error("There was an error!", error); // 에러 처리
      });

    socket.on("created", (room, id) => {
      console.log("Created room" + room + " socket ID : " + id);
      setIsInitiator(true);
    });

    socket.on("full", (room) => {
      console.log("Room " + room + "is full");
    });

    socket.on("join", (room) => {
      console.log("Another peer made a request to join room" + room);
      console.log("This peer is the initiator of room" + room + "!");
      setIsChannelReady(true);
      console.error("now isChannelReady: " + isChannelReady);
    });

    socket.on("joined", (room) => {
      console.log("joined : " + room);
      setIsChannelReady(true);
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

    return () => {
      console.log("Component unmounted");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(gotStream)
      .catch((error) => console.error(error));
  }, []);

  function sendMessage(message) {
    console.log("Client sending message: ", message);
    socket.emit("message", message);
  }

  function gotStream(stream) {
    console.log("Adding local stream");
    setLocalStream(stream); // localStream 상태를 설정함
    ////////////////
    console.log("gotStream: " + localStream);
    //////////////////////
    localVideo.current.srcObject = stream; // localVideo.current를 통해 DOM 엘리먼트에 접근하여 속성을 변경함
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
    setRemoteStream(event.stream);
    remoteVideo.current.srcObject = remoteStream;
  }

  function maybeStart() {
    console.log(">>MaybeStart() : ", isStarted, localStream, isChannelReady);
    if (!isStarted && typeof localStream !== "undefined" && isChannelReady) {
      console.log(">>>>> creating peer connection");
      createPeerConnection();
      pc.addStream(localStream);
      setIsStarted(true);
      console.log("isInitiator : ", isInitiator);
      if (isInitiator) {
        doCall();
      }
    } else {
      console.error("maybeStart not Started!");
      console.error("!isStarted: " + !isStarted);
      console.error("typeof localStream !== undefined: " + typeof localStream);
      console.error("isChannelReady: " + isChannelReady);
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

  return (
    <section className="video">
      <div className="myVideo">
        <h2>내 화면</h2>
        <video autoPlay ref={localVideo} playsInline={true}></video>
      </div>
      <div className="youVideo">
        <h2>상대 화면</h2>
        <video autoPlay ref={remoteVideo} playsInline={true}></video>
      </div>
    </section>
  );
}

export default VideoConsulting;
