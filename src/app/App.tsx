import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'When did we first meet?',
    options: ['January', 'February', 'March'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'What is my real name spelling?',
    options: ['Sarbeshwor', 'Sirbeshwar', 'Sarbeshwar'],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: 'What is my hometown name?',
    options: ['Shindhulimadhi', 'Ratmata', 'Shikhartole'],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: 'Who usually texts first?',
    options: ['Me', 'You', 'No one'],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: 'Who gets more jealous? 😜',
    options: ['Me', 'You', 'Both'],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: 'Who says sorry first after a fight?',
    options: ['Me', 'You', 'No one'],
    correctAnswer: 0,
  },
  {
    id: 7,
    question: 'Who loves more?',
    options: ['Me', 'You', 'Equal'],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: 'Sanjita, do you like talking to me every day?',
    options: ['Yes', 'No', 'Maybe'],
    correctAnswer: 0,
  },
];

function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        >
          <Heart fill="currentColor" size={Math.random() * 20 + 20} />
        </motion.div>
      ))}
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 50 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map((i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: window.innerWidth / 2,
            y: -20,
            rotate: 0,
            scale: 1,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: Math.random() * 720,
            scale: Math.random() * 0.5 + 0.5,
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            ease: 'easeOut',
            delay: Math.random() * 0.5,
          }}
        >
          <Heart 
            fill={Math.random() > 0.5 ? '#ff69b4' : '#ff1493'} 
            color={Math.random() > 0.5 ? '#ff69b4' : '#ff1493'}
            size={Math.random() * 15 + 10} 
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setQuizComplete(true);
        if (score + (answerIndex === questions[currentQuestion].correctAnswer ? 1 : 0) === 8) {
          setShowConfetti(true);
          setTimeout(() => setShowProposal(true), 1500);
        }
      }, 300);
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
    setShowProposal(false);
    setShowFinal(false);
    setShowConfetti(false);
  };

  const handleNoHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const containerRect = button.parentElement?.getBoundingClientRect();
    
    if (containerRect) {
      const maxX = containerRect.width - rect.width - 40;
      const maxY = containerRect.height - rect.height - 40;
      
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleYes = () => {
    setShowFinal(true);
  };

  const progress = ((currentQuestion + (quizComplete ? 1 : 0)) / questions.length) * 100;

  if (showFinal) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        fontFamily: 'Poppins, sans-serif',
      }}>
        <FloatingHearts />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="mb-6"
            >
              <div className="text-8xl mb-4">💑</div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl mb-4 text-white" style={{ fontWeight: 700 }}>
              Yayyyy Sanjita ❤️
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-pink-100">
              You're officially my Valentine 😍
            </p>
            <p className="text-xl md:text-2xl text-pink-200">
              Screenshot this and send it to me 💞
            </p>
            
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="mt-8 text-6xl"
            >
              ❤️
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showProposal) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        fontFamily: 'Poppins, sans-serif',
      }}>
        {showConfetti && <Confetti />}
        <FloatingHearts />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="text-7xl mb-6"
              >
                🌹
              </motion.div>
              
              <h1 className="text-5xl mb-4 text-white" style={{ fontWeight: 700 }}>
                Sanjita 🌹
              </h1>
              <p className="text-3xl text-white mb-2" style={{ fontWeight: 600 }}>
                Will you be my
              </p>
              <p className="text-4xl text-white" style={{ fontWeight: 700 }}>
                Valentine?
              </p>
            </div>

            <div className="relative h-32">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="absolute left-1/2 -translate-x-1/2 top-0 px-12 py-4 rounded-full text-xl text-white shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #ff6b9d 0%, #ff1744 100%)',
                  fontWeight: 600,
                  boxShadow: '0 10px 30px rgba(255, 23, 68, 0.5)',
                }}
              >
                YES 💖
              </motion.button>

              <motion.button
                animate={{ 
                  x: noButtonPosition.x, 
                  y: noButtonPosition.y,
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20 
                }}
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                className="absolute top-16 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full text-lg text-gray-600 bg-gray-200/80 shadow-lg"
                style={{ fontWeight: 500 }}
              >
                NO 🙈
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (quizComplete && score < 8) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
        fontFamily: 'Poppins, sans-serif',
      }}>
        <FloatingHearts />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="text-center max-w-md mx-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              borderRadius: '30px',
              padding: '3rem 2rem',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="text-7xl mb-6">🥺</div>
            
            <h2 className="text-3xl mb-4 text-gray-800" style={{ fontWeight: 700 }}>
              Awww Sanjita 🥺
            </h2>
            <p className="text-xl mb-2 text-gray-700" style={{ fontWeight: 500 }}>
              Score: {score}/8
            </p>
            <p className="text-lg mb-8 text-gray-600">
              almost perfect… try again ❤️
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTryAgain}
              className="px-10 py-4 rounded-full text-lg text-white shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #ff6b9d 0%, #ff1744 100%)',
                fontWeight: 600,
              }}
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (quizComplete && score === 8) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        fontFamily: 'Poppins, sans-serif',
      }}>
        {showConfetti && <Confetti />}
        <FloatingHearts />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="text-center max-w-md mx-auto"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="text-8xl mb-6"
            >
              💯
            </motion.div>
            
            <h1 className="text-5xl mb-4 text-white" style={{ fontWeight: 700 }}>
              Perfect Score!
            </h1>
            <p className="text-2xl mb-12 text-pink-100" style={{ fontWeight: 500 }}>
              Sanjita, you know me so well ❤️
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <FloatingHearts />
      
      <div className="relative z-10 min-h-screen flex flex-col p-4 md:p-6 max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 mt-4"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <h1 className="text-2xl md:text-3xl mb-2 text-white" style={{ fontWeight: 700 }}>
              Sanjita's Valentine Compatibility Test 💖
            </h1>
          </motion.div>
          <p className="text-sm md:text-base text-pink-100" style={{ fontWeight: 500 }}>
            Sanjita 😌 answer honestly… let's see how well you know me ❤️
          </p>
        </motion.div>

        {/* Progress and Score */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white" style={{ fontWeight: 600 }}>
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/30 backdrop-blur-sm">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-sm text-white" style={{ fontWeight: 600 }}>
                Score: {score}
              </span>
            </div>
          </div>
          
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #ff6b9d 0%, #ff1744 100%)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex-1 flex flex-col"
          >
            <div
              className="flex-1 p-6 md:p-8 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="flex items-center justify-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="text-pink-300" fill="currentColor" size={40} />
                </motion.div>
              </div>

              <h2 className="text-xl md:text-2xl text-center mb-12 text-white" style={{ fontWeight: 600 }}>
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-4 md:p-5 rounded-2xl text-left transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(5px)',
                      border: '2px solid rgba(255, 255, 255, 0.5)',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: '#6b21a8',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
