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
    return {
      seatStartTime: 0,
    };
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
  mounted() {
    if (this.storeUser.isUserLogined == 1) {
      //로그인 상태
      //로그인만되고 좌석 로그인 안한경우

      //로그아웃 에셋가져오기
      //db에 퇴장 보내기
      //1회용 요금
      this.$api("/api/getseattime", {
        param: [this.storeUser.uid],
      }).then((res) => {
        this.seatStartTime = res.getseattime[0].startdate;
      });
      this.getUserSeat();
      //정액 요금
      //기간제 요금
      //퇴장하였습니다 3초
    } else {
      this.$swal.fire(`로그인 해주세요.`).then((result) => {
        if (result.isConfirmed) {
          this.$router.push({ path: "/main" });
        }
      });
      this.exitTimeout();
      //로그아웃 상태
      //로그인창띄우기
      //로그인후 바로 퇴장db
      //퇴장하였습니다 3초
    }
  },
  methods: {
    getUserSeat() {
      this.$api("/api/getusertickettype", {
        param: [this.storeUser.uid],
      }).then((res) => {
        const userInfo = res.getusertickettype[0];
        if (userInfo.usingseatnumber !== 0) {
          //db seat 초기화

          //로그아웃
          switch (userInfo.tickettype) {
            case 1:
              //1회용
              //그냥 초기화
              //this.updateUser();
              this.$api("/api/updateuserone", {
                param: [this.storeUser.uid],
              });
              break;
            case 2: {
              //여기 에러
              let currentDate = new Date().getTime();
              let usedTime = Number(currentDate) - Number(this.seatStartTime);

              let newExpirationTime = userInfo.ticketexpirationtime - usedTime;
              this.$api("/api/updateuserpayrate", {
                param: [newExpirationTime, this.storeUser.uid],
              });
              break;
            }
            case 3:
              //기간제
              this.$api("/api/updateuserpaydaylimit", {
                param: [this.storeUser.uid],
              });
              break;
            default:
              break;
          }
          //this.logoutSeat();
          this.$api("/api/logoutseat", {
            param: [this.storeUser.uid],
          });
          this.$store.dispatch("logout");
          this.$swal.fire({
            title: `퇴실완료`,
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
          this.exitTimeout();
        } else {
          this.$swal.fire({
            title: `좌석을 사용중이지 않습니다`,
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
          this.exitTimeout();
        }
      });
    },
    exitTimeout() {
      setTimeout(() => {
        this.$router.push({ path: "/main" });
      }, 2000);
    },
  },
};
</script>
