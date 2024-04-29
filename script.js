const step3Form = document.querySelector(".step-3");
const step2Form = document.querySelector(".step-2");
const steps = document.querySelectorAll(".main-info");
const btnContainers = document.querySelectorAll(".btn-container");
const stepBtnContainer = document.querySelector(".list-of-buttons");
const stepBtns = document.querySelectorAll(".step-btn");
const nextStepBtn = document.querySelector(".next-btn");
const addOnContainer = document.querySelector(".add-ons-conotainer");
const stepContainer = document.querySelector(".step-container");
const btnContainerWrapper = document.querySelector(".list-of-btn-container");
let stepBoxContainer;
const choosePlanTypeContainer = document.querySelector(
  ".main-info__choose-plan"
);
const planTypeSwitcherBall = document.querySelector(
  ".main-info__switcher-ball"
);
const allTypeOfPlans = document.querySelectorAll(".main-info__select-plan");
const planContainer = document.querySelector(".plan-container");
const planPriceArcade = document.querySelector(
  ".main-info__select-plan-price--arcade"
);
const planPriceAdvacned = document.querySelector(
  ".main-info__select-plan-price--advanced"
);
const planPricePro = document.querySelector(
  ".main-info__select-plan-price--pro"
);
const freePackage = document.querySelectorAll(".main-info__select-plan-free");

const planPriceOnlineService = document.querySelector(
  ".add-ons-price--online-service"
);
const planPriceLargerStorage = document.querySelector(
  ".add-ons-price--larger-storage"
);
const planPriceCustomizableProfile = document.querySelector(
  ".add-ons-price--customizable-profile"
);
const wrapper = document.querySelector(".wrapper");
const finshCheckoutContainer = document.querySelector(".main-info__checkout");
const changeButton = document.querySelector(".main-info__plan-title-modify");
const confirmButton = document.querySelector(".confirm-btn");
const step4Form = document.querySelector(".step-4");

//state
let planTypes = {
  Arcade: { title: "Arcade", monthly: "$9/mo", yearly: "$90/yr" },
  Advanced: { title: "Advanced", monthly: "$12/mo", yearly: "$120/yr" },
  Pro: { title: "Pro", monthly: "$15/mo", yearly: "150/yr" },
  Online_service: {
    title: "Online service",
    monthly: "+$1/mo",
    yearly: "+$10/yr",
  },
  Larger_storage: {
    title: "Larger storage",
    monthly: "+$2/mo",
    yearly: "+$20/yr",
  },
  Customizable_profile: {
    title: "Customizable profile",
    monthly: "+$2/mo",
    yearly: "+$20/yr",
  },
};

let selectedPlanType = {
  planTitle: `${planTypes["Arcade"].title}`,
  planPrice: `${planTypes["Arcade"].monthly}`,
};

let selectedAddons = [
  {
    planType: `${planTypes["Online_service"].title}`,
    planPrice: `${planTypes["Online_service"].monthly}`,
  },
  {
    planType: `${planTypes["Larger_storage"].title}`,
    planPrice: `${planTypes["Larger_storage"].monthly}`,
  },
];

selectedAddons.map((addon) => {
  return ` <div class="main-info__plan main-info__plan-service">
                  <p class="main-info__plan-title">${addon.planType}</p>

                  <p class="main-info__plan-text">${addon.planPrice}</p>
                </div>`;
});

step2Form.addEventListener("click", function (e) {
  e.preventDefault();

  const selectedPlan = e.target.closest(".main-info__select-plan");

  if (!selectedPlan) return;

  allTypeOfPlans.forEach((plan) => {
    plan.classList.remove("main-info__select-plan--active");
  });

  selectedPlan.classList.add("main-info__select-plan--active");
});

step3Form.addEventListener("click", function (event) {
  const addOn = event.target.closest(".add-ons");

  if (!addOn) return;

  const input = addOn.querySelector("input[type='checkbox']");

  if (!input.checked) {
    input.checked = true;
    addOn.classList.add("checked-addon");
  } else {
    input.checked = false;
    addOn.classList.remove("checked-addon");
  }
});

const initPosition = function (element, i) {
  element.style.transform = `translateX(${i * 100}%)`;
};

[steps, btnContainers].forEach((element) => {
  element.forEach(initPosition);
});

const stepTitles = ["your info", "select plan", "add-ons", "summary"];

