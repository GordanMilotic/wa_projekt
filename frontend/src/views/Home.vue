<script setup>

</script>

<template>
  <head>
    <link rel="icon" type="image/x-icon" href="favicon.jpg" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" />
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
  </head>

  <body>
    <img src="logo1.jpg" alt="" />
    <form method="post" id="menu-form">
      <div class="izbornik">
        <div class="popravci">
          <button id="popravci-button">
            <i class="bi bi-exclamation-circle"></i>Popravci
          </button>
        </div>
        <div class="karta">
          <button type="button" id="karta-button"><i class="bi bi-geo-alt"></i>Karta</button>
        </div>
      </div>
      <div class="menu">
        <form method="post" id="main-form">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                  aria-expanded="true" aria-controls="collapseOne"><i class="bi bi-camera">Fotografije zatečenog
                    stanja</i>
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div class="mb-3">
                    <input onchange="preview1()" class="form-control form-control-sm" type="file" id="formFileSm"
                      accept="image*/" multiple />
                    <img id="frame1" src="" class="frame1" />
                  </div>
                  <div class="mb-3">
                    <input onchange="preview2()" class="form-control form-control-sm" type="file" id="formFileSm"
                      accept="image*/" multiple />
                    <img id="frame2" src="" class="frame2" />
                  </div>
                  <div class="mb-3">
                    <input onchange="preview3()" class="form-control form-control-sm" type="file" id="formFileSm"
                      accept="image*/" multiple />
                    <img id="frame3" src="" class="frame3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">PH kiselost/lužnatost (broj)</span>
            <input id="ph-input" type="text" class="form-control" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm" />
          </div>
          <label id="error-ph-input">&nbsp;</label>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">CL vrijednost (broj)</span>
            <input id="klor-input" type="text" class="form-control" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm" />
          </div>
          <label id="error-klor-input">&nbsp;</label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-text">
              <input class="form-check-input mt-0" type="checkbox" id="ph-minus-checkbox"
                aria-label="Checkbox for following text input">
              <label class="ph-label">PH minus (broj)</label>
            </div>
            <input type="text" id="ph-minus-text" class="form-control" aria-label="Text input with checkbox">
          </div>
          <label id="error-ph-minus-text">&nbsp;</label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-text">
              <input class="form-check-input mt-0" type="checkbox" id="ph-plus-checkbox"
                aria-label="Checkbox for following text input">
              <label class="ph-label">PH plus (broj)</label>
            </div>
            <input type="text" id="ph-plus-text" class="form-control" aria-label="Text input with checkbox">
          </div>
          <label id="error-ph-plus-text">&nbsp;</label>
        </form>
      </div>
    </form>
  </body>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif;
  background: white;
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;

}

.type_of_login {
  display: grid;
  grid-template-columns: 5fr 5fr;
  grid-template-rows: 20fr 20fr;
  height: 75px;
}

.vlasnik {
  text-align: center;
  padding: 10px 10px 10px 10px;
}

.vlasnik input {
  font-family: "Poppins", sans-serif;
  color: lightgrey;
  background-color: white;
  border: 2px solid lightgrey;
  height: 35px;
  width: 100px;
  cursor: pointer;
  border-bottom-style: solid;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  transition-duration: 0.3s;
}

.zaposlenik {
  text-align: center;
  padding: 10px 10px 10px 10px;
}

.zaposlenik input {
  font-family: "Poppins", sans-serif;
  color: black;
  background-color: white;
  border: 2px solid black;
  height: 35px;
  width: 100px;
  cursor: pointer;
  border-bottom-style: solid;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  transition-duration: 0.3s;
}

body img {
  height: 25vh;
  width: 100%;
  object-fit: cover;
}

.inputs {
  padding: 0 20px;

}

.inputs h2 {
  font-size: medium;
  font-size: 75%;
  font-weight: 100;
}

.text_input form {
  width: 100%;
}

.text_input input {
  width: 100%;
  height: 30px;
  border-radius: 2px;
  border: 0.5px solid lightgray;
  padding-right: 10px;
}

.text_input input:focus {
  outline: 0;
  border: 2px solid #01bffd;
  border-radius: 2px;
  padding-right: 10px;
}

.button input {
  width: 100%;
  height: 30px;
  padding: 6px 12px;
  background-color: white;
  border: 0.5px solid #01bffd;
  text-align: center;
  transition-duration: 0.3s;
  border-radius: 2px;
  color: black;
  cursor: pointer;
  display: grid;
  text-decoration: none;
  appearance: button;
}

.button input:active {
  background-color: #01bffd;
  border: 1px solid #01bffd;
  color: white;
  cursor: pointer;
  border-radius: 2px;
}
</style>