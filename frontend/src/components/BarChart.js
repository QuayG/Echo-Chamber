import React from "react";
import {Bar} from 'react-chartjs-2'
import styled from "styled-components/macro";

export default function BarChart({poll}) {

    const data = () => {
        const votes = []
        poll.possibleAnswers.forEach(possibleAnswer => {
                let count = 0
                poll.givenAnswers.forEach(givenAnswer => {
                    if (givenAnswer.answer === possibleAnswer.possibleAnswer) {
                        count++
                        console.log("count")
                    }
                })
                votes.push(count)
            }
        )
        return votes
    }

    console.log(data())
    const possibleAnswers = () => poll.possibleAnswers.map(possibleAnswer => possibleAnswer.possibleAnswer)

    return (
        <Wrapper>
            <h1>{poll.title}</h1>
            <Bar
                data={{
                    labels: possibleAnswers(),
                    datasets: [{
                        label: '# of votes',
                        data: data(),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                    }]
                }}
                height={200}
                width={300}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    precision: 0,
                                    beginAtZero: true,
                                },
                            }
                        ]
                    }
                }}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: block;
  text-align: center;
  margin: 12px;
`