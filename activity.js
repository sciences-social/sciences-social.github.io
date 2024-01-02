// import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";


async function getActivity() {
  const res = await fetch("https://sciences.social/api/v1/instance/activity");
  if (res.ok) {
    const j = await(res.json())
    return j;
  }
}

async function activityPlot() {
  const j = await getActivity()
  const plotData = j.map((d)=>{
    return {week:new Date(Number(d.week) * 1000), posts:Number(d.statuses)}
    });
  console.log(plotData)
  const plot = Plot.line(plotData, {x:"week", y:"posts"}).plot();
  const div = document.querySelector("#myplot");
  div.append(plot);
}

async function getServerInfo() {
  const res = await fetch("https://sciences.social/api/v2/instance");
  if (res.ok) {
    const j = await(res.json())
    return j
  } else {
    return null;
  }
}

async function getPublicTimeline() {
  const res = await fetch("https://sciences.social/api/v1/timelines/public?local=true&limit=1");
  if (res.ok) {
    const j = await res.json();
    return j;
  } else {
    return null;
  }
}

getPublicTimeline().then(timeline =>{
  console.log(timeline);
  const statusDiv = document.querySelector("#server-status")
  if (!statusDiv) {
    console.error("Couldn't find status div");
    return;
  }
  console.log()
  if (!timeline) {
    statusDiv.innerText = "Could not connect with server. Check messages below for status, or email markigra (at) sciences.social if there are no status updates.";
  } else {
    lastPostTime = new Date(timeline[0].created_at)
    const diff = new Date().getTime() - lastPostTime.getTime();
    const minutes = Math.floor((diff/1000)/60);
    const minuteText = minutes == 1 ? "1 minute" : (minutes < 1 ? "< 1 minute" : minutes + " minutes");
    statusDiv.innerText = `Status OK. Last public post ${minuteText} ago.`;
  }

})