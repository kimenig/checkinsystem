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
          :class="item.id"
          v-for="item in seatMapTest"
          :key="item.id"
          :data-id="item.id"
        >
          {{ item.coords }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeatingPlan",
  data() {
    return {
      seatMapTest: {
        seat1: { id: 1, coords: [74, 521, 107, 554] },
        seat2: { id: 2, coords: [74, 460, 107, 495] },
        seat3: { id: 3, coords: [74, 403, 107, 437] },
        seat4: { id: 4, coords: [74, 342, 107, 377] },
        seat5: { id: 5, coords: [76, 238, 103, 275] },
        seat6: { id: 6, coords: [74, 150, 105, 190] },
        seat7: { id: 7, coords: [45, 94, 77, 127] },
        seat8: { id: 8, coords: [45, 35, 78, 70] },
        seat9: { id: 9, coords: [205, 35, 239, 70] },
        seat10: { id: 10, coords: [204, 93, 239, 130] },
        seat11: { id: 11, coords: [176, 151, 206, 190] },
        seat12: { id: 12, coords: [506, 239, 537, 278] },
        seat13: { id: 13, coords: [558, 239, 588, 278] },
        seat14: { id: 14, coords: [676, 270, 709, 307] },
        seat15: { id: 15, coords: [676, 331, 709, 365] },
        seat16: { id: 16, coords: [676, 387, 709, 425] },
        seat17: { id: 17, coords: [676, 445, 709, 481] },
        seat18: { id: 18, coords: [558, 426, 588, 464] },
        seat19: { id: 19, coords: [505, 451, 539, 486] },
      },
      seatMap: {
        seat1: [74, 521, 107, 554],
        seat2: [74, 460, 107, 495],
        seat3: [74, 403, 107, 437],
        seat4: [74, 342, 107, 377],
        seat5: [76, 238, 103, 275],
        seat6: [74, 150, 105, 190],
        seat7: [45, 94, 77, 127],
        seat8: [45, 35, 78, 70],
        seat9: [205, 35, 239, 70],
        seat10: [204, 93, 239, 130],
        seat11: [176, 151, 206, 190],
        seat12: [506, 239, 537, 278],
        seat13: [558, 239, 588, 278],
        seat14: [676, 270, 709, 307],
        seat15: [676, 331, 709, 365],
        seat16: [676, 387, 709, 425],
        seat17: [676, 445, 709, 481],
        seat18: [558, 426, 588, 464],
        seat19: [505, 451, 539, 486],
      },
      mapSeat: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ],
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
  create() {
    //사용중인 좌석 가져오기
    //가져와서 nowUsingSeat에 넣기
  },
  mounted() {
    console.dir(this.$refs.seatList);
    /*this.mapSeat.forEach((seatNumber) => {
      this.makeChildNode(seatNumber);
    });*/
  },
  methods: {
    useSeat(seatnumber) {
      console.log(seatnumber);
    },
    makeChildNode(seatNumber) {
      const seatList = this.$refs.seatList;
      const childNode = document.createElement("li");

      childNode.setAttribute(
        "style",
        `position: absolute;
            left: ${this.seatMap[`seat${seatNumber}`][0]}px;
            top: ${this.seatMap[`seat${seatNumber}`][1]}px;
            right: ${this.seatMap[`seat${seatNumber}`][2]}px;
            bottom: ${this.seatMap[`seat${seatNumber}`][3]}px;
            width: ${
              this.seatMap[`seat${seatNumber}`][2] -
              this.seatMap[`seat${seatNumber}`][0]
            }px;
            height: ${
              this.seatMap[`seat${seatNumber}`][3] -
              this.seatMap[`seat${seatNumber}`][1]
            }px;
            background-color: gray;
            color:white;
            font-size: 14px;
            text-align:center;
            cursor:pointer; 
            `
      );

      childNode.setAttribute("class", `seat${seatNumber}`);
      //좌석 사용중일경우 usingseat 클래스 추가
      childNode.innerText = `${seatNumber}`;

      seatList.appendChild(childNode);
    },
  },
};
</script>

<style>
ul,
li {
  list-style: none;
}
.usingseat {
  background-color: brown !important;
}
</style>
