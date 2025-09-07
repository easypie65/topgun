import React, { useState, useEffect } from 'react';
import { Speaker, Message } from './types';

const lessonDialogue: Message[] = [
    { speaker: Speaker.Teacher, text: "안녕하세요? 오늘은 혈흔분석에 이은 또 다른 삼각비의 실제 응용에 대해 배워볼꺼에요! 바로 탑건 메버릭, 영화 속에 숨겨진 삼각비에요!" },
    { speaker: Speaker.Teacher, text: "영화에서 비행기가 산과 표적 사이의 거리와 각도를 계산하는 장면을 보셨나요? 이런 상황에서 삼각비가 어떻게 활용될 수 있을지 생각해 보셨나요?" },
    { speaker: Speaker.Student, text: "네 생각해봤어요" },
    { speaker: Speaker.Teacher, text: "좋아요! 영화에서 비행기가 산악 지형을 통과하면서 표적을 공격하는 장면이 있었죠.\n\n이런 상황에서 삼각비는 매우 중요합니다. 예를 들어, 비행기의 고도와 표적까지의 수평 거리를 알면 탄젠트(tan) 값을 이용해 각도를 계산할 수 있어요.\n\n실제 상황에서 삼각비가 어떻게 활용된다고 생각하시나요? 비행기 조종사가 알아야 할 정보는 무엇일까요?" },
    { speaker: Speaker.Student, text: "고도랑 표적거리" },
    { speaker: Speaker.Teacher, text: "정확해요! 조종사는 고도(비행기가 지상에서 얼마나 높이 있는지)와 표적까지의 거리를 알아야 합니다.\n\n이 두 가지 정보를 알면 삼각비를 사용해서 공격 각도를 계산할 수 있어요. 예를 들어:\n\ntan θ = 고도 ÷ 표적까지의 수평 거리\n\n이렇게 계산된 각도는 비행기가 표적을 정확히 조준하는 데 필수적입니다. 영화에서 매버릭이 정확한 타이밍과 각도로 비행하는 것이 바로 이런 계산 덕분이죠! 🎯" }
];

const TeacherIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-cyan-400">
        <path fillRule="evenodd" d="M14.615 1.585a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l2.965-7.192H4.5a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
    </svg>
);

const StudentIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400">
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8 ${className}`}>
    <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-6">{title}</h2>
    {children}
  </div>
);

const VideoPlayer: React.FC<{ videoId: string }> = ({ videoId }) => (
  <Section title="'탑건: 매버릭' 도입 영상">
    <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-xl border-2 border-gray-700">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </Section>
);

const ChatMessage: React.FC<{ message: Message; onClick?: () => void }> = ({ message, onClick }) => {
  const isTeacher = message.speaker === Speaker.Teacher;
  const alignment = isTeacher ? 'justify-start' : 'justify-end';
  const bubbleColor = isTeacher ? 'bg-gray-700' : 'bg-indigo-600';
  const avatar = isTeacher ? <TeacherIcon /> : <StudentIcon />;
  const name = isTeacher ? (
      <span className="font-bold text-cyan-400">{message.speaker}</span>
  ) : (
      <span className="font-bold text-indigo-400">{message.speaker}</span>
  );
  const nameOrder = isTeacher ? 'flex-row' : 'flex-row-reverse';
  const textContainerOrder = isTeacher ? 'items-start' : 'items-end';
  const clickableClass = onClick ? 'cursor-pointer hover:brightness-125 transition-all duration-200' : '';

  return (
    <div className={`flex ${alignment} mb-6 gap-3`}>
      {isTeacher && <div className="flex-shrink-0 mt-8">{avatar}</div>}
      <div className={`flex flex-col max-w-2xl ${textContainerOrder}`}>
          <div className={`flex items-center gap-2 mb-2 ${nameOrder}`}>
              {name}
          </div>
          <div className={`${bubbleColor} text-white p-4 rounded-xl whitespace-pre-wrap ${clickableClass}`} onClick={onClick}>
              {message.text}
          </div>
      </div>
      {!isTeacher && <div className="flex-shrink-0 mt-8">{avatar}</div>}
    </div>
  );
};

const TrigonometryAnimation: React.FC = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 500),   // Plane and target appear
            setTimeout(() => setPhase(2), 1500),  // Altitude line draws
            setTimeout(() => setPhase(3), 2500),  // Distance line draws
            setTimeout(() => setPhase(4), 3500),  // Hypotenuse and angle appear
            setTimeout(() => setPhase(5), 4500),  // Formula appears
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    const baseClasses = "transition-all duration-1000 ease-in-out";

    return (
        <div className="relative w-full h-64 md:h-72 bg-gray-900 rounded-lg p-4 overflow-hidden border border-gray-600 my-4">
            {/* Plane */}
            <div className={`absolute top-4 left-8 text-4xl ${baseClasses} ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>✈️</div>
            
            {/* Target */}
            <div className={`absolute bottom-4 right-8 text-4xl ${baseClasses} ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>🎯</div>

            {/* Altitude Line */}
            <div className="absolute left-12 top-16 flex flex-col items-center">
                 <div className={`w-0.5 bg-yellow-300 origin-top ${baseClasses} ${phase >= 2 ? 'h-36' : 'h-0'}`}></div>
                 <span className={`text-yellow-300 mt-2 ${baseClasses} ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>고도 (Opposite)</span>
            </div>

            {/* Distance Line */}
            <div className="absolute bottom-10 left-16 flex items-center">
                <div className={`h-0.5 bg-cyan-300 origin-left ${baseClasses} ${phase >= 3 ? 'w-56 md:w-96' : 'w-0'}`}></div>
                <span className={`text-cyan-300 ml-2 ${baseClasses} ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>수평 거리 (Adjacent)</span>
            </div>

            {/* Hypotenuse */}
            <svg className={`absolute top-0 left-0 w-full h-full ${baseClasses} ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 400 200">
                <line x1="55" y1="50" x2="350" y2="175" stroke="#f472b6" strokeWidth="2" strokeDasharray="8 4" />
            </svg>

            {/* Angle Arc */}
            <div className={`absolute top-14 left-14 text-pink-400 text-2xl font-bold ${baseClasses} ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>θ</div>

            {/* Formula */}
            <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ${baseClasses} ${phase >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 text-center">
                    <code className="text-xl text-yellow-300 font-mono">tan(θ) = 고도 / 수평 거리</code>
                </div>
            </div>
        </div>
    );
};


const KeyConcepts: React.FC = () => (
    <Section title="핵심 개념 및 요점">
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white mb-2">핵심 공식 시각화</h3>
                <TrigonometryAnimation />
                <p className="text-gray-400 mt-3">이 간단한 삼각비는 조종사가 알려진 고도와 거리에서 목표물을 타격하는 데 필요한 정확한 공격 각도를 계산할 수 있게 해줍니다.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-white mb-2">실생활 적용 사례</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li><span className="font-semibold text-cyan-400">군사 작전:</span> 발사체 궤적 및 비행 경로 계산.</li>
                    <li><span className="font-semibold text-cyan-400">건축 및 공학:</span> 구조적 안정성 확보 및 건물 높이 측정.</li>
                    <li><span className="font-semibold text-cyan-400">항법:</span> GPS 및 해상 항법에서 위치와 경로를 결정하는 데 사용됩니다.</li>
                    <li><span className="font-semibold text-cyan-400">우주 탐사:</span> 천체 간의 거리 계산.</li>
                </ul>
            </div>
        </div>
    </Section>
);

export default function App() {
  const videoId = "1EsqQHIMXZg";
  const [step, setStep] = useState(0);

  const handleStep = () => {
      if (step < 6) {
          setStep(prev => prev + 1);
      }
  };
  
  const messagesToShow = [];
  if (step >= 0) messagesToShow.push(lessonDialogue[0]);
  if (step >= 2) messagesToShow.push(lessonDialogue[1]);
  if (step >= 3) messagesToShow.push(lessonDialogue[2]);
  if (step >= 4) messagesToShow.push(lessonDialogue[3]);
  if (step >= 5) messagesToShow.push(lessonDialogue[4]);
  if (step >= 6) messagesToShow.push(lessonDialogue[5]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans leading-relaxed">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1569428037934-31b99f257a70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
      ></div>
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
              실생활 속 삼각비
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mt-2">'탑건: 매버릭'으로 배우는 삼각비 수업</p>
        </header>
        
        <div className="flex flex-col gap-12">
          {step >= 1 && <VideoPlayer videoId={videoId} />}
          
          <Section title="대화형 수업 흐름">
              <div className="space-y-4">
                  {messagesToShow.map((msg, index) => {
                      const isLastMessage = index === messagesToShow.length - 1;
                      const isClickable = isLastMessage && step < 6 && step !== 1;
                      
                      return (
                          <ChatMessage
                              key={index}
                              message={msg}
                              onClick={isClickable ? handleStep : (step === 0 && index === 0 ? handleStep : undefined)}
                          />
                      );
                  })}
              </div>
          </Section>

          {step === 1 && (
              <div className="flex justify-center">
                  <button
                      onClick={handleStep}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg shadow-cyan-500/20"
                      aria-label="다음 단계로 이동"
                  >
                      다음
                  </button>
              </div>
          )}

          {step >= 6 && <KeyConcepts />}
        </div>

        <footer className="text-center mt-16 text-gray-500">
            <p>&copy; {new Date().getFullYear()} Interactive Learning. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}