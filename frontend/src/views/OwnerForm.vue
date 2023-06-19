<template>
  <div class="fault-form pool-form">
    <form @submit.prevent="submitFault">
      <div class="form-input">
        <label for="pool">Šifra bazena</label>
        <input id="pool" v-model="fault.pool" type="text" required />
      </div>
      <div class="form-input">
        <label for="owner">Vlasnik</label>
        <input id="owner" v-model="fault.owner" type="text" required />
      </div>
      <div class="form-input">
        <label for="description">Opis kvara/nedostatka</label>
        <input
          id="description"
          v-model="fault.description"
          type="text"
          required
        />
      </div>
      <div class="form-input">
        <label for="dateReported">Datum prijave</label>
        <input
          id="dateReported"
          v-model="fault.dateReported"
          type="text"
          required
        />
      </div>
      <div class="form-input">
        <label for="reportedBy">Prijavljeno od</label>
        <input
          id="reportedBy"
          v-model="fault.reportedBy"
          type="text"
          required
        />
      </div>
      <div class="form-buttons">
        <button class="submit-button" type="submit">
          Podnesi kvar/nedostatak
        </button>
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
    };
  },
  methods: {
    async submitFault() {
      const response = await axios.post("/fault", this.fault);
      if (response.data.message === "Fault information saved successfully!") {
        this.fault = {
          pool: "",
          owner: "",
          description: "",
          dateReported: "",
          reportedBy: "",
        };
      }
    },
    logout() {
      this.$router.push("/login");
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

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
