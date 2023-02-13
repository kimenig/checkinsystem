<template>
  <div class="onetimeticket">
    <div
      style="
        width: 100%;
        height: 100vh;
        background-color: #616161;
        display: grid;
        grid-template-rows: repeat(10, 1fr);
      "
    >
      <div style="grid-row: 1/2">
        <Check_header />
      </div>
      <div
        class="d-flex justify-content-center align-content-center"
        style="grid-row: 2/3; flex-direction: column"
      >
        <div
          class="container d-flex flex-wrap justify-content-center align-content-center fs-5"
          style="width: 100%; height: 100%; text-align: center"
          v-if="isLoggedIn"
        >
          <span style="color: brown"
            >{{ storeUser.uid.split("")[7] }}{{ storeUser.uid.split("")[8]
            }}{{ storeUser.uid.split("")[9] }}{{ storeUser.uid.split("")[10] }}
          </span>
          님 좌석을 선택해주세요
        </div>
        <div
          class="container d-flex flex-wrap justify-content-center align-content-center fs-5"
          style="width: 100%; height: 100%; text-align: center"
          v-if="isLoggedIn"
        >
          <span style="color: brown">{{ sessionTime }}</span> 초 후 자동로그아웃
          됩니다.
        </div>
      </div>
      <div
        style="
          width: 100%;
          height: 100%;
          grid-row: 3/10;
          display: flex;
          justify-content: center;
        "
      >
        <SeatingPlan />
      </div>
      <div style="grid-row: 10/11">
        store테스트
        {{ storeAdmin }}
        {{ storeUser }}
        {{ sessionTime }}
        {{ isLoggedIn }}
      </div>
    </div>
  </div>
</template>
<script>
import SeatingPlan from "@/components/SeatingPlan.vue";
import Check_header from "@/components/Check_header.vue";

//이미지 매핑으로 가자
export default {
  name: "OneTimeTicketView",
  components: {
    SeatingPlan,
    Check_header,
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
  watch: {
    isLoggedIn: {
      handler() {
        this.$router.push("/main", {});
      },
      immediate: false,
    },
  },
  created() {
    if (!this.$store.state.isLoggedIn) {
      this.$swal.fire("로그인후 이용해주세요.");
      this.$router.push("/main", {});
    } else {
      //
      this.$store.dispatch("maintainSessionTime");
    }
  },
};
</script>
