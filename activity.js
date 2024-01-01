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
  }
}

getServerInfo().then(serverInfo=>{
  if (!serverInfo) {
    return;
  }
  const div = document.querySelector("#update")
  div.innerText = `sciences.social had ${serverInfo.userInfo`})