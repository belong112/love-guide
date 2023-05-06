import { useState } from "react";
import React from "react";
import styles from "@/styles/Home.module.css";
import OptionBtn from "@/components/OptionBtn";
import ChoicesBox from "@/components/ChoiceBox";
import { Container, Grid, Divider } from "@mui/material";
import { nanoid } from "nanoid";

interface MultiOpSectionProps {
  question: string[];
  options: string[];
  theme: string[];
  clickNextPhase: any;
  selectNumbers: number;
  md: number;
  sm: number;
  xs: number;
}
export default function MultiOpSection(props: MultiOpSectionProps) {
  const traits = props.options;
  const [options, setOptions] = useState(allNewOptions());
  const [choices, setChoices] = useState(allNewChoices());
  const questionDescription = props.question.join("\n");

  const optionBtns = options.map((op) => (
    <Grid key={nanoid()} item md={props.md} sm={props.sm} xs={props.xs}>
      <OptionBtn
        key={op.id}
        text={op.text}
        isHeld={op.priority !== -1}
        clickOption={() => clickOption(op.id)}
        theme={props.theme}
      />
    </Grid>
  ));

  const choiceBoxs = choices.map((item) => (
    <Grid key={nanoid()} item md={4} sm={4} xs={4}>
      <ChoicesBox
        key={item.id}
        theme={props.theme}
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
      text: trait,
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
    for (let i = 0; i < traits.length; i++) {
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
    for (let i = 0; i < traits.length; i++) {
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
    <div>
      <Container maxWidth="sm">
        <Grid container pt={5} justifyContent="center">
          <Grid item md={8} className={styles.questionText}>
            {questionDescription}
          </Grid>
          <Grid container spacing={2} my={1}>
            {choiceBoxs}
          </Grid>
          <Grid item md={12} my={1}>
            <Divider />
          </Grid>
          <Grid container spacing={2} my={1}>
            {optionBtns}
          </Grid>
        </Grid>
        <Grid item md={12} py={3} justifyContent="center" display="flex">
          {choices.every((item) => item.choiceId !== -1) && (
            <div className={styles.doneBtn} onClick={props.clickNextPhase}>
              下一步
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
}
