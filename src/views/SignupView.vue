<template>
  <div
    class=""
    style="
      width: 100%;
      max-width: 1400px;
      height: 100vh;
      display: grid;
      grid-template-rows: repeat(20, 1fr);
      margin: 0 auto;
    "
  >
    <div style="grid-row: 1/2">
      <span
        class="float-end fs-2 pt-2 me-4"
        style="cursor: pointer"
        @click="goToMain"
        >X</span
      >
    </div>
    <div
      class="fs-2 d-flex flex-wrap justify-content-center align-content-center text-danger fw-bold"
      style="grid-row: 2/3"
    >
      회원가입
    </div>
    <div style="grid-row: 3/5">
      <form class="row gy-2 gx-3 justify-content-center align-items-center">
        <div class="col-3">
          <select
            class="form-select form-select-lg"
            style="border: none; border-bottom: 4px solid gray"
            @change="changePhoneFirst"
          >
            <option selected value="1">010</option>
            <option value="2">011</option>
            <option value="3">012</option>
            <option value="4">013</option>
          </select>
        </div>
        <div class="col-6">
          <input
            type="text"
            class="form-control form-control-lg phone"
            placeholder="휴대폰 번호 뒤 7~8자리"
            style="border: none; border-bottom: 4px solid gray"
            minlength="7"
            maxlength="8"
            @change="changePhone"
          />
        </div>
      </form>
    </div>

    <div style="grid-row: 5/7">
      <form class="row gy-2 gx-3 justify-content-center align-items-center">
        <div class="col-3 fs-4">비밀번호 *</div>
        <div class="col-6">
          <input
            type="password"
            class="form-control form-control-lg password"
            placeholder="비밀번호 숫자 4자리"
            style="border: none; border-bottom: 4px solid gray"
            minlength="4"
            maxlength="4"
            @change="changePassword"
          />
        </div>
      </form>
    </div>
    <div style="grid-row: 7/9">
      <form class="row gy-2 gx-3 justify-content-center align-items-center">
        <div class="col-3 fs-4">비밀번호 확인 *</div>
        <div class="col-6">
          <input
            type="password"
            class="form-control form-control-lg passwordVerify"
            placeholder="비밀번호 숫자 4자리"
            style="border: none; border-bottom: 4px solid gray"
            minlength="4"
            maxlength="4"
            @change="changePasswordVerify"
          />
        </div>
      </form>
    </div>
    <div style="grid-row: 9/10">
      <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-danger fs-2 shadow"
          style="width: 70%; height: 100%"
          @click="checkVerify"
        >
          가입하기
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center" style="grid-row: 10/21">
      <div id="keyboard" style="width: 80%"></div>
    </div>
  </div>
</template>

