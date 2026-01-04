import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import signatureAnimation from "./assets/Signature.json";
import fingerPrintAnimation from "./assets/Fingerprint.json";
import bankLogo from "./assets/bank_logo.jpeg";
import insertCard from "./assets/insertCard.jpg";
import Lottie from "lottie-react";
import confetti from "canvas-confetti";
import { toast, Toaster } from "sonner";

interface Props {
  onNext?: () => void;
  content?: string;
}

const AuthCard = ({ content }: Props) => {
  return (
    <Card className="p-0 gap-0 overflow-hidden border-2">
      <div className="bg-[linear-gradient(to_bottom,#5491ff,#0a61ff)] text-white text-3xl font-semibold p-3 text-center">
        본인인증
      </div>
      <div className="h-full text-2xl flex justify-center items-center px-2.5 max-xl:text-xl">
        {content}
      </div>
    </Card>
  );
};

const MainStep = ({ onNext }: Props) => {
  return (
    <div className="relative">
      <img src={bankLogo} className="w-48 absolute -top-40 -left-20" />
      <p className="font-bold text-5xl text-center mb-4">
        <span>환영합니다 </span>
        <span className="text-primary">최인순</span>
        <span>님!</span>
      </p>
      <p className="text-3xl mb-12">
        출금 서비스를 이용하시려면 출금하기 버튼을 눌러주세요
      </p>
      <Button
        className="w-full h-auto py-5 text-3xl rounded-2xl"
        onClick={onNext}
      >
        출금하기
      </Button>
    </div>
  );
};

const FingerPrintStep = ({ onNext }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onNext?.();
    }, 7000);

    return () => clearTimeout(timeout);
  }, [onNext]);

  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      toast("✅ 인증되었습니다");
    }, 5000);

    return () => clearTimeout(toastTimeout);
  }, []);

  return (
    <div className="grid grid-cols-2 w-full h-full gap-7">
      <AuthCard content="기계에 손가락을 올려 지문을 인식해주세요" />
      <div className="p-0 flex items-center justify-center bg-purple-50">
        <div className="relative flex justify-center items-center p-14 bg-lime-50">
          {/* 모서리 border */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-10 border-l-10 border-black" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-10 border-r-10 border-black" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-10 border-l-10 border-black" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-10 border-r-10 border-black" />

          {/* 지문 애니메이션 */}
          <Lottie
            animationData={fingerPrintAnimation}
            style={{ height: 200 }}
          />
        </div>
      </div>
    </div>
  );
};

const PasswordStep = ({ onNext }: Props) => {
  const [password, setPassword] = useState<string[]>([]);

  const handleNumberClick = (num: string) => {
    if (password.length < 4) {
      setPassword((prev) => [...prev, num]);
    }
  };

  const handleDelete = () => {
    if (password.length > 0) {
      setPassword((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="grid grid-cols-2 w-full h-full gap-7">
      <AuthCard content="비밀번호 4자리를 입력해주세요" />
      <div className="flex flex-col gap-8">
        <div className="bg-[#F9FAFB] rounded-2xl flex justify-center gap-4 py-5">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-16 h-20 border-3 border-[#CECECE] bg-white rounded-xl flex items-center justify-center text-xl font-bold
              ${
                password[index]
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              {password[index] ? "●" : ""}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 h-full gap-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <Button
              variant={"outline"}
              className="text-2xl font-bold h-full rounded-2xl"
              onClick={() => handleNumberClick(num)}
            >
              {num}
            </Button>
          ))}
          <Button
            variant={"outline"}
            className="text-2xl font-bold h-full rounded-2xl"
            onClick={handleDelete}
          >
            지우기
          </Button>
          <Button
            variant={"outline"}
            className="text-2xl font-bold h-full rounded-2xl"
            onClick={() => handleNumberClick("0")}
          >
            0
          </Button>
          <Button
            className="text-2xl font-bold h-full rounded-2xl"
            disabled={password.length !== 4}
            onClick={onNext}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

const SignatureStep = ({ onNext }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onNext?.();
    }, 7000);

    return () => clearTimeout(timeout);
  }, [onNext]);

  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      toast("✅ 인증되었습니다");
    }, 5000);

    return () => clearTimeout(toastTimeout);
  }, []);

  return (
    <div className="grid grid-cols-2 w-full h-full gap-7">
      <AuthCard content="사인을 입력해주세요" />

      <div className="p-20 flex items-center justify-center">
        <div className="relative flex items-center p-14">
          {/* 모서리 border */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-10 border-l-10 border-gray-800" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-10 border-r-10 border-gray-800" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-10 border-l-10 border-gray-800" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-10 border-r-10 border-gray-800" />

          <Lottie animationData={signatureAnimation} width={250} />
        </div>
      </div>
    </div>
  );
};

const FinalStep = () => {
  useEffect(() => {
    // 첫 번째 폭죽
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.4 },
      scalar: 1.5,
    });

    // 0.5초 후 양쪽에서 발사
    const timeout1 = setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        scalar: 1.5,
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        scalar: 1.5,
      });
    }, 500);

    // 1.5초 후 한 번 더
    const timeout2 = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        scalar: 1.5,
      });
    }, 1500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div className="relative">
      <p className="font-bold text-5xl text-center mb-4 text-primary">
        본인인증이 완료되었습니다!
      </p>
      <p className="text-3xl text-center">
        카드를 투입구에 넣으시면 출금이 완료됩니다
      </p>
      <div className="flex justify-center items-center">
        <img src={insertCard} className="w-87.5" />
      </div>
    </div>
  );
};

function App() {
  const [page, setPage] = useState(1);

  const onNext = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("현재 페이지: ", page);
  }, [page]);

  return (
    <div className="flex h-dvh justify-center items-center p-28">
      <Toaster
        richColors
        position="top-center"
        duration={2000}
        closeButton={false}
      />

      {page === 1 && <MainStep onNext={onNext} />}
      {page === 2 && <FingerPrintStep onNext={onNext} />}
      {page === 3 && <PasswordStep onNext={onNext} />}
      {page === 4 && <SignatureStep onNext={onNext} />}
      {page === 5 && <FinalStep />}
    </div>
  );
}

export default App;