//inserting the number step buttons
const insertingTheNumberOfStepBtnsAvailable = function () {
  steps.forEach((_, i) => {
    if (i !== 4) {
      let markup = `
    <div class="step-box">
    <input
              type="radio"
              name="step"
              value="${i + 1}"
              id="step-${i + 1}"
              class="sr-only"
              data-slide="${i}"
            />

            <label for="step-${i + 1}" class="step-btn">${i + 1}</label>

           <div class = "step-box__container hidden">
           <p class= "step-number">step ${i + 1}</p>

           <p class= "step-title">${stepTitles[i]}</p>
           </div>
          </div>`;

      stepBtnContainer.insertAdjacentHTML("beforeend", markup);
    }
  });

  stepBoxContainer = document.querySelectorAll(".step-box__container");
};

insertingTheNumberOfStepBtnsAvailable();

let curStep = 0;
let slideLength = steps.length;
let working = false;

const gotoSlide = function (slide) {
  const goto = function (el, index) {
    el.style.transform = `translateX(${(index - slide) * 100}%)`;
  };

  steps.forEach(goto);

  steps.forEach((step) => {
    step.classList.remove("hidden");
  });

  steps.forEach((step, i) => {
    if (i !== slide) {
      step.classList.add("hidden");
    }
  });

  btnContainers.forEach(goto);
};

const activateStepBtn = function (stepBtn) {
  const btn = document.querySelector(`label[for = step-${stepBtn}]`);

  //removing the active class from all of the buttons
  document.querySelectorAll(`.step-btn`).forEach((btn) => {
    btn.classList.remove("step-btn--active");
  });

  if (stepBtn !== 5) {
    //add the active class to the button
    btn.classList.add("step-btn--active");
  }
};

//goto the first step
gotoSlide(curStep);

//activate the first step btn
activateStepBtn(curStep + 1);

const moveToTheNextFormStep = function () {
  if (curStep === slideLength - 1) {
    curStep = 0;

    gotoSlide(curStep);
    activateStepBtn(curStep + 1);
  } else {
    curStep++;
    gotoSlide(curStep);
    activateStepBtn(curStep + 1);
  }
};

const moveBackToThePreviousFormStep = function () {
  if (curStep === 0) {
    curStep = slideLength - 1;

    gotoSlide(curStep);
    activateStepBtn(curStep + 1);
  } else {
    curStep--;

    gotoSlide(curStep);
    activateStepBtn(curStep + 1);
  }
};

//change the steps from the step btn number
stepBtnContainer.addEventListener("click", function (e) {
  const stepInput = e.target.closest("input[name='step']");

  if (!stepInput) return;

  const stepNumber = +stepInput.dataset.slide;

  //go to the clicked step
  gotoSlide(stepNumber);

  //update the curSlide
  curStep = stepNumber;

  //active the clicked step
  activateStepBtn(stepNumber + 1);
});

//### form validation ###
//### step-1 ###
const nameInputField = document.getElementById("name");
const emailInputField = document.getElementById("email");
const phoneInputField = document.getElementById("phone");

//### validators ###
const validateFieldRequired = function (value) {
  return value === "" ? "This field is required" : null;
};

const validateOnlyAlphabets = function (value) {
  return /^[a-zA-Z\s]+$/.test(value)
    ? null
    : "Only Alphabet characters are required";
};

const validateEmail = function (value) {
  return /^([a-zA-Z\d'.-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/.test(
    value
  )
    ? null
    : "Invalid email address";
};

const validatePhoneNumber = function (value) {
  return /^\+[\d]+$/.test(value) ? null : "Invalid phone number";
};

//### show and hide error messages ###
const showErrorMessage = function (inputElement, errorMessage) {
  const errorShowingElement = inputElement.nextElementSibling;

  errorShowingElement.classList.remove("hidden");
  errorShowingElement.textContent = `${errorMessage}`;
  inputElement.classList.add("error-active");
};

const hideErrorMessage = function (inputElement) {
  const errorShowingElement = inputElement.nextElementSibling;

  errorShowingElement.classList.add("hidden");
  errorShowingElement.textContent = ``;
  inputElement.classList.remove("error-active");
};

const validateField = function (validators, value) {
  for (const validator of validators) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }

  return null;
};

