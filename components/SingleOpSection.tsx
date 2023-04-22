import { useState } from "react";
import React from "react";
import styles from "@/styles/Home.module.css";
import OptionBtn from "@/components/OptionBtn";
import { Container, Grid, Divider } from "@mui/material";
import { nanoid } from "nanoid";

interface SingelOpSectionProps {
  question: string[];
  options: string[];
  clickNextPhase: any;
  selectNumbers: number;
  md: number;
  sm: number;
  xs: number;
}
export default function SingelOpSection(props: SingelOpSectionProps) {
  const traits = props.options;
  const [options, setOptions] = useState(allNewOptions());
  const questionSection = props.question.join("\n");

  const optionBtns = options.map((op) => (
    <Grid key={nanoid()} item md={props.md} sm={props.sm} xs={props.xs}>
      <OptionBtn
        key={op.id}
        text={op.text}
        isHeld={op.choosed}
        clickOption={() => clickOption(op.id)}
      />
    </Grid>
  ));

  function allNewOptions() {
    const ops = traits.map((trait, index) => ({
      id: index,
      text: trait,
      choosed: false,
    }));
    return ops;
  }

  function clickOption(cid: number) {
    const ops = traits.map((trait, index) => ({
      id: index,
      text: trait,
      choosed: index == cid ? true : false,
    }));
    setOptions(ops);
  }

  return (
    <div>
      <Container maxWidth="sm">
        <Grid container pt={5} justifyContent="center">
          <Grid item md={8} className={styles.questionText}>
            {questionSection}
          </Grid>
          <Grid item md={12} my={1}>
            <Divider />
          </Grid>
          <Grid container spacing={2} my={1}>
            {optionBtns}
          </Grid>
        </Grid>
        <Grid item md={12} py={3} justifyContent="center" display="flex">
          {options.filter((x) => x.choosed).length == props.selectNumbers && (
            <div className={styles.doneBtn} onClick={props.clickNextPhase}>
              下一步
            </div>
          )}
        </Grid>
      </Container>
    </div>
  );
}