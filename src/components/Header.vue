<template>
  <header class="header">
    <div @click="toggleMobMenu" :class="{ 'open' : menuMobileShow }" class="hamburger">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <router-link class="logo-link-big" to="/">
      <div class="logo">
        <img src="../assets/egc_logo_max.svg" alt>
      </div>
    </router-link>
    <router-link class="logo-link-small" to="/">
      <div class="logo_min">
        <img src="../assets/egc_logo_min.svg" alt>
      </div>
    </router-link>
    <div class="mobile-nav">
      <div class="icon">
        <router-link to="/">
          <icon-envelope/>
          <span v-show="$store.state.unreadMessages">{{$store.state.unreadMessages}}</span>
        </router-link>
        <div class="hint">Обратная связь</div>
      </div>
      <div class="icon dropdown-notification">
        <div class="dropdown user-section" v-on-click-outside="hideNot">
          <input id="dr-2" type="checkbox" v-model="isShowListNot">
          <label class="active-notofocation" for="dr-2">
            <span>
              <router-link to="/">
                <icon-notification/>
                <span>1</span>
              </router-link>
              <div class="hint">Уведомления</div>
            </span>
          </label>
          <ul>
						<li class="notification-header">
							<div class="tittle">
								<span>Уведомления</span>
							</div>
						</li>
            <li class="list-scroll">
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
                      <span>
                        <strong>Наталия Ивановна</strong> не принял(ла) приглашение
                      </span>
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
                      <span>
                        <strong>Наталия Ивановна</strong> не принял(ла) приглашение
                      </span>
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
                      <span>
                        <strong>Наталия Ивановна</strong> не принял(ла) приглашение
                      </span>
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
                      <span>
                        <strong>Наталия Ивановна</strong> не принял(ла) приглашение
                      </span>
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
                      <span>
                        <strong>Наталия Ивановна</strong> не принял(ла) приглашение
                      </span>
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
                      <span>
                        <strong>Наталия Ивановна</strong> не принял(ла) приглашение
                      </span>
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
                      <span>
                        <strong>Наталия Ивановна</strong> не принял(ла) приглашение
                      </span>
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
                      <span>
                        <strong>Наталия Ивановна</strong> не принял(ла) приглашение
                      </span>
                    </div>
                    <div class="time-sms">12:00</div>
                  </div>
                </div>
              </div>
							<div class="notification-null">
								<span>Уведомлений ещё нет</span>
							</div>
              <!-- <a href="/profile"><icon-user/>Профиль</a> -->
            </li>
						<li class="notification-footer">
							<div class="tittle">
								<span>Смотреть все уведомления</span>
							</div>
						</li>
          </ul>
        </div>
      </div>
      <div class="dropdown user-section" v-on-click-outside="hideList">
        <input id="dr-3" type="checkbox" v-model="isShowList">
        <label for="dr-3">
          <span class="mail">test@mail.com</span>
          <span v-if="isAvatar" class="user-avatar">
            <img src="@/assets/avatar.png">
          </span>
          <span v-else class="user">
            <icon-user/>
          </span>
          <span class="triangle"></span>
        </label>
        <ul>
          <li>
            <a href="/profile">
              <icon-user/>Профиль
            </a>
          </li>
          <li>
            <a href="/logout">
              <icon-signin/>Выйти
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import IconEnvelope from "./icons/IconEnvelope.vue";
import IconUser from "./icons/IconUser.vue";
import IconSignin from "./icons/IconSignin.vue";
import IconNotification from "./icons/IconNotification.vue";
import { mixin as onClickOutside } from "vue-on-click-outside";
import { mapState, mapMutations } from "vuex";

import IconAccept from "@/components/icons/IconAccept.vue";
import IconIgnore from "@/components/icons/IconIgnore.vue";
import IconNotificationNull from "@/components/icons/IconNotificationNull.vue";
import DropdownLanguage from "@/components/DropdownLanguage.vue"

export default {
  mixins: [onClickOutside],
  data() {
    return {
      isShowList: false,
      isAvatar: true,
      isShowListNot: false
    };
  },
  methods: {
    hideList() {
      this.isShowList = false;
    },
    hideNot() {
      this.isShowListNot = false;
    },
    getUnreadMessages() {
      this.$http
        .get("/api/feedback/count?field=is_viewed&value=0")
        .then(response => {
          this.$store.commit("setUnreadMessages", response.data);
        });
    },
    toggleMobMenu() {
      this.$store.dispatch("toggleMenu", { menuType: "mobile" });
    }
  },
  computed: {
    ...mapState(["menuMobileShow"])
  },
  created() {
    this.getUnreadMessages();
    setInterval(() => {
      this.getUnreadMessages();
    }, 180000);
  },
  components: {
    IconEnvelope,
    IconUser,
    IconSignin,
    IconNotification,
    IconAccept,
    IconIgnore,
    DropdownLanguage
  }
};
</script>

<style lang="scss">
$white: #fff;
$main-bg-color: #f1f2f7;
$white-3: #e4e8eb;
$white-2: #f8f9fb;
$grey-4: #d8d9d9;

$grey-5: #55575c;
$grey-3: #999a9d;
$grey-6: #6e7074;
$grey-2: #46484c;

$blue: #089cd3;

$pink: #f27777;

