<template>
  <div class="selectstore container text-center">
    <div class="fs-4 mt-5">
      <button
        type="button"
        class="btn btn-outline-danger btn-group-vertical btn-lg"
        @click="goToMain"
      >
        역삼지점 영업 시작하기
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectStore",
  data() {
    return {
      adminId: "ss",
      chain: {},
    };
  },
  created() {
    //운영중인 지점 불러오기, 운영중인 지점 data에 넣기
    //@click에 매개변수 chain지정
  },
  methods: {
    goToMain(chainKey) {
      this.$router.push({
        path: "/main",
        params: { chain: chainKey },
      });
    },
  },
};
</script>
