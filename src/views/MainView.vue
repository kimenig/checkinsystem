<template>
  <div
    class="main"
    style="
      width: 100%;
      max-width: 1400px;
      height: 100vh;
      display: grid;
      grid-template-rows: repeat(20, 1fr);
      margin: 0 auto;
    "
  >
    <div
      class="d-flex justify-content-between"
      style="grid-row: 1/3; margin: 1%"
    >
      <span class="fs-2 m-2"
        >이용문의 : <span class="text-danger">{{ storeAdmin.aid }} </span></span
      >
      <div class="d-flex position-relative">
        <button
          type="button"
          class="btn btn-outline-danger m-2 fs-2 shadow text-nowrap"
          style=""
          @click="adminLogout"
        >
          관리자 로그아웃
        </button>
        <button
          type="button"
          class="btn btn-outline-danger m-2 fs-2 shadow text-nowrap"
          @click="goToLogout"
          v-if="isLoggedIn"
        >
          로그아웃
        </button>
        <button
          type="button"
          class="btn btn-outline-danger m-2 fs-2 shadow text-nowrap"
          @click="goToLogin"
          v-else
        >
          로그인
        </button>

        <button
          type="button"
          class="btn btn-outline-danger m-2 fs-2 shadow text-nowrap"
          @click="goToSignup"
        >
          회원가입
        </button>
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-content-center"
      style="grid-row: 3/6"
    >
      <div
        class="container d-flex flex-wrap justify-content-center align-content-center"
        style="width: 100%; height: 100%; text-align: center"
      >
        <img
          src="../assets/mainLogo.png"
          class="img-fluid"
          alt="mainLogo"
          style="height: 50%"
        />
        <p class="d-flex flex-wrap align-content-center" style="height: 50%">
          <span class="fs-2 ms-4"> {{ storeAdmin.branchName }} 24</span>
          <span class="fs-4 lh-lg">스터디카페</span>
        </p>
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-content-center"
      style="grid-row: 6/7"
    >
      <div
        class="container d-flex flex-wrap justify-content-center align-content-center fs-5"
        style="width: 100%; height: 100%; text-align: center"
        v-if="isLoggedIn"
      >
        {{ storeUser.uid }} 님 {{ sessionTime }} 초 후 자동로그아웃 됩니다.
      </div>
    </div>
    <div
      style="
        grid-row: 7/16;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        margin: 1%;
      "
    >
      <div>
        <button
          type="button"
          class="btn btn-outline-danger fs-2 shadow"
          style="width: 100%; height: 90%"
          @click="goToOneTime"
        >
          1회 이용권
        </button>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-outline-danger fs-2 shadow"
          style="width: 100%; height: 90%"
          @click="goToPeriodicTime"
        >
          기간 이용권
        </button>
      </div>

      <div>
        <button
          type="button"
          class="btn btn-outline-danger fs-2 shadow"
          style="width: 100%; height: 90%"
          @click="goToFlatTime"
        >
          정액 이용권
        </button>
      </div>
    </div>
    <div
      style="
        grid-row: 16/21;
        display: grid;
        grid-template:
          'a b'
          'a b';
        margin: 1%;
      "
    >
      <div style="grid-area: a">
        <button
          type="button"
          class="btn btn-outline-danger fs-2 shadow"
          style="width: 100%; height: 100%"
          @click="goToChangeSeat"
        >
          좌석 이동
        </button>
      </div>
      <div style="grid-area: b">
        <button
          type="button"
          class="btn btn-outline-danger fs-2 shadow"
          style="width: 100%; height: 100%"
          @click="goToExitSeat"
        >
          퇴장하기
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
<script>
//매장 관리자 세션 확인
//불일치시 관리자 로그인
//어떤 관지라냐에 따라  db쿼리 조절
//로그인확인

export default {
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

  created() {
    if (this.$store.state.storeAdmin.isAdminLogined == 1) {
      //
    } else {
      this.$swal.fire("관리자 로그인이 필요합니다.");
      this.$router.push("/accesslogin", {});
    }
  },
  methods: {
    goToSignup() {
      this.$router.push({ path: "/signup" });
    },
    goToLogin() {
      this.$router.push({ path: "/login" });
    },
    goToLogout() {
      this.$store.dispatch("logout");
      this.$router.push({ path: "/main" });
    },
    goToOneTime() {
      this.$router.push({ path: "/onetimeticket", query: { ctt: 1 } });
    },
    goToFlatTime() {
      this.$router.push({ path: "/onetimeticket", query: { ctt: 2 } });
    },
    goToPeriodicTime() {
      this.$router.push({ path: "/onetimeticket", query: { ctt: 3 } });
    },
    goToChangeSeat() {
      this.$router.push({ path: "/onetimeticket", query: { ctt: 4 } });
    },
    goToExitSeat() {
      this.$router.push({
        path: "/exitseat",
      });
    },
    adminLogout() {
      this.$swal
        .fire({
          title: "관리자 비밀번호 입력",
          input: "number",
          confirmButtonText: "로그아웃",
          cancelButtonText: "취소",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/adminlogin", {
              param: [this.$store.state.storeAdmin.aid, result.value],
            }).then((res) => {
              if (res.admin == "1") {
                this.$store.dispatch("updateStoreAdmin", {
                  aid: "",
                  aBranch: "0",
                  isAdminLogined: 0,
                  branchName: "",
                });
                this.$swal.fire(`로그아웃 완료.`, "", "success");
                this.$router.push({
                  path: "/accesslogin",
                  params: {},
                });
              } else {
                this.$swal.fire("비밀번호가 일치하지 않습니다.", "", "info");
              }
            });
          } else if (result.isDenied) {
            this.$swal.fire("예기치 않은 오류 발생.", "", "info");
          }
        });
    },
  },
};
</script>
