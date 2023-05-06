import React from "react";
import styles from "@/styles/Home.module.css";

interface OptionBtnProps {
  key: number;
  theme: string[];
  text: string;
  isHeld: boolean;
  clickOption: any;
}
export default function OptionBtn(props: OptionBtnProps) {
  const bgStyles = {
    backgroundColor: props.isHeld ? props.theme[1] : props.theme[2],
  };

  return (
    <div
      className={styles.optionBtnFace}
      style={bgStyles}
      onClick={props.clickOption}
    >
      <h2 className={styles.optionBtnText} style={{ color: props.theme[3] }}>
        {props.text}
      </h2>
    </div>
  );
}
