<template>
  <div class="constructor_scroll">
    <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
      <div class="tittle">
        <h1>{{textContent.titleMain}}</h1>
      </div>
      <div class="notification-block">
				<div class="sms-block">
          <div class="img-block">
            <div class="avatar">
              <img class="pic-avatar" src="@/assets/img1-min.png" alt="Avatar">
              <span class="true">
								<icon-accept/>
              </span>
              <span class="false">
                <icon-ignore/>
              </span>
            </div>
          </div>
          <div class="sms-content">
            <div class="tittle-sms">
              <span><strong>Наталия Ивановна</strong> не принял(ла) приглашение</span>
            </div>
            <div class="time-sms">12:00</div>
          </div>
        </div>
				<div class="sms-block">
          <div class="img-block">
            <div class="avatar">
              <img class="pic-avatar" src="@/assets/img1-min.png" alt="Avatar">
              <span class="true">
								<icon-accept/>
              </span>
              <span class="false">
                <icon-ignore/>
              </span>
            </div>
          </div>
          <div class="sms-content">
            <div class="tittle-sms">
              <span><strong>Наталия Ивановна</strong> не принял(ла) приглашение</span>
            </div>
            <div class="time-sms">12:00</div>
          </div>
        </div>
        <div class="sms-block">
          <div class="img-block">
            <div class="avatar">
              <img class="pic-avatar" src="@/assets/img1-min.png" alt="Avatar">
              <span class="true">
								<icon-accept/>
              </span>
              <span class="false">
                <icon-ignore/>
              </span>
            </div>
          </div>
          <div class="sms-content">
            <div class="tittle-sms">
              <span><strong>Наталия Ивановна</strong> не принял(ла) приглашение</span>
            </div>
            <div class="time-sms">12:00</div>
          </div>
        </div>
        <span class="notification-data">16 мая, 2018</span>
        <div class="sms-block">
          <div class="img-block">
            <div class="avatar">
              <img class="pic-avatar" src="@/assets/img1-min.png" alt="Avatar">
              <span class="true">
								<icon-accept/>
              </span>
              <span class="false">
                <icon-ignore/>
              </span>
            </div>
          </div>
          <div class="sms-content">
            <div class="tittle-sms">
              <span><strong>Наталия Ивановна</strong> не принял(ла) приглашение</span>
            </div>
            <div class="time-sms">12:00</div>
          </div>
        </div>
        <div class="sms-block">
          <div class="img-block">
            <div class="avatar">
              <img class="pic-avatar" src="@/assets/img1-min.png" alt="Avatar">
              <span class="true">
								<icon-accept/>
              </span>
              <span class="false">
                <icon-ignore/>
              </span>
            </div>
          </div>
          <div class="sms-content">
            <div class="tittle-sms">
              <span><strong>Наталия Ивановна</strong> не принял(ла) приглашение</span>
            </div>
            <div class="time-sms">12:00</div>
          </div>
        </div>
				<div class="sms-block">
          <div class="img-block">
            <div class="avatar">
              <img class="pic-avatar" src="@/assets/img1-min.png" alt="Avatar">
              <span class="true">
								<icon-accept/>
              </span>
              <span class="false">
                <icon-ignore/>
              </span>
            </div>
          </div>
          <div class="sms-content">
            <div class="tittle-sms">
              <span><strong>Наталия Ивановна</strong> не принял(ла) приглашение</span>
            </div>
            <div class="time-sms">12:00</div>
          </div>
        </div>
				<div class="sms-block">
          <div class="img-block">
            <div class="avatar">
              <img class="pic-avatar" src="@/assets/img1-min.png" alt="Avatar">
              <span class="true">
								<icon-accept/>
              </span>
              <span class="false">
                <icon-ignore/>
              </span>
            </div>
          </div>
          <div class="sms-content">
            <div class="tittle-sms">
              <span><strong>Наталия Ивановна</strong> не принял(ла) приглашение</span>
            </div>
            <div class="time-sms">12:00</div>
          </div>
        </div>
				<div class="sms-block">
          <div class="img-block">
            <div class="avatar">
              <img class="pic-avatar" src="@/assets/img1-min.png" alt="Avatar">
              <span class="true">
								<icon-accept/>
              </span>
              <span class="false">
                <icon-ignore/>
              </span>
            </div>
          </div>
          <div class="sms-content">
            <div class="tittle-sms">
              <span><strong>Наталия Ивановна</strong> не принял(ла) приглашение</span>
            </div>
            <div class="time-sms">12:00</div>
          </div>
        </div>
      </div>
			<div class="notification-null">
				<icon-notification-null/>
				<span>Уведомлений ещё нет</span>
			</div>
      <pagination></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Quantity from "@/components/filters/Quantity";