btnContainerWrapper.addEventListener("click", function (e) {
  e.preventDefault();

  //when the goBackBtn is clicked
  const goBackBtn = e.target.closest(".go-back-btn");
  //when the nextBtn is clicked
  const nextBtn1 = e.target.closest(".next-btn1");
  const nextBtn2 = e.target.closest(".next-btn2");
  //when the third nextBtn is clicked
  const nextBtn3 = e.target.closest(".next-btn3");

  let form1Error = [];
  let form3Error = [];

  //step 1 form validation
  //when the first nextStep btn is clicked
  if (nextBtn1) {
    const fields = [
      {
        inputField: nameInputField,
        validators: [validateFieldRequired, validateOnlyAlphabets],
      },
      {
        inputField: emailInputField,
        validators: [validateFieldRequired, validateEmail],
      },
      {
        inputField: phoneInputField,
        validators: [validateFieldRequired, validatePhoneNumber],
      },
    ];

    for (const field of fields) {
      const error = validateField(field.validators, field.inputField.value);

      if (error) {
        form1Error.push(error);
        showErrorMessage(field.inputField, error);
      } else {
        hideErrorMessage(field.inputField);
      }
    }

    //when there is no error move the form field to the next step
    if (form1Error.length === 0) {
      moveToTheNextFormStep();

      const planTypeSwitcherBall = document.querySelector(
        ".main-info__switcher-ball"
      );

      //### when the plan type is monthly type ###
      if (planTypeSwitcherBall.classList.contains("monthly-plan-type")) {
        //change the max width of the step2 container
        stepContainer.style.maxWidth = "22.75rem";

        //change the height of the step container
        // stepContainer.style.height = "34.998rem";
        stepContainer.style.height = "36.998rem";

        //change the height of the wrapper element
        // wrapper.style.height = "44.789rem";
        // wrapper.style.height = "46.789rem";
      } else {
        //### when plan type is yearly type ###
        //change the max width of the step container
        stepContainer.style.maxWidth = "24rem";

        //change the height of the step container
        // stepContainer.style.height = "39.998rem";
        stepContainer.style.height = "40.998rem";

        //change the height of the wrapper element
        // wrapper.style.height = "50.789rem";
        // wrapper.style.height = "51.789rem";
      }
    }
  } else if (nextBtn2) {
    moveToTheNextFormStep();
  } else if (nextBtn3) {
    //when the second nextBtn is clicked

    const selectedAddOn = addOnContainer.querySelector(".checked-addon");

    //if there is no selected addon
    if (!selectedAddOn) {
      const error = "you haven't selected any add-ons";

      form3Error.push(error);

      //showErrorMessage
      showErrorMessage(addOnContainer, error);
    } else {
      //when the user select from the available add-ons
      moveToTheNextFormStep();
      hideErrorMessage(addOnContainer);
    }
  } else if (goBackBtn) {
    //move to the preivious form step when the go back btn is clicked
    moveBackToThePreviousFormStep();
  }
});

//changing the height of the step 2 form from the step buttons
stepBtnContainer.addEventListener("click", function () {
  const stepBtnActive = document.querySelector(".step-btn--active");
  const planTypeSwitcherBall = document.querySelector(
    ".main-info__switcher-ball"
  );

  const stepBtnNumber = +stepBtnActive?.textContent;

  if (
    stepBtnNumber === 2 &&
    planTypeSwitcherBall.classList.contains("monthly-plan-type")
  ) {
    //change the max width of the step2 container
    stepContainer.style.maxWidth = "22.75rem";

    //change the height of the step container
    stepContainer.style.height = "36.998rem";
  } else if (
    stepBtnNumber === 2 &&
    planTypeSwitcherBall.classList.contains("yearly-plan-type")
  ) {
    //change the max width of the step container
    stepContainer.style.maxWidth = "24rem";

    //change the height of the step container
    stepContainer.style.height = "40.998rem";
  }
});

//change the plan types
choosePlanTypeContainer.addEventListener("click", function (e) {
  const planTypeElement = e.target.closest(".main-info__choose-plan-type");

  if (!planTypeElement) return;

  const planType = planTypeElement.textContent.trim();

  if (planType === "Monthly") {
    planTypeSwitcherBall.classList.remove("yearly-plan-type");
    planTypeSwitcherBall.classList.add("monthly-plan-type");
  } else {
    planTypeSwitcherBall.classList.remove("monthly-plan-type");
    planTypeSwitcherBall.classList.add("yearly-plan-type");
  }
});

//change the plan types
choosePlanTypeContainer.addEventListener("click", function (e) {
  const planTypeSwitcherElement = e.target.closest(".main-info__switcher-ball");

  if (!planTypeSwitcherElement) return;

  if (planTypeSwitcherElement.classList.contains("monthly-plan-type")) {
    planTypeSwitcherElement.classList.remove("monthly-plan-type");
    planTypeSwitcherElement.classList.add("yearly-plan-type");
  } else {
    planTypeSwitcherElement.classList.remove("yearly-plan-type");
    planTypeSwitcherElement.classList.add("monthly-plan-type");
  }
});

