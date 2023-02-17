<template>
  <div
    class="exitseat"
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
      style="
        width: 100%;
        height: 100%;
        grid-row: 2/11;
        display: flex;
        justify-content: center;
      "
    ></div>
  </div>
</template>

<script>
import Check_header from "@/components/Check_header.vue";
export default {
  name: "ExitSeatView",
  components: {
    Check_header,
  },
  data() {
    return {};
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
  mounted() {
    if (this.storeUser.isUserLogined == 1) {
      //로그인 상태
      //로그아웃 에셋가져오기
      //db에 퇴장 보내기
      //1회용 요금
      //정액 요금
      //기간제 요금
      //퇴장하였습니다 3초
    } else {
      //로그아웃 상태
      //로그인창띄우기
      //로그인후 바로 퇴장db
      //퇴장하였습니다 3초
    }
  },
};
</script>
