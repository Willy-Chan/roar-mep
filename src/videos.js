import jsPsychVideoKeyboardResponse from "@jspsych/plugin-video-keyboard-response";
import jsPsychImageButtonResponse from "@jspsych/plugin-image-button-response";
import { config } from "./config";
import { imgContent, videoContent } from "./preload";

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
console.log(`isMobile: ${isMobile()}`);

const kwargs = {
  type: jsPsychVideoKeyboardResponse,
  choices: config.testingOnly ? "ALL_KEYS" : "NO_KEYS",
  trial_ends_after_video: true,
  autoplay: !isMobile(),
  controls: isMobile(),
  width: 1238,
  height: 800,
  response_allowed_while_playing: config.testingOnly,
  on_load: () => {
    const video = document.getElementById("jspsych-video-keyboard-response-stimulus");
    video.setAttribute("playsinline", "");
  },
};

const buttonHtml = `<button class="star-center transparent"><img draggable="false" style="width: 350px; height: 350px;" src="${imgContent.star}" /></button>`;
const clickStarTrial = {
  type: jsPsychImageButtonResponse,
  stimulus: [imgContent.advance],
  choices: [""],
  button_html: buttonHtml,
  stimulus_width: 1238,
  data: {
    task: "continue_from_video",
  },
  margin_vertical: "inherit",
  margin_horizontal: "inherit",
};

let videoTrials;

/* define instructions trial */
if (config.precue) {
  const introTrial = [{
    stimulus: [videoContent.intro],
    ...kwargs,
  }, clickStarTrial];

  const postPracticeTrial = [{
    stimulus: [videoContent.postPractice],
    ...kwargs,
  }, clickStarTrial];

  const midBlock1Trial = [{
    stimulus: [videoContent.midBlock1],
    ...kwargs,
  }, clickStarTrial];

  const postBlock1Trial = [{
    stimulus: [videoContent.postBlock1],
    ...kwargs,
  }, clickStarTrial];

  const midBlock2Trial = [{
    stimulus: [videoContent.midBlock2],
    ...kwargs,
  }, clickStarTrial];

  const postBlock2Trial = [{
    stimulus: [videoContent.postBlock2],
    ...kwargs,
  }, clickStarTrial];

  const midBlock3Trial = [{
    stimulus: [videoContent.midBlock3],
    ...kwargs,
  }, clickStarTrial];

  const postBlock3Trial = [{
    stimulus: [videoContent.postBlock3],
    ...kwargs,
  }, clickStarTrial];

  const midBlock4Trial = [{
    stimulus: [videoContent.midBlock4],
    ...kwargs,
  }, clickStarTrial];

  const postBlock4Trial = [{
    stimulus: [videoContent.postBlock4],
    ...kwargs,
  }, clickStarTrial];

  const midBlock5Trial = [{
    stimulus: [videoContent.midBlock5],
    ...kwargs,
  }, clickStarTrial];

  const endTrial = [{
    stimulus: [videoContent.end],
    ...kwargs,
  }, clickStarTrial];

  videoTrials = {
    intro: introTrial,
    postPractice: postPracticeTrial,
    midBlock1: midBlock1Trial,
    postBlock1: postBlock1Trial,
    midBlock2: midBlock2Trial,
    postBlock2: postBlock2Trial,
    midBlock3: midBlock3Trial,
    postBlock3: postBlock3Trial,
    midBlock4: midBlock4Trial,
    postBlock4: postBlock4Trial,
    midBlock5: midBlock5Trial,
    end: endTrial,
  };
} else {
  const videoPrefix = config.pseudoFont ? "pseudo" : "latin";

  const introTrial = [{
    stimulus: [videoContent[`${videoPrefix}Intro`]],
    ...kwargs,
  }, clickStarTrial];

  const postPracticeTrial = [{
    stimulus: [videoContent[`${videoPrefix}PostPractice`]],
    ...kwargs,
  }, clickStarTrial];

  const postTwoLetterBlockTrial = [{
    stimulus: [videoContent[`${videoPrefix}Post2Block`]],
    ...kwargs,
  }, clickStarTrial];

  const postBlock1Trial = [{
    stimulus: [videoContent[`${videoPrefix}Block1`]],
    ...kwargs,
  }, clickStarTrial];

  const rewardAnimation1Trial = [{
    stimulus: [videoContent[`${videoPrefix}RewardAnimation1`]],
    ...kwargs,
  }, clickStarTrial];

  const rewardAnimation2Trial = [{
    stimulus: [videoContent[`${videoPrefix}RewardAnimation2`]],
    ...kwargs,
  }, clickStarTrial];

  const endTrial = [{
    stimulus: [videoContent[`${videoPrefix}End`]],
    ...kwargs,
  }, clickStarTrial];

  videoTrials = {
    intro: introTrial,
    postPractice: postPracticeTrial,
    postTwoLetterBlock: postTwoLetterBlockTrial,
    postBlock1: postBlock1Trial,
    rewardAnimation1: rewardAnimation1Trial,
    rewardAnimation2: rewardAnimation2Trial,
    end: endTrial,
  };
}

const videoExports = videoTrials;
export default videoExports;
