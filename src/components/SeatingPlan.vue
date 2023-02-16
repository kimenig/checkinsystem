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
      "
      v-if="isTimeLimitVisible"
    ></div>
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
      "
      v-if="isDayLimitVisible"
    ></div>
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
  mounted() {},
  methods: {
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
        console.log(startDate);
        console.log(new Date(startDate));
        console.log(endDate);
        console.log(new Date(endDate));

        console.log("Processing payment for payType 1, 2, 3, or 4");

        //1회용 db업로드
        this.updatePay(1, startDate, endDate, expirationDate);
      } else if ([6, 7, 8].includes(payType)) {
        // code block for payType 5, 6, 7, or 8
        console.log("Processing payment for payType 5, 6, 7, or 8");
      } else if ([9, 10, 11, 12].includes(payType)) {
        // code block for payType 9, 10, 11, or 12
        console.log("Processing payment for payType 9, 10, 11, or 12");
      } else {
        // code block for any other payType value
        console.log("Invalid payType value");
      }
    },
    async updatePay(payType, startdate, enddate, expirationdate) {
      try {
        await this.$api("/api/updatepay", {
          param: [
            payType,
            startdate,
            expirationdate,
            enddate,
            this.nowClickedSeat,
            this.storeUser.uBranch,
            this.storeUser.uid,
          ],
        }).then((res) => {
          console.log(res);
          this.$api("/api/updateseat", {
            param: [
              1,
              startdate,
              enddate,
              this.storeUser.uid,
              this.nowClickedSeat,
            ],
          });
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
    resetExpireSeat() {},
    async getSeat() {
      try {
        await this.$api("/api/getseat", {}).then((res) => {
          const filteredRes = res.getseat.filter((item) => {
            return item.isusing > 0;
          });
          const nowDate = new Date();
          filteredRes.forEach(async (elem, index) => {
            //resetseat
            if (elem.enddate !== null && elem.enddate < nowDate) {
              await this.$api("/api/resetseat", { param: elem.seatnumber });
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
                if (res.getusertickettype[0].tickettype == 0) {
                  //티켓이 없을경우
                  this.isPopupVisible = true;
                } else if (res.getusertickettype[0].tickettype == 1) {
                  //1회용
                } else if (res.getusertickettype[0].tickettype == 2) {
                  //정액
                } else if (res.getusertickettype[0].tickettype == 3) {
                  //기간
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
