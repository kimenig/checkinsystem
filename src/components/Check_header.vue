<template>
  <div
    class="Check_header d-flex justify-content-between align-content-center align-items-center"
    style="
      width: 100%;
      height: 100%;
      background-color: white;
      z-index: 9999;
      padding: 0 5%;
    "
  >
    <div class="text-nowrap">{{ date }}</div>
    <div
      class="d-flex justify-content-center align-content-center align-items-center"
      style="width: 100%; height: 100%; text-align: center"
    >
      <img
        src="@/assets/mainLogo.png"
        class="img-fluid"
        alt="mainLogo"
        style="width: 40px; height: 40px"
      />
      <p class="d-flex flex-wrap align-content-center" style="height: 50%">
        <span class="fs-4 ms-4"> {{ storeAdmin.branchName }} 24&nbsp; </span>
        <span class="fs-4"> 스터디카페</span>
      </p>
    </div>
    <div class="d-flex align-content-center align-items-center">
      <span
        class="fs-4 text-nowrap"
        style="border: none"
        @click="goToLogout"
        v-if="isLoggedIn"
      >
        로그아웃
      </span>
      <span class="fs-4 text-nowrap" @click="goToLogin" v-else> 로그인 </span>
      <span
        class="fs-2 ms-3"
        style="cursor: pointer; color: brown"
        @click="goToMain"
        >X</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Check_header",
  data() {
    return {
      date: "",
    };
  },
  mounted() {
    this.updateDate();
    setInterval(() => this.updateDate(), 1000);
  },
  computed: {
    storeAdmin() {
      return this.$store.state.storeAdmin;
    },
    storeUser() {
      return this.$store.state.storeUser;
    },
    sessionTime() {
      return this.$store.state.sessionTime;
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  created() {},
  methods: {
    goToLogin() {
      this.$router.push({ path: "/login" });
    },
    goToLogout() {
      this.$store.dispatch("logout");
      this.$router.push({ path: "/main" });
    },
    updateDate() {
      this.date = new Date().toLocaleString();
    },
    goToMain() {
      this.$router.push({ path: "/main" });
    },
  },
};
</script>

<style></style>
