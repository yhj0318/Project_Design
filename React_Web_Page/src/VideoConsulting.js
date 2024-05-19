import React, { useState, useEffect, useRef } from "react";
import "./VideoConsulting.css";
import axios from "axios";
import io from "socket.io-client";
//let socket = io.("http://localhost:8080");
let socket = io.connect("http://localhost:8081");

function VideoConsulting() {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const [isInitiator, setIsInitiator] = useState(false);
  //let isInitiator;
  const [isChannelReady, setIsChannelReady] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  //let isStarted;
  //let localStream;
  const [localStream, setlocalstream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  //let pc;

  const pc = useRef(null);

  const initialRender = useRef(true);

  const [startthirduseEffect1, setstartthirduseEffect1] = useState(null);
  function startthirduseEffect() {
    console.log("333333333333333333333333");
    setstartthirduseEffect1(1);
  }
  const [startoffer1, setstartoffer] = useState(null);
  const [startanswer1, setstartanswer] = useState(null);
  const [startcandidate1, setstartcandidate] = useState(null);
  const [message, setMessage] = useState(null);
  const [startsendmessage, setstartsendmessage] = useState(null);

  function startoffer(message) {
    setstartoffer(message);
  }

  function startanswer(message) {
    setstartanswer(message);
  }

  function startcandidate(message) {
    setstartcandidate(message);
  }

  const [startdoAnswer1, setstartdoAnswer1] = useState(null);
  function startdoAnswer() {
    console.log("startdoAnswer####################");
    setstartdoAnswer1(true);
  }

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      console.log("return startdoAnswer");
      return;
    }

    doAnswer();
  }, [startdoAnswer1]);

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      return;
    }

    if (!isInitiator && !isStarted) {
      maybeStart();
      //startthirduseEffect(1);
    }
    console.log("startoffer@@@@@@@@@@@@@@@@@@@");
    pc.current.setRemoteDescription(new RTCSessionDescription(startoffer1));
    doAnswer();
    //startdoAnswer();
  }, [startoffer1]);

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      return;
    }

    pc.current.setRemoteDescription(new RTCSessionDescription(startanswer1));
    //doAnswer();
  }, [startanswer1]);

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      console.log("return@@@@@@@@");
      return;
    }

    console.log("startcandidate@@@@@@@@@@@@@@@@@");

    const candidate = new RTCIceCandidate({
      sdpMLineIndex: startcandidate1.label,
      candidate: startcandidate1.candidate,
    });

    pc.current.addIceCandidate(candidate);
  }, [startcandidate1]);

  useEffect(() => {
    socket.on("log", (array) => {
      console.log.apply(console, array);
    });

    socket.on("created", (room, id) => {
      console.log("Created room " + room + " socket ID : " + id);
      setIsInitiator(true);
    });

    socket.on("message", (message) => {
      console.log("Client received message :", message);
      //setMessage(message);
      if (message === "got user media") {
        //maybeStart();
        console.log("got user media 받음");
        //startthirduseEffect();
        setstartthirduseEffect1(true);
      } else if (message.type === "offer") {
        console.log("offer 받음");
        /*
        if (!isInitiator && !isStarted) {
          //maybeStart();
          startthirduseEffect(1);
        }
        pc.setRemoteDescription(new RTCSessionDescription(message));
        doAnswer();*/
        startoffer(message);
      } else if (message.type === "answer" && isStarted) {
        //pc.setRemoteDescription(new RTCSessionDescription(message));
        console.log("answer 받음");
        startanswer(message);
      } else if (message.type === "candidate" && isStarted) {
        /*
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate,
        });

        pc.addIceCandidate(candidate);*/
        console.log("candidate 받음");
        startcandidate(message);
      }
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

    socket.on("full", (room) => {
      console.log("Room " + room + "is full");
    });
  }, [socket, isStarted]);
  /*

  useEffect(() => {
    if (!socket) return;

    let myUser;

    console.log("start server");
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

    initialRender.current = false;
    startseconduseEffect();
  }, []);*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authResponse = await axios.get("http://localhost:8080/auth");
        const myUser = authResponse.data;
        console.log("응답 데이터: ", myUser);

        const searchResponse = await axios.get("http://localhost:8080/search");
        const data = searchResponse.data;
        console.log(data);

        data.forEach((item) => {
          console.log(item);
          console.log("id: " + item.id);
          console.log("password: " + item.password);
          console.log("token: " + item.token);

          if (myUser.userID === item.id) {
            console.log("myuserName: " + item.id);
            socket.emit("join_room", myUser.userID, startseconduseEffect);
          }
        });

        //initialRender.current = false;
        //startseconduseEffect();
      } catch (error) {
        console.error("에러: ", error);
      }
    };
    if (!socket) return;

    let myUser;

    console.log("start server");

    fetchData();
    //startseconduseEffect();
  }, []);

  const [startseconduseEffect1, setstartseconduseEffect] = useState(null);
  function startseconduseEffect() {
    console.log("22222222222222222222222222222");
    initialRender.current = false;
    setstartseconduseEffect(1);
  }

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      return;
    }

    console.log("start stream");
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(gotStream)
      .catch((error) => console.error(error));
  }, [startseconduseEffect1]);

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      console.log("return in startthirduseEffect1");
      return;
    }

    console.log("startthirduseEffect");
    maybeStart();
  }, [startthirduseEffect1]);

  const [startgotstream1, setstartgotstream1] = useState(null);
  function startgotstream() {
    setstartgotstream1(true);
  }
  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      console.log("return in startgotstream1");
      return;
    }

    console.log("Adding local stream");
    console.log("stream: " + startgotstream1);
    setlocalstream(startgotstream1);
    //console.log("gotStream: " + localStream);
    localVideo.current.srcObject = startgotstream1;
    sendMessage("got user media");
    if (isInitiator) {
      //maybeStart();
      startthirduseEffect();
    }
  }, [startgotstream1]);
  function gotStream(stream) {
    setstartgotstream1(stream);
    /*
    console.log("Adding local stream");
    console.log("stream: " + stream);
    setlocalstream(stream);
    //console.log("gotStream: " + localStream);
    localVideo.current.srcObject = stream;
    sendMessage("got user media");
    if (isInitiator) {
      //maybeStart();
      startthirduseEffect();
    }*/
  }

  function sendMessage(message) {
    //setstartsendmessage(true);
    console.log("Client sending message: ", message);
    socket.emit("message", message);
  }

  const [startdocall1, setstartdocall] = useState(null);
  function startdocall() {
    setstartdocall(1);
  }

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      return;
    }

    console.log("isInitiator!!!!: " + isInitiator);
    if (isInitiator) {
      console.log("start docall@@@@@@@@@@@@@@@@@@@@@@@");
      doCall();
    }
  }, [startdocall1]);

  function maybeStart() {
    console.log(">>MaybeStart() : ", isStarted, localStream, isChannelReady);
    if (!isStarted && typeof localStream !== "undefined" && isChannelReady) {
      console.log(">>>>> creating peer connection");
      createPeerConnection();
      pc.current.addStream(localStream);
      setIsStarted(true);
      console.log("isInitiator : ", isInitiator);

      if (isInitiator) {
        console.log("start docall@@@@@@@@@@@@@@@@@@@@@@@");
        doCall();
      }
    } else {
      console.error("maybeStart not Started!");
      console.error("!isStarted: " + !isStarted);
      console.error("typeof localStream !== undefined: " + typeof localStream);
      console.error("isChannelReady: " + isChannelReady);
    }
  }

  function createPeerConnection() {
    try {
      pc.current = new RTCPeerConnection(null);
      pc.current.onicecandidate = handleIceCandidate;
      pc.current.onaddstream = handleRemoteStreamAdded;
      console.log("Created RTCPeerConnection");
    } catch (e) {
      alert("connot create RTCPeerConnection object");
      return;
    }
  }

  function handleIceCandidate(event) {
    console.log("iceCandidateEvent", event);
    if (event.candidate) {
      console.log("working handleIceCandidate@@@@@@@@@@");
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
    //remoteVideo.current.srcObject = remoteStream;
  }

  useEffect(() => {
    remoteVideo.current.srcObject = remoteStream;
  }, [remoteStream]);

  function doCall() {
    console.log("Sending offer to peer");
    pc.current.createOffer(setLocalAndSendMessage, handleCreateOfferError);
  }

  function doAnswer() {
    console.log("Sending answer to peer");
    pc.current.createAnswer().then(setLocalAndSendMessage, onCreateSessionDescriptionError);
  }

  function setLocalAndSendMessage(sessionDescription) {
    pc.current.setLocalDescription(sessionDescription);
    sendMessage(sessionDescription);
  }

  function onCreateSessionDescriptionError(error) {
    console.error("Falied to create session Description", error);
  }

  const [buttonText, setButtonText] = useState("음소거");
  const texts = ["음소거", "음소거 해제"];
  const [buttonText1, setButtonText1] = useState("화면 가리기");
  const texts1 = ["화면 가리기", "화면 보이기"];
  const [buttonTextremote, setButtonTextremote] = useState("음소거");
  const [buttonText1remote, setButtonText1remote] = useState("화면 가리기");

  const handleClick = () => {
    if (buttonText === "음소거") {
      setButtonText(texts[1]);
    } else {
      setButtonText(texts[0]);
    }
  };

  const handleClick1 = () => {
    if (buttonText1 === "화면 가리기") {
      setButtonText1(texts1[1]);
    } else {
      setButtonText1(texts1[0]);
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      console.log("return in buttonText");
      return;
    }
    localStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
  }, [buttonText]);

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      console.log("return in buttonText1");
      return;
    }
    localStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
  }, [buttonText1]);

  const handleClickremote = () => {
    if (buttonTextremote === "음소거") {
      setButtonTextremote(texts[1]);
    } else {
      setButtonTextremote(texts[0]);
    }
  };

  const handleClick1remote = () => {
    if (buttonText1remote === "화면 가리기") {
      setButtonText1remote(texts1[1]);
    } else {
      setButtonText1remote(texts1[0]);
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      console.log("return in buttonText");
      return;
    }
    remoteStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
  }, [buttonTextremote]);

  useEffect(() => {
    if (initialRender.current) {
      //initialRender.current = false;
      console.log("return in buttonText1");
      return;
    }
    remoteStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
  }, [buttonText1remote]);

  useEffect(() => {
    if (localVideo.current) {
      localVideo.current.style.borderRadius = "10px";
    }
    if (remoteVideo.current) {
      remoteVideo.current.style.borderRadius = "10px";
    }
  }, []);

  return (
    <section className="video">
      <div class="container">
        <div class="left-content">
          <div className="myVideo">
            <h2>내 화면</h2>
            <video autoPlay ref={localVideo} playsInline={true} controls muted></video>
          </div>
          <button onClick={handleClick}>{buttonText}</button>
          <button onClick={handleClick1}>{buttonText1}</button>
        </div>
        <div class="right-content">
          <div className="youVideo">
            <h2>상대방 화면</h2>
            <video autoPlay ref={remoteVideo} playsInline={true} controls></video>
          </div>
          <button onClick={handleClickremote}>{buttonTextremote}</button>
        </div>
      </div>
    </section>
  );
}

export default VideoConsulting;