//change the price on the plan
choosePlanTypeContainer.addEventListener("click", function (e) {
  const planType = e.target.closest(".main-info__choose-plan-type");
  const planTypeSwitcherBall = e.target.closest(".main-info__switcher-ball");

  if (planType || planTypeSwitcherBall) {
    const planTypeContent = planType?.textContent.trim();

    if (
      planTypeContent === "Monthly" ||
      planTypeSwitcherBall?.classList.contains("monthly-plan-type")
    ) {
      planPriceArcade.textContent = `$9/mo`;
      planPriceAdvacned.textContent = `$12/mo`;
      planPricePro.textContent = `$15/mo`;
      planPriceOnlineService.textContent = `+$1/mo`;
      planPriceLargerStorage.textContent = `+$2/mo`;
      planPriceCustomizableProfile.textContent = `$2/mo`;
      //making the free month package invisible
      freePackage.forEach((package) => {
        package.classList.add("hidden");
      });

      //the title on the finish up form 'Plan' Title
      const finishupFormPlanTitle = document
        .querySelector(".main-info__plan--arcade")
        .querySelector(".main-info__plan-title")
        .textContent.split("(")[0]
        .trim();

      //change the title on the selected plan
      document
        .querySelector(".main-info__plan--arcade")
        .querySelector(
          ".main-info__plan-title"
        ).textContent = `${finishupFormPlanTitle}(Monthly)`;

      //the price on the finish up form Plan Price
      const finishupFormPlanPrice = document
        .querySelector(".main-info__plan--arcade")
        .querySelector(".main-info__plan-text");

      finishupFormPlanPrice.textContent =
        planTypes[finishupFormPlanTitle].monthly;

      //all the plans except the first one
      document.querySelectorAll(".main-info__plan").forEach((plan, i) => {
        if (i !== 0) {
          const addonPrice = plan.querySelector(".main-info__plan-text");

          addonPrice.textContent =
            planTypes[
              plan
                .querySelector(".main-info__plan-title")
                .textContent.trim()
                .split(" ")
                .join("_")
            ].monthly;
        }
      });

      //change the price on the total to yearly
      const totalTitleElement = document.querySelector(
        ".main-info__total-title"
      );

      totalTitleElement.textContent = `Total (per month)`;

      const priceElements = document.querySelectorAll(".main-info__plan-text");

      let totalPrice = 0;

      priceElements.forEach((Element) => {
        const price = +Element.textContent.match(/\d+/)[0];

        totalPrice += price;
      });

      const totalPriceElement = document.querySelector(
        ".main-info__total-text"
      );

      totalPriceElement.textContent = `+$${totalPrice}/mo`;

      //change the max width of the step2 container
      stepContainer.style.maxWidth = "22.75rem";

      //change the height of the step container
      stepContainer.style.height = "36.998rem";
    } else if (
      planTypeContent === "Yearly" ||
      planTypeSwitcherBall?.classList.contains("yearly-plan-type")
    ) {
      planPriceArcade.textContent = `$90/yr`;
      planPriceAdvacned.textContent = `$120/yr`;
      planPricePro.textContent = `$150/yr`;
      planPriceOnlineService.textContent = `+$10/yr`;
      planPriceLargerStorage.textContent = `+$20/yr`;
      planPriceCustomizableProfile.textContent = `+$20/yr`;

      //the title on the finish up form Plan Title
      const finishupFormPlanTitle = document
        .querySelector(".main-info__plan--arcade")
        .querySelector(".main-info__plan-title")
        .textContent.split("(")[0]
        .trim();

      //the price on the finish up form Plan Price
      const finishupFormPlanPrice = document
        .querySelector(".main-info__plan--arcade")
        .querySelector(".main-info__plan-text");

      //change the title on the selected plan
      document
        .querySelector(".main-info__plan--arcade")
        .querySelector(
          ".main-info__plan-title"
        ).textContent = `${finishupFormPlanTitle}(Yearly)`;

      //all the plans except the first one
      document.querySelectorAll(".main-info__plan").forEach((plan, i) => {
        if (i !== 0) {
          const addonPrice = plan.querySelector(".main-info__plan-text");

          addonPrice.textContent =
            planTypes[
              plan
                .querySelector(".main-info__plan-title")
                .textContent.trim()
                .split(" ")
                .join("_")
            ].yearly;
        }
      });

      finishupFormPlanPrice.textContent =
        planTypes[finishupFormPlanTitle].yearly;

      //change the price on the total to yearly
      const totalTitleElement = document.querySelector(
        ".main-info__total-title"
      );

      totalTitleElement.textContent = `Total (per year)`;

      const priceElements = document.querySelectorAll(".main-info__plan-text");

      let totalPrice = 0;

      priceElements.forEach((Element) => {
        const price = +Element.textContent.match(/\d+/)[0];

        totalPrice += price;
      });

      const totalPriceElement = document.querySelector(
        ".main-info__total-text"
      );

      totalPriceElement.textContent = `+$${totalPrice}/yr`;

      //change the max width of the step container
      stepContainer.style.maxWidth = "24rem";

      //change the height of the step container
      stepContainer.style.height = "40.998rem";

      //making the free month package visible
      freePackage.forEach((package) => {
        package.classList.remove("hidden");
      });
    }
  }
});

