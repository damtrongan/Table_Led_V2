function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("time_display").innerText = h + ":" + m + ":" + s;
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let day = today.getDate();
  //get current date and time
  month = checkTime(month);
  day = checkTime(day);
  const date = day + " / " + month + " / " + year;
  document.getElementById("date_display").innerText = date;
  setTimeout(startTime, 1000);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
startTime();

// setTimeout(() => {
//   if (window.location.pathname === '/table2') {
//     window.location.href = '/';
//   } else {
//     window.location.href = '/table2';
//   }
// }, 5000);

/* let station0;
fetch("/data")npm
  .then((res) => {
    return res.json();
  })
  .then((result) => {
    console.log((station0 = result.station0));
  }); */