<script>
import KioskBoard from "kioskboard";
export default {
  name: "SignupView",
  components: {},
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
  data() {
    return {
      inputPhoneFirst: "",
      inputPhone: "",
      fullNumber: "",
      inputPassword: "",
      inputPasswordVerify: "",
    };
  },
  created() {
    if (this.storeUser.isUserLogined == 1) {
      this.$swal.fire({
        title: `로그아웃후 회원가입 해주세요.`,
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
      setTimeout(() => {
        this.$router.push({ path: "/main" });
      }, 2000);
    }
  },
  mounted() {
    KioskBoard.init({
      keysArrayOfObjects: [
        {
          0: "Q",
          1: "W",
          2: "E",
          3: "R",
          4: "T",
          5: "Y",
          6: "U",
          7: "I",
          8: "O",
          9: "P",
        },
        {
          0: "A",
          1: "S",
          2: "D",
          3: "F",
          4: "G",
          5: "H",
          6: "J",
          7: "K",
          8: "L",
        },
        {
          0: "Z",
          1: "X",
          2: "C",
          3: "V",
          4: "B",
          5: "N",
          6: "M",
        },
      ],
      keysJsonUrl: null,
      keysSpecialCharsArrayOfStrings: null,
      keysNumpadArrayOfNumbers: null,
      language: "en",
      theme: "light",
      autoScroll: false,
      capsLockActive: false,
      allowRealKeyboard: false,
      allowMobileKeyboard: false,
      cssAnimations: true,
      cssAnimationsDuration: 0,
      cssAnimationsStyle: "slide",
      keysAllowSpacebar: false,
      keysSpacebarText: "Space",
      keysFontFamily: "sans-serif",
      keysFontSize: "22px",
      keysIconSize: "25px",
      keysFontWeight: "normal",
      keysEnterText: "Enter",
      keysEnterCallback: undefined,
      keysEnterCanClose: true,
    });
    KioskBoard.run(".phone");
    KioskBoard.run(".password");
    KioskBoard.run(".passwordVerify");
  },
  methods: {
    goToMain() {
      this.$router.push({ path: "/main" });
    },
    submitSignup() {
      let fullNumber = "";
      switch (this.inputPhoneFirst) {
        case "":
          fullNumber = "010" + this.inputPhone;
          break;
        case "2":
          fullNumber = "011" + this.inputPhone;
          break;
        case "3":
          fullNumber = "012" + this.inputPhone;
          break;
        case "4":
          fullNumber = "013" + this.inputPhone;
          break;
        default:
          break;
      }
      this.fullNumber = fullNumber;
    },
    changePhoneFirst(input) {
      this.inputPhoneFirst = input.target.value;
    },
    changePhone(input) {
      this.inputPhone = input.target.value;
    },
    changePassword(input) {
      this.inputPassword = input.target.value;
    },
    changePasswordVerify(input) {
      this.inputPasswordVerify = input.target.value;
    },
    checkVerify() {
      this.submitSignup();
      let isVerifyPhoneNumber = 0;
      let isVerifyPassword = 0;
      let isVerifyPasswordVerify = 0;
      let isVerifySamePassword = 0;

      const regPhone = /[0-9]{10,11}/;
      if (regPhone.exec(this.fullNumber) == null) {
        console.log("휴대폰번호거부");
      } else {
        console.log("휴대폰번호승인");
        isVerifyPhoneNumber = 1;
      }
      this.submitSignup();
      const regPassword = /[0-9]{4}/;
      if (regPassword.exec(this.inputPassword) == null) {
        console.log("패스워드거부");
      } else {
        console.log("패스워드승인");
        isVerifyPassword = 1;
      }
      const regPasswordVerify = /[0-9]{4}/;
      if (regPasswordVerify.exec(this.inputPasswordVerify) == null) {
        console.log("패스워드확인거부");
      } else {
        console.log("패스워드확인승인");
        isVerifyPasswordVerify = 1;
      }
      if (this.inputPassword !== this.inputPasswordVerify) {
        console.log("패스워드동일거부");
      } else {
        isVerifySamePassword = 1;
        console.log(isVerifySamePassword);
        console.log("패스워드 동일승인");
      }
      if (
        isVerifyPhoneNumber == 1 &&
        isVerifyPassword == 1 &&
        isVerifyPasswordVerify == 1 &&
        isVerifySamePassword == 1
      ) {
        console.log("모두 승인");
        this.$swal
          .fire({
            title: "가입하기",
            showCancelButton: true,
            confirmButtonText: "가입",
            cancelButtonText: "취소",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await this.$api("/api/usersignup", {
                param: [
                  this.fullNumber,
                  this.inputPassword,
                  this.$store.state.storeAdmin.aBranch,
                ],
              }).then((res) => {
                this.$swal.fire(res.data, "", "success");
                if (res.code == 1) {
                  this.$router.push("/main", {});
                }
              });

              //this.$router.push({ path: "/main" });
            } else if (result.isDenied) {
              this.$swal.fire("Changes are not saved", "", "info");
            }
          });
      } else {
        console.log("종합 거절");
        this.$swal.fire("정보를 올바르게 입력해주세요", "", "fail");
      }
    },
  },
};
</script>

<style></style>
