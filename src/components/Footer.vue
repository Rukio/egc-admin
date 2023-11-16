<template>
    <div class="footer" :class="{container_large: !$store.state.menuDesktopShow}">
        <div class="logo_copy">
            <div class="copy">© 2018 Все права защищены </div>
        </div>
        <div class="designed">
            <img src="../assets/designed.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style lang="scss"> 
$white: #fff;
$main-bg-color: #f1f2f7;
$white-3: #e4e8eb;
$white-2:#f8f9fb;
$grey-4: #d8d9d9;

$grey-5: #55575c;
$grey-3: #999a9d;
$grey-6: #6e7074;
$grey-2: #46484c;

$blue: #089cd3;

$pink:#f27777;

$green-2:#376d27;

$grey-7: rgba(70,72,77,.9);
$grey-1: #46484c;
    
.footer {
    margin-left: 240px;
    border-top: 1px solid $white-3;
    height: 56px;
    max-width: 100%;
    padding: 9px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 auto;
    background: $white-2;
    transition: margin .4s ease;
    .logo_copy {
        display: flex;
        .copy {
            color: $grey-3;
            font-size: 11px;
        }
    }
    .designed {
    height: 40px;
    }
}
</style>