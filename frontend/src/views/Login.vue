<template>
  <div>
    <EmployeeLogin
      v-if="currentLogin === 'employeeLogin'"
      @login-success="handleLoginSuccess"
    />

    <OwnerLogin
      v-if="currentLogin === 'ownerLogin'"
      @login-success="handleLoginSuccess"
    />
  </div>
</template>

<script>
import EmployeeLogin from "@/components/EmployeeLogin.vue";
import OwnerLogin from "@/components/OwnerLogin.vue";

export default {
  components: {
    EmployeeLogin,
    OwnerLogin,
  },
  data() {
    return {
      currentLogin: "employeeLogin",
    };
  },
  methods: {
    handleLoginSuccess() {
      if (this.currentLogin === "employeeLogin") {
        this.$router.push("/employeeForm");
      } else if (this.currentLogin === "ownerLogin") {
        this.$router.push("/ownerForm");
      }
    },
  },
};
</script>

<style scoped>
/**/
</style>
