import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import MultiOpSection from "@/components/MultiOpSection";
import SingleOpSection from "@/components/SingleOpSection";
import loadingGif from "@/asset/cute.gif";
import questionData from "@/src/question-list.json";

export default function Home() {
  const router = useRouter();
  const [loveType, setLoveType] = useState("");
  const [loveWordCounter, setLoveWordCounter] = useState([0, 0, 0, 0, 0]);
  const [phase, setPhase] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  const themeColor = [
    [" #a4c0cf", "#f5e4d5", "#fea865"],
    ["#f0f0f0", "#a4c0cf", "#546073"],
  ]; // bgcolor, option color, selected color

  const questionList = questionData.questionList;

  function handleClick(res: any) {
    if (phase === 2) {
      setLoveType(res);
    }
    if (phase > 5 && phase < 16) {
      const newCounter = loveWordCounter.map((c, index) =>
        index == res ? c + 1 : c
      );
      setLoveWordCounter(newCounter);
    }
    if (phase < 16) {
      // cause we got 16 questions
      setPhase(phase + 1);
      setIsLoading(true);
    } else {
      console.log(loveType, loveWordCounter);
      let mostCount = loveWordCounter.indexOf(Math.max(...loveWordCounter));
      router.push("/results/" + loveType + "-0-" + mostCount);
    }
  }

  return (
    <>
      <Head>
        <title>測試你在愛情裡是哪一種人</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/relationship.png" />
      </Head>
      <main
        className={styles.main}
        style={{ backgroundColor: themeColor[phase % 2][0] }}
      >
        {isLoading ? (
          <div className={styles.picBox}>
            <Image src={loadingGif} alt="loading" width={300} />
          </div>
        ) : (
          <div>
            {questionList[phase].questionType === "MultiOp" ? (
              <MultiOpSection
                clickNextPhase={handleClick}
                {...questionList[phase]}
              />
            ) : (
              <SingleOpSection
                clickNextPhase={handleClick}
                {...questionList[phase]}
              />
            )}
          </div>
        )}
      </main>
    </>
  );
}
