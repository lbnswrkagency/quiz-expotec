import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";
import "./QuizData.scss";

function QuizData({ data }) {
  const chartData = [
    { name: "Correct Answers", Amount: data.correctAnswers },
    { name: "Incorrect Answers", Amount: data.incorrectAnswers },
  ];

  return (
    <div className="quiz-data">
      <h1>Quiz Daten Analyse</h1>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={3} className="card">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Questions
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={data.totalQuestions}
                duration={2.75}
                separator=","
              />
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className="card">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Participants
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={data.participants}
                duration={2.75}
                separator=","
              />
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className="card">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Correct Answers
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={data.correctAnswers}
                duration={2.75}
                separator=","
              />
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className="card">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Incorrect Answers
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={data.incorrectAnswers}
                duration={2.75}
                separator=","
              />
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={6} className="card chart-card">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Quiz Results
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default QuizData;
