<template>
  <div class="pool-form">
    <form @submit.prevent="submitForm">
      <div class="form-input text_input">
        <label>Zaposlenik:</label>
        <input type="text" v-model="username" />
      </div>
      <div class="form-input text_input">
        <label>Šifra bazena:</label>
        <input type="text" v-model="name" />
      </div>
      <label>Slike početnog stanja:</label>
      <div v-for="index in 3" :key="index">
        <input
          type="file"
          @change="previewImage(index, $event, 'start')"
          class="form-input"
        />
        <img
          :src="startPicturePreview[index - 1]"
          :alt="'Preview ' + index"
          width="100"
          v-if="startPicturePreview[index - 1]"
        />
      </div>
      <div class="form-input text_input">
        <label>PH razina:</label>
        <input type="text" v-model="phLevel" />
      </div>
      <div class="form-input text_input">
        <label>CL razina:</label>
        <input type="text" v-model="clLevel" />
      </div>
      <div class="form-input text_input">
        <label>Broj tableta (200g):</label>
        <input type="text" v-model="tabletCount" />
      </div>
      <label>Tehnike čišćenja:</label>
      <div class="cleaning-methods">
        <div v-for="method in cleaningMethods" :key="method">
          <input
            type="checkbox"
            v-model="selectedCleaningMethods"
            :value="method"
            class="form-checkbox"
          />
          <label class="method-label">{{ method }}</label>
        </div>
      </div>
      <label class="poured">Doziranje kemije:</label>
      <select v-model="chemicalsPoured" class="form-input">
        <option disabled value="">Please select one</option>
        <option>PH minus</option>
        <option>PH plus</option>
        <option>Bez kemije</option>
      </select>
      <div class="form-input text_input">
        <label>Količina kemije (litre):</label>
        <input
          type="text"
          v-model="chemicalsQuantity"
          :disabled="chemicalsPoured === 'Bez kemije'"
        />
      </div>
      <label>Slike završnog stanja:</label>
      <div v-for="index in 3" :key="index">
        <input
          type="file"
          @change="previewImage(index, $event, 'end')"
          class="form-input"
        />
        <img
          :src="endPicturePreview[index - 1]"
          :alt="'Preview ' + index"
          width="100"
          v-if="endPicturePreview[index - 1]"
        />
      </div>
      <div class="form-input text_input">
        <label>Napomena:</label>
        <input type="text" v-model="napomena" />
      </div>
      <div class="form-buttons">
        <button type="submit" class="submit-button">Podnesi</button>
        <button @click.prevent="logout" class="logout-button">Odjavi se</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      name: "",
      phLevel: "",
      clLevel: "",
      tabletCount: null,
      cleaningMethods: ["Usisavanje", "Četkanje", "Pranje rubne linije"],
      selectedCleaningMethods: [],
      chemicalsPoured: "",
      chemicalsQuantity: "",
      startPictures: [],
      endPictures: [],
      startPicturePreview: [],
      endPicturePreview: [],
      napomena: "",
    };
  },
  methods: {
    previewImage(index, event, type) {
      const file = event.target.files[0];
      if (file) {
        const previewList =
          type === "start" ? this.startPicturePreview : this.endPicturePreview;
        const pictureList =
          type === "start" ? this.startPictures : this.endPictures;
        previewList.splice(index - 1, 1, URL.createObjectURL(file));
        pictureList.splice(index - 1, 1, file);
      }
    },
    async submitForm() {
      if (
        isNaN(this.phLevel) ||
        isNaN(this.clLevel) ||
        (this.chemicalsPoured !== "Bez kemije" && isNaN(this.chemicalsQuantity))
      ) {
        alert(
          "Please enter a valid number for PH level, CL level, and chemicals quantity."
        );
        return;
      }

      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("phLevel", this.phLevel);
      formData.append("clLevel", this.clLevel);
      formData.append("tabletCount", this.tabletCount);

      this.selectedCleaningMethods.forEach((method) => {
        formData.append("cleaningMethods", method);
      });

      formData.append("chemicalsPoured", this.chemicalsPoured);
      formData.append("chemicalsQuantity", this.chemicalsQuantity);
      formData.append("username", this.username);
      formData.append("napomena", this.napomena);

      this.startPictures.forEach((file) => {
        formData.append("startPictures", file);
      });

      this.endPictures.forEach((file) => {
        formData.append("endPictures", file);
      });

      try {
        const response = await axios.post(
          "http://localhost:4001/pool",
          formData
        );

        if (response.status === 200) {
          alert("Form submitted successfully");
          this.resetForm();
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while submitting the form. Error: " + error);
      }
    },
    resetForm() {
      this.username = "";
      this.name = "";
      this.phLevel = "";
      this.clLevel = "";
      this.tabletCount = "";
      this.selectedCleaningMethods = [];
      this.chemicalsPoured = "";
      this.chemicalsQuantity = "";
      this.startPictures = [];
      this.endPictures = [];
      this.startPicturePreview = [];
      this.endPicturePreview = [];
      this.napomena = "";
    },
    logout() {
      this.$router.push("/employeeLogin");
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
.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
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
}
.logout-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-block;
}
.submit-button:hover {
  background-color: #1060a3;
}
.logout-button:hover {
  background-color: #b40412;
}
.pool-form img {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
.poured {
  margin-top: 1em;
}
.method-label {
  margin-right: 10px;
}
.form-checkbox {
  margin-right: 2.5px;
}
.cleaning-methods {
  display: flex;
  flex-direction: column;
}
</style>