//add up all the selected plans on the finish step
stepContainer.addEventListener("click", function (e) {
  const selectedPlan = e.target.closest(".main-info__select-plan");
  const selectedAddOn = e.target.closest(".add-ons");

  selectedPlanType.planSwitcherBallType =
    planTypeSwitcherBall.classList.contains("monthly-plan-type")
      ? "Monthly"
      : "Yearly";

  //if we made a change on the plan on the step 2 form
  if (selectedPlan) {
    selectedPlanType.planTitle = selectedPlan
      .querySelector(".main-info__select-plan-type")
      .textContent.trim();

    selectedPlanType.planPrice = selectedPlan
      .querySelector(".main-info__select-plan-price")
      .textContent.trim();

    finshCheckoutContainer.innerHTML = "";

    const checkedAddons = step3Form.querySelectorAll(".checked-addon");

    selectedAddons = Array.from(checkedAddons).map((addon) => {
      const title = addon.querySelector(".add-ons__title").textContent.trim();
      const price = addon.querySelector(".add-ons__price").textContent.trim();

      return {
        planType: title,
        planPrice: price,
      };
    });

    finshCheckoutContainer.insertAdjacentHTML(
      "afterbegin",
      `  <div class="main-info__plan-container">
                  <div class="main-info__plan main-info__plan--arcade">
                    <div class="main-info__plan-wrapper">
                      <p class="main-info__plan-title color-marine-blue">
                        ${selectedPlanType.planTitle}(${
        selectedPlanType.planSwitcherBallType
      })
                      </p>

                      <p class="main-info__plan-title-modify">Change</p>
                    </div>

                    <p class="main-info__plan-text font-ff-bold">${
                      selectedPlanType.planPrice
                    }</p>
                  </div>

                  
                  
    ${selectedAddons
      .map((addon) => {
        return ` <div class="main-info__plan main-info__plan-service">
                  <p class="main-info__plan-title">${addon.planType}</p>

                  <p class="main-info__plan-text">${addon.planPrice}</p>
                </div>`;
      })
      .join("")}
     </div>
    `
    );

    const priceElements = document.querySelectorAll(".main-info__plan-text");

    let totalPrice = 0;

    priceElements.forEach((Element) => {
      const price = +Element.textContent.match(/\d+/)[0];

      totalPrice += price;
    });

    finshCheckoutContainer.insertAdjacentHTML(
      "beforeend",
      ` <div class="main-info__total">
        <p class="main-info__total-title">Total (per ${
          selectedPlanType.planSwitcherBallType
        })</p>

        <p class="main-info__total-text font-size-1">+$${totalPrice}/${
        selectedPlanType.planSwitcherBallType === "Monthly" ? "mo" : "yr"
      }</p>
      </div>`
    );
  } else if (selectedAddOn) {
    //if we made a change on the add on the step 3
    const checkedAddons = step3Form.querySelectorAll(".checked-addon");

    selectedAddons = Array.from(checkedAddons).map((addon) => {
      const title = addon.querySelector(".add-ons__title").textContent.trim();
      const price = addon.querySelector(".add-ons__price").textContent.trim();

      return {
        planType: title,
        planPrice: price,
      };
    });

    finshCheckoutContainer.innerHTML = "";

    finshCheckoutContainer.insertAdjacentHTML(
      "afterbegin",
      `  <div class="main-info__plan-container">
                  <div class="main-info__plan main-info__plan--arcade">
                    <div class="main-info__plan-wrapper">
                      <p class="main-info__plan-title color-marine-blue">
                        ${selectedPlanType.planTitle}(${
        selectedPlanType.planSwitcherBallType
      })
                      </p>

                      <p class="main-info__plan-title-modify">Change</p>
                    </div>

                    <p class="main-info__plan-text font-ff-bold">${
                      selectedPlanType.planPrice
                    }</p>
                  </div>

                  
    ${selectedAddons
      .map((addon) => {
        return ` <div class="main-info__plan main-info__plan-service">
                  <p class="main-info__plan-title">${addon.planType}</p>

                  <p class="main-info__plan-text">${addon.planPrice}</p>
                </div>`;
      })
      .join("")}
     </div>
    `
    );

    const priceElements = document.querySelectorAll(".main-info__plan-text");

    let totalPrice = 0;

    priceElements.forEach((Element) => {
      const price = +Element.textContent.match(/\d+/)[0];

      totalPrice += price;
    });

    finshCheckoutContainer.insertAdjacentHTML(
      "beforeend",
      ` <div class="main-info__total">
        <p class="main-info__total-title">Total (per ${
          selectedPlanType.planSwitcherBallType === "Monthly" ? "month" : "year"
        })</p>

        <p class="main-info__total-text font-size-1">+$${totalPrice}/ ${
        selectedPlanType.planSwitcherBallType === "Monthly" ? "mo" : "yr"
      }</p>
      </div>`
    );
  }
});

