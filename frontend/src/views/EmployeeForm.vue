<template>
  <div class="pool-form">
    <form @submit.prevent="submitForm">
      <div class="form-input text_input">
        <label>Šifra bazena:</label>
        <input type="text" v-model="name" />
      </div>

      <div class="form-input text_input">
        <label>PH razina:</label>
        <input type="text" v-model="phLevel" />
      </div>

      <div class="form-input text_input">
        <label>CL razina:</label>
        <input type="text" v-model="clLevel" />
      </div>

      <label>Tehnike čiščenja:</label>
      <div
        class="cleaning-methods"
        v-for="method in cleaningMethods"
        :key="method"
      >
        <label>
          <input
            type="checkbox"
            v-model="cleaningMethod"
            :value="method"
            class="form-checkbox"
          />
          {{ method }}
        </label>
      </div>

      <label class="poured">Doziranje kemije:</label>
      <select v-model="chemicalsPoured" class="form-input">
        <option disabled value="">Please select one</option>
        <option>PH Minus</option>
        <option>PH Plus</option>
        <option>Bez kemije</option>
      </select>

      <div class="form-input text_input">
        <label>Količina kemije (litre):</label>
        <input
          type="text"
          v-model="chemicalsQuantity"
          :disabled="!chemicalsPoured || chemicalsPoured === 'Bez kemije'"
        />
      </div>

      <label>Slike:</label>
      <div v-for="index in 3" :key="index">
        <input
          type="file"
          @change="previewImage(index, $event)"
          class="form-input"
        />
        <img
          :src="picture[index - 1]"
          :alt="'Preview ' + index"
          width="100"
          v-if="picture[index - 1]"
        />
      </div>

      <button type="submit" class="submit-button">Podnesi</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      phLevel: "",
      clLevel: "",
      cleaningMethods: ["Usisavanje", "Četkanje", "Pranje rubne linije"],
      cleaningMethod: [],
      chemicalsPoured: "",
      chemicalsQuantity: "",
      picture: [],
    };
  },
  methods: {
    previewImage(index, event) {
      const file = event.target.files[0];
      if (file) {
        this.picture.splice(index - 1, 1, URL.createObjectURL(file));
      }
    },
    async submitForm() {
      // Input Validation
      if (
        isNaN(this.phLevel) ||
        isNaN(this.clLevel) ||
        isNaN(this.chemicalsQuantity)
      ) {
        alert(
          "Please enter a valid number for PH level, CL level and chemicals quantity."
        );
        return;
      }

      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("phLevel", this.phLevel);
      formData.append("clLevel", this.clLevel);
      formData.append("cleaningMethod", JSON.stringify(this.cleaningMethod));
      formData.append("chemicalsPoured", this.chemicalsPoured);
      formData.append("chemicalsQuantity", this.chemicalsQuantity);
      this.picture.forEach((pic, index) => {
        formData.append("picture" + index, pic);
      });

      const response = await axios.post("/pool", formData);

      console.log(response.data);
    },
  },
};
</script>

<style scoped>
.pool-form {
  background-color: #fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  color: #000;
  font-family: Arial, sans-serif;
}

.form-input {
  display: block;
  margin-bottom: 1em;
}

.form-input input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-button {
  background-color: #187bcd;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-block;
  margin-top: 1em;
}

.submit-button:hover {
  background-color: #1060a3;
}

.pool-form img {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}

.poured {
  margin-top: 1em;
}
</style>
