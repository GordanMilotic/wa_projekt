<template>
  <div class="fault-form pool-form">
    <form @submit.prevent="submitFault">
      <div v-for="field in faultFields" :key="field.name" class="form-input">
        <label :for="field.id">{{ field.label }}</label>
        <input
          v-model="fault[field.name]"
          :id="field.id"
          :type="field.type"
          required
        />
      </div>
      <div class="form-buttons">
        <button class="submit-button" type="submit">Podnesi kvar</button>
        <button class="submit-button logout-button" @click.prevent="logout">
          Odjavi se
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      fault: {
        pool: "",
        owner: "",
        description: "",
        dateReported: "",
        reportedBy: "",
      },
      faultFields: [
        { name: "pool", id: "pool", label: "Šifra bazena", type: "text" },
        { name: "owner", id: "owner", label: "Vlasnik", type: "text" },
        {
          name: "description",
          id: "description",
          label: "Opis kvara/nedostatka",
          type: "text",
        },
        {
          name: "dateReported",
          id: "dateReported",
          label: "Datum prijave",
          type: "text",
        },
        {
          name: "reportedBy",
          id: "reportedBy",
          label: "Prijavljeno od",
          type: "text",
        },
      ],
    };
  },
  methods: {
    async submitFault() {
      try {
        const response = await axios.post(
          "http://localhost:4001/fault",
          this.fault
        );
        if (
          response.data.message ===
          "Informacije o kvaru/nedostatku uspješno prijavljene!"
        ) {
          this.resetForm();
          alert("Kvar uspješno prijavljen!");
        }
      } catch (error) {
        console.error(error);
        alert("Došlo je do pogreške prilikom slanja kvara.");
      }
    },
    resetForm() {
      this.fault = {
        pool: "",
        owner: "",
        description: "",
        dateReported: "",
        reportedBy: "",
      };
    },
    logout() {
      this.$router.push("/ownerLogin");
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
  margin-top: 1em;
}

.submit-button:hover {
  background-color: #1060a3;
}

.logout-button:hover {
  background-color: #b40412;
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