//Taking the user to step 2 form
step4Form.addEventListener("click", function (e) {
  const changeButton = e.target.closest(".main-info__plan-title-modify");

  if (changeButton) {
    //goto the second step form
    curStep = 1;

    //go to form step 2
    gotoSlide(curStep);

    //activate step button 2
    activateStepBtn(curStep + 1);

    const planTypeSwitcherBall = document.querySelector(
      ".main-info__switcher-ball"
    );

    //### when the plan type is monthly type ###
    if (planTypeSwitcherBall.classList.contains("monthly-plan-type")) {
      //change the max width of the step2 container
      stepContainer.style.maxWidth = "22.75rem";

      //change the height of the step container
      // stepContainer.style.height = "34.998rem";
      stepContainer.style.height = "36.998rem";

      //change the height of the wrapper element
      // wrapper.style.height = "45.789rem";
    } else {
      //### when plan type is yearly type ###
      //change the max width of the step container
      stepContainer.style.maxWidth = "24rem";

      //change the height of the step container
      stepContainer.style.height = "40.998rem";

      //change the height of the wrapper element
      // wrapper.style.height = "51.789rem";
    }
  }
});

//the last validation for the confirm button
confirmButton.addEventListener("click", function () {
  let form1Error = [];
  let form3Error = [];

  const fields = [
    {
      inputField: nameInputField,
      validators: [validateFieldRequired, validateOnlyAlphabets],
    },
    {
      inputField: emailInputField,
      validators: [validateFieldRequired, validateEmail],
    },
    {
      inputField: phoneInputField,
      validators: [validateFieldRequired, validatePhoneNumber],
    },
  ];

  for (const field of fields) {
    const error = validateField(field.validators, field.inputField.value);

    if (error) {
      form1Error.push(error);
      showErrorMessage(field.inputField, error);
    } else {
      hideErrorMessage(field.inputField);
    }
  }

  //third validation
  const selectedAddOn = addOnContainer.querySelector(".checked-addon");

  //if there is no selected addon
  if (!selectedAddOn) {
    const error = "you haven't selected any add-ons";

    form3Error.push(error);

    //showErrorMessage
    showErrorMessage(addOnContainer, error);
  } else {
    //when the user select from the available add-ons
    hideErrorMessage(addOnContainer);
  }

  if (form1Error.length === 0 && form3Error.length === 0) {
    moveToTheNextFormStep();
  }
});

const addEvent = function (event, callBack) {
  window.addEventListener(event, callBack);
};

const changeHeightOfTheContainer = function () {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1440) {
    stepContainer.classList.add("size-of-step-container-1");
    stepBoxContainer.forEach((btn) => btn.classList.remove("hidden"));
  } else {
    stepContainer.classList.remove("size-of-step-container-1");
    stepBoxContainer.forEach((btn) => btn.classList.add("hidden"));
  }
};

document.addEventListener("click", changeHeightOfTheContainer);

["load", "resize"].forEach((ev) => {
  addEvent(ev, changeHeightOfTheContainer);
});
