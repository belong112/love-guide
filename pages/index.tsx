import { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import OptionBtn from "@/components/OptionBtn";
import ChoicesBox from "@/components/ChoiceBox";
import { Container, Grid, Divider, Button } from "@mui/material";
import { nanoid } from "nanoid";

export default function Home() {
  const traits = [
    "手作操作",
    "善於分析",
    "創意發想",
    "重視和諧",
    "領導他人",
    "生活規律",
    "內向寡言",
    "理性思考",
    "偏好直覺",
    "善解人意",
    "影響他人",
    "按部就班",
  ];
  const [options, setOptions] = useState(allNewOptions());
  const [choices, setChoices] = useState(allNewChoices());

  const optionBtns = options.map((op) => (
    <Grid key={nanoid()} item md={4}>
      <OptionBtn
        key={op.id}
        text={op.text}
        isHeld={op.priority !== -1}
        clickOption={() => clickOption(op.id)}
      />
    </Grid>
  ));

  const choiceBoxs = choices.map((item) => (
    <Grid key={nanoid()} item md={4}>
      <ChoicesBox
        key={item.id}
        text={item.choiceId !== -1 ? traits[item.choiceId] : ""}
        defaultText={item.defaultText}
        isFilled={item.choiceId !== -1}
        clickChoice={() => {
          clickChoice(item.id);
        }}
      />
    </Grid>
  ));

  function allNewOptions() {
    const ops = traits.map((trait, index) => ({
      id: index,
      text: `#${trait}`,
      priority: -1,
    }));
    return ops;
  }

  function allNewChoices() {
    const defaultTexts = ["最像我", "很像我", "像我"];
    const userChoices = defaultTexts.map((dtext, index) => ({
      id: index,
      defaultText: dtext,
      choiceId: -1,
    }));
    return userChoices;
  }

  function clickOption(id: number) {
    if (options[id].priority !== -1) {
      setChoices(clearChoice(options[id].priority));
      setOptions(clearOption(id));
    } else {
      const isFull = choices.every((item) => item.choiceId !== -1);
      if (isFull) {
        return;
      }
      chooseOption(id);
    }
  }

  function clickChoice(id: number) {
    setChoices(clearChoice(id));
    setOptions(clearOption(choices[id].choiceId));
  }

  function chooseOption(id: number) {
    const newOption = [];
    const newChoice = [];
    var done = false;
    for (let i = 0; i < 12; i++) {
      if (i === id) {
        for (let j = 0; j < 3; j++) {
          if (choices[j].choiceId === -1 && !done) {
            newOption.push({
              ...options[i],
              priority: j,
            });
            newChoice.push({
              ...choices[j],
              choiceId: i,
            });
            done = true;
          } else {
            newChoice.push(choices[j]);
          }
        }
      } else {
        newOption.push(options[i]);
      }
    }
    setOptions(newOption);
    setChoices(newChoice);
  }

  function clearOption(id: number) {
    const newOption = [];
    for (let i = 0; i < 12; i++) {
      if (i === id) {
        newOption.push({
          ...options[i],
          priority: -1,
        });
      } else {
        newOption.push(options[i]);
      }
    }
    return newOption;
  }

  function clearChoice(id: number) {
    const newChoice = [];
    for (let i = 0; i < 3; i++) {
      if (i === id && choices[i].choiceId !== -1) {
        newChoice.push({
          ...choices[i],
          choiceId: -1,
        });
      } else {
        newChoice.push(choices[i]);
      }
    }
    return newChoice;
  }

  return (
    <>
      <Head>
        <title>測試你在愛情裡是哪一種人</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/relationship.png" />
      </Head>
      <main className={styles.main}>
        <Container maxWidth="sm">
          <Grid container pt={5} justifyContent="center">
            <Grid item md={8} className={styles.questionText}>
              今天是上學第一天，
              <br />
              你特別早起，教室裡只有你一個人，
              <br />
              趁現在偷偷自拍來紀念開學日，
              <br />
              PO文時你會為自己添加哪些標籤？
            </Grid>
            <Grid container spacing={3} my={1}>
              {choiceBoxs}
            </Grid>
            <Grid item md={12} my={1}>
              <Divider />
            </Grid>
            <Grid container spacing={3} my={1}>
              {optionBtns}
            </Grid>
          </Grid>
          <Grid item md={12} py={3} justifyContent="center" display="flex">
            {choices.every((item) => item.choiceId !== -1) && (
              <div
                className={styles.doneBtn}
                onClick={() => alert("next page")}
              >
                下一步
              </div>
            )}
          </Grid>
        </Container>
      </main>
    </>
  );
}
