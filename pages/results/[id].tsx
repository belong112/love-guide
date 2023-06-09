import { useRouter } from "next/navigation";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Container, Grid, Divider, Typography } from "@mui/material";
import { getAllResultIds, getResultData } from "@/lib/result";

export async function getStaticProps({ params }: any) {
  const resultData = getResultData(params.id);
  return {
    props: {
      resultData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllResultIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Result({ resultData }: any) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
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
            <Grid item md={12} my={2}>
              <Typography variant="h4">你對戀愛的想像是</Typography>
            </Grid>
            <Grid item md={12} my={2} className={styles.resultCard}>
              <Typography variant="h2">{resultData.loveType}</Typography>
            </Grid>
            <Grid item md={12} my={2}>
              <Typography>{resultData.loveTypeDesc}</Typography>
            </Grid>
            <Grid item md={12} my={2}>
              <Divider></Divider>
            </Grid>
            <Grid item md={12} my={2}>
              <Typography variant="h4">你是</Typography>
            </Grid>
            <Grid item md={12} my={2} className={styles.resultCard}>
              <Typography variant="h2">{resultData.MBTIType1}</Typography>
              <Typography variant="h3">{resultData.MBTIType2}</Typography>
            </Grid>
            <Grid item md={12} my={2}>
              <Typography>{resultData.MBTITypeDesc}</Typography>
            </Grid>
            <Grid item md={12} my={2}>
              <Typography variant="h5">
                戀愛處方箋：{resultData.MBTIAdvice}
              </Typography>
            </Grid>
            <Grid item md={12} my={2}>
              <Divider></Divider>
            </Grid>
            <Grid item md={12} my={2}>
              <Typography variant="h5">屬於你的愛之語是:</Typography>
            </Grid>
            <Grid item md={12} my={2} className={styles.resultCard}>
              <Typography variant="h3">{resultData.loveWord}</Typography>
            </Grid>
            <Grid item md={12} my={2}>
              <Typography>{resultData.loveWordDesc}</Typography>
            </Grid>
            <Grid
              item
              md={12}
              py={5}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div onClick={handleClick} className={styles.doneBtn}>
                再玩一次
              </div>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}
