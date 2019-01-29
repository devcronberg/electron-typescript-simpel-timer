import { ipcRenderer, shell } from "electron";
import $ = require("jquery");
import * as moment from "moment";

const indstillinger = {
  tid: 15,
  til: moment().add(15, "minutes"),
  beep: false
};
indstillinger.til = moment().add(indstillinger.tid, "minutes");
$("#tid").val(indstillinger.tid);
$("section#indstillinger").hide();
$("body").css("animation-name", "colorWhite");

setInterval(() => {
  const diff = indstillinger.til.diff(moment());

  if (parseInt(moment.utc(diff).format("m"), 10) < 3) {
    $("body").css("animation-name", "colorYellow");
  }

  if (parseInt(moment.utc(diff).format("m"), 10) < 1) {
    $("body").css("animation-name", "colorRed");
    if (parseInt(moment.utc(diff).format("s"), 10) < 1) {
      $("body").css("animation-name", "colorDone");
    }
  }

  if (diff < 0) {
    if (indstillinger.beep === false) {
      shell.beep();
      indstillinger.beep = true;
    }
  } else {
    $("section#timer10 .value").text(moment.utc(diff).format("mm:ss"));
    $("section#timer2  .value").text(
      byteString(parseInt(moment.utc(diff).format("mm"), 10)) +
        ":" +
        byteString(parseInt(moment.utc(diff).format("ss"), 10))
    );
    $("section#timer16  .value").text(
      pad(hexString(parseInt(moment.utc(diff).format("mm"), 10)), 2) +
        ":" +
        pad(hexString(parseInt(moment.utc(diff).format("ss"), 10)), 2)
    );

    $("section#timer8 .value").text(
      pad(octalString(parseInt(moment.utc(diff).format("mm"), 10)), 2) +
        ":" +
        pad(octalString(parseInt(moment.utc(diff).format("ss"), 10)), 2)
    );
  }
}, 1000);

function byteString(n: number): string {
  return ("000000000" + n.toString(2)).substr(-8);
}

function hexString(n: number): string {
  return n.toString(16).toUpperCase();
}

function octalString(n: number): string {
  return n.toString(8).toUpperCase();
}

function pad(n: string, width: number): string {
  const z = "0";
  return n.toString().length >= width
    ? n.toString()
    : new Array(width - n.toString().length + 1).join(z) + n;
}

ipcRenderer.on("menu", (e: any, d: any) => {
  $("section").hide();

  if (d.type === "indstillinger") {
    $("section#indstillinger").show(1000);
  }
});

$("#gem").click(() => {
  indstillinger.tid = parseInt(
    $("#tid")
      .val()
      .toString(),
    10
  );
  indstillinger.til = moment().add(indstillinger.tid, "minutes");
  $("body").css("animation-name", "colorWhite");
  $("section").show();
  indstillinger.beep = false;
  $("section#indstillinger").hide();
});
