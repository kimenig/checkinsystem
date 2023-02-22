<template>
  <div
    class="SeatingPlan"
    style="width: 760px; height: 600px; display: flex; justify-content: center"
  >
    <div class="seatingmap" style="position: relative">
      <img
        src="@/assets/seat_plan.jpg"
        usemap="#image-map"
        style="width: 760px; height: 600px"
      />
      <ul
        class="virtual_seat"
        style="position: absolute; left: 0; top: 0; right: 0; bottom: 0"
        ref="seatList"
      >
        <li
          v-for="item in seatMap"
          :key="item.id"
          :data-id="item.id"
          :class="getClasses(item)"
          :style="{
            left: `${item.coords[0]}px`,
            top: `${item.coords[1]}px`,
            width: `${item.coords[2] - item.coords[0]}px`,
            height: `${item.coords[3] - item.coords[1]}px`,
          }"
          @click="seatclick(item.id)"
        >
          {{ item.id }}
        </li>
      </ul>
    </div>
    <div
      style="
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 300px;
        background-color: white;
        border-radius: 10%;
      "
      v-if="isPopupVisible"
    >
      <div
        style="
          position: absolute;
          right: 20px;
          top: 10px;
          font-size: 30px;
          cursor: pointer;
        "
        @click="exitPopup"
      >
        X
      </div>
      <p class="text-center fs-1 mt-4">이용권 결제</p>
      <div class="d-flex flex-column">
        <button
          type="button"
          class="btn btn-danger"
          style="width: 360px; height: 50px; transform: translateX(20px)"
          @click="goToOneTimePay"
        >
          1회 이용권
        </button>
        <button
          type="button"
          class="btn btn-danger mt-4"
          style="width: 360px; height: 50px; transform: translateX(20px)"
          @click="goToTimeLimitPay"
        >
          정액제 이용권
        </button>
        <button
          type="button"
          class="btn btn-danger mt-4"
          style="width: 360px; height: 50px; transform: translateX(20px)"
          @click="goToDayLimitPay"
        >
          기간제 이용권
        </button>
      </div>
    </div>
    <div
      style="
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 400px;
        background-color: white;
        border-radius: 10%;
        padding: 30px;
      "
      v-if="isOneTimeVisible"
    >
      <div class="d-flex justify-content-between">
        <p class="fs-3">{{ nowClickedSeat }} (1인석)</p>
        <span style="font-size: 30px; cursor: pointer" @click="goToSelectSeat">
          X
        </span>
      </div>
      <div>
        <p style="color: gray">요금제를 선택하세요.</p>
      </div>
      <div class="d-flex flex-wrap" style="gap: 15px">
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(1)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            4,000
          </p>
          <p>2시간</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(2)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            6,000
          </p>
          <p>4시간</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(3)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            7,000
          </p>
          <p>6시간</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
          "
          @click="calcPayData(4)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            9,000
          </p>
          <p>8시간</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(5)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            11,000
          </p>
          <p>12시간</p>
        </button>
      </div>
    </div>
    <div
      style="
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 400px;
        background-color: white;
        border-radius: 10%;
        padding: 30px;
      "
      v-if="isTimeLimitVisible"
    >
      <div class="d-flex justify-content-between">
        <p class="fs-3">{{ nowClickedSeat }} (1인석)</p>
        <span style="font-size: 30px; cursor: pointer" @click="goToSelectSeat">
          X
        </span>
      </div>
      <div>
        <p style="color: gray">요금제를 선택하세요.</p>
      </div>
      <div class="d-flex flex-wrap" style="gap: 15px">
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(6)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            25,000
          </p>
          <p>24시간</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(7)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            40,000
          </p>
          <p>40시간</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(8)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            55,000
          </p>
          <p>60시간</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
          "
          @click="calcPayData(9)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            100,000
          </p>
          <p>100시간</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(10)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            140,000
          </p>
          <p>150시간</p>
        </button>
      </div>
    </div>
    <div
      style="
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        height: 400px;
        background-color: white;
        border-radius: 10%;
        padding: 30px;
      "
      v-if="isDayLimitVisible"
    >
      <div class="d-flex justify-content-between">
        <p class="fs-3">{{ nowClickedSeat }} (1인석)</p>
        <span style="font-size: 30px; cursor: pointer" @click="goToSelectSeat">
          X
        </span>
      </div>
      <div>
        <p style="color: gray">요금제를 선택하세요.</p>
      </div>
      <div class="d-flex flex-wrap" style="gap: 15px">
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(11)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            20,000
          </p>
          <p>3일</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(12)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            40,000
          </p>
          <p>7일</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(13)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            70,000
          </p>
          <p>14일</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
          "
          @click="calcPayData(14)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            130,000
          </p>
          <p>28일</p>
        </button>
        <button
          style="
            width: 170px;
            height: 95px;
            border: 1px solid gray;
            background-color: white;
            border-radius: 15px;
            padding: 10px;
          "
          @click="calcPayData(15)"
        >
          <p
            style="
              border-bottom: 1px solid gray;
              width: 100%;
              height: 50%;
              font-size: 21px;
            "
          >
            250,000
          </p>
          <p>60일</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeatingPlan",

  data() {
    return {
      isPopupVisible: false,
      isOneTimeVisible: false,
      isTimeLimitVisible: false,
      isDayLimitVisible: false,
      nowClickedSeat: 0,
      seatMap: {
        seat1: { id: 1, coords: [74, 521, 107, 554], isUsing: false },
        seat2: { id: 2, coords: [74, 460, 107, 495], isUsing: false },
        seat3: { id: 3, coords: [74, 403, 107, 437], isUsing: false },
        seat4: { id: 4, coords: [74, 342, 107, 377], isUsing: false },
        seat5: { id: 5, coords: [76, 238, 103, 275], isUsing: false },
        seat6: { id: 6, coords: [74, 150, 105, 190], isUsing: false },
        seat7: { id: 7, coords: [45, 94, 77, 127], isUsing: false },
        seat8: { id: 8, coords: [45, 35, 78, 70], isUsing: false },
        seat9: { id: 9, coords: [205, 35, 239, 70], isUsing: false },
        seat10: { id: 10, coords: [204, 93, 239, 130], isUsing: false },
        seat11: { id: 11, coords: [176, 151, 206, 190], isUsing: false },
        seat12: { id: 12, coords: [506, 239, 537, 278], isUsing: false },
        seat13: { id: 13, coords: [558, 239, 588, 278], isUsing: false },
        seat14: { id: 14, coords: [676, 270, 709, 307], isUsing: false },
        seat15: { id: 15, coords: [676, 331, 709, 365], isUsing: false },
        seat16: { id: 16, coords: [676, 387, 709, 425], isUsing: false },
        seat17: { id: 17, coords: [676, 445, 709, 481], isUsing: false },
        seat18: { id: 18, coords: [558, 426, 588, 464], isUsing: false },
        seat19: { id: 19, coords: [505, 451, 539, 486], isUsing: false },
      },
      nowUsingSeat: [],
      clickedTicketType: 0,
      usedTicketType: 0,
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
  created() {
    //사용중인 좌석 가져오기
    //기간지났을시 시간,좌석 초기화작업

    //가져와서 nowUsingSeat에 넣기

    this.getSeat();

    //테스트
  },
  mounted() {
    this.$api("/api/getseattime", {
      param: [this.storeUser.uid],
    }).then((res) => {
      this.seatStartTime = res.getseattime[0].startdate;
    });
    this.clickedTicketType = this.$route.query.ctt;
    this.isProperTimeClick();

    console.log("AAA");
    console.log(this.clickedTicketType);
    console.log("AAB");
    console.log(this.usedTicketType);
  },
  methods: {
    isProperTimeClick() {
      this.$api("/api/getusertickettypeonly", {
        param: [this.storeUser.uid],
      }).then((res) => {
        console.log(res.getusertickettypeonly[0].tickettype);
        this.usedTicketType = res.getusertickettypeonly[0].tickettype;
        console.log(Number(res.getusertickettypeonly[0].tickettype) == 0);
        this.usedSeatProper = res.getusertickettypeonly[0].usingseatnumber;

        let ticketToName = "";
        switch (this.usedTicketType) {
          case 1:
            ticketToName = "1회";
            break;
          case 2:
            ticketToName = "정액";
            break;
          case 3:
            ticketToName = "기간";
            break;

          default:
            break;
        }
        if (
          Number(res.getusertickettypeonly[0].tickettype) !==
            Number(this.clickedTicketType) &&
          Number(res.getusertickettypeonly[0].tickettype) !== 0
        ) {
          if (Number(this.clickedTicketType) !== 4) {
            this.$swal.fire({
              title: `결제하신 ${ticketToName} 이용권으로 이용해주세요`,
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false,
            });
            setTimeout(() => {
              this.$router.push({ path: "/main" });
            }, 2000);
          } else {
            if (Number(this.usedSeatProper) == 0) {
              this.$swal.fire({
                title: `좌석을 이용중이지 않습니다.`,
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
              });
              setTimeout(() => {
                this.$router.push({ path: "/main" });
              }, 2000);
            }
          }
        }
      });
    },
    async calcPayData(payType) {
      const currentDate = new Date();
      const startDate = currentDate.getTime();
      let endDate = 0;
      let expirationDate = 0;
      if ([1, 2, 3, 4, 5].includes(payType)) {
        switch (payType) {
          case 1:
            endDate = startDate + 2 * 60 * 60 * 1000;
            break;
          case 2:
            endDate = startDate + 4 * 60 * 60 * 1000;
            break;
          case 3:
            endDate = startDate + 6 * 60 * 60 * 1000;
            break;
          case 4:
            endDate = startDate + 8 * 60 * 60 * 1000;
            break;
          case 5:
            endDate = startDate + 12 * 60 * 60 * 1000;
            break;
          default:
            break;
        }
        //1회용 db업로드
        this.updatePay("1", startDate, endDate, expirationDate);
        this.updateSeat(startDate, endDate);
        this.$swal.fire({
          title: `${this.nowClickedSeat} 번 좌석 로그인 완료`,
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
        this.exitTimeout();
      } else if ([6, 7, 8, 9, 10].includes(payType)) {
        //정액제제
        switch (payType) {
          case 6:
            expirationDate = 24 * 60 * 60 * 1000;
            endDate = startDate + expirationDate;
            break;
          case 7:
            expirationDate = 40 * 60 * 60 * 1000;
            endDate = startDate + expirationDate;
            break;
          case 8:
            expirationDate = 60 * 60 * 60 * 1000;
            endDate = startDate + expirationDate;
            break;
          case 9:
            expirationDate = 100 * 60 * 60 * 1000;
            endDate = startDate + expirationDate;
            break;
          case 10:
            expirationDate = 150 * 60 * 60 * 1000;
            endDate = startDate + expirationDate;
            break;
          default:
            break;
        }
        this.updatePay("2", startDate, endDate, expirationDate);
        this.updateSeat(startDate, endDate);
        this.$swal.fire({
          title: `${this.nowClickedSeat} 번 좌석 로그인 완료`,
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
        this.exitTimeout();
      } else if ([11, 12, 13, 14, 15].includes(payType)) {
        //기간제
        switch (payType) {
          case 11:
            expirationDate = 3 * 24 * 60 * 60 * 1000;
            endDate = startDate + expirationDate;
            break;
          case 12:
            expirationDate = 7 * 24 * 60 * 60 * 1000;
            endDate = startDate + expirationDate;
            break;
          case 13:
            expirationDate = 14 * 24 * 60 * 60 * 1000;
            endDate = startDate + expirationDate;
            break;
          case 14:
            expirationDate = 28 * 24 * 60 * 60 * 1000;
            endDate = startDate + expirationDate;
            break;
          case 15:
            expirationDate = 60 * 24 * 60 * 60 * 1000;
            endDate = startDate + expirationDate;
            break;
          default:
            break;
        }
        this.updatePay("3", startDate, endDate, expirationDate);
        this.updateSeat(startDate, endDate);
        this.$swal.fire({
          title: `${this.nowClickedSeat} 번 좌석 로그인 완료`,
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });
        this.exitTimeout();
      } else {
        // code block for any other payType value
        console.log("Invalid payType value");
      }
    },
    exitTimeout() {
      setTimeout(() => {
        this.$router.push({ path: "/main" });
      }, 2000);
    },
    updatePay(payType, startdate, enddate, expirationdate) {
      try {
        this.$api("/api/updatepay", {
          param: [
            payType,
            startdate,
            enddate,
            expirationdate,
            this.nowClickedSeat,
            this.storeUser.uBranch,
            this.storeUser.uid,
          ],
        }).then((res) => {
          console.log(res);
          console.log("updatepay complete");
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateSeat(startdate, enddate) {
      try {
        this.$api("/api/updateseat", {
          param: [
            1,
            startdate,
            enddate,
            this.storeUser.uid,
            this.nowClickedSeat,
          ],
        }).then((res) => {
          console.log(res);
          console.log("updateseat complete");
        });
      } catch (error) {
        console.log(error);
      }
    },
    exitPopup() {
      this.isPopupVisible = false;
    },
    useSeat(seatnumber) {
      console.log(seatnumber);
    },
    getClasses(item) {
      return {
        isusing: item.isUsing,
        seat: true,
      };
    },
    goToOneTimePay() {
      this.isPopupVisible = false;
      this.isOneTimeVisible = true;
    },
    goToTimeLimitPay() {
      this.isPopupVisible = false;
      this.isTimeLimitVisible = true;
    },
    goToDayLimitPay() {
      this.isPopupVisible = false;
      this.isDayLimitVisible = true;
    },
    goToSelectSeat() {
      this.isPopupVisible = false;
      this.isOneTimeVisible = false;
      this.isTimeLimitVisible = false;
      this.isDayLimitVisible = false;
    },

    async getSeat() {
      try {
        await this.$api("/api/getseat", {}).then((res) => {
          const filteredRes = res.getseat.filter((item) => {
            return item.isusing > 0;
          });
          console.log(filteredRes);
          const nowDate = new Date();
          filteredRes.forEach(async (elem, index) => {
            //resetseat
            if (elem.enddate !== null && elem.enddate < nowDate.getTime()) {
              await this.$api("/api/resetseat", { param: elem.seatnumber });
              console.log(elem.seatnumber);
              await filteredRes.splice(index, 1);
            } else {
              this.seatMap[`seat${elem.seatnumber}`].isUsing = true;
            }
          });
        });
      } catch (error) {
        console.err(error);
      }
    },
    seatclick(seatnumber) {
      this.nowClickedSeat = seatnumber;
      //fire하고 db로 보내기
      console.log(this.seatMap[`seat${seatnumber}`].isUsing);
      if (this.seatMap[`seat${seatnumber}`].isUsing) {
        this.$swal.fire("이미 사용중인 좌석입니다.");
      } else {
        this.$swal
          .fire({
            title: `${seatnumber}번 좌석`,
            showCancelButton: true,
            confirmButtonText: "사용하기",
            cancelButtonText: "취소",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await this.$api("/api/getusertickettype", {
                param: [this.storeUser.uid],
              }).then((res) => {
                const userInfo = res.getusertickettype[0];
                console.log("CCCC");
                console.log(userInfo);
                console.log(Number(userInfo.usingseatnumber));
                if (
                  Number(userInfo.usingseatnumber) !== 0 &&
                  Number(this.clickedTicketType) !== 4
                ) {
                  this.$swal.fire(
                    `이미 ${userInfo.usingseatnumber}번 좌석 사용중입니다.`
                  );
                } else {
                  console.log("SBV");
                  console.log(res.getusertickettype[0].tickettype);
                  if (res.getusertickettype[0].tickettype == 0) {
                    //티켓이 없을경우
                    switch (this.clickedTicketType) {
                      case "1":
                        this.isOneTimeVisible = true;
                        break;
                      case "2":
                        this.isTimeLimitVisible = true;
                        break;
                      case "3":
                        this.isDayLimitVisible = true;

                        break;

                      default:
                        break;
                    }
                  } else if (Number(this.clickedTicketType) == 4) {
                    //좌석이동 코드
                    switch (Number(res.getusertickettype[0].tickettype)) {
                      case 1:
                        this.$swal.fire({
                          title: `1회 이용권은 자리이동이 불가합니다.`,
                          timer: 2000,
                          showCancelButton: false,
                          showConfirmButton: false,
                        });
                        this.exitTimeout();
                        break;
                      case 2:
                        {
                          //정액
                          //기존seat db 삭제
                          try {
                            this.$api("/api/logoutseat", {
                              param: [this.storeUser.uid],
                            }).then((res) => {
                              console.log(res);
                            });
                          } catch (error) {
                            console.log(error);
                          }
                          //남은시간 다시정의
                          const nowDate = new Date();
                          const currDate = nowDate.getTime();

                          let usedTime =
                            Number(currDate) - Number(this.seatStartTime);

                          let newExpirationTime =
                            userInfo.ticketexpirationtime - usedTime;
                          this.$api("/api/updateuserpayrate", {
                            param: [newExpirationTime, this.storeUser.uid],
                          });
                          //db업로드

                          const startDate = nowDate.getTime();
                          let endDate =
                            Number(startDate) + Number(newExpirationTime);
                          //dbupload
                          //updateseat
                          try {
                            this.$api("/api/updateseatpayrate", {
                              param: [
                                this.nowClickedSeat,
                                userInfo.phonenumber,
                              ],
                            });
                          } catch (error) {
                            console.log(error);
                          }
                          try {
                            this.$api("/api/updateseat", {
                              param: [
                                1,
                                startDate,
                                endDate,
                                this.storeUser.uid,
                                this.nowClickedSeat,
                              ],
                            });
                          } catch (error) {
                            console.log(error);
                          }
                          this.$swal.fire({
                            title: `${this.nowClickedSeat} 번 좌석 로그인 완료`,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                          });
                          this.exitTimeout();
                        }

                        break;
                      case 3:
                        {
                          //기간
                          //기존 seat db삭제
                          try {
                            this.$api("/api/logoutseat", {
                              param: [this.storeUser.uid],
                            });
                          } catch (error) {
                            console.log(error);
                          }

                          //db업로드
                          const currentDate = new Date();
                          const startDate = currentDate.getTime();
                          let endDate = userInfo.ticketendtime;
                          //dbupload
                          //updateseat
                          try {
                            this.$api("/api/updateseatpayrate", {
                              param: [
                                this.nowClickedSeat,
                                userInfo.phonenumber,
                              ],
                            });
                          } catch (error) {
                            console.log(error);
                          }
                          try {
                            this.$api("/api/updateseat", {
                              param: [
                                1,
                                startDate,
                                endDate,
                                this.storeUser.uid,
                                this.nowClickedSeat,
                              ],
                            });
                          } catch (error) {
                            console.log(error);
                          }
                          this.$swal.fire({
                            title: `${this.nowClickedSeat} 번 좌석 로그인 완료`,
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false,
                          });
                          this.exitTimeout();
                        }

                        break;
                      default:
                        break;
                    }
                  } else if (
                    res.getusertickettype[0].tickettype == 1 &&
                    Number(this.clickedTicketType) !== 4
                  ) {
                    //1회용
                  } else if (
                    res.getusertickettype[0].tickettype == 3 &&
                    Number(this.clickedTicketType !== 4)
                  ) {
                    //기간
                    const currentDate = new Date();
                    const startDate = currentDate.getTime();
                    let endDate = userInfo.ticketendtime;
                    //dbupload
                    //updateseat
                    try {
                      this.$api("/api/updateseatpayrate", {
                        param: [this.nowClickedSeat, userInfo.phonenumber],
                      });
                    } catch (error) {
                      console.log(error);
                    }
                    try {
                      this.$api("/api/updateseat", {
                        param: [
                          1,
                          startDate,
                          endDate,
                          this.storeUser.uid,
                          this.nowClickedSeat,
                        ],
                      });
                    } catch (error) {
                      console.log(error);
                    }
                    this.$swal.fire({
                      title: `${this.nowClickedSeat} 번 좌석 로그인 완료`,
                      timer: 2000,
                      showCancelButton: false,
                      showConfirmButton: false,
                    });
                    this.exitTimeout();
                  } else if (
                    res.getusertickettype[0].tickettype == 2 &&
                    Number(this.clickedTicketType) !== 4
                  ) {
                    //정액
                    const currentDate = new Date();
                    const startDate = currentDate.getTime();
                    let expirationDate = userInfo.ticketexpirationtime;
                    let endDate = Number(startDate) + Number(expirationDate);
                    //dbupload
                    //updateseat
                    try {
                      this.$api("/api/updateseatpayrate", {
                        param: [this.nowClickedSeat, userInfo.phonenumber],
                      });
                    } catch (error) {
                      console.log(error);
                    }
                    try {
                      this.$api("/api/updateseat", {
                        param: [
                          1,
                          startDate,
                          endDate,
                          this.storeUser.uid,
                          this.nowClickedSeat,
                        ],
                      });
                    } catch (error) {
                      console.log(error);
                    }
                    this.$swal.fire({
                      title: `${this.nowClickedSeat} 번 좌석 로그인 완료`,
                      timer: 2000,
                      showCancelButton: false,
                      showConfirmButton: false,
                    });
                    this.exitTimeout();
                  } else {
                    //
                  }
                }
              });
            }
          });
      }
    },
  },
};
</script>

<style>
ul,
li {
  list-style: none;
}
.seat {
  position: absolute;
  background-color: gray;
  color: white;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.isusing {
  background-color: brown !important;
}
</style>
