import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const endTime = new Date().getTime() + (22 * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Icon name="Clock" size={20} />
        <span className="text-sm font-semibold uppercase tracking-wide">Специальная цена действует</span>
      </div>
      <div className="flex justify-center gap-2 sm:gap-4">
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[70px]">
            <div className="text-2xl sm:text-3xl font-bold tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs mt-1 opacity-90">часов</div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold self-center -mt-5">:</div>
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[70px]">
            <div className="text-2xl sm:text-3xl font-bold tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs mt-1 opacity-90">минут</div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold self-center -mt-5">:</div>
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[70px]">
            <div className="text-2xl sm:text-3xl font-bold tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
          <div className="text-xs mt-1 opacity-90">секунд</div>
        </div>
      </div>
    </div>
  );
}