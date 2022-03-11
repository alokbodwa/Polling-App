const form = document.getElementById("vote-form");

form.addEventListener("submit", (e) => {
  const choice = document.querySelector("input[name=os]:checked").value;
  const data = { os: choice };

  fetch("http://localhost:3000/poll", {
    method: "post",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  e.preventDefault();
});

fetch("http://localhost:3000/poll")
  .then((res) => res.json())
  .then((data) => {
    const votes = data.votes;
    const totalVotes = votes.length;

    const voteCounts = votes.reduce(
      (acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0) + vote.points), acc),
      {}
    );
    let dataPoints = [
      { label: "windows", y: voteCounts.windows },
      { label: "MacOS", y: voteCounts.MacOS },
      { label: "Linux", y: voteCounts.Linux },
      { label: "Ubuntu", y: voteCounts.Ubuntu },
      { label: "Other", y: voteCounts.Other },
    ];

    const chartContainer = document.querySelector("#chartContainer");

    if (chartContainer) {
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light1",
        title: {
          text: `Total Votes ${totalVotes}`,
        },
        data: [
          {
            type: "column",
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();

      //   Pusher front-end/client-side code
      Pusher.logToConsole = true;

      var pusher = new Pusher("d3b5960eeda234bd442f", {
        cluster: "ap2",
      });

      var channel = pusher.subscribe("os-poll");
      channel.bind("os-vote", function (data) {
        //   This data is being sent from poll.js; data = { points: 1, os: req.body.os }
        dataPoints = dataPoints.map((x) => {
          if (x.label == data.os) {
            x.y += data.points;
            return x;
          } else {
            return x;
          }
        });

        chart.render();
      });
    }
  });
