<template>
    <div class="error-page">
      <div class="error-wrap">
        <div class="logo">
            <a href="#"><img alt="Error" src="@/assets/egc_logo_max.svg"/></a>
        </div>
        <div class="error-content">
          <div class="wrapper">
            <h1 class="error-num"><span class="num-green">4</span><span class="num-orange">0</span><span class="num-purple">4</span></h1>
            <h2 class="error-title">Страница не найдена</h2>
            <p class="error-desc">Вы указали неправильный адрес или перешли по некорректной ссылке</p>
            <button @click="goHome" class="error-button">Перейти на главную</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: '404',
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
$white-2:#f8f9fb;
$white: #fff;
$grey-5: #55575c;
$grey-6: #6e7074;
$blue: #089cd3;

.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 0 15px;
  background-color: $white-2;

  .logo {
      width: 100%;
      height: 46px;
      margin-top: 6vh;
      margin-bottom: 6vh;
      text-align: center;
  }
}

.error-content {
  text-align: center;
  padding: 26px 40px;
  max-width: 560px;
  width: 100%;
  background-color: $white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, .07);
  border-radius: 5px;
  margin-bottom: 6vh;
  font-family: Roboto, sans-serif;

  @media screen and (max-width: 500px) {
      padding: 26px 20px;
  }
}

.error-num {
  letter-spacing: 4px;
  font-weight: 500;
  font-size: 86px;
  text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);

  .num-green {
    color: #61cc40;
  }
  .num-orange {
    color: #fe8b4c;
  }
  .num-purple {
    color: #ab6fef;
  }
}

.error-title {
  font-weight: 400;
  font-size: 26px;
  color: $grey-5;
  margin-bottom: 7px;
}

#app .error-content .error-desc {
  font-weight: 300;
  font-size: 16px;
  color: $grey-6;
  margin-bottom: 20px;
}

.error-button {
  background: $blue;
  border-radius: 100vh;
  color: #fff;
  border: 1px solid $blue;
  padding: 8px 35px;
  font-size: 14px;
  transition: .2s;
  font-weight: 400;
  letter-spacing: .8px;
  margin-bottom: 34px;

  &:hover {
    color: $blue;
    background: transparent;
  }
}
</style>
