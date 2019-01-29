import { ipcRenderer, shell } from "electron";
import $ = require("jquery");
import * as moment from "moment";
import { Helper } from "./helper";

const timerTid = 1;
const indstillinger: any = {};

const setup = () => {
  indstillinger.tid = timerTid;
  indstillinger.til = moment().add(timerTid, "minutes");
  indstillinger.beep = false;

  $("#tid").val(indstillinger.tid);
  $("section#indstillinger").hide();
  $("body").css("animation-name", "colorWhite");

  ipcRenderer.on("menu", (e: any, d: any) => {
    $("section").hide();

    if (d.type === "indstillinger") {
      $("section#indstillinger").show();
      $("#tid")
        .focus()
        .select();
    }
  });

  $("#tid").keyup(e => {
    if (e.keyCode === 13) {
      $("#gem").trigger("click");
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
};

const mainLoop = () => {
  setInterval(() => {
    const diff = indstillinger.til.diff(moment());
    const diffminutter = parseInt(moment.utc(diff).format("m"), 10);
    const diffsekunder = parseInt(moment.utc(diff).format("s"), 10);

    if (diffminutter < 3) {
      $("body").css("animation-name", "colorWarning");
    }

    if (diffminutter < 1) {
      $("body").css("animation-name", "colorClose");
      if (diffsekunder < 1) {
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
        Helper.byteString(parseInt(moment.utc(diff).format("mm"), 10)) +
          ":" +
          Helper.byteString(parseInt(moment.utc(diff).format("ss"), 10))
      );
      $("section#timer16  .value").text(
        Helper.pad(
          Helper.hexString(parseInt(moment.utc(diff).format("mm"), 10)),
          2
        ) +
          ":" +
          Helper.pad(
            Helper.hexString(parseInt(moment.utc(diff).format("ss"), 10)),
            2
          )
      );

      $("section#timer8 .value").text(
        Helper.pad(
          Helper.octalString(parseInt(moment.utc(diff).format("mm"), 10)),
          2
        ) +
          ":" +
          Helper.pad(
            Helper.octalString(parseInt(moment.utc(diff).format("ss"), 10)),
            2
          )
      );
    }
  }, 1000);
};

setup();
mainLoop();
