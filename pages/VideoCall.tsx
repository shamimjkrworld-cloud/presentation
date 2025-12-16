import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, MoreVertical, Layout } from 'lucide-react';

interface VideoCallProps {
  onEndCall: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Simulate getting user media
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices", err);
      }
    };

    startVideo();

    return () => {
       // Cleanup: Stop tracks
       if (localVideoRef.current && localVideoRef.current.srcObject) {
         const stream = localVideoRef.current.srcObject as MediaStream;
         stream.getTracks().forEach(track => track.stop());
       }
    };
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-900 flex flex-col overflow-hidden relative">
      
      {/* Main Video Area */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        
        {/* Remote Video (Doctor) - Mocked with image for this demo as we don't have peer connection */}
        <div className="relative w-full h-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="https://picsum.photos/1280/720?random=1" 
            className="w-full h-full object-cover opacity-90" 
            alt="Remote Doctor"
          />
          <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-md text-white text-sm backdrop-blur-sm">
            Dr. Sarah Johnson
          </div>
        </div>

        {/* Local Video (Self) */}
        <div className="absolute bottom-8 right-8 w-48 h-36 bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-700 shadow-lg">
           <video 
             ref={localVideoRef} 
             autoPlay 
             muted 
             playsInline 
             className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
           />
           {isVideoOff && (
             <div className="w-full h-full flex items-center justify-center text-slate-400">
               <VideoOff className="h-8 w-8" />
             </div>
           )}
           <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-0.5 rounded">
             You
           </div>
        </div>

      </div>

      {/* Controls Bar */}
      <div className="h-20 bg-slate-800 border-t border-slate-700 flex items-center justify-center space-x-6 px-4">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </button>

        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-4 rounded-full transition-colors ${isVideoOff ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
        >
          {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
        </button>

        <button 
            onClick={onEndCall}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white px-8"
        >
          <PhoneOff className="h-6 w-6" />
        </button>

        <button className="p-4 rounded-full bg-slate-700 hover:bg-slate-600 text-white">
          <MessageSquare className="h-6 w-6" />
        </button>

         <button className="p-4 rounded-full bg-slate-700 hover:bg-slate-600 text-white hidden sm:block">
          <Layout className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;