$green-2: #376d27;

$grey-7: rgba(70, 72, 77, 0.9);
$grey-1: #46484c;

.logo-link-big {
  @media screen and (max-width: 559px) {
    display: none;
  }
}

.logo-link-small {
  @media screen and (min-width: 560px) {
    display: none;
  }
}

.logo-link-big,
.logo-link-small {
  @media screen and (max-width: 1023px) {
    margin-right: auto;
    margin-left: 22px;
  }
}

//-- Hamburger styles

.hamburger {
  @media screen and (min-width: 1024px) {
    display: none;
  }
}

.hamburger {
  width: 22px;
  height: 15px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

.hamburger span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: $grey-6;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}

.hamburger span:nth-child(1) {
  top: 0px;
}

.hamburger span:nth-child(2),
.hamburger span:nth-child(3) {
  top: 6px;
}

.hamburger span:nth-child(4) {
  top: 12px;
}

.hamburger.open span:nth-child(1) {
  top: 6px;
  width: 0%;
  left: 50%;
}

.hamburger.open span:nth-child(2) {
  transform: rotate(45deg);
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg);
}

.hamburger.open span:nth-child(4) {
  top: 6px;
  width: 0%;
  left: 50%;
}

.user-avatar {
  width: 33px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  @media screen and (max-width: 560px) {
    margin-left: 0;
  }

  img {
    object-fit: cover;
    max-width: 100%;
  }
}

.header {
  height: 60px;
  background: $white;
  border-bottom: 1px solid $white-3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  position: fixed;
  width: 100%;
  z-index: 2;
  .logo {
    width: 188px;
    height: 50px;
  }
  .logo_min {
    display: block;
    width: 50px;
    height: 50px;
  }
  .mobile-nav {
    display: flex;
    align-items: center;
    .icon {
      position: relative;
      margin-top: 5px;
      a {
        color: $blue;
        svg {
          width: 25px;
          height: 20px;
        }
        span {
          width: 18px;
          height: 18px;
          background: $pink;
          border-radius: 50%;
          color: $white;
          font-size: 9px;
          position: absolute;
          top: 8px;
          right: -8px;
          padding: 2px;
          text-align: center;
        }
      }
      & :hover ~ .hint {
        transform: translate(-50%, 0);
        opacity: 1;
        transition-delay: 0.3s;
      }
    }
    .user-section {
      color: $grey-6;
      margin-left: 22px;
      transition: 0.2s;
      cursor: pointer;
      position: relative;
      min-width: 162px;

      @media screen and (max-width: 560px) {
        min-width: initial;
      }
      .active-notofocation > span {
        position: relative;
        z-index: -1;
      }
      .triangle {
        margin-top: 3px;
        margin-left: 10px;
      }
      .user {
        width: 33px;
        height: 33px;
        border-radius: 50%;
        border: 2px solid;
        padding: 6px;
        text-align: center;
        margin-left: 10px;

        @media screen and (max-width: 560px) {
          margin-left: 0;
        }
      }
      ul {
        a {
          color: $grey-6;
          transition: 0.2s;
          display: flex;
          font-size: 15px;
          svg {
            margin: 3px 15px 0 0;
          }
          &:hover {
            color: $blue;
          }
        }
      }

      .mail {
        font-size: 15px;
        @media screen and (max-width: 560px) {
          display: none;
        }
      }
    }
  }
}
.dropdown-notification {
		.user-section {
			transition: 0.2s;
			min-width: initial !important;
			& > ul {
				transform: translateX(45%);
				max-height: 446px!important;
			}
		}
		.list-scroll{
			overflow-y: auto;
			width: 420px;
			background-color: #fafcfb;
		}
		.notification-block {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 16px 16px 10px;
			width: 100%;
		}
		.notification-null{
			height: 354px;
			justify-content: center;
			align-items: center;
			display: flex;
		}
		//убрать у каждого четного элемента "значек красного цвета"
		.sms-block:nth-child(even) {
			.false {
				display: none;
			}
		}
		.sms-content {
			white-space: normal;
			padding: 19px 17px 19px 0px;
		}
		.sms-block {
			max-width: 100%;
			display: flex;
			min-height: 82px;
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
				width: 33%;
				left: 0px;
				top: 50%;
				position: absolute;
			}
			&::after {
				content: "";
				height: 1px;
				background-color: #e4e8eb;
				width: 33%;
				right: 0px;
				top: 50%;
				position: absolute;
			}
		}
	.notification-header{
		background-color: #f8f9fb;
		width: 100%;
		min-height: 46px;
		border-bottom: 1px solid #e7ebed;
		display: flex;
    justify-content: center;
		.tittle{
			margin: auto 0;
		}
		span{
			font-size: 15px;
			font-weight: 400;
			color: #55575c;
		}

	}
	.notification-footer{
		background-color: #f8f9fb;
		width: 100%;
		border-top: 1px solid #e7ebed;
		min-height: 46px;
		display: flex;
		justify-content: center;
		.tittle{
			margin: auto 0;
		}
		span{

			font-size: 14px;
			font-weight: 400;
			line-height: 20px;
			color: #6e7074;
		}
		&:hover{
			background-color: #eaf1fc;
			span {
				color: #089cd3;
			}
		}
	}

}
</style>
