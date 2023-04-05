import React from "react";
import styles from "@/styles/Home.module.css";

interface OptionBtnProps {
  key: number;
  text: string;
  isHeld: boolean;
  clickOption: any;
}
export default function OptionBtn(props: OptionBtnProps) {
  const bgStyles = {
    backgroundColor: props.isHeld ? "#fea865" : "#f5e4d5",
  };
  return (
    <div
      className={styles.optionBtnFace}
      style={bgStyles}
      onClick={props.clickOption}
    >
      <h2 className={styles.optionBtnText}>{props.text}</h2>
    </div>
  );
}
