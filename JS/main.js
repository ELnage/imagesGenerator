/// <reference types="../@types/jquery" />

AOS.init();
AOS.init({
  offset: 300, // offset (in px) from the original trigger point
  duration: 1300, // values from 0 to 3000, with step 50ms
});


const input = document.getElementById("inp");
const button = document.getElementById("btn");
const imgsHolder = document.getElementById("imgsHolder");
async function generateImgS() {
  showPlaceHolder();
  $(".loader").removeClass("d-none");
  let methods = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify({
      prompt: input.value,
      n: 3,
      size: "256x256",
    }),
  };
  const response = await fetch(
    "https://api.openai.com/v1/images/generations",
    methods
  );
  response
    .json()
    .then((finalResponse) => {
      showImgs(finalResponse.data);
    })
    .catch(function () {
      Swal.fire({
        title: "Error with image generation (API)",
        text: "Please try again in a few seconds",
        icon: "error",
        confirmButtonColor: "#090909",
      });
    });
}

function showImgs(imgs) {
  let box = ``;
  for (let i = 0; i < imgs.length; i++) {
    box += `

         <div  class="col-md-4 index-top">
      <div class="img-holder rounded-3">
         <img data-aos="flip-left"   data-aos-delay="${
           (i + 1) * 400
         }" class="w-100 rounded-3" src="${imgs[i].url}" alt="" />
      </div>
      </div>

`;
  }
  imgsHolder.innerHTML = box;
}

function showPlaceHolder() {
  let box = ``;
  for (let i = 0; i < 3; i++) {
    box += `
            <div class="col-md-4">
      <div class="loading d-flex justify-content-center align-items-center">
         <span class="loader d-none"></span>
      </div>
      </div>
   
   `;
  }
  imgsHolder.innerHTML = box;
}
button.addEventListener("click", function () {
  if (input.value.length) {
    generateImgS();
  } else {
    Swal.fire({
      title: "The input field cannot be empty",
      text: "Please Enter Any thing",
      icon: "error",
      confirmButtonColor: "#090909",
    });
  }
});
