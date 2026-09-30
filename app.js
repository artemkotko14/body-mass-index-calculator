const bmiNumber = document.getElementById("bmi-number");
const heightInputCm = document.getElementById("height-input-cm");
const heightInputIn = document.getElementById("height-input-in");
const heightInputFt = document.getElementById("height-input-ft");
const weightInputKg = document.getElementById("weight-input-kg");
const weightInputLbs = document.getElementById("weight-input-lbs");
const weightInputSt = document.getElementById("weight-input-st");
const classification = document.getElementById("classification");
const bmiDescriptionStarter = document.getElementById(
  "bmi-description-starter",
);
const bmiDescriptionValue = document.getElementById("bmi-description-value");
const minWeight = document.getElementById("min-weight");
const maxWeight = document.getElementById("max-weight");
const bmiLabelStarter = document.getElementById("bmi-label-starter");
const bmiValue = document.getElementById("bmi-value");
const metric = document.getElementById("metric");
const imperial = document.getElementById("imperial");
const imperialForm = document.getElementById("imperial-form");
const metricForm = document.getElementById("metric-form");
const inputWrappers = document.querySelectorAll(".input-wrapper");
const bmiResult = document.getElementById("bmi-result");
const vector24Imgs = document.querySelectorAll(".vector-24-container");

//Metric
function calcBMIMetric() {
  if (heightInputCm.value === "" || weightInputKg.value === "") {
    return "Pending";
  }
  let h = Number(heightInputCm.value) / 100;
  let w = Number(weightInputKg.value);

  if (h <= 0 || w <= 0) {
    return "Invalid value";
  }
  if (h > 2.5 || w > 400) {
    return "Out of range";
  }
  if (h && w) {
    return (w / h ** 2).toFixed(1);
  }

  return "Pending";
}
[heightInputCm, weightInputKg].forEach((input) => {
  input.addEventListener("input", () => {
    updateBMI();
  });
});

//Imperial
function calcBMIImperial() {
  if (
    heightInputFt.value === "" ||
    weightInputLbs.value === "" ||
    heightInputIn.value === "" ||
    weightInputSt.value === ""
  ) {
    return "Pending";
  }
  if (
    Number(heightInputFt.value) <= 0 ||
    Number(heightInputIn.value) < 0 ||
    Number(heightInputIn.value) > 11 ||
    Number(weightInputSt.value) <= 0 ||
    Number(weightInputLbs.value) < 0 ||
    Number(weightInputLbs.value) > 13
  ) {
    return "Invalid value";
  }

  let h = Number(heightInputFt.value) * 12 + Number(heightInputIn.value);
  let w = Number(weightInputSt.value) * 14 + Number(weightInputLbs.value);

  if (h > 98.4 || w > 882) {
    return "Out of range";
  }
  if (h && w) {
    return ((w / h ** 2) * 703).toFixed(1);
  }

  return "Pending";
}
[heightInputFt, weightInputLbs, heightInputIn, weightInputSt].forEach(
  (input) => {
    input.addEventListener("input", () => {
      updateBMI();
    });
  },
);

[metric, imperial].forEach((input) => {
  input.addEventListener("change", () => {
    if (imperial.checked) {
      metricForm.classList.add("hidden");
      imperialForm.classList.remove("hidden");
    }
    if (metric.checked) {
      imperialForm.classList.add("hidden");
      metricForm.classList.remove("hidden");
    }
    if (bmiValue.classList.contains("hidden")) {
      return;
    } else {
      updateBMI();
    }
  });
});

function updateBMI() {
  if (imperial.checked) {
    let bmi = calcBMIImperial();
    updateBMIResult(bmi);
    let [minStones, minPounds] = calcMinWeight();
    let [maxStones, maxPounds] = calcMaxWeight();
    minWeight.innerText = `${minStones}st ${minPounds}lbs`;
    maxWeight.innerText = `${maxStones}st ${maxPounds}lbs`;
  } else {
    let bmi = calcBMIMetric();
    updateBMIResult(bmi);

    let minW = calcMinWeight()[0];
    let maxW = calcMaxWeight()[0];

    minWeight.innerText = `${minW}kgs`;
    maxWeight.innerText = `${maxW}kgs`;
  }
}

function updateBMIResult(bmi) {
  bmiNumber.innerText = bmi;
  bmiLabelStarter.classList.add("hidden");
  bmiValue.classList.remove("hidden");
  updateBMIResultLayout();

  if (bmi !== "Pending" && bmi !== "Invalid value" && bmi !== "Out of range") {
    bmiDescriptionStarter.classList.add("hidden");
    bmiDescriptionValue.classList.remove("hidden");
  } else {
    bmiDescriptionStarter.classList.remove("hidden");
    bmiDescriptionValue.classList.add("hidden");
  }

  classification.innerText = classifyWeight(bmi);
}

function calcMinWeight() {
  let w;
  let wRemains;
  if (metric.checked) {
    let h = Number(heightInputCm.value) / 100;
    w = (18.5 * h ** 2).toFixed(1);
  } else {
    let h = Number(heightInputFt.value) * 12 + Number(heightInputIn.value);
    let wLbs = (18.5 * h ** 2) / 703;
    w = Math.floor(wLbs / 14);
    wRemains = Math.floor(wLbs - w * 14);
  }
  return [w, wRemains];
}
function calcMaxWeight() {
  let w;
  let wRemains;
  if (metric.checked) {
    let h = Number(heightInputCm.value) / 100;
    w = (24.9 * h ** 2).toFixed(1);
  } else {
    let h = Number(heightInputFt.value) * 12 + Number(heightInputIn.value);
    let wLbs = (24.9 * h ** 2) / 703;
    w = Math.floor(wLbs / 14);
    wRemains = Math.floor(wLbs - w * 14);
  }
  return [w, wRemains];
}
function classifyWeight(bmi) {
  if (metric.checked) {
    if (!weightInputKg.value || !heightInputCm.value) {
      return null;
    }
  } else {
    if (
      !weightInputLbs.value ||
      !heightInputIn.value ||
      !weightInputSt.value ||
      !heightInputFt.value
    ) {
      return null;
    }
  }
  if (bmi < 18.5) {
    return "an underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "a healthy weight";
  } else if (bmi >= 25 && bmi < 30) {
    return "an overweight";
  } else {
    return "an obese";
  }
}
inputWrappers.forEach((wrapper) => {
  wrapper.addEventListener("click", () => {
    wrapper.querySelector("input").focus();
  });
});
function showCurve() {
  vector24Imgs.forEach((vector24) => {
    if (window.innerWidth >= 950) {
      vector24.classList.remove("hidden");
    } else {
      vector24.classList.add("hidden");
    }
  });
}
function updateBMIResultLayout() {
  if (!bmiValue.classList.contains("hidden") && window.innerWidth >= 600) {
    bmiResult.classList.add("bmi-different");
  } else {
    bmiResult.classList.remove("bmi-different");
  }
}

window.addEventListener("resize", () => {
  showCurve();
  updateBMIResultLayout();
});
showCurve();