// import MainTable from '../MainTable'
import { createNamespacedHelpers } from "vuex";
import IconAdd from "@/components/icons/IconAdd";

import IconAccept from '@/components/icons/IconAccept.vue';
import IconIgnore from '@/components/icons/IconIgnore.vue';
import IconNotificationNull from '@/components/icons/IconNotificationNull.vue';
const {
  mapMutations,
  mapGetters,
  mapActions,
  mapState
} = createNamespacedHelpers("mainPage");

export default {
  computed: {
    ...mapState([
      "textContent",
      "currentNumber",
      "filterItems",
      "isAdd",
      "emptyData"
    ]),
    ...mapGetters(["countItems"]),
    apiUrls() {
      return this.$store.state.apiUrls;
    }
  },
  methods: {
    ...mapMutations([
      "setUrl",
      "setTextContent",
      "setFilterItems",
      "resetModule",
      "setSharedParams",
      "setSortingParams",
      "setPaginationParams",
      "setFilterParams"
    ]),
    ...mapActions(["onAddItem", "getItems"]),
    getFirstPage() {
      this.setPaginationParams([
        { name: "page", value: 1 },
        { name: "number", value: this.currentNumber }
      ]);
      this.getItems();
    }
  },
  created() {
    this.resetModule();
    this.setUrl(this.apiUrls.questionnaire);
    this.setTextContent({
      titleMain: "Уведомления",
      addItemText: "Добавить анкету",
      notFoundText: "Анкет не найдено",
      addGreeting: "Анкета успешно создана",
      deleteGreeting: "Анкета успешно удалена",
      titleAdd: "Добавить анкету",
      cancelButton: "Отмена",
      submitButton: "Добавить анкету"
    });
    this.setFilterItems({});
    this.setFilterParams({});
    this.setSharedParams([{}]);
    this.setSortingParams([
      { name: "method", value: "desc" },
      { name: "field", value: "id" }
    ]);
    this.setPaginationParams([
      { name: "page", value: 1 },
      { name: "number", value: this.currentNumber }
    ]);
  },
  components: {
    Pagination,
    Search,
    // MainTable,
    Quantity,
		IconAdd,
		IconAccept,
		IconIgnore,
		IconNotificationNull
  }
};
</script>

<style lang="scss" scoped>
.container-block {
  background-color: #fafcfb;
  .tittle {
    justify-content: center;
  }
}

.notification-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 22px;
	width: 100%;
	height: calc(100vh - 250px);

}
.notification-null{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	justify-content: center;
	height: calc(100vh - 175px);
	display: none;
	svg{
		width: 70px;
		height: 80px;
	}
	span{
		font-size: 15px;
		margin-top: 7px;
		color: #999a9d;
	}
}
.sms-block {
	display: flex;
	min-height: 82px;
  width: 797px;
  max-width: 100%;
  background-color: #ffffff;
  border-radius: 7px;
  border: 1px solid #e4e8eb;
  margin-bottom: 6px;
  &:hover {
    background-color: #eaf1fc;
    .tittle-sms {
      strong {
        color: #089cd3;
      }
    }
  }
}
.tittle-sms{
	span {
		color: #999a9d;
		
	}
	strong{
		color: #6e7074;
	}
}
//убрать у каждого четного элемента "значек красного цвета"
.sms-block:nth-child(even) {
  .false {
    display: none;
  }
}

.img-block {
  display: flex;
  align-items: center;
  padding: 17px 17px;
}
.pic-avatar {
  height: 38px;
  width: 38px;
  object-fit: cover;
  border-radius: 50%;
}
.sms-content {
  padding: 19px 17px 19px 0px;
}
.avatar {
  height: 43px;
  width: 43px;
  position: relative;
  border-radius: 50%;

  span {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 16px;
    width: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .true {
    svg {
      width: 8px;
      height: 6px;
    }
    background-color: #61cc40;
    border-radius: 50%;
  }
  .false {
    svg {
      width: 6px;
      height: 6px;
    }
    background-color: #f27777;
    border-radius: 50%;
  }
}
.notification-data {
  width: 797px;
  max-width: 100%;
  color: #999a9d;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.56px;
  margin: 12px 0;
  text-align: center;
  position: relative;
  &::before {
    content: "";
    height: 1px;
    background-color: #e4e8eb;
    width: 43%;
    left: 0px;
    top: 50%;
    position: absolute;
  }
  &::after {
    content: "";
    height: 1px;
    background-color: #e4e8eb;
    width: 43%;
    right: 0px;
    top: 50%;
    position: absolute;
  }
}
</style>
