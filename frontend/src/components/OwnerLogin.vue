<template>
  <div class="container">
    <div class="type_of_login">
      <button class="userType_button" @click="setUserType('employee')">
        ZAPOSLENIK
      </button>
      <button class="userType_button" @click="setUserType('owner')">
        VLASNIK
      </button>
    </div>
    <h2>Prijavite se sa svojim računom</h2>
    <form @submit.prevent="submitForm">
      <div v-if="userType === 'owner'">
        <div v-for="field in ownerFields" :key="field" class="text_input">
          <input
            :type="field.type"
            :placeholder="field.placeholder"
            v-model="formData[field.name]"
          />
        </div>
      </div>
      <div v-if="userType === 'employee'">
        <div v-for="field in employeeFields" :key="field" class="text_input">
          <input
            :type="field.type"
            :placeholder="field.placeholder"
            v-model="formData[field.name]"
          />
        </div>
      </div>
      <div class="button">
        <button type="submit">Prijava</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {},
      userType: "owner",
      ownerFields: [
        { name: "name", type: "text", placeholder: "Ime" },
        { name: "surname", type: "text", placeholder: "Prezime" },
        { name: "pool_id", type: "text", placeholder: "ID bazena" },
        { name: "password", type: "password", placeholder: "Lozinka" },
      ],
      employeeFields: [
        { name: "username", type: "text", placeholder: "Korisničko ime" },
        { name: "password", type: "password", placeholder: "Lozinka" },
      ],
    };
  },
  methods: {
    setUserType(type) {
      this.userType = type;
    },
    async submitForm() {
      try {
        const url =
          this.userType === "employee"
            ? "http://localhost:4001/employee/login"
            : "http://localhost:4001/owner/login";
        const response = await axios.post(url, this.formData);

        if (response.data.message === "Zaposlenik uspješno prijavljen!") {
          this.$router.push("/employeeForm");
        } else if (
          response.data.message === "Uneseni bazen nije od tog vlasnika!"
        ) {
          alert("Uneseni bazen nije od tog vlasnika!");
        } else if (response.data.message === "Vlasnik uspješno prijavljen!") {
          this.$router.push("/ownerForm");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.container {
  width: 300px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.type_of_login {
  display: flex;
  justify-content: space-around;
  margin: 2em 0;
}

.userType_button {
  padding: 10px;
  color: white;
  background-color: #1976d2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button {
  text-align: center;
}

.button button,
.userType_button {
  background-color: #187bcd;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button button:hover,
.userType_button:hover {
  background-color: #1060a3;
}

h2 {
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text_input {
  margin-bottom: 1em;
}

.text_input input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
